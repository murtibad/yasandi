// Game engine: pure logic, no DOM. Takes player input, returns what to print.
(function () {
  const { normalize, matches, pick } = window.Yasandi.text;

  const STORAGE_ENDINGS = "yasandi.endings.";
  const STORAGE_UNMATCHED = "yasandi.unmatched";

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
      return readJson(STORAGE_ENDINGS + this.scenario.id, []);
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
      const intent = this.candidates().find((i) => i.keywords.some((k) => matches(normalized, k)));

      if (intent) {
        this.misses = 0;
        if (intent.goto) this.nodeId = intent.goto;
        return this.resolve(intent);
      }

      this.logUnmatched(input);
      this.misses += 1;
      if (this.scenario.patience && this.misses >= this.scenario.patience) {
        return this.resolve(this.scenario.patienceIntent);
      }
      const node = this.scenario.nodes[this.nodeId];
      const text = pick(node.fallbacks || this.scenario.fallbacks, this.lastFallback);
      this.lastFallback = text;
      return { text };
    }

    resolve(intent) {
      const result = { text: pick(intent.text) };
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
