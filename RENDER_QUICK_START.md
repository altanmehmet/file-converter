# 🚀 Render'a Deploy - Hızlı Başlangıç (Kart Yok!)

## ⚡ 5 Dakikada Deploy

### 1. GitHub'a Push

```bash
cd /Users/altanmehmetturkmen/Desktop/file-converter

git init
git add .
git commit -m "Initial commit"

# GitHub'da repo oluştur, sonra:
git remote add origin https://github.com/KULLANICI/file-converter.git
git push -u origin main
```

### 2. Render'a Deploy

1. **Render'a Git:**
   - https://render.com
   - "Get Started for Free"
   - GitHub ile giriş
   - **KART İSTEMEZ!** ✅

2. **New Web Service:**
   - "New +" → "Web Service"
   - GitHub repo'nu bağla
   - `file-converter` seç

3. **Ayarlar:**
   ```
   Name: quick-convert
   Region: Frankfurt
   Branch: main
   Root Directory: file-converter-app
   Environment: Docker
   Dockerfile Path: file-converter-app/Dockerfile
   Plan: Free
   ```

4. **Environment Variables:**
   ```
   NODE_ENV=production
   NEXT_PUBLIC_SITE_URL=https://quick-convert.onrender.com
   ```

5. **Create Web Service**
   - Build başlar (5-10 dakika)

### 3. ✅ Hazır!

URL: `https://quick-convert.onrender.com`

**Maliyet: $0/ay (kart yok!)** 🎉

---

## ⚠️ Uyku Modu

- 15 dakika idle → sleep
- İlk request: 30-60 saniye
- Çözüm: UptimeRobot (ücretsiz, 5 dk ping)

---

**Hazır! Render'a deploy et! 🚀**

