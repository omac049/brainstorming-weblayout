# UAGC Paid & Organic Landing Page Prototypes

Interactive reference implementations for the Phase 2 landing page redesign. **These are not production code** — the production target is Drupal. Use these prototypes to inspect layout, component structure, responsive behavior, and design tokens.

## Live Preview

**https://omac049.github.io/brainstorming-weblayout/**

Auto-deploys on push to `main`.

## Run Locally

```bash
npm install
npm run dev
```

Or with Docker:

```bash
docker compose up app --build
```

## Pages

| Route | Template | Description |
|-------|----------|-------------|
| `/request-info-v5` | Paid | Full ~16 module stack with hero RFI |
| `/degree-programs-v7` | Paid | Full stack with ProgramExplorer |
| `/online-college-courses-v5` | Paid | Lean ~10 module OCC variant |
| `/organic/homepage` | Organic | Empathy-first arc, no mid-page RFI |
| `/organic/online-degrees` | Organic | Discovery hub, navigational-first |
| `/organic/request-information/thank-you` | Organic | Post-submission confirmation |

## Key Files for Drupal Implementation

| File | Purpose |
|------|---------|
| `src/app/globals.css` | CSS custom properties, typography scale, animations — copy directly |
| `src/components/sections/` | Section-level components (one per catalog module) |
| `src/components/shared/` | Header, Footer, RFI Form, SectionNav |
| `src/lib/` | Data structures and program catalog |
| `../design-system/DRUPAL-HANDOFF.md` | Module → Twig template mapping |
| `../design-system/MASTER.md` | Token reference (colors, type, spacing) |
| `../design-system/componentry/*.json` | Machine-readable module manifests |

## Component → Catalog ID Mapping

| Component | Catalog ID |
|-----------|-----------|
| `HeroSection` | HERO-01 |
| `TrustStrip` | TRUST-02 |
| `ValuePropsSection` | VP-01 |
| `UpcomingStartDates` | START-01 |
| `TestimonialSection` | TRUST-01 |
| `ProgramExplorer` | PROG-01 |
| `TuitionSection` | FIN-01 |
| `CareerOutcomesSection` | CAREER-01 |
| `EmployerCredentialSection` | CRED-01 |
| `SalaryGrowthSection` | SALARY-01 |
| `FAQSection` | FAQ-01 |
| `EmotionalMotivationSection` | EMOT-01 |
| `SkepticismBusterSection` | SKEPT-01 |
| `SectionNav` | NAV-UX-01 |
| `Header` | NAV-01 |
| `Footer` | FOOT-01 |
| `RFIForm` | FORM-02 |

## Tech Stack

- Next.js 16 (App Router, React 19, TypeScript)
- Tailwind CSS v4
- Fira Sans / Fira Sans Extra Condensed (web fonts)

## Notes

- `globals.css` typography utilities (`.type-h1` through `.type-meta`) are framework-agnostic — use in Drupal directly
- CSS custom properties (`--color-uagc-navy`, `--color-uagc-gold`, etc.) map to `design-system/MASTER.md`
- Interactive behaviors (FAQ accordion, ProgramExplorer search/filter, SectionNav scroll spy, sticky bar) will need vanilla JS equivalents for Drupal
