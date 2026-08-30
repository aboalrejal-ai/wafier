#!/usr/bin/env node
/**
 * Hackathon scenario runner — mirrors samaam run_demo.py for Wafir libs.
 * Usage: node scripts/run-demo.mjs [1|2|3]
 */

import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

function loadJson(rel) {
  return JSON.parse(readFileSync(join(root, rel), "utf8"));
}

// --- mirrored lib logic (keep in sync with src/lib) ---
function kwhToSar(kwh) {
  const tiers = [
    { maxKwh: 6000, rate: 0.18 },
    { maxKwh: Infinity, rate: 0.3 },
  ];
  const VAT = 0.15;
  const FIXED = 10;
  let remaining = kwh;
  let cost = FIXED;
  let prev = 0;
  for (const t of tiers) {
    const tierKwh = Math.min(remaining, t.maxKwh - prev);
    if (tierKwh <= 0) break;
    cost += tierKwh * t.rate;
    remaining -= tierKwh;
    prev = t.maxKwh;
  }
  return Math.round(cost * (1 + VAT) * 100) / 100;
}

function gapFillDailySeries(series) {
  const out = series.map((p) => ({ ...p }));
  for (let i = 0; i < out.length; i++) {
    if (out[i].kwh != null) continue;
    let left = null;
    let right = null;
    for (let L = i - 1; L >= 0; L--) if (out[L].kwh != null) { left = out[L].kwh; break; }
    for (let R = i + 1; R < out.length; R++) if (out[R].kwh != null) { right = out[R].kwh; break; }
    if (left != null && right != null) out[i].kwh = Math.round(((left + right) / 2) * 100) / 100;
    else out[i].kwh = left ?? right ?? 0;
  }
  return out;
}

function evaluateKbGuardPolicy(request) {
  if (request.feature === "targeted_ads_from_consumption") {
    return {
      verdict: "VIOLATION",
      action: "BLOCK_DATA_USE",
      recordId: "PDPL-ADS-001",
      sourceUrl: "https://sdaia.gov.sa/ar/SDAIA/about/Pages/AboutPDPL.aspx",
      title: "حارس سياسة KB — منع الإعلانات",
      detail: "رفض استخدام بيانات الاستهلاك للإعلانات المستهدفة.",
    };
  }
  return { verdict: "COMPLIANT", action: "PROCEED", recordId: "PDPL-ADS-001" };
}

function retrieveRag(query, chunks) {
  const q = query.toLowerCase();
  const hits = chunks.filter((c) => {
    const hay = `${c.title} ${c.content}`.toLowerCase();
    return ["توفير", "فاتورة", "كهرباء", "energy", "budget"].some((k) => q.includes(k) || hay.includes(k));
  });
  return hits.slice(0, 2);
}

function runSc01() {
  const spec = loadJson("scenarios/sc-01-compliant-rag.json");
  const kb = loadJson("kb/records/finance-energy-regulatory.json");
  const chunks = kb.records.filter((r) => r.verification === "VERIFIED");
  const hits = retrieveRag(spec.trigger.query, chunks);
  const ok = hits.length >= spec.expected.minSources;
  console.log("\n=== SC-01 Compliant RAG ===");
  console.log("Query:", spec.trigger.query);
  console.log("Sources:", hits.map((h) => h.url));
  console.log(ok ? "PASS ✓" : "FAIL ✗");
  return ok;
}

function runSc02() {
  const spec = loadJson("scenarios/sc-02-pp-gap-fill.json");
  const filled = gapFillDailySeries(spec.input.dailySeries);
  const day4 = filled[3].kwh;
  const ok = day4 === spec.expected.filledDay4Kwh;
  console.log("\n=== SC-02 PP Gap-fill ===");
  console.log("Day 4 kWh after fill:", day4);
  console.log("Audit: preprocessor gap-fill — no crash");
  console.log(ok ? "PASS ✓" : "FAIL ✗");
  return ok;
}

function runSc03() {
  const spec = loadJson("scenarios/sc-03-ads-controversy.json");
  const decision = evaluateKbGuardPolicy(spec.trigger);
  const ok =
    decision.verdict === spec.expected.verdict &&
    decision.action === spec.expected.action &&
    decision.recordId === spec.expected.recordId;
  console.log("\n=== SC-03 Ads Controversy ===");
  console.log("Verdict:", decision.verdict, "| Action:", decision.action);
  console.log("Record:", decision.recordId, "| URL:", decision.sourceUrl);
  console.log(ok ? "PASS ✓" : "FAIL ✗");
  return ok;
}

const arg = process.argv[2];
const runners = { 1: runSc01, 2: runSc02, 3: runSc03 };
const list = arg && runners[arg] ? [runners[arg]] : [runSc01, runSc02, runSc03];

console.log("Wafir Hackathon Demo Runner");
console.log("Sample spend 890 kWh →", kwhToSar(890), "SAR");

let allOk = true;
for (const fn of list) {
  if (!fn()) allOk = false;
}
console.log(allOk ? "\nAll scenarios passed ✓" : "\nSome scenarios failed ✗");
process.exit(allOk ? 0 : 1);
