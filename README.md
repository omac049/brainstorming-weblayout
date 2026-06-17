# Project Groundwork — UAGC Site Experience & Landing Page Redesign

Research, audit data, interactive prototypes, and design-system handoff for UAGC's paid and organic landing page redesign.

- **Phase 1** — captured live-site performance, layout gaps, RFI placement, heatmaps, and competitive benchmarks.
- **Phase 2** — delivers modular "10x improve" prototypes, a **49-module global component catalog** across **7 templates**, and Drupal handoff specs grounded in analytics + persona simulation.
- **Phase 3** — Drupal implementation (production target). Handoff docs in [`design-system/`](design-system/) are the source of truth; the Next.js app is an interactive reference, **not** shippable code.

---

## Live Prototype Preview

**https://omac049.github.io/brainstorming-weblayout/**

Auto-deploys on push to `main` via [`.github/workflows/deploy-pages.yml`](.github/workflows/). The landing index links every prototype route, deck, and audit page on any device.

---

## Repo Structure

```
brainstorming-weblayout/
├── prototypes/               # Next.js 16 interactive prototypes (deployed to GitHub Pages)
│   ├── src/app/              # Routes: 3 paid, 5 organic, + index
│   ├── src/components/       # organic/, sections/, shared/, ui/
│   └── docs/research/        # Crawled live content + fidelity audits
├── design-system/            # ★ Handoff source of truth
│   ├── GLOBAL-COMPONENTS.md  #   49-module catalog → Drupal fields, Twig, JS, CSS
│   ├── DRUPAL-HANDOFF.md     #   Assembly: content types, section order, RFI, phases
│   ├── BACKEND-REQUIREMENTS.md #  Back-end / integration requirements (APIs, data, NFRs)
│   ├── MASTER.md             #   Tokens: color, type scale, CSS custom properties
│   ├── MOBILE.md             #   Mobile UX contract (page shell, sticky bar, touch targets)
│   ├── drupal-theme.css      #   Drupal-ready CSS (tokens + utilities)
│   ├── FIGMA-FILES.md        #   Figma file keys + page map
│   ├── RESKIN-ALIGNMENT.md   #   Typography/token freshness vs Figma
│   ├── pages/                #   Per-template specs + acceptance checklists
│   ├── componentry/          #   Machine-readable module manifests (JSON) + build guides
│   └── clones/               #   Live-site clone specs (nav, hero, copy)
├── decks/                    # Presentation HTML (ELT deck, presenter notes, roadmap)
├── data/                     # Analytics, claims, persona simulations, lead-funnel
├── scripts/                  # BigQuery pulls + Figma/organic capture scripts
├── output/playwright/        # Live-site captures and audit galleries
└── docs/superpowers/         # Design specs + plans (e.g. homepage-v2 architecture)
```

---

## For Front-End / Drupal Theme Developers

**Start here:**

1. **Browse the live preview** — https://omac049.github.io/brainstorming-weblayout/
2. **Clone and run locally** for code inspection:

```bash
cd prototypes && npm install && npm run dev
```

Requires **Node ≥ 24**. Dev server uses `next dev` (binds 3002 if 3000 is occupied).

3. **Read the handoff docs in this order:**

| # | Document | What it covers |
|---|----------|---------------|
| 1 | [`design-system/GLOBAL-COMPONENTS.md`](design-system/GLOBAL-COMPONENTS.md) | **Primary spec** — 49 modules → paragraph types, editorial fields, Twig names, JS libraries, CSS hooks, a11y |
| 2 | [`design-system/DRUPAL-HANDOFF.md`](design-system/DRUPAL-HANDOFF.md) | **Assembly layer** — content types, per-template section order, RFI integration, build phases, QA checklist |
| 3 | [`design-system/BACKEND-REQUIREMENTS.md`](design-system/BACKEND-REQUIREMENTS.md) | **Integration layer** — data sources, APIs, RFI pipeline, personalization, A/B infra, analytics, NFRs |
| 4 | [`design-system/MASTER.md`](design-system/MASTER.md) | Color palette, typography scale, CSS custom properties, Tailwind config |
| 5 | [`design-system/drupal-theme.css`](design-system/drupal-theme.css) | Framework-agnostic tokens, `.type-*` utilities, layout classes, motion |
| 6 | [`design-system/MOBILE.md`](design-system/MOBILE.md) | Mobile UX contract — page shell, sticky bar rules, touch targets |
| 7 | [`design-system/pages/*.md`](design-system/pages/) | Per-page specs with section order, copy, responsive notes, acceptance checklists |
| 8 | [`design-system/componentry/*.json`](design-system/componentry/) | Machine-readable module manifests |

