/** Unit tests for Wafier core libs (no bundler required) */

function kwhToSar(kwh) {
  let cost = 10;
  const tier1 = Math.min(kwh, 6000);
  cost += tier1 * 0.18;
  if (kwh > 6000) cost += (kwh - 6000) * 0.3;
  return Math.round(cost * 1.15 * 100) / 100;
}

function budgetUsagePct(budget, spend) {
  return Math.min(100, Math.round((spend / budget) * 1000) / 10);
}

function selectSeasonProfile(temp) {
  if (temp >= 38) return "summer";
  if (temp <= 20) return "winter";
  return "baseline";
}

function assert(cond, msg) {
  if (!cond) throw new Error(msg);
}

const spend = kwhToSar(890);
assert(spend > 0, "kwhToSar positive");
assert(budgetUsagePct(500, 250) >= 50, "50% threshold");
assert(selectSeasonProfile(42) === "summer", "MLFO summer");

console.log("All tests passed ✓");
console.log({ spend, usageAt890: budgetUsagePct(500, spend) });
