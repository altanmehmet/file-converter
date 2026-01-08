import { randomUUID } from 'crypto';
import fs from 'fs';
import fsPromises from 'fs/promises';
import path from 'path';
import { ALLOWED_EXTENSIONS, JOB_ROOT, MAX_FILE_SIZE_BYTES, TMP_ROOT, UPLOAD_ROOT } from './config';
import { UploadedFile } from '@/lib/types';
import { encryptBuffer } from './encryption';

export const ensureTempRoots = async () => {
  await Promise.all([
    fsPromises.mkdir(TMP_ROOT, { recursive: true }),
    fsPromises.mkdir(UPLOAD_ROOT, { recursive: true }),
    fsPromises.mkdir(JOB_ROOT, { recursive: true }),
  ]);
};

export const sanitizeFilename = (name: string) => {
  const base = path.basename(name);
  return base.replace(/[^A-Za-z0-9._-]/g, '_') || 'file';
};

export const saveUploadedFile = async (file: File): Promise<UploadedFile> => {
  await ensureTempRoots();
  const originalName = sanitizeFilename(file.name || 'file');
  const ext = path.extname(originalName).toLowerCase();

  if (!ALLOWED_EXTENSIONS.has(ext)) {
    throw new Error(`Unsupported file type: ${ext}`);
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    throw new Error(`File too large. Max ${(MAX_FILE_SIZE_BYTES / (1024 * 1024)).toFixed(0)}MB`);
  }

  const fileId = randomUUID();
  const uploadDir = path.join(UPLOAD_ROOT, fileId);
  await fsPromises.mkdir(uploadDir, { recursive: true });

  const buffer = Buffer.from(await file.arrayBuffer());
  // Encrypt file before saving
  const { encrypted } = await encryptBuffer(buffer);
  const filePath = path.join(uploadDir, originalName + '.encrypted');
  await fsPromises.writeFile(filePath, encrypted);

  return {
    id: fileId,
    originalName,
    ext,
    mimeType: file.type || 'application/octet-stream',
    size: buffer.length, // Original size, not encrypted size
    path: filePath,
    createdAt: Date.now(),
    encrypted: true, // Mark as encrypted
  };
};

export const getJobDirs = async (jobId: string) => {
  const base = path.join(JOB_ROOT, jobId);
  const inputs = path.join(base, 'inputs');
  const outputs = path.join(base, 'outputs');
  await fsPromises.mkdir(inputs, { recursive: true });
  await fsPromises.mkdir(outputs, { recursive: true });
  return { base, inputs, outputs };
};

export const copyUploadToJob = async (jobId: string, file: UploadedFile) => {
  const dirs = await getJobDirs(jobId);
  const destination = path.join(dirs.inputs, sanitizeFilename(file.originalName));
  
  // If file is encrypted, decrypt it before copying
  if (file.encrypted) {
    const { decryptBuffer } = await import('./encryption');
    const encryptedData = await fsPromises.readFile(file.path);
    const decryptedData = await decryptBuffer(encryptedData);
    await fsPromises.writeFile(destination, decryptedData);
  } else {
    await fsPromises.copyFile(file.path, destination);
  }
  
  return destination;
};

export const removePath = async (target: string) => {
  if (!target.startsWith(TMP_ROOT)) {
    return;
  }
  if (fs.existsSync(target)) {
    const stats = await fsPromises.stat(target);
    if (stats.isDirectory()) {
      // For directories, recursively delete (encrypted files inside will be handled)
      await fsPromises.rm(target, { recursive: true, force: true });
    } else {
      // Use secure deletion for encrypted files
      if (target.endsWith('.encrypted')) {
        const { secureDelete } = await import('./encryption');
        await secureDelete(target);
      } else {
        // Regular file deletion
        await fsPromises.unlink(target);
      }
    }
  }
};

export const safeResolve = (base: string, target: string) => {
  const resolved = path.resolve(base, target);
  if (!resolved.startsWith(base)) {
    throw new Error('Path traversal detected');
  }
  return resolved;
};
