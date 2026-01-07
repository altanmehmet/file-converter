'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { PRESETS } from '@/lib/presets';
import type { Job, OutputFile, PresetDefinition, PresetId } from '@/lib/types';

type UploadItem = {
  id: string;
  name: string;
  size: number;
  ext: string;
  mimeType: string;
};

type ClientJob = Job & { outputFiles: (OutputFile & { downloadUrl?: string })[] };
type UploadResponse = {
  id: string;
  name: string;
  size: number;
  ext: string;
  mimeType: string;
};

type Language = 'tr' | 'en';

type Copy = {
  presetsLabel: string;
  presetSectionTitle: string;
  settings: string;
  workspaceTitle: string;
  workspaceLead: string;
  convert: string;
  clear: string;
  dropTitle: string;
  supported: string;
  fileQueueTitle: string;
  fileQueueEmpty: string;
  fileWord: string;
  jobWord: string;
  remove: string;
  jobQueueTitle: string;
  jobQueueDetails: string;
  jobQueueEmpty: string;
  inputs: string;
  logs: string;
  retry: string;
  download: string;
  error: string;
  settingsOutputs: string;
  close: string;
  autoZipTitle: string;
  autoZipDesc: string;
  ttlTitle: string;
  ttlDesc: string;
  outputsTitle: string;
  outputsEmpty: string;
  downloadAll: string;
  totalLinePrefix: string;
  totalLineOutput: string;
  settingsModalTitle: string;
  settingsModalTTL: string;
  settingsModalTTLDesc: string;
  settingsModalAutoZipDesc: string;
  logsTitle: string;
  logsEmpty: string;
  presetOptionsTitle: string;
  presetBooleanLabel: string;
  presetOptionLabels: {
    quality: string;
    format: string;
    ranges: string;
    every: string;
    maxWidth: string;
    stripMetadata: string;
  };
  presetOptionDescriptions: {
    ranges: string;
    every: string;
  };
  presetOptionValues: {
    levelLow: string;
    levelMedium: string;
    levelHigh: string;
  };
  pinned: string;
  warningPrefix: string;
  languageLabel: string;
  languageDesc: string;
  languageOptionTr: string;
  languageOptionEn: string;
  outputWord: string;
  cookieBannerTitle: string;
  cookieBannerText: string;
  cookieBannerAccept: string;
  cookieBannerReject: string;
  cookieBannerLearnMore: string;
  statusLabels: Record<Job['status'], string>;
  presetCopy?: Partial<Record<PresetId, { description?: string; warning?: string }>>;
  messages: {
    noValid: string;
    uploading: string;
    uploadError: string;
    uploadUnexpected: string;
    filesAdded: string;
    addFilesFirst: string;
    needMore: string;
    queueing: string;
    queued: string;
    queuedAuto: string;
    processError: string;
    cleared: string;
    noneToDownload: string;
    convertError: string;
  };
};

