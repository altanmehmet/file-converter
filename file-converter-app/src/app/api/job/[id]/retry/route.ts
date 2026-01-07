import { NextResponse } from 'next/server';
import { retryJob } from '@/backend/jobs';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  retryJob(id);
  return NextResponse.json({ ok: true });
}
