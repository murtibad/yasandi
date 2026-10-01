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
      text: "Saat 15:00. Devlet hastanesi danışmasındasın. İK sabah arayıp \"Rapor yoksa yarın başlayamazsın, kontenjan başkasına gider\" dedi. Annen de komşulara çoktan söyledi.\nMemur eline boş bir form tutuşturdu.\n— Hangi işe giriyordun sen, dedi esneyerek.",
      acceptAny: [
        { text: "» {input}.\n— Tamam, bütün bölümleri gez, imzaları topla. Saat 16:00'da mesai biter, acele et.\nİlk durak Göz Polikliniği.", save: "job", goto: "goz" }
      ],
      fallbacks: [
        "Memur ekrana boş boş bakıyor. Hangi işe giriyorsun, söyleyecek misin?"
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
          keywords: ["arkasindan girerim", "pesinden dalarim", "ben de gir", "daliyorum", "takip ederim"],
          text: "» Arkasından sen de daldın. Doktor başını kaldırdı:\n— Sen kimsin?\n» Ben de {job} olacağım, onun selamı var.\nDoktor güldü, imzanı attı.",
          goto: "kan"
        },
        {
          id: "itiraz",
          positive: true,
          keywords: ["sira bende", "sira benimdi", "itiraz ederim", "kavga cikaririm", "hop sirami", "pardon sira", "bagiririm"],
          text: "» Hop, o sıra benimdi!\nAdam dönüp 'Kardeşim acil vaka' dedi. Gözünde güneş gözlüğü var. Güvenlik gelip seni yatıştırdı, biraz vakit kaybetsen de imzanı aldın.",
          goto: "kan"
        },
        {
          id: "sira_sat",
          positive: true,
          keywords: ["sirami satarim", "numarami sat", "baskasina veririm", "elli liraya", "parayla satarim"],
          text: "Arkandaki teyzeye 'A127 benim, 50 liraya bırakırım' dedin. Teyze kabul etti. {job} olmaktan vazgeçip karaborsa sıra numarası satıcısı oldun.",
          ending: "sira_satti"
        },
        {
          id: "goz_muayenesi",
          positive: true,
          keywords: ["harfleri okurum", "harfleri okuyorum", "muayene olurum", "gozumu gosteririm"],
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
          keywords: ["benimki daha beter", "bende oyle", "buyuk tumor", "hastaligimi abartirim", "amcayla yarisirim", "kist var"],
          text: "» Seninki de laf mı dayı, bende öyle bir hastalık var ki internette bile adı yok!\nBekleme salonu buz kesti. Amca ayağa kalkıp sana yer verdi. Bekleme salonunun yeni efsanesi sensin.",
          ending: "yarisma_kazandi"
        },
        {
          id: "refakatci_ol",
          positive: true,
          keywords: ["gecmis olsun amca", "teselli ederim", "moral veririm", "yardim ederim", "acirim"],
          text: "» Çok geçmiş olsun amca, diyerek koluna girdin. Amca seni o kadar sevdi ki 'Beni bırakma yavrum' diye ağladı. İşe giremedin, ömür boyu hastane koridorlarında refakatçi oldun.",
          ending: "refakatci"
        },
        {
          id: "hemen_ver",
          positive: true,
          keywords: ["kan veriyorum", "hemen veririm", "kolumu uzatirim", "igneyi batir", "hemsireye uzatir"],
          text: "Hızla hemşirenin yanına geçtin. 'Aç kolunu' dedi, iğneyi sapladı. Kan tüpünü sepete attı. KBB polikliniğine doğru koşmaya başladın.",
          goto: "kbb"
        },
        {
          id: "kandan_kork",
          positive: true,
          keywords: ["kandan korkarim", "igneden korkarim", "dusup bayilirim", "tansiyonum duser", "igne gorunce", "bakamam"],
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
          keywords: ["internetten arastirdim", "google baktim", "nadir hastalik", "nadir sendrom"],
          text: "» İnternetten baktım hocam, bende kesin nadir bir sendrom var.\nDoktor kalemi masaya fırlattı:\n— Madem Google'dan baktın, git reçeteni de o yazsın!\nSeni kovdu.",
          ending: "doktor_google_kizdi"
        },
        {
          id: "rapor_icin",
          positive: true,
          keywords: ["rapor icin geldim", "ise giris raporu", "turp gibiyim", "sikayetim yok", "sadece kontrol"],
          text: "» İşe giriş raporu için geldim hocam.\nDoktor derin bir 'oh' çekti, uzaktan ağzına ışık tutup kağıdını hızla imzaladı.",
          goto: "rontgen"
        },
        {
          id: "yalan_soyle",
          positive: true,
          keywords: ["bogazim agriyor", "bademcigim sisme", "kulagim duymuyor", "burnum tikali"],
          text: "» Boğazım çok ağrıyor hocam.\nDoktor bademciklerine bakıp hemen yatışını verdi:\n— Yarın sabah ameliyata alıyoruz.\n{job} işi bu sene yok.",
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
          keywords: ["sistemi cozerim", "bilgisayara bakarim", "sistemi resetlerim", "kablolari kontrol", "bilgisayari onaririm"],
          text: "» Ben anlarım bilgisayardan, diyerek içeri girdin. Fişin çekik olduğunu fark edip taktın. Başhekim olayı duyup koşarak geldi, 'Seni {job} yapamayız, bizim bilgi işlemde başla' dedi.",
          ending: "sekreter_oldun"
        },
        {
          id: "kantin",
          positive: true,
          keywords: ["kantine giderim", "cay icerim", "kahve alirim", "tost yerim", "kantinde beklerim"],
          text: "» Ben bir kantine gidip çay içeyim o zaman.\nKantinden bir karton çay ve kaşarlı tost aldın. Kasada fiyatı duyunca cebindeki tüm parayı vermek zorunda kaldın.",
          ending: "kantin_iflas"
        },
        {
          id: "isyan",
          positive: true,
          keywords: ["nasil sistem", "boyle sacmalik", "bagirip cagiririm", "cimer sikayet", "kizarim"],
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
          keywords: ["lutfen imzalayin", "yalvaririm hocam", "gozunuzu seveyim", "beni karistirdiniz", "mesai bitiyor", "yarin basliyorum"],
          text: "» Hocam gözünüzü seveyim beni karıştırdınız, yarın işe giriyorum, mesai bitiyor!\nBaşhekim yardımcısı ekrana bakıp 'Ha sen o musun' dedi. Mührü kaşesine vurup raporu sana verdi.",
          goto: "eczane"
        },
        {
          id: "kavga",
          positive: true,
          keywords: ["hepsi tamam", "isaretli zaten", "baksana imzali", "kavga ederim", "isimi ogretme"],
          text: "» Hepsi tamam hocam, baksana imzalı!\nBaşhekim kaşlarını çattı. 'Bana işimi mi öğretiyorsun?' Mührü basmadı, saat 16:00 oldu.",
          ending: "saat_gecti"
        },
        {
          id: "selami_var",
          positive: true,
          keywords: ["dayimin selami", "amcamin selami", "bakanin selami", "mudurun selami", "vali beyin", "baskanin selami"],
          text: "» Eyyüp amcanın selamı var hocam.\nBaşhekim hemen ayağa kalktı. 'Aaa Eyyüp abinin yeğeni misin? Keşke başta söyleseydin!' Mührü havada bastı.",
          goto: "eczane"
        },
        {
          id: "kac",
          positive: true,
          keywords: ["raporla kacarim", "odadan kacarim", "kapiya kosarim", "kagitla kacarim"],
          text: "Masadan raporu kaptığın gibi odadan kaçtın! Arkandan güvenlik kovaladı ama seni yakalayamadılar. {job} olarak işe girdin ama bu hastanenin sınırlarına bir daha giremezsin.",
          ending: "kacak_raporlu"
        }
      ],
      fallbacks: [
        "Başhekim mührü basmıyor, sana ters ters bakıyor. Saat 15:58. Ne diyorsun?"
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
          keywords: ["vitamini almiyorum", "istemiyorum gerek yok", "kalsin almam", "eczaneden cikiyorum"],
          text: "» Aman vitamini de eksik kalsın, raporum elimde ya yeter.\nRaporu alıp şirkete koştun. Ertesi gün {job} olarak işbaşı yaptın. Tebrikler!",
          ending: "rapor_tamam"
        },
        {
          id: "karsiya_git",
          positive: true,
          keywords: ["karsiya gecerim", "diger eczaneye", "yandakine sorarim", "karsidaki eczane", "koseye giderim"],
          text: "Karşı eczaneye gittin. 'Bizde yok, yandakine sor.' Yandakine gittin, 'Bizde yok, köşedekine sor.' Bitmeyen bir döngüye girdin, o sokağı hiç terk edemedin.",
          ending: "ilac_yok"
        },
        {
          id: "muadil",
          positive: true,
          keywords: ["muadili yok mu", "benzeri var mi", "esdeger ilac", "baska marka", "jenerik ver"],
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
    "Saat daralıyor. Böyle tuhaf hareketler yaparsan imzaları yetiştiremezsin. Ne yapıyorsun?",
    "Etraftaki herkes sıra bekliyor, kimse seni anlamadı. Sıranı mı kolluyorsun, yoksa bir şey mi söylüyorsun?"
  ]
});
