export type JobStatus = 'waiting' | 'processing' | 'done' | 'failed';

export type PresetId =
  | 'doc_to_pdf'
  | 'pdf_to_docx'
  | 'pdf_compress'
  | 'pdf_merge'
  | 'pdf_split'
  | 'image_convert'
  | 'excel_to_pdf';

export type CompressionLevel = 'low' | 'medium' | 'high';

export interface UploadedFile {
  id: string;
  originalName: string;
  ext: string;
  mimeType: string;
  size: number;
  path: string;
  createdAt: number;
  encrypted?: boolean;
}

export interface OutputFile {
  name: string;
  path: string;
  size: number;
  mimeType: string;
}

export interface Job {
  id: string;
  presetId: PresetId;
  status: JobStatus;
  progress: number;
  message?: string;
  error?: string;
  logs: LogLine[];
  inputFiles: UploadedFile[];
  outputFiles: OutputFile[];
  options: Record<string, unknown>;
  createdAt: number;
  updatedAt: number;
  ttlMinutes: number;
  expiresAt: number;
}

export interface LogLine {
  ts: number;
  level: 'info' | 'error';
  message: string;
}

export type PresetOptionType = 'select' | 'number' | 'boolean' | 'text';

export interface PresetOption {
  key: string;
  label: string;
  type: PresetOptionType;
  description?: string;
  placeholder?: string;
  options?: { label: string; value: string | number }[];
  min?: number;
  max?: number;
  step?: number;
}

export interface PresetDefinition {
  id: PresetId;
  title: string;
  description: string;
  pinned?: boolean;
  badge?: string;
  warning?: string;
  requiresMultiple?: boolean;
  accepts: string[];
  outputExtension?: string;
  defaultOptions?: Record<string, unknown>;
  options?: PresetOption[];
}
