# Wafir — Technical Report (AI Readiness Hackathon – KSA)

**Team name:** wafir team  
**Members:** Fatima Alsultan, Jorry Alfalah, Noor Alshammari, Shahad Alsultan  
**Solution name:** Wafir — Proactive Bill Prediction and Budget Planning  
**Contact / Org:** King Faisal University — Budget Planning  
**Designation:** Students  

> Cap: ≤5 pages. This report describes **only** capabilities present in the repository code (demo path + optional Supabase). Limitations are stated explicitly.

---

## 1. Introduction

Households often discover electricity overspend only when the monthly bill arrives. Peak summer cooling makes this worse. **Wafir** is an Arabic RTL personal FinTech app that forecasts end-of-month SAR spend from meter-like kWh + weather context, compares forecasts to a user budget, and raises graduated alerts.

The solution is grounded in **ITU-T Y.3172** (ML pipeline nodes + MLFO + sandbox) and Saudi policy references merged from three independent deep-research passes (ChatGPT, Gemini, Perplexity) in `docs/research/`. **41 VERIFIED** KB records (+1 ISO benchmark) in `knowledge-base.json`.

---

## 2. Use case and gaps in existing solutions

**Problem.** Families lack proactive, explainable energy-budget control tied to local tariffs and heatwaves.

**Gaps Wafir addresses (as implemented).**

| Gap | How Wafir responds (in code) |
|-----|-------------------------------|
| Late bill shock | `predictBill` + Level-2 policy when forecast > budget or temp ≥40°C |
| Opaque advice | `ragChat` with citations; `INSUFFICIENT_EVIDENCE` when no KB match |
| No privacy gate | Consent screen + PDPL pseudonymization in preprocessor |
| No policy guard for ads | `evaluateKbGuardPolicy` — Wafir privacy control (PDPL-ADS-001) |
| No orchestration story | `demo-service` + `pnpm demo` — SRC→C→PP→M→P→D audit |

**Honest limit:** Smart-meter ingest is **simulated**; ML is **rule-based seasonal forecasting**, not a trained neural model.

---

## 3. Y.3172 architecture (evidence map)

| Node | Role | Code | Policy source |
|------|------|------|---------------|
| SRC | Budget, kWh, weather | `demo-service.ts` | SERA-TARIFF-001 |
| C | Meter ingest | `ingestMeterReading` | GAP-01, SEC-DATASHARE-001 |
| PP | Gap-fill + pseudonymize | `preprocessor.ts` | PDPL-ANON-001 |
| M/MLFO | Seasonal forecast | `ml-predictor.ts` | MDPI-FORECAST-001 |
| Sandbox | No false alert | `isSandbox` path | ITU-Y3172-001 |
| P | Budget + KB guard | `policy-engine.ts` | PDPL-ADS-001, SDAIA-AI-ETHICS-PDF-001 |
| D | Notifications | `notification-distributor.ts` | SDAIA-HITL-001 |
| SINK | RTL UI | React screens | SAMA-CP-RULEBOOK-001 (analog) |
| KB/RAG | 41 verified chunks | `rag-chat.ts`, `/hackathon/kb` | `knowledge-base.json` |

---

## 4. ITU AI Readiness 2.0 — five claimed dimensions

| ID | Dimension | Evidence |
|----|-----------|----------|
| D8 | Data Governance | PDPL consent, `anonymizeForExport` (pseudonymization) |
| D10 | AI & Policies | 6 verdicts, GAP-01..06 matrix, SC-03 |
| D11 | Transparency | RAG citations, forecast disclaimers |
| D12 | Human–AI Collaboration | HITL 2h alert snooze |
| D13 | Deployment | Vite SPA, Hostinger, Capacitor, Supabase optional |

See `kb/framework/wafir-readiness.json` and `/hackathon/readiness` UI.

---

## 5. Three evaluation scenarios + Policy Gap Matrix

### SC-01 — Compliant RAG (`scenarios/sc-01-compliant-rag.json`)
Ask: "كيف أوفر في فاتورة الكهرباء؟" → citations from KAPSARC/KBEAT/SERA (no unverified temperature set-points).

### SC-02 — Operational failure (`scenarios/sc-02-pp-gap-fill.json`)
Missing day-4 kWh → `gapFillDailySeries` → pipeline continues without crash.

### SC-03 — Controversy (`scenarios/sc-03-ads-controversy.json`)
Targeted ads request → `VIOLATION` / `BLOCK_DATA_USE` / PDPL-ADS-001. **Note:** This is a **Wafir privacy-by-design control** (purpose limitation + no silent repurposing), stronger than the statutory minimum — PDPL Art.26 allows consented marketing of non-sensitive data.

### Policy Gap Matrix

| ID | Type | Gap | Recommendation |
|----|------|-----|----------------|
| GAP-01 | potential_gap | No consumer-authorized AMI API | Open Utility framework (like Open Banking) |
| GAP-02 | potential_gap | AI forecast liability allocation | Sector guidance; general civil law applies (CIVIL-LAW-120) |
| GAP-03 | potential_gap | Energy-sector AI data rules | PDPL + SERA PDP under sector policy |
| GAP-04 | potential_gap | No algorithm audit standard | Y.3172 sandbox + ISO 42001 benchmark |
| GAP-05 | potential_gap | No machine-readable law repo | Government structured regulation API |
| GAP-06 | ambiguity | Consumption → ads repurposing | Explicit PDPL sector guidance; Wafir blocks by policy |

**Reproducible proof:** `pnpm demo` (or `node scripts/run-demo.mjs`).

---

## 6. Repository links

| Deliverable | Path |
|-------------|------|
| Knowledge base JSON | `knowledge-base.json` |
| Deep research (3 passes) | `docs/research/` |
| Scenarios | `scenarios/` |
| Technical report | `submission/TECHNICAL-REPORT.md` |
| Video script | `docs/DEMO-VIDEO-SCRIPT.md` (team records ≤7 min) |
| GitHub | This repository |

**Distributor:** in-app + Web/Local notifications.
