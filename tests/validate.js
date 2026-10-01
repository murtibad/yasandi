// Checks every scenario for broken links before you push.
// Run: node tests/validate.js   (exit code 1 on any error)
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
global.window = {};
require(path.join(root, "js/text.js"));
require(path.join(root, "js/data/global-intents.js"));

const scenarioDir = path.join(root, "js/data/scenarios");
const files = fs.readdirSync(scenarioDir).filter((f) => f.endsWith(".js"));
files.forEach((f) => require(path.join(scenarioDir, f)));

require(path.join(root, "js/engine.js"));
const index = fs.readFileSync(path.join(root, "index.html"), "utf8");
const errors = [];
const warnings = [];
const err = (msg) => errors.push(msg);

for (const f of files) {
  if (!index.includes(`js/data/scenarios/${f}`)) err(`index.html does not load js/data/scenarios/${f}`);
}

const { scenarios, globalIntents } = window.Yasandi;
const ids = new Set();

for (const s of scenarios) {
  const where = (x) => `[${s.id}] ${x}`;
  if (ids.has(s.id)) err(where("duplicate scenario id"));
  ids.add(s.id);
  if (!s.title) err(where("missing title"));
  if (!s.nodes || !s.nodes.start) { err(where("missing nodes.start")); continue; }
  if (!s.nodes.start.text) err(where("nodes.start has no text"));
  if (!s.endings || !Object.keys(s.endings).length) err(where("no endings"));

  // `remember`: what the narrator says when the player comes back, or arrives from another scenario.
  if (s.remember) {
    const mem = s.remember;
    const lines = [...Object.values(mem.endings || {}), mem.default, mem.often, ...(mem.cameos || []).map((c) => c.text)].flat().filter(Boolean);
    for (const id of Object.keys(mem.endings || {})) if (!s.endings[id]) err(where(`remember.endings.${id}: no such ending`));
    for (const c of mem.cameos || []) {
      if (!c.text) err(where("remember.cameos: an item has no text"));
      for (const ref of [].concat(c.after || [])) {
        const [sid, eid] = ref.split(":");
        const other = scenarios.find((x) => x.id === sid);
        if (!other) err(where(`remember.cameos: "${ref}" names no scenario`));
        else if (eid && !other.endings[eid]) err(where(`remember.cameos: "${ref}" names no ending of ${sid}`));
        if (sid === s.id) err(where(`remember.cameos: "${ref}" points at itself; use remember.endings`));
      }
    }
    // Shown before the first move: saved answers ({crush}, {name}) do not exist yet.
    for (const t of lines) {
      const bad = (String(t).match(/\{(\w+)\}/g) || []).filter((m) => m !== "{last}" && m !== "{runs}");
      if (bad.length) err(where(`remember: ${bad.join(", ")} is empty at the start; only {last} and {runs} work here`));
    }
  }

  const usedEndings = new Set();
  const checkIntent = (intent, label, needsKeywords) => {
    if (needsKeywords && (!Array.isArray(intent.keywords) || !intent.keywords.length)) err(where(`${label}: no keywords`));
    // Keywords match at the start of any word, so very short ones fire by accident ("in" matches "insan", "inat").
    // "=al" (whole input only) and "#" (any number) cannot.
    for (const k of intent.keywords || []) {
      const n = window.Yasandi.text.normalize(k).trim();
      if (n !== "?" && k !== "#" && !k.startsWith("=") && n.length < 3) warnings.push(where(`${label}: keyword "${k}" is shorter than 3 letters and will match by accident`));
    }
    if (!intent.text) err(where(`${label}: no text`));
    if (intent.goto && !s.nodes[intent.goto]) err(where(`${label}: goto "${intent.goto}" does not exist`));
    if (intent.ending) {
      if (!s.endings[intent.ending]) err(where(`${label}: ending "${intent.ending}" is not in endings`));
      usedEndings.add(intent.ending);
    }
    if (intent.goto && intent.ending) err(where(`${label}: has both goto and ending`));
    const texts = Array.isArray(intent.text) ? intent.text : [intent.text];
    for (const t of texts) {
      if (typeof t === "string" && /\{input\}\s+(mi|m[ıu]|mü)\b/.test(t)) warnings.push(where(`${label}: use {mi} instead of a fixed "mi/mı/mu/mü" after {input}`));
      if (typeof t === "string" && /, dedin\./.test(t) && /^—/m.test(t)) warnings.push(where(`${label}: player speech should start with » instead of "— ..., dedin."`));
    }
  };

  for (const [nodeId, node] of Object.entries(s.nodes)) {
    (node.intents || []).forEach((i) => checkIntent(i, `${nodeId}.${i.id || "?"}`, true));
    (node.acceptAny || []).forEach((i, n) => checkIntent(i, `${nodeId}.acceptAny[${n}]`, false));
    if (node.inherits && !s.nodes[node.inherits]) err(where(`${nodeId}: inherits "${node.inherits}" does not exist`));
    if (node.patienceIntent) checkIntent(node.patienceIntent, `${nodeId}.patienceIntent`, false);
    (node.intents || []).forEach((i) => i.exhausted && checkIntent(i.exhausted, `${nodeId}.${i.id}.exhausted`, false));
    if (node.freeze) {
      checkIntent({ keywords: ["xxx"], ...node.freeze }, `${nodeId}.freeze`, false);
      if (node.freeze.exhausted) checkIntent(node.freeze.exhausted, `${nodeId}.freeze.exhausted`, false);
    }
    if (node.patience && !node.patienceIntent && !s.patienceIntent) err(where(`${nodeId}: patience set but no patienceIntent`));
    if (nodeId !== "start" && !node.intents && !node.acceptAny) err(where(`${nodeId}: no intents and no acceptAny`));
  }
  (s.common || []).forEach((i) => checkIntent(i, `common.${i.id}`, true));
  if (s.patienceIntent) checkIntent(s.patienceIntent, "patienceIntent", false);
  for (const [gid, o] of Object.entries(s.overrides || {})) {
    if (!globalIntents.some((g) => g.id === gid)) err(where(`overrides.${gid}: no global intent with that id`));
    checkIntent({ keywords: ["xxx"], text: "x", ...o }, `overrides.${gid}`, false);
  }
  if (!s.fallbacks || !s.fallbacks.length) err(where("no fallbacks"));

  for (const e of Object.keys(s.endings)) if (!usedEndings.has(e)) warnings.push(where(`ending "${e}" is never reached`));

  // Every step must be reachable from start through some goto (intents, acceptAny, freeze, patience, exhausted).
  const edges = {};
  const link = (from, i) => {
    if (!i) return;
    if (i.goto) (edges[from] = edges[from] || []).push(i.goto);
    if (i.exhausted) link(from, i.exhausted);
  };
  for (const [nodeId, node] of Object.entries(s.nodes)) {
    const inherited = node.inherits && s.nodes[node.inherits] ? s.nodes[node.inherits].intents || [] : [];
    [...(node.intents || []), ...inherited, ...(node.acceptAny || []), node.freeze, node.patienceIntent, s.patienceIntent, ...(s.common || []), ...Object.values(s.overrides || {})]
      .forEach((i) => link(nodeId, i));
  }
  const reached = new Set(["start"]);
  const queue = ["start"];
  while (queue.length) for (const next of edges[queue.shift()] || []) if (!reached.has(next)) { reached.add(next); queue.push(next); }
  for (const nodeId of Object.keys(s.nodes)) if (!reached.has(nodeId)) err(where(`${nodeId}: no step leads here`));

  // An open question (acceptAny) without a freeze takes "hayır" or "bilmiyorum" as the answer ("Hayır mı? Orayı bilirim.").
  for (const [nodeId, node] of Object.entries(s.nodes)) {
    if (node.acceptAny && !node.freeze) warnings.push(where(`${nodeId}: open question without a freeze; "hayır" and "bilmiyorum" become the answer`));
  }

  // Role-pass check: in every step, a refusal or "doing nothing" is a real choice and must move the scene,
  // not bounce off a fallback.
  if (window.Yasandi.Game) {
    const DEAD_END_INPUTS = ["hayır", "hiçbir şey yapmıyorum", "bilmiyorum"];
    for (const nodeId of Object.keys(s.nodes)) {
      for (const input of DEAD_END_INPUTS) {
        const g = new window.Yasandi.Game(s, globalIntents);
        g.nodeId = nodeId;
        const fallbackPool = [].concat(s.nodes[nodeId].fallbacks || s.fallbacks || []);
        const r = g.handle(input);
        const text = r.text || "";
        if (!r.narrator && fallbackPool.some((f) => text === f || text.endsWith(f))) {
          warnings.push(where(`${nodeId}: "${input}" only gets a fallback; make it a choice with a consequence`));
        }
      }
    }
  }
  console.log(`${s.id}: ${Object.keys(s.nodes).length} steps, ${Object.keys(s.endings).length} endings`);
}

warnings.forEach((w) => console.warn("WARN  " + w));
errors.forEach((e) => console.error("ERROR " + e));
console.log(errors.length ? `\n${errors.length} error(s)` : "\nAll scenarios OK");
process.exit(errors.length ? 1 : 0);
