window.Yasandi = window.Yasandi || {};
window.Yasandi.scenarios = window.Yasandi.scenarios || [];
window.Yasandi.scenarios.push({
  id: "apartman-kedisi",
  title: "Apartmanın Sahibi",

  remember: {
    endings: {
      asansor: "Asansörün kapısı açık. Bakmıyorsun. Bakmıyorsun. Bakıyorsun.",
      isirdi: "Rıza bey seni görünce paçalarını çoraplarının içine soktu.",
      whatsapp: "Apartman grubunda sabitlenmiş bir mesaj var: 'KEDİ YİNE GİRMİŞ.' Fotoğrafın da var.",
      sahiplen: "Bir gece pencere açık kaldı, kaçtın. Çocuk hâlâ ağlıyor. Sen merdivendesin.",
      ekmek: "Rıza bey ekmeği bu sefer poşetin en dibine koymuş. Sen de bunu biliyorsun.",
      korktu: "Sokaktaki köpek hâlâ orada. Sana bakmıyor. Ama orada.",
      yonetici: "Rıza bey'in arabasının sunroof'u kapalı. Yine de üstünde senin pati izin var.",
      kovuldun: "Süpürge kapının arkasında duruyor. Seni bekliyor.",
    },
    default: "Aynı apartman, aynı merdiven. Geçen sefer '{last}' diye bitmişti. Hayriye teyze hatırlıyor, Rıza bey de.",
    often: "{runs}. kez bu merdivendesin. Apartman grubunda senin için ayrı bir başlık açıldı.",
    cameos: [
      { after: ["goz-temasi:kedi"], text: "Kapının önünde bir poşet mama var. Üstünde bir tespih. Kimin bıraktığını biliyorsun." },
      { after: ["goz-temasi:komsu"], text: "4. kattan tespih sesi geliyor. Yeni komşu. Sana mama getirir mi, bilinmez." },
    ],
  },
  
  endings: {
    mama: { title: "Diyet Mama", tag: "DOYDUN" },
    asansor: { title: "Asansörde Kaldın", tag: "MAHSUR" },
    ekmek: { title: "Ekmek Hırsızı", tag: "DOYDUN" },
    yonetici: { title: "Yöneticinin Arabası", tag: "GÖÇ ETTİN" },
    sahiplen: { title: "Sıcak Yuva", tag: "EV KEDİSİ" },
    kedi_kavgasi: { title: "Mahalle Kavgası", tag: "YARALI" },
    kovuldun: { title: "Dışarı Atıldın", tag: "SOKAK" },
    balik: { title: "Balık Ziyafeti", tag: "KRAL SEN" },
    paspas: { title: "Paspas Uykusu", tag: "UYUDUN" },
    whatsapp: { title: "Grup Karıştı", tag: "KRİZ" },
    isirdi: { title: "Isıran Kedi", tag: "AŞI" },
    korktu: { title: "Köpek Geldi", tag: "KAÇIŞ" }
  },

  nodes: {
    start: {
      freeze: { text: "Kediler isimle ilgilenmez. Ama çocuklar ilgilenir.\nBirinci katın çocuğu merdivenden sesleniyor. Sana hep aynı ismi takar. Ne diye sesleniyor?" },
      hint: "Apartmandaki çocuklar sana ne isim taktı? (örn: Duman, Pamuk, Sarı)",
      look: "Beton merdivenler. Apartman boşluğunda yankılanan sesler ve havada asılı duran o mükemmel kızarmış balık kokusu.",
      text: "Sen bu apartmanın yöneticisinden bile daha yetkili birisin: apartman kedisi.\n" +
            "Karnın çok aç. İkinci kattaki Hayriye teyze balık kızartıyor, kokusu apartman boşluğunu doldurmuş. Ayrıca kapıcı Cemal efendi az önce sabah ekmeklerini kapı önlerine bıraktı.\n" +
            "Tek derdin karnını doyurmak. Çocuklar sana genelde bir isim takar. Hani şu hep söyledikleri...",
      intents: [
        {
          id: "anlamaz",
          keywords: ["napim", "ne diyor", "ne bileyim", "sanane", "sana ne", "isim yok", "ne ismi", "abi ne", "bilmiyorum", "beni sevmezler"],
          text: "Çocuğun ne dediğiyle ilgilenmiyorsun. Ama elindeki oyuncak arabayı sallayıp sana hep aynı isimle sesleniyor. Ne diyor sana?"
        }
      ],
      acceptAny: [
        { text: "» Miyav.\n— {input} {mi}? Güzel isimmiş, dedi kendi kendine birinci katın çocuğu.", save: "name", goto: "staircase" }
      ],
      fallbacks: [
        "Sana ne sesleniyorlar?",
        "Çocuk ısrarla sana bakıyor. Hangi ismi söylüyor?"
      ]
    },

    staircase: {
      text: "Merdivenlerin ortasında dikiliyorsun. Karnın zil çalıyor.",
      hint: "Yukarı çıkıp balık isteyebilir, ekmekleri kemirebilir veya çocukla oynayabilirsin.",
      look: "Birinci katın çocuğu elinde oyuncak arabasıyla sana bakıyor. İkinci kattan balık kokusu geliyor. Üçüncü katta kapı önünde ekmek poşeti duruyor. Sokak kapısından mahallenin belalı kedisi Sarman kafasını uzatmış.",
      freeze: {
        text: [
          "Olduğun yerde oturup patilerini yalamaya başladın. Aşağıdan ayak sesleri geliyor. Yönetici Rıza bey postayı almaya geliyor galiba.\nBalık mı, ekmek mi, çocuk mu? Çabuk karar ver.",
          "Hâlâ merdivende oturuyorsun. Kapı sesi geldi, Rıza beyin nefesi duyuluyor. Karnın bir daha gurulduyor.\nYukarı mı çıkıyorsun, saklanıyor musun?"
        ],
        exhausted: {
          text: "Rıza bey köşeyi döndü, seni görünce yüzü düştü:\n— Yine mi girmiş bu! Şişt! Pist!\nSüpürgeyle kovalandın.",
          ending: "kovuldun"
        }
      },
      intents: [
        {
          id: "miyav",
          positive: true,
          keywords: ["miyav", "miyavla", "bagir", "ses cikar", "miyavliyorum", "miyavlarim", "bagiririm"],
          text: [
            "» Miyav.\nBirinci katın çocuğu sevindi:\n— Anne bak, {name} bana miyavladı!\nAnnesi içeriden bağırdı:\n— Elleme onu, pirelidir o!",
            "» Miyav!\nİkinci kattan Hayriye teyze seslendi: — Kim miyavlıyor orda? Acıkmış canım."
          ],
          exhausted: {
            text: "Sürekli miyavlamana apartman grubundan tepki geldi. Rıza bey telefonuna bakıp \"Apartman grubundan kedi sesi şikayeti alıyorum!\" dedi ve seni kapı dışarı etti.",
            ending: "whatsapp"
          }
        },
        {
          id: "yukari",
          positive: true,
          keywords: ["yukari", "ikinci", "balik", "hayriye", "teyze", "cikarim", "kokuya", "merdiven", "koku"],
          text: "Balık kokusunun geldiği ikinci kata, Hayriye teyzenin kapısına tırmandın.\nKapının önündeki paspasta bekliyorsun.",
          goto: "second-floor"
        },
        {
          id: "ekmek",
          positive: true,
          keywords: ["ekmek", "poseti", "ucuncu", "ekmege", "kemir", "yerim", "ekmekleri", "cemal", "poset"],
          text: "Üçüncü kattaki ekmek poşetine yaklaştın. Plastik poşeti biraz yırtıp taze ekmeğin ucunu kemirmeye başladın.\nKapı aniden açıldı. Rıza bey belirdi.",
          goto: "riza-bey"
        },
        {
          id: "surun",
          positive: true,
          keywords: ["cocuga", "surun", "bacak", "sevdir", "sirnas", "cocuk", "oyna", "surtun", "kafa sur"],
          text: "Çocuğun bacaklarına sürtündün.\n— Anne, {name} beni çok sevdi! diyerek seni kucağına aldı ve eve soktu.\nSıcak bir yuvan oldu, gerçi artık dışarı çıkamıyorsun.",
          ending: "sahiplen"
        },
        {
          id: "diger-kedi",
          positive: true,
          keywords: ["sarman", "tekir", "kavga", "dovus", "pati", "diger", "kediye", "saldir"],
          text: "» Miyav!\nSarman'a tıslayıp üzerine atladın. İkiniz merdivenlerden yuvarlana yuvarlana kavga ettiniz.\nApartman ayağa kalktı.",
          ending: "kedi_kavgasi"
        },
        {
          id: "uyu",
          positive: true,
          keywords: ["uyu", "kestir", "yat", "uyurum", "paspasa", "paspas"],
          text: "Karnın aç ama uykun daha ağır bastı. Çocuğun kapısındaki paspasa kıvrılıp uyudun.\nBiri üzerine basmamak için zıpladı ama sen uyanmadın.",
          ending: "paspas"
        }
      ],
      fallbacks: [
        "» Miyav? Ne yapacaksın?",
        "Balık kokusu burnuna buram buram geliyor, ekmekler de üst katta. Hangisine gidiyorsun?"
      ],
      patience: 3,
      patienceIntent: {
        text: "Sen karar verene kadar sokaktan bir köpek apartmana daldı. Arkanıza bile bakmadan en üst kata kaçtın.",
        ending: "korktu"
      }
    },

    "second-floor": {
      hint: "Kapıyı tırmalayabilir, miyavlayabilir veya bekleyebilirsin.",
      look: "Hayriye teyzenin kapısı kapalı. İçeriden televizyon sesi ve çıtır çıtır kızaran hamsi sesi geliyor.",
      freeze: {
        text: "Kapıda uslu uslu oturup bekledin. Yarım saat geçti. Hayriye teyze kapıyı açmadı. Açlıktan miden gurulduyor, gurultuyu apartmanda herkes duydu.",
        goto: "staircase"
      },
      intents: [
        {
          id: "miyav-kapi",
          positive: true,
          keywords: ["miyav", "miyavla", "bagir", "ses", "miyavliyorum", "miyavlarim", "bagiririm"],
          text: "» Miyav!\nİçeriden terlik sesleri geldi. Kapı açıldı. Hayriye teyze sana şefkatle baktı:\n— Aaa, {name} gelmiş! Acıktın mı sen?",
          goto: "hayriye-teyze"
        },
        {
          id: "tirmala",
          positive: true,
          keywords: ["tirmala", "kapiyi", "esele", "vur", "vururum", "patile", "tirnak"],
          text: "Kapıyı tırmaladın. Cırt. Cırt.\nHayriye teyze kapıyı hışımla açtı:\n— Boyayı yeni yaptırdım be hayvan! Pist!\nSana elindeki bezle vurdu, aşağı kaçtın.",
          goto: "staircase"
        },
        {
          id: "uyu-kapi",
          positive: true,
          keywords: ["uyu", "yat", "otur", "paspasa", "kivril"],
          text: [
            "Paspasta uyumaya karar verdin. Balık kokusu rüyalarına girdi.",
            "Uyurken kapı aniden açıldı, Hayriye teyzenin ayağına takıldın.\n— Ay tövbe bismillah! dedi."
          ],
          exhausted: {
            text: "Hayriye teyze düşmemek için kapı pervazına tutundu.\n— Kalp krizi geçiriyordum senin yüzünden! diyerek içeri kaçtı. Kapıyı da kilitledi.",
            ending: "kovuldun"
          }
        },
        {
          id: "surun-kapi",
          positive: true,
          keywords: ["surun", "surt", "dolan", "sirnas", "kapiya"],
          text: "Kapıya sürtünüp \"mırr\" diye bir ses çıkardın. Terlik sesleri yaklaştı, kapı açıldı.\n— Aaa, {name} gelmiş! Acıktın mı sen?",
          goto: "hayriye-teyze"
        },
        {
          id: "asansor",
          positive: true,
          keywords: ["asansore", "asansor", "kabin"],
          text: "O sırada asansörün kapısı açıldı. Merak edip içine girdin. Kapı kapandı.\n12 saat mahsur kaldın. İtfaiye çıkardı.",
          ending: "asansor"
        }
      ],
      fallbacks: [
        "İçeriden hamsi kokusu geliyor. Kapıya ne yapıyorsun?",
        "Kapalı bir kapı ve sen. Klasik kedi problemi. Ses mi çıkarıyorsun, yoksa bekliyor musun?"
      ]
    },

    "hayriye-teyze": {
      hint: "Ona sürtün, balık iste veya içeri girmeye çalış.",
      look: "Hayriye teyze elinde maşayla kapıda. Mutfaktan dumanlar tütüyor.",
      freeze: {
        text: "Öylece yüzüne baktın. Hayriye teyze: — E ne istiyorsun dilsiz hayvan? İçeri girmeyeceksen kapıyorum, cereyan yapıyor.\nKapıyı yüzüne kapattı.",
        goto: "staircase"
      },
      intents: [
        {
          id: "surun-teyze",
          positive: true,
          keywords: ["surun", "bacak", "sirnas", "sirnasirim", "sevdir", "yaltaklan", "surtun", "mirla", "mirildan", "mir mir", "kuyrugumu"],
          text: "» Miyav.\nBacaklarına dolandın, kendini sevdirdin.\n— Dur kıyamam sana, deyip mutfağa gitti. Döndüğünde elinde koca bir hamsi kuyruğu vardı.",
          ending: "balik"
        },
        {
          id: "iceri-gir",
          positive: true,
          keywords: ["iceri", "dal", "gir", "koc", "kosa", "firlar", "girerim", "mutfaga", "zipla"],
          text: "Hayriye teyzenin bacaklarının arasından mutfağa daldın.\n— Ayh! Çık dışarı arsız! diye bağırdı Hayriye teyze. Seni süpürgeyle apartman boşluğuna geri kovaladı.",
          goto: "staircase"
        },
        {
          id: "yemek-iste",
          positive: true,
          keywords: ["balik", "yemek", "mama", "ver", "vermesini", "iste", "miyavla", "acim", "miyav"],
          text: "» Miyav!\n— Aaa acıkmış, dedi Hayriye teyze. İçeri gitti. Döndüğünde sana diyet kuru mama verdi. Hamsi kokusu eşliğinde tatsız tuzsuz mama yedin.",
          ending: "mama"
        }
      ],
      fallbacks: [
        "Hayriye teyze sana, sen ona bakıyorsun. Balık için ne yapıyorsun, sürtünüyor musun?",
        "Taze hamsi kokusu başını döndürüyor. Hayriye teyze kapıda bekliyor. İçeri mi dalacaksın?"
      ]
    },

    "riza-bey": {
      hint: "Kaç, tıslayarak saldır veya masum rolü yap.",
      look: "Rıza bey takım elbiseli, sinirli bir yönetici. Elinde poşetin yarısı senin ağzında.",
      freeze: {
        text: "Ekmek ağzında, donakaldın. Rıza bey ekmeğin yarısının ağzında olduğunu görünce bağırdı:\n— Yine mi sen! Aidatları kedilere yediriyoruz resmen!\nElindeki şemsiyeyle seni merdivenlerden aşağı kovaladı.",
        ending: "kovuldun"
      },
      intents: [
        {
          id: "araba",
          positive: true,
          keywords: ["arabaya", "pencere", "disari", "saklan", "giyin"],
          text: "Panikle Rıza beyin açık duran penceresinden dışarı atladın ve tam onun park halindeki arabasının sunroof'undan içeri düştün.\nRıza bey işe giderken seni de ilçenin öbür ucuna götürdü.",
          ending: "yonetici"
        },
        {
          id: "kac-riza",
          positive: true,
          keywords: ["kaci", "kaca", "kacm", "kact", "kac lan", "uzaklas", "kos", "atla", "fiy", "kacarim", "asagi", "merdivenlerden"],
          text: "» Miyav!\nAğzındaki ekmek parçasıyla merdivenlerden aşağı fişek gibi uçtun.\nRıza bey arkandan uçan terlik fırlattı ama ıskaladı. Afiyetle yedin.",
          ending: "ekmek"
        },
        {
          id: "tisla",
          positive: true,
          keywords: ["tisla", "saldir", "isir", "tirmala", "cirmala", "kabar", "kabaririm", "pati at", "pati vur"],
          text: "Kamburunu çıkarıp tısladın. Rıza beyin paçasına yapışıp ısırdın.\n— Ay! Kuduz bu kuduz! Yetişin komşular!\nBelediye gelip sana aşı yaptı.",
          ending: "isirdi"
        },
        {
          id: "masum",
          positive: true,
          keywords: ["masum", "sevimli", "sirin", "bak", "goz", "gozlerini", "surun", "miyav", "gozlerimi kocaman", "yavru kedi"],
          text: "Ekmeği bırakıp kocaman gözlerle ona baktın.\n» Miyav...\nRıza beyin kalbi eridi. — Lanet olası tatlı yaratık, dedi ve kalan ekmeği de sana verdi.",
          ending: "sahiplen"
        }
      ],
      fallbacks: [
        "Rıza bey şemsiyesini havaya kaldırdı. Kaçıyor musun, yoksa yalvarıyor musun?",
        "Ekmek ağzında, adam tepende. Tıslayacak mısın, kaçacak mısın?"
      ]
    }
  },

  common: [
    {
      id: "yala",
      positive: true,
      keywords: ["yala", "temizle", "kendimi", "patimi", "tuylerimi", "yalanirim", "yalaniyorum"],
      text: [
        "Patinle yüzünü yıkadın. Etraftakiler 'Ayy ne tatlı' dedi.",
        "Arka bacağını havaya kaldırıp kendini yalamaya başladın. Estetik olarak mükemmel değil ama temizlik şart."
      ],
      exhausted: {
        text: "O kadar çok yalandın ki tüy yumağı kusasın geldi. Öhö öhö. İnsanlar iğrenerek uzaklaştı.",
        goto: "staircase"
      }
    },
    {
      id: "kopek-taklidi",
      positive: true,
      keywords: ["kopek", "havla", "hav", "havlarim"],
      text: "Kedi olduğunu unutup havlamaya çalıştın.\nBoğazından garip bir 'hııık' sesi çıktı. Apartmandakiler hasta olduğunu düşünüp WhatsApp grubuna yazdılar."
    }
  ],

  fallbacks: [
    "İnsanlar seni anlamıyor. Ne yapıyorsun?",
    "Kedilerin yapabileceği şeyler sınırlı. Bir şeyleri devirmek, miyavlamak, uyumak... Ne yapacaksın?"
  ]
});

