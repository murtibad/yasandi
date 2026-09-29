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
  const shareBtn = document.getElementById("share");
  const soundBtn = document.getElementById("toggle-sound");
  const themeBtn = document.getElementById("toggle-theme");
  const storyLink = document.getElementById("story-link");
  const sound = window.Yasandi.sound;

  // Where people send their own stories. Leave empty to hide the link.
  const STORY_FORM_URL = "";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const CHAR_DELAY = 22;

  let game = null;
  let typing = Promise.resolve();
  let skip = false;
  let lastEnding = null;
  // Every new game bumps this; queued output from an older game is dropped instead of leaking in.
  let generation = 0;

  function scrollDown() {
    log.scrollTop = log.scrollHeight;
  }

  function typeInto(el, text) {
    return new Promise((resolve) => {
      // Phones with "reduce motion" or battery saver still get the typewriter, just faster.
      const speed = reduceMotion ? 0.4 : 1;
      const gen = generation;
      let i = 0;
      let voice = el.classList.contains("said") ? "player" : "narrator";
      el.classList.add("is-typing");
      const tick = () => {
        if (gen !== generation) return resolve();
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
        // Lines that start with "—" are someone else talking: different blip pitch.
        if (ch === "\n" || i === 1) {
          const lineStart = text.slice(i === 1 ? 0 : i);
          if (!el.classList.contains("said")) voice = lineStart.startsWith("—") ? "other" : "narrator";
        }
        if (i % 2 === 0 && /[a-zA-ZçğıöşüÇĞİÖŞÜ]/.test(ch)) sound.blip(voice);
        const pause = ch === "\n" ? 260 : ".?!".includes(ch) ? 180 : CHAR_DELAY;
        setTimeout(tick, pause * speed);
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
    const gen = generation;
    for (const group of splitSpeakers(text)) {
      typing = typing.then(() => {
        if (gen !== generation) return;
        skip = false;
        const p = document.createElement("p");
        p.className = group.player ? "said" : className || "say";
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
    const gen = generation;
    typing = typing.then(() => {
      if (gen !== generation) return;
      const box = document.createElement("div");
      box.className = "ending";
      const tag = document.createElement("span");
      tag.className = "ending-tag";
      tag.textContent = ending.tag;
      const title = document.createElement("span");
      title.className = "ending-title";
      title.textContent = "Son: " + ending.title + (ending.isNew ? " · yeni" : "");
      box.append(tag, title);
      const kind = ending.tag === "ÖLDÜN" ? "death" : /KURTULDUN|KAHRAMAN|ÜNLÜ/.test(ending.tag) ? "good" : "other";
      box.classList.add("ending--" + kind);
      log.appendChild(box);
      sound.sting(kind);
      if (kind === "death" && !reduceMotion) {
        document.body.classList.remove("hit");
        void document.body.offsetWidth; // restart the animation
        document.body.classList.add("hit");
      }
      lastEnding = ending;
      updateCounter();
      actions.hidden = false;
      scrollDown();
    });
  }

  function updateCounter() {
    endingsLabel.textContent = game.foundEndings().length + "/" + game.totalEndings() + " son";
  }

  function start(scenario) {
    generation += 1;
    skip = true; // finish whatever is still typing, it will be dropped
    game = new Game(scenario, globalIntents);
    log.innerHTML = "";
    actions.hidden = true;
    lastEnding = null;
    scenarioLabel.textContent = scenario.title;
    updateCounter();
    typing = Promise.resolve();
    say(game.intro()).then(() => {
      try {
        if (!localStorage.getItem("yasandi.pulsed")) {
          localStorage.setItem("yasandi.pulsed", "1");
          soundBtn.classList.add("pulse-once");
          themeBtn.classList.add("pulse-once");
        }
      } catch (e) {}
    });
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
    if (result.narrator) say(result.narrator, "say narrator");
    if (result.text) say(result.text);
    if (result.hint) say(result.hint, "say narrator");
    if (result.ending) showEnding(result.ending);
  });

  // Tap anywhere on the story to skip the typing and focus the input.
  log.addEventListener("click", () => {
    skip = true;
    input.focus({ preventScroll: true });
  });

  // Share: copy a one-line brag to the clipboard.
  shareBtn.addEventListener("click", async () => {
    if (!lastEnding) return;
    const line = "Yaşandı · " + game.scenario.title + " → " + lastEnding.title + " (" + lastEnding.tag + ") · " + game.foundEndings().length + "/" + game.totalEndings() + " son\n" + location.href.split("#")[0];
    try {
      await navigator.clipboard.writeText(line);
      shareBtn.textContent = "Kopyalandı";
    } catch (e) {
      shareBtn.textContent = "Kopyalanamadı";
    }
    setTimeout(() => (shareBtn.textContent = "Paylaş"), 1600);
  });

  // Sound toggle.
  const paintSound = () => {
    soundBtn.setAttribute("aria-label", sound.isOn() ? "Ses açık" : "Ses kapalı");
    soundBtn.setAttribute("aria-pressed", String(sound.isOn()));
  };
  soundBtn.addEventListener("click", () => { sound.toggle(); paintSound(); });
  paintSound();
  ["keydown", "pointerdown"].forEach((ev) => document.addEventListener(ev, () => sound.unlock(), { once: true }));

  // Light / dark. Follows the phone's setting until the player picks one.
  const THEME_KEY = "yasandi.theme";
  const systemDark = window.matchMedia("(prefers-color-scheme: dark)");
  const currentTheme = () => document.documentElement.dataset.theme || (systemDark.matches ? "dark" : "light");
  const paintTheme = () => themeBtn.setAttribute("aria-label", currentTheme() === "dark" ? "Açık mod" : "Koyu mod");
  try { const saved = localStorage.getItem(THEME_KEY); if (saved) document.documentElement.dataset.theme = saved; } catch (e) { /* storage blocked */ }
  themeBtn.addEventListener("click", () => {
    const next = currentTheme() === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem(THEME_KEY, next); } catch (e) { /* storage blocked */ }
    paintTheme();
  });
  paintTheme();

  if (STORY_FORM_URL) { storyLink.href = STORY_FORM_URL; storyLink.hidden = false; }

  replayBtn.addEventListener("click", () => start(game.scenario));
  nextBtn.addEventListener("click", () => start(randomScenario(game.scenario.id)));
  nextBtn.hidden = scenarios.length < 2;

  start(randomScenario());
})();
