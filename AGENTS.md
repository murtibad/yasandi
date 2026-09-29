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
- Each intent: `{ id, keywords, text, goto? , ending?, hint? }`. Never both `goto` and `ending`.
- **Keywords** are lowercase, without Turkish characters (`kac` not `kaç`), and match at the start of a word, so a stem covers suffixes (`kac` matches "kaçıyorum"). Keep stems long enough to avoid accidental matches (3+ letters).
- First matching intent wins, in this order: the node's own intents, its `inherits` node, scenario `common`, then global intents (which a scenario can replace via `overrides`).
- **Negation.** The matcher does not read grammar: "yer vermiyorum" contains "yer ver". Mark every intent that means the player *does* something (give the seat, run, sleep, get off, attack) with `positive: true`. When the input is negated (vermiyorum, kalkmam, hayır, olmaz...), those intents are skipped, so add the refusal words ("vermiyorum", "kalkmiyorum", "oturuyorum") to the matching "ignore/stay" intent.
- **Keyword length.** Keywords match at the start of any word. Never use keywords under 3 letters ("in" matches "insan", "inat"; "tak" matches "takılıyorum"). `node tests/validate.js` warns about them.
- `whole: true` on an intent means it only fires when the keyword is the whole input.
- `acceptAny: [...]` on a node accepts any answer to an open question. `{input}` is replaced by the player's words, `{mi}` by the right question particle (mı/mi/mu/mü).
- `fallbacks`: replies when nothing matches. **Every fallback must end with pressure or a question** so the player knows what to answer. Never write "X yazdığını anlamadı".
- `hint` on a node: the narrator's nudge, shown after two misses. It suggests directions, it never lists all options.
- `patience` / `patienceIntent`: after N misses in a row, this fires (usually an ending).
- `endings`: `{ id: { title, tag } }`. Tags: `ÖLDÜN`, `KURTULDUN`, `SOYULDUN`, `BAYILDIN`, or a new short uppercase word if it fits. Aim for 12+ endings per scenario, mixed good and bad.

## Writing rules (important)

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

## Git

- Branches, commit messages and code identifiers in **English**. Game text in Turkish.
- Commit style: `feat: add bus scenario`, `content: more keko endings`, `fix: ...`.
- Small commits. Push to `main` only after `node tests/validate.js` passes.
- Do not rewrite history, do not force-push, do not delete other scenarios or endings unless asked.
