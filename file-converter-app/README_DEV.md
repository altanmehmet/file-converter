# Development Mode

## Hot Reload ile Development

Development modunda çalıştırmak için:

```bash
docker-compose -f docker-compose.dev.yml up --build
```

Bu modda:
- ✅ Hot reload aktif (kod değişiklikleri otomatik yansır)
- ✅ Volume mount ile dosyalar senkronize
- ✅ Daha hızlı başlangıç (build yok)

## Production Mode

Production modunda çalıştırmak için:

```bash
docker-compose up --build
```

Bu modda:
- ✅ Optimized build
- ✅ Daha küçük image
- ✅ Production ready