const translations: Record<Language, Copy> = {
  tr: {
    presetsLabel: 'Ön Ayarlar',
    presetSectionTitle: 'İşlem Setleri',
    settings: 'Ayarlar',
    workspaceTitle: 'Çalışma Alanı',
    workspaceLead: 'Sürükle-bırak ile dosya ekle, ön ayar seç ve kuyruğu çalıştır.',
    convert: 'Çevir',
    clear: 'Temizle',
    dropTitle: 'Sürükle-bırak ya da tıkla',
    supported: 'Desteklenen',
    fileQueueTitle: 'Dosya Kuyruğu',
    fileQueueEmpty: 'Henüz yükleme yok.',
    fileWord: 'dosya',
    jobWord: 'iş',
    remove: 'Kaldır',
    jobQueueTitle: 'İş Kuyruğu',
    jobQueueDetails: 'Ayrıntılar',
    jobQueueEmpty: 'Kuyruk boş.',
    inputs: 'Girdiler',
    logs: 'Günlükler',
    retry: 'Tekrar dene',
    download: 'İndir',
    error: 'Hata',
    settingsOutputs: 'Ayarlar & Çıktılar',
    close: 'Kapat',
    autoZipTitle: 'Otomatik ZIP',
    autoZipDesc: 'İşler bittiğinde ZIP indir.',
    ttlTitle: 'Geçici TTL',
    ttlDesc: 'Otomatik temizlik (dakika)',
    outputsTitle: 'Çıktılar',
    outputsEmpty: 'Henüz çıktı yok.',
    downloadAll: 'Hepsini ZIP indir',
    totalLinePrefix: 'Toplam Girdi',
    totalLineOutput: 'Çıktı',
    settingsModalTitle: 'Ayarlar',
    settingsModalTTL: 'TTL (dakika)',
    settingsModalTTLDesc: 'Varsayılan 10 dakika',
    settingsModalAutoZipDesc: 'İşler bitince otomatik ZIP indirme.',
    logsTitle: 'Günlükler',
    logsEmpty: 'Günlük yok.',
    presetOptionsTitle: 'Ön Ayar Ayarları',
    presetBooleanLabel: 'Aktif',
    presetOptionLabels: {
      quality: 'Kalite',
      format: 'Biçim',
      ranges: 'Aralıklar',
      every: 'Her X sayfada böl',
      maxWidth: 'Maksimum Genişlik',
      stripMetadata: 'EXIF temizle',
    },
    presetOptionDescriptions: {
      ranges: 'Virgülle ayrılmış aralıklar. Boş bırakılırsa "Her X sayfada böl" seçeneği kullanılır.',
      every: '0 ise devre dışı.',
    },
    presetOptionValues: {
      levelLow: 'Low (daha küçük)',
      levelMedium: 'Medium',
      levelHigh: 'High (daha iyi kalite)',
    },
    pinned: 'Sabit',
    warningPrefix: 'Uyarı',
    languageLabel: 'Dil',
    languageDesc: 'Uygulama dilini seçin',
    languageOptionTr: 'Türkçe',
    languageOptionEn: 'English',
    outputWord: 'çıktı',
    cookieBannerTitle: 'Çerez Kullanımı',
    cookieBannerText: 'Bu web sitesi, deneyiminizi iyileştirmek için çerezler kullanır. Devam ederek çerez kullanımını kabul etmiş olursunuz.',
    cookieBannerAccept: 'Kabul Et',
    cookieBannerReject: 'Reddet',
    cookieBannerLearnMore: 'Daha Fazla Bilgi',
    statusLabels: {
      waiting: 'BEKLEME',
      processing: 'İŞLENİYOR',
      done: 'TAMAMLANDI',
      failed: 'HATA',
    },
    presetCopy: {
      doc_to_pdf: { description: 'DOC/DOCX dosyalarını yüksek kalitede PDF\'e dönüştürür.' },
      pdf_to_docx: {
        description: 'PDF\'yi düzenlenebilir DOCX\'e çevirir. Tarama PDF\'lerde bozulma olabilir.',
        warning: 'Tarama PDF\'lerde sonuç bozulabilir.',
      },
      pdf_compress: { description: 'PDF boyutunu Low / Medium / High seçenekleriyle sıkıştırır.' },
      pdf_merge: { description: 'Sürükle-bırak sıralaması ile PDF\'leri birleştirir.' },
      pdf_split: { description: 'Sayfa aralığı (1-3,5,7-9) veya her X sayfada böl.' },
      image_convert: { description: 'Kalite, maksimum genişlik ve EXIF temizleme seçenekleri ile görüntüleri WebP/PNG/JPG\'ye dönüştürür.' },
      excel_to_pdf: { description: 'XLS/XLSX dosyalarını yüksek kalitede PDF\'e dönüştürür.' },
    },
    messages: {
      noValid: 'Bu ön ayar için geçerli dosya yok.',
      uploading: 'Yükleniyor...',
      uploadError: 'Yükleme hatası',
      uploadUnexpected: 'Yükleme sırasında hata oluştu',
      filesAdded: 'dosya eklendi',
      addFilesFirst: 'Önce dosya ekleyin',
      needMore: 'Bu ön ayar için en az 2 dosya gerekli',
      queueing: 'Kuyruğa ekleniyor...',
      queued: 'İşler kuyruğa eklendi',
      queuedAuto: 'İşler kuyruğa eklendi. (Otomatik-zip açık)',
      processError: 'Beklenmeyen hata',
      cleared: 'Yüklenenler temizlendi',
      noneToDownload: 'İndirilecek tamamlanmış iş yok',
      convertError: 'İşleme alınmadı',
    },
  },
  en: {
    presetsLabel: 'Presets',
    presetSectionTitle: 'Preset Library',
    settings: 'Settings',
    workspaceTitle: 'Workspace',
    workspaceLead: 'Drag & drop files, pick a preset, run the queue.',
    convert: 'Convert',
    clear: 'Clear',
    dropTitle: 'Drag & drop or click',
    supported: 'Supported',
    fileQueueTitle: 'Upload Queue',
    fileQueueEmpty: 'No uploads yet.',
    fileWord: 'files',
    jobWord: 'jobs',
    remove: 'Remove',
    jobQueueTitle: 'Job Queue',
    jobQueueDetails: 'Details',
    jobQueueEmpty: 'Queue is empty.',
    inputs: 'Inputs',
    logs: 'Logs',
    retry: 'Retry',
    download: 'Download',
    error: 'Error',
    settingsOutputs: 'Settings & Outputs',
    close: 'Close',
    autoZipTitle: 'Auto Zip',
    autoZipDesc: 'Download ZIP when jobs finish.',
    ttlTitle: 'Temp TTL',
    ttlDesc: 'Auto cleanup (minutes)',
    outputsTitle: 'Outputs',
    outputsEmpty: 'No outputs yet.',
    downloadAll: 'Download all as ZIP',
    totalLinePrefix: 'Total Input',
    totalLineOutput: 'Output',
    settingsModalTitle: 'Settings',
    settingsModalTTL: 'TTL (minutes)',
    settingsModalTTLDesc: 'Default 10 minutes',
    settingsModalAutoZipDesc: 'Auto download ZIP when jobs complete.',
    logsTitle: 'Logs',
    logsEmpty: 'No logs.',
    presetOptionsTitle: 'Preset Options',
    presetBooleanLabel: 'Enabled',
    presetOptionLabels: {
      quality: 'Quality',
      format: 'Format',
      ranges: 'Ranges',
      every: 'Split every X pages',
      maxWidth: 'Maximum Width',
      stripMetadata: 'Strip EXIF',
    },
    presetOptionDescriptions: {
      ranges: 'Comma-separated ranges. If empty, "Split every X pages" option will be used.',
      every: 'Disabled if 0.',
    },
    presetOptionValues: {
      levelLow: 'Low (smaller)',
      levelMedium: 'Medium',
      levelHigh: 'High (better quality)',
    },
    pinned: 'Pinned',
    warningPrefix: 'Warning',
    languageLabel: 'Language',
    languageDesc: 'Select application language',
    languageOptionTr: 'Turkish',
    languageOptionEn: 'English',
    outputWord: 'output',
    cookieBannerTitle: 'Cookie Usage',
    cookieBannerText: 'This website uses cookies to enhance your experience. By continuing, you agree to our use of cookies.',
    cookieBannerAccept: 'Accept',
    cookieBannerReject: 'Reject',
    cookieBannerLearnMore: 'Learn More',
    statusLabels: {
      waiting: 'WAITING',
      processing: 'PROCESSING',
      done: 'DONE',
      failed: 'FAILED',
    },
    presetCopy: {
      doc_to_pdf: { description: 'Convert DOC/DOCX files to high-quality PDF.' },
      pdf_to_docx: {
        description: 'Convert PDF to editable DOCX. Scanned PDFs may degrade.',
        warning: 'Scanned PDFs may lose formatting.',
      },
      pdf_compress: { description: 'Compress PDF with Low / Medium / High settings.' },
      pdf_merge: { description: 'Merge PDFs in drag-and-drop order.' },
      pdf_split: { description: 'Split by ranges (1-3,5,7-9) or every X pages.' },
      image_convert: { description: 'Images to WebP/PNG/JPG with quality and resize options.' },
      excel_to_pdf: { description: 'Convert XLS/XLSX files to high-quality PDF.' },
    },
    messages: {
      noValid: 'No valid files for this preset.',
      uploading: 'Uploading...',
      uploadError: 'Upload failed',
      uploadUnexpected: 'Error while uploading',
      filesAdded: 'files added',
      addFilesFirst: 'Add files first',
      needMore: 'This preset needs at least 2 files',
      queueing: 'Queuing...',
      queued: 'Jobs queued',
      queuedAuto: 'Jobs queued (auto-zip on)',
      processError: 'Unexpected error',
      cleared: 'Uploads cleared',
      noneToDownload: 'No completed jobs to download',
      convertError: 'Could not start processing',
    },
  },
};

