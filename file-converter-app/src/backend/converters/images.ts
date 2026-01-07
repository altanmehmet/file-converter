import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';
import { OutputFile } from '@/lib/types';
import { sanitizeFilename } from '../storage';

interface ImageOptions {
  format?: 'webp' | 'png' | 'jpg';
  quality?: number;
  maxWidth?: number;
  stripMetadata?: boolean;
}

export const convertImage = async (
  inputPath: string,
  outputDir: string,
  options: ImageOptions,
): Promise<OutputFile> => {
  const format = (options.format || 'webp') as ImageOptions['format'];
  const quality = typeof options.quality === 'number' ? options.quality : 82;
  const maxWidth = typeof options.maxWidth === 'number' ? options.maxWidth : 2400;
  const stripMetadata = options.stripMetadata !== false;

  let pipeline = sharp(inputPath).rotate();
  if (maxWidth && maxWidth > 0) {
    pipeline = pipeline.resize({ width: maxWidth, withoutEnlargement: true });
  }

  if (format === 'png') {
    pipeline = pipeline.png({ quality });
  } else if (format === 'jpg') {
    pipeline = pipeline.jpeg({ quality, mozjpeg: true });
  } else {
    pipeline = pipeline.webp({ quality });
  }

  if (!stripMetadata) {
    pipeline = pipeline.withMetadata();
  }

  const buffer = await pipeline.toBuffer();
  const baseName = sanitizeFilename(path.parse(inputPath).name);
  const outputName = `${baseName}.${format === 'jpg' ? 'jpg' : format}`;
  const outputPath = path.join(outputDir, outputName);
  await fs.writeFile(outputPath, buffer);
  const stat = await fs.stat(outputPath);

  return {
    name: outputName,
    path: outputPath,
    size: stat.size,
    mimeType: format === 'png' ? 'image/png' : format === 'jpg' ? 'image/jpeg' : 'image/webp',
  };
};
