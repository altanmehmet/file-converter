import fs from 'fs/promises';
import path from 'path';
import { runCommand } from '../exec';
import { sanitizeFilename } from '../storage';
import { OutputFile } from '@/lib/types';

const sofficeBaseArgs = ['--headless', '--nologo', '--nofirststartwizard'];

export const convertDocToPdf = async (jobId: string, inputPath: string, outputDir: string) => {
  await runCommand(jobId, 'soffice', [...sofficeBaseArgs, '--convert-to', 'pdf', '--outdir', outputDir, inputPath], {
    timeoutMs: 120000,
  });

  const baseName = sanitizeFilename(path.parse(inputPath).name) + '.pdf';
  const outPath = path.join(outputDir, baseName);
  const stat = await fs.stat(outPath);
  const output: OutputFile = {
    name: baseName,
    path: outPath,
    size: stat.size,
    mimeType: 'application/pdf',
  };
  return output;
};

export const convertPdfToDocx = async (jobId: string, inputPath: string, outputDir: string) => {
  await runCommand(
    jobId,
    'soffice',
    [...sofficeBaseArgs, '--convert-to', 'docx', '--outdir', outputDir, inputPath],
    { timeoutMs: 120000 },
  );

  // LibreOffice might create the file with a different name, so we need to find it
  const files = await fs.readdir(outputDir);
  const docxFile = files.find((f) => f.toLowerCase().endsWith('.docx'));
  
  if (!docxFile) {
    throw new Error('Conversion failed: output file not found');
  }

  const outPath = path.join(outputDir, docxFile);
  const stat = await fs.stat(outPath);
  const output: OutputFile = {
    name: docxFile,
    path: outPath,
    size: stat.size,
    mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  };
  return output;
};

export const convertExcelToPdf = async (jobId: string, inputPath: string, outputDir: string) => {
  await runCommand(jobId, 'soffice', [...sofficeBaseArgs, '--convert-to', 'pdf', '--outdir', outputDir, inputPath], {
    timeoutMs: 120000,
  });

  const baseName = sanitizeFilename(path.parse(inputPath).name) + '.pdf';
  const outPath = path.join(outputDir, baseName);
  const stat = await fs.stat(outPath);
  const output: OutputFile = {
    name: baseName,
    path: outPath,
    size: stat.size,
    mimeType: 'application/pdf',
  };
  return output;
};

export const convertPptToPdf = async (jobId: string, inputPath: string, outputDir: string) => {
  await runCommand(jobId, 'soffice', [...sofficeBaseArgs, '--convert-to', 'pdf', '--outdir', outputDir, inputPath], {
    timeoutMs: 120000,
  });

  const baseName = sanitizeFilename(path.parse(inputPath).name) + '.pdf';
  const outPath = path.join(outputDir, baseName);
  const stat = await fs.stat(outPath);
  const output: OutputFile = {
    name: baseName,
    path: outPath,
    size: stat.size,
    mimeType: 'application/pdf',
  };
  return output;
};
