# Gemini Deep Research — Prompt لـ Wafir

## وش تسوي أنت

1. انسخ الـ prompt اللي تحت (من أول سطر لآخر سطر داخل الصندوق).
2. افتح **Gemini** → **Deep Research** (أو Google AI Studio Deep Research).
3. الصق الـ prompt وشغّل البحث وانتظر لين يخلص.
4. **احذف كل شي تحت خط «نتيجة البحث»** في هذا الملف.
5. **الصق نتيجة البحث كاملة** تحت الخط.
6. احفظ الملف وقل لي: «حدّثت gemini-deep-research — اقرأه وحدّث KB».

---

## PROMPT — انسخ من هنا

```text
Perform a comprehensive Deep Research on official Saudi Arabia (KSA) and international policies, regulations, and guidelines for a FinTech + household energy budgeting AI application.

PROJECT CONTEXT (do not skip):
- Solution name: Wafir
- Hackathon: ITU AI Readiness Hackathon — Kingdom of Saudi Arabia
- Track: Finance (FinTech)
- Use case: Arabic RTL app that forecasts household electricity bill spend in SAR from meter-like kWh data, compares to a monthly budget, raises graduated alerts, and answers user questions with citations from a verified knowledge base.
- Architecture: ITU-T Y.3172 ML pipeline (SRC → Collector → Preprocessor → Model/MLFO → Policy → Distributor → SINK). Policy node must be deterministic (not LLM-based decisions).
- Data: synthetic/demo meter data for hackathon; regulations must be REAL and publicly verifiable.

SCOPE — extract authentic public sources only:

1) Saudi national regulations (verify exact titles, issuing authority, section/article, decree reference if available, and working direct URLs — prefer .gov.sa):
   - Saudi Central Bank (SAMA): Open Banking Framework; consumer protection; cybersecurity / technology risk rules relevant to FinTech apps that may later link bank accounts. Do NOT invent a document titled "Financial AI Rules" — verify exact official names.
   - Capital Market Authority (CMA): Fintech Lab / sandbox rules if relevant to consumer FinTech positioning.
   - Saudi Electricity Company (SEC) or energy regulator: residential electricity tariff structure; any public policy on smart meters / AMI / third-party access to consumption data.
   - SDAIA: National AI Ethics Principles; any published AI governance guidance.
   - Saudi Personal Data Protection Law (PDPL): consent; purpose limitation; anonymization; secondary use (e.g. advertising from consumption data); cross-border transfers.
   - National energy efficiency: KAPSARC, KBEAT, MEWA, or official Saudi energy efficiency programs.

2) International benchmarks (clearly label as benchmark, not Saudi law):
   - ITU-T Recommendation Y.3172 — map each pipeline node to Wafir's energy-budget use case only. Do NOT claim Y.3172 is a finance-specific regulation.
   - FATF or ISO references only if directly relevant to algorithmic transparency, fraud, or data governance for consumer finance apps.

OUTPUT FORMAT (Markdown):

A) Executive summary (½ page) — what Wafir must comply with in KSA.

B) Regulatory records table — minimum 15 rows, each with:
   - record_id (e.g. PDPL-ART-5, SAMA-OB-001)
   - document_title (exact official title)
   - issuing_authority
   - section_reference (article / chapter / page if found)
   - content (300–600 words faithful summary of the cited provision — no hallucination)
   - source_url (direct working link — not homepage only if possible)
   - verification_status: VERIFIED | UNVERIFIED | HISTORICAL
   - y3172_node: SRC | C | PP | M | P | D | SINK | KB | ALL
   - relevance_to_wafier (1–2 sentences)

C) Policy Gap Matrix — minimum 6 gaps discovered in Saudi/international policy landscape (NOT software bugs), each with:
   - gap_id (GAP-01 … GAP-06)
   - gap_type: violation | ambiguity | conflict | potential_gap | insufficient_evidence
   - title
   - description
   - recommendation_for_policymakers
   - related_record_ids

D) UNVERIFIED list — anything you could not confirm from primary sources.

E) Suggested RAG chunks — 25–40 chunks (300–800 words each) derived ONLY from VERIFIED records.

RULES:
- Every URL must be real. If you cannot verify, mark UNVERIFIED and do not present as enforceable law.
- No confidential data, no fabricated decree numbers.
- Prefer primary .gov.sa sources over blogs and law-firm summaries.
- Output in English for records; Arabic summaries optional for key PDPL/SDAIA provisions.
```

---

## نتيجة البحث (الصق هنا بعد ما يخلص Gemini)

<!-- احذف هذا التعليق والصق البحث الكامل من Gemini تحت هذا السطر -->
