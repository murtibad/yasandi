window.Yasandi = window.Yasandi || {};
window.Yasandi.scenarios = window.Yasandi.scenarios || [];
window.Yasandi.scenarios.push({
  id: "terk-edilmis-koy",
  title: "Niyetimiz Çalıp Çırpmak Değil",

  endings: {
    "karsi-selam": { title: "Aleykümselam", tag: "FİRAR" },
    "kangal": { title: "Kangal Kurtarışı", tag: "KAYBOLDUN" },
    "goat": { title: "Köyün Keçisi", tag: "MEEE" },
    "viral-scream": { title: "Korkak Arkadaş", tag: "VİRAL" },
    "lens-cap": { title: "Kapak Kapalı", tag: "SİYAH EKRAN" },
    "fener-bitti": { title: "Karanlıkta Kaldınız", tag: "PİL BİTTİ" },
    "views-47": { title: "Sıkıcı Video", tag: "47 İZLENME" },
    "kavga": { title: "Ekip İçi Çatışma", tag: "KAVGA" },
    "cin-phone": { title: "Cinlerin Frekansı", tag: "TELEFON ÇALDI" },
    "amca-sopali": { title: "Kovuldunuz", tag: "SOPA YEDİN" },
    "cay-videosu": { title: "Çay Saati", tag: "ÇAY VLOGU" },
    "camdan-atlayis": { title: "Tuncay'ın Kaçışı", tag: "FİRAR" },
    "tuncay-alarm": { title: "Tuncay'ın Alarmı", tag: "FİYASKO" },
    "tripod-attack": { title: "Muhtara Tripod", tag: "KARAKOL" },
    "sponsor": { title: "Araya Reklam Aldı", tag: "SPONSORLU" },
    "ruzgar": { title: "Rüzgarın Sesi", tag: "KORKAKTINIZ" },
    "ruined-equipment": { title: "Kamera Kırıldı", tag: "MASRAF" },
    "annem": { title: "Zıbar Yat", tag: "EVE DÖNDÜN" }
  },

  nodes: {
    start: {
      hint: "Köy evine girmek üzeresiniz. Tuncay bir ritüel yapıyor, sen ne yapacaksın?",
      look: "Gece zifiri karanlık. Sadece Tuncay'ın elindeki fenerin sarı ışığı var. Eski kerpiç evin ahşap kapısı aralık, içerisi tamamen siyah.",
      text:
        "Gece, terk edilmiş bir dağ köyü. Arkadaşın Tuncay kamerayı açtı, fenerin pili yarım. Kanalın 312 abonesi var.\n" +
        "Tuncay ilk eve girmeden önce kapıya dönüp fısıldıyor:\n" +
        "— Selamünaleyküm. Niyetimiz çalıp çırpmak değil, döküp kırmak değil. Sadece çekim yapıp gideceğiz.",
      intents: [
        {
          id: "selam-ver",
          positive: true,
          keywords: ["selam", "aleykum", "biz de", "merhaba", "aleykumselam", "selamun"],
          text:
            "Tuncay sana onaylar gibi baktı.\n— Adabı bilen adamsın, dedi. Sayın seyirciler, izin alındı.\nKapıyı gıcırdatarak açtınız.",
          goto: "dark-room",
        },
        {
          id: "gir-direkt",
          positive: true,
          keywords: ["gir", "girelim", "iceri", "kapiyi", "dal", "hadi gir", "ilerle"],
          text:
            "Selam vermeden içeri daldın. Arkandan kapı kendi kendine çarptı.\n" +
            "— Abi destursuz daldın, çarpılacağız! dedi Tuncay.\n" +
            "İçeriden TAK TUK diye bir ses geldi.",
          goto: "dark-room",
        },
        {
          id: "kac",
          positive: true,
          keywords: ["kac", "kacalim", "git", "gidelim", "donelim", "korktum"],
          text:
            "Arkanı dönüp karanlığa doğru koşmaya başladın.\n" +
            "Tuncay arkandan 'Abi nereye, kayıttayız!' diye bağırdı ama sen çoktan ormanda kaybolmuştun.\n" +
            "Sabaha karşı seni bir çoban köpeği buldu.",
          ending: "kangal",
        },
        {
          id: "dua",
          positive: true,
          keywords: ["dua", "besmele", "bismillah", "ayetel"],
          text:
            "Besmele çekip dualar okuyarak içeri adım attın.\n" +
            "Tuncay kameraya dönüp: — Arkadaşım inançlıdır sayın seyirciler, dualarla korunuyor, dedi.\n" +
            "Aniden TAK TUK diye bir ses geldi.",
          goto: "dark-room",
        },
        {
          id: "kamera-kapat",
          positive: true,
          keywords: ["kapat", "kamerayi", "cekme", "kaydi", "sonlandir"],
          text:
            "Tuncay oflayarak kamerayı kapattı. Bütün gece sessiz sessiz gezip döndünüz.\n" +
            "Videonun yarısı kesik olduğu için sadece 47 izlenme aldı.",
          ending: "views-47",
        },
        {
          id: "laf-sok",
          positive: true,
          keywords: ["sacmalama", "abartma", "ne diyorsun", "yalan", "kurgu", "tiyatro", "oyunculuk"],
          text:
            "Tuncay sinirlendi: — Abi prodüksiyon yapıyoruz şurda, niye bozuyorsun!\n" +
            "Kavga etmeye başladınız. Video Youtube'a 'Hayalet ararken arkadaşımla birbirimize girdik' diye yüklendi.",
          ending: "kavga",
        }
      ],
      fallbacks: [
        "Tuncay kapıda bekliyor, sen ne diyorsun?",
        "Rüzgar esiyor, Tuncay kamerayla yüzüne bakıyor. Bir şey yap.",
        "İçerisi çok karanlık. Girecek misin, kaçacak mısın?"
      ],
      patience: 3,
      patienceIntent: {
        text:
          "Sen öylece durunca Tuncay kameraya döndü:\n" +
          "— Arkadaşımın şu an nutku tutuldu sayın seyirciler. Boyuttan boyuta geçiyor!\n" +
          "Oysa sadece ne yapacağını bilemedin. Tuncay seni kolundan tutup içeri çekti.\n" +
          "TAK TUK diye bir ses geldi.",
        goto: "dark-room",
      }
    },

    "dark-room": {
      hint: "İçeriden ses geldi. Tuncay cin zannediyor, bir tepki ver.",
      look: "Eski bir köy odası. Yerde çürümüş tahtalar, köşede kırık bir testi var. Fenerin ışığı toz zerrelerini aydınlatıyor.",
      text:
        "İçeri girdiniz. Tuncay feneri etrafta gezdirirken heyecanla fısıldadı:\n" +
        "— Duydun mu? Bir tıkırtı var! Sayın seyirciler, kayıtta var!\n" +
        "Sana döndü: — Kesin buradalar abi, hissediyorum.",
      intents: [
        {
          id: "kim-var",
          positive: true,
          keywords: ["kim var", "kim o", "kimse var", "ses ver", "cik ortaya", "kimsin"],
          text: [
            "Sesin karanlıkta yankılandı. Tıkırtı kesildi. Ardından 'Meeeee' diye bir ses yankılandı.\nAhırdan kaçan köyün keçisiymiş.",
            "Yine 'Meeeee' sesi geldi. Tuncay kameraya dönüp: — Cinler keçi kılığına girdi sayın seyirciler! dedi."
          ],
          ending: "goat",
        },
        {
          id: "kac-dark",
          positive: true,
          keywords: ["kac", "kacalim", "git", "gidelim", "korktum", "kaciyorum"],
          text:
            "Panikle çığlık atıp kaçtın. Tuncay da peşinden koşarken düştü.\n" +
            "Video internete sızdı: 'Cin gören fenomenin arkadaşı böyle kaçtı'. Viral oldun.",
          ending: "viral-scream",
        },
        {
          id: "bagir",
          positive: true,
          keywords: ["bagir", "ciglik", "aaaa", "imdat", "yardim", "kork", "korkuyorum"],
          text:
            "Çığlığın odada yankılandı.\n" +
            "Tuncay 'İşte paranormal bir frekans!' dedi.\n" +
            "Eve gidip izlediklerinde fark ettiler ki Tuncay bütün gece kameranın kapağını açmayı unutmuş.",
          ending: "lens-cap",
        },
        {
          id: "fener-tut",
          positive: true,
          keywords: ["fener", "feneri", "isik", "tut", "oraya", "aydinlat", "goster"],
          text:
            "Tuncay feneri tam köşeye çevirdiği an ışık 'pıt' diye söndü. Pil bitti.\n" +
            "Zifiri karanlıkta birbirinize sarılıp sabahı beklediniz.",
          ending: "fener-bitti",
        },
        {
          id: "ilerle",
          positive: true,
          keywords: ["ilerle", "devam", "yuru", "odaya", "korkma", "bisi yok", "bir sey yok", "kedi"],
          text:
            "— Fare falandır, dedi Tuncay, ama sesi titriyordu.\n" +
            "Parmaklarınızın ucuna basarak ilerlediniz.",
          goto: "shadow-room",
        },
        {
          id: "telefon",
          positive: true,
          keywords: ["telefon", "telefonu", "arayayim", "flas", "flash", "isigini"],
          text:
            "Kendi telefonunun ışığını açmak için cebine davrandın.\n" +
            "O an annen aradı. Telefon bas bas bağırmaya başladı.\n" +
            "Tuncay 'Cinler frekansa girdi!' diye bağırıp bayıldı.",
          ending: "cin-phone",
        },
        {
          id: "dusur",
          positive: true,
          keywords: ["dusur", "kamerayi at", "kamerayi kir", "firlat", "yere cal"],
          text:
            "Korkudan elindeki kamerayı yere fırlattın.\n" +
            "Kamera paramparça oldu. Tuncay çığlık attı: — 10.000 TL masraf çıkardın abi!",
          ending: "ruined-equipment",
        }
      ],
      fallbacks: [
        "Tuncay titreyerek kamerayı sana çevirdi. Ne yapacaksın?",
        "Tıkırtı tekrar duyuldu. Ses çıkaracak mısın?",
        "Karanlıkta nefes alışverişiniz duyuluyor. Bir hamle yap."
      ],
      patience: 3,
      patienceIntent: {
        text:
          "Sen sessiz kalınca Tuncay 'Enerji çok yoğun, arka odaya geçelim' diyerek seni sürükledi.",
        goto: "shadow-room",
      }
    },

    "shadow-room": {
      hint: "Karanlıktaki ses kim olduğunu soruyor. Kendini tanıt, yalan söyle ya da tepki ver.",
      look: "Odanın duvarında devasa bir gölge var. Camı kırık pencereden rüzgar esiyor. Tuncay arkana saklanmış durumda.",
      text:
        "Arka odaya geçtiniz. Tuncay kamerayı duvardaki uzun bir gölgeye odakladı.\n" +
        "— Sayın seyirciler, şu an eksi on derecedeyiz, nefesim buharlaşıyor, dedi.\n" +
        "(Hava Temmuz ayıydı). Bir anda köşeden kalın, boğuk bir ses duyuldu:\n" +
        "— Kimsin sen?",
      intents: [
        {
          id: "sus",
          keywords: ["sus", "sessiz", "cevap vermiyorum", "cevap vermem", "konusmuyorum", "bekle", "dinle"],
          text:
            "Sesini çıkarmayıp bekledin.\n" +
            "O gergin sessizlikte aniden 'Dıııt dıııt' diye bir ses koptu.\n" +
            "Tuncay utana sıkıla: — Abi benim alarm, sabah servise yetişicem. Tüh, korkuyu bozduk.",
          ending: "tuncay-alarm",
        },
        {
          id: "kac-ruzgar",
          positive: true,
          keywords: ["kac", "git", "kacalim", "cik", "kapiya", "kaciyorum"],
          text:
            "Kaç Tuncay! diye bağırıp kapıya koştun.\n" +
            "Arkanızdan sadece kırık camdan içeri giren rüzgarın uğultusu geliyordu.\n" +
            "Ama siz bunu 'Cinlerin çığlığı' diye videoya koydunuz.",
          ending: "ruzgar",
        },
        {
          id: "tripod",
          positive: true,
          keywords: ["vur", "saldir", "tripod", "dov", "sopayla"],
          text:
            "Eline geçen tripodu karanlıktaki gölgeye var gücünle indirdin.\n" +
            "— Ah kafam! diye bağırdı ses.\n" +
            "Meğer köyün muhtarı içeride kaçak define arıyormuş. Geceyi karakolda geçirdiniz.",
          ending: "tripod-attack",
        },
        {
          id: "telefon-cal",
          positive: true,
          keywords: ["telefon", "arama", "alo", "polis"],
          text:
            "Polisi aramak için telefonu çıkardın.\n" +
            "Tuncay kameraya dönüp: — İşte sayın seyirciler, bu gerilim anında araya kısa bir reklam alıyoruz. Klan Savaşları, şimdi indirin, ilk 100 kişiye 500 elmas...\n" +
            "Cinler bile bu sponsorluğa şaşırıp mekanı terk etti.",
          ending: "sponsor",
        }
      ],
      acceptAny: [
        {
          text:
            "— {input} {mi}? Burası {input}'lara yasak!\n" +
            "Karanlıktan elinde sopayla bir amca çıktı. Sizi köyün sonuna kadar kovaladı.",
          ending: "amca-sopali",
        },
        {
          text:
            "— {input} ha... Biz de buralıyız evladım.\n" +
            "Işık açıldı. Eski koltukta oturan bir teyze. 'Geçin çay koydum' dedi.\n" +
            "Paranormal kanalınız o gece çay ve sohbet vlog'una döndü.",
          ending: "cay-videosu",
        },
        {
          text:
            "— {input}...\n" +
            "Ses duvarda yankılandı. Tuncay 'Cinler ismimizi biliyor!' diye çığlık atıp camdan dışarı atladı.\n" +
            "Seni odada yalnız bıraktı.",
          ending: "camdan-atlayis",
        }
      ],
      fallbacks: [
        "Ses tekrar etti: 'Kimin inindesiniz?' Cevap verecek misin?",
        "Tuncay altına kaçırmak üzere. Bir şey de!",
        "Gölge yavaş yavaş size doğru yaklaşıyor. Ne yapacaksın?"
      ],
      patience: 3,
      patienceIntent: {
        text:
          "İkiniz de kaskatı kesildiniz.\n" +
          "Gölge elindeki feneri yaktı. Köyün bekçisiymiş.\n" +
          "— Ne arıyonuz lan burda gece gece! deyip sizi yaka paça dışarı attı.",
        ending: "amca-sopali",
      }
    }
  },

  common: [
    {
      id: "selam-inside",
      positive: true,
      keywords: ["selam", "aleykum", "selamun", "merhaba"],
      text:
        "Karanlığa doğru bir selam verdin.\n" +
        "Bir süre hiçbir şey olmadı. Sonra dibinden, kalın ve tok bir ses geldi:\n" +
        "— Aleykümselam gençler.\n" +
        "Tuncay'la göz göze geldiniz. Kamerayı bırakıp ters yönlere koştunuz. Kamera hâlâ kayıtta.",
      ending: "karsi-selam",
    },
    {
      id: "gulme",
      positive: true,
      keywords: ["gul", "guluyorum", "kahkaha", "komik", "guldum", "guler", "haha"],
      text: [
        "Kendini tutamayıp kıkırdadın.\nTuncay sinirle fısıldadı: — Abi gülme, ambiyansı bozuyorsun!",
        "Kahkaha attın.\nTuncay kameraya döndü: — Cinler arkadaşımın aklıyla oynuyor, sinir krizi geçiriyor sayın seyirciler!",
      ]
    }
  ],

  overrides: {
    police: {
      text:
        "155'i aradın.\n— 155, buyrun.\nMemur bey evde cin var!\n" +
        "— Kardeşim adres verin, biz de hocayla geliyoruz.\nTuncay kameraya fısıldadı: — Hoca geliyor sayın seyirciler, abone olmayı unutmayın.",
    },
    mom: {
      text:
        "Anneni aradın.\nAnne terk edilmiş köydeyiz, garip sesler var.\n" +
        "— Zıbar yat saat kaç oldu! Cinler de uyusun, rahatsız etme milleti!\n" +
        "Annenden cinlerden daha çok korkup eve döndünüz.",
      ending: "annem",
    }
  },

  fallbacks: [
    "Tuncay sana boş boş bakıyor. Bir şey yapacak mısın?",
    "Rüzgarın sesi artıyor. Tuncay kamerasını sana doğrulttu.",
    "Karanlıkta beklersen bir şeyler seni bulabilir. Karar ver."
  ],
  patience: 6,
  patienceIntent: {
    text:
      "Sen hiçbir şey yapmayınca Tuncay'ın canı sıkıldı.\n" +
      "— Abi senle de içerik çıkmıyor, yürü eve gidiyoruz.\n" +
      "Videoyu sildi, kanalını da kapattı.",
    ending: "views-47",
  }
});
