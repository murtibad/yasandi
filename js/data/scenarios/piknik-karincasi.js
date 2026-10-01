window.Yasandi = window.Yasandi || {};
window.Yasandi.scenarios = window.Yasandi.scenarios || [];
window.Yasandi.scenarios.push({
  id: "piknik-karincasi",
  title: "Karınca 714",

  remember: {
    endings: {
      ezildin_terlik: "Gökyüzünde 43 numara bir gölge var. Bu sefer nerede olduğunu biliyorsun.",
      boguldun_cay: "Semaverin buharı antenlerine geliyor. Geçen sefer demlendin. Uzak dur.",
      seker_krali: "Şekere bakıyorsun. Şeker de sana. Geçen sefer çaya beraber düşmüştünüz.",
      olum_cemberi: "Önündeki karınca daire çizmeye başladı. Bu sefer takip etme.",
      esir_kavanoz: "Çocuğun elinde yine kavanoz var. Kapağı açık. Sana bakıyor.",
      cop_kamyonu: "Şehirden geri döndün. Koloni seni tanımadı. Biraz şehirli kokuyorsun.",
      kralice_mutlu: "General oldun ama kraliçe yine şeker istiyor. Rütbe karın doyurmuyor.",
      kralice_kizdi: "Kraliçe seni affetti. Şartlı. Bu sefer eli boş dönme.",
    },
    default: "Aynı piknik, aynı örtü. Geçen sefer '{last}' diye bitmişti. Karıncalar unutmaz, kokudan hatırlar.",
    often: "{runs}. kez Karınca 714'sün. Koloni seni yeni gelenlere gösteriyor: 'Bu bizim 714.'",
    cameos: [
      { after: ["goz-temasi:terlik", "misafirlik:terlik2"], text: "Örtünün kenarında bir terlik duruyor. İçinden bir şey kıpırdadı. Başka bir hayattan kalma bir korku." },
      { after: ["misafirlik"], text: "Örtünün kenarında bir tabak sarma var. Tanıdık bir teyze eli. Fazla yapmış, her zamanki gibi." },
    ],
  },
  
  endings: {
    kralice_mutlu: { title: "Koloni Kahramanı", tag: "TERFİ" },
    olum_cemberi: { title: "Sonsuz Döngü", tag: "KARINCA DEĞİRMENİ" },
    ezildin_terlik: { title: "43 Numara", tag: "ŞLAAAP" },
    boguldun_cay: { title: "Sıcak Çay", tag: "DEMLENDİN" },
    tebesir_hapis: { title: "Aşılamayan Duvar", tag: "ÇİN SEDDİ" },
    piknik_bitti: { title: "Eve Dönüş", tag: "BAGAJ" },
    kavga_bocek: { title: "Yanlış Hedef", tag: "DAYAK" },
    seker_krali: { title: "Çayda Çıtır", tag: "ERİDİN" },
    esir_kavanoz: { title: "İlkokul Projesi", tag: "KAVANOZ" },
    mercek_kurtuldu: { title: "Güneş Tutulması", tag: "KURTULUŞ" },
    taksi_bocek: { title: "Bedava Yolculuk", tag: "TAKSİ" },
    cop_kamyonu: { title: "Şehir Hayatı", tag: "ÇÖP KAMYONU" },
    trafik: { title: "Trafik Canavarı", tag: "İZDİHAM" },
    kralice_kizdi: { title: "Elleri Boş", tag: "KOVULDUN" }
  },

  nodes: {
    start: {
      freeze: { text: ["Komutan karınca antenlerini sinirle salladı.\n— Bilmiyor musun? Koloni aç, kraliçe bekliyor. Ne getireceksin yuvaya?", "Komutan karınca bir adım yaklaştı.\n— 714, bak sırada kırk bin karınca var. Çabuk söyle, ne getireceksin?"] },
      hint: "Yuvaya ne getireceğini yaz (örn: ekmek, şeker, meyve).",
      look: "Yuvanın loş tünelleri. Karşında antenlerini sabırsızca sallayan komutan karınca var.",
      text: "Yuvanın girişinde, nöbetçi komutan karıncanın karşısındasın. Antenleri sinirden titriyor. Koloni üç gündür aç, kraliçe de akşama kadar bir şey bekliyor.\n— İşçi Karınca 714! Dışarıda dev bir pazar pikniği var. Yuvaya ne getireceksin, söyle de kraliçeye haber vereyim?",
      acceptAny: [
        { text: "» {input} getireceğim komutanım!\n— Aferin 714. Güneş batmadan o {input} yuvada olacak. Çık!\nYuvadan toprağın üstüne çıktın.", save: "food", goto: "mangal-alti" }
      ],
      fallbacks: [
        "— Kraliçe sabırsızca antenlerini sallıyor. Ne getireceksin?"
      ]
    },

    "mangal-alti": {
      hint: "Şekere, piknik örtüsüne gidebilir veya diğer karıncalarla konuşabilirsin.",
      look: "Her şey devasa. İnsanlar dağ gibi, otlar ağaç gibi.",
      text: "Devasa bir pazar pikniği. Gökyüzünü mangal dumanı kaplamış. İleride kocaman bir piknik örtüsü dağları andırıyor. Yanında bir semaver, ve dev bir küp şeker parçası var.",
      freeze: {
        text: "Durakladın. Yanından Karınca 715 koşarak geçti. \"Hadi yürü be, kraliçe bekliyor!\" diye bağırdı. Zaman geçiyor. Karar veremeyince şekere doğru sürüklendin.",
        goto: "seker"
      },
      intents: [
        {
          id: "sekere-git",
          positive: true,
          keywords: ["seker", "sekeri", "kupe", "sekere", "giderim", "yururum"],
          text: "» Şekere doğru ilerliyorum.\nOtların arasından geçip küp şekerin eteklerine geldin.",
          goto: "seker"
        },
        {
          id: "ortuye-git",
          positive: true,
          keywords: ["ortu", "piknik", "tirmandim", "ortuye", "karpuz", "semaver"],
          text: "» Piknik örtüsüne çıkıyorum.\nDevasa kumaş dağlarına tırmandın.",
          goto: "ortu"
        },
        {
          id: "bekle-chat",
          positive: true,
          keywords: ["selam", "anten", "muhabbet", "karincayla", "diger", "konusurum", "sohbet"],
          text: "» Diğer karıncalara selam veriyorum.\nKarşıdan gelen karıncayla anten antene tokuştunuz. Muhabbete daldınız.\nArkanızdan gelen binlerce karınca durmak zorunda kaldı. Koku izi trafiği felç oldu, herkes antenleriyle kornaya basmaya başladı.",
          ending: "trafik"
        }
      ],
      fallbacks: [
        "Semaverin dumanı tütüyor. Bir yöne gitmen lazım."
      ]
    },

    "seker": {
      hint: "Şekeri kucaklayabilir, ısırabilir, üstüne bayrak dikebilir veya başka koku izi arayabilirsin.",
      look: "Küp şeker Everest dağı gibi parlıyor. Bembeyaz ve tatlı.",
      text: "Küp şekere yaklaştın. Everest dağı gibi parlıyor. Üstüne tırmanabilir, bir parça ısırabilir veya kucaklayıp götürmeye çalışabilirsin.",
      freeze: {
        text: "Şekere öylece bakarken, dev bir insan eli gökyüzünden inip şekeri kaptığı gibi çay bardağına attı. Şekerden kopan bir kırıntıyla birlikte savrulup örtüye düştün.",
        goto: "ortu"
      },
      intents: [
        {
          id: "bayrak-dik",
          positive: true,
          keywords: ["bayrak", "dikiyorum", "burasi", "bizim", "sahiplendim", "dikerim", "tirmandim"],
          text: "» Burası bizim!\nŞekerin tepesine anteninle bayrak diktin. Gökyüzünden inen dev bir insan eli, şekeri seninle beraber kapıp semaverden gelen sıcak çayın içine attı.",
          ending: "seker_krali"
        },
        {
          id: "kucakla",
          positive: true,
          keywords: ["kucakla", "tasirim", "kaldirdim", "omuzuma", "sirtima", "alirim", "gemi", "gotururum"],
          text: "Ağırlığının 50 katını kaldırabiliyorsun. Şekeri kucakladın. Ama o sırada gök gürledi:\n— Ayy her yer karınca olmuş!\nDev bir teyze elindeki zehirli karınca tebeşiriyle tam önünüze kalın bir çizgi çekti.",
          goto: "tebesir"
        },
        {
          id: "isir",
          positive: true,
          keywords: ["isiriyorum", "isirdim", "yiyorum", "parca", "koparirim", "yerim"],
          text: "Şekerden kocaman bir parça kopardın. {food} olmasa da güzel bir ganimet. Tam dönecekken dev bir gölge üzerine düştü.",
          goto: "kavanoz"
        },
        {
          id: "iz-takip",
          positive: true,
          keywords: ["izi", "takip", "koku", "feromon", "karincalari", "yolu"],
          text: "Şekeri boşverip, yerde gördüğün güçlü bir koku izini takip etmeye başladın.",
          goto: "ant-mill"
        }
      ],
      fallbacks: [
        "Şeker dağının önündesin. Tırmanıyor musun, ısırıyor musun, kucaklıyor musun?"
      ]
    },

    "ortu": {
      hint: "Çekirdek kabuğunu alabilir, yeşil böceğe saldırabilir veya üstüne binebilirsin.",
      look: "Pamuklu dev iplikler, lekeler, ekmek kırıntıları. Vahşi doğa.",
      text: "Piknik örtüsündesin. Yerde yarım bir çekirdek kabuğu ve biraz simit kırıntısı var. İleride kocaman, yeşil bir böcek güneşleniyor.",
      freeze: {
        text: "Örtüde beklerken, bir teyze \"Ayy böcek!\" diye bağırdı. Havadan devasa bir terlik inmeye başladı.",
        goto: "terlik-saldirisi"
      },
      intents: [
        {
          id: "cekirdek-al",
          positive: true,
          keywords: ["cekirdek", "kabugu", "simit", "kirintisi", "alirim", "toplarim"],
          text: "Çekirdek kabuğunu aldın. Kraliçeye {food} sözü verdin ama bu da fena değil. O sırada bir bardaktan dökülen çay sele dönüştü!",
          goto: "cay-seli"
        },
        {
          id: "bocege-bin",
          positive: true,
          keywords: ["bocek", "bocege", "binerim", "taksi", "surtun", "atlarim", "ustune"],
          text: "» Yuvaya çek usta!\nBöceğin sırtına atladın. Böcek:\n— Ben taksi değilim birader, dedi ve seni anteniyle yuvanın kapısına kadar fırlattı.",
          ending: "taksi_bocek"
        },
        {
          id: "kavga",
          positive: true,
          keywords: ["vururum", "saldiririm", "kavga", "savas", "doverim", "isiririm", "oldururum"],
          text: "» Bu örtü bize ait!\nYeşil böceğe kafa attın. Böcek sana tekme attı, örtüden aşağı, karanlığa doğru uçtun.",
          ending: "kavga_bocek"
        }
      ],
      fallbacks: [
        "Örtüde etrafına bakıyorsun. Yeşil böcek, kırıntılar... Ne yapacaksın?"
      ]
    },

    "tebesir": {
      hint: "Tebeşirin üstünden atlayabilir veya etrafından dolanabilirsin.",
      look: "Bembeyaz ve zehirli bir duvar. İnsanlar için sadece yere çizilmiş bir çizgi ama senin için Çin Seddi.",
      text: "Önüne çekilen karınca tebeşiri çizgisine geldin. Burası Çin Seddi gibi. İleriye gidemiyorsun. Arkanda ise kocaman şekeri yuvaya götürmek zorundasın.",
      freeze: {
        text: "Çizgiye bakıp düşündün. O sırada başka karıncalar da geldi, hepsi çizginin önünde birikip beklemeye başladı. Saatler geçti, kimse geçemedi.",
        ending: "tebesir_hapis"
      },
      intents: [
        {
          id: "ustunden-atla",
          positive: true,
          keywords: ["atla", "ustunden", "ziplarim", "gecerim", "kosarim", "basarim", "tirmandim"],
          text: "Koşarak tebeşirin üstünden atladın. Gözlerin yandı ama başardın! Şekerle yuvaya girdin. Kraliçe, {food} getirmedin ama dev bir şeker getirdin diye seni general yaptı.",
          ending: "kralice_mutlu"
        },
        {
          id: "dolan",
          positive: true,
          keywords: ["etrafindan", "dolan", "sagdan", "soldan", "yandan", "cevreden"],
          text: "Çizginin etrafından dolanmaya karar verdin. Tam köşeyi dönerken kendi koku izini kaybettin. Başka, çok daha güçlü bir ize denk geldin.",
          goto: "ant-mill"
        }
      ],
      fallbacks: [
        "Duvar bembeyaz duruyor. Ya geçeceksin ya dolanacaksın."
      ]
    },

    "kavanoz": {
      hint: "Kaçabilir veya ölü taklidi yapabilirsin.",
      look: "Dev bir mercek. Arkasında burnunu çeken bir çocuk.",
      text: "Dev bir insan yavrusu, elinde mercekle (büyüteç) seni odaklamaya çalışıyor. Güneş ışığı tam üstünde toplanıyor, ısınıyorsun!",
      freeze: {
        text: "Olduğun yerde dondun kaldın. Işık iyice odaklandı... ama tam o an güneş buluta girdi! Çocuk sıkılıp gitti. Can havliyle yuvaya kaçtın.",
        ending: "mercek_kurtuldu"
      },
      intents: [
        {
          id: "kac",
          positive: true,
          keywords: ["kaciyorum", "kosarim", "tabanlari", "saga", "sola", "kac", "kurtul"],
          text: "Koşmaya başladın ama çocuk merceği peşinden takip ettiriyor. En sonunda elindeki merceği bırakıp seni iki parmağıyla yakaladı. Cam bir kavanozun içine attı.",
          ending: "esir_kavanoz"
        },
        {
          id: "olu-taklidi",
          positive: true,
          keywords: ["olu", "taklidi", "olmus", "yatarim", "hareketsiz", "dururum", "beklerim"],
          text: "Olduğun yere yığılıp ölü taklidi yaptın. Çocuk \"Ölmüş bu ya\" deyip seni bir peçeteyle çöp poşetine attı. Çöp kamyonu seni şehre taşıdı, artık şehir karıncasısın.",
          ending: "cop_kamyonu"
        }
      ],
      fallbacks: [
        "Mercek gittikçe ısınıyor! Ne yapacaksın?"
      ]
    },

    "ant-mill": {
      hint: "Sıradan çıkabilirsin, yoksa sonsuza kadar dönersin.",
      look: "Önünde bir karınca poposu, arkanda bir karınca kafası. Sonsuz bir daire.",
      text: "Öndeki karıncanın feromon izini takip ediyorsun. Yürü, yürü, yürü... Ama manzara hiç değişmiyor. Bir daire çizdiğinizi, bir karınca değirmenine girdiğini fark ettin.",
      freeze: {
        text: "İzden çıkmaya cesaret edemedin. Dairede dönmeye devam ettin. Dön babam dön, saatler sürdü. Karınca değirmeninden bir daha çıkamadın.",
        ending: "olum_cemberi"
      },
      intents: [
        {
          id: "cemberden-cik",
          positive: true,
          keywords: ["cikarim", "kalkarim", "ayrilirim", "bozarim", "terk", "disina", "sirayi", "yoldan", "kosarim", "sap", "saparim"],
          text: "Aniden sıradan çıktın. Diğerleri şaşkınlıkla sana bakarken, sen kendi yolunu çizdin ve tesadüfen devasa piknik örtüsünün ortasına düştün.",
          goto: "ortu"
        }
      ],
      fallbacks: [
        "Yürümeye devam mı, sıradan çıkacak mısın?"
      ]
    },

    "terlik-saldirisi": {
      hint: "Kaçabilir veya ağırlık kaldırma gücünü kullanıp terliği tutabilirsin.",
      look: "Plastik, tırtıklı, ter kokan bir kıyamet alameti.",
      text: "Devasa, 43 numara bir banyo terliği havadan hızla sana doğru iniyor! Terliğin altındaki çizgili desenler bir kabus gibi büyüyor.",
      freeze: {
        text: "Terliğin heybeti karşısında büyülenip kaldın. Gözlerini kapattın.\nŞLAAAP!",
        ending: "ezildin_terlik"
      },
      intents: [
        {
          id: "kac",
          positive: true,
          keywords: ["kac", "zipla", "sigin", "araya", "girerim", "saga", "kacarim", "saklanirim"],
          text: "Son anda terliğin tırtıklarının arasındaki boşluğa saklandın. Terlik yere vurdu ama sen ezilmedin. \nAncak hava karardı, piknik bitti ve seni de eşyalarla toplayıp arabanın bagajına koydular.",
          ending: "piknik_bitti"
        },
        {
          id: "tut",
          positive: true,
          keywords: ["tutarim", "havada", "durdururum", "kaldirmaya", "engellerim", "gucumu", "kollarimi"],
          text: "Kollarını havaya kaldırıp 50 kat ağırlık kaldırma gücünü kullandın! Terliği havada durdurdun! \nAma teyze sinirlenip daha sert bastı.\nŞLAAAP!",
          ending: "ezildin_terlik"
        }
      ],
      fallbacks: [
        "Terlik hızla iniyor! Kaçacak mısın?"
      ]
    },

    "cay-seli": {
      hint: "Çekirdek kabuğuna binebilir veya yüzmeye çalışabilirsin.",
      look: "Kızıl, sıcak, buram buram kaçak çay kokan bir okyanus dalgası.",
      text: "Semaverden dökülen kaynar çay, üstüne doğru bir tsunami gibi geliyor! Elinde az önce bulduğun yarım çekirdek kabuğu var.",
      freeze: {
        text: "Sıcak çay seline kapıldın. İçinde sürüklendin ve yavaş yavaş demlendin.",
        ending: "boguldun_cay"
      },
      intents: [
        {
          id: "cekirdege-bin",
          positive: true,
          keywords: ["cekirdege", "kabuguna", "binerim", "kullanim", "kayik", "sandal", "kano", "gemi", "icinde", "siginirim"],
          text: "Hemen çekirdek kabuğuna atlayıp kano gibi kullandın! Çay nehrinde sörf yaparak şans eseri yuvanın ağzına kadar geldin.\nKraliçeye {food} getirmedin ama efsanevi bir giriş yaptın.",
          ending: "kralice_mutlu"
        },
        {
          id: "yuz",
          positive: true,
          keywords: ["yuzerim", "yuzmeye", "dalarim", "cirpinirim", "karaya", "kula", "atarim", "kacarim"],
          text: "Çayın içinde yüzmeye çalıştın ama sıcaklık antenlerini eritti. Çok çabaladın ama akıntıya karşı koyamadın.",
          ending: "boguldun_cay"
        }
      ],
      fallbacks: [
        "Sıcak çay seli geliyor! Kabuğa mı biniyorsun, yüzüyor musun?"
      ]
    }
  },

  common: [
    {
      id: "ev-don",
      positive: true,
      keywords: ["eve don", "yuvaya don", "yuvaya git", "geri don", "yuvama", "kraliceye don"],
      text: "Korkup yuvaya, kraliçenin yanına geri döndün. Ellerinde ne bir küp şeker var ne de {food}. Kraliçe seni koloniden kovdu.",
      ending: "kralice_kizdi"
    }
  ],

  fallbacks: [
    "Karıncasın sen, garip garip işler yapma. Şimdi ne yapıyorsun?",
    "Antenlerin titreşti ama ne yapacağına karar veremedin. Yürüyor musun, tırmanıyor musun?"
  ]
});

