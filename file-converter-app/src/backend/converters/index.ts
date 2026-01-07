import { jobStore } from '../jobStore';
import { getJobDirs, copyUploadToJob } from '../storage';
import { compressPdf, mergePdfs, splitPdf } from './pdf';
import { convertDocToPdf, convertPdfToDocx, convertExcelToPdf } from './docs';
import { convertImage } from './images';
import { CompressionLevel, Job, OutputFile, PresetId } from '@/lib/types';

const ensureHasInputs = (job: Job) => {
  if (!job.inputFiles || job.inputFiles.length === 0) {
    throw new Error('No input files found for job');
  }
};

const handleDoc = async (jobId: string, job: Job, inputs: string[], outputsDir: string) => {
  ensureHasInputs(job);
  if (job.presetId === 'doc_to_pdf') {
    return [await convertDocToPdf(jobId, inputs[0], outputsDir)];
  }
  if (job.presetId === 'excel_to_pdf') {
    return [await convertExcelToPdf(jobId, inputs[0], outputsDir)];
  }
  return [await convertPdfToDocx(jobId, inputs[0], outputsDir)];
};

const handlePdf = async (jobId: string, job: Job, inputs: string[], outputsDir: string) => {
  ensureHasInputs(job);
  switch (job.presetId) {
    case 'pdf_compress': {
      const validLevels: CompressionLevel[] = ['low', 'medium', 'high'];
      const level = validLevels.includes(job.options?.level as CompressionLevel)
        ? (job.options?.level as CompressionLevel)
        : 'medium';
      return [await compressPdf(jobId, inputs[0], outputsDir, level)];
    }
    case 'pdf_merge': {
      return [await mergePdfs(jobId, inputs, outputsDir)];
    }
    case 'pdf_split': {
      const ranges = (job.options?.ranges as string) || '';
      const every = Number(job.options?.every) || 0;
      return await splitPdf(jobId, inputs[0], outputsDir, ranges, every);
    }
    default:
      throw new Error('Unsupported PDF preset');
  }
};

const handleImages = async (_jobId: string, job: Job, inputs: string[], outputsDir: string) => {
  const results: OutputFile[] = [];
  const allowedFormats = ['webp', 'png', 'jpg'] as const;
  const isValidFormat = (value: unknown): value is (typeof allowedFormats)[number] =>
    typeof value === 'string' && allowedFormats.includes(value as (typeof allowedFormats)[number]);
  const format: (typeof allowedFormats)[number] = isValidFormat(job.options?.format)
    ? job.options?.format
    : 'webp';
  const quality = Number(job.options?.quality ?? 82);
  const maxWidth = Number(job.options?.maxWidth ?? 2400);
  const stripMetadata = job.options?.stripMetadata !== false;

  for (const filePath of inputs) {
    const output = await convertImage(filePath, outputsDir, {
      format,
      quality,
      maxWidth,
      stripMetadata,
    });
    results.push(output);
  }

  return results;
};

const presetGroups: Record<PresetId, 'doc' | 'pdf' | 'image'> = {
  doc_to_pdf: 'doc',
  pdf_to_docx: 'doc',
  excel_to_pdf: 'doc',
  pdf_compress: 'pdf',
  pdf_merge: 'pdf',
  pdf_split: 'pdf',
  image_convert: 'image',
};

export const processJob = async (jobId: string) => {
  const job = jobStore.getJob(jobId);
  if (!job) return;

  jobStore.setJobStatus(jobId, 'processing', 'Hazirlaniyor');
  jobStore.addLog(jobId, 'info', `Starting ${job.presetId}`);

  try {
    const dirs = await getJobDirs(jobId);
    const localInputs: string[] = [];
    for (const file of job.inputFiles) {
      const copied = await copyUploadToJob(jobId, file);
      localInputs.push(copied);
    }

    jobStore.setProgress(jobId, 20, 'Isleniyor');
    let outputs: OutputFile[] = [];

    const group = presetGroups[job.presetId];
    if (group === 'doc') {
      outputs = await handleDoc(jobId, job, localInputs, dirs.outputs);
    } else if (group === 'pdf') {
      outputs = await handlePdf(jobId, job, localInputs, dirs.outputs);
    } else if (group === 'image') {
      outputs = await handleImages(jobId, job, localInputs, dirs.outputs);
    } else {
      throw new Error('Unknown preset');
    }

    jobStore.setOutput(jobId, outputs);
    jobStore.setProgress(jobId, 100, 'Tamamlandi');
    jobStore.setJobStatus(jobId, 'done', 'Tamamlandi');
    jobStore.addLog(jobId, 'info', `Job ${jobId} finished`);
  } catch (err) {
    jobStore.setJobStatus(jobId, 'failed', 'Hata olustu');
    jobStore.setError(jobId, err instanceof Error ? err.message : String(err));
    jobStore.addLog(jobId, 'error', String(err));
  }
};
