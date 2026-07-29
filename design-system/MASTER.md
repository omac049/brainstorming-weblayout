# UAGC Design System — Global Source of Truth

> **Source:** Historical extract from external [UAGC 7 JDI EDU Website Reskin](https://www.figma.com/design/c4O4uPeilJDBZFjARNnt65/-UAGC-7-JDI--EDU--Website-Reskin?node-id=7078-2) (`c4O4uPeilJDBZFjARNnt65`). **This team does not own or have access to that Figma file** — maintain tokens here and in [`HoSMZOSnKSVgUXlskHv9tS`](./FIGMA-FILES.md).  
> **Last verified:** 2026-06-01 — desktop + mobile ramps match wireframes local text styles. See [`RESKIN-ALIGNMENT.md`](./RESKIN-ALIGNMENT.md).
> Figma Libraries: **UAGC DESIGN SYSTEM**, **UAGC Library**
>
> **Figma file registry:** [FIGMA-FILES.md](./FIGMA-FILES.md) — paid wireframes (`HoSMZOSnKSVgUXlskHv9tS`) in [team project 598288008](https://www.figma.com/files/team/954051891409200881/project/598288008?fuid=1052358699765663783). **Paid wireframes alignment:** [RESKIN-ALIGNMENT.md](./RESKIN-ALIGNMENT.md).  
> **Mobile UX contract:** [MOBILE.md](./MOBILE.md) — page shell, sticky stack, touch/type floors, Playwright CI.

---

## Color Palette

### Primary Colors

| Token               | Hex       | RGB             | Reskin Name       | Usage                                      |
|---------------------|-----------|-----------------|-------------------|--------------------------------------------|
| `uagc-navy`         | `#0C234B` | 12, 35, 75      | `arizona_blue`    | **Arizona Blue** — headlines on light, emphasis sections, RFI button bg |
| `uagc-navy-dark`    | `#05193C` | 5, 25, 60       | `arizona_blue_dark` | Dark variant — hover states on navy        |
| `uagc-navy-light`   | `#092E6C` | 9, 46, 108      | `arizona_blue_light` | Light variant — accents                   |
| `uagc-red`          | `#AB0520` | 171, 5, 32      | `arizona_red`     | **Arizona Red** — links (default), courtesy nav |
| `uagc-red-dark`     | `#990019` | 153, 0, 25      | `arizona_red_dark` | Dark variant — link hover states           |
| `uagc-crimson`      | `#C10121` | 193, 1, 33      | `arizona_red_light` | Light variant — dividers (sparingly)      |
| `uagc-sky`          | `#81D3EB` | 129, 211, 235   | `sky`             | **Sky Blue** — Apply Now button background |
| `uagc-sky-hover`    | `#43A9C8` | 67, 169, 200    | `sky_tint`        | Sky hover/pressed state                    |
| `uagc-gold`         | `#EF9600` | 239, 150, 0     | `orange`          | **Warning labels only** (Reskin); paid prototypes use for CTAs pending brand sign-off |

### Neutral Palette

| Token               | Hex       | RGB             | Reskin Name       | Usage                                      |
|---------------------|-----------|-----------------|-------------------|--------------------------------------------|
| `black`             | `#111111` | 17, 17, 17      | `black`           | Primary body text, headings                 |
| `text-muted`        | `#53565A` | 83, 86, 90      | `dark_gray`       | Secondary text, descriptions, captions      |
| `silver`            | `#98A4AE` | 152, 164, 174   | `silver`          | Disabled states, placeholder text           |
| `border-light`      | `#D0D0CE` | 208, 208, 206   | `light_gray`      | Dividers, borders, rules                    |
| `tan`               | `#D6D2C4` | 214, 210, 196   | `tan`             | Warm neutral accents                        |
| `surface-light`     | `#F1F1F0` | 241, 241, 240   | `light_gray_30`   | **Module backgrounds** — alternating with white |
| `white`             | `#FFFFFF` | 255, 255, 255   | `white`           | Page backgrounds, card surfaces             |

### Secondary Colors

| Token               | Hex       | RGB             | Reskin Name       | Usage                                      |
|---------------------|-----------|-----------------|-------------------|--------------------------------------------|
| `purple`            | `#621244` | 98, 18, 68      | `purple`          | **Visited link text only**                  |
| `blue`              | `#0076A8` | 0, 118, 168     | `blue`            | Info semantic, informational callouts        |
| `river`             | `#007D8A` | 0, 125, 138     | `river`           | Success semantic, confirmations              |
| `yellow`            | `#F9E17D` | 249, 225, 125   | `yellow`          | Highlight accents (sparingly)               |

### Semantic Colors

| Token               | Hex       | Reskin Role     | Usage                                      |
|---------------------|-----------|------------------|--------------------------------------------|
| `error`             | `#AB0520` | Error            | Form validation errors, destructive actions |
| `info`              | `#0076A8` | Info             | Informational messages, hints               |
| `warning`           | `#EF9600` | Warning          | Warning labels, caution states              |
| `success`           | `#007D8A` | Success          | Success confirmations, positive feedback    |

### Reskin CTA Rules (from Figma `c4O4uPeilJDBZFjARNnt65`)

| Element            | Background       | Text Color       | Notes |
|--------------------|------------------|------------------|-------|
| **RFI button**     | Arizona Blue `#0C234B` | White `#FFFFFF` | "Blue with White text" |
| **Apply Now button** | Sky `#81D3EB`  | Arizona Blue `#0C234B` | "Sky Blue with Arizona Blue text" |
| **Links**          | —                | Arizona Red `#AB0520` | Default inline links |
| **Visited links**  | —                | Purple `#621244` | Visited state only |
| **Headlines**      | —                | Arizona Blue or White | Dependent on background color |
| **Module backgrounds** | White `#FFFFFF` or Light_Gray_30 `#F1F1F0` | — | Arizona Blue for emphasis bands |
| **Courtesy Nav**   | —                | Arizona Red `#AB0520` | Active state dot/indicator |
| **Orange `#EF9600`** | —              | —                | **Warning labels only** — not for highlight or CTA use |
| **Purple `#621244`** | —              | —                | **Visited link text only** |

> **Paid prototype deviation (current):** Gold `#EF9600` is used for RFI/Apply CTAs + accent bars in `~/uagc-prototypes` pending brand sign-off on the strict Reskin navy/sky split. When approved, RFI → navy bg + white text, Apply → sky bg + navy text.

### Usage Guidelines

- **Dark sections** (`uagc-navy` background): use `#FFFFFF` text, avoid faint `text-white/50`–`text-white/70`
- **Light sections** (`#FFFFFF` or `#F1F1F0` background): use `#111111` primary text, `#53565A` muted
- **Links** (Reskin): `#AB0520` default; **visited** `#621244` (purple)
- **RFI buttons** (Reskin target): navy `#0C234B` background + white text
- **Apply Now buttons** (Reskin target): sky `#81D3EB` background + navy text
- **Paid prototypes** (`~/uagc-prototypes`): **gold** `#EF9600` CTAs + navy text — deferred until brand sign-off
- **Module backgrounds**: `#FFFFFF` and `#F1F1F0` (`light_gray_30`); `#0C234B` for emphasis bands
- **Courtesy nav** (section rail): Arizona Red `#AB0520`
- **Orange / Gold** (`#EF9600`): Reskin reserves for **warning labels only** — not highlight color
- **Minimum contrast**: 4.5:1 for body text (WCAG AA)

---

## Typography

### Font Families

| Family                          | Weights Used           | Role                                |
|---------------------------------|------------------------|-------------------------------------|
| **Proxima Nova Extra Condensed** | Extrabold (800)        | Headlines only (H1, H1 Small, H2)  |
| **Proxima Nova**                | Regular (400), Medium (500), Semibold (600) | H3–H5, paragraphs, UI labels, eyebrow |
| **Fira Sans**                   | Regular (400), Semibold (600) | Live Drupal site web-safe fallback  |

> **Font Mapping (Figma → Web)**:
> - Figma **Proxima Nova Extra Condensed Extrabold** → Web **Fira Sans Extra Condensed 800** (Google Font) — for H1, H1 Small, H2
> - Figma **Proxima Nova Semibold** → Web **Montserrat 600** (Google Font, live site uses "UAGC-Montserrat") — for H3–H5
> - Figma **Proxima Nova Regular/Medium** → Web **Fira Sans 400/500** (Google Font) — for paragraphs, body text
> - The live UAGC Drupal site loads "UAGC-Montserrat" (repackaged Montserrat from gstatic) for headings and Fira Sans for body.

### 8pt Grid Rule

Typography scale follows the **8pt rule** — not strictly in font size, but in **line-height**, which defines the vertical space each text element occupies.

### Heading Scale — Desktop

| Style        | Font                           | Size | Line-Height | Weight    |
|--------------|--------------------------------|------|-------------|-----------|
| **H1 Default** | Proxima Nova Extra Condensed | 48px | 56px        | Extrabold |
| **H1 Small**   | Proxima Nova Extra Condensed | 32px | 40px        | Extrabold |
| **H2**         | Proxima Nova Extra Condensed | 36px | 48px        | Extrabold |
| **H3**         | Proxima Nova                 | 32px | 40px        | Semibold  |
| **H4**         | Proxima Nova                 | 28px | 40px        | Semibold  |
| **H5**         | Proxima Nova                 | 24px | 32px        | Semibold  |

### Heading Scale — Mobile

| Style        | Font                           | Size | Line-Height | Weight    |
|--------------|--------------------------------|------|-------------|-----------|
| **H1 Default** | Proxima Nova Extra Condensed | 32px | 40px        | Extrabold |
| **H1 Small**   | Proxima Nova Extra Condensed | 24px | 32px        | Extrabold |
| **H2**         | Proxima Nova Extra Condensed | 28px | 32px        | Extrabold |
| **H3**         | Proxima Nova                 | 26px | 32px        | Semibold  |
| **H4**         | Proxima Nova                 | 24px | 32px        | Semibold  |
| **H5**         | Proxima Nova                 | 20px | 24px        | Semibold  |

### Paragraph Scale — Desktop

| Style        | Font          | Size | Line-Height | Weight  | Notes          |
|--------------|---------------|------|-------------|---------|----------------|
| **P Quote**  | Proxima Nova  | 32px | 40px        | Regular |                |
| **P Big**    | Proxima Nova  | 24px | 32px        | Regular |                |
| **P Medium** | Proxima Nova  | 20px | 24px        | Regular |                |
| **P Small**  | Proxima Nova  | 16px | 24px        | Regular | Default body   |
| **P Micro**  | Proxima Nova  | 14px | 18px        | Regular | Captions, fine print |
| **Eyebrow**  | Proxima Nova  | 16px | 24px        | Semibold | UPPERCASE      |

### Paragraph Scale — Mobile

| Style        | Font          | Size | Line-Height | Weight  | Notes          |
|--------------|---------------|------|-------------|---------|----------------|
| **P Quote**  | Proxima Nova  | 24px | 32px        | Regular |                |
| **P Big**    | Proxima Nova  | 20px | 24px        | Regular |                |
| **P Medium** | Proxima Nova  | 16px | 24px        | Regular |                |
| **P Small**  | Proxima Nova  | 14px | 18px        | Regular | Default body   |
| **P Micro**  | Proxima Nova  | 12px | 16px        | Regular | Captions, fine print |
| **Eyebrow**  | Proxima Nova  | 16px | 24px        | Semibold | UPPERCASE      |

### Link States

| State        | Style                                     |
|--------------|-------------------------------------------|
| **Default** (`a:link`)     | `#AB0520` (Arizona Red), underline  |
| **Hover** (`a:hover`)      | `#990019` (Arizona Red Dark), underline + cursor pointer |
| **Active** (`a:active`)    | `#AB0520`, underline                |
| **Visited** (`a:visited`)  | `#621244` (Purple)                  |

---

## CSS Custom Properties (Tailwind / HTML Reference)

```css
:root {
  /* Brand — Primary */
  --uagc-navy: #0C234B;
  --uagc-navy-dark: #05193C;
  --uagc-navy-light: #092E6C;
  --uagc-red: #AB0520;
  --uagc-red-dark: #990019;
  --uagc-crimson: #C10121;
  --uagc-sky: #81D3EB;
  --uagc-sky-hover: #43A9C8;
  --uagc-gold: #EF9600; /* warning only in Reskin; CTAs in paid prototypes */

  /* Neutrals */
  --text-primary: #111111;
  --text-muted: #53565A;
  --silver: #98A4AE;
  --border-light: #D0D0CE;
  --tan: #D6D2C4;
  --surface-light: #F1F1F0;

  /* Secondary */
  --purple: #621244; /* visited links */
  --blue: #0076A8;   /* info */
  --river: #007D8A;  /* success */
  --yellow: #F9E17D;

  /* Semantic */
  --semantic-error: #AB0520;
  --semantic-info: #0076A8;
  --semantic-warning: #EF9600;
  --semantic-success: #007D8A;

  /* Typography — maps Figma Proxima Nova → Google Fonts equivalents */
  --font-heading-condensed: 'Fira Sans Extra Condensed', 'Proxima Nova Extra Condensed', sans-serif;
  --font-heading: 'Montserrat', 'Proxima Nova', sans-serif;
  --font-body: 'Fira Sans', 'Proxima Nova', sans-serif;
}
```

### Tailwind Extension

```js
// tailwind.config.js extend
{
  colors: {
    'uagc-navy': '#0C234B',
    'uagc-navy-dark': '#05193C',
    'uagc-navy-light': '#092E6C',
    'uagc-red': '#AB0520',
    'uagc-red-dark': '#990019',
    'uagc-crimson': '#C10121',
    'uagc-sky': '#81D3EB',
    'uagc-sky-hover': '#43A9C8',
    'uagc-gold': '#EF9600',
    'uagc-text': '#111111',
    'uagc-muted': '#53565A',
    'uagc-silver': '#98A4AE',
    'uagc-border': '#D0D0CE',
    'uagc-tan': '#D6D2C4',
    'uagc-surface': '#F1F1F0',
    'uagc-purple': '#621244',
    'uagc-blue': '#0076A8',
    'uagc-river': '#007D8A',
    'uagc-yellow': '#F9E17D',
  },
  fontFamily: {
    'heading-condensed': ['"Fira Sans Extra Condensed"', '"Proxima Nova Extra Condensed"', 'sans-serif'],
    'heading': ['"Montserrat"', '"Proxima Nova"', 'sans-serif'],
    'body': ['"Fira Sans"', '"Proxima Nova"', 'sans-serif'],
  },
}
```

---

## Icons

### Icon System Overview

The Reskin icon system is divided into **two categories**: Functional and Illustrative. Both can be used as SVG icons.

### Functional Icons — Feather Icons (NOT CHANGING)

**Source:** [Feather Icons](https://feathericons.com/) by Cole Bemis  
**Size:** 24×24 default viewBox, rendered at `w-6 h-6`  
**Stroke:** 2px stroke-width, `currentColor`

| Row | Icons |
|-----|-------|
| Navigation | `arrow-left`, `arrow-right`, `arrow-down`, `arrow-up`, `arrow-up-right`, `minimize-2`, `chevron-down`, `chevron-up`, `chevron-left`, `chevron-right`, `x`, `check` |
| UI | `user`, `play`, `phone`, `search`, `menu`, `sun`, `alert-circle`, `eye`, `eye-off`, `book-open`, `star`, `heart` |
| Actions | `message-circle`, `thumbs-up`, `trash-2`, `slash`, `printer`, `trending-up`, `lock`, `time` |
| Social | `facebook`, `twitter`, `instagram`, `linkedin`, `youtube` |

### Functional Nav Icons (Blue Nav Bar)

| Icon Name       | Purpose                       | Size  |
|-----------------|-------------------------------|-------|
| `chat`          | Chat / message circle         | 24×24 |
| `ShieldCheck`   | Military for Blue Nav Bar     | 24×24 |
| `Partnerships`  | Partnerships for Blue Nav Bar | 24×24 |
| `SignIn`        | Student Login for Blue Nav Bar | 24×24 |
| `Apply`         | Apply for Blue Nav Bar        | 24×24 |
| `Phone`         | Phone for Blue Nav Bar        | 24×24 |
| `search`        | Search for Blue Nav Bar       | 24×24 |

### Illustrative Icons (UPDATED)

Multi-size system — each illustrative icon ships in four sizes:

| Size Label | Dimensions | Use Case |
|------------|-----------|----------|
| **XL** | 128×128 (approx) | Hero / feature sections |
| **L** | 56×56 | Cards, list items |
| **M** | 24×24 | Inline with text |
| **S** | 16×16 | Compact / badge use |

#### Multi-Size Illustrative Set

| Icon Name | Sizes Available | Category |
|-----------|----------------|----------|
| Online Learning | XL, L, M, S | Education |
| Find Degree | XL, L, M, S | Discovery |
| Stories | XL, L, M, S | Testimonials |
| Credit | XL, L, M, S | Financial |
| Active Military | XL, L, M, S | Military |
| Military Family | XL, L, M, S | Military |
| Veteran | XL, L, M, S | Military |
| Aid | XL (128), L (56), M (24), S (16) | Financial |
| Calendar | XL (128), L (56), M (24), S (16) | Scheduling |
| Education | XL (128), L (56), M (24), S (16) | Education |
| Process | XL, L, M, S | Steps |
| Online Education | XL, L, M, S | Education |

#### Main Icons Set (56×56 standard)

| Icon Name | Token / Variant |
|-----------|----------------|
| Faculty | `faculty` |
| 24/7 Support (CHAMPS) | `Support-CHAMPS` |
| Study at Your Own Pace | `Convenient Flexible` |
| Tech Support | `Tech Support` |
| Flexible / Your Own Pace | `flexible-your-own-pace` |
| Degree Programs | `Degree Programs` |
| 24/7 Tutoring | `247-tutoring` |
| UAGC Promise | `uagc-promise` |
| Transfer-Friendly | `transfer` |
| Light Bulb | `Light Blub` |
| Celebrate | `Celebrate` |
| Check Mark | `Check Mark` |
| Work Life Credit | `work-life-credit` |
| Quality Value | `quality-value` |
| No Test | `no-test` |
| Military | `military` |
| Innovative Tech | `innovative-tech` |
| 100% Online | `All Online` |
| Accelerated Courses | `accelerated-coursees` |
| Library / Writing | `library-writing` |
| Net Price Calculator | `net price calc` |
| No Fee | `No Fee` |
| One Class at a Time | `one-class-at-a-time` |
| Services Included | `services-included` |
| Career Services | `career-services` |
| Graduation | `Graduation` |
| Accreditation | `accreditation` |
| Step 1–4 | `Step 1` … `Step 4` |
| Equality | `Equality` |

#### Number Icons (56×56)

| Number | Variant |
|--------|---------|
| 1 | `Number=One` |
| 2 | `Number=Two` |
| 3 | `Number=Three` |
| 4 | `Number=Four` |
| 5 | `Number=Five` |

### UAGC DESIGN SYSTEM Icons (Component Keys)

| Icon Name        | Component Key                              | Description              |
|------------------|--------------------------------------------|--------------------------|
| Icon/Arrows      | `e0cccffe449fe23561d76ba624e24b7eab00b955` | Accordion up/down arrows |
| icon.close       | `b3e6f96db7cbf919e14fd528400b638bce90f85b` | Close/dismiss            |
| icon.minus       | `19c5faacbe2c9dd50bdbbd1f4de1c8aa82638132` | Collapse/minus           |
| Facebook Icon    | `b95fe7abe685629a8f6399791364ee0765320bbb` | Social — Facebook        |
| Instagram Icon   | `a374af2f69c34149802df09e1e23dc84eb84e98d` | Social — Instagram       |
| Twitter Icon     | `3f42ff387758a5a791dcb196c86bd172b34a7ad9` | Social — Twitter/X       |
| Youtube Icon     | `b7bc18bfddcd43a6cae1cdda1346bded4ed2e3a1` | Social — YouTube         |
| Linkedin Icon    | `44131c1133817fa3d03341a8d38e829cd73eb760` | Social — LinkedIn        |

### UAGC Library Icons (Component Keys)

| Icon Name         | Component Key                              | Description              |
|-------------------|--------------------------------------------|--------------------------|
| Main Icons        | `96c195d2b7ac5fd8316d19eb4d7c5460d08a6b20` | Core icon set (variant set) |
| small_button_icon | `a78d2ddb318251c4b39c84ddfa40a9d85e49644d` | Button icon variants     |
| icons_text_block  | `edef84b28fff97d4a743ddde66d6723cecb4ff7b` | Icon + text block module |
| icon_text_block   | `3f28f8df6fad5c863273fd42e240301dca525df0` | Icon + text block module (alt) |

### Icon Guidelines

- **Source:** Feather Icons for functional; UAGC illustrative set for branded/category icons
- Use **SVG** format — no emoji icons in production UI
- Functional icons: **24×24** viewBox, 2px stroke, `currentColor`
- Illustrative icons: **XL** (128), **L** (56), **M** (24), **S** (16) — use Arizona Red `#AB0520` fill
- On dark backgrounds (`uagc-navy`): white icon fill/stroke
- On light backgrounds: `#0C234B` (navy) or `#111111` (near-black) fill/stroke
- Social icons: use official brand SVGs from Simple Icons or the UAGC library
- **Prototypes:** Lucide React icons acceptable if matching stroke weight (2px), size (24px), and fill color rules

---

## Components (Figma Library)

### UAGC DESIGN SYSTEM

| Component            | Key                                        | Type           |
|----------------------|--------------------------------------------|----------------|
| Button               | `d3fddaa5e33ff55eae8f34cbc8888b2e835c4ed5` | Component Set  |
| Button/RFIsolid      | `a1ba20aad2495ceb2b59e1c27591f6c984e5dd1c` | Component Set  |
| Hero 2               | `b90ed68f30e574719267e5fefbf6c24615ef1beb` | Component      |
| UAGC Logo            | `6838644a19f3ce8d991b0c55ba057d3f7ccbe022` | Component      |
| Form/RFI Dropdown    | `aaefd9ded65446ba331e2bb5cbc591160c2d7307` | Component      |

### UAGC Library

| Component                  | Key                                        | Type           |
|----------------------------|--------------------------------------------|----------------|
| RFI/vertical               | `f68ba399063df4146aee8568d10ee54fbd7c0383` | Component Set  |
| accreditation_block        | `ec1abcd4e84c58400d37b6834d4fb3dc962c2dc8` | Component Set  |
| UAGC_logo                  | `ece9167648e5ed3518616a450074aa3cf04bab4f` | Component Set  |
| page_library_header        | `1930c74d58a7b02f4019f8865481fa5c7c0c94a6` | Component      |
| link_card                  | `a33259c34dba6cd838fd3668e474108ca426edba` | Component Set  |
| Scholarship banner         | `15de164ac8d6063ed0fd18b24a67bb7bd006fa64` | Component Set  |
| path_head                  | `49f9cf6f8e43ab232e2e7363c1fea770b5fd3969` | Component Set  |
| path_end                   | `5bd13e1a5870c4e182338498d090a7063a36e021` | Component Set  |
| completion_journey_layout  | `e19213d71a658064a35f24a5bfd0aaa7625915ab` | Component Set  |
| timeline_section           | `1793032a5e34f59c1fcbb6978e4b761ee46b21d1` | Component Set  |
| radio_input                | `d33ddf5debbaa03e9c5c1b2acddaed9f4baf7f22` | Component Set  |

---

## WYSIWYG / HTML Content Styles

The Figma file documents styled content blocks for the Drupal WYSIWYG editor:

- **Bold / Italic / Underlined / Strikethrough** — standard text decorations
- **Headlines** within content (H2–H5 scale)
- **Paragraphs** — body text at `P Small` (16/24)
- **Blockquotes** — left border `#0C234B`, indented
- **Bulleted lists** — 8px circle bullet, 32px left indent
- **Numbered lists** — numeric prefix, 32px left indent
- **Images with captions** — full-width, caption below at `P Micro` (14/18)
- **Embedded video** — play button overlay, title + duration below
- **Tables** — navy header (`#0C234B`), alternating rows, `P Micro` (14/18) cell text
- **Horizontal divider** — centered 400px rule

---

## Page-Specific Specs

| Page | Dev handoff | Figma componentry | JSON manifest |
|------|-------------|-------------------|---------------|
| `request-info-v5` | [pages/request-info-v5.md](./pages/request-info-v5.md) | [Figma file HoSMZOSnKSVgUXlskHv9tS](https://www.figma.com/design/HoSMZOSnKSVgUXlskHv9tS) · [build guide](./componentry/request-info-v5-figma-build-guide.md) | [componentry/request-info-v5-modules.json](./componentry/request-info-v5-modules.json) |
| `degree-programs-v7` | [pages/degree-programs-v7.md](./pages/degree-programs-v7.md) | [Figma file HoSMZOSnKSVgUXlskHv9tS](https://www.figma.com/design/HoSMZOSnKSVgUXlskHv9tS) · page `23 · degree-programs-v7 / Componentry` — **19** desktop cards, **18** mobile cards, **19** desktop + **17** mobile library Components · [build guide](./componentry/degree-programs-v7-figma-build-guide.md) | [componentry/degree-programs-v7-modules.json](./componentry/degree-programs-v7-modules.json) |
| `online-college-courses-v5` | [pages/online-college-courses-v5.md](./pages/online-college-courses-v5.md) | [Figma file HoSMZOSnKSVgUXlskHv9tS](https://www.figma.com/design/HoSMZOSnKSVgUXlskHv9tS) · page `33 · online-college-courses-v5 / Componentry` — **13** desktop cards + **FORM-05** mobile, promoted **`03`** Components incl. **SKEPT-01** · [build guide](./componentry/online-college-courses-v5-figma-build-guide.md) | [componentry/online-college-courses-v5-modules.json](./componentry/online-college-courses-v5-modules.json) |

---

## Design Token Variables (Figma)

The wireframes/componentry file **`HoSMZOSnKSVgUXlskHv9tS`** now includes a local **UAGC Tokens** variable collection (added Phase 2):

| Category | Count | Examples |
|----------|-------|----------|
| Color | 9 | `uagc-navy`, `uagc-red`, `text-primary`, `surface-light` |
| Spacing | 7 | 8pt-grid gaps and section padding |
| Text styles | 24 | `Desktop/*` + `Mobile/*` heading and paragraph ramps |

Bind new componentry to these variables and text styles where possible. Token definitions are maintained in **`MASTER.md`** (external Reskin Figma is not accessible to this team).

---

## Design Principles

1. **8pt grid** — all spacing, padding, and line-heights align to 8px increments
2. **Mobile-first** — typography scales down for mobile (see mobile tables above)
3. **Flat colors only** — no gradients, alpha overlays, backdrop-blur, or decorative shadows unless explicitly requested
4. **Proxima Nova Extra Condensed for headlines only** — never use condensed for body text
5. **High contrast** — dark sections need solid white text, not faint opacity variants
6. **Consistent icon sizing** — 24x24 viewBox standard
