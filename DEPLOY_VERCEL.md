# Vercel'e Deploy Rehberi - Hızlı Başlangıç

## 🚀 5 Dakikada Deploy

### 1. GitHub'a Push (İlk kez)

```bash
cd /Users/altanmehmetturkmen/Desktop/file-converter/file-converter-app

# Git repo başlat (eğer yoksa)
git init

# Tüm dosyaları ekle
git add .

# Commit yap
git commit -m "Initial commit - Quick Convert app"

# GitHub'da yeni repo oluştur (github.com'da)
# Sonra şunu çalıştır:
git remote add origin https://github.com/KULLANICI_ADI/file-converter.git
git branch -M main
git push -u origin main
```

### 2. Vercel'e Deploy

1. **Vercel'e Git:**
   - https://vercel.com
   - "Sign Up" → GitHub ile giriş yap

2. **Yeni Proje:**
   - "Add New..." → "Project"
   - GitHub repo'nu seç: `file-converter`
   - "Import" butonuna tıkla

3. **Ayarlar (Otomatik algılanır):**
   - Framework: Next.js ✅
   - Build Command: `npm run build` ✅
   - Output Directory: `.next` ✅
   - Install Command: `npm ci` ✅

4. **Environment Variables Ekle:**
   ```
   NEXT_PUBLIC_SITE_URL=https://quickconvert.vercel.app
   ```
   (Domain aldıktan sonra güncelle)

5. **Deploy:**
   - "Deploy" butonuna tıkla
   - 30-60 saniye bekle
   - ✅ Başarılı!

### 3. Test Et

- Vercel sana bir URL verir: `https://file-converter-xxxxx.vercel.app`
- Bu URL'yi aç ve test et
- Her GitHub push'unda otomatik deploy olur!

---

## 🔧 Environment Variables

Vercel Dashboard > Project > Settings > Environment Variables:

```
NEXT_PUBLIC_SITE_URL=https://quickconvert.vercel.app
GOOGLE_VERIFICATION=your-google-verification-code
GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
GOOGLE_ADSENSE_ID=ca-pub-XXXXXXXXXX
```

**Not:** Domain aldıktan sonra `NEXT_PUBLIC_SITE_URL`'i güncelle!

---

## 🌐 Custom Domain Ekleme

### Adım 1: Vercel'de Domain Ekle
1. Project > Settings > Domains
2. "Add Domain" → Domain'i gir: `quickconvert.com`
3. Vercel sana DNS kayıtlarını gösterir

### Adım 2: DNS Ayarları (Namecheap)

**Namecheap'te:**
1. Domain List > `quickconvert.com` > Manage
2. Advanced DNS sekmesi
3. Mevcut kayıtları sil (gerekirse)
4. Yeni kayıtlar ekle:

```
Type: A Record
Host: @
Value: 76.76.21.21
TTL: Automatic

Type: CNAME Record
Host: www
Value: cname.vercel-dns.com
TTL: Automatic
```

### Adım 3: Bekle
- DNS propagation: 24-48 saat
- SSL sertifikası: 24 saat içinde otomatik

### Adım 4: Kontrol Et
```bash
# Terminal'de test et:
dig quickconvert.com
nslookup quickconvert.com
```

---

## 🔄 Otomatik Deployment

Vercel her GitHub push'unda otomatik deploy yapar:

1. **GitHub'a push yap:**
   ```bash
   git add .
   git commit -m "Update feature"
   git push
   ```

2. **Vercel otomatik olarak:**
   - Yeni build başlatır
   - Test eder
   - Deploy eder
   - Production'a alır

3. **Preview Deployments:**
   - Her PR için preview URL oluşturur
   - Test edebilirsin
   - Merge'den sonra production'a geçer

---

## 📊 Monitoring

### Vercel Analytics
- Dashboard > Analytics
- Traffic, performance, errors
- Ücretsiz plan'da sınırlı

### Vercel Logs
- Deployments > [Deployment] > Logs
- Real-time logs
- Hata ayıklama için

---

## 🐛 Sorun Giderme

### Build Hatası?
```bash
# Lokal'de test et:
npm run build

# Hataları kontrol et
npm run lint
```

### Environment Variable Eksik?
- Vercel Dashboard > Settings > Environment Variables
- Tüm değişkenleri ekle
- Redeploy yap

### Domain Bağlanmıyor?
- DNS ayarlarını kontrol et
- 24-48 saat bekle (propagation)
- Vercel'in verdiği IP'yi kullan

### SSL Sertifikası Yok?
- 24 saat bekle
- Domain doğru bağlanmış mı kontrol et
- Vercel support'a yaz (gerekirse)

---

## 💡 İpuçları

1. **Preview Deployments:**
   - Her PR için otomatik preview
   - Test etmeden merge yapma

2. **Environment Variables:**
   - Production, Preview, Development ayrı
   - Her ortam için ayrı değerler

3. **Build Optimization:**
   - Vercel otomatik optimize eder
   - Image optimization dahil

4. **Edge Network:**
   - Global CDN
   - Dünya çapında hızlı

5. **Bandwidth Limit:**
   - Free plan: 100GB/ay
   - Aşarsan Pro plan ($20/ay)

---

## ✅ Checklist

- [ ] GitHub repo oluşturuldu
- [ ] Kod push edildi
- [ ] Vercel hesabı açıldı
- [ ] Proje import edildi
- [ ] Environment variables eklendi
- [ ] İlk deploy başarılı
- [ ] Test edildi
- [ ] Domain alındı (opsiyonel)
- [ ] Domain bağlandı (opsiyonel)
- [ ] SSL aktif (opsiyonel)

---

**Hazır! 🎉 Artık her push'ta otomatik deploy olacak!**

