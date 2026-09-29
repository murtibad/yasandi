window.Yasandi = window.Yasandi || {};
window.Yasandi.scenarios = window.Yasandi.scenarios || [];
window.Yasandi.scenarios.push({
  id: "misafirlik",
  title: "Bi Tabak Daha",

  endings: {
    tepsi: { title: "Nebahat Teyze İlk Defa Sustu", tag: "BÜTÜN TEPSİ" },
    kumanda: { title: "Kumandayı Bulan Çocuk", tag: "KAHRAMAN" },
    saksi: { title: "Saksı Cinayeti", tag: "ZİYAN" },
    kedi: { title: "Kedinin İhaneti", tag: "YAKALANDIN" },
    kilo: { title: "Gözde Misafir", tag: "ŞİŞTİN" },
    anne: { title: "Anneye Şikayet", tag: "AZAR" },
    kuzen: { title: "Yeme Yarışı", tag: "REKOR" },
    diyet: { title: "Diyet Menüsü", tag: "KALORİ" },
    paket: { title: "Zorunlu Yolluk", tag: "PAKETLENDİN" },
    tatli: { title: "Daha Tatlı Vardı", tag: "TATLI KRİZİ" },
    corba: { title: "Şifa Niyetine", tag: "ÇORBA" },
    kacis: { title: "Terk Ediş", tag: "FİRAR" },
    cemil: { title: "Amca Uykuda", tag: "FIRÇA" },
    bekleyis: { title: "Mutfak Nöbeti", tag: "AÇLIK" },
    cop: { title: "Çöp Operasyonu", tag: "GÜNAH" },
    pes_ettin: { title: "Beyaz Bayrak", tag: "PES ETTİN" },
    cep: { title: "Cepte Sarma", tag: "YAKALANDIN" },
    kuzenin_payi: { title: "Kuzenin Payı", tag: "KURTULDUN" },
    gozyasi: { title: "Gözyaşı Diplomasisi", tag: "KURTULDUN" },
    kirik_kalp: { title: "Yolluk Reddedilmez", tag: "DARILDI" },
    baston: { title: "Bastonlu Amca", tag: "KOVALANDIN" },
    gobek: { title: "Göbek Havası", tag: "ŞİŞTİN" },
  },

  nodes: {
    start: {
      look: "Salonun köşesinde koca bir saksı var. Masanın altında bir kedi dolaşıyor. Önünde peçete, cebin boş. Mutfağın kapısı aralık, çöp kovası orada. Kapı ise çok uzakta.",
      hint: "Tabak kendi kendine boşalmayacak. Yemek de bir yol, yememek de. Bu evde saklanacak yer de çok.",
      text:
        "Bayram ziyareti, Nebahat teyzenin evi.\n" +
        "Öğlen sağlam yedin, üstüne iki çay içtin. 'Tokum teyze' dedikçe önündeki tabak doldu.\n" +
        "Şu an önünde kocaman bir tabak sarma, üç koca dilim börek ve kenarda kısır var.\n" +
        "Cemil amca televizyon karşısında uyukluyor.\n" +
        "Nebahat teyze gözlerini sana dikti:\n" +
        "— Hadi yavrum, niye yemiyosun, soğutma.",
      intents: [
        {
          id: "hide-plant",
          positive: true,
          keywords: ["saksi", "saksiya", "cicek", "cicege", "toprak", "gizlice gom"],
          text:
            "Nebahat teyze arkasını döndüğünde sarmaları gizlice salonun köşesindeki dev saksıya gömdün.\n" +
            "Üç gün sonra o nadide salon bitkisi sarımsak zehirlenmesinden öldü.",
          ending: "saksi",
        },
        {
          id: "hide-cat",
          positive: true,
          keywords: ["kedi", "kediye", "masa alti", "masanin alti"],
          text:
            "Masanın altındaki kediye çaktırmadan bir parça börek uzattın.\n" +
            "Kedi böreği kokladı, yüzünü buruşturup 'Miyav' diyerek Nebahat teyzeye şikayet etti.\n" +
            "Yakalandın.",
          ending: "kedi",
        },
        {
          id: "hide-pocket",
          positive: true,
          keywords: ["pecete", "peceteye", "cebime", "cebe", "cantaya", "sakla", "sakliyorum", "saklamak"],
          text:
            "Nebahat teyze çay koymaya gittiğinde iki sarmayı peçeteye sarıp cebine attın.\n" +
            "Akşam annen çamaşır makinesini açtı. Makineden zeytinyağlı bir koku yükseldi.\n" +
            "— Bu ne oğlum? Sen teyzenin sarmasını mı sakladın?\nAnnen Nebahat teyzeyi aradı. İki aile arasında soğuk savaş başladı.",
          ending: "cep",
        },
        {
          id: "eat",
          positive: true,
          keywords: ["yemek", "yiyorum", "yerim", "yicem", "yiyecem", "yiyicem", "tamam yiyorum", "basla", "atistir", "yiyecegim", "catal", "kasik", "agzima", "isir", "bi sarma", "bir sarma"],
          text:
            "Çatalı alıp zorla bir sarma attın ağzına.\n" +
            "Sen yutkunmaya çalışırken Nebahat teyze sevinçle mutfaktan döndü:\n" +
            "— Bak, pilav da koydum yanına, susuz gitmez o. Yiyiver güzüm.",
          goto: "more-food",
        },
        {
          id: "refuse",
          keywords: ["tokum", "yeter", "doydum", "yiyemem", "yemiyorum", "yemiycem", "yemicem", "yemem", "istemiyorum", "sag ol", "sagol", "tesekkur", "istemem", "kalsin", "yok"],
          text: [
            "Teyze gerçekten çok tokum, ellerine sağlık.\n" +
            "Nebahat teyze gözlerini kıstı:\n" +
            "— Hasta mısın sen? Rengin de soluk senin. Büyüme çağındasın, yemen lazım.",
            "Vallahi yer kalmadı teyzem, patlayacağım.\n" +
            "— Patlamazsın patlamazsın, bir tanecik daha al hadi.",
            "Teyze cidden yiyemem artık, nefes alamıyorum.\n" +
            "— Aşk olsun, benim sarmamı beğenmedin mi yoksa?"
          ],
          goto: "escalation-1",
        },
        {
          id: "diet",
          positive: true,
          keywords: ["diyet", "diyetteyim", "kilo", "zayiflama", "rejim"],
          text:
            "Teyze ben diyetteyim, vallahi yiyemem.\n" +
            "Nebahat teyze güldü: — Ne diyeti yavrum bayram günü! Dur sana zeytinyağlı diyet sarması getireyim.\n" +
            "Önüne yarım kilo daha sarma koydu.",
          ending: "diyet",
        },
        {
          id: "stomach",
          keywords: ["midem", "agriyor", "mide", "bulaniyor", "rahatsiz", "hastayim", "hasta", "bulanmis"],
          text:
            "Midem biraz rahatsız teyze, yemesem iyi olacak.\n" +
            "Nebahat teyze telaşlandı: — Vah yavrum! Üşüttün sen kesin.\n" +
            "Mutfaktan koca bir tencere nane limon ve üç kase şehriye çorbasıyla geldi.",
          ending: "corba",
        },
        {
          id: "more",
          positive: true,
          keywords: ["tabak", "daha ver", "cok acim", "hepsini yerim", "koy teyze", "getir"],
          text:
            "Teyze bunlar kesmez, bana bi tabak daha koy!\n" +
            "Nebahat teyze sevinç çığlığı attı. O gün tartıda tam 3 kilo aldın ama gözde misafir oldun.",
          ending: "kilo",
        },
        {
          id: "leave",
          positive: true,
          keywords: ["kalkalim", "gidelim", "gitmek", "musade", "kalk", "veda", "gitme"],
          text:
            "Bize müsaade teyze, daha gidecek yerler var.\n" +
            "Nebahat teyze anında mutfağa koştu.",
          goto: "escape-attempt",
        }
      ]
    },

    "more-food": {
      hint: "Pilav tepesi büyüyor. Salonda sana yardım edebilecek biri var mı?",
      intents: [
        {
          id: "eat-again",
          positive: true,
          keywords: ["yemek", "yiyorum", "yemeye devam", "bitir", "kalanini"],
          text:
            "Boğulma tehlikesi atlatarak pilavı da yemeye başladın.\n" +
            "O sırada yan koltuktaki kuzen geğirdi:\n" +
            "— Ben dördüncü tabağı bitirdim teyze!\n" +
            "Nebahat teyze sana dönüp: — Bak elin çocuğu nasıl yiyor, sen niye mızmızlanıyorsun?",
          goto: "cousin-competition",
        },
        {
          id: "refuse-angry",
          keywords: ["tokum", "yeter", "doydum", "yiyemem", "bitti", "patladim", "catladim", "begenmedim", "istemiyorum"],
          text:
            "Teyze yeter cidden, patlayacağım şimdi!\n" +
            "Nebahat teyze bozuldu:\n" +
            "— Beğenmedin herhalde yemeklerimi. Benim kısırım meşhurdur oysa...",
          goto: "escalation-2",
        },
        {
          id: "ask-amca",
          positive: true,
          keywords: ["amca", "cemil", "yardim et", "amcaya", "uyandir"],
          text:
            "Cemil amca, bir şey desene sen de.\n" +
            "Cemil amca tek gözünü açtı: — Yesene oğlum önündekini, nimet o nimet.\n" +
            "Geri uyudu.",
          ending: "cemil",
        }
      ],
      inherits: "start",
      fallbacks: [
        "Tabaktaki pilav dağ gibi büyüdü. Bir hamle yapacak mısın?",
        "Teyze elinde kepçeyle başında bekliyor. Yiyecek misin?",
      ],
      patience: 3,
      patienceIntent: {
        text:
          "Sen ekrana boş boş bakarken Nebahat teyze ağzına bir lokma sarma tıktı.\n" +
          "— Aç ağzını, uçak geliyooor!",
        ending: "pes_ettin",
      },
    },

    "escalation-1": {
      hint: "Teyze hasta olduğuna emin. İkna et ya da oyna.",
      intents: [
        {
          id: "not-sick",
          keywords: ["hastasi", "hasta degilim", "iyiyim", "saglamim", "sorun yok"],
          text:
            "Hasta falan değilim teyze, sadece tokum!\n" +
            "Nebahat teyze cık cık yaptı:\n" +
            "— Annen yedirmiyo mu sana evde? Çöp gibi kalmışsın.",
          goto: "escalation-2",
        },
        {
          id: "call-mom-threat",
          positive: true,
          keywords: ["annem", "anne", "anneme", "ara", "telefon", "arama"],
          text:
            "Annem çok iyi yediriyor merak etme!\n" +
            "Nebahat teyze hemen telefona sarıldı: — Dur bi anneni arayayım da gör.",
          ending: "anne",
        }
      ],
      inherits: "start",
      fallbacks: [
        "— Rengin soluk diyorum, hasta mısın sen?",
        "Teyze ateşine bakmak için elini alnına uzatıyor. Ne yapacaksın?",
      ]
    },

    "escalation-2": {
      hint: "Teyze darılmak üzere. Gönlünü almanın bir yolu olmalı.",
      intents: [
        {
          id: "praise",
          positive: true,
          keywords: ["begen", "cok guzel", "eline saglik", "enfes", "harika", "lezzetli", "bayildim", "sevdim"],
          text:
            "Yok teyzecim, hepsi harika olmuş ellerine sağlık.\n" +
            "Nebahat teyze hemen yumuşadı, gözleri parladı:\n" +
            "— Madem öyle söyle bakalım, en çok hangi yemeğimi seviyon sen?",
          goto: "favorite-food",
        },
        {
          id: "mom-feeds",
          keywords: ["yediriyo", "yediriyor", "annem iyi", "annem cok", "evde yiyorum"],
          text: [
            "— Yediriyosa niye böyle çöp gibisin? Dur bi soralım.\nNebahat teyze telefonu kaptı, hoparlörü açtı.\n— Ayten, bu çocuk bizde bi şey yemiyo. Evde de mi böyle?\nAnnenin sesi salonda yankılandı: — Ye oğlum! Rezil etme beni!",
          ],
          ending: "anne",
        },
        {
          id: "cry",
          positive: true,
          keywords: ["agla", "aglamak", "gozyasi", "pes et", "teslim", "yapma", "yalvar"],
          text:
            "Teyze ne olur yapma, gerçekten yiyemiyorum...\nGözlerin doldu.\n" +
            "Nebahat teyze bir an durdu. — Aman iyi be, dedi, tabağı önünden aldı.\nİki dakika sonra meyve tabağıyla geri geldi.",
          ending: "gozyasi",
        }
      ],
      inherits: "start",
      fallbacks: [
        "Nebahat teyze darıldı darılacak. Bir şeyler söyle.",
        "Kuzen yemeğe devam ediyor, seninki duruyor. Bir bahane bul.",
      ]
    },

    "cousin-competition": {
      hint: "Kuzen rekor peşinde. Rakip mi olacaksın, müttefik mi?",
      intents: [
        {
          id: "race",
          positive: true,
          keywords: ["yaris", "kapis", "ben de", "daha cok", "hizli ye", "yarisalim", "kuzen", "gecerim"],
          text:
            "Ver teyze ver, ben onu geçerim!\n" +
            "Nebahat teyze gaza geldi, tencereleri masaya indirdi.\n" +
            "3 saat süren yeme yarışı sonucunda ikiniz de mide fesadı geçirdiniz.",
          ending: "kuzen",
        },
        {
          id: "praise-cousin",
          positive: true,
          keywords: ["masallah", "helal", "afiyet olsun", "yarasin", "kuzen yesin", "ona ver"],
          text:
            "Maşallah, yarasın kuzenime. Kalanı da o yesin teyze.\n" +
            "Teyze 'Haklısın büyüme çağında' diyip senin tabağı da ona boşalttı.\nKuzen sana minnetle baktı. Sen ona daha minnetle baktın.",
          ending: "kuzenin_payi",
        }
      ],
      inherits: "start",
      fallbacks: [
        "Kuzen 5. tabağa geçmek üzere. Bir şey yapacak mısın?",
        "Teyze gururla kuzene bakıyor. Sessiz mi kalacaksın?",
      ]
    },

    "favorite-food": {
      hint: "En sevdiğin yemeği söyle (örn: mantı, köfte, makarna).",
      acceptAny: [
        {
          text:
            "— {input} {mi}? Dur hemen yapıyım güzüm, yarım saatlik iş.\n" +
            "Nebahat teyze önlük takıp mutfağa daldı. Sen salonda tabağınla baş başa kaldın.",
          goto: "waiting-food",
        }
      ],
      inherits: "start",
      fallbacks: [
        "— Hadi yavrum, çekinme söyle. En çok neyi seversin?",
        "— Hangi yemeği yapayım sana?",
      ]
    },

    "waiting-food": {
      hint: "Teyze mutfakta. Salonda yalnızsın. Fırsat bu fırsat.",
      intents: [
        {
          id: "trash",
          positive: true,
          keywords: ["cop", "cope", "dokmek", "tuvalete", "dokuyorum", "doktum"],
          text:
            "Teyze mutfaktayken tabağındaki her şeyi sessizce çöp kovasının en dibine gömdün.\n" +
            "Kocaman bir günah işledin ama kurtuldun.",
          ending: "cop",
        },
        {
          id: "run-fast",
          positive: true,
          keywords: ["kac", "firlat", "git", "kapiya", "ayakkabi", "tuy", "kaciyorum"],
          text:
            "Teyze içerideyken usulca kapıya süzüldün.\n" +
            "Ayakkabılarını bile giymeden çoraplarla merdivenlerden aşağı koşarak uzaklaştın.",
          ending: "kacis",
        }
      ],
      inherits: "start",
      fallbacks: [
        "Mutfaktan soğan kavurma sesleri geliyor. Bir hamle yap.",
        "Cemil amca horlamaya başladı. Tabağın hala dolu. Karar ver.",
      ],
      patience: 3,
      patienceIntent: {
        text:
          "Sen beklerken uyuyakaldın.\n" +
          "Uyandığında önüne yeni pişmiş devasa bir sofra kurulmuştu.",
        ending: "bekleyis",
      }
    },

    "escape-attempt": {
      hint: "Paketi kabul edebilir veya reddedebilirsin.",
      intents: [
        {
          id: "take-package",
          positive: true,
          keywords: ["alirim", "kabul et", "paket", "tesekkur", "ver teyze", "gotur", "aliyorum"],
          text:
            "Nebahat teyze elinde üç kat sarılmış naylon poşetle kapıda belirdi.\n" +
            "— Bunları da yolluk yaptım, yolda acıkırsınız.\n" +
            "Zorla eline tutuşturdu.",
          ending: "paket",
        },
        {
          id: "refuse-package",
          keywords: ["istemem", "kalsin", "alma", "gerek yok", "yeter", "istemiyorum"],
          text:
            "Yok teyze sağ ol, elimiz kolumuz dolu.\n" +
            "Nebahat teyzenin gözleri doldu. 'Benim yemeğimi istemiyor musunuz' diye ağlamaya başladı.\nCemil amca uyandı: — Al şunu oğlum, kırma kadını.\nPoşeti aldın. Hem de iki tane.",
          ending: "kirik_kalp",
        }
      ],
      inherits: "start",
      fallbacks: [
        "Teyze elinde paketle kapıda duruyor. Alacak mısın?",
        "— Yavrum yolluk bunlar, al hadi. Ne diyorsun?",
      ],
      patience: 3,
      patienceIntent: {
        text:
          "Sen duraksayınca teyze tepsiyi getirdi:\n" +
          "— Oturun oturun, tatlıya yer vardır ama. Baklava kestim.\n" +
          "Mecburen geri oturdun.",
        ending: "tatli",
      }
    }
  },

  common: [
    {
      id: "whole-tray",
      positive: true,
      keywords: ["hepsini al", "tepsiyi al", "tabagi al", "hepsini yerim", "tamamini al", "tepsiyi kucagima"],
      text:
        "Nebahat teyze baklava tepsisini Cemil amcaya götürürken önünde durdu: — Bi tane al güzüm.\n" +
        "Tepsiyi elinden aldın. Dizine koydun. Hepsini yedin.\n" +
        "Salonda kimse konuşmadı. Nebahat teyze, hayatında ilk defa, sustu. Cemil amca gözünü açtı, tepsiye baktı, gözünü kapattı.\n" +
        "Bu hikâye sonraki beş bayramda bütün sülaleye anlatıldı. Her seferinde tepsi biraz daha büyüdü.",
      ending: "tepsi",
    },
    {
      id: "remote",
      positive: true,
      keywords: ["kumanda", "minderin alti", "minderin altina", "oturdugum yer", "sert bir sey", "altimdaki"],
      text:
        "Minderin altından kumanda çıktı. Bütün akşam onun üstünde oturmuşsun.\n" +
        "Cemil amca uyandı: — Kumanda nerde lan! Bütün ev aramaya başladı.\n" +
        "Çaktırmadan kumandayı sehpanın altına ittin. Beş dakika sonra eğilip 'Buldum!' dedin.\n" +
        "Cemil amca seni alnından öptü. O günden beri bütün bayramlarda kumanda sende. Tabağın da hâlâ dolu.",
      ending: "kumanda",
    },
    {
      id: "sweet",
      positive: true,
      keywords: ["tatli", "tatliya", "baklava", "cay", "cay var mi", "meyve", "karpuz"],
      text:
        "Teyze tatlı falan yok mu, tuzludan içimiz bayıldı.\n" +
        "Teyzenin gözleri parladı:\n" +
        "— Olmaz olur mu güzüm, tatlıya hep yer vardır!\n" +
        "Önüne bir tepsi baklava koydu.",
      ending: "tatli",
    }
  ],

  overrides: {
    swear: {
      text: "Ağzını bozdun.\nCemil amca yerinden bir fırladı, bastonuyla seni kovaladı.",
      ending: "baston",
    },
    police: {
      text:
        "Polisi aradın.\n— 155, buyrun.\nMemur bey, teyzem beni zorla besliyor!\n" +
        "— Teyzenin ellerinden öperiz kardeşim, afiyet olsun.",
      goto: "more-food",
    },
    mom: {
      text:
        "Anneni aradın.\nAnne beni kurtar, patlayacağım.\n" +
        "— Ayıp yavrum, ye teyzenin yaptıklarını, mahcup etme bizi!\n" +
        "Telefon suratına kapandı.",
      ending: "anne",
    },
    dance: {
      text:
        "Ayağa kalkıp oynamaya başladın. Yediklerini eritmeye çalışıyorsun.\n" +
        "Nebahat teyze 'Aman da aman' deyip seninle karşılıklı göbek attı.\nOyun bitince yorulmuşsun diye önüne bir tabak daha koydu.",
      ending: "gobek",
    }
  },

  fallbacks: [
    "Tabağındaki sarmalar sana bakıyor. Bir lokma alacak mısın?",
    "Nebahat teyze nefes almadan seni izliyor. Ne yapacaksın?",
    "Cemil amca uykusunda 'Yesene...' diye mırıldandı. Yiyecek misin?",
    "Zaman geçiyor, tabak küçülmüyor. Bir karar ver.",
    "Cemil amca uykusunda 'kumanda nerde' diye mırıldandı. Oturduğun minderin altında sert bir şey var. Ne yapacaksın?"
  ],
  patience: 6,
  patienceIntent: {
    text:
      "Sen hiçbir şey yapmadan öylece oturdun.\n" +
      "Nebahat teyze 'Elin ayağın tutuldu açlıktan!' deyip sarmaları ağzına zorla tepmeye başladı.",
    ending: "pes_ettin",
  },
});
