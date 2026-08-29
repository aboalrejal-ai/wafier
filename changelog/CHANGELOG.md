# Changelog — Wafier Hackathon Readiness

## v1.0-hackathon-ready (2026-08-30)

### Added
- `docs/research/` — Gemini, ChatGPT, Perplexity deep research + PROMPTS
- `kb/records/finance-energy-regulatory.json` — 18 VERIFIED + 6 GAP records
- `knowledge-base.json` — hackathon submission schema
- `kb/VERIFICATION-LOG.md`, `kb/framework/wafier-readiness.json`
- Policy engine: 6 verdicts, `evaluateKbGuardPolicy`, KB-ADS-001
- RAG: 18 chunks, `INSUFFICIENT_EVIDENCE`, `regulation-chunks.ts`
- Scenarios SC-01/02/03 + `scripts/run-demo.mjs` (`pnpm demo`)
- Hackathon UI: Pipeline Rail, KB/Gaps/Readiness pages, About console
- `SyntheticNotice`, `.env.example`, `explain-layer.ts` (optional LLM)
- `supabase/seed-regulation-chunks.sql`
- Updated technical report, checklists, README

### Unchanged (by design)
- Financial engine, MLFO heuristics, core product screens
- Video recording — team responsibility

### Verification
- `pnpm test` ✓
- `pnpm demo` ✓ (all 3 scenarios)
- `pnpm build` ✓
