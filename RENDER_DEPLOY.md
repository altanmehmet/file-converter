# 🆓 Render'a Deploy - ÜCRETSİZ (Kart Gerektirmez!)

## ✅ Render Neden İyi?

- ✅ **Tamamen ücretsiz plan**
- ✅ **Kart gerektirmez!**
- ✅ Docker desteği
- ✅ GitHub entegrasyonu
- ⚠️ 15 dakika idle → uyku modu (ilk request yavaş)

**Fiyat: $0/ay (kart yok!)**

---

## 🚀 Render'a Deploy - Adım Adım

### Adım 1: GitHub'a Push

```bash
cd /Users/altanmehmetturkmen/Desktop/file-converter

# Git repo başlat (eğer yoksa)
git init
git add .
git commit -m "Initial commit - Quick Convert"

# GitHub'da yeni repo oluştur (github.com'da)
# Sonra:
git remote add origin https://github.com/KULLANICI/file-converter.git
git branch -M main
git push -u origin main
```

### Adım 2: Render'a Kaydol

1. **Render'a Git:**
   - https://render.com
   - "Get Started for Free"
   - GitHub ile giriş yap
   - **KART İSTEMEZ!** ✅

### Adım 3: Yeni Web Service

1. **Dashboard'da:**
   - "New +" → "Web Service"

2. **GitHub Repo Bağla:**
   - "Connect account" → GitHub'ı bağla
   - `file-converter` repo'sunu seç

3. **Ayarlar:**
   - **Name:** `quick-convert`
   - **Region:** Frankfurt (veya en yakın)
   - **Branch:** `main`
   - **Root Directory:** `file-converter-app`
   - **Environment:** `Docker`
   - **Dockerfile Path:** `file-converter-app/Dockerfile`
   - **Docker Context:** `file-converter-app`
   - **Build Command:** (boş bırak, Dockerfile'da var)
   - **Start Command:** (boş bırak, Dockerfile'da var)

4. **Plan:**
   - **Free** seç (kart gerektirmez!)

5. **Environment Variables:**
   - "Add Environment Variable"
   - Ekle:
     ```
     NODE_ENV=production
     NEXT_PUBLIC_SITE_URL=https://quick-convert.onrender.com
     ```

6. **Deploy:**
   - "Create Web Service"
   - Build başlar (5-10 dakika)

### Adım 4: Bekle

- Build 5-10 dakika sürer
- İlk deploy biraz uzun sürebilir
- Logs'u takip et

### Adım 5: Test

- Render sana bir URL verir: `https://quick-convert.onrender.com`
- Bu URL'yi aç ve test et!

---

## ⚠️ Önemli Notlar

### Uyku Modu

- **15 dakika idle** → Uyku modu
- **İlk request:** 30-60 saniye sürebilir (uyanma)
- **Sonraki request'ler:** Hızlı

### Çözüm (Opsiyonel):

Eğer uyku modunu istemiyorsan:
- **Cron job** ekle (5 dakikada bir ping)
- Veya **UptimeRobot** kullan (ücretsiz)
- Veya **Render Pro** plan ($7/ay, uyku modu yok)

---

## 💰 Maliyet

- **Render Free:** $0/ay ✅
- **Kart:** Gerektirmez ✅
- **Limitler:**
  - 750 saat/ay
  - 512MB RAM
  - 15 dk idle → sleep

**Bu limitler başlangıç için yeterli!**

---

## 🔄 Otomatik Deploy

Her GitHub push'unda Render otomatik deploy yapar:
- `git push` → Render build başlatır
- Build başarılı → Otomatik deploy

---

## 📊 Render Dashboard

Render dashboard'da görebilirsin:
- **Logs:** Real-time build ve runtime logs
- **Metrics:** CPU, Memory kullanımı
- **Events:** Deploy geçmişi
- **Settings:** Environment variables, domain, etc.

---

## 🌐 Custom Domain (Ücretsiz)

1. **Settings → Custom Domains**
2. Domain ekle
3. DNS ayarlarını yap (Render sana gösterir)
4. SSL otomatik (Let's Encrypt)

---

## 🆘 Sorun Giderme

### Build Hatası?

- **Logs'a bak:** Render dashboard → Logs
- **Dockerfile kontrol:** `file-converter-app/Dockerfile` doğru mu?
- **Root directory:** `file-converter-app` olmalı

### Uyku Modu Çok Yavaş?

- **UptimeRobot ekle:** https://uptimerobot.com (ücretsiz)
- 5 dakikada bir ping at
- Uyku modunu önle

### Port Hatası?

- Render otomatik algılar (3000)
- Sorun yok

### Environment Variables?

- Settings → Environment
- Tüm değişkenleri ekle
- Redeploy yap

---

## ✅ Deployment Checklist

- [ ] GitHub'a push yapıldı
- [ ] Render hesabı açıldı (kart yok!)
- [ ] Web Service oluşturuldu
- [ ] Docker ayarları yapıldı
- [ ] Environment variables eklendi
- [ ] Build başarılı
- [ ] Test edildi
- [ ] Custom domain eklendi (opsiyonel)

---

## 🎉 Sonuç

**Render = Tamamen ücretsiz, kart gerektirmez!**

1. GitHub'a push yap
2. Render'a bağla
3. Otomatik deploy
4. ✅ Hazır!

**Maliyet: $0/ay (kart yok!)** 🎉

---

## 💡 İpucu: Uyku Modunu Önle

**UptimeRobot ile (Ücretsiz):**

1. https://uptimerobot.com → Kaydol
2. "Add New Monitor"
3. **Type:** HTTP(s)
4. **URL:** `https://quick-convert.onrender.com`
5. **Interval:** 5 minutes
6. **Save**

Artık 5 dakikada bir ping atılır, uyku modu olmaz!

---

**Hazır! Render'a deploy et! 🚀**

