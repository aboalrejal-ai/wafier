# Submission checklist (AI Readiness Hackathon – KSA)

Deadline reference: Aug 31 23:59 KSA (from official template).

| Deliverable | Status | Location |
|-------------|--------|----------|
| Technical report ≤5 pages | ☑ Ready | [TECHNICAL-REPORT.md](./TECHNICAL-REPORT.md) + [submission/](../submission/) |
| Demo video ≤7 min + subtitles | ☐ Team recording | Script: [DEMO-VIDEO-SCRIPT.md](./DEMO-VIDEO-SCRIPT.md) |
| GitHub code (public) | ☑ Ready | This repository |
| Knowledge base (authentic links) | ☑ Ready | [knowledge-base.json](../knowledge-base.json) + [kb/](../kb/) |
| Deep research (3 passes) | ☑ Ready | [docs/research/](./research/) |
| Three scenarios | ☑ Ready | [scenarios/](../scenarios/) + `pnpm demo` |
| Policy Gap Matrix | ☑ Ready | Report §5 + `/hackathon/gaps` |
| `.env.example` (no secrets) | ☑ Ready | [.env.example](../.env.example) |

## Hackathon criteria

| Criterion | Evidence |
|-----------|----------|
| Y.3172 seven nodes | `demo-service.ts`, Pipeline Rail in About |
| Policy node P (deterministic) | `policy-engine.ts` — 6 verdicts, KB-ADS-001 |
| SC-01 compliant RAG | `scenarios/sc-01-compliant-rag.json` |
| SC-02 PP failure | `scenarios/sc-02-pp-gap-fill.json` |
| SC-03 controversy | `scenarios/sc-03-ads-controversy.json` |
| ITU Readiness 2.0 (5 dims) | `kb/framework/wafir-readiness.json` |
| Synthetic data notice | `SyntheticNotice` component |
| Honest limitations | [GAP-MATRIX.md](./GAP-MATRIX.md) |

## Pre-submit

- [ ] `pnpm test` and `pnpm demo` pass
- [ ] Video URL in README
- [ ] Links open in incognito
- [ ] Submit 24h before deadline if possible
