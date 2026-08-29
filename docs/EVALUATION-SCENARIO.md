# Evaluation Scenario (Hackathon demo)

## Prerequisites

- Demo mode (no Supabase env) is enough.
- Login with any email + password (≥4 chars) → accept PDPL consent.

## Scenario A — Heatwave (Y.3172 path)

1. Open **About** (`عن Wafier` from Profile).
2. Press **تشغيل سيناريو موجة الحر**.
3. Observe audit trail on About (SRC → Collector → Sandbox → PP anonymize → MLFO summer → Policy L2 → Distributor).
4. Open **Notifications**: Level-2 / heatwave + KB anti-ads guard notice.
5. Dashboard/Forecast: higher kWh / summer season profile.

## Scenario B — Controversy

After Step 3, confirm notification: **حارس سياسة KB — منع الإعلانات**  
Meaning: consumption data must not feed targeted ads (PDPL purpose limitation + SDAIA ethics). Corrective action is **pre-agreed via KB**, not ad-hoc.

## HITL

Profile → **إيقاف التنبيهات ساعتين (HITL)** calls `setAlertOverride` so Policy returns no alerts until expiry.

## Not demonstrated in UI (documented limits)

- Live AMI meter API
- Remote FCM/APNs من سيرفر (التسجيل جاهز ويحتاج مفاتيح Firebase)
- RLS unauthorized-access live probe (schema supports RLS when Supabase configured)
