# Yaşandı

Türkiye'de herkesin başına gelmiş gündelik anlardan oluşan, yazarak oynanan kısa bir metin oyunu.

Her girişte rastgele bir senaryo gelir. Ne yapacağını düz Türkçe yazarsın; oyun bazen anlar, bazen anlamaz. Her senaryonun birden fazla sonu var, hepsini bulmaya çalış.

> Yanlışlıkla bir keko ile göz göze geldin.
> — Hayırdır la gardaş?
>
> ›› ben de arka cebimden bıçak çıkardım

Canlı sürüm: https://murtibad.github.io/yasandi

## Çalıştırma

Kurulum, derleme ya da paket yok. Üç yoldan biri yeter:

1. **İnternetten:** https://murtibad.github.io/yasandi adresini aç. `main` dalına gelen her değişiklik GitHub Pages'e otomatik yüklenir.
2. **Dosyadan:** Depoyu indir (`git clone https://github.com/murtibad/yasandi.git`) ve `index.html` dosyasını tarayıcıda aç.
3. **Yerel sunucuyla (isteğe bağlı):** Proje klasöründe `python3 -m http.server 8000` çalıştır, tarayıcıda `http://localhost:8000` adresine git.

Yazı tipi, görsel ya da ses dosyası yok; oyun internet olmadan da açılır.

## Nasıl oynanır

- Ne yaptığını ya da ne dediğini yaz, Enter'a bas (veya gönder düğmesine dokun).
- Takılırsan `?` (ya da `ipucu`, `yardım`) yaz; anlatıcı o ana uygun bir ipucu verir.
- `tekrar` yazarsan aynı senaryo baştan başlar, `başka` yazarsan başka bir senaryoya geçersin. Bir son gördüğünde aynı işler için **Tekrar oyna**, **Başka senaryo** ve **Paylaş** düğmeleri çıkar.
- Üst çubuktaki sayaç bu senaryoda kaç son bulduğunu gösterir; tıklarsan bulduğun sonların listesi açılır.
- Ses ve açık/koyu tema üst sağdaki düğmelerden değişir. Seçimlerin ve bulduğun sonlar tarayıcıda (`localStorage`) saklanır.

## Proje yapısı

```
index.html                         sayfa; her dosyayı ?v=N ile yükler
css/style.css                      görünüm (koyu ve açık tema)
js/text.js                         Türkçe metin normalleştirme ve eşleştirme
js/engine.js                       oyun motoru (DOM yok, sadece mantık)
js/main.js                         ekran: daktilo efekti, giriş, sonlar
js/sound.js                        yazma sesleri ve son müzikleri (Web Audio, dosya yok)
js/data/global-intents.js          her senaryoda geçerli komutlar (polis, anne, dans...)
js/data/scenarios/<id>.js          her senaryo ayrı bir dosya, sadece içerik
tests/validate.js                  senaryolarda kırık bağlantı ve eksik kontrolü
assets/                            favicon ve paylaşım görseli
ideas/                             senaryo fikirleri ve notlar
```

Şu anki senaryolar: Göz Teması, Yer Ver, Yetersiz Bakiye, Bi Tabak Daha, Kısa Olmasın, Niyetimiz Çalıp Çırpmak Değil, Apartmanın Sahibi, Biz Sizi Ararız.

## Yeni senaryo eklemek

Ayrıntılı kurallar (anahtar kelimeler, olumsuzluk, `freeze`, `look`, yazım üslubu) `AGENTS.md` dosyasında. Kısaca:

1. `js/data/scenarios/goz-temasi.js` dosyasını kopyala, adını senaryo kimliğiyle değiştir (küçük harf, tireli, Türkçe karaktersiz: `is-gorusmesi.js`).
2. Metinleri ve anahtar kelimeleri yaz. Kod yazman gerekmez.
3. `index.html` içinde yeni dosyanın `<script>` satırını `js/engine.js` satırından **önce** ekle.
4. `index.html` içindeki bütün `?v=N` sayılarını bir artır; yoksa tarayıcılar eski dosyaları önbellekten yükler.
5. Doğrulayıcıyı çalıştır (Node.js gerekir):

   ```
   node tests/validate.js
   ```

   Çıktı `All scenarios OK` ile bitmeli; her ERROR düzeltilmeli, her WARN okunmalı.
6. Senaryoyu tarayıcıda oyna. Birinin ilk yazacağı şeyleri ("efendim", "pardon", "ne var") ve reddetmeleri ("yer vermiyorum", "kaçmıyorum") dene; hiçbiri yanlışlıkla bir sona götürmemeli.

Anahtar kelimeleri Türkçe karaktersiz ve kök hâlinde yazman yeterli: `kac` yazarsan "kaç", "kaçıyorum", "kaçtım" hepsi eşleşir. Kökler en az 3 harf olmalı.

## Açık uçlu sorular

Keko "Kimlerdensin?" gibi açık bir soru sorduğunda oyun her cevabı kabul eder. Senaryoda `acceptAny` ile yazılır:

```js
acceptAny: [
  { text: "— {input} {mi}? Onun bana 200 lira borcu var!", ending: "borc" },
]
```

`{input}` oyuncunun yazdığıyla, `{mi}` ise ünlü uyumuna göre mı/mi/mu/mü ile değişir: "Kel Mahmut mu?", "Ayşe mi?", "Gül mü?"

Cevap `save: "isim"` ile saklanırsa sahnenin geri kalanında `{isim}` olarak kullanılabilir.

## Anlaşılmayan komutlar

Oyunun anlamadığı her yazı tarayıcıda `yasandi.unmatched` anahtarıyla saklanır (son 200 kayıt) ve konsola yazılır. İleride bunlar ücretsiz bir veritabanına gönderilip en çok yazılanlar senaryolara eklenecek.

## Katkı

`main` dalı canlı sitedir; doğrudan `main`'e gönderme yapma. `feature/...`, `content/...` ya da `fix/...` adlı bir dal aç, değişikliğini orada yap. Yapılacak işler `TASKS.md`, kurallar `AGENTS.md` içinde.
