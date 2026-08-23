# Wafier Knowledge Base (authentic public sources)

Policies/strategies/papers used for RAG citations and report mapping.  
**Rule:** use-case telemetry may be simulated; KB documents must be real.

| # | Source | Why it matters for Wafier | URL |
|---|--------|---------------------------|-----|
| 1 | KAPSARC — AI & data center energy efficiency (PDF) | Energy/AI efficiency context for recommendations | https://www.kapsarc.org/media/ip0dt4i1/dp00503-v1.pdf |
| 2 | KAUST & SEC — ML for power loss reduction | SEC/utility ML legitimacy; tariff/network context | https://www.kaust.edu.sa/news/kaust-helps-slash-sec-profit-losses-using-ml |
| 3 | KBEAT — Building energy analysis (KAPSARC) | Household saving advice grounding | https://apps.kapsarc.org/appboard/kbeat/en |
| 4 | MDPI Energies — ML for energy consumption forecasting in KSA | Forecasting literature (Saudi context) | https://www.mdpi.com/1996-1073/16/4/2035 |
| 5 | Google DeepMind — data-centre cooling energy | Analogous cooling optimization narrative | https://deepmind.google/discover/blog/deepmind-ai-reduces-google-data-centre-cooling-energy-by-40/ |
| 6 | SDAIA — National AI Ethics / SDAIA portal | Transparency, human oversight, non-deceptive AI | https://sdaia.gov.sa/ |
| 7 | Saudi PDPL (Personal Data Protection Law) | Consent, purpose limitation, anonymization | https://sdaia.gov.sa/ar/SDAIA/about/Pages/AboutPDPL.aspx |
| 8 | ITU-T Y.3172 | ML pipeline, MLFO, sandbox architecture | https://www.itu.int/rec/T-REC-Y.3172-201906-I |

## In-app RAG

Chunks + URLs live in [`src/lib/rag-chat.ts`](../src/lib/rag-chat.ts) and are returned as citations in mobile/desktop assistants.
