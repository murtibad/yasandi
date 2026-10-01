// Text helpers: normalize Turkish input so "Hayırdır", "hayirdir" and "HAYIRDIR!!" all match the same keyword.
(function () {
  const FOLD = { "ç": "c", "ğ": "g", "ı": "i", "ö": "o", "ş": "s", "ü": "u", "â": "a", "î": "i", "û": "u" };

  // Chat spelling people really type. Applied to input and keywords alike, so either spelling matches.
  const SHORT = {
    tmm: "tamam", tamm: "tamam", ok: "tamam", okey: "tamam", okay: "tamam", oki: "tamam", oke: "tamam",
    evt: "evet", he: "evet", hee: "evet", heee: "evet",
    hyr: "hayir", hayr: "hayir", yo: "hayir", yoo: "hayir", yooo: "hayir", yk: "yok",
    bi: "bir", bisey: "bir sey", bisi: "bir sey", birsey: "bir sey", birsi: "bir sey",
    hicbir: "hic bir", hicbisey: "hic bir sey", hicbisi: "hic bir sey", hicbirsey: "hic bir sey",
    slm: "selam", sa: "selamun aleykum", mrb: "merhaba", mrhb: "merhaba", nbr: "naber", knk: "kanka",
    tsk: "tesekkurler", tskler: "tesekkurler", tsklr: "tesekkurler",
    napiyorsun: "ne yapiyorsun", napiyorum: "ne yapiyorum", napayim: "ne yapayim", naptin: "ne yaptin",
    noldu: "ne oldu", nooldu: "ne oldu", nolur: "ne olur",
    mk: "amk", oc: "orospu cocugu", sg: "siktir git",
  };
  const YO_SUFFIX = { m: "rum", n: "rsun", z: "ruz", nuz: "rsunuz", "": "r" };

  // "yapıyom" -> "yapiyorum", "bakıyon" -> "bakiyorsun", "geliyo" -> "geliyor", "bakmıyodum" -> "bakmiyordum".
  function colloquial(word) {
    const m = word.match(/^(.*[iu])yo(m|n|z|nuz|[sdl][a-z]*)?$/);
    if (m && m[1].length > 1) {
      const rest = m[2] || "";
      word = m[1] + "yo" + (rest in YO_SUFFIX ? YO_SUFFIX[rest] : "r" + rest);
    }
    return SHORT[word] || word;
  }

  function normalize(input) {
    const lower = String(input).toLocaleLowerCase("tr-TR");
    const folded = lower.replace(/[çğıöşüâîû]/g, (c) => FOLD[c]);
    const cleaned = folded.replace(/[^a-z0-9? ]+/g, " ").replace(/\s+/g, " ").trim();
    return " " + cleaned.split(" ").map(colloquial).join(" ") + " ";
  }

  // The same keyword as people bend it in a sentence:
  // "bekle" -> "bekliyorum", "ağla" -> "ağlıyorum" (the last vowel drops before -iyor),
  // "balık" -> "balığa", "ekmek" -> "ekmeği", "kitap" -> "kitabı" (k/p soften before a vowel).
  function variants(kw) {
    const out = [kw];
    const last = kw.split(" ").pop();
    if (last.length < 4) return out;
    if (/[ae]$/.test(last)) out.push(kw.slice(0, -1) + "iyor", kw.slice(0, -1) + "uyor");
    if (/k$/.test(last)) out.push(kw.slice(0, -1) + "g");
    if (/p$/.test(last)) out.push(kw.slice(0, -1) + "b");
    // A keyword written as "gecerim" / "kosarim" must also catch what players really type: "geç", "geçiyorum", "koş".
    // Stem of 4+ letters matches at the start of a word; a 3-letter stem only as a whole word or before -iyor,
    // so "gec" does not fire on "gecmis" or "bas" on "baska".
    const aorist = last.match(/^(.{3,})(arim|erim|irim|urim)$/);
    if (aorist) {
      const head = kw.slice(0, kw.length - last.length) + aorist[1];
      if (aorist[1].length >= 4) out.push(head);
      else out.push(head + " ", head + "iyor", head + "uyor");
    }
    return out;
  }

  // A keyword matches when it appears at the start of a word, so "kac" matches "kaçıyorum" and "kaçtım".
  // Multi-word keywords work the same way: "yanlis anladin" matches "abi yanlış anladın ya".
  // "=kac" only matches when it is the whole input ("kaç!" but not "saat kaç").
  // "#" matches any number ("50 bin", "40000").
  function matches(normalizedText, keyword) {
    const raw = String(keyword);
    if (raw === "#") return /\s\d/.test(normalizedText);
    if (raw.startsWith("=")) return normalizedText.trim() === normalize(raw.slice(1)).trim();
    const kw = normalize(raw).trim();
    if (!kw) return false;
    if (kw === "?") return normalizedText.trim() === "?";
    return variants(kw).some((v) => normalizedText.includes(" " + v));
  }

  function pick(value, avoid) {
    if (!Array.isArray(value)) return value;
    if (value.length === 1) return value[0];
    let choice;
    do { choice = value[Math.floor(Math.random() * value.length)]; } while (choice === avoid);
    return choice;
  }

  window.Yasandi = window.Yasandi || {};
  window.Yasandi.text = { normalize, matches, pick };
})();
