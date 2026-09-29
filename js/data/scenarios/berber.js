window.Yasandi = window.Yasandi || {};
window.Yasandi.scenarios = window.Yasandi.scenarios || [];
window.Yasandi.scenarios.push({
  id: "berber",
  title: "Kısa Olmasın",

  endings: {
    asker: { title: "3 Numara", tag: "ASKERLİK" },
    yarim: { title: "Asimetrik Kesim", tag: "MODA DEĞİL" },
    yangin: { title: "Kulak Yangını", tag: "YANDIN" },
    kacis: { title: "Yarım Saçla Kaçış", tag: "FİRAR" },
    yakisikli: { title: "Usta Haklıymış", tag: "YAKIŞIKLI" },
    borc: { title: "Çırağa Borçlandın", tag: "BORÇLANDIN" },
    kolonya: { title: "Limon Kolonyası", tag: "GÖZÜN YANDI" },
    hikaye: { title: "Başka Bir Hikaye", tag: "GİZEM" },
    kel: { title: "Tamamen Kel", tag: "PARLAK" },
    cay: { title: "Sıcak Çay", tag: "YANDIN" },
    gazete: { title: "Amcanın Öfkesi", tag: "DAYAK" },
    maske: { title: "Kaşlar Gitti", tag: "MASKELİ" },
    aglama: { title: "Aynadaki Yabancı", tag: "GÖZYAŞI" },
    kavga: { title: "Makaslı Kavga", tag: "KARAKOL" }
  },

  nodes: {
    start: {
      hint: "Usta kime benzemek istediğini soruyor. Bir isim söyle ya da en baştan uyar.",
      inherits: "cutting-1",
      text:
        "Mahalle berberi Remzi usta. Oturdun, boynuna havluyu bağladı.\n" +
        "— Hoş geldin abim. Nasıl yapalım?\n" +
        "» Abi uçlarından alsan yeter, kısa olmasın.\n" +
        "— Tabi abim, merak etme sen.\n" +
        "Makine ensende vızıldamaya başladı. Çırak çay getirdi, kenarda bekleyen yaşlı müşteri gazeteye bakıyor.\n" +
        "Remzi usta aynadan seninle göz göze geldi:\n" +
        "— Nası olsun abim, kime benzesin?",
      acceptAny: [
        {
          text:
            "— {input} {mi}? Tamamdır abim, aynısını yapıyorum.\n" +
            "Makineyi kafanın yanlarına daldırdı. Aynadaki görüntün hızla değişiyor. Usta birden futboldan açtı:\n" +
            "— Dünkü maçı izledin mi abim? Bizim gençler koşmuyor artık.",
          goto: "cutting-1",
        }
      ],
      fallbacks: [
        "— Birini söyle abim, Brad Pitt mi yapayım, Tarkan mı?",
        "Makine ensende bekliyor. Kime benzemek istiyorsun?"
      ]
    },

    "cutting-1": {
      hint: "Saçının çok kesilmemesi için uyar, aynaya bak veya maça yorum yap.",
      intents: [
        {
          id: "kisa-olmasin",
          positive: true,
          keywords: ["kisa", "olmasin", "uzun", "birak", "kesme", "ucundan", "cok kestin", "kestin", "sadece uclar", "uclarindan"],
          text: [
            "— Tabi abim, kısa olmasın, için rahat olsun.\nMakineyi 2 numaraya taktı, kafanın diğer yanını da kazıdı.",
            "— Anladım abim anladım. Kısa olmasın.\nUsta tarağı saçına daldırdı. Tarak boşlukta dolaşıp geri geldi.",
          ],
          goto: "service-offer-1",
        },
        {
          id: "ayna",
          positive: true,
          keywords: ["aynaya", "bakmak", "bakayim", "nasil", "olmus"],
          text:
            "Aynaya dikkatlice baktın. Saçının yarısı yok. Yüzün düştü.\n" +
            "Bekleyen yaşlı müşteri gazeteden başını kaldırıp:\n" +
            "— Gençlere de hiç yakışmıyor bu yeni modeller, dedi.",
          goto: "service-offer-1",
        },
        {
          id: "mac",
          positive: true,
          keywords: ["mac", "futbol", "oynamiyor", "haklisin", "evet usta", "izledim"],
          text:
            "» Sorma usta, ruh yok takımda.\n" +
            "Remzi usta coştu. — Ya! Şimdikiler paraya doydu!\n" +
            "Makası heyecanla havada sallarken yanlışlıkla saçının tepe kısmından koca bir tutam kesti.",
          goto: "service-offer-1",
        },
        {
          id: "kacmak",
          positive: true,
          keywords: ["kalkayim", "kalkiyorum", "kaciyorum", "kacmak", "gidiyorum", "yeter"],
          text:
            "» Abi yeter, ben kalkayım!\n" +
            "Ayağa fırladın. Kafanın yarısı uzun, yarısı 2 numara.\n" +
            "O halde sokağa çıktın. Herkes sana bakıyor.",
          ending: "kacis",
        }
      ],
      fallbacks: [
        "Makasın 'çıt çıt' sesi kafanda yankılanıyor. Usta maçı anlatıyor. Ne yapacaksın?",
        "Aynadaki adam giderek sana daha az benziyor. Müdahale et.",
      ]
    },

    "service-offer-1": {
      hint: "Usta ekstra hizmet teklif ediyor. Kabul et veya reddet.",
      text:
        "Remzi usta sprey şişesiyle yüzüne biraz su sıktı.\n" +
        "— Abim hazır el atmışken ense tıraşını da jiletle alıvereyim mi? Sinek kaydı olsun.",
      intents: [
        {
          id: "yes-ense",
          positive: true,
          keywords: ["olur", "al abi", "alabilirsin", "yapalim", "yap abi", "enseyi al", "temizle"],
          text:
            "» Olur abi, alıver.\n" +
            "Usta usturayı biledi. 'Benim jilet affetmez abim' diyerek enseni kazımaya başladı.\n" +
            "Ama elini biraz fazla yukardan aldı, ense çizgin artık kulaklarının hizasında.",
          goto: "cutting-2",
        },
        {
          id: "no-ense",
          keywords: ["kalsin", "istemem", "gerek yok", "alma", "dokunma", "yapma", "sadece", "hayir"],
          text:
            "» Yok abi kalsın, öyle kalsın.\n" +
            "— Ne demek kalsın abim, ayıp ediyorsun.\n" +
            "Deyip usturayı ensene dayadı ve yine de aldı.",
          goto: "cutting-2",
        }
      ],
      inherits: "cutting-1",
      fallbacks: [
        "Usta elinde jiletle cevabını bekliyor. Enseyi alsın mı?",
      ],
      patience: 2,
      patienceIntent: {
        text:
          "Sen cevap vermeyince usta sessizliğini onay saydı.\n" +
          "Ensene usturayı sürttü. Sonra birden siyaha boyanmış bir yüz maskesi çıkarıp yüzüne yapıştırdı.\n" +
          "Yarım saat sonra maskeyi sökerken kaşlarının yarısı da maskeyle beraber geldi.",
        ending: "maske",
      }
    },

    "cutting-2": {
      hint: "Yine çok kısa kesti! İsyan et, sabret veya ağla.",
      text:
        "Remzi usta tarağı saçına daldırıp çekiyor, bir yandan da anlatıyor:\n" +
        "— Bak abim, bizim zamanımızda saygı vardı. Çırak ustaya ses edemezdi.",
      intents: [
        {
          id: "kisa-olmasin-2",
          positive: true,
          keywords: ["kisa", "olmasin", "cok kestin", "mafettin", "berbat", "kel ettin", "abi yeter", "uzun birak"],
          text:
            "» Abi gözünü seveyim kısa olmasın, kalmadı saç!\n" +
            "— Haklısın abim, bitti zaten, toparlıyorum.\n" +
            "Deyip tepeyi de yanlara uydurmak için tamamen 3 numaraya vurdu.",
          goto: "service-offer-2",
        },
        {
          id: "sabir",
          positive: true,
          keywords: ["sabret", "bekle", "sus", "ses cikarmiyorum", "devam et", "dinliyorum", "iyi abi"],
          text:
            "» İyi abi, devam et bakalım...\n" +
            "— Senin için rahat olsun abim. Genç işi yapıyorum ben.\n" +
            "Usta tarağı bıraktı.",
          goto: "service-offer-2",
        },
        {
          id: "agla",
          positive: true,
          keywords: ["aglamak", "agla", "gozyasi", "uzuldum", "mahvoldum", "aglayacagim"],
          text:
            "Aynadaki kel adama bakıp gözyaşı dökmeye başladın.\n" +
            "Usta panikledi: 'Aman abim, uzar yine ne ağlıyorsun!'",
          ending: "aglama",
        },
        {
          id: "cirak",
          positive: true,
          keywords: ["cirak", "cay", "sicak", "dokulme"],
          text:
            "» Çırak, o çay nerede kaldı!\n" +
            "Çırak korkuyla seğirtirken elindeki sıcak çayı yanlışlıkla kucağına döktü.",
          ending: "cay",
        }
      ],
      inherits: "cutting-1",
      fallbacks: [
        "Usta eski günleri anlatmaya devam ediyor. Saçın tükenmek üzere. Bir şey de.",
      ],
      patience: 2,
      patienceIntent: {
        text:
          "Sessizce kaderine boyun eğdin.\n" +
          "Usta 'Hazır makineyi almışken...' diyerek bütün saçını sıfıra vurdu.",
        ending: "kel",
      }
    },
    
    "service-offer-2": {
      hint: "Usta ateşle kulak kılı almayı teklif ediyor.",
      text:
        "Tıraş bitmek üzere. Usta ucunda pamuk olan ince bir şiş çıkardı. Çakmağı çaktı.\n" +
        "— Kulak kıllarını da ateşle alayım mı abim? Pırıl pırıl olur.",
      intents: [
        {
          id: "yes-fire",
          positive: true,
          keywords: ["yak abi", "atesle", "olur", "yap abi", "temizle", "yapalim"],
          text:
            "» Al abi, tam olsun.\n" +
            "Usta yanan pamuğu kulağına yaklaştırdı ama aynı anda çırak dükkanın kapısını açınca cereyan yaptı.\n" +
            "Kafandaki jöle alev aldı.",
          ending: "yangin",
        },
        {
          id: "no-fire",
          keywords: ["kalsin", "istemem", "gerek yok", "yapma", "ates", "korkarim", "hayir"],
          text:
            "» Yok abi ateşe falan gerek yok, kalsın.\n" +
            "— Sen bilirsin abim, zorla güzellik olmaz.\n" +
            "Çakmağı cebine attı.",
          goto: "cutting-3",
        }
      ],
      inherits: "cutting-1",
      fallbacks: [
        "Ustanın elindeki alevli pamuk yüzüne yaklaşıyor. Ne diyeceksin?",
      ]
    },

    "cutting-3": {
      hint: "Usta askerlik anısına başladı. Dinle veya böl.",
      text:
        "Usta aynayı boynunun arkasına tutup enseni gösterdi, ama sen bakamadan geri çekti.\n" +
        "— Bak abim, sene 94. Biz Erzurum'da askeriz, eksi otuz. Komutan beni çağırdı, dedi ki 'Remzi...'",
      intents: [
        {
          id: "listen",
          positive: true,
          keywords: ["dinliyorum", "dinle", "evet usta", "sonra", "anlat", "ne demis"],
          text:
            "Sesini çıkarmayıp ustanın efsanevi askerlik anısını dinledin.\n" +
            "Usta tam heyecanlı yerinde makası masaya bıraktı.\n" +
            "— Ama bu başka bir hikâyenin konusu... Hadi geçmiş olsun abim.",
          ending: "hikaye",
        },
        {
          id: "interrupt",
          positive: true,
          keywords: ["sus", "kes", "yeter", "abi yeter", "anisi", "askerlik", "banane", "uzatma", "bosver"],
          text:
            "» Abi bırak şimdi komutanı, ön taraf yamuk mu oldu biraz?\n" +
            "Usta dikkatini kaybetti, makas kaydı. Saçının bir tarafı tamamen sıfırlandı.",
          ending: "yarim",
        },
        {
          id: "skip-story",
          positive: true,
          keywords: ["gec abi", "gecelim", "gidelim", "bitti mi"],
          text:
            "» Abi bitsin artık şu tıraş, komutana selamlar.\n" +
            "— Bitti abim bitti, sıhhatler olsun.",
          goto: "finishing",
        }
      ],
      inherits: "cutting-1",
      fallbacks: [
        "Usta heyecanla askerlik anısını anlatıyor. Ses çıkaracak mısın?",
      ]
    },

    "finishing": {
      hint: "Tıraş bitti. Aynaya bak, bahşiş ver veya kolonya sürdür.",
      text:
        "Üzerindeki önlüğü çırptı. Elini devasa bir bidon limon kolonyasına daldırdı.\n" +
        "— Sıhhatler olsun abim. Yıkayalım mı, böyle iyi mi?",
      intents: [
        {
          id: "kolonya-refuse",
          keywords: ["kolonya", "surme", "istemem", "kalsin", "yakiyor", "olmasin", "gerek yok"],
          text:
            "» Abi aman kolonya deme, cildim hassas.\n" +
            "Usta 'Kolonyasız tıraş mı olurmuş' diyerek şap diye suratına yapıştırdı.\n" +
            "Kolonya direk gözüne kaçtı. Yarım saat kör kaldın.",
          ending: "kolonya",
        },
        {
          id: "bahsis",
          positive: true,
          keywords: ["bahsis", "para", "cirak", "ucret", "veriyorum", "verecegim", "hesap"],
          text:
            "Cebine elini attın. Yanında sadece bozukluk kalmış.\n" +
            "Hesabı ödedin ama çırağa bahşiş verecek para kalmadı.\n" +
            "Gidip çıraktan 10 lira borç istedin. Çırak sana acıyarak baktı.",
          ending: "borc",
        },
        {
          id: "look-mirror",
          positive: true,
          keywords: ["ayna", "bakayim", "yakisikli", "nasil", "olmus", "aynan", "aynayi"],
          text:
            "Gözündeki yaşları silip aynaya dikkatlice baktın.\n" +
            "Tuhaf bir şekilde, ustanın kestiği o tuhaf model sana inanılmaz yakışmıştı!\n" +
            "Eski müşteri bile 'Delikanlıya hava kattı' dedi.",
          ending: "yakisikli",
        },
        {
          id: "asker-bitis",
          positive: true,
          keywords: ["abi bu ne", "kel oldum", "asker gibi"],
          text:
            "» Abi bu ne, asker tıraşı yapmışsın!\n" +
            "— Ne askeri abim, Amerikan bu, Amerikan! En moda model.",
          ending: "asker",
        }
      ],
      inherits: "cutting-1",
      fallbacks: [
        "Hadi kalk bakalım. Hesabı ödeyecek misin?",
        "Aynadaki yeni haline bak. Ne düşünüyorsun?",
      ],
      patience: 3,
      patienceIntent: {
        text:
          "Sen aval aval aynaya bakarken, arkada bekleyen amca gazeteyi rulo yapıp kafana vurdu.\n" +
          "— Kalksana kardeşim, kök mü saldın koltuğa! Bizim de işimiz var.",
        ending: "gazete",
      }
    }
  },

  common: [
    {
      id: "sigh",
      positive: true,
      keywords: ["ofla", "ic cek", "nefes", "ofluyorum", "off", "ulan"],
      text: "Derin bir iç çektin.\nRemzi usta: — Sıkma canını abim, kökü sende, yine uzar.",
    }
  ],

  overrides: {
    swear: {
      text: "Ağzını bozdun.\nUsta elindeki usturayı yavaşça tezgaha bıraktı. Çırak kapıyı kilitledi.",
      ending: "kavga",
    },
    police: {
      text:
        "155'i aradın.\n— 155, buyrun.\n» Memur bey, saçımı çok kısa kesti!\n" +
        "— Kardeşim saç uzar, sen kapat telefonu.",
    }
  },

  fallbacks: [
    "Makas çıt çıt devam ediyor. Bir şey de.",
    "Aynadaki adama bak. Usta sana gülümsüyor.",
    "Usta ensende makine gezdiriyor. Ne yapacaksın?"
  ],
  patience: 5,
  patienceIntent: {
    text:
      "Sen hiç konuşmayınca usta 'Abim çok dertli' diye düşündü.\n" +
      "Ve teselli olsun diye seni tamamen sıfıra vurdu.",
    ending: "kel",
  },
});
