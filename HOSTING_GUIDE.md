# Domain ve Hosting Rehberi - Quick Convert

## 🎯 En İyi Seçenek: Vercel (ÖNERİLEN)

### Neden Vercel?
- ✅ **Tamamen ÜCRETSİZ** (hobby plan)
- ✅ Next.js ile mükemmel entegrasyon
- ✅ Otomatik deployment (GitHub bağlantısı)
- ✅ Global CDN dahil
- ✅ SSL sertifikası ücretsiz
- ✅ Unlimited bandwidth (hobby plan)
- ✅ Preview deployments
- ✅ Analytics dahil

### Vercel Ücretsiz Plan Limitleri:
- 100GB bandwidth/ay
- Unlimited requests
- Serverless functions: 100GB-hours/ay
- Edge functions: 1M invocations/ay

**Bu limitler çoğu başlangıç projesi için yeterli!**

### Vercel'e Deploy Adımları:

1. **GitHub'a Push:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/username/file-converter.git
   git push -u origin main
   ```

2. **Vercel'e Kaydol:**
   - https://vercel.com adresine git
   - GitHub hesabınla giriş yap

3. **Projeyi Import Et:**
   - "New Project" butonuna tıkla
   - GitHub repo'nu seç
   - Vercel otomatik olarak Next.js'i algılar
   - "Deploy" butonuna tıkla

4. **Environment Variables Ekle:**
   - Project Settings > Environment Variables
   - `NEXT_PUBLIC_SITE_URL` ekle (örn: https://quickconvert.vercel.app)

5. **Custom Domain Ekle (Domain aldıktan sonra):**
   - Project Settings > Domains
   - Domain'i ekle ve DNS ayarlarını yap

### Vercel Avantajları:
- ⚡ Çok hızlı deployment (30 saniye)
- 🔄 Her push'ta otomatik deploy
- 📊 Built-in analytics
- 🚀 Edge network (dünya çapında hızlı)

---

## 🌐 Domain Seçenekleri (Ucuz)

### 1. Namecheap (ÖNERİLEN - En Ucuz)
- **Fiyat:** ~$8-12/yıl (.com için)
- **İlk yıl:** Genelde $1-2 (promosyon)
- **Özellikler:**
  - Ücretsiz WHOIS privacy
  - Ücretsiz email forwarding
  - Kolay yönetim paneli
  - 24/7 destek

**Link:** https://www.namecheap.com

### 2. Cloudflare Registrar
- **Fiyat:** At-cost pricing (en ucuz!)
- **Özellikler:**
  - WHOIS privacy dahil
  - Transfer kolay
  - Güvenli

**Link:** https://www.cloudflare.com/products/registrar/

### 3. Google Domains (Artık Squarespace)
- **Fiyat:** ~$12/yıl
- **Özellikler:**
  - Basit arayüz
  - Güvenilir

### 4. Türkiye'den Domain (TLD için)
- **Natro:** ~50-100 TL/yıl (.com.tr)
- **İsimtescil:** ~60-120 TL/yıl
- **Turhost:** ~50-100 TL/yıl

---

## 💰 Maliyet Karşılaştırması

### Seçenek 1: Vercel + Namecheap (ÖNERİLEN)
- **Hosting:** $0/ay (Vercel Free)
- **Domain:** ~$10/yıl (Namecheap)
- **Toplam:** ~$10/yıl = **~$0.83/ay**

### Seçenek 2: Vercel + Cloudflare Registrar
- **Hosting:** $0/ay (Vercel Free)
- **Domain:** ~$8-10/yıl (Cloudflare)
- **Toplam:** ~$8-10/yıl = **~$0.67-0.83/ay**

### Seçenek 3: Netlify (Alternatif)
- **Hosting:** $0/ay (Netlify Free)
- **Domain:** ~$10/yıl
- **Toplam:** ~$10/yıl

### Seçenek 4: Railway/Render (Docker için)
- **Hosting:** $5-7/ay (Railway/Render)
- **Domain:** ~$10/yıl
- **Toplam:** ~$70-94/yıl = **~$5.83-7.83/ay**

---

## 🚀 Vercel'e Deploy İçin Hazırlık

### 1. Vercel için Gerekli Dosyalar

Zaten Next.js kullanıyorsun, ekstra bir şey gerekmez! Ama şunları kontrol et:

#### `vercel.json` (Opsiyonel - özel ayarlar için)
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "regions": ["iad1"]
}
```

#### `.vercelignore` (Opsiyonel)
```
tmp/
*.log
.env.local
node_modules/
```

### 2. Environment Variables

