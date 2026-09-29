window.Yasandi = window.Yasandi || {};
window.Yasandi.scenarios = window.Yasandi.scenarios || [];
window.Yasandi.scenarios.push({
  id: "otobus-teyzesi",
  title: "Yer Ver",

  endings: {
    firsatci: { title: "Fırsatçı Pusu", tag: "AYAKTASIN" },
    pilates: { title: "Pilatesçi Teyze", tag: "EZİLDİN" },
    uyku: { title: "Son Durak", tag: "UYUDUN" },
    erkeninis: { title: "Erken İniş", tag: "KURTULDUN" },
    krem: { title: "Biberiye Kremi", tag: "ŞİFA" },
    kavga: { title: "Otobüs Meydan Muharebesi", tag: "LİNÇ" },
    sarj: { title: "Şarj Bitti", tag: "ÖLDÜN" },
    nisan: { title: "Zorla Nişan", tag: "EVLENDİN" },
    akraba: { title: "Uzak Akraba", tag: "KURTULDUN" },
    sofor: { title: "Şoför Müdahalesi", tag: "ATILDIN" },
    fenalik: { title: "Fenalık Geçirdi", tag: "VİCDAN AZABI" },
    saygisiz: { title: "Saygısız Nesil", tag: "DIŞLANDIN" },
    cam: { title: "Manzara", tag: "KURTULDUN" },
    amca: { title: "Amca Savunması", tag: "KURTULDUN" },
    halay: { title: "Otobüs Halayı", tag: "KURTULDUN" },
    inat: { title: "Keçi İnadı", tag: "KURTULDUN" }
  },

  nodes: {
    start: {
      hint: "Teyze hâlâ bakıyor. Bir şey yapmalısın. Ya da hiçbir şey yapmamalısın.",
      text:
        "Akşam saati. Otobüs tıklım tıklım. Çok yorgunsun, sonunda bir koltuk bulup oturdun.\n" +
        "Bir durakta yaşlı, sevimli ama kararlı bir teyze bindi. Geldi, tam tepene dikildi.\n" +
        "Hiçbir şey demiyor. Sadece gözlerinin içine bakıyor.",
      intents: [
        {
          id: "give-seat",
          positive: true,
          keywords: ["kalk", "buyur", "otur teyze", "teyze otur", "otur buraya", "yer ver", "yerimi", "gec teyze", "gec otur", "otursana", "ayaga kalk"],
          text:
            "» Buyur teyze, otur.\nAyağa kalktın. Teyze tam oturacakken arka taraftan orta yaşlı, kel bir adam fırladı ve koltuğa oturdu.\n" +
            "— Hop kardeşim, dedi adam. Ben de yorgunum.\n" +
            "Teyze artık o adama bakıyor. Sen de ayaktasın. Adalet yok.",
          ending: "firsatci",
        },
        {
          id: "give-seat-polite",
          keywords: ["lutfen", "rica ederim", "teyzecigim", "teyzecim"],
          text:
            "» Teyzeciğim lütfen buyur, sen otur.\nAyağa kalktın. Teyze gülümsedi.\n" +
            "— Sağ ol yavrum ama ben bir durak sonra inecem. Hem pilates yapıyorum, ayakta durmak iyi geliyor.\n" +
            "Teyze inmedi. On beş durak tek ayak üstünde durdu. Sen ayakta süründün.",
          ending: "pilates",
        },
        {
          id: "ignore",
          keywords: ["gormezden gel", "bakma", "kafami cevir", "yuzune bakma", "hicbir sey", "hic bir sey", "oturmaya", "oturuyorum", "devam et", "vermiyorum", "vermem", "vermeyecegim", "kalkmiyorum", "kalkmam", "kalkmayacagim"],
          text:
            "Görmezden geldin. Oturmaya devam ettin.\n" +
            "Teyzenin bakışları ağırlaşıyor. Ağırlığı fiziksel olarak hissedebiliyorsun.\n" +
            "Etraftaki yolcular da sana bakmaya başladı.",
          goto: "stare-level-2",
        },
        {
          id: "sleep",
          positive: true,
          keywords: ["uyu", "uyuyor", "uyku", "gozumu kapat", "horla", "uyumus gibi", "uyuma", "kestir", "uyuma numarasi"],
          text:
            "Gözlerini kapattın. Uyuyor numarası yapıyorsun.\n" +
            "Teyze elindeki şemsiyeyle dizine dürttü.\n— Uyuma numarası yapma yavrum, göz kapakların titriyor.",
          goto: "stare-level-2",
        },
        {
          id: "tired",
          keywords: ["yorgunum", "hastayim", "belim", "agrim", "calisiyorum", "isten ciktim", "mesai", "ayaklarim", "ben de yorgunum"],
          text:
            "» Teyze ben de çok yorgunum, işten çıktım.\n" +
            "Teyzenin yüzü bir anda şefkatle doldu.\n" +
            "— Oy kıyamam, dedi. Çantasından tuhaf kokulu bir merhem çıkardı.\n" +
            "Otobüsün ortasında boynuna ve beline biberiye kremi sürmeye başladı. Herkes sizi izliyor. Felaket kokuyorsun ama ağrıların geçti.",
          ending: "krem",
        },
        {
          id: "headphone",
          keywords: ["kulaklik", "muzik", "takiyorum", "taktim", "takarim"],
          text:
            "Kulaklığını taktın. Müziğin sesini açtın.\n" +
            "Teyze eğildi, kulaklığın tekini kulağından çıkardı.\n— Ne dinliyon yavrum? Müslüm mü o?",
          goto: "stare-level-2",
        },
        {
          id: "ask-early",
          keywords: ["efendim", "ne var", "ne bakiyorsun", "hayirdir", "niye bakiyorsun", "nedir", "bir sey mi"],
          text:
            "Teyzeye bir şey söyledin. Teyze cevap vermedi. Bakışı bir kat ağırlaştı.\n" +
            "Yandaki yolcu gazetesini indirip sizi izlemeye başladı.",
          goto: "stare-level-2",
        },
        {
          id: "phone",
          keywords: ["telefon", "telefona", "oyun", "mesaj", "ekran", "sosyal medya"],
          text:
            "Telefonu çıkardın, ekrana boş boş bakmaya başladın.\n" +
            "Teyze eğildi, ekrana baktı.\n— O kızı beğenmedim yavrum, dedi. Çok makyaj yapmış.",
          goto: "stare-level-2",
        },
        {
          id: "get-off",
          positive: true,
          keywords: ["inecek", "inmek", "iniyorum", "inecegim", "inerim", "inicem", "kapi", "durak", "dugme"],
          text:
            "» İnecek var!\nDüğmeye bastın ve ilk durakta kendini dışarı attın.\n" +
            "Evin daha 12 durak ileride. Yürümek zorundasın ama vicdanın rahat.",
          ending: "erkeninis",
        },
        {
          id: "window",
          keywords: ["cam", "disari", "pencere", "manzara", "disariya", "camdan"],
          text:
            "Başını cama çevirdin. Camdan dışarı bakmaya başladın.\n" +
            "Teyze de seninle birlikte cama doğru eğildi.\n— Kaza mı olmuş yavrum orada? dedi.\n" +
            "İkiniz de camdan dışarı bakarak 10 durak gittiniz.",
          ending: "cam",
        },
      ],
    },

    "stare-level-2": {
      hint: "Baskı artıyor. Yolcular, şoför, amca... Ya yer ver, ya onlara laf yetiştir, ya da teyzeye kim olduğunu sor.",
      intents: [
        {
          id: "give-seat-late",
          positive: true,
          keywords: ["kalk", "buyur", "otur teyze", "teyze otur", "otursana", "yer ver", "tamam teyze", "pes", "dayanamadim"],
          text:
            "» Tamam teyze buyur geç.\nArtık çok geç.\n" +
            "Arka koltuktaki amca bağırdı: — Yarım saattir dikiyorsun kadını tepende! Gençlik bitmiş!\n" +
            "Otobüste alkışlı protesto başladı.",
          ending: "saygisiz",
        },
        {
          id: "ignore-harder",
          keywords: ["bakma", "devam", "gormezden", "sus", "hicbir sey", "yine", "hala", "oturmaya", "oturuyorum", "cevap verme", "vermiyorum", "vermem", "kalkmiyorum", "kalkmam"],
          text:
            "Israrla önüne bakıyorsun.\n" +
            "Şoför dikiz aynasından sana ters ters bakmaya başladı. Arka koltuktaki amca boğazını temizledi, yüksek sesle 'Tüüüh' dedi.\n" +
            "Teyze birden eğildi ve kulağına fısıldadı:\n— Sen kimin oğlusun bakayım?",
          goto: "kimin-oglusu",
        },
        {
          id: "uncle",
          keywords: ["amca", "tuh", "dayi", "sana ne", "sen kalk", "sen yer ver", "amcaya", "arkadaki", "amcasi"],
          text:
            "» Amca çok istiyorsan sen kalk yer ver!\nAmca şok oldu. \n" +
            "— Ben 65 yaşındayım lan! diye ayağa kalktı.\nAmca kalkınca teyze anında amcanın yerine oturdu. Amca ayakta kaldı.",
          ending: "amca",
        },
        {
          id: "driver",
          keywords: ["sofor", "ayna", "kaptan", "onune bak", "yola bak", "dikiz"],
          text:
            "» Kaptan yola bak, kaza yapacağız!\nŞoför frene bastı.\n" +
            "— Bana işimi mi öğretiyon lan? Kalk teyzeye yer ver!\nSeni yaka paça otobüsten attılar.",
          ending: "sofor",
        },
        {
          id: "ask",
          keywords: ["ne var", "ne bakiyorsun", "niye", "hayirdir", "efendim", "teyze ne", "sorun ne", "ne istiyorsun", "amacin ne"],
          text:
            "» Ne var teyze, ne bakıyorsun?\nTeyze hiç istifini bozmadı. Eğildi ve gözlerinin içine bakarak sordu:\n" +
            "— Sen kimin oğlusun bakayım?",
          goto: "kimin-oglusu",
        },
        {
          id: "sleep-again",
          positive: true,
          keywords: ["uyu", "uyku", "gozumu kapat", "uyumaya", "kestir", "horla"],
          text:
            "Tekrar gözlerini kapattın ve bu sefer gerçekten uykuya daldın.\n" +
            "Uyandığında son duraktasın. Teyze yok. Otobüs boş. Şoför seni dürtüyor:\n— Kalk hadi geldik.",
          ending: "uyku",
        },
        {
          id: "phone-again",
          keywords: ["telefon", "telefona", "oyun", "mesaj", "sarj"],
          text:
            "Telefona bakmaya devam ettin. Teyzenin gözleri ekranda.\n" +
            "Şarjın %1. Ve bitti. Ekran karardı.\nArtık yapacak hiçbir şeyin yok. Sadece teyze ve sen varsınız.",
          ending: "sarj",
        },
      ],
      inherits: "start",
      fallbacks: [
        "Teyze nefes alıp veriyor. Nefesi saç diplerine çarpıyor.",
        "Arka koltuktaki amca 'Cık cık cık' yapıyor.",
        "Şoför dikiz aynasından seni kesiyor. Herkes bir hamle bekliyor.",
      ],
      patience: 3,
      patienceIntent: {
        text:
          "Çok fazla sessiz kaldın. Teyze birden göğsünü tuttu.\n" +
          "— Ay bana fenalık geldi... havasızlıktan...\nBütün otobüs üstüne çullandı.",
        ending: "fenalik",
      },
    },

    "kimin-oglusu": {
      hint: "Teyze sülaleni soruyor. Bir isim söyle, ya da 'tanımazsın' de.",
      intents: [
        {
          id: "nobody",
          keywords: ["kimseden", "kimsem yok", "yetim", "kimse", "tanimazsin", "yabanciyim", "burali degilim", "bilmezsin"],
          text:
            "» Tanımazsın teyze, ben buralı değilim.\n" +
            "Teyze kaşlarını çattı.\n" +
            "— Yabancıdan hayır gelmez zaten. Nereden bilsin büyüğe saygıyı.\n" +
            "Seni otobüsten indirene kadar laf sokmaya devam etti.",
          ending: "saygisiz",
        },
        {
          id: "no-one",
          keywords: ["sana ne", "sanane", "soylemem", "ne yapacaksin", "ne yapacan", "ilgilenmez", "ne isin var"],
          text:
            "» Sana ne teyze?\n" +
            "Otobüste buz gibi bir rüzgar esti. Amca şemsiyesini hazırladı, şoför sağa çekti.\n" +
            "Büyük bir kavga çıkmak üzere.",
          ending: "kavga",
        },
      ],
      acceptAny: [
        {
          text:
            "— {input} {mi}?\nTeyze durakladı. Gözleri parladı.\n" +
            "— Aaaa, sen {input}'ların torunusun! Sizin köyün sulak yerinden tarla almıştık biz.\n" +
            "Bir anda akraba çıktınız. Teyze seni zorla çaya davet etti.",
          ending: "akraba",
        },
        {
          text:
            "— {input}...\nTeyze seni baştan aşağı tekrar süzdü.\n" +
            "— Benim görümcemin kızının da {input} diye bi akrabası vardı. Bekar mısın sen yavrum?\n" +
            "Teyze çantadan görümcesinin kızının fotoğrafını çıkardı. Otobüsten nişanlı iniyorsun.",
          ending: "nisan",
        },
      ],
      inherits: "stare-level-2",
      fallbacks: [
        "— Sağır mısın yavrum? Kimin oğlusun diyorum.",
        "— Annen baban kim senin, onu soruyorum.",
      ],
    },
  },

  common: [
    {
      id: "smile",
      keywords: ["gulumse", "siritiyor", "sirittim", "gul", "sirit", "tebessum", "gulumsedim"],
      text: "» Yüzüne karşı gülümsedin.\nTeyze gülümsemedi. Bakışları bir kat daha sertleşti.",
    },
    {
      id: "ask-seat",
      keywords: ["baskasi", "baskasindan", "neden ben", "niye ben", "genc", "gencler"],
      text: "» Teyze otobüste bir sürü genç var, niye tepeme dikildin?\n— Senin yüzünde nur var yavrum, dedi. Sana kanım ısındı.\nKaçış yok.",
    },
  ],

  overrides: {
    swear: {
      text: "Ağzına geleni saydın.\nTeyze çantasından üç kiloluk bir pırasa çıkardı ve kafana indirdi.",
      ending: "kavga",
    },
    police: {
      text:
        "155'i aradın.\n— 155, buyrun.\n» Otobüste bir teyze bana bakıyor.\n— ...Yer ver o zaman evladım.\nHat kapandı.",
    },
    mom: {
      text:
        "Anneni aradın.\n» Anne, otobüste bi teyze tepemde dikiliyor.\n" +
        "— Terbiyesizlik yapma, hemen yer ver kadına! Benim evladım olduğun belli olmasın!\nAnnen telefonu yüzüne kapattı.",
    },
    dance: {
      text:
        "Otobüsün ortasında ayağa kalkıp oynamaya başladın.\n" +
        "Şoför aynadan bakıp müziğin sesini açtı. Teyze de sana eşlik etti.",
      ending: "halay",
    },
    faint: {
      text:
        "Bayılma taklidi yapıp yere yığıldın.\n" +
        "Teyze çantasından limon kolonyası çıkardı, ağzına yüzüne boca etti. Gözlerin yandı, mecburen kalktın.\nKoltuğuna o oturdu.",
      ending: "firsatci",
    },
    money: {
      text:
        "Cüzdanını çıkarıp teyzeye 50 lira uzattın.\n" +
        "Teyze parayı aldı, çantasına koydu. Hâlâ sana bakıyor. Hem paran gitti hem koltuğun tehdit altında.",
    },
    weapon: {
      text:
        "Arka cebine davrandın.\n" +
        "Teyze çantasından örgüsünü ve iki tane uzun, sivri şiş çıkardı. Şişleri kılıç gibi tutuyor.",
      ending: "kavga",
    }
  },

  fallbacks: [
    "Teyze sana bakmaya devam ediyor. Sessizlik kulak tırmalayıcı.",
    "Otobüs sallandı, teyze bir adım daha yaklaştı. Dibindesin.",
    "Şoför sert bir fren yaptı. Teyze üstüne devrilmedi, dimdik ayakta. Bakıyor.",
    "Birisi 'Şu gençliğe bak' diye mırıldandı.",
    "Teyze dudaklarını büzdü. Gözlerini senden ayırmıyor.",
    "Nefes aldığını bile belli etmemeye çalışıyorsun ama teyze orda."
  ],
  patience: 6,
  patienceIntent: {
    text:
      "Sen inat ettin, o inat etti. Otobüs son durağa geldi.\n" +
      "Herkes indi, şoför indi, siz hâlâ bakışıyorsunuz.\nSonunda teyze 'Aferin yavrum, inatçıymışsın' dedi ve gitti.",
    ending: "inat",
  },
});
