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

  const usedEndings = new Set();
  const checkIntent = (intent, label, needsKeywords) => {
    if (needsKeywords && (!Array.isArray(intent.keywords) || !intent.keywords.length)) err(where(`${label}: no keywords`));
    if (!intent.text) err(where(`${label}: no text`));
    if (intent.goto && !s.nodes[intent.goto]) err(where(`${label}: goto "${intent.goto}" does not exist`));
    if (intent.ending) {
      if (!s.endings[intent.ending]) err(where(`${label}: ending "${intent.ending}" is not in endings`));
      usedEndings.add(intent.ending);
    }
    if (intent.goto && intent.ending) err(where(`${label}: has both goto and ending`));
    const texts = Array.isArray(intent.text) ? intent.text : [intent.text];
    for (const t of texts) {
      if (typeof t === "string" && /, dedin\./.test(t) && /^—/m.test(t)) warnings.push(where(`${label}: player speech should start with » instead of "— ..., dedin."`));
    }
  };

  for (const [nodeId, node] of Object.entries(s.nodes)) {
    (node.intents || []).forEach((i) => checkIntent(i, `${nodeId}.${i.id || "?"}`, true));
    (node.acceptAny || []).forEach((i, n) => checkIntent(i, `${nodeId}.acceptAny[${n}]`, false));
    if (node.inherits && !s.nodes[node.inherits]) err(where(`${nodeId}: inherits "${node.inherits}" does not exist`));
    if (node.patienceIntent) checkIntent(node.patienceIntent, `${nodeId}.patienceIntent`, false);
    if (node.patience && !node.patienceIntent && !s.patienceIntent) err(where(`${nodeId}: patience set but no patienceIntent`));
    if (nodeId !== "start" && !node.intents && !node.acceptAny) err(where(`${nodeId}: no intents and no acceptAny`));
  }
  (s.common || []).forEach((i) => checkIntent(i, `common.${i.id}`, true));
  if (s.patienceIntent) checkIntent(s.patienceIntent, "patienceIntent", false);
  for (const [gid, o] of Object.entries(s.overrides || {})) {
    if (!globalIntents.some((g) => g.id === gid)) err(where(`overrides.${gid}: no global intent with that id`));
    checkIntent({ keywords: ["x"], text: "x", ...o }, `overrides.${gid}`, false);
  }
  if (!s.fallbacks || !s.fallbacks.length) err(where("no fallbacks"));

  for (const e of Object.keys(s.endings)) if (!usedEndings.has(e)) warnings.push(where(`ending "${e}" is never reached`));
  console.log(`${s.id}: ${Object.keys(s.nodes).length} steps, ${Object.keys(s.endings).length} endings`);
}

warnings.forEach((w) => console.warn("WARN  " + w));
errors.forEach((e) => console.error("ERROR " + e));
console.log(errors.length ? `\n${errors.length} error(s)` : "\nAll scenarios OK");
process.exit(errors.length ? 1 : 0);
