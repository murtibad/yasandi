# REVIEW: fix/play-is-gorusmesi (Claude, 2026-10-01)

Not merged. The branch lowered the "missed" count by adding broad keywords. That is exactly what TASKS.md item 9 step 2 forbids ("Never fix it by making a keyword shorter or broader"), and the game now answers *less* to the point than before.

Also: your test script read `g.lastIntent`, which does not exist in `js/engine.js`, so its before/after numbers were not measuring anything. Use `handle()`'s returned text and read it.

## What I typed on your branch and what happened

| Step | Input | Reply | Problem |
|---|---|---|---|
| q-zayiflik | bilmiyorum | "Kral özgüvene bak!" (the "kusursuzum" reply) | "bilmiyorum" is a freeze word: it must reach `freeze`, not an intent. Also wrong reply. |
| q-zayiflik | hızlı öğrenirim | "Fazla dürüst" → ending | a strength was read as a weakness |
| q-soru | saat kaç bitiyor görüşme | tabldot → ending | "saat" fires on any time question |
| q-soru | çalışma ortamı nasıl | tabldot → ending | "calisma" too broad |
| q-soru | maaş ne zaman yatıyor | "Cuma gününe kadar ararız" → ending | ok-ish, but "maas" in `yemek` is too broad too |

## Fix exactly this, on the same branch

1. Remove these keywords you added: `hic`, `bilmiyorum`, `yok` (zayiflik/`yok`); `uyku`, `hizli`, `yavas` (`durust`); `istiyorum`, `gelistir` (`kariyer`); `ilk`, `ogrenci` (`ilk-is`); `iyi`, `guzel`, `kariyer`, `deneyim` (`prestij`); `maas`, `saat`, `calisma` (`yemek`); `zengin` (`yuksek`).
2. For the inputs those were meant to catch, use specific stems or two-word phrases instead: `ilk isim`, `ilk is`, `hic calismadim`, `yeni mezun`, `tecrubem yok`; `uykucuyum`, `yavasim`, `inatciyim`; `calisma saat`, `mesai saat`, `maas ne zaman`; `kendimi gelistir`.
3. A strength is not a weakness: "hızlı öğrenirim", "çalışkanım" must not reach `fazla_durust`.
4. Do what TASKS.md item 9 asks and the branch skipped: `tests/play/is-gorusmesi.txt`, 2-3 own `fallbacks` per step ending with a question, and 5+ lines in `PLAY` in `tests/engine.js`, including the five inputs in the table above.
5. Before pushing, run every input in `tests/play/is-gorusmesi.txt` and **read the reply**. "Not a fallback" is not the goal; "the reply fits what was typed" is.

Delete this file in your last commit.
