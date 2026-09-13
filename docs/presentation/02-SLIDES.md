# نص الشرائح الأربع — 10 دقائق

العرض بالإنجليزي. تحت كل شريحة: النص المنطوق البسيط + توزيع المتكلمة.

الرسم الجاهز للشريحة 1: `docs/submission/y3172-pipeline.png`

---

## توزيع الوقت (مجموع 10 دقائق)

| الوقت | الشريحة | المتكلمة | لماذا هي |
|------|---------|----------|----------|
| 0:00–2:30 | 1 — Solution + Y.3172 | Jorry Alfalah | UI / visual story |
| 2:30–5:00 | 2 — Knowledge Base + Readiness | Fatima Alsultan | research + policy mapping |
| 5:00–7:30 | 3 — Evaluation scenarios | Shahad Alsultan | video / demo narrative |
| 7:30–10:00 | 4 — Gaps + innovations | Noor Alshammari | closes with impact |

لو المحكمين يسألون أثناء العرض: جاوبن بجمل قصيرة من `01-QUESTIONS.md`، ولا تطوّلن الشرائح.

---

## Slide 1 — Solution + Y.3172 (with figure)

**على الشاشة:**
- عنوان: Wafir — household energy budget forecast
- جملة واحدة: Arabic FinTech app that warns before the bill arrives
- الصورة: `y3172-pipeline.png`
- تحت الصورة الأسماء البشرية للسبع خطوات

**تقول Jorry:**
> Wafir helps Saudi homes see the power bill early, not after it arrives.
> We follow the ITU pipeline Y.3172.
> Data comes in, we clean it, we forecast the bill, then a policy step checks what is allowed, then the user sees an alert.
> Meter numbers in the demo are simulated. Our policy sources are real Saudi public documents.

**لا تقولي:** أسماء ملفات، ولا كود، ولا MLFO إلا إذا سألوا.

---

## Slide 2 — Knowledge Base + policies + ITU AI Readiness (one table)

**على الشاشة — جدول واحد فقط (أهم 4 صفوف):**

| What Wafir does | Saudi / ITU source | Readiness link |
|-----------------|--------------------|----------------|
| Consent before processing | Personal Data Protection Law (SDAIA) | D10 — AI and Policies |
| Block ads from power-use data | PDPL purpose limit + our rule PDPL-ADS-001 | D10 — AI and Policies |
| Arabic UI + answers with sources | SDAIA AI Ethics + SERA / KAPSARC texts | D6 — Human Interface |
| Align use-case to national AI direction | NSDAI (Vision 2030) — we do not claim we implement NSDAI | D7 — Strategy Alignment |

**تقول Fatima:**
> Our Knowledge Base holds verified Saudi official texts, not random web pages.
> Each important answer shows the source and the link.
> On the ITU AI Readiness map, the strongest links for us are policies, human interface, and strategy alignment.
> We only show the most important mappings here.

**لو سألت عن عدد المصادر:** "We curated verified records in knowledge-base.json. Details are in the report."

---

## Slide 3 — Evaluation scenarios (step by step)

**على الشاشة — ثلاثة صناديق قصيرة:**

### SC-01 — Normal case
1. User asks how to save on the electricity bill.
2. Wafir searches the Knowledge Base.
3. Reply comes with official sources.
**Result:** Compliant answer with citations.

### SC-02 — Missing meter day
1. One daily reading is missing.
2. The clean step fills the gap.
3. Forecast continues. No crash.
**Result:** Pipeline keeps working.

### SC-03 — Ads request
1. A fake ads request tries to use power-use data.
2. Policy step checks the rule.
3. System blocks the use.
**Result:** Violation blocked. Ads stay off.

**تقول Shahad:**
> We test three cases.
> First, a normal question with sources.
> Second, missing meter data — the system fills the gap and continues.
> Third, an ads request — the policy step blocks it.
> You can also press these three buttons live on the About screen.

**بعد الكلام:** لو الوقت يسمح، افتحي About واضغطي SC-01 ثم SC-02 ثم SC-03 بسرعة (كل واحد ~10 ثوانٍ).

---

## Slide 4 — Standards gaps, policy gaps, innovations (most impactful only)

**على الشاشة — أربعة أسطر فقط:**

**Policy gaps (2):**
1. **GAP-01** — No consumer-authorized live meter API like Open Banking for energy. So our demo uses simulated meter data.
2. **GAP-06** — Unclear if power-use data may later be reused for ads. Wafir blocks silent reuse today.

**Innovations (2):**
1. Full seven-step ITU path with a live audit log judges can press.
2. Fixed policy rule that blocks ads from consumption data, with a verified Saudi source trail.

**تقول Noor:**
> Two gaps matter most.
> First, there is no consumer-approved live meter link for apps like ours, so we simulate the meter.
> Second, reuse of power-use data for ads is unclear, so Wafir blocks that reuse.
> Our two strongest innovations are the live seven-step path with a log, and the fixed ads block with official sources.
> Thank you. We can take questions.

---

## ترتيب الدخول والخروج

1. Jorry تفتح: اسم الفريق + جملة المشكلة + الرسم.
2. Fatima: الجدول.
3. Shahad: السيناريوهات (+ ديمو حي إن أمكن).
4. Noor: الفجوات والابتكارات + شكر.
5. الكل يوقفون للأسئلة ومعهم ورقة `04-CHEATSHEET.md`.
