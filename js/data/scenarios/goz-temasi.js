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
    hasim: { title: "Hasım", tag: "ÖLDÜN" },
    borc: { title: "Aile Borcu", tag: "SOYULDUN" },
    selam: { title: "Selam Söyle", tag: "KURTULDUN" },
    kirve: { title: "Kirve", tag: "KURTULDUN" },
    muslum: { title: "Müslüm Babanın Oğlu", tag: "KURTULDUN" },
    sulale: { title: "Bayramda Gel", tag: "KURTULDUN" },
    bakiye: { title: "Bakiye Yetersiz", tag: "ÖLDÜN" },
    terlik: { title: "Terlik Füzesi", tag: "BAYILDIN" },
    kedi: { title: "Paşa", tag: "KURTULDUN" },
    omuz: { title: "Omuz", tag: "ÖLDÜN" },
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
      hint: "Keko cevap bekliyor. Kafa tutabilir, kaçabilir, özür dileyebilir, onu tanıyormuş gibi yapabilirsin.",
      text:
        "Akşam üstü. Mahallede yürüyorsun. Kulaklık takılı ama müzik yok, öylesine takılı.\n" +
        "Karşıdan biri geliyor. Yanlışlıkla göz göze geldiniz. Bir saniye. Belki iki.\n" +
        "Durdu.\n" +
        "— Hayırdır la gardaş?",
      intents: [
        {
          id: "polite-buyur",
          keywords: ["buyur", "buyrun", "emret"],
          text: "» Buyur abi?\n— Buyur mu? Garson muyum lan ben? Hangi mahallesin sen?",
          goto: "abi",
        },
        {
          id: "polite",
          keywords: ["efendim", "duymadim abi"],
          text: "— Efendim mi? Öğretmen miyim lan ben? Hangi mahallesin sen?",
          goto: "abi",
        },
        {
          id: "wasnt-looking",
          keywords: ["bakmiyordum", "bakmiyodum", "bakmadim", "hicbir seye", "hic bir seye", "dalmisim", "daldim", "bosluga", "kimseye", "sana degil", "arkana"],
          text: "» Hiçbir şeye bakmıyodum abi, dalmışım.\n— Dalmışsın. Bana mı daldın?\nKeko seni baştan aşağı süzdü.\n— Hangi mahallesin sen?",
          goto: "abi",
        },
        {
          id: "what-do-you-want",
          keywords: ["ne oldu", "bisey mi", "bir sey mi", "konussana", "ne dedin", "ne diyon", "ne diyorsun", "ne istiyon", "ne istiyorsun", "anlamadim", "derdin ne"],
          text: "— Konuşuyom ya işte, dedi keko. Hayırdır dedim.\nBir adım yaklaştı.\n— Sen neye bakıyodun asıl?",
        },
        {
          id: "talk-back",
          keywords: ["hayirdir", "sana ne", "ne bakiyon", "ne bakiyorsun", "asil sen", "sensin", "ne var", "bakarim", "ne olmus", "karsilik ver", "kafa tut", "kafana gore"],
          text:
            "» Asıl sen hayırdır?\nKendi sesine sen de şaşırdın.\n" +
            "Keko hiçbir şey demedi. Sol eli yavaşça arka cebine gitti.\n" +
            "Zaman yavaşladı. Karşı kaldırımda bir kedi durup size baktı. Bakkal Remzi abi kepengi yarıya indirdi.",
          hint: "Belki sen de arka cebine davranmalısın? Ya da koşmalısın. Ya da o kedi...",
          goto: "standoff",
        },
        {
          id: "apologize",
          keywords: ["pardon", "kusura bakma", "ozur", "affedersin", "yanlis anladin", "kusura", "sorry", "ozur dilerim"],
          text: "» Pardon abi.\n— Abi mi? Ben senin abin miyim lan? Hangi mahallesin sen?",
          goto: "abi",
        },
        {
          id: "run",
          positive: true,
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
            "» Abi biz bi yerden tanışıyoz ya.\n" +
            "Keko gözlerini kıstı.\n— ...Sen Hüseyin'in kuzeni misin?\n» Evet.\nHüseyin'i tanımıyorsun.\n" +
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

    // The slow-motion second when keko reaches for his back pocket. Two misses and it's over.
    standoff: {
      intents: [
        {
          id: "draw-card",
          keywords: ["cebime", "cebine", "davran", "arka cep", "bicak", "sallama", "silah", "caki"],
          text:
            "Sen de arka cebine davrandın. İkiniz aynı anda çektiniz.\n" +
            "Senin elinde İstanbulkart. Bakiye 3,50.\nKeko'nun elinde İstanbulkart değil.",
          ending: "istanbulkart",
        },
        {
          id: "cat",
          keywords: ["kedi", "pisi", "pisipisi", "kediye"],
          text:
            "» Pisi pisi.\nKeko'nun eli cepte dondu. Kediye baktı.\n— Pisi pisi, dedi o da.\n" +
            "Kedi ikinizi de umursamadı. Keko cebinden sallama yerine bir poşet mama çıkardı.\nOn dakikadır birlikte kedi besliyorsunuz. Adı Paşa'ymış.",
          ending: "kedi",
        },
        {
          id: "run",
          positive: true,
          keywords: ["kac", "kos", "arkami don", "tabana kuvvet", "hizlan"],
          text:
            "Arkanı dönüp koşmaya başladın.\nKeko'nun eli cebinden çıktı: tespih. Tespihi sallayarak peşine düştü.\n— Dur lan!",
          goto: "chase",
        },
        {
          id: "back-down",
          keywords: ["tamam", "ozur", "pardon", "kusura bakma", "sakin", "yanlis anladin", "sakin ol", "abi dur"],
          text:
            "» Tamam abi tamam, sakin.\nEllerini kaldırdın.\nKeko'nun eli cepte durdu. Çıkmadı. Girmedi de.\n— Şimdi oldu. Hangi mahallesin sen?",
          goto: "abi",
        },
        {
          id: "attack",
          keywords: ["vur", "yumruk", "tokat", "kafa at", "saldir", "tekme"],
          text:
            "Önce sen davrandın. Yumruğun keko'nun omzuna değdi. Hafifçe.\n" +
            "Keko omzuna baktı. Sonra sana. Sonra tekrar omzuna.\nKedi gözlerini kapattı.",
          ending: "omuz",
        },
        {
          id: "call-remzi",
          keywords: ["remzi", "bakkal", "kepenk", "yardim"],
          text:
            "» Remzi abi!\nKepenk tamamen indi. Remzi abi bu mahallede 30 yıldır bakkal. Hayatta kalmayı biliyor.",
        },
      ],
      fallbacks: [
        "Keko'nun eli hâlâ cebinde. Bir şeyi kavradı.",
        "Kedi esnedi. Keko esnemedi.",
      ],
      patience: 2,
      patienceIntent: {
        text:
          "Çok düşündün. Keko düşünmedi.\nSallama. Olaylar çok hızlı gelişti. Kıçından bıçaklandın. Keko kaçtı.\n" +
          "Ambulans kırk dakikada geldi. Kedi hâlâ bakıyordu.",
        ending: "sallama",
      },
      hint: "Hızlı ol. Cebine davran, kaç, özür dile... ya da kediye bir bak.",
    },

    abi: {
      hint: "Buralı mısın, misafir misin? Yalan da söyleyebilirsin. Ya da ona abi dememenin bir yolunu bul.",
      intents: [
        {
          id: "polite-again",
          keywords: ["buyur", "buyrun", "efendim", "emret"],
          text:
            "» Efendim abi, buyur abi.\nBaşka bir şey gelmedi aklına.\n" +
            "Keko derin bir nefes aldı.\n— Madem garsonsun, iki çay söyle o zaman.\n" +
            "Kahveye oturdunuz. Dört çay içtiniz. Hesabı sen ödedin.",
          ending: "garson",
        },
        {
          id: "lie-local",
          keywords: ["buraliyim", "bu mahalle", "senin mahalle", "buradan", "burdan", "buranin", "burda oturuyorum", "burada oturuyorum"],
          text:
            "— Buralı mısın? dedi keko. Gözlerini kıstı.\n— Ben 28 yıldır buradayım. Seni hiç görmedim.\n" +
            "Tespihini iki kez çevirdi.\n— Kimlerdensin sen?",
          goto: "kimlerden",
        },
        {
          id: "rival-neighborhood",
          keywords: ["arka mahalle", "asagi mahalle", "yukari mahalle", "karsi mahalle", "ust mahalle", "alt mahalle", "yan mahalle"],
          text:
            "Keko'nun tespihi durdu.\n— Oralı mısın sen?\nBir süre sessizlik. Uzaklarda bir köpek havladı.\n" +
            "— O mahalleyle aramız limonidir gardaş. 2009'daki maçtan beri.\n» Hangi maç?\n— Sen bilmezsin.\n" +
            "Bir adım yaklaştı.\n— Kimlerdensin sen oralarda?",
          goto: "kimlerden",
        },
        {
          id: "stranger",
          keywords: ["misafir", "disaridan", "uzaktan", "yolumu kaybettim", "kayboldum", "gecerken", "buralı degilim", "burali degilim", "baska mahalle"],
          text:
            "» Misafirim abi, geçiyordum.\nKekonun yüzü bir anda yumuşadı.\n— Misafir başımızın tacıdır gardaş. Nereye gidiyon?\n" +
            "Seni durağa kadar götürdü. Otobüse bindirdi. Kartı da o bastı.",
          ending: "rehber",
        },
        {
          id: "other-title",
          whole: true,
          keywords: ["tamam kanka", "tamam kardes", "tamam gardas", "kanka", "kardes", "kardesim", "gardas", "hocam", "reis", "dayi", "bro", "birader", "kral"],
          text:
            "» Tamam kardeş.\n— Kardeş mi? Abi olmadı kardeş mi oldum şimdi?\n" +
            "Hitap konusunda uzlaşamadınız. Sallama çıktı.",
          ending: "hitap",
        },
      ],
      inherits: "start",
      acceptAny: [
        { text: "— {input} {mi}? dedi keko. Orayı bilirim.\nÇekirdeğini tükürdü.\n— Kimlerdensin sen oralarda?", goto: "kimlerden" },
        { text: "— {input}... Orası neresi lan? Haritada yok öyle bi yer.\nTespih hızlandı.\n— Neyse. Kimlerdensin sen?", goto: "kimlerden" },
      ],
      fallbacks: [
        "— Soruma cevap ver gardaş. Hangi mahallesin?",
        "Keko başını yana eğdi.\n— Buralı mısın, değil misin? Basit soru.",
        "— Lafı dolandırma. Nerelisin sen?",
      ],
    },

    // "Kimlerdensin?" Whatever name the player gives, keko reacts to it.
    kimlerden: {
      hint: "Bir isim söyle. Uydurabilirsin de. Ya da kimsen olmadığını...",
      intents: [
        {
          id: "nobody",
          keywords: ["kimseden", "kimsem yok", "hic kimse", "kimse", "yalnizim", "yetim", "kimsesiz"],
          text:
            "» Kimsem yok abi.\nKeko bir an durdu. Gözleri doldu.\n" +
            "Telefonundan Müslüm Gürses açtı. Hoparlör cızırdıyor. Kaldırıma oturdunuz, beraber dinlediniz.\n" +
            "Bakkala gidip bir paket çekirdek, iki kola aldı. Kolanın birini sana uzattı.\nÇekirdek kabukları ayağınızın dibinde tepe oldu. Müslüm çalmaya devam ediyor.",
          ending: "muslum",
        },
        {
          id: "keko-family",
          keywords: ["senin annen", "senin kuzen", "senin abin", "sizdenim", "senin akraban", "akrabayiz"],
          text:
            "» Sizdenim abi, akrabayız ya.\nKeko düşündü. Uzun uzun düşündü. Annesini aradı.\n" +
            "— Anne, bizim sülalede böyle biri var mı? ... Var mıymış. Kimin oğluymuş? ... Tamam.\n" +
            "Telefonu kapattı. Sana sarıldı.\n— Bayramda gel eli öpmeye. Annem kızıyo gelmiyon diye.",
          ending: "sulale",
        },
      ],
      inherits: "start",
      acceptAny: [
        {
          text:
            "— {input} {mi}?\nKeko'nun yüzü kızardı.\n— {input} bana 200 lira borçlu! 2017'den beri!\n" +
            "Cüzdanını çıkardın. Aile borcu aileye kalır. İçinde 180 lira vardı. Keko 20'sini de veresiye yazdı.",
          ending: "borc",
        },
        {
          text:
            "— {input}...\nKeko gözlerini kıstı. Belli ki tanımıyor. Tanımadığını da belli etmek istemiyor.\n" +
            "— Haaa, {input}. Tabii tabii. Selam söyle.\nİkiniz de {input} diye birini tanımıyorsunuz. Selam gidecek.",
          ending: "selam",
        },
        {
          text:
            "— {input} {mi}?! Oğlum {input} benim kirvem lan!\nKeko sana sarıldı. Tespihini hediye etti.\n" +
            "Niye baştan söylemediğini sordu. Cevap veremedin. Belki de {input} diye birini sen az önce uydurdun.",
          ending: "kirve",
        },
        {
          text:
            "— {input}...\nKeko'nun tespihi yere düştü. Eğilip almadı.\n— {input} bizim hasımdır.\n" +
            "Telefonu çıkardı, sesli mesaj attı: — Gençler, gelin.\nUzaktan motor sesleri yaklaşıyor. Üç motor. Belki dört.",
          ending: "hasim",
        },
      ],
      fallbacks: ["— Kimlerdensin dedim, gardaş. Bi isim ver."],
    },

    chase: {
      hint: "Koşmaya devam mı, durmak mı? Köşedeki bakkal ya da duraktaki otobüs de bir seçenek.",
      intents: [
        {
          id: "run-faster",
          positive: true,
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
      fallbacks: [
        "Terlik sesi yaklaşıyor.\n— Dur lan! Koşacak mısın, duracak mısın?",
        "Nefesin daralıyor. Köşede bir bakkal var, durakta bir otobüs.\nArkadan: — Dur dedim!",
        "Keko'nun terliğinin biri çıktı. Tek terlikle devam ediyor. Hâlâ yetişiyor.",
      ],
    },

    insist: {
      hint: "Görmezden gelmeye devam edebilir ya da kulaklığını bahane edebilirsin.",
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
            "Kulaklığı gösterdin.\n» Duymadım abi.\nKeko kulaklığı aldı, kulağına taktı. Müzik yok.\n" +
            "Bir süre bakıştınız. Keko kulaklığı geri vermedi. Ama gitti.",
          ending: "kulaklik",
        },
      ],
      inherits: "start",
    },
  },

  common: [
    {
      id: "keep-distance",
      keywords: ["yaklasma", "ote dur", "uzak dur", "geri cekil", "geri dur", "mesafe", "cekil", "dokunma"],
      text: "» Abi öte dur.\n— Öte mi? Burası senin mahallen mi lan?\nKeko yarım adım geri çekildi. Sonra bir adım yaklaştı. Net kâr: yarım adım.\n— Hangi mahallesin sen?",
      goto: "abi",
    },
    {
      id: "speaking-turkish",
      keywords: ["turkce konusuyom", "turkce konusuyorum", "turkce", "anlamiyon mu", "anlamiyor musun", "anlamadin mi"],
      text: "» Türkçe konuşuyom ya abi.\n— Bana laf mı sokuyon sen?\nKeko'nun sol eli yavaşça arka cebine gitti. Sonra geri geldi. Şimdilik.",
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
        "155'i aradın.\n— 155, buyrun.\n» Biri bana hayırdır dedi.\nHat kapandı.\n" +
        "Keko her şeyi duydu. Bir adım daha yaklaştı.",
    },
    mom: {
      text:
        "Anneni aradın, keko duysun diye yüksek sesle.\n» Anne! Ben şimdi mahalledeyim!\n" +
        "— Ekmek aldın mı?\nKapattı. Keko hâlâ orada. Biraz da acıyarak bakıyor.",
    },
  },

  // Every fallback ends with pressure or a question, so the player always knows the ball is in their court.
  fallbacks: [
    "Keko kaşlarını çattı.\n— Ne diyon lan sen? Hayırdır dedim, cevap ver.",
    "Keko bir adım yaklaştı. Sigara kokuyor.\n— Gardaş, bi soru sordum. Hayırdır?",
    "Keko ağzındaki çekirdeği tükürdü.\n— Dilini mi yuttun? Neye bakıyodun?",
    "— Gardaş Türkçe konuş, dedi keko. Ne bakıyon?",
    "Arkadan bir motor geçti. Keko gözünü senden ayırmadı.\n— Bekliyom gardaş.",
    "Keko bir sana baktı, bir ayakkabılarına. Ayakkabıların pahalı değil.\n— Eee? Ne olacak şimdi?",
  ],
  patience: 5,
  patienceIntent: {
    text:
      "Keko'nun telefonu çaldı. Açtı.\n— Efendim anne? ... Tamam anne. ... Tamam aldım, aldım.\n" +
      "Sana son bir kez baktı, gitti.\nAnnesine bir iyilik borçlusun.",
    ending: "kekoanne",
  },
});
