# Design System & Guidelines — UEP

> **The unified and authoritative reference for the system, layout structure, page anatomy, components, and coding styles.**
> Authoritative reference for all components, styling, pages, layouts, and cards. No exceptions.

---

## 1. Golden Rules

| ❌ Prohibited / Legacy | ✅ Required / Recommended |
|:---|:---|
| `text-white`, `text-black` | `text-primary-foreground`, `text-foreground` |
| `bg-emerald-500`, `bg-amber-500`, ... | `bg-success`, `bg-warning`, `bg-status-*` |
| `text-blue-500`, `text-red-600`, ... | `text-info`, `text-destructive`, `text-status-*` |
| Direct HEX inside JSX/TSX (`color: '#07A869'`) | `hsl(var(--primary))` or corresponding semantic tokens |
| Physical Spacing: `ml-2`, `pr-4`, `left-0` | Logical Spacing: `ms-2`, `pe-4`, `start-0` (RTL-aware) |
| Manual `<input/>` + `<Search/>` combinations | Unified `<SearchInput/>` |
| Direct icon styling: `<Search className="w-5 h-5 text-emerald-500"/>` | `<Icon name="Search" size="md" tone="success"/>` |
| Direct colored button overrides: `<Button className="bg-primary text-white">` | `<Button variant="default">` (or other standard variants) |

---

## 2. Page Anatomy

Every page must strictly follow this vertical layout structure:

```
┌─────────────────────────────────────────────┐
│ HEADER  [Icon + Title + Subtitle] [Actions] │
├─────────────────────────────────────────────┤
│ STAT WIDGETS  (Exactly 3 cards)            │
├─────────────────────────────────────────────┤
│ FILTER BAR  [All][Active][Done]  [Select]   │
├─────────────────────────────────────────────┤
│ CONTENT GRID  (Cards / List Content)        │
└─────────────────────────────────────────────┘
```

### 2.1 Header

```tsx
<div className="flex items-center justify-between flex-wrap gap-4">
  <div className="flex items-center gap-3">
    <div className="p-3 rounded-xl bg-primary/10">
      <Icon className="h-7 w-7 text-primary" />
    </div>
    <div>
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="text-sm text-muted-foreground">{subtitle}</p>
    </div>
  </div>
  <Button className="gap-2"><Plus className="h-4 w-4" />{actionLabel}</Button>
</div>
```

### 2.2 Stat Widgets (Strictly 3)

```tsx
<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
  <StatWidget title="Active"    value={a} icon={Clock}        color="primary" />
  <StatWidget title="Completed" value={c} icon={CheckCircle2} color="chart-1" />
  <StatWidget title="Urgent"    value={u} icon={AlertCircle}  color="chart-2" />
</div>
```

| Spacing Rule | Description |
|---|---|
| **Count** | **Exactly 3 stat widgets** must be used at all times. |
| **Component** | Utilize `<StatWidget>` from `@/components/shared/StatWidget`. |
| **Colors** | Standard order: `primary`, `chart-1`, `chart-2`. |
| **Content** | Reflect real-time filterable data on the page. |

### 2.3 Filter Bar

* Status filters must be Pill-shaped buttons (not tabs).
* Active item: `variant="default"`. Inactive items: `variant="outline"`.
* Sizing: `size="sm" className="rounded-full"`.
* Secondary actions (dropdown filters): `<Select>` with `w-[160px] h-9`.

```tsx
<div className="flex flex-wrap gap-2 items-center">
  {filters.map(f => (
    <Button key={f.value}
      variant={current === f.value ? 'default' : 'outline'}
      size="sm" className="rounded-full"
      onClick={() => setFilter(f.value)}>{f.label}</Button>
  ))}
  <Select value={type} onValueChange={setType}>
    <SelectTrigger className="w-[160px] h-9"><SelectValue /></SelectTrigger>
    <SelectContent>{/* ... */}</SelectContent>
  </Select>
</div>
```

### 2.4 Content Grid

| Screen Size | Column Configuration |
|---|---|
| Mobile | `grid-cols-1` |
| Tablet | `sm:grid-cols-2` |
| Desktop | `lg:grid-cols-3` |

### 2.5 Last Row Stretch (Mandatory Layout Pattern)

When the total number of grid items is not divisible by 3, the final row must dynamically stretch to fill the remaining width. Hanging cards in the corner are prohibited:

