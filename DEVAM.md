# Nereden devam edeceğim?

Bu not, projeye aradan zaman geçtikten sonra döndüğünde nereden başlayacağını hatırlatmak için. (Son güncelleme: 29 Eylül 2026)

## Durum

- **Canlı site:** https://murtibad.github.io/yasandi (GitHub'da `main` dalına giren her şey 1-2 dakikada yayına çıkar)
- **6 senaryo:** Göz Teması (keko), Yer Ver (otobüs teyzesi), Yetersiz Bakiye (tam senin kaleminde biri), Bi Tabak Daha (Nebahat teyze), Kısa Olmasın (Remzi usta), Niyetimiz Çalıp Çırpmak Değil (Hüsnü ile Tuncay). Toplam 140+ son.
- **Site özellikleri:** başlangıç ekranı ve "YAŞANDI" açılışı, harf harf yazı ve konuşma sesleri, ÖLDÜN damgası ve sarsıntı, açık/koyu mod, son galerisi (sayaca bas), yukarı ok ile komut geçmişi, paylaş düğmesi, WhatsApp/Twitter önizlemesi, sekme ikonu.
- **Karar:** Yeni senaryo eklemek yerine mevcut altısını geliştiriyoruz. Fikirler `ideas/` klasöründe bekliyor.

## Çalışma düzeni

1. Görevler `TASKS.md` dosyasında, "Ready" başlığı altında sırayla duruyor.
2. Gemini (Antigravity) görevi yapar, **ayrı bir dala** gönderir, `main`'e dokunmaz.
3. Claude dalı inceler. Sorun varsa `REVIEW.md` yazar, Gemini düzeltir. Sorun yoksa Claude `main`'e alır, site güncellenir.
4. Kurallar `AGENTS.md`'de: Türkçe ses, rol pası, meme kuralları, dosya formatı.

## Döndüğünde Gemini'ye vereceğin prompt

```
yasandi klasöründe önce "git checkout -- ." ile kaydedilmemiş değişiklikleri at, sonra "git checkout main" ve "git pull" yap. AGENTS.md ve TASKS.md dosyalarını baştan sona oku, "Ready" altındaki ilk görevi kurallara uyarak yap. Bitince bana dal adını, validate çıktısını ve commit hash'ini yaz.
```

Bitince Gemini'nin cevabını Claude'a götür, "incele ve yayına al" de.

## Sırada ne var

- `TASKS.md` → Ready: Yetersiz Bakiye'yi 15+ sona çıkarmak.
- **Hikâye önerme formu:** Bir Google Formu aç, linkini `js/main.js` içindeki `STORY_FORM_URL` satırına yaz (ya da Claude'a ver). Sayfadaki "Hikâyeni anlat" bağlantısı kendiliğinden görünür olur.
- **İleride:** oyuncuların anlaşılmayan komutlarını bir veritabanına kaydetmek, "Bu benim de başıma geldi" düğmesi.

## Kendin test etmek istersen

- `node tests/validate.js`: bütün senaryoları kontrol eder. "All scenarios OK" ve sıfır WARN görmelisin.
- Siteyi telefonda aç, her senaryoyu en doğal cevaplarla oyna (efendim, pardon, hayır, bilmiyorum, kaçıyorum). Güldürmeyen ya da tıkanan yeri ekran görüntüsüyle Claude'a götür. Oyunu en çok bu geliştiriyor.
