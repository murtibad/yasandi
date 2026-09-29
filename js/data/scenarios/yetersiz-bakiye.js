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
    yalanci: { title: "Yakalandın", tag: "YALANCI" }
  },

  fallbacks: [
    "Ne yapacağını bilemedin.",
    "Böyle boş boş duracak mısın?"
  ],

  nodes: {
    start: {
      hint: "Kim bindi? Hayalindeki kişiyi bir iki kelimeyle tarif et (örn: kız, yakışıklı çocuk, siyah saçlı kız).",
      look: "Otobüs hıncahınç dolu. Herkes yorgun, yüzler asık. Kapıda duran kişi ise buraya hiç ait değilmiş gibi parlak.",
      text:
        "Sabahın körü. Tıklım tıklım otobüste en önde, kart cihazının yanındasın. Kulağında müzik var.\n" +
        "Kapılar açıldı ve Hani şu hep hayal ettiğin...",
      acceptAny: [
        { text: "{input}. Evet, tam o.", goto: "rol-pasi" }
      ],
      fallbacks: [
        "Kim olduğunu tarif et."
      ],
      goto: "rol-pasi",
    },

    "rol-pasi": {
      hint: "Sana bakıyor. Kartını verecek misin?",
      look: "Otobüs kalabalık. {input} tam önünde bekliyor. Arkanda spor çantalı, kaslı bir genç dikiliyor.",
      text:
        "{input} kartını okutmak için cihaza yaklaştırdı.\n" +
        "Cihaz otobüsü inleterek bağırdı: 'YETERSİZ BAKİYE'.\n" +
        "Yüzü düştü, mahcup bir şekilde bir daha okuttu: 'YETERSİZ BAKİYE'.\n" +
        "Şoför dikiz aynasından derin bir iç çekti. {input} sana doğru döndü:\n" +
        "— Senin kartın var mı?",
      intents: [
        {
          id: "offer-card",
          positive: true,
          keywords: ["kartimi", "kartim var", "karti uzat", "bende var", "benimkini", "okut", "kart var", "basarim", "basayim", "vereyim", "veririm", "buyrun", "ben basarim", "kullan", "evet", "var"],
          text: [
            "Havalı bir şekilde kartını uzattın. {input} teşekkür edip kartını cihaza okuttu.\n" +
            "Cihaz yankılandı: 'YETERSİZ BAKİYE'.\n" +
            "Otobüste buz gibi bir sessizlik oldu. {input} sana acıyarak bakıyor."
          ],
          goto: "no-balance",
        },
        {
          id: "ignore",
          keywords: ["gormezden", "duymamazliktan", "kulaklik", "muzigi", "kafami", "bakmam", "umursama", "ilgilenmiyorum", "ses cikarmiyorum", "dinlemeye", "vermiyorum", "vermem", "yardim edemem", "etmiyorum", "edemem", "etmem", "yok", "bende", "sessiz", "hayir", "hicbir", "bilmiyorum", "yapmiyorum", "yapmam"],
          text: [
            "» Yok, dedin soğukça.\n" +
            "Arkandaki spor çantalı kaslı genç hemen öne atıldı: — Buyrun, ben basayım.\n" +
            "{input} ona minnetle gülümsedi. Genç numarasını veriyor, sense otobüs camından dışarı bakıyorsun.",
          ],
          ending: "gymbro",
        },
        {
          id: "sleep",
          positive: true,
          keywords: ["uyumak", "uyuyor", "uyku", "gozumu", "kapat", "kestir", "uyurum", "uyuma", "horla"],
          text:
            "Gözlerini sıkıca kapattın. Uyuyor numarası yapıyorsun.\n" +
            "Şoför 'Kardeş yolu aç!' diye bağırdı. Gözünü açtığında {input} otobüsten inmişti bile.",
          ending: "kapi",
        },
        {
          id: "get-off",
          positive: true,
          keywords: ["inecek", "inmek", "iniyorum", "inecegim", "inerim", "inicem", "kapi", "durak", "dugme", "basarim", "musait", "kaptan"],
          text:
            "Panikle 'İnecek var!' diye bağırdın ve ilk açılan kapıdan kendini dışarı attın.\n" +
            "{input} otobüste kaldı. Gideceğin yere daha yedi durak var.",
          ending: "indin",
        }
      ],
      fallbacks: [
        "{input} bekliyor: — Kartın var mı, yok mu?",
        "Arkandaki kaslı genç sabırsızlanıyor. Kartını verecek misin?",
        "Cihaz kırmızı kırmızı yanıyor. Ne yapacaksın?"
      ],
      patience: 2,
      patienceIntent: {
        text:
          "Sen öyle donup kalınca arkandaki kaslı genç 'Kardeş müsaade et' deyip kendi kartını bastı.\n" +
          "{input} ona dönüp kocaman gülümsedi. Senin şansın bitti.",
        ending: "gymbro",
      }
    },

    "no-balance": {
      hint: "Senin kartın da boş çıktı. Utancı nasıl kurtaracaksın?",
      look: "{input} elinde senin boş kartınla sana bakıyor. Şoför dikiz aynasından size ters ters bakıyor.",
      intents: [
        {
          id: "hit-machine",
          positive: true,
          keywords: ["cihaza", "vurmak", "makineye", "tokatla", "bozuk bu", "tekme", "dovmek", "vururum", "tokat"],
          text: [
            "» Cihaz bozuk galiba, diyerek makineye sert bir tokat attın.\nCihaz 'LÜTFEN KARTI YENİDEN OKUTUNUZ' dedi.",
            "Bu sefer yumruk attın.\nCihazın ekranı biraz daha karardı. Şoför 'Hooop!' dedi."
          ],
          exhausted: {
            text: "Cihaza son bir Osmanlı tokadı patlattın.\nCihaz bir an sustu. Sonra neşeyle şakıdı: 'TAM BİLET'.\n{input} sana hayranlıkla baktı. Şoför ise polisi aradı.",
            ending: "makine"
          }
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
          id: "dusur",
          positive: true,
          keywords: ["dusur", "yuvarlan", "bozuk para", "para dustu", "bozukluk dustu", "kacir", "kaydi"],
          text:
            "Şoföre uzatmak için bozuk para çıkardın ama elinden kayıp tıngır tıngır yuvarlandı.\n" +
            "Otobüsteki 40 kişi ve {input} nefesini tutup o 1 liranın yuvarlanışını izledi.",
          ending: "rezil",
        },
        {
          id: "hug",
          positive: true,
          keywords: ["saril", "agla", "kader", "fakirlik", "biz de", "teselli"],
          text:
            "{input} ile göz göze geldiniz. İkinizin de kartında para yok.\n" +
            "Gözleriniz doldu. 'Zor hayatlar' diyerek sarıldınız. Şoför bile duygulanıp 'Geçin arkaya' dedi.",
          ending: "dram",
        },
        {
          id: "run-away",
          positive: true,
          keywords: ["inmek", "inecek", "kac", "kapi", "disari", "iniyorum", "uzaklas", "yuru"],
          text:
            "Utançtan yerin dibine girdin. İlk açılan kapıdan fırlayıp kendini sokağa attın.\n{input} da peşinden indi. 'Benim yüzümden oldu' dedi. Beraber yürüyorsunuz.",
          ending: "yuruyus",
        },
        {
          id: "apologize",
          keywords: ["kusura", "ozur", "pardon", "yanlislik", "affedersin"],
          text:
            "» Kusura bakma, içinde var sanıyordum...\n" +
            "{input} gülümsedi: — Önemli değil ya, olur öyle. Benim adım da...",
          acceptAny: [
            { text: "— {input}, dedi. Memnun oldum. Seninki ne?", goto: "name-exchange" }
          ],
          goto: "name-exchange",
        },
        {
          id: "ignore",
          keywords: ["gormezden", "duymamazliktan", "kulaklik", "muzigi", "kafami", "bakmam", "umursama", "ilgilenmiyorum", "ses cikarmiyorum", "dinlemeye", "vermiyorum", "vermem", "yardim edemem", "etmiyorum", "edemem", "etmem", "yok", "bende yok", "sessiz", "hayir", "hicbir", "bilmiyorum", "yapmiyorum", "yapmam"],
          text: [
            "» Yok, dedin soğukça.\n" +
            "Şoför 'İn o zaman!' dedi ve seni indirdi.",
          ],
          ending: "atildin"
        }
      ],
      fallbacks: [
        "Cihaz kırmızı ışıkla sana bakıyor. Bir şey yapacak mısın?",
        "{input} boş kartı sana geri uzattı. Alacak mısın?",
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

    "name-exchange": {
      hint: "Adını söyle. Dürüst olabilir veya havalı bir isim uydurabilirsin.",
      look: "Otobüs ilerliyor. {input} ilgiyle senin cevabını bekliyor.",
      intents: [
        {
          id: "sessiz",
          keywords: ["sus", "konusma", "sessiz", "soylemem", "hayir", "hicbir", "bilmiyorum", "yapmiyorum", "yapmam"],
          text: "Sessiz kaldın. {input} garipseyip önüne döndü. Bir daha hiç konuşmadınız.",
          ending: "reddedildi"
        }
      ],
      acceptAny: [
        { text: "» {input}\n— Ne güzel isim, dedi. Ben son durağa gidiyorum, sen nerede iniyorsun?", goto: "stop-exchange" }
      ],
      fallbacks: [
        "— İsmin ne, diyordum?",
        "Sana adını sordu."
      ],
      goto: "stop-exchange"
    },

    "stop-exchange": {
      hint: "Nerede indiğini söyle. (Örn: merkezde, son durakta, şurada)",
      look: "{input} gülümsüyor. Artık her şey senin elinde.",
      intents: [
        {
          id: "sessiz",
          keywords: ["sus", "sessiz", "bilmiyorum", "soylemem", "hayir", "hicbir", "yapmiyorum", "yapmam"],
          text: "Yine sessiz kaldın. {input} senden sıkılıp kulaklığını taktı.",
          ending: "reddedildi"
        }
      ],
      acceptAny: [
        { text: "» {input}\n— Oradan otobüs geçmiyor ki? diyip sana şüpheyle baktı.\nYalanın ortaya çıktı.", ending: "yalanci" },
        { text: "» {input}\n— Tesadüfe bak, ben de oraya kadar gidiyorum! dedi.\nBütün otobüs bedava aşk filmi izliyor.", ending: "ask" }
      ],
      exhausted: {
        text: "Artık ineceğin durak kalmadı. {input} seninle evlenmeye karar verdi.",
        ending: "ask"
      },
      fallbacks: [
        "— Nerede iniyorsun, dedin?",
        "Cevap verecek misin?"
      ]
    }
  }
});
