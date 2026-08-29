# Wafier Knowledge Base (authentic public sources)

**Submission file:** [`knowledge-base.json`](../knowledge-base.json) (18 VERIFIED records)  
**Structured corpus:** [`kb/records/finance-energy-regulatory.json`](../kb/records/finance-energy-regulatory.json)  
**Verification log:** [`kb/VERIFICATION-LOG.md`](../kb/VERIFICATION-LOG.md)  
**Deep research:** [`docs/research/`](../docs/research/)

**Rule:** use-case telemetry may be simulated; KB documents must be real.

## Finance / energy regulators

| # | Source | Why it matters | URL |
|---|--------|----------------|-----|
| 1 | PDPL | Consent, purpose limitation, anonymization | https://sdaia.gov.sa/ar/SDAIA/about/Pages/AboutPDPL.aspx |
| 2 | SDAIA AI Ethics | Transparency, HITL, non-deceptive forecasts | https://sdaia.gov.sa/ |
| 3 | SAMA Open Banking | FinTech data-sharing context | https://openbanking.sama.gov.sa/index-en.html |
| 4 | SAMA Consumer Protection | Disclosure analogy for forecasts | https://www.sama.gov.sa/en-US/RulesInstructions/Pages/ConsumerProtection.aspx |
| 5 | CMA Fintech Lab | FinTech track positioning | https://fintech.cma.org.sa/ |
| 6 | SEC / KAUST ML | Utility ML legitimacy | https://www.kaust.edu.sa/news/kaust-helps-slash-sec-profit-losses-using-ml |
| 7 | KAPSARC DP00503 | Energy-AI efficiency | https://www.kapsarc.org/media/ip0dt4i1/dp00503-v1.pdf |
| 8 | KBEAT | Household saving tips | https://apps.kapsarc.org/appboard/kbeat/en |
| 9 | MDPI KSA forecasting | Academic forecast benchmark | https://www.mdpi.com/1996-1073/16/4/2035 |
| 10 | ITU-T Y.3172 | Pipeline architecture | https://www.itu.int/rec/T-REC-Y.3172-201906-I |

## In-app RAG

- Chunks: [`src/lib/regulation-chunks.ts`](../src/lib/regulation-chunks.ts) (from verified KB)
- Logic: [`src/lib/rag-chat.ts`](../src/lib/rag-chat.ts) — citations + `INSUFFICIENT_EVIDENCE`
- UI browser: `/hackathon/kb`

## Policy gaps (GAP-01..06)

Documented in `kb/records/finance-energy-regulatory.json` and `/hackathon/gaps`.
