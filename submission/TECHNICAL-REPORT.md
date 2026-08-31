# Wafir — Technical Report (AI Readiness Hackathon – KSA)

**Team name:** wafir team  
**Track:** Finance (household energy budgeting / FinTech)  
**Solution name:** Wafir — Proactive Bill Prediction and Budget Planning  
**Contact / Org:** King Faisal University — Budget Planning  
**Designation:** Students  

**Team Members**

- Mohammed Nadher Aboalrejal — Mentor — aboalrejal.ai@gmail.com — Technical Lead, System Architect, Technical Report Author  
- Fatima Alsultan (King Faisal University, Chemical Engineering, 2nd Year) — fatima.alsultan2105@gmail.com — Document research, concept ideation, policy gap analysis, report structuring  
- Shahad Alsultan (King Faisal University, Civil Engineering, 2nd Year) — shahadalsultan2026@outlook.com — Video production, report drafting (Introduction and Nodes)  
- Jorry Alfalah (King Faisal University, Electrical Engineering, 2nd Year) — Jurryraed90@hotmail.com — App UI design, logo design  
- Noor Alshammari (King Faisal University, Chemical Engineering, 2nd Year) — noornaser.sh1@gmail.com — App UI templates, logo design  

> Cap: ≤5 pages. Demo telemetry is **synthetic** (hackathon use only); Knowledge Base documents are authentic public sources. This report describes only capabilities present in the repository (demo path + optional Supabase). Limitations are stated explicitly.

**Project resources**

- Live Demo: https://wafier.aboalrejal.com/  
- GitHub: https://github.com/aboalrejal-ai/wafier  
- Demo video: https://www.youtube.com/watch?v=bRYwjbxs9t4

---

## 1. Introduction

Households in Saudi Arabia often discover electricity overspend only when the monthly bill arrives. Peak summer cooling makes this worse. **Wafir** is an Arabic RTL personal FinTech app that forecasts end-of-month SAR spend from **simulated** meter-like kWh plus weather context, compares the forecast to a user budget, and raises graduated alerts.

The pipeline follows **ITU-T Y.3172** (SRC → C → PP → M → P → D → SINK, plus Sandbox). Policy grounding uses a verified Knowledge Base of Saudi and ITU public sources (`knowledge-base.json`, 42 VERIFIED records + 1 ISO benchmark), compiled from three independent deep-research passes in `docs/research/`. Framework names follow ITU AI Readiness Report 2.0 (`kb/framework/dimensions.json`).

Honest limit: meter ingest is simulated; the forecast is rule-based seasonal projection, not a trained neural model.

---

## 2. Use case and gaps in existing solutions

**Problem.** Families lack proactive, explainable energy-budget control tied to local tariffs and heatwaves.

**Beneficiaries.** Saudi households managing a monthly electricity budget; secondary value for energy/privacy policy readers via the gap matrix.

| Gap in existing tools | How Wafir responds (implemented) |
|-----------------------|----------------------------------|
| Late bill shock | Seasonal forecast vs budget; Level-2 warning if predicted SAR > budget or temperature ≥40°C |
| Opaque advice | RAG over verified chunks with citation URLs; if nothing matches: Arabic `INSUFFICIENT_EVIDENCE`, no invented law |
| No privacy gate | PDPL consent screen before processing; preprocessor pseudonymizes household id before ML export |
| Ads from consumption | Deterministic policy node blocks `targeted_ads_from_consumption` (PDPL-ADS-001) |
| No orchestration evidence | Demo path SRC→C→PP→M→P→D with audit log; reproducible via `pnpm demo` |

---

## 3. Y.3172 architecture (mapped documents)

Sandbox is a Y.3172 supporting component (parallel validation). MLFO is seasonal-profile switching **inside M**, not an eighth official node.

