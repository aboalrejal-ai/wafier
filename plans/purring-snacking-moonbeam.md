# خطة اكتمال النظام — تطبيق Wafier (المرحلة الثالثة)

---

## ✅ المرحلة السابقة (مكتملة)
نسخة الموبايل بالأربع شاشات جاهزة ومكتملة.

---

# المرحلة الجديدة: Desktop Layout

## Context
المستخدم يريد بناء تطبيق موبايل عربي كامل اسمه **Wafier** لإدارة الطاقة والحلول المالية الذكية.
التصميم مرجعي من 5 صور حقيقية. الـ Design System محدد بدقة في `src/imports/DESIGN.md` — هذا هو المرجع الوحيد للألوان والخطوط والمكونات.

---

## Design System (من DESIGN.md — مرجع إلزامي)

### الألوان — النظام السعودي الوطني (DGA)
```css
/* Primary Brand — Saudi Green */
--primary: hsl(152.9 65.8% 31%);     /* SA-600: #1B8354 */
--primary-hover: hsl(153.6 65.6% 25.1%); /* SA-700: #166A45 */
--primary-light: hsl(140 75% 92.2%); /* SA-100: #DFF6E7 */
--primary-bg: hsl(140 60% 98%);      /* SA-25: #F7FDF9 */

/* Backgrounds */
--background: hsl(240 20% 99%);      /* Gray-25: #FCFCFD */
--card: #FFFFFF;
--border: hsl(220 13% 91%);          /* Gray-200: #E5E7EB */

/* Text */
--foreground: hsl(220 36.6% 8%);     /* Gray-950: #0D121C */
--muted-foreground: hsl(217.9 8.1% 46.1%); /* Gray-500: #6C737F */

/* Gradient الكارد الداكن في الداشبورد */
/* 45deg: SA-700 (#166A45) → SA-600 (#1B8354) */
```

### الخطوط (Google Fonts)
- **عربي:** `IBM Plex Sans Arabic` — الخط الأساسي
- **إنجليزي/أرقام:** `Work Sans`
- **كود:** `Inconsolata` (نادر)

### RTL — قواعد إلزامية
- استخدام logical classes فقط: `ms-*`, `me-*`, `ps-*`, `pe-*`, `start-*`, `end-*`
- ممنوع: `ml-*`, `mr-*`, `pl-*`, `pr-*`, `left-*`, `right-*`
- الأرقام والإيميلات داخل `<span dir="ltr">`
- في RTL: زر الرجوع يستخدم `ArrowRight` مش `ArrowLeft`

### الـ Tokens — قواعد إلزامية
- ممنوع: raw HEX مباشر أو `text-green-500` وما شابه
- مطلوب: CSS custom properties عبر `hsl(var(--variable))`
- استثناء وحيد: أزرار OAuth (Apple/Google/هاتف) في صفحة Login

---

## الشاشات الأربع

### 1. LoginScreen
- شعار Wafier + رسم توضيحي (طاحونة + ألواح شمسية) بلون SA-25 كخلفية
- بطاقة بيضاء: "مرحباً بك!" + حقل بريد + حقل كلمة مرور (toggle إظهار/إخفاء)
- تذكرني + نسيت كلمة المرور؟
- زر "تسجيل الدخول" بـ Gradient SA-700→SA-600
- أو تسجيل بـ Apple / Google / هاتف (raw colors مسموح — استثناء)
- "ليس لديك حساب؟ إنشاء حساب جديد"
- Footer: "بياناتك آمنة 100%" + أيقونة درع

### 2. DashboardScreen (الميزانية الشهرية)
- Header: "صباح الخير، جوري ☀️" + أيقونة جرس مع نقطة خضراء
- شعار Wafier
- بطاقة الميزانية: Gradient SA-700→SA-600:
  - "الميزانية الشهرية / 500 ر.س"
  - شريط تقدم أخضر 69%
  - المصروف الحالي 193.20 | المتبقي 347.76
- "البيانات اللحظية" — 4 بطاقات: حالة الطقس 26°C / رطوبة 45% / طاقة 1.25kw / طقس خارجي
- "الاستهلاك التقديري للأجهزة": مكيف 50% / إضاءة 20% / تلفزيون 15% / ثلاجة 10%
- "توقعات الفاتورة" — بطاقة بـ SA-25 خلفية: 410 ر.س متوقعة