| Number of Cards | Row 1 Grid | Final Row Layout |
|---|---|---|
| 3 | 3 Columns | — |
| 4 | 3 Columns | 1 card stretched to full width (`col-span-3`) |
| 5 | 3 Columns | 2 cards split evenly (`col-span-1.5` / 50-50 width) |
| 6 | 3 Columns | 3 Columns |
| 7 | 3 + 3 Columns | 1 card stretched to full width |

> [!IMPORTANT]
> **Do not write custom grid-cols layouts manually.** Use the shared component:
>
> ```tsx
> import { HubGrid } from '@/components/hub/HubGrid';
>
> <HubGrid items={cards} renderItem={(c) => <HubCard {...c} />} />
> // OR
> <HubGrid>{cards.map(c => <HubCard key={c.path} {...c} />)}</HubGrid>
> ```
> `HubGrid` automatically handles the Last-Row Stretch rules.

### 2.6 Horizontal/Strip Widgets

Horizontal layouts (e.g., `CountdownWidget` with `variant="strip"`, reminders, or banners on the dashboard):
* If it contains only a single item: it must span the entire width (`flex-1 w-full`).
* If it contains multiple items: implement horizontal scrolling with a minimum width of `min-w-[200px]` per item.

---

## 3. Page Types

### 3.1 Hub Page (Navigation Cards Page)

A sidebar-accessible index page composed of cards linking to sub-features. **Do not use Tabs for major page navigation.**

```tsx
<Card className="cursor-pointer hover:shadow-md transition-all hover:border-primary/30 group"
  onClick={() => navigate(path)}>
  <CardContent className="p-6">
    <div className="flex items-start gap-4">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${colorClass}`}>
        <Icon className="h-6 w-6" />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-base mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      </div>
      {/* RTL: ChevronLeft points forward in Arabic */}
      <ChevronLeft className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0 mt-1" />
    </div>
  </CardContent>
</Card>
```

#### Grouped Hub (e.g., Teacher Tools Hub)

```tsx
{categories.map(cat => (
  <div key={cat.key} className="space-y-3">
    <h2 className="text-lg font-semibold flex items-center gap-2">
      <CategoryIcon className="h-5 w-5 text-primary" />{cat.title}
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {cat.tools.map(t => <HubCard key={t.path} {...t} />)}
    </div>
  </div>
))}
```

### 3.2 Sub-Page Template

```tsx
<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
  <div className="flex items-center gap-4">
    <Button variant="ghost" size="icon" onClick={() => navigate('/parent')}>
      {/* RTL: ArrowRight acts as Back */}
      <ArrowRight className="h-5 w-5" />
    </Button>
    <div className="h-12 w-12 rounded-xl bg-chart-1/10 flex items-center justify-center shrink-0">
      <PageIcon className="h-6 w-6 text-chart-1" />
    </div>
    <div>
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="text-muted-foreground text-sm">{subtitle}</p>
    </div>
  </div>
  {/* Page Content */}
</motion.div>
```

---

## 4. Cards

### 4.1 Card Animations (Mandatory for Interactive Cards)

```tsx
<motion.div
  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
  transition={{ type: 'spring', stiffness: 400, damping: 17 }}>
  <Card className="cursor-pointer h-full group transition-shadow hover:shadow-lg">
    {/* ... */}
  </Card>
</motion.div>
```

### 4.2 Standard Card Inner Layout

```tsx
<CardContent className="p-4 flex items-start gap-4">
  <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-primary/10 text-primary">
    <Icon className="h-6 w-6" />
  </div>
  <div className="flex-1 min-w-0">
    <h3 className="font-semibold text-sm truncate">{title}</h3>
    <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{description}</p>
    <div className="flex items-center gap-2 mt-2 flex-wrap">
      <Badge variant="outline" className="text-[10px] px-1.5 py-0.5">{label}</Badge>
    </div>
  </div>
</CardContent>
```

### 4.3 Hub Card Data Structure

```ts
interface CardItem {
  title: string;
  description: string;
  icon: LucideIcon;
  path: string;
  color: string;     // e.g. 'text-chart-1' | 'text-primary'
  bgColor: string;   // e.g. 'bg-chart-1/10' | 'bg-primary/10'
}
```

### 4.4 StatWidget Usage

```tsx
<StatWidget title="Total" value={1250} subtitle="This Month"
  trend="up" trendValue={12} color="primary" />
