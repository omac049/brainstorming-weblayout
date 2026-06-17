# Drupal Handoff — UAGC Template Implementation Guide

**Purpose:** Production implementation guide for all **7 Phase 2 templates** — map catalog module IDs to Drupal **content types**, **paragraph stacks**, **theme regions**, and **RFI integration**. Field-level specs, Twig patterns, and JavaScript behaviors live in the global component library.

**Audience:** Drupal theme developers, back-end engineers, content editors, QA.

**This document is the assembly and integration layer.** Component specifications are authoritative in [`GLOBAL-COMPONENTS.md`](./GLOBAL-COMPONENTS.md). Visual specs in Figma; interaction reference in `prototypes/` Next.js app. **Do not treat the Next.js repo as shippable code.**

**Catalog version:** 49-module global component library · **Last updated:** 2026-06-15

---

## How to use this doc

1. **Implement paragraph types once** from [`GLOBAL-COMPONENTS.md`](./GLOBAL-COMPONENTS.md) — reuse across all seven templates.
2. **Assemble pages** from [Per-template section order](#per-template-section-order) — each row is one paragraph instance (or theme region for global chrome).
3. **Wire RFI forms** per [RFI integration](#rfi-integration-shared) — reuse live Lead API / existing form handlers; restyle wrappers only unless Phase 2 A/B requires variant tagging.
4. **Load CSS** from [`drupal-theme.css`](./drupal-theme.css) and attach JS libraries named in `GLOBAL-COMPONENTS.md` per module.
5. **Fill Drupal-specific columns** marked `TBD — Drupal team` before sprint planning.

### Related files

| Asset | Path |
|-------|------|
| **Component specs (primary)** | [`GLOBAL-COMPONENTS.md`](./GLOBAL-COMPONENTS.md) |
| **Drupal-ready CSS** | [`drupal-theme.css`](./drupal-theme.css) |
| Design tokens | [`MASTER.md`](./MASTER.md) |
| Reskin alignment | [`RESKIN-ALIGNMENT.md`](./RESKIN-ALIGNMENT.md) |
| Paid — v5 page spec | [`pages/request-info-v5.md`](./pages/request-info-v5.md) |
| Paid — v7 page spec | [`pages/degree-programs-v7.md`](./pages/degree-programs-v7.md) |
| Paid — OCC page spec | [`pages/online-college-courses-v5.md`](./pages/online-college-courses-v5.md) |
| Organic — hub spec | [`pages/online-degrees-hub.md`](./pages/online-degrees-hub.md) |
| Organic — thank-you spec | [`pages/request-information-thank-you.md`](./pages/request-information-thank-you.md) |
| Module manifests (JSON) | [`componentry/request-info-v5-modules.json`](./componentry/request-info-v5-modules.json) |
| | [`componentry/degree-programs-v7-modules.json`](./componentry/degree-programs-v7-modules.json) |
| | [`componentry/online-college-courses-v5-modules.json`](./componentry/online-college-courses-v5-modules.json) |
| | [`componentry/online-degrees-hub-modules.json`](./componentry/online-degrees-hub-modules.json) |
| | [`componentry/request-information-thank-you-modules.json`](./componentry/request-information-thank-you-modules.json) |
| Figma componentry | [`FIGMA-FILES.md`](./FIGMA-FILES.md) |
| Component registry CLI | `.cursor/skills/uagc-component-manager/scripts/registry.py` (`page`, `drupal`, `diff`) |
| Interactive reference | `prototypes/` (not production) |

### Template index

| Key | Template | Live URL pattern | Content type (recommended) |
|-----|----------|------------------|----------------------------|
| v5 | `request-info-v5` | `/success/request-info-v5` | `paid_landing_page` |
| v7 | `degree-programs-v7` | `/success/degree-programs-v7` | `paid_landing_page` |
| occ | `online-college-courses-v5` | `/success/online-college-courses-v5` | `paid_landing_page` |
| homepage | `organic-homepage` | `/` | `organic_page` |
| hub | `online-degrees-hub` | `/online-degrees/` | `organic_page` |
| blog | `blog-article` | `/blog/*` | `blog_article` |
| ty | `request-information-thank-you` | `/request-information/thank-you` | `thank_you_page` |

---

## Architecture assumptions

> **Template:** Replace bracketed placeholders with your Drupal conventions before build.

| Layer | Recommended pattern | Notes |
|-------|---------------------|-------|
| **Paid content type** | `paid_landing_page` (or extend existing `/success/*` type) | One node per paid URL; paragraphs field for module stack |
| **Organic content type** | `organic_page` (or extend homepage/hub node types) | Homepage and hub share paragraph library; hero variant differs (`HERO-V2` vs `HERO-ORG`) |
| **Blog content type** | `blog_article` | Long-text **body** field (WYSIWYG or structured paragraphs); optional `field_contextual_cta`, `field_sidebar_blocks` |
| **Thank-you content type** | `thank_you_page` (or route-only template) | Personalized variant driven by query params / session token — not a separate node per submission |
| **Module field** | `field_landing_sections` / `field_organic_sections` → Entity reference revisions → Paragraphs | Ordered; each paragraph = one catalog module |
| **Paid global chrome** | Theme regions or fixed paragraphs | `NAV-01` (reduced header), `FOOT-01` (paid footer variant) on `/success/*` |
| **Organic global chrome** | Theme regions | `NAV-00` (`SiteHeader` — full nav with Military / Partnerships dropdowns), `FOOT-01` (`SiteFooter` — live `uagc.edu` structure, text affiliation only) |
| **Thank-you chrome** | Theme region variant | `NAV-00-TY` — full header but **hide Request Info**; footer may also suppress RFI links |
| **Forms** | Existing RFI webform / custom form plugin | **Do not rebuild** submission pipeline for layout Phase 2 |
| **Program data** | Taxonomy / JSON feed / existing program API | `PROG-01`, hub popular links, blog program filter consume same source as live program pages |
| **Start dates** | Computed at render (CMS field or API) | `START-01`: next two dates on paid; single populated card on thank-you; `daysLeft` at render time |
| **A/B variants** | Cookie + variant ID on form hidden field + GA4 | Phase 2 validation on **Drupal staging**, not Next.js |
| **CSS** | Include `drupal-theme.css` in theme pipeline | Custom properties, typography utilities, layout classes — values align with `MASTER.md` |
| **Twig** | One template per paragraph type | e.g. `paragraph--landing-hero-rfi.html.twig`, `paragraph--organic-hero-v2.html.twig` |

### Organic-specific content model

| Entity / field | Recommended pattern | Notes |
|----------------|---------------------|-------|
| **Blog author** | User reference or `field_author` (name, photo, title) | Displayed in `BLOG-HERO` meta row |
| **Publish date** | `field_published_date` (datetime) | Formatted in article meta |
| **Last updated** | `field_last_updated` (datetime) | Show "Updated" badge when different from publish date |
| **Reading time** | Computed at render or `field_reading_time` (integer, minutes) | Shown in hero subhead and meta |
| **Categories / tags** | Taxonomy terms | Eyebrow on `BLOG-HERO`; related-article filtering |
| **Related articles** | Entity reference or views block | `BLOG-SIDEBAR` related list |
| **Featured image** | Media reference | `BLOG-HERO` editorial hero image |
| **Table of contents** | Computed from H2/H3 in body | `BLOG-TOC` — no separate editorial field |
| **Newsletter** | Webform or external endpoint | `BLOG-NEWSLETTER` — endpoint TBD (see Open items) |
| **Thank-you personalization** | Query params (`sid`, `token`, `submissionID`) or session | `firstName`, `program`, `confirmationId`, masked email — see thank-you spec |
| **Video testimonials** | Media entities or oEmbed URLs | `TRUST-01` organic variant — CDN embed from `uagc.edu` |

---

## Component library reference

**Do not duplicate field lists here.** All paragraph types, editorial fields, Twig template names, JavaScript library keys, CSS class hooks, responsive rules, and accessibility notes are documented in:

**[GLOBAL-COMPONENTS.md](./GLOBAL-COMPONENTS.md)**

Use the [Component Inventory](./GLOBAL-COMPONENTS.md#component-inventory) and [Cross-Template Usage Matrix](./GLOBAL-COMPONENTS.md#cross-template-usage-matrix) to see which modules apply to each template. Run `python registry.py page <key>` for ordered stacks (`v5`, `v7`, `occ`, `hub`, `homepage`, `blog`, `ty`).

### JavaScript requirements

Interactive behaviors (section nav scroll-spy, RFI stepper, program explorer, FAQ accordion, blog TOC, video modal, cost estimator, graduation calculator, etc.) are specified per module in `GLOBAL-COMPONENTS.md`.

Load behaviors via Drupal `libraries.yml` — **one library per interactive paragraph** where possible. Do **not** port React state, Tailwind class strings, Next `Image`, or `"use client"` boundaries — reimplement in vanilla JS or existing Drupal patterns.

**Global page attach (paid templates):**

```yaml
# Example — TBD: Drupal team
landing-page-base:
  js:
    js/landing-rfi-sticky-bar.js: {}
  dependencies:
    - core/drupal
    - core/once
```

**Global page attach (organic templates):** See `GLOBAL-COMPONENTS.md` for `organic/*`, `blog/*`, and `thankyou/*` library keys.

---

## RFI integration (shared)

All **`FORM-01`**, **`FORM-02`**, and **`FORM-05`** instances must use the **live** request-information pipeline.

### Form variants

| Catalog ID | Drupal placement | UX variant | Submit behavior |
|------------|------------------|------------|-----------------|
| **FORM-01** | Embedded in **HERO-01** paragraph | Two-step **mini** | Same endpoint as live `/success/request-info-v5` hero RFI |
| **FORM-02** | Standalone mid-page paragraph | **Full** (single or two-step per live) | Same endpoint; optional section heading wrapper |
| **FORM-05** | Theme attach (mobile) | Sticky CTA bar → scroll to `#rfi` or expand mini | No separate submit — navigation only |

### Organic RFI placement rules

| Template | FORM-01 (hero) | FORM-02 (mid-page) | FORM-05 (sticky) |
|----------|----------------|--------------------|------------------|
| Paid (v5, v7, OCC) | Yes — in HERO-01 | Yes — closing band | Yes — after scroll past hero |
| Organic homepage | **No** | Yes — navy closing band (`#rfi`) | Yes |
| Online-degrees hub | **No** | Yes — closing band only | Yes |
| Blog article | **No** | **No** — sidebar may link to program pages | Yes — scroll target is sidebar, not hero |
| Thank-you | **No** | **No** — user already converted | **No** |

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
- [ ] JS: `landing-rfi-sticky-bar.js` (see **FORM-05** in `GLOBAL-COMPONENTS.md`)

---

## Per-template section order

Each table = paragraph order on the node (or theme attach). **Shared** modules use identical paragraph types; copy differs per [Page overrides](#page-specific-overrides). Paragraph machine names and fields: `GLOBAL-COMPONENTS.md`.

---

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
| — | FOOT-01 | — | theme region | Paid footer variant |
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

### `organic-homepage`

**Live URL:** `https://www.uagc.edu/`  
**Prototype route:** `/organic/homepage`  
**Substantive modules:** ~14 · **Target height:** conversion-aware discovery hub (not paid-length)

| Order | ID | Anchor ID | Paragraph type | Notes |
|------:|-----|-----------|----------------|-------|
| — | NAV-00 | — | theme region | Full `SiteHeader`; Military / Partnerships dropdowns |
| 1 | HERO-V2 | — | `organic_hero_v2` | *"Finish Your Degree / On Your Schedule"* — **no in-hero RFI**; 4 trust pills only |
| 2 | IMPACT | `#impact` | `organic_impact_strip` | 5-stat flat band immediately after hero |
| — | *(section nav)* | — | inline / hero attach | Sticky pills: At a Glance, Why UAGC, Stories, Your Path, Programs, Tuition, Request Info |
| 3 | WHY-CHOOSE | `#why-uagc` | `organic_why_choose` | Brandy-style 2-col photo + stats — not paid VP-01 |
| 4 | TRUST-01 | `#social-proof` | `organic_video_testimonial` | Video thumbnails + modal — not text quote cards |
| 5 | PERSONA-PATHS | `#paths` | `organic_persona_paths` | Online Degrees / Admission / Financial Aid tabs |
| 6 | ACCR-01 | — | `organic_accreditation` | UA horizontal logo band |
| 7 | PROG-01 | `#programs` | `landing_program_explorer` | `compact=false`; CTA scrolls to `#rfi` — no per-program RFI |
| 8 | COST-EST | `#cost-estimator` | `organic_cost_estimator` | Two-column estimator; "Request plan" pre-fills closing RFI |
| 9 | INTEREST-GRID | — | `organic_interest_grid` | Flat navy discovery cards by area of study |
| 10 | FORM-02 | `#rfi` | `landing_rfi_section` | Navy full-width band; white form card; optional cost-plan context |
| 11 | FAQ-01 | `#faq` | `landing_faq` | Accordion; "See all" expand for additional items |
| — | FOOT-01 | — | theme region | Organic `SiteFooter` — live structure |
| — | FORM-05 | — | theme attach | Sticky bar; no hero form to intersect — targets `#rfi` |

**Omitted:** HERO-01, FORM-01, VP-01, FIN-01, WAYS-TO-SAVE, standalone CTA-01.

---

### `online-degrees-hub`

**Live URL:** `https://www.uagc.edu/online-degrees/`  
**Prototype route:** `/organic/online-degrees`  
**Substantive modules:** ~16 · **Discovery-first** — no hero or mid-page RFI except closing band

| Order | ID | Anchor ID | Paragraph type | Notes |
|------:|-----|-----------|----------------|-------|
| — | NAV-00 | — | theme region | Header Request Info → `#rfi` |
| 1 | HERO-ORG | — | `organic_hero` | *"Your Degree, Your Schedule"* — trust pills only; **no embedded RFI** |
| — | *(section nav)* | — | inline attach | Pills: Your Path, Programs, Tuition, Areas, Stories, Careers, Get Started, FAQ |
| 2 | HUB-POPULAR | — | `organic_popular_programs` | Top 3 degree quick links + View all 50+ |
| 3 | PERSONA-PATHS | `#paths` | `organic_persona_paths` | `show=tabs` — transfer / military / graduate / career-changer routing |
| 4 | PROG-01 | `#programs` | `landing_program_explorer` | Searchable catalog — centerpiece |
| 5 | TUITION-BAND | `#tuition` | `organic_tuition_band` | Highlight band — not full FIN-01 |
| 6 | WAYS-TO-SAVE | `#ways-to-save` | `organic_ways_to_save` | Expandable on-page cards; no outbound links |
| 7 | AREAS | `#areas` | `organic_areas_of_study` | Category browse grid |
| 8 | TRUST-01 | `#stories` | `organic_video_testimonial` | Hub-specific video set |
| 9 | CAREER-01 | `#outcomes` | `landing_career_outcomes` | Hub-lite outcomes + Handshake |
| 10 | HUB-JOURNEY | `#journey` | `organic_journey` | Enrollment journey steps |
| 11 | CTA-01 | `#next-steps` | `landing_bottom_cta` | Multi-path: chat, call, #rfi, apply |
| 12 | ACCR-01 | — | `organic_accreditation` | WSCUC / UA band before closing RFI |
| 13 | FORM-02 | `#rfi` | `landing_rfi_section` | **Only** mid-page RFI on hub |
| 14 | FAQ-01 | `#faq` | `landing_faq` | Hub-specific FAQ set |
| — | FOOT-01 | — | theme region | Organic footer |
| — | FORM-05 | — | theme attach | Mobile sticky bar |

---

### `blog-article`

**Live URL:** `https://www.uagc.edu/blog/*`  
**Prototype route:** `/organic/blog/*`  
**Substantive modules:** ~10 · **Editorial** — no mid-page RFI

| Order | ID | Anchor ID | Paragraph type | Notes |
|------:|-----|-----------|----------------|-------|
| — | BLOG-PROGRESS | — | theme/page attach | Reading progress bar — top of viewport |
| — | NAV-00 | — | theme region | Full header |
| — | *(breadcrumb)* | — | node / theme | Home → Blog → Article title |
| 1 | BLOG-HERO | — | `blog_hero` | Editorial variant of organic hero; category eyebrow; featured image |
| — | *(article meta)* | — | node fields | Author photo, publish date, reading time, updated badge |
| 2 | BLOG-TOC | — | `blog_toc` (computed) | In main column above body; scroll-spy active heading |
| 3 | BLOG-BODY | — | `blog_body` (node field) | WYSIWYG + optional inline `BLOG-NEWSLETTER`; contextual CTA mid-article |
| 4 | BLOG-SIDEBAR | — | `blog_sidebar` (region) | Sticky sidebar: program filter, related articles, admission mini-CTA |
| — | BLOG-NEWSLETTER | — | `blog_newsletter` | Inline in body + optional sidebar slot |
| 5 | BLOG-SHARE | — | `blog_share` | Floating share buttons (desktop); toolbar share on mobile |
| 6 | BLOG-CTA | — | `blog_admission_cta` | Full-width closing admission band |
| — | FOOT-01 | — | theme region | Organic footer |
| — | FORM-05 | — | theme attach | Sticky Request Info — **no hero form**; targets sidebar or scroll |

**Node fields:** author, publish/updated dates, reading time, category, featured image, body, related articles, optional contextual CTA — see [Architecture assumptions](#architecture-assumptions).

---

### `request-information-thank-you`

**Live URL:** `https://www.uagc.edu/request-information/thank-you`  
**Prototype route:** `/organic/request-information/thank-you`  
**Substantive modules:** ~8–10 · **Post-conversion** — no RFI anywhere

| Order | ID | Anchor ID | Paragraph type | Notes |
|------:|-----|-----------|----------------|-------|
| — | NAV-00-TY | — | theme region | `hideRequestInfo=true`; Apply Now primary |
| 1 | TY-HERO | `#confirmation` | `thankyou_hero` | Personalized: *"Congratulations {firstName},"* + program pill; base variant when name missing |
| 2 | TY-RECEIPT | — | `thankyou_receipt` | Confirmation ID, masked email, program recap, response SLA |
| — | *(section nav)* | — | inline attach | Next Steps, What to Expect, Your Timeline, Your Program, Testimonials |
| 3 | START-01 | `#start-date` | `landing_start_dates` | Populated next start + countdown in hero (desktop card) |
| 4 | TY-NEXT | `#next-steps` | `thankyou_next_steps` | 3-step admissions process cards |
| 5 | TY-CONTACT | — | `thankyou_contact` | Phone + chat; advisor hours band |
| 6 | TY-CALC | `#time-to-graduation` | `thankyou_graduation_calc` | Time-to-graduation calculator — transfer credits input |
| 7 | TRUST-01 | `#testimonials` | `organic_video_testimonial` | Optional program-matched or general student videos |
| — | FOOT-01 | — | theme region | Organic footer; `hideRequestInfo` on footer links |

**Variants:** **Personalized** (`sid` / `token` / `submissionID`) injects first name + program + portal URL. **Base** (no params) uses generic copy — no trailing comma. **No RFI** (FORM-01/02/05) on this template.

---

## Page-specific overrides

### NAV-UX-01 — section pills by template (paid only)

| Template | `field_nav_items` |
|----------|-------------------|
| request-info-v5 | why-uagc, programs, careers, tuition, credentials, stories, rfi, faq |
| degree-programs-v7 | Same as v5 |
| online-college-courses-v5 | why-uagc, **proof**, tuition, stories, rfi, faq |

Organic homepage and hub use inline `HeroSectionNav` / hub section nav — anchors documented in section order tables above. Blog and thank-you use article-specific or post-submit nav pills.

### HERO — copy matrix (paid vs organic)

| Field | request-info-v5 | degree-programs-v7 | online-college-courses-v5 | organic-homepage (HERO-V2) | online-degrees-hub (HERO-ORG) |
|-------|-----------------|--------------------|-----------------------------|----------------------------|-------------------------------|
| Headline | Earn Your Degree 100% Online at UAGC | Find the Right Degree for Your Career | Explore Flexible Online Courses at UAGC | Finish Your Degree / On Your Schedule | Your Degree, Your Schedule |
| Trust / highlights | 5-Week Courses, Transfer, $0 Apply | WSCUC, 50+ Programs, $0 Apply | Try a Course Free, 5-Week, $0 Apply | $485/credit, 5-Week, WSCUC, $0 Apply | Same pill pattern — no in-hero CTA |
| In-hero RFI | **Yes** (FORM-01) | **Yes** | **Yes** | **No** | **No** |
| Hero image | hero-v5 assets | Page_6 | Page_9 (live OCC) | `homepage-mock-hero.mp4` + photo fallback | `hero.webp` / clone JSON |

### VP-01 — card 2 differentiator (paid)

| Template | Card 2 title |
|----------|--------------|
| v5 / v7 | No Standardized Tests Required (or spec default) |
| OCC | **Try Your First Course Free** (stat: 3 wk) |

Organic homepage uses **WHY-CHOOSE** (`organic_why_choose`) instead of VP-01.

### FORM-02 — section wrapper (paid + organic)

| Template | Heading |
|----------|---------|
| v5 | Take the Next Step Toward Your Degree |
| v7 | Get Program Details Tailored to Your Goals |
| OCC | Your Future Starts with One Course |
| organic-homepage | Ready to Take the Next Step? / Confirm Your Cost Plan (when COST-EST context present) |
| online-degrees-hub | Or Request Information Here |

### Organic-specific overrides

| Concern | Rule |
|---------|------|
| **Blog RFI** | No FORM-02; sticky FORM-05 only; sidebar program filter links to program pages |
| **Hub RFI** | No hero-embedded RFI; header Request Info + closing FORM-02 + FORM-05 only |
| **Thank-you personalization** | `firstName`, `program`, `confirmationId` from Lead API redirect — base fallback when params absent |
| **TRUST-01 variant** | Paid: 3-card text grid with persona tags; Organic: `VideoTestimonialSection` with modal playback |
| **FOOT-01 variant** | Paid: `Footer.tsx` pattern; Organic: `SiteFooter` — compact contact band, degree-area row, legal baseline; no logo images |

---

## CSS and tokens (Drupal theme)

Include **`drupal-theme.css`** in your theme — it provides all custom properties, typography utilities (`.type-h1` through `.type-micro`), layout classes (`.section-pad`, `.page-main`), form styling (`.rfi-input`, `.cta-primary`), interactive components, motion (scroll reveal, hero entrance), and reduced-motion fallbacks.

Token values align with [`MASTER.md`](./MASTER.md). Do not hardcode one-off hex in Twig.

**Layout conventions (all templates):**

- Max width `1440px` centered
- Section horizontal padding: 16px mobile → 32px desktop
- Fixed header offset: `scroll-margin-top` on anchored sections (`80px` typical; organic headers may need `108px` on large breakpoints)
- Paid landing: flat colors only — no gradients, alpha overlays, or decorative shadows unless module spec allows
- Organic navy sections: maintain contrast — avoid faint `text-white/50`–`/70` on body copy; use `#b8c5d9` (`--uagc-navy-muted`) for subcopy on dark bands

**Scope classes (recommended):**

| Scope | Use |
|-------|-----|
| `.paid-landing` | `/success/*` paragraph wrappers |
| `.organic-page` | Homepage, hub |
| `.blog-article` | Blog node template |
| `.thank-you-page` | Post-RFI confirmation |

---

## Build phases (recommended)

### v1 — Paid landing layout parity

- [ ] Paragraph types for all paid modules used on v5, v7, OCC (see `GLOBAL-COMPONENTS.md`)
- [ ] `drupal-theme.css` integrated; paid scope classes applied
- [ ] RFI mini + full + sticky bar wired to live Lead API
- [ ] Three paid template nodes assemble from section order tables
- [ ] Mobile-first QA against acceptance checklists in page specs
- [ ] Staging URLs for stakeholder sign-off

### v1.1 — Paid interaction polish

- [ ] NAV-UX-01 scroll-spy
- [ ] PROG-01 mobile show-all + native `<select>` area filter
- [ ] FIN-01 / SKEPT-01 disclosure panels (respect `prefers-reduced-motion`)
- [ ] FAQ accordion ARIA patterns

### v1.5 — Organic core (homepage + hub)

- [ ] `organic_page` content type + `NAV-00` / organic `FOOT-01` theme regions
- [ ] HERO-V2, HERO-ORG, IMPACT, WHY-CHOOSE, video TRUST-01, PERSONA-PATHS, ACCR-01
- [ ] PROG-01 on homepage and hub (shared program data source)
- [ ] COST-EST on homepage; TUITION-BAND + WAYS-TO-SAVE on hub
- [ ] Closing FORM-02 + FORM-05 on homepage and hub — **no hero RFI**
- [ ] SiteHeader Military / Partnerships dropdowns functional

### v2 — Blog template + thank-you improvements

- [ ] `blog_article` content type with author, dates, reading time, categories, related articles
- [ ] BLOG-HERO, BLOG-BODY, BLOG-TOC, BLOG-SIDEBAR, BLOG-NEWSLETTER, BLOG-CTA, BLOG-PROGRESS, BLOG-SHARE
- [ ] Thank-you: TY-HERO, TY-RECEIPT, TY-NEXT, TY-CONTACT, TY-CALC; personalized vs base variants
- [ ] START-01 populated on thank-you (fix live empty start-date widget)
- [ ] Post-submit redirect passes personalization params

### v2.5 — Test and learn (A/B variant infrastructure)

- [ ] A/B `variant_id` hidden field + GA4 on paid RFIs
- [ ] Cookie-based variant assignment on `/success/request-info-v5`
- [ ] Staging validation before production traffic split

---

## QA checklist (Drupal)

Before launch on each template:

### All templates

- [ ] Module order matches [Per-template section order](#per-template-section-order)
- [ ] `drupal-theme.css` loaded; typography uses `.type-*` utilities
- [ ] Touch targets ≥44px on mobile form and disclosure controls
- [ ] Lead submission succeeds on staging with production-equivalent payload (paid + organic FORM-02)
- [ ] `scroll-margin-top` offsets account for fixed header height

### Paid (v5, v7, OCC)

- [ ] Hero RFI two-step; FORM-05 after scroll only; VP-01 / FIN-01 / PROG-01 rules per spec; CTA-01 paths work; OCC has SKEPT-01 only (no CAREER/SALARY/CRED/EMOT)

### Organic (homepage, hub, blog, thank-you)

- [ ] Homepage: HERO-V2 trust pills only; video modal on TRUST-01; COST-EST → FORM-02 pre-fill; SiteHeader dropdowns; organic footer matches live structure
- [ ] Hub: no hero RFI; closing FORM-02 only; WAYS-TO-SAVE on-page; FORM-05 after scroll
- [ ] Blog: progress bar + TOC scroll-spy; no mid-page RFI; sidebar sticky; author/meta correct; share buttons work
- [ ] Thank-you: personalized vs base variants; TY-RECEIPT + TY-CALC valid; no RFI; START-01 populated; NAV-00-TY hides Request Info

---

## Open items — Drupal team

| # | Item | Owner | Status |
|---|------|-------|--------|
| 1 | Confirm existing paragraph type names vs `GLOBAL-COMPONENTS.md` | TBD — Drupal team | ☐ |
| 2 | Live RFI webform / form plugin ID + Lead API schema | TBD — Drupal team | ☐ |
| 3 | Program data source for PROG-01 (paid + organic hub/homepage) | TBD — Drupal team | ☐ |
| 4 | Start date computation source for START-01 | TBD — Drupal team | ☐ |
| 5 | Chat widget integration for CTA-01 | TBD — Drupal team | ☐ |
| 6 | A/B variant mechanism (cookie + hidden field) | TBD — Dev / Analytics | ☐ |
| 7 | Map Lightcast embed codes if CAREER-01 uses widget | TBD — see `data/lightcast-embed-codes.csv` | ☐ |
| 8 | **Blog** content type fields, workflow, and related-article sourcing | TBD — Content / Drupal | ☐ |
| 9 | **Video** hosting / embed URLs for organic `TRUST-01` (`VideoTestimonialSection`) | TBD — Content / Media | ☐ |
| 10 | **Thank-you** personalization data source (`sid` / `token` / Lead API redirect shape) | TBD — Dev / CRM | ☐ |
| 11 | **Hub** program data feed for `HUB-POPULAR` quick links + `PROG-01` filter options | TBD — Drupal team | ☐ |
| 12 | **Newsletter** signup endpoint for `BLOG-NEWSLETTER` | TBD — Marketing / Dev | ☐ |
| 13 | Organic `SiteHeader` nav items — confirm GA4/GSC priority for utility labels | TBD — SEO / Content | ☐ |

---

## Document maintenance

When prototype or Figma changes:

1. Update `design-system/pages/<template>.md` and `componentry/*-modules.json` first.
2. Update field-level specs in **`GLOBAL-COMPONENTS.md`**.
3. Sync **Page-specific overrides** and **section order** tables in this file only.
4. Re-sync `drupal-theme.css` when `prototypes/src/app/globals.css` token or utility changes.
5. Run `python registry.py diff <a> <b>` to verify stack parity after module moves.

**Do not** duplicate full field lists in this file — link to `GLOBAL-COMPONENTS.md` and JSON manifests for prop/detail changes.

**Last updated:** 2026-06-15 · **Catalog version:** 49-module global component library
