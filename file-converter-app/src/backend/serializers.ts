import { Job } from '@/lib/types';

export const serializeJob = (job: Job) => ({
  ...job,
  inputFiles: job.inputFiles.map((file) => {
    const { path: _path, ...rest } = file;
    void _path;
    return rest;
  }),
  outputFiles: job.outputFiles.map((file) => {
    const { path: _path, ...rest } = file;
    void _path;
    return rest;
  }),
});
