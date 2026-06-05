---
name: clone-fidelity-audit
description: Audit a cloned page against the live original for visual fidelity gaps — fonts, icon systems, computed CSS values, missing sections, and layout drift. Use when the clone "looks different" or after completing a clone-website pass. Fixes the common failure modes where AI cloning substitutes generic elements for site-specific ones.
user-invocable: true
argument-hint: "<route-path> (e.g. request-info-v5)"
---

# Clone Fidelity Audit

You are about to audit the clone at `$ARGUMENTS` against the live UAGC page for visual fidelity.

This skill addresses the systematic failures that make clones look "off" even when content is correct — wrong fonts, generic icon libraries substituted for site-specific icon fonts, Tailwind approximations instead of exact computed values, and missing/fabricated sections.

## UAGC Design System Reference (Source of Truth)

These values come from `getComputedStyle()` on the live `uagc.edu` pages. The clone MUST match these — not approximate them.

### Fonts

| Role | Family | Weights Used | Notes |
|------|--------|-------------|-------|
| **Headings** | `UAGC-Montserrat, sans-serif` | 500, 600, 700 | Custom variant — NOT Google Fonts Montserrat. Self-hosted from `/themes/uagc/dist/` |
| **Body** | `"Fira Sans", Arial, sans-serif` | 300, 400, 500, 600, 700 | Self-hosted woff2 from `/themes/uagc/dist/` |
| **Icons** | `icomoon` | normal | Custom icon font — NOT Lucide, NOT Font Awesome, NOT Heroicons |

**Critical:** The clone currently uses only Fira Sans for everything. Headings need UAGC-Montserrat. The Google Fonts version of Montserrat has different metrics — use `next/font/local` if self-hosting or `next/font/google` with Montserrat as a close fallback, but document the delta.

### Typography Scale (Computed from Live Site)

| Element | font-size | font-weight | line-height | letter-spacing |
|---------|-----------|-------------|-------------|----------------|
| H1 (hero) | 22.5px | 500 | 22.5px | normal |
| H2 (section) | 27px–32px | 500–600 | 1.2–1.3 | normal |
| Body text | 18px | 400 | 27px (1.5) | normal |
| Nav phone | 20.25px | 400 | normal | wide |
| Bullet title | 16px | 700 | 24px | normal |
| Bullet desc | 16px | 400 | 24px | normal |
| Footer body | 14px | 400 | 21px | normal |
| Form labels | 14px | 500 | 18px | normal |

**These are NOT Tailwind size classes.** `text-lg` is 18px/28px — but the live site uses 18px/27px. Extract and set explicit values.

### Icon System: icomoon

The original UAGC site uses the **icomoon** icon font for all inline icons (checkmarks, bullets, navigation arrows, form decorations). Key facts:

- Font file: `/themes/uagc/dist/icomoon.28d2e065.ttf` (truetype) + `.woff` variant
- Icons rendered via CSS `::before` pseudo-elements with `font-family: icomoon` and Unicode content codes
- Checkmark icon: a filled circular check or simple check glyph — NOT the thin-stroked Lucide `<Check>` component
- Bullet icons: solid filled shapes, not outline/stroke-based

**What to do in the clone:**
1. Download the icomoon font files from the live site
2. Create `@font-face` declarations in `globals.css`
3. Build a `src/components/icons/IcomoonIcon.tsx` component that renders the correct glyphs
4. OR — if the specific glyphs are simple enough — create equivalent SVG components that match the visual weight (filled, not stroked)

**What NOT to do:**
- Do NOT substitute Lucide icons — they have a completely different visual language (thin strokes vs solid fills)
- Do NOT use generic Unicode checkmarks
- Do NOT use Heroicons, Phosphor, or any other open-source icon library as a substitute

### Colors (from extraction)

| Token | Hex | RGB |
|-------|-----|-----|
| Navy (primary) | #0C234B | rgb(12, 35, 75) |
| Red (accent) | #AB0520 | rgb(171, 5, 32) |
| Gold (CTA) | #EF9600 | rgb(239, 150, 0) |
| Gray (body text) | #53565A | rgb(83, 86, 90) |
| Beige | #D6D2C4 | rgb(214, 210, 196) |
| Dark (foreground) | #111111 | rgb(17, 17, 17) |
| White (background) | #FFFFFF | rgb(255, 255, 255) |
| Light | #FEFEFE | rgb(254, 254, 254) |

