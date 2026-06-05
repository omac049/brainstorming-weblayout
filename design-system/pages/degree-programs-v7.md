# degree-programs-v7 — Dev Handoff & Component Spec

> **Figma wireframes + componentry:** [request-info-v5 (HoSMZOSnKSVgUXlskHv9tS)](https://www.figma.com/design/HoSMZOSnKSVgUXlskHv9tS) — shared wireframe file; v7-specific frames TBD.  
> **JSON manifest:** [componentry/degree-programs-v7-modules.json](../componentry/degree-programs-v7-modules.json)  
> **Foundation tokens:** [MASTER.md](../MASTER.md) (in-repo; external Reskin Figma not accessible)  
> **Shared-module reference:** [pages/request-info-v5.md](./request-info-v5.md) — canonical specs for NAV-01, NAV-UX-01, START-01, TRUST-02

---

## Purpose

This document is the **single source of truth** for implementing `degree-programs-v7` as a Phase 2 "10x improve" paid landing page. It covers module order, React component mapping, props, copy defaults, responsive rules, and explicit do/don't constraints.

**Where this page differs from `request-info-v5`:** Hero copy is program-discovery oriented; `ProgramExplorer` is **full** (not compact) as the page's centerpiece; an intro `ContentBlock` bridges the hero to program browsing.

**What is identical:** Four modules are **shared componentry** — their specs, Figma builds, and implementations are the same across all three Phase 2 targets (`request-info-v5`, `degree-programs-v7`, `online-college-courses-v5`):

| Shared module | Spec owner |
|---------------|------------|
| NAV-01 — Header (reduced) | [request-info-v5.md → NAV-01](./request-info-v5.md#nav-01--header-reduced) |
| NAV-UX-01 — Section Nav | [request-info-v5.md → NAV-UX-01](./request-info-v5.md#nav-ux-01--section-nav) |
| START-01 — Upcoming Start Dates | [request-info-v5.md → START-01](./request-info-v5.md#start-01--upcoming-start-dates) |
| TRUST-02 — Trust Strip (banner) | [request-info-v5.md → TRUST-02](./request-info-v5.md#trust-02--trust-strip-banner) |

**Do not duplicate** these four module specs here — always reference the canonical v5 definitions. If a shared module needs a page-specific override, note it in the **Overrides** column of the page anatomy table below.

**Persona:** Career-advancement / program-discovery (paid-generic).  
**Primary device:** Mobile-first (~375px); desktop reference 1440px.  
**Live URL:** `https://www.uagc.edu/success/degree-programs-v7`

---

## Page anatomy (top → bottom)

| # | Catalog ID | React component | Section anchor | Background | Overrides vs v5 |
|---|------------|-----------------|----------------|------------|------------------|
| 1 | NAV-01 | `Header` (`variant="reduced"`) | — | `#FFFFFF` | **SHARED** — none |
| — | NAV-UX-01 | `SectionNav` | — | sticky pills | **SHARED** — `PAGE_SECTIONS` array differs (see below) |
| 2 | HERO-01 + FORM-01 | `HeroSection` + `RFIForm` (`mini`) | `#hero-rfi` | hero image + navy overlay | Copy, image |
| — | START-01 | `UpcomingStartDates` | — | `#FFFFFF` | **SHARED** — none |
| 3 | TRUST-02 | `TrustStrip` (`variant="banner"`) | — | `#FFFFFF` | **SHARED** — none |
| 4 | VP-01 | `ValuePropsSection` | `#why-uagc` | `#faf9f7` | Same card structure |
| — | BRIDGE-01 | `NextStepBridge` | → `#programs` | light | |
| 5 | PROG-01 | `ProgramExplorer` (**full**) | `#programs` | `#FFFFFF` | **Full** (not compact) |
| — | BRIDGE-01 | `NextStepBridge` (`variant="dark"`) | → `#careers` | navy | |
| 6 | CAREER-01 | `CareerOutcomesSection` | `#careers` | `#0C234B` | |
| 7 | SALARY-01 | `SalaryGrowthSection` | — | `#FFFFFF` | |
| 8 | FIN-01 | `TuitionSection` | `#tuition` | `#FFFFFF` | |
| 9 | CRED-01 | `EmployerCredentialSection` | `#credentials` | `#fdf8ef` | |
| 10 | TRUST-01 | `TestimonialSection` | `#stories` | `#FFFFFF` | |
| 11 | EMOT-01 | `EmotionalMotivationSection` | — | `#0C234B` | |
| 12 | FORM-02 | `RFIForm` (`full`) + section wrapper | `#rfi` | `#faf9f7` | |
| 13 | FAQ-01 | `FAQSection` | `#faq` | `#FFFFFF` | |
| 14 | CTA-01 | Inline section in `page.tsx` | — | `#0C234B` | |
| 15 | FOOT-01 | `Footer` | — | navy footer | |
| 16 | FORM-05 | `RFIStickyBar` | — | fixed bottom (mobile) | |

**Removed from current prototype:** `ContentBlock` intro (merged into hero subheadline), inline RFI (`variant="inline"`), custom accreditation badge section (replaced by `EmployerCredentialSection`).

---

## Global layout constraints

Same as `request-info-v5` — see [v5 Global layout constraints](./request-info-v5.md#global-layout-constraints).

---

## Shared module specs (do not duplicate)

The following four modules use **identical** component code, props, and Figma componentry across all three Phase 2 pages. Their canonical specifications live in `request-info-v5.md`:

### NAV-01 — Header (reduced) → [v5 spec](./request-info-v5.md#nav-01--header-reduced)

Same `Header variant="reduced"`. No page-specific overrides.

### NAV-UX-01 — Section Nav → [v5 spec](./request-info-v5.md#nav-ux-01--section-nav)

Same `SectionNav` component. **Page-specific anchor list:**

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
```

> Identical to v5. If the page adds or removes sections, update this array — the component itself does not change.

### START-01 — Upcoming Start Dates → [v5 spec](./request-info-v5.md#start-01--upcoming-start-dates)

Same `UpcomingStartDates`. No page-specific overrides.

### TRUST-02 — Trust Strip (banner) → [v5 spec](./request-info-v5.md#trust-02--trust-strip-banner)

Same `TrustStrip variant="banner"`. No page-specific overrides.

---

## Page-specific module specs

### HERO-01 + FORM-01 — Hero + mini RFI

**Files:** `HeroSection.tsx`, `RFIForm.tsx`

```tsx
<HeroSection
  headline="Find the Right Degree for Your Career"
  subheadline="50+ accredited online programs in business, healthcare, education, IT, and more — built for working adults who need flexibility without sacrificing quality."
  backgroundImage="/images/UAGC_WEB_Landing-Page_Hero-Images_v1_Page_6.jpg.webp"
  mobileBackgroundImage="/images/UAGC_WEB_Landing-Page_Hero-Images_v1_Page_6.jpg.webp"
  highlights={["WSCUC Accredited", "50+ Programs", "$0 to Apply"]}
>
  <div id="hero-rfi" className="flex w-full scroll-mt-24 flex-col gap-2">
    <RFIForm variant="mini" heroFormRef={heroFormRef} />
    <p className="text-center text-[0.6875rem] text-uagc-gray/80">
      It only takes a minute. No obligation.
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

**Copy differences vs v5:**

| Field | v5 | v7 |
|-------|----|----|
| `headline` | "Discover Online School Done Right" | "Find the Right Degree for Your Career" |
| `subheadline` | "Earn your degree on your schedule…" | "50+ accredited online programs in business, healthcare, education, IT, and more…" |
| `highlights` | "5-Week Courses", "One Class at a Time", "$0 Application Fee" | "WSCUC Accredited", "50+ Programs", "$0 to Apply" |

> **Messaging rationale (simulation):** 63% of personas responded "skeptical" to generic program-listing copy. Leading with "Find the Right Degree for Your Career" is outcome-focused; the subheadline names specific fields (business, healthcare, education, IT) to address "too generic" feedback; the first highlight pill is "WSCUC Accredited" — the #1 proof point personas requested.

**Figma:** Same hero component as v5 — `Hero 2`, `RFI/vertical`, `Button/RFIsolid`, `Form/RFI Dropdown`

---

### VP-01 — Reasons to Choose UAGC

Same component, card structure as v5. **Card copy revised** per simulation to add proof language and transfer specificity.

```tsx
<ValuePropsSection
  id="why-uagc"
  heading="Reasons to Choose UAGC"
  subheading="Accredited programs, transparent costs, and real support — not just marketing promises."
  highlightCards={[
    {
      title: "Transfer Up to 75% of Your Credits",
      stat: "Up to 75%",
      description: "Bring credits from community colleges and other accredited institutions. Many associate's degree holders use 2+2 pathways to finish a bachelor's faster and at lower cost. Get a free credit evaluation before you commit.",
    },
    {
      title: "No Standardized Tests Required",
      stat: "None",
      description: "No SAT, ACT, GMAT, or GRE — for any program, undergraduate or graduate. Your professional experience and academic record are what matter.",
    },
    {
      title: "One Focused Class at a Time",
      stat: "5–6 wk",
      description: "Take one course per session in 5- to 6-week blocks. Designed for adults balancing work, family, and education — 92% of students study while working.",
    },
    {
      title: "Start with Zero Cost",
      stat: "$0",
      description: "No application fee. No enrollment deposit. Explore financial aid, employer benefits, and military education benefits before paying a dollar.",
    },
  ]}
  experienceCallout={REASONS_EXPERIENCE}
/>
```

> **Messaging rationale (simulation):** Community-college transfer personas (Dr. Foster, others) wanted "2+2 pathways" and "credit evaluation" language. ROI-focused personas (Carlos Ramirez) wanted cost transparency signals earlier. Education personas (Aisha Williams, Daniela Gutierrez) needed to see "accredited" upfront. Subheading reframed from aspirational to proof-forward.

**v7 change from current prototype:** Remove `bulletPoints` prop (duplicates TrustStrip signals — same constraint as v5).

---

### PROG-01 — Program Explorer (full)

**File:** `src/components/sections/ProgramExplorer.tsx`

```tsx
<ProgramExplorer id="programs" className="scroll-mt-20" />
```

| Rule | Detail |
|------|--------|
| Mode | **Full** — not `compact` (this is the program-discovery page) |
| Copy | **50+ programs** (not 200+) |
| Interaction | Searchable in-page catalog; **expandable rows** with rich on-page detail |
| Filters | Area-of-study filter + degree-level filter |
| Mobile | **No nested scroll traps** — show ~6 programs in normal page flow with **Show All** expand; native `<select>` for area filters |
| Desktop | May keep scrollable list with area sidebar |
| Do not | Per-program "Request Info" CTA — keep users on-page |
| Transfer callout | `showTransferCallout={false}` default — transfer belongs in VP-01 |

**Key difference vs v5:** `compact` is **off** — the full catalog is the centerpiece of this page.

---

### CAREER-01 — Career Outcomes by Program

Same component as v5. **v7 overrides** `heading` and `intro` for program-discovery context:

```tsx
<CareerOutcomesSection
  id="careers"
  heading="Career Outcomes by Program Area"
  intro="What can you do with a UAGC degree? These salary ranges and growth rates are drawn from BLS and labor market data for roles commonly held by graduates in each field."
/>
```

> **Messaging rationale (simulation):** Workforce board (Ray Gutierrez), HR thought leader (Naomi Blackwell), and 5+ employer-side personas wanted "clear aggregate employment outcome data" and "evidence of curriculum mapping to industry competencies." Citing BLS directly in the intro adds the sourcing transparency they asked for.

---

### SALARY-01 — Salary Growth by Degree

Same spec as v5. See [v5 SALARY-01 spec](./request-info-v5.md#salary-01--salary-growth-by-degree).

---

### FIN-01 — Tuition & Ways to Save

Same spec as v5. See [v5 FIN-01 spec](./request-info-v5.md#fin-01--tuition--ways-to-save).

---

### CRED-01 — Employer Credentials

Same spec as v5. See [v5 CRED-01 spec](./request-info-v5.md#cred-01--employer-credentials).

**v7 replaces:** The current prototype's custom accreditation badge grid and `ContentBlock` narrative. Use the shared `EmployerCredentialSection` instead.

---

### TRUST-01 — Peer Testimonials (3-card grid, career-outcome focused)

**v7 override:** 3-card grid with persona tags. Lead card centers career outcomes; supporting cards cover military transfer and working-professional flexibility.

```tsx
<TestimonialSection
  className="bg-white"
  heading="Students Like You Are Already Here"
  subheading="Real outcomes from people who chose UAGC for the same reasons you're considering it."
  testimonials={[
    {
      tag: "Career Changer",
      quote: "After 15 years as an LPN, I finished my bachelor's in under two years. Six months after graduating — promoted to clinical coordinator with a $22K salary increase.",
      name: "Priya Navarro",
      credential: "BS in Health Care Administration, 2023",
    },
    {
      tag: "Military Veteran",
      quote: "The transfer credit process was seamless. I applied my military training and community college work — saved over a year. UAGC understood what I brought to the table.",
      name: "Timothy Cruz",
      credential: "BS in Information Technology, 2023",
    },
    {
      tag: "Working Professional",
      quote: "I work 12-hour hospital shifts three days a week. One class at a time in 5-week blocks meant I could actually finish what I started. The format is what made this possible.",
      name: "Maria Delgado",
      credential: "BS in Health Care Administration, 2024",
    },
  ]}
/>
```

> **Messaging rationale (simulation):** 10+ personas asked for verifiable career outcomes and salary data. The 3-card grid lets visitors self-identify via persona tags (Career Changer, Military Veteran, Working Professional) before reading — peer voice creates identification before the institutional argument.

---

### EMOT-01 — Emotional Motivation (Tier 3)

Same spec as v5. See [v5 EMOT-01 spec](./request-info-v5.md#emot-01--emotional-motivation-tier-3).

---

### FORM-02 — Mid-page RFI

Same component as v5. **v7 overrides** heading and subheading for program-exploration intent:

| Element | v5 copy | v7 copy |
|---------|---------|---------|
| H2 | Take the Next Step Toward Your Degree | Get Program Details Tailored to Your Goals |
| Subhead | Get answers about programs, cost, transfer credits, and support… | Tell us what you're interested in and an enrollment advisor will send you program-specific details — costs, transfer credit options, and next steps — within one business day. |

> **Messaging rationale (simulation):** Multiple personas (Devon Park, Maria Gonzalez, Michael Torres) wanted "program-specific" information, not generic next-step language. Promising "costs, transfer credit options, and next steps" directly addresses the top 3 skepticism themes in one sentence.

---

### FAQ-01 — FAQ (custom items)

Same component as v5. **v7 passes custom `items`** targeting program-discovery skepticism themes from the persona simulation.

```tsx
<FAQSection
  heading="Common Questions About UAGC Programs"
  subheading="Straight answers on accreditation, cost, transfer credits, and what to expect."
  items={V7_FAQ_ITEMS}  // 10 custom items — see page.tsx
/>
```

**Custom FAQ topics (10 items across 4 categories):**

| Category | Question | Addresses simulation theme |
|----------|----------|---------------------------|
| credibility | Is UAGC accredited? | #1 skepticism: proof of quality |
| credibility | Will employers recognize my UAGC degree? | Employer partner demand |
| admissions | How do transfer credits work, especially from community colleges? | Transfer/2+2 specificity |
| admissions | Do I need SAT/ACT/GMAT/GRE? | Barrier removal |
| tuition | How much does a degree cost? | Cost transparency |
| tuition | Can my employer help pay? | Employer benefits / military TA |
| academics | Do education degrees lead to teacher licensure? | Licensure confusion (highest switching risk) |
| academics | What career outcomes can I expect? | Salary data + career services |
| academics | How do the 5–6 week courses work? | Course structure for working adults |
| credibility | What is UAGC's relationship with the University of Arizona? | Brand clarity |

> **Messaging rationale (simulation):** Licensure confusion drove the highest switching risk in the simulation (0.9 for Aisha Williams, 0.9 for Daniela Gutierrez). Transfer credit specificity was the top ask from community-college partners. Cost transparency was the #1 ask from parent/family personas.

---

### CTA-01 — Bottom multi-path CTA

Same spec as v5. See [v5 CTA-01 spec](./request-info-v5.md#cta-01--bottom-multi-path-cta).

---

### FOOT-01 — Footer

Same spec as v5. See [v5 FOOT-01 spec](./request-info-v5.md#foot-01--footer).

---

### FORM-05 — Sticky RFI Bar

Same spec as v5. See [v5 FORM-05 spec](./request-info-v5.md#form-01--form-02--form-05--rfi-variants).

---

## Migration from current prototype

The current `degree-programs-v7/page.tsx` needs the following changes to align with this spec:

| Current state | Target |
|---------------|--------|
| `Header` (default full nav) | `Header variant="reduced"` |
| No `SectionNav` | Add `SectionNav` with `PAGE_SECTIONS` |
| No `heroFormRef` / `RFIStickyBar` | Wire `heroFormRef` + `RFIStickyBar` |
| `TrustStrip` inside hero (sidebar) | Move to `TrustStrip variant="banner"` below START-01 |
| `ContentBlock` intro section | Remove (hero subheadline absorbs intro copy) |
| `ProgramExplorer` (full) — no id/anchor | Add `id="programs"` and `scroll-mt-20` |
| `ValuePropsSection` with `bulletPoints` | Remove `bulletPoints` prop |
| Inline RFI (`variant="inline"`) section | Remove (FORM-02 full replaces it) |
| Custom accreditation `ContentBlock` + badge grid | Replace with `EmployerCredentialSection` |
| No `NextStepBridge` | Add bridges between VP→PROG and PROG→CAREER |
| No `CareerOutcomesSection` | Add CAREER-01 |
| No `SalaryGrowthSection` | Add SALARY-01 |
| No `TuitionSection` | Add FIN-01 |
| No `EmotionalMotivationSection` | Add EMOT-01 |
| No `FAQSection` | Add FAQ-01 |
| No bottom CTA | Add CTA-01 (4-path) |
| Server component (metadata export) | Convert to `"use client"` for `heroFormRef` and scroll tracking |

---

## Typography quick reference

Same as v5. See [v5 typography](./request-info-v5.md#typography-quick-reference-prototype).

---

## Cross-template reuse

See [v5 cross-template reuse](./request-info-v5.md#cross-template-reuse).

**v7-specific note:** `ProgramExplorer` is the hero feature of this page — it runs full (not compact) to serve program-discovery intent. All other shared components maintain consistent structure and card content across the three targets.

---

## Acceptance checklist (dev QA)

- [ ] Module order matches table above
- [ ] **Shared modules identical:** NAV-01, NAV-UX-01, START-01, TRUST-02 match v5 implementation exactly
- [ ] Header uses `variant="reduced"` (not full nav)
- [ ] Hero copy: "Explore UAGC Degree Programs" / "50+ Programs" pill
- [ ] Hero RFI is two-step mini; trust line below form
- [ ] Sticky RFI bar hidden on hero load; appears after scroll
- [ ] TrustStrip in banner position (below START-01), not inside hero
- [ ] ValueProps: 4 cards + PLA callout; **no bulletPoints**; no section RFI
- [ ] ProgramExplorer: **full** (not compact), 50+ programs, expandable rows, no per-program RFI
- [ ] Mobile program list: ~6 visible + Show All expand; native `<select>` filter
- [ ] CareerOutcomes: table + Handshake only (no adjacent comparison section)
- [ ] SalaryGrowth: BLS source linked inline
- [ ] No custom accreditation badge grid — uses `EmployerCredentialSection`
- [ ] No gradients / decorative shadows / faint white text on navy
- [ ] `.type-h*` headings without erroneous `font-medium`
- [ ] Hero pills ≥13px mobile; faces visible in hero photo
- [ ] Bottom CTA: all 4 paths work (chat, tel, #rfi, apply-now)
- [ ] Section nav anchors scroll correctly with `scroll-mt-*`
- [ ] Mobile touch targets ≥44px on form controls and CTAs
- [ ] Skip link present (`#main-content`)
- [ ] No `ContentBlock` intro or inline RFI sections from old prototype

---

## Related files

| Asset | Path |
|-------|------|
| Page implementation | `~/uagc-prototypes/src/app/degree-programs-v7/page.tsx` |
| 26-module catalog | `output/playwright/screenshots/layout-builder.html` |
| Design tokens | `design-system/MASTER.md` |
| Shared module specs | `design-system/pages/request-info-v5.md` |
| JSON manifest | `design-system/componentry/degree-programs-v7-modules.json` |
| Landing brief | `uagc_landing_page_agent_brief.md` |
| Lightcast widgets | `EmbedCodes-LightcastWidget(Sheet1).csv` |
| Live-site screenshots | `output/playwright/screenshots/degree-programs-v7_*.png` |
| Paid landing screenshots | `output/playwright/screenshots/paid-05-degree-programs-v7_*.png` |
