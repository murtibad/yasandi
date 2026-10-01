window.Yasandi = window.Yasandi || {};
window.Yasandi.scenarios = window.Yasandi.scenarios || [];
window.Yasandi.scenarios.push({
  id: "tahtaya-kalk",
  title: "Lisede Bir Ders",

  endings: {
    ispiyoncu: { title: "Yakın Arkadaş", tag: "SATICI" },
    kantin_baskini: { title: "Kantin Baskını", tag: "YAKALANDIN" },
    firar: { title: "Okuldan Firar", tag: "KAÇTIN" },
    disiplin: { title: "Müdürün Odası", tag: "DİSİPLİN" },
    rezil_oldun: { title: "Gereksiz Özgüven", tag: "REZİL OLDUN" },
    uyku: { title: "Tatlı Uykular", tag: "UYANDIN" },
    ucak_savasi: { title: "Uçak Savaşı", tag: "CEZA" },
    oscarlik: { title: "Oscar'lık Performans", tag: "AMBULANS" },
    sifir: { title: "Anlamsız Sayılar", tag: "SIFIR" },
    temizlik_kolu: { title: "Temizlik Kolu", tag: "SİLDİN" },
    zil_kurtardi: { title: "Zil Sesi", tag: "KURTULDUN" },
    itiraf_etti: { title: "İlan-ı Aşk", tag: "AŞIK" },
    kopya_kurbani: { title: "Yanlış Fısıltı", tag: "SAYISALCI" }
  },

  nodes: {
    start: {
      hint: "Sınıftaki o kişinin adını yaz.",
      look: "Matematik öğretmeni Celal bey sınıf defteriyle tahtanın önünde dikiliyor.",
      text: "Lisede son derstesin. Matematik hocası Celal bey elinde sınıf defteriyle girdi. 'Ödevleri göreyim' dedi. Sen ödevi yapmadın! O an ön sıraya kaydı gözün. Sınıfta hep hayal ettiğin, dikkati dağılmasın diye çok sessiz durduğun o kişi oturuyor...\n— Kim oturuyor ön sırada?",
      acceptAny: [
        { text: "» {input}.\nEvet, {input} hemen önünde. Hoca sınıf defterini açtı. Sınıfa sertçe bakıp sordu:\n— Arka sıradan Berkecan yok mu bugün?\nBerkecan senin en yakın arkadaşın ve okuldan kaçtı.", save: "crush", goto: "yoklama" }
      ],
      fallbacks: [
        "Hayalindeki o kişinin adını yaz, uydur bir şeyler."
      ]
    },

    "yoklama": {
      hint: "Arkadaşını ispiyonlayabilir, yalan söyleyebilir veya kantinde olduğunu söyleyebilirsin.",
      look: "Celal bey elinde kalemiyle bekliyor. {crush} dönüp ne diyeceğini dinliyor.",
      text: "",
      freeze: {
        text: "Sustun, hocayla göz teması kurmamaya çalıştın. Hoca 'Neyse, yok yazarız' deyip önüne döndü.",
        goto: "defter"
      },
      intents: [
        {
          id: "tuvalette",
          positive: true,
          keywords: ["tuvalette", "lavaboda", "buradaydi", "icerdeydi"],
          text: "» Tuvalette hocam, az önce buradaydı.\nHoca inanmadı. 'Tuvalet fizanda mı, yirmi dakikadır yok ortada.'",
          goto: "defter"
        },
        {
          id: "kacti",
          positive: true,
          keywords: ["okuldan kacti", "okuldan gitti", "kacti", "kacmis"],
          text: "» Okuldan kaçtı hocam.\nSınıf buz kesti. Yakın arkadaşını ispiyonladın. Sınıfta adın muhbire çıktı, {crush} bile sana ters ters baktı.",
          ending: "ispiyoncu"
        },
        {
          id: "kantinde",
          positive: true,
          keywords: ["kantin", "kantinde", "kantine indi"],
          text: "» Kantinde hocam.\nHoca sinirlendi: 'O zaman git onu bul getir bana!' dedi.",
          goto: "kantin"
        },
        {
          id: "bilmiyorum",
          keywords: ["bilmiyorum", "gormedim", "haberim yok"],
          text: "» Bilmiyorum hocam.\nHoca 'Senin neyden haberin var ki zaten' dedi.",
          goto: "defter"
        }
      ],
      fallbacks: [
        "Hoca 'Cevap ver oğlum, nerede bu çocuk?' diyor."
      ]
    },

    "kantin": {
      hint: "Saklanabilir, sınıfa dönebilir veya kaçabilirsin.",
      look: "Kantin koridoru sessiz. Tost makinesinin kokusu geliyor.",
      text: "Sınıftan çıktın. Tam kantine inecekken koridorda nöbetçi müdür yardımcısını gördün. Adımları sana doğru yaklaşıyor!",
      freeze: {
        text: "Donakaldın. Nöbetçi hoca seni yakaladı. 'Ne geziyorsun derste?' deyip ensenden tutarak sınıfa geri bıraktı. Tam da Celal bey tahtaya kaldıracak birini ararken!",
        goto: "tahta"
      },
      intents: [
        {
          id: "kacis",
          positive: true,
          keywords: ["bahceye", "okuldan kacarim", "kapiya kosarim", "okuldan cikarim"],
          text: "Hemen merdivenlerden atlayıp okul kapısından firar ettin! Özgürsün ama devamsızlığın sınırda.",
          ending: "firar"
        },
        {
          id: "tuvalet",
          positive: true,
          keywords: ["tuvalet", "lavabo", "cesme"],
          text: "Hızla yön değiştirip tuvaletlere daldın.",
          goto: "cesme"
        },
        {
          id: "saklan",
          positive: true,
          keywords: ["saklanirim", "kapi arkasi", "mermer", "yangin tupu"],
          text: "Yangın tüpünün arkasına saklandın ama bacağın sığmadı. Müdür yardımcısı seni bulup doğrudan disiplin kuruluna sevk etti.",
          ending: "disiplin"
        },
        {
          id: "geri_don",
          positive: true,
          keywords: ["sinifa donerim", "geri donerim", "sinifa kacarim"],
          text: "Koşarak sınıfa döndün. Kapıyı sessizce açıp yerine oturdun.",
          goto: "defter"
        }
      ],
      fallbacks: [
        "Nöbetçi hızla yaklaşıyor, bir yere girmezsen yakalanacaksın!"
      ]
    },

    "defter": {
      hint: "Su içmeye izin isteyebilir, sıranın altına eğilebilir veya uyuyabilirsin.",
      look: "Tahtada inanılmaz uzun bir integral sorusu var.",
      text: "Celal bey sınıf defterinde parmağını gezdiriyor. 'Bakalım tahtadaki o zor integrali kim çözecek...'\n{crush} arkasına dönmüş, korkuyla sana bakıyor. Ödev yok, soru zor!",
      freeze: {
        text: "Nefesini tuttun. Hoca parmağını isminde durdurdu. Tam adını söyleyecekken...",
        goto: "ucak"
      },
      intents: [
        {
          id: "su_icme",
          positive: true,
          keywords: ["su icmeye", "izin isterim", "lavaboya gitmek"],
          text: "» Hocam su içebilir miyim?\nHoca 'Git, ama gelince tahtaya sen kalkıyorsun' dedi.",
          goto: "cesme"
        },
        {
          id: "saklan",
          positive: true,
          keywords: ["saklanirim", "sira altina", "egilirim", "kafa gomerim"],
          text: "Sıranın altına iyice eğildin. Hoca tam 'O sıranın altında kim var?' diyecekken...",
          goto: "ucak"
        },
        {
          id: "cesaret",
          positive: true,
          keywords: ["ben kalkarim", "parmak kaldiririm", "ben cozerim", "tahtaya cikarim"],
          text: "» Ben çözerim hocam!\nBüyük cesaretle parmak kaldırdın. Tahtaya çıkıp kalemi aldın ama tek yaptığın boş boş bakmaktı. Herkes sana güldü.",
          ending: "rezil_oldun"
        },
        {
          id: "uyu",
          positive: true,
          keywords: ["uyuma numarasi", "uyurum", "siraya yatarim"],
          text: "Kafayı sıraya koyup uyuma numarası yaptın. Hoca hedef şaşmaz tebeşir fırlatma yeteneğiyle kafana tebeşiri yapıştırdı!",
          ending: "uyku"
        }
      ],
      fallbacks: [
        "Hoca isim arıyor. Görünmez olmaya mı çalışacaksın, yoksa bir şey mi yapacaksın?"
      ]
    },

    "cesme": {
      hint: "Suyu içip dönebilir, kaçabilir veya kantine inebilirsin.",
      look: "Eski seramik lavabolar ve aynada bitkin yüzün.",
      text: "Çeşmenin başındasın ama sular kesik. Celal bey sınıfta seni bekliyor, tahtaya kalkacaksın.",
      freeze: {
        text: "Sessizce beklerken nöbetçi öğrenci gelip seni sınıfa yolladı. Kaçış yok, doğru tahtaya.",
        goto: "tahta"
      },
      intents: [
        {
          id: "suyu_ic",
          positive: true,
          keywords: ["cesmeden ic", "sise", "beklerim", "sinifa donerim"],
          text: "Mecburen sınıfa döndün. Kapıdan girer girmez hoca kalemi uzattı.",
          goto: "tahta"
        },
        {
          id: "kacis",
          positive: true,
          keywords: ["kacarim", "eve giderim", "okuldan kacis"],
          text: "Çantanı bile almadan okuldan firar ettin. Yok yazılmak rezil olmaktan iyidir.",
          ending: "firar"
        },
        {
          id: "kantin_in",
          positive: true,
          keywords: ["kantin", "kantine giderim"],
          text: "Kantine indin. Tam çayını yudumlarken müdür yardımcısı ensende bitti.",
          ending: "kantin_baskini"
        }
      ],
      fallbacks: [
        "Zaman geçiyor. Su akmıyor. Ne yapacaksın?"
      ]
    },

    "ucak": {
      hint: "Uçağı açıp okuyabilir, geri fırlatabilir veya çantana atabilirsin.",
      look: "Yerde beyaz bir kağıt uçak duruyor. Celal beyin kaşları çatık.",
      text: "Arka sıradan kafana sivri bir kağıt uçak çarptı. Sınıf kıkırdadı. Hoca anında döndü:\n— Kim attı o uçağı?",
      freeze: {
        text: "Ses çıkarmadın. Hoca 'Madem atan yok, uçağın indiği yer kalkar tahtaya. Gel yavrum' diyerek seni seçti.",
        goto: "tahta"
      },
      intents: [
        {
          id: "oku",
          positive: true,
          keywords: ["kagidi okurum", "ucagi acarim", "ne yaziyor"],
          text: "Uçağı açtın. İçinde hocanın komik bir karikatürü çizilmişti! Celal bey elinden alıp baktı ve rengi değişti.",
          ending: "disiplin"
        },
        {
          id: "geri_at",
          positive: true,
          keywords: ["geri firlatirim", "arkaya atarim", "ucagi atarim"],
          text: "Uçağı alıp arka sıraya var gücünle fırlattın. Hoca delirdi. Derste havada uçak savaşı başlattığın için uzaklaştırma aldın.",
          ending: "ucak_savasi"
        },
        {
          id: "ispiyon",
          positive: true,
          keywords: ["ispiyonlarim", "arkadan attilar", "okan atti", "soylerim"],
          text: "» Arkadan Okan attı hocam!\nHoca 'Sana sormadım! Hem uçak uçuruyor hem ispiyonluyor, geç tahtaya!' diyerek seni kaldırdı.",
          goto: "tahta"
        },
        {
          id: "gizle",
          positive: true,
          keywords: ["cantama", "gizlerim", "burustururum", "yirtarim", "saklarim"],
          text: "Kağıdı hızla buruşturup çantana attın ama hoca o hareketi gördü. 'Ne saklıyorsun sen orada? Çık tahtaya!'",
          goto: "tahta"
        }
      ],
      fallbacks: [
        "Hoca cevap bekliyor. Kağıt uçağa ne yapacaksın?"
      ]
    },

    "tahta": {
      hint: "Rastgele bir şeyler karalayabilir, kopya isteyebilir veya tahtayı tamamen silebilirsin.",
      look: "Önünde kocaman, bomboş yeşil bir tahta. Sınıftaki 30 çift göz sana bakıyor.",
      text: "Tahtanın önündesin. Elinde tebeşir, tahtada anlamsız sayılar var. {crush} sana gülümsüyor, bütün sınıf seni izliyor. Ne yapacaksın?",
      freeze: {
        text: "Hiçbir şey yazmadın. Derin bir sessizlik. Tam hoca ağzını açıp notunu verecekken...\nZİL ÇALDI! Hoca 'Zil hayatınızı kurtardı' deyip çıktı.",
        ending: "zil_kurtardi"
      },
      intents: [
        {
          id: "bayil",
          positive: true,
          keywords: ["bayilma numarasi", "bayilirim", "kendimi atarim"],
          text: "Gözlerini devirip kendini yere attın. Sınıf paniğe kapıldı, ambulans geldi. Hoca o günden sonra sana hep acıyarak baktı.",
          ending: "oscarlik"
        },
        {
          id: "salla",
          positive: true,
          keywords: ["rastgele", "karalarim", "sallarim", "formulu yazarim", "bir seyler yazarim"],
          text: "Tahtaya rastgele x'ler y'ler yazdın. Hoca 'Bu ne oğlum, Çince mi?' dedi, herkes güldü. Sözlü notun koca bir sıfır.",
          ending: "sifir"
        },
        {
          id: "sil",
          positive: true,
          keywords: ["tahtayi silerim", "temizlerim", "silgiyle"],
          text: "Nöbetçi öğrenci refleksinle silgiyi alıp tahtadaki tüm soruyu tertemiz sildin. Hoca küplere bindi.",
          ending: "temizlik_kolu"
        },
        {
          id: "kopya",
          positive: true,
          keywords: ["kopya cekerim", "yardim isterim", "fisildayin", "sinifa bakarim"],
          text: "» Gençler neydi bu?\nArka sıradan '52 yaz' diye fısıldadılar. Kocaman 52 yazdın. Hoca 'Yarıçap nasıl 52 santim olsun?' dedi.",
          ending: "kopya_kurbani"
        },
        {
          id: "itiraf",
          positive: true,
          keywords: ["itiraf ederim", "kalp cizerim", "seni seviyorum", "ilan"],
          text: "Matematik sorusu yerine tahtaya koca bir kalp çizip içine {crush} yazdın. Hoca şokta, sınıf yıkılıyor!",
          ending: "itiraf_etti"
        }
      ],
      fallbacks: [
        "Elindeki tebeşirle öylece bekleyemezsin. Yazacak mısın, silecek misin?"
      ]
    }
  },

  fallbacks: [
    "Okul kurallarına pek uymuyor. Mantıklı bir şey yap.",
    "Bütün sınıf seni bekliyor, daha net bir şey söyle."
  ]
});
