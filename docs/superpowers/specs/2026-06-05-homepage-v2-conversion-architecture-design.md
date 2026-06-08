# Homepage v2 — Conversion Architecture Design

> **Route:** `/organic/homepage-v2`
> **Status:** Design approved, pending implementation
> **Date:** 2026-06-05
> **Goals:** Reduce bounce, increase RFI conversions, differentiate vs SNHU/WGU/Purdue Global

---

## Problem Statement

The v1 organic homepage (13 modules) follows a thorough empathy-first narrative arc, but it reads like a brochure. Key issues:

1. **No above-the-fold action** — the hero is visually strong but passive; visitors can't do anything.
2. **RFI form buried at position 8 of 10** — visitors must scroll past 7 content sections before reaching the conversion point.
3. **No competitive framing** — value props are self-referential ("we offer X") without answering "why UAGC instead of SNHU/WGU?"
4. **Cost is a passive section** — the #1 objection (price) is addressed with static text cards, not an interactive tool.
5. **Trust signals diluted** — testimonials, accreditation, and news are spread across 3 separate sections.

## Design Strategy

Cut from 13 modules to 7. Add three new interactive components (micro-form, cost estimator, Quick View). Place conversion touchpoints at 3 scroll depths. Distribute FAQ answers contextually instead of a standalone block.

---

## Module Stack

| # | Module | Catalog ID | Type | v1 Equivalent |
|---|--------|-----------|------|---------------|
| — | SiteHeader | NAV-00 | Keep | NAV-00 |
| 1 | Hero with micro-RFI | HERO-V2 | **New** | HERO-ORG |
| 2 | Impact strip | IMPACT | Keep | ImpactStrip |
| 3 | Competitive comparison strip | COMPARE | **New** | VP-01 |
| 4 | Program explorer + Quick View | PROG-02 | **Enhanced** | PROG-01 |
| 5 | Interactive cost estimator | COST-EST | **New** | SAVE-01 |
| 6 | Social proof layer | PROOF | **Consolidated** | TRUST-CAROUSEL + HOME-NEWS + ACCR-01 |
| 7 | Closing RFI + inline FAQ | FORM-02+FAQ | **Merged** | FORM-02 + FAQ-01 |
| — | SiteFooter | FOOT-01 | Keep | FOOT-01 |
| — | Sticky RFI bar | FORM-05 | Keep | FORM-05 |

### Modules removed from v1

| v1 Module | Reason |
|-----------|--------|
| HomeDifferentiatorPathSection (HOME-PATH) | Path-finding absorbed by hero micro-form + program explorer Quick View |
| HomeNewsSection (HOME-NEWS) | Awards/rankings are nice-to-have; employer outcomes stats replace them in PROOF |
| AccreditationBand (ACCR-01) | Consolidated into PROOF trust badges row |
| VideoTestimonialSection (TRUST-CAROUSEL) | Consolidated into PROOF as curated 3-video strip |
| WaysToSaveSection (SAVE-01) | Replaced by interactive COST-EST |
| ValuePropsSection (VP-01) | Key data points preserved but reframed as competitive comparison |

---

## Section Specifications

### 1. HERO-V2 — Hero with Micro-RFI

**Component:** `HeroV2` (new)
**File:** `prototypes/src/components/organic/HeroV2.tsx`

#### Desktop (1440px)

- **Left column (55%):** Headline, subheadline, trust pills
- **Right column (45%):** Compact micro-form card on semi-transparent navy panel

#### Mobile (375px)

- Hero image with gradient overlay
- Headline + trust pills stacked
- Micro-form card inside the hero, below trust pills (visible without scrolling)

#### Headline

- New: *"Your Degree. Your Pace. Starting at $485/Credit."*
- Eyebrow: "University of Arizona Global Campus" (unchanged)

#### Subheadline

- *"54+ accredited programs — one class at a time, in 5-week courses that fit around your job, your family, and your life."* (unchanged)

