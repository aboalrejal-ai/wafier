# ChatGPT Deep Research — Prompt لـ Wafir

## وش تسوي أنت

1. انسخ الـ prompt اللي تحت.
2. افتح **ChatGPT** → **Deep Research** (أو o3 / research mode إن متوفر).
3. الصق وشغّل وانتظر.
4. **احذف كل شي تحت خط «نتيجة البحث»** في هذا الملف.
5. **الصق النتيجة كاملة** تحت الخط.
6. احفظ وقل لي: «حدّثت chatgpt-deep-research — اقرأه وحدّث KB».

---

## PROMPT — انسخ من هنا

```text
You are conducting primary-source legal and regulatory research for an ITU AI Readiness Hackathon submission in Saudi Arabia.

PROJECT: Wafir — FinTech app for proactive household electricity budget management (Finance track). Forecasts SAR spend from kWh + weather; PDPL consent; deterministic policy node; RAG assistant with mandatory citations; ITU-T Y.3172 pipeline.

TASK: Deep Research — find ONLY authentic, publicly accessible Saudi and international policy sources. Cross-check titles against actual documents. Do not fabricate URLs or article numbers.

RESEARCH QUESTIONS (answer each with cited sources):

1. PDPL: What provisions govern (a) explicit consent for processing household electricity consumption data, (b) purpose limitation and ban on secondary use for targeted advertising, (c) anonymization/pseudonymization before analytics export, (d) data subject rights and remedies?

2. SDAIA AI Ethics: transparency, explainability, human oversight, and prohibition of deceptive financial-like guarantees from AI predictions.

3. SAMA: Open Banking Framework — scope and whether it applies to utility/consumption data vs bank account data. Consumer protection rules useful for forecast disclaimers.

4. CMA Fintech Lab — relevance boundary for a consumer budgeting app (not securities trading).

5. SEC / Saudi energy sector: residential tariff tiers (verify current public sources); any official statement on smart meter data sharing with third-party apps.

6. Energy efficiency: KAPSARC, KBEAT, or official Saudi guidance on household cooling/AC savings (for RAG advice grounding).

7. ITU-T Y.3172: summarize pipeline nodes and how a FinTech energy-budget app maps each node (reference only — not Saudi law).

8. Liability gap: Is there explicit Saudi law on liability when an AI bill forecast is wrong? If not, state as policy gap with evidence of absence.

OUTPUT (Markdown):

## Verified Records
Table columns: record_id | document_title | authority | section | summary | url | verification | y3172_node

Minimum 15 VERIFIED records with working URLs.

## Policy Gap Matrix
Minimum 6 gaps (regulatory/policy landscape gaps, not app bugs):
Types: violation | ambiguity | conflict | potential_gap | insufficient_evidence

## Conflicts & Ambiguities
Where sources disagree or text is unclear.

## UNVERIFIED / Rejected Sources
List sources you found but could NOT verify — never use these in enforcement logic.

## Duplicate check notes
Flag if Gemini/Perplexity might find the same docs — note unique finds from this pass.

STRICT: If a MoH/SEC/SAMA PDF exists but text is not retrievable, mark UNVERIFIED. No guesswork on tariff numbers without a cited primary source.
```

---

## نتيجة البحث (الصق هنا بعد ما يخلص ChatGPT)

<!-- احذف هذا التعليق والصق البحث الكامل من ChatGPT تحت هذا السطر -->
