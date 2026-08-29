# Wafier — Proactive Bill Prediction and Budget Planning

Arabic RTL FinTech app for household energy budget management (**ITU-T Y.3172** aligned).

## Demo video

> **TODO (team):** paste public URL after recording (≤7 min). Script: [docs/DEMO-VIDEO-SCRIPT.md](docs/DEMO-VIDEO-SCRIPT.md)

## Team

- Fatima Alsultan, Jorry Alfalah, Noor Alshammari, Shahad Alsultan  
- King Faisal University — Budget Planning  

## Problem → Solution

Families hit bill shock after peak cooling months. Wafier forecasts SAR spend, compares to a monthly budget, raises graduated alerts, and answers questions with **citations from a Saudi/energy policy knowledge base**.

## Quick start

```bash
pnpm install
pnpm dev
```

Demo mode works without Supabase — any email + password (4+ chars), then PDPL consent.

## Hackathon submission pack

| Deliverable | Link |
|-------------|------|
| Technical report | [docs/TECHNICAL-REPORT.md](docs/TECHNICAL-REPORT.md) |
| Knowledge base | [docs/KNOWLEDGE-BASE.md](docs/KNOWLEDGE-BASE.md) |
| Evaluation steps | [docs/EVALUATION-SCENARIO.md](docs/EVALUATION-SCENARIO.md) |
| Checklist | [docs/SUBMISSION-CHECKLIST.md](docs/SUBMISSION-CHECKLIST.md) |
| Original PDF | [docs/submission/wafeer-technical-report-original.pdf](docs/submission/wafeer-technical-report-original.pdf) |

## Y.3172 (implemented)

`SRC → Collector → Preprocessor → Model (MLFO) → Policy → Distributor (in-app) → SINK`

- Financial: `src/lib/financial-engine.ts`  
- ML + MLFO: `src/lib/ml-predictor.ts`  
- Policy: `src/lib/policy-engine.ts`  
- RAG: `src/lib/rag-chat.ts`  

## Evaluation demo

1. Login → consent → Dashboard (500 SAR budget)  
2. About → **تشغيل سيناريو موجة الحر**  
3. Notifications: Level-2 + KB anti-ads guard; About shows audit log  

## Scripts

- `pnpm dev` — development  
- `pnpm build` — production  
- `pnpm test` — unit tests (financial / policy / MLFO / heatwave)  

## Hostinger (Deploy Web App from GitHub)

Static React SPA (not a Node server).

| Setting | Value |
|--------|--------|
| Framework | **Vite** |
| Node | **22** (or 20) |
| Build | `pnpm install && pnpm build` |
| Output | **`dist`** |
| Start command | **empty** |

Env (build-time): `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` (optional for demo).

## Limits (do not over-claim)

- Meter data is simulated in demo mode  
- Forecast is seasonal heuristics, not a trained deep model  
- Device alerts: Web Notification API + Capacitor Local Notifications (remote FCM يحتاج `google-services.json`)

## التطبيق الأصلي (Capacitor)

- الإعداد: `capacitor.config.ts` — `appId: sa.wafier.app`
- أندرويد: مجلد `android/` جاهز. بعد البناء: `pnpm cap:sync`
- iOS: نفّذ `pnpm exec cap add ios` على جهاز macOS
  