### 3. ForecastScreen (توقعات الفاتورة)
- Header: زر رجوع (ArrowRight في RTL) + "توقعات الفاتورة" + جرس
- صورة hero: SA-25 background + رسم توضيحي + تاريخ الإثنين 30 أبريل 2024
- "استهلاك الأجهزة" + زر "تحديد الميزانية" (variant="default"):
  - ❄️ المكيف — شريط SA-600 — 50% — التكلفة: 25.50 ريال
  - 💡 الإضاءة — 20% — 10.20 ريال
  - 📺 التلفزيون — 15% — 7.65 ريال
  - 🗄️ الثلاجة — 10% — 5.10 ريال
- بطاقة "كفاءة الاستهلاك" — SA-25 خلفية + أيقونة درع SA-600

### 4. ProfileScreen (الملف الشخصي)
- Header: ArrowRight + "الملف الشخصي" + جرس + زر AI (SA-600 background)
- بطاقة المستخدم: شعار + "مستخدم Wafier ✓" + عضو منذ أبريل 2024 + زر AI + زر تعديل
- "ملخص حسابك المالي 💰": 3 أعمدة (ميزانية 500 / مصروف 193.20 / متبقي 347.76) + نسب مئوية
- "مكان قراءة الحساسات 📡": 4 بطاقات (كهرباء 1,245 كو.س / ماء 18.6م³ / غاز 32.4م³ / شمسية 4.8 كو.س) + "متصل ●"
- "توقعات الفاتورة" + Dropdown "آخر 6 أشهر" + رسم بياني خطي (Recharts)
- "نصيحة ذكية 💡" — SA-25 خلفية

### Bottom Navigation (مشترك بين الشاشات 2-3-4)
3 تبويبات: الملف الشخصي / توقعات الفاتورة / الميزانية الشهرية

---

## الملفات المطلوب إنشاؤها/تعديلها

### `src/index.css` (تعديل)
```css
/* أولاً: Google Fonts imports */
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Work+Sans:wght@300;400;500;600;700&display=swap');

@import 'tailwindcss';

/* CSS Custom Properties — DGA Design System */
:root {
  --color-sa-25: 140 60% 98%;
  --color-sa-100: 140.9 56.1% 92%;
  --color-sa-200: 142.8 54.3% 82%;
  --color-sa-400: 150 46.2% 54.1%;
  --color-sa-500: 151.6 59.8% 36.1%;
  --color-sa-600: 152.9 65.8% 31%;
  --color-sa-700: 153.6 65.6% 25.1%;
  --color-sa-800: 154 62.6% 21%;
  
  --color-gray-25: 240 20% 99%;
  --color-gray-50: 210 20% 98%;
  --color-gray-200: 220 13% 91%;
  --color-gray-500: 217.9 8.1% 46.1%;
  --color-gray-700: 215 17.6% 26.7%;
  --color-gray-950: 220 36.6% 8%;

  --background: hsl(var(--color-gray-25));
  --foreground: hsl(var(--color-gray-950));
  --card: #ffffff;
  --primary: hsl(var(--color-sa-600));
  --primary-foreground: #ffffff;
  --border: hsl(var(--color-gray-200));
  --muted-foreground: hsl(var(--color-gray-500));
  --radius: 0.75rem;
}

html, body {
  direction: rtl;
  font-family: 'IBM Plex Sans Arabic', 'Work Sans', sans-serif;
  background-color: var(--background);
  color: var(--foreground);
}
```

### `src/App.tsx` (استبدال كامل)
- State: `type Screen = 'login' | 'dashboard' | 'forecast' | 'profile'`
- يعرض الشاشة المناسبة بناءً على state

### `src/components/LoginScreen.tsx` (جديد)
### `src/components/DashboardScreen.tsx` (جديد)
### `src/components/ForecastScreen.tsx` (جديد)
### `src/components/ProfileScreen.tsx` (جديد)
### `src/components/BottomNav.tsx` (مشترك)

---

## التقنيات
- **Recharts** للرسم البياني في ProfileScreen (يحتاج تثبيت: `pnpm add recharts`)
- **Tailwind CSS v4** — بدون config file
- **React state** للـ navigation

---

