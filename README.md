# Wafier — Proactive Bill Prediction and Budget Planning

Arabic RTL FinTech app for household energy budget management (ITU-T Y.3172 aligned).

## Team

- Fatima Alsultan, Jorry Alfalah, Noor Alshammari, Shahad Alsultan
- Contact: King Faisal Budget Planning

## Quick Start

```bash
pnpm install
pnpm dev
```

Demo mode works without Supabase — use any email + password (4+ chars).

## Supabase Setup (Production)

1. Create Supabase project
2. Copy `.env.example` → `.env.local`:
   ```
   VITE_SUPABASE_URL=https://xxx.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJ...
   ```
3. Run migration: `supabase db push`
4. Deploy edge functions: `supabase functions deploy`

## Architecture

```
SRC → Collector → Preprocessor → Model (MLFO) → Policy → Distributor → SINK (React UI)
```

- **Smart Financial Engine:** `src/lib/financial-engine.ts` — kWh → SAR + VAT
- **ML + MLFO:** `src/lib/ml-predictor.ts` — seasonal profiles
- **Policy:** `src/lib/policy-engine.ts` — L1 (50%), L2 proactive
- **RAG:** `src/lib/rag-chat.ts` — Saudi energy regulations

## Evaluation Scenario (Demo)

1. Login → PDPL consent → Dashboard (500 SAR budget)
2. Profile → run heatwave simulation via `runEvaluationScenario()` in console:
   ```js
   // Or use About page demo button
   ```
3. Level 2 alert + MLFO summer profile activates

## Scripts

- `pnpm dev` — development server
- `pnpm build` — production build
- `pnpm test` — unit tests

## Hostinger (Deploy Web App from GitHub)

This project is a **static React SPA**, not a Node.js server app.

| Setting | Value |
|--------|--------|
| Framework | **Vite** |
| Node version | **22** (matches `.mise.toml`; use 20 if 22 is unavailable) |
| Install / build | `pnpm install && pnpm build` (or `npm install && npm run build`) |
| Output directory | **`dist`** |
| Start command | **Leave empty** — static files only; no long-running Node process |

**Do not choose:** Next.js, Express, or Custom Node server — there is no backend in this repo.

**Backend / database:** Supabase (hosted separately). Set build-time env vars in Hostinger:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- Optional: `VITE_OPENWEATHER_API_KEY`, `VITE_OPENAI_API_KEY`

`public/.htaccess` is included for React Router on Apache (shared/cloud hosting). After deploy, test deep links such as `/dashboard` and `/login`.

**Recommended hosting:** Hostinger Cloud or Business with GitHub auto-deploy (pull from `main`). VPS is not required.

## Docs

- [SPEC.md](docs/SPEC.md) — product specification
- [GAP-MATRIX.md](docs/GAP-MATRIX.md) — prototype vs spec
- [ARCHITECTURE.md](docs/ARCHITECTURE.md) — technical architecture
