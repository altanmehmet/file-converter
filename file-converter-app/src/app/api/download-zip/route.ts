import { Readable } from 'stream';
import { NextResponse } from 'next/server';
import { jobStore } from '@/backend/jobStore';
import { createZipStream } from '@/backend/zipper';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const idsParam = url.searchParams.get('jobIds') || '';
  const ids = idsParam.split(',').map((id) => id.trim()).filter(Boolean);

  if (!ids.length) {
    return NextResponse.json({ error: 'jobIds query param required' }, { status: 400 });
  }

  const outputs = [];
  for (const id of ids) {
    const job = jobStore.getJob(id);
    if (!job || job.status !== 'done') continue;
    outputs.push(...job.outputFiles);
  }

  if (!outputs.length) {
    return NextResponse.json({ error: 'No completed jobs to download' }, { status: 400 });
  }

  const { stream, zipName } = createZipStream(outputs, 'all-jobs.zip');
  const webStream = Readable.toWeb(stream) as unknown as ReadableStream;
  return new NextResponse(webStream, {
    headers: {
      'Content-Type': 'application/zip',
      'Content-Disposition': `attachment; filename="${zipName}"`,
    },
  });
}
