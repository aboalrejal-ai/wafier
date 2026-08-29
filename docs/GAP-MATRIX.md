# Gap Matrix — Spec claims vs code (honest)

| # | Requirement | Status | Notes |
|---|-------------|--------|-------|
| 1 | L1 at 50% budget | **Complete** | `evaluatePolicy` |
| 2 | L1b 75% / L2 proactive | **Complete** | forecast>budget or temp≥40 |
| 3 | RAG + citations | **Partial** | Keyword RAG + real URLs; no embeddings/LLM unless key set |
| 4 | Financial kWh→SAR+VAT | **Complete** | `financial-engine.ts` |
| 5 | MLFO season switch | **Complete** | rule-based, not trained NN |
| 6 | ML Sandbox | **Partial** | `isSandbox` path in demo evaluation |
| 7 | Full 7-node cloud pipeline | **Partial** | Client demo complete; edge ingest stub |
| 8 | Auth / RLS | **Partial** | Demo auth; SQL RLS when Supabase used |
| 9 | PDPL consent UI | **Complete** | Consent screen |
| 10 | Anonymization on eval | **Complete** | called in heatwave scenario |
| 11 | HITL override | **Complete** | Profile button + `setAlertOverride` |
| 12 | Push/email distributor | **Partial** | In-app + Web/Local device notifications; remote FCM يحتاج مفاتيح |
| 13 | Live smart meter | **Missing** | simulated |
| 14 | Desktop parity RAG | **Complete** | Desktop uses `ragChat` |
| 15 | Technical report pack | **Complete** | `docs/TECHNICAL-REPORT.md` |
| 16 | Demo video | **Missing** | script ready; URL TBD |
| 17 | Gap-fill preprocessor | **Complete** | `preprocessor.ts` |
| 18 | Audit log for judges | **Complete** | About page + demo service |
