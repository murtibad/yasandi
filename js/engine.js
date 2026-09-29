// Game engine: pure logic, no DOM. Takes player input, returns what to print.
(function () {
  const { normalize, matches, pick } = window.Yasandi.text;

  const STORAGE_ENDINGS = "yasandi.endings.";
  const STORAGE_UNMATCHED = "yasandi.unmatched";

  const FILLER = ["abi", "abicim", "gardas", "gardasim", "kardes", "kardesim", "kanka", "lan", "ya", "valla", "vallahi", "ben", "benim", "bizim", "reis", "hocam", "dayi"];

  // "arka mahalle abi" -> "Arka mahalle". Drops filler words at both ends, caps length.
  function cleanAnswer(input) {
    const words = String(input).replace(/[.!?,]+/g, " ").trim().split(/\s+/).filter(Boolean);
    const isFiller = (w) => FILLER.includes(normalize(w).trim());
    while (words.length && isFiller(words[0])) words.shift();
    while (words.length && isFiller(words[words.length - 1])) words.pop();
    const text = words.join(" ").slice(0, 40);
    return text ? text.charAt(0).toLocaleUpperCase("tr-TR") + text.slice(1) : "";
  }

  const NEGATION_WORDS = new Set(["hayir", "yok", "asla", "olmaz", "istemem", "degilim"]);
  // vermiyorum, kalkmıyorum, vermem, kalkmam, vermeyeceğim, kalkmayacağım, vermicem, kalkmicam
  const NEGATION_ENDING = /(m[ai]yor(um|uz)?|miyom|mem|mam|meyecegim|mayacagim|micem|micam)$/;

  function isNegated(normalized) {
    return normalized.trim().split(" ").some((t) => NEGATION_WORDS.has(t) || NEGATION_ENDING.test(t));
  }

  // Turkish question particle by vowel harmony: Ahmet mi, Ayşe mi, Mahmut mu, Ali mi, Hasan mı, Gül mü.
  function questionParticle(word) {
    const vowels = word.toLocaleLowerCase("tr-TR").match(/[aeıioöuü]/g);
    const last = vowels ? vowels[vowels.length - 1] : "e";
    return { a: "mı", ı: "mı", e: "mi", i: "mi", o: "mu", u: "mu", ö: "mü", ü: "mü" }[last];
  }

  function fillAnswer(text, answer) {
    return text.replace(/\{input\}/g, answer).replace(/\{mi\}/g, questionParticle(answer));
  }

  function readJson(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) {
      return fallback;
    }
  }

  function writeJson(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* storage blocked: game still works */ }
  }

  class Game {
    constructor(scenario, globalIntents) {
      this.scenario = scenario;
      this.globalIntents = globalIntents;
      this.reset();
    }

    reset() {
      this.nodeId = "start";
      this.misses = 0;
      this.lastFallback = null;
      this.ended = null;
    }

    intro() {
      return this.scenario.nodes.start.text;
    }

    foundEndings() {
      const found = readJson(STORAGE_ENDINGS + this.scenario.id, []);
      return found.filter((id) => id in this.scenario.endings);
    }

    totalEndings() {
      return Object.keys(this.scenario.endings).length;
    }

    // Candidate intents, in priority order: this step, the step it inherits, scenario-wide, then global.
    candidates() {
      const node = this.scenario.nodes[this.nodeId];
      const list = [...(node.intents || [])];
      if (node.inherits) list.push(...(this.scenario.nodes[node.inherits].intents || []));
      list.push(...(this.scenario.common || []));
      const overrides = this.scenario.overrides || {};
      for (const g of this.globalIntents) list.push(overrides[g.id] ? { ...g, ...overrides[g.id] } : g);
      return list;
    }

    // Returns { text, ending?: { id, title, tag, isNew } }
    handle(input) {
      if (this.ended) return { text: "Bu hikâye bitti. Tekrar oynamak için \"tekrar\" yaz." };

      const normalized = normalize(input);
      // `whole: true` intents only fire when the keyword is (almost) the entire input:
      // "kanka" or "tamam kanka" (a listed phrase) triggers it, "Yıldırım kanka" (an answer that mentions kanka) does not.
      const hits = (i, k) => {
        if (!matches(normalized, k)) return false;
        if (!i.whole) return true;
        const extra = normalized.trim().split(" ").length - normalize(k).trim().split(" ").length;
        return extra <= 0;
      };
      // "yer vermiyorum" must not count as "yer ver": intents marked `positive` are skipped when the input is negated.
      const negated = isNegated(normalized);
      const intent = this.candidates().find((i) => !(negated && i.positive) && i.keywords.some((k) => hits(i, k)));

      if (intent) {
        this.misses = 0;
        if (intent.goto) this.nodeId = intent.goto;
        return this.resolve(intent);
      }

      const node = this.scenario.nodes[this.nodeId];

      // Open questions ("Kimlerdensin?") accept any answer and echo it back.
      if (node.acceptAny) {
        const answer = cleanAnswer(input);
        if (answer) {
          this.misses = 0;
          const chosen = pick(node.acceptAny);
          if (chosen.goto) this.nodeId = chosen.goto;
          return this.resolve({ ...chosen, text: fillAnswer(pick(chosen.text), answer) });
        }
      }

      this.logUnmatched(input);
      this.misses += 1;
      const patience = node.patience || this.scenario.patience;
      if (patience && this.misses >= patience) {
        return this.resolve(node.patienceIntent || this.scenario.patienceIntent);
      }
      const text = pick(node.fallbacks || this.scenario.fallbacks, this.lastFallback);
      this.lastFallback = text;
      // The narrator nudges the player after the second miss in a row.
      const hint = this.misses >= 2 ? node.hint : undefined;
      return { text, hint };
    }

    resolve(intent) {
      const result = { text: pick(intent.text), hint: intent.hint };
      if (intent.ending) {
        const meta = this.scenario.endings[intent.ending];
        const found = this.foundEndings();
        const isNew = !found.includes(intent.ending);
        if (isNew) writeJson(STORAGE_ENDINGS + this.scenario.id, [...found, intent.ending]);
        this.ended = intent.ending;
        result.ending = { id: intent.ending, title: meta.title, tag: meta.tag, isNew };
      }
      return result;
    }

    // Kept locally for now. Later this can post to a free database so new keywords can be added.
    logUnmatched(input) {
      const entry = { scenario: this.scenario.id, node: this.nodeId, input: String(input).slice(0, 200), at: new Date().toISOString() };
      const log = readJson(STORAGE_UNMATCHED, []);
      log.push(entry);
      writeJson(STORAGE_UNMATCHED, log.slice(-200));
      console.info("[yasandi] anlaşılmadı:", entry);
    }
  }

  window.Yasandi.Game = Game;
})();
