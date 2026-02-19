# SECURITY.md

## Kontroller
- Extension whitelist (`src/backend/config.ts`)
- Max file size limiti
- Path traversal korumasi (`safeResolve`)
- Job bazli izole temp klasorleri
- Log sanitization (path/id gizleme)

## Calisma prensipleri
- Upload dosyalari temp alana yazilir
- Job islemleri yalniz temp altinda calisir
- Is bitiminde veya TTL dolunca temp temizlenir

## Uyari
- Uretim ortaminda `ENCRYPTION_PASSWORD` ve `ENCRYPTION_SALT` env degerlerini set et.
- `tmp` klasorunu kalici diskte tutuyorsan TTL politikasini sikilastir.
