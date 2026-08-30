# Wafir — Proactive Bill Prediction and Budget Planning

Arabic RTL FinTech app for household energy budget management (**ITU-T Y.3172** aligned).

**English (judges):** Wafir forecasts monthly electricity spend in SAR from simulated smart-meter kWh, compares against a user budget, runs a deterministic policy node (PDPL/SDAIA guardrails), and answers questions with **verified Saudi policy citations**. Finance track — energy budgeting FinTech.

## Demo video

> **TODO (team):** paste public URL after recording (≤7 min + subtitles). Script: [docs/DEMO-VIDEO-SCRIPT.md](docs/DEMO-VIDEO-SCRIPT.md)

## Team

- Fatima Alsultan, Jorry Alfalah, Noor Alshammari, Shahad Alsultan  
- King Faisal University — Budget Planning  

## Quick start

```bash
pnpm install
pnpm dev
pnpm test      # unit tests
pnpm demo      # hackathon scenarios SC-01/02/03
```

## Hackathon submission pack

| Deliverable | Link |
|-------------|------|
| Technical report | [docs/TECHNICAL-REPORT.md](docs/TECHNICAL-REPORT.md) |
| Knowledge base JSON | [knowledge-base.json](knowledge-base.json) |
| Deep research | [docs/research/](docs/research/) |
| Scenarios | [scenarios/](scenarios/) |
| Evaluation steps | [docs/EVALUATION-SCENARIO.md](docs/EVALUATION-SCENARIO.md) |
| Readiness assessment | [docs/HACKATHON-READINESS.md](docs/HACKATHON-READINESS.md) |
| Checklist | [docs/SUBMISSION-CHECKLIST.md](docs/SUBMISSION-CHECKLIST.md) |

## Official ITU Framework Reference

Wafir aligns evidence to the **ITU AI Readiness Framework 2.0** from the official training repository:

| Resource | Path |
|----------|------|
| Upstream repo | [github.com/CrashingGuru/ITUAIReadiness](https://github.com/CrashingGuru/ITUAIReadiness) |
| 13 dimensions (official JSON) | [kb/framework/dimensions.json](kb/framework/dimensions.json) |
| Wafir evidence mapping | [kb/framework/wafir-readiness.json](kb/framework/wafir-readiness.json) |
| KB manifest (Inputs.md style) | [kb/InputDocs/Inputs.md](kb/InputDocs/Inputs.md) |
| Alignment doc | [docs/ITU-FRAMEWORK-SOURCE.md](docs/ITU-FRAMEWORK-SOURCE.md) |

```bash
git clone https://github.com/CrashingGuru/ITUAIReadiness
# Compare: ITUAIReadiness/simulation/data/framework/dimensions.json ↔ kb/framework/dimensions.json
```

## Y.3172 (implemented)

`SRC → Collector → Preprocessor → Model (MLFO) → Policy → Distributor → SINK`

- Financial: `src/lib/financial-engine.ts`  
- ML + MLFO: `src/lib/ml-predictor.ts`  
- Policy (6 verdicts): `src/lib/policy-engine.ts`  
- RAG: `src/lib/rag-chat.ts`  

## Hackathon console (in app)

About → three scenario buttons + links to:
- `/hackathon/kb` — verified sources
- `/hackathon/gaps` — GAP-01..06
- `/hackathon/readiness` — ITU Readiness 2.0 (official dimension names from `dimensions.json`)

## Environment

Copy [`.env.example`](.env.example) — no API keys required for demo mode.

## Limits (do not over-claim)

- Meter data is simulated (GAP-01)  
- Forecast is seasonal heuristics, not a trained deep model  
- Policy decisions are **deterministic code** — LLM optional for explanation only

## Hostinger / Capacitor

See previous README sections for deploy and Android (`capacitor.config.ts`, `android/`).