#### Micro-form fields

| Field | Type | Required |
|-------|------|----------|
| First Name | text input | Yes |
| Email | email input | Yes |
| Area of Interest | select dropdown | Yes |

- CTA button: *"Get My Program Guide"* — gold (`#EF9600`) background, navy text
- On submit: smooth-scroll to `#rfi` section with name and area pre-filled in the full form

#### Preserved from v1

- Hero image (`/images/homepage-hero-proud.webp`), parallax effect
- Trust pills: `$485/credit`, `5-Week Courses`, `WSCUC Accredited`, `$0 to Apply`
- Section nav bar at bottom of hero
- `heroRef` for sticky bar visibility toggle

---

### 2. IMPACT — Impact Strip (unchanged)

**Component:** `ImpactStrip` (existing, no changes)
**File:** `prototypes/src/components/organic/ImpactStrip.tsx`

---

### 3. COMPARE — Competitive Comparison Strip

**Component:** `CompetitiveComparison` (new)
**File:** `prototypes/src/components/organic/CompetitiveComparison.tsx`

#### Desktop (1440px)

4-column comparison table:

| Dimension | UAGC | Typical Online School | Community College |
|-----------|------|----------------------|-------------------|
| Tuition | **$485/credit** | $600–$700/credit | $150–$300/credit (limited online) |
| Course Format | **1 class, 5 weeks** | 3–4 classes, 8–16 weeks | Fixed semester |
| Transfer Credits | **Up to 75%** | Varies, often ≤50% | Limited PLA |
| Entrance Exams | **None required** | SAT/GRE may be required | Placement tests |
| Accreditation | **WSCUC + Univ. of Arizona** | Varies | Regional |

- UAGC column: navy left border, subtle gold background tint
- Competitor columns: muted gray text (`#53565A`)
- Below table: *"Part of the University of Arizona — a top-ranked public R1 research university"* with UA shield mark

#### Mobile (375px)

Swipeable horizontal card stack. Each card = one comparison row with UAGC value in bold gold, competitors in muted text beneath.

#### Section heading

*"How UAGC Compares"* with accent bar

---

### 4. PROG-02 — Program Explorer with Quick View

**Component:** `ProgramExplorer` (enhanced) + `ProgramQuickView` (new)
**Files:**
- `prototypes/src/components/sections/ProgramExplorer.tsx` (add Quick View trigger)
- `prototypes/src/components/organic/ProgramQuickView.tsx` (new)

#### Quick View panel (desktop)

Slide-in from right, 480px wide, overlay with backdrop dim.

Content:
- Program title + degree level
- 3-line description
- Stats row: credit hours | estimated completion time | per-credit cost
- Top 3 career outcomes with median salary ranges
- Gold CTA: *"Request Info for This Program"* — pre-fills area of interest in RFI
- Text link: *"View Full Details"*

#### Quick View (mobile)

Bottom sheet, 85% viewport height, slides up. Swipe down or X to dismiss.

#### Unchanged

- Filter tabs (All, Business, Education, Healthcare, IT, etc.)
- Card grid layout
- Search functionality
- Section heading: *"Find Your Program"*

---

### 5. COST-EST — Interactive Cost Estimator

**Component:** `CostEstimator` (new)
**File:** `prototypes/src/components/organic/CostEstimator.tsx`

#### Inputs

| Input | Type | Options |
|-------|------|---------|
| Degree level | Toggle buttons | Associate / Bachelor's / Master's |
| Transfer credits | Range slider | 0–90 (step 5) |
| Financial aid | Multi-select chips | None / Scholarships / Employer reimbursement / Military benefits |

#### Credit requirements by degree level

| Degree | Total Credits |
|--------|--------------|
| Associate | 60 |
| Bachelor's | 120 |
| Master's | 36 |

#### Per-credit tuition

| Level | Rate |
|-------|------|
| Undergraduate | $485 |
| Graduate | $625 |

