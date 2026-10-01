window.Yasandi = window.Yasandi || {};
window.Yasandi.scenarios = window.Yasandi.scenarios || [];
window.Yasandi.scenarios.push({
  id: "tahtaya-kalk",
  title: "Lisede Bir Ders",

  remember: {
    endings: {
      itiraf_etti: "Sınıf hâlâ tahtadaki kalbi konuşuyor. Kimse silemedi. Temizlik kolu bile.",
      oscarlik: "Hoca derse girer girmez sırana bir bardak su bıraktı. Önlem.",
      uyku: "Alnında hâlâ hafif bir tebeşir izi var.",
      temizlik_kolu: "Tahtanın silgisi hocanın çantasında. Güvenlik önlemi.",
      firar: "Devamsızlığın sınırda. Bugün kaçarsan biter.",
      kopya_kurbani: "Arka sıradaki fısıldayıcı sana göz kırptı. Bu sefer 52 değil, der gibi.",
      ispiyoncu: "Sıra arkadaşın seninle konuşmuyor. Arka sıra da. Sınıf da.",
      ucak_savasi: "Sıranın içinde katlanmış bir uçak var. Üstünde 'RÖVANŞ' yazıyor.",
    },
    default: "Aynı ders, aynı hoca. Geçen sefer '{last}' diye bitmişti. Hoca yoklamada adının yanına bir yıldız koymuş.",
    often: "{runs}. kez bu dersi yaşıyorsun. Sınıfta kalmak böyle bir şey.",
    cameos: [
      { after: ["otobus-teyzesi:video"], text: "Sınıfta herkes telefonuna bakıyor. Bir video dönüyor. Otobüs. Teyze. Sen." },
      { after: ["berber:kel", "berber:yalan_sifir", "berber:kacis", "berber:yarim"], text: "Arka sıradan biri saçını gösterdi. Bütün sınıf güldü. Berberin izi hâlâ belli." },
    ],
  },

  endings: {
    ispiyoncu: { title: "Muhbir", tag: "İSPİYONCU" },
    kantin_baskini: { title: "Kantin Baskını", tag: "YAKALANDIN" },
    firar: { title: "Okuldan Firar", tag: "KAÇTIN" },
    disiplin: { title: "Müdürün Odası", tag: "DİSİPLİN" },
    rezil_oldun: { title: "Gereksiz Özgüven", tag: "REZİL OLDUN" },
    uyku: { title: "Tatlı Uykular", tag: "UYANDIN" },
    ucak_savasi: { title: "Uçak Savaşı", tag: "CEZA" },
    oscarlik: { title: "Oscar'lık Performans", tag: "AMBULANS" },
    sifir: { title: "Anlamsız Sayılar", tag: "SIFIR" },
    temizlik_kolu: { title: "Temizlik Kolu", tag: "SİLDİN" },
    zil_kurtardi: { title: "Zil Sesi", tag: "KURTULDUN" },
    itiraf_etti: { title: "İlan-ı Aşk", tag: "AŞIK" },
    kopya_kurbani: { title: "Yarıçap 52 Santim", tag: "YANLIŞ FISILTI" }
  },

  nodes: {
    start: {
      freeze: { text: ["Celal bey defterin sayfalarını çevirirken burnundan soludu.\n— Hayırdır, kimseye bakmıyoruz mu? Önünde kim oturuyorsa onun adını yaz bakalım, kimin yüzünden dağılıyorsun?", "Hoca başını kaldırdı, tebeşiri parmaklarında çevirdi.\n— Ön sıradakinin adı neydi? Sen söylemezsen ben okurum defterden."] },
      hint: "Sınıftaki o kişinin adını yaz.",
      look: "Matematik öğretmeni Celal bey sınıf defteriyle tahtanın önünde dikiliyor.",
      text: "Lisede son ders, matematik. Celal bey elinde sınıf defteriyle girdi.\n— Ödevleri göreyim bakalım.\nSen ödevi yapmadın. Bir de ön sırada, tam senin görebileceğin yerde, hep gözünün ucuyla baktığın o kişi oturuyor. Her şeyi görecek.\nKimdi o, adı neydi?",
      acceptAny: [
        { text: "» {input}.\n{input} hemen önünde oturuyor, başını bile çevirmedi. Celal bey yoklamaya başladı, bir ismin üstünde durdu:\n— Berkecan yok mu bugün? Yanında oturuyordu bu, sen biliyorsun. Nerede?\nBerkecan senin en yakın arkadaşın ve ilk dersten sonra okuldan sıvıştı.", save: "crush", goto: "yoklama" }
      ],
      fallbacks: [
        "Celal bey defteri açmaya başladı. Ön sıradaki kişinin adı neydi, yazıyor musun?"
      ]
    },

    "yoklama": {
      hint: "Arkadaşını ispiyonlayabilir, yalan söyleyebilir veya kantinde olduğunu söyleyebilirsin.",
      look: "Celal bey elinde kalemiyle bekliyor. {crush} dönüp ne diyeceğini dinliyor.",
      text: "",
      freeze: {
        text: "Sustun, hocayla göz teması kurmamaya çalıştın.\n— Neyse, yok yazıyorum, dedi Celal bey ve önüne döndü.",
        goto: "defter"
      },
      intents: [
        {
          id: "tuvalette",
          positive: true,
          keywords: ["tuvalet", "lavabo", "buradaydi", "icerde", "disarda", "su ice"],
          text: "» Tuvaletteydi hocam, az önce buradaydı.\n— Tuvalet Fizan'da mı oğlum, yirmi dakikadır yok ortada!\nHoca yine de yazmadı, sınıf defterine bakmaya devam etti.",
          goto: "defter"
        },
        {
          id: "kacti",
          positive: true,
          keywords: ["okuldan kac", "okuldan git", "okuldan cik", "kacti", "kacmis", "sivisti", "ispiyon"],
          text: "» Okuldan kaçtı hocam.\nSınıf buz kesti. Yakın arkadaşını ispiyonladın. Sınıfta adın muhbire çıktı, {crush} bile sana ters ters baktı.",
          ending: "ispiyoncu"
        },
        {
          id: "kantinde",
          positive: true,
          keywords: ["kantin", "yemekhane", "bufe"],
          text: "» Kantinde hocam.\n— O zaman git, bul getir şu çocuğu bana! Beş dakikan var!",
          goto: "kantin"
        },
        {
          id: "bilmiyorum",
          keywords: ["bilmiyorum", "gormedim", "haberim yok", "hasta", "evde", "bilmem"],
          text: "» Bilmiyorum hocam.\n— Senin neyden haberin var ki zaten, dedi Celal bey. Berkecan'ı yok yazıp önüne döndü.",
          goto: "defter"
        }
      ],
      fallbacks: [
        "— Cevap ver oğlum, nerede bu çocuk? Biliyorsun sen. Söyleyecek misin?"
      ]
    },

    "kantin": {
      hint: "Saklanabilir, sınıfa dönebilir veya kaçabilirsin.",
      look: "Kantin koridoru sessiz. Tost makinesinin kokusu geliyor.",
      text: "Sınıftan çıktın. Tam kantine inecekken koridorda nöbetçi müdür yardımcısını gördün. Adımları sana doğru yaklaşıyor!",
      freeze: {
        text: "Donakaldın. Nöbetçi hoca seni ensenden yakaladı:\n— Ne geziyorsun derste lan?\nSınıfa geri bıraktı. Tam da Celal bey tahtaya kaldıracak birini ararken!",
        goto: "tahta"
      },
      intents: [
        {
          id: "kacis",
          positive: true,
          keywords: ["bahce", "okuldan kac", "kapiya kos", "okuldan cik", "firar", "kacarim", "kaciyorum", "eve git"],
          text: "Hemen merdivenlerden atlayıp okul kapısından firar ettin! Özgürsün ama devamsızlığın sınırda.",
          ending: "firar"
        },
        {
          id: "tuvalet",
          positive: true,
          keywords: ["tuvalet", "lavabo", "cesme", "su ic"],
          text: "Hızla yön değiştirip tuvaletlere daldın.",
          goto: "cesme"
        },
        {
          id: "saklan",
          positive: true,
          keywords: ["saklan", "kapi arkas", "yangin", "gizlen"],
          text: "Yangın tüpünün arkasına saklandın ama bacağın sığmadı. Müdür yardımcısı seni bulup doğrudan disiplin kuruluna sevk etti.",
          ending: "disiplin"
        },
        {
          id: "geri_don",
          positive: true,
          keywords: ["sinifa don", "geri don", "sinifa git", "sinifa kos", "yerime otur"],
          text: "Koşarak sınıfa döndün. Kapıyı sessizce açıp yerine oturdun.",
          goto: "defter"
        }
      ],
      fallbacks: [
        "Nöbetçi hızla yaklaşıyor, bir yere girmezsen yakalanacaksın! Saklanıyor musun, kaçıyor musun, sınıfa mı dönüyorsun?"
      ]
    },

    "defter": {
      hint: "Su içmeye izin isteyebilir, sıranın altına eğilebilir veya uyuyabilirsin.",
      look: "Tahtada inanılmaz uzun bir integral sorusu var.",
      text: "Celal bey sınıf defterinde parmağını gezdiriyor:\n— Bakalım tahtadaki şu integrali kim çözecek...\n{crush} arkasına dönmüş, sana bakıyor. Ödev yok, soru zor, hoca parmağını isimlerde gezdiriyor. Ne yapıyorsun?",
      freeze: {
        text: "Nefesini tuttun. Hoca parmağını senin ismine getirdi. Tam adını söyleyecekken arka sıradan bir hışırtı geldi, kafana sivri bir şey çarptı.",
        goto: "ucak"
      },
      intents: [
        {
          id: "su_icme",
          positive: true,
          keywords: ["su icme", "su icebil", "izin iste", "lavabo", "tuvalet", "disari cik"],
          text: "» Hocam su içmeye gidebilir miyim?\n— Git, ama gelince tahtaya sen kalkıyorsun.",
          goto: "cesme"
        },
        {
          id: "saklan",
          positive: true,
          keywords: ["saklan", "sira alt", "egil", "kafa gom", "gorunmez"],
          text: "Sıranın altına iyice eğildin. Hoca tam 'O sıranın altında kim var?' diyecekken...",
          goto: "ucak"
        },
        {
          id: "cesaret",
          positive: true,
          keywords: ["ben kalk", "parmak kald", "ben coz", "tahtaya cik", "gonullu"],
          text: "» Ben çözerim hocam!\nBüyük cesaretle parmak kaldırdın. Tahtaya çıkıp kalemi aldın ama tek yaptığın boş boş bakmaktı. Herkes sana güldü.",
          ending: "rezil_oldun"
        },
        {
          id: "uyu",
          positive: true,
          keywords: ["uyuma", "uyu", "uyurum", "siraya yat", "uyuklarim"],
          text: "Kafayı sıraya koyup uyuma numarası yaptın. Hoca hedef şaşmaz tebeşir fırlatma yeteneğiyle kafana tebeşiri yapıştırdı!",
          ending: "uyku"
        }
      ],
      fallbacks: [
        "Hoca isim arıyor. Görünmez olmaya mı çalışacaksın, yoksa bir şey mi yapacaksın?"
      ]
    },

    "cesme": {
      hint: "Suyu içip dönebilir, kaçabilir veya kantine inebilirsin.",
      look: "Eski seramik lavabolar ve aynada bitkin yüzün.",
      text: "Çeşmenin başındasın ama sular kesik. Celal bey sınıfta seni bekliyor, tahtaya kalkacaksın.",
      freeze: {
        text: "Sessizce beklerken nöbetçi öğrenci gelip seni sınıfa yolladı. Kaçış yok, doğru tahtaya.",
        goto: "tahta"
      },
      intents: [
        {
          id: "suyu_ic",
          positive: true,
          keywords: ["su ic", "cesmeden", "sise", "sinifa don", "geri don", "sinifa git"],
          text: "Mecburen sınıfa döndün. Kapıdan girer girmez hoca kalemi uzattı.",
          goto: "tahta"
        },
        {
          id: "kacis",
          positive: true,
          keywords: ["kac", "eve git", "okuldan cik", "firar", "okuldan sivis"],
          text: "Çantanı bile almadan okuldan firar ettin. Yok yazılmak rezil olmaktan iyidir.",
          ending: "firar"
        },
        {
          id: "kantin_in",
          positive: true,
          keywords: ["kantin", "bufe", "tost"],
          text: "Kantine indin. Tam çayını yudumlarken müdür yardımcısı ensende bitti.",
          ending: "kantin_baskini"
        }
      ],
      fallbacks: [
        "Zaman geçiyor. Su akmıyor. Ne yapacaksın?"
      ]
    },

    "ucak": {
      hint: "Uçağı açıp okuyabilir, geri fırlatabilir veya çantana atabilirsin.",
      look: "Yerde beyaz bir kağıt uçak duruyor. Celal beyin kaşları çatık.",
      text: "Arka sıradan kafana sivri bir kağıt uçak çarptı. Sınıf kıkırdadı. Celal bey anında döndü:\n— Kim attı o uçağı? {crush} da gülüyor, sana bakıyor. Ne yapıyorsun?",
      freeze: {
        text: "Ses çıkarmadın. Celal bey kaşlarını çattı:\n— Madem atan yok, uçağın indiği yer kalkar tahtaya. Gel bakalım yavrum.",
        goto: "tahta"
      },
      intents: [
        {
          id: "oku",
          positive: true,
          keywords: ["kagidi oku", "ucagi ac", "kagidi ac", "ne yaziyor", "icine bak"],
          text: "Uçağı açtın. İçinde hocanın komik bir karikatürü çizilmişti! Celal bey elinden alıp baktı ve rengi değişti.",
          ending: "disiplin"
        },
        {
          id: "geri_at",
          positive: true,
          keywords: ["geri firlat", "arkaya at", "ucagi at", "geri at"],
          text: "Uçağı alıp arka sıraya var gücünle fırlattın. Hoca delirdi. Derste havada uçak savaşı başlattığın için uzaklaştırma aldın.",
          ending: "ucak_savasi"
        },
        {
          id: "ispiyon",
          positive: true,
          keywords: ["ispiyon", "arkadan attilar", "atan", "soylerim", "gosteririm"],
          text: "» Arkadan attılar hocam!\n— Sana sormadım! Hem uçak karşılıyor hem ispiyonluyor, geç tahtaya!",
          goto: "tahta"
        },
        {
          id: "gizle",
          positive: true,
          keywords: ["cantama", "gizle", "burustur", "yirt", "sakla", "cebime"],
          text: "Kağıdı hızla buruşturup çantana attın ama hoca gördü:\n— Ne saklıyorsun orada? Çık tahtaya bakalım!",
          goto: "tahta"
        }
      ],
      fallbacks: [
        "Hoca cevap bekliyor, bütün sınıf sana bakıyor. Kağıt uçağı açıyor musun, geri mi atıyorsun?"
      ]
    },

    "tahta": {
      hint: "Rastgele bir şeyler karalayabilir, kopya isteyebilir veya tahtayı tamamen silebilirsin.",
      look: "Önünde kocaman, bomboş yeşil bir tahta. Sınıftaki 30 çift göz sana bakıyor.",
      text: "Tahtanın önündesin. Elinde tebeşir, tahtada anlamsız sayılar var. {crush} sana gülümsüyor, bütün sınıf seni izliyor. Ne yapacaksın?",
      freeze: {
        text: "Hiçbir şey yazmadın. Derin bir sessizlik. Tam hoca ağzını açıp notunu verecekken...\nZİL ÇALDI! Hoca 'Zil hayatınızı kurtardı' deyip çıktı.",
        ending: "zil_kurtardi"
      },
      intents: [
        {
          id: "bayil",
          positive: true,
          keywords: ["bayil", "kendimi at", "yere yat", "fenalas"],
          text: "Gözlerini devirip kendini yere attın. Sınıf paniğe kapıldı, ambulans geldi. Hoca o günden sonra sana hep acıyarak baktı.",
          ending: "oscarlik"
        },
        {
          id: "salla",
          positive: true,
          keywords: ["rastgele", "karala", "salla", "yazarim", "yaziyorum", "yazmaya", "coz"],
          text: "Tahtaya rastgele x'ler y'ler yazdın. Hoca 'Bu ne oğlum, Çince mi?' dedi, herkes güldü. Sözlü notun koca bir sıfır.",
          ending: "sifir"
        },
        {
          id: "sil",
          positive: true,
          keywords: ["tahtayi sil", "sil", "temizle", "silgi"],
          text: "Nöbetçi öğrenci refleksinle silgiyi alıp tahtadaki tüm soruyu tertemiz sildin. Hoca küplere bindi.",
          ending: "temizlik_kolu"
        },
        {
          id: "kopya",
          positive: true,
          keywords: ["kopya", "yardim", "fisilda", "sinifa bak", "arkaya don"],
          text: "» Gençler neydi bu?\nArka sıradan '52 yaz' diye fısıldadılar. Kocaman 52 yazdın. Hoca 'Yarıçap nasıl 52 santim olsun?' dedi.",
          ending: "kopya_kurbani"
        },
        {
          id: "itiraf",
          positive: true,
          keywords: ["itiraf", "kalp", "seviyorum", "ilan", "ask"],
          text: "Matematik sorusu yerine tahtaya koca bir kalp çizip içine {crush} yazdın. Hoca şokta, sınıf yıkılıyor!",
          ending: "itiraf_etti"
        }
      ],
      fallbacks: [
        "Elindeki tebeşirle öylece bekleyemezsin. Yazacak mısın, silecek misin?"
      ]
    }
  },

  fallbacks: [
    "Celal bey kaşını kaldırdı, anlamadı. Ne yapıyorsun, açık söyle?",
    "Bütün sınıf seni bekliyor. Ne yapacaksın?"
  ]
});
