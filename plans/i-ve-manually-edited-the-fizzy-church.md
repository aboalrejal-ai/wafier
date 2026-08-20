# خطة: تحويل المساعد الذكي إلى شاشة كاملة بنمط ChatGPT

## Context

المساعد الذكي (AIAssistantPanel) حالياً يعمل كـ bottom sheet بارتفاع 88vh يظهر فوق شاشة الملف الشخصي. الطلب هو تحويله إلى شاشة مستقلة كاملة تحاكي تجربة ChatGPT، مع:

- شريط إدخال احترافي: `+` (مرجع) | نص | `High ∨` (مستوى الجهد) | 🎤 (صوت) | 〰️ (محادثة صوتية)
- واجهة محادثة كاملة مع bubbles منظمة
- الخيارات فوق تطوير للموجود، لا إضافة ميزات جديدة

---

## التغييرات المطلوبة

### 1. `src/App.tsx`
- أضف `"ai"` إلى نوع `Screen`: `"login" | "dashboard" | "forecast" | "profile" | "ai"`
- أضف `prevScreen` state من نوع Screen (افتراضي: `"profile"`)
- في دالة `navigate`: قبل الانتقال لـ `"ai"` احفظ الشاشة الحالية في `prevScreen`
- أضف تشغيل `AIAssistantScreen` (mobile) و`DesktopAIAssistant` (desktop) للشاشة الجديدة
- مرر `onBack={() => setScreen(prevScreen)}` للشاشة الجديدة

### 2. `src/components/AIAssistantScreen.tsx` — جديد (يحل محل AIAssistantPanel)
**هذا الملف يستورد ويُعيد استخدام نفس منطق:**
- `messages`, `input`, `isTyping`, `send()`, `suggestions`, `aiReplies` من AIAssistantPanel الحالي

**Layout (mobile، كامل الشاشة):**
```
┌─────────────────────────────────┐
│  ← [back]   Wafier AI   [logo] │  ← header (bg: white, border-bottom)
├─────────────────────────────────┤
│                                 │
│  [avatar] مرحباً! أنا مساعد...  │  ← AI bubble (right, green gradient)
│                                 │
│          أسئلة مقترحة (grid)    │  ← suggestion cards (2×2) تظهر فقط في البداية
│                                 │
│  كيف أوفر...  [user bubble]     │  ← user bubble (left, gray-100)
│                                 │
│  [avatar] يمكنك تقليل...        │  ← AI bubble
│                                 │
│     ⋯⋯⋯ [typing dots]          │
│                                 │
├─────────────────────────────────┤
│  [input bar - ChatGPT style]    │  ← ثابت في الأسفل
└─────────────────────────────────┘
```

**شريط الإدخال (يطابق صورة المرجع بالضبط):**
```
┌──────────────────────────────────────────────────────┐
│  +  │  اسأل Wafier AI...          │ High ∨ │ 🎤 │ 〰️ │
└──────────────────────────────────────────────────────┘
```
- الحاوية: `background: hsl(var(--color-gray-950))` أو `hsl(var(--color-gray-100))` (حسب light mode) — pill مستدير
- **زر `+`**: يفتح `ReferenceSheet` (bottom sheet صغير — انظر أدناه)
- **Input**: `background: transparent`، `placeholder: "اسأل Wafier AI..."`، يتمدد ويتقلص مع النص (textarea بدل input)
- **`High ∨`**: زر يفتح `EffortDropdown` (popup صغير بـ 3 خيارات)
- **🎤**: مجرد أيقونة، عند الضغط تتحول الأيقونة للأحمر (listening state) ثم ترجع
- **〰️**: عند الضغط يظهر Toast "المحادثة الصوتية قريباً"

**مكونات فرعية داخل الملف:**

**`ReferenceSheet`** (bottom sheet، state داخلي):
```
📷 التقاط صورة الفاتورة
🖼️ اختيار من المكتبة
📄 رفع ملف PDF
```
كل خيار: عند الضغط → Toast "هذه الميزة قريباً"

**`EffortDropdown`** (popup صغير فوق الزر):
```
⚡ سريع    — ردود فورية
⚖️ متوسط  — توازن بين السرعة والجودة
🔬 عالي ✓  — إجابات معمّقة ودقيقة (الافتراضي)
```
State: `effort: "fast" | "balanced" | "high"` (افتراضي: `"high"`)
الزر يعرض القيمة المختارة: `سريع ∨` / `متوسط ∨` / `عالي ∨`

**Message bubbles:**
- AI: يمين الشاشة، avatar دائري صغير (أيقونة Wafier)، خلفية `white` + border خفيف، نص `gray-900`
- User: يسار الشاشة، خلفية `gray-100`، لا avatar

### 3. `src/components/desktop/DesktopAIAssistant.tsx` — جديد
- نفس Sidebar على اليسار (current="ai" أو لا يوجد active)
- المنطقة الرئيسية: عمود chat بعرض max 720px في المنتصف
- نفس شريط الإدخال لكن أعرض
- Header مدمج في المنطقة الرئيسية (بدون back button)

### 4. `src/components/desktop/Sidebar.tsx`
- أضف `"ai"` إلى نوع `Screen`
- زر "المساعد الاستشاري AI" الموجود أسفل الـ nav → `onNavigate("ai")`

### 5. `src/components/ProfileScreen.tsx`
- احذف `import AIAssistantPanel`
- احذف `const [showAI, setShowAI] = useState(false)`
- غيّر نوع `onNavigate` ليقبل `"ai"`
- زر AI header (line 71): `onClick={() => onNavigate("ai")}`
- زر "المساعد الاستشاري" (line 141): `onClick={() => onNavigate("ai")}`
- احذف `{showAI && <AIAssistantPanel ... />}` من آخر الملف

### 6. `src/components/desktop/DesktopProfile.tsx`
- زر "🤖 مساعد AI": `onClick={() => onNavigate("ai")}`
- أضف `"ai"` لنوع `Screen`

### 7. `src/components/panels/AIAssistantPanel.tsx`
- احذف الملف (منطقه انتقل لـ AIAssistantScreen)

---

## ملاحظات التنفيذ

- **اتجاه النص**: الواجهة RTL، لكن اسم "Wafier AI" و"High" يبقى بالإنجليزية
- **الألوان**: شريط الإدخال يستخدم `hsl(var(--color-gray-950))` كخلفية + نص أبيض (مثل الصورة المرجعية)، أو نسخة فاتحة `hsl(var(--color-gray-100))` — يُفضَّل الداكن ليطابق الصورة
- **لا يُحذف** BottomNav في mobile AIAssistantScreen (الشاشة لا تحتاجه — full chat)
- **Typing indicator**: نفس animation البounce الموجودة

---

## التحقق

1. من شاشة Profile → ضغط أي من زرين AI → تنفتح شاشة AI مستقلة
2. من Sidebar (desktop) → ضغط زر المساعد → تنفتح شاشة AI
3. شريط الإدخال: كل عنصر (+ / effort / mic / voice) يستجيب للضغط
4. `+` يفتح ReferenceSheet بالخيارات الثلاثة
5. `High ∨` يفتح dropdown، الاختيار يغير النص في الزر
6. 🎤 يغير لونه للأحمر عند الضغط ثم يرجع
7. 〰️ يعرض Toast "المحادثة الصوتية قريباً"
8. إرسال رسائل عادية يعمل كما كان (نفس منطق aiReplies)
9. زر الرجوع ← يعود للشاشة السابقة (profile/dashboard)
10. Desktop: نفس التجربة مع Sidebar ظاهر
