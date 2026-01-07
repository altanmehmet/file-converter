# Local Batch Converter

Tarayici uzerinden surukle-birak ile toplu donusum yapan, tamamen lokal calisan Next.js + Node uygulamasi. Islemci ve araclar (LibreOffice, Ghostscript, sharp, pdf-lib) container icerisinde calisir; temp klasorleri surekli temizlenir.

## Ozellikler
- Preset tabanli is akisi: Word->PDF, PDF->Word (Beta), PDF Compress (low/medium/high), PDF Merge, PDF Split, Image -> WebP/PNG/JPG.
- Kuyruk ve durumlar: Waiting / Processing / Done / Failed, ilerleme cubugu, log goruntuleme, Retry/Remove.
- Cikti yonetimi: Tek tek indir veya "Download all as ZIP"; toplam boyut/kompres oranini gosterir.
- Temp guvenligi: Her job icin ayri klasor, path traversal engeli, izinli uzanti filtresi, boyut limiti (150MB), TTL varsayilan 10 dk.
- Non-root container, auto-cleaner, responsive UI (sag panel mobilde drawer).

## Stack
- Next.js 16 (App Router, TypeScript, Tailwind v4)
- Node API routes (child_process ile soffice/gs), pdf-lib, sharp, archiver
- Docker + docker-compose, Debian tabanli image uzerinde LibreOffice/Ghostscript/qpdf

## Yerel Gelistirme
```bash
cd file-converter-app
npm install
npm run dev # http://localhost:3000
```

UI: Sol sidebar presetler, ortada dropzone + kuyruk, sagda ayarlar/outputs. Settings modalindan auto-zip ve TTL degistirilebilir. PDF->Word presetinde Beta badge ve uyarilar gosterilir.

## Docker ile Calistirma
```bash
docker compose up --build
# veya
docker build -t local-batch-converter .
docker run -p 3000:3000 -v $(pwd)/tmp:/app/tmp local-batch-converter
```
Container non-root (USER node) calisir; LibreOffice, Ghostscript ve qpdf dahil. Temp klasoru volume olarak paylasilir.

## API Uclari
- `POST /api/upload` - multipart form-data (`files`) kabul eder; `fileIds` dondurur.
- `POST /api/convert` - body: `{ presetId, fileIds, options?, ttlMinutes? }`; preset ayarina gore job/lar olusturur.
- `GET /api/job/:id` - job durumu, loglar ve download URL'leri.
- `POST /api/job/:id/retry` - tekrar kuyruga al.
- `DELETE /api/job/:id` - job ve temp klasorunu sil.
- `GET /api/download/:jobId[?file=name]` - tek cikti veya (parametre yoksa) zip.
- `GET /api/download-zip?jobIds=id1,id2` - secili tamamlanmis job ciktilarini zip olarak gonderir.

## Preset Notlari
- **Word->PDF / PDF->Word**: soffice headless ile calisir. PDF->Word beta; taranmis PDF'lerde bozulma olabilir.
- **PDF Compress**: Ghostscript `-dPDFSETTINGS` (low=/screen, medium=/ebook, high=/printer).
- **PDF Merge / Split**: pdf-lib ile birlestirme/bolme; split aralik formati `1-3,5,7-9` veya `every` degeri.
- **Image Convert**: sharp ile WebP/PNG/JPG; kalite, max width, EXIF temizleme secenekleri.

## Guvenlik / Temp Temizligi
- Izinli uzantilar: pdf, doc, docx, png, jpg, jpeg, webp, tiff. Max dosya boyutu: 150MB.
- Her job icin `tmp/jobs/<jobId>` ve upload icin `tmp/uploads/<id>` kullanilir.
- TTL (varsayilan 10dk) asiminda job ve upload klasorleri temizlenir. `src/backend/config.ts` uzerinden degistirilebilir.
- Kuyruk es zamanlilik varsayilan 2 (`DEFAULT_CONCURRENCY`).

## Klasor Yapisi
- `src/app` - Next.js UI + API routes
- `src/backend` - job store, queue, storage, converterlar, serializerlar
- `src/lib` - tipler ve preset tanimlari
- `src/workers` - ileri seviye runner/worker icin ayirma alani
- `tmp` - gecici dosyalar (git ignore, docker volume)

## Bilinen Sinirlamalar
- PDF->Word kalitesi kaynak dosyaya bagimli; tarama PDF'lerde manual duzeltme gerekebilir.
- In-memory store kullandigi icin server restartinda job durumu sifirlanir.
- Ghostscript/LibreOffice yoksa ilgili presetler hata verir; container icinde calismaniz onerilir.
