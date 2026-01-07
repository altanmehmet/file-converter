# 💰 ÜCRETSİZ Deployment Seçenekleri - Quick Convert

## 🆓 Tamamen ÜCRETSİZ Seçenekler

### 1. Fly.io (ÖNERİLEN - Ücretsiz!) ⭐⭐⭐

**Neden Fly.io?**
- ✅ **İlk 3 app TAMAMEN ÜCRETSİZ**
- ✅ Docker desteği
- ✅ Global edge network
- ✅ 3GB RAM, 160GB storage ücretsiz
- ✅ Custom domain ücretsiz
- ✅ SSL otomatik

**Fiyat:** $0/ay (ilk 3 app için!)

**Limitler (Ücretsiz):**
- 3 shared-cpu-1x VM
- 160GB persistent storage
- 100GB outbound data transfer/ay

**Bu limitler çoğu başlangıç projesi için yeterli!**

---

### 2. Render (Ücretsiz Plan - Sınırlı)

**Neden Render?**
- ✅ Ücretsiz plan var
- ✅ Docker desteği
- ❌ **15 dakika idle sonra uyku modu** (ilk request yavaş)
- ❌ Sınırlı kaynaklar

**Fiyat:** $0/ay (ama sınırlı)

**Limitler:**
- 750 saat/ay (tek service)
- 15 dakika idle → sleep
- 512MB RAM
- Sınırlı CPU

**Not:** İlk request 30-60 saniye sürebilir (uyku modundan uyanma)

---

### 3. Railway (Ücretsiz Kredi)

**Neden Railway?**
- ✅ $5 ücretsiz kredi/ay
- ✅ Docker desteği
- ✅ Kolay kurulum
- ⚠️ Kredi bitince durur

**Fiyat:** $0/ay (ilk ay, $5 kredi ile)

**Limitler:**
- $5 kredi/ay
- Kredi bitince durur
- Sonra $5/ay ödemen gerekir

---

## 🎯 En İyi Seçenek: Fly.io (ÜCRETSİZ!)

### Fly.io Ücretsiz Plan Detayları:

**Tamamen Ücretsiz:**
- ✅ 3 shared-cpu-1x VM
- ✅ 160GB persistent storage
- ✅ 100GB outbound data/ay
- ✅ Custom domain
- ✅ SSL sertifikası
- ✅ Global edge network

**Bu limitler çoğu proje için yeterli!**

---

## 🚀 Fly.io Deploy - ÜCRETSİZ

### Adım 1: Fly.io CLI Kur

**macOS:**
```bash
curl -L https://fly.io/install.sh | sh
```

**Windows:**
```powershell
powershell -Command "iwr https://fly.io/install.ps1 -useb | iex"
```

**Linux:**
```bash
curl -L https://fly.io/install.sh | sh
```

### Adım 2: Login

```bash
fly auth login
```

Browser açılır, GitHub ile giriş yap.

### Adım 3: Deploy

```bash
cd /Users/altanmehmetturkmen/Desktop/file-converter/file-converter-app

# Fly.io projesi oluştur
fly launch

# Sorular:
# - App name: quick-convert (veya istediğin isim)
# - Region: İstanbul veya en yakın bölge
# - Dockerfile: ./Dockerfile (otomatik bulur)
# - Overwrite? N (hayır, mevcut dosyaları koru)
```

### Adım 4: Environment Variables

```bash
fly secrets set NODE_ENV=production
fly secrets set NEXT_PUBLIC_SITE_URL=https://quick-convert.fly.dev
```

### Adım 5: Deploy

```bash
fly deploy
```

**5-10 dakika sürer, bekle...**

### Adım 6: Test

```bash
# URL'yi gör:
fly status

# Veya browser'da aç:
# https://quick-convert.fly.dev
```

---

## 💡 Fly.io İpuçları

### Custom Domain Ekle:

```bash
fly certs add yourdomain.com
```

DNS ayarlarını yap (Fly.io sana gösterir).

### Logs Gör:

```bash
fly logs
```

### App Durumu:

```bash
fly status
```

### Restart:

```bash
fly apps restart quick-convert
```

---

## 📊 Ücretsiz Plan Karşılaştırması

| Özellik | Fly.io | Render | Railway |
|---------|--------|--------|---------|
| **Fiyat** | $0/ay | $0/ay | $0/ay (ilk ay) |
| **Docker** | ✅ | ✅ | ✅ |
| **Idle Sleep** | ❌ | ✅ (15 dk) | ❌ |
| **RAM** | 256MB | 512MB | Sınırlı |
| **Storage** | 160GB | Sınırlı | Sınırlı |
| **Bandwidth** | 100GB/ay | Sınırlı | $5 kredi |
| **Custom Domain** | ✅ | ✅ | ✅ |
| **SSL** | ✅ | ✅ | ✅ |

**Kazanan: Fly.io! 🏆**

---

## 🆓 Tamamen Ücretsiz Strateji

### Seçenek 1: Fly.io (ÖNERİLEN)

1. Fly.io'ya kaydol
2. İlk 3 app ücretsiz
3. Dockerfile ile deploy
4. ✅ Tamamen ücretsiz!

**Maliyet: $0/ay**

### Seçenek 2: Render (Uyku Modu ile)

1. Render'a kaydol
2. Ücretsiz plan seç
3. Dockerfile ile deploy
4. ⚠️ 15 dakika idle → sleep
5. İlk request yavaş (30-60 saniye)

**Maliyet: $0/ay (ama yavaş)**

### Seçenek 3: Railway (İlk Ay)

1. Railway'a kaydol
2. $5 ücretsiz kredi
3. İlk ay ücretsiz
4. Sonra $5/ay

**Maliyet: $0/ay (ilk ay), sonra $5/ay**

---

## 🎯 Önerilen: Fly.io

**Neden?**
- ✅ Tamamen ücretsiz (ilk 3 app)
- ✅ Uyku modu yok (her zaman hızlı)
- ✅ Docker desteği
- ✅ Global edge network
- ✅ Custom domain ücretsiz

**Tek dezavantaj:**
- CLI kurman gerekir (ama kolay)

---

## 💰 Maliyet Özeti

### Fly.io:
- **İlk 3 app:** $0/ay ✅
- **Sonra:** Pay-as-you-go
- **Bu proje için:** $0/ay!

### Render:
- **Ücretsiz plan:** $0/ay
- **Ama:** 15 dk idle → sleep
- **İlk request:** 30-60 saniye

### Railway:
- **İlk ay:** $0/ay ($5 kredi)
- **Sonra:** $5/ay

---

## 🚀 Hızlı Başlangıç (Fly.io)

```bash
# 1. CLI kur
curl -L https://fly.io/install.sh | sh

# 2. Login
fly auth login

# 3. Deploy
cd file-converter-app
fly launch
fly deploy

# 4. ✅ Hazır!
```

**Toplam süre: 10 dakika**
**Maliyet: $0/ay** 🎉

---

## 🆘 Sorun Giderme

### Fly.io CLI Kurulmuyor?

```bash
# macOS için:
brew install flyctl

# Veya manuel:
curl -L https://fly.io/install.sh | sh
```

### Deploy Hatası?

```bash
# Logs'a bak:
fly logs

# Build logları:
fly deploy --verbose
```

### Port Hatası?

Fly.io otomatik algılar (3000), sorun yok.

---

## ✅ Sonuç

**En ucuz seçenek: Fly.io = $0/ay!** 🎉

1. Fly.io CLI kur
2. Login yap
3. Deploy et
4. ✅ Tamamen ücretsiz!

**Hazır! 🚀**

