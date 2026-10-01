window.Yasandi = window.Yasandi || {};
window.Yasandi.scenarios = window.Yasandi.scenarios || [];
window.Yasandi.scenarios.push({
  id: "yetersiz-bakiye",
  title: "Yetersiz Bakiye",

  endings: {
    atildin: { title: "Nakit Geçmiyor", tag: "ATILDIN" },
    yuruyus: { title: "Beraber Yürüdük", tag: "YÜRÜYÜŞ" },
    rezil: { title: "Rezil Oldun", tag: "REZİL" },
    dram: { title: "Fakir Dayanışması", tag: "DRAM" },
    indin: { title: "Erken İniş", tag: "KAÇIŞ" },
    gymbro: { title: "Sporcu Kardeşin Zaferi", tag: "KAYBETTİN" },
    kapi: { title: "Kapı Kapandı", tag: "FIRSAT KAÇTI" },
    baskasi: { title: "Başkası Bastı", tag: "KAYBETTİN" },
    makine: { title: "Makine Kırıldı", tag: "KARAKOL" },
    ask: { title: "Büyük Aşk", tag: "ROMANTİK" },
    reddedildi: { title: "Terslendin", tag: "ÜZÜCÜ" },
    yalanci: { title: "Yakalandın", tag: "YALANCI" },
    sofor_isyan: { title: "Şoför İsyanı", tag: "KOVULDUN" },
    kahraman: { title: "Otobüs Kahramanı", tag: "ALKIŞ" },
    cihaz_yorum: { title: "Cihaz Aşkı Buldu", tag: "CİHAZ" }
  },

  fallbacks: [
    "{crush} sana bakıyor. Bir şey diyecek misin?",
    "Şoför aynadan bakıyor: — Karar verin gençler, kalkıyoruz."
  ],

  nodes: {
    start: {
      freeze: { text: "Bakmadın bile. Ama o sana baktı. Kulağındaki şarkı bir anlığına sustu.\nKapıdaki kişi, hani şu hep hayal ettiğin. Kim o?" },
      hint: "Kim bindi? Hayalindeki kişiyi bir iki kelimeyle tarif et (örn: kız, yakışıklı çocuk, siyah saçlı kız).",
      look: "Otobüs hıncahınç dolu. Herkes yorgun, yüzler asık. Kapıda duran kişi ise buraya hiç ait değilmiş gibi parlak.",
      text:
        "Sabahın körü. Tıklım tıklım otobüste en önde, kart cihazının yanındasın. Kulağında müzik var.\n" +
        "Kapılar açıldı. Tam senin kaleminde biri bindi.\n" +
        "Hani şu hep hayal ettiğin...",
      acceptAny: [
        { text: "{input}. Evet, tam o.", save: "crush", goto: "rol-pasi" }
      ],
      fallbacks: [
        "Hani şu hep hayal ettiğin... Kim bindi?"
      ],
    },

    "rol-pasi": {
      hint: "Sana bakıyor. Kartını verecek misin?",
      look: "Otobüs kalabalık. {crush} tam önünde bekliyor. Arkanda spor çantalı, kaslı bir genç dikiliyor.",
      text:
        "Kartını okutmak için cihaza yaklaştırdı.\n" +
        "Cihaz otobüsü inleterek bağırdı: 'YETERSİZ BAKİYE'.\n" +
        "Yüzü düştü, mahcup bir şekilde bir daha okuttu: 'YETERSİZ BAKİYE'.\n" +
        "Şoför dikiz aynasından derin bir iç çekti. Sana doğru döndü:\n" +
        "— Senin kartın var mı?",
      intents: [
        {
          id: "offer-card",
          positive: true,
          keywords: ["kartimi", "kartim var", "karti uzat", "bende var", "benimkini", "okut", "kart var", "basarim", "basayim", "vereyim", "veririm", "buyrun", "ben basarim", "kullan", "evet", "var", "tabi", "tabii", "=olur", "=tamam", "tamam abi", "benimkini kullan", "ben oderim", "ben ode"],
          text: [
            "Havalı bir şekilde kartını uzattın. Teşekkür edip kartını cihaza okuttu.\n" +
            "Cihaz yankılandı: 'YETERSİZ BAKİYE'.\n" +
            "Otobüste buz gibi bir sessizlik oldu. Sana acıyarak bakıyor."
          ],
          goto: "no-balance",
        },
        {
          id: "ignore",
          keywords: ["gormezden", "duymamazliktan", "kulaklik", "muzigi", "kafami", "bakmam", "umursama", "ilgilenmiyorum", "ses cikarmiyorum", "dinlemeye", "vermiyorum", "vermem", "yardim edemem", "etmiyorum", "edemem", "etmem", "yok", "bende", "sessiz", "hayir", "hicbir", "bilmiyorum", "yapmiyorum", "yapmam", "bakmiyorum"],
          text: [
                        "Arkandaki spor çantalı kaslı genç hemen öne atıldı: — Buyrun, ben basayım.\n" +
            "{crush} ona minnetle gülümsedi. Genç numarasını veriyor, sense otobüs camından dışarı bakıyorsun.",
          ],
          ending: "gymbro",
        },
        {
          id: "sleep",
          positive: true,
          keywords: ["uyumak", "uyuyor", "uyku", "gozumu", "kapat", "kestir", "uyurum", "uyuma", "horla"],
          text:
            "Gözlerini sıkıca kapattın. Uyuyor numarası yapıyorsun.\n" +
            "Şoför 'Kardeş yolu aç!' diye bağırdı. Gözünü açtığında {crush} otobüsten inmişti bile.",
          ending: "kapi",
        },
        {
          id: "get-off",
          positive: true,
          keywords: ["inecek", "inmek", "iniyorum", "inecegim", "inerim", "inicem", "durakta in", "dugme", "musait"],
          text:
            "Panikle 'İnecek var!' diye bağırdın ve ilk açılan kapıdan kendini dışarı attın.\n" +
            "{crush} otobüste kaldı. Gideceğin yere daha yedi durak var.",
          ending: "indin",
        }
      ],
      fallbacks: [
        "{crush} bekliyor: — Kartın var mı, yok mu?",
        "Arkandaki kaslı genç sabırsızlanıyor. Kartını verecek misin?",
        "Cihaz kırmızı kırmızı yanıyor. Ne yapacaksın?"
      ],
      patience: 2,
      patienceIntent: {
        text:
          "Sen öyle donup kalınca arkandaki kaslı genç 'Kardeş müsaade et' deyip kendi kartını bastı.\n" +
          "{crush} ona dönüp kocaman gülümsedi. Senin şansın bitti.",
        ending: "gymbro",
      }
    },

    "no-balance": {
      hint: "Senin kartın da boş çıktı. Utancı nasıl kurtaracaksın?",
      look: "{crush} elinde senin boş kartınla sana bakıyor. Şoför dikiz aynasından size ters ters bakıyor.",
      intents: [
        {
          id: "hit-machine",
          positive: true,
          keywords: ["cihaza", "vurmak", "makineye", "tokatla", "bozuk bu", "tekme", "dovmek", "vururum", "tokat"],
          text: [
            "Makineye sert bir tokat attın.\nCihaz 'LÜTFEN KARTI YENİDEN OKUTUNUZ' dedi.",
            "Bu sefer yumruk attın.\nCihazın ekranı biraz daha karardı. Şoför 'Hooop!' dedi.",
            "Üçüncü kez vurmak için elini kaldırdığında şoför dikiz aynasından doğrudan ekrana, sana baktı:\n— Sen de mi izliyon, telefondan? Şunu tut diyorum, makine kırılırsa faturayı sana keserim. Hadi, kartta kaç lira var?"
          ],
          exhausted: {
            text: "Cihaza son bir Osmanlı tokadı patlattın.\nCihaz bir an sustu. Sonra neşeyle şakıdı: 'TAM BİLET'.\n{crush} sana hayranlıkla baktı. Şoför ise polisi aradı.",
            ending: "makine"
          }
        },
        {
          id: "dusur",
          positive: true,
          keywords: ["dusur", "yuvarlan", "bozuk para", "para dustu", "bozukluk dustu", "kacir", "kaydi"],
          text:
            "Şoföre uzatmak için bozuk para çıkardın ama elinden kayıp tıngır tıngır yuvarlandı.\n" +
            "Otobüsteki 40 kişi ve {crush} nefesini tutup o 1 liranın yuvarlanışını izledi.",
          ending: "rezil",
        },
        {
          id: "cash-try",
          positive: true,
          keywords: ["nakit", "para vereyim", "cuzdan", "bozukluk", "param", "parayla", "bende para"],
          text:
            "Hemen cüzdana davrandın. Şoför bağırdı:\n— Nakit geçmiyor kardeşim, kaç kere söyleyeceğim!\nSizi ikinizi de indirdi.",
          ending: "atildin",
        },
        {
          id: "hug",
          positive: true,
          keywords: ["saril", "agla", "kader", "fakirlik", "biz de", "teselli"],
          text:
            "{crush} ile göz göze geldiniz. İkinizin de kartında para yok.\n" +
            "Gözleriniz doldu. 'Zor hayatlar' diyerek sarıldınız. Şoför bile duygulanıp 'Geçin arkaya' dedi.",
          ending: "dram",
        },
        {
          id: "run-away",
          positive: true,
          keywords: ["inmek", "inecek", "kaci", "kaca", "kacm", "kact", "kac lan", "kapi", "disari", "iniyorum", "uzaklas", "yuru"],
          text:
            "Utançtan yerin dibine girdin. İlk açılan kapıdan fırlayıp kendini sokağa attın.\n{crush} da peşinden indi. 'Benim yüzümden oldu' dedi. Beraber yürüyorsunuz.",
          ending: "yuruyus",
        },
        {
          id: "apologize",
          keywords: ["kusura", "ozur", "pardon", "yanlislik", "affedersin"],
          text:
            "{crush} gülümsedi: — Önemli değil ya, olur öyle.\n" +
            "Tam o sırada şoför dikiz aynasından size ters ters baktı:\n" +
            "— Para ödemiyorsunuz bari muhabbet etmeyin. Arkaya ilerle bakayım.",
          goto: "driver-interrogation",
        },
        {
          id: "ignore",
          keywords: ["gormezden", "duymamazliktan", "kulaklik", "muzigi", "kafami", "bakmam", "umursama", "ilgilenmiyorum", "ses cikarmiyorum", "dinlemeye", "vermiyorum", "vermem", "yardim edemem", "etmiyorum", "edemem", "etmem", "yok", "bende yok", "sessiz", "hayir", "hicbir", "bilmiyorum", "yapmiyorum", "yapmam"],
          text: [
                        "Şoför 'İn o zaman!' dedi ve seni indirdi.",
          ],
          ending: "atildin"
        }
      ],
      fallbacks: [
        "Cihaz kırmızı ışıkla sana bakıyor. Bir şey yapacak mısın?",
        "{crush} boş kartı sana geri uzattı. Alacak mısın?",
        "Şoför 'Eee, ne yapıyoruz gençler?' dedi. Ne diyeceksin?",
      ],
      patience: 3,
      patienceIntent: {
        text:
          "Sen şokta beklerken arka koltuktan bir amca kalktı.\n" +
          "— Verin şunu, dedi. Kendi kartını okuttu: 'TAM BİLET'.\n" +
          "Sonra size dönüp: 'İşe yaramaz âşıklar,' diye mırıldandı.",
        ending: "baskasi",
      }
    },

    "driver-interrogation": {
      hint: "Şoför sana bakıyor. {crush} de.",
      look: "Şoför dikiz aynasından sizi kesiyor. {crush} mahcup. Arkadakiler 'Hadi ilerleyin' diye mırıldanıyor.",
      intents: [
        {
          id: "ilerle",
          positive: true,
          keywords: ["ilerle", "arkaya", "gec", "yuru", "kabul", "tamam", "ozur", "kusura", "pardon", "haklisin", "peki"],
          text:
            "Kafanızı eğip arkaya ilerlediniz. Sıkışık bir köşede yan yana durdunuz.\n" +
            "— Çok utandım ya. Benim adım bu arada...\nAdını söyledi ama cihaz yine 'YETERSİZ BAKİYE' diye bağırdı. Duyamadın.\n— Senin adın ne?",
          goto: "name-exchange"
        },
        {
          id: "karsilik_ver",
          positive: true,
          keywords: ["karsilik", "cevap ver", "bagir", "insanligimizi", "paramiz", "sanane", "sana ne", "sana mi soracagiz", "kizan"],
          text:
            "Şoföre döndün. Sesin titremedi.\n" +
            "Arkadan bir teyze destek verdi: — Doğru söylüyo! Bakiye yok diye insanlık da mı yok?\n" +
            "Otobüs alkışlamaya başladı. Şoför kulaklarına kadar kızardı. O hâlâ sana bakıyor.",
          ending: "kahraman"
        },
        {
          id: "cihaz",
          positive: true,
          keywords: ["cihaza", "makineye", "tekme", "yumruk", "cihaza vur"],
          text:
            "Cihaza bir tane patlattın. Cihaz bir an karardı, sonra ekranda yazı belirdi: 'İKİ KALP BİR OLUNCA BAKİYE GEREKMEZ'.\nŞoför bile bir şey diyemedi.",
          ending: "cihaz_yorum"
        }
      ],
      freeze: {
        text: "Öylece durup şoföre baktın. Şoför arka kapıyı açtı.\n— İnin lan arabamdan! İkiniz de!",
        ending: "sofor_isyan"
      },
      fallbacks: [
        "Şoför 'İlerlesene kardeşim' diye bağırdı. Ne yapacaksın?",
        "{crush} sana bakıyor. Bir şey diyecek misin?"
      ]
    },

    "name-exchange": {
      hint: "Adını söyle. Dürüst olabilir veya havalı bir isim uydurabilirsin.",
      look: "Otobüs ilerliyor. {crush} ilgiyle senin cevabını bekliyor.",
      freeze: { text: "Sessiz kaldın. {crush} garipseyip önüne döndü. Bir daha hiç konuşmadınız.", ending: "reddedildi" },
      acceptAny: [
        { text: "— {input} {mi}? Ne güzel. Ben son durağa gidiyorum, sen nerede iniyorsun?", save: "name", goto: "stop-exchange" }
      ],
      fallbacks: [
        "— İsmin ne, diyordum?"
      ]
    },

    "stop-exchange": {
      hint: "Nerede indiğini söyle. (Örn: merkezde, son durakta, şurada)",
      look: "{crush} gülümsüyor. Artık her şey senin elinde.",
      freeze: { text: "Yine sessiz kaldın. {crush} senden sıkılıp kulaklığını taktı.", ending: "reddedildi" },
      acceptAny: [
        { text: "— {input} {mi}? Oradan bu otobüs geçmiyor ki {name}.\nŞüpheyle baktı. Yalanın ortaya çıktı. Cihaz bile sustu.", ending: "yalanci" },
        { text: "— {input} {mi}? Tesadüfe bak, ben de oraya kadar gidiyorum!\nBütün otobüs bedava aşk filmi izliyor. Cihaz bu sefer 'İYİ YOLCULUKLAR' dedi.", ending: "ask" }
      ],
      fallbacks: [
        "— Nerede iniyorsun, dedin?",
        "Cevap verecek misin?"
      ]
    }
  }
});
