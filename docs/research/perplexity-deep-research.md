# Perplexity Deep Research — Wafier Finance/Energy Track

**Date:** 2026-08-30  
**Tool:** Perplexity Deep Research (Pass 3 of 3)  
**Focus:** Liability, smart meters, cross-border data, advertising

---

## 1. Liability when AI bill forecast is wrong

**Finding:** Saudi PDPL provides data-subject rights and remedies for unlawful processing; SDAIA ethics require transparency that predictions are non-binding. No dedicated "energy forecast liability" statute was located in public portals.

| Aspect | Source | URL | Status |
|--------|--------|-----|--------|
| Data subject rights / remedies | PDPL overview | https://sdaia.gov.sa/ar/SDAIA/about/Pages/AboutPDPL.aspx | VERIFIED |
| Non-deceptive AI outputs | SDAIA ethics | https://sdaia.gov.sa/ | VERIFIED |
| Financial disclosure analogy | SAMA consumer protection | https://www.sama.gov.sa/en-US/RulesInstructions/Pages/ConsumerProtection.aspx | VERIFIED |

**Wafier implementation:** UI disclaimer + RAG template "تقديري وليس ضماناً مالياً"  
**Gap:** GAP-02 — AMBIGUITY — no explicit SAR penalty schedule for wrong household forecasts

---

## 2. Smart meter / AMI third-party access

**Finding:** SEC and KAUST public materials discuss ML for grid optimization but do not publish an open household AMI API for FinTech apps.

| Source | Relevance | URL | Status |
|--------|-----------|-----|--------|
| KAUST-SEC ML | Sector legitimacy | https://www.kaust.edu.sa/news/kaust-helps-slash-sec-profit-losses-using-ml | VERIFIED |
| SEC corporate site | Utility operator | https://www.se.com.sa/ | VERIFIED |

**Gap:** GAP-01 — POTENTIAL_GAP — Wafier uses simulated meter readings in demo

---

## 3. Cross-border data transfers

**Finding:** PDPL governs transfers outside KSA; Wafier demo is client-side/localStorage; optional Supabase requires operator configuration in KSA-compliant regions.

| Source | URL | Status |
|--------|-----|--------|
| PDPL overview | https://sdaia.gov.sa/ar/SDAIA/about/Pages/AboutPDPL.aspx | VERIFIED |

**Wafier:** Documented in privacy screen; anonymization before ML export path

---

## 4. Advertising / profiling from consumption

**Finding:** PDPL purpose limitation + SDAIA ethics prohibit deceptive or undisclosed secondary use. Targeted ads from utility consumption without separate consent is a **policy violation** in Wafier's controversial scenario.

| Provision | URL | Enforcement in Wafier |
|-----------|-----|----------------------|
| PDPL purpose limitation | https://sdaia.gov.sa/ar/SDAIA/about/Pages/AboutPDPL.aspx | KB-ADS-001 → BLOCK_DATA_USE |
| SDAIA ethics | https://sdaia.gov.sa/ | Audit + notification |

**Gap:** GAP-06 — AMBIGUITY — regulatory enforcement body for ad-tech misuse of utility data not spelled out in single decree

---

## 5. Open banking boundary

SAMA Open Banking applies to **financial account** data, not SEC meter telemetry. Wafier stays in utility budgeting unless future bank-feed integration — then SAMA OB rules apply.

- https://openbanking.sama.gov.sa/index-en.html — VERIFIED

---

## 6. Policy Gap Matrix (Perplexity consolidated)

| ID | Type | Description | Recommendation |
|----|------|-------------|----------------|
| GAP-01 | potential_gap | No open AMI API | National utility data access framework |
| GAP-02 | ambiguity | Forecast liability | Sector guidance on AI estimate disclaimers + redress |
| GAP-03 | potential_gap | Energy-specific AI data rules | Extend PDPL with SEC sector circular |
| GAP-04 | potential_gap | No algorithm audit standard | Adopt Y.3172 sandbox + external audit |
| GAP-05 | potential_gap | No machine-readable law repo | SDAIA/BOE structured regulation API |
| GAP-06 | ambiguity | Consumption → ads | Explicit ban + consent model in PDPL guidance |

---

## 7. Records unique to this pass

| ID | Title | URL | Node |
|----|-------|-----|------|
| SEC-PORTAL-001 | Saudi Electricity Company | https://www.se.com.sa/ | SRC |
| SAMA-CP-001 | SAMA Consumer Protection portal | https://www.sama.gov.sa/en-US/RulesInstructions/Pages/ConsumerProtection.aspx | KB |
| PDPL-TRANSFER-001 | PDPL cross-border transfers (overview) | https://sdaia.gov.sa/ar/SDAIA/about/Pages/AboutPDPL.aspx | PP |
