# Project Groundwork — UAGC Site Experience & Landing Page Redesign

Research, audit data, interactive prototypes, and design-system handoff for UAGC's paid and organic landing page redesign. Phase 1 captured live-site performance and layout gaps; Phase 2 delivers modular "10x improve" prototypes and Drupal handoff specs grounded in analytics and persona simulation.

---

## Live Prototype Preview

**https://omac049.github.io/brainstorming-weblayout/**

Auto-deploys on push to `main`. Browse all 6 prototype pages (3 paid, 3 organic) on any device.

---

## Repo Structure

```
brainstorming-weblayout/
├── prototypes/               # Next.js interactive prototypes (deployed to GitHub Pages)
├── design-system/            # Tokens, page specs, Figma guides, Drupal handoff
├── decks/                    # Presentation HTML (ELT deck, presenter notes, roadmap)
├── data/                     # Analytics, claims, persona simulations, lead-funnel
├── scripts/                  # BigQuery pull scripts
└── output/playwright/        # Live-site captures and audit galleries
```

---

## For Front-End Developers

**Start here:**

1. **Browse the live preview** — https://omac049.github.io/brainstorming-weblayout/
2. **Clone and run locally** for code inspection:

```bash
cd prototypes && npm install && npm run dev
```

3. **Read the handoff docs:**

| Document | What it covers |
|----------|---------------|
| [`design-system/DRUPAL-HANDOFF.md`](design-system/DRUPAL-HANDOFF.md) | 26-module catalog → Drupal paragraph types, fields, JS |
| [`design-system/MASTER.md`](design-system/MASTER.md) | Color palette, typography scale, CSS custom properties |
| [`design-system/pages/*.md`](design-system/pages/) | Per-page specs with section order, copy, responsive notes |
| [`design-system/componentry/*.json`](design-system/componentry/) | Machine-readable module manifests |
| [`prototypes/src/app/globals.css`](prototypes/src/app/globals.css) | Framework-agnostic tokens, type utilities, animations |

**Prototype pages:**

| Route | Template |
|-------|----------|
| `/request-info-v5` | Paid — full ~16 module stack with hero RFI |
| `/degree-programs-v7` | Paid — full stack with ProgramExplorer |
| `/online-college-courses-v5` | Paid — lean ~10 module OCC variant |
| `/organic/homepage` | Organic — empathy-first arc |
| `/organic/online-degrees` | Organic — discovery hub |
| `/organic/request-information/thank-you` | Organic — post-submission |

**Docker alternative:**

```bash
cd prototypes && docker compose up app --build
```

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
| `data/paid-source-data.md` | Paid search definitions and CPL context |
| `data/claims-checklist.csv` | Deck claim verification |
| `data/simulations/` | Persona simulation outputs per prototype page |
| `data/lead-funnel/` | BigQuery lead-funnel JSON (Oct 2025 – Mar 2026) |
| `scripts/` | Python scripts to refresh BigQuery data |

---

## Quick Commands

```bash
# Run prototypes locally
cd prototypes && npm install && npm run dev

# Refresh lead-funnel data
python scripts/pull_lead_funnel.py

# Re-capture live-site screenshots
npm install && node output/playwright/screenshot-pages.js
```
