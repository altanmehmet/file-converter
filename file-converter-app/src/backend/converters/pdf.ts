import fs from 'fs/promises';
import path from 'path';
import { PDFDocument } from 'pdf-lib';
import { CompressionLevel, OutputFile } from '@/lib/types';
import { runCommand } from '../exec';
import { sanitizeFilename } from '../storage';

const gsQuality: Record<CompressionLevel, string> = {
  low: '/screen',
  medium: '/ebook',
  high: '/printer',
};

export const compressPdf = async (
  jobId: string,
  inputPath: string,
  outputDir: string,
  level: CompressionLevel,
): Promise<OutputFile> => {
  const baseName = sanitizeFilename(path.parse(inputPath).name);
  const outputName = `${baseName}-compressed.pdf`;
  const outputPath = path.join(outputDir, outputName);
  const quality = gsQuality[level] || gsQuality.medium;

  await runCommand(
    jobId,
    'gs',
    [
      '-sDEVICE=pdfwrite',
      '-dCompatibilityLevel=1.4',
      `-dPDFSETTINGS=${quality}`,
      '-dNOPAUSE',
      '-dQUIET',
      '-dBATCH',
      `-sOutputFile=${outputPath}`,
      inputPath,
    ],
    { timeoutMs: 120000 },
  );

  const stat = await fs.stat(outputPath);
  return {
    name: outputName,
    path: outputPath,
    size: stat.size,
    mimeType: 'application/pdf',
  };
};

export const mergePdfs = async (jobId: string, inputPaths: string[], outputDir: string): Promise<OutputFile> => {
  const mergedPdf = await PDFDocument.create();

  for (const filePath of inputPaths) {
    const bytes = await fs.readFile(filePath);
    const pdf = await PDFDocument.load(bytes);
    const copiedPages = await mergedPdf.copyPages(
      pdf,
      Array.from({ length: pdf.getPageCount() }, (_, idx) => idx),
    );
    copiedPages.forEach((page) => mergedPdf.addPage(page));
  }

  const mergedBytes = await mergedPdf.save();
  const outputName = `${sanitizeFilename(path.parse(inputPaths[0] || 'merged').name)}-merged.pdf`;
  const outputPath = path.join(outputDir, outputName);
  await fs.writeFile(outputPath, mergedBytes);
  const stat = await fs.stat(outputPath);

  return {
    name: outputName,
    path: outputPath,
    size: stat.size,
    mimeType: 'application/pdf',
  };
};

const parseRanges = (ranges: string, totalPages: number): [number, number][] => {
  const cleaned = ranges.replace(/\s+/g, '');
  if (!cleaned) return [];
  const parts = cleaned.split(',');
  const result: [number, number][] = [];

  for (const part of parts) {
    if (part.includes('-')) {
      const [startStr, endStr] = part.split('-');
      const start = Math.max(1, parseInt(startStr, 10));
      const end = Math.min(totalPages, parseInt(endStr, 10));
      if (start <= end && Number.isFinite(start) && Number.isFinite(end)) {
        result.push([start, end]);
      }
    } else {
      const page = Math.max(1, parseInt(part, 10));
      if (Number.isFinite(page) && page <= totalPages) {
        result.push([page, page]);
      }
    }
  }

  return result;
};

export const splitPdf = async (
  jobId: string,
  inputPath: string,
  outputDir: string,
  ranges: string,
  every: number,
): Promise<OutputFile[]> => {
  const bytes = await fs.readFile(inputPath);
  const pdf = await PDFDocument.load(bytes);
  const totalPages = pdf.getPageCount();

  let pageRanges: [number, number][] = [];
  if (ranges && ranges.trim().length > 0) {
    pageRanges = parseRanges(ranges, totalPages);
  } else if (every > 0) {
    for (let i = 0; i < totalPages; i += every) {
      pageRanges.push([i + 1, Math.min(totalPages, i + every)]);
    }
  } else {
    pageRanges = [[1, totalPages]];
  }

  const outputs: OutputFile[] = [];
  let index = 1;
  for (const [start, end] of pageRanges) {
    const outPdf = await PDFDocument.create();
    const pages = Array.from({ length: end - start + 1 }, (_, idx) => idx + (start - 1));
    const copied = await outPdf.copyPages(pdf, pages);
    copied.forEach((page) => outPdf.addPage(page));

    const outBytes = await outPdf.save();
    const outputName = `${sanitizeFilename(path.parse(inputPath).name)}-${start}-${end}-${index}.pdf`;
    const outPath = path.join(outputDir, outputName);
    await fs.writeFile(outPath, outBytes);
    const stat = await fs.stat(outPath);
    outputs.push({ name: outputName, path: outPath, size: stat.size, mimeType: 'application/pdf' });
    index += 1;
  }

  return outputs;
};
