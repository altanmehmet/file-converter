import archiver from 'archiver';
import fs from 'fs';
import { PassThrough } from 'stream';
import { OutputFile } from '@/lib/types';

export const createZipStream = (files: OutputFile[], zipName = 'outputs.zip') => {
  const archive = archiver('zip', { zlib: { level: 9 } });
  const stream = new PassThrough();

  archive.on('error', (err) => {
    stream.emit('error', err);
  });

  archive.pipe(stream);
  for (const file of files) {
    archive.append(fs.createReadStream(file.path), { name: file.name });
  }
  archive.finalize();

  return { stream, zipName };
};
