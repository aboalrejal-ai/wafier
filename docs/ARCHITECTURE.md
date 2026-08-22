# Wafier Architecture

```
SRC (meter, weather, budget)
  → Collector (ingest-meter-reading, fetch-weather)
  → Preprocessor (gap-fill, anonymize)
  → Model Node (predict-bill + MLFO)
  → Policy Node (evaluate-policy → L1/L2 alerts)
  → Distributor (notifications)
  → SINK (React UI)
```

## Stack

- **Frontend:** React 19, Vite 8, Tailwind v4, React Router, Zustand, TanStack Query
- **Backend:** Supabase (Auth, Postgres, Edge Functions, Realtime)
- **ML:** TypeScript predictor with seasonal profiles (summer/winter via MLFO)
- **RAG:** Regulation chunks + retrieval + LLM fallback

## Demo Mode

When `VITE_SUPABASE_URL` is unset, the app runs in **demo mode** using localStorage and client-side services — same business logic, no cloud required.
