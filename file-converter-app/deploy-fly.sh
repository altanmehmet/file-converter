#!/bin/bash

# Fly.io PATH ayarı
export FLYCTL_INSTALL="/Users/altanmehmetturkmen/.fly"
export PATH="$FLYCTL_INSTALL/bin:$PATH"

echo "🚀 Fly.io Deploy Başlıyor..."
echo ""

# Login kontrol
if ! flyctl auth whoami &>/dev/null; then
    echo "🔐 Login gerekli..."
    flyctl auth login
fi

echo ""
echo "📦 Deploy başlatılıyor..."
echo ""

# Deploy
flyctl deploy

echo ""
echo "✅ Deploy tamamlandı!"
echo ""
echo "🌐 URL'yi görmek için: flyctl status"
