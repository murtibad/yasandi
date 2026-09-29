# TASKS

Queue for AI agents. Take the first item under **Ready**. Follow `AGENTS.md` (read "Turkish voice" and "Memes and trends" twice). Never push to `main`; push a branch. One task per branch.

## Ready

### 1. "Bi Tabak Daha" (`misafirlik.js`, branch `feature/guest-visit`)

Opening: Bayram ziyareti, Nebahat teyzenin evi. Sen "tokum teyze" dedikçe tabağın doluyor. Öğlen yemeği yedin, üstüne çay içtin, şimdi önünde bir tabak sarma, üç dilim börek, kenarda kısır var.
- Engine of the joke: **the plate never empties.** Every time the player eats, hides food or refuses, Nebahat teyze adds something ("Bi kaşık pilav koydum, onu da yiyiver güzüm"). Her insistence escalates: "hasta mısın", "annen yedirmiyo mu sana", "beğenmedin herhalde", finally she calls the player's mother.
- Characters: Nebahat teyze (warm, unstoppable), her husband Cemil amca (dozing in front of the TV, occasionally "yesene oğlum"), the cousin who ate four plates and wins every comparison.
- Must understand: tokum, yiyemem, yeter, sağ ol, diyetteyim, midem ağrıyor, yemeği saklamak (saksıya, peçeteye, cebe, kediye), kalkmak, gitmek zorundayım, "bi tabak daha".
- Open question (acceptAny): "En çok hangi yemeğimi seviyon sen?" → teyze answers based on {input} ("— {input} {mi}? Dur hemen yapıyım, yarım saatlik iş.").
- Endings (write at least these, 14+ total): saksıdaki sarma bitki öldürür; kedi sarmayı yemez, teyze görür; sen yedikçe teyze mutlu olur, tartıda 3 kilo; annene telefon edilir; kuzenle yeme yarışı; "diyetteyim" denince teyze diyet sarması yapar; kaçmaya çalışırken kapıda paket yapılmış yemek elinde kalırsın; teyze senin için ayrıca tatlı getirmiş, "tatlıya yer var ama".

### 2. "Kısa Olmasın" (`berber.js`, branch `feature/barber`)

Opening: Mahalle berberi Remzi usta. Oturdun, "Abi uçlarından alsan yeter, kısa olmasın" dedin. Makine vızıldadı.
- Engine of the joke: **the more you say "kısa olmasın", the shorter it gets.** Remzi usta talks nonstop (siyaset değil; futbol, eski günler, askerlik anısı, "bu devirde gençler") and cuts while agreeing with you ("Tabi abim, kısa olmasın"). The mirror is the player's only source of truth.
- Characters: Remzi usta, çırak (brings tea, burns a towel), the old customer waiting who comments on every step.
- Must understand: kısa olmasın, dur, yeter, uzun bırak, aynaya bak, kalkmak, kaçmak, bahşiş, kolonya istememek, "sadece uçlar".
- Running device: every few turns the usta offers a service nobody asked for (kulak kılı ateşle, kaş, yüz maskesi, "ense tıraşı da yapıyım mı").
- Open question (acceptAny): "Nası olsun abim, kime benzesin?" → usta promises to make the player look like {input} and fails ("— {input} {mi}? Tamamdır abim.").
- Endings (14+): asker tıraşı; sadece bir tarafı kısa; kulak kılı yangını; yarım saçla kaçış; usta haklı çıkıyor ve çok yakışıyor; bahşiş yerine çıraktan borç; kolonya gözüne kaçıyor; "bu da başka bir hikâyenin konusu" ile kesilen askerlik anısı.

### 3. "Niyetimiz Çalıp Çırpmak Değil" (`terk-edilmis-koy.js`, branch `feature/abandoned-village`)

Parody of the Turkish ghost-hunting YouTube genre. Invented channel, invented host. Never name or imitate a real channel.
Opening: Gece, terk edilmiş bir dağ köyü. Arkadaşın Tuncay kamerayı açtı, fenerin pili yarım. Kanalın 312 abonesi var. Tuncay ilk eve girmeden önce kapıya dönüp fısıldıyor: "Selamünaleyküm. Niyetimiz çalıp çırpmak değil, döküp kırmak değil. Sadece çekim yapıp gideceğiz."
- Engine of the joke: **everything spooky has a boring explanation, and the player's every action is narrated for the camera.** Tuncay turns every sound into a cin sign ("Duydun mu? Kayıtta var!"), then it turns out to be a goat, the wind, a köylü amca who still lives there, the player's own phone.
- The "selamünaleyküm" ritual must be a mechanic: if the player enters a house without saying it, things go wrong (comic, never scary-gory). If they say it, sometimes someone answers from inside.
- Must understand: selamünaleyküm / selam ver, gir, girme, kaç, fener, kamera kapat, besmele, dua, bağır, "kim var orda", Tuncay'a laf sokmak, çekime devam.
- Open question (acceptAny): a voice from the dark asks "Kimsin sen?" → the answer is echoed ("— {input} {mi}? Burası {input}'lara yasak.") or a köylü amca asks "Kimlerdensin?".
- Endings (14+): the ghost is a goat; köylü amca invites you for tea and it becomes a çay videosu; the video gets 47 views; the video goes viral for the wrong reason (you screaming); the "cin" is Tuncay's alarm; you get lost and a shepherd's dog brings you back; you say selamünaleyküm and someone says aleykümselam, you both run in opposite directions; the whole thing was on "kamera kapak kapalı".

## Research (do after the tasks above)

### 4. `ideas/memes.md`: Turkish meme bank, patterns only

Collect 25 well-known Turkish internet memes and everyday "herkes yaşamıştır" moments from sources like Ekşi Sözlük, Twitter/X, YouTube comments. For each: the **pattern** in one line (not the person or channel it came from), where it could be used in a scenario, and one example line of in-game dialogue in natural spoken Turkish. Follow "Memes and trends" in `AGENTS.md`: skip anything tied to a real person, a stereotype or a tragedy. Do not write scenario files.

## Done

- Write `ideas/ideas.md`: 12 new scenario ideas (branch `feature/ideas`, commit `a07f205`)
- New scenario: "Yetersiz Bakiye" (`yetersiz-bakiye.js`, branch `feature/insufficient-balance`, commit `c677a58`)
- Bus scenario "Yer Ver" (`otobus-teyzesi.js`), deepened with tension and 24 endings (main, `0f45ffe`)
