# Gap Matrix — Prototype vs Specification

| # | Spec Requirement | Prototype (Before) | Status |
|---|------------------|-------------------|--------|
| 1 | Level 1 at 50% budget | Showed 69% | Fixed — 50%/75%/L2 thresholds |
| 2 | RAG on Saudi energy regulations | Static replies | Fixed — RAG service + citations |
| 3 | Smart Financial Engine kWh→SAR | Hardcoded SAR | Fixed — financial-engine module |
| 4 | MLFO summer/winter switch | Missing | Fixed — ml-predictor + MLFO |
| 5 | ML Sandbox | Missing | Fixed — sandbox flag in schema |
| 6 | 7-Node Pipeline | UI only | Fixed — backend services + docs |
| 7 | Unauthorized access blocked | Missing | Fixed — RLS + Auth |
| 8 | PDPL consent | Text only | Fixed — ConsentScreen + Privacy |
| 9 | Human-in-the-loop override | Missing | Fixed — alert settings |
| 10 | About/Contact page | Missing | Fixed — AboutScreen |
| 11 | Desktop login modals | Unwired | Fixed |
| 12 | Desktop notifications | Missing | Fixed |
| 13 | Desktop set budget | Unwired | Fixed |
| 14 | Desktop edit profile | Unwired | Fixed |
| 15 | Sidebar logout | Missing | Fixed |
| 16 | Budget propagates globally | Local only | Fixed — Zustand + DB |
| 17 | Period picker filters chart | UI only | Fixed |
| 18 | Dead "عرض الكل" buttons | No handler | Fixed — navigate to forecast |
| 19 | Orphan AIAssistantPanel | Unused | Removed |
| 20 | DESIGN.md Tailwind tokens | Inline styles | Partial — tokens in index.css |