## ترتيب التنفيذ
1. تثبيت recharts
2. تحديث `src/index.css`
3. إنشاء `src/components/BottomNav.tsx`
4. إنشاء `src/components/LoginScreen.tsx`
5. إنشاء `src/components/DashboardScreen.tsx`
6. إنشاء `src/components/ForecastScreen.tsx`
7. إنشاء `src/components/ProfileScreen.tsx`
8. تحديث `src/App.tsx` لربط كل الشاشات

---

## التحقق (Mobile)
- Login يظهر أولاً → الضغط على "تسجيل الدخول" يفتح Dashboard
- Bottom Nav يتنقل صحيح بين الشاشات 2-3-4
- RTL صحيح — النصوص من اليمين لليسار
- الألوان من الـ Design System فقط (SA-600 كـ primary)
- الرسم البياني يظهر في Profile
- الخط IBM Plex Sans Arabic يظهر بشكل صحيح

---

# 🖥️ نسخة Desktop — الخطة التفصيلية

## Context
المستخدم يريد نسخة كمبيوتر (desktop/laptop) كاملة لتطبيق Wafier، بنفس الأربع شاشات والمحتوى، لكن بتصميم يستغل المساحة الواسعة للشاشات الكبيرة. النسخة الحالية محصورة في عرض 430px (موبايل). الهدف: عند فتح التطبيق على شاشة ≥ 1024px تظهر تجربة desktop احترافية كاملة.

## المنطق العام — Responsive Breakpoint

في `App.tsx`:
- **Mobile** (عرض < 1024px): الكود الحالي كما هو، يظهر shell الموبايل المحاط بـ box-shadow
- **Desktop** (عرض ≥ 1024px): يُعرض layout الـ desktop الكامل

لاكتشاف الحجم: `useEffect` + `window.innerWidth` + `resize` event listener

```tsx
const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
useEffect(() => {
  const handler = () => setIsDesktop(window.innerWidth >= 1024);
  window.addEventListener('resize', handler);
  return () => window.removeEventListener('resize', handler);
}, []);
```

## بنية Desktop Layout

### الـ Shell العام (ما عدا Login)
```
┌─────────────────────────────────────────────────────────┐
│  SIDEBAR (260px fixed)  │  MAIN CONTENT (flex: 1)       │
│  ┌───────────────────┐  │  ┌───────────────────────────┐│
│  │ Logo + Tagline    │  │  │ Page Header               ││
│  │───────────────────│  │  │───────────────────────────││
│  │ Nav Items:        │  │  │                           ││
│  │ • الميزانية الشهرية│  │  │  Page Content (scrollable)││
│  │ • توقعات الفاتورة │  │  │                           ││
│  │ • الملف الشخصي   │  │  │                           ││
│  │───────────────────│  │  └───────────────────────────┘│
│  │ User Info (bottom)│  │                               │
│  └───────────────────┘  │                               │
└─────────────────────────────────────────────────────────┘
```

**Sidebar** (جانب أيمن في RTL):
- خلفية: `linear-gradient(180deg, hsl(var(--color-sa-950)), hsl(var(--color-sa-800)))`
- عرض: 260px ثابت
- Logo + Wafier + tagline في الأعلى
- Nav items عمودية مع أيقونات + labels
- Active item: خلفية بيضاء شفافة `rgba(255,255,255,0.12)` + نص أبيض
- في الأسفل: معلومات المستخدم + زر AI + زر logout

**Main Content**:
- خلفية: `hsl(var(--color-gray-25))`
- Scrollable
- Padding: 32px

## الشاشات الأربع — Desktop

### 1. DesktopLogin
تصميم Split-Screen:
```
┌────────────────────────────────────────────────────────┐
│    BRAND PANEL (50%)        │   FORM PANEL (50%)        │
│  ┌──────────────────────┐   │  ┌────────────────────┐  │
│  │ Gradient sa-900→600  │   │  │ White card centered│  │
│  │                      │   │  │                    │  │
│  │ Wafier Logo (large)  │   │  │ "مرحباً بك!"       │  │
│  │ Tagline              │   │  │ Email input        │  │
│  │ Decorative SVG       │   │  │ Password input     │  │
│  │ (wind + solar)       │   │  │ Remember + Forgot  │  │
│  │                      │   │  │ Login Button       │  │
│  │ 3 Feature Bullets:   │   │  │ Social Login       │  │
│  │ • إدارة الطاقة       │   │  │ Sign up link       │  │
│  │ • توقعات الفاتورة    │   │  └────────────────────┘  │
│  │ • حلول ذكية          │   │                          │
│  └──────────────────────┘   │                          │
└────────────────────────────────────────────────────────┘
```

