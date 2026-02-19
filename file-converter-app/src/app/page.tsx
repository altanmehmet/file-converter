'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { PRESETS } from '@/lib/presets';
import type {
  Job,
  OutputFile,
  PresetCategory,
  PresetDefinition,
  PresetId,
  PresetOption,
} from '@/lib/types';

type UploadItem = {
  id: string;
  name: string;
  size: number;
  ext: string;
  mimeType: string;
};

type UploadResponse = {
  id: string;
  name: string;
  size: number;
  ext: string;
  mimeType: string;
};

type ClientJob = Job & {
  outputFiles: (OutputFile & { downloadUrl?: string })[];
};

type Language = 'tr' | 'en';
type PresetFilter = 'all' | PresetCategory;
type JobFilter = 'all' | Job['status'];

type Copy = {
  appName: string;
  workspace: string;
  lead: string;
  presets: string;
  presetLibrary: string;
  searchPresets: string;
  settings: string;
  convert: string;
  clear: string;
  dropTitle: string;
  supported: string;
  uploadQueue: string;
  uploadQueueEmpty: string;
  files: string;
  remove: string;
  removeDone: string;
  jobQueue: string;
  details: string;
  jobQueueEmpty: string;
  inputs: string;
  outputs: string;
  download: string;
  downloadAll: string;
  logs: string;
  retry: string;
  retryFailed: string;
  close: string;
  options: string;
  language: string;
  autoZip: string;
  autoZipDesc: string;
  ttl: string;
  ttlDesc: string;
  totalInput: string;
  totalOutput: string;
  noOutputs: string;
  pinned: string;
  warning: string;
  quickActions: string;
  queueOverview: string;
  compression: string;
  avgDuration: string;
  favoritePresets: string;
  favorite: string;
  unfavorite: string;
  jobFilter: string;
  clearAllJobs: string;
  shortcutsHint: string;
  categories: Record<PresetFilter, string>;
  jobFilters: Record<JobFilter, string>;
  status: Record<Job['status'], string>;
  messages: {
    invalidForPreset: string;
    uploading: string;
    uploadFailed: string;
    uploadUnexpected: string;
    filesAdded: string;
    addFilesFirst: string;
    atLeastTwoFiles: string;
    queueing: string;
    queued: string;
    queuedAutoZip: string;
    conversionFailed: string;
    uploadsCleared: string;
    noDoneJobs: string;
    noLogs: string;
    noPresetResults: string;
    noFailedJobs: string;
    noDoneJobsRemove: string;
    noJobsForFilter: string;
    allJobsRemoved: string;
  };
};

