# Icon ve Favicon Oluşturma Rehberi

## Gerekli Dosyalar

Aşağıdaki dosyaları `/public` klasörüne eklemen gerekiyor:

### 1. favicon.ico
- Boyut: 16x16, 32x32, 48x48 (multi-size)
- Format: ICO
- Araç: https://favicon.io/favicon-generator/

### 2. icon-192.png
- Boyut: 192x192px
- Format: PNG
- Kullanım: PWA icon, Android

### 3. icon-512.png
- Boyut: 512x512px
- Format: PNG
- Kullanım: PWA icon, Android

### 4. apple-touch-icon.png
- Boyut: 180x180px
- Format: PNG
- Kullanım: iOS Safari

### 5. og-image.png
- Boyut: 1200x630px
- Format: PNG veya JPG
- Kullanım: Open Graph (Facebook, LinkedIn, Twitter)

## Hızlı Oluşturma

### Online Araçlar:
1. **Favicon.io**: https://favicon.io/favicon-generator/
   - Text veya image'dan favicon oluştur
   - Tüm boyutları otomatik oluşturur

2. **RealFaviconGenerator**: https://realfavicongenerator.net/
   - Tüm platformlar için optimize eder
   - Manifest dosyası da oluşturur

3. **Canva**: https://www.canva.com/
   - og-image.png için tasarım yap
   - Template: "Facebook Post" (1200x630)

### Tasarım Önerileri:

**Favicon/Icon için:**
- Basit ve tanınabilir
- "QC" harfleri veya dosya ikonu
- Gradient: Sky-400 to Purple-400 (uygulama temasıyla uyumlu)

**OG Image için:**
- "Quick Convert" başlık
- "Fast & Free File Converter" alt başlık
- Arka plan: Gradient (Sky to Purple)
- Dosya ikonları (PDF, Word, Excel, Image)
- Boyut: 1200x630px

## Geçici Çözüm (Placeholder)

Şimdilik basit placeholder'lar oluşturabilirsin veya online araçlarla hızlıca yapabilirsin.

## Kontrol

Dosyaları ekledikten sonra:
- `http://localhost:3000/favicon.ico` - Favicon görünmeli
- `http://localhost:3000/og-image.png` - OG image görünmeli
- Browser tab'ında icon görünmeli

