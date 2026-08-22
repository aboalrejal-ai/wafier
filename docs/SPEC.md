# Wafier — Proactive Bill Prediction and Budget Planning

**Team:** wafier team (Fatima Alsultan, Jorry Alfalah, Noor Alshammari, Shahad Alsultan)  
**Contact:** King Faisal Budget Planning  
**Solution:** AI-powered Personal FinTech for household energy budget management

## Core Components (ITU-T Y.3172 Pipeline)

1. **SRC** — Smart meter kWh, weather telemetry, user budget caps
2. **C** — Real-time aggregation (Collector)
3. **PP** — Data cleansing, gap-filling, PDPL anonymization
4. **M** — Time-series ML forecasting
5. **P** — Policy node: budget comparison, graduated alerts (L1: 50%, L2: proactive breach)
6. **D** — Push/email notification delivery
7. **SINK** — React mobile + desktop UI

## Alert Thresholds

| Level | Trigger | Action |
|-------|---------|--------|
| Level 1 | 50% of monthly budget | Budget threshold notification |
| Level 1b | 75% of monthly budget | Stronger warning |
| Level 2 | Forecast exceeds budget OR heatwave spike | Proactive warning |

## Evaluation Scenario

1. Household sets 500 SAR monthly budget
2. Heatwave triggers AC spike; unauthorized access blocked by RLS
3. MLFO switches to summer profile; Level 2 alert dispatched; data anonymized per PDPL

## References

- ITU-T Y.3172, SDAIA AI Ethics, Saudi PDPL
- SEC tariffs, KAPSARC, KBEAT, KAUST-SEC ML project
