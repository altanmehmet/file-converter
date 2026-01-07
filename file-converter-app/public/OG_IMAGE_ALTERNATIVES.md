# Open Graph Image (og-image.png) Oluşturma - Alternatif Yöntemler

## 🚨 Canva Çalışmıyorsa - Alternatifler

### Yöntem 1: Canva Manuel (En Kolay)

1. **Canva Ana Sayfa:** https://www.canva.com/
2. **"Create a design"** butonuna tıkla
3. **"Custom size"** seç
4. **Boyut gir:** `1200` x `630` pixels
5. **"Create"** butonuna tıkla
6. Tasarım yap:
   - Gradient arka plan ekle (Sky-400 → Purple-400)
   - "Quick Convert" text ekle (büyük, bold)
   - "Fast & Free File Converter" alt text
7. **Download** → **PNG** → `og-image.png` olarak kaydet

### Yöntem 2: Figma (Ücretsiz)

1. **Figma:** https://www.figma.com/
2. **"New design file"** oluştur
3. **Frame oluştur:** `1200x630px`
4. Tasarım yap
5. **Export** → **PNG** → `og-image.png`

### Yöntem 3: Online OG Image Generator

1. **OG Image Generator:** https://www.opengraph.xyz/
   - Text gir
   - Otomatik oluşturur
   - Download

2. **Social Share Preview:** https://socialsharepreview.com/
   - URL gir
   - Preview gör
   - Screenshot al

### Yöntem 4: Photoshop/GIMP

1. Yeni dosya: `1200x630px`
2. Gradient ekle
3. Text ekle
4. Export → PNG

### Yöntem 5: Basit HTML + Screenshot (Hızlı)

Aşağıdaki HTML dosyasını oluştur, browser'da aç, screenshot al:

```html
<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            margin: 0;
            width: 1200px;
            height: 630px;
            background: linear-gradient(135deg, #38bdf8 0%, #a855f7 100%);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            font-family: system-ui, -apple-system, sans-serif;
            color: white;
        }
        h1 {
            font-size: 72px;
            font-weight: bold;
            margin: 0;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
        }
        p {
            font-size: 32px;
            margin: 20px 0 0 0;
            opacity: 0.9;
        }
    </style>
</head>
<body>
    <h1>Quick Convert</h1>
    <p>Fast & Free File Converter</p>
</body>
</html>
```

Browser'da aç → F12 → Device toolbar → 1200x630 → Screenshot al

### Yöntem 6: Python Script (Otomatik)

```python
from PIL import Image, ImageDraw, ImageFont

# 1200x630 image oluştur
img = Image.new('RGB', (1200, 630), color='#0ea5e9')
draw = ImageDraw.Draw(img)

# Gradient (basit)
for i in range(630):
    r = int(56 + (168-56) * i / 630)  # Sky to Purple
    g = int(189 + (85-189) * i / 630)
    b = int(248 + (247-248) * i / 630)
    draw.rectangle([(0, i), (1200, i+1)], fill=(r, g, b))

# Text ekle (font gerekli)
# draw.text((600, 250), "Quick Convert", fill='white', anchor='mm')
# draw.text((600, 350), "Fast & Free File Converter", fill='white', anchor='mm')

img.save('og-image.png')
```

## ✅ Hızlı Çözüm (5 Dakika)

**En basit yol:**

1. **Canva.com** → Ana sayfa
2. **"Create a design"** → **"Custom size"**
3. **1200 x 630** gir
4. **Gradient background** ekle
5. **Text ekle:** "Quick Convert"
6. **Download** → **PNG**
7. `/public/og-image.png` olarak kaydet

## 🎨 Tasarım Önerileri

- **Arka plan:** Gradient (Sky-400 #38bdf8 → Purple-400 #a855f7)
- **Başlık:** "Quick Convert" (72px, bold, white)
- **Alt başlık:** "Fast & Free File Converter" (32px, white, opacity 0.9)
- **İkonlar (opsiyonel):** PDF, Word, Excel, Image dosya ikonları

## 📝 Notlar

- Boyut: **1200x630px** (kesinlikle bu boyut!)
- Format: **PNG** veya **JPG**
- Dosya adı: **og-image.png** (tam olarak)
- Konum: `/public/og-image.png`

## 🆘 Hala Sorun mu Var?

Eğer hiçbiri çalışmıyorsa, bana söyle - ben basit bir placeholder oluşturabilirim!

