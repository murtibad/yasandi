# TASKS

**Owner decision (2026-09-29): no new scenarios for now.** Improve the existing six: more absurd turns, more reply variants, better endings. Scenario ideas stay in `ideas/` for later.

Queue for AI agents. Take the first item under **Ready**. Follow `AGENTS.md` (read "Turkish voice" and "Memes and trends" twice). Never push to `main`; push a branch. One task per branch.

## Ready

### 5. Ekşi Sözlük pattern mining (`content/eksi-patterns`)

AI-written jokes all sound the same. Real people's stories don't. This task brings real Turkish humor into the six existing scenarios. **No new scenarios.**

Why it works (read this first): in real "yaşanmış komik olaylar" stories, the humor almost never comes from someone else doing something funny. It comes from **the narrator's own small mistake and their refusal to admit it**: taking the whole cookie plate when offered one cookie, limping off the bus so the ladies who shamed you feel guilty and then limping all the way home, finishing a stranger's gym program because you didn't want to look stupid, secretly putting the lost TV remote back and becoming the family hero. Also: the elder's one-line comeback that makes the whole bus laugh; two people talking on the phone while sitting two meters apart. Claude already added some of these (search for `fake-limp`, `mock-teyze`, `whole-tray`, `remote`, `photo`), use them as examples.

1. Read the Ekşi Sözlük entries for "yaşanmış komik olaylar" and similar threads (e.g. "otobüste yaşanan komik olaylar", "misafirlikte yaşanan komik olaylar", "berberde yaşanan komik olaylar", "başa gelen en utanç verici olay"). Read at least 60 entries.
2. Write `ideas/eksi-patterns.md`: 20 patterns. For each: the pattern in one line (the mechanism, not the story), which existing scenario it fits and at which step, and the in-game beat **retold in your own words** with our characters (Nebahat teyze, Remzi usta, keko, Hüsnü, Tuncay...).
3. Implement the 10 best in the existing scenarios: as new intents, `exhausted` payoffs, `first: true` common intents, `look` details that seed them (the remote under the cushion is seeded by a fallback line), or new endings. Each needs keywords a real player would type.
4. Rules: never copy a sentence, username or real name from Ekşi; skip anything about sex, disability, ethnicity, LGBT people, violence against children, or real people. Keep the Turkish voice rules.
5. Validate (0 warnings), play every changed path, push the branch.

## Done

- `ideas/memes.md`: Turkish meme bank, patterns only (branch `feature/memes`)
- "Niyetimiz Çalıp Çırpmak Değil" (`terk-edilmis-koy.js`, branch `feature/abandoned-village`)
- Refresh all scenarios (`content/refresh`, branch `content/refresh`, commit `51f2c0b`)
- "Kısa Olmasın" (`berber.js`, branch `feature/barber`, commit `96a1f19`)
- "Bi Tabak Daha" (`misafirlik.js`, branch `feature/guest-visit`, commit `7fac2e1`)
- Write `ideas/ideas.md`: 12 new scenario ideas (branch `feature/ideas`, commit `a07f205`)
- New scenario: "Yetersiz Bakiye" (`yetersiz-bakiye.js`, branch `feature/insufficient-balance`, commit `c677a58`)
- Bus scenario "Yer Ver" (`otobus-teyzesi.js`), deepened with tension and 24 endings (main, `0f45ffe`)
