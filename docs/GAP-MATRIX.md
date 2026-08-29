# Gap Matrix — Spec claims vs code (honest)

| # | Requirement | Status | Notes |
|---|-------------|--------|-------|
| 1 | L1 at 50% budget | **Complete** | `evaluateBudgetPolicy` |
| 2 | L1b 75% / L2 proactive | **Complete** | forecast>budget or temp≥40 |
| 3 | RAG + citations | **Complete** | 18 verified chunks; `INSUFFICIENT_EVIDENCE` |
| 4 | Financial kWh→SAR+VAT | **Complete** | `financial-engine.ts` |
| 5 | MLFO season switch | **Complete** | rule-based, not trained NN |
| 6 | ML Sandbox | **Complete** | `isSandbox` path in heatwave |
| 7 | Full 7-node cloud pipeline | **Partial** | Client demo complete; edge ingest stub |
| 8 | Auth / RLS | **Partial** | Demo auth; SQL RLS when Supabase used |
| 9 | PDPL consent UI | **Complete** | Consent screen |
| 10 | Anonymization on eval | **Complete** | preprocessor + policy PDPL-ANON-001 |
| 11 | HITL override | **Complete** | Profile + `setAlertOverride` |
| 12 | Push/email distributor | **Partial** | In-app + Web/Local; FCM needs keys |
| 13 | Live smart meter | **Missing** | simulated — GAP-01 |
| 14 | Desktop parity RAG | **Complete** | Desktop uses `ragChat` |
| 15 | Technical report pack | **Complete** | Updated report + research + gaps |
| 16 | Demo video | **Team** | script ready; URL TBD |
| 17 | Gap-fill preprocessor | **Complete** | SC-02 scenario |
| 18 | Audit log for judges | **Complete** | About + Pipeline Rail |
| 19 | Deep research (3 passes) | **Complete** | `docs/research/` |
| 20 | knowledge-base.json | **Complete** | 18 VERIFIED records |
| 21 | Policy 6 verdicts + KB guard | **Complete** | `policy-engine.ts` |
| 22 | Three JSON scenarios | **Complete** | `scenarios/` + `pnpm demo` |
| 23 | Hackathon UI (KB/Gaps/Readiness) | **Complete** | `/hackathon/*` routes |
| 24 | run_demo reproducible | **Complete** | `scripts/run-demo.mjs` |
| 25 | LLM explain layer (optional) | **Complete** | `explain-layer.ts` — optional key |
| 26 | Supabase KB seed SQL | **Complete** | `supabase/seed-regulation-chunks.sql` |
