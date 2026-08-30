# ITU Framework Source — Wafir ↔ ITUAIReadiness

**Upstream (official training repo):** [https://github.com/CrashingGuru/ITUAIReadiness](https://github.com/CrashingGuru/ITUAIReadiness)

Wafir is a **Finance/Energy use-case submission** for the ITU AI Readiness Hackathon — KSA.  
ITUAIReadiness is the **ITU AI Readiness Framework 2.0 training/simulation** codebase (13 dimensions, KB manifest, Y.3172 reference).  
We align Wafir evidence to that framework; we do **not** ship the Python simulation game.

---

## What ITUAIReadiness defines (verbatim scope)

| ITU requirement | ITU path | Wafir path |
|-----------------|----------|-------------|
| Framework 2.0 — 6 factors, 13 dimensions, 100+ metrics | `simulation/data/framework/dimensions.json` | [`kb/framework/dimensions.json`](../kb/framework/dimensions.json) (copy) |
| KB manifest (policy papers + reference links) | `simulation/server/knowledge/InputDocs/Inputs.md` | [`kb/InputDocs/Inputs.md`](../kb/InputDocs/Inputs.md) |
| Y.3172 summary + D5/D10/D13 mapping | `simulation/server/knowledge/InputDocs/AI_Use_Cases/ITU-T_Y.3172_summary.txt` | [`kb/InputDocs/ITU_References/ITU-T_Y.3172_summary.txt`](../kb/InputDocs/ITU_References/ITU-T_Y.3172_summary.txt) |
| Saudi national strategy (NSDAI) | `Inputs.md` L32 — `Saudi_Arabia_NSDAI.pdf` | KB record `NSDAI-001` in [`knowledge-base.json`](../knowledge-base.json) |
| Primary framework document | `Inputs.md` L18 — `AI_Ready_Framework_2025.pdf` | Cited in technical report; full PDF in ITU repo InputDocs |
| KB metadata model | `simulation/server/knowledge/ingest.py` | Wafir JSON schema in [`kb/records/finance-energy-regulatory.json`](../kb/records/finance-energy-regulatory.json) |
| Simulation game (6 agents, 13-dim scoring) | `simulation/README.md` | **Not implemented** — optional training reference only |

---

## What Wafir adds (hackathon deliverables — not in ITUAIReadiness)

These items are documented in Wafir internal checklists (`docs/SUBMISSION-CHECKLIST.md`, `docs/HACKATHON-READINESS.md`).  
They are **not** present in any `.md` file inside ITUAIReadiness.

| Deliverable | Wafir path |
|-------------|------------|
| Technical report (≤5 pages) | [`docs/TECHNICAL-REPORT.md`](./TECHNICAL-REPORT.md), [`submission/TECHNICAL-REPORT.md`](../submission/TECHNICAL-REPORT.md) |
| Demo video (≤7 min + subtitles) | [`docs/DEMO-VIDEO-SCRIPT.md`](./DEMO-VIDEO-SCRIPT.md) — team records |
| Three evaluation scenarios | [`scenarios/`](../scenarios/) + `pnpm demo` |
| FinTech app + Y.3172 pipeline | `src/services/demo-service.ts`, `src/lib/*` |
| Verified Saudi regulatory KB | [`knowledge-base.json`](../knowledge-base.json) |

---

## Dimension evidence mapping (official ITU names)

Official names: [`kb/framework/dimensions.json`](../kb/framework/dimensions.json)  
Wafir code evidence: [`kb/framework/wafir-readiness.json`](../kb/framework/wafir-readiness.json)  
UI: `/hackathon/readiness`

| ID | Official ITU dimension | Wafir evidence |
|----|------------------------|----------------|
| D1 | Data/Model Marketplace | PDPL personal-data standards (d1_m10) — consent, pseudonymization |
| D5 | Level of Integration of AI in Workflows | Y.3172 pipeline audit, budget alerts, `pnpm demo` |
| D6 | Human Interface | Arabic RTL UI, AI assistant chat |
| D8 | Collaboration with AI | HITL alert snooze, human-in-the-loop RAG |
| D10 | AI & Policies | Deterministic policy node, GAP-01..06, SC-03 |
| D11 | AI for Inclusion | Arabic-first interface, RTL accessibility patterns |
| D13 | Digital Infrastructure | Vite SPA, Hostinger, optional Supabase/Capacitor |

**PDPL / data governance** maps to **D1** (Personal Data Standards) and **D10** (Horizontal Policies, Data Sovereignty) — **not** D8 (Collaboration with AI).

---

## Y.3172 ↔ ITU dimensions (from ITU repo summary)

Source: `ITU-T_Y.3172_summary.txt` L26–30 in ITUAIReadiness.

| Y.3172 relevance | ITU dimension |
|------------------|---------------|
| AI integration pipeline | D5 — AI Integration in Workflows |
| Policy evaluation in AI lifecycle | D10 — AI & Policies |
| Y.3172 nodes as AI-enabled devices/sensors | D13 — Digital Infrastructure |

Wafir implements extended nodes (Policy, Distributor, MLFO) as documented in [`docs/TECHNICAL-REPORT.md`](./TECHNICAL-REPORT.md) §3.

---

## Local clone (for judges / team)

```bash
# Wafir submission
git clone <your-wafir-repo-url>
cd wafir && pnpm install && pnpm demo

# Official ITU framework reference
git clone https://github.com/CrashingGuru/ITUAIReadiness
diff ITUAIReadiness/simulation/data/framework/dimensions.json wafir/kb/framework/dimensions.json
```
