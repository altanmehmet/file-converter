import { NextResponse } from 'next/server';
import { jobStore } from '@/backend/jobStore';
import { saveUploadedFile } from '@/backend/storage';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 120;

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const incoming = formData.getAll('files');
    if (!incoming.length) {
      return NextResponse.json({ error: 'No files provided' }, { status: 400 });
    }

    const uploaded = [];
    for (const item of incoming) {
      if (!(item instanceof File)) continue;
      const saved = await saveUploadedFile(item);
      jobStore.addUpload(saved);
      uploaded.push({
        id: saved.id,
        name: saved.originalName,
        size: saved.size,
        ext: saved.ext,
        mimeType: saved.mimeType,
      });
    }

    return NextResponse.json({ uploaded });
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : String(err) }, { status: 400 });
  }
}