```

| Parameter | Allowed Values |
|---|---|
| `color` | `primary` \| `chart-1` \| `chart-2` \| `chart-3` \| `chart-4` \| `chart-5` |
| `trend` | `up` \| `down` |

---

## 5. National Design System of Saudi Arabia (DGA Platforms Code)

Colors serve as a powerful medium to express style, evoke emotion, and convey urgency or importance. A deliberate, standard usage of these colors guarantees a distinctive, engaging, and unified user experience across government platforms.

### 5.1 Overview
Consistency and unification are the core foundations upon which the **National Design System of Saudi Arabia** (DGA Platforms Code) is built. Deploying colors optimally in accordance with these rules is a critical pillar for creating an integrated, delightful, and trusted interface.

The primary green color was chosen to represent the values of growth, prosperity, unity, cooperation, and national solidarity embodied in the flag of the Kingdom of Saudi Arabia. This color stands as a key symbol of the design system, harmonizing visual identity and organizing government portals to achieve integrated collaboration and development.

#### Color Serves a Purpose
The use of color must always serve a clear, functional purpose—namely, supporting the messaging, context, or validation state of the interface.

#### Colors that Create Impact
Choosing a clean, neutral palette for backgrounds and surfaces creates high contrast. This allows primary, interactive brand elements and validation notifications to stand out and draw immediate user attention.

---

### 5.2 Color Palettes

The National Design System organizes colors into three key palettes—Neutral, Primary, and Semantic—each serving distinct roles. Developers and designers must understand these classifications to ensure compliant implementations.

#### 5.2.1 Neutral Colors (Gray)
The Neutral palette consists of black, white, and a range of gray shades, providing the structural foundation of the user interface. These colors are applied to backgrounds, container surfaces, borders, text, and layout wrappers. They also signal component state changes (such as hover, active, or disabled states) when combined.

| Color | HEX Code | HSL Value | Primary Application |
|:---|:---|:---|:---|
| **Gray 25** | `FCFCFD` | `240 20% 99%` | Main canvas/page background |
| **Gray 50** | `F9FAFB` | `210 20% 98%` | Sub-panels, list rows, default container fills |
| **Gray 100** | `F3F4F6` | `220 14.3% 95.9%` | Layout lines, subtle hover backgrounds |
| **Gray 200** | `E5E7EB` | `220 13% 91%` | Dividing lines, input borders |
| **Gray 300** | `D2D6DB` | `213.3 11.1% 84.1%` | Disabled buttons, inactive borders |
| **Gray 400** | `9DA4AE` | `215.3 9.5% 64.9%` | Placeholder text, disabled labels |
| **Gray 500** | `6C737F` | `217.9 8.1% 46.1%` | Non-actionable icons, secondary labels |
| **Gray 600** | `4D5761` | `210 11.5% 34.1%` | Explanatory helper paragraphs |
| **Gray 700** | `384250` | `215 17.6% 26.7%` | Subtitles, input labels |
| **Gray 800** | `1F2A37` | `212.5 27.9% 16.9%` | Section headers, major text blocks |
| **Gray 900** | `111927` | `218.2 39.3% 11%` | Page titles, primary navigation highlights |
| **Gray 950** | `0D121C` | `220 36.6% 8%` | Primary text foreground |

#### 5.2.2 Primary Colors (Saudi Green — SA)
The Primary palette contains the signature shades that define and represent the government platform and product identity. These colors are strategically applied to highlight key actions, interactive items, brand details, and active navigation. They establish a visual connection with the national brand across all components.

| Color | HEX Code | HSL Value | Primary Application |
|:---|:---|:---|:---|
| **SA 25** | `F7FDF9` | `140 60% 98%` | Light alert backgrounds, accent panels |
| **SA 50** | `F3FCF6` | `140 60% 97.1%` | Selected list items or dropdown active states |
| **SA 100** | `DFF6E7` | `140.9 56.1% 92%` | Badge fills, light active overlays |
| **SA 200** | `B8EACB` | `142.8 54.3% 82%` | Interactive element borders |
| **SA 300** | `88D8AD` | `147.8 50.6% 69%` | Disabled states for brand components |
| **SA 400** | `54C08A` | `150 46.2% 54.1%` | Accent graphical charts |
| **SA 500** | `25935F` | `151.6 59.8% 36.1%` | Sub-options, subtle brand triggers |
| **SA 600** | `1B8354` | `152.9 65.8% 31%` | **Main brand interactive accent (Primary)** |
| **SA 700** | `166A45` | `153.6 65.6% 25.1%` | Hover states on primary buttons |
| **SA 800** | `14573A` | `154 62.6% 21%` | High-contrast brand typography |
| **SA 900** | `104631` | `156.7 62.8% 16.9%` | Dark headers on brand surfaces |
| **SA 950** | `092A1E` | `158.2 64.7% 10%` | Deepest brand backdrop fills |

#### 5.2.3 Secondary Colors (Reserved)
These secondary palettes are defined in the design code for future expandability but are **not** linked to core semantic variables by default. They are kept as reserve tokens.

##### Gold Palette
Gold symbolizes wealth, elegance, and visual prestige, providing a premium aesthetic to user interfaces. In design, it is used to emphasize exceptional components, ratings, or premium features, enriching user experience and enhancing portal identity.

| Color | HEX Code | HSL Value |
|:---|:---|:---|
| **Gold 25** | `FFFEF7` | `52.5 100% 98.4%` |
| **Gold 50** | `FFFEF2` | `55.4 100% 97.5%` |
| **Gold 100** | `FFFCE6` | `52.8 100% 95.1%` |
| **Gold 200** | `FCF3BD` | `51.4 91.3% 86.5%` |
| **Gold 300** | `FAE996` | `49.8 90.9% 78.4%` |
| **Gold 400** | `F7D54D` | `48 91.4% 63.5%` |
| **Gold 500** | `F5BD02` | `46.2 98.4% 48.4%` |
| **Gold 600** | `DBA102` | `44 98.2% 43.3%` |
| **Gold 700** | `B87B02` | `39.9 97.8% 36.5%` |
| **Gold 800** | `945C01` | `37.1 98.7% 29.2%` |
| **Gold 900** | `6E3C00` | `32.7 100% 21.6%` |
| **Gold 950** | `472400` | `30.4 100% 13.9%` |

##### Lavender Palette
Lavender introduces a gentle, heritage-centric touch of softness and serenity. It is frequently employed to evoke feelings of calm, sophistication, and balance. In design, it serves as a unique accent to create balanced contrast and layout harmony.

| Color | HEX Code | HSL Value |
|:---|:---|:---|
| **Lavender 25** | `FEFCFF` | `280 100% 99.4%` |
| **Lavender 50** | `F9F5FA` | `288 33.3% 97.1%` |
| **Lavender 100** | `F2E9F5` | `285 37.5% 93.7%` |
| **Lavender 200** | `E1CCE8` | `285 37.8% 85.5%` |
| **Lavender 300** | `CCADD9` | `282.3 36.7% 76.5%` |
| **Lavender 400** | `A57BBA` | `280 31.3% 60.6%` |
| **Lavender 500** | `80519F` | `276.2 32.5% 47.1%` |
| **Lavender 600** | `6D428F` | `273.5 36.8% 41%` |
| **Lavender 700** | `532D75` | `271.7 44.4% 31.8%` |
| **Lavender 800** | `3D1D5E` | `269.5 52.8% 24.1%` |
| **Lavender 900** | `281047` | `266.2 63.2% 17.1%` |
| **Lavender 950** | `16072E` | `263.1 73.6% 10.4%` |

#### 5.2.4 Semantic Colors (Status)
Semantic colors are chosen as indicators that convey feedback, errors, alerts, or notifications quickly. Red denotes error, yellow indicates caution, green signals positive feedback/success, and blue denotes informational details. Consistent application reduces cognitive load.

##### Error Color Palette
Red is deliberately used to capture immediate attention and convey critical validation states or failure logs. It acts as an unmistakable visual cue to users that there are issues requiring immediate acknowledgment and resolution.

| Color | HEX Code | HSL Value |
|:---|:---|:---|
| **Error 25** | `FFFBFA` | `12 100% 99%` |
| **Error 50** | `FEF3F2` | `5 85.7% 97.3%` |
| **Error 100** | `FEE4E2` | `4.3 93.3% 94.1%` |
| **Error 200** | `FECDCA` | `3.5 96.3% 89.4%` |
| **Error 300** | `FDA29B` | `4.3 96.1% 80%` |
| **Error 400** | `F97066` | `4.1 92.5% 68.8%` |
| **Error 500** | `F04438` | `3.9 86% 58%` |
| **Error 600** | `D92D20` | `4.2 74.3% 48.8%` |
| **Error 700** | `B42318` | `4.2 76.5% 40%` |
| **Error 800** | `912018` | `4 71.6% 33.1%` |
| **Error 900** | `7A271A` | `8.1 64.9% 29%` |
| **Error 950** | `55160C` | `8.2 75.3% 19%` |

##### Warning Color Palette
Yellow/Orange is selected to capture attention and communicate precautionary notifications. It acts as a visual signifier reminding users to review inputs or actions carefully.

| Color | HEX Code | HSL Value |
|:---|:---|:---|
| **Warning 25** | `FFFCF5` | `42 100% 98%` |
| **Warning 50** | `FFFAEB` | `45 100% 96.1%` |
| **Warning 100** | `FEF0C7` | `44.7 96.5% 88.8%` |
| **Warning 200** | `FEDF89` | `44.1 98.3% 76.7%` |
| **Warning 300** | `FEC84B` | `41.9 98.9% 64.5%` |
| **Warning 400** | `FDB022` | `38.9 98.2% 56.3%` |
| **Warning 500** | `F79009` | `34 93.7% 50.2%` |
| **Warning 600** | `DC6803` | `27.9 97.3% 43.7%` |
| **Warning 700** | `B54708` | `21.8 91.5% 37.1%` |
| **Warning 800** | `93370D` | `18.8 83.7% 31.4%` |
| **Warning 900** | `7A2E0E` | `17.8 79.4% 26.7%` |
| **Warning 950** | `4E1D09` | `17.4 79.3% 17.1%` |

##### Info Color Palette
Blue is chosen to convey informational logs, guides, and status flows, communicating a sense of reliability and trust. It signals helpful context or non-blocking system updates.

| Color | HEX Code | HSL Value |
|:---|:---|:---|
| **Info 25** | `F5FAFF` | `210 100% 98%` |
| **Info 50** | `ECFDF3` | `144.7 81% 95.9%` |
| **Info 100** | `D1E9FF` | `208.7 100% 91%` |
| **Info 200** | `B2DDFF` | `206.5 100% 84.9%` |
| **Info 300** | `84CAFF` | `205.9 100% 75.9%` |
| **Info 400** | `53B1FD` | `206.8 97.7% 65.9%` |
| **Info 500** | `2E90FA` | `211.2 95.3% 58%` |
| **Info 600** | `1570EF` | `215 87.2% 51%` |
| **Info 700** | `175CD3` | `218 80.3% 45.9%` |
| **Info 800** | `1849A9` | `219.7 75.1% 37.8%` |
| **Info 900** | `194185` | `217.8 68.4% 31%` |
| **Info 950** | `102A56` | `217.7 68.6% 20%` |

##### Success Color Palette
Green is chosen to denote positive verification outcomes, successfully completed tasks, and approved requests. It represents confidence, growth, and proper execution.

| Color | HEX Code | HSL Value |
|:---|:---|:---|
| **Success 25** | `F6FEF9` | `142.5 80% 98%` |
| **Success 50** | `ECFDF3` | `144.7 81% 95.9%` |
| **Success 100** | `DCFAE6` | `140 75% 92.2%` |
| **Success 200** | `ABEFC6` | `143.8 68% 80.4%` |
| **Success 300** | `75E0A7` | `148 63.3% 66.9%` |
| **Success 400** | `47CD89` | `149.6 57.3% 54.1%` |
| **Success 500** | `17B26A` | `152.1 77.1% 39.4%` |
| **Success 600** | `079455` | `153.2 91% 30.4%` |
| **Success 700** | `067647` | `154.8 90.3% 24.3%` |
| **Success 800** | `085D3A` | `155.3 84.2% 19.8%` |
| **Success 900** | `074D31` | `156 83.3% 16.5%` |
| **Success 950** | `053321` | `156.5 82.1% 11%` |

---

### 5.3 Core HSL Theme Mappings

The semantic tokens in the app are mapped in [index.css](file:///c:/Users/Abo%20Alrejal/Desktop/uep/src/index.css) as follows:

* **Background:** `hsl(var(--color-gray-25))`
* **Foreground:** `hsl(var(--color-gray-950))`
* **Card / Popover:** `hsl(var(--color-gray-0))`
* **Primary:** `hsl(var(--color-sa-600))`
* **Secondary:** `hsl(var(--color-sa-700))`
* **Accent:** `hsl(var(--color-sa-500))`
* **Destructive:** `hsl(var(--color-error-600))`
* **Border / Input:** `hsl(var(--color-gray-200))`
* **Ring:** `hsl(var(--color-sa-600))`
* **Navy (Back-compat):** `hsl(var(--color-gray-900))`
* **Gold (Back-compat):** `hsl(var(--color-sa-800))` *(Mapped to dark green to avoid legacy gold elements)*

---

### 5.4 Gradients
The gradient palette adds a dynamic, visually engaging depth to layouts, providing smooth transitions, premium meshes, and modern background containers.

* **Gradient 1 (90°):** SA 600 (`1B8354`) ➔ SA 500 (`25935F`)
* **Gradient 2 (45°):** SA 700 (`166A45`) ➔ SA 600 (`1B8354`) — *Standard brand background gradient*
* **Gradient 3 (45°):** SA 950 (`092A1E`) ➔ SA 600 (`1B8354`)
* **Gradient 4 (90°):** SA 800 (`14573A`) ➔ SA 600 (`1B8354`)
* **Gradient 5 (26.5°):** SA 800 (`14573A`) ➔ SA 700 (`166A45`)
* **Gradient 6 (45°):** SA 900 (`104631`) ➔ SA 600 (`1B8354`)

---

### 5.5 Text and Background Color Combinations
To maintain contrast, typography is structured specifically according to light and dark background contexts:

#### Dark Typography on Light Backgrounds
* **Primary Text:** Gray 950 (`0D121C`) — Main headings, core body texts.
* **Secondary Text:** Gray 700 (`384250`) — Supporting titles, form labels.
* **Tertiary Text:** Gray 600 (`4D5761`) — Inline meta details, disabled states.

#### Light Typography on Dark Backgrounds
* **Primary Text:** Alpha White (`FFFFFF`)
* **Secondary Text:** Alpha White 70% (`FFFFFF` at 0.7 opacity)
* **Tertiary Text:** Alpha White 60% (`FFFFFF` at 0.6 opacity)

#### Brand Typography on Light Backgrounds
* **Primary Text:** SA 800 (`14573A`)
* **Secondary Text:** SA 600 (`1B8354`)
* **Tertiary Text:** SA 500 (`25935F`)

#### Semantic Typography on Light Backgrounds
* **Error Text:** Error 600 (`D92D20`)
* **Warning Text:** Warning 600 (`DC6803`)
* **Success Text:** Success 600 / SA 600 (`1B8354`)
* **Info Text:** Info 600 (`1570EF`)

---

### 5.6 Accessibility & WCAG Contrast Guidelines
This section outlines the crucial role of contrast in creating accessible, user-friendly layouts for all individuals, including those with visual impairments. 

* **Importance of Contrast:** Contrast defines the difference in brightness between background and foreground elements. High contrast makes sure all text blocks are legible and interface options are distinct.
* **Understanding Color Contrast:** Color contrast is the light difference between the font and its layout backdrop. Sufficient contrast prevents eye strain and clarifies components.
* **WCAG Contrast Standards:**
  * **Small Text (< 24px):** Must maintain a contrast ratio of at least **4.5:1** against the background.
  * **Large Text (>= 24px):** Must maintain a contrast ratio of at least **3:1** against the background.
  * **Graphical components / active inputs:** Must maintain a contrast ratio of at least **3:1** against adjacent boundaries.
* **Consistent Relationships:** The design system configures structured, predictable contrast ratios between the twelve shades, so any component combinations satisfy AA/AAA accessibility checks automatically.

---

## 6. Typography

* **Arabic:** `IBM Plex Sans Arabic`
* **English:** `Work Sans`
* **Serif:** `Lora` (Used rarely, for premium quotes or display headings)
* **Mono:** `Inconsolata` (Exclusively for code blocks/pre-formatted elements)

These are configured globally in Tailwind classes: `font-sans` (default), `font-serif`, `font-mono`.

---

## 7. Icons (Lucide)

Use `<Icon name="..." size="..." tone="..."/>` from `@/components/shared/Icon` instead of importing direct SVG icons and assigning custom classes.

| size | Dimensions (px) | Application |
|---|---|---|
| `xs` | 12px | Inline inside tags / small badges |
| `sm` | 16px | Inside buttons / inline in inputs |
| `md` | 20px | Card header indicators (Default) |
| `lg` | 24px | Section titles / navigation items |
| `xl` | 32px | Hero sections / visual summaries |
| `2xl` | 48px | Empty state illustrations |

| tone | Applied Palette |
|---|---|
| `default` | `currentColor` |
| `primary` / `secondary` / `accent` | Brand Colors |
| `muted` | Secondary or helper icons |
| `success` / `warning` / `danger` / `info` | Semantic validation statuses |

---

## 8. Component Variants

### 8.1 Buttons

* `default` — Primary Brand Color (Green)
* `secondary` — Secondary Brand Color (Darker Green)
* `outline` — Border-only indicator
* `ghost` — Clear overlay
* `link` — Text hyperlink
* `destructive` — Red indicator for irreversible actions
* `success`, `warning`, `info`, `hero` — Context-specific states

### 8.2 Badge / StatusBadge

Use `<StatusBadge variant="success|warning|danger|info">` instead of customizing utility classes like `bg-blue-500/10 text-blue-500`.

### 8.3 Card

* Use `<SectionCard/>` for standard dashboard card wrappers (padding, radius, shadow defaults).
* If customizing with `<Card>` from shadcn: apply `rounded-lg shadow-sm`.

---

## 9. Spacing & Radius

* **Corner Radius:** `rounded-md` for small triggers/inputs, `rounded-lg` for standard cards (`--radius: 0.75rem`), `rounded-full` for badges/pills/avatars.
* **Layout Spacing:** Rely on standard Tailwind spacings (`gap-2`, `gap-4`, `gap-6`, `gap-8`).

---

## 10. RTL & Bilingual Guidelines

The application supports AR (RTL) and EN (LTR). All layout classes must be **logical** rather than physical:

| ❌ Physical (Prohibited) | ✅ Logical (Required) | Description |
|:---|:---|:---|
| `ml-X` | `ms-X` | margin-start |
| `mr-X` | `me-X` | margin-end |
| `pl-X` | `ps-X` | padding-start |
| `pr-X` | `pe-X` | padding-end |
| `left-X` | `start-X` | position start offset |
| `right-X` | `end-X` | position end offset |
| `text-left` | `text-start` | text alignment start |
| `text-right` | `text-end` | text alignment end |
| `rounded-l-X` | `rounded-s-X` | border-radius start |
| `rounded-r-X` | `rounded-e-X` | border-radius end |

*Exception: Phone numbers, codes, and emails must be wrapped inside `<span dir="ltr">`.*

### 10.1 Programmatic RTL Slices

```tsx
const { language, t } = useLanguage();
const isAr = language === 'ar';

