# Local Batch Converter - Competitive Benchmark (2026-02-19)

Bu benchmark, benzer araçların öne çıkan yeteneklerini referans alarak Local Batch Converter için ürün yönünü netleştirmek amacıyla hazırlanmıştır.

## İncelenen Uygulamalar
- Smallpdf Desktop (Windows, offline PDF araçları, batch işlemler)
- iLovePDF Desktop (Windows/Mac, offline çalışma, toplu işlem, sağ tık akışları)
- PDF24 Tools + PDF24 Creator (online + offline alternatif)
- CloudConvert API (asenkron job modeli, webhook ve görev zinciri)

## Kaynaklar
- https://smallpdf.com/desktop
- https://www.ilovepdf.com/desktop
- https://tools.pdf24.org/en/
- https://cloudconvert.com/api/v2/jobs

## Rakiplerden Çıkan Ortak Patternler
1. Güçlü preset/araç keşfi: çok sayıda araçta arama ve kategori önemli.
2. Batch-first akış: birden fazla dosyada tek seferde işlem temel beklenti.
3. Offline/privacy söylemi: özellikle desktop uygulamalarda yerel işleme kritik değer önerisi.
4. Job/tabanlı ilerleme: beklemede-işleniyor-tamamlandı-hata net görünmeli.
5. Tek noktadan çıktı alma: toplu indirme (ZIP) ve hızlı yeniden deneme akışı.

## Bu Sprintte Uygulanan İyileştirmeler
1. Preset keşfi hızlandırıldı:
- Preset arama kutusu eklendi.
- Kategori filtreleri (Tümü / Doküman / PDF / Görsel) eklendi.

2. Kuyruk operasyonları genişletildi:
- `Retry failed` (hatalıları toplu tekrar dene) eklendi.
- `Remove done` (tamamlananları toplu kaldır) eklendi.

3. Ayar deneyimi güçlendirildi:
- Dil, Auto ZIP ve TTL değerleri localStorage ile kalıcı hale getirildi.
- Auto ZIP artık gerçekten kuyruk bittiğinde otomatik ZIP indirmesi tetikliyor.

4. Sağ panel bilgi mimarisi iyileştirildi:
- Kuyruk özeti (toplam giriş/çıkış boyutu, kompresyon oranı, ortalama süre) eklendi.

5. UI/UX modernizasyonu:
- Daha belirgin görsel hiyerarşi, yeni tipografi, daha tutarlı panel/kontrast yapısı.
- Mobilde detay paneli drawer benzeri akışla korunuyor.

## Gap Listesi (Sonraki Aşama)
1. Klasör yükleme + alt klasör yapısını koruma
2. İşlem geçmişini kalıcı saklama (restart sonrası devam)
3. Gelişmiş batch adlandırma/şablonları
4. Sağ tık / shell entegrasyonu (desktop wrapper ile)
5. OCR tabanlı kalite kurtarma (özellikle scan PDF -> Word)

## Not
CloudConvert tarafındaki asenkron görev ve webhook yaklaşımı, yerel mimaride API event stream/SSE ile gerçek zamanlı ilerleme modeline genişletilebilir.
