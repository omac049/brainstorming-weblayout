# Project Groundwork — UAGC Site Experience & Landing Page Redesign

Research, audit data, interactive prototypes, and presentation decks for UAGC's site experience and paid/organic landing page redesign. Phase 1 captured live-site performance and layout gaps; Phase 2 delivers modular "10x improve" prototypes and Drupal handoff specs grounded in analytics and persona simulation.

## Repo Structure

```
brainstorming-weblayout/
├── README.md                 # This navigation guide
├── AGENTS.md                 # Agent workflow preferences
├── package.json              # Root deps for Playwright capture scripts
│
├── decks/                    # Presentation HTML (open locally or host statically)
│   ├── index.html            # Full ~20-slide deck
│   ├── index-v2.html         # ELT executive cut
│   ├── presenter.html        # Keyboard-synced presenter notes
│   └── project-plan.html     # Phase roadmap
│
├── data/                     # Analytics extracts, claims, and content inputs
│   ├── audit-report.md       # Full Phase 1 site audit narrative
│   ├── paid-source-data.md   # Paid campaign source notes
│   ├── paid-*.csv            # Landing page and campaign extracts
│   ├── claims-checklist.csv  # Deck claim verification
│   ├── data-claims-audit.md  # Claim-to-source mapping
│   ├── lead-funnel/          # BigQuery JSON extracts
│   ├── simulations/          # Persona simulation CSVs per template
│   ├── lightcast-embed-codes.csv
│   └── landing-page-brief.md
│
├── scripts/                  # BigQuery pull scripts (lead funnel, marketing mix)
├── design-system/            # Tokens, page specs, Figma guides, Drupal handoff
├── prototypes/               # Next.js interactive prototypes (GitHub Pages)
└── output/playwright/        # Live-site screenshot captures and audit galleries
```

## For FE Developers

**Start here:**

1. **`prototypes/`** — Next.js app with paid (`/success/…`) and organic (`/organic/…`) routes. Run locally:
   ```bash
   cd prototypes && npm install && npm run dev
   ```
2. **`design-system/`** — Canonical tokens (`MASTER.md`), per-page specs (`pages/`), module manifests (`componentry/`), and **`DRUPAL-HANDOFF.md`** for production mapping.
3. **`output/playwright/screenshots/`** — Full-page captures of live `uagc.edu` pages for layout comparison.

**Live preview:** [https://omac049.github.io/brainstorming-weblayout/](https://omac049.github.io/brainstorming-weblayout/) (deploys from `prototypes/` on push to `main`).

## For Stakeholders

**Presentation decks** live in **`decks/`**:

| File | Purpose |
|------|---------|
| `decks/index-v2.html` | ELT executive deck (arrow-key navigation) |
| `decks/presenter.html` | Synced talking points for v2 |
| `decks/index.html` | Full audit deck (~20 slides) |
| `decks/project-plan.html` | Phase roadmap and timeline |

Open any file in a browser locally, or browse the **live prototype preview** above for interactive layout sign-off.

**Full audit narrative:** [`data/audit-report.md`](data/audit-report.md)

## Data & Analytics

| Location | Contents |
|----------|----------|
| `data/audit-report.md` | 12-month GSC/GA4 site audit with paid vs organic findings |
| `data/paid-source-data.md` | Paid search definitions and CPL context |
| `data/claims-checklist.csv` | Verifiable claims used in decks |
| `data/simulations/` | Persona simulation outputs for prototype messaging reviews |
| `data/lead-funnel/` | BigQuery lead-funnel JSON extracts |
| `scripts/` | Python scripts to refresh lead-funnel and marketing-mix data |

**Refresh lead-funnel data:**
```bash
python scripts/pull_lead_funnel.py
```

**Re-capture live-site screenshots:**
```bash
npm install   # from repo root
node output/playwright/screenshot-pages.js
```
