# TASKS

Queue for AI agents. Take the first item under **Ready**. Follow `AGENTS.md`. Never push to `main`; push a branch.

## Ready

### 1. New scenario: "Yetersiz Bakiye" (`js/data/scenarios/yetersiz-bakiye.js`, branch `feature/insufficient-balance`)

Everyday Turkish moment: crowded bus, you are at the front, kulağında müzik çalıyor. Someone boards and taps their card: the reader says "Yetersiz bakiye" out loud. They tap again. Same result. Now the whole bus is waiting and the driver sighs. The person asks the passengers: "Fazladan kartı olan var mı?"

- The player can offer their card, pretend not to hear, tell the driver to just let them in, pay with cash ("Nakit alınmıyor"), tell them to top up at the machine, get off... Recognize the obvious ones first.
- The comic engine: **the bus reader is a character**. It announces things in the worst moment ("Yetersiz bakiye" shouted at the player's own card too, "İndirim hakkınız bulunmamaktadır", "Aktarma süresi dolmuştur"). Let the player's own card fail loudly at the worst time, or succeed when nobody believes it will.
- The person who boards is a normal, likeable character, not an object of jokes. Do not describe their looks beyond a detail or two. The joke is on the situation and on the player's nerves, never on them.
- Add one open question step with `acceptAny`, e.g. the person asks "Adın ne senin?" or "Nereye gidiyorsun?" and the answer is echoed back with `{input}`.
- Other passengers: the driver, a teyze with an opinion, a kid who films it, an amca who explains "bizim zamanımızda kart yoktu".
- 6+ steps, 15+ endings, mix of good, bad and absurd. One ending must make the player laugh at the bus itself (the reader has the last word).

## Ideas (research task, do this after task 1)

### 2. Write `ideas/ideas.md`: 12 new scenario ideas, not implementations

Browse the web for funny, universally recognizable Turkish daily-life moments (dolmuş, misafirlik, kargo, ders, deplasman, esnaf, apartman toplantısı, düğün, nüfus müdürlüğü...). Read sources such as Ekşi Sözlük and similar only for inspiration and follow the "Sources and references" rules in `AGENTS.md` strictly.

For each idea write: a working title, the opening situation in 2 sentences, the recurring comic device, 5 possible endings (one line each), and one open question for `acceptAny`. Do NOT write scenario files yet. The user picks which ones to build.

## Done

- Bus scenario "Yer Ver" (`otobus-teyzesi.js`), deepened with tension and 24 endings. (main, 0f45ffe)
