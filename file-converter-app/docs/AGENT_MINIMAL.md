# AGENT_MINIMAL.md

Bu dosya, az token ile hizli mudahele edecek ajanlar icin minimum baglamdir.

## 1) Hedef
- Uygulama: local batch converter (Next.js App Router + Node API routes)
- Kritik akis: upload -> convert(job queue) -> poll job -> download/zip

## 2) Once oku (sirayla)
1. `README.md`
2. `docs/API.md`
3. `src/lib/presets.ts`
4. `src/backend/converters/index.ts`
5. `src/app/page.tsx`

## 3) Hangi degisiklik nereye?
- Yeni format/preset: `src/lib/types.ts`, `src/lib/presets.ts`, `src/backend/config.ts`, `src/backend/converters/*`
- UI metin/ayar: `src/app/page.tsx`
- API davranisi: `src/app/api/*`
- Temp/guvenlik: `src/backend/storage.ts`, `src/backend/jobStore.ts`

## 4) Hizli dogrulama komutlari
```bash
npm run lint
npm run build
npm run perf:test
```

## 5) Degisiklik kurallari
- Path traversal ve extension whitelist kurallarini gevsetme.
- `tmp` disina dosya yazma.
- API response seklini keyfi degistirme (UI kirilir).
- Yeni preset ekleniyorsa mutlaka:
  - input extension whitelist,
  - converter mapping,
  - UI preset tanimi,
  - README/PRESETS dokumani guncelle.

## 6) Low-token calisma sekli
- Once sadece ilgili dosyalari oku.
- Buyuk refactor yerine noktasal patch uygula.
- Sonuc mesaji: degisen dosyalar + calisan komutlar + kalan risk.

## 7) Render hizli not
- Build command: `npm run build`
- Start command: `npm run start`
- Port: `3000`
- Render public endpoint uzerinden `GET /` ve `GET /api/job/:id` saglik kontrolu yapilabilir.
