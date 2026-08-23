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

The solution is grounded in **ITU-T Y.3172** (ML pipeline nodes + MLFO + sandbox) and Saudi policy references (PDPL, SDAIA AI Ethics, SEC tariff practice). AI Readiness dimensions covered in this submission: **data handling**, **model/validation (sandbox)**, **privacy/consent**, **deployment support** (static Hostinger SPA + optional Supabase), and **human–AI collaboration** (HITL alert override + RAG citations).

---

## 2. Use case and gaps in existing solutions

**Problem.** Families lack proactive, explainable energy-budget control tied to local tariffs and heatwaves.

**Existing approaches.** Manual bill tracking; generic tips without budget policy; opaque “AI” scores without citations or privacy controls.

**Gaps Wafier addresses (as implemented).**

| Gap | How Wafier responds (in code) |
|-----|-------------------------------|
| Late bill shock | Client `predictBill` + Level-2 policy when forecast > budget or temp ≥40°C |
| Opaque advice | `ragChat` returns answers with **source title + URL** from KB |
| No privacy gate | Consent screen + PDPL anonymization helper on evaluation path |
| No orchestration story | Demo evaluation runs SRC→C→PP→Sandbox→M/MLFO→P→D with audit log |

**Honest limit:** Smart-meter ingest is **simulated** in demo mode; ML is **rule-based seasonal forecasting**, not a trained neural model.

---

## 3. Mapped documents (per ML pipeline node)

| Y.3172 node | Role in Wafier | Supporting authentic document |
|-------------|----------------|-------------------------------|
| **SRC** | Budget cap, simulated meter kWh, weather | SEC/KAUST energy ML context; user budget |
| **C (Collector)** | `ingestMeterReading` / heatwave aggregation | Smart-meter API gap → policy gap #1 |
| **PP** | `gapFillDailySeries` + `anonymizeHouseholdId` | Saudi PDPL (purpose limitation, anonymization) |
| **M + MLFO** | `predictBill` + `selectSeasonProfile` (summer/winter) | KAPSARC/KBEAT energy efficiency; MDPI SA forecasting paper |
| **ML Sandbox** | `isSandbox` forecast without distributor alerts | Y.3172 sandbox; SDAIA transparency |
| **P (Policy)** | L1 50% / L1b 75% / L2 forecast or heatwave | SDAIA ethics (explainable, non-guaranteed) |
| **D (Distributor)** | **In-app notifications only** (no push/email claimed) | Consumer-protection style delivery |
| **SINK** | React mobile + desktop UI | Inclusion: Arabic RTL interface |
| **KB / RAG** | Regulation chunks + URLs in assistant | Full list in `docs/KNOWLEDGE-BASE.md` |

---

## 4. Evaluation scenarios

### Scenario A — Heatwave budget stress (happy path)

1. **Step-1:** Household budget = **500 SAR**; demo SRC/collector ready.  
2. **Step-2:** Heatwave simulation increases kWh; unauthorized cloud access is out of scope in demo — RLS exists in SQL migration for Supabase path.  
3. **Step-3:** Sandbox forecast first (no false alert) → PP anonymizes → MLFO summer → Policy Level-2 → in-app distributor notification. Trigger: About page button / `runEvaluationScenario()`.

### Scenario B — Controversy (ads / purpose creep)

**Stimulus:** After popularity, a hypothetical provider wants targeted ads from consumption patterns.  

**KB-driven action (implemented as policy notification + audit):** Reject advertising use; enforce purpose limitation (PDPL chunk + SDAIA ethics). Wafier only distributes **budget alerts**, not ad targeting. Shown in evaluation audit log and “KB policy guard” notification.

---

## 5. Policy / standards gaps (uniqueness)

From the team brief (also in original PDF under `docs/submission/`):

1. No unified open smart-meter API for third-party AI apps  
2. Undefined liability for prediction error  
3. Need sector-specific energy data rules beyond general PDPL  
4. No national algorithm auditing standard for energy models  
5. Weak machine-readable regulation repositories for RAG  
6. No standards for green/carbon claims in consumer AI  

**What this repo contributes:** open demo code aligning Y.3172 nodes, graduated policy, sandbox pass, PDPL-oriented anonymization hook, and a **real-link KB** for RAG citations.

---

## 6. Implementation map (evidence)

| Claim | File evidence |
|-------|----------------|
| Financial engine kWh→SAR+VAT | `src/lib/financial-engine.ts` |
| MLFO seasonal forecast | `src/lib/ml-predictor.ts` |
| Policy L1/L2 + anonymize | `src/lib/policy-engine.ts` |
| Preprocessor gap-fill | `src/lib/preprocessor.ts` |
| RAG + URLs | `src/lib/rag-chat.ts` |
| Demo pipeline + audit | `src/services/demo-service.ts` |
| HITL override UI | Profile “إيقاف التنبيهات ساعتين” |
| Evaluation UI | `AboutScreen` demo button |

**Distributor:** in-app only. **Video:** see `docs/DEMO-VIDEO-SCRIPT.md` (team records ≤7 min). **Original 5p PDF:** `docs/submission/wafeer-technical-report-original.pdf`.
