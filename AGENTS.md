# AGENTS.md

Rules for any AI agent (Gemini, Claude, others) working on this repo. Read this fully before changing anything.

## What this is

**Yaşandı** is a Turkish, browser-based text game. Each scenario is a short, funny, everyday moment from Turkey (a "keko" stares at you, an old lady stares at you on the bus for your seat, the teacher picks you out of the class). The player types freely in Turkish; the game matches keywords and answers.

- Plain HTML/CSS/JS. **No frameworks, no build step, no npm packages, no backend, no AI API.** It must keep working by opening `index.html` and on GitHub Pages.
- Live site: https://murtibad.github.io/yasandi (auto-deploys from `main`).

## Files

```
index.html                          page; loads every script with ?v=N cache-busting
css/style.css                       dark look, white text; do not restyle without being asked
js/text.js                          Turkish normalize/match helpers
js/engine.js                        game logic (no DOM)
js/main.js                          screen: typewriter, input, endings counter
js/data/global-intents.js           intents valid in every scenario (police, mom, dance...)
js/data/scenarios/<id>.js           one file per scenario, content only
tests/validate.js                   checks scenarios for broken links
```

## Scenario format

Copy `js/data/scenarios/goz-temasi.js` as the reference. It is the best example of every feature.

- `nodes.start.text` is the opening. Every other node is reached through `goto`.
- A non-start node may have its own `text` (a question or new situation). It is shown right after the reply of the intent that leads there, so do not repeat it in that reply.
- Each intent: `{ id, keywords, text, goto? , ending?, hint? }`. Never both `goto` and `ending`.
- **Keywords** are lowercase, without Turkish characters (`kac` not `kaç`), and match at the start of a word, so a stem covers suffixes (`kac` matches "kaçıyorum"). Keep stems long enough to avoid accidental matches (3+ letters).
- First matching intent wins, in this order: the node's own intents, its `inherits` node, scenario `common`, then global intents (which a scenario can replace via `overrides`).
- **Negation.** The matcher does not read grammar: "yer vermiyorum" contains "yer ver". Mark every intent that means the player *does* something (give the seat, run, sleep, get off, attack) with `positive: true`. When the input is negated (vermiyorum, kalkmam, hayır, olmaz...), those intents are skipped, so add the refusal words ("vermiyorum", "kalkmiyorum", "oturuyorum") to the matching "ignore/stay" intent.
- **Keyword length.** Keywords match at the start of any word. Never use keywords under 3 letters ("in" matches "insan", "inat"; "tak" matches "takılıyorum"). `node tests/validate.js` warns about them.
- `whole: true` on an intent means it only fires when the keyword is the whole input.
- `acceptAny: [...]` on a node accepts any answer to an open question. `{input}` is replaced by the player's words, `{mi}` by the right question particle (mı/mi/mu/mü).
- `fallbacks`: replies when nothing matches. **Every fallback must end with pressure or a question** so the player knows what to answer. Never write "X yazdığını anlamadı".
- `look` on a node: what the narrator describes when the player asks a question instead of acting ("nereye saklayabilirim?", "ne yapabilirim?", "neler var?"). Describe the room and the people concretely (where things are, who is watching), never list commands. Falls back to `hint`. Every node where the player may feel stuck should have one.
- `hint` on a node: the narrator's nudge, shown after two misses. It suggests directions, it never lists all options.
- **Endings must match their outcome.** An ending's `title` and `tag` describe what the text of the intent that leads there says. Do not reuse an ending for a different outcome just because it exists: add a new one. Every ending is reached by at least one intent and reads well on its own.
- After `{input}` always use `{mi}`, never a fixed "mi" (the validator warns).
- `patience` / `patienceIntent`: after N misses in a row, this fires (usually an ending).
- `endings`: `{ id: { title, tag } }`. Tags: `ÖLDÜN`, `KURTULDUN`, `SOYULDUN`, `BAYILDIN`, or a new short uppercase word if it fits. Aim for 12+ endings per scenario, mixed good and bad.

## Writing rules (important)

- **Do not echo the player.** The engine drops a reply's first line when it starts with `»`, because the player just typed their own words. Start replies with the other character's reaction or with narration. Use `»` only for the player's words later in the scene ("» Hangi maç?").
- **No word-for-word repeats.** When the same intent fires twice, the engine won't show the same text again; it nudges the player instead. Give intents that are easy to hit twice (refusals, "tokum", "pardon") a `text` array of 2-3 variants that escalate.
- **Player's spoken lines start with `»`** on their own line: `"» Pardon abi.\n— Abi mi? Ben senin abin miyim lan?"`. The screen shows them dim like the player's own input. Never write `— ..., dedin.`
- Other characters speak with `— ` at line start. Narration is plain text.
- Never put words in the player's mouth that contradict what they typed. If unsure, narrate the action instead of quoting them.
- Humor comes from specific, recognizable Turkish details (tespih, çekirdek-kola, bakkal, dolmuş, "kimlerdensin") and deadpan narration. Short sentences.
- Deaths and violence stay cartoonish and absurd (stabbed in the butt, hit by a flying terlik). No gore, no real people, no real team names, no slurs, no targeting of real groups. Mothers and elders are portrayed warmly, even when annoying.
- Street/informal Turkish in dialogue is good ("ne bakıyon", "gardaş").