// Direction-aware Icons
const Back = isAr ? ArrowRight : ArrowLeft;   // Back navigation
const Next = isAr ? ChevronLeft : ChevronRight; // Forward navigation

// Text
{isAr ? 'العربية' : 'English'}
{t('api.keys.title')}

// Numeric formatting
xp.toLocaleString(isAr ? 'ar-SA' : 'en-US')
new Date().toLocaleDateString(isAr ? 'ar-SA' : 'en-US', { month: 'long', day: 'numeric' })

// date-fns
import { ar, enUS } from 'date-fns/locale';
format(date, 'PPpp', { locale: isAr ? ar : enUS })
```

---

## 11. Animations

### 11.1 Tailwind Built-in Utilities
* `animate-fade-in` — Page entry transition
* `animate-scale-in` — Dialogs & Popovers
* `animate-slide-in-right` — Drawers & sheets
* `animate-enter` / `animate-exit` — Combined presets

### 11.2 Custom CSS Utilities
* `hover-scale` — Scale up by 5% on hover transition.
* `story-link` — Animated inline link underline.

### 11.3 Framer Motion Guidelines
Framer Motion should be reserved for:
* Complex page transitions.
* Staggered child list components.
* Gesture-based drag-and-drop interactions.

*For simple fades and scaling, prioritize Tailwind animation classes.*

---

## 12. Shared Components Registry

Located in `src/components/shared/`

| Component | Standard Usage |
|---|---|
| `<SearchInput/>` | Input field with inline search validation. |
| `<Icon/>` | Icon lookup utilizing Lucide references. |
| `<PageHeader/>` | Title, descriptions, breadcrumbs, and actions header. |
| `<EmptyState/>` | Graphic and message card indicating missing dataset. |
| `<StatCard/>` | Individual stat card component. |
| `<FilterBar/>` | Inline pill-styled action filter block. |
| `<SectionCard/>` | Layout boundary wrapper card. |
| `<StatusBadge/>` | Colored validation status badge. |

---

## 13. Allowed Style Exceptions

Raw colors are allowed **only** in the following circumstances:
* SSO Authentication buttons (Google, Microsoft, Apple) — strictly on Login/Signup pages.
* Science laboratory elements in `ChemistryLab.tsx` (`LAB_CHEMICAL_COLORS`).
* Auto-generated asset covers (`generate-book-cover.ts`) utilizing canvas rendering colors.

*Any new exception must be formally documented in this list.*

---

## 14. Prohibited Patterns

* Do not use `Tabs` to navigate between independent pages. (Use Hub cards instead).
* Do not use `Tabs` to filter listing details. (Use Pill button arrays instead).
* Do not use direct Tailwind colors (like `text-blue-500`) in active layouts. (Use CSS semantic variables).
* Do not add more or fewer than **exactly 3** stat widgets to standard dashboard views.
* Do not use `fixed` / `inset-0` overrides for generic layout components.
* Do not separate filters into sub-files. Keep filter states inline.

---

## 15. Verification Tools

Before submitting any Pull Request, developers must run the following checks to ensure design-system compliance:

```bash
# Verify raw colors and HEX violations (must return 0 errors)
node scripts/audit-colors.mjs

