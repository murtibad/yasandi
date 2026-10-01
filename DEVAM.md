# Nereden devam edeceğim?

Bu not, projeye aradan zaman geçtikten sonra döndüğünde nereden başlayacağını hatırlatmak için. (Son güncelleme: 1 Ekim 2026)

## Durum

- **Canlı site:** https://murtibad.github.io/yasandi (GitHub'da `main` dalına giren her şey 1-2 dakikada yayına çıkar)
- **12 senaryo**, toplam 200+ son. Liste `README.md`'de.
- **Oyun seni hatırlar:** bir senaryoya döndüğünde anlatıcı geçen seferki sonunu anar ("Keko yine köşede. Kıçın bunu hatırlıyor."), ilk kez geldiğin senaryoda başka senaryodan bir gönderme yapar (bıçaklayan keko otobüste arka koltukta). Satırlar her senaryo dosyasının `remember` bölümünde.
- **Karar (1 Ekim):** Yeni senaryo yok. Mevcutları geliştiriyoruz: arkadaşların en çok "yazdığıma alakasız cevap verdi" dedi, şu anki iş bunu düzeltmek.

## Çalışma düzeni

1. Görevler `TASKS.md` dosyasında, "Ready" başlığı altında sırayla duruyor. Şu an 9. görev: her senaryoyu ayrı dalda oyuncu gibi test etmek. `is-gorusmesi` ve `saglik-raporu` bitti, sırada `tahtaya-kalk`.
2. Gemini (Antigravity) görevi yapar, **ayrı bir dala** gönderir, `main`'e dokunmaz.
3. Claude dalı inceler ve oynar. Sorun varsa `REVIEW.md` yazar, Gemini düzeltir. Küçük sorunları Claude kendisi düzeltip `main`'e alır.
4. Kurallar `AGENTS.md`'de: Türkçe ses, rol pası, meme kuralları, dosya formatı.

## Döndüğünde Gemini'ye vereceğin prompt

Her seferinde yeni sohbet aç ve şunu yapıştır (senaryo adını TASKS.md'deki sıradakiyle değiştir):

```
Önce git checkout main ve git pull yap. AGENTS.md, TASKS.md ve FEEDBACK.md'yi baştan sona oku.
TASKS.md'deki 9. görevi SADECE tahtaya-kalk için yap. Dal: fix/play-tahtaya-kalk.
Sadece js/data/scenarios/tahtaya-kalk.js, tests/engine.js ve tests/play/tahtaya-kalk.txt dosyalarına dokun.
Girdileri node tests/play.js tahtaya-kalk ile oynat ve her cevabı oku; kendi test betiğini yazma.
Anahtar kelimeyi kısaltarak veya genişleterek düzeltme yapma.
Bitince dalı push et, bana validate/engine çıktısını ve düzelttiğin girdileri önce/sonra yaz.
```

Bitince Gemini'nin cevabını Claude'a götür, "incele ve yayına al" de.

## Sırada ne var

- `TASKS.md` → 9. görev (sırayla: `tahtaya-kalk`, `apartman-kedisi`, `piknik-karincasi`, `2010-bir-gun`), sonra 10. görev (eski senaryolar).
- **Boyut sınırı:** `js` + `css` sınırı 300 KB'tan 600 KB'a çıkarıldı (şu an ~360 KB; GitHub Pages sıkıştırarak sunuyor, telefona ~100 KB iniyor). Sınır artık sorun değil, içerik rahatça büyüyebilir.
- **Hikâye önerme formu:** Bir Google Formu aç, linkini `js/main.js` içindeki `STORY_FORM_URL` satırına yaz (ya da Claude'a ver). Sayfadaki "Hikâyeni anlat" bağlantısı kendiliğinden görünür olur.
- **İleride:** oyuncuların anlaşılmayan komutlarını bir veritabanına kaydetmek (senin backend projen), takılınca dokunulabilir öneriler.

## Kendin test etmek istersen

- `node tests/validate.js`: bütün senaryoları kontrol eder. "All scenarios OK" ve sıfır WARN görmelisin.
- `node tests/play.js goz-temasi --run "efendim" "kaçıyorum"`: bir oyunu baştan oynatıp cevapları yazdırır.
- Siteyi telefonda aç, her senaryoyu en doğal cevaplarla oyna (efendim, pardon, hayır, bilmiyorum, kaçıyorum). Güldürmeyen ya da tıkanan yeri ekran görüntüsüyle Claude'a götür. Oyunu en çok bu geliştiriyor.
- Hatırlamayı görmek için bir senaryoyu bitir, sonra "tekrar" yaz.
