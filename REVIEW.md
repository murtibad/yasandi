# REVIEW: content/comedy-pass

Claude's review. Good work overall (Yaşar Bey, "niye berbere geldin lan", the Osmanlı tokadı, "boşluğa sarıldı"). Fix these on this branch, delete this file, push.

## Must fix

1. **berber.js, ending `sir` ("Devlet Sırrı"):** men in black take you and the barber away and "nobody saw you again". In Turkey this reads as a joke about real enforced disappearances. Remove the intent and the ending, or replace it with a harmless absurd secret (e.g. the usta whispers the secret recipe of his cologne, and it is just lemon and cologne).
2. **berber.js, ending `deli_berber`:** title "Deli Berber", tag "HASTANELİK", but the text is the usta getting fed up and throwing you out. Title and tag must match what happens, e.g. `{ title: "Niye Berbere Geldin", tag: "KOVULDUN" }`.
3. **goz-temasi.js, ending `deli` ("Deli Taklidi"):** keep the idea (pretending to lose it so the keko backs off), but rename it without "deli", e.g. `{ title: "Kafayı Yemiş Numarası", tag: "KURTULDUN" }`, and make sure the text mocks the player's act, not mental illness.

## Then

When these are fixed and pushed, go on with task 8 in `TASKS.md` (Yetersiz Bakiye rework) on a new branch from `main`.