## Adding a scenario

1. Create `js/data/scenarios/<id>.js` (kebab-case id, no Turkish characters).
2. Add its `<script>` tag in `index.html` **before** `js/engine.js`.
3. Bump `?v=N` on all script/css tags in `index.html` (so browsers load the new files).
4. Run `node tests/validate.js`. It must print `All scenarios OK`. Fix every ERROR; read every WARN.
5. Play it in a browser: try the obvious answers a real person would type first ("efendim", "pardon", "ne var") and make sure each one is understood.
   Also try refusals ("yer vermiyorum", "kaçmıyorum") and sentences that merely contain your keywords ("insanlar bana bakıyor"). None of them may trigger an ending by accident.

## Turkish voice (the most important section)

The game lives or dies on whether it sounds like real Turkish people talking. Textbook Turkish kills the joke.

- Write dialogue the way people speak, not the way a translation reads.
  - Bad: `— Bir tabak daha yemelisin.` Good: `— Bi tabak daha yiyiver güzüm, ne olcak.`
  - Bad: `— Saçınızı kısa mı kesmemi istersiniz?` Good: `— Nasıl olsun abim? Yanlar sıfır mı?`
- Give people real-sounding names and titles: Nebahat teyze, Hayriye teyze, Remzi abi, Cemil usta, Sevim abla, Yakup Bey. Use "abim, güzüm, yavrum, evladım, kuzum, hocam, usta" where people really would.
- Regional flavor is welcome in dialogue (Karadeniz, Doğu, Ege) as long as it is affectionate, never mocking a region.
- Use the small, specific details everyone recognizes: sarma, tespih, çekirdek-kola, kolonya, "bir çay daha koyayım", İstanbulkart, WhatsApp aile grubu, "evde bulunamadınız" SMS'i, "abim bi bakayım" diyen usta.
- The narrator is deadpan and short. One dry sentence beats three explained ones. Never explain the joke.

## Memes and trends

Build scenarios around moments and memes Turkish internet already knows, not around long stories.

- **Public figures:** a well-known, harmless meme about a public figure's public work (a footballer's shots flying over the bar, a presenter's catchphrase) may be used with a **parody name** that everyone recognizes (e.g. "Başır Alpler"). Keep it affectionate and limited to the meme itself: no invented quotes about their private life, politics, family or health, no insults, nothing that could read as a real claim about them.
- **Channels and brands:** parody names only, same rules.
- **Never:** private people or relatives of public figures, victims of real news, memes built on stereotypes about women, regions, ethnicities, religions or disabled people.
- Songs and artists may appear only as a background detail ("kulağında Manifest çalıyor"). Never quote lyrics.
- Running gags that may appear in any scenario: the narrator saying "Ama bu başka bir hikâyenin konusu." when something interesting is skipped; a password that keeps getting stolen ("şifren yine isim123'müş"); a shot that "füze gibi çıktı, kalenin üstünden gitti".

## Workflow (read this first)

1. `git pull`, then open `TASKS.md` and take the first item under **Ready**.
2. **Never push to `main`.** `main` is the live site. Create a branch named `feature/<short-name>`, `content/<short-name>` or `fix/<short-name>` and push that branch.
3. Before the last push: `node tests/validate.js` must show 0 errors and 0 warnings, and you must play the scenario yourself with the checks in "Adding a scenario".
4. When done, move the task to **Done** in `TASKS.md` (branch name + commit hash) and tell the user: branch name, number of steps/endings, validate output. Claude reviews the branch and merges it into `main`.

## Git

- Branches, commit messages and code identifiers in **English**. Game text in Turkish.
- Commit style (Conventional Commits): `feat: add bus scenario`, `content: more keko endings`, `fix: negation in bus scenario`. One logical change per commit, subject line under 72 characters.
- Do not rewrite history, do not force-push, do not delete other scenarios or endings unless asked.

## Sources and references

- Ideas may come from real-life anecdotes and from sites like Ekşi Sözlük, but **only as inspiration**: never copy sentences, never use usernames, retell everything in your own words with invented, generic characters. Do not mention real people, real brands or real teams.
- Naming a song or artist as background detail is fine ("kulağında Manifest çalıyor", "Müslüm Gürses açtı"). Never quote lyrics, never make an artist say or do something, never mock them.
- Keep the whole site light: plain text only, no images, fonts or audio files. Total size of `js/` + `css/` should stay under 300 KB.
