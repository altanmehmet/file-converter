# 🚀 Fly.io Deploy - 5 Dakika (ÜCRETSİZ!)

## ⚡ Hızlı Başlangıç

### 1. Fly.io CLI Kur

```bash
curl -L https://fly.io/install.sh | sh
```

### 2. Login

```bash
fly auth login
```

### 3. Deploy

```bash
cd file-converter-app
fly launch
# Sorular:
# - App name: quick-convert
# - Region: istanbul (veya en yakın)
# - Dockerfile: ./Dockerfile

fly secrets set NODE_ENV=production
fly secrets set NEXT_PUBLIC_SITE_URL=https://quick-convert.fly.dev

fly deploy
```

### 4. ✅ Hazır!

URL: `https://quick-convert.fly.dev`

**Maliyet: $0/ay!** 🎉

