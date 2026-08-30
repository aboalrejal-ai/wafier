# Wafir Hackathon Scenarios

Three mandatory evaluation scenarios for ITU AI Readiness Hackathon.

| ID | File | Type | Trigger |
|----|------|------|---------|
| SC-01 | `sc-01-compliant-rag.json` | Normal / Compliant | RAG query with citations |
| SC-02 | `sc-02-pp-gap-fill.json` | Operational failure | Missing kWh day → PP gap-fill |
| SC-03 | `sc-03-ads-controversy.json` | Controversial | Targeted ads request → BLOCK |

## CLI (reproducible)

```bash
pnpm demo          # all three
pnpm demo 1        # SC-01 only
pnpm demo 2        # SC-02 only
pnpm demo 3        # SC-03 only
```

## UI triggers

- **About** page → Hackathon Console buttons for each scenario
- **Heatwave** (legacy combined) still available as bonus demo

## Data

All scenarios use **synthetic** household data (`synthetic: true` in JSON).
