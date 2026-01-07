# 📤 GitHub'a Push - Adım Adım

## ✅ Git Repo Hazır!

Tüm dosyalar commit edildi. Şimdi GitHub'a push yap:

## 🚀 Adım 1: GitHub'da Repo Oluştur

1. **GitHub'a Git:**
   - https://github.com/new
   - Veya: https://github.com → "New repository"

2. **Repo Ayarları:**
   - **Repository name:** `file-converter`
   - **Description:** (opsiyonel) "Quick Convert - Free File Converter"
   - **Public** veya **Private** seç
   - **"Add a README file"** işaretleme (zaten var)
   - **"Add .gitignore"** işaretleme (zaten var)
   - **"Choose a license"** (opsiyonel)

3. **"Create repository"** butonuna tıkla

## 📤 Adım 2: Push Yap

GitHub repo oluşturduktan sonra, GitHub sana komutlar gösterecek. Şunu çalıştır:

```bash
cd /Users/altanmehmetturkmen/Desktop/file-converter

git remote add origin https://github.com/KULLANICI/file-converter.git
git branch -M main
git push -u origin main
```

**⚠️ ÖNEMLİ:** `KULLANICI` yerine GitHub kullanıcı adını yaz!

Örnek:
```bash
git remote add origin https://github.com/altanmehmetturkmen/file-converter.git
git branch -M main
git push -u origin main
```

## ✅ Adım 3: Kontrol Et

GitHub'da repo'na git, dosyaların yüklendiğini gör:
- https://github.com/KULLANICI/file-converter

## 🎯 Sonraki Adım: Render'a Deploy

GitHub'a push yaptıktan sonra `RENDER_DEPLOY_NOW.md` dosyasına bak!

---

**Hazır! GitHub'a push yap! 🚀**