const formatBytes = (bytes: number) => {
  if (!bytes) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB'];
  const i = Math.min(units.length - 1, Math.floor(Math.log(bytes) / Math.log(1024)));
  const value = bytes / 1024 ** i;
  return `${value.toFixed(value >= 10 ? 0 : 1)} ${units[i]}`;
};

const statusStyles: Record<Job['status'], string> = {
  waiting: 'bg-amber-500/80 text-amber-50',
  processing: 'bg-sky-500/80 text-sky-50',
  done: 'bg-emerald-600 text-emerald-50',
  failed: 'bg-rose-600 text-rose-50',
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
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [autoZip, setAutoZip] = useState(false);
  const [ttlMinutes, setTtlMinutes] = useState(10);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [logsJob, setLogsJob] = useState<ClientJob | null>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [language, setLanguage] = useState<Language>('en');
  const [cookieConsent, setCookieConsent] = useState<boolean | null>(null);

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
  const presetMap = useMemo(() => Object.fromEntries(PRESETS.map((p) => [p.id, p])), []);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const selectedPresetDef = presetMap[selectedPreset] as PresetDefinition;
  const text = translations[language];

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('lb_lang') : null;
    if (stored === 'tr' || stored === 'en') {
      setLanguage(stored);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('lb_lang', language);
    }
  }, [language]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const consent = localStorage.getItem('cookie_consent');
      if (consent === 'accepted' || consent === 'rejected') {
        setCookieConsent(consent === 'accepted');
      } else {
        setCookieConsent(null);
      }
    }
  }, []);

  const handleCookieAccept = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cookie_consent', 'accepted');
      setCookieConsent(true);
    }
  };

  const handleCookieReject = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cookie_consent', 'rejected');
      setCookieConsent(false);
    }
  };


  const handleFiles = async (files: File[]) => {
    if (!files.length) return;

    const allowed = new Set(selectedPresetDef.accepts);
    const filtered = files.filter((file) => allowed.has(`.${file.name.split('.').pop()?.toLowerCase()}`));
    if (!filtered.length) {
      setStatusMessage(text.messages.noValid);
      return;
    }

    const formData = new FormData();
    filtered.forEach((file) => formData.append('files', file));

    try {
      setIsUploading(true);
      setStatusMessage(text.messages.uploading);
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const data = await res.json();
      if (!res.ok) {
        setStatusMessage(data.error || text.messages.uploadError);
        return;
      }

      const mapped: UploadItem[] =
        ((data.uploaded as UploadResponse[]) || []).map((f) => ({
          id: f.id,
          name: f.name,
          size: f.size,
          ext: f.ext,
          mimeType: f.mimeType,
        })) || [];

      setUploads((prev) => [...prev, ...mapped]);
      setStatusMessage(`${mapped.length} ${text.messages.filesAdded}`);
    } catch (err) {
      setStatusMessage(err instanceof Error ? err.message : text.messages.uploadUnexpected);
    } finally {
      setIsUploading(false);
      setIsDragging(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const onDropZoneClick = () => {
    fileInputRef.current?.click();
  };

  const startConversion = async () => {
    if (!uploads.length) {
      setStatusMessage(text.messages.addFilesFirst);
      return;
    }

    if (selectedPresetDef.requiresMultiple && uploads.length < 2) {
      setStatusMessage(text.messages.needMore);
      return;
    }

    try {
      setStatusMessage(text.messages.queueing);
      const res = await fetch('/api/convert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          presetId: selectedPreset,
          fileIds: uploads.map((u) => u.id),
          options: optionValues[selectedPreset],
          ttlMinutes,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatusMessage(data.error || text.messages.convertError);
        return;
      }

      const newJobs: ClientJob[] = (data.jobs || []).map(normalizeJob);
      setJobs((prev) => [...newJobs, ...prev]);
      if (autoZip) {
        setStatusMessage(text.messages.queuedAuto);
      } else {
        setStatusMessage(text.messages.queued);
      }
    } catch (err) {
      setStatusMessage(err instanceof Error ? err.message : text.messages.processError);
    }
  };

  const clearUploads = () => {
    setUploads([]);
    setStatusMessage(text.messages.cleared);
  };

  const handleRetry = async (jobId: string) => {
    await fetch(`/api/job/${jobId}/retry`, { method: 'POST' });
    fetchJob(jobId);
  };

  const handleRemoveJob = async (jobId: string) => {
    await fetch(`/api/job/${jobId}`, { method: 'DELETE' });
    setJobs((prev) => prev.filter((job) => job.id !== jobId));
  };

  const fetchJob = async (jobId: string) => {
    const res = await fetch(`/api/job/${jobId}`);
    if (!res.ok) return;
    const data = await res.json();
    if (data?.job) {
      setJobs((prev) => prev.map((job) => (job.id === jobId ? normalizeJob(data.job) : job)));
    }
  };

  useEffect(() => {
    const hasActive = jobs.some((job) => job.status === 'waiting' || job.status === 'processing');
    if (!hasActive) return;
    const timer = setInterval(() => {
      jobs.forEach((job) => fetchJob(job.id));
    }, 2000);
    return () => clearInterval(timer);
  }, [jobs]);

  const doneJobs = jobs.filter((job) => job.status === 'done');
  const totalInputSize = doneJobs.reduce(
    (sum, job) => sum + job.inputFiles.reduce((a, f) => a + (f.size || 0), 0),
    0,
  );
  const totalOutputSize = doneJobs.reduce(
    (sum, job) => sum + job.outputFiles.reduce((a, f) => a + (f.size || 0), 0),
    0,
  );

  const handleDownload = (job: ClientJob, file?: OutputFile & { downloadUrl?: string }) => {
    const url = file?.downloadUrl || `/api/download/${job.id}`;
    window.open(url, '_blank');
  };

  const downloadAllAsZip = () => {
    const ids = jobs.filter((j) => j.status === 'done').map((j) => j.id);
    if (!ids.length) {
      setStatusMessage(text.messages.noneToDownload);
      return;
    }
    window.open(`/api/download-zip?jobIds=${ids.join(',')}`, '_blank');
  };

  const onOptionChange = (presetId: PresetId, key: string, value: unknown) => {
    setOptionValues((prev) => ({
      ...prev,
      [presetId]: { ...(prev[presetId] || {}), [key]: value },
    }));
  };

  const reorderUploads = (sourceId: string, targetId: string) => {
    const next = [...uploads];
    const from = next.findIndex((u) => u.id === sourceId);
    const to = next.findIndex((u) => u.id === targetId);
    if (from === -1 || to === -1) return;
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    setUploads(next);
  };

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || (typeof window !== 'undefined' ? window.location.origin : 'https://quickconvert.com');
  
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Quick Convert',
    description: 'Free online file converter. Convert PDF, Word, Excel, Images and more. Fast, secure, and fully local processing.',
    url: siteUrl,
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    featureList: [
      'PDF to Word conversion',
      'Word to PDF conversion',
      'Excel to PDF conversion',
      'Image format conversion',
      'PDF compression',
      'PDF merging',
      'PDF splitting',
      'Batch file conversion',
    ],
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    softwareVersion: '1.0',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '1250',
    },
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-3 sm:px-4 py-4 sm:py-6 lg:grid lg:grid-cols-[260px_1fr_320px]">
        <header className="col-span-full mb-2">
          <h1 className="sr-only">Quick Convert - Fast & Free File Converter</h1>
        </header>
        <aside className="rounded-xl sm:rounded-2xl border border-slate-700/50 bg-slate-800/80 backdrop-blur-xl shadow-xl p-3 sm:p-4">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">{text.presetsLabel}</p>
              <h2 className="text-lg font-semibold">{text.presetSectionTitle}</h2>
            </div>
            <button
              className="rounded-lg border border-slate-600/60 bg-slate-700/60 px-3 py-1.5 text-xs text-slate-200 hover:border-slate-500 hover:bg-slate-700 transition-all"
              onClick={() => setIsSettingsOpen(true)}
            >
              ⚙️ {text.settings}
            </button>
          </div>
          <div className="flex flex-col gap-2">
            {PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => setSelectedPreset(preset.id)}
                className={`w-full rounded-lg border px-3 py-3 text-left transition-all ${
                  preset.id === selectedPreset
                    ? 'border-sky-500/50 bg-slate-800/90 shadow-md'
                    : 'border-slate-700/60 bg-slate-800/60 hover:border-slate-600 hover:bg-slate-800/80'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold">{preset.title}</span>
                  {preset.pinned && (
                    <span className="rounded-full bg-amber-400/20 px-2 text-[11px] font-semibold text-amber-200">
                      {text.pinned}
                    </span>
                  )}
                  {preset.badge && (
                    <span className="rounded-full bg-rose-500/20 px-2 text-[11px] font-semibold text-rose-100">
                      {preset.badge}
                    </span>
                  )}
                </div>
                {(() => {
                  const override = text.presetCopy?.[preset.id];
                  const description = override?.description ?? preset.description;
                  const warning = override?.warning ?? preset.warning;
                  return (
                    <>
                      <p className="mt-1 text-xs text-slate-300">{description}</p>
                      {warning && (
                        <p className="mt-1 text-xs text-amber-200/90">
                          {text.warningPrefix}: {warning}
                        </p>
                      )}
                    </>
                  );
                })()}
              </button>
            ))}
          </div>
        </aside>

        <main className="flex flex-col gap-4">
          <header className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center justify-between gap-3">
            <div className="flex-1 min-w-0">
              <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-sky-400 font-bold">Quick Convert</p>
              <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-sky-400 to-purple-400 bg-clip-text text-transparent break-words">{text.workspaceTitle}</h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">{text.workspaceLead}</p>
              <div className="flex flex-wrap gap-2 sm:gap-4 mt-2 text-[10px] sm:text-xs text-slate-400">
                <a href="/privacy" className="hover:text-slate-200 underline">Privacy</a>
                <a href="/terms" className="hover:text-slate-200 underline">Terms</a>
              </div>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={startConversion}
                className="flex-1 sm:flex-none rounded-lg bg-sky-600 px-4 py-2.5 sm:py-2 text-sm font-semibold text-white transition-all hover:bg-sky-500 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-sky-600 touch-manipulation"
                disabled={isUploading || !uploads.length}
              >
                {text.convert}
              </button>
              <button
                onClick={clearUploads}
                className="flex-1 sm:flex-none rounded-lg border border-slate-600/60 bg-slate-800/60 px-3 py-2.5 sm:py-2 text-sm font-semibold text-slate-200 hover:border-slate-500 hover:bg-slate-800 transition-all touch-manipulation"
              >
                {text.clear}
              </button>
            </div>
          </header>

          <section
            onDragEnter={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragging(false);
              const files = Array.from(e.dataTransfer.files || []);
              handleFiles(files);
            }}
            className={`relative flex cursor-pointer flex-col items-center justify-center gap-3 sm:gap-4 rounded-lg border-2 border-dashed p-6 sm:p-8 transition-all touch-manipulation ${
              isDragging 
                ? 'border-sky-500 bg-slate-800/90 scale-[1.01]' 
                : 'border-slate-700/60 bg-slate-800/60 hover:border-slate-600 hover:bg-slate-800/80'
            }`}
            onClick={onDropZoneClick}
          >
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept={selectedPresetDef.accepts.join(',')}
              className="hidden"
              onChange={(e) => handleFiles(Array.from(e.target.files || []))}
            />
            <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-slate-700/60 border border-slate-600/60 text-2xl">
              📁
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold">{text.dropTitle}</p>
              <p className="text-sm text-slate-300">
                {selectedPresetDef.title} - {text.supported}: {selectedPresetDef.accepts.join(', ')}
              </p>
            </div>
            {statusMessage && <p className="text-xs text-slate-300">{statusMessage}</p>}
          </section>


          <section className="rounded-xl sm:rounded-2xl border border-slate-700/50 bg-slate-800/80 backdrop-blur-xl shadow-xl p-3 sm:p-4">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-base sm:text-lg font-semibold">{text.fileQueueTitle}</h3>
              <span className="text-sm text-slate-300">
                {uploads.length} {text.fileWord}
              </span>
            </div>
            {!uploads.length ? (
              <p className="text-sm text-slate-400">{text.fileQueueEmpty}</p>
            ) : (
              <ul className="flex flex-col gap-2">
                {uploads.map((file) => (
                  <li
                    key={file.id}
                    draggable
                    onDragStart={() => setDraggingId(file.id)}
                    onDragOver={(e) => {
                      e.preventDefault();
                      if (draggingId && draggingId !== file.id) reorderUploads(draggingId, file.id);
                    }}
                    onDrop={() => setDraggingId(null)}
                    className="flex items-center justify-between gap-3 rounded-xl border border-slate-600/50 bg-slate-700/50 px-3 py-2 hover:bg-slate-700/70 hover:border-slate-500 transition-all shadow-md"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-700/60 border border-slate-600/60 text-xs font-bold uppercase text-slate-300">
                        {file.ext.replace('.', '') || '📄'}
                      </div>
                      <div>
                        <p className="text-sm font-semibold">{file.name}</p>
                        <p className="text-xs text-slate-400">{formatBytes(file.size)}</p>
                      </div>
                    </div>
                    <button
                      className="text-xs text-slate-300 underline underline-offset-4"
                      onClick={() => setUploads((prev) => prev.filter((f) => f.id !== file.id))}
                    >
                      {text.remove}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className="rounded-xl sm:rounded-2xl border border-slate-700/50 bg-slate-800/80 backdrop-blur-xl shadow-xl p-3 sm:p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base sm:text-lg font-semibold">{text.jobQueueTitle}</h3>
              <button
                className="rounded-lg border border-white/10 px-3 py-1 text-xs text-white hover:border-white/30 hover:bg-white/10 lg:hidden"
                onClick={() => setIsDetailsOpen(true)}
              >
                {text.jobQueueDetails}
              </button>
            </div>
            {!jobs.length ? (
              <p className="text-sm text-slate-400">{text.jobQueueEmpty}</p>
            ) : (
              <div className="flex flex-col gap-2">
                {jobs.map((job) => (
                  <div key={job.id} className="rounded-xl border border-slate-600/50 bg-slate-700/50 p-3 shadow-md hover:shadow-lg transition-all">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <p className="text-sm font-semibold">{presetMap[job.presetId]?.title || job.presetId}</p>
                        <p className="text-xs text-slate-400">
                          {text.inputs}: {job.inputFiles.map((f) => f.originalName).join(', ')}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[job.status]}`}>
                          {text.statusLabels[job.status]}
                        </span>
                        <button
                          className="text-xs text-slate-200 underline"
                          onClick={() => setLogsJob(job)}
                        >
                          {text.logs}
                        </button>
                        {job.status === 'failed' && (
                          <button
                            className="rounded-full bg-white/10 px-3 py-1 text-xs text-white hover:bg-white/20"
                            onClick={() => handleRetry(job.id)}
                          >
                            {text.retry}
                          </button>
                        )}
                        <button
                          className="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-200 hover:bg-white/15"
                          onClick={() => handleRemoveJob(job.id)}
                        >
                          {text.remove}
                        </button>
                      </div>
                    </div>
                    <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-800">
                      <div
                        className="h-full rounded-full bg-sky-500 transition-all"
                        style={{ width: `${job.progress || (job.status === 'done' ? 100 : 10)}%` }}
                      />
                    </div>
                    {job.outputFiles.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {job.outputFiles.map((out) => (
                          <button
                            key={out.name}
                            className="rounded-lg border border-sky-400/60 px-3 py-1 text-xs text-sky-100 hover:bg-sky-500/20"
                            onClick={() => handleDownload(job, out)}
                          >
                            {text.download} {out.name}
                          </button>
                        ))}
                      </div>
                    )}
                    {job.error && (
                      <p className="mt-2 text-xs text-rose-200">
                        {text.error}: {job.error}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>
        </main>

        <aside
          className={`rounded-xl sm:rounded-2xl border border-slate-700/50 bg-slate-800/80 backdrop-blur-xl shadow-xl p-3 sm:p-4 lg:static ${
            isDetailsOpen ? 'fixed inset-0 z-50 bg-slate-900/95 overflow-y-auto' : 'hidden lg:block'
          }`}
        >
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">{text.settingsOutputs}</h3>
            {!isDetailsOpen ? null : (
              <button className="text-sm text-slate-200 underline" onClick={() => setIsDetailsOpen(false)}>
                {text.close}
              </button>
            )}
          </div>

          <div className="mt-3 space-y-3">
            <PresetOptions
              preset={selectedPresetDef}
              values={optionValues[selectedPreset]}
              onChange={(key, value) => onOptionChange(selectedPreset, key, value)}
              text={text}
            />

            <div className="rounded-xl border border-slate-600/50 bg-slate-700/50 p-3 shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold">{text.outputsTitle}</p>
                  <p className="text-xs text-slate-400">
                    {doneJobs.length} {text.jobWord}, {formatBytes(totalOutputSize)}
                  </p>
                </div>
                <button
                  className="rounded-lg border border-sky-400/60 px-3 py-1 text-xs text-sky-100 hover:bg-sky-500/20"
                  onClick={downloadAllAsZip}
                >
                  {text.downloadAll}
                </button>
              </div>
              <div className="mt-2 space-y-2">
                {doneJobs.map((job) => (
                  <div key={job.id} className="rounded-lg border border-slate-600/50 bg-slate-700/50 p-2 hover:bg-slate-700/70 transition-all">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold">{presetMap[job.presetId]?.title}</p>
                      <button
                        className="text-xs text-sky-200 underline"
                        onClick={() => handleDownload(job)}
                      >
                        {text.download}
                      </button>
                    </div>
                    <p className="text-xs text-slate-400">
                      {job.outputFiles.length} {text.outputWord} - {formatBytes(job.outputFiles.reduce((a, f) => a + f.size, 0))}
                    </p>
                  </div>
                ))}
                {doneJobs.length === 0 && <p className="text-sm text-slate-400">{text.outputsEmpty}</p>}
              </div>
              {totalInputSize > 0 && totalOutputSize > 0 && (
                <p className="mt-2 text-xs text-slate-300">
                  {text.totalLinePrefix}: {formatBytes(totalInputSize)} {'->'} {text.totalLineOutput}:{' '}
                  {formatBytes(totalOutputSize)} (
                  {(100 * (totalOutputSize / totalInputSize)).toFixed(1)}%)
                </p>
              )}
            </div>
          </div>

        </aside>
      </div>


      {isSettingsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-slate-700/50 bg-slate-800/95 backdrop-blur-xl p-5 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">{text.settingsModalTitle}</h3>
              <button className="text-sm text-slate-200 underline" onClick={() => setIsSettingsOpen(false)}>
                {text.close}
              </button>
            </div>
            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold">{text.languageLabel}</p>
                  <p className="text-xs text-slate-400">{text.languageDesc}</p>
                </div>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as Language)}
                  className="rounded-lg border border-slate-600/60 bg-slate-800/80 px-3 py-2 text-sm text-slate-200 outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/30 transition-all cursor-pointer"
                >
                  <option value="tr">{text.languageOptionTr}</option>
                  <option value="en">{text.languageOptionEn}</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold">{text.autoZipTitle}</p>
                  <p className="text-xs text-slate-400">{text.settingsModalAutoZipDesc}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={autoZip}
                    onChange={(e) => setAutoZip(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-700/60 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-sky-500/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sky-600 border border-slate-600/60"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold">{text.settingsModalTTL}</p>
                  <p className="text-xs text-slate-400">{text.settingsModalTTLDesc}</p>
                </div>
                <input
                  type="number"
                  min={5}
                  max={120}
                  value={ttlMinutes}
                  onChange={(e) => setTtlMinutes(Number(e.target.value))}
                  className="w-20 rounded-lg border border-slate-600/60 bg-slate-800/80 px-3 py-2 text-sm text-slate-200 outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/30 transition-all"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {logsJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-3 sm:p-4">
          <div className="w-full max-w-2xl rounded-xl sm:rounded-2xl border border-slate-700/50 bg-slate-800/95 backdrop-blur-xl p-4 sm:p-5 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">
                {text.logsTitle} - {logsJob.id}
              </h3>
              <button className="text-sm text-slate-200 underline" onClick={() => setLogsJob(null)}>
                {text.close}
              </button>
            </div>
            <div className="mt-3 max-h-[60vh] space-y-2 overflow-y-auto rounded-xl bg-black/40 p-3 text-xs text-slate-200">
              {logsJob.logs.length === 0 ? (
                <p>{text.logsEmpty}</p>
              ) : (
                logsJob.logs.map((log) => (
                  <div key={`${log.ts}-${log.message}`} className="flex items-start gap-2">
                    <span className="text-[10px] text-slate-500">
                      {new Date(log.ts).toLocaleTimeString()}
                    </span>
                    <span
                      className={`rounded-full px-2 py-[2px] text-[10px] ${
                        log.level === 'error' ? 'bg-rose-500/30 text-rose-100' : 'bg-slate-700 text-slate-100'
                      }`}
                    >
                      {log.level}
                    </span>
                    <span className="flex-1">{log.message}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Cookie Consent Banner */}
      {cookieConsent === null && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-slate-800/95 backdrop-blur-xl border-t border-slate-700/50 shadow-2xl">
          <div className="mx-auto max-w-7xl px-3 sm:px-4 py-3 sm:py-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
              <div className="flex-1">
                <h3 className="text-sm font-semibold mb-1">{text.cookieBannerTitle}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {text.cookieBannerText}{' '}
                  <a href="/cookies" className="underline hover:text-slate-100">
                    {text.cookieBannerLearnMore}
                  </a>
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                <button
                  onClick={handleCookieReject}
                  className="rounded-lg border border-slate-600/60 bg-slate-700/60 px-4 py-2.5 text-xs font-semibold text-slate-200 hover:border-slate-500 hover:bg-slate-700 transition-all touch-manipulation"
                >
                  {text.cookieBannerReject}
                </button>
                <button
                  onClick={handleCookieAccept}
                  className="rounded-lg bg-sky-600 px-4 py-2.5 text-xs font-semibold text-white hover:bg-sky-500 transition-all touch-manipulation"
                >
                  {text.cookieBannerAccept}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="mx-auto max-w-7xl px-3 sm:px-4 py-4 sm:py-6 mt-6 sm:mt-8 border-t border-slate-700/50">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 text-xs text-slate-400">
          <div className="flex flex-wrap gap-3 sm:gap-4">
            <a href="/privacy" className="hover:text-slate-200 underline">Privacy</a>
            <a href="/terms" className="hover:text-slate-200 underline">Terms</a>
            <a href="/cookies" className="hover:text-slate-200 underline">Cookies</a>
            <a href="/security" className="hover:text-slate-200 underline">Security</a>
          </div>
          <p className="text-[10px] sm:text-xs">© {new Date().getFullYear()} Quick Convert</p>
        </div>
      </footer>
    </div>
  );
}

function PresetOptions({
  preset,
  values,
  onChange,
  text,
}: {
  preset: PresetDefinition;
  values: Record<string, unknown>;
  onChange: (key: string, value: unknown) => void;
  text: Copy;
}) {
  if (!preset.options || !preset.options.length) return null;

  const getLabel = (key: string): string => {
    const labelMap: Record<string, keyof typeof text.presetOptionLabels> = {
      level: 'quality',
      quality: 'quality',
      format: 'format',
      ranges: 'ranges',
      every: 'every',
      maxWidth: 'maxWidth',
      stripMetadata: 'stripMetadata',
    };
    return text.presetOptionLabels[labelMap[key] || 'quality'] || key;
  };

  const getDescription = (key: string): string | undefined => {
    if (key === 'ranges') return text.presetOptionDescriptions.ranges;
    if (key === 'every') return text.presetOptionDescriptions.every;
    return undefined;
  };

  const getOptionLabel = (optKey: string, value: string | number): string => {
    if (optKey === 'level') {
      if (value === 'low') return text.presetOptionValues.levelLow;
      if (value === 'medium') return text.presetOptionValues.levelMedium;
      if (value === 'high') return text.presetOptionValues.levelHigh;
    }
    return String(value);
  };

  return (
    <div className="rounded-xl border border-slate-600/50 bg-slate-700/50 p-3 shadow-md">
      <p className="text-sm font-semibold">{text.presetOptionsTitle}</p>
      <div className="mt-2 space-y-3">
        {preset.options.map((opt) => (
          <div key={opt.key} className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-200">{getLabel(opt.key)}</label>
            {opt.type === 'select' ? (
              <select
                value={(values?.[opt.key] as string) ?? ''}
                onChange={(e) => onChange(opt.key, e.target.value)}
                className="rounded-lg border border-slate-600/60 bg-slate-800/80 px-3 py-2 text-sm text-slate-200 outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/30 transition-all cursor-pointer"
              >
                {(opt.options || []).map((o) => (
                  <option key={o.value} value={o.value}>
                    {getOptionLabel(opt.key, o.value)}
                  </option>
                ))}
              </select>
            ) : opt.type === 'boolean' ? (
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={values?.[opt.key] as boolean}
                  onChange={(e) => onChange(opt.key, e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-700/60 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-sky-500/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sky-600 border border-slate-600/60"></div>
                <span className="ml-3 text-sm text-slate-300">{getLabel(opt.key)}</span>
              </label>
            ) : (
              <input
                type={opt.type === 'number' ? 'number' : 'text'}
                min={opt.min}
                max={opt.max}
                step={opt.step}
                value={(values?.[opt.key] as string | number | undefined) ?? ''}
                onChange={(e) => onChange(opt.key, opt.type === 'number' ? Number(e.target.value) : e.target.value)}
                placeholder={opt.placeholder}
                className="rounded-lg border border-slate-600/60 bg-slate-800/80 px-3 py-2 text-sm text-slate-200 placeholder:text-slate-500 outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/30 transition-all"
              />
            )}
            {getDescription(opt.key) && <p className="text-xs text-slate-400">{getDescription(opt.key)}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
