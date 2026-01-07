import fs from 'fs/promises';
import { Readable } from 'stream';
import { NextResponse } from 'next/server';
import { jobStore } from '@/backend/jobStore';
import { createZipStream } from '@/backend/zipper';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: Request, { params }: { params: Promise<{ jobId: string }> }) {
  const { jobId } = await params;
  const job = jobStore.getJob(jobId);
  if (!job) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  if (job.status !== 'done') {
    return NextResponse.json({ error: 'Job is not ready' }, { status: 400 });
  }

  const url = new URL(request.url);
  const requestedFile = url.searchParams.get('file');

  if (requestedFile) {
    const file = job.outputFiles.find((f) => f.name === requestedFile);
    if (!file) return NextResponse.json({ error: 'File not found' }, { status: 404 });
    const buffer = await fs.readFile(file.path);
    return new NextResponse(buffer, {
      headers: {
        'Content-Type': file.mimeType,
        'Content-Disposition': `attachment; filename="${file.name}"`,
      },
    });
  }

  if (job.outputFiles.length === 1) {
    const file = job.outputFiles[0];
    const buffer = await fs.readFile(file.path);
    return new NextResponse(buffer, {
      headers: {
        'Content-Type': file.mimeType,
        'Content-Disposition': `attachment; filename="${file.name}"`,
      },
    });
  }

  const { stream, zipName } = createZipStream(job.outputFiles, `job-${jobId}.zip`);
  const webStream = Readable.toWeb(stream) as unknown as ReadableStream;
  return new NextResponse(webStream, {
    headers: {
      'Content-Type': 'application/zip',
      'Content-Disposition': `attachment; filename="${zipName}"`,
    },
  });
}
