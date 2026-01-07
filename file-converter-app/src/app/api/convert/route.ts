import { NextResponse } from 'next/server';
import { createJobsForPreset } from '@/backend/jobs';
import { jobStore } from '@/backend/jobStore';
import { serializeJob } from '@/backend/serializers';
import { PRESET_MAP } from '@/lib/presets';
import { PresetId } from '@/lib/types';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 120;

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const presetId = payload?.presetId as PresetId | undefined;
    const fileIds = (payload?.fileIds as string[]) || [];
    const options = (payload?.options as Record<string, unknown>) || {};
    const ttlMinutes = payload?.ttlMinutes as number | undefined;

    if (!presetId) {
      return NextResponse.json({ error: 'presetId is required' }, { status: 400 });
    }
    const preset = PRESET_MAP[presetId];
    if (!preset) {
      return NextResponse.json({ error: 'Unknown preset' }, { status: 400 });
    }

    if (!Array.isArray(fileIds) || fileIds.length === 0) {
      return NextResponse.json({ error: 'fileIds is required' }, { status: 400 });
    }

    if (preset.requiresMultiple && fileIds.length < 2) {
      return NextResponse.json({ error: 'This preset needs at least 2 files' }, { status: 400 });
    }

    const uploads = fileIds.map((id) => {
      const file = jobStore.getUpload(id);
      if (!file) {
        throw new Error(`Upload not found: ${id}`);
      }
      return file;
    });

    const jobs = createJobsForPreset(presetId, uploads, options, ttlMinutes).map(serializeJob);
    return NextResponse.json({ jobs });
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : String(err) }, { status: 400 });
  }
}
