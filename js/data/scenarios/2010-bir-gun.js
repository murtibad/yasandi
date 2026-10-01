window.Yasandi = window.Yasandi || {};
window.Yasandi.scenarios = window.Yasandi.scenarios || [];
window.Yasandi.scenarios.push({
  id: "2010-bir-gun",
  title: "Bir Günlüğüne 2010",

  remember: {
    endings: {
      engellendi: "Listede bir isim gri duruyor. Engel. Belki bu sefer kaldırmıştır.",
      elektrik_kesintisi: "Masanın altında yepyeni bir kesintisiz güç kaynağı var. Babana iki gün yalvardın.",
      virus: "Bilgisayar formatlandı. Masaüstünde sadece Geri Dönüşüm Kutusu kaldı. Fan yine uçak kaldırıyor.",
      mavi_ekran: "Bilgisayar formatlandı. Masaüstünde sadece Geri Dönüşüm Kutusu kaldı. Fan yine uçak kaldırıyor.",
      bakkal_kontor: "Numarayı bu sefer üç kere kontrol edip kaydettin. Kontör yine yok.",
      dayak_yedin: "Ensende hâlâ hafif bir sızı var. İnternet kafeden uzak dur diyor.",
      "2010_aski": "İlişki durumu hâlâ 'Karmaşık'. Kimse ne demek olduğunu bilmiyor.",
      farmville: "Domatesler hasada hazır. Ama bugün başka işin var.",
      gta_sifresi: "Klavyede L, E, A, V tuşları silinmiş. Sebebini biliyorsun.",
    },
    default: "Yine 2010. Geçen sefer '{last}' diye bitmişti. MSN açılış sesi hâlâ aynı.",
    often: "{runs}. kez 2010'dasın. Galiba geri dönmek istemiyorsun.",
    cameos: [
      { after: ["tahtaya-kalk:itiraf_etti"], text: "Lise defterinin arka sayfasında bir kalp var. İçindeki isim silinmiş, izi duruyor." },
    ],
  },

  endings: {
    cevrimdisi: { title: "Fırsat Kaçtı", tag: "ÇEVRİMDIŞI" },
    engellendi: { title: "Küstürdün", tag: "ENGELLENDİN" },
    virus: { title: "Truva Atı", tag: "FORMATLIK" },
    mavi_ekran: { title: "Hile Yüklendi", tag: "MAVİ EKRAN" },
    bakkal_kontor: { title: "Kontör Krizi", tag: "KONTÖR YOK" },
    mikrofon_yankisi: { title: "Odayı Bastılar", tag: "YANKI" },
    gta_sifresi: { title: "Oyun Sevdası", tag: "LEAVETOOLS" },
    sure_bitti: { title: "Kafeci Kovdu", tag: "SÜREN BİTTİ" },
    dayak_yedin: { title: "Abisi Geldi", tag: "DAYAK YEDİN" },
    utangac: { title: "Kameralı Utanç", tag: "UTANDIN" },
    elektrik_kesintisi: { title: "Masa 5'i Kaydet", tag: "KARANLIK" },
    "2010_aski": { title: "İlişki Durumu", tag: "KARMAŞIK" },
    durtuklenme: { title: "Sonsuz Dürtüşme", tag: "DÜRTTÜN" },
    farmville: { title: "Tarlalar Sulandı", tag: "FARMVİLLE" }
  },

  nodes: {
    start: {
      hint: "Listede beklediğin o kişinin adını yaz.",
      look: "Ekranın sağ alt köşesinde Windows Live Messenger'ın çift sarı-yeşil adamlı ikonu duruyor.",
      text: "Sene 2010. Masaüstü bilgisayarının fan sesi odada uçak kaldırıyor. Windows Live Messenger açık. Liste başına sabitlediğin o kişi nihayet çevrimiçi oldu...\n— Kimi bekliyordun sen saatlerdir?",
      acceptAny: [
        { text: "» {input}.\nEvet, {input}. Kalbin güm güm atıyor.", save: "crush", goto: "msn" }
      ],
      freeze: {
        text: "— Utanma ya, kimseye söylemiyoruz. Listede en üstte kim var? Bi isim yaz.",
        exhausted: {
          text: "Söylemedin. Kendi kendine 'Boşver, kimseyle konuşasım yok' dedin, MSN'den çıkış yapıp Winamp'ı açtın.",
          ending: "cevrimdisi"
        }
      },
      fallbacks: [
        "Aklına bir isim gelmedi mi? Uydur bir şeyler."
      ]
    },

    "msn": {
      hint: "Selam verebilir, titreşim yollayabilir veya ne dinlediğini sorabilirsin.",
      look: "Ekranda {crush} yazıyor. Yanında ufak bir müzik notası var.",
      text: "Durumunda 'Ne dinliyorum' özelliği açık. Emre Aydın - Afili Yalnızlık dinliyor. Ekrana öylece bakıyorsun, o da sana yazmıyor. İlk adımı atmalısın.",
      freeze: {
        text: "Beş dakika geçti. {crush} durumunu 'Meşgul' yaptı. Kırmızı. Bu iyiye işaret değil. Yazacak mısın, titreşim mi atacaksın?",
        exhausted: {
          text: "Sustun. Sağ altta bir pencere belirdi: '{crush} Çevrimdışı'. Geçmiş olsun.",
          ending: "cevrimdisi"
        }
      },
      intents: [
        {
          id: "kamera_once",
          keywords: ["kamera", "cam ac", "webcam"],
          text: "Kameradan bahsettin. Cevap şimşek gibi geldi: 'Cam mı? Aç o zaman, göreyim seni.'",
          goto: "kamera_sorunu"
        },
        {
          id: "titresim",
          positive: true,
          keywords: ["titresim", "titret", "titresim yolla", "salla"],
          text: [
            "Titreşim gönderdin. Ekranı sallandı. O da sana titreşimle karşılık verdi.",
            "Bir titreşim daha yolladın. 'Ne titretiyorsun ya, sağır oldum!' yazdı."
          ],
          exhausted: {
            text: "Üst üste titreşim atınca sinirlendi ve seni engelledi. Artık hep çevrimdışı görünecek.",
            ending: "engellendi"
          },
          goto: "kamera_sorunu"
        },
        {
          id: "selam",
          positive: true,
          keywords: ["selam", "naber", "nasil", "mesaj at", "merhaba", "yaziyorum", "yazarim", "napiyorsun", "ne yapiyorsun"],
          text: "Yazdın, gönderdin, iki kere okudun. Anında cevap geldi: 'Naberr :) cam açsana.'",
          goto: "kamera_sorunu"
        },
        {
          id: "sarki",
          positive: true,
          keywords: ["sarki", "dinliyorum", "afili", "kisisel ileti", "emre aydin"],
          text: "MSN kişisel iletini '•°• Yaln!z •°•' yaptın. Üç dakika sonra çalıştı: 'Noldu ya, cam açsana.'",
          goto: "kamera_sorunu"
        },
        {
          id: "link",
          positive: true,
          keywords: ["link", "resim at", "video at", "bunu gordun"],
          text: "Rastgele 'Bunu gördün mü' diye bir link attın. Bilgisayarına truva atı bulaştı, fare kendi kendine hareket etmeye başladı.",
          ending: "virus"
        }
      ],
      fallbacks: [
        "Ona bir şeyler yaz, ilk adımı at."
      ]
    },

    "kamera_sorunu": {
      hint: "Kameranın olmadığını söyle, ya da başka bir iletişim yolu teklif et.",
      look: "Bilgisayarın üstünde kamera yok, sadece kocaman tüplü bir monitör var.",
      text: "Büyük bir kriz var: Senin masaüstü bilgisayarın kamerası yok!",
      freeze: {
        text: "— Açmıyo musun? Bi sorun mu var? diye yazdı. Altında 'yazıyor...' yanıp sönüyor. Kameran yok mu diyeceksin, başka yol mu bulacaksın?",
        exhausted: {
          text: "'Ee, şey...' diye gevelerken {crush} 'Açmıyorsan ben çıkıyorum' yazdı ve çevrimdışı oldu.",
          ending: "cevrimdisi"
        }
      },
      intents: [
        {
          id: "yok_de",
          keywords: ["kameram yok", "kamera yok", "kamerasi yok", "kamera bozuk", "kameram bozuk", "net kafe", "internet kafe", "kafeye"],
          text: "Kameranın olmadığını itiraf ettin. Bir süre 'yazıyor...' çıktı, sonra: 'O zaman net kafeye git oradan aç, bekliyorum.'",
          goto: "kafe_yolu"
        },
        {
          id: "telefon",
          positive: true,
          keywords: ["telefon", "mesajlasalim", "arayayim", "numara", "sms"],
          text: "Numarasını istedin, verdi. Kontörün sıfır. Bakkala koştun, 20 kontörlük kartı kazırken tırnağın kırıldı. Eve dönüp ilk mesajı attın: 'naber'. Cevap: 'Mesajınız iletilemedi.' Numarayı bir hane eksik kaydetmişsin.",
          ending: "bakkal_kontor"
        },
        {
          id: "sesli",
          positive: true,
          keywords: ["sesli arama", "mikrofon", "arama yap", "sesli konusalim"],
          text: "Sesli arama başlattın. Yankı yapan cızırtılı mikrofondan 'Alooo' dedin. Ses öyle yüksekti ki içerden annen gelip internet fişini çekti.",
          ending: "mikrofon_yankisi"
        },
        {
          id: "bahane",
          keywords: ["annem cagiriyor", "annem kiziyor", "misafir", "gitmem lazim", "baska zaman", "cikmam lazim"],
          text: "Çıkman gerektiğini yazdın ama MSN'i kapatmayı unuttun.\n— Yalan söyleme, hâlâ çevrimiçisin.\nEngellendin.",
          ending: "engellendi"
        }
      ],
      fallbacks: [
        "Kamera istiyor. Nasıl bir bahane bulacaksın?"
      ]
    },

    "kafe_yolu": {
      hint: "Kaç saat açtıracağını seç ya da başka bir masaya otur.",
      look: "Kafenin içi yoğun bir ter, toz ve Counter Strike sesi kokuyor.",
      text: "Evden fırlayıp mahalledeki internet kafeye, 'Matrix Net'e geldin. Kasadaki saçları jöleli abi 'Masa 5'i açıyorum, ne kadar atacaksın?' dedi.",
      freeze: {
        text: "— Koçum arkada sıra var. Saatlik mi açıyorum, süresiz mi?",
        exhausted: {
          text: "Sen cebindeki bozuklukları sayarken masa 5'i başkası kaptı.\n— Başka masa yok koçum, akşam gel.",
          ending: "sure_bitti"
        }
      },
      intents: [
        {
          id: "saatlik",
          positive: true,
          keywords: ["saat", "sureli", "#"],
          text: "Kafeci bozukluklarını saymadan cebe attı. Geçip oturdun. Kulaklık yapış yapış ama umrunda değil.",
          goto: "kafe_masa"
        },
        {
          id: "suresiz",
          positive: true,
          keywords: ["suresiz", "hesabi acik", "ne kadar oturursam", "limitsiz"],
          text: "Kafeci başını salladı.\n— Süresiz dediğin akşam ezanına kadar ha.\nGeçip 5 numaraya kuruldun.",
          goto: "kafe_masa"
        },
        {
          id: "masa_sec",
          positive: true,
          keywords: ["baska masa", "masa degis", "kamerali masa", "kamerasi olan"],
          text: "— Kameralı tek masa 5 koçum. O da yarım çalışıyor.\nMecbur 5'e oturdun.",
          goto: "kafe_masa"
        },
        {
          id: "oyun",
          positive: true,
          keywords: ["oyun ac", "vice city", "metin2", "knight online", "oynarim", "counter", "cs atarim"],
          text: "Masaya oturur oturmaz MSN'i unutup GTA oynamaya daldın. 'LEAVETOOLS' şifresini yazıp bütün silahları aldın.",
          ending: "gta_sifresi"
        }
      ],
      fallbacks: [
        "Kafeci sana bakıyor. Masa süresi ne kadar olacak?"
      ]
    },

    "kafe_masa": {
      hint: "Çocuğu kovabilir, ona yardım edebilir veya oyalayabilirsin.",
      look: "Yan masada sümüklü bir çocuk ekrana bakıyor.",
      text: "MSN'i açtın. {crush} hala çevrimiçi. Tam kamerayı açacaksın, yan masadaki küçük çocuk ensende bitti: 'Abi Wolfteam hilesi var mı sende?'",
      freeze: {
        text: "Çocuğa cevap vermedin. O da ekranına bakıp nefes almaya devam etti. Dayanamayıp kamerayı açtın.",
        goto: "kamera_acik"
      },
      intents: [
        {
          id: "kov",
          positive: true,
          keywords: ["git burdan", "uzaklas", "defol", "sanane", "karisma", "kovarim", "kalk git"],
          text: "» Git abicim işim var!\nÇocuk ağlayarak 20 yaşındaki abisini çağırdı. Abisi gelip ensene bir tokat attı.",
          ending: "dayak_yedin"
        },
        {
          id: "hile_ver",
          positive: true,
          keywords: ["hile", "kurayim", "goster", "yardim et"],
          text: "Çocuğa hile indirmeye çalışırken bilgisayar mavi ekran verdi.\n— Format atıcam, kalk! diye bağırdı kafeci. Çocuk çoktan kaçmıştı.",
          ending: "mavi_ekran"
        },
        {
          id: "oyala",
          positive: true,
          keywords: ["isim var", "bekle", "oyala", "sonra", "simdi degil"],
          text: "» Şimdi işim var abicim, sonra bakarız.\nÇocuk usulca yan masaya döndü. Sen de hemen kamerayı açtın.",
          goto: "kamera_acik"
        },
        {
          id: "masayi_degis",
          positive: true,
          keywords: ["masayi degistir", "kalkarim", "uzaklasirim"],
          text: "Gıcık olup masayı değiştirdin. Sonra kamerayı açtın.",
          goto: "kamera_acik"
        }
      ],
      fallbacks: [
        "Çocuk ensende bekliyor. Bir şey söyle."
      ]
    },

    "kamera_acik": {
      hint: "Saçını övebilir, kamerayı kapatabilir ya da kafeciyi uyarabilirsin.",
      look: "Kamerada 144p, piksel piksel bir görüntü. {crush} gülümsüyor.",
      text: "Kamerayı açtın. {crush} gülümsedi. 'Saçımı kestirdim nasıl olmuş?' diye sordu. Fakat o an arkanda dikilen kafeci ekrana yansıdı.",
      freeze: {
        text: "Cevap vermedin. {crush} 'Arkadaki jöleli abi kim? Abin mi?' yazdı.",
        goto: "facebook_final"
      },
      intents: [
        {
          id: "guzel",
          positive: true,
          keywords: ["guzel", "cok iyi", "begendim", "yakis", "harika", "olmus"],
          text: "{crush} kızardı, 144p'de bile belli oldu. Arkadaki kafeci kameraya baş parmağını kaldırdı:\n— Güzel olmuş yenge!",
          goto: "facebook_final"
        },
        {
          id: "kapat",
          positive: true,
          keywords: ["kamerayi kapat", "utaniyorum", "kapatirim", "fisi cekerim"],
          text: "Panikle kamerayı kapattın. 'Noldu ya?' yazdı. Utancından cevap veremedin ve kafeden koşarak çıktın.",
          ending: "utangac"
        },
        {
          id: "kafeci",
          positive: true,
          keywords: ["kafeciyi", "abi git", "kadraj", "arkama bak", "cekil"],
          text: "Kafeciye kadrajdan çıkmasını söyledin.\n— Masanın süresi bitti koçum, kalk.\nHesabı kesti, kamerayla beraber sen de kapandın.",
          ending: "sure_bitti"
        }
      ],
      fallbacks: [
        "Kafeci kadrajda sırıtıyor, {crush} saçını soruyor. Bir şey yap."
      ]
    },

    "facebook_final": {
      hint: "Facebook'tan ekleyebilir, dürtebilir veya oyun oynayabilirsin.",
      look: "MSN bazen donuyor, yazılar geç gidiyor.",
      text: "Kafeci olayını atlattın. {crush} 'MSN kasıyor ya, Facebook'tan eklesene beni' yazdı.",
      freeze: {
        text: "— Ee? Ekliyor musun? Beni 'prensesss' diye arat, üç s'li.",
        exhausted: {
          text: "Sen düşünürken kafede elektrikler kesildi. Karanlıkta yirmi kişi aynı anda bağırdı: 'Abi kaydet!' Kaydetmedi.",
          ending: "elektrik_kesintisi"
        }
      },
      intents: [
        {
          id: "ekle",
          positive: true,
          keywords: ["ekle", "istek", "arkadas ol", "facebook"],
          text: "Facebook'a girdin. Profil fotoğrafında güneş gözlüklü havalı bir pozun var. İstek gönderdin, hemen kabul etti. Birkaç gün sonra ilişki durumunuz 'Karmaşık' oldu.",
          ending: "2010_aski"
        },
        {
          id: "evet_ekle",
          whole: true,
          keywords: ["tamam", "olur", "tabi", "evet", "ok"],
          text: "Facebook'a girdin. Profil fotoğrafında güneş gözlüklü, yukarıdan çekilmiş bir pozun var. İstek gönderdin, anında kabul etti. Birkaç gün sonra ilişki durumunuz 'Karmaşık' oldu.",
          ending: "2010_aski"
        },
        {
          id: "durt",
          positive: true,
          keywords: ["durt", "durtukle", "poke", "durtucem"],
          text: "Onu ekleyip anında 'Dürttün'. O da seni dürttü. Sonra sen onu, o seni... Sabaha kadar karşılıklı dürtüştünüz.",
          ending: "durtuklenme"
        },
        {
          id: "oyun_oyna",
          positive: true,
          keywords: ["farmville", "poker", "oynayalim", "tarlasini", "oyun atalim"],
          text: "'Farmville'de tarlamı sular mısın?' yazdı. Bütün gece uykusuz kalıp sanal domates topladın. Ama değdi.",
          ending: "farmville"
        }
      ],
      fallbacks: [
        "Facebook'a geçecek misin?"
      ]
    }
  },

  fallbacks: [
    "Sene 2010, o daha icat edilmedi. {crush} bekliyor, ne yazıyorsun?",
    "{crush} üç nokta yazıp siliyor, yazıp siliyor. Sen ne diyeceksin?"
  ]
});
