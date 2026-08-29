# Deep Research Prompts — Wafier (Finance / Energy Track)

Use each prompt independently in Gemini, ChatGPT, and Perplexity. Save outputs to the matching `docs/research/*-deep-research.md` files.

---

## Shared scope (all three tools)

**Project:** Wafier — Arabic RTL FinTech app for proactive household electricity budget management (SEC tariff, PDPL, SDAIA ethics, ITU-T Y.3172 pipeline).

**Do not invent** document titles or URLs. Mark unverifiable items `UNVERIFIED`.

---

## Prompt A — Gemini Deep Research

```text
Perform comprehensive deep research on official Saudi Arabia (KSA) and international policies for FinTech AI applied to household energy budgeting and utility consumption data.

Scope:
1. Saudi national regulations (verify exact titles and working .gov.sa links):
   - Saudi Central Bank (SAMA) Open Banking Framework and related consumer protection / cybersecurity rules
   - Capital Market Authority (CMA) Fintech Lab and crowdfunding rules (if relevant to consumer apps)
   - Saudi Electricity Company (SEC) residential tariff structure and any public smart-meter / AMI policy
   - SDAIA National AI Ethics Principles
   - Saudi Personal Data Protection Law (PDPL) — purpose limitation, consent, anonymization for household consumption data
   - National Energy Efficiency programs (KAPSARC, KBEAT, or official energy efficiency portals)
2. International benchmarks:
   - ITU-T Y.3172 ML pipeline architecture (SRC→C→PP→M→P→D→SINK) — map to energy forecasting use case only
   - ISO/IEC or FATF references relevant to algorithmic transparency in consumer finance (if applicable)
3. Output:
   - Markdown file structure with tables
   - Every record: official title, issuing authority, section reference, summary, direct URL, verification status
   - Policy Gap Matrix: smart-meter API access, prediction liability, sector-specific energy data rules, algorithm auditing, machine-readable regulations, targeted advertising from consumption data
```

---

## Prompt B — ChatGPT Deep Research

```text
Primary-source research for a Saudi FinTech hackathon project (Wafier) that forecasts household electricity bills and enforces PDPL/SDAIA policy guardrails.

Requirements:
1. Find ONLY authentic public sources with working URLs (.gov.sa preferred for Saudi docs).
2. Focus on:
   - PDPL articles on personal data, purpose limitation, and secondary use (e.g. advertising)
   - SDAIA AI ethics: transparency, human oversight, non-deceptive predictions
   - SAMA rules on open banking data sharing and third-party access (even if Wafier is not a bank, note applicability boundaries)
   - SEC / energy regulator public materials on residential tariffs and digital services
3. Flag anything you cannot verify as UNVERIFIED — do not fabricate decree numbers.
4. Output markdown with record IDs (e.g. PDPL-ART-5), verification status, and Y.3172 node mapping (SRC, PP, M, P, KB).
5. Include 5–6 policy gaps with gap type: violation | ambiguity | conflict | potential_gap | insufficient_evidence
```

---

## Prompt C — Perplexity Deep Research

```text
Research Saudi Arabia policies for AI-powered household energy budget apps (Finance track, ITU AI Readiness Hackathon).

Deliver:
1. Liability and consumer protection: who is responsible when an AI bill forecast is wrong? Cite SAMA consumer protection or general PDPL remedies where available.
2. Smart meter / AMI data: any public SEC or regulatory statements on third-party access to consumption telemetry.
3. Cross-border data: PDPL transfer rules if cloud processing outside KSA.
4. Advertising / profiling: PDPL and SDAIA on using utility consumption for targeted ads.
5. Working URLs only; table format; mark HISTORICAL if superseded.
6. Short Policy Gap Matrix aligned to Wafier's six gaps (GAP-01..06).
```

---

## Merge instructions (after three passes)

1. De-duplicate by URL and official title.
2. Human-verify each URL (10-step checklist in ITU KSA Guide §11).
3. Compile into `kb/records/finance-energy-regulatory.json`.
4. Export flat `knowledge-base.json` for submission.