#### Aid reduction estimates (prototype display values)

| Aid Type | Estimated Annual Reduction |
|----------|--------------------------|
| None | $0 |
| Scholarships | $2,500/year (applied over estimated program duration) |
| Employer reimbursement | $5,250/year (IRS annual max, applied over estimated program duration) |
| Military benefits | Varies (show "Contact advisor for a personalized estimate") |

#### Live cost panel

| Row | Value |
|-----|-------|
| Total program credits | (from degree level) |
| Your transfer credits | -(slider value) |
| Credits remaining | (calculated) |
| Tuition at $X/credit | (calculated) |
| Estimated aid reduction | (calculated) |
| **Your estimated cost** | **(calculated, gold text, animated)** |
| Monthly estimate | ~(cost / estimated months, where months = remaining credits / 6 credits per 5-week term × 1.25 months per term) |

#### Desktop layout (1440px)

Two-column: inputs left (60%), live cost summary right (40%) in a navy card with white text, cost number in gold.

#### Mobile layout (375px)

Single column: inputs stack, cost summary as sticky bottom panel.

#### PLA callout

Inline tip near transfer credits slider: *"Did you know? Work experience, military training, and certifications can count as transfer credits through Prior Learning Assessment."*

#### CTA

Gold button: *"Get Your Personalized Financial Plan"* — scrolls to `#rfi` with context.

#### Trust line

*"86% of students receive financial aid. An advisor helps you find every dollar — no cost, no obligation."*

#### Inline FAQs (collapsed)

- "What financial aid options are available?"
- "How much does tuition cost?"

#### Section heading

*"See What Your Degree Could Cost"* with accent bar

---

### 6. PROOF — Social Proof Layer

**Component:** `SocialProofLayer` (new)
**File:** `prototypes/src/components/organic/SocialProofLayer.tsx`

Three stacked sub-modules within one section:

#### 6a. Video testimonial strip

- Section heading: *"Hear From Students Like You"*
- Desktop: row of 3 curated video cards
- Mobile: horizontal scroll
- Each card: thumbnail with play overlay, student name, degree, one-line quote
- Click opens video lightbox
- Data source: `HOME_VIDEO_TESTIMONIALS` (first 3 entries)

#### 6b. Trust badges row

- Desktop: horizontal row, centered — WSCUC seal | UA shield | IACBE badge | CCNE badge
- Mobile: 2x2 grid
- Below badges: *"Part of the University of Arizona — a top-ranked public R1 research university"*
- White background

#### 6c. Employer & outcomes bar

- Navy (`#0C234B`) background, white text
- 3 inline stats: *"1,500+ employer partners"* | *"98,000+ employers on Handshake"* | *"Lifetime career services"*
- Desktop: single centered row
- Mobile: vertical stack with dividers

#### Inline FAQs (collapsed)

- "Are online degrees respected by employers?"
- "Is UAGC accredited?"

---

### 7. FORM-02+FAQ — Closing RFI + Inline FAQ

**Components:** `RFIForm` (existing) + `FAQSection` (existing, curated subset)
**No new component file** — composed in the page file

#### Desktop (1440px)

Two-column on `#faf9f7` background:

- **Left (55%):** Full RFI form
  - Heading: *"Get Your Personalized Program Guide"*
  - Subhead: *"Takes under a minute — no obligation. An advisor will reach out with options that match your goals."*
  - Same fields and submit behavior as v1

- **Right (45%):** Compact FAQ accordion — top 5 questions:
  1. "How much does tuition cost?"
  2. "Can I transfer credits from another school?"
  3. "How long does it take to finish a degree?"
  4. "What financial aid options are available?"
  5. "Will I feel out of place going back to school?"
  - Below: *"See all frequently asked questions"* link expands remaining 6 FAQs inline

#### Mobile (375px)

Single column: FAQ accordion above form. Objection-busters prime the visitor, form is the final page action.

