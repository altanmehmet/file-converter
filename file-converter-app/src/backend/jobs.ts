import { DEFAULT_TTL_MINUTES } from './config';
import { processJob } from './converters';
import { createJobQueue } from './queue';
import { jobStore } from './jobStore';
import { PRESET_MAP } from '@/lib/presets';
import { Job, PresetId, UploadedFile } from '@/lib/types';

export const jobQueue = createJobQueue(processJob);

const withDefaults = (presetId: PresetId, options: Record<string, unknown> | undefined) => {
  const preset = PRESET_MAP[presetId];
  return { ...(preset?.defaultOptions || {}), ...(options || {}) };
};

export const createJobsForPreset = (
  presetId: PresetId,
  uploads: UploadedFile[],
  options: Record<string, unknown> = {},
  ttlMinutes?: number,
) => {
  const preset = PRESET_MAP[presetId];
  if (!preset) throw new Error('Unknown preset');

  const jobs: Job[] = [];
  const resolvedOptions = withDefaults(presetId, options);

  if (preset.requiresMultiple) {
    const job = jobStore.createJob(presetId, uploads, resolvedOptions, ttlMinutes || DEFAULT_TTL_MINUTES);
    jobQueue.enqueue(job.id);
    jobs.push(job);
  } else {
    for (const upload of uploads) {
      const job = jobStore.createJob(presetId, [upload], resolvedOptions, ttlMinutes || DEFAULT_TTL_MINUTES);
      jobQueue.enqueue(job.id);
      jobs.push(job);
    }
  }

  return jobs;
};

export const getJobById = (jobId: string) => jobStore.getJob(jobId);
export const retryJob = (jobId: string) => jobQueue.retry(jobId);
export const removeJob = (jobId: string) => jobStore.deleteJob(jobId);
export const listJobs = () => jobStore.listJobs();
