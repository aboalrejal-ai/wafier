# Perplexity Deep Research — Prompt لـ Wafier

## وش تسوي أنت

1. انسخ الـ prompt اللي تحت.
2. افتح **Perplexity** → **Research** (وضع البحث العميق / Pro Research إن متوفر).
3. الصق وشغّل وانتظر.
4. **احذف كل شي تحت خط «نتيجة البحث»** في هذا الملف.
5. **الصق النتيجة كاملة** تحت الخط.
6. احفظ وقل لي: «حدّثت perplexity-deep-research — اقرأه وحدّث KB».

---

## PROMPT — انسخ من هنا

```text
Deep Research request — ITU AI Readiness Hackathon KSA, Finance track.

Application: Wafier — household electricity budget FinTech. Converts kWh to SAR (SEC-style residential tariff), forecasts end-of-month spend, policy alerts at 50%/75%/forecast-over-budget, RAG Q&A with government citations, PDPL consent, synthetic demo data.

Find authoritative Saudi (.gov.sa preferred) and international sources. Provide working URLs and exact document names. Mark unverifiable items UNVERIFIED.

Focus areas for this pass (third independent review):

1. CONSUMER PROTECTION & LIABILITY
   - SAMA consumer protection rules applicable to FinTech disclosures
   - PDPL remedies when automated predictions affect consumer decisions
   - Whether "bill shock prevention" apps need specific licensing in KSA

2. SMART METER / AMI / UTILITY DATA ACCESS
   - SEC or regulator public documents on smart meter data, third-party API, or privacy of consumption telemetry
   - Gap analysis if no open API exists for household apps

3. CROSS-BORDER & CLOUD
   - PDPL rules on transferring household consumption data outside KSA (Supabase/cloud hosting angle)

4. ADVERTISING & PROFILING
   - PDPL + SDAIA on using utility consumption patterns for targeted advertising
   - Controversial scenario: partner requests ad targeting from consumption data — which provisions apply?

5. OPEN BANKING BOUNDARY
   - SAMA Open Banking: what data categories are in scope; confirm utility meters are out of scope unless integrated

6. INTERNATIONAL BENCHMARKS
   - ITU-T Y.3172 (architecture reference for hackathon scoring)
   - ISO/IEC 27001 or FATF only if directly cited for FinTech data governance

DELIVERABLES (Markdown):

### A. Source table (min 12 rows)
| record_id | title | authority | section | excerpt/summary | url | status |

### B. Policy Gap Matrix (min 6 rows)
| gap_id | type | title | description | recommendation | related_records |

### C. Perplexity unique findings
What this search found that might be missed by generic ChatGPT/Gemini passes (specific PDFs, Arabic pages, recent 2024–2026 circulars).

### D. URL verification checklist
For top 10 URLs: does link open? direct PDF or landing page? .gov.sa?

Rules: No fabricated Royal Decree numbers. Prefer primary sources. English output. Flag HISTORICAL if superseded.
```

---

## نتيجة البحث (الصق هنا بعد ما يخلص Perplexity)

<!-- احذف هذا التعليق والصق البحث الكامل من Perplexity تحت هذا السطر -->
