# Figma Build Guide — online-degrees-hub Componentry

> **Primary Figma file:** [UAGC Paid page templates 3 — Wireframe](https://www.figma.com/design/HoSMZOSnKSVgUXlskHv9tS/UAGC-Paid-page-templates-3--%E2%80%94-Wireframe?node-id=0-1) (`fileKey: HoSMZOSnKSVgUXlskHv9tS`) · [`FIGMA-FILES.md`](../FIGMA-FILES.md)  
> **Tokens (repo):** [`MASTER.md`](../MASTER.md)  
> **Componentry page:** `online-degrees-hub — Componentry` *(create — organic section, separate from paid v5/v7/OCC)*  
> **Skill (componentry rebuilds):** [`.cursor/skills/figma-landing-componentry/SKILL.md`](../../.cursor/skills/figma-landing-componentry/SKILL.md)

---

## File architecture

| Page | Purpose |
|------|---------|
| `online-degrees-hub — Wireframes` | Full-page desktop **1440** + mobile **375** prototype targets |
| `online-degrees-hub — Componentry` | **00 Cover & Index** + **01 Desktop Module Catalog** + **02 Mobile Module Catalog** + **03 Organic Components Library** |

Organic pages live in the **same Figma file** as paid templates but on **dedicated pages** — do not overwrite `request-info-v5 - Componentry` or v7/OCC catalogs.

---

## Why this page exists

`/online-degrees/` is the **organic gold standard** (88.8% engagement). Componentry documents the **redesigned hub stack** for stakeholder sign-off: discovery-first layout, consolidated RFI, and mobile-safe catalog filters.

Dev handoff: [online-degrees-hub.md](../pages/online-degrees-hub.md). **Spec sidebar + handoff doc win on conflicts** — not raw live capture pixels.

**Live baseline captures:**

- Hub: `organic-02-online-degrees_{desktop-1440,mobile-375}.png`
- Reference program (for Top 3 card target): `organic-11-program-business-administration_*.png`

---

## Componentry page structure

```
┌─ 00 — Cover & Index ───────────────────────────────┐
│  Title: Online Degrees Hub (Organic)             │
│  Live URL, prototype route, link to hub.md         │
│  Module index (11 substantive + chrome)            │
│  Before/after callouts (RFI consolidation)        │
└────────────────────────────────────────────────────┘
┌─ 01 — Desktop Module Catalog (1440) ─────────────┐
│  Module / {ID} — {Name}  + 320px spec sidebar    │
│  Full module height — no 480px clip              │
└────────────────────────────────────────────────────┘
┌─ 02 — Mobile Module Catalog (375) ───────────────┐
│  Priority: HERO-ORG, RFI-HERO, HUB-CATALOG,      │
│  HUB-FINDER, FORM-05 sticky overlay              │
└────────────────────────────────────────────────────┘
┌─ 03 — Organic Components Library ────────────────┐
│  Organic / {ID} — promoted Components (3-col)    │
│  Library previews 448px wide inner — editable    │
│  clones, not flattened PNG imports               │
└────────────────────────────────────────────────────┘
```

---

## Module inventory (11 desktop + FORM-05 mobile)

| # | Catalog ID | Component name | Notes |
|---|------------|----------------|-------|
| 1 | NAV-00 | Site Header (full) | **New** — not paid NAV-01 |
| 2 | HERO-ORG | Organic Hero | Breadcrumb; no embedded RFI |
| 3 | RFI-HERO | RFI band below hero | Reuse paid RFI mini atoms |
| 4 | HUB-INTRO | Hub intro copy | Single column prose |
| 5 | HUB-TOP3 | Top 3 degrees | 3-card row |
| 6 | HUB-CATALOG | Program catalog | Native selects + 6-up list |
| 7 | HUB-FINDER | Degree finder CTA | Navy band |
| 8 | TRUST-01 | Peer Testimonials (3-card grid) | Reuse TRUST-01 card grid pattern |
| 9 | HUB-JOURNEY | Start your journey | 3-step cards |
| 10 | FAQ-01 | Hub FAQ | 2 primary accordions |
| 11 | ACCR-01 | Accreditation | WSCUC + UA |
| 12 | CTA-01 | Bottom multi-path | Reuse paid CTA pattern |
| 13 | FOOT-01 | Site footer | Full footer |
| — | NAV-UX-01 | — | **Omitted** on hub (no section pills v1) |
| — | FORM-05 | Sticky RFI | Mobile catalog overlay only |

**Not on hub v1:** `FORM-02` mid-page RFI, `PROG-01` paid explorer, `VP-01` (value props live in intro + journey), paid `NAV-UX-01`.

---

## Module card template

Same v4 pattern as paid componentry: **1440px** card = **1080px preview** + **320px spec sidebar** + gutter.

**Frame name:** `Module / {ID} — {Name}`

**Main component name:** `Organic / {ID} · {ShortName}`

Set **component description:** `Catalog: {ID} · Handoff: design-system/pages/online-degrees-hub.md`

### Spec sidebar fields

- React component + path
- Background token
- Anchor id
- **Reuse note** (if shared with paid: link to request-info-v5.md section)
- **DO / DON'T** (e.g. HUB-CATALOG: no nested scroll, no per-row RFI)

---

## Key modules — build notes

### NAV-00

- Show mega-menu parent items: Online Degrees, Admission, Tuition & Aid, Student Experience, About UAGC
- Utility row: phone, Chat, Search, **Request Info**, **Apply Now**
- Mobile: drawer mock sufficient for sign-off

### HERO-ORG + RFI-HERO

- **Separate frames** in catalog — stakeholders should see RFI as its own band (live pattern, refined)
- Hero preview: headline “Online Degrees”, eyebrow, breadcrumb Home › Online Degrees

### HUB-CATALOG

- Show filter row with **three dropdowns** (not pill strip)
- Show **6 program rows** + **Show all programs** button
- Annotate sidebar: “Prototype removes pagination-only mobile pattern”

### HUB-TOP3

- Card 1 must link visually to BA Business Administration (Milestone R2 program template)

### FORM-05 (mobile only)

- Sticky bottom bar; note “hidden on hero RFI viewport”

---

## Naming conventions

| Object | Pattern | Example |
|--------|---------|---------|
| Wireframes page | `online-degrees-hub — Wireframes` | |
| Componentry page | `online-degrees-hub — Componentry` | |
| Wireframe desktop | `online-degrees-hub · Desktop 1440` | |
| Wireframe mobile | `online-degrees-hub · Mobile 375` | |
| Module card | `Module / {ID} — {Name}` | `Module / HUB-CATALOG — Program Catalog` |
| Main component | `Organic / {ID} · {ShortName}` | `Organic / HUB-CATALOG · ProgramCatalog` |

---

## Reuse from paid componentry

| Organic module | Paid source |
|----------------|-------------|
| RFI-HERO | `Landing / FORM-01` mini + RFI atoms from v5 library |
| TRUST-01 | `Landing / TRUST-01` 3-card grid with persona tags |
| FAQ-01 | `Landing / FAQ-01` |
| CTA-01 | `Landing / CTA-01` |
| FOOT-01 | `Landing / FOOT-01` |
| FORM-05 | Mobile sticky from v5 mobile catalog |

Clone and relabel — do not instance paid components with wrong organic IDs in the library.

---

## Handoff checklist (design QA)

- [ ] Pages `online-degrees-hub — Wireframes` and `online-degrees-hub — Componentry` created
- [ ] **11** desktop catalog cards at full height (1440-wide cards)
- [ ] Mobile catalog covers HUB-CATALOG, RFI-HERO, FORM-05
- [ ] **03** library uses editable clones scaled to 448px — not PNG imports
- [ ] Cover page documents **RFI consolidation** vs live (before/after thumbnail from organic-02 capture)
- [ ] Top 3 card 1 points to business-administration program URL in spec sidebar
- [ ] Re-capture wireframes after prototype UX changes; refresh catalog + library clones

---

## Related files

| Asset | Path |
|-------|------|
| Dev handoff | `design-system/pages/online-degrees-hub.md` |
| Module manifest | `design-system/componentry/online-degrees-hub-modules.json` |
| Prototype route (planned) | `~/uagc-prototypes/src/app/organic/online-degrees/page.tsx` |
| Live hub capture | `output/playwright/screenshots/organic-02-online-degrees_*.png` |
| Program reference capture | `output/playwright/screenshots/organic-11-program-business-administration_*.png` |
| Paid componentry reference | `design-system/componentry/request-info-v5-figma-build-guide.md` |
| Figma componentry skill | `.cursor/skills/figma-landing-componentry/SKILL.md` |