const translations: Record<Language, Copy> = {
  tr: {
    appName: 'Local Batch Converter',
    workspace: 'Çalışma Alanı',
    lead: 'Dosyaları ekleyin, preset seçin, kuyruğu başlatın ve çıktıları anında alın.',
    presets: 'Presetler',
    presetLibrary: 'Preset Kütüphanesi',
    searchPresets: 'Preset ara...',
    settings: 'Ayarlar',
    convert: 'Dönüştür',
    clear: 'Temizle',
    dropTitle: 'Sürükle bırak yapın veya dosya seçin',
    supported: 'Desteklenen',
    uploadQueue: 'Yükleme Kuyruğu',
    uploadQueueEmpty: 'Henüz dosya eklenmedi.',
    files: 'dosya',
    remove: 'Kaldır',
    removeDone: 'Tamamlananları kaldır',
    jobQueue: 'İş Kuyruğu',
    details: 'Detaylar',
    jobQueueEmpty: 'Henüz iş yok.',
    inputs: 'Girdiler',
    outputs: 'Çıktılar',
    download: 'İndir',
    downloadAll: 'Tümünü ZIP indir',
    logs: 'Loglar',
    retry: 'Tekrar dene',
    retryFailed: 'Hatalıları tekrar dene',
    close: 'Kapat',
    options: 'Preset Ayarları',
    language: 'Dil',
    autoZip: 'Otomatik ZIP',
    autoZipDesc: 'Kuyruk bittiğinde tamamlanan işleri tek ZIP ile indir.',
    ttl: 'Temp TTL (dk)',
    ttlDesc: 'Geçici dosyalar bu süre sonunda otomatik temizlenir.',
    totalInput: 'Toplam Girdi',
    totalOutput: 'Toplam Çıktı',
    noOutputs: 'Henüz çıktı yok.',
    pinned: 'Sabit',
    warning: 'Uyarı',
    quickActions: 'Hızlı Aksiyonlar',
    queueOverview: 'Kuyruk Özeti',
    compression: 'Kompresyon',
    avgDuration: 'Ort. Süre',
    favoritePresets: 'Favori Presetler',
    favorite: 'Favori',
    unfavorite: 'Favoriden çıkar',
    jobFilter: 'İş Filtresi',
    clearAllJobs: 'Tüm işleri kaldır',
    shortcutsHint: 'Kısayol: Ctrl/Cmd+K dönüştür, Ctrl/Cmd+D temizle, Ctrl/Cmd+, ayarlar',
    categories: {
      all: 'Tümü',
      documents: 'Doküman',
      pdf: 'PDF',
      images: 'Görsel',
    },
    jobFilters: {
      all: 'Tümü',
      waiting: 'Bekliyor',
      processing: 'İşleniyor',
      done: 'Tamamlandı',
      failed: 'Hata',
    },
    status: {
      waiting: 'BEKLİYOR',
      processing: 'İŞLENİYOR',
      done: 'TAMAMLANDI',
      failed: 'HATA',
    },
    messages: {
      invalidForPreset: 'Bu preset için uygun dosya bulunamadı.',
      uploading: 'Yükleniyor...',
      uploadFailed: 'Yükleme başarısız.',
      uploadUnexpected: 'Yükleme sırasında beklenmeyen hata oluştu.',
      filesAdded: 'dosya eklendi',
      addFilesFirst: 'Önce dosya ekleyin.',
      atLeastTwoFiles: 'Bu preset en az 2 dosya gerektiriyor.',
      queueing: 'Kuyruğa ekleniyor...',
      queued: 'İşler kuyruğa eklendi.',
      queuedAutoZip: 'İşler kuyruğa eklendi. Otomatik ZIP açık.',
      conversionFailed: 'Dönüştürme başlatılamadı.',
      uploadsCleared: 'Yüklenen dosyalar temizlendi.',
      noDoneJobs: 'İndirilecek tamamlanmış iş yok.',
      noLogs: 'Bu iş için log yok.',
      noPresetResults: 'Arama/filtreye uygun preset bulunamadı.',
      noFailedJobs: 'Tekrar denenecek hatalı iş yok.',
      noDoneJobsRemove: 'Kaldırılacak tamamlanmış iş yok.',
      noJobsForFilter: 'Seçili filtre için iş bulunamadı.',
      allJobsRemoved: 'Tüm işler kaldırıldı.',
    },
  },
  en: {
    appName: 'Local Batch Converter',
    workspace: 'Workspace',
    lead: 'Add files, pick a preset, run queue, and grab outputs instantly.',
    presets: 'Presets',
    presetLibrary: 'Preset Library',
    searchPresets: 'Search presets...',
    settings: 'Settings',
    convert: 'Convert',
    clear: 'Clear',
    dropTitle: 'Drag and drop files or click to browse',
    supported: 'Supported',
    uploadQueue: 'Upload Queue',
    uploadQueueEmpty: 'No files uploaded yet.',
    files: 'files',
    remove: 'Remove',
    removeDone: 'Remove done',
    jobQueue: 'Job Queue',
    details: 'Details',
    jobQueueEmpty: 'No jobs yet.',
    inputs: 'Inputs',
    outputs: 'Outputs',
    download: 'Download',
    downloadAll: 'Download all as ZIP',
    logs: 'Logs',
    retry: 'Retry',
    retryFailed: 'Retry failed',
    close: 'Close',
    options: 'Preset Options',
    language: 'Language',
    autoZip: 'Auto ZIP',
    autoZipDesc: 'When queue ends, download completed jobs as one ZIP.',
    ttl: 'Temp TTL (min)',
    ttlDesc: 'Temporary files are auto-cleaned after this window.',
    totalInput: 'Total Input',
    totalOutput: 'Total Output',
    noOutputs: 'No outputs yet.',
    pinned: 'Pinned',
    warning: 'Warning',
    quickActions: 'Quick Actions',
    queueOverview: 'Queue Overview',
    compression: 'Compression',
    avgDuration: 'Avg Duration',
    favoritePresets: 'Favorite Presets',
    favorite: 'Favorite',
    unfavorite: 'Remove favorite',
    jobFilter: 'Job Filter',
    clearAllJobs: 'Clear all jobs',
    shortcutsHint: 'Shortcut: Ctrl/Cmd+K convert, Ctrl/Cmd+D clear, Ctrl/Cmd+, settings',
    categories: {
      all: 'All',
      documents: 'Docs',
      pdf: 'PDF',
      images: 'Images',
    },
    jobFilters: {
      all: 'All',
      waiting: 'Waiting',
      processing: 'Processing',
      done: 'Done',
      failed: 'Failed',
    },
    status: {
      waiting: 'WAITING',
      processing: 'PROCESSING',
      done: 'DONE',
      failed: 'FAILED',
    },
    messages: {
      invalidForPreset: 'No files match this preset.',
      uploading: 'Uploading...',
      uploadFailed: 'Upload failed.',
      uploadUnexpected: 'Unexpected upload error.',
      filesAdded: 'files added',
      addFilesFirst: 'Add files first.',
      atLeastTwoFiles: 'This preset requires at least 2 files.',
      queueing: 'Queueing jobs...',
      queued: 'Jobs added to queue.',
      queuedAutoZip: 'Jobs queued. Auto ZIP is enabled.',
      conversionFailed: 'Failed to start conversion.',
      uploadsCleared: 'Uploaded files cleared.',
      noDoneJobs: 'No completed jobs to download.',
      noLogs: 'No logs for this job.',
      noPresetResults: 'No preset matches this filter/query.',
      noFailedJobs: 'No failed jobs to retry.',
      noDoneJobsRemove: 'No completed jobs to remove.',
      noJobsForFilter: 'No jobs for selected filter.',
      allJobsRemoved: 'All jobs removed.',
    },
  },
};

const presetDescriptionEn: Partial<Record<PresetId, { description?: string; warning?: string }>> = {
  doc_to_pdf: { description: 'Convert DOC and DOCX files into high-quality PDF.' },
  pdf_to_docx: {
    description: 'Convert PDF into editable DOCX. Scanned documents may degrade.',
    warning: 'Scanned PDFs may produce low-quality output.',
  },
  pdf_compress: { description: 'Compress PDFs with low, medium, or high profile.' },
  pdf_merge: { description: 'Merge multiple PDFs in drag-and-drop order.' },
  pdf_split: { description: 'Split by ranges (1-3,5,7-9) or every X pages.' },
  image_convert: { description: 'Convert images to WebP, PNG, JPG with resize and quality controls.' },
  excel_to_pdf: { description: 'Convert XLS/XLSX files into high-quality PDF.' },
  ppt_to_pdf: { description: 'Convert PPT/PPTX presentation files to PDF.' },
};

const optionLocaleEn: Partial<Record<PresetId, Record<string, {
  label?: string;
  description?: string;
  placeholder?: string;
  choices?: Record<string, string>;
}>>> = {
  pdf_compress: {
    level: {
      label: 'Quality',
      choices: {
        low: 'Low (smaller file)',
        medium: 'Medium',
        high: 'High (better quality)',
      },
    },
  },
  pdf_split: {
    ranges: {
      label: 'Ranges',
      placeholder: '1-3,5,7-9',
      description: 'Comma-separated ranges. If blank, "Split every X pages" is used.',
    },
    every: {
      label: 'Split every X pages',
      description: '0 disables this option.',
    },
  },
  image_convert: {
    format: {
      label: 'Format',
      choices: {
        webp: 'WebP',
        png: 'PNG',
        jpg: 'JPG',
      },
    },
    quality: { label: 'Quality' },
    maxWidth: { label: 'Max Width' },
    stripMetadata: { label: 'Strip EXIF metadata' },
  },
};

const statusStyles: Record<Job['status'], string> = {
  waiting: 'border-amber-400/60 bg-amber-500/15 text-amber-100',
  processing: 'border-sky-400/60 bg-sky-500/15 text-sky-100',
  done: 'border-emerald-400/60 bg-emerald-500/15 text-emerald-100',
  failed: 'border-rose-400/60 bg-rose-500/15 text-rose-100',
};

