// Matcher and negation cases: how real players type. Run: node tests/engine.js   (exit code 1 on any failure)
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

const { normalize, matches } = window.Yasandi.text;
let failed = 0;
const check = (ok, label) => {
  if (!ok) { failed += 1; console.error("FAIL  " + label); }
};

// [input, keyword, should match]
const MATCH = [
  // chat spelling: -iyo, -iyom, -iyon, -iyodum
  ["yiyom teyze", "yiyorum", true],
  ["ne bakıyon", "ne bakiyorsun", true],
  ["ne bakıyorsun", "ne bakiyon", true],
  ["bakmıyodum abi", "bakmiyordum", true],
  ["geliyo", "geliyor", true],
  ["pozisyon", "pozisyon", true],
  // shorthand
  ["tmm", "tamam", true],
  ["yok bişey abi", "yok bir sey", true],
  ["hiçbişey", "hic bir sey", true],
  ["napıyon lan", "ne yapiyorsun", true],
  ["mk", "amk", true],
  // the last vowel drops before -iyor
  ["bekliyorum", "bekle", true],
  ["ağlıyorum", "agla", true],
  ["ilerliyoruz", "ilerle", true],
  ["tıslıyorum", "tisla", true],
  // k/p soften before a vowel
  ["balığa gidiyorum", "balik", true],
  ["ekmeği yiyorum", "ekmek", true],
  ["hesabı ödüyorum", "hesap", true],
  // "=" whole input only, "#" any number
  ["kaç", "=kac", true],
  ["saat kaç", "=kac", false],
  ["50 bin", "#", true],
  ["40000", "#", true],
  ["kırk bin", "#", false],
  // unchanged: still start-of-word only
  ["seni tanımıyorum", "taniyorum", false],
  ["kaçıyorum", "kac", true],
];
for (const [input, kw, want] of MATCH) {
  check(matches(normalize(input), kw) === want, `matches("${input}", "${kw}") should be ${want}`);
}

// [scenario, step, input, expected intent id | "freeze" | "fallback" | "any"]
const PLAY = [
  // negation still blocks "doing" intents (positive: true)
  ["otobus-teyzesi", "start", "yer vermiyorum", "ignore"],
  ["otobus-teyzesi", "start", "yer vermiyom", "ignore"],
  ["otobus-teyzesi", "start", "kalkmam", "ignore"],
  ["otobus-teyzesi", "start", "yer veriyorum", "give-seat"],
  ["goz-temasi", "start", "kaçmıyorum", "freeze"],
  ["goz-temasi", "start", "kaçıyom", "run"],
  // "yapmam lazım" is a need, not a refusal
  ["misafirlik", "start", "diyet yapmam lazım", "diet"],
  // a "yok" in the middle of a long sentence is not silence; a short refusal is
  ["is-gorusmesi", "q-neden-biz", "bence öyle bir sebebi yok aslında", "fallback"],
  ["is-gorusmesi", "q-neden-biz", "yok", "freeze"],
  ["is-gorusmesi", "q-neden-biz", "hayır öyle bir sebebim yok aslında", "freeze"],
  // answers are not actions: negation must not hide them
  ["is-gorusmesi", "q-zayiflik", "zayıflığım yok", "yok"],
  ["is-gorusmesi", "q-neden-ayrildin", "para yetmiyor", "maas-az"],
  ["is-gorusmesi", "q-maas", "50 bin", "yuksek"],
  // swearing is caught everywhere
  ["berber", "cutting-1", "oç", "swear"],
  ["is-gorusmesi", "q-zayiflik", "bilmiyorum", "freeze"],
  ["is-gorusmesi", "q-zayiflik", "hızlı öğrenirim", "fallback"],
  ["is-gorusmesi", "q-soru", "saat kaç bitiyor görüşme", "fallback"],
  ["is-gorusmesi", "q-soru", "çalışma ortamı nasıl", "fallback"],
  ["is-gorusmesi", "q-soru", "maaş ne zaman yatıyor", "ne-zaman"],
];
const Game = window.Yasandi.Game;
const P = Game.prototype;
const resolve = P.resolve;
P.resolve = function (i) { this.lastIntent = i.id || "any"; return resolve.call(this, i); };
for (const [sid, node, input, want] of PLAY) {
  const s = window.Yasandi.scenarios.find((x) => x.id === sid);
  const g = new Game(s, window.Yasandi.globalIntents);
  g.nodeId = node;
  g.vars = { crush: "o", name: "Duman", job: "yazılımcı" };
  g.lastIntent = null;
  g.handle(input);
  const got = g.lastIntent === "__freeze" ? "freeze" : g.lastIntent || "fallback";
  check(got === want, `[${sid}] ${node}: "${input}" -> ${got}, expected ${want}`);
}

console.log(failed ? `\n${failed} failed` : `All ${MATCH.length + PLAY.length} engine cases OK`);
process.exit(failed ? 1 : 0);
