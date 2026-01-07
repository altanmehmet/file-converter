import { NextResponse } from 'next/server';
import { jobStore } from '@/backend/jobStore';
import { removeJob } from '@/backend/jobs';
import { serializeJob } from '@/backend/serializers';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const withDownloadUrls = (jobId: string) => {
  const job = jobStore.getJob(jobId);
  if (!job) return null;
  const clean = serializeJob(job);
  const outputs = clean.outputFiles.map((file) => ({
    ...file,
    downloadUrl: `/api/download/${jobId}?file=${encodeURIComponent(file.name)}`,
  }));
  return { ...clean, outputFiles: outputs };
};

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const job = withDownloadUrls(id);
  if (!job) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ job });
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  removeJob(id);
  return NextResponse.json({ ok: true });
}
