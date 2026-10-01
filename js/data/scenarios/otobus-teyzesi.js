window.Yasandi = window.Yasandi || {};
window.Yasandi.scenarios = window.Yasandi.scenarios || [];
window.Yasandi.scenarios.push({
  id: "otobus-teyzesi",
  title: "Yer Ver",

  endings: {
    yastik: { title: "Teyzenin Yastığı", tag: "YASTIK OLDUN" },
    topal: { title: "Rol Kesilmez", tag: "EVE KADAR TOPALLADIN" },
    laf: { title: "Beynine Kan Gitsin", tag: "LAF YEDİN" },
    firsatci: { title: "Fırsatçı Pusu", tag: "AYAKTASIN" },
    pilates: { title: "Pilatesçi Teyze", tag: "EZİLDİN" },
    uyku: { title: "Son Durak", tag: "UYUDUN" },
    erkeninis: { title: "Erken İniş", tag: "KURTULDUN" },
    krem: { title: "Biberiye Kremi", tag: "ŞİFA" },
    kavga: { title: "Otobüs Meydan Muharebesi", tag: "LİNÇ" },
    sarj: { title: "Şarj Bitti", tag: "ÖLDÜN" },
    nisan: { title: "Zorla Nişan", tag: "EVLENDİN" },
    akraba: { title: "Uzak Akraba", tag: "KURTULDUN" },
    sofor: { title: "Kaptana Akıl Verme", tag: "ATILDIN" },
    fenalik: { title: "Fenalık Geçirdi", tag: "VİCDAN AZABI" },
    saygisiz: { title: "Saygısız Nesil", tag: "DIŞLANDIN" },
    cam: { title: "Manzara", tag: "KURTULDUN" },
    amca: { title: "Amca Savunması", tag: "KURTULDUN" },
    halay: { title: "Otobüs Halayı", tag: "KURTULDUN" },
    inat: { title: "Keçi İnadı", tag: "KURTULDUN" },
    kucak: { title: "Kucak Kucağa", tag: "REZALET" },
    laptop: { title: "Kırık Ekran", tag: "ZARAR" },
    baston: { title: "Baston Gücü", tag: "KURTULDUN" },
    video: { title: "Viral Oldun", tag: "VİRAL" },
    radyo: { title: "Damar Şoför", tag: "KURTULDUN" },
    issiz: { title: "Heves Kırıcı", tag: "ÜZÜLDÜN" },
    evlilik: { title: "Otobüs Çöpçatanı", tag: "NİŞANLANDIN" },
    "uyku-krizi": { title: "Derin Uyku", tag: "REZİL" },
    garip: { title: "Yanlış Meslek", tag: "DIŞLANDIN" },
    kulaklik_koptu: { title: "Kopan Kulaklık", tag: "ZARAR" },
    durdurun: { title: "Durdurun Dünyayı", tag: "KAÇIŞ" },
    sofor_mudahale: { title: "Şoför Müdahalesi", tag: "İNDİRİLDİN" }
  },

  nodes: {
    start: {
      freeze: { text: "Hiçbir şey yapmadın. Teyze de yapmadı. Otobüs iki durak böyle gitti.\nTeyze bir adım daha yaklaştı. Artık dizin onun çantasına değiyor.\nYandaki genç telefonunu çıkardı, kamerayı açtı.", goto: "gerilim" },
      hint: "Teyze tepene dikildi. Yer verebilir, görmezden gelebilir, uyuma numarası yapabilir, telefonu çıkarabilir veya mızmızlanabilirsin.",
      look: "Otobüs hıncahınç dolu. Ayaktakiler demirlere tutunmuş, yorgun argın sallanıyor. Yanda lise öğrencisi telefonda oyun oynuyor. Teyze tam karşında, elinde pazar çantası, sana kilitlenmiş.",
      text:
        "Akşam saati. Otobüs tıklım tıklım. İşten çıktın, ayakların zonkluyor, eve daha 40 durak var.\n" +
        "Sonunda bir koltuk buldun, oturdun.\n" +
        "Bir durakta yaşlı, sevimli ama kararlı bir teyze bindi. Geldi, tam tepene dikildi.\n" +
        "Hiçbir şey demiyor. Sadece gözlerinin içine bakıyor.",
      intents: [
        {
          id: "give-seat",
          positive: true,
          keywords: ["kalk", "buyur teyze", "otur teyze", "teyze otur", "sen otur", "otur buraya", "yer ver", "yerimi", "gec teyze", "gec otur", "otursana", "ayaga kalk", "buyur", "buyrun", "oturun", "=otur", "otur hadi", "ister misin", "ister misiniz", "oturmak ister", "yer vereyim"],
          text: [
            "Ayağa kalktın. Teyze tam oturacakken arka taraftan orta yaşlı, kel bir adam fırladı ve koltuğa doğru hamle yaptı.\nAdam koltuğa oturmak üzere.",
            "Zar zor doğruldun. Sen kalkar kalkmaz o kel adam yine belirdi, koltuğa nişan aldı.",
            "Bıkkınlıkla kalktın. Kel adam ışınlanmış gibi koltuğa pike yaptı."
          ],
          goto: "seat-stolen",
        },
        {
          id: "give-seat-polite",
          positive: true,
          keywords: ["lutfen", "rica ederim", "teyzecigim", "teyzecim"],
          text:
            "Ayağa kalktın. Teyze gülümsedi.\n" +
            "— Sağ ol yavrum ama ben bir durak sonra inecem. Hem pilates yapıyorum, ayakta durmak iyi geliyor.\n" +
            "Teyze inmedi. On beş durak tek ayak üstünde durdu. Sen ayakta süründün.",
          ending: "pilates",
        },
        {
          id: "ignore",
          keywords: ["gormezden", "bakmam", "kafami cevir", "yuzune bakma", "hicbir sey", "hic bir sey", "oturmaya", "oturuyorum", "devam et", "vermiyorum", "vermem", "vermeyecegim", "kalkmiyorum", "kalkmam", "kalkmayacagim", "umursamiyorum"],
          text: [
            "Görmezden geldin. Oturmaya devam ettin.\n" +
            "Teyzenin bakışları ağırlaşıyor. Ağırlığı fiziksel olarak hissedebiliyorsun.\n" +
            "Etraftaki yolcular da sana bakmaya başladı.",
            "Kafanı çevirdin ama teyzenin nefesini ensende hissediyorsun.\n" +
            "Fısıltılar başladı otobüste.",
            "İnat ettin, kalkmadın. Teyze birden öksürük krizine girdi. Bilerek yapıyor."
          ],
          exhausted: {
            text: "Dördüncü kez görmezden gelince teyze 'İmdat!' diye bağırdı.\nŞoför otobüsü sağa çekip seni levyeyle indirdi.",
            ending: "sofor_mudahale"
          },
          goto: "gerilim",
        },
        {
          id: "sleep",
          positive: true,
          keywords: ["uyumak", "uyuyor", "uyku", "gozumu kapat", "horla", "uyumus gibi", "uyuma numarasi", "kestir", "uyurum"],
          text: [
            "Gözlerini kapattın. Uyuyor numarası yapıyorsun.\n" +
            "Teyze elindeki şemsiyeyle dizine dürttü.\n— Uyuma numarası yapma yavrum, göz kapakların titriyor."
          ],
          exhausted: {
            text:
              "Uyuyor numarası yaparken gerçekten uykuya daldın. Kafan yavaşça teyzenin omzuna düştü.\n" +
              "Teyze 'Terbiyesiz, pavyon mu burası!' diyerek seni şemsiyeyle dürtüp uyandırdı ve zorla indirdi.",
            ending: "uyku-krizi",
          },
          goto: "gerilim",
        },
        {
          id: "am-i-tired",
          keywords: ["yorgun muyum", "yorgun miyim", "hasta miyim"],
          text:
            "— Bana mı soruyon evladım? Nerden bilem senin yorgunluğunu.\n" +
            "Teyze çantasını öbür koluna aldı.\n" +
            "— Ama ben yorgunum, onu biliyom.",
          goto: "gerilim",
        },
        {
          id: "tired",
          keywords: ["yorgunum", "hastayim", "yoruldum", "ben yorgunum", "belim", "agrim", "calisiyorum", "isten ciktim", "mesai", "ayaklarim", "ben cok yorgunum", "cok yorgunum", "cok yoruldum"],
          text: [
            "Teyzenin yüzü bir anda şefkatle doldu.\n" +
            "— Oy kıyamam, dedi. Çantasından tuhaf kokulu bir merhem çıkardı.\n" +
            "Otobüsün ortasında boynuna ve beline biberiye kremi sürmeye başladı. Herkes sizi izliyor. Felaket kokuyorsun ama ağrıların geçti.",
            "Teyze acıyarak baktı sana.\n— Vah vah, gençlik de kalmamış sizde, dedi. Otur yavrum otur."
          ],
          ending: "krem",
        },
        {
          id: "ask-tired",
          keywords: ["yoruldun", "yorgunsan", "yorgunsun", "hasta misin"],
          text:
            "» Teyze çok yoruldun herhalde?\n" +
            "Teyze dimdik durdu: — Ben her sabah pilates yapıyorum yavrum, dağ gibi ayaktayım.",
          goto: "gerilim",
        },
        {
          id: "headphone",
          positive: true,
          keywords: ["kulaklik", "muzik", "takiyorum", "taktim", "takarim", "dinliyorum"],
          text: [
            "Kulaklığını taktın. Müziğin sesini açtın.\n" +
            "Teyze eğildi, kulaklığın tekini kulağından çıkardı.\n— Ne dinliyon yavrum? Müslüm mü o?",
            "Kulaklığını biraz daha bastırdın.\n" +
            "Teyze omzuna dokundu: — Sağır mısın çocuğum?"
          ],
          exhausted: {
            text: "Kulaklığa asıldın. Kablosu koptu.\nMüzik otobüse yayıldı: 'Oturmaya mı geldik?'\nTeyze dâhil herkes sana gülüyor.",
            ending: "kulaklik_koptu"
          },
          goto: "gerilim",
        },
        {
          id: "ask-early",
          keywords: ["efendim", "ne var", "ne bakiyorsun", "hayirdir", "niye bakiyorsun", "nedir", "bir sey mi", "ne istiyorsun", "bakma oyle"],
          text: [
            "Teyze cevap vermedi. Bakışı bir kat ağırlaştı.\n" +
            "Yandaki yolcu gazetesini indirip sizi izlemeye başladı.",
            "Teyze duymazlıktan geldi. Daha da dibine girdi."
          ],
          goto: "gerilim",
        },
        {
          id: "phone",
          positive: true,
          keywords: ["telefon", "telefona", "oyun", "mesaj", "ekran", "sosyal medya"],
          text:
            "Telefonu çıkardın, ekrana boş boş bakmaya başladın.\n" +
            "Teyze eğildi, ekrana baktı.\n— O kızı beğenmedim yavrum, dedi. Çok makyaj yapmış.",
          goto: "gerilim",
        },
        {
          id: "get-off",
          positive: true,
          keywords: ["inecek", "inmek", "iniyorum", "inecegim", "inerim", "inicem", "kapiya git", "kapiya yuru", "durakta in", "dugme", "basarim"],
          text:
            "Teyzenin bakışlarına dayanamayıp 'Benim durağım geldi' diyerek ilk durakta kendini dışarı attın.\n" +
            "Yağmur altında 12 durak eve kadar yürürken teyzenin otobüs camından sana zaferle baktığını gördün.",
          ending: "erkeninis",
        },
        {
          id: "stop-world",
          positive: true,
          keywords: ["durdurun", "inicek var", "kaptirmayin", "acil"],
          text:
            "Birden 'Durdurun otobüsü, inecek var!' diye çığlık attın.\n" +
            "Tüm otobüs sana döndü. Kapı açıldı, dışarı fırladın. Arkandan bir sessizlik oldu.",
          ending: "durdurun",
        },
        {
          id: "window",
          keywords: ["cam", "disari", "pencere", "manzara", "disariya", "camdan", "disariyi"],
          text:
            "Başını cama çevirdin. Camdan dışarı bakmaya başladın.\n" +
            "Teyze de seninle birlikte cama doğru eğildi.\n— Kaza mı olmuş yavrum orada? dedi.\n" +
            "İkiniz de camdan dışarı bakarak 10 durak gittiniz.",
          ending: "cam",
        },
      ],
    },

    "seat-stolen": {
      freeze: { text: "Hiçbir şey yapmadın. Kel adam rahatça oturdu, gazetesini açtı.\nTeyze sana baktı. Sen kalktın, koltuk gitti, ikiniz de ayaktasınız.\nTeyze 'Hiç olmazsa denedin yavrum' dedi. Teselli değildi.", ending: "firsatci" },
      hint: "Adam koltuğa yerleşmek üzere. Onu it, çantanı at, teyzeyi oturt ya da adama laf at.",
      look: "Kel adamın kıllı kolu çoktan koltuğun kenarına değdi. Teyze havada asılı kalmış, seninle adam arasında bir yere bakıyor.",
      intents: [
        {
          id: "block-man",
          positive: true,
          keywords: ["engelle", "adami it", "itmek", "dur de", "onune gec", "adami durdur", "ittir", "adama hamle", "engel ol", "onu durdur", "amcayi it"],
          text:
            "Adamı omuzlayıp engelledin. Adam geriye savruldu. Teyze huzurla koltuğa oturdu.\n" +
            "Ama teyze susmadı: — Senin boyun da posun da yerinde, bekar mısın evladım? Bizim eltinin kızına alalım seni.\n" +
            "Bütün yolculuk boyunca kendi düğün planını dinledin.",
          ending: "evlilik",
        },
        {
          id: "direct-aunt",
          positive: true,
          keywords: ["teyze otur", "otur teyze", "sen otur", "teyzeyi", "yonlendir", "teyzenin kolundan", "teyzeyi oturt"],
          text:
            "Teyzeyi kolundan tutup koltuğa çektin. Kel adam aynı anda koltuğa çöktü.\n" +
            "Teyze adamın kucağına oturdu. Otobüste ölüm sessizliği oldu.",
          ending: "kucak",
        },
        {
          id: "put-bag",
          positive: true,
          keywords: ["canta", "cantayi", "cantami", "koymak", "koyarim", "birakirim", "firlat"],
          text:
            "Hızla çantanı koltuğa fırlattın.\nAdam duramadı ve çantanın üzerine oturdu. " +
            "İçindeki laptopun kırılma sesini bütün otobüs duydu. Teyze sana üzülerek bakıyor.",
          ending: "laptop",
        },
        {
          id: "say-for-aunt",
          positive: true,
          keywords: ["teyzenin", "bu koltuk teyzenin", "teyzenin yeri", "teyze icin", "adama laf", "=hey", "hey amca", "amca dur", "dur amca", "beyefendi", "ayip oluyor", "amca oturma"],
          text:
            "Adam oralı olmadı, oturdu.\n" +
            "Teyze adama döndü ve bastonuyla adamın kafasına vurmaya başladı. Sen aradan sıyrıldın.",
          ending: "baston",
        },
      ],
      fallbacks: [
        "Adamın poposu koltuğa doğru hızla iniyor. Bir şey yapacak mısın?",
        "Adam oturmak üzere, teyze de sana bakıyor. Karar ver!",
        "Fırsatçı adam koltuğu ele geçirmek üzere. Müdahale edecek misin?",
      ],
      patience: 3,
      patienceIntent: {
        text:
          "Adam rahatça koltuğa oturdu. Esnedi.\n" +
          "Teyze artık o adama bakıyor. Sen de ayaktasın. Adalet yok.",
        ending: "firsatci",
      },
    },

    "gerilim": {
      freeze: { text: "Yine hiçbir şey yapmadın. Teyze de. Genç kaydı kapattı, sıkıldı.\nDördüncü durakta teyze elini senin omzuna koydu, destek aldı, sonra başını da koydu. Uyudu.\nSen yer vermedin, o da seni yastık yaptı. 36 durak kıpırdayamadın.", ending: "yastik" },
      hint: "Baskı artıyor. Videoya çeken gence laf atabilir, şoföre müziği kapattırabilir ya da pes edip yer verebilirsin.",
      look: "Müzik açık. Yandaki çocuk telefonu kaldırmış seni çekiyor. Teyzenin gözleri artık lazer gibi.",
      intents: [
        {
          id: "block-video",
          positive: true,
          keywords: ["video", "kamera", "cekme", "cekim", "telefonunu", "telefonu kapat", "engelle", "gence", "cocuga"],
          text:
            "» Kapat o telefonu! Çekim yapamazsın!\nGenç telaşla telefonu indirdi ama çok geçti.\n" +
            "Akşama TikTok'ta 'Otobüste yaşlılara yer vermeyen saygısız' olarak viral oldun.",
          ending: "video",
        },
        {
          id: "stop-music",
          positive: true,
          keywords: ["muzik", "muzigi kapat", "sesi kapat", "radyoyu kapat", "sesi kis", "radyo", "sofor", "kaptan"],
          text:
            "» Kaptan şu müziği kısar mısın, başımız şişti!\n" +
            "Şoför müziği tamamen kapattı. Sessizlik olunca otobüsteki herkes teyzenin sana bakışına odaklandı. Baskı on kat arttı.",
          goto: "stare-level-2",
        },
        {
          id: "ignore-everything",
          keywords: ["gormezden", "oturmaya", "oturuyorum", "vermiyorum", "kalkmiyorum", "kalkmam", "umursama", "umursamiyorum", "hicbir sey", "devam et", "bakma", "kafami cevir", "dinlemem"],
          text:
            "Olan biteni umursamadan oturmaya devam ettin.\n" +
            "Video çeken çocuk sıkılıp telefonu bıraktı. Müzik çaldı bitti. Ama teyze hâlâ orada, dimdik dikiliyor.",
          goto: "stare-level-2",
        },
        {
          id: "give-up",
          positive: true,
          keywords: ["kalk", "buyur", "otur teyze", "teyze otur", "sen otur", "yer ver", "ayaga kalk", "gec otur", "pes etmek", "dayanamadim", "tamam teyze"],
          text:
            "Dayanamayıp kalktın.\n» Buyur teyze, otur.\nSen kalkar kalkmaz arka taraftan orta yaşlı, kel bir adam fırladı ve koltuğa doğru hamle yaptı.",
          goto: "seat-stolen",
        },
      ],
      inherits: "start",
      fallbacks: [
        "Video kayda devam ediyor, yandaki genç pis pis sırıtıyor. Ne yapacaksın?",
        "Müziğin sesi daha da açıldı. Orada öylece oturacak mısın?",
        "Teyzenin nefesi ensende. Otobüsün yarısı sizi izliyor. Bir şey yapacak mısın?",
      ],
      patience: 3,
      patienceIntent: {
        text:
          "Sessiz kaldın. Şoför radyodan Orhan Gencebay açtı. Bütün otobüs efkarlandı.\nTeyze yanındaki boşluğa tutunup sana bakmaya devam etti.",
        ending: "radyo",
      },
    },

    "stare-level-2": {
      freeze: { text: "Hiç ses etmedin. Arka koltuktaki amca 'Tüh' dedi. Teyze 'Tüh' dedi. Sonra bütün otobüs sırayla 'Tüh' dedi. Şoför de.\nTeyze sana doğru eğildi:\n— Sen kimin oğlusun bakayım?", goto: "kimin-oglusu" },
      hint: "Artık işler çığrından çıkıyor. Amcaya laf yetiştir, teyzeye kim olduğunu sor ya da mesleğini falan anlat.",
      intents: [
        {
          id: "explain-job",
          positive: true,
          keywords: ["anlat", "durumum", "yorulduk", "meslegim", "isim gucum", "calisiyorum", "isten", "anlatirim", "aciklama", "yorgunum", "yoruldum", "yorgunuz"],
          text:
            "» Teyze biz de akşama kadar yoruluyoruz, iş güç işte...\nTeyze seni dinlemedi bile. Sözünü kesip:\n" +
            "— Peki sen ne iş yapıyorsun bakayım yavrum? dedi.",
          goto: "ne-is-yapiyorsun",
        },
        {
          id: "ignore-harder",
          keywords: ["bakmam", "devam", "gormezden", "susmak", "susuyorum", "hicbir sey", "oturmaya", "oturuyorum", "cevap vermem", "vermiyorum", "vermem", "kalkmiyorum", "kalkmam"],
          text:
            "Israrla önüne bakıyorsun.\n" +
            "Şoför dikiz aynasından sana ters ters bakmaya başladı. Arka koltuktaki amca boğazını temizledi, yüksek sesle 'Tüüüh' dedi.\n" +
            "Teyze birden eğildi ve kulağına fısıldadı:\n— Sen kimin oğlusun bakayım?",
          goto: "kimin-oglusu",
        },
        {
          id: "uncle",
          positive: true,
          keywords: ["amca", "dayi", "sana ne", "sen kalk", "sen yer ver", "amcaya", "arkadaki", "amcasi"],
          text:
            "» Amca çok istiyorsan sen kalk yer ver!\nAmca şok oldu. \n" +
            "— Ben 65 yaşındayım lan! diye ayağa kalktı.\nAmca kalkınca teyze anında amcanın yerine oturdu. Amca ayakta kaldı.",
          ending: "amca",
        },
        {
          id: "driver",
          positive: true,
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
          keywords: ["uyku", "gozumu kapat", "uyumaya", "kestir", "horla", "uyumak", "uyurum", "uyuyor", "uyudum", "uyuma numarasi"],
          text:
            "Tekrar gözlerini kapattın ve bu sefer gerçekten uykuya daldın.\n" +
            "Uyandığında son duraktasın. Teyze yok. Otobüs boş. Şoför seni dürtüyor:\n— Kalk hadi geldik.",
          ending: "uyku",
        },
        {
          id: "phone-again",
          positive: true,
          keywords: ["telefon", "telefona", "oyun", "mesaj", "sarj"],
          text:
            "Telefona bakmaya devam ettin. Teyzenin gözleri ekranda.\n" +
            "Şarjın %1. Ve bitti. Ekran karardı.\nArtık yapacak hiçbir şeyin yok. Sadece teyze ve sen varsınız.",
          ending: "sarj",
        },
      ],
      inherits: "gerilim",
      fallbacks: [
        "Teyze nefes alıp veriyor. Karşılık verecek misin?",
        "Arka koltuktaki amca 'Cık cık cık' yapıyor. Susacak mısın?",
        "Şoför dikiz aynasından seni kesiyor. Ne yapacaksın?",
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
      freeze: { text: "Cevap vermedin. Teyze bütün otobüse döndü:\n— Kimin oğlu olduğunu bile söylemiyo. Nereden bilsin büyüğe saygıyı.\nSeni otobüsten inene kadar laf sokmaya devam etti.", ending: "saygisiz" },
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
          positive: true,
          keywords: ["sanane", "soylemem", "ne yapacaksin", "ne yapacan", "ilgilenmez", "ne isin var"],
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
        "— Sağır mısın yavrum? Kimin oğlusun diyorum. Cevap versene?",
        "— Annen baban kim senin, onu soruyorum. Yok mu ailen?",
        "Teyze bastonunu yere vurdu. 'Kimlerdensin?' diye bekliyor. Bir şey demeyecek misin?",
      ],
    },

    "ne-is-yapiyorsun": {
      freeze: { text: "Cevap vermedin. Teyze bütün otobüse duyurdu:\n— İş yok, güç yok! Bizim kapıcı Asım'ın oğlu gibi.\nOtobüs sana acıyarak baktı. Hayata küstün.", ending: "issiz" },
      hint: "Ne iş yapıyorsun? Bir meslek söyle veya 'okuyorum' de.",
      intents: [
        {
          id: "jobless",
          keywords: ["issiz", "calismiyorum", "is ariyorum", "bostayim", "evdeyim"],
          text:
            "— İşsiz misin? Vah yavrum, vah.\n" +
            "Teyze bütün otobüse duyurdu: — Bu çocuk işsizmiş! Bizim kapıcı Asım'ın oğlu gibi.\n" +
            "Otobüs sana acıyarak baktı. Bir amca cebinden 20 lira çıkardı. Hayata küstün.",
          ending: "issiz",
        },
        {
          id: "student",
          keywords: ["okuyorum", "ogrenciyim", "universite", "lise", "okul"],
          text:
            "» Ben öğrenciyim teyze, okuyorum.\n" +
            "Teyze başını iki yana salladı.\n" +
            "— Okuyup da ne olacan yavrum? Bizim kapıcı Asım'ın oğlu da okudu, şimdi atanamadı evde yatıyor.",
          ending: "issiz",
        }
      ],
      acceptAny: [
        {
          text:
            "— {input} {mi}? O iş parayı getirmez yavrum. Benim eltimin oğlu da onu denedi, şimdi borç içinde.\nBütün hevesin kırıldı, hayata küstün.",
          ending: "issiz",
        },
        {
          text:
            "— {input} ha... Bizim oralarda o işi yapanlara pek iyi gözle bakmazlar.\nOtobüstekiler sana garip garip bakmaya başladı. Adın çıktı.",
          ending: "garip",
        },
      ],
      fallbacks: [
        "— Sorumdan kaçma yavrum, ne iş yapıyorsun?",
        "— Mesleğin yok mu senin? Neyle geçiniyorsun?",
        "— Lafı dolandırma, neyle kazanıyorsun ekmeğini?",
      ]
    },
  },

  common: [
    {
      id: "fake-limp",
      first: true,
      positive: true,
      keywords: ["topalla", "topal", "aksayarak", "sakatmis gibi", "ayagim agriyormus gibi", "bacagim sakat", "ayagim sakat"],
      text:
        "Durakta inerken ayağını sürüdün. Topallayarak. Arkanda kalan bütün otobüs mahcup oldu, teyze elini ağzına kapattı.\n" +
        "Otobüs gitti. Sen topallamayı bırakamadın: ya biri görürse?\n" +
        "Markete topallayarak girdin. Bakkal çırağı kapıyı tuttu. Eve kadar topalladın.\n" +
        "Kapıyı annen açtı: — Ne oldu ayağına? Şimdi evde de topallıyorsun. Üç gündür.",
      ending: "topal",
    },
    {
      id: "mock-teyze",
      keywords: ["ayakta dur", "spor olur", "kaslarina", "zayiflarsin", "yuru biraz", "bacaklarina iyi", "saglikli", "egzersiz", "bastonuna"],
      text:
        "Teyze sana döndü. Bütün otobüs sustu.\n" +
        "— Haklısın yavrum. Sen de bi kalk istersen, beynine kan gitsin.\n" +
        "Arka koltuktaki amca kahkahadan tespihini düşürdü. Şoför kornaya bastı. Bir çocuk alkışladı.\n" +
        "Sonraki durakta kendi isteğinle indin. İnerken bile arkandan gülüyorlardı.",
      ending: "laf",
    },
    {
      id: "smile",
      positive: true,
      keywords: ["gulumse", "siritiyor", "sirittim", "gulmek", "siritmak", "tebessum", "gulumsedim", "gulerek", "gulumsu", "gulumsey", "guluyorum"],
      text: "» Yüzüne karşı gülümsedin.\nTeyze gülümsemedi. Bakışları bir kat daha sertleşti.",
    },
    {
      id: "ask-seat",
      positive: true,
      keywords: ["baskasi", "baskasindan", "neden ben", "niye ben", "genc", "gencler"],
      text: [
        "» Teyze otobüste bir sürü genç var, niye tepeme dikildin?\n— Senin yüzünde nur var yavrum, dedi. Sana kanım ısındı.\nKaçış yok.",
        "» Teyze arka koltukta gencecik adam var, ondan istesene!\n— Onlar saygısız evladım, sen iyi birine benziyorsun.\nKaçış yok.",
        "» Teyze yemin ederim yanımdaki benden genç!\nTeyze bir an durdu, yüzünü yarım çevirip doğrudan ekrana baktı:\n— Sen de bi şey de be, telefondan bakıp duruyorsun! Bana yardım yok mu? Neyse yavrum, kalkıyon mu şimdi?"
      ]
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
    "Teyze sana bakmaya devam ediyor. Sessiz kalacak mısın?",
    "Otobüs sallandı, teyze bir adım daha yaklaştı. Dibindesin. Ne yapacaksın?",
    "Şoför sert bir fren yaptı. Teyze üstüne devrilmedi, dimdik ayakta. Bir hamle yapacak mısın?",
    "Birisi 'Şu gençliğe bak' diye mırıldandı. Laf mı yetiştireceksin?",
    "Teyze dudaklarını büzdü. Gözlerini senden ayırmıyor. Konuşacak mısın?",
    "Nefes aldığını bile belli etmemeye çalışıyorsun ama teyze orda. Yer verecek misin?"
  ],
  patience: 6,
  patienceIntent: {
    text:
      "Sen inat ettin, o inat etti. Otobüs son durağa geldi.\n" +
      "Herkes indi, şoför indi, siz hâlâ bakışıyorsunuz.\nSonunda teyze 'Aferin yavrum, inatçıymışsın' dedi ve gitti.",
    ending: "inat",
  },
});
