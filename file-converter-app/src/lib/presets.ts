import { PresetDefinition } from './types';

export const PRESETS: PresetDefinition[] = [
  {
    id: 'doc_to_pdf',
    category: 'documents',
    title: 'Word → PDF',
    description: 'DOC/DOCX dosyalarını yüksek kalitede PDF\'e dönüştürür.',
    pinned: true,
    accepts: ['.doc', '.docx'],
    outputExtension: '.pdf',
    defaultOptions: { quality: 'high' },
  },
  {
    id: 'pdf_to_docx',
    category: 'documents',
    title: 'PDF → Word',
    description: 'PDF\'yi düzenlenebilir DOCX\'e çevirir. Tarama PDF\'lerde bozulma olabilir.',
    pinned: true,
    badge: 'Beta',
    warning: 'Tarama PDF\'lerde sonuç bozulabilir.',
    accepts: ['.pdf'],
    outputExtension: '.docx',
    defaultOptions: { quality: 'standard' },
  },
  {
    id: 'pdf_compress',
    category: 'pdf',
    title: 'PDF Compress',
    description: 'PDF boyutunu Low / Medium / High seçenekleriyle sıkıştırır.',
    accepts: ['.pdf'],
    outputExtension: '.pdf',
    defaultOptions: { level: 'medium' },
    options: [
      {
        key: 'level',
        label: 'Kalite',
        type: 'select',
        options: [
          { label: 'Low (daha küçük)', value: 'low' },
          { label: 'Medium', value: 'medium' },
          { label: 'High (daha iyi kalite)', value: 'high' },
        ],
      },
    ],
  },
  {
    id: 'pdf_merge',
    category: 'pdf',
    title: 'PDF Merge',
    description: 'Sürükle-bırak sıralaması ile PDF\'leri birleştirir.',
    accepts: ['.pdf'],
    outputExtension: '.pdf',
    requiresMultiple: true,
  },
  {
    id: 'pdf_split',
    category: 'pdf',
    title: 'PDF Split',
    description: 'Sayfa aralığı (1-3,5,7-9) veya her X sayfada böl.',
    accepts: ['.pdf'],
    outputExtension: '.pdf',
    defaultOptions: { ranges: '1-3', every: 0 },
    options: [
      {
        key: 'ranges',
        label: 'Aralıklar',
        type: 'text',
        placeholder: '1-3,5,7-9',
        description: 'Virgülle ayrılmış aralıklar. Boş bırakılırsa "Her X sayfada böl" seçeneği kullanılır.',
      },
      {
        key: 'every',
        label: 'Her X sayfada böl',
        type: 'number',
        min: 0,
        step: 1,
        description: '0 ise devre dışı.',
      },
    ],
  },
  {
    id: 'image_convert',
    category: 'images',
    title: 'Images → WebP/PNG/JPG',
    description: 'Kalite, maksimum genişlik ve EXIF temizleme seçenekleri.',
    accepts: ['.png', '.jpg', '.jpeg', '.webp', '.tiff'],
    defaultOptions: { format: 'webp', quality: 82, maxWidth: 2400, stripMetadata: true },
    options: [
      {
        key: 'format',
        label: 'Biçim',
        type: 'select',
        options: [
          { label: 'WebP', value: 'webp' },
          { label: 'PNG', value: 'png' },
          { label: 'JPG', value: 'jpg' },
        ],
      },
      {
        key: 'quality',
        label: 'Kalite',
        type: 'number',
        min: 1,
        max: 100,
        step: 1,
      },
      {
        key: 'maxWidth',
        label: 'Maksimum Genişlik',
        type: 'number',
        min: 320,
        max: 6000,
        step: 10,
      },
      {
        key: 'stripMetadata',
        label: 'EXIF temizle',
        type: 'boolean',
      },
    ],
  },
  {
    id: 'excel_to_pdf',
    category: 'documents',
    title: 'Excel → PDF',
    description: 'XLS/XLSX dosyalarını yüksek kalitede PDF\'e dönüştürür.',
    pinned: true,
    accepts: ['.xls', '.xlsx'],
    outputExtension: '.pdf',
    defaultOptions: { quality: 'high' },
  },
  {
    id: 'ppt_to_pdf',
    category: 'documents',
    title: 'PowerPoint → PDF',
    description: 'PPT/PPTX sunum dosyalarını PDF formatına dönüştürür.',
    accepts: ['.ppt', '.pptx'],
    outputExtension: '.pdf',
    defaultOptions: { quality: 'high' },
  },
];

export const PRESET_MAP = PRESETS.reduce<Record<string, PresetDefinition>>((acc, preset) => {
  acc[preset.id] = preset;
  return acc;
}, {});