### 2. DesktopDashboard
Layout: Sidebar + 2-column grid layout في المحتوى

**الصف الأول (2 أعمدة):**
- **يمين (60%)**: بطاقة الميزانية الكبيرة (Gradient) مع progress bar + الأرقام
- **يسار (40%)**: grid 2x2 للبيانات اللحظية (حرارة / رطوبة / طاقة / طقس)

**الصف الثاني (2 أعمدة):**
- **يمين (55%)**: الاستهلاك التقديري للأجهزة (4 bars)
- **يسار (45%)**: توقعات الفاتورة + رسم بياني مصغر (mini area chart)

### 3. DesktopForecast
Layout: Sidebar + full-width content

- **Hero Banner** عريض مع تاريخ
- **Device Cards Grid** (2×2 بدل قائمة عمودية):
  كل جهاز في بطاقة مستقلة تحتوي: أيقونة كبيرة + اسم + شريط تقدم + تكلفة
- **Efficiency Card** عريض في الأسفل

### 4. DesktopProfile
Layout: Sidebar + 2-column content

**العمود الأيمن (40%):**
- بطاقة المستخدم (كبيرة مع أيقونة 80px)
- ملخص مالي (3 أرقام)

**العمود الأيسر (60%):**
- قراءات الحساسات (grid 2×2)
- رسم بياني كامل العرض (Recharts AreaChart)
- نصيحة ذكية

## الملفات الجديدة

```
src/components/desktop/
├── Sidebar.tsx            ← مشترك بين شاشات 2-3-4
├── DesktopLogin.tsx
├── DesktopDashboard.tsx
├── DesktopForecast.tsx
└── DesktopProfile.tsx
```

## تحديث App.tsx

```tsx
const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

// Mobile: الـ shell الحالي (maxWidth 430px)
// Desktop: full viewport layout
{isDesktop ? (
  // Desktop layouts
  screen === 'login' && <DesktopLogin ... />
  screen === 'dashboard' && <DesktopDashboard ... />
  ...
) : (
  // Mobile shell — الكود الحالي
)}
```

## قواعد التصميم Desktop

| العنصر | القيمة |
|--------|--------|
| Sidebar width | 260px |
| Main content padding | 32px |
| Card border-radius | 16px |
| Grid gap | 20px |
| Font size headings | 24px (h1), 18px (h2), 14px (h3) |
| Min desktop width | 1024px |
| Sidebar gradient | sa-950 → sa-800 (180deg) |
| Active nav bg | rgba(255,255,255,0.12) |
| Card shadow | `0 2px 16px rgba(0,0,0,0.06)` |

## ترتيب التنفيذ
1. إنشاء `src/components/desktop/Sidebar.tsx`
2. إنشاء `src/components/desktop/DesktopLogin.tsx`
3. إنشاء `src/components/desktop/DesktopDashboard.tsx`
4. إنشاء `src/components/desktop/DesktopForecast.tsx`
5. إنشاء `src/components/desktop/DesktopProfile.tsx`
6. تحديث `src/App.tsx` لإضافة responsive detection وربط Desktop components

## التحقق Desktop
- على شاشة ≥ 1024px: يظهر layout الـ desktop
- على شاشة < 1024px: يظهر الـ mobile shell كما هو

---

# 🔧 المرحلة الثالثة: اكتمال النظام

## Context
من الـ PDF يتضح أن Wafier هو تطبيق FinTech ذكي بـ 3 محاور:
1. **Smart Financial Engine** — تحويل kWh لـ SAR في الوقت الفعلي
2. **LLM + RAG Assistant** — مساعد AI مبني على RAG يقدم نصائح طاقة وتوفير معتمدة
3. **Graduated Alerting** — تنبيهات متدرجة (Level 1: 50% ميزانية، Level 2: تحذير استباقي)

حالياً يوجد **19 زر/عنصر لا يعمل**. الهدف: كل عنصر في التطبيق يفتح شاشة/modal حقيقية.

---

## الشاشات والـ Modals الجديدة

### 1. 🤖 AI Assistant (المساعد الاستشاري)
**يُفتح من:** زر AI في Profile (mobile + desktop) + Sidebar
**النوع:** Full-screen overlay (يغطي كامل الشاشة)

