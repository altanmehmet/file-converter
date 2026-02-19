# TROUBLESHOOTING.md

## 1) LibreOffice hatasi (`soffice` bulunamadi)
- Docker image icinde calistir veya host'a LibreOffice kur.

## 2) Ghostscript hatasi (`gs` bulunamadi)
- Docker image veya host package kurulumunu kontrol et.

## 3) Conversion timeout
- Buyuk dosyalarda `maxDuration`/timeout degerlerini gozden gecir.
- Queue concurrency'yi dusur.

## 4) Job done olmuyor
- `/api/job/:id` loglarini kontrol et.
- `tmp/jobs/<jobId>` altinda output olusmus mu bak.

## 5) Download zip bos donuyor
- Sadece `done` job'lar zip'e dahil edilir.
- `jobIds` query parametresini kontrol et.

## 6) Render deploy fail
- Root directory dogru mu (`file-converter-app`)?
- Build command `npm run build` basarili mi?
- Runtime Node surumu uyumlu mu?
