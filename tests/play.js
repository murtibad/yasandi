// Plays inputs against a scenario and prints what the game answers, so you can READ the replies.
//
//   node tests/play.js <id>                          every line of tests/play/<id>.txt, each at its "# <step>"
//   node tests/play.js <id> <step> "input" ...       each input at that step, each from a fresh game
//   node tests/play.js <id> --run "input" ...        one game from the start, inputs in order
//
// In the .txt file, "# <step id>" starts a step; any other "#" line is a comment.
// Every input starts a fresh game at its step, so one answer never changes the next.
// [fallback] means nothing caught the input: fine for gibberish, a gap for anything a real player types.
// Saved answers are filled with sample values ({crush} = Esra, {name} = Duman, {job} = yazılımcı).
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
global.window = {};
global.localStorage = { getItem: () => null, setItem: () => {} };
console.info = () => {};
require(path.join(root, "js/text.js"));
require(path.join(root, "js/data/global-intents.js"));
const scenarioDir = path.join(root, "js/data/scenarios");
fs.readdirSync(scenarioDir).filter((f) => f.endsWith(".js")).forEach((f) => require(path.join(scenarioDir, f)));
require(path.join(root, "js/engine.js"));

const { Game, scenarios, globalIntents } = window.Yasandi;
const SAMPLE = { crush: "Esra", name: "Duman", job: "yazılımcı", food: "simit" };

// Remember which intent answered, the way tests/engine.js does.
const resolve = Game.prototype.resolve;
Game.prototype.resolve = function (intent) {
  this.lastIntent = intent.id || "any";
  return resolve.call(this, intent);
};

const [id, ...args] = process.argv.slice(2);
const scenario = scenarios.find((s) => s.id === id);
if (!scenario) {
  console.error(`Usage: node tests/play.js <id> [step "input" ... | --run "input" ...]\nScenarios: ${scenarios.map((s) => s.id).join(", ")}`);
  process.exit(1);
}

function readLines(file) {
  const raw = fs.readFileSync(file);
  // PowerShell `echo > file` writes UTF-16; read it anyway.
  const text = raw.includes(0) ? raw.toString("utf16le") : raw.toString("utf8");
  return text.replace(/^﻿/, "").split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
}

function newGame(step) {
  const g = new Game(scenario, globalIntents);
  g.nodeId = step;
  g.vars = { ...SAMPLE };
  return g;
}

function what(g, r) {
  if (r.ending) return `[${g.lastIntent === "__freeze" ? "freeze" : g.lastIntent}] SON: ${r.ending.title} (${r.ending.tag})`;
  if (r.narrator) return "[look/hint]";
  if (g.lastIntent === "__freeze") return "[freeze]";
  if (g.lastIntent) return `[${g.lastIntent}]`;
  return "[fallback]";
}

function show(step, input, g, r) {
  const reply = [r.narrator, r.text, r.hint && "(ipucu) " + r.hint].filter(Boolean).join("\n");
  console.log(`\n${step} > ${input}   ${what(g, r)}`);
  console.log(reply.split("\n").map((l) => "    " + l).join("\n"));
}

const fallbacks = {};
function play(step, input) {
  if (!scenario.nodes[step]) {
    console.error(`No step "${step}" in ${id}. Steps: ${Object.keys(scenario.nodes).join(", ")}`);
    process.exit(1);
  }
  const g = newGame(step);
  g.lastIntent = null;
  const r = g.handle(input);
  show(step, input, g, r);
  if (what(g, r) === "[fallback]") (fallbacks[step] = fallbacks[step] || []).push(input);
}

if (args[0] === "--run") {
  const g = newGame("start");
  console.log(scenario.nodes.start.text.split("\n").map((l) => "    " + l).join("\n"));
  for (const input of args.slice(1)) {
    const step = g.nodeId;
    g.lastIntent = null;
    const r = g.handle(input);
    show(step, input, g, r);
    if (r.ending) break;
  }
} else if (args.length) {
  for (const input of args.slice(1)) play(args[0], input);
} else {
  const file = path.join(__dirname, "play", `${id}.txt`);
  if (!fs.existsSync(file)) {
    console.error(`No ${path.relative(root, file)} yet. One input per line, "# <step>" before each step's inputs.`);
    process.exit(1);
  }
  let step = "start";
  for (const line of readLines(file)) {
    if (line.startsWith("#")) {
      const name = line.slice(1).trim();
      if (scenario.nodes[name]) step = name;
      continue;
    }
    play(step, line);
  }
}

const missed = Object.entries(fallbacks);
if (missed.length) {
  console.log("\nOnly a fallback (read them: a gap if a real player would type it):");
  for (const [step, inputs] of missed) console.log(`  ${step}: ${inputs.map((i) => `"${i}"`).join(", ")}`);
}
