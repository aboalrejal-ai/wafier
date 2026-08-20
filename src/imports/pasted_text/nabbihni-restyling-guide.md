You are restyling this entire Figma file to match the live NABBIHNI / Majmaah University product identity. This is a FULL visual replacement, not a tweak.

SOURCE OF TRUTH
The new design system is Nabbihni after login: home, sidebar, top bar, search, cards, buttons, Blackboard, settings, mobile bottom nav, and assistant. Apply that system everywhere in this file: mobile, desktop, forms, charts, assistant, and alerts.

The current file is the old WAFIER design. Forget Wafier’s extra palette, extra oranges, gold, Google-button colors (unless a real Google Sign-In button remains), custom AI dark theater, and the long list of one-off white/black overlays. If a Wafier color is not in the Nabbihni tables below, delete it and restyle that element with Nabbihni tokens.

Do not mix palettes. Do not keep “a little Wafier orange” or “a little gold.” One identity only: Nabbihni.

================================================================
1) BRAND GREEN — keep these HEX values, change HOW they are used
These HEX values already exist in Wafier. Do not invent new greens.
What changes is ROLE and PLACEMENT.

sa-25   #F7FDF9   Quiet green washes inside cards, very light tinted surfaces
sa-50   #F3FCF6   Sidebar/nav ACTIVE background, tonal button fill, outline-button hover
sa-100  #DFF6E7   Icon wells, soft green layers, tonal button hover, input active fill
sa-200  #B8EACB   Soft green borders, selected-card hover border, decorative rings
sa-300  #88D8AD   Chart series / mid ornaments only
sa-400  #54C08A   Chart series / mid green details only
sa-500  #25935F   Accent / selected search row / interactive accent. NOT the main button.
sa-600  #1B8354   PRIMARY. Main CTAs, logo tile, icons on brand, key numbers, focus ring, active nav bar, 3px sidebar active rail
sa-700  #166A45   Primary hover, active nav TEXT, secondary button fill, dark green gradient start
sa-800  #14573A   Primary pressed/active, darker brand surfaces
sa-900  #104631   Extra depth in brand gradients
sa-950  #092A1E   Darkest brand green. Use only in dark-theme brand depth, never as a random extra.

GREEN USAGE IN NABBIHNI (apply this, not Wafier’s energy/sensor look):
- Logo mark: 8×8 rounded square #1B8354, icon #FFFFFF
- Primary button: fill #1B8354, text #FFFFFF, hover #166A45, pressed #14573A, disabled fill #F3F4F6 text #9DA4AE
- Outline button: fill page/card, border #E5E7EB, hover fill #F3FCF6, hover text #166A45, hover border #1B8354
- Tonal/subtle button: fill #F3FCF6, text #166A45, hover #DFF6E7, pressed #B8EACB
- Ghost button: transparent, hover #F3F4F6, pressed #E5E7EB
- Sidebar / left nav: white surface. Idle text #111927. Hover #F3FCF6. Active item fill #F3FCF6, text #166A45, 3px start rail #1B8354
- Desktop top bar: white. Search field fill #F3F4F6 at 50% over white, icon+placeholder #4D5761, ⌘K chip white with #E5E7EB border
- Search dialog selected row: fill #25935F, text #FFFFFF. Unselected hover #F3F4F6
- Mobile bottom nav: white capsule 85% + blur. Idle #4D5761. Active text #1B8354, active pill fill #1B8354 at 15% with border #1B8354 at 20%
- Cards: white. Hover/selected border #1B8354 at 30% or #B8EACB. Icon wells #1B8354 at 10% with icon #1B8354
- Charts: only sa-600, sa-400, sa-800, sa-300, sa-500. No rainbow, no gold, no extra orange series.

================================================================
2) NEUTRALS — this is the biggest visual change
Wafier used gray-100 as “app background” and mixed orange alert cards. Nabbihni does not.