| Node | Role in Wafir (code behaviour) | Supporting document | URL |
|------|--------------------------------|---------------------|-----|
| SRC | Budget 500 SAR, simulated kWh, weather (OpenWeather if key set, else simulated) | SERA residential tariff | https://www.sera.gov.sa/en/consumer/electric-tariff/electric-tariff-categories/consumption-tariff |
| C | Demo collector / heatwave aggregation (`simulateMeterReading`) | SEC data sharing (no consumer AMI API — GAP-01) | https://www.se.com.sa/en/Open-Data/Data-Sharing/ |
| PP | Gap-fill missing daily kWh; hash household id (pseudonymization, not full anonymization) | PDPL destruction / pseudonymisation guidance | https://dgp.sdaia.gov.sa/wps/portal/pdp/knowledgecenter/details/PersonalDataDestruction/ |
| M + MLFO | Rule-based SAR forecast; summer profile at ≥38°C | MDPI KSA energy-forecasting paper (method reference, not trained weights) | https://www.mdpi.com/1996-1073/16/4/2035 |
| Sandbox | `isSandbox`: forecast without distributor alerts | ITU-T Y.3172 | https://www.itu.int/rec/T-REC-Y.3172-201906-I |
| P | Budget L1/L1b/L2 + ads guard (no LLM in the decision) | PDPL official text + Wafir PDPL-ADS-001 | https://sdaia.gov.sa/en/SDAIA/about/Documents/Personal%20Data%20English%20V2-23April2023-%20Reviewed-.pdf |
| D | In-app + Web/Local notifications (FCM needs keys) | SDAIA AI Ethics (human oversight) | https://dgp.sdaia.gov.sa/wps/wcm/connect/4c56ed1c-1b82-447d-ac29-638f5f99c12e/ai-principles-EN.pdf |
| SINK | Arabic RTL React UI | SAMA consumer-protection principles (analog; not Open Banking integration) | https://rulebook.sama.gov.sa/en/financial-consumer-protection-principles-and-rules |

Y.3172 ↔ Readiness (ITU summary): D5 workflows, D10 policies, D13 infrastructure (nodes as AI-enabled devices).

---

## 4. ITU AI Readiness 2.0 — six factors and selected dimensions

Official names: `kb/framework/dimensions.json` (ITU AI Readiness Report 2.0). PDPL / purpose limitation maps to **D10**, not D8.

| Factor | Wafir evidence |
|--------|----------------|
| Data | Public Saudi/ITU documents in `knowledge-base.json` (not private household dumps) |
| Research | Three deep-research passes in `docs/research/` (ChatGPT, Gemini, Perplexity), then human merge |
| Deployment Support | Vite SPA on Hostinger; optional Supabase; Capacitor wrapper |
| Standards | Y.3172 node mapping + ITU-T Y.3172 citation |
| Open Source and Code | Public GitHub https://github.com/aboalrejal-ai/wafier |
| Sandbox Environments | `isSandbox` heatwave path — forecast without pushing alerts |

| ID | Official ITU dimension | Wafir evidence |
|----|------------------------|----------------|
| D5 | Level of Integration of AI in Workflows | Pipeline audit, graduated alerts, `pnpm demo` |
| D6 | Human Interface | Arabic RTL UI + AI assistant with citations |
| D7 | Strategy Alignment | KB record NSDAI-001 (Vision 2030 / SDAIA NSDAI PDF). Household energy+data use-case aligned to the national strategy; we do **not** claim to implement NSDAI |
| D8 | Collaboration with AI | HITL: 2-hour alert snooze on Profile; user question shapes RAG |
| D10 | AI & Policies | Six verdicts; SC-03 policy sandbox; GAP-01..06; PDPL consent + purpose limitation |
| D11 | AI for Inclusion | Arabic-first interface; local SERA/KAPSARC context |
| D13 | Digital Infrastructure | Hosted SPA; optional Supabase; simulated meter as Y.3172 SRC stand-in |

