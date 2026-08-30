# Changelog — Wafir Hackathon Readiness

## v1.2-full-research-merge (2026-08-30)

### Changed
- Pasted full deep research into `docs/research/` (ChatGPT, Gemini, Perplexity)
- KB expanded to **41 VERIFIED** + ISO 42001 benchmark + 6 GAP (merged from all three passes)
- Legal wording: no unverified 24°C; SC-03 framed as Wafir privacy control; pseudonymization labels
- SAMA consumer rules as analog benchmark; SERA consumption tariff URL updated

## v1.1-research-kb-wafir (2026-08-30)

### Changed
- `kb/records/finance-energy-regulatory.json` — 21 VERIFIED + 1 UNVERIFIED + 6 GAP (SERA tariff, PDPL M/19, SAMA OB news, SDAIA ethics URLs)
- `knowledge-base.json` — regenerated via `scripts/export-knowledge-base.mjs`
- `kb/VERIFICATION-LOG.md` — full URL checklist for 21 records
- Policy engine — `SDAIA-AI-ETHICS-001` citations (dgp.sdaia.gov.sa)
- App rename **Wafier → Wafir** (UI, tab title via `.figma/make/site.json`, Capacitor/Android)
- `kb/framework/wafir-readiness.json` (replaces `wafier-readiness.json`)
- Technical report, KNOWLEDGE-BASE, HACKATHON-READINESS updated

### Unchanged (by design)
- `localStorage` keys (`wafier_demo_state`, etc.)
- Capacitor `appId` `sa.wafier.app`
- Financial engine tariff tiers (aligned with SERA-TARIFF-001)

## v1.0-hackathon-ready (2026-08-30)

### Added
- `docs/research/` — Gemini, ChatGPT, Perplexity deep research + PROMPTS
- `kb/records/finance-energy-regulatory.json` — initial VERIFIED + GAP records
- `knowledge-base.json` — hackathon submission schema
- `kb/VERIFICATION-LOG.md`, `kb/framework/wafir-readiness.json`
- Policy engine: 6 verdicts, `evaluateKbGuardPolicy`, PDPL-ADS-001
- RAG: verified chunks, `INSUFFICIENT_EVIDENCE`, `regulation-chunks.ts`
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
