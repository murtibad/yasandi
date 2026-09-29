// Senaryo: Niyetimiz Çalıp Çırpmak Değil
// Joke engine: the cin is real, lonely and aggressively ordinary. Tuncay never sees him; the camera does.
window.Yasandi = window.Yasandi || {};
window.Yasandi.scenarios = window.Yasandi.scenarios || [];
window.Yasandi.scenarios.push({
  id: "terk-edilmis-koy",
  title: "Niyetimiz Çalıp Çırpmak Değil",

  endings: {
    not: { title: "Konuşmasanız da Olur", tag: "HÜSNÜ KÜSTÜ" },
    kangal: { title: "Kangal Kurtarışı", tag: "KAYBOLDUN" },
    "views-47": { title: "Sıkıcı Video", tag: "47 İZLENME" },
    kavga: { title: "Ekip İçi Çatışma", tag: "KAVGA" },
    cekirdek: { title: "Çekirdek Alsaydın Bari", tag: "VİRAL" },
    hayran: { title: "Hayran Buluşması", tag: "311 CİN" },
    yildiz: { title: "Hüsnü'yle Gece Sohbetleri", tag: "ÜNLÜ OLDUN" },
    cay: { title: "Kendiliğinden Kaynayan Çay", tag: "KURTULDUN" },
    tapu: { title: "Tapu Hüsnü'nün", tag: "KİRACI OLDUN" },
    kabuk: { title: "Müze Halısı", tag: "ATILDIN" },
    sarj: { title: "Şarj Aleti", tag: "SOYULDUN" },
    gordu: { title: "Tuncay Sonunda Gördü", tag: "BAYILDI" },
    gise: { title: "Öbür Gişe", tag: "BÜROKRASİ" },
    fotokopi: { title: "Muhtar da Cin", tag: "BÜROKRASİ" },
    kirkyil: { title: "Sistem Çöktü", tag: "40 YIL GEÇTİ" },
    torpil: { title: "Hüsnü'nün Yeğeni", tag: "TORPİL" },
    avm: { title: "Köye AVM Gelmiş", tag: "ZAMAN KAYDI" },
    annem: { title: "Zıbar Yat", tag: "EVE DÖNDÜN" },
    ayna: { title: "Düşman Kendin", tag: "AYNA" },
    satilmis: { title: "Dost Kazığı", tag: "KURTULDUN" },
    saril: { title: "Cine Sarılmak", tag: "DUYGUSAL" },
    dov: { title: "Cine Kafa Atmak", tag: "HASTANELİK" },
    evlat: { title: "Cin Evlatlık", tag: "MUTLU SON" }
  },

  nodes: {
    start: {
      freeze: { text: "Kıpırdamadın. Tuncay da kıpırdamadı. Kapı kendi kendine açıldı.\nİçeriden bir ses geldi: — Girecek misiniz, çıkacak mısınız? Cereyan yapıyo.\nTuncay seni içeri itti.", goto: "dark-room" },
      look: "Zifiri karanlık. Tuncay'ın fenerinin sarı ışığı eski kerpiç evin aralık kapısına vuruyor. Kapının önünde bir çift terlik duruyor. Temiz. Yeni gibi.",
      hint: "Tuncay kapıda. İçeri girmenin de bir adabı var.",
      text:
        "Gece, terk edilmiş bir dağ köyü. Arkadaşın Tuncay kamerayı açtı, fenerin pili yarım. Kanalın 312 abonesi var. Bu video da tutmazsa kanalı kapatıyorsunuz.\n" +
        "Tuncay ilk eve girmeden önce kapıya dönüp fısıldıyor:\n" +
        "— Selamünaleyküm. Niyetimiz çalıp çırpmak değil, döküp kırmak değil. Sadece çekim yapıp gideceğiz.",
      intents: [
        {
          id: "selam-ver",
          positive: true,
          keywords: ["selam", "aleykum", "selamun", "merhaba"],
          text:
            "Kapı kendiliğinden açıldı. İçeriden tok bir ses geldi:\n" +
            "— Aleykümselam. Ayakkabıları çıkarın, halı yeni.\n" +
            "Tuncay kameraya döndü: — Rüzgâr, sayın seyirciler. Rüzgâr.",
          goto: "dark-room",
        },
        {
          id: "gir-direkt",
          positive: true,
          keywords: ["gir", "girelim", "iceri", "kapiyi ac", "hadi gir", "ilerle", "daliyorum"],
          text:
            "Selam vermeden içeri daldın. Arkandan kapı kendi kendine çarptı.\n" +
            "— Abi destursuz daldın, çarpılacağız! dedi Tuncay.\n" +
            "Karanlıktan biri boğazını temizledi: — Öhöm. Ayakkabı.",
          goto: "dark-room",
        },
        {
          id: "kac",
          positive: true,
          keywords: ["kac", "kacalim", "gidelim", "donelim", "korktum", "vazgec"],
          text:
            "Arkanı dönüp karanlığa doğru koştun.\n" +
            "Tuncay arkandan 'Abi nereye, kayıttayız!' diye bağırdı. Sen çoktan ormandaydın.\n" +
            "Sabaha karşı seni bir çoban köpeği buldu. Köpek de seni biraz kınadı.",
          ending: "kangal",
        },
        {
          id: "dua",
          keywords: ["dua", "besmele", "bismillah", "ayetel"],
          text:
            "Besmele çekip eşikten adım attın.\n" +
            "Karanlıktan saygılı bir ses geldi: — Kabul olsun. Ayakkabıları da çıkarırsanız tamam.",
          goto: "dark-room",
        },
        {
          id: "kamera-kapat",
          positive: true,
          keywords: ["kamerayi kapat", "kapat su", "cekme", "kaydi kapat", "kapat kamerayi"],
          text:
            "Tuncay oflayarak kamerayı kapattı.\n" +
            "İçeri girdiniz, gezdiniz, çıktınız. Hiçbir şey olmadı. Kapıdan çıkarken biri arkanızdan 'Yine bekleriz' dedi, kayıt kapalıydı.\n" +
            "Video 47 izlenme aldı.",
          ending: "views-47",
        },
        {
          id: "laf-sok",
          keywords: ["sacmalama", "abartma", "yalan", "kurgu", "tiyatro", "oyunculuk", "cin yok", "cin mi var"],
          text:
            "Tuncay sinirlendi:\n— Abi prodüksiyon yapıyoruz şurda, niye bozuyorsun!\n" +
            "Kapının önünde kavga ettiniz. İçeriden biri 'Gençler sessiz olun, saat üç' diye seslendi. İkiniz de duymadınız.\n" +
            "Video 'Hayalet ararken arkadaşımla birbirimize girdik' adıyla yüklendi.",
          ending: "kavga",
        },
      ],
      fallbacks: [
        "Tuncay kapıda bekliyor. — Abi bi şey de, kayıttayız.",
        "Rüzgâr esti. Kapı biraz daha aralandı. Girecek misin?",
        "Tuncay feneri yüzüne tuttu. — Korktun mu yoksa?",
      ],
      patience: 3,
      patienceIntent: {
        text:
          "Sen öylece durunca Tuncay kameraya döndü:\n" +
          "— Arkadaşımın nutku tutuldu sayın seyirciler. Boyuttan boyuta geçiyor!\n" +
          "Seni kolundan tutup içeri çekti.",
        goto: "dark-room",
      },
    },

    "dark-room": {
      freeze: { text: "Hiçbir şey demedin. Karanlık da demedi. Bir dakika. İki dakika.\nSonunda karanlık pes etti: — Tamam, ben başlıyorum.", goto: "cin" },
      look: "Eski bir köy odası. Yer sedirleri, duvarda 1987 takvimi, köşede bir çaydanlık. Karanlığın içinde, sedirin orada, biri çekirdek çitliyor. Çıt. Çıt.",
      hint: "Karanlıkta biri var. Onunla konuşabilirsin. Ya da ışığı oraya tutabilirsin.",
      text:
        "İçerisi toz ve eski yorgan kokuyor. Tuncay feneri gezdirirken fısıldadı:\n" +
        "— Duydun mu? Bir tıkırtı var! Sayın seyirciler, kayıtta var!\n" +
        "Karanlıktan net bir ses geliyor: çıt. Çıt. Çekirdek sesi.",
      intents: [
        {
          id: "kim-var",
          keywords: ["kim var", "kim o", "kimse var", "ses ver", "cik ortaya", "kimsin", "orada kim", "hey"],
          text: "Çekirdek sesi durdu.\n— Benim, dedi karanlık. Hüsnü.",
          goto: "cin",
        },
        {
          id: "bekle",
          keywords: ["bekle", "sus", "sessiz", "dinle", "hic ses", "kipirdama", "durdum"],
          text:
            "Nefesinizi tutup beklediniz. Bir dakika. İki dakika.\n" +
            "Karanlıktan biri dayanamadı: — Ya bir şey deyin, üç yüz yıldır kimse gelmedi buraya.",
          goto: "cin",
        },
        {
          id: "fener",
          positive: true,
          keywords: ["fener", "isik", "isigi", "aydinlat", "oraya tut", "koseye tut", "flas", "tut"],
          text:
            "Tuncay feneri sedire çevirdi. Işıkta bir keçi belirdi. Keçi size baktı.\n" +
            "Keçinin arkasındaki karanlıktan bir ses: — O benim keçim. Adı Mesut.",
          goto: "cin",
        },
        {
          id: "kac-dark",
          positive: true,
          keywords: ["kac", "kacalim", "gidelim", "cik", "kapiya", "disari"],
          text:
            "Kapıya koştun. Kapı açılmadı. Kolu içeriden biri tutuyordu.\n" +
            "— Nereye? dedi bir ses, kulağının dibinden. Çay koydum.",
          goto: "cin",
        },
        {
          id: "bagir",
          positive: true,
          keywords: ["bagir", "ciglik", "aaa", "imdat", "yardim"],
          text:
            "Çığlığın köy boyunca yankılandı.\n" +
            "— Bağırma, dedi karanlıktan biri. Komşular uyuyor.\n" +
            "Köyde kimse yok. Kimi kastettiğini sormadın.",
          goto: "cin",
        },
        {
          id: "yansima",
          positive: true,
          keywords: ["siluet", "karalti", "ayna", "kendi yansimam", "yansima", "aynaya", "karanliga firlat"],
          text:
            "Köşedeki insana benzeyen karanlık silüete elindeki tripodu fırlattın.\n" +
            "Büyük bir şangırtı koptu. Meğer eski bir boy aynasındaki kendi yansımanmış.",
          ending: "ayna",
        }
      ],
      fallbacks: [
        "Çıt. Çıt. Çekirdek sesi yaklaştı. Bir şey yapacak mısın?",
        "Tuncay titreyerek kamerayı sana çevirdi. — Abi konuş bi şey, sessizlik iyi değil.",
        "Karanlıktan biri kabuk tükürdü. Tam ayağının dibine. Ne yapacaksın?",
      ],
      patience: 3,
      patienceIntent: {
        text: "Sen bir şey demeyince karanlık dayanamadı:\n— Tamam ben başlıyorum. Merhaba. Ben Hüsnü.",
        goto: "cin",
      },
    },

    cin: {
      freeze: { text: ["Hüsnü'ye cevap vermedin. Hüsnü içini çekti.\n— Sen de mi konuşmuyosun? Torunlar da böyle. Telefonla konuşuyolar, benle değil.\nDumanı biraz inceldi. Tuncay 'Abi hava birden ısındı' dedi.", "Yine sustun. Hüsnü çekirdeğini bıraktı.\n— Üç yüz yıl bekledim, bi 'merhaba' için. Neyse.\nDuvardaki takvime baktı. 1987'den beri kimse sayfasını çevirmemiş."], exhausted: { text: "Üçüncü sessizliğinde Hüsnü bir şey demeden duvarın içine çekildi.\nSedirde bir not kaldı: 'Gelin yine. Konuşmasanız da olur.'\nTuncay notu kameraya tuttu. Video 'Cin bize not bıraktı' adıyla yüklendi. 312 izlenme. Hepsi Hüsnü.", ending: "not" } },
      text:
        "Fenerin ışığında sedirde bağdaş kurmuş biri belirdi. Yarısı duman, yarısı amca. Elinde bir avuç çekirdek.\n" +
        "— Hüsnü, dedi. Üç yüz kırk yedi yaşındayım. Köy İstanbul'a göçtü, bir ben kaldım.\n" +
        "Tuncay kameraya döndü: — Sayın seyirciler, burada hiçbir şey yok. Enerji sıfır.\n" +
        "Hüsnü, Tuncay'ın arkasından kameraya el salladı.",
      look: "Hüsnü sedirde oturuyor, çekirdek çitliyor. Köşedeki çaydanlığın altında ateş yok ama kaynıyor. Tuncay hâlâ kimseyi göremiyor, kamera ise Hüsnü'yü gayet net çekiyor. Hüsnü'nün arkasındaki duvarda, az önce orada olmayan bir kapı var.",
      hint: "Hüsnü konuşmak istiyor. Üç yüz yıldır kimse ona bir şey sormadı.",
      intents: [
        {
          id: "who",
          keywords: ["kimsin", "nesin", "cin misin", "hayalet", "ne is yap", "adin ne", "nerelisin", "hikayen"],
          text: [
            "— Cinim ya, belli değil mi? Ama köyde fırıncı Hüsnü diye bilinirim.\n1742'de fırın açtım, sonra öldüm, sonra cin oldum. Kariyer değişikliği.",
            "— Anlattım ya. Fırıncıydım. Simidim meşhurdu. Şimdi kimse simit yemiyor, herkes İstanbul'da poğaça yiyor.\nHüsnü içini çekti. Duman biraz koyulaştı.",
          ],
        },
        {
          id: "tuncay-look",
          keywords: ["tuncay arkana", "arkana bak", "arkanda", "tuncay bak", "goremiyor musun", "gormuyor musun", "tuncay orada", "tuncay surada"],
          text: [
            "Tuncay döndü. Hüsnü tam o an eğilip yere düşen çekirdeği aldı.\n— Abi burda kimse yok, dedi Tuncay. Hüsnü sana göz kırptı.",
            "Tuncay döndü. Hüsnü tavana yapıştı.\n— Abi korkutma beni, dedi Tuncay. Tavandaki Hüsnü omuz silkti.",
          ],
          exhausted: {
            text:
              "Tuncay son bir kez döndü. Hüsnü bu sefer saklanmadı, burun buruna geldiler.\n" +
              "— Merhaba Tuncay. Ben senin 311 abonenden biriyim.\n" +
              "Tuncay yere yığıldı. Kamera hepsini çekti. Video 'Kanalımızın en sadık izleyicisiyle tanıştık' adıyla yüklendi.",
            ending: "gordu",
          },
        },
        {
          id: "abone",
          keywords: ["abone", "kanal", "takip", "begen", "izle"],
          text:
            "— Abone miyim? dedi Hüsnü, alınmış gibi. 312 abonenin 311'i biziz zaten.\n" +
            "Duvardaki kapı açıldı. İçeri 310 cin daha doldu. Hepsi Tuncay'dan imza istedi.\n" +
            "Tuncay hiçbirini göremediği için havaya imza attı. Cinler çok memnun kaldı.",
          ending: "hayran",
        },
        {
          id: "roportaj",
          keywords: ["roportaj", "cekelim", "videoya", "kameraya", "seni cek", "soru soray", "kanala cik"],
          text:
            "— Beni sol profilimden çek, dedi Hüsnü. Sağ tarafım 1800'lerden kalma.\n" +
            "Hüsnü kırk dakika konuştu: fırıncılık, göç, yalnızlık, 1987'deki düğün.\n" +
            "Video 12 milyon izlendi. Kanalın adı 'Hüsnü'yle Gece Sohbetleri' oldu. Tuncay artık Hüsnü'nün kameramanı.",
          ending: "yildiz",
        },
        {
          id: "cay",
          keywords: ["cay", "caydanlik", "cay var", "cay koy", "icelim"],
          text:
            "Hüsnü ince belli bardaklara çay koydu. Çaydanlığın altında ateş yok ama çay tavşan kanı.\n" +
            "Sabaha kadar oturdunuz. Hüsnü çayı karıştırmadan şekeri eritti. Nasıl yaptığını sormadın.\n" +
            "Güneş doğarken Hüsnü 'Yine gelin' dedi ve sedirle birlikte kayboldu. Bardaklar kaldı.",
          ending: "cay",
        },
        {
          id: "cekirdek",
          positive: true,
          keywords: ["cekirdek", "ben de alayim", "bana da ver", "cekirdek ver", "citle"],
          text:
            "Hüsnü avucuna bir avuç çekirdek döktü. Çitledin, kabukları yere attın.\n" +
            "Hüsnü dondu. — Ne yapıyorsun lan! Bu halı 1802'den! Müze bu!\n" +
            "Seni evden kovdu. Üç yüz yıllık halıya kabuk atmak cinler âleminde de suçmuş.",
          ending: "kabuk",
        },
        {
          id: "tapu",
          keywords: ["tapu", "kira", "ev kimin", "burasi kimin", "evin sahibi", "senin mi", "satilik"],
          text:
            "— Burası benim ev, dedi Hüsnü. Tapusu e-Devlet'te. Şifremi unuttum ama.\n" +
            "— Kalacaksanız kira ayda iki paket çekirdek. Depozito üç.\n" +
            "Bir şekilde kontrat imzaladın. Hâlâ neden imzaladığını bilmiyorsun. Her ay çekirdek götürüyorsun.",
          ending: "tapu",
        },
        {
          id: "kac-cin",
          positive: true,
          keywords: ["kac", "kacalim", "kos", "sat", "birak", "arkadasini birak", "tuncayi sat", "tuncayi kilitle", "kapiya", "disari"],
          text:
            "Tuncay 'Abi kamerada bir şey var!' dediği an 'O etlidir onu ye!' diyerek odadan fırladın.\n" +
            "Kapıyı dışarıdan kilitleyip arkana bakmadan kaçtın.\n" +
            "Tuncay sabaha karşı köye inebilmiş. Arkadaşlığınız bitti ama hayattasın.",
          ending: "satilmis",
        },
        {
          id: "lonely",
          keywords: ["ne istiyorsun", "ne istiyon", "yalniz", "uzuldum", "neden burada", "niye buradasin", "iyi misin", "kimse yok mu"],
          text: [
            "— Kimse gelmiyor, dedi Hüsnü. Bayramda bile. Torunlar Almanya'da, onlar da cin değil.\nBir süre sustu.\n— Bi şarj aleti var mı sende? Telefonum üç yüz yıldır kapalı.",
            "— Sen iyi çocuksun, dedi Hüsnü. Bak, arkadaki kapı var ya. Oradan bizim tarafa geçilir. Gezdireyim mi?",
            "— Üzülme evladım, alıştım ben.\nHüsnü sana bir bardak daha çay doldurdu."
          ],
          exhausted: {
            text: "Daha fazla dayanamadın.\n» Hüsnü amca, gel benimle yaşa!\nBerberde çırak olarak işe girdi. Hayatından çok memnun.",
            ending: "evlat"
          }
        },
        {
          id: "saril",
          positive: true,
          keywords: ["saril", "sarilmak", "kucak", "sarilirim"],
          text:
            "Adamcağız 300 yıldır yalnız. Dayanamayıp sarıldın.\n" +
            "Hüsnü ağlamaya başladı. Tuncay şok içinde 'Abi boşluğa sarıldı!' diye bağırıyor.\n" +
            "Hüsnü'yle kanka oldunuz.",
          ending: "saril",
        },
        {
          id: "dov",
          positive: true,
          keywords: ["dov", "kavga", "vur", "kafa at", "yumruk", "dal"],
          text:
            "Korkunu yenmek için Hüsnü'ye uçan kafa attın.\n" +
            "Kafa dumanın içinden geçti, arkadaki duvara tosladın.\n" +
            "Hüsnü 'İyi misin evladım?' derken sen ambulanslık olmuştun.",
          ending: "dov",
        },
        {
          id: "sarj",
          positive: true,
          keywords: ["sarj", "sarj aleti", "powerbank", "telefonum", "telefon ver", "telefonumu"],
          text:
            "Şarj aletini uzattın. Hüsnü telefonunu taktı. Telefon açıldı. 4.212 cevapsız arama.\n" +
            "— Hepsi annem, dedi Hüsnü. Şarj aletini de telefonunu da alıp duvarın içinden geçti.\n" +
            "Bir daha görmedin. Ama arada bir 'Hüsnü sizi arıyor' diye bildirim geliyor.",
          ending: "sarj",
        },
        {
          id: "kapi",
          positive: true,
          keywords: ["duvardaki", "arkadaki kapi", "o kapi", "kapiyi ac", "gecelim", "gezdir", "bizim taraf", "cinler alemi", "oraya gidelim", "gezelim"],
          text: "Hüsnü kalktı, duvardaki kapıyı açtı.\n— Buyurun. Cinler âlemi. Numara almayı unutmayın.",
          goto: "daire",
        },
        {
          id: "selam-cin",
          keywords: ["selam", "aleykum", "selamun", "merhaba"],
          text: [
            "— Aleykümselam, dedi Hüsnü. Ayakkabıları çıkarmadınız ama. Neyse.",
            "— Aldım selamını evladım, aldım. Üçüncü kere oluyor.",
          ],
        },
        {
          id: "dua-cin",
          keywords: ["dua", "besmele", "bismillah", "ayetel"],
          text: "Hüsnü saygıyla bekledi. Sen bitirince 'Kabul olsun' dedi ve çekirdeğine döndü.\n— Ben kötü cin değilim evladım. Emekliyim.",
        },
        {
          id: "kac-cin",
          positive: true,
          keywords: ["kac", "kacalim", "gidelim", "kaciyorum", "kos", "kapiya kos", "tabana kuvvet", "korktum"],
          text:
            "Kapıya koştun. Bu sefer açıldı. Tuncay da arkandan.\n" +
            "Hüsnü kapıdan seslendi: — Çekirdek alsaydın bari!\n" +
            "Video çıktı: iki kişinin çığlığı ve bir amcanın 'Çekirdek alsaydın bari' sesi. 4 milyon izlenme. Kimse neden viral olduğunu anlamadı.",
          ending: "cekirdek",
        },
      ],
      fallbacks: [
        "Hüsnü çekirdeğini çitleyip seni bekledi. — Eee? Anlat bakalım, İstanbul nasıl?",
        "— Sessiz çocukmuşsun, dedi Hüsnü. Bi şey sor bana. Üç yüz yıldır kimse sormadı.",
        "Hüsnü kabuğu tam Tuncay'ın ensesine attı. Tuncay irkildi. — Abi sinek var. Sen ne diyorsun?",
      ],
      patience: 4,
      patienceIntent: {
        text:
          "Hüsnü sıkıldı. — Tamam, sen konuşmuyorsan ben gezdiririm, dedi.\n" +
          "Kolundan tutup duvardaki kapıya götürdü.",
        goto: "daire",
      },
    },

    // The other side is a government office.
    daire: {
      text:
        "Kapıdan geçtin. Loş bir koridor, floresan lamba cızırdıyor. Duvarda 'Cinler Âlemi Nüfus Müdürlüğü' yazıyor.\n" +
        "Sıramatikten numara aldın: 347. Ekranda 12 yazıyor.\n" +
        "Gişedeki cin memur gözlüğünün üstünden baktı:\n" +
        "— Hangi işlem için geldiniz?",
      look: "Uzun bir bekleme salonu. Plastik sandalyelerde yüzlerce cin oturuyor, hepsinin elinde numara. Köşede çay ocağı. Gişede cin memur, arkasında ondan da yaşlı bir cin müdür uyuyor. Hüsnü kapının yanında, birine el sallıyor.",
      hint: "Memur hangi işlem için geldiğini soruyor. Bir şey uydur. Ya da Hüsnü'nün burada tanıdığı var gibi.",
      intents: [
        {
          id: "torpil",
          keywords: ["husnu", "tanidik", "torpil", "dayim", "amcam", "yegen", "kimin adami", "bizi husnu"],
          text:
            "— Hüsnü abi? dedi memur. Hüsnü abi benim dayım!\n" +
            "Memur ayağa kalktı, sana çay ısmarladı, işini iki dakikada bitirdi.\n" +
            "Ne işi bitirdiğini hâlâ bilmiyorsun. Ama cebinde mühürlü bir kâğıt var.",
          ending: "torpil",
        },
        {
          id: "geri",
          positive: true,
          keywords: ["geri don", "geri gidelim", "cikalim", "kac", "donelim", "burada kalmam", "gidelim"],
          text:
            "Kapıdan geri çıktın. Beş dakika geçmişti.\n" +
            "Köy kalabalıktı. Köyün ortasında bir AVM vardı. Bir çocuk sana baktı: — Amca, sen Tuncay'ın arkadaşı mısın? Ondan beri kırk yıl geçti.\n" +
            "Tuncay'ın kanalının 312 abonesi hâlâ duruyor.",
          ending: "avm",
        },
      ],
      acceptAny: [
        {
          text: "— {input} {mi}? O işlem öbür gişede.\nÖbür gişeye baktın. Üstünde 'Kapalı' yazıyor. Tarih: 1974.",
          ending: "gise",
        },
        {
          text:
            "— {input} için bir fotokopi eksik. Kimliğinizin, arkalı önlü.\nBir de muhtarlıktan, dedenizin cin olmadığına dair yazı.\n" +
            "Hüsnü kulağına eğildi: — Muhtar da cin. Uğraşma.",
          ending: "fotokopi",
        },
        {
          text:
            "— {input}... Bakıyorum... Sistem çöktü. Yarın gelin.\n" +
            "Cinler âleminde yarın, bizim tarafta kırk yıl sürüyor. Döndüğünde Tuncay'ın kanalı hâlâ 312 aboneydi.",
          ending: "kirkyil",
        },
      ],
      fallbacks: [
        "— Hangi işlem? Arkada bekleyen var.",
        "Memur saatine baktı. — Öğle arasına iki dakika var. İşlem ne?",
      ],
    },
  },

  common: [
    {
      id: "gulme",
      positive: true,
      keywords: ["gul", "guluyorum", "kahkaha", "komik", "guldum", "haha"],
      text: [
        "Kendini tutamayıp kıkırdadın.\n— Abi gülme, ambiyansı bozuyorsun! dedi Tuncay.",
        "Kahkaha attın. Tuncay kameraya döndü: — Cinler arkadaşımın aklıyla oynuyor sayın seyirciler!",
      ],
    },
  ],

  overrides: {
    police: {
      text:
        "155'i aradın.\n— 155, buyrun.\n» Memur bey, burada cin var.\n" +
        "— Kardeşim adres verin, biz de hocayla geliyoruz.\nTuncay kameraya fısıldadı: — Hoca geliyor sayın seyirciler, abone olmayı unutmayın.",
    },
    mom: {
      text:
        "Anneni aradın.\n» Anne, terk edilmiş köydeyiz, garip sesler var.\n" +
        "— Zıbar yat, saat kaç oldu! Cinler de uyusun, rahatsız etme milleti!\n" +
        "Annenden cinlerden daha çok korkup eve döndünüz.",
      ending: "annem",
    },
  },

  fallbacks: [
    "Tuncay kamerasını sana doğrulttu. — Abi bi şey yap, video boş gidiyor.",
    "Rüzgâr uğulduyor. Tuncay sana bakıyor. Ne yapacaksın?",
  ],
  patience: 6,
  patienceIntent: {
    text:
      "Sen hiçbir şey yapmayınca Tuncay'ın canı sıkıldı.\n— Abi senle içerik çıkmıyor, yürü eve gidiyoruz.\nVideo 47 izlenme aldı. Kırk yedisi de cindi.",
    ending: "views-47",
  },
});
