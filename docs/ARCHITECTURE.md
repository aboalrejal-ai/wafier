# Wafier Architecture

```
SRC (meter sim, weather, budget)
  → Collector (ingest / heatwave aggregate)
  → Preprocessor (gap-fill, anonymize)
  → Model + MLFO (predictBill, season profile)
      ↳ Sandbox path (no alerts)
  → Policy (L1 / L1b / L2, HITL override)
  → Distributor (in-app + Web Notification + Capacitor Local/Push)
  → SINK (React UI)
```

## Stack

- **Frontend:** React 19, Vite, Tailwind v4, React Router, Zustand, TanStack Query  
- **Native wrap:** Capacitor 8 (`sa.wafier.app`) — Android في المستودع؛ iOS عبر `cap add ios` على macOS  
- **Backend (optional):** Supabase Auth / Postgres / Edge function stubs  
- **Default path:** Demo mode (`localStorage` + client engines) when Supabase env unset  

## Engines

| Module | Path |
|--------|------|
| Financial | `src/lib/financial-engine.ts` |
| ML / MLFO | `src/lib/ml-predictor.ts` |
| Policy | `src/lib/policy-engine.ts` |
| Preprocessor | `src/lib/preprocessor.ts` |
| RAG | `src/lib/rag-chat.ts` |
| Demo orchestration | `src/services/demo-service.ts` |
| Notification distributor | `src/lib/notification-distributor.ts` |

## Deployment

Static SPA → Hostinger (Vite, Node 22, output `dist`, empty start command).  
`public/.htaccess` for React Router on Apache.