#### Shared section heading

*"Ready to Take the Next Step?"* with accent bar, centered, spans both columns on desktop.

---

## Conversion Touchpoints (3 depths)

| Depth | Location | CTA | Behavior |
|-------|----------|-----|----------|
| Top | Hero micro-form | "Get My Program Guide" | Smooth-scroll to #rfi, pre-fill name + area |
| Mid | Cost estimator | "Get Your Personalized Financial Plan" | Smooth-scroll to #rfi with context |
| Mid | Program Quick View | "Request Info for This Program" | Smooth-scroll to #rfi, pre-fill area |
| Bottom | Closing RFI form | "Request Information" | Submit → thank-you page |

---

## FAQ Distribution

Instead of a standalone 11-item FAQ block, questions are distributed contextually:

| FAQ Question | Location | Rationale |
|-------------|----------|-----------|
| "How much does tuition cost?" | COST-EST + Closing FAQ | Adjacent to cost calculator |
| "What financial aid options are available?" | COST-EST | Adjacent to aid selection |
| "Can I transfer credits from another school?" | Closing FAQ | Core conversion objection |
| "How long does it take to finish a degree?" | Closing FAQ | Core conversion objection |
| "Will I feel out of place going back to school?" | Closing FAQ | Emotional reassurance near form |
| "Are online degrees respected by employers?" | PROOF | Adjacent to employer stats |
| "Is UAGC accredited?" | PROOF | Adjacent to accreditation badges |
| Remaining 4 FAQs | Closing FAQ (expanded) | Available but not adding scroll weight |

---

## New Components to Build

| Component | File | Complexity |
|-----------|------|-----------|
| `HeroV2` | `components/organic/HeroV2.tsx` | Medium — extends OrganicHomeHero with micro-form |
| `CompetitiveComparison` | `components/organic/CompetitiveComparison.tsx` | Low — table/card layout |
| `ProgramQuickView` | `components/organic/ProgramQuickView.tsx` | Medium — slide panel + data display |
| `CostEstimator` | `components/organic/CostEstimator.tsx` | High — interactive inputs, live calculation, animation |
| `SocialProofLayer` | `components/organic/SocialProofLayer.tsx` | Medium — composition of sub-modules |

## Existing Components Reused

| Component | Changes |
|-----------|---------|
| `SiteHeader` | None |
| `SiteFooter` | None |
| `ImpactStrip` | None |
| `ProgramExplorer` | Add onClick handler to trigger Quick View |
| `RFIForm` | Add `initialValues` prop for pre-fill from hero/cost estimator |
| `RFIStickyBar` | None |
| `FAQSection` | Render with subset of items; add `expandable` behavior for "see all" |

---

## Design Tokens

All components use tokens from `design-system/MASTER.md`:

- **Colors:** `uagc-navy` (#0C234B), `uagc-gold` (#EF9600), `uagc-red` (#AB0520), `surface-light` (#F1F1F0), `text-primary` (#111111), `text-muted` (#53565A)
- **Typography:** Fira Sans Extra Condensed (headings), Montserrat (subheadings), Fira Sans (body)
- **Spacing:** 8pt grid
- **CTAs:** Gold (#EF9600) for RFI actions, red (#AB0520) for Apply actions

---

## Accessibility

- Skip link to `#main-content` (unchanged)
- All form inputs have associated labels
- FAQ accordions use `aria-expanded`, `aria-controls`
- Quick View panel manages focus trap and `aria-modal`
- Cost estimator slider has `aria-valuemin`, `aria-valuemax`, `aria-valuenow`, `aria-label`
- `prefers-reduced-motion` disables parallax and count animations
- Minimum 4.5:1 contrast ratio for all text (WCAG AA)

---

## Out of Scope

- Real API integration (form submits are prototype-only)
- Actual salary data from BLS (use representative ranges)
- A/B testing infrastructure
- Analytics event tracking
- CMS/Drupal implementation
