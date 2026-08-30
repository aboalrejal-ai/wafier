# Wafir Knowledge Base (authentic public sources)

**Submission file:** [`knowledge-base.json`](../knowledge-base.json) (**42** VERIFIED + **1** ISO benchmark)  
**Structured corpus:** [`kb/records/finance-energy-regulatory.json`](../kb/records/finance-energy-regulatory.json)  
**ITU manifest:** [`kb/InputDocs/Inputs.md`](../kb/InputDocs/Inputs.md)  
**Framework source:** [`docs/ITU-FRAMEWORK-SOURCE.md`](../docs/ITU-FRAMEWORK-SOURCE.md)  
**Verification log:** [`kb/VERIFICATION-LOG.md`](../kb/VERIFICATION-LOG.md)  
**Deep research (complete):** [`docs/research/`](../docs/research/)

**Provenance:** Full merge from ChatGPT (`chatgpt-deep-research.md`), Gemini (`gemini-deep-research.md`), and Perplexity (`perplexity-deep-research.md`) — pasted 2026-08-30.

**Rule:** use-case telemetry may be simulated; KB documents must be real.

## Core regulators (merged)

| Domain | Key records | Primary URL |
|--------|-------------|-------------|
| PDPL | PDPL-PDF-001, PDPL-ART-05/06/26, PDPL-ADS-001 | dgp.sdaia.gov.sa |
| SDAIA AI | SDAIA-AI-ETHICS-PDF-001, SDAIA-GENAI-PUBLIC-001 | sdaia.gov.sa / dgp.sdaia.gov.sa |
| SAMA | SAMA-OB-001, SAMA-PAYMENTS-REG-001, SAMA-CP-RULEBOOK-001 | openbanking.sama.gov.sa, rulebook.sama.gov.sa |
| CMA | CMA-FINTECH-001 | cma.gov.sa |
| Energy | SERA-TARIFF-001, SERA-PDP-001, SEC-DATASHARE-001 | sera.gov.sa, se.com.sa |
| Efficiency | KAPSARC-COOLING-001, KBEAT-001, SEEC-SASO-2663-001 | kapsarc.org, apps.kapsarc.org |
| Liability | CIVIL-LAW-120, CIVIL-LAW-136 | uqn.gov.sa |
| Architecture | ITU-Y3172-001, ISO-42001-001 (benchmark) | itu.int, iso.org |

## In-app RAG

- Chunks: [`src/lib/regulation-chunks.ts`](../src/lib/regulation-chunks.ts)
- Logic: [`src/lib/rag-chat.ts`](../src/lib/rag-chat.ts)
- Regenerate: `node scripts/export-knowledge-base.mjs`

## Policy gaps

GAP-01..06 in JSON + `/hackathon/gaps`. Extended GAP-07..12 in Perplexity research file.
