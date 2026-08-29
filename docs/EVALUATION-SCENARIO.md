# Evaluation Scenario (Hackathon demo)

## Prerequisites

- Demo mode (no Supabase env) is enough.
- Login with any email + password (≥4 chars) → accept PDPL consent.

## SC-01 — Compliant RAG (Normal)

1. Open **About** → **SC-01 — RAG متوافق** (or AI Assistant).
2. Ask: **كيف أوفر في فاتورة الكهرباء؟**
3. Verify reply includes saving tips and **citation URLs**.
4. CLI: `pnpm demo 1`

## SC-02 — Operational failure (PP gap-fill)

1. About → **SC-02 — فجوة بيانات PP**.
2. Audit trail shows `preprocessor` gap-fill for missing day.
3. Dashboard/forecast still loads — **no crash**.
4. CLI: `pnpm demo 2`

## SC-03 — Controversy (ads)

1. About → **SC-03 — جدل إعلانات**.
2. Notification: **حارس سياسة KB — منع الإعلانات**.
3. Audit: `kb-policy` → `VIOLATION` / `BLOCK_DATA_USE` / PDPL-ADS-001.
4. CLI: `pnpm demo 3`

## Bonus — Heatwave (combined Y.3172 path)

1. About → **موجة حر — سيناريو كامل**.
2. Sandbox → PP anonymize → MLFO summer → Policy L2 → KB guard.
3. Notifications + audit log on About.

## HITL

Profile → **إيقاف التنبيهات ساعتين (HITL)** → Policy returns no alerts until expiry.

## Hackathon pages

- `/hackathon/kb` — verified sources browser
- `/hackathon/gaps` — GAP-01..06 matrix
- `/hackathon/readiness` — ITU Readiness 2.0 dimensions

## Documented limits

- Live AMI meter API (GAP-01)
- Remote FCM/APNs (needs Firebase keys)
- ML is heuristic seasonal — not trained NN