**المحتوى:**
- Header: "المساعد الاستشاري AI" + زر إغلاق X
- شريط معلومات: "مدعوم بـ RAG على لوائح الطاقة السعودية"
- منطقة المحادثة (chat bubbles):
  - رسالة ترحيب من AI: "مرحباً! أنا مساعدك الذكي لإدارة الطاقة..."
  - 3 أسئلة مقترحة كـ chips قابلة للضغط:
    - "كيف أخفض فاتورة المكيف؟"
    - "ما أفضل أوقات تشغيل الغسالة؟"
    - "كيف أصل لـ 80% من ميزانيتي؟"
  - بعد الضغط على أي سؤال → يظهر رد AI واقعي ومفيد
- Input bar في الأسفل: حقل نص + زر إرسال

**محادثات مسبقة (static data):**
```ts
const aiResponses = {
  "كيف أخفض فاتورة المكيف؟": "بناءً على بياناتك الحالية، المكيف يستهلك 50% من طاقتك...",
  "ما أفضل أوقات تشغيل الغسالة؟": "الفترة من 10 مساءً إلى 6 صباحاً هي الأقل استهلاكاً...",
  "كيف أصل لـ 80% من ميزانيتي؟": "لتصل لـ 80%، عليك تخفيض استهلاك المكيف بـ 15%..."
}
```

---

### 2. 🔔 Notifications Panel (لوحة الإشعارات)
**يُفتح من:** أيقونة الجرس في كل الشاشات (Dashboard + Forecast + Profile)
**النوع:** Drawer من اليمين (slide in)

**المحتوى:**
- Header: "الإشعارات" + عدد الإشعارات غير المقروءة + زر "تعليم الكل كمقروء"
- قائمة إشعارات بـ 3 أنواع (من الـ PDF):
  - 🔴 **Level 2 — تحذير استباقي:** "موجة حر قادمة! توقعنا ارتفاع فاتورتك إلى 450 ر.س"
  - 🟡 **Level 1 — تنبيه عتبة:** "وصلت لـ 69% من ميزانيتك الشهرية"
  - 🟢 **إعلامي:** "تم تحديث بيانات الحساسات بنجاح"
- كل إشعار: أيقونة + نص + وقت + dot لو غير مقروء

---

### 3. ✏️ Edit Profile Modal (تعديل الملف الشخصي)
**يُفتح من:** زر "تعديل الملف" في Profile (mobile + desktop)
**النوع:** Modal وسط الشاشة

**المحتوى:**
- Header: "تعديل الملف الشخصي" + X
- حقول:
  - الاسم الكامل (نص)
  - البريد الإلكتروني (email)
  - رقم الجوال (tel, dir=ltr)
  - المدينة (select: الرياض / جدة / الدمام / الأحساء)
- زر "حفظ التغييرات" → يغلق الـ modal
- زر "إلغاء"

---

### 4. 💰 Set Budget Modal (تحديد الميزانية)
**يُفتح من:** زر "تحديد الميزانية" في Forecast (mobile + desktop)
**النوع:** Modal صغير

**المحتوى:**
- Header: "تحديد ميزانيتك الشهرية"
- الميزانية الحالية: 500 ر.س (badge)
- Slider أو Input رقمي (من 100 إلى 2000 ر.س)
- معلومة: "سيتم إرسال تنبيه عند الوصول لـ 50% و75% من الميزانية"
- زر "حفظ الميزانية" (gradient أخضر)

---

### 5. 🔑 Forgot Password Modal (نسيت كلمة المرور)
**يُفتح من:** رابط "نسيت كلمة المرور؟" في Login
**النوع:** Modal

**المحتوى:**
- Header: "استعادة كلمة المرور"
- حقل البريد الإلكتروني
- زر "إرسال رابط الاستعادة"
- بعد الإرسال → رسالة نجاح: "تم إرسال رابط الاستعادة إلى بريدك"

---

### 6. 📝 Sign Up Screen (إنشاء حساب)
**يُفتح من:** "إنشاء حساب جديد" في Login
**النوع:** Screen كاملة (تحل محل Login screen)

