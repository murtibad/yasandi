// Screen: typewriter output, input handling, endings counter.
(function () {
  const { Game, scenarios, globalIntents } = window.Yasandi;

  const log = document.getElementById("log");
  const form = document.getElementById("prompt");
  const input = document.getElementById("command");
  const scenarioLabel = document.getElementById("scenario-title");
  const endingsLabel = document.getElementById("endings-count");
  const actions = document.getElementById("end-actions");
  const replayBtn = document.getElementById("replay");
  const nextBtn = document.getElementById("next-scenario");

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const CHAR_DELAY = 22;

  let game = null;
  let typing = Promise.resolve();
  let skip = false;

  function scrollDown() {
    log.scrollTop = log.scrollHeight;
  }

  function typeInto(el, text) {
    return new Promise((resolve) => {
      if (reduceMotion) {
        el.textContent = text;
        scrollDown();
        return resolve();
      }
      let i = 0;
      el.classList.add("is-typing");
      const tick = () => {
        if (skip || i >= text.length) {
          el.textContent = text;
          el.classList.remove("is-typing");
          scrollDown();
          return resolve();
        }
        i += 1;
        el.textContent = text.slice(0, i);
        scrollDown();
        const ch = text[i - 1];
        const pause = ch === "\n" ? 260 : ".?!".includes(ch) ? 180 : CHAR_DELAY;
        setTimeout(tick, pause);
      };
      tick();
    });
  }

  // Lines starting with "»" are the player's own words: shown dim with ›› like typed commands.
  function splitSpeakers(text) {
    const groups = [];
    for (const line of text.split("\n")) {
      const player = line.startsWith("»");
      const content = player ? line.replace(/^»\s*/, "") : line;
      const last = groups[groups.length - 1];
      if (last && last.player === player && !player) last.lines.push(content);
      else groups.push({ player, lines: [content] });
    }
    return groups;
  }

  // Queue output so lines never type over each other.
  function say(text, className) {
    for (const group of splitSpeakers(text)) {
      typing = typing.then(() => {
        skip = false;
        const p = document.createElement("p");
        p.className = group.player ? "cmd said" : className || "say";
        log.appendChild(p);
        return typeInto(p, group.lines.join("\n"));
      });
    }
    return typing;
  }

  function echo(command) {
    const p = document.createElement("p");
    p.className = "cmd";
    p.textContent = command;
    log.appendChild(p);
    scrollDown();
  }

  function showEnding(ending) {
    typing = typing.then(() => {
      const box = document.createElement("div");
      box.className = "ending";
      const tag = document.createElement("span");
      tag.className = "ending-tag";
      tag.textContent = ending.tag;
      const title = document.createElement("span");
      title.className = "ending-title";
      title.textContent = "Son: " + ending.title + (ending.isNew ? " · yeni" : "");
      box.append(tag, title);
      log.appendChild(box);
      updateCounter();
      actions.hidden = false;
      scrollDown();
    });
  }

  function updateCounter() {
    endingsLabel.textContent = game.foundEndings().length + "/" + game.totalEndings() + " son";
  }

  function start(scenario) {
    game = new Game(scenario, globalIntents);
    log.innerHTML = "";
    actions.hidden = true;
    scenarioLabel.textContent = scenario.title;
    updateCounter();
    typing = Promise.resolve();
    say(game.intro());
    input.value = "";
    input.focus({ preventScroll: true });
  }

  function randomScenario(exceptId) {
    const pool = scenarios.length > 1 ? scenarios.filter((s) => s.id !== exceptId) : scenarios;
    return pool[Math.floor(Math.random() * pool.length)];
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const command = input.value.trim();
    input.value = "";
    skip = true; // finish the current line instantly
    if (!command) return;

    const normalized = window.Yasandi.text.normalize(command).trim();
    if (["tekrar", "yeniden", "bastan"].includes(normalized)) return start(game.scenario);
    if (["baska", "baska senaryo", "yeni senaryo"].includes(normalized)) return start(randomScenario(game.scenario.id));

    echo(command);
    const result = game.handle(command);
    say(result.text);
    if (result.hint) say(result.hint, "say narrator");
    if (result.ending) showEnding(result.ending);
  });

  // Tap anywhere on the story to skip the typing and focus the input.
  log.addEventListener("click", () => {
    skip = true;
    input.focus({ preventScroll: true });
  });

  replayBtn.addEventListener("click", () => start(game.scenario));
  nextBtn.addEventListener("click", () => start(randomScenario(game.scenario.id)));
  nextBtn.hidden = scenarios.length < 2;

  start(randomScenario());
})();
