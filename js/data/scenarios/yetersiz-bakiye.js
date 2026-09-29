window.Yasandi = window.Yasandi || {};
window.Yasandi.scenarios = window.Yasandi.scenarios || [];
window.Yasandi.scenarios.push({
  id: "yetersiz-bakiye",
  title: "Yetersiz Bakiye",

  endings: {
    zarar: { title: "Tam Bilet Kesildi", tag: "ZARAR" },
    uzuldun: { title: "Aktarma Yandı", tag: "ÜZÜLDÜN" },
    atildin: { title: "Nakit Geçmiyor", tag: "ATILDIN" },
    mutlu: { title: "Şoför Jesti", tag: "MUTLU SON" },
    yuruyus: { title: "Beraber Yürüdük", tag: "YÜRÜYÜŞ" },
    hasta: { title: "Hastalıklı", tag: "İNDİRİLDİN" },
    rezil: { title: "Rezil Oldun", tag: "REZİL" },
    nostalji: { title: "Delikli Bilet", tag: "NOSTALJİ" },
    viral: { title: "Cimri Genç", tag: "VİRAL" },
    rehine: { title: "Otobüs Rehin", tag: "REHİNE" },
    dram: { title: "Fakir Dayanışması", tag: "DRAM" },
    kurtuldun: { title: "Doldur Gel", tag: "KURTULDUN" },
    uyudun: { title: "Sağır Sultan", tag: "UYUDUN" },
    karakol: { title: "Son Durak: Karakol", tag: "ALINDIN" },
    levye: { title: "Levyeli Şoför", tag: "İNDİRİLDİN" },
    remix: { title: "Yetersiz Bakiye Remix", tag: "VİRAL" },
    taksi: { title: "Taksi Parası", tag: "ZARAR" },
    kargasa: { title: "Kargaşa Fırsatı", tag: "KARGAŞA" },
    ucretsiz: { title: "Ücretsiz Geçiş", tag: "KAHRAMAN" },
    ortak: { title: "Ortak Kulaklık", tag: "KURTULDUN" },
    muzikci: { title: "Müzik Zevki", tag: "İNDİRİLDİN" },
    kacis: { title: "Erken İniş", tag: "KAÇIŞ" },
    kahraman: { title: "Makine Fatihi", tag: "KAHRAMAN" },
    dondu: { title: "Sistem Çöktü", tag: "BEKLEYİŞ" },
    linc: { title: "Amcaya Saygı", tag: "LİNÇ" },
    atlayan: { title: "Yanlış Hedef", tag: "KAÇIŞ" },
    sarj: { title: "Şarj Bitti", tag: "KARANLIK" },
    kural: { title: "Kurallar Kuruldur", tag: "İNADINA" }
  },

  nodes: {
    start: {
      hint: "Kadın hâlâ sana bakıyor. Yardım etmek de bir seçenek, etmemek de. İkisinin de bir bedeli var.",
      look: "Otobüs koridoru daracık. Şoför dikiz aynasından size bakıyor, elini direksiyona vuruyor. Yanda liseli bir çocuk telefonla meşgul. Kadın hemen önünde, cihaz kırmızı kırmızı yanıp sönüyor.",
      text:
        "Sabahın körü. Tıklım tıklım bir otobüs, en önde ayaktasın. Kulağında müzik çalıyor.\n" +
        "Güleryüzlü, orta yaşlı bir kadın otobüse bindi. Kartını okutmak için cihaza yaklaştırdı.\n" +
        "Cihaz otobüsü inleterek bağırdı: 'YETERSİZ BAKİYE'.\n" +
        "Kadın mahcup bir şekilde bir daha okuttu: 'YETERSİZ BAKİYE'.\n" +
        "Şoför dikiz aynasından derin bir iç çekti. Kadın çaresizce yolculara döndü:\n" +
        "— Fazladan kartı olan var mı acaba?",
      intents: [
        {
          id: "offer-card",
          positive: true,
          keywords: ["kartimi", "kartim var", "karti uzat", "bende var", "benimkini", "okut", "kart var", "basarim", "basayim", "vereyim", "veririm", "buyrun", "ben basarim", "kullan"],
          text: [
            "Kartını uzattın. Kadın teşekkür edip kartını cihaza okuttu.\n" +
            "Cihaz yankılandı: 'YETERSİZ BAKİYE'.\n" +
            "Otobüste buz gibi bir sessizlik oldu. Kadın sana acıyarak bakıyor.",
            "Yine uzattın kartı. Kadın tereddütle bastı: 'YETERSİZ BAKİYE'.\n" +
            "Şoför güldü: — Kendi kartında yok, millete hava atıyon genç.",
            "Kartını zorla eline tutuşturdun. Makine yine 'YETERSİZ BAKİYE' dedi.\n" +
            "Şoför artık sinirli: — Dalga mı geçiyonuz lan benle?"
          ],
          goto: "no-balance",
        },
        {
          id: "oksur",
          positive: true,
          keywords: ["oksur", "sesimi", "bastir", "öhö"],
          text:
            "Kartını uzattın ve makinenin 'YETERSİZ BAKİYE' diye bağıracağını bildiğin için cihazla aynı anda son gücünle öksürdün.\n" +
            "Ama sen öksürmeden hemen önce cihaz 'BİİP' diye geçti. Kendi kısıtlı bakiye hakkın da gitti.\n" +
            "Şoför 'Hastaysan binme kardeşim, millete bulaştıracaksın' diyerek seni yaka paça indirdi.",
          ending: "hasta",
        },
        {
          id: "sleep",
          positive: true,
          keywords: ["uyumak", "uyuyor", "uyku", "gozumu", "kapat", "kestir", "uyurum", "uyuma", "horla"],
          text: [
            "Gözlerini sıkıca kapattın. Dünyayla bağını kopardın.\n" +
            "Gözünü açtığında otobüs son duraktaydı. Herkes inmiş. Şoför sana bakıp 'Günaydın' dedi.",
            "Uyumaya devam ediyorsun. Kadının sesi rüyana giriyor: 'Fazladan kart...'"
          ],
          ending: "uyudun",
        },
        {
          id: "ignore",
          keywords: ["gormezden", "duymamazliktan", "kulaklik", "muzigi", "kafami cevir", "bakmam", "umursama", "ilgilenmiyorum", "ses cikarmiyorum", "dinlemeye devam", "vermiyorum", "vermem", "yardim edemem", "yardim etmiyorum", "edemem", "etmem", "yok", "bende yok", "yokmus gibi", "sessiz"],
          text: [
            "Hiçbir şey duymamış gibi müziğine devam ettin, camdan dışarı bakıyorsun.\n" +
            "Arka koltuktaki teyze 'Cık cık cık' diye söylenmeye başladı. Amca bastonunu yere vurdu:\n" +
            "— Bizim zamanımızda yardımlaşma vardı! Gençlik bitmiş.\n" +
            "Yandaki lise öğrencisi telefonunu çıkarıp seni videoya çekmeye başladı.",
            "Israrla önüne bakıyorsun ama bütün otobüs seni izliyor. Kadın kartını hâlâ havada tutuyor.",
            "Sessizliğini korudun. Şoför kontak kapattı: — Biri basana kadar gitmiyom."
          ],
          goto: "tension",
        },
        {
          id: "cash",
          positive: true,
          keywords: ["nakit", "para vereyim", "bozukluk", "bozuk para", "para ustu"],
          text:
            "Şoför anında araya girdi: — Nakit geçmiyor kardeşim!\n" +
            "Kadın elinde parayla ortada kaldı.",
          goto: "driver-argue",
        },
        {
          id: "driver-pass",
          positive: true,
          keywords: ["sofor", "gecsin", "idare et", "kaptan", "birak gecsin", "bosver", "insaniyet"],
          text: [
            "Şoför el frenini çekti.\n" +
            "— Ben cebimden mi ödeyeyim kardeşim? Kurallar var, babamın malı değil bu otobüs.",
            "— Kurallar var diyorum gardaş. Belediye bana sormayacak mı sanıyorsun?"
          ],
          exhausted: {
            text: "Şoför motoru durdurdu, anahtarı aldı.\n— Madem bu kadar kural sevmiyorsunuz, otobüs de gitmiyor kardeşim! diyip arabadan indi.",
            ending: "kural"
          },
          goto: "driver-argue",
        },
        {
          id: "top-up",
          positive: true,
          keywords: ["makine", "doldur", "yukle", "yukleme", "in de", "disarida"],
          text:
            "Kadın haklısın der gibi başını salladı, otobüsten indi.\n" +
            "Kapılar kapandı, sen vicdan azabıyla baş başa kaldın.",
          ending: "kurtuldun",
        },
        {
          id: "get-off",
          positive: true,
          keywords: ["inmek", "iniyorum", "inecek var", "kapi", "durak", "dugme", "inilir"],
          text:
            "Dayanamayıp düğmeye bastın ve kendini dışarı attın.\n" +
            "Gideceğin yere daha yedi durak var.",
          ending: "kacis",
        },
        {
          id: "shout-stop",
          positive: true,
          keywords: ["musait bir yerde", "musait", "kaptan"],
          text:
            "Utançtan kaçmak için öne doğru 'Müsait bir yerde!' diye bağırdın.\n" +
            "Fakat şoföre değil, kapıda bekleyen kulaklıklı çocuğa bağırmışsın.\n" +
            "Çocuk korkudan kapı tam açılmadan aşağı atladı.",
          ending: "atlayan",
        },
      ],
    },

    "no-balance": {
      hint: "Senin kartın da boş çıktı. Cihaz bir daha bağırmadan önce bir şey yap.",
      intents: [
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
            "Otobüsteki 40 kişi nefesini tutup o 1 liranın en arkadaki tekerleğin altına girişini izledi.\n" +
            "Parayı alabilmek için otobüsü tahliye etmen gerekti.",
          ending: "rezil",
        },
        {
          id: "hit-machine",
          positive: true,
          keywords: ["cihaza", "vurmak", "makineye vur", "tokatla", "bozuk bu", "tekme", "dovmek"],
          text: [
            "Cihaza sert bir tokat attın.\nCihaz 'LÜTFEN KARTI YENİDEN OKUTUNUZ' dedi.",
            "Bu sefer yumruk attın.\nCihazın ekranı biraz daha karardı. Şoför 'Hooop!' dedi."
          ],
          exhausted: {
            text: "Cihaza son bir Osmanlı tokadı patlattın.\nCihaz bir an sustu. Sonra neşeyle şakıdı: 'TAM BİLET'.\nBütün otobüs seni alkışladı.",
            ending: "kahraman"
          }
        },
        {
          id: "hug",
          positive: true,
          keywords: ["saril", "agla", "kader", "fakirlik", "biz de", "teselli"],
          text:
            "Kadınla göz göze geldiniz. İkinizin de kartında para yok.\n" +
            "Gözleriniz doldu. Sarıldınız. Şoför bile duygulanıp 'Geçin arkaya' dedi.",
          ending: "dram",
        },
        {
          id: "run-away",
          positive: true,
          keywords: ["inmek", "inecek", "kac", "kapi", "disari", "iniyorum"],
          text:
            "Utançtan yerin dibine girdin. İlk açılan kapıdan fırlayıp kendini sokağa attın.\nKadın da peşinden indi. Beraber yürüyorsunuz.",
          ending: "yuruyus",
        },
        {
          id: "phone-card",
          keywords: ["telefon", "nfc", "karekod", "mobil", "uygulama"],
          text:
            "Telefonunu çıkardın, mobil uygulamayı açtın. Tam karekodu okutacakken telefon kapandı.\nŞarjın bitmiş. Kadın 'Nasip değilmiş yavrum' dedi.",
          ending: "sarj",
        }
      ],
      inherits: "start",
      fallbacks: [
        "Cihaz kırmızı ışıkla sana bakıyor. Bir şey yapacak mısın?",
        "Kadın kartı sana geri uzattı. Alacak mısın?",
        "Şoför 'Eee, basan yok mu?' dedi. Ne diyeceksin?",
      ],
      patience: 3,
      patienceIntent: {
        text:
          "Sen şokta beklerken arka koltuktan bir amca kalktı.\n" +
          "— Verin şunu, dedi. Kendi kartını okuttu: 'TAM BİLET'.\n" +
          "Sonra sana dönüp: 'İşe yaramaz gençlik,' diye mırıldandı.",
        ending: "viral",
      },
    },

    "tension": {
      hint: "Baskı altındasın. Amcaya cevap ver, videoyu engelle veya kadına sorusunu sor.",
      look: "Otobüsün ön tarafı sana kilitlendi. Arkadan boynunu uzatanlar var. Teyze elinde kartıyla bekliyor.",
      intents: [
        {
          id: "uncle-reply",
          positive: true,
          keywords: ["amcaya", "amca", "bizim zamanimiz", "dayi", "sen bas", "sen ver", "cok biliyorsan"],
          text:
            "Amca ayaklandı. Cebine uzandı.",
          goto: "amca-time",
        },
        {
          id: "video-kid",
          positive: true,
          keywords: ["video", "kamera", "cekme", "telefon", "engelle", "cocuga", "gence"],
          text:
            "Çocuk 'Abi rahat ol' dedi ama akşama 'Otobüste kart basmayan cimri' olarak TikTok'a düştün.",
          ending: "viral",
        },
        {
          id: "what-music",
          positive: true,
          keywords: ["dinliyorum", "muzik dinliyorum", "sarki", "kulaklikta"],
          text:
            "Kadın sana doğru eğildi, kulaklığının tekini çıkardı.\n" +
            "— Ne dinliyorsun ki bu kadar daldın evladım? diye sordu.",
          goto: "ask-music",
        },
      ],
      inherits: "start",
      fallbacks: [
        "Telefonun kamerası yüzüne dönük. Amca söylenmeye devam ediyor. Ne yapacaksın?",
        "Kadın hâlâ kart arıyor. Sessiz mi kalacaksın?",
        "Otobüste uğultu arttı. Bir şey demeyecek misin?",
      ],
      patience: 3,
      patienceIntent: {
        text:
          "Sen tepki vermeyince kadın 'Neyse ben ineyim bari' dedi.\n" +
          "Tam o sırada cihaz bağırdı: 'SİSTEM GÜNCELLENİYOR. LÜTFEN BEKLEYİNİZ.'\n" +
          "Kapılar kilitlendi. Otobüs dondu kaldı.",
        ending: "dondu",
      },
    },

    "amca-time": {
      hint: "Amca anılarına girdi. Dinleyebilir ya da lafını kesebilirsin.",
      intents: [
        {
          id: "listen-amca",
          positive: true,
          keywords: ["dinlemek", "dinliyorum", "anlat", "haklisin", "evet amca", "susmak", "susuyorum"],
          text:
            "Amca cebinden 1995 yılından kalma delikli bir kağıt bilet çıkardı.\n" +
            "— Bizim zamanımızda buydu evladım. Şoför delerdi. Herkesin bileti kendine yeterdi...\n" +
            "Amca 20 dakika boyunca 90'lar Türkiye'sini anlattı. Kadın çoktan inmişti.",
          ending: "nostalji",
        },
        {
          id: "stop-amca",
          positive: true,
          keywords: ["sus amca", "yeter", "sus artik", "kes sesini", "kapat", "kapa ceneni", "isine bak"],
          text:
            "Teyze elindeki çantasını kafana geçirdi. 'Büyüğünle nasıl konuşuyorsun terbiyesiz!'\n" +
            "Otobüsteki herkes teyzeye katıldı.",
          ending: "linc",
        }
      ],
      inherits: "tension",
      fallbacks: [
        "Amca eski biletini sallayarak sana bakıyor. Bir şey de.",
        "Amcanın gözleri maziye daldı. Orada öyle bekleyecek misin?",
        "Teyze sana ters ters bakıyor. Susacak mısın?",
      ]
    },

    "ask-music": {
      hint: "Ne dinlediğini söyle. Bir şarkı ya da tür yaz.",
      acceptAny: [
        {
          text:
            "— {input} {mi}? Ben de severim.\n" +
            "Kadın kulaklığın tekini kulağına taktı. Bir şarkı boyunca kimse ses çıkarmadı.\n" +
            "Şarkı bitince cihaz ilk kez sustu. Şoför bile kapıyı açıp 'Geç abla' dedi.",
          ending: "ortak",
        },
        {
          text:
            "— {input}... Bu ne şimdi?\n" +
            "Kadın anlamadı ama kibarca başını salladı. Tam nakaratta cihaz 'YETERSİZ BAKİYE' diye bağırdı.\n" +
            "Ritme denk geldi. Bütün otobüs seni ve cihazı alkışladı.",
          ending: "remix",
        },
        {
          text:
            "— {input} {mi}? Bizim zamanımızda böyle şeyler dinlenmezdi.\n" +
            "Kadın o kadar şaşırdı ki kartını unutup indi. Şoför sana döndü:\n" +
            "— Bir de müzikle zehirliyorsunuz insanı. İn aşağı.",
          ending: "muzikci",
        },
      ],
      inherits: "tension",
      fallbacks: [
        "— Sorumdan kaçma evladım, ne dinliyorsun?",
        "— Sesin çıkmıyor, ne çalıyor o kulaklıkta?",
        "— Cevap versene yavrum, ne o kulağındaki?",
      ],
    },

    "driver-argue": {
      hint: "Şoför huysuz. Ona laf anlat, cihazı suçla ya da kaçak geçmeye çalış.",
      intents: [
        {
          id: "argue",
          positive: true,
          keywords: ["kavga", "insanlik", "yardim", "ayip", "ayiptir", "kurallar"],
          text:
            "Şoför iyice sinirlendi. Motoru durdurdu, anahtarı cebine attı.\n" +
            "— Madem öyle, kart basılmadan bu otobüs hareket etmez! Otobüsü rehin aldı.",
          ending: "rehine",
        },
        {
          id: "sneak",
          positive: true,
          keywords: ["kacak", "arkaya", "gizlice", "gormez", "hizlica", "gec abla", "bosver", "ilerle"],
          text:
            "Şoför aynadan izliyordu. Kapıları kilitledi ve polisi aradı.\n" +
            "Son durak: Karakol.",
          ending: "karakol",
        },
        {
          id: "complain",
          positive: true,
          keywords: ["sikayet", "belediye", "cimere", "baskan", "yaziklar olsun", "dilekce"],
          text:
            "Şoför kapıyı açtı, 'Git nereye ediyorsan et' dedi ve seni dışarı itti.\n" +
            "Otobüs gitti, aktarman yandı. Çok üzüldün.",
          ending: "uzuldun",
        },
        {
          id: "tap-own-late",
          positive: true,
          keywords: ["tamam ben", "ben basarim", "kartimi", "benimkini", "veririm", "buyrun"],
          text:
            "Kartını okuttun. 'İNDİRİM HAKKINIZ BULUNMAMAKTADIR.'\n" +
            "Kartından tam bilet çekildi. Öğrenci kartın iptal mi oldu?",
          ending: "zarar",
        },
      ],
      inherits: "start",
      fallbacks: [
        "Şoför 'Bekliyorum!' diyor. Ne yapacaksın?",
        "Kadın kapıda mahcup duruyor. Bir hamle yapacak mısın?",
        "Arkadakiler 'Hadi kaptan!' diye bağırıyor. Karar ver!",
      ],
      patience: 3,
      patienceIntent: {
        text:
          "Sen karar veremeden cihaz kendi kendine konuştu:\n" +
          "'AKTARMA SÜRESİ DOLMUŞTUR.'\n" +
          "Şoför güldü: — Hadi geç abla geç, benden olsun.\nHerkes rahatladı.",
        ending: "mutlu",
      },
    },
  },

  common: [
    {
      id: "smile",
      positive: true,
      keywords: ["gulumse", "siritiyor", "sirittim", "gulmek", "siritmak", "tebessum", "gulumsedim", "gulerek"],
      text: "» Yüzüne karşı gülümsedin.\nKadın bu zor anında senin gülümsemenden cesaret aldı, 'Sağ ol evladım' dedi.",
    },
    {
      id: "ask-why",
      positive: true,
      keywords: ["neden bende", "baskasi", "neden ben", "baskasindan", "niye bana"],
      text: "» Abla otobüs dolu, niye sadece bana bakıyorsun?\n— Yüzün çok güven verici yavrum, dedi.\nBuna kızamadın.",
    },
  ],

  overrides: {
    swear: {
      text: "Ağzına geleni saydın.\nŞoför levyeyi kaptığı gibi geldi. Müzik durdu.",
      ending: "levye",
    },
    police: {
      text:
        "155'i aradın.\n— 155, buyrun.\n» Otobüste birinin kartında bakiye yetersiz!\n— ...Kardeşim işine bak.\nHat kapandı.",
    },
    mom: {
      text:
        "Anneni aradın.\n» Anne, otobüste birinin kartı boş çıktı.\n" +
        "— Hemen bas kadının yerine, ayıp! Benim evladım olduğun belli olsun!\nZorunda kaldın, bastın.",
      goto: "no-balance",
    },
    dance: {
      text:
        "Otobüsün ortasında ayağa kalkıp oynamaya başladın.\n" +
        "Cihaz ritmik bir şekilde 'YETERSİZ BAKİYE, YETERSİZ BAKİYE' diye tempo tuttu.",
      ending: "remix",
    },
    faint: {
      text:
        "Bayılma taklidi yapıp yere yığıldın.\n" +
        "Yolcular paniğe kapıldı. Şoför kapıları açtı. Kadın bu kargaşada bilet basmadan içeri sızdı.",
      ending: "kargasa",
    },
    money: {
      text:
        "Cüzdanını çıkarıp kadına 50 lira uzattın.\n" +
        "Kadın parayı aldı. — Sağ ol yavrum, dedi. Sonra inip taksiye bindi.",
      ending: "taksi",
    },
    weapon: {
      text:
        "Arka cebine davrandın.\n" +
        "Şoför dikiz aynasından gördü, direksiyonu kırıp karakola çekti.",
      ending: "karakol",
    }
  },

  fallbacks: [
    "Kadın elinde kartıyla sana bakıyor. Bir şey yapacak mısın?",
    "Cihaz inatla sessiz. Şoför bekliyor. Karar ver!",
    "Arkadakiler homurdanmaya başladı. Ne yapacaksın?",
    "Bir sessizlik oldu. Kimse kartını çıkarmıyor. Sen çıkaracak mısın?",
    "Şoför 'Geçecek misin abla?' dedi. Bir tepki verecek misin?"
  ],
  patience: 6,
  patienceIntent: {
    text:
      "Sen inat ettin, şoför inat etti, kadın inat etti.\n" +
      "Cihaz sonunda dayanamayıp kendi kendine bağırdı: 'SİSTEM ARIZASI. ÜCRETSİZ GEÇİŞ.'\n" +
      "Otobüs alkışlarla yola devam etti.",
    ending: "ucretsiz",
  },
});