const formatBytes = (bytes: number) => {
  if (!bytes) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB'];
  const i = Math.min(units.length - 1, Math.floor(Math.log(bytes) / Math.log(1024)));
  const value = bytes / 1024 ** i;
  return `${value.toFixed(value >= 10 ? 0 : 1)} ${units[i]}`;
};

const formatDuration = (ms: number) => {
  if (!Number.isFinite(ms) || ms <= 0) return '-';
  const sec = ms / 1000;
  if (sec < 60) return `${sec.toFixed(1)}s`;
  return `${(sec / 60).toFixed(1)}m`;
};

const normalizeJob = (job: Job): ClientJob => ({
  ...job,
  outputFiles: (job.outputFiles || []).map((file) => ({
    ...file,
    downloadUrl: `/api/download/${job.id}?file=${encodeURIComponent(file.name)}`,
  })),
});

export default function WorkspacePage() {
  const [selectedPreset, setSelectedPreset] = useState<PresetId>(PRESETS[0].id);
  const [uploads, setUploads] = useState<UploadItem[]>([]);
  const [jobs, setJobs] = useState<ClientJob[]>([]);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [language, setLanguage] = useState<Language>('tr');
  const [presetFilter, setPresetFilter] = useState<PresetFilter>('all');
  const [presetQuery, setPresetQuery] = useState('');
  const [favoritePresets, setFavoritePresets] = useState<PresetId[]>([]);
  const [jobFilter, setJobFilter] = useState<JobFilter>('all');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [logsJob, setLogsJob] = useState<ClientJob | null>(null);
  const [autoZip, setAutoZip] = useState(false);
  const [ttlMinutes, setTtlMinutes] = useState(10);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const autoZipSignatureRef = useRef<string>('');
  const startConversionRef = useRef<(() => Promise<void>) | null>(null);
  const clearUploadsRef = useRef<(() => void) | null>(null);

  const presetMap = useMemo(() => Object.fromEntries(PRESETS.map((preset) => [preset.id, preset])), []);
  const optionDefaults = useMemo(() => {
    return PRESETS.reduce(
      (acc, preset) => ({
        ...acc,
        [preset.id]: { ...(preset.defaultOptions || {}) },
      }),
      {} as Record<PresetId, Record<string, unknown>>,
    );
  }, []);

  const [optionValues, setOptionValues] = useState<Record<PresetId, Record<string, unknown>>>(optionDefaults);

  const selectedPresetDef = presetMap[selectedPreset] as PresetDefinition;
  const text = translations[language];

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const storedLang = localStorage.getItem('lb_lang');
    const storedAutoZip = localStorage.getItem('lb_auto_zip');
    const storedTtl = localStorage.getItem('lb_ttl_minutes');
    const storedFavorites = localStorage.getItem('lb_favorite_presets');

    if (storedLang === 'tr' || storedLang === 'en') setLanguage(storedLang);
    if (storedAutoZip === '1' || storedAutoZip === '0') setAutoZip(storedAutoZip === '1');

    const parsedTtl = Number(storedTtl);
    if (Number.isFinite(parsedTtl) && parsedTtl >= 5 && parsedTtl <= 240) {
      setTtlMinutes(parsedTtl);
    }

    if (storedFavorites) {
      try {
        const parsed = JSON.parse(storedFavorites);
        if (Array.isArray(parsed)) {
          const valid = parsed.filter((id): id is PresetId => PRESETS.some((preset) => preset.id === id));
          setFavoritePresets(valid);
        }
      } catch {
        // ignore malformed localStorage payload
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('lb_lang', language);
  }, [language]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('lb_auto_zip', autoZip ? '1' : '0');
  }, [autoZip]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('lb_ttl_minutes', String(ttlMinutes));
  }, [ttlMinutes]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('lb_favorite_presets', JSON.stringify(favoritePresets));
  }, [favoritePresets]);

  useEffect(() => {
    if (!logsJob) return;
    const fresh = jobs.find((job) => job.id === logsJob.id);
    if (fresh) setLogsJob(fresh);
  }, [jobs, logsJob]);

  const favoriteSet = useMemo(() => new Set(favoritePresets), [favoritePresets]);

  const filteredPresets = useMemo(() => {
    const q = presetQuery.trim().toLowerCase();
    const list = PRESETS.filter((preset) => {
      if (presetFilter !== 'all' && preset.category !== presetFilter) return false;
      if (!q) return true;
      const copy = readPresetCopy(preset, language);
      const haystack = [preset.title, copy.description, preset.id].join(' ').toLowerCase();
      return haystack.includes(q);
    });

    return list.sort((a, b) => {
      const aFav = favoriteSet.has(a.id);
      const bFav = favoriteSet.has(b.id);
      if (aFav && !bFav) return -1;
      if (!aFav && bFav) return 1;
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;
      return a.title.localeCompare(b.title, language === 'tr' ? 'tr' : 'en');
    });
  }, [presetFilter, presetQuery, language, favoriteSet]);

  useEffect(() => {
    if (!filteredPresets.some((preset) => preset.id === selectedPreset) && filteredPresets.length > 0) {
      setSelectedPreset(filteredPresets[0].id);
    }
  }, [filteredPresets, selectedPreset]);

  const handleFiles = async (files: File[]) => {
    if (!files.length) return;

    const allowed = new Set(selectedPresetDef.accepts.map((item) => item.toLowerCase()));
    const filtered = files.filter((file) => {
      const ext = `.${file.name.split('.').pop()?.toLowerCase() || ''}`;
      return allowed.has(ext);
    });

    if (!filtered.length) {
      setStatusMessage(text.messages.invalidForPreset);
      return;
    }

    const formData = new FormData();
    filtered.forEach((file) => formData.append('files', file));

    try {
      setIsUploading(true);
      setStatusMessage(text.messages.uploading);

      const response = await fetch('/api/upload', { method: 'POST', body: formData });
      const data = await response.json();

      if (!response.ok) {
        setStatusMessage(data.error || text.messages.uploadFailed);
        return;
      }

      const mapped: UploadItem[] = ((data.uploaded as UploadResponse[]) || []).map((item) => ({
        id: item.id,
        name: item.name,
        size: item.size,
        ext: item.ext,
        mimeType: item.mimeType,
      }));

      setUploads((prev) => [...prev, ...mapped]);
      setStatusMessage(`${mapped.length} ${text.messages.filesAdded}`);
    } catch (error) {
      setStatusMessage(error instanceof Error ? error.message : text.messages.uploadUnexpected);
    } finally {
      setIsUploading(false);
      setIsDragging(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const fetchJob = async (jobId: string) => {
    const response = await fetch(`/api/job/${jobId}`);
    if (!response.ok) return;
    const data = await response.json();
    if (data?.job) {
      setJobs((prev) => prev.map((job) => (job.id === jobId ? normalizeJob(data.job) : job)));
    }
  };

  const startConversion = async () => {
    if (!uploads.length) {
      setStatusMessage(text.messages.addFilesFirst);
      return;
    }

    if (selectedPresetDef.requiresMultiple && uploads.length < 2) {
      setStatusMessage(text.messages.atLeastTwoFiles);
      return;
    }

    try {
      setStatusMessage(text.messages.queueing);
      autoZipSignatureRef.current = '';
      const response = await fetch('/api/convert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          presetId: selectedPreset,
          fileIds: uploads.map((file) => file.id),
          options: optionValues[selectedPreset],
          ttlMinutes,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        setStatusMessage(data.error || text.messages.conversionFailed);
        return;
      }

      const created: ClientJob[] = (data.jobs || []).map(normalizeJob);
      setJobs((prev) => [...created, ...prev]);
      setStatusMessage(autoZip ? text.messages.queuedAutoZip : text.messages.queued);
    } catch (error) {
      setStatusMessage(error instanceof Error ? error.message : text.messages.conversionFailed);
    }
  };

  const clearUploads = () => {
    setUploads([]);
    setStatusMessage(text.messages.uploadsCleared);
  };

  startConversionRef.current = startConversion;
  clearUploadsRef.current = clearUploads;

  const toggleFavoritePreset = (presetId: PresetId) => {
    setFavoritePresets((prev) => {
      if (prev.includes(presetId)) {
        return prev.filter((id) => id !== presetId);
      }
      return [...prev, presetId];
    });
  };

  const handleRetry = async (jobId: string) => {
    await fetch(`/api/job/${jobId}/retry`, { method: 'POST' });
    fetchJob(jobId);
  };

  const retryFailedJobs = async () => {
    const failed = jobs.filter((job) => job.status === 'failed');
    if (!failed.length) {
      setStatusMessage(text.messages.noFailedJobs);
      return;
    }

    await Promise.all(failed.map((job) => fetch(`/api/job/${job.id}/retry`, { method: 'POST' })));
    failed.forEach((job) => fetchJob(job.id));
  };

  const handleRemoveJob = async (jobId: string) => {
    await fetch(`/api/job/${jobId}`, { method: 'DELETE' });
    setJobs((prev) => prev.filter((job) => job.id !== jobId));
  };

  const removeDoneJobs = async () => {
    const done = jobs.filter((job) => job.status === 'done');
    if (!done.length) {
      setStatusMessage(text.messages.noDoneJobsRemove);
      return;
    }

    await Promise.all(done.map((job) => fetch(`/api/job/${job.id}`, { method: 'DELETE' })));
    setJobs((prev) => prev.filter((job) => job.status !== 'done'));
  };

  const clearAllJobs = async () => {
    if (!jobs.length) return;
    await Promise.all(jobs.map((job) => fetch(`/api/job/${job.id}`, { method: 'DELETE' })));
    setJobs([]);
    setStatusMessage(text.messages.allJobsRemoved);
  };

  const reorderUploads = (sourceId: string, targetId: string) => {
    const next = [...uploads];
    const from = next.findIndex((item) => item.id === sourceId);
    const to = next.findIndex((item) => item.id === targetId);
    if (from === -1 || to === -1) return;

    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    setUploads(next);
  };

  useEffect(() => {
    const activeJobs = jobs.filter((job) => job.status === 'waiting' || job.status === 'processing');
    if (activeJobs.length === 0) return;

    const timer = setInterval(() => {
      activeJobs.forEach((job) => fetchJob(job.id));
    }, 1200);

    return () => clearInterval(timer);
  }, [jobs]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const tag = target?.tagName?.toLowerCase();
      const isInputLike = tag === 'input' || tag === 'textarea' || tag === 'select' || target?.isContentEditable;
      if (isInputLike) return;

      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        void startConversionRef.current?.();
      }

      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'd') {
        event.preventDefault();
        clearUploadsRef.current?.();
      }

      if ((event.ctrlKey || event.metaKey) && event.key === ',') {
        event.preventDefault();
        setIsSettingsOpen(true);
      }

      if (event.key === 'Escape') {
        setIsSettingsOpen(false);
        setIsDetailsOpen(false);
        setLogsJob(null);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const visibleJobs = jobs.filter((job) => (jobFilter === 'all' ? true : job.status === jobFilter));
  const doneJobs = jobs.filter((job) => job.status === 'done');
  const waitingCount = jobs.filter((job) => job.status === 'waiting').length;
  const processingCount = jobs.filter((job) => job.status === 'processing').length;
  const doneCount = jobs.filter((job) => job.status === 'done').length;
  const failedCount = jobs.filter((job) => job.status === 'failed').length;

  const totalInputSize = doneJobs.reduce(
    (sum, job) => sum + job.inputFiles.reduce((innerSum, file) => innerSum + (file.size || 0), 0),
    0,
  );
  const totalOutputSize = doneJobs.reduce(
    (sum, job) => sum + job.outputFiles.reduce((innerSum, file) => innerSum + (file.size || 0), 0),
    0,
  );

  const averageDoneDuration =
    doneJobs.length > 0
      ? doneJobs.reduce((sum, job) => sum + Math.max(0, job.updatedAt - job.createdAt), 0) / doneJobs.length
      : 0;

  useEffect(() => {
    if (!autoZip) return;
    if (jobs.length === 0) return;

    const hasActive = jobs.some((job) => job.status === 'waiting' || job.status === 'processing');
    if (hasActive) return;

    const completeIds = doneJobs.map((job) => job.id).sort();
    if (!completeIds.length) return;

    const signature = completeIds.join(',');
    if (autoZipSignatureRef.current === signature) return;

    autoZipSignatureRef.current = signature;
    window.open(`/api/download-zip?jobIds=${signature}`, '_blank');
  }, [autoZip, jobs, doneJobs]);

  const handleDownload = (job: ClientJob, file?: OutputFile & { downloadUrl?: string }) => {
    const url = file?.downloadUrl || `/api/download/${job.id}`;
    window.open(url, '_blank');
  };

  const downloadAllAsZip = () => {
    const completedIds = doneJobs.map((job) => job.id);
    if (!completedIds.length) {
      setStatusMessage(text.messages.noDoneJobs);
      return;
    }

    window.open(`/api/download-zip?jobIds=${completedIds.join(',')}`, '_blank');
  };

  const onOptionChange = (presetId: PresetId, key: string, value: unknown) => {
    setOptionValues((prev) => ({
      ...prev,
      [presetId]: { ...(prev[presetId] || {}), [key]: value },
    }));
  };

  const headerStats = [
    { label: text.status.waiting, value: waitingCount, tone: 'from-amber-500/35 to-amber-500/10' },
    { label: text.status.processing, value: processingCount, tone: 'from-sky-500/35 to-sky-500/10' },
    { label: text.status.done, value: doneCount, tone: 'from-emerald-500/35 to-emerald-500/10' },
    { label: text.status.failed, value: failedCount, tone: 'from-rose-500/35 to-rose-500/10' },
  ];

  return (
    <div className="min-h-screen text-zinc-100">
      <div className="mx-auto grid max-w-[1440px] gap-4 px-4 py-5 lg:grid-cols-[300px_1fr_360px]">
        <aside className="rounded-2xl border border-white/10 bg-zinc-900/72 p-4 shadow-[0_20px_70px_rgba(0,0,0,0.45)] backdrop-blur-xl">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-[0.16em] text-zinc-400">{text.presets}</p>
              <h2 className="text-lg font-semibold text-zinc-50">{text.presetLibrary}</h2>
            </div>
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="rounded-lg border border-white/15 bg-white/5 px-3 py-1 text-xs text-zinc-200 transition hover:border-white/30 hover:bg-white/10"
            >
              {text.settings}
            </button>
          </div>

          <label className="mb-3 block">
            <span className="sr-only">{text.searchPresets}</span>
            <input
              value={presetQuery}
              onChange={(event) => setPresetQuery(event.target.value)}
              placeholder={text.searchPresets}
              className="w-full rounded-xl border border-white/15 bg-black/25 px-3 py-2 text-sm text-zinc-100 outline-none transition placeholder:text-zinc-500 focus:border-cyan-400/60"
            />
          </label>

          <div className="mb-3 grid grid-cols-4 gap-1.5">
            {(['all', 'documents', 'pdf', 'images'] as PresetFilter[]).map((item) => (
              <button
                key={item}
                onClick={() => setPresetFilter(item)}
                className={`rounded-lg px-2 py-1.5 text-[11px] font-medium transition ${
                  presetFilter === item
                    ? 'border border-cyan-400/60 bg-cyan-500/15 text-cyan-100'
                    : 'border border-white/10 bg-white/[0.02] text-zinc-300 hover:border-white/25'
                }`}
              >
                {text.categories[item]}
              </button>
            ))}
          </div>

          <p className="mb-2 text-[11px] uppercase tracking-wide text-zinc-500">
            {text.favoritePresets}: {favoritePresets.length}
          </p>

          <div className="space-y-2">
            {filteredPresets.length === 0 && (
              <p className="rounded-xl border border-white/10 bg-black/20 px-3 py-3 text-xs text-zinc-400">
                {text.messages.noPresetResults}
              </p>
            )}

            {filteredPresets.map((preset) => {
              const copy = readPresetCopy(preset, language);
              const active = preset.id === selectedPreset;
              const isFavorite = favoriteSet.has(preset.id);

              return (
                <div
                  key={preset.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => setSelectedPreset(preset.id)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      setSelectedPreset(preset.id);
                    }
                  }}
                  className={`w-full cursor-pointer rounded-xl border px-3 py-3 text-left transition ${
                    active
                      ? 'border-cyan-400/70 bg-gradient-to-br from-cyan-500/18 to-blue-500/8 shadow-[0_0_0_1px_rgba(34,211,238,0.35)]'
                      : 'border-white/10 bg-white/[0.03] hover:border-white/25 hover:bg-white/[0.06]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 text-left">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm font-medium text-zinc-100">{preset.title}</span>
                        {preset.pinned && (
                          <span className="rounded-full border border-amber-300/40 bg-amber-400/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-100">
                            {text.pinned}
                          </span>
                        )}
                        {isFavorite && (
                          <span className="rounded-full border border-cyan-300/40 bg-cyan-400/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-cyan-100">
                            {text.favorite}
                          </span>
                        )}
                        {preset.badge && (
                          <span className="rounded-full border border-rose-300/40 bg-rose-400/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-rose-100">
                            {preset.badge}
                          </span>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={(event) => {
                        event.stopPropagation();
                        toggleFavoritePreset(preset.id);
                      }}
                      aria-label={isFavorite ? text.unfavorite : text.favorite}
                      className={`rounded-md border px-2 py-1 text-xs transition ${
                        isFavorite
                          ? 'border-cyan-300/40 bg-cyan-500/15 text-cyan-100'
                          : 'border-white/15 bg-white/[0.03] text-zinc-300 hover:border-white/30'
                      }`}
                    >
                      ★
                    </button>
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-zinc-300">{copy.description}</p>
                  {copy.warning && (
                    <p className="mt-1 text-xs text-amber-200/90">
                      {text.warning}: {copy.warning}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </aside>

        <main className="space-y-4">
          <header className="rounded-2xl border border-white/10 bg-zinc-900/68 p-4 shadow-[0_20px_70px_rgba(0,0,0,0.4)] backdrop-blur-xl">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] text-cyan-300">{text.appName}</p>
                <h1 className="mt-1 text-2xl font-semibold text-zinc-50">{text.workspace}</h1>
                <p className="mt-1 text-sm text-zinc-300">{text.lead}</p>
                <p className="mt-1 text-[11px] text-zinc-500">{text.shortcutsHint}</p>
              </div>

              <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto">
                <button
                  onClick={startConversion}
                  disabled={isUploading || !uploads.length}
                  className="inline-flex flex-1 items-center justify-center rounded-xl bg-gradient-to-r from-cyan-400 to-teal-400 px-4 py-2 text-sm font-semibold text-zinc-950 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50 sm:flex-none"
                >
                  {text.convert}
                </button>
                <button
                  onClick={clearUploads}
                  className="inline-flex flex-1 items-center justify-center rounded-xl border border-white/20 bg-white/[0.03] px-4 py-2 text-sm font-medium text-zinc-200 transition hover:border-white/35 hover:bg-white/[0.08] sm:flex-none"
                >
                  {text.clear}
                </button>
                <button
                  onClick={() => setIsDetailsOpen(true)}
                  className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/[0.03] px-4 py-2 text-sm font-medium text-zinc-200 transition hover:border-white/35 hover:bg-white/[0.08] lg:hidden"
                >
                  {text.details}
                </button>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-4">
              {headerStats.map((item) => (
                <div key={item.label} className={`rounded-xl border border-white/10 bg-gradient-to-br ${item.tone} p-3`}>
                  <p className="text-[11px] uppercase tracking-wide text-zinc-300">{item.label}</p>
                  <p className="mt-1 text-xl font-semibold text-zinc-50">{item.value}</p>
                </div>
              ))}
            </div>
          </header>

          <section
            className={`rounded-2xl border-2 border-dashed p-8 transition ${
              isDragging
                ? 'border-cyan-400/80 bg-cyan-500/10'
                : 'border-white/15 bg-zinc-900/66 hover:border-white/30'
            }`}
            onClick={() => fileInputRef.current?.click()}
            onDragEnter={(event) => {
              event.preventDefault();
              setIsDragging(true);
            }}
            onDragOver={(event) => event.preventDefault()}
            onDragLeave={(event) => {
              event.preventDefault();
              if (event.currentTarget.contains(event.relatedTarget as Node)) return;
              setIsDragging(false);
            }}
            onDrop={(event) => {
              event.preventDefault();
              setIsDragging(false);
              handleFiles(Array.from(event.dataTransfer.files || []));
            }}
          >
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept={selectedPresetDef.accepts.join(',')}
              className="hidden"
              onChange={(event) => handleFiles(Array.from(event.target.files || []))}
            />
            <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
              <div className="mb-3 rounded-2xl border border-white/15 bg-white/[0.03] px-4 py-2 text-xs font-semibold tracking-[0.14em] text-cyan-200">
                DROPZONE
              </div>
              <h2 className="text-xl font-semibold text-zinc-50">{text.dropTitle}</h2>
              <p className="mt-2 text-sm text-zinc-300">
                {selectedPresetDef.title} - {text.supported}: {selectedPresetDef.accepts.join(', ')}
              </p>
              {statusMessage && <p className="mt-3 text-xs text-zinc-400">{statusMessage}</p>}
            </div>
          </section>

          <section className="rounded-2xl border border-white/10 bg-zinc-900/66 p-4 shadow-[0_20px_70px_rgba(0,0,0,0.35)] backdrop-blur-xl">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-base font-semibold text-zinc-50">{text.uploadQueue}</h3>
              <span className="text-xs text-zinc-400">
                {uploads.length} {text.files}
              </span>
            </div>

            {!uploads.length ? (
              <p className="text-sm text-zinc-400">{text.uploadQueueEmpty}</p>
            ) : (
              <ul className="space-y-2">
                {uploads.map((file) => (
                  <li
                    key={file.id}
                    draggable
                    onDragStart={() => setDraggingId(file.id)}
                    onDragOver={(event) => {
                      event.preventDefault();
                      if (draggingId && draggingId !== file.id) {
                        reorderUploads(draggingId, file.id);
                      }
                    }}
                    onDrop={() => setDraggingId(null)}
                    className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-black/20 px-3 py-2"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="text-zinc-500">⋮⋮</div>
                      <div className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-1 text-[10px] font-semibold uppercase text-zinc-300">
                        {file.ext.replace('.', '') || 'file'}
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-sm text-zinc-100">{file.name}</p>
                        <p className="text-xs text-zinc-400">{formatBytes(file.size)}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => setUploads((prev) => prev.filter((item) => item.id !== file.id))}
                      className="text-xs text-zinc-300 underline underline-offset-4 transition hover:text-white"
                    >
                      {text.remove}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className="rounded-2xl border border-white/10 bg-zinc-900/66 p-4 shadow-[0_20px_70px_rgba(0,0,0,0.35)] backdrop-blur-xl">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-base font-semibold text-zinc-50">{text.jobQueue}</h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={retryFailedJobs}
                  className="rounded-lg border border-white/15 bg-white/[0.03] px-2.5 py-1 text-[11px] text-zinc-200 hover:bg-white/[0.08]"
                >
                  {text.retryFailed}
                </button>
                <button
                  onClick={removeDoneJobs}
                  className="rounded-lg border border-white/15 bg-white/[0.03] px-2.5 py-1 text-[11px] text-zinc-200 hover:bg-white/[0.08]"
                >
                  {text.removeDone}
                </button>
                <button
                  onClick={clearAllJobs}
                  className="rounded-lg border border-white/15 bg-white/[0.03] px-2.5 py-1 text-[11px] text-zinc-200 hover:bg-white/[0.08]"
                >
                  {text.clearAllJobs}
                </button>
              </div>
            </div>

            <div className="mb-3 flex flex-wrap items-center gap-1.5">
              <span className="mr-1 text-[11px] uppercase tracking-wide text-zinc-500">{text.jobFilter}</span>
              {(['all', 'waiting', 'processing', 'done', 'failed'] as JobFilter[]).map((item) => (
                <button
                  key={item}
                  onClick={() => setJobFilter(item)}
                  className={`rounded-lg px-2 py-1 text-[11px] transition ${
                    jobFilter === item
                      ? 'border border-cyan-400/60 bg-cyan-500/15 text-cyan-100'
                      : 'border border-white/12 bg-white/[0.02] text-zinc-300 hover:border-white/30'
                  }`}
                >
                  {text.jobFilters[item]}
                </button>
              ))}
            </div>

            {!visibleJobs.length ? (
              <p className="text-sm text-zinc-400">{jobs.length === 0 ? text.jobQueueEmpty : text.messages.noJobsForFilter}</p>
            ) : (
              <div className="space-y-2">
                {visibleJobs.map((job) => (
                  <article key={job.id} className="rounded-xl border border-white/10 bg-black/20 p-3">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-zinc-100">{presetMap[job.presetId]?.title || job.presetId}</p>
                        <p className="truncate text-xs text-zinc-400">
                          {text.inputs}: {job.inputFiles.map((file) => file.originalName).join(', ')}
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold tracking-wide ${statusStyles[job.status]}`}
                        >
                          {text.status[job.status]}
                        </span>
                        <button
                          onClick={() => setLogsJob(job)}
                          className="rounded-lg border border-white/15 bg-white/[0.03] px-2 py-1 text-[11px] text-zinc-200 hover:bg-white/[0.08]"
                        >
                          {text.logs}
                        </button>
                        {job.status === 'failed' && (
                          <button
                            onClick={() => handleRetry(job.id)}
                            className="rounded-lg border border-white/15 bg-white/[0.03] px-2 py-1 text-[11px] text-zinc-200 hover:bg-white/[0.08]"
                          >
                            {text.retry}
                          </button>
                        )}
                        <button
                          onClick={() => handleRemoveJob(job.id)}
                          className="rounded-lg border border-white/15 bg-white/[0.03] px-2 py-1 text-[11px] text-zinc-200 hover:bg-white/[0.08]"
                        >
                          {text.remove}
                        </button>
                      </div>
                    </div>

                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-zinc-800">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all"
                        style={{ width: `${job.progress || (job.status === 'done' ? 100 : 8)}%` }}
                      />
                    </div>

                    {job.outputFiles.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {job.outputFiles.map((output) => (
                          <button
                            key={output.name}
                            onClick={() => handleDownload(job, output)}
                            className="rounded-lg border border-cyan-400/40 bg-cyan-500/10 px-2.5 py-1 text-[11px] text-cyan-100 transition hover:bg-cyan-500/20"
                          >
                            {text.download} {output.name}
                          </button>
                        ))}
                      </div>
                    )}

                    {job.error && (
                      <p className="mt-2 text-xs text-rose-200">
                        {text.warning}: {job.error}
                      </p>
                    )}
                  </article>
                ))}
              </div>
            )}
          </section>
        </main>

        <aside
          className={`rounded-2xl border border-white/10 bg-zinc-900/74 p-4 shadow-[0_20px_70px_rgba(0,0,0,0.4)] backdrop-blur-xl ${
            isDetailsOpen ? 'fixed inset-0 z-40 overflow-y-auto bg-zinc-950/95 p-4' : 'hidden lg:block'
          }`}
        >
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-base font-semibold text-zinc-50">{text.details}</h3>
            {isDetailsOpen && (
              <button
                onClick={() => setIsDetailsOpen(false)}
                className="rounded-lg border border-white/15 bg-white/[0.03] px-3 py-1 text-xs text-zinc-200"
              >
                {text.close}
              </button>
            )}
          </div>

          <section className="mb-3 rounded-xl border border-white/10 bg-black/20 p-3">
            <p className="text-xs uppercase tracking-[0.1em] text-zinc-400">{text.queueOverview}</p>
            <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
              <div className="rounded-lg border border-white/10 bg-white/[0.02] p-2">
                <p className="text-zinc-400">{text.totalInput}</p>
                <p className="mt-1 text-sm font-semibold text-zinc-100">{formatBytes(totalInputSize)}</p>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/[0.02] p-2">
                <p className="text-zinc-400">{text.totalOutput}</p>
                <p className="mt-1 text-sm font-semibold text-zinc-100">{formatBytes(totalOutputSize)}</p>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/[0.02] p-2">
                <p className="text-zinc-400">{text.compression}</p>
                <p className="mt-1 text-sm font-semibold text-zinc-100">
                  {totalInputSize > 0 ? `${((1 - totalOutputSize / totalInputSize) * 100).toFixed(1)}%` : '-'}
                </p>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/[0.02] p-2">
                <p className="text-zinc-400">{text.avgDuration}</p>
                <p className="mt-1 text-sm font-semibold text-zinc-100">{formatDuration(averageDoneDuration)}</p>
              </div>
            </div>
          </section>

          <section className="mb-3 rounded-xl border border-white/10 bg-black/20 p-3">
            <p className="text-xs uppercase tracking-[0.1em] text-zinc-400">{text.quickActions}</p>
            <div className="mt-2 grid grid-cols-1 gap-2">
              <button
                onClick={retryFailedJobs}
                className="rounded-lg border border-white/15 bg-white/[0.03] px-3 py-2 text-xs text-zinc-200 transition hover:bg-white/[0.08]"
              >
                {text.retryFailed}
              </button>
              <button
                onClick={removeDoneJobs}
                className="rounded-lg border border-white/15 bg-white/[0.03] px-3 py-2 text-xs text-zinc-200 transition hover:bg-white/[0.08]"
              >
                {text.removeDone}
              </button>
            </div>
          </section>

          <PresetOptions
            preset={selectedPresetDef}
            values={optionValues[selectedPreset]}
            onChange={(key, value) => onOptionChange(selectedPreset, key, value)}
            title={text.options}
            language={language}
          />

          <section className="mt-3 rounded-xl border border-white/10 bg-black/20 p-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-zinc-100">{text.outputs}</p>
              <button
                onClick={downloadAllAsZip}
                className="rounded-lg border border-cyan-400/40 bg-cyan-500/10 px-2.5 py-1 text-[11px] text-cyan-100 transition hover:bg-cyan-500/20"
              >
                {text.downloadAll}
              </button>
            </div>

            <div className="mt-2 space-y-2">
              {doneJobs.map((job) => (
                <div key={job.id} className="rounded-lg border border-white/10 bg-white/[0.02] p-2">
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-xs font-medium text-zinc-200">
                      {presetMap[job.presetId]?.title || job.presetId}
                    </p>
                    <button
                      onClick={() => handleDownload(job)}
                      className="text-[11px] text-cyan-200 underline underline-offset-4"
                    >
                      {text.download}
                    </button>
                  </div>
                  <p className="mt-1 text-[11px] text-zinc-400">
                    {job.outputFiles.length} {text.files} - {formatBytes(job.outputFiles.reduce((sum, file) => sum + file.size, 0))}
                  </p>
                </div>
              ))}
            </div>

            {doneJobs.length === 0 && <p className="mt-2 text-sm text-zinc-400">{text.noOutputs}</p>}
          </section>
        </aside>
      </div>

      {isSettingsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-zinc-900 p-5 shadow-2xl">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-zinc-50">{text.settings}</h3>
              <button
                onClick={() => setIsSettingsOpen(false)}
                className="rounded-lg border border-white/15 bg-white/[0.03] px-3 py-1 text-xs text-zinc-200"
              >
                {text.close}
              </button>
            </div>

            <div className="space-y-3">
              <div className="rounded-lg border border-white/10 bg-black/20 p-3">
                <label className="block text-xs font-semibold uppercase tracking-wide text-zinc-300">{text.language}</label>
                <select
                  value={language}
                  onChange={(event) => setLanguage(event.target.value as Language)}
                  className="mt-2 w-full rounded-lg border border-white/20 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 outline-none transition focus:border-cyan-400/60"
                >
                  <option value="tr">Türkçe</option>
                  <option value="en">English</option>
                </select>
              </div>

              <div className="rounded-lg border border-white/10 bg-black/20 p-3">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-zinc-100">{text.autoZip}</p>
                    <p className="text-xs text-zinc-400">{text.autoZipDesc}</p>
                  </div>
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input
                      type="checkbox"
                      checked={autoZip}
                      onChange={(event) => setAutoZip(event.target.checked)}
                      className="peer sr-only"
                    />
                    <span className="h-6 w-11 rounded-full bg-zinc-700 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all peer-checked:bg-cyan-500 peer-checked:after:translate-x-full" />
                  </label>
                </div>
              </div>

              <div className="rounded-lg border border-white/10 bg-black/20 p-3">
                <label className="block text-sm font-medium text-zinc-100">{text.ttl}</label>
                <p className="mt-1 text-xs text-zinc-400">{text.ttlDesc}</p>
                <input
                  type="number"
                  min={5}
                  max={240}
                  value={ttlMinutes}
                  onChange={(event) => {
                    const next = Number(event.target.value) || 10;
                    setTtlMinutes(Math.min(240, Math.max(5, next)));
                  }}
                  className="mt-2 w-24 rounded-lg border border-white/20 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 outline-none transition focus:border-cyan-400/60"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {logsJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">
          <div className="w-full max-w-3xl rounded-2xl border border-white/10 bg-zinc-900 p-5 shadow-2xl">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-zinc-50">{text.logs}</h3>
              <button
                onClick={() => setLogsJob(null)}
                className="rounded-lg border border-white/15 bg-white/[0.03] px-3 py-1 text-xs text-zinc-200"
              >
                {text.close}
              </button>
            </div>

            <div className="max-h-[60vh] space-y-2 overflow-y-auto rounded-xl border border-white/10 bg-black/30 p-3">
              {logsJob.logs.length === 0 ? (
                <p className="text-sm text-zinc-400">{text.messages.noLogs}</p>
              ) : (
                logsJob.logs.map((line, index) => (
                  <div key={`${line.ts}-${index}`} className="flex items-start gap-2 text-xs text-zinc-300">
                    <span className="min-w-[72px] text-zinc-500">{new Date(line.ts).toLocaleTimeString()}</span>
                    <span
                      className={`rounded border px-2 py-0.5 text-[10px] font-semibold ${
                        line.level === 'error'
                          ? 'border-rose-400/40 bg-rose-500/10 text-rose-100'
                          : 'border-zinc-400/30 bg-zinc-500/10 text-zinc-100'
                      }`}
                    >
                      {line.level}
                    </span>
                    <span className="flex-1 break-words">{line.message}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function readPresetCopy(preset: PresetDefinition, language: Language) {
  if (language === 'en') {
    const en = presetDescriptionEn[preset.id];
    return {
      description: en?.description || preset.description,
      warning: en?.warning || preset.warning,
    };
  }

  return {
    description: preset.description,
    warning: preset.warning,
  };
}

function localizeOption(presetId: PresetId, option: PresetOption, language: Language): PresetOption {
  if (language !== 'en') {
    return option;
  }

  const locale = optionLocaleEn[presetId]?.[option.key];
  if (!locale) return option;

  return {
    ...option,
    label: locale.label || option.label,
    description: locale.description || option.description,
    placeholder: locale.placeholder || option.placeholder,
    options: option.options?.map((item) => ({
      ...item,
      label: locale.choices?.[String(item.value)] || item.label,
    })),
  };
}

function PresetOptions({
  preset,
  values,
  onChange,
  title,
  language,
}: {
  preset: PresetDefinition;
  values: Record<string, unknown>;
  onChange: (key: string, value: unknown) => void;
  title: string;
  language: Language;
}) {
  if (!preset.options || preset.options.length === 0) {
    return null;
  }

  return (
    <section className="rounded-xl border border-white/10 bg-black/20 p-3">
      <h4 className="text-sm font-semibold text-zinc-100">{title}</h4>
      <div className="mt-3 space-y-3">
        {preset.options.map((option) => {
          const item = localizeOption(preset.id, option, language);

          return (
            <div key={item.key}>
              <label className="mb-1 block text-xs font-medium text-zinc-300">{item.label}</label>

              {item.type === 'select' && (
                <select
                  value={(values?.[item.key] as string) ?? ''}
                  onChange={(event) => onChange(item.key, event.target.value)}
                  className="w-full rounded-lg border border-white/20 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 outline-none transition focus:border-cyan-400/60"
                >
                  {(item.options || []).map((choice) => (
                    <option key={choice.value} value={choice.value}>
                      {choice.label}
                    </option>
                  ))}
                </select>
              )}

              {item.type === 'boolean' && (
                <label className="inline-flex items-center gap-2 text-sm text-zinc-200">
                  <input
                    type="checkbox"
                    checked={Boolean(values?.[item.key])}
                    onChange={(event) => onChange(item.key, event.target.checked)}
                  />
                  <span>{item.description || item.label}</span>
                </label>
              )}

              {(item.type === 'number' || item.type === 'text') && (
                <input
                  type={item.type === 'number' ? 'number' : 'text'}
                  value={(values?.[item.key] as string | number | undefined) ?? ''}
                  onChange={(event) =>
                    onChange(item.key, item.type === 'number' ? Number(event.target.value) : event.target.value)
                  }
                  min={item.min}
                  max={item.max}
                  step={item.step}
                  placeholder={item.placeholder}
                  className="w-full rounded-lg border border-white/20 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 outline-none transition focus:border-cyan-400/60"
                />
              )}

              {item.description && item.type !== 'boolean' && <p className="mt-1 text-xs text-zinc-400">{item.description}</p>}
            </div>
          );
        })}
      </div>
    </section>
  );
}
