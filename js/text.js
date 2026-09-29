// Text helpers: normalize Turkish input so "Hayırdır", "hayirdir" and "HAYIRDIR!!" all match the same keyword.
(function () {
  const FOLD = { "ç": "c", "ğ": "g", "ı": "i", "ö": "o", "ş": "s", "ü": "u", "â": "a", "î": "i", "û": "u" };

  function normalize(input) {
    const lower = String(input).toLocaleLowerCase("tr-TR");
    const folded = lower.replace(/[çğıöşüâîû]/g, (c) => FOLD[c]);
    const cleaned = folded.replace(/[^a-z0-9? ]+/g, " ").replace(/\s+/g, " ").trim();
    return " " + cleaned + " ";
  }

  // A keyword matches when it appears at the start of a word, so "kac" matches "kaçıyorum" and "kaçtım".
  // Multi-word keywords work the same way: "yanlis anladin" matches "abi yanlış anladın ya".
  function matches(normalizedText, keyword) {
    const kw = normalize(keyword).trim();
    if (!kw) return false;
    if (kw === "?") return normalizedText.trim() === "?";
    return normalizedText.includes(" " + kw);
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
