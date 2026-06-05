# Drupal Handoff — Paid Landing Module Library

**Purpose:** Map Phase 2 **26-module catalog IDs** to Drupal **paragraph types**, **fields**, and **JavaScript behaviors** for production implementation on `uagc.edu`.

**Audience:** Drupal theme developers, back-end engineers, content editors, QA.

**This document is the production handoff layer.** Visual specs live in Figma; interaction reference in `~/uagc-prototypes`; copy/props in `design-system/pages/*.md` and `componentry/*-modules.json`. **Do not treat the Next.js repo as shippable code.**

---

## How to use this doc

1. **Implement paragraph types once** from [Module registry](#module-registry) — reuse across all three paid templates.
2. **Assemble pages** from [Per-template section order](#per-template-section-order) — each row is one paragraph instance (or theme region for global chrome).
3. **Wire RFI forms** per [RFI integration](#rfi-integration-shared) — reuse live Lead API / existing form handlers; restyle wrappers only unless Phase 2 A/B requires variant tagging.
4. **Load JS** per module from [JavaScript requirements](#javascript-requirements) — one behavior file per interactive paragraph where possible.
5. **Fill Drupal-specific columns** marked `TBD — Drupal team` before sprint planning.

### Related files

| Asset | Path |
|-------|------|
| Design tokens | [`MASTER.md`](./MASTER.md) |
| Reskin alignment | [`RESKIN-ALIGNMENT.md`](./RESKIN-ALIGNMENT.md) |
| v5 page spec | [`pages/request-info-v5.md`](./pages/request-info-v5.md) |
| v7 page spec | [`pages/degree-programs-v7.md`](./pages/degree-programs-v7.md) |
| OCC page spec | [`pages/online-college-courses-v5.md`](./pages/online-college-courses-v5.md) |
| Module manifests | [`componentry/*-modules.json`](./componentry/) |
| Figma componentry | [`FIGMA-FILES.md`](./FIGMA-FILES.md) |
| Interactive reference | `~/uagc-prototypes` (not production) |

---

## Architecture assumptions

> **Template:** Replace bracketed placeholders with your Drupal conventions before build.

| Layer | Recommended pattern | Notes |
|-------|---------------------|-------|
| **Content type** | `paid_landing_page` (or extend existing `/success/*` type) | One node per paid URL; paragraphs field for module stack |
| **Module field** | `field_landing_sections` → Entity reference revisions → Paragraphs | Ordered; each paragraph = one catalog module |
| **Global chrome** | Theme regions or fixed paragraphs | `NAV-01`, `FOOT-01` may be theme-level on `/success/*` |
| **Forms** | Existing RFI webform / custom form plugin | **Do not rebuild** submission pipeline for layout Phase 2 |
| **Program data** | Taxonomy / JSON feed / existing program API | `PROG-01` consumes same source as live program pages |
| **Start dates** | Computed at render (CMS field or API) | `START-01`: next two dates only; `daysLeft` at render time |
| **A/B variants** | Cookie + variant ID on form hidden field + GA4 | Phase 2 validation on **Drupal staging**, not Next.js |
| **CSS** | Theme SCSS + CSS custom properties from `MASTER.md` | Map tokens to `:root` / `.paid-landing` scope |
| **Twig** | One template per paragraph type | e.g. `paragraph--landing-hero-rfi.html.twig` |

---

## RFI integration (shared)

All **`FORM-01`**, **`FORM-02`**, and **`FORM-05`** instances must use the **live** request-information pipeline.

### Form variants

| Catalog ID | Drupal placement | UX variant | Submit behavior |
|------------|------------------|------------|-----------------|
| **FORM-01** | Embedded in **HERO-01** paragraph | Two-step **mini** | Same endpoint as live `/success/request-info-v5` hero RFI |
| **FORM-02** | Standalone mid-page paragraph | **Full** (single or two-step per live) | Same endpoint; optional section heading wrapper |
| **FORM-05** | Theme attach (mobile) | Sticky CTA bar → scroll to `#rfi` or expand mini | No separate submit — navigation only |

### Field mapping (prototype → Drupal)

| Field key | Label | Type | Required | Step (mini) | Notes |
|-----------|-------|------|----------|-------------|-------|
| `college_of_interest` | Area of interest | Select / autocomplete | Yes | 1 | Maps to program routing; use live option list |
| `firstname` | First name | Text | Yes | 2 | |
| `lastname` | Last name | Text | Yes | 2 | |
| `email` | Email | Email | Yes | 2 | |
| `phone` | Phone | Tel | Yes | 2 | |
| `state` | State | Select | Yes | 2 | US states list |
| `tcpa_checkbox` | TCPA consent | Checkbox | Yes | 2 | Use live consent copy |
| `military_status` | Military affiliation | Select | No | 2 | If present on live form |
| `clientdegreeid` | Program ID | Hidden | No | — | When pre-selected from campaign |
| `variant_id` | A/B variant | Hidden | No | — | **Add for Phase 2 tests** — cookie value → Lead API payload |

### Trust copy (below mini form)

Static text below hero form (not a separate paragraph):

- Primary: *"It only takes a minute. No obligation."* (or page-specific microcopy from spec)
- Secondary (v5): *"Takes under 60 seconds. No obligation. No spam."*

### Post-submit

| Event | Expected behavior |
|-------|-------------------|
| Success | Redirect to thank-you URL (personalized when `sid` / `token` present — see Phase 1 Task 1.10 audit) |
| Error | Inline field errors; preserve entered values |
| GA4 | `generate_lead` or existing conversion event + `variant_id` when testing |

### Drupal deliverables (RFI)

- [ ] Confirm live form plugin / webform ID per environment
- [ ] Document Lead API payload shape and required hidden fields
- [ ] Twig partials: `rfi-form--mini.html.twig`, `rfi-form--full.html.twig`
- [ ] JS: two-step stepper, validation mirroring live rules
- [ ] JS: `landing-rfi-sticky-bar.js` (see **FORM-05**)

---

## Module registry

One row per **catalog ID**. Paragraph machine names are **recommended** — align to existing Drupal paragraph types where they already exist.

**Legend:** 🟢 v1 required · 🟡 v1 optional · ⚪ theme/global · 🔵 page-specific override

### Navigation & chrome

| ID | Paragraph type (recommended) | Fields (editorial) | JS | v1 |
|----|------------------------------|-------------------|-----|-----|
| **NAV-01** | `landing_header_reduced` ⚪ | Logo (default theme), phone CTA, Apply link (optional) | Fixed header on scroll; reduced nav (hide full menu links) | 🟢 |
| **NAV-UX-01** | `landing_section_nav` 🟡 | `field_nav_items` (repeat: label, anchor_id) — **or** computed from page sections | `landing-section-nav.js`: sticky pills, scroll-spy active state, smooth scroll to `#anchor`, `scroll-margin-top` offset for fixed header | 🟡 |
| **FOOT-01** | `landing_footer` ⚪ | Standard site footer fields | None (or existing footer JS) | 🟢 |

### Hero & forms

| ID | Paragraph type (recommended) | Fields (editorial) | JS | v1 |
|----|------------------------------|-------------------|-----|-----|
| **HERO-01** | `landing_hero_rfi` | `field_headline` (plain), `field_subheadline` (long text), `field_brand_label` (optional), `field_bg_image_desktop` (media), `field_bg_image_mobile` (media), `field_highlights` (repeat: text, max 3), `field_form_intro_title`, `field_form_intro_body` | Optional subtle parallax on hero image (respect `prefers-reduced-motion`); **must not** cover faces with form on mobile | 🟢 |
| **FORM-01** | *(child of HERO-01 or embedded form block)* | See [RFI integration](#rfi-integration-shared) | Two-step mini stepper; `data-hero-form` root for sticky bar intersection | 🟢 |
| **FORM-02** | `landing_rfi_section` | `field_heading`, `field_subhead` (long text), `field_trust_chips` (repeat, optional), `field_form_variant` (list: full) | Full form validation; focus management on step change | 🟢 |
| **FORM-05** | *(theme library attach)* | Sticky label (default: "Request Information"), target anchor (default: `#rfi`) | `landing-rfi-sticky-bar.js`: hidden when `[data-hero-form]` intersects viewport; visible after scroll past hero; mobile-only or mobile-first; `padding-bottom: env(safe-area-inset-bottom)` | 🟢 |

### Trust & value

| ID | Paragraph type (recommended) | Fields (editorial) | JS | v1 |
|----|------------------------------|-------------------|-----|-----|
| **START-01** | `landing_start_dates` | `field_heading` (optional), `field_dates` (repeat: date, label) **or** computed next 2 start dates from API | Compute `daysLeft` **at render** in PHP/Twig (not client-only) to avoid hydration mismatch | 🟢 |
| **TRUST-02** | `landing_trust_strip` | `field_variant` (list: banner \| sidebar), `field_badges` (repeat: icon, label) — default 3 badges | None | 🟢 |
| **VP-01** | `landing_value_props` | `field_heading`, `field_subheading` (optional), `field_cards` (repeat: title, description, stat optional, icon optional), `field_experience_title`, `field_experience_body`, `field_experience_cta` (link, optional) | None | 🟢 |
| **TRUST-01** | `landing_testimonial` | `field_heading`, `field_subheading` (optional), `field_testimonials` (repeat: `field_tag` (optional, e.g. "Working Parent"), `field_quote` (long text), `field_name`, `field_credential`) | None — CSS grid handles 1→2→3 col responsive layout | 🟢 |

### Content & proof

| ID | Paragraph type (recommended) | Fields (editorial) | JS | v1 |
|----|------------------------------|-------------------|-----|-----|
| **BRIDGE-01** | `landing_section_bridge` 🟡 | `field_variant` (light \| dark), `field_text`, `field_target_anchor` (link to #id) | Smooth scroll on click (optional) | 🟡 |
| **PROG-01** | `landing_program_explorer` | `field_heading`, `field_subheading`, `field_compact` (bool), `field_programs` (entity ref or JSON view), `field_show_transfer_callout` (bool, default false) | `landing-program-explorer.js`: search/filter, expandable rows (details/summary or ARIA accordion), **no** per-program RFI buttons; mobile: ~6 visible + "Show all" expand; **native `<select>`** for area filter (no horizontal pill scroll trap) | 🟢 on v5/v7 |
| **SKEPT-01** | `landing_skepticism_buster` 🔵 | `field_heading`, `field_subheading`, `field_soft_cta`, `field_cards` (repeat: question, proof_stat, proof_stat_label, answer, expanded_bullets[]) | `landing-skept-buster.js`: independent disclosure (multiple open OK); chevron ≥44px touch target | 🟢 on OCC only |
| **CAREER-01** | `landing_career_outcomes` | `field_heading`, `field_subheading`, `field_comparison_rows` (repeat: program, salary, growth, titles), `field_handshake_stat`, `field_handshake_body` | Optional tab/filter if multiple program columns; table responsive scroll **or** stacked cards on mobile | 🟢 on v5/v7 |
| **SALARY-01** | `landing_salary_growth` | `field_heading`, `field_degree_tiers` (repeat), `field_source_url`, `field_source_label` (default: BLS) | `landing-salary-tabs.js`: field/degree tab switch (if tabs used) | 🟢 on v5/v7 |
| **FIN-01** | `landing_tuition_aid` | `field_heading`, `field_pricing_tiers` (repeat: label, amount, accent bool), `field_bridge_stat`, `field_savings_cards` (repeat: id, label, stat, stat_label, bullets[]) | `landing-fin-disclosure.js`: expandable disclosure cards; stats always visible; **no outbound links** off page | 🟢 |
| **CRED-01** | `landing_employer_credentials` | `field_heading`, `field_stats` (repeat: value, label), `field_body`, `field_badges` (media/icons, optional) | None | 🟢 on v5/v7 |
| **EMOT-01** | `landing_emotional_motivation` | `field_heading`, `field_body`, `field_pull_quote`, `field_stats` (repeat) | None | 🟢 on v5/v7 |
| **FAQ-01** | `landing_faq` | `field_heading`, `field_categories` (repeat: category label, items[]: question, answer) | `landing-faq-accordion.js`: one or multi-expand per design; category filters optional | 🟢 |
| **CTA-01** | `landing_bottom_cta` | `field_heading`, `field_paths` (repeat: type [chat \| phone \| anchor \| link], label, url/tel) | Chat widget trigger hook if type=chat | 🟢 |

---

## JavaScript requirements

Load behaviors via Drupal `libraries.yml` — **one library per interactive module** for maintainability.

| Library key | Attached to | Behavior | Breakpoints | A11y |
|-------------|-------------|----------|-------------|------|
| `landing/section-nav` | NAV-UX-01 | Sticky horizontal nav; IntersectionObserver or scroll listener for active pill; click → `scrollIntoView` with header offset | All; hide or simplify if `<768px` and too many pills | Keyboard focus visible; `aria-current="true"` on active pill |
| `landing/rfi-mini` | FORM-01 | Step 1 → Step 2; client validation before advance | All | Announce step change; error `aria-describedby` |
| `landing/rfi-sticky-bar` | FORM-05 (page attach) | Show when hero form leaves viewport; hide when hero form visible | `<1024px` primary | Bar does not trap focus; CTA min 44px height |
| `landing/program-explorer` | PROG-01 | Search debounce; filter by area; row expand/collapse; mobile show-all | Mobile: no nested scroll containers | Expand button `aria-expanded`; list `role="list"` |
| `landing/skept-buster` | SKEPT-01 | Toggle card body; multiple open | 3-col desktop / 1-col mobile | Button per card; 44px min target |
| `landing/fin-disclosure` | FIN-01 | Independent `<details>` or accordion panels | 3-col → 2-col → 1-col grid | Focus management on open |
| `landing/faq` | FAQ-01 | Accordion per item or per category | All | Standard accordion ARIA pattern |
| `landing/salary-tabs` | SALARY-01 | Tab panel switch | Optional desktop only | `role="tablist"` / `aria-selected` |

**Global page attach (all three templates):**

```yaml
# Example — TBD: Drupal team
landing-page-base:
  js:
    js/landing-rfi-sticky-bar.js: {}
  dependencies:
    - core/drupal
    - core/once
```

**Do not port from Next.js:** React state, Tailwind class strings, Next `Image`, or `"use client"` boundaries — reimplement behaviors in vanilla JS or existing Drupal patterns.

---

## Per-template section order

Each table = paragraph order on the node. **Shared** modules use identical paragraph types; copy differs per [Page overrides](#page-specific-overrides).

### `request-info-v5`

**Live URL:** `https://www.uagc.edu/success/request-info-v5`  
**Substantive modules:** ~16 · **Target height:** ~12–13 mobile screens

| Order | ID | Anchor ID | Paragraph type | Notes |
|------:|-----|-----------|----------------|-------|
| — | NAV-01 | — | theme region | `variant=reduced` |
| — | NAV-UX-01 | — | `landing_section_nav` | 8 pills — see v5 spec |
| 1 | HERO-01 + FORM-01 | `#hero-rfi` | `landing_hero_rfi` | Headline: *"Earn Your Degree 100% Online at UAGC"* |
| 2 | START-01 | — | `landing_start_dates` | Shared |
| 3 | TRUST-02 | — | `landing_trust_strip` | `variant=banner` — below START, not in hero |
| 4 | VP-01 | `#why-uagc` | `landing_value_props` | Card 1 = Generous Transfer Policy; **no** bulletPoints |
| 5 | BRIDGE-01 | → `#programs` | `landing_section_bridge` | `variant=light` |
| 6 | PROG-01 | `#programs` | `landing_program_explorer` | **`compact=true`** |
| 7 | BRIDGE-01 | → `#careers` | `landing_section_bridge` | `variant=dark` |
| 8 | CAREER-01 | `#careers` | `landing_career_outcomes` | Table + Handshake; no adjacent comparison section |
| 9 | SALARY-01 | — | `landing_salary_growth` | BLS source linked inline |
| 10 | FIN-01 | `#tuition` | `landing_tuition_aid` | On-page disclosures only |
| 11 | CRED-01 | `#credentials` | `landing_employer_credentials` | bg `#fdf8ef` |
| 12 | TRUST-01 | `#stories` | `landing_testimonial` | 3-card grid: Working Parent, Career Changer, First-Generation Student |
| 13 | EMOT-01 | — | `landing_emotional_motivation` | Navy band |
| 14 | FORM-02 | `#rfi` | `landing_rfi_section` | Full RFI |
| 15 | FAQ-01 | `#faq` | `landing_faq` | 4 categories |
| 16 | CTA-01 | — | `landing_bottom_cta` | 4 paths: chat, phone, #rfi, apply |
| — | FOOT-01 | — | theme region | |
| — | FORM-05 | — | theme attach | Mobile sticky bar |

---

### `degree-programs-v7`

**Live URL:** `https://www.uagc.edu/success/degree-programs-v7`  
**Substantive modules:** ~16 · **Target height:** ~12–13 mobile screens

Same stack as **request-info-v5** with these overrides:

| ID | Override |
|----|----------|
| **HERO-01** | Headline: *"Find the Right Degree for Your Career"*; highlights: WSCUC Accredited, 50+ Programs, $0 to Apply; hero image Page_6 |
| **VP-01** | Proof-forward subhead; transfer/2+2 card copy |
| **PROG-01** | **`compact=false`** (full explorer — centerpiece of page) |
| *All others* | Same paragraph types and fields as v5 unless copy differs in [`degree-programs-v7-modules.json`](./componentry/degree-programs-v7-modules.json) |

---

### `online-college-courses-v5`

**Live URL:** `https://www.uagc.edu/success/online-college-courses-v5`  
**Substantive modules:** ~10 · **Target height:** ~8–9 mobile screens (lean)

| Order | ID | Anchor ID | Paragraph type | Notes |
|------:|-----|-----------|----------------|-------|
| — | NAV-01 | — | theme region | Shared |
| — | NAV-UX-01 | — | `landing_section_nav` | **6 pills** only: why-uagc, proof, tuition, stories, rfi, faq |
| 1 | HERO-01 + FORM-01 | `#hero-rfi` | `landing_hero_rfi` | OCC hero image Page_9; trial-forward copy |
| 2 | START-01 | — | `landing_start_dates` | Shared |
| 3 | TRUST-02 | — | `landing_trust_strip` | Shared |
| 4 | VP-01 | `#why-uagc` | `landing_value_props` | Card 2 = Try Your First Course Free |
| 5 | **SKEPT-01** | `#proof` | `landing_skepticism_buster` | **OCC exclusive** — replaces CAREER, SALARY, CRED, EMOT |
| 6 | FIN-01 | `#tuition` | `landing_tuition_aid` | Same as v5 |
| 7 | TRUST-01 | `#stories` | `landing_testimonial` | 3-card grid: Working Parent, Exploring Options, Returning to School |
| 8 | FORM-02 | `#rfi` | `landing_rfi_section` | Wrapper copy replaces EMOT-01 emotional beat |
| 9 | FAQ-01 | `#faq` | `landing_faq` | Course-format FAQ set |
| 10 | CTA-01 | — | `landing_bottom_cta` | Shared |
| — | FOOT-01 | — | theme region | |
| — | FORM-05 | — | theme attach | Shared |

**Omitted on OCC (do not add without brief):** PROG-01, CAREER-01, SALARY-01, CRED-01, BRIDGE-01, EMOT-01

---

## Page-specific overrides

### NAV-UX-01 — section pills by template

| Template | `field_nav_items` |
|----------|-------------------|
| request-info-v5 | why-uagc, programs, careers, tuition, credentials, stories, rfi, faq |
| degree-programs-v7 | Same as v5 |
| online-college-courses-v5 | why-uagc, **proof**, tuition, stories, rfi, faq |

### HERO-01 — copy matrix

| Field | request-info-v5 | degree-programs-v7 | online-college-courses-v5 |
|-------|-----------------|--------------------|-----------------------------|
| Headline | Earn Your Degree 100% Online at UAGC | Find the Right Degree for Your Career | Explore Flexible Online Courses at UAGC |
| Highlight 1 | 5-Week Courses | WSCUC Accredited | Try a Course Free |
| Highlight 2 | Transfer Up to 75% of Credits | 50+ Programs | 5-Week Classes |
| Highlight 3 | $0 to Apply | $0 to Apply | $0 to Apply |
| Hero image | hero-v5 assets | Page_6 | Page_9 (live OCC asset) |

### VP-01 — card 2 differentiator

| Template | Card 2 title |
|----------|--------------|
| v5 / v7 | No Standardized Tests Required (or spec default) |
| OCC | **Try Your First Course Free** (stat: 3 wk) |

### FORM-02 — section wrapper

| Template | Heading |
|----------|---------|
| v5 | Take the Next Step Toward Your Degree (or program-specific variant in spec) |
| v7 | Get Program Details Tailored to Your Goals |
| OCC | Your Future Starts with One Course |

---

## CSS & tokens (Drupal theme)

Map from [`MASTER.md`](./MASTER.md) — do not hardcode one-off hex in Twig.

| Token | CSS variable (recommended) | Use |
|-------|---------------------------|-----|
| `#0C234B` | `--uagc-navy` | Navy sections, header text |
| `#EF9600` | `--uagc-gold` | Primary CTA, checkmarks, START-01 accents (**paid landing** — not strict Reskin red until brand sign-off) |
| `#faf9f7` | `--uagc-surface-warm` | VP-01, FORM-02 bg |
| `#fdf8ef` | `--uagc-surface-cred` | CRED-01 bg |
| `#111111` / `#53565A` | `--text-primary` / `--text-muted` | Body copy |
| Headlines | `--font-heading-condensed` | Fira Sans Extra Condensed 800 (web stand-in for Proxima Extra Condensed) |
| H3–H5 | `--font-heading` | Montserrat 600 |
| Body | `--font-body` | Fira Sans 16/24 desktop, 14/18 micro |

**Layout:**

- Max width `1440px` centered
- Section horizontal padding: 16px mobile → 32px desktop
- Fixed header offset: `scroll-margin-top` on anchored sections (`80px` typical)
- Flat colors only — no gradients, alpha overlays, or decorative shadows

---

## Build phases (recommended)

### v1 — Layout parity (Phase 2 exit)

- [ ] Paragraph types for all 🟢 modules used on target template
- [ ] RFI mini + full + sticky bar wired to live Lead API
- [ ] Three template nodes assemble from section order tables
- [ ] Mobile-first QA against acceptance checklists in page specs
- [ ] Staging URL for stakeholder sign-off

### v1.1 — Interaction polish

- [ ] NAV-UX-01 scroll-spy
- [ ] PROG-01 mobile show-all + native select filter
- [ ] FIN-01 / SKEPT-01 disclosure animations (respect reduced motion)

### v2 — Test & learn

- [ ] A/B `variant_id` hidden field + GA4
- [ ] Cookie-based variant assignment on `/success/request-info-v5`
- [ ] Thank-you page next-step improvements (Phase 1 Task 1.10 gaps)

---

## QA checklist (Drupal)

Before launch on each template:

- [ ] Module order matches [Per-template section order](#per-template-section-order)
- [ ] Hero RFI two-step; trust line below form
- [ ] FORM-05 hidden on initial hero view; appears after scroll (mobile)
- [ ] VP-01: no section-level RFI; no bulletPoints duplicating TRUST-02
- [ ] PROG-01 (v5/v7): no per-program Request Info CTA; 50+ programs copy
- [ ] FIN-01: no outbound links; disclosures stay on-page
- [ ] CTA-01: chat, phone, #rfi, apply-now all functional
- [ ] Touch targets ≥44px on mobile form and disclosure controls
- [ ] Typography matches token ramp (headlines Extra Condensed, body 16/24)
- [ ] Lead submission succeeds on staging with production-equivalent payload

---

## Open items — Drupal team

| # | Item | Owner | Status |
|---|------|-------|--------|
| 1 | Confirm existing paragraph type names vs this doc | TBD — Drupal team | ☐ |
| 2 | Live RFI webform / form plugin ID + Lead API schema | TBD — Drupal team | ☐ |
| 3 | Program data source for PROG-01 | TBD — Drupal team | ☐ |
| 4 | Start date computation source for START-01 | TBD — Drupal team | ☐ |
| 5 | Chat widget integration for CTA-01 | TBD — Drupal team | ☐ |
| 6 | A/B variant mechanism (cookie + hidden field) | TBD — Dev / Analytics | ☐ |
| 7 | Map Lightcast embed codes if CAREER-01 uses widget | TBD — see `EmbedCodes-LightcastWidget(Sheet1).csv` | ☐ |

---

## Document maintenance

When prototype or Figma changes:

1. Update `design-system/pages/<template>.md` and `componentry/*-modules.json` first.
2. Sync **Page-specific overrides** and **section order** tables in this file.
3. Do **not** duplicate full field lists — link to JSON manifest for prop/detail changes.

**Last updated:** 2026-06-02 · **Catalog version:** 26-module Layout Score Builder set
