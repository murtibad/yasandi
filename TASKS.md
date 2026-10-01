# TASKS

**Owner decision (2026-10-01): new scenarios are allowed again, one per task, only the ones listed under Ready.** Read `FEEDBACK.md` first: friends' main complaint is "the game answered something unrelated to what I wrote". Every task below is judged on that.

Queue for AI agents. Take the first item under **Ready**. Follow `AGENTS.md` (read "Turkish voice", "Rol pası" and Workflow step 3a twice). Never push to `main`; push a branch. One task per branch. Do not touch `js/engine.js`, `js/main.js`, `css/` or `index.html` unless the task says so (a new scenario still gets its `<script>` tag and the `?v=N` bump from "Adding a scenario" in `AGENTS.md`).

## Ready

### 1. One fourth-wall moment per scenario (`content/fourth-wall`)

A character (or the narrator) suddenly talks to the player as the person holding the phone. It works because it is rare and earned. Add **exactly one** to each of the six scenarios, hand-written for that scene, using features that already exist (an intent, an `exhausted`, a `patienceIntent`, a `freeze` variant). No new engine code, no stats, no screen effects.
- Trigger it with something the player does, never with a counter: typing the same thing a third time, asking the narrator a question, a very specific action. Examples of the tone:
  - Keko, third identical move: "— Sen de mi bana bakıyon? Hayır, sen. Ekrandaki." Then the scene goes on.
  - Hüsnü: "— Tuncay beni göremiyor. Sen görüyorsun ama, değil mi? Telefondan bakan." He waves.
  - Nebahat teyze: "— Telefonu bırak da ye artık! Evet, sana diyorum, ekrana bakan."
- It must not punish, end the game by itself, or mock the player. One or two lines, then back to the scene.
- In the task's final message list where each one lives (scenario, step, intent id) and the input that triggers it.

### 2. New scenario: you are the apartment cat (`content/apartment-cat`)

The player is not human. Same rules, same voice, seen from below. Id `apartman-kedisi`, title of your choice (short, Turkish).
- Stake in the first three lines: you are hungry, and the kapıcı Cemal efendi just put the bread bags on the stairs. Or Hayriye teyze on the 2nd floor is frying fish. You choose; it must be food or territory.
- The cat cannot speak Turkish. When the player "says" something, narrate it as a meow and show how humans misread it ("» Miyav.\n— Aaa acıkmış, dedi Hayriye teyze, ve sana diyet mama verdi."). Keep that joke alive in several replies.
- Humans talk about the cat in front of it: the WhatsApp apartman grubu, "kim besliyo bunu", the child who wants to adopt it, the yönetici who wants it gone.
- An open question the player fills: the cat's name the kids gave it, or what the cat thinks it really is. Use `acceptAny` + `save`.
- 5+ steps, 12+ endings (mix: fed, chased with a terlik, adopted, became the apartment's boss, locked in the asansör, ended up in the yönetici's car...). 0 validator warnings.

### 3. New scenario: job interview (`content/job-interview`)

Esra's idea. A comedy of the interview everyone has lived, not real career advice. Id `is-gorusmesi`.
- Opening: the HR person reads your CV upside down. "— Hangi pozisyon için başvurmuştunuz?" `acceptAny` with `save: "job"`; every later question uses `{job}` so it feels personal ("— {job} olarak beş yıl sonra kendinizi nerede görüyorsunuz?").
- The classic questions, each its own step with a `freeze` and a `look`: beş yıl sonra nerede, en büyük zayıflığınız, neden ayrıldınız, maaş beklentiniz, "bizi neden seçmeliyiz", "sorunuz var mı?".
- Characters: the HR person, the team lead who joins on a laptop with the camera off, the CEO's nephew who walks in. Generic invented names, no real companies.
- Endings must follow the answers: hired for a different job, hired at minimum wage with "aile şirketiyiz", "sizi ararız" (they never call), salary negotiation won by accident, the interviewer ends up applying to your company...
- 6+ steps, 12+ endings, 0 validator warnings.

### 4. New scenario: you are an ant at a family picnic (`content/ant-picnic`)

Id `piknik-karincasi`. Read `ideas/karinca-notes.md` first; it has the setting, the stake, the real ant facts and the moves to use. Same rules as the cat task: stake in the first lines (the queen expects food before dark), the player fills one gap with `acceptAny` + `save` (what the ant brings home, or the ant's own name), humans talk about you without knowing it ("Her yer karınca olmuş!"), cartoonish deaths only. 5+ steps, 12+ endings including the ant mill, the sugar cube flag and the tebeşir wall. 0 validator warnings.

### 5. New scenario: the health report at the devlet hastanesi (`content/hospital-report`)

Id `saglik-raporu`. Read `ideas/hastane-notes.md` first. You start a new job tomorrow and need an işe giriş raporu today; the hospital closes at 16:00. One step per department (danışma, göz, KBB, kan, final signature), each with its own small disaster and a clock line ("Saat 15:12. İki imza eksik."). The waiting-room illness contest, the queue screen, "selamı var", Dr. Google and the pharmacy must all appear. Doctors and nurses are tired, not evil. Freeze = the clock moves on. 6+ steps, 12+ endings (got the report with a wrong name on it, the job starts without it, ended up admitted, became the waiting room's champion...). 0 validator warnings.

## Later (owner's ideas, not for agents yet)

- Friends' playtest notes are in `FEEDBACK.md` (read it before content work). Open: tappable suggestions when stuck; collecting unmatched inputs is the most useful next step.

- Anonymous story submissions: a "Hikâyeni anlat" link already exists in the page, hidden until `STORY_FORM_URL` in `js/main.js` is set (e.g. a Google Form). Later: collect them, turn the best into scenario beats.
- **Unmatched inputs (owner builds this, his backend project):** a small API that receives the sentences the game did not understand (`logUnmatched` in `js/engine.js`), stores them, and a page that lists the most common ones per scenario and step. The game sends them with one `fetch`, fire-and-forget, no personal data. Then agents use that list to add the missing replies.
- Endings gallery: a page listing found/missing endings per scenario (titles of missing ones hidden).

## Done
- Scenario-specific "?" (hint, then look) and rotating example moves in the empty input (Claude, main)
- Friends' feedback batch, see `FEEDBACK.md` (Claude, main)
- Grow "Yetersiz Bakiye" to 15+ endings (`content/yetersiz-bakiye-more`)
- Rework "Yetersiz Bakiye" around a crush (`content/yetersiz-bakiye-crush`)

- Rol pası: every step now has a `freeze` (what happens when the player refuses or does nothing); validator dead-end warnings 67 → 0 (Claude, main)

- Comedy pass on all six scenarios (`content/comedy-pass`, branch `content/comedy-pass`)
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