See `kb/framework/wafir-readiness.json` and `/hackathon/readiness`.

---

## 5. Three evaluation scenarios + Policy Gap Matrix

Reproducible proof: `pnpm demo` (or `node scripts/run-demo.mjs`). Demo data are synthetic.

### SC-01 — Compliant RAG (`scenarios/sc-01-compliant-rag.json`)

**Scenario.** User asks in the AI Assistant: **«كيف أوفر في فاتورة الكهرباء؟»**

- **Step 1.** The household submits a normal saving question. Context is synthetic.
- **Step 2.** Wafir retrieves verified KB chunks by keyword matching over curated records (not a live web search). If no chunk matches, the assistant returns *«لا توجد أدلة كافية…»* (`INSUFFICIENT_EVIDENCE`) and invents no URLs.
- **Step 3.** For this query the grounded reply gives qualitative saving tips (runtime, efficient AC / SASO 2663, insulation, LED, night-time loads) with citation URLs. Expected verdict: **COMPLIANT**. Tips are not a guaranteed SAR saving.

### SC-02 — Operational failure (`scenarios/sc-02-pp-gap-fill.json`)

**Scenario.** In a 7-day kWh series, **day 4 is missing** (`kwh: null`); other days are 29.67.

- **Step 1.** Collector/preprocessor sees an incomplete series (simulated meter gap, not a live AMI outage).
- **Step 2.** The missing day is filled from neighbouring values (demo expected fill = 29.67). Household id is pseudonymized for export.
- **Step 3.** Forecast and dashboard continue; the audit log records the gap-fill; the app does not crash.

**Expected.** Graceful degradation. The filled value is **not** claimed as a real meter reading.

### SC-03 — Controversy / targeted ads (`scenarios/sc-03-ads-controversy.json`)

**Scenario.** A dummy provider requests `targeted_ads_from_consumption`.

- **Step 1.** The request arrives as a policy check (About → controversy scenario), not as a live ad SDK.
- **Step 2.** Policy node `evaluateKbGuardPolicy` runs **deterministically** (no LLM).
- **Step 3.** Result **VIOLATION / BLOCK_DATA_USE / PDPL-ADS-001**. In-app notice: «حارس سياسة KB — منع الإعلانات». Audit stores the verdict and https://dgp.sdaia.gov.sa/wps/portal/pdp/knowledgecenter/details/PDPL/
- **Step 4 (corrective).** Consumption data is not released for ads. This is a **Wafir purpose-limitation control**. PDPL Art.26 allows consented marketing of **non-sensitive** data; we do **not** claim a statutory total advertising ban. HITL snooze remains available on Profile for budget alerts.

### Policy Gap Matrix

Classifications are from sources **we reviewed**; they are not a claim that Saudi law is silent in every forum.

| ID | Type | Gap | Recommendation |
|----|------|-----|----------------|
| GAP-01 | potential_gap | No consumer-authorized AMI API | Open-Utility style authorization (like Open Banking) |
| GAP-02 | potential_gap | AI forecast liability allocation | Sector guidance; general civil law may apply (CIVIL-LAW-120) |
| GAP-03 | potential_gap | Energy-sector AI data rules | PDPL + SERA PDP under explicit sector policy |
| GAP-04 | potential_gap | No mandatory energy algorithm-audit standard | Y.3172 sandbox + ISO 42001 as a **benchmark** (not a certification) |
| GAP-05 | potential_gap | No machine-readable law repository | Government structured-regulation API |
| GAP-06 | ambiguity | Consumption → ads repurposing | Explicit PDPL/sector guidance; Wafir blocks silent reuse |

**GAP-01.** In the sources we reviewed, we did not find a consumer-authorized AMI API comparable to Open Banking that would let Wafir pull live meter data with user consent. Wafir therefore uses simulated kWh. Recommendation: an Open-Utility style authorization framework.