gray-0 / white  #FFFFFF   Cards, sidebar, top bar, popovers, inputs, text on brand green
gray-25         #FCFCFD   PAGE BACKGROUND for the whole product (mobile AND desktop). This is the canvas.
gray-50         #F9FAFB   Extra-soft secondary surface only
gray-100        #F3F4F6   muted surfaces: search pill, ghost hover, chips, table row hover. NOT the page canvas.
gray-200        #E5E7EB   Default borders, input borders, sidebar/topbar hairlines (topbar hairline at 30% opacity)
gray-300        #D2D6DB   Input hover border, slightly stronger rules
gray-400        #9DA4AE   Placeholder, disabled text, low-emphasis icons
gray-500        #6C737F   Do not use as primary body text
gray-600        #4D5761   Secondary text, dates, hints, idle icons, muted-foreground
gray-700        #384250   Labels
gray-800        #1F2A37   High-contrast dark surface only if needed
gray-900        #111927   Sidebar text, strong titles
gray-950        #0D121C   Default body text, key numbers, focus-ring outer color

NEUTRAL USAGE:
- App/page canvas: #FCFCFD
- Card / modal / form / sidebar / topbar: #FFFFFF
- Card border: #E5E7EB
- Heading: #0D121C or #111927
- Body/secondary: #4D5761
- Divider: #E5E7EB
- Desktop chrome around mobile frames: #FCFCFD, not a dark Wafier frame unless it is explicitly a device bezel
- Inputs: fill #FFFFFF or #FCFCFD, border #E5E7EB, hover border #D2D6DB, focus border #1B8354 + 2px ring #1B8354 at 20%
- Error input: border #F04438 / focus #D92D20
- Focus visible on buttons/links: 2px solid #0D121C, 2px offset. Not a thick colored glow.

================================================================
3) STATUS / ALERTS — replace every Wafier orange/gold/red-extra
Use ONLY these semantic colors. Soft backgrounds are the 10% tint of the solid, or the official soft stops below.

Success  #079455   success fill, connected/positive. Soft well: #079455 at 10% or #ECFDF3. Text on soft: #079455
Warning  #DC6803   the ONLY warning orange. Soft well: #DC6803 at 10% or #FFFAEB. Soft border if needed: #FEDF89. Strong warning text: #B54708
Danger   #D92D20   errors, destructive, overdue. Soft well: #D92D20 at 10% or #FEF3F2. Destructive hover #B42318, pressed #912018
Info     #1570EF   informational only. Soft well: #1570EF at 10% or #D1E9FF. Never as brand.

Forbidden Wafier status colors — DELETE AND REPLACE:
#F79009  →  #DC6803   (this was warning-500; Nabbihni uses warning-600 as THE warning)
#F97316  →  #DC6803   (budget / forecast orange — unify into warning)
#C2410C  →  #B54708   (desktop warning text)
#FFF7ED  →  #FFFAEB   (warning card background)
#FED7AA  →  #FEDF89   (warning card border)
#EF4444  →  #D92D20   (assistant stop / interactive red)
rgba(239,68,68,0.2) → #D92D20 at 10%
#F7D54D  →  REMOVE. No gold. If it was emphasis, use #1B8354. If it was a chart, use sa-400 #54C08A
#2563EB  →  #1570EF   (only if the element is truly informational; otherwise use #1B8354)
rgba(37,99,235,0.5) → delete the blue glow. Use #1B8354 at 20% if a brand glow is required, otherwise no glow.

Due chips / badges (Blackboard-style):
- Overdue: bg #D92D20 at 10%, text #D92D20, border #D92D20 at 30%
- Today / warning: bg #DC6803 at 10%, text #DC6803, border #DC6803 at 30%
- Upcoming / success: bg #079455 at 10%, text #079455, border #079455 at 30%
- Neutral: outline #E5E7EB, text #4D5761

Settings / feature icon wells: 12×12 rounded-xl, fill = status-or-primary at 10%, icon = the solid. No rainbow set. Prefer primary #1B8354, info #1570EF, warning #DC6803, success #079455, danger #D92D20.

================================================================
4) ASSISTANT — do NOT keep Wafier’s dark theater
Wafier AI used a custom dark stage. Nabbihni assistant lives in the SAME logged-in chrome as the rest of the app.

