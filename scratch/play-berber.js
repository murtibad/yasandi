const fs = require('fs');

// Load engine and scenario
eval(fs.readFileSync('js/text.js', 'utf8'));
eval(fs.readFileSync('js/data/global-intents.js', 'utf8'));
eval(fs.readFileSync('js/data/scenarios/berber.js', 'utf8'));
eval(fs.readFileSync('js/engine.js', 'utf8'));

const engine = new window.Yasandi.Engine();
engine.loadScenario('berber');
let output = engine.start();
console.log("=== START ===");
console.log(output.text);

const inputs = [
  "tarkan", // start -> cutting-1
  "mac", // cutting-1 -> service-offer-1
  "yok kalsin", // service-offer-1 -> cutting-2
  "sabret", // cutting-2 -> service-offer-2
  "kalsin", // service-offer-2 -> cutting-3
  "kisa olmasin", // cutting-3 -> SHOULD HIT FALLBACK NOW
  "gec abi", // cutting-3 -> finishing
  "kisa olmasin", // finishing -> SHOULD HIT FALLBACK
  "bahsis ver" // finishing -> ending
];

for (let input of inputs) {
  console.log(`\n> ${input}`);
  let res = engine.reply(input);
  console.log(res.text);
  if (res.ending) console.log(`[ENDING: ${res.ending.title}]`);
}