**المحتوى:**
- Header: شعار Wafier
- عنوان: "إنشاء حساب جديد"
- حقول: الاسم الكامل + البريد + رقم الجوال + كلمة المرور + تأكيد كلمة المرور
- قبول الشروط والأحكام checkbox
- زر "إنشاء الحساب" → يعود لـ Login
- رابط "لديك حساب؟ تسجيل الدخول"

---

### 7. 📅 Period Picker (منتقي الفترة الزمنية)
**يُفتح من:** Dropdown "آخر 6 أشهر" في Profile
**النوع:** Popover صغير تحت العنصر

**الخيارات:**
- آخر 3 أشهر
- آخر 6 أشهر ✓
- آخر سنة
- هذا العام

---

## ملخص الأزرار المُصلحة (19 عنصر)

| العنصر | الشاشة | الحل |
|--------|--------|------|
| نسيت كلمة المرور؟ | Login (mobile+desktop) | `ForgotPasswordModal` |
| إنشاء حساب جديد | Login (mobile+desktop) | `SignUpScreen` |
| Apple / Google / هاتف | Login (mobile+desktop) | Toast "قريباً" |
| أيقونة الجرس | جميع الشاشات | `NotificationsPanel` |
| عرض الكل (بيانات لحظية) | Dashboard | بطاقات موسعة inline |
| عرض الكل (أجهزة) | Dashboard + DesktopDashboard | بطاقات موسعة inline |
| تحديد الميزانية | Forecast (mobile+desktop) | `SetBudgetModal` |
| المساعد الاستشاري AI | Profile + Sidebar | `AIAssistantScreen` |
| تعديل الملف | Profile (mobile+desktop) | `EditProfileModal` |
| آخر 6 أشهر (dropdown) | Profile (mobile+desktop) | `PeriodPicker` |
| AI badge (زر) | Profile mobile | `AIAssistantScreen` |

---

## الملفات الجديدة

```
src/components/shared/
├── AIAssistant.tsx       ← full-screen overlay, يعمل على mobile + desktop
├── NotificationsPanel.tsx ← drawer، يعمل على mobile + desktop
├── EditProfileModal.tsx  ← modal
├── SetBudgetModal.tsx    ← modal
├── ForgotPasswordModal.tsx ← modal
├── SignUpScreen.tsx       ← screen كاملة
├── PeriodPicker.tsx      ← popover صغير
└── Toast.tsx             ← toast بسيط للأزرار "قريباً"
```

---

## تحديثات الملفات الحالية

**`App.tsx`** — إضافة state لكل modal/overlay:
```ts
const [showAI, setShowAI] = useState(false);
const [showNotifications, setShowNotifications] = useState(false);
const [showEditProfile, setShowEditProfile] = useState(false);
const [showSetBudget, setShowSetBudget] = useState(false);
const [showForgotPassword, setShowForgotPassword] = useState(false);
const [showSignUp, setShowSignUp] = useState(false);
const [toast, setToast] = useState<string | null>(null);
```

كل modal/overlay يُعرض فوق كل الشاشات (fixed/absolute).

**الشاشات الحالية** — تُمرَّر `onOpenX` props لتفعيل الأزرار:
- `onOpenAI`, `onOpenNotifications`, `onOpenEditProfile`, `onOpenSetBudget`, `onOpenForgotPassword`, `onShowSignUp`, `onToast`

---

## ترتيب التنفيذ
1. `Toast.tsx` (الأبسط، يُستخدم في الباقي)
2. `ForgotPasswordModal.tsx`
3. `SignUpScreen.tsx`
4. `NotificationsPanel.tsx`
5. `AIAssistant.tsx`
6. `EditProfileModal.tsx`
7. `SetBudgetModal.tsx`
8. `PeriodPicker.tsx`
9. تحديث `App.tsx` — إضافة كل الـ state والـ overlays
10. تحديث كل شاشة (mobile + desktop) لتمرير الـ props وربط الأزرار

---

## التحقق النهائي
- كل زر في التطبيق يفعل شيئاً (لا يوجد dead button)
- AI assistant يرد على الأسئلة المقترحة
- الجرس يفتح panel الإشعارات من أي شاشة
- تعديل الملف يفتح modal وتُحفظ البيانات في state
- تحديد الميزانية يغير الرقم في Dashboard
- إنشاء حساب يظهر form كامل
- نسيت كلمة المرور يظهر modal استعادة
- "قريباً" toast يظهر للأزرار الثانوية (Apple/Google/Phone)
