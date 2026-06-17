# UAGC Global Component Library

**Purpose:** Single source of truth for all **49 catalog module IDs** across **7 templates** (3 paid landings, organic homepage, online-degrees hub, blog article, thank-you). Drupal developers implement paragraph types, fields, Twig, CSS, and JS from this document alone.

**Audience:** Drupal theme developers, back-end engineers, content editors, QA.

**Supersedes:** Per-page module tables in `DRUPAL-HANDOFF.md` (that file references this doc for field-level specs). Visual/interaction reference: `prototypes/` Next.js app. Tokens: [`MASTER.md`](./MASTER.md).

**Catalog version:** 49 modules · 7 templates · Last updated 2026-06-15

---

## How to use this document

1. Find the module in [Component Inventory](#component-inventory).
2. Check [Cross-Template Usage Matrix](#cross-template-usage-matrix) for where it appears.
3. Read the component spec for Drupal paragraph name, fields, Twig, JS, CSS, responsive rules, and a11y.
4. For RFI forms, also read [RFI Integration](#rfi-integration-shared).
5. For paid vs organic differences, see [Dual Implementation Notes](#dual-implementation-notes).

### Drupal naming conventions

| Prefix | Use |
|--------|-----|
| `landing_*` | Paid landing paragraphs (`/success/*`) |
| `organic_*` | Organic homepage, hub, shared organic modules |
| `blog_*` | Blog article template |
| `ty_*` / `thankyou_*` | Thank-you page |
| Theme region | Global chrome (`NAV-01`, `NAV-00`, `FOOT-01`, `FORM-05`) |

### Template keys

| Key | Route / URL |
|-----|-------------|
| **v5** | `request-info-v5` — `/success/request-info-v5` |
| **v7** | `degree-programs-v7` — `/success/degree-programs-v7` |
| **occ** | `online-college-courses-v5` — `/success/online-college-courses-v5` |
| **hub** | `online-degrees-hub` — `/online-degrees/` |
| **homepage** | `organic-homepage` — `/` |
| **blog** | `organic-blog-article` — `/blog/*` |
| **ty** | `request-information-thank-you` — `/request-information/thank-you` |

---

## Quick Reference

### Component Inventory

| Catalog ID | Name | Drupal paragraph (recommended) | Category | Templates |
|------------|------|-------------------------------|----------|-----------|
| NAV-01 | Global Header (reduced) | Theme region | nav | v5, v7, occ |
| NAV-00 | Global Header (full site) | Theme region | nav | hub, homepage, blog |
| NAV-00-TY | Site Header (post-submit) | Theme region variant | nav | ty |
| NAV-UX-01 | Section Nav (sticky pills) | `landing_section_nav` | nav | v5, v7, occ |
| HERO-01 | Hero: Split + RFI | `landing_hero_rfi` | hero | v5, v7, occ |
| HERO-ORG | Organic Hero (no RFI) | `organic_hero` | hero | hub |
| HERO-V2 | Organic Hero v2 (conversion) | `organic_hero_v2` | hero | homepage |
| BLOG-HERO | Blog Article Hero | `blog_hero` | hero | blog |
| TY-HERO | Confirmation Hero | `thankyou_hero` | hero | ty |
| FORM-01 | RFI: Hero (two-step mini) | Embedded in `landing_hero_rfi` | form | v5, v7, occ |
| FORM-02 | RFI: Mid-page (full) | `landing_rfi_section` | form | v5, v7, occ, hub, homepage |
| FORM-05 | Sticky RFI Bar (mobile) | Theme library attach | form | v5, v7, occ, hub, homepage, blog |
| TRUST-02 | Trust Strip (banner) | `landing_trust_strip` | trust | v5, v7, occ |
| TRUST-01 | Peer Testimonials | `landing_testimonial` / `organic_video_testimonial` | trust | v5, v7, occ, hub, homepage, ty |
| CRED-01 | Employer Credentials | `landing_employer_cred` | trust | v5, v7 |
| ACCR-01 | Accreditation Band | `organic_accreditation` | trust | hub, homepage |
| TY-RECEIPT | Submission Receipt | `thankyou_receipt` | trust | ty |
| VP-01 | Reasons to Choose UAGC | `landing_value_props` | vp | v5, v7, occ |
| WHY-CHOOSE | Why Choose UAGC (organic VP) | `organic_why_choose` | vp | homepage |
| START-01 | Upcoming Start Dates | `landing_start_dates` | content | v5, v7, occ, ty |
| BRIDGE-01 | Next Step Bridge | `landing_section_bridge` | content | v5, v7 |
| EMOT-01 | Emotional Motivation | `landing_emotional` | content | v5, v7 |
| IMPACT | Impact Strip (stats band) | `organic_impact_strip` | content | homepage |
| HUB-JOURNEY | Start Your Journey | `organic_journey` | content | hub |
| TY-NEXT | Next Steps | `thankyou_next_steps` | content | ty |
| TY-CALC | Time to Graduation Calculator | `thankyou_graduation_calc` | content | ty |
| SKEPT-01 | Skepticism Buster | `landing_skepticism_buster` | proof | occ |
| PROG-01 | Program Explorer | `landing_program_explorer` | program | v5, v7, hub, homepage |
| HUB-POPULAR | Popular Programs Quick Links | `organic_popular_programs` | discovery | hub |
| PERSONA-PATHS | Persona Path Cards | `organic_persona_paths` | discovery | hub, homepage |
| AREAS | Areas of Study Grid | `organic_areas_of_study` | discovery | hub |
| INTEREST-GRID | Interest Area Grid | `organic_interest_grid` | discovery | homepage |
| CAREER-01 | Career Outcomes | `landing_career_outcomes` | career | v5, v7, hub |
| SALARY-01 | Salary Growth | `landing_salary_growth` | career | v5, v7 |
| FIN-01 | Tuition & Financial Aid | `landing_tuition_aid` | financial | v5, v7, occ |
| TUITION-BAND | Tuition Highlight Band | `organic_tuition_band` | financial | hub |
| WAYS-TO-SAVE | Ways to Make It Affordable | `organic_ways_to_save` | financial | hub |
| COST-EST | Cost Estimator | `organic_cost_estimator` | financial | homepage |
| FAQ-01 | FAQ (accordion) | `landing_faq` | content | v5, v7, occ, hub, homepage |
| CTA-01 | Bottom CTA (multi-path) | `landing_bottom_cta` | cta | v5, v7, occ, hub |
| TY-CONTACT | Contact Options | `thankyou_contact` | cta | ty |
| BLOG-CTA | Blog Admission CTA | `blog_admission_cta` | cta | blog |
| FOOT-01 | Footer | Theme region | footer | all 7 |
| BLOG-BODY | Blog Article Body | `blog_body` (node field) | blog | blog |
| BLOG-TOC | Blog Table of Contents | `blog_toc` (computed) | blog | blog |
| BLOG-SIDEBAR | Blog Sidebar | `blog_sidebar` (region) | blog | blog |
| BLOG-SHARE | Blog Share Buttons | `blog_share` | blog | blog |
| BLOG-PROGRESS | Blog Reading Progress | Theme/page attach | blog | blog |
| BLOG-NEWSLETTER | Blog Newsletter Signup | `blog_newsletter` | blog | blog |

### Cross-Template Usage Matrix

Legend: **Y** = on template stack · **—** = not used

| ID | v5 | v7 | occ | hub | homepage | blog | ty |
|----|:--:|:--:|:---:|:---:|:--------:|:----:|:--:|
| NAV-01 | Y | Y | Y | — | — | — | — |
| NAV-00 | — | — | — | Y | Y | Y | — |
| NAV-00-TY | — | — | — | — | — | — | Y |
| NAV-UX-01 | Y | Y | Y | — | — | — | — |
| HERO-01 | Y | Y | Y | — | — | — | — |
| HERO-ORG | — | — | — | Y | — | — | — |
| HERO-V2 | — | — | — | — | Y | — | — |
| BLOG-HERO | — | — | — | — | — | Y | — |
| TY-HERO | — | — | — | — | — | — | Y |
| FORM-01 | Y | Y | Y | — | — | — | — |
| FORM-02 | Y | Y | Y | Y | Y | — | — |
| FORM-05 | Y | Y | Y | Y | Y | Y | — |
| TRUST-02 | Y | Y | Y | — | — | — | — |
| TRUST-01 | Y | Y | Y | Y | Y | — | Y |
| CRED-01 | Y | Y | — | — | — | — | — |
| ACCR-01 | — | — | — | Y | Y | — | — |
| TY-RECEIPT | — | — | — | — | — | — | Y |
| VP-01 | Y | Y | Y | — | — | — | — |
| WHY-CHOOSE | — | — | — | — | Y | — | — |
| START-01 | Y | Y | Y | — | — | — | Y |
| BRIDGE-01 | Y | Y | — | — | — | — | — |
| EMOT-01 | Y | Y | — | — | — | — | — |
| IMPACT | — | — | — | — | Y | — | — |
| HUB-JOURNEY | — | — | — | Y | — | — | — |
| TY-NEXT | — | — | — | — | — | — | Y |
| TY-CALC | — | — | — | — | — | — | Y |
| SKEPT-01 | — | — | Y | — | — | — | — |
| PROG-01 | Y | Y | — | Y | Y | — | — |
| HUB-POPULAR | — | — | — | Y | — | — | — |
| PERSONA-PATHS | — | — | — | Y | Y | — | — |
| AREAS | — | — | — | Y | — | — | — |
| INTEREST-GRID | — | — | — | — | Y | — | — |
| CAREER-01 | Y | Y | — | Y | — | — | — |
| SALARY-01 | Y | Y | — | — | — | — | — |
| FIN-01 | Y | Y | Y | — | — | — | — |
| TUITION-BAND | — | — | — | Y | — | — | — |
| WAYS-TO-SAVE | — | — | — | Y | — | — | — |
| COST-EST | — | — | — | — | Y | — | — |
| FAQ-01 | Y | Y | Y | Y | Y | — | — |
| CTA-01 | Y | Y | Y | Y | — | — | — |
| TY-CONTACT | — | — | — | — | — | — | Y |
| BLOG-CTA | — | — | — | — | — | Y | — |
| FOOT-01 | Y | Y | Y | Y | Y | Y | Y |
| BLOG-BODY | — | — | — | — | — | Y | — |
| BLOG-TOC | — | — | — | — | — | Y | — |
| BLOG-SIDEBAR | — | — | — | — | — | Y | — |
| BLOG-SHARE | — | — | — | — | — | Y | — |
| BLOG-PROGRESS | — | — | — | — | — | Y | — |
| BLOG-NEWSLETTER | — | — | — | — | — | Y | — |

---

## RFI Integration (shared)

All **FORM-01**, **FORM-02**, and **FORM-05** instances use the **live** request-information pipeline. Do not rebuild the Lead API for layout Phase 2.

### Form variants

| Catalog ID | Placement | UX variant | Submit behavior |
|------------|-----------|------------|-----------------|
| FORM-01 | Embedded in HERO-01 | Two-step mini | Same endpoint as live `/success/request-info-v5` hero RFI |
| FORM-02 | Standalone paragraph | Full (single or two-step per live) | Same endpoint; optional section heading wrapper |
| FORM-05 | Theme attach | Sticky CTA bar | Navigation only — scroll to `#rfi` or expand mini; no separate submit |

### Field mapping (all RFI variants)

| Field key | Label | Type | Required | Step (mini) | Notes |
|-----------|-------|------|----------|-------------|-------|
| `college_of_interest` | Area of interest | Select / autocomplete | Yes | 1 | Live program routing option list |
| `firstname` | First name | Text | Yes | 2 | |
| `lastname` | Last name | Text | Yes | 2 | |
| `email` | Email | Email | Yes | 2 | |
| `phone` | Phone | Tel | Yes | 2 | |
| `state` | State | Select | Yes | 2 | US states list |
| `tcpa_checkbox` | TCPA consent | Checkbox | Yes | 2 | Live consent copy |
| `military_status` | Military affiliation | Select | No | 2 | If present on live form |
| `clientdegreeid` | Program ID | Hidden | No | — | Campaign pre-select |
| `variant_id` | A/B variant | Hidden | No | — | Phase 2 tests — cookie to Lead API |

### Trust copy (below mini form)

Static text below hero form (not a separate paragraph):

- Primary: *"It only takes a minute. No obligation."*
- Secondary (v5): *"Takes under 60 seconds. No obligation. No spam."*

### Post-submit

| Event | Behavior |
|-------|----------|
| Success | Redirect to `/request-information/thank-you` (personalized when `sid` / `token` present) |
| Error | Inline field errors; preserve entered values |
| GA4 | `generate_lead` or existing conversion event + `variant_id` when testing |

### Drupal deliverables (RFI)

- Twig partials: `rfi-form--mini.html.twig`, `rfi-form--full.html.twig`
- JS: `landing/rfi-mini`, `landing/rfi-sticky-bar`
- Confirm live webform / form plugin ID per environment

---

## Component Specifications

### Navigation & Chrome

#### NAV-01 — Global Header (reduced)

| Property | Value |
|----------|-------|
| **Drupal paragraph** | Theme region (not paragraph) — `landing_header_reduced` config |
| **Twig** | `region--header-paid.html.twig` |
| **Prototype** | `shared/Header.tsx` (`variant="reduced"`) |
| **Templates** | v5, v7, occ |

**Editorial fields**

| Field | Label | Type | Required | Notes |
|-------|-------|------|----------|-------|
| — | Logo | Theme default | — | UAGC logo SVG |
| `field_phone_display` | Phone display | Text | No | Default `+1 866 347 7781` |
| `field_phone_href` | Phone tel link | Text | No | `tel:+18663477781` |
| `field_apply_url` | Apply Now URL | Link | No | Red CTA to Salesforce intake |
| `field_show_full_nav` | Show full nav links | Boolean | No | Default false on paid |

**JS library:** None (optional fixed-header scroll shadow)

**CSS / tokens:** `bg-white`, `border-uagc-red`, `z-100`, `--uagc-navy`, `--uagc-red`, `.touch-target`

**Responsive:** Fixed top; `h-16` mobile → `h-20` desktop. Hides mega-menu links; phone + Apply remain.

**A11y:** `role="banner"`; logo link `aria-label="University of Arizona Global Campus home"`; focus-visible outlines on CTAs; min 44px touch targets.

**Do:** Use reduced nav only on `/success/*`. Pair Apply Now (red) with Request Info in header when applicable.

**Don't:** Reuse full `NAV-00` mega-menu on paid landings.

---

#### NAV-00 — Global Header (full site)

| Property | Value |
|----------|-------|
| **Drupal paragraph** | Theme region — `site_header` |
| **Twig** | `region--header.html.twig` |
| **Prototype** | `organic/SiteHeader.tsx` (`variant="full"`) |
| **Templates** | hub, homepage, blog |

**Editorial fields**

| Field | Label | Type | Required | Notes |
|-------|-------|------|----------|-------|
| `field_utility_links` | Utility bar links | Repeat: label, url | No | Chat, phone, Search |
| `field_primary_nav` | Primary nav groups | Repeat: label, children[] | No | Online Degrees, Admission, Tuition & Aid, About |
| `field_request_info_target` | Request Info anchor | Text | No | Default `#rfi` on hub/homepage |
| `field_apply_url` | Apply Now | Link | No | Utility bar red CTA |

**JS library:** `organic/mobile-nav` — hamburger drawer, accordion nav groups

**CSS / tokens:** `bg-white`, `border-b-2 border-uagc-red`, `pt-[env(safe-area-inset-top)]`, fixed header offset `pt-16 sm:pt-[72px] lg:pt-20` on main

**Responsive:** Desktop horizontal mega-menus; mobile hamburger → full-screen drawer with accordion sections.

**A11y:** Skip link target; drawer focus trap when open; `aria-expanded` on menu toggle; 44px nav controls.

**Do:** Request Info scrolls to closing `FORM-02` anchor on discovery pages.

**Don't:** Embed RFI in header.

---

#### NAV-00-TY — Site Header (post-submit)

| Property | Value |
|----------|-------|
| **Drupal paragraph** | Theme region variant — `site_header_thankyou` |
| **Twig** | `region--header-thankyou.html.twig` |
| **Prototype** | `organic/SiteHeader.tsx` (`hideRequestInfo`, `primaryCta="apply"`) |
| **Templates** | ty |

**Editorial fields:** Inherits NAV-00; add `field_hide_request_info` (bool, default true).

**Variant notes:** Suppresses Request Info utility CTA — user just converted. Apply Now may remain.

**Do:** Hide all RFI entry points in header on thank-you.

**Don't:** Show Request Info or sticky bar on thank-you.

---

#### NAV-UX-01 — Section Nav (sticky pills)

| Property | Value |
|----------|-------|
| **Drupal paragraph** | `landing_section_nav` |
| **Twig** | `paragraph--landing-section-nav.html.twig` |
| **Prototype** | `shared/SectionNav.tsx` |
| **Templates** | v5, v7, occ |

**Editorial fields**

| Field | Label | Type | Required | Notes |
|-------|-------|------|----------|-------|
| `field_nav_items` | Section pills | Repeat: label, anchor_id | Yes | Or computed from page sections |
| `field_sticky` | Sticky on scroll | Boolean | No | Default true |

**JS library:** `landing/section-nav` — IntersectionObserver scroll-spy; smooth scroll with header offset; `aria-current="true"` on active pill

**CSS / tokens:** `.mobile-nav-scroll`, `scroll-margin-top: 80px` on targets, gold active dot

**Responsive:** Horizontal scroll pills on mobile; center row desktop. Simplify or hide if `<768px` and too many pills.

**A11y:** `aria-label="Page sections"`; keyboard focus visible; active pill `aria-current="location"`.

**Template overrides — `field_nav_items`:**

| Template | Anchors |
|----------|---------|
| v5 / v7 | why-uagc, programs, careers, tuition, credentials, stories, rfi, faq |
| occ | why-uagc, proof, tuition, stories, rfi, faq |

**Don't:** Add pills for sections not on page (OCC has no programs/careers).

---

#### FOOT-01 — Footer

| Property | Value |
|----------|-------|
| **Drupal paragraph** | Theme region — `site_footer` |
| **Twig** | `region--footer.html.twig` (paid) / `region--footer-organic.html.twig` |
| **Prototype** | Paid: `shared/Footer.tsx` · Organic: `organic/SiteFooter.tsx` |
| **Templates** | All 7 |

**Paid variant fields**

| Field | Label | Type | Required | Notes |
|-------|-------|------|----------|-------|
| `field_wscuc_text` | WSCUC accreditation | Long text | Yes | Standard legal block |
| `field_footnotes` | Footnotes | Repeat: text | No | 5-week/6-week, state availability, etc. |
| `field_legal_links` | Legal links | Repeat: label, url | Yes | Privacy, Terms, SMS, Do Not Sell |

**Organic variant fields**

| Field | Label | Type | Required | Notes |
|-------|-------|------|----------|-------|
| `field_degree_areas` | Degree area links | Repeat: label, url | No | Flat row: Business, Education, IT, etc. |
| `field_contact_phone` | Phone | Text | No | `+1 866 711 1700` |
| `field_nondiscrimination` | Nondiscrimination | Long text | Yes | Legal baseline |
| `field_legal_links` | Legal links | Repeat | Yes | Terms, Privacy, Cookie, State Auth, Accessibility |

**CSS / tokens:** Paid `bg-white`; organic `bg-uagc-navy`, `text-white/70`, `.mobile-sticky-offset` for FORM-05 clearance

**Variant notes:** Organic footer — compact contact band + degree-area row + legal; **no UAGC/Arizona logos** in footer (text affiliation only). Paid footer includes logo + WSCUC block.

**Don't:** Duplicate heavy degree sub-level grids from live site on organic footer.

---

#### FORM-05 — Sticky RFI Bar (mobile)

| Property | Value |
|----------|-------|
| **Drupal paragraph** | Theme library attach (not paragraph) |
| **Twig** | `rfi-sticky-bar.html.twig` |
| **Prototype** | `shared/RFIForm.tsx` (`RFIStickyBar`) |
| **Templates** | v5, v7, occ, hub, homepage, blog |

**Editorial fields**

| Field | Label | Type | Required | Notes |
|-------|-------|------|----------|-------|
| `field_sticky_label` | CTA label | Text | No | Default "Request Information" |
| `field_target_anchor` | Scroll target | Text | No | Default `#rfi` or `#hero-rfi` |

**JS library:** `landing/rfi-sticky-bar` — hidden when `[data-hero-form]` or hero section intersects viewport; visible after scroll past hero; `<1024px` primary

**CSS / tokens:** `fixed bottom-0`, `safe-area-bottom`, `z-50`, gold CTA, `padding-bottom: env(safe-area-inset-bottom)`

**Responsive:** Mobile-first; optional desktop hide.

**A11y:** Bar does not trap focus; CTA min 44px height.

**Variant notes:** Paid observes hero mini form ref. Hub/homepage/blog observe hero section or sidebar ref (no in-hero RFI).

**Don't:** Show on initial hero view. **Absent on thank-you (ty).**

---

### Heroes

#### HERO-01 — Hero: Split + RFI

| Property | Value |
|----------|-------|
| **Drupal paragraph** | `landing_hero_rfi` |
| **Twig** | `paragraph--landing-hero-rfi.html.twig` |
| **Prototype** | `sections/HeroSection.tsx` + embedded FORM-01 |
| **Templates** | v5, v7, occ |

**Editorial fields**

| Field | Label | Type | Required | Notes |
|-------|-------|------|----------|-------|
| `field_headline` | Headline | Plain text | Yes | v5: *Earn Your Degree 100% Online at UAGC* |
| `field_subheadline` | Subheadline | Long text | No | Supporting copy in overlay |
| `field_brand_label` | Brand label | Text | No | Optional eyebrow |
| `field_bg_image_desktop` | Desktop hero image | Media | Yes | Faces visible — not cropped by form |
| `field_bg_image_mobile` | Mobile hero image | Media | Yes | Separate mobile crop |
| `field_highlights` | Trust pills | Repeat: text (max 3) | No | 5-Week Courses, $0 to Apply, etc. |
| `field_form_intro_title` | Form intro title | Text | No | Optional above mini form |
| `field_form_intro_body` | Form intro body | Long text | No | |
| `field_anchor_id` | Section anchor | Text | No | Default `hero-rfi` |

**JS library:** Optional subtle parallax on hero image (`prefers-reduced-motion` fallback)

**CSS / tokens:** `.type-h1`, `font-heading-condensed`, hero pills `min 13px` mobile, `bg-white/15`, gold accent dot, `~75/25` desktop split, form column 400–440px

**Responsive:** Desktop image + headline left, RFI right. Mobile: image band + navy pill row + form below — **must not cover faces**.

**A11y:** `id="hero-rfi"`; form fields with `aria-describedby` on errors; `data-hero-form` root for sticky bar.

**Template copy matrix**

| Field | v5 | v7 | occ |
|-------|----|----|-----|
| Headline | Earn Your Degree 100% Online at UAGC | Find the Right Degree for Your Career | Explore Flexible Online Courses at UAGC |
| Highlight 1 | 5-Week Courses | WSCUC Accredited | Try a Course Free |
| Highlight 2 | Transfer Up to 75% | 50+ Programs | 5-Week Classes |
| Highlight 3 | $0 to Apply | $0 to Apply | $0 to Apply |

**Don't:** Sticky bar on initial hero view; sub-12px pill text; form overlay obscuring faces on mobile.

---

#### HERO-ORG — Organic Hero (no RFI)

| Property | Value |
|----------|-------|
| **Drupal paragraph** | `organic_hero` |
| **Twig** | `paragraph--organic-hero.html.twig` |
| **Prototype** | `organic/OrganicHomeHero.tsx` (`variant="landing"`) |
| **Templates** | hub |

**Editorial fields**

| Field | Label | Type | Required | Notes |
|-------|-------|------|----------|-------|
| `field_eyebrow` | Eyebrow | Text | No | Default *University of Arizona Global Campus* |
| `field_headline` | Headline | Text / formatted | Yes | Hub: *Your Degree, Your Schedule* |
| `field_subheadline` | Subheadline | Long text | No | Program count, 5-week format |
| `field_bg_image` | Hero image | Media | Yes | Live `hero.webp` style — faces visible |
| `field_image_position` | Focal point | Text | No | e.g. `center 35%` |
| `field_trust_pills` | Trust pills | Repeat: label, accent (bool) | No | `$485/credit`, 5-Week Courses, WSCUC, `$0 to Apply` |
| `field_breadcrumb` | Breadcrumb | Repeat: label, url | No | Hub optional |
| `field_section_nav` | Section nav items | Repeat: id, label | No | Optional pills below hero |

**JS library:** `organic/hero-parallax` — subtle image parallax; disabled when `prefers-reduced-motion`

**CSS / tokens:** Paid-hero height; `type-h1` condensed; `.trust-pill-accent` gold; no in-hero RFI

**Responsive:** Full-width image; headline overlay left; trust pills below subhead with extra spacing.

**Don't:** Embed RFI in hero; in-hero "Find Your Program" CTA; cover faces with form.

---

#### HERO-V2 — Organic Hero v2 (conversion)

| Property | Value |
|----------|-------|
| **Drupal paragraph** | `organic_hero_v2` |
| **Twig** | `paragraph--organic-hero-v2.html.twig` |
| **Prototype** | `organic/HeroV2.tsx` |
| **Templates** | homepage |

**Editorial fields**

| Field | Label | Type | Required | Notes |
|-------|-------|------|----------|-------|
| `field_eyebrow` | Institution line | Text | No | *University of Arizona Global Campus* |
| `field_headline` | Headline | Formatted text | Yes | Line 1 institution + Line 2 *Finish Your Degree / On Your Schedule* (gold) |
| `field_subheadline` | Subheadline | Long text | No | |
| `field_video_desktop` | Desktop background video | Media / URL | No | `homepage-mock-hero.mp4` |
| `field_image_fallback` | Photo fallback | Media | Yes | Mobile photo only |
| `field_trust_pills` | Trust pills (4) | Repeat: label, accent | Yes | `$485/credit`, 5-Week, WSCUC, `$0 to Apply` |
| `field_section_nav` | Section nav | Repeat: id, label | No | Rendered below IMPACT on white |

**JS library:** `organic/hero-video` — autoplay muted desktop video; photo-only mobile; `hero-enter-*` choreography

**CSS / tokens:** `.hero-enter-headline`, `.hero-enter-pills`, `.trust-pill-accent`, navy overlay

**Responsive:** Desktop video + photo fallback; mobile photo only. Section nav below ImpactStrip (not in hero).

**Don't:** In-hero micro-RFI; hero Request Info / Explore Programs CTAs.

---

#### BLOG-HERO — Blog Article Hero

| Property | Value |
|----------|-------|
| **Drupal paragraph** | `blog_hero` (node display field group) |
| **Twig** | `node--blog-article--hero.html.twig` |
| **Prototype** | `organic/OrganicHomeHero.tsx` (`variant="editorial"`) |
| **Templates** | blog |

**Editorial fields** (from blog node)

| Field | Label | Type | Required | Notes |
|-------|-------|------|----------|-------|
| `field_title` | Article title | Text | Yes | Becomes headline (sentence case, not condensed) |
| `field_category` | Category | Taxonomy / text | Yes | Eyebrow |
| `field_featured_image` | Featured image | Media | Yes | Hero background |
| `field_featured_image_alt` | Image alt | Text | Yes | |
| `field_reading_time` | Reading time | Text | No | Computed or editorial |
| `field_last_updated` | Last updated | Date | No | Shown in subheadline |
| `field_published_date` | Published date | Date | Yes | Meta row below hero |

**CSS / tokens:** `variant="editorial"` — readable sentence-case headline; **no trust pills**; `imagePosition: center 30%`

**Responsive:** Full-width hero; breadcrumb above; meta row in white content zone below.

**Don't:** Trust pills or section nav on blog hero.

---

#### TY-HERO — Confirmation Hero

| Property | Value |
|----------|-------|
| **Drupal paragraph** | `thankyou_hero` |
| **Twig** | `paragraph--thankyou-hero.html.twig` |
| **Prototype** | `organic/ThankYouHeroSection.tsx` |
| **Templates** | ty |

**Editorial fields**

| Field | Label | Type | Required | Notes |
|-------|-------|------|----------|-------|
| `field_headline_template` | Headline template | Text | Yes | `Congratulations {firstName},` or fallback |
| `field_subheadline` | Subheadline | Text | Yes | *you've taken the first step.* |
| `field_expectations` | Advisor call bullets | Repeat: text | Yes | 4 expectation items |
| `field_badges` | Trust badges | Repeat: text | No | $0 Application Fee, No Standardized Tests |
| `field_primary_cta` | Start Application | Link | Yes | Admission portal URL from token |
| `field_secondary_cta` | Program Information | Link | No | Program page or `#program-recap` |
| `field_breadcrumb` | Breadcrumb | Repeat | No | Home, Request Information, Thank You |

**CSS / tokens:** `bg-uagc-cream` (`#faf9f7`), `max-w-[720px]`, `.type-h1`, gold primary CTA

**Responsive:** Centered confirmation column; stacked CTAs mobile.

**A11y:** `aria-label="Submission confirmation"`; breadcrumb `aria-current="page"` on last item.

**Variant notes:** Personalized when `firstName` from query/token; fallback *Congratulations — you've taken the first step.* **No trailing comma** when name missing.

**Don't:** RFI form in hero; competing pre-decision VP blocks.

---

### Forms

#### FORM-01 — RFI: Hero (two-step mini)

| Property | Value |
|----------|-------|
| **Drupal paragraph** | Child of `landing_hero_rfi` (embedded form block) |
| **Twig** | `rfi-form--mini.html.twig` (partial) |
| **Prototype** | `shared/RFIForm.tsx` (`variant="mini"`) |
| **Templates** | v5, v7, occ |

**Editorial fields:** See [RFI Integration](#rfi-integration-shared). No separate paragraph fields — inherits hero context.

**JS library:** `landing/rfi-mini` — Step 1 (area of interest) → Step 2 (contact fields); validation before advance; `data-hero-form` attribute on root

**CSS / tokens:** `.rfi-input`, `.rfi-button-primary`, `bg-white` form card, gold submit

**Responsive:** Full width in hero column; stacked fields mobile.

**A11y:** Announce step change to screen readers; `aria-describedby` on field errors.

**Don't:** Separate submit endpoint from live hero RFI.

---

#### FORM-02 — RFI: Mid-page (full)

| Property | Value |
|----------|-------|
| **Drupal paragraph** | `landing_rfi_section` |
| **Twig** | `paragraph--landing-rfi-section.html.twig` |
| **Prototype** | `shared/RFIForm.tsx` (`variant="full"`) |
| **Templates** | v5, v7, occ, hub, homepage |

**Editorial fields**

| Field | Label | Type | Required | Notes |
|-------|-------|------|----------|-------|
| `field_heading` | Section heading | Text | Yes | Template-specific — see below |
| `field_subhead` | Subheadline | Long text | No | |
| `field_trust_chips` | Trust chips | Repeat: text | No | Optional below heading |
| `field_form_variant` | Form variant | List | No | `full` (default) |
| `field_anchor_id` | Anchor | Text | No | Default `rfi` |
| `field_bg_style` | Background | List | No | `warm` (#faf9f7) paid · `navy` organic closing |

**JS library:** `landing/rfi-full` — full validation; focus management on step change

**CSS / tokens:** Paid `bg-uagc-surface-warm`; homepage v2 / hub closing `bg-uagc-navy` with white form card

**Template heading overrides**

| Template | Heading |
|----------|---------|
| v5 | Take the Next Step Toward Your Degree |
| v7 | Get Program Details Tailored to Your Goals |
| occ | Your Future Starts with One Course |
| hub | Request Information Here |
| homepage | Closing navy-band headline (white text) |

**Don't:** Duplicate mid-page RFI on hub (single closing instance only).

---

### Trust & Social Proof

#### TRUST-01 — Peer Testimonials

| Property | Value |
|----------|-------|
| **Drupal paragraph** | `landing_testimonial` (paid) · `organic_video_testimonial` (organic) |
| **Twig** | `paragraph--landing-testimonial.html.twig` · `paragraph--organic-video-testimonial.html.twig` |
| **Prototype** | Paid: `sections/TestimonialSection.tsx` · Organic: `organic/VideoTestimonialSection.tsx` |
| **Templates** | v5, v7, occ, hub, homepage, ty |

**Paid variant — editorial fields**

| Field | Label | Type | Required | Notes |
|-------|-------|------|----------|-------|
| `field_heading` | Heading | Text | Yes | *Students Like You Are Already Here* |
| `field_subheading` | Subheading | Long text | No | |
| `field_testimonials` | Testimonials | Repeat | Yes | Max 3 cards |
| `field_testimonial_tag` | Persona tag | Text | No | Working Parent, Career Changer, etc. |
| `field_quote` | Quote | Long text | Yes | Short scannable quote |
| `field_name` | Name | Text | Yes | Initials avatar in UI |
| `field_credential` | Credential | Text | No | Degree / role |

**Organic variant — editorial fields**

| Field | Label | Type | Required | Notes |
|-------|-------|------|----------|-------|
| `field_eyebrow` | Eyebrow | Text | No | *Student Experience* |
| `field_heading` | Heading | Text | Yes | *In Their Own Words* |
| `field_subheading` | Subheading | Long text | No | |
| `field_videos` | Video testimonials | Repeat | Yes | 3 cards |
| `field_video_name` | Student name | Text | Yes | |
| `field_video_credential` | Credential | Text | No | |
| `field_video_tag` | Persona tag | Text | No | Military Veteran, etc. |
| `field_youtube_id` | YouTube ID | Text | Yes | Modal playback |
| `field_thumbnail` | Thumbnail override | Media | No | CDN fallback to YouTube maxres |

**Thank-you variant:** Single card matched to submitted program area; omit section if no match.

**JS library:** `organic/video-modal` — YouTube iframe modal; focus trap; ESC close; `prefers-reduced-motion` on open

**CSS / tokens:** Paid: 3-card grid, `#faf9f7` bg, `.type-quote`, verified badge. Organic: `.video-card`, `.play-btn`, navy band, 3/4 aspect thumbnails.

**Responsive:** 1 → 2 → 3 column grid. Video cards stack on mobile.

**A11y:** Play buttons `aria-label="Play video testimonial from {name}"`; modal `role="dialog"`.

**Don't:** Carousel or single wall-of-text on paid. Organic: not text-only quote cards.

---

#### TRUST-02 — Trust Strip (banner)

| Property | Value |
|----------|-------|
| **Drupal paragraph** | `landing_trust_strip` |
| **Twig** | `paragraph--landing-trust-strip.html.twig` |
| **Prototype** | `sections/TrustStrip.tsx` |
| **Templates** | v5, v7, occ |

**Editorial fields**

| Field | Label | Type | Required | Notes |
|-------|-------|------|----------|-------|
| `field_variant` | Layout variant | List | Yes | `banner` \| `sidebar` |
| `field_badges` | Badges | Repeat: icon, label | Yes | Default 3 |

**Default badges:** WSCUC Accredited, 50+ Online Programs, Financial Aid Available

**CSS / tokens:** `banner` = full-width row below START-01; `sidebar` = stack in narrow hero panels

**Responsive:** Banner: horizontal row desktop, stacked mobile. Sidebar: vertical stack ~380–460px.

**Don't:** Third badge = enrollment dates or "Enroll now" — use barrier-removal value prop.

---

#### CRED-01 — Employer Credentials

| Property | Value |
|----------|-------|
| **Drupal paragraph** | `landing_employer_cred` |
| **Twig** | `paragraph--landing-employer-cred.html.twig` |
| **Prototype** | `sections/EmployerCredentialSection.tsx` |
| **Templates** | v5, v7 |

**Editorial fields**

| Field | Label | Type | Required | Notes |
|-------|-------|------|----------|-------|
| `field_heading` | Heading | Text | Yes | |
| `field_stats` | Stats | Repeat: value, label | No | Handshake / employer counts |
| `field_body` | Body copy | Long text | Yes | |
| `field_badges` | Badge icons | Media repeat | No | Employer logos |

**CSS / tokens:** `bg-uagc-surface-cred` (`#fdf8ef`)

**Don't:** Duplicate Handshake narrative already in CAREER-01.

---

#### ACCR-01 — Accreditation Band

| Property | Value |
|----------|-------|
| **Drupal paragraph** | `organic_accreditation` |
| **Twig** | `paragraph--organic-accreditation.html.twig` |
| **Prototype** | `organic/AccreditationBand.tsx` |
| **Templates** | hub, homepage |

**Editorial fields**

| Field | Label | Type | Required | Notes |
|-------|-------|------|----------|-------|
| `field_heading` | Heading | Text | No | Recognition & Achievements style |
| `field_wscuc_copy` | WSCUC statement | Long text | Yes | No peer-university name-drops |
| `field_programmatic_accred` | Programmatic accreditations | Repeat: label, body | No | |
| `field_ua_logo` | UA affiliation logo | Media | No | Horizontal logo ~`h-10`/`h-12` |
| `field_achievements` | Achievement items | Repeat: icon, title, description | No | Lucide icons — no emoji |

**CSS / tokens:** `bg-uagc-surface` (`#faf9f7`); navy section variant on homepage for rhythm

**Don't:** Name Stanford, UCLA, USC, etc. — WSCUC standards language only.

---

#### TY-RECEIPT — Submission Receipt

| Property | Value |
|----------|-------|
| **Drupal paragraph** | `thankyou_receipt` |
| **Twig** | `paragraph--thankyou-receipt.html.twig` |
| **Prototype** | `organic/SubmissionReceiptSection.tsx` |
| **Templates** | ty |

**Editorial fields**

| Field | Label | Type | Required | Notes |
|-------|-------|------|----------|-------|
| `field_show_confirmation_id` | Show confirmation ID | Boolean | Yes | From submission token |
| `field_confirmation_id` | Confirmation ID | Text | No | Populated from API |
| `field_show_email_notice` | Email sent notice | Boolean | Yes | Masked email display |
| `field_show_program_recap` | Program recap | Boolean | Yes | Submitted area of interest |
| `field_show_contact_recap` | Contact recap | Boolean | No | Name, phone summary |
| `field_estimated_response` | Response time | Text | No | *Within 1 business day* |

**CSS / tokens:** `bg-white`, `max-w-[720px]`, receipt card border

**Don't:** Collect additional lead data on thank-you.

---

### Value & Discovery

#### VP-01 — Reasons to Choose UAGC

| Property | Value |
|----------|-------|
| **Drupal paragraph** | `landing_value_props` |
| **Twig** | `paragraph--landing-value-props.html.twig` |
| **Prototype** | `sections/ValuePropsSection.tsx` |
| **Templates** | v5, v7, occ |

**Editorial fields**

| Field | Label | Type | Required | Notes |
|-------|-------|------|----------|-------|
| `field_heading` | Heading | Text | Yes | *Reasons to Choose UAGC* |
| `field_subheading` | Subheading | Long text | No | |
| `field_cards` | Highlight cards | Repeat | Yes | 4 cards — card 1 = Generous Transfer Policy |
| `field_card_title` | Card title | Text | Yes | |
| `field_card_description` | Card description | Long text | Yes | |
| `field_card_stat` | Optional stat | Text | No | `.type-stat` condensed |
| `field_card_icon` | Icon | List / media | No | |
| `field_experience_title` | Experience callout title | Text | No | Prior Learning Assessment block |
| `field_experience_body` | Experience body | Long text | No | Navy callout |
| `field_experience_cta` | Experience CTA | Link | No | |

**CSS / tokens:** `bg-uagc-surface-warm` (`#faf9f7`), `rounded-2xl` cards, 2-col mobile → 4 desktop

**Template note:** OCC card 2 = *Try Your First Course Free* (stat: 3 wk). **No `bulletPoints`** duplicating TRUST-02.

**Don't:** Section-level RFI CTA; gradients/shadows; bullet list repeating trust strip.

---

#### WHY-CHOOSE — Why Choose UAGC (organic VP)

| Property | Value |
|----------|-------|
| **Drupal paragraph** | `organic_why_choose` |
| **Twig** | `paragraph--organic-why-choose.html.twig` |
| **Prototype** | `organic/WhyChooseSection.tsx` |
| **Templates** | homepage |

**Editorial fields**

| Field | Label | Type | Required | Notes |
|-------|-------|------|----------|-------|
| `field_heading` | Heading | Text | Yes | Brandy 2-col photo + stats layout |
| `field_quote` | Pull quote | Long text | No | Visitor empathy quote |
| `field_stat_highlights` | Stat row | Repeat: value, label | No | 75%, 5–6 wk, $0 |
| `field_feature_rows` | Feature rows | Repeat: icon, title, description | Yes | 3 rows with Lucide icons |
| `field_photo` | Section photo | Media | Yes | Left column desktop |

**CSS / tokens:** `bg-uagc-surface`, `.accent-bar`, `.type-h2` navy (not gold eyebrow in h2)

**Don't:** Replace with paid VP-01 card grid on homepage v2.

---

#### PROG-01 — Program Explorer

| Property | Value |
|----------|-------|
| **Drupal paragraph** | `landing_program_explorer` |
| **Twig** | `paragraph--landing-program-explorer.html.twig` |
| **Prototype** | `sections/ProgramExplorer.tsx` |
| **Templates** | v5, v7, hub, homepage |

**Editorial fields**

| Field | Label | Type | Required | Notes |
|-------|-------|------|----------|-------|
| `field_heading` | Heading | Text | Yes | Hub: *Find Your Program* |
| `field_subheading` | Subheading | Long text | No | |
| `field_compact` | Compact mode | Boolean | No | `true` v5 · `false` v7 |
| `field_programs` | Programs | Entity ref / JSON view | Yes | Same source as live program pages |
| `field_show_transfer_callout` | Transfer callout | Boolean | No | Default false |
| `field_anchor_id` | Anchor | Text | No | `programs` |

**JS library:** `landing/program-explorer` — search debounce; area filter via **native `<select>`**; expandable rows; mobile ~6 visible + Show All; no per-program RFI

**CSS / tokens:** `bg-white`, expandable `details/summary` or ARIA accordion

**Responsive:** Desktop scrollable list OK; mobile no nested scroll traps or horizontal pill strips.

**A11y:** Expand `aria-expanded`; list `role="list"`; filter select labeled.

**Don't:** Per-program Request Info CTA; 200+ programs copy (use 50+); transfer policy callout in explorer (belongs in VP-01).

---

#### HUB-POPULAR — Popular Programs Quick Links

| Property | Value |
|----------|-------|
| **Drupal paragraph** | `organic_popular_programs` |
| **Twig** | `paragraph--organic-popular-programs.html.twig` |
| **Prototype** | `organic/HubPopularPrograms.tsx` |
| **Templates** | hub |

**Editorial fields**

| Field | Label | Type | Required | Notes |
|-------|-------|------|----------|-------|
| `field_program_links` | Top programs | Repeat: label, url | Yes | Top 3 requested degrees |
| `field_view_all_label` | View all label | Text | No | *View all 50+* |
| `field_view_all_url` | View all URL | Link | No | `#programs` |
| `field_variant` | Color variant | List | No | `light` \| `inverted` |

**CSS / tokens:** Inline link row with separators; inverted = navy band below hero

**Don't:** Replace PROG-01 — this is a fast lane only.

---

#### PERSONA-PATHS — Persona Path Cards

| Property | Value |
|----------|-------|
| **Drupal paragraph** | `organic_persona_paths` |
| **Twig** | `paragraph--organic-persona-paths.html.twig` |
| **Prototype** | `organic/PersonaPathSection.tsx` |
| **Templates** | hub, homepage |

**Editorial fields**

| Field | Label | Type | Required | Notes |
|-------|-------|------|----------|-------|
| `field_heading` | Heading | Text | Yes | Hub: *Start With Your Situation* |
| `field_subheading` | Subheading | Long text | No | |
| `field_paths` | Path cards | Repeat | Yes | 4 default personas |
| `field_path_title` | Title | Text | Yes | Working Adults, Military, etc. |
| `field_path_description` | Description | Long text | Yes | |
| `field_path_image` | Image | Media | Yes | |
| `field_path_link` | Link | Link | Yes | Usually `#programs` |
| `field_variant` | Background | List | No | `light` \| `surface` \| `inverted` |
| `field_view_all_href` | View all link | Link | No | Optional |

**CSS / tokens:** Image-led cards, `motion-hover-lift`, hub `inverted` pairs with HUB-POPULAR

**Responsive:** 2×2 grid desktop; stacked mobile.

---

#### AREAS — Areas of Study Grid

| Property | Value |
|----------|-------|
| **Drupal paragraph** | `organic_areas_of_study` |
| **Twig** | `paragraph--organic-areas-of-study.html.twig` |
| **Prototype** | `organic/AreasOfStudyGrid.tsx` (wraps InterestAreaGrid) |
| **Templates** | hub |

**Editorial fields**

| Field | Label | Type | Required | Notes |
|-------|-------|------|----------|-------|
| `field_heading` | Heading | Text | Yes | *What Do You Want to Study?* |
| `field_subheading` | Subheading | Long text | No | |
| `field_areas` | Study areas | Repeat | Yes | 7 areas |
| `field_area_name` | Name | Text | Yes | Business, Education, etc. |
| `field_program_count` | Program count | Integer | No | |
| `field_area_image` | Image | Media | Yes | |
| `field_area_url` | Hub URL | Link | Yes | Live child hub paths |
| `field_finder_href` | Finder CTA | Link | No | `#programs` |

**CSS / tokens:** `bg-uagc-surface`, image cards with program count overlay

---

#### INTEREST-GRID — Interest Area Grid

| Property | Value |
|----------|-------|
| **Drupal paragraph** | `organic_interest_grid` |
| **Twig** | `paragraph--organic-interest-grid.html.twig` |
| **Prototype** | `organic/InterestAreaGrid.tsx` |
| **Templates** | homepage |

**Editorial fields:** Same structure as AREAS; homepage uses `DEFAULT_INTEREST_AREAS` (7 areas + discovery card in grid position 8).

| Field | Label | Type | Required | Notes |
|-------|-------|------|----------|-------|
| `field_heading` | Heading | Text | No | |
| `field_areas` | Interest areas | Repeat | Yes | |
| `field_discovery_card` | Discovery CTA card | Group | No | Links to `#programs` |

**CSS / tokens:** Flat `bg-uagc-navy` discovery card (no gradients); `rounded-2xl` image cards

---

### Content & Proof

#### START-01 — Upcoming Start Dates

| Property | Value |
|----------|-------|
| **Drupal paragraph** | `landing_start_dates` |
| **Twig** | `paragraph--landing-start-dates.html.twig` |
| **Prototype** | `sections/UpcomingStartDates.tsx` |
| **Templates** | v5, v7, occ, ty |

**Editorial fields**

| Field | Label | Type | Required | Notes |
|-------|-------|------|----------|-------|
| `field_heading` | Heading | Text | No | Optional |
| `field_dates` | Start dates | Repeat: date, label | Yes | **Next two dates** paid; **one date** thank-you |
| `field_variant` | Layout | List | No | `card` (default) |

**JS library:** None — compute `daysLeft` **at render** in PHP/Twig (not client-only)

**CSS / tokens:** Gold calendar accents on START-01; quiet urgency badge

**Thank-you override:** Must populate from program context — fix live empty widget.

**Don't:** "Enroll now" urgency — informational only.

---

#### BRIDGE-01 — Next Step Bridge

| Property | Value |
|----------|-------|
| **Drupal paragraph** | `landing_section_bridge` |
| **Twig** | `paragraph--landing-section-bridge.html.twig` |
| **Prototype** | `shared/NextStepBridge.tsx` |
| **Templates** | v5, v7 (appears twice in stack) |

**Editorial fields**

| Field | Label | Type | Required | Notes |
|-------|-------|------|----------|-------|
| `field_variant` | Color variant | List | Yes | `light` \| `dark` |
| `field_text` | Bridge copy | Text | Yes | Scroll cue copy |
| `field_target_anchor` | Target anchor | Text | Yes | `#programs`, `#careers` |

**JS library:** Optional smooth scroll on click

**CSS / tokens:** `light` = `#faf9f7`; `dark` = `uagc-navy`

---

#### EMOT-01 — Emotional Motivation

| Property | Value |
|----------|-------|
| **Drupal paragraph** | `landing_emotional` |
| **Twig** | `paragraph--landing-emotional.html.twig` |
| **Prototype** | `sections/EmotionalMotivationSection.tsx` |
| **Templates** | v5, v7 |

**Editorial fields**

| Field | Label | Type | Required | Notes |
|-------|-------|------|----------|-------|
| `field_heading` | Heading | Text | Yes | |
| `field_body` | Body | Long text | Yes | |
| `field_pull_quote` | Pull quote | Long text | No | |
| `field_stats` | Stats | Repeat: value, label | No | |

**CSS / tokens:** Navy band (`bg-uagc-navy`), white text, gold highlights

---

#### IMPACT — Impact Strip (stats band)

| Property | Value |
|----------|-------|
| **Drupal paragraph** | `organic_impact_strip` |
| **Twig** | `paragraph--organic-impact-strip.html.twig` |
| **Prototype** | `organic/ImpactStrip.tsx` |
| **Templates** | homepage |

**Editorial fields**

| Field | Label | Type | Required | Notes |
|-------|-------|------|----------|-------|
| `field_stats` | Stats | Repeat: value, label, sublabel | Yes | 5 stats default |

**Default stats:** 50+ programs, 100% online, 95k+ alumni, 86% financial aid, 1:1 support

**CSS / tokens:** Flat 5-stat navy band; `font-heading-condensed` gold values; **no animated counters** on v2

**Responsive:** 2-col mobile → 3 tablet → 5 desktop

**Don't:** Duplicate hero trust pills ($485, WSCUC, $0) — stats band covers scale/outcome proof.

---

#### SKEPT-01 — Skepticism Buster

| Property | Value |
|----------|-------|
| **Drupal paragraph** | `landing_skepticism_buster` |
| **Twig** | `paragraph--landing-skepticism-buster.html.twig` |
| **Prototype** | `sections/SkepticismBusterSection.tsx` |
| **Templates** | occ |

**Editorial fields**

| Field | Label | Type | Required | Notes |
|-------|-------|------|----------|-------|
| `field_heading` | Heading | Text | Yes | |
| `field_subheading` | Subheading | Long text | No | |
| `field_soft_cta` | Soft CTA text | Text | No | |
| `field_cards` | Skeptic cards | Repeat | Yes | |
| `field_question` | Question | Text | Yes | Objection headline |
| `field_proof_stat` | Proof stat | Text | No | |
| `field_proof_stat_label` | Stat label | Text | No | |
| `field_answer` | Answer | Long text | Yes | |
| `field_expanded_bullets` | Detail bullets | Repeat: text | No | |

**JS library:** `landing/skept-buster` — independent disclosure (multiple open OK)

**CSS / tokens:** 3-col desktop / 1-col mobile; gold checkmarks

**A11y:** Chevron toggle ≥44px; `aria-expanded` per card.

---

#### CAREER-01 — Career Outcomes

| Property | Value |
|----------|-------|
| **Drupal paragraph** | `landing_career_outcomes` |
| **Twig** | `paragraph--landing-career-outcomes.html.twig` |
| **Prototype** | `sections/CareerOutcomesSection.tsx` |
| **Templates** | v5, v7, hub |

**Editorial fields**

| Field | Label | Type | Required | Notes |
|-------|-------|------|----------|-------|
| `field_heading` | Heading | Text | Yes | Hub: *Where UAGC Graduates Go* |
| `field_subheading` | Subheading | Long text | No | |
| `field_comparison_rows` | Outcomes rows | Repeat | Yes | program, salary, growth, titles |
| `field_handshake_stat` | Handshake stat | Text | No | 98,000+ employers |
| `field_handshake_body` | Handshake body | Long text | No | |

**CSS / tokens:** `bg-uagc-navy`, text `#FFFFFF`, muted `#b8c5d9` — avoid `text-white/50`

**Responsive:** Table horizontal scroll or stacked cards on mobile.

**Don't:** Adjacent separate comparison section; duplicate Handshake in CRED-01.

---

#### SALARY-01 — Salary Growth

| Property | Value |
|----------|-------|
| **Drupal paragraph** | `landing_salary_growth` |
| **Twig** | `paragraph--landing-salary-growth.html.twig` |
| **Prototype** | `sections/SalaryGrowthSection.tsx` |
| **Templates** | v5, v7 |

**Editorial fields**

| Field | Label | Type | Required | Notes |
|-------|-------|------|----------|-------|
| `field_heading` | Heading | Text | Yes | |
| `field_degree_tiers` | Degree tiers | Repeat | Yes | Associate, Bachelor, Master |
| `field_source_url` | Source URL | Link | Yes | BLS |
| `field_source_label` | Source label | Text | No | Default BLS |

**JS library:** `landing/salary-tabs` — field/degree tab switch

**A11y:** `role="tablist"`, `aria-selected` on active tab.

**Do:** Link BLS source inline in copy.

---

#### HUB-JOURNEY — Start Your Journey

| Property | Value |
|----------|-------|
| **Drupal paragraph** | `organic_journey` |
| **Twig** | `paragraph--organic-journey.html.twig` |
| **Prototype** | `organic/EnrollmentJourneySection.tsx` |
| **Templates** | hub |

**Editorial fields**

| Field | Label | Type | Required | Notes |
|-------|-------|------|----------|-------|
| `field_heading` | Heading | Text | Yes | *Start Your Journey* |
| `field_steps` | Steps | Repeat: title, description, icon | Yes | Transfer Credits, Application, Funding |

**CSS / tokens:** White bg; numbered or icon steps row

---

### Financial

#### FIN-01 — Tuition & Financial Aid

| Property | Value |
|----------|-------|
| **Drupal paragraph** | `landing_tuition_aid` |
| **Twig** | `paragraph--landing-tuition-aid.html.twig` |
| **Prototype** | `sections/TuitionSection.tsx` |
| **Templates** | v5, v7, occ |

**Editorial fields**

| Field | Label | Type | Required | Notes |
|-------|-------|------|----------|-------|
| `field_heading` | Heading | Text | Yes | |
| `field_pricing_tiers` | Pricing tiers | Repeat: label, amount, accent | Yes | UG $485, Grad $625, $0 apply |
| `field_bridge_stat` | Bridge stat | Text | No | 86% aid anchor |
| `field_savings_cards` | Ways to save cards | Repeat | Yes | 6 disclosure cards |
| `field_card_id` | Card ID | Text | Yes | fafsa, scholarships, military, etc. |
| `field_card_label` | Label | Text | Yes | |
| `field_card_stat` | Stat | Text | No | Always visible |
| `field_card_bullets` | Bullets | Repeat: text | No | Expandable body |

**JS library:** `landing/fin-disclosure` — independent expandable panels; stats always visible

**CSS / tokens:** `bg-uagc-surface-warm`, gold checkmarks on disclosures, 3-col → 2-col → 1-col grid

**Don't:** Outbound links off landing page — on-page disclosures only.

---

#### TUITION-BAND — Tuition Highlight Band

| Property | Value |
|----------|-------|
| **Drupal paragraph** | `organic_tuition_band` |
| **Twig** | `paragraph--organic-tuition-band.html.twig` |
| **Prototype** | `organic/TuitionHighlightBand.tsx` |
| **Templates** | hub |

**Editorial fields**

| Field | Label | Type | Required | Notes |
|-------|-------|------|----------|-------|
| `field_highlights` | Cost highlights | Repeat: value, label | Yes | $485/credit, 86% aid, GI Bill, $0 apply |

**CSS / tokens:** `bg-uagc-navy`, gold stat values, inline cost transparency

---

#### WAYS-TO-SAVE — Ways to Make It Affordable

| Property | Value |
|----------|-------|
| **Drupal paragraph** | `organic_ways_to_save` |
| **Twig** | `paragraph--organic-ways-to-save.html.twig` |
| **Prototype** | `organic/WaysToSaveSection.tsx` |
| **Templates** | hub |

**Editorial fields**

| Field | Label | Type | Required | Notes |
|-------|-------|------|----------|-------|
| `field_heading` | Heading | Text | Yes | |
| `field_subheading` | Subheading | Long text | No | Monthly-cost framing |
| `field_cards` | Disclosure cards | Repeat | Yes | FAFSA, military, employer, scholarships |
| `field_card_title` | Title | Text | Yes | |
| `field_card_stat` | Lead stat | Text | No | 86% anchor on first card |
| `field_card_bullets` | Bullets | Repeat | No | Multi-open OK |

**JS library:** `organic/ways-to-save` — expandable cards (same pattern as FIN-01)

**CSS / tokens:** `bg-white`, `#faf9f7` cards; separates from ACCR-01 band

**Don't:** Outbound links to fin-aid URLs.

---

#### COST-EST — Cost Estimator

| Property | Value |
|----------|-------|
| **Drupal paragraph** | `organic_cost_estimator` |
| **Twig** | `paragraph--organic-cost-estimator.html.twig` |
| **Prototype** | `organic/CostEstimator.tsx` |
| **Templates** | homepage |

**Editorial fields**

| Field | Label | Type | Required | Notes |
|-------|-------|------|----------|-------|
| `field_heading` | Heading | Text | Yes | |
| `field_subheading` | Subheading | Long text | No | |
| `field_degree_levels` | Degree levels | Repeat: id, label, credits, rate | Yes | associate, bachelor, master |
| `field_aid_options` | Aid toggles | Repeat: id, label, savings, annual_reduction | No | scholarships, employer, military |
| `field_cta_phone` | Advisor phone | Text | No | `+1 866 711 1700` |

**JS library:** `organic/cost-estimator` — 3-step wizard; animated cost numbers; aid toggles; `prefers-reduced-motion` on counters; publishes height for sticky offset

**CSS / tokens:** Two-column modular layout; "ways to lower your cost" column visually prominent; `.motion-hover-lift`

**Responsive:** Stacked mobile; side-by-side desktop.

**A11y:** Step indicators; form labels on sliders/selects; live region for cost updates.

---

### Engagement

#### FAQ-01 — FAQ (accordion)

| Property | Value |
|----------|-------|
| **Drupal paragraph** | `landing_faq` |
| **Twig** | `paragraph--landing-faq.html.twig` |
| **Prototype** | `sections/FAQSection.tsx` |
| **Templates** | v5, v7, occ, hub, homepage |

**Editorial fields**

| Field | Label | Type | Required | Notes |
|-------|-------|------|----------|-------|
| `field_heading` | Heading | Text | Yes | Hub: *Frequently Asked Questions About Online Degrees* |
| `field_categories` | Categories | Repeat | No | Optional grouping |
| `field_category_label` | Category label | Text | No | |
| `field_items` | FAQ items | Repeat: question, answer | Yes | |
| `field_anchor_id` | Anchor | Text | No | `faq` |

**JS library:** `landing/faq` — accordion per item; optional category filters

**CSS / tokens:** `bg-white`; objection handler **directly above footer**

**A11y:** Standard accordion ARIA — `aria-expanded`, `aria-controls`, button per question.

---

#### CTA-01 — Bottom CTA (multi-path)

| Property | Value |
|----------|-------|
| **Drupal paragraph** | `landing_bottom_cta` |
| **Twig** | `paragraph--landing-bottom-cta.html.twig` |
| **Prototype** | `organic/HubBottomCTA.tsx` / inline on paid pages |
| **Templates** | v5, v7, occ, hub |

**Editorial fields**

| Field | Label | Type | Required | Notes |
|-------|-------|------|----------|-------|
| `field_heading` | Heading | Text | Yes | *Ready to Start Your Degree?* |
| `field_paths` | Contact paths | Repeat | Yes | 4 paths |
| `field_path_type` | Type | List | Yes | `chat` \| `phone` \| `anchor` \| `link` |
| `field_path_label` | Label | Text | Yes | |
| `field_path_url` | URL / tel / anchor | Text | Yes | `#rfi`, apply URL, tel: |

**Default paths:** Chat with Advisor, Call +1 866 711 1700, Request Information (#rfi), Apply Now

**JS library:** Chat widget trigger hook when type=chat

**CSS / tokens:** Navy band; 4-card grid desktop; gold + white button treatments

**Hub note:** Separate from FORM-02 — ACCR-01 provides visual break between navy CTA and navy RFI.

---

#### TY-CONTACT — Contact Options

| Property | Value |
|----------|-------|
| **Drupal paragraph** | `thankyou_contact` |
| **Twig** | `paragraph--thankyou-contact.html.twig` |
| **Prototype** | `organic/ThankYouContactSection.tsx` |
| **Templates** | ty |

**Editorial fields**

| Field | Label | Type | Required | Notes |
|-------|-------|------|----------|-------|
| `field_heading` | Heading | Text | Yes | *Have Questions that Can't Wait?* |
| `field_subheading` | Subheading | Text | No | *You've got help 24/7* |
| `field_phone` | Phone | Text | Yes | +1 866 711 1700 |
| `field_chat_label` | Chat CTA | Text | No | Let's Chat |
| `field_advisor_hours` | Advisor hours | Repeat: text | Yes | Mon–Thu, Fri, Sat–Sun blocks |

**CSS / tokens:** `bg-uagc-navy`, solid white headings (not faint opacity)

---

#### BLOG-CTA — Blog Admission CTA

| Property | Value |
|----------|-------|
| **Drupal paragraph** | `blog_admission_cta` |
| **Twig** | `paragraph--blog-admission-cta.html.twig` |
| **Prototype** | `organic/BlogAdmissionCTA.tsx` |
| **Templates** | blog |

**Editorial fields**

| Field | Label | Type | Required | Notes |
|-------|-------|------|----------|-------|
| `field_eyebrow` | Eyebrow | Text | No | *Personalized Admission Support* |
| `field_heading` | Heading | Text | Yes | *Partner with Your Admission Specialist* |
| `field_body` | Body | Long text | Yes | |
| `field_portrait` | Specialist image | Media | Yes | Admission specialist photo |
| `field_phone` | Phone CTA | Text | Yes | Talk to a Specialist |
| `field_chat_label` | Chat CTA | Text | No | Chat Now |

**CSS / tokens:** `bg-uagc-teal` card, gold phone CTA, portrait right desktop / top mobile

**Don't:** Embed RFI form — phone + chat only.

---

### Blog Components

Blog content type: `blog_article`. Most blog modules are node fields + theme regions, not landing paragraphs.

#### BLOG-BODY — Blog Article Body

| Property | Value |
|----------|-------|
| **Drupal field** | `field_blog_sections` (node) — not a paragraph |
| **Twig** | `field--node--field-blog-sections.html.twig` |
| **Prototype** | `organic/BlogBody.tsx` |
| **Templates** | blog |

**Editorial fields** (per section)

| Field | Label | Type | Required | Notes |
|-------|-------|------|----------|-------|
| `field_section_heading` | Section heading | Text | Yes | Generates TOC + `id="section-{n}"` |
| `field_paragraphs` | Body paragraphs | Repeat: long text | Yes | WYSIWYG |
| `field_bullets` | Bullet list | Repeat: text | No | |
| `field_pull_quote` | Pull quote | Group | No | text, attribution, attribution_role |
| `field_faqs` | Inline FAQs | Repeat: question, answer | No | Accordion after body |
| `field_closing_section` | Closing section | Group | No | Final paragraph block |

**JS library:** `blog/faq-accordion` — multi-expand FAQ in body (independent from FAQ-01)

**CSS / tokens:** Prose scale `1em`/`1.125em`; pull quote `border-l-4 border-uagc-gold`

**Mid-article slot:** Newsletter inline (~60% scroll) — optional `BLOG-NEWSLETTER` embed.

---

#### BLOG-TOC — Blog Table of Contents

| Property | Value |
|----------|-------|
| **Drupal** | Computed from `field_blog_sections` headings |
| **Twig** | `blog-toc.html.twig` |
| **Prototype** | `organic/BlogArticleTOC.tsx` |
| **Templates** | blog |

**Editorial fields:** None — auto-generated from section headings.

**JS library:** `blog/toc-scroll-spy` — IntersectionObserver active section; smooth scroll; mobile collapsible drawer

**CSS / tokens:** Sticky below toolbar desktop; expandable panel mobile (`<640px`)

**A11y:** `aria-expanded` on mobile toggle; anchor links to `#section-{n}`.

---

#### BLOG-SIDEBAR — Blog Sidebar

| Property | Value |
|----------|-------|
| **Drupal** | Sidebar region + blocks |
| **Twig** | `region--sidebar-blog.html.twig` |
| **Prototype** | `organic/BlogSidebar.tsx` |
| **Templates** | blog |

**Sidebar blocks (editorial)**

| Block | Fields | Notes |
|-------|--------|-------|
| Key Takeaways | `field_takeaways` repeat | Gold-bordered card |
| Author card | author name, photo, profile url, tags | Compact |
| Quick reference | title, variant (comparison/facts/checklist), rows | `BlogQuickReference` |
| Related articles | title, category, date, image, url | Max 3–4 |
| RFI mini | Inherited FORM fields | Sidebar RFI — `variant=mini` |
| Newsletter | See BLOG-NEWSLETTER | `variant=sidebar` |

**JS library:** Sticky sidebar `lg:sticky lg:top-28`

**Responsive:** Below body on mobile; 360px right column desktop.

---

#### BLOG-SHARE — Blog Share Buttons

| Property | Value |
|----------|-------|
| **Drupal paragraph** | `blog_share` (or computed block) |
| **Twig** | `blog-share-buttons.html.twig` |
| **Prototype** | `organic/BlogShareButtons.tsx` |
| **Templates** | blog |

**Editorial fields**

| Field | Label | Type | Required | Notes |
|-------|-------|------|----------|-------|
| `field_share_title` | Article title | Text | Yes | From node title |
| `field_share_url` | Canonical URL | Text | No | Defaults to current page |
| `field_variant` | Layout | List | No | `floating` \| `inline` |

**JS library:** `blog/share` — Web Share API fallback; copy-link with clipboard; Facebook/X/LinkedIn intent URLs

**Networks:** Facebook, X (Twitter), LinkedIn, Copy link

**A11y:** `aria-label` per network; copy confirmation state.

---

#### BLOG-PROGRESS — Blog Reading Progress

| Property | Value |
|----------|-------|
| **Drupal** | Page library attach on `blog_article` |
| **Twig** | `blog-reading-progress.html.twig` |
| **Prototype** | `organic/BlogReadingProgress.tsx` |
| **Templates** | blog |

**Editorial fields:** None

**JS library:** `blog/reading-progress` — scroll listener on main content ref; 3px gold bar fixed top

**A11y:** `role="progressbar"`, `aria-valuenow`, `aria-label="Reading progress"`

---

#### BLOG-NEWSLETTER — Blog Newsletter Signup

| Property | Value |
|----------|-------|
| **Drupal paragraph** | `blog_newsletter` |
| **Twig** | `paragraph--blog-newsletter.html.twig` |
| **Prototype** | `organic/BlogNewsletterSignup.tsx` |
| **Templates** | blog |

**Editorial fields**

| Field | Label | Type | Required | Notes |
|-------|-------|------|----------|-------|
| `field_heading` | Heading | Text | Yes | *Get Career & Education Insights* |
| `field_body` | Body | Long text | No | Weekly tips subcopy |
| `field_variant` | Placement | List | Yes | `sidebar` \| `inline` |
| `field_success_message` | Success copy | Text | No | |

**JS library:** `blog/newsletter` — client validation; success state swap (wire to live ESP in Drupal)

**CSS / tokens:** `bg-uagc-navy`, gold accent border on heading, email input min 44px

**Don't:** Block article reading — inline variant mid-article only.

---

### Thank-You Components

Content type: `thank_you_page` (or route-specific node). **No RFI forms anywhere on thank-you.**

#### TY-NEXT — Next Steps

| Property | Value |
|----------|-------|
| **Drupal paragraph** | `thankyou_next_steps` |
| **Twig** | `paragraph--thankyou-next-steps.html.twig` |
| **Prototype** | `organic/ThankYouNextStepsSection.tsx` |
| **Templates** | ty |

**Editorial fields**

| Field | Label | Type | Required | Notes |
|-------|-------|------|----------|-------|
| `field_heading` | Heading | Text | Yes | *Next Steps: The Admissions Process* |
| `field_steps` | Steps | Repeat | Yes | 3 cards |
| `field_step_title` | Title | Text | Yes | Talk to Advisor, Apply for Free, Get Ready |
| `field_step_description` | Description | Long text | Yes | |
| `field_step_link` | Learn More link | Link | No | |

**CSS / tokens:** White bg; 3-card row desktop / stacked mobile

---

#### TY-CALC — Time to Graduation Calculator

| Property | Value |
|----------|-------|
| **Drupal paragraph** | `thankyou_graduation_calc` |
| **Twig** | `paragraph--thankyou-graduation-calc.html.twig` |
| **Prototype** | `organic/TimeToGraduationCalculator.tsx` |
| **Templates** | ty |

**Editorial fields**

| Field | Label | Type | Required | Notes |
|-------|-------|------|----------|-------|
| `field_heading` | Heading | Text | Yes | |
| `field_subheading` | Subheading | Long text | No | |
| `field_default_degree` | Pre-selected degree | List | No | From submitted program context |
| `field_default_transfer` | Pre-filled transfer credits | Integer | No | From submission if known |

**Calculator inputs (UI — not separate CMS fields)**

| Input | Type | Options |
|-------|------|---------|
| Degree level | Select | Associate (64 cr), Bachelor (120 cr), Master (36 cr) |
| Transfer credits | Range slider | 0 – max per degree (46/90/9) |
| Enrollment pace | Radio | Continuous, Steady, Flexible |

**JS library:** `ty/graduation-calc` — computes weeks/years from UAGC academic calendar (50 instructional weeks/yr, 3 cr/course, 5–6 wk courses); animated number (`prefers-reduced-motion` fallback); progress arc SVG

**CSS / tokens:** White card on cream page; gold accent arc; `ScrollReveal` entrance

**A11y:** Slider `aria-valuemin/max/now`; pace radios in `fieldset` with `legend`.

**Do:** Pre-populate degree from thank-you query params when available.

---

## Dual Implementation Notes

Components with **different paid vs organic implementations** — use the correct paragraph type per template.

| Catalog ID | Paid implementation | Organic implementation | When to use which |
|------------|----------------------|------------------------|-------------------|
| **TRUST-01** | `landing_testimonial` — 3 text quote cards, persona tags, initials avatars | `organic_video_testimonial` — YouTube thumbnails + modal playback | Paid v5/v7/occ + ty (single card); organic hub/homepage use video variant |
| **FOOT-01** | `shared/Footer` — white bg, logo, WSCUC legal block, footnotes | `SiteFooter` — navy compact, contact band, degree-area row, no logos | Paid landings vs all organic templates |
| **HERO-01 vs HERO-ORG/HERO-V2** | Split hero + embedded FORM-01 | Full-width image, trust pills only, no RFI | `/success/*` vs hub/homepage |
| **NAV-01 vs NAV-00** | Reduced header — phone + Apply | Full mega-menu + utility bar | Paid vs organic |
| **VP-01 vs WHY-CHOOSE** | 4-card highlight grid + experience callout | 2-col photo + stats + feature rows | Paid landings vs homepage v2 only |
| **FIN-01 vs WAYS-TO-SAVE / TUITION-BAND / COST-EST** | Unified tuition section with 6 disclosure cards | Hub: separate tuition band + ways-to-save; Homepage: interactive cost estimator | Paid lean fin module vs organic cost-discovery stack |
| **CTA-01** | Inline 4-path grid on paid pages | `HubBottomCTA` on hub — same fields, organic twig may add `#rfi` path | Shared paragraph type, template-specific copy |
| **PROG-01** | `compact=true` on v5, `false` on v7 | Full explorer on hub/homepage — no compact flag | Same paragraph; boolean + heading overrides |
| **CAREER-01** | Full comparison table + Handshake on v5/v7 | Hub-lite 4-area outcomes table | Same paragraph type; fewer rows on hub |
| **FORM-02** | Warm `#faf9f7` mid-page on paid | Navy closing band on hub/homepage v2 | Same form plugin; wrapper style differs |
| **FORM-05** | Observes hero **form** intersection | Observes hero **section** or sidebar (no hero RFI) | Sticky bar logic differs by template |
| **START-01** | Next **two** dates | Thank-you: next **one** date for selected program | Same paragraph; date count override |
| **BLOG-HERO** | N/A | `OrganicHomeHero` `variant="editorial"` — sentence-case title, no pills | Blog only |

---

## JavaScript Library Reference

Load via Drupal `*.libraries.yml` — one library per interactive module.

| Library key | Module(s) | Behavior |
|-------------|-----------|----------|
| `landing/section-nav` | NAV-UX-01 | Sticky pills, scroll-spy, smooth scroll |
| `landing/rfi-mini` | FORM-01 | Two-step stepper, validation |
| `landing/rfi-full` | FORM-02 | Full form validation |
| `landing/rfi-sticky-bar` | FORM-05 | Show/hide based on hero intersection |
| `landing/program-explorer` | PROG-01 | Search, filter, expand rows, show-all |
| `landing/skept-buster` | SKEPT-01 | Multi-open disclosure cards |
| `landing/fin-disclosure` | FIN-01 | Expandable savings cards |
| `landing/faq` | FAQ-01 | Accordion |
| `landing/salary-tabs` | SALARY-01 | Degree/field tab panels |
| `organic/hero-parallax` | HERO-ORG | Subtle parallax; reduced-motion off |
| `organic/hero-video` | HERO-V2 | Desktop video autoplay |
| `organic/video-modal` | TRUST-01 organic | YouTube modal, focus trap |
| `organic/mobile-nav` | NAV-00 | Drawer + accordion |
| `organic/ways-to-save` | WAYS-TO-SAVE | Expandable aid cards |
| `organic/cost-estimator` | COST-EST | 3-step wizard, animated totals |
| `blog/toc-scroll-spy` | BLOG-TOC | Active section highlighting |
| `blog/reading-progress` | BLOG-PROGRESS | Top progress bar |
| `blog/share` | BLOG-SHARE | Social intent + copy link |
| `blog/newsletter` | BLOG-NEWSLETTER | Email capture + success state |
| `blog/faq-accordion` | BLOG-BODY | Inline FAQ toggles |
| `ty/graduation-calc` | TY-CALC | Degree timeline calculator |

**Global attach (paid landings):**

```yaml
landing-page-base:
  js:
    js/landing-rfi-sticky-bar.js: {}
  dependencies:
    - core/drupal
    - core/once
```

**Do not port from Next.js:** React state, Tailwind class strings, Next `Image`, or `"use client"` boundaries — reimplement in vanilla JS or existing Drupal patterns.

---

## CSS & Token Reference

Map all components from [`MASTER.md`](./MASTER.md). Standalone Drupal deliverable: [`drupal-theme.css`](./drupal-theme.css) (extracted utilities + custom properties).

| Token | CSS variable | Common modules |
|-------|-------------|----------------|
| `#0C234B` | `--uagc-navy` | Navy sections, headers, organic footer |
| `#EF9600` | `--uagc-gold` | CTAs, checkmarks, trust pills, progress bar |
| `#AB0520` | `--uagc-red` | Apply Now, play buttons |
| `#faf9f7` | `--uagc-surface-warm` | VP-01, FORM-02 paid, TY-HERO |
| `#fdf8ef` | `--uagc-surface-cred` | CRED-01 |
| Headlines | `--font-heading-condensed` | Fira Sans Extra Condensed 800 |
| Body | `--font-body` | Fira Sans 16/24 desktop |

**Layout utilities:** `.section-pad`, `.section-pad-lg`, `.page-main`, `.mobile-sticky-offset`, `.accent-bar`, `.type-h1`–`.type-h5`, `.cta-primary`, `.rfi-input`, `.touch-target`

**Global rules:** Max width 1440px centered; `scroll-margin-top: 80px` on anchored sections; flat colors only — no gradients (except video card bottom fade), no decorative shadows.

---

## Per-Template Section Order (summary)

Full assembly tables live in [`DRUPAL-HANDOFF.md`](./DRUPAL-HANDOFF.md). Quick stacks:

| Template | Module count | Key exclusives |
|----------|-------------|----------------|
| **v5** | 20 | BRIDGE-01 ×2, CRED-01, EMOT-01, SALARY-01 |
| **v7** | 20 | Same as v5; PROG-01 `compact=false` |
| **occ** | 15 | SKEPT-01 replaces career/salary/cred/emot/prog |
| **hub** | 17 | HERO-ORG, HUB-POPULAR, AREAS, TUITION-BAND, WAYS-TO-SAVE, HUB-JOURNEY, ACCR-01 |
| **homepage** | 14 | HERO-V2, IMPACT, WHY-CHOOSE, COST-EST, INTEREST-GRID |
| **blog** | 11 | All BLOG-* modules |
| **ty** | 9 | TY-HERO, TY-RECEIPT, TY-NEXT, TY-CONTACT, TY-CALC; no FORM-05 |

---

## Document maintenance

When prototype or Figma changes:

1. Update `design-system/pages/<template>.md` and `componentry/*-modules.json`.
2. Sync this file — add fields here; do not fragment back to per-page tables.
3. Run `python .cursor/skills/uagc-component-manager/scripts/registry.py list` to verify ID count (49).

**Related:** [`DRUPAL-HANDOFF.md`](./DRUPAL-HANDOFF.md) · [`MASTER.md`](./MASTER.md) · [`FIGMA-FILES.md`](./FIGMA-FILES.md)

