# Wafir — Product Specification (honest)

**Team:** Fatima Alsultan, Jorry Alfalah, Noor Alshammari, Shahad Alsultan  
**Contact:** King Faisal University — Budget Planning  
**Solution:** Personal FinTech for household energy budget management

## ITU-T Y.3172 pipeline (as implemented)

1. **SRC** — Simulated meter kWh, weather fetch/simulation, user budget  
2. **C** — Demo collector (`ingestMeterReading` / heatwave aggregation)  
3. **PP** — Gap-fill daily series + PDPL-oriented household id anonymization  
4. **M** — Seasonal rule-based bill forecast (`predictBill`)  
5. **MLFO** — `selectSeasonProfile` summer/winter/baseline from temperature  
6. **Sandbox** — Forecast with `isSandbox` without distributor alerts  
7. **P** — Graduated alerts: L1 50%, L1b 75%, L2 forecast>budget or temp≥40  
8. **D** — إشعارات داخل التطبيق + Web Notification API + Capacitor Local Notifications (تسجيل Push جاهز ويحتاج `google-services.json` / APNs)  
9. **SINK** — React mobile + desktop UI  

## Evaluation scenario

1. Budget 500 SAR  
2. Heatwave increases consumption  
3. Sandbox → PP anonymize → MLFO summer → L2 alert → KB anti-ads notice  

## References

See [KNOWLEDGE-BASE.md](./KNOWLEDGE-BASE.md) and [TECHNICAL-REPORT.md](./TECHNICAL-REPORT.md).
