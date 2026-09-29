# Yaşandı

Türkiye'de herkesin başına gelmiş gündelik anlardan oluşan, yazarak oynanan kısa bir metin oyunu.

Her girişte bir senaryo gelir. Ne yapacağını düz Türkçe yazarsın, oyun bazen anlar, bazen anlamaz. Her senaryonun birden fazla sonu var; hepsini bulmaya çalış.

> Yanlışlıkla bir keko ile göz göze geldin.
> — Hayırdır la gardaş?
>
> ›› ben de arka cebimden bıçak çıkardım

## Çalıştırma

Kurulum yok. `index.html` dosyasını tarayıcıda aç.

## Proje yapısı

```
index.html                         sayfa
css/style.css                      görünüm
js/text.js                         Türkçe metin normalleştirme ve eşleştirme
js/engine.js                       oyun motoru (DOM yok, sadece mantık)
js/main.js                         ekran: daktilo efekti, giriş, sonlar
js/data/global-intents.js          her senaryoda geçerli komutlar (polis, anne, dans...)
js/data/scenarios/goz-temasi.js    senaryo: Göz Teması
```

## Yeni senaryo eklemek

1. `js/data/scenarios/goz-temasi.js` dosyasını kopyala, adını değiştir.
2. Metinleri ve anahtar kelimeleri yaz. Kod yazman gerekmez.
3. `index.html` içinde, `engine.js` satırından önce yeni dosyayı ekle.

Anahtar kelimeleri Türkçe karaktersiz ve kök halinde yazman yeterli: `kac` yazarsan "kaç", "kaçıyorum", "kaçtım" hepsi eşleşir.

## Açık uçlu sorular

Keko "Kimlerdensin?" gibi açık bir soru sorduğunda oyun her cevabı kabul eder. Senaryoda `acceptAny` ile yazılır:

```js
acceptAny: [
  { text: "— {input} {mi}? Onun bana 200 lira borcu var!", ending: "borc" },
]
```

`{input}` oyuncunun yazdığıyla, `{mi}` ise ünlü uyumuna göre mı/mi/mu/mü ile değişir: "Kel Mahmut mu?", "Ayşe mi?", "Gül mü?"

## Anlaşılmayan komutlar

Oyunun anlamadığı her yazı tarayıcıda `yasandi.unmatched` anahtarıyla saklanır ve konsola yazılır. İleride bunlar ücretsiz bir veritabanına gönderilip en çok yazılanlar senaryolara eklenecek.
