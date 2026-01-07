# 🚀 Icon Dosyaları - Hızlı Başlangıç

## ⚡ En Hızlı Yol (5 Dakika)

### 1. Favicon.io ile Oluştur

1. **Git:** https://favicon.io/favicon-generator/
2. **"Text" sekmesine tıkla**
3. **Ayarlar:**
   - Text: `QC` (Quick Convert)
   - Font: `Roboto` veya `Inter`
   - Background: `#0ea5e9` (Sky-500)
   - Text Color: `#ffffff`
4. **"Download" butonuna tıkla**
5. **Zip'i aç ve şu dosyaları `/public` klasörüne kopyala:**
   ```
   favicon.ico
   android-chrome-192x192.png → icon-192.png (yeniden adlandır)
   android-chrome-512x512.png → icon-512.png (yeniden adlandır)
   apple-touch-icon.png
   ```

### 2. Open Graph Image (og-image.png)

**Canva ile (Ücretsiz):**
1. Git: https://www.canva.com/create/facebook-posts/
2. Boyut: `1200x630px` (Facebook Post)
3. Tasarım:
   - Gradient arka plan (Sky-400 → Purple-400)
   - "Quick Convert" başlık (büyük, bold)
   - "Fast & Free File Converter" alt başlık
4. PNG olarak indir
5. `og-image.png` olarak `/public` klasörüne kaydet

**Veya Figma:**
1. Yeni frame: `1200x630px`
2. Gradient background ekle
3. Text ekle
4. Export → PNG → `/public/og-image.png`

## ✅ Kontrol Listesi

Dosyaları ekledikten sonra şunları kontrol et:

- [ ] `/public/favicon.ico` var mı?
- [ ] `/public/icon-192.png` var mı? (192x192px)
- [ ] `/public/icon-512.png` var mı? (512x512px)
- [ ] `/public/apple-touch-icon.png` var mı? (180x180px)
- [ ] `/public/og-image.png` var mı? (1200x630px)

## 🧪 Test

```bash
# Browser'da aç:
http://localhost:3000/favicon.ico
http://localhost:3000/og-image.png
http://localhost:3000/icon-192.png
```

Browser tab'ında icon görünmeli!

## 📝 Notlar

- Favicon.io tamamen ücretsiz
- Canva ücretsiz plan yeterli
- Tüm dosyalar `/public` klasöründe olmalı
- Dosya isimleri tam olarak yukarıdaki gibi olmalı

## 🆘 Sorun mu var?

- Dosyalar görünmüyor mu? → Browser cache'i temizle (Ctrl+Shift+R)
- Icon görünmüyor mu? → Dosya isimlerini kontrol et
- OG image çalışmıyor mu? → Boyutları kontrol et (1200x630px)

---

**Hazır! 🎉 Artık tüm icon dosyaların var!**

