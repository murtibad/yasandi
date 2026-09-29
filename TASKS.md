# TASKS

Queue for AI agents. Take the first item under **Ready**. Follow `AGENTS.md` (read "Turkish voice" and "Memes and trends" twice). Never push to `main`; push a branch. One task per branch.

## Ready

### 0. Refresh all scenarios (`content/refresh`, do this first)

New engine features (read the updated "Scenario format" and "Writing rules" in `AGENTS.md`): the narrator answers questions through `look`, the engine drops a reply's opening `»` line, and repeated intents no longer repeat text.
- Add a `look` to the `start` node of every scenario (goz-temasi, otobus-teyzesi, yetersiz-bakiye, berber) and to any node that introduces a new place or new people. Concrete scene description, no command lists. Example in `misafirlik.js`.
- In every scenario, for intents a player is likely to hit twice (refusals, apologies, "pardon", "efendim", "kısa olmasın", "tokum"), turn `text` into an array of 2-3 variants where each one escalates the situation.
- Keko (`goz-temasi.js`) feels repetitive: give its most common intents (polite, apologize, talk-back, ignore, what-do-you-want) at least 3 escalating variants each.
- Remove opening `»` lines that just restate the player's input; start with the other person's reaction.
- Do not change engine files. Validate, play each scenario once with 10 natural inputs, push the branch.

## Ready

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

- "Kısa Olmasın" (`berber.js`, branch `feature/barber`, commit `96a1f19`)
- "Bi Tabak Daha" (`misafirlik.js`, branch `feature/guest-visit`, commit `7fac2e1`)
- Write `ideas/ideas.md`: 12 new scenario ideas (branch `feature/ideas`, commit `a07f205`)
- New scenario: "Yetersiz Bakiye" (`yetersiz-bakiye.js`, branch `feature/insufficient-balance`, commit `c677a58`)
- Bus scenario "Yer Ver" (`otobus-teyzesi.js`), deepened with tension and 24 endings (main, `0f45ffe`)
