# Reskin → Paid Wireframes Alignment

**Brand spec in-repo:** [`MASTER.md`](./MASTER.md) — typography, colors, and icon keys from a **historical** extract of the external [UAGC 7 JDI EDU Website Reskin](https://www.figma.com/design/c4O4uPeilJDBZFjARNnt65/-UAGC-7-JDI--EDU--Website-Reskin?node-id=7078-2) file. **This team did not create that Figma file and cannot open or sync it** (no Figma/MCP access). Treat `MASTER.md` + live verification in our wireframes file as the working source of truth.

**Editable Figma:** [UAGC Paid page templates 3 — Wireframe](https://www.figma.com/design/HoSMZOSnKSVgUXlskHv9tS/UAGC-Paid-page-templates-3--%E2%80%94-Wireframe?node-id=0-1) in [team project 598288008](https://www.figma.com/files/team/954051891409200881/project/598288008?fuid=1052358699765663783). File registry: [`FIGMA-FILES.md`](./FIGMA-FILES.md).

| Role | Where | Access |
|------|--------|--------|
| **Token + type ramp (repo)** | [`MASTER.md`](./MASTER.md) | Maintained here; verify scales against wireframes local styles |
| **External brand Figma (reference only)** | `c4O4uPeilJDBZFjARNnt65` | ❌ No team access — link for stakeholders who own the file |
| **Paid templates** (v5 / v7 / OCC wireframes + componentry) | `HoSMZOSnKSVgUXlskHv9tS` | ✅ Editable (MCP + design) |

---

## Typography

### Brand typography ramp ([`MASTER.md`](./MASTER.md) — originally from Reskin `7078:2`)

| Role | Figma font | Desktop scale (size / line) |
|------|------------|-----------------------------|
| H1, H1 Small, H2 | Proxima Nova **Extra Condensed** Extrabold | 48/56, 32/40, 36/48 |
| H3–H5 | Proxima Nova **Semibold** | 32/40 … 24/32 |
| Body, eyebrow | Proxima Nova Regular / Semibold | 16/24 default body |

**Rule:** Extra Condensed is **headlines only** — never body copy.

### Freshness check (2026-06-16)

| Source | Result |
|--------|--------|
| External Reskin file `c4O4uPeilJDBZFjARNnt65` | ❌ **No team access** — file not created by this project; do not use MCP or Figma pulls against it |
| Wireframes file `HoSMZOSnKSVgUXlskHv9tS` — `getLocalTextStylesAsync()` | ✅ **12 `Desktop/*` styles** — size/line match [`MASTER.md`](./MASTER.md) desktop table exactly |
| [`MASTER.md`](./MASTER.md) desktop + mobile tables | ✅ Repo source of truth for type ramp (aligned to wireframes local styles) |
| `~/uagc-prototypes` `.type-h1`–`.type-h5`, `.type-eyebrow`, `.type-quote`, `.type-meta` | ✅ Mobile + desktop px match `MASTER.md` |
| `~/uagc-prototypes` `.type-body` | ✅ Fixed 2026-06-01 — **16/24** at all breakpoints (Reskin **P Small**) |

**Wireframes local text styles (desktop, verified):**

| Style | Size / line | Style font in file* |
|-------|-------------|---------------------|
| `Desktop/H1 Default` | 48 / 56 | Inter Extra Bold |
| `Desktop/H1 Small` | 32 / 40 | Inter Extra Bold |
| `Desktop/H2` | 36 / 48 | Inter Extra Bold |
| `Desktop/H3` | 32 / 40 | Inter Semi Bold |
| `Desktop/H4` | 28 / 40 | Inter Semi Bold |
| `Desktop/H5` | 24 / 32 | Inter Semi Bold |
| `Desktop/P Quote` | 32 / 40 | Inter Regular |
| `Desktop/P Big` | 24 / 32 | Inter Regular |
| `Desktop/P Medium` | 20 / 24 | Inter Regular |
| `Desktop/P Small` | 16 / 24 | Inter Regular |
| `Desktop/P Micro` | 14 / 18 | Inter Regular |
| `Desktop/Eyebrow` | 16 / 24 | Inter Semi Bold |

\*Figma text-style family is **Inter** in the wireframes file; Reskin spec uses **Proxima Nova** — canvas/web stand-ins remain **Fira Sans Extra Condensed / Montserrat / Fira Sans** per `MASTER.md`.

### Wireframes file (`HoSMZOSnKSVgUXlskHv9tS`) — current state

| Item | Status |
|------|--------|
| Local text styles `Desktop/H1 Default` … `Desktop/Eyebrow` (12) | ✅ Present — size/line match Reskin desktop ramp |
| **`Mobile/H1 Default` … `Mobile/Eyebrow`** | ✅ **12 styles** added 2026-06-01 (`Inter` stand-in, size/line per `MASTER.md` mobile table) |
| Web font stand-ins on canvas (Fira Sans Extra Condensed, Montserrat, Fira Sans) | ✅ Matches [`MASTER.md`](./MASTER.md) Figma→web mapping |
| Wireframe text **bound** to local text styles | ⚠️ Mostly **unbound** — manual font/size on clones |

### Actions

1. When building or refreshing wireframes/componentry, apply **`Desktop/*`** (≥1024) and **`Mobile/*`** (<1024) text styles — do not hand-set font sizes. Both ramps now exist in `HoSMZOSnKSVgUXlskHv9tS` (24 local styles total).
2. Hero H1 on paid pages: **Fira Sans Extra Condensed 800** (web) ≈ Reskin H1 Small/H1 Default depending on breakpoint — document per template in `design-system/pages/<route>.md`.
3. Code in `~/uagc-prototypes` should use `.type-h*` utilities tied to the same scale in `MASTER.md`.

---

## Colors

### Reskin spec

| Token | Hex | Use |
|-------|-----|-----|
| `uagc-navy` | `#0C234B` | Brand sections, headers, dark UI |
| `uagc-red` | `#AB0520` | Primary CTA, links (Arizona Red) |
| `uagc-crimson` | `#C10121` | Accent / dividers |
| `text-primary` | `#111111` | Body on light |
| `text-muted` | `#53565A` | Secondary copy |
| `surface-light` | `#F1F1F0` | Tables, light panels |
| `border-light` | `#D0D0CE` | Rules, card strokes |

### Wireframes file — current state (updated 2026-06-16)

| Item | Status |
|------|--------|
| **`UAGC Tokens`** variable collection | ✅ **33 variables** (15 color, 12 spacing, 6 radius) in `HoSMZOSnKSVgUXlskHv9tS` |
| **Color tokens** | ✅ `uagc-navy`, `uagc-red`, `uagc-crimson`, `uagc-gold`, `uagc-sky`, `uagc-surface`, `uagc-light-gray-30`, `uagc-visited`, `text-primary`, `text-dark`, `text-muted`, `border-light`, `surface-light`, `white`, `black` |
| **Spacing tokens** | ✅ 12 values: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96 (scopes: WIDTH_HEIGHT, GAP) |
| **Radius tokens** | ✅ `radius/sm` (6), `radius/md` (8), `radius/lg` (12), `radius/xl` (16), `radius/2xl` (24), `radius/full` (9999) |
| **Effect styles** | ✅ `shadow/sm`, `shadow/md` |
| Layers **bound** to color variables | ⚠️ Many fills still hard-coded hex from HTML capture |
| Navy `#0C234B`, muted `#53565A`, white | ✅ Dominant on wireframes |
| **`#EF9600`** (gold/orange) on RFI/CTAs | ✅ Token `uagc-gold` added — used for paid CTA accents |
| Capture artifacts (`#faf9f7`, `#f0eeeb`, `#1a3a6b`, …) | ⚠️ Replace with token variables where possible |

### Actions

1. Bind section fills, text, and strokes to **`UAGC Tokens`** (or publish Reskin library variables into wireframes file when available).
2. **Paid prototypes (`~/uagc-prototypes`) — current (Jun 2026):**
   - **Typography:** Fira Sans + Fira Sans Extra Condensed + Montserrat (`.type-h1`, `.type-h1-sm`, body scale in `globals.css`) — aligned to Reskin scale via web fonts.
   - **Color / CTAs:** Reverted to **paid-landing gold** (`#EF9600` on RFI, Apply, and primary CTAs; navy text on gold) — **not** the strict Reskin navy/sky/red split (deferred until brand sign-off).
   - **Module backgrounds:** white + `#F1F1F0` (`uagc-surface`); navy bands for emphasis.
3. When brand approves Reskin CTA rules, update prototypes and Figma together (RFI navy, Apply sky, links red — see `MASTER.md` target palette).
4. No gradients, alpha overlays, or decorative shadows unless requested (project rule).

---

## Icons

### Reskin / UAGC libraries ([`MASTER.md` → Icons](./MASTER.md#icons))

- **UAGC DESIGN SYSTEM:** arrows, close, minus, social set (component keys in `MASTER.md`).
- **UAGC Library:** `Main Icons`, `small_button_icon`, icon+text blocks.
- **Guidelines:** SVG only, **24×24** default; navy or near-black on light; white on navy sections.

### Wireframes + prototypes — current state

| Item | Status |
|------|--------|
| Lucide / custom vectors in Next.js prototypes | ✅ Functional — **not** Reskin library components |
| Figma wireframes use captured icons | ⚠️ Not consistently swapped to published UAGC icon components |
| Accordion chevrons, trust badges, social | ⚠️ Audit per module; map to closest Reskin key |

### Actions

1. For **Figma componentry** handoff: prefer **UAGC Library** instances for repeated UI (chevron, close, trust, social) where a match exists.
2. For **code**: keep Lucide if faster, but match **stroke weight, size (24px), and fill color** to Reskin rules.
3. Do not use emoji as icons in Figma or production UI.

---

## Cross-file workflow (recommended)

```text
MASTER.md (in-repo tokens)  ──────────►  Wireframes (HoSMZOSnKSVgUXlskHv9tS)
         │                                  │ 24 local text styles (Desktop + Mobile)
         │                                  │ 33 UAGC Tokens variables (color/spacing/radius)
         │                                  │ 2 effect styles (shadow/sm, shadow/md)
         │                                  │ 68+ promoted components with descriptions
         │                                  │ 26 numbered pages (00–72)
         └──────────────────────────────────────────►  prototypes/ (canonical)
```

External Reskin Figma (`c4O4uPeilJDBZFjARNnt65`) — reference link only; **no team access**.

1. **Design** — Use [`MASTER.md`](./MASTER.md) + page specs before changing a module; verify scales in wireframes local styles when in doubt.
2. **Figma** — Edit only `HoSMZOSnKSVgUXlskHv9tS`; apply `Desktop/*` / `Mobile/*` text styles + color variables on new work.
3. **Handoff** — `design-system/pages/<route>.md` + `componentry/*-figma-build-guide.md` cite module IDs and token usage.
4. **Code** — `MASTER.md` + Tailwind extensions; no one-off hex unless listed as a paid exception.

---

## Alignment checklist (per template page)

Use before sign-off on `request-info-v5`, `degree-programs-v7`, or `online-college-courses-v5`:

- [ ] All headline text uses **Extra Condensed** (Figma) / **Fira Sans Extra Condensed 800** (web)
- [ ] H3–H5 use **Semibold** (Montserrat 600 on web)
- [ ] Body default **16/24** desktop, **14/18** mobile micro copy
- [ ] Section navy = `#0C234B`; body text `#111111` / `#53565A` on light
- [ ] Primary CTA color matches **documented** choice (red vs gold)
- [ ] Icons 24px; correct contrast on navy vs light
- [ ] `03` library previews are **rescaled editable clones** (not flattened PNG/SVG)
- [ ] Componentry matches **`13 · request-info-v5 / Componentry`** layout patterns for v5/v7

---

## Related files

| File | Purpose |
|------|---------|
| [`MASTER.md`](./MASTER.md) | Full token + icon key reference |
| [`pages/request-info-v5.md`](./pages/request-info-v5.md) | v5 module + UX spec |
| [`pages/degree-programs-v7.md`](./pages/degree-programs-v7.md) | v7 module + UX spec |
| [`pages/online-college-courses-v5.md`](./pages/online-college-courses-v5.md) | OCC lean spec |
| [`.cursor/skills/figma-landing-componentry/SKILL.md`](../.cursor/skills/figma-landing-componentry/SKILL.md) | How to build catalog + `03` library |
