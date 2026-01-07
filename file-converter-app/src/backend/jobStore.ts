import { randomUUID } from 'crypto';
import path from 'path';
import { CLEANUP_INTERVAL_MS, DEFAULT_TTL_MINUTES, JOB_ROOT } from './config';
import { removePath } from './storage';
import { Job, JobStatus, LogLine, UploadedFile } from '@/lib/types';

export class JobStore {
  private uploads = new Map<string, UploadedFile>();
  private jobs = new Map<string, Job>();
  private cleanupTimer: NodeJS.Timeout;

  constructor() {
    this.cleanupTimer = setInterval(() => this.cleanupExpired(), CLEANUP_INTERVAL_MS);
    this.cleanupTimer.unref();
  }

  addUpload(file: UploadedFile) {
    this.uploads.set(file.id, file);
  }

  getUpload(fileId: string) {
    return this.uploads.get(fileId);
  }

  createJob(presetId: Job['presetId'], inputFiles: UploadedFile[], options: Record<string, unknown>, ttlMinutes?: number): Job {
    const now = Date.now();
    const job: Job = {
      id: randomUUID(),
      presetId,
      inputFiles,
      outputFiles: [],
      status: 'waiting',
      progress: 0,
      logs: [],
      options,
      createdAt: now,
      updatedAt: now,
      ttlMinutes: ttlMinutes || DEFAULT_TTL_MINUTES,
      expiresAt: now + (ttlMinutes || DEFAULT_TTL_MINUTES) * 60 * 1000,
    };

    this.jobs.set(job.id, job);
    return job;
  }

  setJobStatus(jobId: string, status: JobStatus, message?: string) {
    const job = this.jobs.get(jobId);
    if (!job) return;
    job.status = status;
    job.message = message;
    job.updatedAt = Date.now();
  }

  setProgress(jobId: string, progress: number, message?: string) {
    const job = this.jobs.get(jobId);
    if (!job) return;
    job.progress = Math.min(100, Math.max(0, progress));
    job.message = message || job.message;
    job.updatedAt = Date.now();
  }

  setOutput(jobId: string, outputFiles: Job['outputFiles']) {
    const job = this.jobs.get(jobId);
    if (!job) return;
    job.outputFiles = outputFiles;
    job.updatedAt = Date.now();
  }

  setError(jobId: string, error: string) {
    const job = this.jobs.get(jobId);
    if (!job) return;
    job.error = error;
    job.updatedAt = Date.now();
  }

  addLog(jobId: string, level: LogLine['level'], message: string) {
    const job = this.jobs.get(jobId);
    if (!job) return;
    job.logs.push({ ts: Date.now(), level, message });
    job.updatedAt = Date.now();
  }

  getJob(jobId: string) {
    return this.jobs.get(jobId);
  }

  listJobs() {
    return Array.from(this.jobs.values());
  }

  deleteJob(jobId: string) {
    const job = this.jobs.get(jobId);
    this.jobs.delete(jobId);
    if (job) {
      const dir = path.join(JOB_ROOT, jobId);
      void removePath(dir);
    }
  }

  cleanupExpired() {
    const now = Date.now();
    for (const [jobId, job] of this.jobs.entries()) {
      if (job.expiresAt <= now) {
        this.jobs.delete(jobId);
        const dir = path.join(JOB_ROOT, jobId);
        void removePath(dir);
      }
    }

    const uploadCutoff = now - DEFAULT_TTL_MINUTES * 60 * 1000;
    for (const [uploadId, upload] of this.uploads.entries()) {
      const stillUsed = Array.from(this.jobs.values()).some((job) =>
        job.inputFiles.some((f) => f.id === uploadId),
      );
      if (!stillUsed && upload.createdAt < uploadCutoff) {
        this.uploads.delete(uploadId);
        void removePath(path.dirname(upload.path));
      }
    }
  }
}

export const jobStore = new JobStore();
