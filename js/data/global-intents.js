// Intents that work in every scenario. A scenario can override any of them by id (see scenarios/keko.js).
// Each intent: { id, keywords, text, goto?, ending? }
// text: a string, or an array of strings (one is picked at random). Use \n for a new paragraph.
window.Yasandi = window.Yasandi || {};
window.Yasandi.globalIntents = [
  {
    id: "help",
    keywords: ["?", "ipucu", "nasil oynanir", "ne yapabilirim", "komutlar"],
    text: "Ne yapacaksan düz Türkçe yaz. Konuşabilir, kaçabilir, özür dileyebilir, yalan söyleyebilirsin. Oyun her şeyi anlamaz ama anladığında pişman olursun.",
  },
  {
    id: "weapon",
    keywords: ["bicak", "sallama", "silah", "tabanca", "caki", "satir", "sustali"],
    text: "Cebini yokladın. Anahtar, market fişi ve eski bir sakız çıktı. Silah falan yok. Burası film değil.",
  },
  {
    id: "police",
    keywords: ["polis", "155", "karakol", "bekci", "jandarma"],
    text: "155'i aradın. Müzik çalıyor. Tahmini bekleme süresi 14 dakika.",
  },
  {
    id: "mom",
    keywords: ["anne", "annemi ara"],
    text: "Anneni aradın.\n— Oğlum neredesin, ekmek aldın mı?\n» Anne şu an...\n— Gelirken ekmek al.\nKapattı.",
  },
  {
    id: "dance",
    keywords: ["dans", "halay", "oyna", "gobek at", "zeybek"],
    text: "Dans etmeye başladın. Kimse eşlik etmedi. Durdun.",
  },
  {
    id: "money",
    keywords: ["para", "cuzdan", "lira", "rusvet"],
    text: "Cüzdanına baktın. 20 lira ve bir eski sevgilinin vesikalığı. İkisini de geri koydun.",
  },
  {
    id: "faint",
    keywords: ["bayil", "olu taklidi", "yere yat", "yere yigil"],
    text: "Yere yattın. Kimse umursamadı. Kalktın, üstünü silktin.",
  },
  {
    id: "shout",
    keywords: ["imdat", "yardim edin", "bagir", "ciglik"],
    text: "Bağırdın. Balkondan bir teyze baktı.\n— Oğlum gürültü yapmayın, çocuk uyuyo.\nBalkon kapısı kapandı.",
  },
  {
    id: "swear",
    first: true,
    keywords: ["amk", "aq", "siktir", "sikt", "sikerim", "sikeyim", "sikim", "sikik", "anani", "amina", "amcik", "orospu", "yarrak", "pic", "kahpe", "pezevenk", "gavat", "yavsak", "serefsiz", "hassiktir", "salak", "aptal", "gerizekali", "dangalak"],
    text: "Ağzına geleni saydın. İçin rahatladı. Başka hiçbir şey değişmedi.",
  },
  {
    id: "pray",
    keywords: ["dua et", "besmele", "allahim"],
    text: "İçinden dua ettin. Bu gece için iyi bir fikir.",
  },
];
