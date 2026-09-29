// Senaryo: Göz Teması
// New scenarios copy this file's shape. Only text and keywords, no code.
//
// nodes: the scene's steps. The game starts at "start".
//   intents: what the player can do at this step. First match wins.
//   inherits: also accept another node's intents (checked after this node's own).
// common: intents accepted at every step of this scenario.
// overrides: replace a global intent (by id) for this scenario only.
// fallbacks: replies when nothing matches. After `patience` misses, `patienceIntent` fires.
// endings: every ending's title and tag. An intent ends the game with `ending: "<id>"`.
window.Yasandi = window.Yasandi || {};
window.Yasandi.scenarios = window.Yasandi.scenarios || [];
window.Yasandi.scenarios.push({
  id: "goz-temasi",
  title: "Göz Teması",

  endings: {
    sallama: { title: "Arka Cep", tag: "ÖLDÜN" },
    istanbulkart: { title: "İstanbulkart", tag: "ÖLDÜN" },
    kelime: { title: "Kelime Oyunu", tag: "ÖLDÜN" },
    hitap: { title: "Hitap Krizi", tag: "ÖLDÜN" },
    teyze: { title: "Teyzenin Evi", tag: "ÖLDÜN" },
    bakiye: { title: "Bakiye Yetersiz", tag: "ÖLDÜN" },
    terlik: { title: "Terlik Füzesi", tag: "BAYILDIN" },
    vesikalik: { title: "Vesikalık", tag: "SOYULDUN" },
    garson: { title: "Garson", tag: "SOYULDUN" },
    eskimodel: { title: "Eski Model", tag: "KURTULDUN" },
    kulaklik: { title: "Sessiz Müzik", tag: "KURTULDUN" },
    kuzen: { title: "Hüseyin'in Kuzeni", tag: "KURTULDUN" },
    halay: { title: "Tek Kişilik Halay", tag: "KURTULDUN" },
    rehber: { title: "Keko Rehber", tag: "KURTULDUN" },
    saatkac: { title: "Saat Kaç", tag: "KURTULDUN" },
    bakkal: { title: "Bakkal Remzi", tag: "KURTULDUN" },
    komsu: { title: "Yeni Komşu", tag: "KURTULDUN" },
    kekoanne: { title: "Keko'nun Annesi", tag: "KURTULDUN" },
  },

  nodes: {
    start: {
      text:
        "Akşam üstü. Mahallede yürüyorsun. Kulaklık takılı ama müzik yok, öylesine takılı.\n" +
        "Karşıdan biri geliyor. Yanlışlıkla göz göze geldiniz. Bir saniye. Belki iki.\n" +
        "Durdu.\n" +
        "— Hayırdır la gardaş?",
      intents: [
        {
          id: "polite-buyur",
          keywords: ["buyur", "buyrun", "emret"],
          text: "— Buyur abi? dedin.\n— Buyur mu? Garson muyum lan ben? Hangi mahallesin sen?",
          goto: "abi",
        },
        {
          id: "polite",
          keywords: ["efendim", "ne oldu", "bisey mi", "bir sey mi", "konussana", "ne dedin", "ne diyon", "ne diyorsun", "anlamadim", "duymadim abi"],
          text: "— Efendim abi? dedin.\n— Efendim mi? Öğretmen miyim lan ben? Hangi mahallesin sen?",
          goto: "abi",
        },
        {
          id: "talk-back",
          keywords: ["hayirdir", "sana ne", "ne bakiyon", "ne bakiyorsun", "asil sen", "sensin", "ne var", "bakarim", "ne olmus", "karsilik ver", "kafa tut", "kafana gore"],
          text:
            "— Asıl sen hayırdır? dedin. Kendi sesine sen de şaşırdın.\n" +
            "Keko hiçbir şey demedi. Sol arka cebine uzandı. Sallama.\n" +
            "Olaylar çok hızlı gelişti. Kıçından bıçaklandın. Keko kaçtı.\n" +
            "Ambulans kırk dakikada geldi.",
          ending: "sallama",
        },
        {
          id: "apologize",
          keywords: ["pardon", "kusura bakma", "ozur", "affedersin", "yanlis anladin", "kusura", "sorry", "ozur dilerim"],
          text: "— Pardon abi, dedin.\n— Abi mi? Ben senin abin miyim lan? Hangi mahallesin sen?",
          goto: "abi",
        },
        {
          id: "run",
          keywords: ["kac", "kos", "arkami don", "arkani don", "uzaklas", "hizlan", "tabana kuvvet", "geri don"],
          text:
            "Arkanı döndün, adımlarını hızlandırdın.\n" +
            "Arkadan terlik sesi geliyor. Terlikle koşuyor ama yetişiyor.\n— Dur lan!",
          goto: "chase",
        },
        {
          id: "pretend-to-know",
          keywords: ["tanisiyoz", "tanisiyoruz", "taniyorum", "degil misin", "kuzen", "okuldan", "askerden", "mahalleden", "bi yerden"],
          text:
            "— Abi biz bi yerden tanışıyoz ya, dedin.\n" +
            "Keko gözlerini kıstı.\n— ...Sen Hüseyin'in kuzeni misin?\n— Evet, dedin. Hüseyin'i tanımıyorsun.\n" +
            "Kırk dakika sonra kahvedesin, üçüncü çaydasın. Hüseyin'in düğününe davetlisin. Takı da takacaksın.",
          ending: "kuzen",
        },
        {
          id: "ignore",
          keywords: ["gormezden gel", "cevap verme", "yurumeye devam", "devam et", "bakma", "telefona bak", "sus", "yuru", "gec git"],
          text: "Hiçbir şey olmamış gibi yürümeye devam ettin.\nKeko yanına geldi, adımını uydurdu.\n— Duymadın mı gardaş? Hayırdır dedim.",
          goto: "insist",
        },
      ],
    },

    abi: {
      intents: [
        {
          id: "polite-again",
          keywords: ["buyur", "buyrun", "efendim", "emret"],
          text:
            "— Efendim abi, buyur abi, dedin. Başka bir şey gelmedi aklına.\n" +
            "Keko derin bir nefes aldı.\n— Madem garsonsun, iki çay söyle o zaman.\n" +
            "Kahveye oturdunuz. Dört çay içtiniz. Hesabı sen ödedin.",
          ending: "garson",
        },
        {
          id: "lie-local",
          keywords: ["buraliyim", "bu mahalle", "senin mahalle", "buradan", "burdan", "buranin", "burda oturuyorum", "burada oturuyorum"],
          text:
            "— Buralıyım abi, dedin.\n— Hangi apartman?\nRastgele bir binayı gösterdin.\n" +
            "— O benim teyzemin evi, dedi keko. Teyzesini aradı. Teyze seni tanımadı.",
          ending: "teyze",
        },
        {
          id: "stranger",
          keywords: ["misafir", "disaridan", "uzaktan", "yolumu kaybettim", "kayboldum", "gecerken", "buralı degilim", "burali degilim", "baska mahalle"],
          text:
            "— Misafirim abi, geçiyordum.\nKekonun yüzü bir anda yumuşadı.\n— Misafir başımızın tacıdır gardaş. Nereye gidiyon?\n" +
            "Seni durağa kadar götürdü. Otobüse bindirdi. Kartı da o bastı.",
          ending: "rehber",
        },
        {
          id: "other-title",
          keywords: ["kanka", "kardes", "gardas", "hocam", "reis", "dayi", "bro", "birader", "kral"],
          text:
            "— Tamam kardeş, dedin.\n— Kardeş mi? Abi olmadı kardeş mi oldum şimdi?\n" +
            "Hitap konusunda uzlaşamadınız. Sallama çıktı.",
          ending: "hitap",
        },
      ],
      inherits: "start",
    },

    chase: {
      intents: [
        {
          id: "run-faster",
          keywords: ["kos", "hizlan", "kac", "daha hizli", "depar"],
          text:
            "Daha hızlı koştun. Terlik sesi de hızlandı.\nBir terlik yanından uçup geçti. İkincisi geçmedi.\n" +
            "Uyandığında keko gitmişti. Terliğini bırakmıştı.",
          ending: "terlik",
        },
        {
          id: "stop",
          keywords: ["dur", "teslim", "bekle", "arkami don", "yuzles", "ne istiyorsun", "ne istiyon"],
          text:
            "Durdun. Keko nefes nefese yanına geldi.\n— Niye kaçıyon lan? Saat kaç diye soracaktım.\n" +
            "Saat 19.40'tı. Keko teşekkür etti, gitti.",
          ending: "saatkac",
        },
        {
          id: "hide",
          keywords: ["bakkal", "market", "dukkan", "saklan", "gir", "kafe", "kahve", "apartmana"],
          text:
            "Köşedeki bakkala daldın. Bakkal Remzi abi sana baktı, sonra kapıya.\n" +
            "Keko içeri girdi, soluk soluğa.\n— Remzi abi, iki ekmek.\nSen de ekmek aldın. Keko seni görmedi bile.",
          ending: "bakkal",
        },
        {
          id: "vehicle",
          keywords: ["otobus", "dolmus", "taksi", "minibus", "binmek", "bin"],
          text:
            "Durağa yanaşan otobüse atladın. Kartı bastın.\n— Bakiye yetersiz.\nŞoför bir sana baktı, bir kapıya. Kapı açıldı.\nKeko dışarıda bekliyordu.",
          ending: "bakiye",
        },
      ],
    },

    insist: {
      intents: [
        {
          id: "keep-walking",
          keywords: ["yurumeye devam", "devam", "yuru", "gormezden", "cevap verme", "sus", "eve git"],
          text:
            "Yürümeye devam ettin. Keko da. Beş dakikadır yan yana yürüyorsunuz.\nEve geldin. Keko da geldi.\n" +
            "— Bizim apartmandaymışsın gardaş, dedi. 4. kattaymış.\nArtık her sabah göreceksin.",
          ending: "komsu",
        },
        {
          id: "headphones",
          keywords: ["duymadim", "kulaklik", "muzik", "duymuyorum"],
          text:
            "Kulaklığı gösterdin.\n— Duymadım abi.\nKeko kulaklığı aldı, kulağına taktı. Müzik yok.\n" +
            "Bir süre bakıştınız. Keko kulaklığı geri vermedi. Ama gitti.",
          ending: "kulaklik",
        },
      ],
      inherits: "start",
    },
  },

  common: [
    {
      id: "speaking-turkish",
      keywords: ["turkce konusuyom", "turkce konusuyorum", "turkce", "anlamiyon mu", "anlamiyor musun", "anlamadin mi"],
      text: "— Türkçe konuşuyom ya abi, dedin.\n— Bana laf mı sokuyon sen?\nKeko'nun sol eli yavaşça arka cebine gitti. Sonra geri geldi. Şimdilik.",
    },
  ],

  overrides: {
    weapon: {
      text:
        "Arka cebine davrandın. Elinde İstanbulkart var. Bakiye 3,50.\n" +
        "Keko önce güldü. Sonra o da arka cebine davrandı. Onunki İstanbulkart değildi.",
      ending: "istanbulkart",
    },
    swear: {
      text: "Ağzına geleni saydın. Keko sözünü bitirmeni bekledi, kibarca.\nSonra sallamayı çıkardı.",
      ending: "kelime",
    },
    dance: {
      text:
        "Nedenini sen de bilmiyorsun ama halaya durdun. Tek kişilik halay.\n" +
        "Keko bir süre izledi. Sonra cebinden mendil çıkarıp başa geçti.\nMahalle toplandı. Biri davul getirdi.",
      ending: "halay",
    },
    money: {
      text:
        "Cüzdanını çıkarıp uzattın. İçinde 20 lira ve eski sevgilinin vesikalığı var.\n" +
        "Keko ikisini de aldı. Vesikalığa uzun uzun baktı.\n— Bunu da ben mi terk ettim? dedi. Gitti.",
      ending: "vesikalik",
    },
    faint: {
      text:
        "Yere yığıldın. Ölü taklidi.\nKeko eğildi, cebini yokladı, telefonunu aldı.\n" +
        "Telefon 2019 model. Keko geri koydu, üstünü örttü, gitti.",
      ending: "eskimodel",
    },
    police: {
      text:
        "155'i aradın.\n— 155, buyrun.\n— Biri bana hayırdır dedi.\nHat kapandı.\n" +
        "Keko her şeyi duydu. Bir adım daha yaklaştı.",
    },
    mom: {
      text:
        "Anneni aradın, keko duysun diye yüksek sesle.\n— Anne! Ben şimdi mahalledeyim!\n" +
        "— Ekmek aldın mı?\nKapattı. Keko hâlâ orada. Biraz da acıyarak bakıyor.",
    },
  },

  fallbacks: [
    "Keko yazdığını anlamadı. Kaşları çatıldı.",
    "— Ne diyon lan sen? dedi keko.",
    "Keko bir adım yaklaştı. Sigara kokuyor.",
    "Keko ağzındaki çekirdeği tükürdü. Bekliyor.",
    "— Gardaş Türkçe konuş, dedi.",
    "Arkadan bir motor geçti. Keko gözünü senden ayırmadı.",
    "Keko bir sana baktı, bir ayakkabılarına. Ayakkabıların pahalı değil. Rahatladın mı? Bilmiyorsun.",
  ],
  patience: 5,
  patienceIntent: {
    text:
      "Keko'nun telefonu çaldı. Açtı.\n— Efendim anne? ... Tamam anne. ... Tamam aldım, aldım.\n" +
      "Sana son bir kez baktı, gitti.\nAnnesine bir iyilik borçlusun.",
    ending: "kekoanne",
  },
});
