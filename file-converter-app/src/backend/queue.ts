import { DEFAULT_CONCURRENCY } from './config';
import { jobStore } from './jobStore';

type JobHandler = (jobId: string) => Promise<void>;

class JobQueue {
  private concurrency: number;
  private active = 0;
  private queue: string[] = [];
  private handler: JobHandler;

  constructor(handler: JobHandler, concurrency = DEFAULT_CONCURRENCY) {
    this.handler = handler;
    this.concurrency = concurrency;
  }

  setConcurrency(value: number) {
    this.concurrency = Math.max(1, value);
    this.drain();
  }

  enqueue(jobId: string) {
    this.queue.push(jobId);
    this.runNext();
  }

  retry(jobId: string) {
    const job = jobStore.getJob(jobId);
    if (!job) return;
    job.status = 'waiting';
    job.progress = 0;
    job.error = undefined;
    this.enqueue(jobId);
  }

  private drain() {
    while (this.active < this.concurrency && this.queue.length) {
      const nextId = this.queue.shift();
      if (nextId) {
        this.process(nextId);
      }
    }
  }

  private runNext() {
    if (this.active >= this.concurrency) return;
    const nextId = this.queue.shift();
    if (!nextId) return;
    this.process(nextId);
  }

  private process(jobId: string) {
    this.active += 1;
    this.handler(jobId)
      .catch((err) => {
        jobStore.setJobStatus(jobId, 'failed', 'Unexpected error');
        jobStore.setError(jobId, err instanceof Error ? err.message : String(err));
      })
      .finally(() => {
        this.active -= 1;
        this.runNext();
      });
  }
}

export const createJobQueue = (handler: JobHandler, concurrency?: number) =>
  new JobQueue(handler, concurrency);
