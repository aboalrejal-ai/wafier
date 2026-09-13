# الأسئلة السبع — للطاولة

اقرئي كل سؤال بهذا الترتيب: (1) هدف المحكم، (2) الجواب الإنجليزي، (3) الشرح العربي، (4) إذا ضغط أكثر.

## جملة النجاة (احفظيها)

إذا سأل شي ما تعرفينه:

> That part was built by our technical lead. What I can tell you is the idea behind it, and the exact detail is written in our technical report.

---

## 1) Show the core workflow actually running right now — not the slides or the video?

**هدف المحكم:** يبغى يشوف النظام شغال حي، مو عرض باوربوينت.

**قولي:**
> Yes. We can run it live from the demo. Open About. Press the first three scenario buttons. The seven steps light up, and the log below shows what happened.

**بالعربي:** نروح About، نضغط السيناريوهات الثلاثة، المسار يتحرك والسجل يكتب اللي صار.

**إذا ضغط أكثر:**
> The full path is source, collect, clean, forecast, policy, alert, then the user screen. That follows the ITU pipeline Y.3172.

---

## 2) Is any of this on real Saudi data, or is it all synthetic?

**هدف المحكم:** يبغى يعرف وش حقيقي وش تجريبي. الصدق مطلوب.

**قولي:**
> The meter use in the demo is simulated. That is for the hackathon. The Knowledge Base is real. It uses public Saudi sources like Personal Data Protection Law, SDAIA, SERA, and KAPSARC. The SERA tariff rates are real. We apply them to simulated kilowatt-hours.

**بالعربي:** أرقام العداد تجريبية. مصادر السياسات سعودية رسمية حقيقية. أسعار التعرفة من SERA حقيقية ونطبقها على استهلاك محاكاة.

**إذا ضغط أكثر:**
> We do not claim a live smart-meter feed. That missing link is one of our policy gaps.

---

## 3) Show how a human can override the AI?

**هدف المحكم:** يبغى يشوف إن الإنسان يقدر يتدخل، مو كل شي آلي بدون رجوع.

**قولي:**
> Core policy decisions are not made by a chatbot. For human control: open Profile and pause alerts for two hours. That stops budget alerts. It does not unlock ads. The ads block stays on.

**بالعربي:** القرارات المهمة قواعد ثابتة، مو دردشة. من الملف الشخصي نقدر نوقف تنبيهات الميزانية ساعتين. حجب الإعلانات ما ينلغى.

**إذا ضغط أكثر:**
> So the human can pause alerts, but cannot silently turn ads back on from consumption data.

---

## 4) Which specific Saudi policy — by name and clause — governs this decision?

**هدف المحكم:** يبغى اسم النظام ورقم المادة، مو كلام عام عن الخصوصية.

**قولي:**
> Personal Data Protection Law. Purpose limit is Articles 10 to 13. Direct marketing is Article 26, inside Articles 25 to 27. Inside Wafir, our policy rule PDPL-ADS-001 blocks ads from power-use data. Article 26 can allow marketing with consent for non-sensitive data. Wafir chooses a stronger limit: we block that reuse.

**بالعربي:** نعتمد على نظام حماية البيانات الشخصية. تحديد الغرض مواد 10–13. التسويق المباشر مادة 26. داخل التطبيق القاعدة PDPL-ADS-001 تمنع الإعلانات من بيانات الاستهلاك. ما نقول إن المادة 26 تمنع كل إعلان؛ إحنا نطبّق حد أقوى داخل Wafir.

**إذا ضغط أكثر:**
> The exact rule id and source link are in our Knowledge Base and in the technical report.

---

## 5) How does it perform in Arabic, on a paraphrased question?

**هدف المحكم:** يبغى يتأكد إن العربي يشتغل حتى لو غيّر المستخدم صياغة السؤال.

**قولي:**
> Wafir is Arabic from the start, right-to-left. The assistant uses the Knowledge Base, not free guessing. Four demo questions have fixed replies. Other questions look for key words. If the new wording still has words like saving, bill, or electricity, we return an answer with sources. If no source matches, we say evidence is not enough. We do not invent.

**بالعربي:** الواجهة عربية من الأساس. فيه أربعة أسئلة محفوظة. الباقي يبحث بكلمات مفتاحية. إذا بقيت كلمات مثل توفير أو فاتورة أو كهرباء يجاوب مع المصدر. إذا ما لقى دليل يقول الدليل غير كافٍ.

**إذا ضغط أكثر:**
> You can try a different Arabic wording in the assistant now, and we can show the sources under the reply.

---

## 6) Can we reproduce the results from your repo?

**هدف المحكم:** يبغى يتأكد إن النتائج مو فيديو فقط، تقدر تتعاد من الكود.

**قولي:**
> Yes. The repo is public. Run pnpm install, then pnpm demo. That replays the three scenarios. The demo data are marked as simulated.

**بالعربي:** المستودع عام. أمرين: تثبيت ثم تشغيل الديمو. يعيد السيناريوهات الثلاثة. والبيانات مكتوب إنها محاكاة.

**إذا ضغط أكثر:**
> The same three cases are also buttons on the About screen in the live app.

---

## 7) How is consent and data protection handled?

**هدف المحكم:** يتأكد إنكم ما تأخذون بيانات بدون إذن، وما تستخدمونها لغرض ثاني.

**قولي:**
> Before Wafir reads any home data, the user must agree on a consent screen. Then we replace the house id with a code before the forecast path. So the model works on numbers, not on a named person. And we only use the data for the reason the user agreed to. Ads from that data are blocked.

**بالعربي:** شاشة موافقة أولاً. بعدين نحوّل رقم البيت لرمز قبل مسار التوقع. البيانات للغرض المتفق عليه فقط. الإعلانات من هذي البيانات ممنوعة.

**إذا ضغط أكثر:**
> That is our privacy-by-design path: consent first, then coded id, then purpose limit.

---

## تذكير سريع قبل ما تدخلين القاعة

1. لا تقرئين من التقرير كلمة بكلمة.
2. كل جواب: فكرة واحدة + مثال واحد من الشاشة إن قدرتِ.
3. إذا غلطتِ رقم مادة: قولي "I will confirm from the report" واستخدمي جملة النجاة.
4. الاستشهادات و"evidence is not enough" مطلوبة في الشروط — بس قوليها بكلام بسيط زي فوق، مو ككود.
