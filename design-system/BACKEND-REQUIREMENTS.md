# Back-End Requirements — UAGC Phase 3 Implementation

**Purpose:** Single reference for the **back-end / integration work** required to ship the 7 Phase 2 templates on Drupal. This is the data, API, and platform contract that sits beneath the component and assembly specs.

**Audience:** Back-end engineers, Drupal site builders, CRM / Lead API owners, analytics/data engineering, DevOps.

**Scope boundary:**

| Concern | Authoritative doc |
|---------|-------------------|
| Field-level component specs (paragraph types, fields, Twig, JS, CSS, a11y) | [`GLOBAL-COMPONENTS.md`](./GLOBAL-COMPONENTS.md) |
| Page assembly, section order, RFI placement rules, build phases, QA | [`DRUPAL-HANDOFF.md`](./DRUPAL-HANDOFF.md) |
| Tokens / CSS | [`MASTER.md`](./MASTER.md) · [`drupal-theme.css`](./drupal-theme.css) |
| Mobile UX contract | [`MOBILE.md`](./MOBILE.md) |
| **Data, APIs, pipelines, NFRs, environments, acceptance** | **this document** |

> The Next.js prototypes are an **interactive reference only**. No prototype API routes, mock data, or client state are shippable. Every dynamic value below must be sourced from a Drupal field, a CMS-computed value, or an integration named here.

**Catalog version:** 49-module global component library · 7 templates · Last updated 2026-06-17

---

## 1. System context

```
                 ┌─────────────────────────────────────────┐
   Visitor  ───▶ │  Drupal (production target)              │
                 │  • 4 content types + theme regions        │
                 │  • Paragraph stacks per GLOBAL-COMPONENTS  │
                 │  • drupal-theme.css + per-module JS libs   │
                 └───────┬───────────────┬───────────────────┘
                         │               │
              RFI submit │               │ reads
                         ▼               ▼
            ┌────────────────────┐   ┌──────────────────────────┐
            │ Lead API / webform │   │ Data sources              │
            │ (existing pipeline)│   │ • Program catalog          │
            └─────────┬──────────┘   │ • Start-date calendar      │
                      │              │ • Video / media (CDN)      │
            redirect  │              │ • Lightcast (CAREER-01)    │
                      ▼              │ • Newsletter ESP           │
            ┌────────────────────┐  └──────────────────────────┘
            │ Thank-you page     │
            │ (personalized)     │◀── token / sid / session
            └────────────────────┘
                      │
                      ▼  events
            ┌────────────────────┐
            │ GA4 / dataLayer    │
            └────────────────────┘
```

**Guiding principles:**

1. **Reuse, don't rebuild.** The RFI submission pipeline, program data, and form handlers already exist in production. Phase 2 restyles wrappers and re-orders modules — it does not replace the Lead API.
2. **Server-render content.** Personalization, program lists, start dates, and FAQ content render server-side; JS is progressive enhancement only.
3. **One paragraph type, many templates.** Shared modules (PROG-01, FAQ-01, FORM-02, etc.) are implemented once and reused across templates (see Cross-Template Usage Matrix in `GLOBAL-COMPONENTS.md`).

---

## 2. Content types & data model

| Content type | Templates | Module field | Notes |
|--------------|-----------|--------------|-------|
| `paid_landing_page` | v5, v7, OCC | `field_landing_sections` (ERR → Paragraphs, ordered) | One node per `/success/*` URL |
| `organic_page` | homepage, hub | `field_organic_sections` (ERR → Paragraphs, ordered) | Hero variant differs (`HERO-V2` vs `HERO-ORG`) |
| `blog_article` | blog | `body` (structured) + `field_*` meta | Author, dates, reading time, categories, related |
| `thank_you_page` | ty | `field_thankyou_sections` or route template | Personalized variant via params/session — **not** one node per submission |

**Global chrome = theme regions, not paragraphs:** `NAV-01` (paid reduced header), `NAV-00` (organic full header), `NAV-00-TY` (thank-you header, hides Request Info), `FOOT-01` (paid + organic footer variants), `FORM-05` (sticky bar — theme library attach).

