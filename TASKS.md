# TASKS

**Owner decision (2026-09-29): no new scenarios for now.** Improve the existing six: more absurd turns, more reply variants, better endings. Scenario ideas stay in `ideas/` for later.

Queue for AI agents. Take the first item under **Ready**. Follow `AGENTS.md` (read "Turkish voice" and "Memes and trends" twice). Never push to `main`; push a branch. One task per branch.

## Ready

### 7. Comedy pass on all six scenarios (`content/comedy-pass`)

Goal: every common player action gets a funnier, more surprising answer. Read `ideas/eksi-patterns.md` again first.
- For each scenario, play it 5 times with the most natural inputs (efendim, pardon, tamam, hayır, kaçıyorum, ne var, bilmiyorum...). Write down every reply that is flat, generic or explains the joke.
- Rewrite those replies. Add a second and third escalating variant (`text` arrays) where a player is likely to repeat themselves, and `exhausted` payoffs where the third repeat deserves a punchline.
- Add at least 3 new endings per scenario, each built on a small absurd turn (Hüsnü-style: the most ordinary Turkish thing appearing in the most absurd place). Every ending title must match what happens.
- Add at least 3 more beats from real Ekşi Sözlük "yaşanmış komik olaylar" style stories (retold in your own words, same rules as task 5).
- Do not touch engine files. 0 validator warnings. Push the branch.

## Later (owner's ideas, not for agents yet)

- Anonymous story submissions: a "Hikâyeni anlat" link already exists in the page, hidden until `STORY_FORM_URL` in `js/main.js` is set (e.g. a Google Form). Later: collect them, turn the best into scenario beats.
- Unmatched inputs: send `yasandi.unmatched` to a free database so we can see what players type.
- Endings gallery: a page listing found/missing endings per scenario (titles of missing ones hidden).

## Done

- Header controls: visible and animated (`feature/header-controls`, branch `feature/header-controls`)
- Ekşi Sözlük pattern mining (`content/eksi-patterns`, branch `content/eksi-patterns`)
- `ideas/memes.md`: Turkish meme bank, patterns only (branch `feature/memes`)
- "Niyetimiz Çalıp Çırpmak Değil" (`terk-edilmis-koy.js`, branch `feature/abandoned-village`)
- Refresh all scenarios (`content/refresh`, branch `content/refresh`, commit `51f2c0b`)
- "Kısa Olmasın" (`berber.js`, branch `feature/barber`, commit `96a1f19`)
- "Bi Tabak Daha" (`misafirlik.js`, branch `feature/guest-visit`, commit `7fac2e1`)
- Write `ideas/ideas.md`: 12 new scenario ideas (branch `feature/ideas`, commit `a07f205`)
- New scenario: "Yetersiz Bakiye" (`yetersiz-bakiye.js`, branch `feature/insufficient-balance`, commit `c677a58`)
- Bus scenario "Yer Ver" (`otobus-teyzesi.js`), deepened with tension and 24 endings (main, `0f45ffe`)
