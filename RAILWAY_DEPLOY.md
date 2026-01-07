# 🚂 Railway'a Deploy - Hızlı Başlangıç

## ⚡ 5 Dakikada Deploy

### 1. GitHub'a Push

```bash
cd /Users/altanmehmetturkmen/Desktop/file-converter

# Git repo başlat (eğer yoksa)
git init
git add .
git commit -m "Initial commit - Quick Convert"

# GitHub'da yeni repo oluştur (github.com'da)
# Sonra şunu çalıştır:
git remote add origin https://github.com/KULLANICI/file-converter.git
git branch -M main
git push -u origin main
```

### 2. Railway'a Deploy

1. **Railway'a Git:**
   - https://railway.app
   - "Start a New Project" veya "Login"

2. **GitHub ile Giriş:**
   - "Login with GitHub"
   - İzinleri ver

3. **Yeni Proje:**
   - "New Project"
   - "Deploy from GitHub repo"
   - `file-converter` repo'sunu seç

4. **Otomatik Deploy:**
   - Railway Dockerfile'ı otomatik bulur
   - Build başlar (5-10 dakika)
   - Bekle...

5. **Environment Variables:**
   - Settings → Variables
   - "New Variable" → Ekle:
     ```
     NODE_ENV=production
     NEXT_PUBLIC_SITE_URL=https://your-app.railway.app
     ```
   - (URL'yi Railway sana verir)

6. **Domain:**
   - Settings → Networking
   - "Generate Domain" → Ücretsiz domain al
   - Veya custom domain ekle

### 3. Test Et

- Railway sana bir URL verir: `https://your-app.railway.app`
- Bu URL'yi aç ve test et!

---

## ✅ Hazır!

Artık uygulaman canlıda! 🎉

---

## 🔄 Otomatik Deploy

Her GitHub push'unda Railway otomatik deploy yapar:
- `git push` → Railway build başlatır
- Build başarılı → Otomatik deploy
- Build başarısız → Logs'a bak

---

## 📊 Railway Dashboard

Railway dashboard'da görebilirsin:
- **Deployments:** Tüm deploy'lar
- **Logs:** Real-time logs
- **Metrics:** CPU, Memory, Network
- **Settings:** Variables, Domain, etc.

---

## 💰 Maliyet

- **İlk ay:** Ücretsiz ($5 kredi)
- **Sonra:** $5/ay
- **Bandwidth:** 100GB/ay dahil

---

## 🆘 Sorun mu Var?

### Build Hatası?
- Railway dashboard → Deployments → Logs'a bak
- Hataları gör ve düzelt

### Port Hatası?
- Settings → Networking
- Port: `3000` (otomatik algılanır)

### Environment Variables?
- Settings → Variables
- Tüm değişkenleri ekle
- Redeploy yap

---

**Hazır! 🚀 Railway'a deploy et!**

