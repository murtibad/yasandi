window.Yasandi = window.Yasandi || {};
window.Yasandi.scenarios = window.Yasandi.scenarios || [];
window.Yasandi.scenarios.push({
  id: "2010-bir-gun",
  title: "Bir Günlüğüne 2010",

  endings: {
    cevrimdisi: { title: "Fırsat Kaçtı", tag: "ÇEVRİMDIŞI" },
    engellendi: { title: "Küstürdün", tag: "ENGELLENDİN" },
    virus: { title: "Truva Atı", tag: "FORMATLIK" },
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
        text: "Cevap vermedin. Kendi kendine 'Boşver, kimseyle konuşasım yok' dedin. Sonra MSN'den çıkış yapıp Winamp'ı açtın.",
        ending: "cevrimdisi"
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
        text: "Sustun. On dakika sonra sağ altta bir pencere daha belirdi: '{crush} Çevrimdışı'. Geçmiş olsun, büyük fırsatı kaçırdın.",
        ending: "cevrimdisi"
      },
      intents: [
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
          keywords: ["selam", "naber", "nasil", "mesaj at", "merhaba", "yaz", "yazarim", "=evet", "=tamam"],
          text: "» Selam :)\nAnında cevap geldi: 'Naber, cam açsana.'",
          goto: "kamera_sorunu"
        },
        {
          id: "sarki",
          positive: true,
          keywords: ["durum", "sarki sozu", "dinliyorum", "afili", "ben de"],
          text: "MSN kişisel iletini 'Gidiyorum bütün aşklar yüreğimde' yaptın. Bunu görüp etkilendi ve 'Cam açsana' yazdı.",
          goto: "kamera_sorunu"
        },
        {
          id: "link",
          positive: true,
          keywords: ["link at", "resim at", "virus"],
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
        text: "'Ee, şey...' diye gevelerken {crush} 'Açmıyorsan ben çıkıyorum' yazdı ve çevrimdışı oldu.",
        ending: "cevrimdisi"
      },
      intents: [
        {
          id: "yok_de",
          keywords: ["kameram yok", "kamera bozuk", "kamera yok", "bende yok", "yok"],
          text: "» Kameram bozuk ya.\n'O zaman net kafeye git oradan aç, bekliyorum' yazdı.",
          goto: "kafe_yolu"
        },
        {
          id: "telefon",
          positive: true,
          keywords: ["telefon", "kontor", "mesajlasalim", "arayayim", "numarani"],
          text: "» Kameram yok, numarani ver mesajlaşalım.\nNumarasını verdi. Ama senin kontörün yok. Bakkala gidip 20 kontör kartı kazıman lazım.",
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
          keywords: ["kapatmam", "annem kiziyor", "misafir", "gitmem lazim", "isim var", "baska zaman"],
          text: "» Annem çağırıyor çıkmam lazım.\n'Yalan söyleme, durumun hala çevrimiçi' dedi ve sana küsüp engelledi.",
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
        text: "Sen cebindeki bozuklukları sayarken masa 5'i başkası kaptı. Kafeci 'Başka masa yok koçum' diyip seni yolladı.",
        ending: "sure_bitti"
      },
      intents: [
        {
          id: "saatlik",
          positive: true,
          keywords: ["yarim saat", "bir saat", "iki saat", "sureli", "saatlik", "1 saat"],
          text: "» Bir saat aç abi.\nGeçip oturdun. Kulaklık yapış yapış ama umrunda değil.",
          goto: "kafe_masa"
        },
        {
          id: "suresiz",
          positive: true,
          keywords: ["suresiz", "hesabi acik", "ne kadar oturursam", "acik", "limitsiz"],
          text: "» Süresiz aç abi.\nKafeci başını salladı. Geçip 5 numaraya kuruldun.",
          goto: "kafe_masa"
        },
        {
          id: "masa_sec",
          positive: true,
          keywords: ["baska masa", "kamera calismiyor", "degistir", "5 numara"],
          text: "» Abi 5'in kamerası bozuk, 8'i aç.\n8 numaralı masaya geçtin.",
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
          keywords: ["hile", "kurayim", "goster", "yardim et", "var", "=evet", "kur", "yapalim"],
          text: "Çocuğa hile indirmeye çalışırken bilgisayara virüs girdi. Mavi ekran verdi! Kafeci 'Format atıcam kalk!' diye bağırdı.",
          ending: "virus"
        },
        {
          id: "oyala",
          keywords: ["isim var", "bekle", "oyala", "sonra", "simdi degil", "yok", "=hayir"],
          text: "» Yok abicim bende hile falan, işim var.\nÇocuk usulca yan masaya döndü. Sen de hemen kamerayı açtın.",
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
        text: "Cevap vermedin. {crush} 'Arkadaki kel abi kim? Sana çok benziyor' yazdı.",
        goto: "facebook_final"
      },
      intents: [
        {
          id: "guzel",
          positive: true,
          keywords: ["guzel", "cok iyi", "begendim", "yakismis", "harika"],
          text: "» Çok yakışmış :)\nArkadaki kafeci de kameraya baş parmağını kaldırıp 'Güzel olmuş yenge' diye bağırdı.",
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
          text: "» Abi kadraja girme ya!\nKafeci 'Masanın süresi bitti koçum, kalk' diyerek hesabı kesti.",
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
        text: "Tam adını yazacakken kafede elektrikler kesildi! Herkes 'Abi masa 5'i kaydet!' diye bağırmaya başladı. Karanlıkta kaldın.",
        ending: "elektrik_kesintisi"
      },
      intents: [
        {
          id: "ekle",
          positive: true,
          keywords: ["eklerim", "istek yolla", "kabul et", "ararim", "tamam"],
          text: "Facebook'a girdin. Profil fotoğrafında güneş gözlüklü havalı bir pozun var. İstek gönderdin, hemen kabul etti. Birkaç gün sonra ilişki durumunuz 'Karmaşık' oldu.",
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
    "Sene 2010. O zamanlar bunlar yoktu, 2010'a uygun davran.",
    "Böyle yaparak kızın/çocuğun kalbini kazanamazsın."
  ]
});
