window.Yasandi = window.Yasandi || {};
window.Yasandi.scenarios = window.Yasandi.scenarios || [];
window.Yasandi.scenarios.push({
  id: "is-gorusmesi",
  title: "Biz Sizi Ararız",
  
  endings: {
    sizi_arariz: { title: "Klasik Yalan", tag: "ARAMADILAR" },
    baska_pozisyon: { title: "Farklı Departman", tag: "KAYDIRILDIN" },
    asgari_ucret: { title: "Aile Şirketi", tag: "ASGARİ ÜCRET" },
    yegen: { title: "Yeğen Kazandı", tag: "TORPİL" },
    ik_is_ariyor: { title: "İK Da İş Arıyor", tag: "TERSİNE GÖRÜŞME" },
    maas_zaferi: { title: "Yanlışlıkla Zam", tag: "KAZANDIN" },
    kacti: { title: "Tabldot Dehşeti", tag: "KAÇTIN" },
    kovuldun: { title: "Binadan Atıldın", tag: "ATILDIN" },
    patron: { title: "Gözdağı", tag: "YENİ CEO" },
    zoom_sessizlik: { title: "Bağlantı Koptu", tag: "DÜŞTÜN" },
    cay_doktu: { title: "Sakar Aday", tag: "LEKELİ CV" },
    fazla_durust: { title: "Gereksiz Dürüstlük", tag: "ELENDİN" }
  },

  nodes: {
    start: {
      freeze: { text: ["— Bilmiyor musunuz? dedi Burcu Hanım. CV'yi çevirdi, ters tutuyormuş.\n— Hangi ilana başvurdunuz, onu söyleyin yeter. Pozisyon ne?", "Burcu Hanım derin bir nefes aldı.\n— Pozisyonu söylemezseniz başlayamıyoruz. Ne iş için geldiniz?"] },
      hint: "Hangi pozisyon için başvurduğunu söyle (örn: yazılımcı, çaycı, müdür).",
      look: "Beyaz florasanlı dar bir İK odası. Masanın karşısında İK uzmanı Burcu Hanım var.",
      text: "Cam plazanın dördüncü katı. Dar bir toplantı odasında sandalyenin ucunda oturuyorsun. Kira üç aydır gecikmiş, annen sabah \"Hayırlısı olsun evladım, ev sahibine ben bakarım\" diye mesaj atmış. Bu iş lazım.\n" +
            "İnsan Kaynakları'ndan Burcu Hanım, CV'ne ters tutarak bakıyor. Kaşlarını çattı.\n" +
            "— Evet, CV'nizi inceledim. Hangi pozisyon için başvurmuştunuz tam olarak?",
      acceptAny: [
        { text: "» {input} pozisyonu için.\n— Hah, evet! {input}, dedi Burcu Hanım CV'yi düzelterek.\nBu sırada masadaki laptop'tan cızırtılı bir ses geldi. Kamerası kapalı olan Takım Lideri Mert Bey yayına bağlandı.\n— Başlayabiliriz, dedi Mert Bey. Arkadan bebek ağlaması geliyor.", save: "job", goto: "q-5-yil" }
      ],
      fallbacks: [
        "— Hangi pozisyon dediniz? CV'de tam yazmıyor da."
      ]
    },

    "q-5-yil": {
      hint: "Klasik soru: Beş yıl sonra kendini nerede görüyorsun?",
      look: "Burcu Hanım elinde tükenmez kalemle sana bakıyor. Laptop ekranında Mert Bey'in sadece isminin baş harfi var.",
      text: "Burcu Hanım gülümsedi. O meşhur kurumsal gülüş.\n— Peki {job} olarak, beş yıl sonra kendinizi nerede görüyorsunuz?",
      freeze: {
        text: "Sessiz kaldın. Tavana baktın, beş yıl sonrayı hayal ettin.\n— Vizyonunuz genişmiş, dedi Burcu Hanım. Ya da bağlantınız koptu. Neyse, sıradaki soruya geçelim.",
        goto: "q-zayiflik"
      },
      intents: [
        {
          id: "senin-koltugunda",
          positive: true,
          keywords: ["koltugunuzda", "koltugunuz", "yerinizde", "masanizda", "patron", "ceo"],
          text: "» Sizin koltuğunuzda otururken görüyorum.\nBurcu Hanım'ın gülüşü dondu. Laptop'taki Mert Bey güldü: — Özgüvenli aday, severiz. Umarım beni de kovmazsın.",
          goto: "q-zayiflik"
        },
        {
          id: "evde",
          positive: true,
          keywords: ["evde", "yatarak", "zengin", "emekli", "calismiyor", "calismadan"],
          text: "» Çalışmıyor olmayı umuyorum. Evde yatarak zengin olmuş şekilde.\n— Hepimizin hayali, diye mırıldandı Burcu Hanım. Mert Bey'in bebek sesi kesildi, o da iç çekti.",
          goto: "q-zayiflik"
        },
        {
          id: "burada",
          positive: true,
          keywords: ["burada", "sirkette", "sizinle", "kurumda", "yonetici", "basarili", "terfi"],
          text: "» Bu şirkette değer katan bir yönetici olarak.\nBurcu Hanım hızla not aldı. Klasik, sıkıcı ama güvenli bir cevap.",
          goto: "q-zayiflik"
        },
        {
          id: "baska-sirket",
          positive: true,
          keywords: ["baska", "rakip", "yurtdisinda", "avrupada", "yurt disi", "amerika", "kendi sirket", "kendi is", "isimde", "sirketimde"],
          text: "» Kendi şirketimi kurmuş olurum ya da yurt dışında.\nBurcu Hanım kalemini bıraktı. — Biz sizi geçici mi alıyoruz yani? İş etiği nerede?\nToplantı buz gibi oldu.",
          goto: "q-zayiflik"
        },
        {
          id: "laptop-kapat",
          positive: true,
          keywords: ["laptopi", "kapat", "bilgisayari", "ekrani", "merti"],
          text: "» Beş yıl sonrasını bilemem ama şu anı biliyorum.\nUzanıp masadaki laptop'ın kapağını kapattın. Mert Bey'in sesi kesildi.\nBurcu Hanım şok içinde güvenliği aradı.",
          ending: "zoom_sessizlik"
        }
      ],
      fallbacks: [
        "Burcu Hanım kalemiyle ritim tutuyor. — Beş yıl sonra nerede görüyorsunuz kendinizi?",
        "Mert Bey yayından: — Sesiniz gelmiyor galiba?"
      ],
      patience: 3,
      patienceIntent: {
        text: "Sen konuşamadan kapı pat diye açıldı. CEO'nun yeğeni Berkcan içeri girdi.\n— Burcu abla benim masa hazır mı?\nBurcu Hanım sana döndü: — Biz sizi ararız. Kapı sağda.",
        ending: "yegen"
      }
    },

    "q-zayiflik": {
      hint: "En büyük zayıflığını söyle. Çok çalışmak gibi klişeler veya dürüst yanıtlar verebilirsin.",
      look: "Berkcan (CEO'nun yeğeni) köşedeki pufa yayıldı, telefonuyla oynuyor. Burcu Hanım dosyana bakıyor.",
      text: "Tam o sırada kapı açıldı. Elinde kahvesiyle CEO'nun yeğeni Berkcan içeri girip köşedeki pufa oturdu. Seni umursamadı bile.\nBurcu Hanım boğazını temizledi:\n— Peki, en büyük zayıflığınız nedir?",
      freeze: {
        text: "Yine sustun. Burcu Hanım gülümsedi: — Anlıyorum, iletişim zayıflığı. Notumu aldım.",
        goto: "q-neden-ayrildin"
      },
      intents: [
        {
          id: "mukemmeliyetci",
          positive: true,
          keywords: ["mukemmeliyetciyim", "mukemmel", "mukemmeliyet", "cok caliskanim", "is koligim", "detayciyim", "titizim"],
          text: "» Mükemmeliyetçiyim, işimi bitirmeden uyuyamam.\nBerkcan pufundan güldü: — Aga bu lafı 2012'de bıraktılar ya.\nBurcu Hanım ters ters Berkcan'a baktı ama notunu aldı.",
          goto: "q-neden-ayrildin"
        },
        {
          id: "durust",
          positive: true,
          keywords: ["tembelim", "uykucu", "gec kalirim", "sinirli", "cabuk", "sikilirim", "tahammulsuz", "kavga"],
          text: "» Biraz tembelim. Çok çabuk sıkılırım.\nMert Bey yayından konuştu: — Sonunda dürüst biri! Ama bizde köle gibi çalışman lazım.\nBurcu Hanım 'Fazla dürüst' diye not aldı.",
          ending: "fazla_durust"
        },
        {
          id: "hayir-diyemem",
          positive: true,
          keywords: ["hayir diyemem", "yardimseverim", "diyemem", "iyi niyet"],
          text: "» İnsanlara hayır diyemiyorum, herkesin işine koşarım.\nBurcu Hanım'ın gözleri parladı: — Harika. Biz de tam her işe koşacak {job} arıyorduk.",
          goto: "q-neden-ayrildin"
        },
        {
          id: "yok",
          positive: true,
          keywords: ["zayifligim", "zayiflik", "kusursuzum", "mukemmelim"],
          text: "» Zayıflığım yok, kusursuzum.\nBerkcan kafasını kaldırdı: — Kral özgüvene bak! Ben bunu sevdim Burcu abla, alalım bunu.\nBurcu Hanım derin bir nefes aldı.",
          goto: "q-neden-ayrildin"
        },
        {
          id: "agresif",
          positive: true,
          keywords: ["agresif", "bagiririm", "masaya", "vururum", "toksik", "sinirliyim"],
          text: "» Biraz agresifim. Bir şey ters giderse masaya yığıp bağırırım.\nBurcu Hanım korkuyla geri çekildi. Berkcan ayaklandı.\n— Sen tam bir CEO materyalisin amca, diye kekeledi Berkcan.",
          ending: "patron"
        }
      ],
      fallbacks: [
        "Burcu Hanım bekliyor. — Bir tane zayıflığınız olmalı?",
        "Berkcan: — Abi bi şey salla geç işte, ben öyle işe girdim."
      ]
    },

    "q-neden-ayrildin": {
      hint: "Eski işinden neden ayrıldığını açıkla.",
      look: "Burcu Hanım kağıda bir şeyler çiziktiriyor. Mert Bey'in mikrofonundan televizyon sesi gelmeye başladı.",
      text: "Burcu Hanım, özgeçmişinde bir yeri işaret etti:\n— Önceki işinizden ayrılma sebebiniz neydi?",
      freeze: {
        text: "Gözlerini kaçırdın. Burcu Hanım başını salladı: — Özel meseleler, anlıyorum. Üstelemeyeceğim.",
        goto: "q-neden-biz"
      },
      intents: [
        {
          id: "maas-az",
          positive: true,
          keywords: ["maas", "para", "ucret", "ekonomi", "ekonomik", "yetmiyor", "vermiyorlardi", "azdi", "parasiz", "acim", "zam"],
          text: "» Maaş yetersizdi, zam yapmadılar.\nBurcu Hanım boğazını temizledi: — Bizde de ilk 3 yıl zam olmuyor ama içeride sıcak su var, aile şirketiyiz.",
          goto: "q-neden-biz"
        },
        {
          id: "patron-kotu",
          positive: true,
          keywords: ["patron", "yonetici", "mobbing", "toksik", "kavga", "dovdum", "anlasamadik", "kufur"],
          text: "» Yöneticim tam bir zorbadı, katlanamadım.\nMert Bey yayından atıldı: — Aynısı bizim şirkette de var! Ben de dün istifayı basacaktım, eşim durdurdu.\nBurcu Hanım Mert Bey'i yayından sessize aldı.",
          goto: "q-neden-biz"
        },
        {
          id: "kariyer",
          positive: true,
          keywords: ["kariyer", "gelisim", "vizyon", "hedef", "buyumek", "yeni", "heyecan", "ogrenmek"],
          text: "» Kendimi geliştirmek ve yeni vizyonlar edinmek için ayrıldım.\nBurcu Hanım bu klasik cevabı çok beğendi, kağıdına gülen yüz çizdi.",
          goto: "q-neden-biz"
        },
        {
          id: "kovuldum",
          positive: true,
          keywords: ["kovuldum", "attilar", "isten cikarildim", "cikis", "kovdular"],
          text: "» Kovuldum. Biraz olaylı oldu.\nBurcu Hanım kalemi düşürdü. Berkcan ayağa kalktı: — Helal lan! Ben de okuldan atıldım geçen hafta.\nOrtam biraz gerildi.",
          goto: "q-neden-biz"
        }
      ],
      fallbacks: [
        "Burcu Hanım sorusunu tekrarladı: — Önceki işinizden neden ayrıldınız?",
        "Eski patronun geldi aklına. Ne diyeceksin?"
      ]
    },

    "q-neden-biz": {
      hint: "Neden bu şirketi seçtiğini söyle (Para, prestij, iş ilanı...).",
      look: "Odada hafiften bir ter kokusu var, havalandırma çalışmıyor. İK uzmanı son sorularına yaklaşıyor.",
      text: "Burcu Hanım gülümsedi:\n— Peki, o kadar şirket varken neden bizi seçtiniz?",
      freeze: {
        text: "Bir an duraksadın. Gerçekten, niye buradasın ki? Burcu Hanım 'Sanırım heyecanlandınız' diyerek durumu kurtardı.",
        goto: "q-maas"
      },
      intents: [
        {
          id: "para-icin",
          positive: true,
          keywords: ["para", "maas", "paraya", "issizim", "mecbur", "ilan", "gordum", "basvurdum", "is ariyordum"],
          text: "» İş arıyordum, ilanınızı gördüm başvurdum. Ekstra bir anlamı yok.\nBurcu Hanım'ın kurumsal ruhu sarsıldı. Mert Bey (sessizde olmasına rağmen) kamerayı açıp alkışlıyor gibi yaptı.",
          goto: "q-maas"
        },
        {
          id: "prestij",
          positive: true,
          keywords: ["vizyon", "prestij", "lider", "buyuk", "kalite", "kurumsal", "sizi", "seviyorum", "kariyerli", "deger"],
          text: "» Sektörün lider firması olduğunuz için, vizyonunuz beni etkiledi.\nBurcu Hanım gururla kabardı. Şirketin aslında merdiven altı bir pazar yeri olduğunu ikiniz de biliyorsunuz ama oyun böyle oynanıyor.",
          goto: "q-maas"
        },
        {
          id: "ik-itiraf",
          positive: true,
          keywords: ["siz de", "siz memnunsunuz", "sizce", "sen neden", "sizi neden"],
          text: "» Asıl siz neden buradasınız Burcu Hanım? Memnun musunuz?\nBurcu Hanım bir an dondu. Sonra ağlamaya başladı.\n— Hiç memnun değilim! Dört yıldır zam yapmıyorlar, Berkcan her gün masama oturuyor!\nSana CV'sini uzattı: — Acaba siz işe girseniz, ben sizin yerinize başvursam?",
          ending: "ik_is_ariyor"
        }
      ],
      fallbacks: [
        "— Gerçekten, bizi neden seçtiniz? Farkımız ne sizce?",
        "Bir kurumsal masal uyduracak mısın?"
      ]
    },

    "q-maas": {
      hint: "Maaş beklentini söyle.",
      look: "Berkcan uyumaya başladı. Burcu Hanım elindeki son kağıda bakıyor.",
      text: "Sıra o gergin soruya geldi. Burcu Hanım kalemini masaya tıkladı:\n— Peki {job} olarak, net maaş beklentiniz nedir?",
      freeze: {
        text: "Sustun. Rakam söylemeye çekindin. Burcu Hanım kendi kendine karar verdi:\n— Asgari ücret artı ticket yazıyorum, uygundur. İmza sonra.",
        goto: "q-soru"
      },
      intents: [
        {
          id: "asgari",
          positive: true,
          keywords: ["asgari", "ne verirseniz", "onemsiz", "farketmez", "para muhim degil", "tecrube", "ogrenmek"],
          text: "» Para mühim değil, asgari ücret yeterli, ben tecrübe kazanmak istiyorum.\nBurcu Hanım gözyaşlarını tutmaya çalıştı. Şirketin hayallerindeki köleyi sonunda buldular.",
          ending: "asgari_ucret"
        },
        {
          id: "makul",
          positive: true,
          keywords: ["makul", "pazarlik", "gorusuruz", "konusuruz", "sizce", "teklifiniz", "butce", "siz ne"],
          text: "» Sizin bütçeniz ne kadar, ona göre konuşalım.\nBurcu Hanım terledi:\n— Bütçe konusunda benim yetkim yok, o Mert Bey'de.\nMert Bey yayından: — Bende de yok, o patronda.\nKimse rakam söylemedi ama herkes rahatladı.",
          goto: "q-soru"
        },
        {
          id: "yuksek",
          positive: true,
          keywords: ["on bin", "yuz bin", "bin lira", "bin tl", "milyon", "dolar", "euro", "yuksek", "piyasa", "yirmi", "otuz", "kirk", "elli"],
          text: [
            "» Piyasa standartlarının üstünde, tatmin edici bir rakam bekliyorum.\nBurcu Hanım güldü: — Biz aile şirketiyiz. Burada para değil sevgi konuşur.",
            "» 100 bin aşağısı kurtarmaz.\nLaptop'tan Mert Bey'in sesi açıldı: — Oğlum ben o kadar almıyorum lan!"
          ],
          exhausted: {
            text: "Sen rakamda diretince Burcu Hanım'ın kafası karıştı, yanlışlıkla istediğin rakamı onayladı. Şirketin en yüksek maaşını alan kişi olarak işe başladın.\nCEO bile senden az alıyor. Kira meselesi çözüldü ama ofiste kimse sana selam vermiyor.",
            ending: "maas_zaferi"
          }
        }
      ],
      fallbacks: [
        "— Rakam olarak konuşursak? Beklentiniz nedir?",
        "Burcu Hanım kalemini rakam yazacak yere koydu. — Kaç lira?"
      ]
    },

    "q-soru": {
      hint: "Son olarak sormak istediğin bir şey var mı?",
      look: "Mülakat bitmek üzere. Herkes çok yorgun.",
      text: "Burcu Hanım klasörünü kapattı.\n— Benim soracaklarım bu kadar. Sizin bize sormak istediğiniz bir soru var mı?",
      freeze: {
        text: "Sustun ve hayır anlamında başını salladın.\nBurcu Hanım ayağa kalktı: — Peki. Biz sizi ararız.\nHiç aramadılar. Yıllar geçti, hâlâ aramadılar.",
        ending: "sizi_arariz"
      },
      intents: [
        {
          id: "soru-yok",
          positive: true,
          keywords: ["hayir", "yok", "tesekkurler", "sorum yok", "her sey net", "sag olun", "yeterli", "yoktur"],
          text: "» Teşekkürler, benim için her şey net.\nBurcu Hanım tokalaşmak için elini uzattı: — Katıldığınız için teşekkürler. Biz olumlu ya da olumsuz döneriz.\nAsla dönmediler.",
          ending: "sizi_arariz"
        },
        {
          id: "ne-zaman",
          positive: true,
          keywords: ["ne zaman", "donus", "haber", "ararsiniz", "belli olur", "sonuc", "basliyorum", "ise alindim mi"],
          text: "» Sonuç ne zaman belli olur acaba?\nBurcu Hanım yalan söylerken gözünü bile kırpmadı: — Cuma gününe kadar muhakkak ararız.\nO cuma hiç gelmedi.",
          ending: "sizi_arariz"
        },
        {
          id: "yemek",
          positive: true,
          keywords: ["yemek", "yol", "ticket", "sodexo", "sigorta", "yan haklar", "servis", "mesai", "izin"],
          text: "» Yemek, yol ve yan haklar nelerdir?\nBurcu Hanım: — Bizde yemekler şirketten, tabldot. Yol yok, kendin geliyorsun. Mesai de gönüllülük esasına dayanır.\nDehşet içinde masadan kalkıp kaçtın.",
          ending: "kacti"
        },
        {
          id: "farkli-is",
          positive: true,
          keywords: ["cay", "kahve", "berkcan", "baska pozisyon", "temizlik"],
          text: "» Mert Bey'in yerine geçebilir miyim?\nBurcu Hanım güldü: — Siz {job} olarak başvurdunuz ama sizi Müşteri Hizmetleri'ne alalım. Asgari ücretle.\nİtiraz edemeden kendini çağrı merkezinde buldun.",
          ending: "baska_pozisyon"
        }
      ],
      fallbacks: [
        "Burcu Hanım toparlanıyor. — Bir sorunuz var mıydı?",
        "— Biz sizi ararız demeden önce son şansınız. Soru?"
      ]
    }
  },

  common: [
    {
      id: "cay-dok",
      positive: true,
      keywords: ["cay", "kahve", "bardak", "yudum", "su ic", "dokuldu", "suyu"],
      text: "Masadaki karton bardaktan bir yudum su içeyim derken heyecandan bardağı devirdin.\nBütün su Burcu Hanım'ın önündeki CV'ne döküldü.\n— Mülakat bitmiştir, dedi Burcu Hanım, ıslak kağıtları silerken.",
      ending: "cay_doktu"
    }
  ],

  overrides: {
    police: {
      text: "» Bu çalışma şartları yasadışı, polisi arıyorum!\nBerkcan uyandı: — Abi dur yapma, amcam daha geçen ay vergi cezası yedi.\nPolis gelmeden seni binadan attılar.",
      ending: "kovuldun"
    }
  },

  fallbacks: [
    "Burcu Hanım gözlüklerinin üstünden sana bakıyor. Bir cevap vermen lazım?",
    "Burası bir iş görüşmesi. Garip hareketler yapmamalısın. Ne diyeceksin?"
  ]
});

