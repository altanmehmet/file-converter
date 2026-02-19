# ARCHITECTURE.md

## Stack
- Next.js App Router (UI + API)
- Backend queue/store: in-memory
- Converters: sharp, pdf-lib, soffice, ghostscript, qpdf

## Core akis
1. UI dosyalari `/api/upload` ile yukler
2. UI `/api/convert` ile job(lar) olusturur
3. Queue `DEFAULT_CONCURRENCY` kadar paralel isler
4. UI `/api/job/:id` ile polling yapar
5. Cikti `/api/download/*` endpointlerinden indirilir

## Dizinler
- `src/app`: UI ve API routes
- `src/backend`: queue, store, storage, converters
- `src/lib`: tipler ve preset tanimlari
- `tmp/uploads`: yuklemeler
- `tmp/jobs/<jobId>`: job bazli input/output

## Queue modeli
- Status: `waiting | processing | done | failed`
- Retry: `/api/job/:id/retry`
- Remove: `/api/job/:id` DELETE

## Temizlik
- Job bazli TTL
- Periyodik cleanup timer
- Job ve upload gecici dosya klasorleri silinir