DELETE these AI-only colors:
#0F1117  →  page canvas #FCFCFD  (if the whole product is in dark theme, use dark tokens below, not this one-off)
#1E2124  →  card/input #FFFFFF in light, or dark surface #1F2A37-equivalent from the dark table, never this hex
#092A1E  →  do not paint the AI screen this color. It is sa-950, reserved for dark brand depth
#1B8354  →  keep only for primary actions / user-brand messages
#2563EB and blue glow → remove
#EF4444 and red translucent wells → #D92D20 / 10%

AI in LIGHT (default, matches Nabbihni after login):
- Shell: white sidebar + white topbar on #FCFCFD canvas
- Assistant bubbles / panels: #FFFFFF, border #E5E7EB
- User/brand actions: #1B8354
- Input: white or muted #F3F4F6, border #E5E7EB, focus #1B8354
- Active history row: #F3FCF6, text #166A45
- Idle history text: #111927, meta #4D5761
- Destructive delete: #D92D20

If a DARK theme toggle exists, use Nabbihni dark tokens, not Wafier AI hexes:
- Canvas / gray-25: #141A24 approx from inverted gray-25 (HSL 220 30% 8%)
- Cards / gray-0: #0A1018 approx (HSL 220 36.6% 6%)
- Borders / gray-200: ~#2B333D
- Text high: near-white
- Primary still green, slightly lifted: sa-600 about #22C37A-range on dark, but keep the SAME token name primary. Do not introduce #0F1117 or #1E2124.

================================================================
5) GOOGLE SIGN-IN
Keep #4285F4 #34A853 #FBBC05 #EA4335 ONLY on an official Google button.
If login is not Google, restyle that button as Nabbihni primary: #1B8354 / white.
Do not spread Google colors into charts, nav, or alerts.

================================================================
6) TRANSPARENCY — collapse Wafier’s 30+ overlays
Do not keep the long white/black opacity ladder. Use only these patterns:

Brand tints:   #1B8354 at 10%, 15%, 20%, 30%
Status tints:  success/warning/danger/info at 10% and 30% for borders
Muted search:  #F3F4F6 at 50%
Hairlines:     #E5E7EB at 30% (topbar/sidebar edge) or 60% (bottom nav capsule)
Bottom nav:    #FFFFFF at 85% + background blur
Shadows:       color #101828 (HSL 220 39% 11%)
               xs  0 1px 2px 0 at 5%
               sm  0 1px 3px 0 at 10% + 0 1px 2px 0 at 6%
               md  0 4px 8px -2px at 10% + 0 2px 4px -2px at 6%
               lg  0 12px 16px -4px at 8% + 0 4px 6px -2px at 3%
Cards use the extra-small/small shadow, not heavy black scrims.
Delete rgba(255,255,255,0.04) through 0.95 stacks and rgba(0,0,0,0.04) through 0.60 stacks except real modal dim: a single #0D121C at ~40–50% overlay behind dialogs.

================================================================
7) TYPE, RADIUS, COMPONENT STYLE
Font family: IBM Plex Sans Arabic first, then Work Sans, then system sans.
Do not keep Wafier display/serif styling unless a true quote/serif exception exists; body/UI is IBM Plex Sans Arabic.
Mono (⌘K, codes): Inconsolata.
Radius: 12px default (0.75rem). Buttons/inputs ~8–12px. Sidebar items 8px (rounded-lg). Icon wells 12px. Bottom nav capsule fully rounded. Logo tile 8px.
Icon style: Lucide-like 1.75–2px stroke, currentColor, sizes 16/20/24. Idle icons inherit #4D5761 or #111927. Active icons inherit #166A45 or #1B8354. Never multi-color icons except Google.

================================================================
8) STRICT REPLACE TABLE — old Wafier → new Nabbihni
When you find the left color anywhere (fill, stroke, text, gradient, effect, variable), change it to the right color. Then restyle the component to the usage rules above.

BRAND GREEN (same HEX, remap roles)
#F7FDF9 → #F7FDF9   keep, but only as quiet tint, not page canvas
#F3FCF6 → #F3FCF6   keep, but this is ACTIVE NAV / tonal fill, not generic alt background
#DFF6E7 → #DFF6E7   keep
#B8EACB → #B8EACB   keep
#88D8AD → #88D8AD   charts/ornament only
#54C08A → #54C08A   charts only
#25935F → #25935F   ACCENT only, not primary button
#1B8354 → #1B8354   PRIMARY everywhere a main action/logo/active rail exists
#166A45 → #166A45   hover + active text
#14573A → #14573A   pressed
#104631 → #104631   gradient depth
#092A1E → do not use as a full screen. Light UI never uses this as background.