Paragraph machine names, field keys, and types are authoritative in [`GLOBAL-COMPONENTS.md`](./GLOBAL-COMPONENTS.md). **Action:** confirm existing production paragraph names vs. catalog before sprint planning (Open item #1).

---

## 3. Data sources & integrations

Each dynamic module needs a confirmed source. Status column tracks whether the source exists and is accessible.

| # | Consumer module(s) | Data needed | Recommended source | Status / owner |
|---|--------------------|-------------|--------------------|----------------|
| D1 | `PROG-01`, `HUB-POPULAR`, blog program filter | Program catalog (name, area, degree level, URL, ~50+ programs) | Existing program API / taxonomy feeding live program pages | **Confirm** — Drupal team |
| D2 | `START-01` | Next start dates + `daysLeft` computed at render | CMS field or academic-calendar API | **Confirm** — Drupal team |
| D3 | `TRUST-01` (organic) | Video testimonial embeds (YouTube ID or oEmbed) + thumbnails | Media entities / `uagc.edu` CDN | **Confirm** — Content / Media |
| D4 | `CAREER-01` | Salary / outcomes by program | Static comparison rows or Lightcast embed | See `data/lightcast-embed-codes.csv` |
| D5 | `BLOG-SIDEBAR` | Related articles (title, category, date, image, URL) | Entity reference or Views block | **Confirm** — Content / Drupal |
| D6 | `BLOG-NEWSLETTER` | Newsletter signup endpoint | Webform → ESP, or direct ESP API | **Confirm** — Marketing / Dev |
| D7 | `CTA-01`, `TY-CONTACT`, `BLOG-CTA` | Chat widget trigger | Existing live-chat vendor embed | **Confirm** — Drupal team |
| D8 | `COST-EST`, `TY-CALC` | Tuition rates, credit counts, academic-calendar weeks | CMS config or constants | Values in prototype + page specs; **confirm canonical rates** |
| D9 | `FAQ-01`, `SKEPT-01`, `FIN-01`, `WAYS-TO-SAVE` | FAQ / disclosure content | Editorial paragraph fields | Content-managed; no external dependency |

### 3.1 Program data contract (D1)

Minimum shape consumed by `PROG-01` (per `GLOBAL-COMPONENTS.md`):

| Field | Type | Used for |
|-------|------|----------|
| `program_name` | string | Row title |
| `area` | string/enum | Native `<select>` filter (Business, Education, IT, Health Care, …) |
| `degree_level` | enum | Associate / Bachelor / Master / Certificate |
| `url` | string | "Learn more" → live program page (no per-program RFI) |
| `summary` | string | Expandable row detail (keep students on-page) |

Same source must feed paid `PROG-01`, hub/homepage `PROG-01`, and `HUB-POPULAR`. Copy "50+ programs" (not 200+). Do not add a transfer-policy callout in the explorer (lives in VP-01).

---

## 4. RFI submission pipeline (critical path)

All `FORM-01`, `FORM-02`, `FORM-05` instances submit to the **existing live request-information pipeline**. Do not build a new endpoint.

### 4.1 Form variants

| Catalog ID | Placement | UX | Submit |
|------------|-----------|----|--------|
| `FORM-01` | Embedded in `HERO-01` (paid only) | Two-step mini | Live hero RFI endpoint |
| `FORM-02` | Standalone mid-page / closing band | Full | Same endpoint |
| `FORM-05` | Theme attach, mobile | Sticky CTA bar | **No submit** — scrolls to `#rfi` or expands mini |

Placement rules per template are in [`DRUPAL-HANDOFF.md`](./DRUPAL-HANDOFF.md#rfi-integration-shared). Key: **organic homepage, hub, and blog have no hero RFI**; thank-you has **no RFI at all**.

### 4.2 Payload field contract

| Field key | Type | Required | Notes |
|-----------|------|----------|-------|
| `college_of_interest` | select/autocomplete | Yes | Live program routing option list (Step 1 of mini) |
| `firstname` | text | Yes | |
| `lastname` | text | Yes | |
| `email` | email | Yes | Server + client validation |
| `phone` | tel | Yes | |
| `state` | select | Yes | US states |
| `tcpa_checkbox` | checkbox | Yes | **Live consent copy verbatim** — compliance gated |
| `military_status` | select | No | If present on live form |
| `clientdegreeid` | hidden | No | Campaign pre-select |
| `variant_id` | hidden | No | **New for Phase 2 A/B** — cookie value → payload (see §7) |

### 4.3 Back-end deliverables (RFI)

- [ ] Document the **live form plugin / webform ID** per environment (Open item #2).
- [ ] Publish the **Lead API payload shape** (field names, required hidden fields, content-type, auth) so the front end maps 1:1.
- [ ] Server-side validation mirroring live rules; return inline field errors and **preserve entered values** on error.
- [ ] Success → redirect to thank-you URL with personalization params (see §5).
- [ ] Fire GA4 `generate_lead` (or existing conversion event) + `variant_id` on success (see §8).
- [ ] Confirm TCPA consent storage and timestamping (see §10).

---

## 5. Thank-you personalization

The thank-you page renders a **personalized** variant when identity is present, and a **base** variant otherwise.

| Value | Source | Consumed by | Fallback |
|-------|--------|-------------|----------|
| `firstName` | Redirect param (`sid` / `token`) or session | `TY-HERO` headline | Drop name + trailing comma: *"Congratulations — you've taken the first step."* |
| `program` / area | Lead API redirect or session | `TY-RECEIPT`, `TY-CALC` default degree, `START-01` | Generic copy; omit program recap |
| `confirmationId` | Lead API response | `TY-RECEIPT` | Hide confirmation ID line |
| masked `email` | Submission | `TY-RECEIPT` email-sent notice | Hide notice |

**Back-end deliverables:**

- [ ] Define the **redirect contract** from Lead API → thank-you (`sid` / `token` / `submissionID` shape) (Open item #10).
- [ ] Server-render personalization (no client-only token parsing for first paint).
- [ ] Populate `START-01` from program context — **fix the currently-empty live start-date widget**.
- [ ] **Collect no additional lead data** on thank-you (no RFI). `NAV-00-TY` hides Request Info; `FORM-05` absent.

---

## 6. Newsletter & chat

- **Newsletter (`BLOG-NEWSLETTER`, D6):** Wire email capture to the production ESP (webform → ESP, or direct API). Client shows success-state swap; server handles double-opt-in if required. **Endpoint TBD** (Open item #12).
- **Chat (`CTA-01` / `TY-CONTACT` / `BLOG-CTA`, D7):** Trigger the existing live-chat vendor when a `type=chat` path is clicked. No new chat infrastructure. **Confirm vendor + trigger hook** (Open item #5).

---

## 7. A/B variant infrastructure

Phase 2 validation happens on **Drupal staging / production**, not the Next.js app.

| Concern | Requirement |
|---------|-------------|
| Assignment | Cookie-based variant assignment on `/success/request-info-v5` (extendable to other paid URLs) |
| Propagation | Cookie value → `variant_id` hidden field on RFI payload (§4.2) |
| Reporting | `variant_id` included on GA4 `generate_lead` event (§8) |
| Rollout | Validate on staging before production traffic split |
| Definition | Lead counts use the matching **conversion action / LFS lead** definition — not aggregate "conversions" |

**Owner:** Dev / Analytics (Open item #6).

---

## 8. Analytics / GA4 dataLayer

Server- and client-side events the back end must support or emit:

| Event | Trigger | Required params |
|-------|---------|-----------------|
| `generate_lead` (or existing conversion) | RFI success | `variant_id` (when testing), program/area |
| `view_item` / page_view | Page load | template key, content type |
| Module interactions (optional) | PROG-01 search, COST-EST complete, FAQ open, video play | event name + module ID |

- Preserve existing GTM container behavior; add `variant_id` to the lead event without breaking current conversion tracking.
- Lead metrics must reconcile to the program report definition (BigQuery `advertising-data-mart.inquiries`, Oct 2025 – Mar 2026 window) — do not treat headline conversions ÷ spend as CPL.

---

## 9. Non-functional requirements

| Category | Requirement |
|----------|-------------|
| **Performance** | Mobile-first; LCP hero image optimized + correctly sized per breakpoint (desktop 1440 / mobile 375). No layout shift from late-loading personalization. Target Core Web Vitals "good." |
| **Caching** | Anonymous pages fully cacheable (CDN/page cache). Personalized thank-you and RFI responses must bypass shared cache or use cache contexts/tags (`url.query_args`, session). Program/start-date feeds cached with sane TTL + invalidation. |
| **Rendering** | Content server-rendered; JS progressive enhancement. Respect `prefers-reduced-motion` for counters, scroll reveals, hero entrances. |
| **Resilience** | If a data source (program feed, video, Lightcast, start dates) is unavailable, degrade gracefully — render the module with cached/fallback content or omit cleanly; never hard-fail the page. |
| **Accessibility** | Server output supports the a11y contract in `GLOBAL-COMPONENTS.md`: landmark roles, `aria-*` on accordions/tabs/sliders, focus management on modals, ≥44px touch targets, no contrast-failing faint text on navy. |
| **SEO** | Preserve canonical URLs, meta, and structured data on organic templates (homepage, hub, blog). Blog needs article schema, author, dates. |
| **Security** | See §10. |

---

## 10. Security & compliance

- [ ] **TCPA:** Use live consent copy verbatim; store consent + timestamp + page/variant context with the lead.
- [ ] **PII:** RFI fields (name, email, phone, state) handled per existing data-handling policy; no PII in client logs, GA4 params, or URLs beyond the agreed thank-you token.
- [ ] **Transport:** All form posts over HTTPS; CSRF protection on Drupal form submissions.
- [ ] **Secrets:** ESP / Lead API / chat credentials in environment config — never in theme, JS, or the prototype repo. Run a secrets/dependency scan before any push that touches APIs or env vars.
- [ ] **Input validation:** Server-side validation and sanitization on all submitted fields.

---

## 11. Environments & deployment

| Environment | Purpose |
|-------------|---------|
| Local / dev | Drupal build + paragraph implementation |
| Staging | Stakeholder sign-off, RFI submission with **production-equivalent payload**, A/B validation |
| Production | Phased rollout per `DRUPAL-HANDOFF.md` build phases |

- RFI must succeed on **staging** against a production-equivalent endpoint before launch (QA checklist, `DRUPAL-HANDOFF.md`).
- Match live Drupal styling (Fira Sans web font, tokens) — `drupal-theme.css` is the source.

---

## 12. Acceptance criteria (back-end "definition of done")

A template is back-end complete when:

- [ ] Content type + module field exist; paragraph types map to `GLOBAL-COMPONENTS.md`.
- [ ] All dynamic modules pull from a **confirmed live source** (§3), not prototype mock data.
- [ ] RFI submits to the live Lead API on staging with production-equivalent payload, including `variant_id` where applicable; success redirects with personalization params; errors preserve values.
- [ ] Thank-you renders personalized + base variants server-side; `START-01` populated.
- [ ] GA4 `generate_lead` fires with `variant_id`; lead definition reconciles to the program report.
- [ ] Caching strategy verified (anonymous cacheable; personalized bypasses shared cache).
- [ ] NFRs met (§9): CWV, a11y contract, reduced-motion, graceful degradation.
- [ ] Security/compliance checklist (§10) signed off.

---

## 13. Open decisions (must close before/at sprint planning)

Mirrors the Drupal open-items table in [`DRUPAL-HANDOFF.md`](./DRUPAL-HANDOFF.md#open-items--drupal-team); back-end-owned items in **bold**.

| # | Item | Owner | Status |
|---|------|-------|--------|
| 1 | Confirm existing paragraph type names vs catalog | Drupal team | ☐ |
| 2 | **Live RFI webform / form plugin ID + Lead API schema** | Drupal team / CRM | ☐ |
| 3 | **Program data source for PROG-01 (paid + organic)** | Drupal team | ☐ |
| 4 | **Start-date computation source for START-01** | Drupal team | ☐ |
| 5 | Chat widget vendor + trigger hook for CTA-01 | Drupal team | ☐ |
| 6 | **A/B variant mechanism (cookie + hidden field + GA4)** | Dev / Analytics | ☐ |
| 7 | Lightcast embed mapping if CAREER-01 uses widget | Dev / Content | ☐ |
| 8 | Blog content type fields, workflow, related-article sourcing | Content / Drupal | ☐ |
| 9 | Video hosting / embed URLs for organic TRUST-01 | Content / Media | ☐ |
| 10 | **Thank-you personalization data (sid/token/redirect shape)** | Dev / CRM | ☐ |
| 11 | **Hub program feed for HUB-POPULAR + PROG-01 filters** | Drupal team | ☐ |
| 12 | **Newsletter signup endpoint for BLOG-NEWSLETTER** | Marketing / Dev | ☐ |
| 13 | SiteHeader nav items — GA4/GSC priority for utility labels | SEO / Content | ☐ |
| 14 | **Canonical tuition rates / credit counts for COST-EST + TY-CALC** | Finance / Drupal | ☐ |

---

## 14. Recommended back-end phasing

Aligned to the build phases in [`DRUPAL-HANDOFF.md`](./DRUPAL-HANDOFF.md#build-phases-recommended):

1. **Foundation** — content types, module field, paragraph types, `drupal-theme.css` integration, scope classes.
2. **Paid (v1)** — RFI pipeline wired (mini + full + sticky), program + start-date sources for v5/v7/OCC, staging sign-off.
3. **Organic core (v1.5)** — `organic_page`, theme regions, shared program data on homepage/hub, COST-EST rates, closing FORM-02.
4. **Blog + thank-you (v2)** — `blog_article` model + related-articles source, newsletter endpoint, thank-you personalization + START-01 fix.
5. **Test & learn (v2.5)** — A/B variant infra, cookie assignment, staging validation before traffic split.

---

**Related:** [`GLOBAL-COMPONENTS.md`](./GLOBAL-COMPONENTS.md) · [`DRUPAL-HANDOFF.md`](./DRUPAL-HANDOFF.md) · [`MASTER.md`](./MASTER.md) · [`MOBILE.md`](./MOBILE.md) · [`FIGMA-FILES.md`](./FIGMA-FILES.md)