# Search for deprecated physical directional classes
rg "\b(ml|mr|pl|pr)-[0-9]" src --type tsx
```

---

## 16. Execution References

| Pattern | Reference File |
|---|---|
| Complete Page Layout (stats + filters + grid) | `src/pages/tasks/TasksList.tsx` |
| Standard Hub | `src/pages/student/reports/ReportsIndex.tsx` |
| Grouped Hub | `src/pages/teacher/tools/TeacherToolsHub.tsx` |
| Individual StatWidget | `src/components/shared/StatWidget.tsx` |
| Unified HubGrid | `src/components/hub/HubGrid.tsx` |

---

## 17. Common Imports Template

```tsx
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { StatWidget } from '@/components/shared/StatWidget';
import { HubGrid } from '@/components/hub/HubGrid';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
```

---

## 18. New Page Implementation Checklist

- [ ] **Header:** Structured with icon, title, subtitle, and primary actions.
- [ ] **Stats:** Exactly 3 StatWidgets using `primary`, `chart-1`, and `chart-2` colors.
- [ ] **Filters:** Pill-styled action buttons (not tabs) for listing states.
- [ ] **Grid:** Contained inside `<HubGrid>` instead of raw `grid-cols-3` classes.
- [ ] **Stretching:** Dynamic last-row stretching handles grid remainders automatically.
- [ ] **Banners:** Horizontal widgets stretch full-width if alone.
- [ ] **Motion:** Interactive cards configured with standard Framer Motion parameters.
- [ ] **Tokens:** Only semantic design system variables (no raw HEX or direct color names).
- [ ] **Bilingual:** Handled through `useLanguage()` and `t()` helpers.
- [ ] **RTL:** Logical spacing classes (`ms-*`, `pe-*`) and direction-aware icon pointers.
- [ ] **States:** Double-checked empty states, error states, and loading shimmers.
- [ ] **Responsive:** Fully tested across mobile, tablet, and desktop viewports.

---

## 19. Implementation Log & Phase Archival

### Phase 4 — Component Unification (Completed ✓)
* Shared component framework in `src/components/shared/` fully available.
* Live layout preview sandbox page available at `/admin/design-system`.
* Added context buttons: `success`, `warning`, `info`, `hero` on standard `<Button>`.
* Incremental search bar replacement guidelines published.

### Phase 5 — RTL, Animations, and Visual Polish (Completed ✓)
* **RTL Migration** performed via `scripts/migrate-rtl.mjs`:
  * Converted 318 layout instances across 94 files from physical to logical classes (e.g. `ml-*` to `ms-*`, `pl-*` to `ps-*`).
  * Excluded `src/components/ui/` (vendored assets) and sandbox pages.
  * Migration script is idempotent and can be safely rerun: `node scripts/migrate-rtl.mjs`.
* **Animations:** Registered core keyframes (`animate-fade-in`, `animate-scale-in`, etc.) in `tailwind.config.ts`.
* **Utilities:** Integrated `hover-scale` and `story-link` directly in `src/index.css`.
* **Page Wrapper Recommendation:** Every entry layout should be wrapped in:
  ```tsx
  <div className="animate-fade-in">...</div>
  ```

### Tooling Reference

| Script | Function |
|---|---|
| `node scripts/audit-colors.mjs` | Audits code for raw Tailwind classes and active HEX codes. |
| `node scripts/migrate-colors.mjs` | Migrates raw color overrides to standard semantic status tokens. |
| `node scripts/migrate-rtl.mjs` | Migrates directional physical CSS styles to RTL-safe logical styles. |

### Strict Compliance Checklist
1. All PRs must pass `node scripts/audit-colors.mjs` with zero violations before merging.
2. New pages must utilize `<PageHeader />` and be wrapped inside an `animate-fade-in` container.
3. Every search input must rely on `<SearchInput />`, and every inline icon must be instantiated through `<Icon />`.
4. Direct inline physical alignments (`ml-`, `pl-`, `left-`, `text-left`) are prohibited; logical selectors must be used instead.
