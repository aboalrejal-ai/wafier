/** Unit tests aligned with Wafier lib formulas (no bundler). */

function assert(cond, msg) {
  if (!cond) throw new Error(msg);
}

/** Mirror src/lib/financial-engine.ts */
function kwhToSar(kwh) {
  const TARIFF_TIERS = [
    { maxKwh: 6000, rate: 0.18 },
    { maxKwh: Infinity, rate: 0.3 },
  ];
  const VAT_RATE = 0.15;
  const FIXED_FEE_SAR = 10;
  let remaining = kwh;
  let cost = FIXED_FEE_SAR;
  let prevMax = 0;
  for (const tier of TARIFF_TIERS) {
    const tierKwh = Math.min(remaining, tier.maxKwh - prevMax);
    if (tierKwh <= 0) break;
    cost += tierKwh * tier.rate;
    remaining -= tierKwh;
    prevMax = tier.maxKwh;
  }
  return Math.round(cost * (1 + VAT_RATE) * 100) / 100;
}

function budgetUsagePct(budget, spend) {
  if (budget <= 0) return 0;
  return Math.min(100, Math.round((spend / budget) * 1000) / 10);
}

function selectSeasonProfile(tempC) {
  if (tempC >= 38) return "summer";
  if (tempC <= 20) return "winter";
  return "baseline";
}

function evaluatePolicy({ budgetSar, currentSpendSar, predictedSar, temperature, alertOverrideUntil }) {
  if (alertOverrideUntil && new Date(alertOverrideUntil) > new Date()) return [];
  const usagePct = (currentSpendSar / budgetSar) * 100;
  const alerts = [];
  if (usagePct >= 50 && usagePct < 75) alerts.push("level1");
  if (usagePct >= 75) alerts.push("level1b");
  if (predictedSar > budgetSar) alerts.push("level2");
  if (temperature >= 40) alerts.push("level2-heat");
  return alerts;
}

function gapFillDailySeries(series) {
  const out = series.map((p) => ({ ...p }));
  for (let i = 0; i < out.length; i++) {
    if (out[i].kwh != null) continue;
    let left = null;
    let right = null;
    for (let L = i - 1; L >= 0; L--) if (out[L].kwh != null) { left = out[L].kwh; break; }
    for (let R = i + 1; R < out.length; R++) if (out[R].kwh != null) { right = out[R].kwh; break; }
    if (left != null && right != null) out[i].kwh = (left + right) / 2;
    else out[i].kwh = left ?? right ?? 0;
  }
  return out;
}

function anonymizeHouseholdId(id) {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = (hash << 5) - hash + id.charCodeAt(i);
    hash |= 0;
  }
  return `anon_${Math.abs(hash).toString(16)}`;
}

// --- financial ---
const spend890 = kwhToSar(890);
assert(spend890 > 0, "kwhToSar positive");
assert(kwhToSar(100) < kwhToSar(7000), "higher kWh costs more");

// --- policy 50% ---
assert(budgetUsagePct(500, 250) === 50, "50% usage");
const l1 = evaluatePolicy({
  budgetSar: 500,
  currentSpendSar: 260,
  predictedSar: 400,
  temperature: 30,
});
assert(l1.includes("level1"), "L1 at ~52%");

// --- MLFO summer ---
assert(selectSeasonProfile(42) === "summer", "MLFO summer");
assert(selectSeasonProfile(15) === "winter", "MLFO winter");

// --- heatwave L2 ---
const heat = evaluatePolicy({
  budgetSar: 500,
  currentSpendSar: 200,
  predictedSar: 620,
  temperature: 42,
});
assert(heat.includes("level2") && heat.includes("level2-heat"), "heatwave L2");

// --- HITL override ---
const snoozed = evaluatePolicy({
  budgetSar: 500,
  currentSpendSar: 400,
  predictedSar: 700,
  temperature: 45,
  alertOverrideUntil: new Date(Date.now() + 3600_000).toISOString(),
});
assert(snoozed.length === 0, "HITL suppresses alerts");

// --- preprocessor ---
const filled = gapFillDailySeries([
  { day: 1, kwh: 10 },
  { day: 2, kwh: null },
  { day: 3, kwh: 14 },
]);
assert(filled[1].kwh === 12, "gap-fill midpoint");
assert(anonymizeHouseholdId("demo-user").startsWith("anon_"), "anonymize");

console.log("All tests passed ✓");
console.log({ spend890, season: selectSeasonProfile(42), heat });
