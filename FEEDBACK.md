# FEEDBACK

Playtest notes from friends (WhatsApp, 30 Sep - 1 Oct 2026). No names: this repo is public.
Agents: read this before content work. Items marked **fixed** are done; the rest are open.

## What people liked

- Sudden, absurd deaths ("Çok ani bir ölüm oldu, beklemiyordum... ama baya iyi"). Keep them.
- Otobüs "Kucak kucağa" ending, köy scene with Hüsnü ("daha çok yapcak, beğendim"), keko "Acarlardan" reply.
- Berber "Kulak yangını": "Bu ne, her türlü başıma iş geliyo" (said laughing).

## Biggest complaint: "my answer didn't matter"

Four of seven testers said it in their own words:
- "Bazen bir şey diyon ama belirli bir hikâye olduğu için senin dediğinden bağımsız karşılık veriyo."
- "Cevabımla alakalı cevap vermedi. Küfür edince de alınıyo."
- Two expected an AI that writes the story live ("yapay zekayla otomatik senaryo oluşturuyo sanmıştım", "yapay zeka gibi bir şey mi, dertleşmek için?").

What helps without an AI: catch more real sentences (see the list below for how people actually type), make fallbacks react to the scene, and collect unmatched inputs so we see what people type (TASKS: "Unmatched inputs").

## Concrete inputs that failed (all **fixed** on 1 Oct unless noted)

| Scenario / moment | Player typed | What happened | Now |
|---|---|---|---|
| Köy, dark room | a few unmatched lines, then "çekirdek var mı" | Hüsnü's intro repeated in a loop | Engine bug: patience moved the text but not the step. **fixed** |
| Misafirlik, after first plate | "kısır tam istediğim gibiydi ama yakında düğünüm vardı diyet yapmam lazımdı" | "Bir şey demedin" (read as silence) | "yapmam lazım" no longer counts as a refusal; long sentences never become silence; wedding/diet reply. **fixed** |
| Misafirlik, "hasta mısın?" | "ya havle evet" | "Pes ettin" ending | evet → çorba. **fixed** |
| Misafirlik, teyze reaches for your forehead | "baksın" | fallback | **fixed** |
| Misafirlik, "annen yedirmiyo mu?" | "teyze ne anlatıyosun ya evdede yedim zaten" | fallback | **fixed** |
| Berber, askerlik anısı | "evet", "böl", "dinlemek istemiyorum" | fallback, fallback, "Sesini çıkarmadın" | **fixed** |
| Berber, "bizim zamanımızda saygı vardı" | "zaman değişti" | fallback | **fixed** |
| Otobüs | "yorgun muyum ne kadar yorgunum ve elimde yük var mı" (a question) | ended the game | Teyze answers the question now. **fixed** |
| Keko standoff | a swear with "sikerim" | fallback | counts as swearing now. **fixed** |
| Misafirlik start | typed "doydum" but never sent it (phone) | "neden kaldı burada" | send button next to the input. **fixed** |
| End screen | Paylaş | "çalışmıyo" (phone) | uses the phone's share sheet now. **fixed** |

## Confusion about the goal

- "Mantık ve amacı ne bunun?", "Sona varmak ne demek, pes ettin vs diyor ya", "Belli bir son var, o sona gelene kadar devam mı ettiriyoruz?"
- **fixed:** first visit shows one line under the logo ("Türkiye'de yaşanmış anlar. Ne yapacağını yaz. Her hikâyenin bir sürü sonu var."); every ending shows "Bulduğun sonlar: 3/31. Başka bir şey yazsan başka bir son çıkardı."

## Open ideas from testers (owner decides)

- "Seçenek seçenek ilerleyebilir": show 2-3 tappable suggestions when the player is stuck. Trade-off: less mystery, but phone players type less.
- The hint appeared before the player typed "?" (it shows after two misses). Fine for now.
