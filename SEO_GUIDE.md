# SEO Optimizasyon Rehberi - Quick Convert

## ✅ Yapılan SEO İyileştirmeleri

### 1. Metadata Optimizasyonu
- ✅ Gelişmiş title ve description
- ✅ Open Graph tags (Facebook, LinkedIn)
- ✅ Twitter Cards
- ✅ Keywords meta tags
- ✅ Canonical URLs
- ✅ Author ve Publisher bilgileri

### 2. Teknik SEO
- ✅ `robots.txt` dosyası (Next.js App Router)
- ✅ `sitemap.xml` otomatik oluşturma
- ✅ Structured Data (JSON-LD) - WebApplication schema
- ✅ Semantic HTML yapısı
- ✅ Mobile-friendly tasarım
- ✅ HTTPS zorunluluğu

### 3. Performans Optimizasyonu
- ✅ Gzip compression
- ✅ Image optimization (AVIF, WebP)
- ✅ ETag generation
- ✅ Security headers

## 📋 Yapılması Gerekenler

### 1. Environment Variables (.env.local)
Aşağıdaki değişkenleri `.env.local` dosyasına ekleyin:

```env
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
GOOGLE_VERIFICATION=your-google-verification-code
YANDEX_VERIFICATION=your-yandex-verification-code
YAHOO_VERIFICATION=your-yahoo-verification-code
```

### 2. Open Graph Image
`/public/og-image.png` dosyası oluşturun:
- Boyut: 1200x630px
- Format: PNG veya JPG
- İçerik: Quick Convert logosu ve açıklama

### 3. Favicon ve Icons
`/public` klasörüne ekleyin:
- `favicon.ico`
- `apple-touch-icon.png` (180x180)
- `icon-192.png` ve `icon-512.png` (PWA için)

### 4. Google Search Console
1. [Google Search Console](https://search.google.com/search-console) hesabı oluşturun
2. Sitenizi doğrulayın (HTML tag veya DNS)
3. Sitemap'i gönderin: `https://yourdomain.com/sitemap.xml`
4. URL inspection ile sayfaları test edin

### 5. Google Analytics
1. Google Analytics hesabı oluşturun
2. Measurement ID'yi alın (G-XXXXXXXXXX)
3. `layout.tsx` dosyasındaki `G-PLACEHOLDER` değerini değiştirin

### 6. Google AdSense
1. AdSense hesabı oluşturun
2. Publisher ID'yi alın (ca-pub-XXXXXXXXXX)
3. `layout.tsx` ve `page.tsx` dosyalarındaki `ca-pub-PLACEHOLDER` değerlerini değiştirin
4. Ad slot ID'lerini ekleyin

### 7. İçerik Optimizasyonu

#### Ana Sayfa İçin:
- ✅ Structured Data eklendi
- ✅ Meta description optimize edildi
- ✅ H1 tag eklendi (görünür ve sr-only)
- ⚠️ Alt text'ler görseller için eklenmeli (SVG'ler için gerekli değil)

#### Blog/İçerik Sayfaları (Opsiyonel):
- "How to convert PDF to Word" gibi rehber sayfaları
- "Best file converter tools" gibi karşılaştırma içerikleri
- FAQ sayfası

### 8. Backlink Stratejisi
- Reddit'te ilgili subreddit'lere paylaşım
- Product Hunt'ta launch
- Hacker News'de paylaşım
- GitHub'da açık kaynak olarak paylaşım
- Medium'da blog yazıları

### 9. Sosyal Medya
- Twitter/X hesabı
- LinkedIn sayfası
- Facebook sayfası
- Sosyal medya paylaşım butonları eklenebilir

### 10. Performans Testleri
- [Google PageSpeed Insights](https://pagespeed.web.dev/)
- [GTmetrix](https://gtmetrix.com/)
- [WebPageTest](https://www.webpagetest.org/)

Hedef skorlar:
- Performance: 90+
- Accessibility: 90+
- Best Practices: 90+
- SEO: 100

### 11. Anahtar Kelime Stratejisi

**Birincil Anahtar Kelimeler:**
- file converter
- PDF converter
- PDF to Word
- Word to PDF
- free file converter
- online converter

**Uzun Kuyruk Anahtar Kelimeler:**
- convert PDF to Word online free
- batch file converter
- PDF splitter online
- merge PDF files free
- compress PDF online

### 12. Local SEO (Eğer gerekiyorsa)
- Google Business Profile
- Yerel dizinler
- Schema.org LocalBusiness markup

## 🔍 SEO Kontrol Listesi

### Teknik SEO
- [x] robots.txt
- [x] sitemap.xml
- [x] Canonical URLs
- [x] Meta tags
- [x] Structured Data
- [x] Open Graph image (metadata hazır, dosya eklenecek)
- [x] Favicon set (metadata hazır, dosyalar eklenecek)
- [ ] Mobile-friendly test
- [ ] SSL certificate
- [x] 404 page

### İçerik SEO
- [x] Title tags optimize
- [x] Meta descriptions
- [ ] H1 tags
- [ ] Alt text for images
- [ ] Internal linking
- [ ] Content length (300+ words per page)

### Performans
- [x] Compression enabled
- [x] Image optimization
- [ ] Lazy loading
- [ ] CDN setup
- [ ] Caching strategy

### Analytics & Monitoring
- [ ] Google Analytics
- [ ] Google Search Console
- [ ] Bing Webmaster Tools
- [ ] Error tracking

## 📊 Beklenen Sonuçlar

### İlk 3 Ay:
- Google indexleme: 5-10 sayfa
- Organik trafik: 100-500 ziyaret/ay
- Backlink: 5-10

### 6 Ay:
- Organik trafik: 1,000-5,000 ziyaret/ay
- Sıralama: İlk 3 sayfada 5-10 anahtar kelime
- Backlink: 20-50

### 12 Ay:
- Organik trafik: 10,000+ ziyaret/ay
- Sıralama: İlk sayfada 10-20 anahtar kelime
- Backlink: 100+

## 🚀 Hızlı Başlangıç

1. Environment variables'ı ayarlayın
2. Google Search Console'a kaydolun
3. Sitemap'i gönderin
4. Open Graph image oluşturun
5. Google Analytics'i kurun
6. İlk içerikleri oluşturun (blog sayfaları)

## 📝 Notlar

- SEO sonuçları 3-6 ay içinde görülmeye başlar
- Düzenli içerik güncellemeleri önemlidir
- Backlink kalitesi miktardan önemlidir
- Kullanıcı deneyimi SEO'yu doğrudan etkiler
- Mobile-first yaklaşım kritiktir

