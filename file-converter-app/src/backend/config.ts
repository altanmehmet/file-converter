import path from 'path';

export const TMP_ROOT = path.join(process.cwd(), 'tmp');
export const UPLOAD_ROOT = path.join(TMP_ROOT, 'uploads');
export const JOB_ROOT = path.join(TMP_ROOT, 'jobs');

export const MAX_FILE_SIZE_BYTES = 150 * 1024 * 1024; // 150MB
export const DEFAULT_CONCURRENCY = 2;
export const DEFAULT_TTL_MINUTES = 10;
export const CLEANUP_INTERVAL_MS = 60 * 1000;

export const ALLOWED_EXTENSIONS = new Set([
  '.pdf',
  '.doc',
  '.docx',
  '.xls',
  '.xlsx',
  '.ppt',
  '.pptx',
  '.png',
  '.jpg',
  '.jpeg',
  '.webp',
  '.tiff',
]);
