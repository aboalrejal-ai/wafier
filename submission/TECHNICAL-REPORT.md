# Wafier — Technical Report (AI Readiness Hackathon – KSA)

**Team name:** wafier team  
**Members:** Fatima Alsultan, Jorry Alfalah, Noor Alshammari, Shahad Alsultan  
**Solution name:** Wafier — Proactive Bill Prediction and Budget Planning  
**Contact / Org:** King Faisal University — Budget Planning  
**Designation:** Students  

> Cap: ≤5 pages. This report describes **only** capabilities present in the repository code (demo path + optional Supabase). Limitations are stated explicitly.

---

## 1. Introduction

Households often discover electricity overspend only when the monthly bill arrives. Peak summer cooling makes this worse. **Wafier** is an Arabic RTL personal FinTech app that forecasts end-of-month SAR spend from meter-like kWh + weather context, compares forecasts to a user budget, and raises graduated alerts.

The solution is grounded in **ITU-T Y.3172** (ML pipeline nodes + MLFO + sandbox) and Saudi policy references (PDPL, SDAIA AI Ethics, SAMA Open Banking context, SEC tariff practice). **18 VERIFIED** KB records in `knowledge-base.json` (merged from three deep-research passes in `docs/research/`).

---

## 2. Use case and gaps in existing solutions

**Problem.** Families lack proactive, explainable energy-budget control tied to local tariffs and heatwaves.

**Gaps Wafier addresses (as implemented).**

| Gap | How Wafier responds (in code) |
|-----|-------------------------------|
| Late bill shock | `predictBill` + Level-2 policy when forecast > budget or temp ≥40°C |
| Opaque advice | `ragChat` with citations; `INSUFFICIENT_EVIDENCE` when no KB match |
| No privacy gate | Consent screen + PDPL anonymization in preprocessor |
| No policy guard for ads | `evaluateKbGuardPolicy` — deterministic KB-ADS-001 |
| No orchestration story | `demo-service` + `pnpm demo` — SRC→C→PP→M→P→D audit |

**Honest limit:** Smart-meter ingest is **simulated**; ML is **rule-based seasonal forecasting**, not a trained neural model.

---

## 3. Y.3172 architecture (evidence map)

| Node | Role | Code | Policy source |
|------|------|------|---------------|
| SRC | Budget, kWh, weather | `demo-service.ts` | SEC-TARIFF-001 |
| C | Meter ingest | `ingestMeterReading` | GAP-01 |
| PP | Gap-fill + anonymize | `preprocessor.ts` | PDPL-ANON-001 |
| M/MLFO | Seasonal forecast | `ml-predictor.ts` | MDPI-FORECAST-001 |
| Sandbox | No false alert | `isSandbox` path | ITU-Y3172-001 |
| P | Budget + KB guard | `policy-engine.ts` | PDPL-ADS-001, SDAIA-ETHICS-001 |
| D | Notifications | `notification-distributor.ts` | SDAIA-HITL-001 |
| SINK | RTL UI | React screens | — |
| KB/RAG | 18 verified chunks | `rag-chat.ts`, `/hackathon/kb` | `knowledge-base.json` |

---

## 4. ITU AI Readiness 2.0 — five claimed dimensions

| ID | Dimension | Evidence |
|----|-----------|----------|
| D8 | Data Governance | PDPL consent, `anonymizeForExport` |
| D10 | AI & Policies | 6 verdicts, GAP-01..06 matrix, SC-03 |
| D11 | Transparency | RAG citations, forecast disclaimers |
| D12 | Human–AI Collaboration | HITL 2h alert snooze |
| D13 | Deployment | Vite SPA, Hostinger, Capacitor, Supabase optional |

See `kb/framework/wafier-readiness.json` and `/hackathon/readiness` UI.

---

## 5. Three evaluation scenarios + Policy Gap Matrix

### SC-01 — Compliant RAG (`scenarios/sc-01-compliant-rag.json`)
Ask: "كيف أوفر في فاتورة الكهرباء؟" → citations from KBEAT/KAPSARC/SEC context.

### SC-02 — Operational failure (`scenarios/sc-02-pp-gap-fill.json`)
Missing day-4 kWh → `gapFillDailySeries` → pipeline continues without crash.

### SC-03 — Controversy (`scenarios/sc-03-ads-controversy.json`)
Targeted ads request → `VIOLATION` / `BLOCK_DATA_USE` / PDPL-ADS-001.

### Policy Gap Matrix

| ID | Type | Gap | Recommendation |
|----|------|-----|----------------|
| GAP-01 | potential_gap | No open AMI API | National utility data access framework |
| GAP-02 | ambiguity | Forecast error liability | Sector guidance on AI estimates |
| GAP-03 | potential_gap | Energy-specific AI data rules | SEC circular under PDPL |
| GAP-04 | potential_gap | No algorithm audit standard | Y.3172 sandbox + external audit |
| GAP-05 | potential_gap | No machine-readable law repo | Government structured regulation API |
| GAP-06 | ambiguity | Consumption → ads enforcement | Explicit PDPL marketing guidance |

**Reproducible proof:** `pnpm demo` (or `node scripts/run-demo.mjs`).

---

## 6. Repository links

| Deliverable | Path |
|-------------|------|
| Knowledge base JSON | `knowledge-base.json` |
| Deep research | `docs/research/` |
| Scenarios | `scenarios/` |
| Technical report | `submission/TECHNICAL-REPORT.md` |
| Video script | `docs/DEMO-VIDEO-SCRIPT.md` (team records ≤7 min) |
| GitHub | This repository |

**Distributor:** in-app + Web/Local notifications. **Original PDF:** `docs/submission/wafeer-technical-report-original.pdf`.
