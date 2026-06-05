# request-info-v5 — Dev Handoff & Component Spec

> **Figma wireframes + componentry:** [request-info-v5 (HoSMZOSnKSVgUXlskHv9tS)](https://www.figma.com/design/HoSMZOSnKSVgUXlskHv9tS) — page **`02 - Componentry`** for module catalog; **`01b - Desktop 1440`** / **`01c - Mobile 375`** for templates.  
> **Figma build guide:** [componentry/request-info-v5-figma-build-guide.md](../componentry/request-info-v5-figma-build-guide.md) · **JSON manifest:** [componentry/request-info-v5-modules.json](../componentry/request-info-v5-modules.json)  
> **Foundation tokens:** [MASTER.md](../MASTER.md) (in-repo; external Reskin Figma not accessible)

---

## Purpose

This document is the **single source of truth** for implementing `request-info-v5` and reusing its modules across paid landing templates (`degree-programs-v7`, `online-college-courses-v5`, etc.). It covers module order, React component mapping, props, copy defaults, responsive rules, Figma library keys, and explicit do/don't constraints so dev and design stay aligned.

**Persona:** Career-advancement / paid-generic (Layout Score Builder preset).  
**Primary device:** Mobile-first (~375px); desktop reference 1440px.

---

## Page anatomy (top → bottom)

| # | Catalog ID | React component | Section anchor | Background |
|---|------------|-----------------|----------------|------------|
| 1 | NAV-01 | `Header` (`variant="reduced"`) | — | `#FFFFFF` |
| — | NAV-UX-01 | `SectionNav` | — | sticky pills |
| 2 | HERO-01 + FORM-01 | `HeroSection` + `RFIForm` (`mini`) | `#hero-rfi` | hero image + navy overlay |
| — | START-01 | `UpcomingStartDates` | — | `#FFFFFF` |
| 3 | TRUST-02 | `TrustStrip` (`variant="banner"`) | — | `#FFFFFF` |
| 4 | VP-01 | `ValuePropsSection` | `#why-uagc` | `#faf9f7` |
| — | BRIDGE-01 | `NextStepBridge` | → `#programs` | light |
| 5 | PROG-01 | `ProgramExplorer` (`compact`) | `#programs` | `#FFFFFF` |
| — | BRIDGE-01 | `NextStepBridge` (`variant="dark"`) | → `#careers` | navy |
| 6 | CAREER-01 | `CareerOutcomesSection` | `#careers` | `#0C234B` |
| 7 | SALARY-01 | `SalaryGrowthSection` | — | `#FFFFFF` |
| 8 | FIN-01 | `TuitionSection` | `#tuition` | `#FFFFFF` |
| 9 | CRED-01 | `EmployerCredentialSection` | `#credentials` | `#fdf8ef` |
| 10 | TRUST-01 | `TestimonialSection` | `#stories` | `#FFFFFF` |
| 11 | EMOT-01 | `EmotionalMotivationSection` | — | `#0C234B` |
| 12 | FORM-02 | `RFIForm` (`full`) + section wrapper | `#rfi` | `#faf9f7` |
| 13 | FAQ-01 | `FAQSection` | `#faq` | `#FFFFFF` |
| 14 | CTA-01 | Inline section in `page.tsx` | — | `#0C234B` |
| 15 | FOOT-01 | `Footer` | — | navy footer |
| 16 | FORM-05 | `RFIStickyBar` | — | fixed bottom (mobile) |

**Prototype-only (not in 26-module catalog):** `SectionNav`, `NextStepBridge`, `UpcomingStartDates`, `ScrollReveal` wrapper.

**Consolidation rule:** On v5, `ProgramComparisonSection` is **merged into** `CareerOutcomesSection` — do not add a separate comparison section adjacent to career outcomes.

---

## Global layout constraints

| Rule | Value |
|------|-------|
| Max content width | `max-w-[1440px]` centered |
| Horizontal padding | `px-4 sm:px-6 lg:px-8` |
| Main top offset (fixed header) | `pt-16 sm:pt-[72px] lg:pt-20` |
| Scroll margin for anchored sections | `scroll-mt-20` (hero RFI: `scroll-mt-24`) |
| Colors | Flat only — no gradients, alpha overlays, backdrop-blur, decorative shadows |
| Typography utilities | `.type-h*` do **not** set color — apply `text-white` or `text-uagc-navy` on the element |
| Dark section muted text | Use `#b8c5d9` or `#8a9bb5` — **not** `text-white/50`–`/70` |
| Touch targets | Minimum ~44px height on interactive controls (mobile) |
| Hero highlight pills | Minimum **13px** mobile, **14px** desktop |

---

## Module specifications

### NAV-01 — Header (reduced)

**File:** `src/components/shared/Header.tsx`

```tsx
<Header variant="reduced" />
```

| Prop | Value |
|------|-------|
| `variant` | `"reduced"` — logo + minimal actions; full nav hidden |

**Figma:** `page_library_header` (`1930c74d58a7b02f4019f8865481fa5c7c0c94a6`), `UAGC_logo`

---

### NAV-UX-01 — Section Nav

**File:** `src/components/shared/SectionNav.tsx`

```tsx
const PAGE_SECTIONS = [
  { id: "why-uagc", label: "Why UAGC" },
  { id: "programs", label: "Programs" },
  { id: "careers", label: "Careers" },
  { id: "tuition", label: "Tuition" },
  { id: "credentials", label: "Credentials" },
  { id: "stories", label: "Stories" },
  { id: "rfi", label: "Get Started" },
  { id: "faq", label: "FAQ" },
];
<SectionNav sections={PAGE_SECTIONS} />
```

Sticky horizontal pill nav; highlights active section on scroll.

---

### HERO-01 + FORM-01 — Hero + mini RFI

**Files:** `HeroSection.tsx`, `RFIForm.tsx`

```tsx
<HeroSection
  headline="Earn Your Degree 100% Online at UAGC"
  subheadline="Part of the University of Arizona enterprise. Flexible 5-week courses built for working adults — no SAT or GRE required, and your transfer credits count from day one."
  backgroundImage="/images/hero-v5-desktop.jpg"
  mobileBackgroundImage="/images/hero-v5-mobile.jpg"
  highlights={["5-Week Courses", "Transfer Up to 75% of Credits", "$0 to Apply"]}
>
  <div id="hero-rfi" className="flex w-full scroll-mt-24 flex-col gap-2">
    <p className="text-center text-sm font-semibold text-uagc-navy">
      Get a Personalized Program Guide
    </p>
    <p className="text-center text-xs leading-relaxed text-uagc-gray">
      See programs, costs, and transfer credit options tailored to you — no commitment required.
    </p>
    <RFIForm variant="mini" heroFormRef={heroFormRef} />
    <p className="text-center text-[0.6875rem] text-uagc-gray/80">
      Takes under 60 seconds. No obligation. No spam.
    </p>
  </div>
</HeroSection>
```

| Layout | Spec |
|--------|------|
| Desktop | ~75/25 split — image + headline left; form column **400–440px** |
| Mobile | Image band → navy highlight pill row → form below |
| Headline type | `.type-h1` / Fira Sans Extra Condensed 800 |
| Highlight pills | White/15 bg, white/25 ring, gold dot prefix; **do not cover faces** |

**Copy note:** Prototype now uses AGENTS.md target headline *"Earn Your Degree 100% Online at UAGC"* — confirmed via persona simulation (30 archetypes validated outcome-driven headline outperforms generic "Discover Online School Done Right").

**Figma:** `Hero 2` (`b90ed68f30e574719267e5fefbf6c24615ef1beb`), `RFI/vertical`, `Button/RFIsolid`, `Form/RFI Dropdown`

---

### FORM-01 / FORM-02 / FORM-05 — RFI variants

**File:** `src/components/shared/RFIForm.tsx`

| Variant | Use | Key behavior |
|---------|-----|--------------|
| `mini` | Hero | Two-step flow; pass `heroFormRef` for sticky bar |
| `full` | Mid-page `#rfi` | All fields; centered in 720–880px container |
| `inline` | Other templates | Horizontal compact |

**Fields (both steps):** `college_of_interest`, `firstname`, `lastname`, `email`, `phone`, `state`, `tcpa_checkbox` (+ optional `military_status`, `clientdegreeid`)

**FORM-05 — Sticky bar:**

```tsx
const heroFormRef = useRef<HTMLDivElement>(null);
// ...
<RFIStickyBar heroFormRef={heroFormRef} />
```

| Rule | Detail |
|------|--------|
| Visibility | **Only after scroll** past hero mini form |
| Hidden when | Hero form intersects viewport |
| Platform | Mobile-primary; safe-area inset bottom |

**Do not:** Show sticky bar on initial hero view.

---

### START-01 — Upcoming Start Dates

**File:** `src/components/sections/UpcomingStartDates.tsx`

```tsx
<UpcomingStartDates />
```

| Rule | Detail |
|------|--------|
| Dates shown | **Next two only** |
| Tone | Quiet urgency — informational |
| Do not | "Enroll now" CTA or enrollment pressure in TrustStrip third badge |

---

### TRUST-02 — Trust Strip (banner)

**File:** `src/components/sections/TrustStrip.tsx`

```tsx
<TrustStrip variant="banner" />
```

Default badges: WSCUC Accredited · 50+ Online Programs · Financial Aid Available

Third badge = **barrier-removal value prop**, not start dates.

Also reuse `TrustStrip` with `variant="sidebar"` in narrow hero panels (~380–460px) on other templates.

---

### VP-01 — Reasons to Choose UAGC

**File:** `src/components/sections/ValuePropsSection.tsx`

```tsx
<ValuePropsSection
  id="why-uagc"
  heading="Reasons to Choose UAGC"
  subheading="Everything you need to start strong, stay on track, and finish with a degree employers respect."
  highlightCards={[ /* 4 cards — see page.tsx */ ]}
  experienceCallout={{ /* PLA navy block */ }}
/>
```

**Card order (v5 prototype):**

1. Generous Transfer Credit Policy — stat `Up to 75%` (transfer credits, military, certs, PLA; free transcript review)
2. No Standardized Tests Required — stat `None` (experience > test scores)
3. One Focused Class at a Time — stat `5–6 wk` (built for work/family balance)
4. Transparent Costs, $0 to Start — stat `$0` (shows actual per-credit cost + 86% aid stat)

> **Design intent:** Cards now use specific, evidence-backed copy validated by 30-archetype persona simulation. First card explicitly names "Generous Transfer Credit Policy" per AGENTS.md. Fourth card addresses top simulation concern (cost transparency before form).

**Structure:**

| Element | Type class | Notes |
|---------|------------|-------|
| Section H2 | `.type-h2` | Condensed extrabold — **no** `font-medium` override |
| Card stat | `.type-stat` | Condensed display numerals |
| Card title | semibold body | |
| Experience callout | Navy block | PLA — "Your Experience Already Counts" |

**Do not:**

- Pass `bulletPoints` (duplicates TrustStrip)
- Add section-level RFI CTA (redundant near ProgramExplorer, mid-page RFI, sticky bar)
- Use gradients or decorative shadows

**Figma:** `icons_text_block`, `icon_text_block`; reference **RTB Modules** page for Why Choose patterns

---

### PROG-01 — Program Explorer (compact)

**File:** `src/components/sections/ProgramExplorer.tsx`

```tsx
<ProgramExplorer compact />
```

| Rule | Detail |
|------|--------|
| Copy | **50+ programs** (not 200+) |
| Transfer callout | **Off** on v5 (`showTransferCallout={false}` default) |
| Interaction | Searchable in-page catalog; **expandable rows** with rich detail |
| Do not | Per-program "Request Info" CTA — keep users on-page |

---

### CAREER-01 — Career Outcomes by Program

**File:** `src/components/sections/CareerOutcomesSection.tsx`

```tsx
<CareerOutcomesSection id="careers" className="scroll-mt-20" />
```

Includes:

- Comparison table (program → job titles → salary range → degree level)
- Handshake callout (**98,000+ employers**)

**Background:** `#0C234B` — all headings `text-white`, body `#b8c5d9`

**Do not:** Place separate `ProgramComparisonSection` next to this module.

**Lightcast widget:** Embed codes in repo root `EmbedCodes-LightcastWidget(Sheet1).csv` if integrating live data widget.

---

### SALARY-01 — Salary Growth by Degree

**File:** `src/components/sections/SalaryGrowthSection.tsx`

```tsx
<SalaryGrowthSection className="bg-white" />
```

Includes degree-tier cards, field tabs, lifetime earnings block.

**Source citation:** Link BLS earnings data **inline** (required for benchmark claims).

---

### FIN-01 — Tuition & Financial Aid

**File:** `src/components/sections/TuitionSection.tsx`

```tsx
<TuitionSection />
```

Default heading: `"Tuition & Financial Aid"` (changed from "Tuition, Aid, and Ways to Save").

**Layout: Unified vertical flow** (no split columns — top-to-bottom reading):

1. **Centered section header** — heading + subhead
2. **Pricing row** — 3 tier cards horizontal (`grid-cols-3`), even on mobile
3. **Bridge stat** — "86% of UAGC students receive financial aid" (centered, connects pricing to savings)
4. **Savings grid** — 3×2 on desktop (`lg:grid-cols-3`), 2-col tablet (`sm:grid-cols-2`), 1-col mobile

**Pricing tiers:** Undergrad `$485/credit`, Grad `$625/credit`, Application `$0` (gold accent).

**Six stat-forward savings cards (expandable — no outbound links):**

Each card is a `<div>` with a `<button>` disclosure. The stat is always visible (front-loaded for scannability), not hidden behind expansion. Content trimmed to 3 bullets per card (from 4) for faster consumption.

| # | Card | Stat | Stat Label | Tagline |
|---|------|------|-----------|---------|
| 1 | FAFSA & Federal Aid | `94%` | receive aid | Grants and low-interest loans — most students qualify |
| 2 | Scholarships | `$0` | to repay | Free money you never pay back |
| 3 | Military Benefits | `$250` | /credit | Reduced tuition and waived fees for service members |
| 4 | Employer Partners | `1,500+` | partners | Your employer may cover tuition |
| 5 | Transfer Credits | `41.5` | avg credits | Bring credits you've already earned |
| 6 | Prior Learning Credit | `6` | pathways | Turn work and military experience into credit |

**Design intent:** The split-column layout created a disjointed feel — clean pricing left, dense accordion stack right, with "6 Ways to Save" reading like a listicle jammed into the section. The vertical flow fixes this: cost → "most pay less" → here's how. The grid layout makes all 6 options scannable at a glance (stat visible without expanding), and the shorter content (3 bullets vs 4) respects mobile attention spans. No "6 Ways to Save" subheader needed — the grid IS the ways to save.

**Interaction:**
- Collapsed: icon + label + stat (always visible) + tagline + chevron
- Expanded: 3 check-marked bullet points + optional source citation
- Active card gets `border-uagc-navy` + `ring-1 ring-uagc-navy/10`, icon inverts to white-on-navy
- Hover (collapsed): `hover:border-uagc-navy/30`
- Multiple cards can be open simultaneously (independent disclosure)

**Responsive:**
- Mobile (< 640px): pricing 3-col (compact), savings 1-col
- Tablet (640px+): pricing 3-col, savings 2-col
- Desktop (1024px+): pricing 3-col, savings 3-col (2 rows)

---

### CRED-01 — Employer Credentials

**File:** `src/components/sections/EmployerCredentialSection.tsx`

```tsx
<EmployerCredentialSection className="bg-[#fdf8ef]" />
```

Stats: 98,000+ Handshake employers · 1,500+ employer partners · 4 programmatic accreditations

**Do not:** Repeat full Handshake narrative if already covered in CAREER-01.

**Figma:** `accreditation_block`

---

### TRUST-01 — Peer Testimonials (3-card grid)

**File:** `src/components/sections/TestimonialSection.tsx`

**Layout:** 3-card responsive grid (`1 col mobile → 2 col tablet → 3 col desktop`). Each card includes a persona tag for identification, short scannable quote, initials avatar, verified badge, and 5-star rating.

```tsx
<TestimonialSection
  className="bg-white"
  heading="Students Like You Are Already Here"
  subheading="Real experiences from people who started where you are now."
  testimonials={[
    {
      tag: "Working Parent",
      quote: "I study on my days off and during nap time. Taking one class at a time in 5-week blocks made this possible while raising two kids and working full time.",
      name: "Sheena Smith",
      credential: "AA in Early Childhood Education, 2022",
    },
    {
      tag: "Career Changer",
      quote: "After 15 years as an LPN, I needed a degree to move into management. UAGC let me transfer my credits and finish in under two years. Six months later — promoted with a $22K raise.",
      name: "Priya Navarro",
      credential: "BS in Health Care Administration, 2023",
    },
    {
      tag: "First-Generation Student",
      quote: "Nobody in my family had gone to college. My advisor walked with me start to finish — enrollment, financial aid, everything. I never felt alone in this.",
      name: "Marcus Johnson",
      credential: "BA in Business Administration, 2024",
    },
  ]}
/>
```

**Design notes:**
- Persona tags (gold pill) create identification before the institutional argument — visitor finds someone like them
- Quotes are short (2 sentences max) for scannability; no wall-of-text blockquotes
- Cards use `BadgeCheck` verified icon and `Quote` accent icon (Lucide) — no giant decorative quote marks
- First card gets `featured` styling (gold border accent)

---

### EMOT-01 — Emotional Motivation (Tier 3)

**File:** `src/components/sections/EmotionalMotivationSection.tsx`

```tsx
<EmotionalMotivationSection />
```

Career-advancement persona module — pull quote + stat row on navy background.

---

### FORM-02 — Mid-page RFI

Section wrapper in `page.tsx` (not a separate component):

| Element | Copy |
|---------|------|
| H2 | Get Your Personalized Degree Plan |
| Subhead | Share a few details and an advisor will send you a personalized guide — including transfer credit estimates, financial aid options, and program recommendations based on your goals. |
| Trust chips | No obligation — just information · Response within 1 business day · $0 application fee |
| Form | `<RFIForm variant="full" />` |
| Max width | 720px mobile → 880px desktop |

---

### FAQ-01 — FAQ

**File:** `src/components/sections/FAQSection.tsx`

```tsx
<FAQSection />
```

Categories: Admissions · Tuition & Aid · Academics · Credibility

Uses accordion with search/filter. Default items in `DEFAULT_FAQ_ITEMS`.

---

### CTA-01 — Bottom multi-path CTA

**Inline in `page.tsx`** — not yet extracted to shared component.

Four paths (grid 1 → 2 → 4 cols):

| Path | Link |
|------|------|
| Chat with an Advisor | https://www.uagc.edu/chat |
| Call an Advisor | tel:+18552104959 |
| Request Information | `#rfi` |
| Apply Now | https://www.uagc.edu/apply-now (redirects to Salesforce) |

Headline: **Ready to Start Your Degree?** — "Degree?" in `text-uagc-gold`

Footer trust line: No obligation · WSCUC Accredited · Classes start every few weeks

---

### FOOT-01 — Footer

**File:** `src/components/shared/Footer.tsx`

```tsx
<Footer />
```

Standard site footer — accreditation, links, legal.

---

## Typography quick reference (prototype)

| Utility | Maps to Figma | Font |
|---------|---------------|------|
| `.type-h1` | H1 Default / Small | Fira Sans Extra Condensed 800 |
| `.type-h2` | H2 | Fira Sans Extra Condensed 800 |
| `.type-h3`–`.type-h5` | H3–H5 | Montserrat 600 |
| `.type-stat` | Display numerals | Fira Sans Extra Condensed 800 |
| `.type-eyebrow` | Eyebrow | Montserrat 600 uppercase |
| `.type-quote` | P Quote | Fira Sans 400 (legacy — TRUST-01 cards use standard body text, not `.type-quote`) |

See `~/uagc-prototypes/src/app/globals.css` for exact rem sizes.

---

## Cross-template reuse

These components are **shared** across the three Phase 2 paid targets:

```
Header, Footer, HeroSection, RFIForm, RFIStickyBar, TrustStrip,
ValuePropsSection, ProgramExplorer, UpcomingStartDates,
CareerOutcomesSection, SalaryGrowthSection, TuitionSection,
EmployerCredentialSection, TestimonialSection,
EmotionalMotivationSection, FAQSection, NextStepBridge, SectionNav
```

| Template | Spec | Key differences |
|------------|------|-----------------|
| `degree-programs-v7` | [pages/degree-programs-v7.md](./degree-programs-v7.md) · [JSON](../componentry/degree-programs-v7-modules.json) | ProgramExplorer **full** (not compact); hero copy = "Explore UAGC Degree Programs" |
| `online-college-courses-v5` | TBD | May use `BenefitsSection` instead of some VP blocks |

**Shared componentry (identical across all 3 pages):** NAV-01, NAV-UX-01, START-01, TRUST-02 — the specs in this file are the canonical source for those four modules.

When cloning a page: **keep module order and card structure consistent** across the three targets unless analytics or persona brief says otherwise.

---

## Acceptance checklist (dev QA)

- [ ] Module order matches table above
- [ ] Hero RFI is two-step mini; trust line below form
- [ ] Sticky RFI bar hidden on hero load; appears after scroll
- [ ] ValueProps: 4 cards + PLA callout; no bulletPoints; no section RFI
- [ ] ProgramExplorer: compact, 50+ programs, expandable rows, no per-program RFI
- [ ] CareerOutcomes: table + Handshake only (no adjacent comparison section)
- [ ] SalaryGrowth: BLS source linked inline
- [ ] No gradients / decorative shadows / faint white text on navy
- [ ] `.type-h*` headings without erroneous `font-medium`
- [ ] Hero pills ≥13px mobile; faces visible in hero photo
- [ ] Bottom CTA: all 4 paths work (chat, tel, #rfi, apply-now)
- [ ] Section nav anchors scroll correctly with `scroll-mt-*`
- [ ] Mobile touch targets ≥44px on form controls and CTAs
- [ ] Skip link present (`#main-content`)

---

## Related files

| Asset | Path |
|-------|------|
| Page implementation | `~/uagc-prototypes/src/app/request-info-v5/page.tsx` |
| 26-module catalog | `output/playwright/screenshots/layout-builder.html` |
| Figma build guide | `design-system/componentry/request-info-v5-figma-build-guide.md` |
| JSON manifest | `design-system/componentry/request-info-v5-modules.json` |
| Design tokens | `design-system/MASTER.md` |
| Landing brief | `uagc_landing_page_agent_brief.md` |
