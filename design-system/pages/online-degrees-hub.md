# online-degrees-hub — Dev Handoff & Component Spec

> **Figma wireframes + componentry:** [UAGC Paid page templates 3 — Wireframe](https://www.figma.com/design/HoSMZOSnKSVgUXlskHv9tS) (`HoSMZOSnKSVgUXlskHv9tS`) — pages **`online-degrees-hub — Wireframes`** / **`online-degrees-hub — Componentry`** (to be created).  
> **Figma build guide:** [componentry/online-degrees-hub-figma-build-guide.md](../componentry/online-degrees-hub-figma-build-guide.md) · **JSON manifest:** [componentry/online-degrees-hub-modules.json](../componentry/online-degrees-hub-modules.json)  
> **Foundation tokens:** [MASTER.md](../MASTER.md)  
> **Live baseline capture:** `output/playwright/screenshots/organic-02-online-degrees_{desktop-1440,mobile-375}.png`

---

## Purpose

This document is the **single source of truth** for the Phase 2 **organic** redesign of `/online-degrees/` — the site’s highest-engagement organic hub (~**88.8%** engaged sessions, ~**5.82%** conversion in Phase 1 audit). It covers module order, React component mapping, props, copy defaults, responsive rules, and explicit do/don’t constraints for **stakeholder sign-off** (Figma + interactive prototype).

**Where this differs from paid landings (`request-info-v5`, etc.):**

| Dimension | Paid `/success/*` | Organic hub |
|-----------|-------------------|-------------|
| Header | `NAV-01` reduced | **`NAV-00` full site nav** |
| Hero RFI | Embedded in `HERO-01` split | **Separate `RFI-HERO` band** below hero image |
| Page depth | ~12–13 mobile screens, conversion-focused | ~**10–12** screens, **discovery-first** |
| Program list | `PROG-01` compact explorer | **`HUB-CATALOG`** with CMS-style filters |
| Mid-page RFI | `FORM-02` full section | **Omitted on v1** — reduce live duplication |
| Persona | Paid career-advancement | Organic undecided searcher |
| Analytics window | ~30d paid traffic | **~12mo** organic GSC/GA4; CS 30d for RFI friction |

**Persona:** Undecided adult evaluating online degree options; may arrive from homepage, search, or vertical hub.  
**Primary device:** Mobile-first (~375px); desktop reference 1440px.  
**Live URL:** `https://www.uagc.edu/online-degrees/`  
**Prototype route (planned):** `/organic/online-degrees` in `~/uagc-prototypes`

---

## Page anatomy (top → bottom)

| # | Catalog ID | React component | Section anchor | Background | Notes |
|---|------------|-----------------|----------------|------------|-------|
| — | `NAV-00` | `SiteHeader` (`variant="full"`) | — | `#FFFFFF` | Full mega-menu — **not** paid reduced header |
| 1 | `HERO-ORG` | `OrganicHomeHero` (shared) | — | hero image | Full-width parallax + trust pills; **no form in hero** |
| 2 | `RFI-HERO` | `RFIForm` (`mini`) | `#hero-rfi` | `#FFFFFF` | Two-step; trust line below |
| 3 | `HUB-TOP3` | `TopDegreesSection` | `#top-degrees` | `#faf9f7` | 3 popular program cards — **discovery-first** (CS: 30% exposure window) |
| 4 | `HUB-CATALOG` | `ProgramCatalogSection` | `#programs` | `#FFFFFF` | Filters + ~6 visible + Show All |
| 5 | `HUB-INTRO` | `HubIntroSection` | — | `#FFFFFF` | “Flexible online degrees…” — reinforcement after discovery |
| 6 | `TRUST-01` | `TestimonialSection` | `#stories` | `#faf9f7` | 3-card grid with persona tags |
| 7 | `HUB-FINDER` | `DegreeFinderCTA` | `#degree-finder` | `#0C234B` | Quiz CTA band |
| 8 | `HUB-JOURNEY` | `EnrollmentJourneySection` | `#journey` | `#FFFFFF` | Transfer / apply / funding |
| 9 | `FAQ-01` | `FAQSection` | `#faq` | `#FFFFFF` | 2 primary hub topics |
| 10 | `ACCR-01` | `AccreditationBand` | — | `#faf9f7` | WSCUC + UA affiliation |
| 11 | `CTA-01` | Inline section in `page.tsx` | — | `#0C234B` | Chat, phone, #hero-rfi, apply |
| — | `FOOT-01` | `Footer` | — | navy footer | Full site footer |
| — | `FORM-05` | `RFIStickyBar` | — | fixed bottom | Mobile; after scroll past hero RFI |

**Substantive module count:** **11** (+ chrome).  
**Prototype-only helpers:** `ScrollReveal` wrapper (optional progressive enhancement — base content visible without JS).

---

## Omitted vs live (10× improvements)

| Live pattern | Prototype rule | Rationale |
|--------------|----------------|-----------|
| **4+ RFI form instances** on page | Hero RFI + sticky only | Contentsquare sticky RFI **2.41× rage**; consolidate conversion path |
| “Explore accredited degrees” inline form | Use `HUB-CATALOG` filters only | Duplicate ask before visitor explores programs |
| Paginated catalog only | **6 programs + Show All** in page flow | Mobile scroll engagement; avoid pagination trap |
| Horizontal filter pill strips | **Native `<select>`** per filter dimension | AGENTS.md — no nested scroll traps |
| Per-program “Request Info” in list | **View Details** links only | Earn the ask after on-page discovery (same rule as paid `PROG-01`) |

---

## Global layout constraints

Same token and accessibility rules as paid prototypes — see [request-info-v5 Global layout constraints](./request-info-v5.md#global-layout-constraints).

| Rule | Value |
|------|-------|
| Max content width | `max-w-[1440px]` centered |
| Horizontal padding | `px-4 sm:px-6 lg:px-8` |
| Main top offset (fixed header) | `pt-16 sm:pt-[72px] lg:pt-20` (taller than paid — full nav) |
| Scroll margin for anchored sections | `scroll-mt-20` (hero RFI: `scroll-mt-24`) |
| Colors | Flat only — no gradients, alpha overlays, backdrop-blur, decorative shadows |
| CTA accent | **`uagc-gold` `#EF9600`** — match paid prototype gold, not strict Reskin red/navy CTA split |
| Typography | Fira Sans / Fira Sans Extra Condensed 800 for impact headlines |
| Touch targets | Minimum ~44px on filters, Show All, FAQ, sticky bar |

---

## Module specifications

### NAV-00 — Site Header (full)

**File:** `src/components/organic/SiteHeader.tsx` *(new)*

```tsx
<SiteHeader variant="full" />
```

| Prop | Value |
|------|-------|
| `variant` | `"full"` — logo, primary nav mega-menus, utility: Chat, phone, Search, Request Info, Apply Now |

**Behavior:** Fixed on scroll. Mobile: hamburger → drawer with accordion nav groups (Online Degrees, Admission, Tuition & Aid, etc.).

**Do not** reuse paid `Header variant="reduced"`.

---

### HERO-ORG — Organic hero (no embedded RFI)

**File:** `src/components/organic/OrganicHeroSection.tsx` *(new)*

```tsx
<OrganicHeroSection
  eyebrow="Find the Program That's Right for You"
  headline="Online Degrees"
  subheadline="Study something you love in an environment designed for busy adults."
  backgroundImage="/images/organic/online-degrees-hero-desktop.jpg"
  mobileBackgroundImage="/images/organic/online-degrees-hero-mobile.jpg"
  breadcrumb={[
    { label: "Home", href: "/" },
    { label: "Online Degrees", href: "/online-degrees" },
  ]}
/>
```

| Layout | Rule |
|--------|------|
| Desktop | Full-width hero image; headline overlay left; **RFI is next section** |
| Mobile | Image + headline; preserve visible faces in photo; no form overlay |

---

### RFI-HERO — Hero RFI band

**File:** `src/components/shared/RFIForm.tsx` — reuse paid mini variant.

```tsx
<section id="hero-rfi" className="scroll-mt-24 bg-white py-8 lg:py-10">
  <div className="mx-auto max-w-[720px] px-4">
    <h2 className="type-h3 text-center text-uagc-navy">Request More Information</h2>
    <RFIForm variant="mini" heroFormRef={heroFormRef} />
    <p className="mt-2 text-center text-sm text-uagc-gray-600">
      It only takes a minute. No obligation.
    </p>
  </div>
</section>
```

| Field / step | Notes |
|--------------|-------|
| Step 1 | Area of interest + degree level (or combined routing) |
| Step 2 | Name, email, phone, state, TCPA |
| Pre-select | None on hub — visitor is undecided |

**Do not** show full 50+ degree dropdown on step 1 (live friction).

**Post-submit (prototype):** On successful mini RFI submit, navigate to [`/organic/request-information/thank-you`](./request-information-thank-you.md) with mock `firstName`, `program`, and `confirmationId` — see thank-you spec. Production uses `/request-information/thank-you?sid=…`.

---

### HUB-INTRO — Value intro

**File:** `src/components/organic/HubIntroSection.tsx` *(new)*

| Prop | Default copy |
|------|--------------|
| `heading` | Flexible Online College Degrees to Fit Your Life |
| `body` | At the University of Arizona Global Campus (UAGC), our online degrees provide a flexible way for busy adults to fit college into their lives. Mobile applications allow you to study whenever and wherever is convenient for you… Each online course is taken one at a time and lasts for just 5 or 6 weeks,* so you can continue to enjoy every aspect of your life while earning your online degree. |

Footnote: *5 weeks undergraduate, 6 weeks graduate, 9 weeks doctoral capstone — match live disclaimer.

---

### HUB-TOP3 — Top three requested degrees

**File:** `src/components/organic/TopDegreesSection.tsx` *(new)*

Three cards linking to program pages:

1. **BA Business Administration** → `/online-degrees/bachelors/business-administration`
2. **BA Organizational Management** → `/online-degrees/bachelors/organizational-management`
3. **BA Early Childhood Education** → `/online-degrees/bachelors/early-childhood-education`

Each card: optional program image, title, 1-line description, **Learn More** text link (gold or navy underline — not a second RFI).

Grid: `grid-cols-1 md:grid-cols-3 gap-6`.

---

### HUB-CATALOG — Program catalog

**File:** `src/components/organic/ProgramCatalogSection.tsx` *(new)*

```tsx
<ProgramCatalogSection
  heading="Do You Know Which Degree You Want?"
  subheading="Choose an online degree program that aligns with your goals and gain the skills you need to open yourself up to a future full of potential."
  initialVisible={6}
  filters={["degreeLevel", "areaOfInterest", "college"]}
/>
```

| Behavior | Rule |
|----------|------|
| Filters | Three **native `<select>`** elements — degree level, area of interest, college |
| List | Filtered program rows: title, college, 1-line blurb, **View Details** → program URL |
| Mobile | Show **6** rows in normal document flow; **Show all programs** expands inline |
| Desktop | May show 12 rows before expand, or same 6+expand for parity |
| Search | Optional client-side title search — debounced; not required for v1 sign-off |

**Copy:** Reference **50+** programs — not 200+. Transfer policy belongs in journey/VP content, not catalog header.

**Do not:** `max-h` + `overflow-y-auto` list containers; per-row Request Info buttons.

Sample row (prototype seed data):

| Program | College |
|---------|---------|
| BA in Business Administration | College of Professional Advancement |
| BA in Applied Behavioral Science | College of Professional Advancement |
| BA in Business Leadership | College of Integrative Learning |
| … | … |

---

### HUB-FINDER — Degree finder CTA

**File:** `src/components/organic/DegreeFinderCTA.tsx` *(new)*

Navy band with centered copy + gold primary button **Take the Degree Finder Quiz** → `/degree-finder` (or live equivalent).

---

### TRUST-01 — Peer Testimonials (3-card grid)

**File:** `src/components/sections/TestimonialSection.tsx`

**Heading:** What Our Students Think

3-card grid with persona tags. Select 3 hub-relevant voices (e.g. Working Parent, Military Veteran, Working Professional) from Stacey Metzler, Timothy Cathey, Tyler Barnett with credentials and short scannable quotes. Each card: persona tag pill, 2-sentence quote, initials avatar, verified badge, 5-star rating.

---

### HUB-JOURNEY — Start your journey

**File:** `src/components/organic/EnrollmentJourneySection.tsx` *(new)*

Three equal cards:

1. **Transfer Credits** — Decrease time to completion…
2. **Application** — Gather documents; Admission Specialist support…
3. **Funding Options** — Flexible tuition and payment plans…

Each card: icon, title, short body, **Learn More** link (on-page anchor or `/tuition-financial-aid` — prototype may use `#` placeholders).

---

### FAQ-01 — Hub FAQ

**File:** `src/components/sections/FAQSection.tsx` — reuse accordion.

**Heading:** Frequently Asked Questions About Online Degrees

Primary items (live):

- Are Online Degrees Worth it?
- What Are the Advantages of an Online Degree?

Use abbreviated body copy for prototype; full copy in CMS handoff later.

---

### ACCR-01 — Accreditation

**File:** `src/components/organic/AccreditationBand.tsx` *(new)*

WSCUC logo + required accreditation copy + “We are affiliated with the University of Arizona” lockup.

**Copy rule:** Defensible enterprise / R1 / WSCUC language — no “top 100 worldwide” claims.

---

### CTA-01 — Bottom multi-path

Same pattern as [request-info-v5 CTA-01](./request-info-v5.md) — navy band, four paths:

- Chat with Advisor
- Call +1 866 711 1700
- Request Information → `#hero-rfi`
- Apply Now → `/apply-now`

---

### FOOT-01 — Footer

Reuse `Footer` from shared components — full site footer columns.

---

### FORM-05 — Sticky RFI bar

Same behavior as paid — see [request-info-v5 FORM-05](./request-info-v5.md):

- Hidden while `#hero-rfi` intersects viewport
- Visible after scroll past hero RFI on mobile
- Label: **Request Information** → scroll to `#hero-rfi`

---

## Analytics & sign-off criteria

| Metric (baseline) | Target narrative for review |
|-------------------|----------------------------|
| 88.8% engagement | Preserve discovery sections (Top 3, catalog, testimonials, journey) **before** repeating ask |
| 5.82% conversion | Keep hero RFI placement; improve form step clarity |
| CS sticky 2.41× rage | Single sticky path; no competing mid-page forms |
| 33.4% scroll depth (CS) | Catalog Show All + journey cards visible without nested scroll |

**Sign-off checklist:**

- [ ] Full nav works on mobile (drawer) and desktop (mega-menu sketch acceptable in Figma)
- [ ] Hero image visible; RFI in dedicated band below
- [ ] Top 3 cards link to real program URLs
- [ ] Catalog: native selects + 6-up + Show All — no scroll trap
- [ ] No mid-page RFI duplicate blocks
- [ ] Sticky bar hidden on initial hero RFI view
- [ ] FAQ + accreditation + bottom CTA present
- [ ] Desktop 1440 + mobile 375 Figma wireframes match prototype route

---

## Related files

| Asset | Path |
|-------|------|
| Module manifest | [online-degrees-hub-modules.json](../componentry/online-degrees-hub-modules.json) |
| Figma build guide | [online-degrees-hub-figma-build-guide.md](../componentry/online-degrees-hub-figma-build-guide.md) |
| Paid RFI reference | [request-info-v5.md](./request-info-v5.md) |
| Live capture (hub) | `output/playwright/screenshots/organic-02-online-degrees_*.png` |
| Program reference capture | `output/playwright/screenshots/organic-11-program-business-administration_*.png` |
| Thank-you spec | [request-information-thank-you.md](./request-information-thank-you.md) |
| RFI audit notes | `output/playwright/screenshots/1-2-rfi-audit.html` (#org-02) |
| Design tokens | [MASTER.md](../MASTER.md) |
| Figma file index | [FIGMA-FILES.md](../FIGMA-FILES.md) |

**Next templates (not in this spec):** [homepage.md](./homepage.md) *(planned)* · [program-business-administration.md](./program-business-administration.md) *(planned — Milestone R2)*
