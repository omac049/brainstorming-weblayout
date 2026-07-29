# Back-End Requirements — UAGC Phase 2 Implementation

**Purpose:** Self-contained backend specification for shipping 7 Phase 2 templates on Drupal. Covers data model, API contracts, integration points, security, and acceptance criteria. Written for a backend developer to implement without needing additional design-system documents.

**Audience:** Back-end engineers, Drupal site builders, CRM / Lead API owners, analytics/data engineering, DevOps.

**Catalog version:** 49-module global component library · 7 templates · Last updated 2026-07-24

---

## Table of Contents

1. [System Context](#1-system-context)
2. [Templates & URL Routing](#2-templates--url-routing)
3. [Content Types & Data Model](#3-content-types--data-model)
4. [Paragraph Types (Module Library)](#4-paragraph-types-module-library)
5. [Data Sources & Integrations](#5-data-sources--integrations)
6. [RFI Submission Pipeline](#6-rfi-submission-pipeline-critical-path)
7. [Thank-You Personalization](#7-thank-you-personalization)
8. [Newsletter & Chat Integrations](#8-newsletter--chat-integrations)
9. [A/B Variant Infrastructure](#9-ab-variant-infrastructure)
10. [Analytics / GA4 DataLayer](#10-analytics--ga4-datalayer)
11. [CSS & Token Integration](#11-css--token-integration)
12. [Non-Functional Requirements](#12-non-functional-requirements)
13. [Security & Compliance](#13-security--compliance)
14. [Environments & Deployment](#14-environments--deployment)
15. [Acceptance Criteria](#15-acceptance-criteria)
16. [Build Phases](#16-recommended-build-phases)
17. [Open Decisions](#17-open-decisions)

---

## 1. System context

```
                 ┌──────────────────────────────────────────────────┐
   Visitor  ───▶ │  Drupal 10 (production target)                    │
                 │  • 4 content types + theme regions                 │
                 │  • Paragraph stacks (ordered module fields)        │
                 │  • drupal-theme.css + per-module JS libraries      │
                 └───────┬──────────────────┬────────────────────────┘
                         │                  │
              RFI submit │                  │ reads at render
                         ▼                  ▼
            ┌──────────────────────┐   ┌───────────────────────────────┐
            │ Lead API / Webform   │   │ Data sources                   │
            │ (existing pipeline)  │   │ • Program taxonomy / API       │
            └─────────┬────────────┘   │ • Academic calendar (dates)    │
                      │                │ • Video / media CDN            │
            redirect  │                │ • Lightcast (career outcomes)  │
            + params  │                │ • Newsletter ESP               │
                      ▼                │ • Chat vendor embed            │
            ┌──────────────────────┐   └───────────────────────────────┘
            │ Thank-you page       │
            │ (personalized)       │◀── sid / token / session
            └─────────┬────────────┘
                      │
                      ▼  events
            ┌──────────────────────┐
            │ GA4 / GTM dataLayer  │
            └──────────────────────┘
```

### Guiding principles

1. **Reuse, don't rebuild.** The RFI submission pipeline, program data, and form handlers already exist in production. Phase 2 restyles wrappers and re-orders modules — it does not replace the Lead API.
2. **Server-render content.** Personalization, program lists, start dates, and FAQ content render server-side; JavaScript is progressive enhancement only.
3. **One paragraph type, many templates.** Shared modules (PROG-01, FAQ-01, FORM-02, etc.) are implemented once and reused across all 7 templates via paragraph reference fields.

---

## 2. Templates & URL routing

| Key | Template name | Live URL pattern | Content type | Notes |
|-----|---------------|------------------|--------------|-------|
| **v5** | `request-info-v5` | `/success/request-info-v5` | `paid_landing_page` | Primary paid RFI landing |
| **v7** | `degree-programs-v7` | `/success/degree-programs-v7` | `paid_landing_page` | Degree discovery paid landing |
| **occ** | `online-college-courses-v5` | `/success/online-college-courses-v5` | `paid_landing_page` | Lean OCC landing (~10 modules) |
| **homepage** | `organic-homepage` | `/` | `organic_page` | Discovery hub with HERO-V2 |
| **hub** | `online-degrees-hub` | `/online-degrees/` | `organic_page` | Program browsing hub |
| **blog** | `blog-article` | `/blog/*` | `blog_article` | Editorial articles |
| **ty** | `request-information-thank-you` | `/request-information/thank-you` | `thank_you_page` | Post-RFI confirmation |

### URL routing rules

- All `/success/*` routes serve the `paid_landing_page` content type with the reduced header (`NAV-01`)
- Organic pages (`/`, `/online-degrees/`) use the full site header (`NAV-00`)
- Thank-you page uses a modified header variant (`NAV-00-TY`) that hides "Request Info" CTA
- Blog routes (`/blog/*`) use full header + reading progress bar
- The thank-you URL is shared across all RFI sources (paid + organic) — **not** one node per submission

---

## 3. Content types & data model

### 3.1 `paid_landing_page`

| Field machine name | Type | Cardinality | Description |
|--------------------|------|-------------|-------------|
| `title` | Text | 1 | Admin title / `<title>` tag |
| `field_landing_sections` | Entity Reference Revisions → Paragraphs | Unlimited, ordered | Module stack — each paragraph = one catalog module |
| `field_hero_image` | Media reference (image) | 1 | Hero background image (responsive: desktop 1440px / mobile 375px) |
| `field_hero_headline` | Text (plain) | 1 | H1 headline text |
| `field_hero_highlights` | Text (plain) | 3–4 | Trust pill labels (e.g., "5-Week Courses") |
| `field_meta_description` | Text (long) | 1 | SEO meta description |
| `field_template_variant` | List (text) | 1 | `v5` / `v7` / `occ` — controls section nav pills and copy variants |
| `field_nav_items` | Text (plain) | 6–8 | Section nav pill labels + anchor targets |

**Theme regions on `/success/*`:**
- `NAV-01` — Reduced header (logo + phone only)
- `FOOT-01` — Paid footer variant
- `FORM-05` — Sticky mobile RFI bar (theme library attach)

### 3.2 `organic_page`

| Field machine name | Type | Cardinality | Description |
|--------------------|------|-------------|-------------|
| `title` | Text | 1 | Page title |
| `field_organic_sections` | Entity Reference Revisions → Paragraphs | Unlimited, ordered | Module stack |
| `field_hero_variant` | List (text) | 1 | `hero_v2` (homepage) / `hero_org` (hub) |
| `field_hero_image` | Media reference | 1 | Hero image or video (homepage supports MP4 + photo fallback) |
| `field_hero_headline` | Text (plain) | 1 | H1 headline |
| `field_hero_trust_pills` | Text (plain) | 4 | e.g., "$485/credit", "5-Week Courses", "WSCUC Accredited", "$0 to Apply" |
| `field_meta_description` | Text (long) | 1 | SEO meta |
| `field_canonical_url` | Link | 1 | Canonical URL |

**Theme regions on organic pages:**
- `NAV-00` — Full site header (Military / Partnerships dropdowns, Apply Now red, Request Info gold)
- `FOOT-01` — Organic `SiteFooter` (compact: contact band + degree-area row + legal baseline, text affiliation only — no logo images)
- `FORM-05` — Sticky bar (targets `#rfi` anchor)

### 3.3 `blog_article`

| Field machine name | Type | Cardinality | Description |
|--------------------|------|-------------|-------------|
| `title` | Text | 1 | Article title |
| `body` | Text (formatted, long) | 1 | WYSIWYG article body (supports inline `BLOG-NEWSLETTER` embed) |
| `field_author` | Entity reference (user) or text + media | 1 | Author name, photo, title |
| `field_published_date` | Datetime | 1 | Publish date (formatted in article meta) |
| `field_last_updated` | Datetime | 1 | Show "Updated" badge when differs from publish date |
| `field_reading_time` | Integer | 1 | Minutes — computed at save or editorial |
| `field_categories` | Entity reference (taxonomy) | Unlimited | Eyebrow on hero; related-article filtering |
| `field_featured_image` | Media reference | 1 | Hero editorial image |
| `field_related_articles` | Entity reference (node) or Views block | 3–5 | Sidebar related list |
| `field_contextual_cta` | Paragraph (optional) | 0–1 | Mid-article CTA (optional editorial override) |

**Computed fields (no editorial input):**
- **Table of Contents** — generated from H2/H3 headings in `body` at render
- **Reading progress** — JS-driven progress bar (theme attach)
- **Share buttons** — floating desktop / toolbar mobile

### 3.4 `thank_you_page`

| Field machine name | Type | Cardinality | Description |
|--------------------|------|-------------|-------------|
| `title` | Text | 1 | Admin title |
| `field_thankyou_sections` | Entity Reference Revisions → Paragraphs | Unlimited, ordered | Module stack (or route-only template) |
| `field_personalization_source` | Config | — | See §7 for redirect contract |

**Not one node per submission.** A single node/route template renders personalized vs. base variants based on query params or session.

**Theme regions:**
- `NAV-00-TY` — Full nav but **hides Request Info** CTA; Apply Now may remain
- `FOOT-01` — Standard organic footer (also suppress RFI links if present)

### 3.5 Global chrome summary

| Region/attach | Element | Used on | Implementation |
|---------------|---------|---------|----------------|
| `NAV-01` | Reduced header (logo + phone + CTA) | v5, v7, occ | Theme region |
| `NAV-00` | Full site header (nav, dropdowns, Apply Now, Request Info) | hub, homepage, blog | Theme region |
| `NAV-00-TY` | Site header (hide Request Info) | ty | Theme region variant |
| `NAV-UX-01` | Section nav sticky pills | v5, v7, occ | `landing_section_nav` paragraph |
| `FOOT-01` | Footer (paid variant / organic variant) | All 7 | Theme region |
| `FORM-05` | Sticky mobile RFI bar | v5, v7, occ, hub, homepage, blog | Theme library attach |

---

## 4. Paragraph types (module library)

Each catalog module below = one Drupal paragraph type, implemented once and reused across templates. **49 total modules** across all 7 templates.

### 4.1 Paid landing paragraphs (`landing_*`)

| Paragraph type | Catalog ID | Fields | Used on |
|----------------|-----------|--------|---------|
| `landing_hero_rfi` | HERO-01 + FORM-01 | `field_headline` (text), `field_subheadline` (text), `field_background_image` (media), `field_mobile_image` (media), `field_highlights` (text, multi), `field_form_variant` (list: mini/full), `field_trust_line` (text) | v5, v7, occ |
| `landing_section_nav` | NAV-UX-01 | `field_nav_items` (text, multi — label + anchor pairs) | v5, v7, occ |
| `landing_start_dates` | START-01 | `field_dates` (date range, 2 max) — compute `daysLeft` at render; `field_highlight_cards` (paragraph ref) | v5, v7, occ, ty |
| `landing_trust_strip` | TRUST-02 | `field_badges` (text, 3); `field_variant` (list: banner/sidebar) | v5, v7, occ |
| `landing_value_props` | VP-01 | `field_heading` (text), `field_highlight_cards` (paragraph ref, 4), `field_experience_callout` (text formatted) | v5, v7, occ |
| `landing_section_bridge` | BRIDGE-01 | `field_text` (text), `field_target_anchor` (text), `field_variant` (list: light/dark) | v5, v7 |
| `landing_program_explorer` | PROG-01 | `field_compact` (boolean), `field_show_transfer_callout` (boolean), `field_program_source` (config/view) | v5, v7, hub, homepage |
| `landing_career_outcomes` | CAREER-01 | `field_comparison_rows` (paragraph ref — program/outcome pairs), `field_handshake_callout` (boolean), `field_source_citation` (text) | v5, v7, hub |
| `landing_salary_growth` | SALARY-01 | `field_degree_tiers` (paragraph ref), `field_field_tabs` (text, multi), `field_source_link` (link) | v5, v7 |
| `landing_tuition_aid` | FIN-01 | `field_pricing_tiers` (paragraph ref, 3), `field_bridge_stat` (text), `field_savings_cards` (paragraph ref, 6) | v5, v7, occ |
| `landing_employer_cred` | CRED-01 | `field_stats` (text, multi), `field_body` (text formatted) | v5, v7 |
| `landing_testimonial` | TRUST-01 (paid) | `field_heading` (text), `field_subheading` (text), `field_testimonials` (paragraph ref, 3 — tag, quote, name, credential, rating) | v5, v7, occ, ty |
| `landing_emotional` | EMOT-01 | `field_quote` (text long), `field_stats` (text, multi) | v5, v7 |
| `landing_rfi_section` | FORM-02 | `field_heading` (text), `field_subheading` (text), `field_form_variant` (list: full/two-step) | v5, v7, occ, hub, homepage |
| `landing_faq` | FAQ-01 | `field_categories` (paragraph ref — each has title + items), `field_items` (paragraph ref — question + answer) | v5, v7, occ, hub, homepage |
| `landing_bottom_cta` | CTA-01 | `field_heading` (text), `field_paths` (link, 4 — label + URL/anchor + icon) | v5, v7, occ, hub |
| `landing_skepticism_buster` | SKEPT-01 | `field_heading` (text), `field_proof_blocks` (paragraph ref — stat, description, source) | occ only |

### 4.2 Organic paragraphs (`organic_*`)

| Paragraph type | Catalog ID | Fields | Used on |
|----------------|-----------|--------|---------|
| `organic_hero_v2` | HERO-V2 | `field_headline` (text), `field_accent_line` (text — gold), `field_trust_pills` (text, 4), `field_video` (media — desktop MP4), `field_image_fallback` (media — mobile photo) | homepage |
| `organic_hero` | HERO-ORG | `field_headline` (text), `field_trust_pills` (text, 4), `field_image` (media) | hub |
| `organic_impact_strip` | IMPACT | `field_stats` (paragraph ref, 5 — value + label each) | homepage |
| `organic_why_choose` | WHY-CHOOSE | `field_image` (media), `field_stats` (paragraph ref), `field_body` (text formatted) | homepage |
| `organic_video_testimonial` | TRUST-01 (organic) | `field_heading` (text), `field_videos` (media/oEmbed, 3 — thumbnail + YouTube ID or URL) | hub, homepage, ty |
| `organic_persona_paths` | PERSONA-PATHS | `field_show_variant` (list: tabs/cta), `field_tabs` (paragraph ref — title + content + link) | hub, homepage |
| `organic_accreditation` | ACCR-01 | `field_ua_logo` (media — horizontal, h-10/h-12), `field_copy` (text) | hub, homepage |
| `organic_popular_programs` | HUB-POPULAR | `field_programs` (entity ref → program nodes, 3), `field_view_all_link` (link) | hub |
| `organic_tuition_band` | TUITION-BAND | `field_pricing_highlight` (text), `field_cta` (link) | hub |
| `organic_ways_to_save` | WAYS-TO-SAVE | `field_cards` (paragraph ref, multi — expandable disclosure cards with stats + bullets) | hub |
| `organic_areas_of_study` | AREAS | `field_areas` (entity ref → taxonomy) | hub |
| `organic_interest_grid` | INTEREST-GRID | `field_cards` (paragraph ref — flat navy discovery cards by area) | homepage |
| `organic_cost_estimator` | COST-EST | `field_tuition_rates` (config), `field_credit_counts` (config), `field_cta` (link → #rfi pre-fill) | homepage |
| `organic_journey` | HUB-JOURNEY | `field_steps` (paragraph ref — title + description + icon) | hub |

### 4.3 Blog paragraphs (`blog_*`)

| Paragraph type | Catalog ID | Fields | Used on |
|----------------|-----------|--------|---------|
| `blog_hero` | BLOG-HERO | Rendered from node fields (title, category eyebrow, featured image, author, date, reading time) | blog |
| `blog_toc` | BLOG-TOC | Computed from H2/H3 in body — no editorial field | blog |
| `blog_sidebar` | BLOG-SIDEBAR | `field_program_filter` (views block), `field_related_articles` (entity ref or views), `field_mini_cta` (paragraph ref) | blog |
| `blog_newsletter` | BLOG-NEWSLETTER | `field_heading` (text), `field_description` (text), `field_endpoint` (config — ESP) | blog |
| `blog_share` | BLOG-SHARE | Share platform list (computed) — Twitter/X, LinkedIn, Facebook, Email, Copy Link | blog |
| `blog_admission_cta` | BLOG-CTA | `field_heading` (text), `field_body` (text), `field_cta` (link) | blog |

### 4.4 Thank-you paragraphs (`thankyou_*`)

| Paragraph type | Catalog ID | Fields | Used on |
|----------------|-----------|--------|---------|
| `thankyou_hero` | TY-HERO | `field_headline_template` (text — supports `{firstName}` token), `field_subheadline` (text), `field_expectations_bullets` (text, 4), `field_badges` (text, 2), `field_primary_cta` (link), `field_secondary_cta` (link) | ty |
| `thankyou_receipt` | TY-RECEIPT | `field_show_confirmation_id` (bool), `field_show_email_notice` (bool), `field_estimated_response` (text) | ty |
| `thankyou_next_steps` | TY-NEXT | `field_heading` (text), `field_steps` (paragraph ref, 3 — title + description + link) | ty |
| `thankyou_contact` | TY-CONTACT | `field_heading` (text), `field_phone` (text), `field_chat_label` (text), `field_hours` (text, multi) | ty |
| `thankyou_graduation_calc` | TY-CALC | `field_tuition_rates` (config), `field_credit_requirements` (config) | ty |

---

## 5. Data sources & integrations

### 5.1 Data source registry

| # | Consumer module(s) | Data needed | Recommended source | Shape | Status |
|---|--------------------|-------------|--------------------|-------|--------|
| D1 | `PROG-01`, `HUB-POPULAR`, blog sidebar | Program catalog | Existing program taxonomy / JSON API | See §5.2 | **Confirm** — Drupal team |
| D2 | `START-01` | Next start dates + `daysLeft` | CMS field or academic calendar API | See §5.3 | **Confirm** — Drupal team |
| D3 | `TRUST-01` (organic) | Video testimonial embeds | Media entities / `uagc.edu` CDN / YouTube oEmbed | `{ youtubeId, thumbnail, name, credential }` | **Confirm** — Content |
| D4 | `CAREER-01` | Salary/outcomes by program | Static rows or Lightcast embed widget | Embed codes in `data/lightcast-embed-codes.csv` | **Confirm** — Dev |
| D5 | `BLOG-SIDEBAR` | Related articles | Entity reference or Views block | `{ title, url, category, date, image }` | **Confirm** — Drupal |
| D6 | `BLOG-NEWSLETTER` | Newsletter signup endpoint | Webform → ESP or direct ESP API | `POST { email }` → success/error | **Confirm** — Marketing |
| D7 | `CTA-01`, `TY-CONTACT` | Chat widget trigger | Existing live-chat vendor JS embed | Vendor + trigger hook | **Confirm** — Drupal |
| D8 | `COST-EST`, `TY-CALC` | Tuition rates, credit counts | CMS config entity or constants | See §5.4 | **Confirm** — Finance |
| D9 | `FAQ-01`, `SKEPT-01`, `FIN-01` | FAQ/disclosure content | Editorial paragraph fields | Content-managed | No dependency |

### 5.2 Program data contract (D1)

**Minimum fields consumed by `PROG-01`:**

```json
{
  "programs": [
    {
      "program_name": "BA in Business Administration",
      "area": "Business",
      "degree_level": "Bachelor",
      "url": "/online-degrees/bachelors/business-administration",
      "summary": "Gain skills in management, marketing, and finance...",
      "credits_required": 120,
      "cost_per_credit": 485
    }
  ]
}
```

| Field | Type | Required | Used for |
|-------|------|----------|----------|
| `program_name` | string | Yes | Row title in explorer |
| `area` | enum: Business, Education, IT, Health Care, Liberal Arts, Science | Yes | Native `<select>` filter on mobile |
| `degree_level` | enum: Associate, Bachelor, Master, Certificate | Yes | Secondary filter |
| `url` | string (relative path) | Yes | "Learn more" link → live program page |
| `summary` | string (≤200 chars) | Yes | Expandable row detail (keep students on-page) |
| `credits_required` | integer | No | Used by `COST-EST` and `TY-CALC` |
| `cost_per_credit` | integer | No | Used by `COST-EST` |

**Rules:**
- Same source feeds paid `PROG-01`, hub `PROG-01`, homepage `PROG-01`, and `HUB-POPULAR`
- Expose ~50+ programs (not "200+")
- No per-program "Request Info" CTA — explorer keeps users on-page
- Transfer-policy messaging belongs in `VP-01`, not the explorer
- Mobile: show ~6 programs in normal page flow with "Show All" expand; native `<select>` for area filter (no nested scroll traps)

### 5.3 Start date contract (D2)

```json
{
  "startDates": [
    {
      "date": "2026-08-04",
      "term": "Summer B 2026",
      "daysLeft": 11,
      "isNext": true
    },
    {
      "date": "2026-09-01",
      "term": "Fall 2026",
      "daysLeft": 39,
      "isNext": false
    }
  ]
}
```

**Rules:**
- Compute `daysLeft` **at render time** (not client-side `useEffect`) to avoid SSR/hydration mismatch
- Show next **two** dates on paid templates
- Show **one** date on thank-you (with countdown badge: "Starts in X days" / "Starts tomorrow")
- Urgency badge thresholds: `daysLeft <= 1` = "Starts tomorrow" (gold), `<= 7` = "Starts this week" (gold), `<= 14` = "Starting soon"
- When both dates have passed, hide urgency badge — show informational dates only

### 5.4 Tuition rates contract (D8)

| Rate key | Value | Used by |
|----------|-------|---------|
| `undergraduate_per_credit` | $485 | `FIN-01`, `COST-EST`, `TY-CALC`, hero trust pills |
| `graduate_per_credit` | $625 | `FIN-01`, `COST-EST` |
| `application_fee` | $0 | `FIN-01`, hero highlights |
| `military_per_credit` | $250 | `FIN-01` savings card |
| `avg_transfer_credits` | 41.5 | `FIN-01` savings card |
| `financial_aid_percent` | 86% | `FIN-01` bridge stat |

These values must be sourced from a **single canonical config** (CMS config entity or settings) so updates propagate to all consuming modules.

---

## 6. RFI submission pipeline (critical path)

All `FORM-01`, `FORM-02`, `FORM-05` instances submit to the **existing live request-information pipeline**. **Do not build a new endpoint.**

### 6.1 Form variants

| Catalog ID | Drupal implementation | UX | Submit behavior |
|------------|----------------------|----|-----------------|
| `FORM-01` | Embedded in `landing_hero_rfi` paragraph | Two-step mini (Step 1: area of interest → Step 2: contact fields) | POST to live hero RFI endpoint |
| `FORM-02` | Standalone `landing_rfi_section` paragraph | Full single-page form | POST to same endpoint |
| `FORM-05` | Theme library attach (mobile) | Sticky CTA bar | **No submit** — scrolls to `#rfi` anchor or expands mini form |

### 6.2 RFI placement rules by template

| Template | FORM-01 (hero) | FORM-02 (mid-page) | FORM-05 (sticky) |
|----------|----------------|--------------------|------------------|
| Paid (v5, v7, OCC) | **Yes** — embedded in HERO-01 | **Yes** — closing band | **Yes** — show after scroll past hero |
| Organic homepage | **No** | **Yes** — navy closing band (`#rfi`) | **Yes** |
| Online-degrees hub | **No** | **Yes** — closing band only | **Yes** |
| Blog article | **No** | **No** | **Yes** — targets sidebar or scroll |
| Thank-you | **No** | **No** | **No** — user already converted |

### 6.3 Form field contract

| Field key | Label | HTML type | Required | Mini step | Validation |
|-----------|-------|-----------|----------|-----------|------------|
| `college_of_interest` | Area of Interest | `<select>` / autocomplete | Yes | 1 | Must match live program routing option list |
| `firstname` | First Name | `<input type="text">` | Yes | 2 | Non-empty; max 50 chars |
| `lastname` | Last Name | `<input type="text">` | Yes | 2 | Non-empty; max 50 chars |
| `email` | Email | `<input type="email">` | Yes | 2 | Valid email format (server + client) |
| `phone` | Phone | `<input type="tel">` | Yes | 2 | US phone format; 10 digits |
| `state` | State | `<select>` | Yes | 2 | Valid US state/territory |
| `tcpa_checkbox` | TCPA Consent | `<input type="checkbox">` | Yes | 2 | **Must use live consent copy verbatim** — compliance gated |
| `military_status` | Military Affiliation | `<select>` | No | 2 | If present on live form |
| `clientdegreeid` | Program ID | `<input type="hidden">` | No | — | Pre-selected from campaign URL params |
| `variant_id` | A/B Variant | `<input type="hidden">` | No | — | **New for Phase 2** — cookie value → payload |

### 6.4 Submission flow (sequence)

```
┌─────────┐         ┌──────────┐         ┌──────────┐         ┌──────────────┐
│ Browser │         │  Drupal  │         │ Lead API │         │ Thank-you    │
└────┬────┘         └────┬─────┘         └────┬─────┘         └──────┬───────┘
     │  POST /rfi-submit  │                    │                      │
     │ ──────────────────▶│                    │                      │
     │                    │  Validate fields   │                      │
     │                    │  (server-side)     │                      │
     │                    │                    │                      │
     │  [validation fail] │                    │                      │
     │ ◀─ 422 + errors ──│                    │                      │
     │  (preserve values) │                    │                      │
     │                    │                    │                      │
     │  [validation pass] │                    │                      │
     │                    │  POST lead payload │                      │
     │                    │ ──────────────────▶│                      │
     │                    │                    │                      │
     │                    │  200 { sid, token } │                      │
     │                    │ ◀──────────────────│                      │
     │                    │                    │                      │
     │                    │  Fire GA4 event    │                      │
     │                    │  (generate_lead)   │                      │
     │                    │                    │                      │
     │  302 Redirect      │                    │                      │
     │  /request-information/thank-you?sid=X&token=Y                  │
     │ ◀──────────────────│                    │                      │
     │                    │                    │                      │
     │  GET /request-information/thank-you?sid=X&token=Y              │
     │ ────────────────────────────────────────────────────────────▶ │
     │                    │                    │                      │
     │  Personalized HTML │                    │                      │
     │ ◀────────────────────────────────────────────────────────────│
```

### 6.5 Lead API payload shape (expected — confirm with CRM team)

```json
POST /api/lead-submit (or existing webform endpoint)
Content-Type: application/x-www-form-urlencoded (or JSON — confirm)

{
  "college_of_interest": "business",
  "firstname": "Natasha",
  "lastname": "Rodriguez",
  "email": "natasha@example.com",
  "phone": "5551234567",
  "state": "AZ",
  "tcpa_consent": true,
  "tcpa_timestamp": "2026-07-24T10:30:00Z",
  "tcpa_page_url": "/success/request-info-v5",
  "military_status": "",
  "clientdegreeid": "",
  "variant_id": "v5-control",
  "source_url": "/success/request-info-v5",
  "utm_source": "google",
  "utm_medium": "cpc",
  "utm_campaign": "brand-2026"
}
```

**Expected success response:**

```json
{
  "status": "success",
  "sid": "7717243",
  "token": "abc123def456",
  "submissionID": "RFI-2026-07-24-001",
  "redirect_url": "/request-information/thank-you?sid=7717243&token=abc123def456"
}
```

**Expected error response:**

```json
{
  "status": "error",
  "errors": {
    "email": "Please enter a valid email address.",
    "phone": "Phone number must be 10 digits."
  }
}
```

### 6.6 Backend deliverables (RFI)

- [ ] Document the **live form plugin / webform ID** per environment (dev, staging, production)
- [ ] Publish the **Lead API payload shape** (field names, required hidden fields, content-type, auth headers) so front end maps 1:1
- [ ] Implement server-side validation mirroring live rules; return **inline field errors** and **preserve entered values** on validation failure
- [ ] On success → redirect to thank-you URL with personalization params (`sid`, `token`, `submissionID`)
- [ ] Fire GA4 `generate_lead` event (or existing conversion event) with `variant_id` on success
- [ ] Confirm TCPA consent storage — timestamp + page URL + variant context stored with lead record
- [ ] Implement Twig partials: `rfi-form--mini.html.twig`, `rfi-form--full.html.twig`
- [ ] Implement JS: two-step stepper, client validation, sticky bar intersection observer

---

## 7. Thank-you personalization

### 7.1 Data flow

```
Lead API success → 302 redirect → /request-information/thank-you?sid=X&token=Y
                                    │
                                    ▼
                    Drupal resolves personalization:
                    • Query lead record by sid/token
                    • OR read session/cookie
                    • OR parse signed redirect params
                                    │
                                    ▼
                    Server-render with injected values
```

### 7.2 Personalization values

| Value | Source | Consumed by | Fallback when missing |
|-------|--------|-------------|----------------------|
| `firstName` | Lead API redirect param or session lookup | `TY-HERO` headline: "Congratulations {firstName}," | Generic: "Congratulations — you've taken the first step." (no trailing comma) |
| `program` / `area` | Lead API or session | `TY-RECEIPT` recap, `TY-CALC` default degree, `START-01` program-specific date | Generic copy; omit program recap |
| `confirmationId` | Lead API response field | `TY-RECEIPT` confirmation line | Hide confirmation ID line |
| `maskedEmail` | Submission email (mask: `n***@domain.com`) | `TY-RECEIPT` email-sent notice | Hide notice |
| `portalUrl` | Lead API or fixed admission portal + sid | `TY-HERO` "Start Application" primary CTA href | Link to generic admission portal |

### 7.3 Variant rendering rules

| Variant | Trigger | Behavior |
|---------|---------|----------|
| **Personalized** | `sid` and/or `token` query params present (or session has lead context) | Inject firstName, program, confirmation ID, portal URL |
| **Base** | No params, expired token, or lookup failure | Generic copy — graceful degradation, not error page |

### 7.4 Backend deliverables (thank-you)

- [ ] Define the **redirect contract** (which params: `sid` / `token` / `submissionID`; signed or plain; expiration)
- [ ] Implement server-side personalization resolution (lookup by sid → firstName, program, email, portalUrl)
- [ ] **Server-render** personalized content (not client-only token parsing — avoid FOUC / layout shift)
- [ ] Populate `START-01` from program context (fix currently-empty live start-date widget)
- [ ] Ensure **no RFI forms** render on this template (`NAV-00-TY` hides Request Info; `FORM-05` not attached)
- [ ] Handle expired/invalid tokens gracefully → render base variant (not 404 or error)

---

## 8. Newsletter & chat integrations

### 8.1 Newsletter (`BLOG-NEWSLETTER`, D6)

| Aspect | Requirement |
|--------|-------------|
| Trigger | Email field submit on blog inline or sidebar newsletter block |
| Endpoint | Webform → ESP, or direct ESP API (e.g., Mailchimp/HubSpot) — **TBD** |
| Payload | `{ email: string, source: "blog", article_category?: string }` |
| Success | Client-side swap to "Thanks! Check your inbox." confirmation state |
| Double opt-in | If ESP requires, server handles confirmation email flow |
| Error | Inline validation ("Please enter a valid email") + server error ("Something went wrong. Try again.") |
| Rate limit | Max 3 submissions per session to prevent abuse |

### 8.2 Chat (`CTA-01`, `TY-CONTACT`, `BLOG-CTA`, D7)

| Aspect | Requirement |
|--------|-------------|
| Trigger | User clicks "Chat with Advisor" or "Let's Chat" link/button |
| Implementation | Fire existing live-chat vendor's open/trigger JS method |
| Vendor | **Confirm** — LiveChat, Drift, Intercom, or existing vendor |
| No new infra | Reuse the chat embed already on `uagc.edu` |
| Availability | Display advisor hours in `TY-CONTACT`; if after hours, show fallback message |

---

## 9. A/B variant infrastructure

Phase 2 validation happens on **Drupal staging/production**, not the Next.js prototype app.

### 9.1 Requirements

| Concern | Specification |
|---------|---------------|
| **Assignment** | First-party cookie `uagc_variant` set on first visit to `/success/request-info-v5` (extendable to other paid URLs) |
| **Cookie spec** | Name: `uagc_variant`; Value: `{template}-{variant}` (e.g., `v5-control`, `v5-variant-a`); Path: `/success/`; Max-age: 30 days; SameSite: Lax; Secure |
| **Propagation** | Cookie value → `variant_id` hidden field on RFI form → included in Lead API payload |
| **GA4 event** | `variant_id` param on `generate_lead` event for attribution |
| **Reporting** | Lead counts use **LFS/LSF lead** definition (deduplicated) — not aggregate "conversions" column |
| **Rollout** | Validate full flow on staging with production-equivalent Lead API before any production traffic split |
| **Split logic** | 50/50 random assignment (or configurable weights via Drupal config) |

### 9.2 Implementation notes

- Cookie must be set **server-side** (not JS-only) for reliability and to prevent race with form render
- Do not rely on GTM or analytics JS for assignment — lead attribution requires the value in the form payload
- If cookie already exists on return visit, use existing assignment (sticky sessions)
- Clear assignment only when test concludes (admin action)

---

## 10. Analytics / GA4 dataLayer

### 10.1 Required events

| Event name | Trigger | Required params | Notes |
|------------|---------|-----------------|-------|
| `generate_lead` (or existing conversion action) | RFI submission success | `variant_id` (when A/B active), `program_area`, `template`, `form_location` (hero/mid-page) | Must reconcile to program report (BigQuery `advertising-data-mart.inquiries`) |
| `page_view` | Page load | `template_key` (v5/v7/occ/homepage/hub/blog/ty), `content_type` | Standard enhanced measurement |
| `prog_explorer_search` | PROG-01 filter or search | `search_term`, `area_filter`, `results_count` | Optional UX insight |
| `cost_est_complete` | COST-EST calculator interaction | `credits_entered`, `estimated_total` | Optional |
| `faq_expand` | FAQ accordion open | `faq_category`, `question_text` (truncated) | Optional |
| `video_play` | TRUST-01 video modal open | `video_id`, `testimonial_name` | Optional |

### 10.2 DataLayer integration rules

- Preserve existing GTM container behavior — add `variant_id` to the lead event without breaking current conversion tracking
- Push to `window.dataLayer` — do not call `gtag()` directly
- Lead metrics must reconcile to the program report definition (BigQuery primary window Oct 2025 – Mar 2026)
- Do not treat headline "conversions" ÷ spend as CPL — use per-conversion-action data (LFS leads)

### 10.3 DataLayer push examples

```javascript
// On successful RFI submission
window.dataLayer.push({
  event: 'generate_lead',
  variant_id: 'v5-control',
  program_area: 'Business',
  template: 'request-info-v5',
  form_location: 'hero'
});

// On page load
window.dataLayer.push({
  event: 'page_view',
  template_key: 'request-info-v5',
  content_type: 'paid_landing_page'
});
```

---

## 11. CSS & token integration

### 11.1 Theme CSS

Include **`drupal-theme.css`** in the Drupal theme pipeline. It provides:

- CSS custom properties (all color and spacing tokens)
- Typography utilities (`.type-h1` through `.type-micro`)
- Layout classes (`.section-pad`, `.page-main`)
- Form styling (`.rfi-input`, `.cta-primary`, `.cta-secondary`)
- Interactive components (accordion, modal, stepper)
- Motion/animation (scroll reveal, hero entrance)
- `prefers-reduced-motion` fallbacks

### 11.2 Key tokens (inline reference)

| Token | Value | Usage |
|-------|-------|-------|
| `--uagc-navy` | `#0C234B` | Headlines, dark section backgrounds |
| `--uagc-red` | `#AB0520` | Apply Now buttons, inline links |
| `--uagc-gold` | `#EF9600` | Request Info CTAs, accent elements, trust pill dots |
| `--uagc-surface` | `#faf9f7` | Light section backgrounds (VP-01, FIN-01) |
| `--uagc-warm-surface` | `#fdf8ef` | CRED-01 background |
| `--text-primary` | `#111111` | Body text |
| `--text-muted` | `#53565A` | Secondary text, descriptions |
| `--border-light` | `#D0D0CE` | Dividers, card borders |
| `--uagc-navy-muted` | `#b8c5d9` | Subcopy on navy backgrounds |

### 11.3 Layout conventions

| Rule | Value |
|------|-------|
| Max content width | `1440px` centered |
| Section horizontal padding | `16px` mobile → `32px` desktop |
| Fixed header offset | `scroll-margin-top: 80px` (paid) / `108px` (organic large breakpoints) |
| Font family | **Fira Sans** (Regular 400, Semibold 600) — web font for all text |
| Font family (impact headings) | **Fira Sans Extra Condensed** (800) — H1, H2 impact headlines |
| Paid landing | Flat colors only — no gradients, alpha overlays, backdrop-blur, decorative shadows |
| Dark sections (navy bg) | `#FFFFFF` text; use `--uagc-navy-muted` (#b8c5d9) for subcopy; never `text-white/50`–`/70` |

### 11.4 Scope classes

| Scope class | Apply to | Purpose |
|-------------|----------|---------|
| `.paid-landing` | Node template wrapping `/success/*` | Paid-specific styles |
| `.organic-page` | Homepage, hub node templates | Organic-specific styles |
| `.blog-article` | Blog node template | Blog-specific styles |
| `.thank-you-page` | Thank-you node template | Post-conversion styles |

### 11.5 JavaScript libraries

Load behaviors via Drupal `libraries.yml` — one library per interactive paragraph:

```yaml
# Example — adjust to Drupal conventions
landing-page-base:
  css:
    theme:
      css/drupal-theme.css: {}
  js:
    js/landing-rfi-sticky-bar.js: {}
  dependencies:
    - core/drupal
    - core/once

landing-program-explorer:
  js:
    js/program-explorer.js: {}
  dependencies:
    - core/drupal
    - core/once

landing-faq-accordion:
  js:
    js/faq-accordion.js: {}
  dependencies:
    - core/drupal
    - core/once
```

**Do not** port React state, Tailwind class strings, Next.js `Image`, or `"use client"` boundaries from prototypes. Reimplement interactions in vanilla JS or existing Drupal patterns.

---

## 12. Non-functional requirements

| Category | Requirement | Metric / Test |
|----------|-------------|---------------|
| **Performance** | Mobile-first; LCP hero image optimized + correctly sized per breakpoint | Core Web Vitals "good" on PageSpeed Insights |
| **No layout shift** | Personalization must not cause visible reflow on initial paint | CLS < 0.1 |
| **Caching** | Anonymous pages fully cacheable (CDN/Varnish/page cache) | Cache-Control headers; TTL > 5 min for anonymous |
| **Cache bypass** | Personalized thank-you and RFI error responses bypass shared cache | Use `url.query_args`, session cache contexts/tags |
| **Data caching** | Program/start-date feeds cached with sane TTL (5–15 min) + invalidation on edit | No stale data > 1 hour after content update |
| **Rendering** | Content server-rendered (SSR); JS = progressive enhancement only | Page readable with JS disabled (forms submit without AJAX) |
| **Reduced motion** | Respect `prefers-reduced-motion` for animated counters, scroll reveals, hero entrances | Test with OS-level motion reduction |
| **Resilience** | If data source unavailable (program feed, video, Lightcast, start dates): degrade gracefully | Render fallback content or omit module cleanly; never hard-fail page |
| **Accessibility** | Landmark roles, `aria-*` on accordions/tabs/sliders, focus management on modals, ≥44px touch targets | WCAG 2.1 AA; automated + manual audit |
| **Contrast** | No contrast-failing text on navy (avoid faint opacity text on dark backgrounds) | 4.5:1 minimum body text; 3:1 large text |
| **SEO** | Preserve canonical URLs, meta descriptions, structured data on organic templates | Article schema on blog (author, dates); Organization schema on homepage |
| **Image optimization** | Responsive `<picture>` / `srcset` for hero images (desktop 1440 / tablet 768 / mobile 375) | WebP format preferred; lazy-load below fold |

---

## 13. Security & compliance

### 13.1 Checklist

- [ ] **TCPA consent:** Use **live consent copy verbatim** — any wording change requires legal approval. Store: consent text + timestamp + page URL + variant context with the lead record.
- [ ] **PII handling:** RFI fields (name, email, phone, state) handled per existing data-handling policy. No PII in client logs, GA4 event params, or URLs beyond the agreed thank-you token (`sid`).
- [ ] **Transport:** All form POSTs over HTTPS. No mixed content.
- [ ] **CSRF:** Drupal CSRF token on all form submissions (built-in for webforms; verify for custom handlers).
- [ ] **Input validation:** Server-side validation and sanitization on ALL submitted fields (XSS prevention, SQL injection prevention, input length limits).
- [ ] **Secrets management:** ESP API keys, Lead API credentials, chat vendor config in environment variables / Drupal config — **never** in theme JS, Twig templates, or the prototype repo.
- [ ] **Rate limiting:** Implement rate limiting on RFI submission endpoint (suggest: 5 submissions per IP per 10 minutes).
- [ ] **Dependency scanning:** Run security scan before any push that touches APIs, env vars, or new packages.
- [ ] **Email masking:** On thank-you page, mask submitted email (show `n***@domain.com` — never full email in markup/URL).

### 13.2 Content Security Policy recommendations

| Directive | Allow |
|-----------|-------|
| `script-src` | Self + GTM + chat vendor + YouTube embed |
| `img-src` | Self + `uagc.edu` CDN + YouTube thumbnails + GA |
| `frame-src` | YouTube (for video modals) + chat vendor + Lightcast widget |
| `connect-src` | Self + Lead API + ESP endpoint + analytics |

---

## 14. Environments & deployment

| Environment | Purpose | RFI target | Notes |
|-------------|---------|------------|-------|
| **Local / dev** | Drupal build + paragraph implementation | Mock / local handler | `drupal-theme.css` integrated; scope classes applied |
| **Staging** | Stakeholder sign-off, RFI with production-equivalent payload, A/B validation | Production-equivalent Lead API (or sandbox with same schema) | Must demonstrate full submit → redirect → thank-you flow |
| **Production** | Phased rollout per build phases below | Live Lead API | Deploy behind feature flag or URL-specific theme switching |

### 14.1 Deployment requirements

- RFI **must succeed on staging** with production-equivalent payload before launch (QA checklist)
- Staging must serve over HTTPS with valid cert (for TCPA + cookie testing)
- A/B cookie mechanism testable on staging before production traffic split
- Match live Drupal styling — Fira Sans web font loaded, token values match `drupal-theme.css`
- Feature flags or content type enable/disable for phased rollout (don't ship all 7 templates at once)

---

## 15. Acceptance criteria

A template is **backend complete** when ALL of the following are verified:

### 15.1 All templates

- [ ] Content type exists with correct module field (`field_landing_sections` / `field_organic_sections` / etc.)
- [ ] Paragraph types created and map to catalog IDs in §4
- [ ] All dynamic modules pull from a **confirmed live source** (§5) — not prototype mock data
- [ ] `drupal-theme.css` loaded; typography uses `.type-*` utilities; scope class applied
- [ ] Touch targets ≥ 44px on all interactive elements (mobile)
- [ ] `scroll-margin-top` offsets account for fixed header height on all anchored sections
- [ ] Page renders server-side; readable with JS disabled (forms submit without AJAX fallback)
- [ ] Graceful degradation: if any data source unavailable, page renders without hard failure

### 15.2 Paid templates (v5, v7, OCC)

- [ ] Hero RFI two-step mini functional; submits to live Lead API on staging
- [ ] `FORM-05` sticky bar appears only after scroll past hero (IntersectionObserver)
- [ ] `VP-01` renders highlight cards; no bulletPoints; no section-level RFI CTA
- [ ] `PROG-01` program data loads from live source; mobile shows ~6 with "Show All"
- [ ] `START-01` dates populated with real academic calendar data; `daysLeft` computed at render
- [ ] `NAV-UX-01` section pills rendered per template (8 pills v5/v7; 6 pills OCC)
- [ ] OCC has `SKEPT-01` only — does NOT render CAREER-01, SALARY-01, CRED-01, or EMOT-01
- [ ] `CTA-01` four paths functional: chat triggers vendor, phone is click-to-call, #rfi scrolls, apply links

### 15.3 Organic templates (homepage, hub)

- [ ] `HERO-V2` (homepage) / `HERO-ORG` (hub) renders trust pills only — **no in-hero RFI**
- [ ] `PROG-01` shared program data functional on homepage and hub
- [ ] `COST-EST` (homepage) calculates from canonical tuition rates; "Request plan" pre-fills `FORM-02`
- [ ] Closing `FORM-02` present on homepage and hub; submits correctly
- [ ] `FORM-05` sticky bar present; no hero form to intersect (targets `#rfi`)
- [ ] `NAV-00` full header: Military / Partnerships dropdowns functional; Apply Now (red) + Request Info (gold)
- [ ] Organic `SiteFooter` matches live structure (compact; no logo images; text affiliation only)
- [ ] `TRUST-01` renders as video testimonials with modal playback (not text quote cards)

### 15.4 Blog template

- [ ] `blog_article` content type with all fields per §3.3
- [ ] Reading progress bar functional (JS progressive enhancement)
- [ ] Table of contents generated from body H2/H3 headings; scroll-spy highlights active
- [ ] Sidebar sticky on desktop; related articles load from entity reference or Views
- [ ] **No mid-page RFI** — `FORM-05` only; targets sidebar scroll position
- [ ] Share buttons functional (desktop floating; mobile toolbar)
- [ ] Author/meta rendering correct; "Updated" badge shown when `last_updated` differs from `published_date`

### 15.5 Thank-you template

- [ ] Personalized variant renders when `sid`/`token` present: firstName, program, confirmation ID, masked email
- [ ] Base variant renders gracefully when params absent or invalid (no trailing comma, no error state)
- [ ] `TY-RECEIPT` shows confirmation details from lead record
- [ ] `START-01` populated with real date (fix currently-empty live widget)
- [ ] `TY-CALC` graduation calculator computes from canonical rates + program credits
- [ ] **Zero RFI forms** anywhere on page — `NAV-00-TY` hides Request Info; no `FORM-05`
- [ ] "Start Application" links to admission portal with session/token context
- [ ] GA4 `generate_lead` event already fired on previous page (not re-fired on thank-you)
- [ ] Expired/invalid tokens → base variant (not 404 or error page)

### 15.6 Cross-cutting

- [ ] Caching strategy verified: anonymous paid/organic pages cacheable; personalized thank-you bypasses shared cache
- [ ] GA4 `generate_lead` fires with `variant_id` on submission success
- [ ] Lead definition reconciles to program report (LFS leads, not aggregate conversions)
- [ ] `prefers-reduced-motion` respected on all animated modules
- [ ] WCAG 2.1 AA compliance on landmark roles, accordion ARIA, modal focus trap, contrast
- [ ] Security checklist (§13) signed off

---

## 16. Recommended build phases

### Phase 1 — Foundation

**Duration estimate:** 2–3 sprints

- [ ] Create content types: `paid_landing_page`, `organic_page`, `blog_article`, `thank_you_page`
- [ ] Create paragraph types for all shared paid modules (§4.1)
- [ ] Integrate `drupal-theme.css` into theme; verify custom properties load
- [ ] Implement theme regions: `NAV-01`, `NAV-00`, `FOOT-01`
- [ ] Scope classes (`.paid-landing`, `.organic-page`, etc.) on node templates

### Phase 2 — Paid landing (v1)

**Duration estimate:** 3–4 sprints

- [ ] Wire RFI pipeline: mini (FORM-01) + full (FORM-02) + sticky bar (FORM-05) → live Lead API
- [ ] Connect program data source for `PROG-01` (mobile show-all + native select)
- [ ] Connect start-date source for `START-01` (compute `daysLeft` at render)
- [ ] Assemble three paid template nodes from section order tables
- [ ] `NAV-UX-01` section nav with scroll-spy
- [ ] `FIN-01` / `SKEPT-01` disclosure panels with `prefers-reduced-motion`
- [ ] `FAQ-01` accordion ARIA patterns
- [ ] Mobile-first QA against acceptance checklists
- [ ] Staging URLs for stakeholder sign-off

### Phase 3 — Organic core (v1.5)

**Duration estimate:** 2–3 sprints

- [ ] `organic_page` content type live with `NAV-00` / organic `FOOT-01` regions
- [ ] Implement organic paragraphs: HERO-V2, HERO-ORG, IMPACT, WHY-CHOOSE, video TRUST-01, PERSONA-PATHS, ACCR-01
- [ ] Shared `PROG-01` on homepage and hub (same program data as paid)
- [ ] `COST-EST` on homepage; `TUITION-BAND` + `WAYS-TO-SAVE` on hub
- [ ] Closing `FORM-02` + `FORM-05` on homepage and hub (no hero RFI)
- [ ] `SiteHeader` Military / Partnerships dropdowns functional

### Phase 4 — Blog + thank-you (v2)

**Duration estimate:** 2–3 sprints

- [ ] `blog_article` content type with author, dates, reading time, categories, related articles
- [ ] Blog modules: BLOG-HERO, BLOG-BODY, BLOG-TOC, BLOG-SIDEBAR, BLOG-NEWSLETTER, BLOG-CTA, BLOG-PROGRESS, BLOG-SHARE
- [ ] Thank-you: TY-HERO, TY-RECEIPT, TY-NEXT, TY-CONTACT, TY-CALC
- [ ] Thank-you personalization: server-side resolution from sid/token → lead data
- [ ] `START-01` populated on thank-you (fix live empty widget)
- [ ] Post-submit redirect passes personalization params correctly
- [ ] Newsletter endpoint wired to ESP

### Phase 5 — Test & learn (v2.5)

**Duration estimate:** 1–2 sprints

- [ ] A/B `variant_id` cookie assignment on `/success/request-info-v5`
- [ ] Cookie value propagates to RFI hidden field + Lead API payload
- [ ] GA4 `generate_lead` includes `variant_id`
- [ ] Staging validation of full A/B flow before production split
- [ ] Admin UI for variant weight configuration and test conclusion

---

## 17. Open decisions

These items **must be resolved before or during sprint planning**. Backend-owned items in **bold**.

| # | Decision item | Owner | Blocking phase | Notes |
|---|---------------|-------|----------------|-------|
| 1 | Confirm existing paragraph type machine names vs. catalog (§4) | Drupal team | Phase 1 | May already exist in production — avoid duplicates |
| 2 | **Live RFI webform / form plugin ID + full Lead API payload schema** | Drupal team / CRM | Phase 2 | Critical path — blocks all form work |
| 3 | **Program data source for PROG-01** (taxonomy, JSON API, or Views) | Drupal team | Phase 2 | Same feed for paid + organic + hub |
| 4 | **Start-date computation source** (CMS field, academic calendar API, or manual entry) | Drupal team | Phase 2 | Compute `daysLeft` server-side |
| 5 | Chat widget vendor name + JS trigger method for CTA-01 | Drupal team | Phase 2 | Reuse existing embed |
| 6 | **A/B variant mechanism** (cookie name, assignment logic, admin UI) | Dev / Analytics | Phase 5 | Server-side cookie; not GTM-only |
| 7 | Lightcast embed codes mapping if CAREER-01 uses widget vs. static rows | Dev / Content | Phase 2 | See `data/lightcast-embed-codes.csv` |
| 8 | Blog content type: fields, editorial workflow, related-article sourcing strategy | Content / Drupal | Phase 4 | Entity ref vs. Views? Automated or manual curation? |
| 9 | Video hosting / embed URLs for organic TRUST-01 (YouTube IDs or self-hosted) | Content / Media | Phase 3 | CDN thumbnails from `uagc.edu` |
| 10 | **Thank-you personalization redirect contract** (sid/token shape, signed?, TTL) | Dev / CRM | Phase 4 | See §7 for expected contract |
| 11 | **Hub program feed for HUB-POPULAR** quick links + PROG-01 filters | Drupal team | Phase 3 | Subset of D1 or separate curated list? |
| 12 | **Newsletter signup endpoint** (ESP name, API key location, payload format) | Marketing / Dev | Phase 4 | Webform → ESP or direct? |
| 13 | SiteHeader nav items — confirm GA4/GSC data priority for utility label order | SEO / Content | Phase 3 | Utility nav: Military / Partnerships placement |
| 14 | **Canonical tuition rates** — single source of truth for all rate-consuming modules | Finance / Drupal | Phase 2 | Must feed FIN-01, COST-EST, TY-CALC, hero pills |

---

## Appendix A: Per-template section order (quick reference)

### A.1 `request-info-v5` (~16 modules, ~12–13 mobile screens)

| # | Module | Paragraph type | Notes |
|---|--------|----------------|-------|
| — | NAV-01 | theme region | Reduced header |
| — | NAV-UX-01 | `landing_section_nav` | 8 pills |
| 1 | HERO-01 + FORM-01 | `landing_hero_rfi` | "Earn Your Degree 100% Online at UAGC" |
| 2 | START-01 | `landing_start_dates` | Next 2 dates |
| 3 | TRUST-02 | `landing_trust_strip` | Banner variant |
| 4 | VP-01 | `landing_value_props` | Card 1 = Generous Transfer Policy |
| 5 | BRIDGE-01 | `landing_section_bridge` | Light → programs |
| 6 | PROG-01 | `landing_program_explorer` | compact=true |
| 7 | BRIDGE-01 | `landing_section_bridge` | Dark → careers |
| 8 | CAREER-01 | `landing_career_outcomes` | Table + Handshake |
| 9 | SALARY-01 | `landing_salary_growth` | BLS source inline |
| 10 | FIN-01 | `landing_tuition_aid` | On-page disclosures |
| 11 | CRED-01 | `landing_employer_cred` | bg #fdf8ef |
| 12 | TRUST-01 | `landing_testimonial` | 3-card grid |
| 13 | EMOT-01 | `landing_emotional` | Navy band |
| 14 | FORM-02 | `landing_rfi_section` | Full RFI |
| 15 | FAQ-01 | `landing_faq` | 4 categories |
| 16 | CTA-01 | `landing_bottom_cta` | 4 paths |
| — | FOOT-01 | theme region | Paid footer |
| — | FORM-05 | theme attach | Mobile sticky |

### A.2 `degree-programs-v7` (~16 modules, ~12–13 mobile screens)

Same stack as v5 with overrides:
- **HERO-01:** Headline "Find the Right Degree for Your Career"; highlights: WSCUC, 50+ Programs, $0 Apply; hero image Page_6
- **VP-01:** Proof-forward subhead; transfer/2+2 card copy
- **PROG-01:** `compact=false` (full explorer — centerpiece)

### A.3 `online-college-courses-v5` (~10 modules, ~8–9 mobile screens, lean)

| # | Module | Paragraph type | Notes |
|---|--------|----------------|-------|
| — | NAV-01 | theme region | Shared |
| — | NAV-UX-01 | `landing_section_nav` | 6 pills only |
| 1 | HERO-01 + FORM-01 | `landing_hero_rfi` | OCC hero image; trial-forward copy |
| 2 | START-01 | `landing_start_dates` | Shared |
| 3 | TRUST-02 | `landing_trust_strip` | Shared |
| 4 | VP-01 | `landing_value_props` | Card 2 = Try Your First Course Free |
| 5 | SKEPT-01 | `landing_skepticism_buster` | **OCC exclusive** |
| 6 | FIN-01 | `landing_tuition_aid` | Same as v5 |
| 7 | TRUST-01 | `landing_testimonial` | 3-card grid (different personas) |
| 8 | FORM-02 | `landing_rfi_section` | Closing RFI |
| 9 | FAQ-01 | `landing_faq` | Course-format FAQ set |
| 10 | CTA-01 | `landing_bottom_cta` | Shared |
| — | FOOT-01 | theme region | Shared |
| — | FORM-05 | theme attach | Shared |

**Omitted (do not add):** PROG-01, CAREER-01, SALARY-01, CRED-01, BRIDGE-01, EMOT-01

### A.4 `organic-homepage` (~14 modules)

| # | Module | Paragraph type | Notes |
|---|--------|----------------|-------|
| — | NAV-00 | theme region | Full header |
| 1 | HERO-V2 | `organic_hero_v2` | "Finish Your Degree / On Your Schedule" — no in-hero RFI |
| 2 | IMPACT | `organic_impact_strip` | 5-stat flat band |
| 3 | WHY-CHOOSE | `organic_why_choose` | 2-col photo + stats |
| 4 | TRUST-01 | `organic_video_testimonial` | Video thumbnails + modal |
| 5 | PERSONA-PATHS | `organic_persona_paths` | Tabs: Online Degrees / Admission / Financial Aid |
| 6 | ACCR-01 | `organic_accreditation` | UA horizontal logo band |
| 7 | PROG-01 | `landing_program_explorer` | compact=false; CTA → #rfi |
| 8 | COST-EST | `organic_cost_estimator` | Two-column estimator |
| 9 | INTEREST-GRID | `organic_interest_grid` | Navy discovery cards |
| 10 | FORM-02 | `landing_rfi_section` | Navy full-width closing band |
| 11 | FAQ-01 | `landing_faq` | Accordion |
| — | FOOT-01 | theme region | Organic SiteFooter |
| — | FORM-05 | theme attach | Sticky bar targets #rfi |

### A.5 `online-degrees-hub` (~16 modules, discovery-first)

| # | Module | Paragraph type | Notes |
|---|--------|----------------|-------|
| — | NAV-00 | theme region | Header Request Info → #rfi |
| 1 | HERO-ORG | `organic_hero` | Trust pills only; no embedded RFI |
| 2 | HUB-POPULAR | `organic_popular_programs` | Top 3 quick links |
| 3 | PERSONA-PATHS | `organic_persona_paths` | show=tabs |
| 4 | PROG-01 | `landing_program_explorer` | Searchable catalog |
| 5 | TUITION-BAND | `organic_tuition_band` | Highlight band |
| 6 | WAYS-TO-SAVE | `organic_ways_to_save` | Expandable cards |
| 7 | AREAS | `organic_areas_of_study` | Category browse grid |
| 8 | TRUST-01 | `organic_video_testimonial` | Hub-specific videos |
| 9 | CAREER-01 | `landing_career_outcomes` | Hub-lite outcomes |
| 10 | HUB-JOURNEY | `organic_journey` | Enrollment steps |
| 11 | CTA-01 | `landing_bottom_cta` | Multi-path |
| 12 | ACCR-01 | `organic_accreditation` | WSCUC/UA band |
| 13 | FORM-02 | `landing_rfi_section` | Only mid-page RFI |
| 14 | FAQ-01 | `landing_faq` | Hub FAQ set |
| — | FOOT-01 | theme region | Organic footer |
| — | FORM-05 | theme attach | Mobile sticky |

### A.6 `blog-article` (~10 modules, editorial)

| # | Module | Paragraph type | Notes |
|---|--------|----------------|-------|
| — | BLOG-PROGRESS | theme attach | Reading progress bar |
| — | NAV-00 | theme region | Full header |
| 1 | BLOG-HERO | `blog_hero` | Category eyebrow; featured image |
| 2 | BLOG-TOC | `blog_toc` (computed) | Scroll-spy active heading |
| 3 | BLOG-BODY | node field | WYSIWYG + inline newsletter |
| 4 | BLOG-SIDEBAR | `blog_sidebar` (region) | Sticky: programs, related articles, mini-CTA |
| 5 | BLOG-SHARE | `blog_share` | Floating desktop / toolbar mobile |
| 6 | BLOG-CTA | `blog_admission_cta` | Full-width closing band |
| — | FOOT-01 | theme region | Organic footer |
| — | FORM-05 | theme attach | Sticky RFI — no hero form |

### A.7 `request-information-thank-you` (~6 modules, post-conversion)

| # | Module | Paragraph type | Notes |
|---|--------|----------------|-------|
| — | NAV-00-TY | theme region | Hide Request Info |
| 1 | TY-HERO | `thankyou_hero` | "Congratulations {firstName}," |
| 2 | TY-RECEIPT | `thankyou_receipt` | Confirmation ID, masked email |
| 3 | START-01 | `landing_start_dates` | Populated next date |
| 4 | TY-NEXT | `thankyou_next_steps` | 3-step cards |
| 5 | TY-CONTACT | `thankyou_contact` | Phone + chat + hours |
| 6 | TRUST-01 | `organic_video_testimonial` | Optional program-matched |
| — | FOOT-01 | theme region | Organic footer |

**No RFI anywhere:** No FORM-01, FORM-02, FORM-05 on this template.

---

## Appendix B: Cross-template module usage matrix

| Module | v5 | v7 | OCC | Homepage | Hub | Blog | Thank-you |
|--------|----|----|-----|----------|-----|------|-----------|
| NAV-01 | ✓ | ✓ | ✓ | — | — | — | — |
| NAV-00 | — | — | — | ✓ | ✓ | ✓ | — |
| NAV-00-TY | — | — | — | — | — | — | ✓ |
| NAV-UX-01 | ✓ | ✓ | ✓ | — | — | — | — |
| HERO-01 + FORM-01 | ✓ | ✓ | ✓ | — | — | — | — |
| HERO-V2 | — | — | — | ✓ | — | — | — |
| HERO-ORG | — | — | — | — | ✓ | — | — |
| TY-HERO | — | — | — | — | — | — | ✓ |
| START-01 | ✓ | ✓ | ✓ | — | — | — | ✓ |
| TRUST-02 | ✓ | ✓ | ✓ | — | — | — | — |
| VP-01 | ✓ | ✓ | ✓ | — | — | — | — |
| WHY-CHOOSE | — | — | — | ✓ | — | — | — |
| BRIDGE-01 | ✓ | ✓ | — | — | — | — | — |
| PROG-01 | ✓ | ✓ | — | ✓ | ✓ | — | — |
| SKEPT-01 | — | — | ✓ | — | — | — | — |
| CAREER-01 | ✓ | ✓ | — | — | ✓ | — | — |
| SALARY-01 | ✓ | ✓ | — | — | — | — | — |
| FIN-01 | ✓ | ✓ | ✓ | — | — | — | — |
| CRED-01 | ✓ | ✓ | — | — | — | — | — |
| TRUST-01 | ✓ | ✓ | ✓ | ✓ | ✓ | — | ✓ |
| EMOT-01 | ✓ | ✓ | — | — | — | — | — |
| FORM-02 | ✓ | ✓ | ✓ | ✓ | ✓ | — | — |
| FAQ-01 | ✓ | ✓ | ✓ | ✓ | ✓ | — | — |
| CTA-01 | ✓ | ✓ | ✓ | — | ✓ | — | — |
| FORM-05 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | — |
| FOOT-01 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| IMPACT | — | — | — | ✓ | — | — | — |
| PERSONA-PATHS | — | — | — | ✓ | ✓ | — | — |
| ACCR-01 | — | — | — | ✓ | ✓ | — | — |
| HUB-POPULAR | — | — | — | — | ✓ | — | — |
| TUITION-BAND | — | — | — | — | ✓ | — | — |
| WAYS-TO-SAVE | — | — | — | — | ✓ | — | — |
| AREAS | — | — | — | — | ✓ | — | — |
| COST-EST | — | — | — | ✓ | — | — | — |
| INTEREST-GRID | — | — | — | ✓ | — | — | — |
| HUB-JOURNEY | — | — | — | — | ✓ | — | — |
| TY-RECEIPT | — | — | — | — | — | — | ✓ |
| TY-NEXT | — | — | — | — | — | — | ✓ |
| TY-CONTACT | — | — | — | — | — | — | ✓ |
| TY-CALC | — | — | — | — | — | — | ✓ |

---

## Appendix C: Glossary

| Term | Definition |
|------|------------|
| **RFI** | Request for Information — the lead capture form |
| **Lead API** | Existing backend service that processes RFI submissions and routes to CRM |
| **LFS / LSF Leads** | Deduplicated program leads (Lead Funnel System) — not raw GA4 conversions |
| **TCPA** | Telephone Consumer Protection Act — consent checkbox wording is legally binding |
| **sid** | Session/submission ID passed on thank-you redirect for personalization |
| **WSCUC** | WASC Senior College and University Commission — UAGC's regional accreditor |
| **ESP** | Email Service Provider (Mailchimp, HubSpot, etc.) for newsletter |
| **OCC** | Online College Courses — the lean paid landing template |
| **CPL** | Cost Per Lead — must use matched conversion-action data, not aggregate conversions |
| **CWV** | Core Web Vitals (LCP, FID/INP, CLS) |
| **Paragraph** | Drupal entity type used as reusable content blocks within a page |
| **Module / Catalog ID** | Internal identifier (e.g., `PROG-01`) for a specific UI component in the design system |

---

## Appendix D: Reference links

| Resource | Location |
|----------|----------|
| Interactive prototype (not production code) | `prototypes/` directory in this repo |
| Live preview (GitHub Pages) | https://omac049.github.io/brainstorming-weblayout/ |
| Live site | https://www.uagc.edu |
| Paid landing (v5) | https://www.uagc.edu/success/request-info-v5 |
| Paid landing (v7) | https://www.uagc.edu/success/degree-programs-v7 |
| Paid landing (OCC) | https://www.uagc.edu/success/online-college-courses-v5 |
| Thank-you (base) | https://www.uagc.edu/request-information/thank-you |
| Lightcast embed codes | `data/lightcast-embed-codes.csv` |
| Design tokens | `design-system/MASTER.md` |
| Drupal CSS | `design-system/drupal-theme.css` |
| Figma wireframes | https://www.figma.com/design/HoSMZOSnKSVgUXlskHv9tS |

---

**Document owner:** Project Groundwork team  
**Last updated:** 2026-07-24  
**Next review:** Before sprint planning for each build phase
