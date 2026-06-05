# online-college-courses-v5 — Dev Handoff & Component Spec

> **Figma wireframes + componentry:** [request-info-v5 (HoSMZOSnKSVgUXlskHv9tS)](https://www.figma.com/design/HoSMZOSnKSVgUXlskHv9tS) — shared wireframe file; online-college-courses frames TBD.  
> **JSON manifest:** [componentry/online-college-courses-v5-modules.json](../componentry/online-college-courses-v5-modules.json)  
> **Foundation tokens:** [MASTER.md](../MASTER.md) (in-repo; external Reskin Figma not accessible)  
> **Shared-module reference:** [pages/request-info-v5.md](./request-info-v5.md) — canonical specs for NAV-01, NAV-UX-01, START-01, TRUST-02, FIN-01, CTA-01, FOOT-01, FORM-05

---

## Purpose

This document is the **single source of truth** for implementing `online-college-courses-v5` as a Phase 2 "10x improve" paid landing page. It covers module order, React component mapping, props, copy defaults, responsive rules, and explicit do/don't constraints.

**Where this page differs from `request-info-v5` and `degree-programs-v7`:** This is a **lean ~10-module** page (shortest of the three paid targets). It omits program catalog, career table, salary viz, credential section, emotional module, and bridge transitions. Its unique proof layer is **SKEPT-01 (Skepticism Buster)** — a module that exists only on this URL. Hero, VP-01, testimonial, mid-page RFI, and FAQ are tuned for **course-format exploration** (paid-generic), not degree-outcome (v5) or program-discovery (v7).

**What is identical (shared chrome):** Four modules use the same component code, props, and Figma componentry as v5 — specs are **not duplicated** here:

| Shared module | Spec owner |
|---------------|------------|
| NAV-01 — Header (reduced) | [request-info-v5.md → NAV-01](./request-info-v5.md#nav-01--header-reduced) |
| NAV-UX-01 — Section Nav | [request-info-v5.md → NAV-UX-01](./request-info-v5.md#nav-ux-01--section-nav) — **6 pills** on this page (see below) |
| START-01 — Upcoming Start Dates | [request-info-v5.md → START-01](./request-info-v5.md#start-01--upcoming-start-dates) |
| TRUST-02 — Trust Strip (banner) | [request-info-v5.md → TRUST-02](./request-info-v5.md#trust-02--trust-strip-banner) |

**Persona:** Course-format exploration (paid-generic). Simulation: 31 personas — overwhelmingly skeptical; strongest positive signal = **"Try Your First Course Free for 3 Weeks."**  
**Primary device:** Mobile-first (~375px); desktop reference 1440px.  
**Live URL:** `https://www.uagc.edu/success/online-college-courses-v5`  
**Target page height:** ~8–9 iPhone screens (vs ~12–13 for v5/v7).

---

## Page anatomy (top → bottom)

| # | Catalog ID | React component | Section anchor | Background | Notes |
|---|------------|-----------------|----------------|------------|-------|
| 1 | NAV-01 | `Header` (`variant="reduced"`) | — | `#FFFFFF` | **SHARED** — [v5 spec](./request-info-v5.md#nav-01--header-reduced) |
| — | NAV-UX-01 | `SectionNav` | — | sticky pills | **SHARED** — 6 pills (see [NAV-UX-01](#nav-ux-01--section-nav)) |
| 2 | HERO-01 + FORM-01 | `HeroSection` + `RFIForm` (`mini`) | `#hero-rfi` | hero image + navy overlay | Page-specific copy + image |
| — | START-01 | `UpcomingStartDates` | — | `#FFFFFF` | **SHARED** — [v5 spec](./request-info-v5.md#start-01--upcoming-start-dates) |
| 3 | TRUST-02 | `TrustStrip` (`variant="banner"`) | — | `#FFFFFF` | **SHARED** — [v5 spec](./request-info-v5.md#trust-02--trust-strip-banner) |
| 4 | VP-01 | `ValuePropsSection` | `#why-uagc` | `#faf9f7` | Course-format cards |
| 5 | SKEPT-01 | `SkepticismBusterSection` *(new)* | `#proof` | `#FFFFFF` | **Exclusive to this page** |
| 6 | FIN-01 | `TuitionSection` | `#tuition` | `#FFFFFF` | Same spec as v5 |
| 7 | TRUST-01 | `TestimonialSection` | `#stories` | `#FFFFFF` | Format-focused quote |
| 8 | FORM-02 | `RFIForm` (`full`) + section wrapper | `#rfi` | `#faf9f7` | Emotional wrapper (replaces EMOT-01) |
| 9 | FAQ-01 | `FAQSection` | `#faq` | `#FFFFFF` | Course-format FAQ items |
| 10 | CTA-01 | Inline section in `page.tsx` | — | `#0C234B` | Same spec as v5 |
| 11 | FOOT-01 | `Footer` | — | navy footer | Same spec as v5 |
| 12 | FORM-05 | `RFIStickyBar` | — | fixed bottom (mobile) | Same spec as v5 |

**Prototype-only (not in 26-module catalog):** `SectionNav`, `ScrollReveal` wrapper.

**Substantive module count:** **10** (HERO, VP-01, SKEPT-01, FIN-01, TRUST-01, FORM-02, FAQ-01, CTA-01, plus conversion chrome FORM-05 counted in stack). Compare: v5 and v7 each run **~16 substantive** modules.

---

## Omitted modules (vs v5 / v7)

| Omitted module | Why |
|----------------|-----|
| PROG-01 (`ProgramExplorer`) | Deep program browsing is v7's centerpiece. Visitors here are evaluating **format**, not picking a degree. Hero RFI `college_of_interest` provides enough routing. |
| CAREER-01 (`CareerOutcomesSection`) | Full comparison table + Handshake lives on v5/v7. Career proof folded into **SKEPT-01 Card 1** (accreditation + employer stats). |
| SALARY-01 (`SalaryGrowthSection`) | Salary viz is program-discovery content. Lifetime earnings stat appears in SKEPT-01 expanded detail where relevant. |
| CRED-01 (`EmployerCredentialSection`) | Overlaps CAREER-01. Key stats (98,000+ Handshake employers, 1,500+ partners, 4 programmatic accreditations) → SKEPT-01 Card 1 expandable detail. |
| BRIDGE-01 (`NextStepBridge`) | Fewer sections = natural scroll flow without scroll-cue bridges. |
| EMOT-01 (`EmotionalMotivationSection`) | Emotional close absorbed into **FORM-02** wrapper copy. One emotional beat is enough on a lean page. |

**Do not** add these modules back without analytics or persona brief justification — page identity depends on staying lean.

---

## Global layout constraints

Same as `request-info-v5` — see [v5 Global layout constraints](./request-info-v5.md#global-layout-constraints).

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

## Shared module specs (do not duplicate)

### NAV-01 — Header (reduced)

**SHARED** — see [v5 NAV-01 spec](./request-info-v5.md#nav-01--header-reduced).

```tsx
<Header variant="reduced" />
```

No page-specific overrides.

---

### NAV-UX-01 — Section Nav

**SHARED** component — see [v5 NAV-UX-01 spec](./request-info-v5.md#nav-ux-01--section-nav). **Page-specific anchor list (6 pills, not 8):**

```tsx
const PAGE_SECTIONS = [
  { id: "why-uagc", label: "Why UAGC" },
  { id: "proof", label: "Proof" },       // SKEPT-01
  { id: "tuition", label: "Tuition" },
  { id: "stories", label: "Stories" },
  { id: "rfi", label: "Get Started" },
  { id: "faq", label: "FAQ" },
];
<SectionNav sections={PAGE_SECTIONS} />
```

No **Programs**, **Careers**, or **Credentials** anchors — those sections do not exist on this page.

---

### START-01 — Upcoming Start Dates

**SHARED** — see [v5 START-01 spec](./request-info-v5.md#start-01--upcoming-start-dates).

```tsx
<UpcomingStartDates />
```

No page-specific overrides.

---

### TRUST-02 — Trust Strip (banner)

**SHARED** — see [v5 TRUST-02 spec](./request-info-v5.md#trust-02--trust-strip-banner).

```tsx
<TrustStrip variant="banner" />
```

Place below START-01 in a full-width white band (same wrapper pattern as v5/v7). Third badge = barrier-removal value prop, **not** enrollment dates.

---

## Page-specific module specs

### HERO-01 + FORM-01 — Hero + mini RFI

**Files:** `HeroSection.tsx`, `RFIForm.tsx`

**Hero image:** `UAGC_WEB_Landing-Page_Hero-Images_v1_Page_9.jpg` (live paid page asset; allowed in `next.config.ts`).

```tsx
<HeroSection
  headline="Explore Flexible Online Courses at UAGC"
  subheadline="5- to 6-week courses, one at a time. Built for working adults who need real flexibility — not just a marketing promise. Try your first course free for 3 weeks."
  backgroundImage="/images/UAGC_WEB_Landing-Page_Hero-Images_v1_Page_9.jpg"
  mobileBackgroundImage="/images/UAGC_WEB_Landing-Page_Hero-Images_v1_Page_9.jpg"
  highlights={["Try a Course Free", "5-Week Classes", "$0 to Apply"]}
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

**Copy differences vs v5 and v7:**

| Field | v5 | v7 | online-college-courses-v5 |
|-------|----|----|---------------------------|
| `headline` | "Earn Your Degree 100% Online at UAGC" | "Find the Right Degree for Your Career" | "Explore Flexible Online Courses at UAGC" |
| First pill | "5-Week Courses" | "WSCUC Accredited" | **"Try a Course Free"** |
| Subheadline tone | Outcome-driven | Discovery / field-specific | Experience / format / **trial** |

> **Simulation rationale:** "Try Your First Course Free" was the single most cited positive across 31 personas. Leading with the trial in the first pill and subheadline gives this page an identity distinct from v5/v7. **De-prioritize** "3-Week Risk-Free Trial" as a standalone lead value prop elsewhere — it is integrated here, not repeated as a TrustStrip badge.

**FORM-01 / FORM-05:** Same RFI behavior as v5 — see [v5 FORM variants](./request-info-v5.md#form-01--form-02--form-05--rfi-variants). Wire `heroFormRef` + `RFIStickyBar`; sticky bar **only after scroll** past hero.

**Figma:** Same hero component as v5 — `Hero 2`, `RFI/vertical`, `Button/RFIsolid`, `Form/RFI Dropdown`

---

### VP-01 — Reasons to Choose UAGC

**File:** `src/components/sections/ValuePropsSection.tsx`

Same component and 4-card structure as v5/v7. **Subheading and Card 2** reframed for course-format context.

```tsx
<ValuePropsSection
  id="why-uagc"
  className="scroll-mt-20"
  heading="Reasons to Choose UAGC"
  subheading="Focused courses, real support, and a format built around your life — not the other way around."
  highlightCards={[
    {
      title: "One Focused Class at a Time",
      stat: "5–6 wk",
      description:
        "Take one course in 5- to 6-week blocks. No juggling four classes. 92% of students study while working full time.",
    },
    {
      title: "Try Your First Course Free",
      stat: "3 wk",
      description:
        "Test the format for 3 weeks with no financial commitment. If it's not right, walk away — no cost, no obligation.",
    },
    {
      title: "Transfer Up to 75% of Your Credits",
      stat: "Up to 75%",
      description:
        "Bring credits from community colleges, military training, and professional certs. Average students transfer 41.5 credits.",
    },
    {
      title: "Transparent Costs, $0 to Start",
      stat: "$0",
      description:
        "No application fee. No enrollment deposit. See actual per-credit costs before you commit.",
    },
  ]}
  experienceCallout={REASONS_EXPERIENCE}
/>
```

`REASONS_EXPERIENCE` = same PLA navy callout as v5 (`"Your Experience Already Counts"` block). No page-specific override.

| Element | Type class | Notes |
|---------|------------|-------|
| Section H2 | `.type-h2` | Condensed extrabold — **no** `font-medium` override |
| Card stat | `.type-stat` | Condensed display numerals |
| Card title | semibold body | |
| Experience callout | Navy block | PLA — shared structure with v5 |

**Key difference vs v5/v7:** Card 2 is **"Try Your First Course Free"** (unique to this page). v5 and v7 Card 2 = **"No Standardized Tests Required."**

**Do not:**

- Pass `bulletPoints` (duplicates TrustStrip)
- Add section-level RFI CTA
- Use gradients or decorative shadows
- Add `showTransferCallout` or program-explorer transfer callout here

**Figma:** `icons_text_block`, `icon_text_block`; reference **RTB Modules** page for Why Choose patterns

---

### SKEPT-01 — Skepticism Buster *(new module)*

**File:** `src/components/sections/SkepticismBusterSection.tsx` *(to be created)*

**Catalog ID:** SKEPT-01 — **exclusive to `online-college-courses-v5`**. Not in the 26-module catalog today; add to componentry manifest and Figma componentry page when built.

#### Concept

Three large Q&A-style cards, each tackling a top objection from the persona simulation. Format:

- **Bold skeptical question** in the visitor's own voice
- **One proof stat** (always visible)
- **Concise evidence-backed answer** (always visible)
- **Expandable deeper detail** (chevron disclosure; reuses FIN-01 interaction pattern)

Replaces proof content otherwise spread across CAREER-01, SALARY-01, CRED-01, and EMOT-01 on v5/v7.

> **Why this works:** Simulation showed this audience is the most **format-skeptical** of the three. They have not committed to "I want a degree from UAGC" (v5) or "which program?" (v7). They are at **"is this real, and can I afford it?"** Skepticism Buster meets them there.

#### Section shell

```tsx
<SkepticismBusterSection
  id="proof"
  className="scroll-mt-20 bg-white"
  heading="Straight Answers to Real Questions"
  subheading="We know what you're wondering. Here's the truth."
  cards={SKEPT_CARDS}
  softCta={{
    text: "Still have questions? Talk to an advisor — no strings.",
    chatHref: "https://www.uagc.edu/chat",
    phoneHref: "tel:+18552104959",
  }}
/>
```

#### Component structure (DOM)

```
SkepticismBusterSection
├── Section header
│   ├── H2: "Straight Answers to Real Questions" (.type-h2, text-uagc-navy)
│   └── Subhead: "We know what you're wondering. Here's the truth." (body, text-uagc-gray-700)
├── Card grid (1-col mobile; 3-col desktop lg+)
│   ├── Card 1 — AccreditationProof
│   ├── Card 2 — CostProof
│   └── Card 3 — TransferProof
│       Each card:
│       ├── Question (bold, visitor voice) — .type-h4, font 700, text-uagc-navy
│       ├── Proof stat — .type-stat, text-uagc-red
│       ├── Answer paragraph (always visible) — body, text-uagc-gray-700
│       └── Expandable detail — button + chevron; check-marked bullets when open
└── Soft CTA row
    ├── "Still have questions? Talk to an advisor — no strings."
    ├── Link: Chat with an advisor → /chat
    └── Link: Call → tel:+18552104959
```

#### Card 1 — AccreditationProof

| Element | Copy |
|---------|------|
| **Question** | Is this a real, respected university? |
| **Proof stat** | WSCUC Accredited *(include WSCUC logo mark where available)* |
| **Answer (visible)** | UAGC is regionally accredited by WSCUC — the same body that accredits Stanford, UCLA, and the University of Arizona main campus. Your degree carries the same institutional accreditation weight. |
| **Expanded detail** | • Part of the University of Arizona enterprise<br>• 4 programmatic accreditations (CAHIIM, etc.)<br>• 98,000+ employers on Handshake recognize UAGC graduates<br>• 1,500+ employer tuition partners |

**Personas addressed:** Sarah Kim, Dr. Hartley, Linda Martinez, Jordan Taylor, Carlos Ramirez, Rosa Hernandez, and ~10 others (accreditation / brand skepticism).

#### Card 2 — CostProof

| Element | Copy |
|---------|------|
| **Question** | What does it actually cost — before I give you my info? |
| **Proof stat** | `$485/credit` undergrad / `$625/credit` grad *(display as two-line or split stat treatment)* |
| **Answer (visible)** | Undergraduate courses are $485 per credit. Graduate courses are $625 per credit. Application fee: $0. And 86% of UAGC students receive financial aid or scholarship assistance. |
| **Expanded detail** | • FAFSA / federal grants and loans<br>• Military TA at $250/credit<br>• 1,500+ employer tuition partners<br>• Average students transfer 41.5 credits (= real dollar savings)<br>• Scholarships via ScholarshipUniverse |

**Personas addressed:** Carlos Ramirez, Brandon Hill, Jayden Thompson, David Okonkwo, and ~6 others (cost transparency before form).

#### Card 3 — TransferProof

| Element | Copy |
|---------|------|
| **Question** | Will my existing credits actually count? |
| **Proof stat** | Up to 75% |
| **Answer (visible)** | You can transfer up to 75% of your credits from community colleges, other accredited schools, military training, and professional certifications. Average students transfer 41.5 credits. Get a free, no-obligation credit evaluation before you commit. |
| **Expanded detail** | • 2+2 pathways from community colleges<br>• Prior learning assessment (6 pathways)<br>• Credits from 25+ years ago can count<br>• Military credit (JST, CCAF, service schools)<br>• Free transcript review before enrollment |

**Personas addressed:** Dr. Angela Foster, Patricia Sandoval, James Mitchell, Ana Santos, and ~5 others (transfer skepticism).

#### Props interface (suggested)

```tsx
export type SkeptCard = {
  id: string;
  question: string;
  proofStat: string;
  proofStatSub?: string; // e.g. "undergrad" / "grad" for Card 2
  answer: string;
  expandedBullets: string[];
  logo?: "wscuc"; // optional accreditation mark on Card 1
};

export type SkepticismBusterSectionProps = {
  id?: string;
  className?: string;
  heading: string;
  subheading: string;
  cards: SkeptCard[];
  softCta: {
    text: string;
    chatHref: string;
    phoneHref: string;
  };
};
```

#### Design tokens

| Token / rule | Value |
|--------------|-------|
| Section background | `#FFFFFF` (clean break from VP-01 `#faf9f7`) |
| Section anchor | `id="proof"` + `scroll-mt-20` |
| Card border (idle) | `border-uagc-navy/10` |
| Card border (expanded) | `border-uagc-navy` + optional `ring-1 ring-uagc-navy/10` |
| Card border (hover, collapsed) | `hover:border-uagc-navy/30` |
| Question | `.type-h4`, weight 700, `text-uagc-navy` |
| Proof stat | `.type-stat`, Fira Sans Extra Condensed 800, `text-uagc-red` |
| Answer | body default, `text-uagc-gray-700` |
| Expanded bullets | Lighter body; check-mark prefix (same icon treatment as FIN-01 disclosure) |
| Disclosure | Multiple cards may be open simultaneously (independent, like FIN-01) |
| Chevron hit area | Minimum **44px** touch target on mobile |

#### Responsive

| Breakpoint | Layout |
|------------|--------|
| Mobile (`< 640px`) | 1-col stack, full-width cards |
| Tablet (`640px+`) | 1-col stack (cards are content-heavy; need width) |
| Desktop (`1024px+`) | `grid-cols-3` — three cards side by side |

#### Do not

- Link expanded bullets off-page (keep users on landing — same rule as FIN-01 "Ways to Save")
- Collapse proof stat behind disclosure (stat must stay visible when collapsed)
- Use gradients, backdrop-blur, or decorative shadows on cards
- Duplicate full CAREER-01 table or SALARY-01 chart inside this module

**Figma:** New componentry card **SKEPT-01** on `02 - Componentry` / `03 — Landing Components Library` (desktop 1440 + mobile 375) when wireframes are captured.

---

### FIN-01 — Tuition & Financial Aid

Same spec as v5 — see [v5 FIN-01 spec](./request-info-v5.md#fin-01--tuition--financial-aid).

```tsx
<TuitionSection id="tuition" className="scroll-mt-20" />
```

Unified vertical flow: pricing tiers → 86% aid bridge stat → 6 expandable savings cards (no outbound links).

---

### TRUST-01 — Peer Testimonials (3-card grid, format-confidence focused)

**File:** `src/components/sections/TestimonialSection.tsx`

**OCC-specific personas:** Working Parent, Exploring Options, Returning to School — all centered on format experience and low-commitment entry, not career outcomes.

```tsx
<TestimonialSection
  className="bg-white"
  heading="Students Like You Are Already Here"
  subheading="See how real students fit UAGC courses into their lives."
  testimonials={[
    {
      tag: "Working Parent",
      quote: "I was terrified online school would feel like another full-time job. But one class at a time in 5-week blocks? I could actually do it around my kids' schedules.",
      name: "Maria Delgado",
      credential: "BS in Health Care Administration, 2024",
    },
    {
      tag: "Exploring Options",
      quote: "I wasn't sure I was ready for a full degree. Starting with a single course let me test the format with zero pressure. By week three I knew I was staying.",
      name: "Angela Torres",
      credential: "Currently enrolled, Business Administration",
    },
    {
      tag: "Returning to School",
      quote: "It had been 12 years since I was in a classroom. The instructors made me feel like I belonged from day one. Now I'm three courses in and actually enjoying it.",
      name: "Dwayne Mitchell",
      credential: "Currently enrolled, Criminal Justice",
    },
  ]}
/>
```

> **Simulation rationale:** Personas (Keisha Brown, Maria Gonzalez, Patricia Sandoval, Pat Sullivan) wanted stories from people managing courses around real-life constraints. 3-card grid with persona tags lets visitors self-identify; centers **format experience**, not enrollment speed (v5) or career outcomes (v7).

---

### FORM-02 — Mid-page RFI (emotional wrapper)

Section wrapper in `page.tsx` (not a separate component). **EMOT-01 is cut** — this section absorbs the emotional close.

| Element | Copy |
|---------|------|
| H2 | Your Future Starts with One Course |
| Subhead | Share a few details and we'll send you everything you need to get started — program options, financial aid details, and how to claim your free trial course. |
| Trust chips | No obligation — just information · Response within 1 business day · $0 application fee |
| Form | `<RFIForm variant="full" />` |
| Max width | 720px mobile → 880px desktop |
| Section | `id="rfi"`, `scroll-mt-20`, background `#faf9f7` |

**Do not** add a separate `EmotionalMotivationSection` above or below this block on this page.

---

### FAQ-01 — FAQ (course-format scope)

**File:** `src/components/sections/FAQSection.tsx`

Custom items targeting course-format simulation themes. Pass explicit `items` — do not rely on generic `DEFAULT_FAQ_ITEMS` alone.

```tsx
<FAQSection
  id="faq"
  className="scroll-mt-20"
  heading="Questions About Online Courses at UAGC"
  subheading="Straight answers on how courses work, the free trial, cost, and accreditation."
  items={OCC_FAQ_ITEMS}
/>
```

**10 items — questions and categories (exact):**

| Category | Question | Simulation theme |
|----------|----------|------------------|
| format | How do the 5-6 week courses work? | Patricia Sandoval, Keisha Brown |
| format | How much time per week should I plan for? | Keisha Brown, Pat Sullivan |
| format | What technology do I need for online courses? | Rosa Hernandez, Mike Thompson |
| trial | How does the 3-week free trial work? | Jordan Chen-Nakamura, Carlos Ramirez |
| trial | What happens after the free trial ends? | Carlos Ramirez, Jayden Thompson |
| cost | How much does tuition cost per credit? | Carlos Ramirez, Brandon Hill |
| cost | What financial aid is available? | Jayden Thompson, Esperanza Morales |
| credibility | Is UAGC accredited? | Sarah Kim, Linda Martinez |
| credibility | What is UAGC's relationship with the University of Arizona? | Jordan Taylor, Dr. Hartley |
| admissions | Can I transfer credits from another school? | Dr. Angela Foster, James Mitchell |

**Answer guidelines:**

- Lead with concrete numbers where applicable (`$485` / `$625`, `15–20 hours/week`, `3 weeks` trial, `75%` transfer cap).
- Trial FAQs must explain no-cost window, what happens after trial, and path to enrollment without pressure language.
- Technology FAQ: laptop + internet baseline; no exotic software list unless sourced.
- Keep answers scannable; use `highlights` array on `FAQItem` for search/filter chips (same component API as v7).
- **Do not** duplicate full SKEPT-01 card copy verbatim — FAQ is objection cleanup; SKEPT-01 is the proof layer.

Uses accordion with search/filter (component default behavior).

---

### CTA-01 — Bottom multi-path CTA

Same spec as v5 — see [v5 CTA-01 spec](./request-info-v5.md#cta-01--bottom-multi-path-cta).

Four paths: Chat · Call · Request Information (`#rfi`) · Apply Now.

Headline: **Ready to Start Your Degree?** — "Degree?" in `text-uagc-gold`

---

### FOOT-01 — Footer

Same spec as v5 — see [v5 FOOT-01 spec](./request-info-v5.md#foot-01--footer).

```tsx
<Footer />
```

---

### FORM-05 — Sticky RFI Bar

Same spec as v5 — see [v5 FORM-05 spec](./request-info-v5.md#form-01--form-02--form-05--rfi-variants).

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

---

## Typography quick reference (prototype)

Same as v5. See [v5 typography](./request-info-v5.md#typography-quick-reference-prototype).

| Utility | Maps to Figma | Font |
|---------|---------------|------|
| `.type-h1` | H1 Default / Small | Fira Sans Extra Condensed 800 |
| `.type-h2` | H2 | Fira Sans Extra Condensed 800 |
| `.type-h3`–`.type-h5` | H3–H5 | Montserrat 600 |
| `.type-h4` | H4 | Montserrat 600 — SKEPT-01 questions |
| `.type-stat` | Display numerals | Fira Sans Extra Condensed 800 |
| `.type-eyebrow` | Eyebrow | Montserrat 600 uppercase |
| `.type-quote` | P Quote | Fira Sans 400 |

See `~/uagc-prototypes/src/app/globals.css` for exact rem sizes.

---

## Cross-template reuse

| Template | Spec | Key differences |
|----------|------|-----------------|
| `request-info-v5` | [pages/request-info-v5.md](./request-info-v5.md) | 16 substantive modules; career table; EMOT-01; compact ProgramExplorer |
| `degree-programs-v7` | [pages/degree-programs-v7.md](./degree-programs-v7.md) | Full ProgramExplorer; program-discovery hero |
| `online-college-courses-v5` | **this file** | **Lean 10 modules**; **SKEPT-01 only here**; trial-first hero pill; no PROG/CAREER/SALARY/CRED/EMOT/BRIDGE |

**Shared componentry (identical across all 3 pages):** NAV-01, NAV-UX-01, START-01, TRUST-02 — canonical specs in [request-info-v5.md](./request-info-v5.md).

When cloning patterns from v5/v7: **do not** restore omitted modules to "match" the other pages — this URL's conversion story is **format proof + trial**, not program catalog depth.

---

## Migration from current prototype

The current `~/uagc-prototypes/src/app/online-college-courses-v5/page.tsx` still mirrors the **v5/v7-heavy stack**. Align to this spec:

| Current state | Target |
|---------------|--------|
| 8-pill `PAGE_SECTIONS` (Programs, Careers, Credentials) | 6-pill array (see NAV-UX-01) |
| Hero copy / pills (degree-oriented) | Plan hero copy + `Try a Course Free` first pill |
| `ProgramExplorer compact` + bridges | **Remove** PROG-01 and BRIDGE-01 |
| `CareerOutcomesSection`, `SalaryGrowthSection`, `EmployerCredentialSection` | **Remove** — proof → SKEPT-01 |
| `EmotionalMotivationSection` | **Remove** — copy → FORM-02 wrapper |
| No `SkepticismBusterSection` | **Add** SKEPT-01 at `#proof` |
| VP-01 cards (v5-style Card 2 = No Tests) | Plan VP cards (Card 2 = Try First Course Free) |
| Testimonial (generic / v5-style) | 3-card grid: Maria Delgado, Angela Torres, Dwayne Mitchell — format-focused peer voices with persona tags |
| FAQ items (degree/program-heavy) | 10 course-format items (table above) |
| FORM-02 heading (degree plan) | "Your Future Starts with One Course" |

---

## Acceptance checklist (dev QA)

- [ ] Module order matches [page anatomy](#page-anatomy-top--bottom) — **no** PROG, CAREER, SALARY, CRED, EMOT, BRIDGE
- [ ] **Shared modules identical:** NAV-01, NAV-UX-01, START-01, TRUST-02 match v5 implementation
- [ ] Section nav: **6 pills**; `#proof` scrolls to SKEPT-01
- [ ] Hero: plan headline, subheadline, `Page_9` hero image, pills `Try a Course Free` / `5-Week Classes` / `$0 to Apply`
- [ ] Hero RFI two-step mini; trust line below form
- [ ] Sticky RFI bar hidden on hero load; appears after scroll
- [ ] TrustStrip in banner position (below START-01), not inside hero
- [ ] ValueProps: 4 cards per spec; Card 2 = free trial; **no bulletPoints**; **no section RFI**
- [ ] SKEPT-01: 3 cards, proof stats visible when collapsed, expandable detail, soft CTA (chat + phone)
- [ ] SKEPT-01: chevron touch targets ≥44px mobile; independent disclosure
- [ ] TuitionSection: same FIN-01 behavior as v5; no outbound links from savings cards
- [ ] Testimonial: 3-card grid (Working Parent / Exploring Options / Returning to School) with persona tags
- [ ] FORM-02: emotional wrapper copy; no separate EMOT-01
- [ ] FAQ: 10 custom items; course/trial/cost/credibility scope
- [ ] No gradients / decorative shadows / faint white text on navy
- [ ] `.type-h*` headings without erroneous `font-medium`
- [ ] Hero pills ≥13px mobile; faces visible in hero photo
- [ ] Bottom CTA: all 4 paths work (chat, tel, `#rfi`, apply-now)
- [ ] Section nav anchors scroll correctly with `scroll-mt-*`
- [ ] Mobile touch targets ≥44px on form controls and CTAs
- [ ] Skip link present (`#main-content`)
- [ ] Page height target ~8–9 iPhone screens (leaner than v5/v7)

---

## Related files

| Asset | Path |
|-------|------|
| Page implementation | `~/uagc-prototypes/src/app/online-college-courses-v5/page.tsx` |
| 26-module catalog | `output/playwright/screenshots/layout-builder.html` |
| JSON manifest | `design-system/componentry/online-college-courses-v5-modules.json` |
| Design tokens | `design-system/MASTER.md` |
| Shared module specs | `design-system/pages/request-info-v5.md` |
| Persona simulation | `simulation_online-college-courses-v5.csv` |
| Landing brief | `uagc_landing_page_agent_brief.md` |
| Live-site screenshots | `output/playwright/screenshots/online-college-courses-v5_*.png` (when captured) |