Vercel dashboard'da şunları ekle:
- `NEXT_PUBLIC_SITE_URL` = `https://yourdomain.com`
- `GOOGLE_VERIFICATION` = (Google Search Console'dan)
- `GOOGLE_ANALYTICS_ID` = (G-XXXXXXXXXX)
- `GOOGLE_ADSENSE_ID` = (ca-pub-XXXXXXXXXX)

### 3. Build Ayarları

Vercel otomatik algılar, ama kontrol et:
- **Framework Preset:** Next.js
- **Build Command:** `npm run build` (otomatik)
- **Output Directory:** `.next` (otomatik)
- **Install Command:** `npm ci` (otomatik)

---

## 🔄 Alternatif Hosting Seçenekleri

### 1. Netlify (Vercel'e benzer)
- ✅ Ücretsiz plan
- ✅ Next.js desteği
- ✅ Otomatik deployment
- ❌ Vercel kadar optimize değil

### 2. Railway (Docker için)
- 💰 $5/ay başlangıç
- ✅ Docker desteği
- ✅ Kolay deployment
- ✅ PostgreSQL dahil

### 3. Render (Docker için)
- 💰 $7/ay başlangıç
- ✅ Docker desteği
- ✅ Ücretsiz SSL
- ✅ Auto-deploy

### 4. Fly.io (Docker için)
- 💰 Pay-as-you-go
- ✅ Global edge network
- ✅ Docker desteği
- ✅ İlk 3 app ücretsiz

---

## 📋 Domain Alma Adımları

### Namecheap ile:

1. **Namecheap.com'a git**
2. **Domain ara:** `quickconvert.com` (veya istediğin isim)
3. **Sepete ekle**
4. **Checkout:**
   - WHOIS Privacy ekle (ücretsiz)
   - Auto-renew aç (otomatik yenileme)
5. **Ödeme yap**

### Domain Önerileri:
- `quickconvert.com` ✅
- `quickconvert.io` ✅
- `quickconvert.net` ✅
- `fileconvert.pro` ✅
- `convertfiles.app` ✅

---

## 🔗 Domain'i Vercel'e Bağlama

### Adım 1: Vercel'de Domain Ekle
1. Vercel Dashboard > Project > Settings > Domains
2. "Add Domain" butonuna tıkla
3. Domain'i gir: `quickconvert.com`

### Adım 2: DNS Ayarları
Vercel sana DNS kayıtlarını verir:

**Namecheap'te:**
1. Domain List > Manage
2. Advanced DNS
3. Şu kayıtları ekle:
   ```
   Type: A Record
   Host: @
   Value: 76.76.21.21 (Vercel'in IP'si)
   TTL: Automatic
   
   Type: CNAME Record
   Host: www
   Value: cname.vercel-dns.com
   TTL: Automatic
   ```

**Cloudflare'de:**
1. DNS > Records
2. A record ekle: `@` → Vercel IP
3. CNAME ekle: `www` → Vercel CNAME

### Adım 3: SSL Sertifikası
Vercel otomatik olarak SSL sertifikası verir (Let's Encrypt). 24 saat içinde aktif olur.

---

## 💡 İpuçları

### 1. İlk Yıl İndirimleri
- Namecheap'te ilk yıl çok ucuz ($1-2)
- İkinci yıldan itibaren normal fiyat ($10-12)

### 2. Domain Privacy
- WHOIS privacy ekle (ücretsiz Namecheap'te)
- Spam email'lerden korur

### 3. Auto-Renew
- Her zaman açık tut
- Domain kaybını önler

### 4. Email Forwarding
- Namecheap'te ücretsiz
- `info@quickconvert.com` → kendi email'in

### 5. Vercel Pro Plan ($20/ay)
Sadece şunlar gerekirse:
- Daha fazla bandwidth
- Team collaboration
- Priority support

**Başlangıç için Hobby plan yeterli!**

---

## 🎯 Önerilen Yol Haritası

### Hemen (Ücretsiz):
1. ✅ GitHub'a push yap
2. ✅ Vercel'e deploy et (ücretsiz)
3. ✅ `quickconvert.vercel.app` ile başla

### İlk Ay:
1. ✅ Namecheap'ten domain al (~$10)
2. ✅ Domain'i Vercel'e bağla
3. ✅ SSL aktif olana kadar bekle (24 saat)

### İlk 3 Ay:
1. ✅ Google Search Console ekle
2. ✅ Google Analytics ekle
3. ✅ SEO optimizasyonlarını tamamla

---

## 📊 Maliyet Özeti

| Hizmet | Aylık | Yıllık |
|--------|-------|--------|
| **Vercel (Hobby)** | $0 | $0 |
| **Domain (.com)** | ~$0.83 | ~$10 |
| **Email (Opsiyonel)** | $0-5 | $0-60 |
| **TOPLAM** | **~$0.83-5.83** | **~$10-70** |

**En ucuz seçenek: Vercel + Namecheap = ~$10/yıl!**

---

## 🚨 Dikkat Edilmesi Gerekenler

1. **Vercel Free Plan Limitleri:**
   - 100GB bandwidth/ay
   - Eğer aşarsan Pro plan'a geç ($20/ay)

2. **Domain Renewal:**
   - İlk yıl ucuz, sonra normal fiyat
   - Auto-renew açık tut

3. **Backup:**
   - GitHub'da kod zaten var
   - Vercel otomatik backup yapar

4. **Monitoring:**
   - Vercel Analytics kullan
   - Uptime monitoring ekle (opsiyonel)

---

## ✅ Hızlı Başlangıç Checklist

- [ ] GitHub repo oluştur
- [ ] Kodu push yap
- [ ] Vercel hesabı aç
- [ ] Vercel'e deploy et
- [ ] Test et (vercel.app domain ile)
- [ ] Namecheap'ten domain al
- [ ] Domain'i Vercel'e bağla
- [ ] DNS ayarlarını yap
- [ ] SSL sertifikasını bekle (24 saat)
- [ ] Environment variables ekle
- [ ] Google Search Console ekle

---

## 🆘 Sorun Giderme

### Domain bağlanmıyor?
- DNS propagation 24-48 saat sürebilir
- `dig quickconvert.com` ile kontrol et
- Vercel'in DNS ayarlarını doğru yaptığından emin ol

### SSL sertifikası gelmiyor?
- 24 saat bekle
- Vercel dashboard'da durumu kontrol et
- Domain doğru bağlanmış mı kontrol et

### Build hatası?
- Environment variables eksik olabilir
- `npm run build` lokal'de test et
- Vercel logs'a bak

---

**Sonuç: Vercel + Namecheap = En ucuz ve en iyi seçenek! 🚀**

