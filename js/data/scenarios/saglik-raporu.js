window.Yasandi = window.Yasandi || {};
window.Yasandi.scenarios = window.Yasandi.scenarios || [];
window.Yasandi.scenarios.push({
  id: "saglik-raporu",
  title: "İşe Giriş Raporu",

  remember: {
    endings: {
      bayildin: "Hemşire seni görünce iğneyi arkasına sakladı. İyilik olsun diye.",
      kor_oldun: "Duvardaki göz tablosuna baktın. E. Bu bir E. E.",
      ilac_yok: "Karşı eczaneye bakmıyorsun bile. Ne diyeceklerini biliyorsun.",
      kantin_iflas: "Cebinde evden yapılmış tost var. Kantinciye inat.",
      sira_satti: "Arkandaki teyze seni görünce sıra numarasını göğsüne sakladı.",
      rapor_tamam: "Geçen sefer bütün imzaları toplamıştın. İş yeri raporu yine istedi. Altı ay geçmiş.",
      doktor_google_kizdi: "Telefonunda arama geçmişini sildin. Doktor yine de sana şüpheyle bakıyor.",
    },
    default: "Aynı koridor, aynı sıra makinesi. Geçen sefer '{last}' diye bitmişti. Makine seni tanıdı, numara vermedi.",
    often: "{runs}. kez bu koridordasın. Danışmadaki abla 'Yine mi?' demedi. Gözleri dedi.",
    cameos: [
      { after: ["berber:yangin", "berber:beyin-sarsintisi", "berber:kolonya"], text: "Bekleme salonundaki amca sana baktı:\n— Seni berberde görmüştüm. Toparlamışsın." },
      { after: ["otobus-teyzesi:krem"], text: "Bekleme salonunda biberiye kokusu var. Bir teyze çantasını açmış. Sana göz kırptı." },
    ],
  },
  
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
      freeze: { text: ["Memur gözlüğünün üstünden baktı.\n— Hangi işe giriyorsun diyorum? Forma yazmam lazım.", "Memur kalemi bıraktı, arkandaki sıraya baktı.\n— Hocam kuyruk uzuyor, işin ne? Muhasebeci mi, bekçi mi?"] },
      hint: "Hangi işe gireceğini yaz (örn: muhasebeci, mühendis, bekçi).",
      look: "Danışmadaki bilgisayarın arkasında esneyen, bıkkın bir memur var.",
      text: "Saat 15:00. Devlet hastanesi danışmasındasın. İK sabah arayıp \"Rapor yoksa yarın başlayamazsın, kontenjan başkasına gider\" dedi. Annen de komşulara çoktan söyledi.\nMemur eline boş bir form tutuşturdu.\n— Hangi işe giriyordun sen, dedi esneyerek.",
      acceptAny: [
        { text: "» {input}.\n— Tamam, bütün bölümleri gez, imzaları topla. Saat 16:00'da mesai biter, acele et.\nİlk durak Göz Polikliniği.", save: "job", goto: "goz" }
      ],
      fallbacks: [
        "Memur ekrana boş boş bakıyor. Hangi işe giriyorsun, söyleyecek misin?",
        "Mesai bitmek üzere ve memur senden bir meslek ismi bekliyor. Ne diyorsun?"
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
          keywords: ["birlikte", "beraber", "arkasindan", "pesinden", "ben de gir", "daliyorum", "dalarim"],
          text: "» Arkasından sen de daldın. Doktor başını kaldırdı:\n— Sen kimsin?\n» Ben de {job} olacağım, onun selamı var.\nDoktor güldü, imzanı attı.",
          goto: "kan"
        },
        {
          id: "sira_sat",
          positive: true,
          keywords: ["satarim", "satiyorum", "satayim", "numarami sat", "baskasina ver", "50 lira"],
          text: "Arkandaki teyzeye 'A127 benim, 50 liraya bırakırım' dedin. Teyze kabul etti. {job} olmaktan vazgeçip karaborsa sıra numarası satıcısı oldun.",
          ending: "sira_satti"
        },
        {
          id: "itiraz",
          positive: true,
          keywords: ["sirami", "siraydi", "siram", "bagiririm", "itiraz", "hop", "yahu", "pardon", "niye", "neden", "sebep"],
          text: "» Hop, o sıra benimdi!\nAdam dönüp 'Kardeşim acil vaka' dedi. Gözünde güneş gözlüğü var. Güvenlik gelip seni yatıştırdı, biraz vakit kaybetsen de imzanı aldın.",
          goto: "kan"
        },
        {
          id: "goz_muayenesi",
          positive: true,
          keywords: ["harf", "okurum", "okuyorum", "muayene", "gozumu"],
          text: "Adam çıkınca içeri girdin. Doktor duvardaki harfleri okumanı istedi. Heyecandan en üstteki kocaman E harfine 'Ş' dedin. Raporuna 'Görme Kaybı' yazıldı, elendin.",
          ending: "kor_oldun"
        }
      ],
      fallbacks: [
        "Adam kapıyı kapattı kapatacak! Ne yapacaksın?",
        "Ekranda A127 yanıyor ama adam içeri girdi. Sesini çıkaracak mısın?"
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
          keywords: ["daha beter", "bende", "benimki", "kanser", "kist", "tumor", "hastaligim", "abartirim", "yarisirim"],
          text: "» Seninki de laf mı dayı, bende öyle bir hastalık var ki internette bile adı yok!\nBekleme salonu buz kesti. Amca ayağa kalkıp sana yer verdi. Bekleme salonunun yeni efsanesi sensin.",
          ending: "yarisma_kazandi"
        },
        {
          id: "refakatci_ol",
          positive: true,
          keywords: ["gecmis olsun", "amcaya", "teselli", "moral", "acirim", "haklisin", "dogru diyorsun", "uzulmedim degil"],
          text: "» Çok geçmiş olsun amca, diyerek koluna girdin. Amca seni o kadar sevdi ki 'Beni bırakma yavrum' diye ağladı. İşe giremedin, ömür boyu hastane koridorlarında refakatçi oldun.",
          ending: "refakatci"
        },
        {
          id: "hemen_ver",
          positive: true,
          keywords: ["kanimi", "hemsire", "hemen", "kolumu", "uzatirim", "kan veriyorum"],
          text: "Hızla hemşirenin yanına geçtin. 'Aç kolunu' dedi, iğneyi sapladı. Kan tüpünü sepete attı. KBB polikliniğine doğru koşmaya başladın.",
          goto: "kbb"
        },
        {
          id: "kandan_kork",
          keywords: ["korkarim", "bayilirim", "igne", "bakamam", "korktum"],
          text: "Hemşire elinde iğneyle yaklaşınca tansiyonun düştü, olduğun yere bayıldın. Gözünü açtığında saat 17:00 olmuştu bile.",
          ending: "bayildin"
        }
      ],
      fallbacks: [
        "Sıra sana geliyor. Kolunu mu sıvayacaksın, amcaya mı laf atacaksın?",
        "Hemşire seni bekliyor. Amcanın taşıyla mı ilgileneceksin, kan mı vereceksin?"
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
          text: "» İnternetten baktım hocam, bende kesin nadir bir sendrom var.\nDoktor kalemi masaya fırlattı:\n— Madem Google'dan baktın, git reçeteni de o yazsın!\nSeni kovdu.",
          ending: "doktor_google_kizdi"
        },
        {
          id: "rapor_icin",
          keywords: ["rapor", "ise giris", "saglamim", "bir seyim yok", "sikayetim yok", "kontrol", "biseyim yok", "hicbir seyim yok", "bisey yok"],
          text: "» İşe giriş raporu için geldim hocam.\nDoktor derin bir 'oh' çekti, uzaktan ağzına ışık tutup kağıdını hızla imzaladı.",
          goto: "rontgen"
        },
        {
          id: "yalan_soyle",
          positive: true,
          keywords: ["agriyor", "bogazim", "sisme", "kulagim", "duymuyorum", "burnum", "tikali"],
          text: "» Boğazım çok ağrıyor hocam.\nDoktor bademciklerine bakıp hemen yatışını verdi:\n— Yarın sabah ameliyata alıyoruz.\n{job} işi bu sene yok.",
          ending: "ameliyat"
        }
      ],
      fallbacks: [
        "Doktor sabırsızca 'Evet dinliyorum' dedi. Şikayetin ne?",
        "Doktor gözlerini devirdi. Şikayetin var mı?"
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
          keywords: ["sistemi", "cozerim", "bilgisayari", "reset", "kapatip", "onaririm", "kablolari"],
          text: "» Ben anlarım bilgisayardan, diyerek içeri girdin. Fişin çekik olduğunu fark edip taktın. Başhekim olayı duyup koşarak geldi, 'Seni {job} yapamayız, bizim bilgi işlemde başla' dedi.",
          ending: "sekreter_oldun"
        },
        {
          id: "kantin",
          positive: true,
          keywords: ["kantin", "cay icerim", "cay icmeye", "kahve", "tost", "caya", "kahveye", "cay"],
          text: "» Ben bir kantine gidip çay içeyim o zaman.\nKantinden bir karton çay ve kaşarlı tost aldın. Kasada fiyatı duyunca cebindeki tüm parayı vermek zorunda kaldın.",
          ending: "kantin_iflas"
        },
        {
          id: "isyan",
          positive: true,
          keywords: ["sacmalik", "bagiririm", "sikayet", "cimer", "nasil sistem", "kizarim"],
          text: "» Nasıl sistem gider ya, yarın işe başlayacağım!\nTeknisyen hiç istifini bozmadı. 'Bana bağırma, hastane ağında sorun var' derken şans eseri sistem geldi. Filmi alıp Başhekimliğe geçtin.",
          goto: "bashekim"
        }
      ],
      fallbacks: [
        "Sistem yok diyor. Ne yapacaksın, bekleyecek misin?",
        "Teknisyen telefona dönüp video izlemeye devam etti. Sistemi onarmayı mı deneyeceksin, bir şeyler mi içeceksin?"
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
          keywords: ["lutfen", "yalvaririm", "gozunuzu seveyim", "karistirdiniz", "yarin basliyorum", "mesai bitiyor", "imzala", "kisiyle", "isbasi", "ise basliyorum"],
          text: "» Hocam gözünüzü seveyim beni karıştırdınız, yarın işe giriyorum, mesai bitiyor!\nBaşhekim yardımcısı ekrana bakıp 'Ha sen o musun' dedi. Mührü kaşesine vurup raporu sana verdi.",
          goto: "eczane"
        },
        {
          id: "kavga",
          positive: true,
          keywords: ["hepsi tamam", "imzali", "baksana", "isimi ogretme", "ne demek"],
          text: "» Hepsi tamam hocam, baksana imzalı!\nBaşhekim kaşlarını çattı. 'Bana işimi mi öğretiyorsun?' Mührü basmadı, saat 16:00 oldu.",
          ending: "saat_gecti"
        },
        {
          id: "selami_var",
          positive: true,
          keywords: ["selami", "dayimin", "amcamin", "bakanin", "mudurun", "vali", "belediye"],
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
        "Başhekim mührü basmıyor, sana ters ters bakıyor. Saat 15:58. Ne diyorsun?",
        "Tahlilleri soruyor ama senin tahlilin yok. İtiraz mı edeceksin, durumunu mu açıklayacaksın?"
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
          keywords: ["almiyorum", "istemiyorum", "gerek yok", "yeter", "kalsin", "almam", "cikiyorum", "cikarim", "giderim"],
          text: "» Aman vitamini de eksik kalsın, raporum elimde ya yeter.\nRaporu alıp şirkete koştun. Ertesi gün {job} olarak işbaşı yaptın. Tebrikler!",
          ending: "rapor_tamam"
        },
        {
          id: "karsiya_git",
          positive: true,
          keywords: ["karsiya", "sorarim", "diger eczane", "eczaneye", "yandaki", "koseye"],
          text: "Karşı eczaneye gittin. 'Bizde yok, yandakine sor.' Yandakine gittin, 'Bizde yok, köşedekine sor.' Bitmeyen bir döngüye girdin, o sokağı hiç terk edemedin.",
          ending: "ilac_yok"
        },
        {
          id: "muadil",
          positive: true,
          keywords: ["muadil", "benzeri", "esdeger", "baska marka", "jenerik"],
          text: "» Muadili yok mu usta?\nEczacı gülümsedi. 'Olmaz mı...' dedi. Sana içi muadil ilaç dolu kocaman bir poşet sattı, eve mutlu döndün. {job} olarak işe hazırsın.",
          ending: "rapor_tamam"
        }
      ],
      fallbacks: [
        "Eczacı bekliyor. Karşıya geçecek misin?",
        "İlaç bizde yok dedi. Raporu alıp çıkacak mısın, muadilini mi soracaksın?"
      ]
    }
  },

  fallbacks: [
    "Saat daralıyor. Böyle tuhaf hareketler yaparsan imzaları yetiştiremezsin. Ne yapıyorsun?",
    "Etraftaki herkes sıra bekliyor, kimse seni anlamadı. Sıranı mı kolluyorsun, yoksa bir şey mi söylüyorsun?"
  ]
});