**Prototype routes** (`prototypes/src/app/`):

| Route | Template | Notes |
|-------|----------|-------|
| `/request-info-v5` | Paid — full ~16-module stack with hero RFI | Maps to live `/success/request-info-v5` |
| `/degree-programs-v7` | Paid — full stack with ProgramExplorer | Maps to live `/success/degree-programs-v7` |
| `/online-college-courses-v5` | Paid — lean ~10-module OCC variant | Maps to live `/success/online-college-courses-v5` |
| `/organic/homepage` | Organic — conversion-architecture homepage (primary) | Live `/` |
| `/organic/homepage-v2` | Organic — parallel conversion track | Spec in `docs/superpowers/specs/` |
| `/organic/online-degrees` | Organic — discovery hub | Live `/online-degrees/` |
| `/organic/blog/what-difference-between-phd-and-doctorate` | Organic — blog article template | Live `/blog/*` |
| `/organic/request-information/thank-you` | Organic — post-submission | Live `/request-information/thank-you` |

> The Next.js repo is the **interactive reference**, not production code. Do **not** port React state, Tailwind class strings, Next `Image`, or `"use client"` boundaries into Drupal — reimplement per `GLOBAL-COMPONENTS.md`.

**Component registry CLI** (reuse audits + Drupal mappings):

```bash
python .cursor/skills/uagc-component-manager/scripts/registry.py page v5     # ordered stack
python .cursor/skills/uagc-component-manager/scripts/registry.py drupal hub  # paragraph mappings
python .cursor/skills/uagc-component-manager/scripts/registry.py diff v5 v7  # stack parity
```

**Docker alternative:**

```bash
cd prototypes && docker compose up app --build
```

---

## For Back-End Developers

Start with **[`design-system/BACKEND-REQUIREMENTS.md`](design-system/BACKEND-REQUIREMENTS.md)** — it consolidates everything you need to scope Phase 3:

- Content types & data model
- Data sources & APIs (program data, start dates, video, related articles)
- RFI submission pipeline + Lead API payload contract
- Thank-you personalization (token/session)
- Newsletter endpoint, chat widget, A/B variant infrastructure
- Analytics / GA4 dataLayer events
- Non-functional requirements (performance, caching, security, accessibility)
- Open decisions table (the 13 items the Drupal team must confirm)

The RFI pipeline, per-template section order, and build phases are in [`DRUPAL-HANDOFF.md`](design-system/DRUPAL-HANDOFF.md). Field-level specs are in [`GLOBAL-COMPONENTS.md`](design-system/GLOBAL-COMPONENTS.md).

---

## For Stakeholders

**Presentation decks** are in [`decks/`](decks/):

| File | Purpose |
|------|---------|
| [`decks/index-v2.html`](decks/index-v2.html) | ELT executive deck (arrow-key navigation) |
| [`decks/presenter.html`](decks/presenter.html) | Synced talking points |
| [`decks/index.html`](decks/index.html) | Full audit deck (~20 slides) |
| [`decks/project-plan.html`](decks/project-plan.html) | Phase roadmap and timeline |

Open any file in a browser. Full audit narrative: [`data/audit-report.md`](data/audit-report.md)

---

## Data & Analytics

| Location | Contents |
|----------|----------|
| `data/audit-report.md` | 12-month GSC/GA4 site audit |
| `data/paid-source-data.md` · `data/paid-campaigns.csv` · `data/paid-landing-pages.csv` | Paid search definitions and CPL context |
| `data/claims-checklist.csv` · `data/data-claims-audit.md` | Deck claim verification |
| `data/simulations/` | Persona simulation outputs per prototype page |
| `data/lead-funnel/` | BigQuery lead-funnel JSON (Oct 2025 – Mar 2026) |
| `data/lightcast-embed-codes.csv` | Career-outcomes widget embeds (CAREER-01) |
| `scripts/` | Python BigQuery pulls + `.mjs` Figma/organic capture scripts |

---

## Quick Commands

```bash
# Run prototypes locally (Node >= 24)
cd prototypes && npm install && npm run dev

# Lint + typecheck + build (pre-handoff gate)
cd prototypes && npm run check

# Mobile viewport tests (Chromium + WebKit)
cd prototypes && npm run test:mobile:install && npm run test:mobile

# Refresh lead-funnel data
python scripts/pull_lead_funnel.py

# Re-capture live-site screenshots
node output/playwright/screenshot-pages.js
```
