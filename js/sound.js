// Sound: tiny blips generated with Web Audio. No audio files, nothing to download.
// Browsers only allow sound after the player interacts, so the first keypress or tap unlocks it.
(function () {
  const STORAGE = "yasandi.sound";
  let ctx = null;
  let enabled = true;
  try { enabled = localStorage.getItem(STORAGE) !== "off"; } catch (e) { /* storage blocked */ }

  function context() {
    if (!ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      ctx = new AC();
    }
    if (ctx.state === "suspended") ctx.resume();
    return ctx;
  }

  function tone({ freq, to, type = "square", duration = 0.05, volume = 0.04, delay = 0 }) {
    if (!enabled) return;
    const c = context();
    if (!c || c.state !== "running") return;
    const t = c.currentTime + delay;
    const osc = c.createOscillator();
    const gain = c.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t);
    if (to) osc.frequency.exponentialRampToValueAtTime(to, t + duration);
    gain.gain.setValueAtTime(volume, t);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + duration);
    osc.connect(gain).connect(c.destination);
    osc.start(t);
    osc.stop(t + duration + 0.02);
  }

  function noise({ duration = 0.12, volume = 0.08, delay = 0, highpass = 2500 }) {
    if (!enabled) return;
    const c = context();
    if (!c || c.state !== "running") return;
    const t = c.currentTime + delay;
    const buffer = c.createBuffer(1, Math.floor(c.sampleRate * duration), c.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / data.length);
    const src = c.createBufferSource();
    const filter = c.createBiquadFilter();
    const gain = c.createGain();
    filter.type = "highpass";
    filter.frequency.value = highpass;
    gain.gain.value = volume;
    src.buffer = buffer;
    src.connect(filter).connect(gain).connect(c.destination);
    src.start(t);
  }

  // One blip per typed letter; each speaker has its own pitch, a bit random so it sounds like talking.
  const VOICES = { narrator: 190, other: 330, player: 260 };
  function blip(voice) {
    const base = VOICES[voice] || VOICES.narrator;
    tone({ freq: base * (0.9 + Math.random() * 0.25), duration: 0.035, volume: 0.025 });
  }

  const stings = {
    // A switchblade: a metallic flick, then a short swish.
    death() {
      tone({ freq: 2400, to: 3800, type: "triangle", duration: 0.06, volume: 0.05 });
      noise({ duration: 0.18, volume: 0.09, delay: 0.07 });
      tone({ freq: 120, to: 50, type: "sine", duration: 0.35, volume: 0.12, delay: 0.25 });
    },
    good() {
      [523, 659, 784].forEach((f, i) => tone({ freq: f, type: "triangle", duration: 0.12, volume: 0.05, delay: i * 0.09 }));
    },
    other() {
      tone({ freq: 220, to: 110, type: "sawtooth", duration: 0.25, volume: 0.05 });
    },
  };

  window.Yasandi = window.Yasandi || {};
  window.Yasandi.sound = {
    blip,
    sting(kind) { (stings[kind] || stings.other)(); },
    unlock() { if (enabled) context(); },
    isOn() { return enabled; },
    toggle() {
      enabled = !enabled;
      try { localStorage.setItem(STORAGE, enabled ? "on" : "off"); } catch (e) { /* storage blocked */ }
      if (enabled) context();
      return enabled;
    },
  };
})();
