# Wafir Knowledge Base (authentic public sources)

**Submission file:** [`knowledge-base.json`](../knowledge-base.json) (21 VERIFIED records)  
**Structured corpus:** [`kb/records/finance-energy-regulatory.json`](../kb/records/finance-energy-regulatory.json)  
**Verification log:** [`kb/VERIFICATION-LOG.md`](../kb/VERIFICATION-LOG.md)  
**Deep research:** [`docs/research/`](../docs/research/) (paste results under «نتيجة البحث»)

**Rule:** use-case telemetry may be simulated; KB documents must be real.

**Provenance (2026-08-30):** merged corpus from three deep-research workflows + URL verification on `.gov.sa` primaries (SERA tariff, PDPL portal, SAMA OB news, SDAIA AI ethics assessment).

## Finance / energy regulators

| # | Source | Why it matters | URL |
|---|--------|----------------|-----|
| 1 | PDPL M/19 | Full applicability from Sep 2024 | https://dgp.sdaia.gov.sa/wps/portal/pdp/Registration/private/ |
| 2 | PDPL overview | Consent, purpose limitation | https://sdaia.gov.sa/ar/SDAIA/about/Pages/AboutPDPL.aspx |
| 3 | SDAIA AI Ethics | Transparency, HITL, non-deceptive forecasts | https://dgp.sdaia.gov.sa/wps/portal/pdp/services/AIEthicsAssessment/ |
| 4 | SDAIA AI Adoption Framework | National AI adoption | https://sdaia.gov.sa/en/SDAIA/about/Files/AIAdoptionFramework.pdf |
| 5 | SAMA Open Banking | FinTech data-sharing context | https://openbanking.sama.gov.sa/index-en.html |
| 6 | SAMA OB news | Framework issuance | https://www.sama.gov.sa/en-us/mediacenter/news/pages/news-794.aspx |
| 7 | SAMA Consumer Protection | Disclosure for forecasts | https://www.sama.gov.sa/en-US/RulesInstructions/Pages/ConsumerProtection.aspx |
| 8 | CMA Fintech Lab | FinTech track positioning | https://fintech.cma.org.sa/ |
| 9 | SERA residential tariff | 18/30 halalas per kWh tiers | https://www.sera.gov.sa/en/systems-and-regulations/electric-tariff |
| 10 | SEC / KAUST ML | Utility ML legitimacy | https://www.kaust.edu.sa/news/kaust-helps-slash-sec-profit-losses-using-ml |
| 11 | KAPSARC DP00503 | Energy-AI efficiency | https://www.kapsarc.org/media/ip0dt4i1/dp00503-v1.pdf |
| 12 | KBEAT | Household saving tips | https://apps.kapsarc.org/appboard/kbeat/en |
| 13 | MDPI KSA forecasting | Academic forecast benchmark | https://www.mdpi.com/1996-1073/16/4/2035 |
| 14 | ITU-T Y.3172 | Pipeline architecture | https://www.itu.int/rec/T-REC-Y.3172-201906-I |

## In-app RAG

- Chunks: [`src/lib/regulation-chunks.ts`](../src/lib/regulation-chunks.ts) (from verified KB via `kb-data.ts`)
- Logic: [`src/lib/rag-chat.ts`](../src/lib/rag-chat.ts) — citations + `INSUFFICIENT_EVIDENCE`
- UI browser: `/hackathon/kb`
- Regenerate export: `node scripts/export-knowledge-base.mjs`

## Policy gaps (GAP-01..06)

Documented in `kb/records/finance-energy-regulatory.json` and `/hackathon/gaps`.