### Header

| Property | Live Value |
|----------|-----------|
| Height | 96px |
| Position | fixed |
| z-index | 100 |
| max-width | 1920px |
| Border | 2px bottom, red (#AB0520) |
| Background | white (scrolled state) / transparent (initial, on hero pages) |

### Footer Structure

The footer on paid landing pages (`/success/...`) includes:
1. **WSCUC accreditation logo** (`/themes/uagc/src/images/WSCUC-Logo.png`) + accreditation text
2. **UA affiliation** — UA horizontal logo + "We are affiliated with the University of Arizona" link
3. **Footnotes** — numbered disclaimers about class lengths, state availability, transfer credits
4. **Legal bar** — address + privacy/terms/SMS links separated by pipes
5. **No sitemap links** — paid pages have minimal footers (no navigation columns)

## Audit Procedure

### Step 1: Section Inventory Diff

Compare the sections present on the LIVE page vs the CLONE, in order:

1. Open `docs/research/crawled/<slug>-content.md` for the definitive section list
2. Open `src/app/<slug>/page.tsx` for what the clone renders
3. For each section on the live page, verify it exists in the clone with correct heading text
4. Flag: **MISSING** sections, **FABRICATED** sections (in clone but not on live), **REORDERED** sections

**Common failure:** The clone-website skill sometimes invents sections that don't exist (e.g., "Our Students are Going Places" testimonial carousel when the original has a simple blockquote). Or it omits sections (e.g., "Make an Investment in You" with its sub-sections).

### Step 2: Font Audit

For each text element visible in the clone:

1. Check if headings use `font-heading` class → verify this maps to UAGC-Montserrat (not Fira Sans)
2. Check all `font-size` values against the computed scale above
3. Check `font-weight` — the original uses 500 (medium) for most headings, not 700 (bold)
4. Check `line-height` — tight headings use 1.0–1.2, body uses ~1.5

**Common failure:** Clone uses `font-bold` (700) where original uses `font-medium` (500). Clone uses Tailwind `text-2xl` (24px) where original uses 27px.

### Step 3: Iconography Audit

For every icon rendered in the clone:

1. Identify if it's from Lucide, Heroicons, or another generic library
2. Check the equivalent element on the original — is it an icomoon glyph?
3. If yes: replace with the correct icomoon glyph or a visually-matched SVG (filled, correct weight)
4. Pay special attention to:
   - Checkmarks in bullet lists (should be filled/solid, not thin strokes)
   - Value prop icons (the original uses specific custom SVGs, not generic library icons)
   - Navigation/UI icons (arrows, phone icon in header)

### Step 4: Computed CSS Comparison

For each section, use browser MCP to extract actual computed styles from the LIVE page and compare to clone:

```javascript
// Run on live page section container
(function(selector) {
  const el = document.querySelector(selector);
  if (!el) return 'NOT FOUND: ' + selector;
  const cs = getComputedStyle(el);
  return JSON.stringify({
    fontSize: cs.fontSize,
    fontWeight: cs.fontWeight,
    fontFamily: cs.fontFamily,
    lineHeight: cs.lineHeight,
    letterSpacing: cs.letterSpacing,
    color: cs.color,
    backgroundColor: cs.backgroundColor,
    padding: cs.padding,
    margin: cs.margin,
    maxWidth: cs.maxWidth,
    gap: cs.gap,
    display: cs.display,
    gridTemplateColumns: cs.gridTemplateColumns
  }, null, 2);
})('SELECTOR');
```

Compare these values to what the Tailwind classes in the clone produce. Fix any mismatches.

### Step 5: Form Fidelity

The RFI forms are critical conversion elements. Check:

1. **Form heading** — "Request More Information" (hero), "Request Information About Our Degrees" (mid-page)
2. **Step indicator** — "Step 1 of 2" appears on the hero form
3. **Field order** — matches exactly (First Name, Last Name, Phone, Email, State, Area of Interest, Degree)
4. **Conditional fields** — RN question appears for nursing programs, military question
5. **TCPA checkbox** — consent text matches verbatim
6. **Submit button** — text, color, shape match original
7. **Form container** — background color, padding, border-radius, shadow

### Step 6: Image & Asset Verification

1. Check that hero images exist at the correct paths in `public/images/`
2. Verify image aspect ratios match (original uses `styles/paid_hero_header_899x600/` — 3:2 ratio)
3. Check for missing SVGs (e.g., UAGC Promise icon, No Burden icon, flexibility icon)
4. Footer logos: WSCUC-Logo.png, ua_horiz_rgb_4.svg, UAGC_logo.svg

### Step 7: Responsive Check

At minimum, verify at:
- **Desktop 1440px** — side-by-side screenshot comparison
- **Mobile 390px** — stacked layout, no horizontal overflow

Use browser MCP or Playwright to capture both the live page and clone at these widths and do a visual diff.

## Known Fidelity Gaps on `request-info-v5`

These have been identified and need fixing:

| Area | Issue | Fix |
|------|-------|-----|
| Hero headline | Uses `font-bold` (700) + Fira Sans | Should be `font-medium` (500) + UAGC-Montserrat, 22.5px |
| Section headings | All use `font-bold` (700) + Fira Sans | Should be weight 500–600 + UAGC-Montserrat |
| Value prop icons | Lucide `GraduationCap`, `Calendar`, `DollarSign` | Should be site-specific SVGs or icomoon glyphs matching original |
| Bullet checkmarks | Lucide `Check` (thin stroke, weight 3) | Should be filled/solid check matching icomoon glyph |
| "Explore our accredited degree programs" | Uses custom "inline" RFI variant | Original has the same full RFI form as mid-page |
| "Make an Investment in You" section | **MISSING** from clone | Needs: intro paragraph, Tuition sub-section, Ways to Save (4 link buttons), UAGC Promise (3 SVG icons + text) |
| Testimonial section | Has heading "Our Students are Going Places" | Verify presence and exact format on original (blockquote, not carousel) |
| Footer WSCUC logo | **MISSING** | Add `/themes/uagc/src/images/WSCUC-Logo.png` |
| Footer layout | Simplified 3-column | Original has WSCUC + text left, UA logo right, footnotes below, legal bar |
| Header height | 56–64px | Should be 96px |

## Fixing Workflow

After identifying gaps, fix in this order (foundation → details):

1. **Fonts** — Add UAGC-Montserrat to `layout.tsx` + update `globals.css` `--font-heading`
2. **Icon system** — Replace Lucide imports with correct icomoon/SVG equivalents
3. **Missing sections** — Add "Make an Investment in You" and any other absent sections
4. **Remove fabricated sections** — Delete anything not on the original
5. **Typography values** — Replace Tailwind approximations with exact pixel values using arbitrary values `text-[22.5px]`
6. **Form variants** — Ensure each form instance matches the original's appearance at that position
7. **Footer** — Add WSCUC logo, fix layout
8. **Header** — Fix height to 96px
9. **Visual QA** — Screenshot diff at 1440px and 390px

## Pre-Completion Checklist

- [ ] Every section on the live page exists in the clone (no missing, no fabricated)
- [ ] Headings use UAGC-Montserrat (or documented close match), not Fira Sans
- [ ] All icons are site-specific (icomoon/custom SVG), not from Lucide/Heroicons
- [ ] Font sizes match computed values within 1px
- [ ] Font weights match exactly (500 vs 700 matters visually)
- [ ] Forms have correct headings, field order, step indicators, and legal text
- [ ] Footer has WSCUC logo, UA logo, accreditation text, footnotes, legal links
- [ ] Header is 96px tall with red bottom border
- [ ] Hero image exists and renders at correct aspect ratio
- [ ] Screenshot at 1440px matches original within acceptable tolerance
- [ ] Screenshot at 390px matches original within acceptable tolerance

## Reference Files

| What | Path |
|------|------|
| Extraction data | `docs/research/uagc/<slug>/extraction.json` |
| Crawled content | `docs/research/crawled/<slug>-content.md` |
| Live screenshots | `~/brainstorming-weblayout/output/playwright/screenshots/` |
| Contentsquare | `~/brainstorming-weblayout/output/playwright/screenshots/content_square/` |
| Audit HTMLs | `~/brainstorming-weblayout/output/playwright/screenshots/1-1-screenshots.html` |
| Clone source | `src/app/<slug>/page.tsx` + `src/components/` |
| Globals CSS | `src/app/globals.css` |
| Font config | `src/app/layout.tsx` |
