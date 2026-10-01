window.Yasandi = window.Yasandi || {};
window.Yasandi.scenarios = window.Yasandi.scenarios || [];
window.Yasandi.scenarios.push({
  id: "saglik-raporu",
  title: "İşe Giriş Raporu",
  
  endings: {
    saat_gecti: { title: "Mesai Bitti", tag: "GEÇ KALDIN" },
    sira_satti: { title: "Ticari Zeka", tag: "KARABORSA" },
    yarisma_kazandi: { title: "Salonun Kralı", tag: "HASTA" },
    refakatci: { title: "Altın Kalpli", tag: "REFAKATÇİ" },
    doktor_google_kizdi: { title: "Çok Bilmiş", tag: "KOVULDUN" },
    ameliyat: { title: "Yanlış Teşhis", tag: "NEŞTER" },
    sekreter_oldun: { title: "Sistem Çözüldü", tag: "BİLGİ İŞLEM" },
    kantin_iflas: { title: "Kantin Fiyatları", tag: "İFLAS" },
    ilac_yok: { title: "Sokak Sokak Eczane", tag: "BULAMADIN" },
    rapor_tamam: { title: "İmzalar Tamam", tag: "İŞE GİRDİN" },
    kor_oldun: { title: "Yanlış Harf", tag: "ELENDİN" },
    bayildin: { title: "Kan Tutması", tag: "BAYILDIN" },
    kacak_raporlu: { title: "Evrak Hırsızı", tag: "KAÇAK" }
  },

  nodes: {
    start: {
      hint: "Hangi işe gireceğini yaz (örn: muhasebeci, mühendis, bekçi).",
      look: "Danışmadaki bilgisayarın arkasında esneyen, bıkkın bir memur var.",
      text: "Saat 15:00. Devlet hastanesi danışmasındasın. Yarın yeni işine başlayacaksın ama 'İşe Giriş Raporu' eksik. Memur eline boş bir form tutuşturdu.\n— Hangi işe giriyordun sen, dedi esneyerek.",
      acceptAny: [
        { text: "» {input}.\n— Tamam, bütün bölümleri gez, imzaları topla. Saat 16:00'da mesai biter, acele et.\nİlk durak Göz Polikliniği.", save: "job", goto: "goz" }
      ],
      fallbacks: [
        "Memur ekrana boş boş bakıyor. Hangi iş?"
      ]
    },

    "goz": {
      hint: "Sıranı satabilir, adama itiraz edebilir veya arkasından odaya dalabilirsin.",
      look: "Kapının üstündeki kırmızı ekranda 'A127' yanıyor. İçeriden klavye sesleri geliyor.",
      text: "Saat 15:15. Göz polikliniği önündesin. Ekranda nihayet senin numaran (A127) yandı.\nTam kapı kulpuna uzandın, takım elbiseli bir adam 'Başhekimin amcasının selamı var' diyerek seni itip içeri daldı.",
      freeze: {
        text: "Ne olduğunu anlamadan adam içeri girdi. Allahtan içeriden çabuk çıktı. Sonra sen girip imzanı aldın.",
        goto: "kan"
      },
      intents: [
        {
          id: "ben_de_gireyim",
          positive: true,
          keywords: ["birlikte", "arkasindan", "pesinden", "daldim", "girdim", "takip", "ettim"],
          text: "» Arkasından sen de daldın. Doktor 'Sen kimsin?' dedi. 'Ben de {job} olacağım, onun selamı var' dedin. Doktor güldü, imzanı attı.",
          goto: "kan"
        },
        {
          id: "itiraz",
          positive: true,
          keywords: ["sirami", "benim", "siraydi", "kavga", "bagiririm", "itiraz", "hop", "dur"],
          text: "» Hop, o sıra benimdi!\nAdam dönüp 'Kardeşim acil vaka' dedi. Gözünde güneş gözlüğü var. Güvenlik gelip seni yatıştırdı, biraz vakit kaybetsen de imzanı aldın.",
          goto: "kan"
        },
        {
          id: "sira_sat",
          positive: true,
          keywords: ["satarim", "sat", "baskasina", "veririm", "verdim", "numarami"],
          text: "Arkandaki teyzeye 'A127 benim, 50 liraya bırakırım' dedin. Teyze kabul etti. {job} olmaktan vazgeçip karaborsa sıra numarası satıcısı oldun.",
          ending: "sira_satti"
        },
        {
          id: "goz_muayenesi",
          positive: true,
          keywords: ["harfleri", "okurum", "gozumu", "muayene", "olurum"],
          text: "Adam çıkınca içeri girdin. Doktor duvardaki harfleri okumanı istedi. Heyecandan en üstteki kocaman E harfine 'Ş' dedin. Raporuna 'Görme Kaybı' yazıldı, elendin.",
          ending: "kor_oldun"
        }
      ],
      fallbacks: [
        "Adam kapıyı kapattı kapatacak! Ne yapacaksın?"
      ]
    },

    "kan": {
      hint: "Yarışmaya katılabilir, amcaya teselli verebilir veya hemen kanını verebilirsin.",
      look: "Kan alma odasının önü mahşer yeri gibi. Kolunu tutanlar, pamuk bastıranlar...",
      text: "Saat 15:30. Kan verme sırasındasın. Yanındaki amca etrafa hava atıyor:\n— O da bir şey mi, benim böbrek taşım ceviz kadar!\nHerkes saygıyla amcaya bakıyor.",
      freeze: {
        text: "Sustun. Amcanın taşına saygı duruşunda bulundun. Sıran gelince hızlıca kanı verdin.",
        goto: "kbb"
      },
      intents: [
        {
          id: "yarisa_katil",
          positive: true,
          keywords: ["benim", "daha", "bende", "kanser", "kist", "tumor", "hastayim", "abartirim", "yarisirim"],
          text: "» Seninki de laf mı dayı, bende öyle bir hastalık var ki internette bile adı yok!\nBekleme salonu buz kesti. Amca ayağa kalkıp sana yer verdi. Bekleme salonunun yeni efsanesi sensin.",
          ending: "yarisma_kazandi"
        },
        {
          id: "refakatci_ol",
          positive: true,
          keywords: ["gecmis olsun", "amcaya", "yardim", "teselli", "acirim", "moral", "veririm"],
          text: "» Çok geçmiş olsun amca, diyerek koluna girdin. Amca seni o kadar sevdi ki 'Beni bırakma yavrum' diye ağladı. İşe giremedin, ömür boyu hastane koridorlarında refakatçi oldun.",
          ending: "refakatci"
        },
        {
          id: "hemen_ver",
          positive: true,
          keywords: ["kanimi", "veririm", "hemsire", "hemen", "kolumu", "uzatirim", "igneyi", "sira"],
          text: "Hızla hemşirenin yanına geçtin. 'Aç kolunu' dedi, iğneyi sapladı. Kan tüpünü sepete attı. KBB polikliniğine doğru koşmaya başladın.",
          goto: "kbb"
        },
        {
          id: "kandan_kork",
          positive: true,
          keywords: ["korkarim", "bayilirim", "igne", "bakamam", "korktum", "igleden"],
          text: "Hemşire elinde iğneyle yaklaşınca tansiyonun düştü, olduğun yere bayıldın. Gözünü açtığında saat 17:00 olmuştu bile.",
          ending: "bayildin"
        }
      ],
      fallbacks: [
        "Sıra sana geliyor. Kolunu mu sıvayacaksın, amcaya mı laf atacaksın?"
      ]
    },

    "kbb": {
      hint: "Doktor şikayetini soruyor. İnternetten araştırdığını söyleyebilir, yalan uydurabilir veya sadece rapor için geldiğini belirtebilirsin.",
      look: "İçerisi çok aydınlık. Doktor elinde bir metal çubuk ve başlığında bir ışıkla hazır bekliyor.",
      text: "Saat 15:40. Kulak Burun Boğaz. İçeri girdin, bilgisayara bakan yorgun doktor kafasını kaldırmadan konuştu:\n— Şikayetin ne hocam?",
      freeze: {
        text: "Duraksadın. 'Şikayetim yok, işe giriş raporu' dedin. Doktor 'He tamam' diyip imzaladı.",
        goto: "rontgen"
      },
      intents: [
        {
          id: "dr_google",
          positive: true,
          keywords: ["internetten", "google", "baktim", "arastirdim", "nadir", "hastalik", "okudum", "sendrom"],
          text: "» İnternetten baktım hocam, bende kesin nadir bir sendrom var.\nDoktor kalemi masaya fırlattı. 'Madem Google'dan baktın, git reçeteni de o yazsın!' diyerek seni kovdu.",
          ending: "doktor_google_kizdi"
        },
        {
          id: "rapor_icin",
          positive: true,
          keywords: ["rapor", "ise", "isim", "saglamim", "bir seyim yok", "turp", "giris", "icin", "geldim"],
          text: "» İşe giriş raporu için geldim hocam.\nDoktor derin bir 'oh' çekti, uzaktan ağzına ışık tutup kağıdını hızla imzaladı.",
          goto: "rontgen"
        },
        {
          id: "yalan_soyle",
          positive: true,
          keywords: ["agriyor", "bogazim", "sis", "kulagim", "duymuyorum", "hasta", "burnum", "tikali"],
          text: "» Boğazım çok ağrıyor hocam.\nDoktor bademciklerine bakıp hemen yatışını verdi. 'Yarın sabah ameliyata alıyoruz' dedi. {job} işi yalan oldu.",
          ending: "ameliyat"
        }
      ],
      fallbacks: [
        "Doktor sabırsızca 'Evet dinliyorum' dedi. Şikayetin ne?"
      ]
    },

    "rontgen": {
      hint: "Sistemi tamir edebilir, kantine gidebilir veya itiraz edebilirsin.",
      look: "Karanlık bir koridor. Röntgen teknisyeni telefonda sessizde bir şeyler izliyor.",
      text: "Saat 15:48. Akciğer filmin çekildi, kapıda bekliyorsun. Teknisyen camı tıklatıp seslendi:\n— Sistem gitmiş hocam. Ekrana düşmüyor. Bekleyeceğiz.",
      freeze: {
        text: "Kaderine boyun eğip bekledin. 3-4 dakika sonra teknisyen 'Dur geldi galiba' dedi. Film temiz çıktı. Son imzaya koşuyorsun.",
        goto: "bashekim"
      },
      intents: [
        {
          id: "it_ci",
          positive: true,
          keywords: ["sistemi", "cozerim", "bilgisayari", "reset", "kapatip", "acarim", "onaririm", "bakarim", "kablolari", "mudahale"],
          text: "» Ben anlarım bilgisayardan, diyerek içeri girdin. Fişin çekik olduğunu fark edip taktın. Başhekim olayı duyup koşarak geldi, 'Seni {job} yapamayız, bizim bilgi işlemde başla' dedi.",
          ending: "sekreter_oldun"
        },
        {
          id: "kantin",
          positive: true,
          keywords: ["kantin", "beklerim", "cay", "kahve", "tost", "icmeye", "gidiyorum", "gezinirim"],
          text: "» Ben bir kantine gidip çay içeyim o zaman.\nKantinden bir karton çay ve kaşarlı tost aldın. Kasada fiyatı duyunca cebindeki tüm parayı vermek zorunda kaldın.",
          ending: "kantin_iflas"
        },
        {
          id: "isyan",
          positive: true,
          keywords: ["nasil", "gitti", "boyle", "sacmalik", "bagiririm", "sikayet", "ederim", "cimere", "kizarim"],
          text: "» Nasıl sistem gider ya, yarın işe başlayacağım!\nTeknisyen hiç istifini bozmadı. 'Bana bağırma, hastane ağında sorun var' derken şans eseri sistem geldi. Filmi alıp Başhekimliğe geçtin.",
          goto: "bashekim"
        }
      ],
      fallbacks: [
        "Sistem yok diyor. Ne yapacaksın, bekleyecek misin?"
      ]
    },

    "bashekim": {
      hint: "Yalvarabilir, başhekimle kavga edebilir veya tanıdık selamı söyleyip kaçabilirsin.",
      look: "Gösterişli bir makam odası. Başhekim yardımcısı telefonuyla oynuyor.",
      text: "Saat 15:57. Başhekim yardımcısının odası. Tüm imzalar tamam. Sadece son mühür basılacak.\nBaşhekim yardımcısı kağıda baktı. 'Tahliller çıkınca gel demedim mi ben sana?' dedi. Belli ki seni başkasıyla karıştırdı.",
      freeze: {
        text: "Ne diyeceğini bilemedin. 'Hocam hepsi tamam işte, benimkiler çıktı' dedin. Ekrandan kontrol edip zorla mührü bastı. Sonunda bitti!",
        goto: "eczane"
      },
      intents: [
        {
          id: "yalvar",
          positive: true,
          keywords: ["hocam", "lutfen", "yarin", "basliyorum", "gitti", "yalvaririm", "mesai", "bitti", "imzala", "yanlis", "kisiyle", "karistirdiniz"],
          text: "» Hocam gözünüzü seveyim beni karıştırdınız, yarın işe giriyorum, mesai bitiyor!\nBaşhekim yardımcısı ekrana bakıp 'Ha sen o musun' dedi. Mührü kaşesine vurup raporu sana verdi.",
          goto: "eczane"
        },
        {
          id: "kavga",
          positive: true,
          keywords: ["hepsi", "tamam", "kor", "musun", "bak", "isaretli", "imzali", "bagiririm", "kavga"],
          text: "» Hepsi tamam hocam, baksana imzalı!\nBaşhekim kaşlarını çattı. 'Bana işimi mi öğretiyorsun?' Mührü basmadı, saat 16:00 oldu.",
          ending: "saat_gecti"
        },
        {
          id: "selami_var",
          positive: true,
          keywords: ["selami", "var", "dayimin", "amcamin", "bakanin", "mudurun", "vali", "belediye"],
          text: "» Eyyüp amcanın selamı var hocam.\nBaşhekim hemen ayağa kalktı. 'Aaa Eyyüp abinin yeğeni misin? Keşke başta söyleseydin!' Mührü havada bastı.",
          goto: "eczane"
        },
        {
          id: "kac",
          positive: true,
          keywords: ["kacarim", "kac", "odadan", "kapiya", "kagitla", "kaciyorum"],
          text: "Masadan raporu kaptığın gibi odadan kaçtın! Arkandan güvenlik kovaladı ama seni yakalayamadılar. {job} olarak işe girdin ama bu hastanenin sınırlarına bir daha giremezsin.",
          ending: "kacak_raporlu"
        }
      ],
      fallbacks: [
        "Başhekim mührü basmıyor, sana ters ters bakıyor."
      ]
    },

    "eczane": {
      hint: "İlacı almayı reddedebilir, muadilini isteyebilir veya karşı eczaneye gidebilirsin.",
      look: "Hastane karşısındaki eczaneler sokağı. İlaç kokusu ve beyaz önlüklü kalfalar.",
      text: "Raporu aldın ama başhekim eline 'Şu vitamini de eczaneden al' diye bir reçete tutuşturdu.\nEczacı reçeteye baktı: 'Hocam bu ilaç bizde yok, karşıdakine sor.'",
      freeze: {
        text: "Kararsız kaldın. Neyse deyip ilacı almaktan vazgeçtin. Raporu teslim edip rahat bir nefes aldın.",
        ending: "rapor_tamam"
      },
      intents: [
        {
          id: "baska_alma",
          positive: true,
          keywords: ["almiyorum", "istemiyorum", "gerek yok", "rapor", "yeter", "vitamin", "kalsin", "almam", "hayir", "cikiyorum"],
          text: "» Aman vitamini de eksik kalsın, raporum elimde ya yeter.\nRaporu alıp şirkete koştun. Ertesi gün {job} olarak işbaşı yaptın. Tebrikler!",
          ending: "rapor_tamam"
        },
        {
          id: "karsiya_git",
          positive: true,
          keywords: ["karsiya", "sorarim", "diger", "eczaneye", "giderim", "yan", "tarafa", "gecerim"],
          text: "Karşı eczaneye gittin. 'Bizde yok, yandakine sor.' Yandakine gittin, 'Bizde yok, köşedekine sor.' Bitmeyen bir döngüye girdin, o sokağı hiç terk edemedin.",
          ending: "ilac_yok"
        },
        {
          id: "muadil",
          positive: true,
          keywords: ["muadili", "baskasi", "benzeri", "farketmez", "baska", "marka", "esdeger", "farkli"],
          text: "» Muadili yok mu usta?\nEczacı gülümsedi. 'Olmaz mı...' dedi. Sana içi muadil ilaç dolu kocaman bir poşet sattı, eve mutlu döndün. {job} olarak işe hazırsın.",
          ending: "rapor_tamam"
        }
      ],
      fallbacks: [
        "Eczacı bekliyor. Karşıya geçecek misin?"
      ]
    }
  },

  fallbacks: [
    "Saat daralıyor. Böyle tuhaf hareketler yaparsan imzaları yetiştiremezsin.",
    "Hastane kurallarına uy, mantıklı bir şey yap."
  ]
});