NEUTRALS
#FCFCFD → PAGE canvas (this is now the app background, including mobile shell)
#F9FAFB → extra-soft only
#F3F4F6 → muted controls, NOT app background
#E5E7EB → default border
#D2D6DB → stronger border
#9DA4AE → placeholder/disabled
#6C737F → avoid; prefer #4D5761 for secondary
#4D5761 → secondary text
#384250 → labels
#1F2A37 → only high-contrast dark UI
#111927 → sidebar/strong title
#0D121C → default text
#FFFFFF / #FFF → cards, chrome, on-brand text

STATUS / EXTRAS
#F79009 → #DC6803
#F97316 → #DC6803
#C2410C → #B54708
#FFF7ED → #FFFAEB
#FED7AA → #FEDF89
#D92D20 → #D92D20   keep as danger
#EF4444 → #D92D20
#F04438 → keep only as error-500 input border; prefer #D92D20 for UI danger
#F7D54D → #1B8354 or remove
#2563EB → #1570EF or #1B8354
#4285F4 #34A853 #FBBC05 #EA4335 → keep only on Google button, else primary green

AI / DARK ONE-OFFS
#0F1117 → #FCFCFD (light) or official dark canvas, never keep this hex
#1E2124 → #FFFFFF (light cards/inputs)
Any neon blue glow → remove
Any gold highlight → remove

================================================================
9) SCREEN-BY-SCREEN
Login: white/light canvas #FCFCFD, brand mark #1B8354, primary CTA #1B8354, inputs white/#E5E7EB, secondary text #4D5761. No green mesh overload; if a mesh exists, use very soft sa-600/400/800 at 8–12% only.
Logged-in desktop: white 280px sidebar, white 64px topbar, content #FCFCFD, cards white, search muted.
Logged-in mobile: same colors, 64px-related chrome, bottom capsule white 85% blur, active #1B8354.
Forms/modals: white surface, #E5E7EB border, small #101828 shadow, primary/destructive buttons as specified.
Charts: green series only + gray axis #E5E7EB / labels #4D5761.
Alerts: warning/success/danger/info as specified. No orange budget language.
Assistant: same shell as the rest of the app. No black stage.

================================================================
10) VARIABLES TO CREATE / RENAME IN FIGMA
Create these color styles and bind every layer to them. Delete leftover Wafier styles.

primary            #1B8354
primary-hover      #166A45
primary-pressed    #14573A
primary-soft       #F3FCF6
primary-soft-text  #166A45
accent             #25935F

background         #FCFCFD
surface            #FFFFFF
surface-muted      #F3F4F6
border             #E5E7EB

text               #0D121C
text-muted         #4D5761
text-inverse       #FFFFFF

success            #079455
warning            #DC6803
danger             #D92D20
info               #1570EF

ai-background      = background   (#FCFCFD)   ← not a separate dark world
ai-surface         = surface      (#FFFFFF)

Also keep the full sa-25…sa-950 and gray-25…gray-950 scales as library colors, used only as specified.

================================================================
11) DONE CRITERIA
- No #F79009, #F97316, #C2410C, #FFF7ED, #FED7AA, #F7D54D, #EF4444, #0F1117, #1E2124, #2563EB left in the file (except a real Google button if present).
- Page canvas is #FCFCFD, cards/sidebar/topbar are #FFFFFF, primary actions are #1B8354.
- Sidebar active state is #F3FCF6 + #166A45 + 3px #1B8354 rail.
- Typography is IBM Plex Sans Arabic. Radius 12px language. Shadows use #101828.
- Assistant matches the logged-in product, not a dark Wafier overlay.
- Mobile and desktop share the same tokens.

Execute the replacement across every page, component, variant, and local style. Then scan leftover unique fills and convert any survivor to the nearest Nabbihni token.