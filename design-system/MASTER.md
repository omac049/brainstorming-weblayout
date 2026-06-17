# UAGC Design System — Global Source of Truth

> **Source:** Historical extract from external [UAGC 7 JDI EDU Website Reskin](https://www.figma.com/design/c4O4uPeilJDBZFjARNnt65/-UAGC-7-JDI--EDU--Website-Reskin?node-id=7078-2) (`c4O4uPeilJDBZFjARNnt65`). **This team does not own or have access to that Figma file** — maintain tokens here and in [`HoSMZOSnKSVgUXlskHv9tS`](./FIGMA-FILES.md).  
> **Last verified:** 2026-06-01 — desktop + mobile ramps match wireframes local text styles. See [`RESKIN-ALIGNMENT.md`](./RESKIN-ALIGNMENT.md).
> Figma Libraries: **UAGC DESIGN SYSTEM**, **UAGC Library**
>
> **Figma file registry:** [FIGMA-FILES.md](./FIGMA-FILES.md) — paid wireframes (`HoSMZOSnKSVgUXlskHv9tS`) in [team project 598288008](https://www.figma.com/files/team/954051891409200881/project/598288008?fuid=1052358699765663783). **Paid wireframes alignment:** [RESKIN-ALIGNMENT.md](./RESKIN-ALIGNMENT.md).  
> **Mobile UX contract:** [MOBILE.md](./MOBILE.md) — page shell, sticky stack, touch/type floors, Playwright CI.

---

## Color Palette

### Brand Colors

| Token               | Hex       | RGB             | Usage                                      |
|---------------------|-----------|-----------------|--------------------------------------------|
| `uagc-navy`         | `#0C234B` | 12, 35, 75      | **Arizona Blue** — headlines on light, emphasis sections |
| `uagc-red`          | `#AB0520` | 171, 5, 32      | **Arizona Red** — Apply Now buttons (always red), links (Reskin target) |
| `uagc-gold`         | `#EF9600` | 239, 150, 0     | **RFI / Request Info CTAs only** — all Request Info buttons use gold `#EF9600` |
| `uagc-crimson`      | `#C10121` | 193, 1, 33      | Accent red — dividers (sparingly)           |
| `uagc-sky`          | `#81D3EB` | 129, 211, 235   | **Sky Blue** — Reskin target for Apply Now (not in prototypes yet) |
| `uagc-light-gray-30`| `#E2E9EB` | 226, 233, 235   | **Light_Gray_30** (UA Cool Gray) — alternating module backgrounds (Reskin) |
| `uagc-visited`      | `#533566` | 83, 53, 102     | Visited link text (Reskin target)           |
| `uagc-warning`      | `#EF9600` | 239, 150, 0     | Warning labels (Reskin); same hex as paid gold — context distinguishes use |

### Neutral Palette

| Token               | Hex       | RGB             | Usage                                      |
|---------------------|-----------|-----------------|--------------------------------------------|
| `text-primary`      | `#111111` | 17, 17, 17      | Primary body text, headings                 |
| `text-dark`         | `#011D27` | 1, 29, 39       | Link text, dark headings                    |
| `text-muted`        | `#53565A` | 83, 86, 90      | Secondary text, descriptions, captions      |
| `border-light`      | `#D0D0CE` | 208, 208, 206   | Dividers, borders, rules                    |
| `surface-light`     | `#F1F1F0` | 241, 241, 240   | Table rows, light backgrounds, badges       |
| `white`             | `#FFFFFF` | 255, 255, 255   | Page backgrounds, card surfaces             |
| `black`             | `#000000` | 0, 0, 0         | Icons, strokes, bullet points               |

### Usage Guidelines

- **Dark sections** (`uagc-navy` background): use `#FFFFFF` text, avoid faint `text-white/50`–`text-white/70`
- **Light sections** (`#FFFFFF` or `#F1F1F0` background): use `#111111` primary text, `#53565A` muted
- **Links** (Reskin target): `#AB0520` default; **visited** `#533566`
- **RFI / Apply / primary CTAs** (Reskin target): navy + white (RFI), sky + navy text (Apply)
- **Paid prototypes** (`~/uagc-prototypes`): **gold** `#EF9600` CTAs + navy text — typography uses Fira/Montserrat scale; color split deferred
- **Module backgrounds**: `#FFFFFF` and `#F1F1F0` (`surface-light`); `#0C234B` for emphasis bands
- **Courtesy nav** (section rail): gold active dot in prototypes; Reskin may use Arizona Red when approved
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
| **Default** (`a:link`)     | `#AB0520`, underline                |
| **Hover** (`a:hover`)      | `#AB0520`, underline + cursor pointer |
| **Active** (`a:active`)    | `#AB0520`, underline                |
| **Visited** (`a:visited`)  | `#011D27` (dark teal)               |

---

## CSS Custom Properties (Tailwind / HTML Reference)

```css
:root {
  /* Brand */
  --uagc-navy: #0C234B;
  --uagc-red: #AB0520;
  --uagc-crimson: #C10121;

  /* Text */
  --text-primary: #111111;
  --text-dark: #011D27;
  --text-muted: #53565A;

  /* Surfaces & Borders */
  --surface-light: #F1F1F0;
  --border-light: #D0D0CE;

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
    'uagc-red': '#AB0520',
    'uagc-crimson': '#C10121',
    'uagc-text': '#111111',
    'uagc-dark': '#011D27',
    'uagc-muted': '#53565A',
    'uagc-border': '#D0D0CE',
    'uagc-surface': '#F1F1F0',
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

### UAGC DESIGN SYSTEM Icons

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

### UAGC Library Icons

| Icon Name         | Component Key                              | Description              |
|-------------------|--------------------------------------------|--------------------------|
| Main Icons        | `96c195d2b7ac5fd8316d19eb4d7c5460d08a6b20` | Core icon set (variant set) |
| small_button_icon | `a78d2ddb318251c4b39c84ddfa40a9d85e49644d` | Button icon variants     |
| icons_text_block  | `edef84b28fff97d4a743ddde66d6723cecb4ff7b` | Icon + text block module |
| icon_text_block   | `3f28f8df6fad5c863273fd42e240301dca525df0` | Icon + text block module (alt) |

### Icon Guidelines

- Use **SVG** icons from the Figma component library — no emoji icons
- Consistent sizing: **24x24** default viewBox, rendered at `w-6 h-6`
- Social icons: use official brand SVGs from Simple Icons or the UAGC library
- On dark backgrounds (`uagc-navy`): white icon fill
- On light backgrounds: `#0C234B` (navy) or `#111111` (near-black) fill

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
