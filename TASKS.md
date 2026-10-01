# TASKS

**Owner decision (2026-10-01, later): no new scenarios for now. Make the existing ones better.** Read `FEEDBACK.md` first: friends' main complaint is "the game answered something unrelated to what I wrote". Every task below is judged on that.

Queue for AI agents. Take the first item under **Ready**. Follow `AGENTS.md` (read "Turkish voice", "Rol pası" and Workflow step 3a twice). Never push to `main`; push a branch. One task per branch. Do not touch `js/engine.js`, `js/main.js`, `css/` or `index.html` unless the task says so (a new scenario still gets its `<script>` tag and the `?v=N` bump from "Adding a scenario" in `AGENTS.md`).

## Ready

### 9. Playtest pass, one scenario per branch (`fix/play-<id>`)

Done: `is-gorusmesi`, `saglik-raporu`, `tahtaya-kalk`, `apartman-kedisi`. Next: `piknik-karincasi`. Only touch the scenario file of your branch, `tests/engine.js` and `tests/play/<id>.txt`. Write the txt file with an editor or node, not PowerShell `echo` (that writes UTF-16).

Do these one at a time, in this order (newest and least tested first): `is-gorusmesi`, `saglik-raporu`, `tahtaya-kalk`, `apartman-kedisi`, `piknik-karincasi`, `2010-bir-gun`. One scenario = one branch = one review. Do not start the next one until Claude merged the previous one.

For the scenario you took:

1. For **every step**, write down 10 inputs a real person would type on a phone: short answers ("evet", "olur", "napim", "abi ne"), slang and typos ("bakıyom", "tmm", "slm"), a question back to the character, a refusal ("istemiyorum", "yapmam"), a sentence that only *contains* a keyword ("annem de böyle derdi"), and one swear. Put them in your branch as `tests/play/<id>.txt` (one line per input, `# step` headers).
2. Run `node tests/play.js <id>`: it plays every line of your txt file at its step and prints the game's reply. Do not write your own test script. **Read every reply.** For every input where the reply does not fit what was typed (a refusal that makes you do the thing, "korkmuyorum" that makes you faint, a freeze text saying "sustun" after the player said "hayır"): add the missing stem to the right intent, add a small new intent that answers it, or make it a `freeze` case. Never fix it by making a keyword shorter or broader.
3. Every step gets 2-3 of its **own** `fallbacks` that mention what is happening right now and end with a question. The scenario-level `fallbacks` are the last resort.
4. Add at least 5 lines for this scenario to `PLAY` in `tests/engine.js` (inputs that failed before your fix).
4b. **Bare verbs and present tense.** For every intent that means *doing* something, also type the bare imperative ("geç", "koş", "atla", "bak"), the present ("geçiyorum", "koşuyorum") and a short refusal ("geçmiyorum"). Players type these far more than "gecerim". (The matcher now turns a keyword like `gecerim` into the stem `gec`, so these usually work; if one does not, add the stem as its own keyword. Keywords written only as `...arim/...erim` are a smell: add the plain stem too.) Put these inputs in your txt file.
5. Do not add steps, endings or new mechanics. Do not rewrite texts that already work. A scene that answers what the player wrote is the goal, not a longer scene.

Report: the inputs whose reply did not fit before your fix, per step, and what each one gets now (paste the lines from `node tests/play.js`). Also check `positive`: an intent that means *doing* something keeps `positive: true`; for a negative form that still means doing it ("bakamam" = I can't look = I faint), add a separate intent without `positive` instead of removing it.

9b is small; do it between two playtest branches when the owner asks.

### 9b. `remember` lines for `is-gorusmesi` (`content/remember-interview`)

After `fix/play-is-gorusmesi` is merged. `is-gorusmesi` is the only scenario without `remember` (see AGENTS.md "Scenario format"). Copy the shape from `berber.js`: 6-8 own lines for the funniest endings, `default`, `often`, and 1-2 `cameos` (e.g. after `saglik-raporu:rapor_tamam`: the report is finally done). Test by setting `localStorage` in the browser console, as in the remember block of `tests/engine.js`.

### 10. Same playtest pass for the older scenarios

After 9 is done, same steps for `goz-temasi`, `otobus-teyzesi`, `misafirlik`, `berber`, `terk-edilmis-koy`, `yetersiz-bakiye`. These were played by friends already, so check `FEEDBACK.md` lines for them first.

## Later (owner's ideas, not for agents yet)

- More scenarios (paused by owner): cockroach (the immortal enemy of the terlik).

- Friends' playtest notes are in `FEEDBACK.md` (read it before content work). Open: tappable suggestions when stuck; collecting unmatched inputs is the most useful next step.

- Anonymous story submissions: a "Hikâyeni anlat" link already exists in the page, hidden until `STORY_FORM_URL` in `js/main.js` is set (e.g. a Google Form). Later: collect them, turn the best into scenario beats.
- **Unmatched inputs (owner builds this, his backend project):** a small API that receives the sentences the game did not understand (`logUnmatched` in `js/engine.js`), stores them, and a page that lists the most common ones per scenario and step. The game sends them with one `fetch`, fire-and-forget, no personal data. Then agents use that list to add the missing replies.
- Endings gallery: a page listing found/missing endings per scenario (titles of missing ones hidden).

## Done
- The game remembers the player: last ending on a return, cameos from other scenarios on a first visit; `remember` in 11 scenarios (Claude, `feature/remember`)
- New scenario: 2010 nostalgia (`content/nostalgia-2010`; Claude fixed keywords, freezes and endings before merge)
- Barber loop at the last steps fixed (Gemini found the cause, Claude fixed it; branch `fix/barber-short`)
- New scenario: picked for the board (`content/classroom`)
- New scenario: health report at the devlet hastanesi (`content/hospital-report`)
- New scenario: you are an ant at a family picnic (`content/ant-picnic`, commit `5704da7`)
- Keyword coverage: chat spelling, verb bends, synonyms players type; `tests/engine.js` (branch `fix/keyword-coverage`)
- Scenario audit: misfiring keywords, open questions without a freeze, echoed player lines, typos; validator checks reachability (branch `fix/scenario-audit`)
- New scenario: job interview (`content/job-interview`, commit `b6a9065`)
- New scenario: you are the apartment cat (`content/apartment-cat`, commit `53ee044`)
- One fourth-wall moment per scenario (`content/fourth-wall`, commit `10a316c`)
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
