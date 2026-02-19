# Local Batch Converter

Tarayıcı üzerinden sürükle-bırak ile toplu dönüştürme yapan, tamamen lokal çalışan Next.js + Node uygulaması.
LibreOffice, Ghostscript, qpdf, sharp ve pdf-lib ile dosyalar yerelde işlenir.

## Özellikler (MVP + Geliştirmeler)
- Preset tabanlı akış:
  - Word -> PDF (yüksek kalite)
  - PDF -> Word (Beta)
  - PDF Compress (Low / Medium / High)
  - PDF Merge
  - PDF Split (aralık veya her X sayfada)
  - Images -> WebP / PNG / JPG
  - Excel -> PDF
  - PowerPoint -> PDF
- Drag & drop yükleme + batch dönüştürme
- Job queue: `Waiting / Processing / Done / Failed`
- Progress bar + job log modalı + `Retry` / `Remove`
- Job status filtresi + `Clear all jobs`
- Çıktılar: tekil indirme + `Download all as ZIP`
- Ayarlar modalı:
  - Dil: Türkçe / English
  - Auto ZIP (kuyruk bitince otomatik ZIP)
  - Temp TTL (dakika)
- Yeni UX iyileştirmeleri:
  - Preset arama
  - Favorite preset (localStorage)
  - Kategori filtreleri (Tümü / Doküman / PDF / Görsel)
  - Toplu kuyruk aksiyonları (`Retry failed`, `Remove done`)
  - Klavye kısayolları (`Ctrl/Cmd+K`, `Ctrl/Cmd+D`, `Ctrl/Cmd+,`, `Esc`)
  - Sağ panelde kuyruk özeti (boyut, kompresyon, ortalama süre)

## Stack
- Next.js 16 (App Router, TypeScript)
- API routes (Node runtime)
- `sharp`, `pdf-lib`, `archiver`
- `soffice` (LibreOffice headless), `gs` (Ghostscript), `qpdf`
- Docker + docker-compose

## Yerel Geliştirme
```bash
cd file-converter-app
npm install
npm run dev
# http://localhost:3000
```

## Docker ile Çalıştırma
```bash
docker compose up --build
# http://localhost:3001
```

Not: `docker-compose.yml` şu an host `3001 -> container 3000` map’li.

## API Uçları
- `POST /api/upload` (multipart: `files`)
- `POST /api/convert` (`presetId`, `fileIds`, `options`, `ttlMinutes`)
- `GET /api/job/:id`
- `POST /api/job/:id/retry`
- `DELETE /api/job/:id`
- `GET /api/download/:jobId`
- `GET /api/download-zip?jobIds=...`

## Dokuman Indeksi
- Low-token ajan runbook: `docs/AGENT_MINIMAL.md`
- API referansi: `docs/API.md`
- Mimari ozeti: `docs/ARCHITECTURE.md`
- Preset referansi: `docs/PRESETS.md`
- Security notlari: `docs/SECURITY.md`
- Render deployment: `docs/DEPLOYMENT_RENDER.md`
- Hata cozumleri: `docs/TROUBLESHOOTING.md`
- Yol haritasi: `docs/ROADMAP.md`
- Surum gecmisi: `CHANGELOG.md`

## Güvenlik ve Temp Yönetimi
- Path traversal kontrolü
- İzinli uzantı filtreleri
- Dosya boyutu limiti (`150MB`)
- Her job için ayrı temp klasörü
- TTL tabanlı otomatik temizlik (varsayılan `10` dakika)
- Container içinde non-root kullanıcı (`node`)

## Benchmark ve Performans
- Rakip benchmark dokümanı: `docs/competitive-benchmark-2026-02-19.md`
- Performans testi:
```bash
npm run perf:test
```
Üretilen dosyalar:
- `benchmarks/perf-latest.json`
- `benchmarks/perf-latest.md`

## Bilinen Sınırlamalar
- PDF -> Word (Beta): özellikle taranmış PDF’lerde kalite düşebilir.
- In-memory job store kullanıldığı için sunucu restart sonrası job geçmişi silinir.
- LibreOffice/Ghostscript olmayan ortamlarda ilgili presetler çalışmaz (Docker önerilir).
