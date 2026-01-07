# 🚀 Render'a Deploy - ŞİMDİ!

## ✅ Adım 1: GitHub'a Push (YAPILDI!)

Git repo hazır! Şimdi GitHub'a push yap:

### GitHub'da Repo Oluştur:

1. **GitHub'a Git:**
   - https://github.com/new
   - **Repository name:** `file-converter` (veya istediğin isim)
   - **Public** veya **Private** seç
   - **"Create repository"** butonuna tıkla

2. **Terminal'de Push Yap:**

```bash
cd /Users/altanmehmetturkmen/Desktop/file-converter

# GitHub'ın verdiği komutları kullan (repo oluşturduktan sonra):
git remote add origin https://github.com/KULLANICI/file-converter.git
git branch -M main
git push -u origin main
```

**KULLANICI** yerine GitHub kullanıcı adını yaz!

---

## 🎯 Adım 2: Render'a Deploy

GitHub'a push yaptıktan sonra:

### 1. Render'a Kaydol

1. **Render'a Git:**
   - https://render.com
   - "Get Started for Free" butonuna tıkla
   - **GitHub ile giriş yap**
   - İzinleri ver
   - **KART İSTEMEZ!** ✅

### 2. Yeni Web Service Oluştur

1. **Dashboard'da:**
   - "New +" butonuna tıkla (sağ üstte)
   - "Web Service" seç

2. **GitHub Repo Bağla:**
   - "Connect account" → GitHub'ı bağla (eğer bağlı değilse)
   - `file-converter` repo'sunu seç
   - "Connect" butonuna tıkla

3. **Ayarları Yap:**

   **Temel Ayarlar:**
   - **Name:** `quick-convert` (veya istediğin isim)
   - **Region:** `Frankfurt` (veya en yakın bölge)
   - **Branch:** `main`

   **Build & Deploy:**
   - **Root Directory:** `file-converter-app` ⚠️ ÖNEMLİ!
   - **Environment:** `Docker` seç
   - **Dockerfile Path:** `file-converter-app/Dockerfile`
   - **Docker Context:** `file-converter-app`

   **Plan:**
   - **Free** seç (kart gerektirmez!)

4. **Environment Variables Ekle:**

   "Add Environment Variable" butonuna tıkla, şunları ekle:

   ```
   NODE_ENV = production
   ```

   ```
   NEXT_PUBLIC_SITE_URL = https://quick-convert.onrender.com
   ```

   (URL'yi Render sana verecek, onu kullan)

5. **Deploy:**

   - "Create Web Service" butonuna tıkla
   - Build başlar (5-10 dakika)
   - Logs'u takip et

### 3. Bekle ve Test Et

- Build 5-10 dakika sürer
- "Live" yazısı göründüğünde hazır!
- URL: `https://quick-convert.onrender.com`
- Bu URL'yi aç ve test et!

---

## ⚠️ Önemli Notlar

### Root Directory

**ÇOK ÖNEMLİ:** Root Directory `file-converter-app` olmalı!

Eğer yanlış yaparsan:
- Settings → General → Root Directory → `file-converter-app`

### Dockerfile Path

Dockerfile Path: `file-converter-app/Dockerfile`

### İlk Deploy

İlk deploy 5-10 dakika sürebilir, sabırlı ol!

---

## 🆘 Sorun Giderme

### Build Hatası?

1. **Logs'a bak:** Render dashboard → Logs
2. **Root Directory kontrol:** `file-converter-app` olmalı
3. **Dockerfile kontrol:** `file-converter-app/Dockerfile` var mı?

### "Dockerfile not found" Hatası?

- Root Directory: `file-converter-app` olmalı
- Dockerfile Path: `file-converter-app/Dockerfile`

### Port Hatası?

- Render otomatik algılar (3000)
- Sorun yok

---

## ✅ Checklist

- [ ] GitHub'da repo oluşturuldu
- [ ] GitHub'a push yapıldı
- [ ] Render hesabı açıldı
- [ ] Web Service oluşturuldu
- [ ] Root Directory: `file-converter-app` ✅
- [ ] Environment: Docker ✅
- [ ] Dockerfile Path: `file-converter-app/Dockerfile` ✅
- [ ] Plan: Free ✅
- [ ] Environment variables eklendi
- [ ] Deploy başlatıldı
- [ ] Build başarılı
- [ ] Test edildi

---

## 🎉 Hazır!

Artık uygulaman canlıda ve **TAMAMEN ÜCRETSİZ!** 🎉

**URL:** `https://quick-convert.onrender.com`

**Maliyet: $0/ay (kart yok!)** ✅

---

## 💡 İpucu: Uyku Modunu Önle

Eğer 15 dakika idle sonra uyku modu istemiyorsan:

1. **UptimeRobot:** https://uptimerobot.com (ücretsiz)
2. "Add New Monitor"
3. **Type:** HTTP(s)
4. **URL:** `https://quick-convert.onrender.com`
5. **Interval:** 5 minutes
6. **Save**

Artık 5 dakikada bir ping atılır, uyku modu olmaz!

---

**Hazır! GitHub'a push yap ve Render'a deploy et! 🚀**

