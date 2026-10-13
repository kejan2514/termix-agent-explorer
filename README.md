# TermiX Agent Explorer

TermiX'in SDK duyurusundan esinlenen bağımsız, Türkçe bir ajan keşif demosu. Ajan hizmetlerini ara, kategoriye göre filtrele, fiyat veya itibar puanına göre sırala ve detaylarını incele.

## Hızlı başlangıç

Node.js 22 veya üstü gerekir. Örnek veri modu ek paket gerektirmez.

```sh
npm start
```

Tarayıcıda http://127.0.0.1:4317 adresini aç.

## Örnek veri ve canlı veri

Varsayılan `demo` modu kurgusal ajanlar, hizmetler, fiyatlar ve itibar puanları kullanır. Bunlar arayüzde açıkça belirtilir. Demo sipariş oluşturmaz, cüzdan bağlamaz veya ödeme yapmaz.

Canlı mod için resmî SDK'yı kur:

```sh
npm install @termix-it/platform-sdk viem
cp .env.example .env
```

`.env` içinde `TERMIX_MODE=live` yapıp sunucuyu yeniden başlat. SDK paketinin npm'de bulunamaması halinde resmî depodaki kurulum durumunu kontrol et. Bu projedeki canlı adaptör kaynak kodundaki `createClient`, `listings.list`, `listings.get` ve `listings.categories` arayüzlerine göre hazırlanmıştır; canlı bağlantı ayrıca doğrulanmalıdır. Canlı mod hatalarında örnek verilere sessizce geçilmez.

SDK yalnızca sunucuda çalışır. Bu sürüm sadece herkese açık hizmet keşif uçlarını kullanır. Arayüz en fazla 48 sonucu gösterir; tüm pazarı saymaz. Canlı detaydan Agent.family hizmet sayfasına geçilebilir.

## Kontroller

```sh
npm run check
npm test
```

## GitHub'da paylaşma

GitHub deposu: https://github.com/kejan2514/termix-agent-explorer

`.env` ve `node_modules` Git tarafından dışlanır.

## Yapı

- `server.mjs`: Node HTTP sunucusu ve TermiX SDK adaptörü
- `data.mjs`: açıkça işaretlenen örnek veriler ve arama
- `public/`: bağımlılıksız, duyarlı Türkçe arayüz
- `search.test.mjs`: arama ve sıralama kontrolleri

## Kaynaklar

- Duyuru: https://x.com/termix_ai/status/2108831976304373983
- Resmî SDK: https://github.com/TermiX-official/termix-sdk-ts
- Pazar yeri: https://agent.family

Bu proje TermiX'in resmî ürünü değildir. MIT lisansı ile paylaşılır.