**GAP-02.** We did not find sector-specific rules allocating liability when an energy forecast is wrong. General civil-law harmful-act principles may still apply (CIVIL-LAW-120). Recommendation: sector guidance; until then Wafir labels forecasts as estimates.

**GAP-03.** PDPL and SERA data-protection pages exist, but energy-AI processing (forecasting, sharing, secondary use) is not spelled out as a sector playbook in the sources we checked. Recommendation: PDPL + SERA PDP under explicit sector policy.

**GAP-04.** We did not find a mandatory energy-sector algorithm-audit standard for household bill models. Recommendation: use the Y.3172 sandbox pattern and ISO/IEC 42001 as a benchmark, not a claimed certification.

**GAP-05.** Official texts are published as HTML/PDF, not as a queryable regulation API. Wafir therefore curates verified chunks rather than scraping live law. Recommendation: a government structured-regulation API.

**GAP-06.** PDPL purpose limitation and Art.25–27 constrain marketing, but Art.26 still allows consented marketing of non-sensitive data. Whether electricity-consumption profiles may be reused for ads is not spelled out for this use case. Wafir blocks silent repurposing by policy (SC-03). Recommendation: explicit PDPL/sector guidance on energy-data repurposing.

---

## 6. Knowledge base (authentic sources) and repository links

Full corpus: `knowledge-base.json` (42 VERIFIED + 1 ISO benchmark). Ten primary citations for judges:

| # | Document | Authority | Section | URL |
|---|----------|-----------|---------|-----|
| 1 | Personal Data Protection Law (official EN) | SDAIA | Art.4–6, 10–15, 25–27 | https://sdaia.gov.sa/en/SDAIA/about/Documents/Personal%20Data%20English%20V2-23April2023-%20Reviewed-.pdf |
| 2 | PDPL — Art.26 direct marketing | SDAIA | Art.26; Arts. 25–27 | https://dgp.sdaia.gov.sa/wps/portal/pdp/knowledgecenter/details/PDPL2/ |
| 3 | AI Ethics Principles (v1.0) | SDAIA | Human oversight / responsible AI | https://dgp.sdaia.gov.sa/wps/wcm/connect/4c56ed1c-1b82-447d-ac29-638f5f99c12e/ai-principles-EN.pdf |
| 4 | National Strategy for Data & AI (NSDAI) | SDAIA | Vision 2030 | https://sdaia.gov.sa/en/SDAIA/SdaiaStrategies/Documents/NSDAI.pdf |
| 5 | SERA residential consumption tariff | SERA | Consumption tariff | https://www.sera.gov.sa/en/consumer/electric-tariff/electric-tariff-categories/consumption-tariff |
| 6 | SEC data sharing | SEC | Open data / sharing | https://www.se.com.sa/en/Open-Data/Data-Sharing/ |
| 7 | KBEAT — Building Energy Assessment Tool | KAPSARC | Efficiency guidance | https://apps.kapsarc.org/appboard/kbeat/en |
| 8 | Financial Consumer Protection Principles | SAMA | Consumer protection (analog) | https://rulebook.sama.gov.sa/en/financial-consumer-protection-principles-and-rules |
| 9 | ITU-T Y.3172 | ITU | ML pipeline architecture | https://www.itu.int/rec/T-REC-Y.3172-201906-I |
| 10 | ISO/IEC 42001:2023 | ISO | AI management (benchmark only) | https://www.iso.org/standard/81230.html |

| Deliverable | Location |
|-------------|----------|
| GitHub | https://github.com/aboalrejal-ai/wafier |
| Live demo | https://wafier.aboalrejal.com/ |
| Demo video | https://www.youtube.com/watch?v=bRYwjbxs9t4 |
| Knowledge base | `knowledge-base.json` |
| Scenarios | `scenarios/` |
| Reproducible demo | `pnpm demo` |

**Distributor:** in-app + Web Notification API + Capacitor Local Notifications.
