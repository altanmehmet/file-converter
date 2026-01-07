# 🚀 Fly.io Deploy - Adım Adım

## ✅ Adım 1: Fly.io CLI Kuruldu!

CLI başarıyla kuruldu. Şimdi devam edelim:

## 🔐 Adım 2: Login (Browser'da)

1. Terminal'de şunu çalıştır:
```bash
cd /Users/altanmehmetturkmen/Desktop/file-converter/file-converter-app
export FLYCTL_INSTALL="/Users/altanmehmetturkmen/.fly"
export PATH="$FLYCTL_INSTALL/bin:$PATH"
flyctl auth login
```

2. Browser açılacak, GitHub ile giriş yap
3. İzinleri ver
4. Terminal'e dön, "Success" mesajını gör

## 🚀 Adım 3: Deploy

Login başarılı olduktan sonra:

```bash
# Hala file-converter-app klasöründe olmalısın
flyctl launch

# Sorular:
# - App name: quick-convert (veya istediğin isim)
# - Region: istanbul (veya en yakın bölge seç)
# - Dockerfile: ./Dockerfile (otomatik bulur)
# - Overwrite? N (hayır, mevcut dosyaları koru)
```

## 🔧 Adım 4: Environment Variables

```bash
flyctl secrets set NODE_ENV=production
flyctl secrets set NEXT_PUBLIC_SITE_URL=https://quick-convert.fly.dev
```

(URL'yi `flyctl launch` sana verecek, onu kullan)

## 📦 Adım 5: Deploy

```bash
flyctl deploy
```

5-10 dakika sürer, bekle...

## ✅ Adım 6: Test

```bash
# URL'yi gör:
flyctl status

# Veya browser'da aç:
# https://quick-convert.fly.dev
```

## 🎉 Hazır!

Artık uygulaman canlıda ve **TAMAMEN ÜCRETSİZ!** 🎉

---

## 📝 Notlar

- İlk deploy 5-10 dakika sürebilir
- Her değişiklik için: `flyctl deploy`
- Logs görmek için: `flyctl logs`
- App durumu: `flyctl status`

---

## 🆘 Sorun mu Var?

### Login çalışmıyor?
- Browser'da manuel aç: https://fly.io/app/auth/cli
- Token'ı kopyala ve terminal'e yapıştır

### Deploy hatası?
```bash
flyctl logs
```
Logs'a bak, hataları gör

### Port hatası?
Fly.io otomatik algılar (3000), sorun yok

---

**Hazır! Şimdi login yap ve deploy et! 🚀**

