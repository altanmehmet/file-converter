# 🚀 Deployment Rehberi - Quick Convert

## ⚠️ ÖNEMLİ: Vercel Çalışmaz!

Bu uygulama **Vercel'de çalışmaz** çünkü:

1. **LibreOffice (soffice)** gerekli - Vercel'de yok ❌
2. **Ghostscript (gs)** gerekli - Vercel'de yok ❌
3. **File system operations** - Vercel serverless'da sınırlı ❌
4. **Docker container** - Vercel Docker desteklemiyor ❌

## ✅ Çalışan Alternatifler

### 1. Railway (ÖNERİLEN - En Kolay) ⭐

**Neden Railway?**
- ✅ Docker desteği (Dockerfile'ın çalışır)
- ✅ Ücretsiz $5 kredi/ay
- ✅ Otomatik deployment
- ✅ Kolay kurulum
- ✅ Custom domain ücretsiz

**Fiyat:** $5/ay (ilk ay ücretsiz kredi)

**Deploy Adımları:**

1. **Railway'a Kaydol:**
   - https://railway.app
   - GitHub ile giriş yap

2. **Yeni Proje:**
   - "New Project" → "Deploy from GitHub repo"
   - Repo'nu seç: `file-converter`

3. **Dockerfile Otomatik Algılanır:**
   - Railway Dockerfile'ı otomatik bulur
   - Build başlar

4. **Environment Variables:**
   - Settings → Variables
   - Ekle:
     ```
     NODE_ENV=production
     NEXT_PUBLIC_SITE_URL=https://your-app.railway.app
     ```

5. **Port Ayarla:**
   - Settings → Networking
   - Port: `3000` (otomatik)

6. **Custom Domain (Opsiyonel):**
   - Settings → Domains
   - Domain ekle

**✅ Hazır!** Railway otomatik deploy eder.

---

### 2. Render (Alternatif)

**Neden Render?**
- ✅ Docker desteği
- ✅ Ücretsiz plan (sınırlı)
- ✅ Kolay kurulum

**Fiyat:** $7/ay (ücretsiz plan çok sınırlı)

**Deploy Adımları:**

1. **Render'a Kaydol:**
   - https://render.com
   - GitHub ile giriş

2. **Yeni Web Service:**
   - "New" → "Web Service"
   - GitHub repo'nu bağla

3. **Ayarlar:**
   - **Name:** `quick-convert`
   - **Environment:** `Docker`
   - **Dockerfile Path:** `file-converter-app/Dockerfile`
   - **Root Directory:** `file-converter-app`
   - **Build Command:** (boş bırak, Dockerfile'da var)
   - **Start Command:** (boş bırak, Dockerfile'da var)

4. **Environment Variables:**
   ```
   NODE_ENV=production
   NEXT_PUBLIC_SITE_URL=https://your-app.onrender.com
   ```

5. **Deploy:**
   - "Create Web Service"
   - Build başlar (5-10 dakika)

---

### 3. Fly.io (Alternatif)

**Neden Fly.io?**
- ✅ Docker desteği
- ✅ Global edge network
- ✅ İlk 3 app ücretsiz

**Fiyat:** Pay-as-you-go (ilk 3 app ücretsiz)

**Deploy Adımları:**

1. **Fly.io CLI Kur:**
   ```bash
   curl -L https://fly.io/install.sh | sh
   ```

2. **Login:**
   ```bash
   fly auth login
   ```

3. **Deploy:**
   ```bash
   cd file-converter-app
   fly launch
   ```

4. **Sorular:**
   - App name: `quick-convert`
   - Region: En yakın bölge
   - Dockerfile: `file-converter-app/Dockerfile`

5. **Environment Variables:**
   ```bash
   fly secrets set NODE_ENV=production
   fly secrets set NEXT_PUBLIC_SITE_URL=https://quick-convert.fly.dev
   ```

---

## 📊 Karşılaştırma

| Özellik | Railway | Render | Fly.io |
|---------|---------|--------|--------|
| **Docker** | ✅ | ✅ | ✅ |
| **Fiyat** | $5/ay | $7/ay | Pay-as-you-go |
| **Ücretsiz Kredi** | $5/ay | Sınırlı | İlk 3 app |
| **Kurulum** | ⭐⭐⭐ Çok Kolay | ⭐⭐ Kolay | ⭐ Orta |
| **Custom Domain** | ✅ Ücretsiz | ✅ Ücretsiz | ✅ Ücretsiz |
| **Auto Deploy** | ✅ | ✅ | ✅ |

## 🎯 Önerilen: Fly.io (ÜCRETSİZ!) veya Railway

### Fly.io (ÜCRETSİZ - ÖNERİLEN!)

**Neden Fly.io?**
1. ✅ **Tamamen ücretsiz** (ilk 3 app)
2. ✅ Docker desteği
3. ✅ Uyku modu yok (her zaman hızlı)
4. ✅ Global edge network
5. ✅ Custom domain ücretsiz

**Fiyat: $0/ay!** 🎉

### Railway (Alternatif)

**Neden Railway?**
1. En kolay kurulum
2. Dockerfile otomatik algılanır
3. GitHub entegrasyonu mükemmel
4. $5/ay (ilk ay ücretsiz kredi)

---

## 🚀 Railway Deploy - Detaylı Adımlar

### Adım 1: GitHub'a Push

```bash
cd /Users/altanmehmetturkmen/Desktop/file-converter

# Git repo başlat (eğer yoksa)
git init
git add .
git commit -m "Initial commit"

# GitHub'da yeni repo oluştur, sonra:
git remote add origin https://github.com/KULLANICI/file-converter.git
git branch -M main
git push -u origin main
```

### Adım 2: Railway'a Deploy

1. **Railway'a Git:**
   - https://railway.app
   - "Start a New Project"
   - "Deploy from GitHub repo"

2. **Repo Seç:**
   - `file-converter` repo'sunu seç
   - "Deploy Now"

3. **Otomatik Build:**
   - Railway Dockerfile'ı bulur
   - Otomatik build başlar
   - 5-10 dakika sürer

4. **Environment Variables:**
   - Settings → Variables
   - Ekle:
     ```
     NODE_ENV=production
     NEXT_PUBLIC_SITE_URL=https://your-app.railway.app
     ```

5. **Domain:**
   - Settings → Networking
   - "Generate Domain" → Ücretsiz domain
   - Veya custom domain ekle

### Adım 3: Test

- Railway sana bir URL verir: `https://your-app.railway.app`
- Bu URL'yi aç ve test et!

---

## 🔧 Railway Özel Ayarlar

### Port Ayarı

Railway otomatik algılar, ama kontrol et:
- Settings → Networking
- Port: `3000`

### Build Ayarları

Railway Dockerfile'dan otomatik algılar:
- Build: Dockerfile'dan
- Start: `npm run start`

### Health Check

Railway otomatik health check yapar:
- Endpoint: `/` (200 OK bekler)

---

## 💰 Maliyet

### Railway:
- **İlk ay:** Ücretsiz ($5 kredi)
- **Sonra:** $5/ay
- **Bandwidth:** 100GB/ay dahil

### Render:
- **İlk ay:** Ücretsiz (sınırlı)
- **Sonra:** $7/ay
- **Bandwidth:** Sınırlı

### Fly.io:
- **İlk 3 app:** Ücretsiz
- **Sonra:** Kullanım bazlı
- **Bandwidth:** Pay-as-you-go

---

## 🆘 Sorun Giderme

### Build Hatası?

```bash
# Lokal'de test et:
cd file-converter-app
docker build -t test .
docker run -p 3000:3000 test
```

### Port Hatası?

- Railway otomatik algılar
- Eğer sorun varsa: Settings → Networking → Port: `3000`

### Environment Variables?

- Settings → Variables
- Tüm değişkenleri ekle
- Redeploy yap

### LibreOffice Çalışmıyor?

- Dockerfile'da LibreOffice kurulumunu kontrol et
- Build loglarına bak
- Railway'da "View Logs" → Hataları gör

---

## ✅ Deployment Checklist

- [ ] GitHub'a push yapıldı
- [ ] Railway hesabı açıldı
- [ ] Repo Railway'a bağlandı
- [ ] Build başarılı
- [ ] Environment variables eklendi
- [ ] Domain ayarlandı
- [ ] Test edildi
- [ ] Custom domain eklendi (opsiyonel)

---

## 🎉 Sonuç

**Railway = En kolay ve en iyi seçenek!**

1. GitHub'a push yap
2. Railway'a bağla
3. Otomatik deploy
4. ✅ Hazır!

**Maliyet:** $5/ay (ilk ay ücretsiz)

---

## 📝 Notlar

- Railway Dockerfile'ı otomatik algılar
- Her GitHub push'unda otomatik deploy
- Logs Railway dashboard'da görünür
- Custom domain ücretsiz
- SSL otomatik

**Hazır! 🚀**

