# Figma Build Guide — request-info-v5 Componentry

> **Primary Figma file:** [UAGC Paid page templates 3 — Wireframe](https://www.figma.com/design/HoSMZOSnKSVgUXlskHv9tS/UAGC-Paid-page-templates-3--%E2%80%94-Wireframe?node-id=0-1) (`fileKey: HoSMZOSnKSVgUXlskHv9tS`) · [team project 598288008](https://www.figma.com/files/team/954051891409200881/project/598288008) · [`FIGMA-FILES.md`](../FIGMA-FILES.md)  
> **Tokens (repo):** [`MASTER.md`](../MASTER.md) — external Reskin Figma (`c4O4uPeilJDBZFjARNnt65`) is **not accessible** to this team  
> **Page name:** `13 · request-info-v5 / Componentry`  
> **Skill (componentry rebuilds):** [`.cursor/skills/figma-landing-componentry/SKILL.md`](../../.cursor/skills/figma-landing-componentry/SKILL.md) — load before any Figma MCP componentry work.

---

## File architecture (this file)

| Page | Purpose |
|------|---------|
| `10 · request-info-v5 / Wireframes` | Source captures from live Drupal pages |
| `11 · request-info-v5 / Desktop 1440` | Full-page desktop wireframe |
| `12 · request-info-v5 / Mobile 375` | Full-page mobile wireframe |
| `13 · request-info-v5 / Componentry` | **01 Desktop Module Catalog** + **02 Mobile Module Catalog** + **03 Landing Components Library** + **20 promoted `Landing /` components** |
| `00 · Index & Tokens` | Cover, color/spacing/radius swatches, template index |

All landing componentry lives in **`HoSMZOSnKSVgUXlskHv9tS`** only. The external Reskin file is out of scope (no access).

---

## Why this page exists

The wireframe capture gives a full-page reference; **componentry** breaks it into reusable **Landing / {ID}** modules so `degree-programs-v7` and `online-college-courses-v5` can swap instances without re-capturing.

Each module card includes:

- Catalog ID (matches Layout Score Builder)
- React component + file path
- Props / variants
- Background token
- Do/don't callouts

Dev handoff: [request-info-v5.md](../pages/request-info-v5.md). **Spec sidebar + handoff doc win on conflicts** — not raw capture pixels.

---

## Page structure (`13 · request-info-v5 / Componentry`)

```
┌─ 00 — Cover & Index ─────────────────────────────┐
│  Title, live URL, link to request-info-v5.md     │
│  Module index (20 rows)                          │
└──────────────────────────────────────────────────┘
┌─ 01 — Desktop Module Cards (1440) ───────────────┐
│  Module / {ID} — {Name}  + 320px spec sidebar    │
└──────────────────────────────────────────────────┘
┌─ 02 — Mobile Module Cards (375) ─────────────────┐
│  HERO, VP, PROG, CTA, FORM-05 variants           │
└──────────────────────────────────────────────────┘
┌─ 03 — Shared Variants ───────────────────────────┐
│  RFI mini/full/sticky · TrustStrip banner/sidebar│
└──────────────────────────────────────────────────┘
```

---

## Module card template

**Frame name:** `Module / {ID} — {Name}` · **Width:** 1440px (1080 preview + 320 sidebar + 40 gutter)

```
┌─────────────────────────────────────────────────────────────┐
│  {ID} (eyebrow)               │  SPEC SIDEBAR (320px)       │
│  {Name} (H2)                  │  React: ComponentName       │
│  ─────────────────────────    │  File: src/.../X.tsx        │
│  [ module preview @ 1080px ]  │  Props: variant=…          │
│                               │  Background: #hex          │
│                               │  Anchor: #id               │
│                               │  DO / DON'T                │
└─────────────────────────────────────────────────────────────┘
```

After validation, promote preview to **main component:** `Landing / {ID} · {ShortName}`.

---

## Source mapping (wireframe → catalog ID)

Extract from page `10 · request-info-v5 / Wireframes` (prototype capture). Known layer names:

| Catalog ID | Wireframe layer | React |
|------------|-----------------|-------|
| NAV-01 | `Header` | `Header.tsx` |
| NAV-UX-01 | `SectionNav` | `SectionNav.tsx` |
| HERO-01 + FORM-01 | `HeroSection` | `HeroSection.tsx` + `RFIForm` mini |
| START-01 | `UpcomingStartDates` | `UpcomingStartDates.tsx` |
| TRUST-02 | `TrustStrip` | `TrustStrip.tsx` |
| VP-01 | `ValuePropsSection` | `ValuePropsSection.tsx` |
| BRIDGE-01 | `NextStepBridge` | `NextStepBridge.tsx` |
| PROG-01 | `ProgramExplorer` | `ProgramExplorer.tsx` |
| CAREER-01 | `CareerOutcomesSection` | `CareerOutcomesSection.tsx` |
| SALARY-01 | `SalaryGrowthSection` | `SalaryGrowthSection.tsx` |
| FIN-01 | `TuitionSection` | `TuitionSection.tsx` |
| CRED-01 | `EmployerCredentialSection` | `EmployerCredentialSection.tsx` |
| TRUST-01 | `TestimonialSection` (3-card grid) | `TestimonialSection.tsx` |
| EMOT-01 | `EmotionalMotivationSection` | `EmotionalMotivationSection.tsx` |
| FAQ-01 | `FAQSection` | `FAQSection.tsx` |
| FOOT-01 | `Footer` | `Footer.tsx` |

**Build manually if missing in capture:** FORM-02 (mid-page RFI), CTA-01 (4-path bottom), FORM-05 (sticky bar).

---

## Library instances (atoms)

Pull from **UAGC DESIGN SYSTEM** (linked) and add **UAGC Library**:

| Atom | Library | Key / name |
|------|---------|------------|
| RFI button | UAGC DESIGN SYSTEM | `Button/RFIsolid` |
| RFI dropdown | UAGC DESIGN SYSTEM | `Form/RFI Dropdown` |
| Hero base | UAGC DESIGN SYSTEM | `Hero 2` |
| RFI vertical | UAGC Library | `RFI/vertical` |
| Icon blocks | UAGC Library | `icons_text_block` |
| Accreditation | UAGC Library | `accreditation_block` |
| Header | UAGC Library | `page_library_header` |

---

## Mobile 375

Capture or clone at **375px** width for modules that change layout:

| Module | Mobile notes |
|--------|--------------|
| HERO-01 | Image band → pills → form stack; pills ≥13px |
| VP-01 | 4 cards → single column |
| PROG-01 | Full-width search + accordion |
| CTA-01 | 1 → 2 col grid |
| FORM-05 | Sticky bottom; **hidden on hero load** |

Use `generate_figma_design` at `http://localhost:3000/request-info-v5` viewport 375 if clone resize is insufficient.

---

## Naming conventions

| Object | Pattern | Example |
|--------|---------|---------|
| Componentry page | `13 · request-info-v5 / Componentry` | |
| Module card frame | `Module / {ID} — {Name}` | `Module / VP-01 — Value Props` |
| Main component | `Landing / {ID} · {ShortName}` | `Landing / VP-01 · ValueProps` |
| Wireframe desktop | `request-info-v5 · Desktop 1440` | |
| Wireframe mobile | `request-info-v5 · Mobile 375` | |

Set **component description** to: `Catalog: {ID} · Handoff: design-system/pages/request-info-v5.md`

---

## Import / sync workflow

1. **Wireframes:** `generate_figma_design` → `existingFile` + `fileKey: HoSMZOSnKSVgUXlskHv9tS` at 1440 and 375.
2. **Normalize desktop width:** HTML captures land at **1853px**. Run a full-tree scale (`1440/1853`) on `01b` so section frames (Header, HeroSection, ScrollReveal wrappers, Footer) are **1440** wide — not 1853. Mobile `01c` should stay **375** (verify no nodes ≥500px wide).
3. **Componentry:** MCP `use_figma` — clone from normalized wireframes at `1392/1440` preview scale (full height, no 480px clip).
4. **Templates:** New pages instance `Landing /` components only — never detach.

---

## Handoff checklist (design QA)

- [x] File `HoSMZOSnKSVgUXlskHv9tS` has sections `01 Desktop`, `02 Mobile`, `03 Components Library` (**v3** full-height rebuild)
- [x] All **18** desktop catalog IDs have full-height cards (1392px-wide preview, no 480px clip)
- [x] **18** mobile module cards at native **375px** width + FORM-05 sticky overlay
- [x] **18** `Landing / {ID}` thumbnails in 3-col library grid (360px max thumb height)
- [x] FORM-02, CTA-01 captured in wireframes and cloned into componentry
- [x] NAV-UX-01 shown at native rail width with 480px preview cap + overlay note
- [x] Full-page wireframes on `01b - Desktop 1440` and `01c - Mobile 375`
- [x] Promote `Landing / {ID}` to true Figma **components** (Phase 2 promoted all 36 v5 library items)
- [ ] UAGC Library linked; RFI atoms instanced from design system

> **Phase 2 note:** All **`03 - Landing Components Library`** thumbnails are now real Components. A **UAGC Tokens** variable collection was also added to this file (9 color, 7 spacing, 12 text styles) — see [MASTER.md](../MASTER.md#design-token-variables-figma).

---

## Next templates

For `degree-programs-v7` / `online-college-courses-v5`:

1. Duplicate `13 · request-info-v5 / Componentry` page → rename route
2. Update module order per that template's `page.tsx`
3. Reuse `Landing /` components — swap props/copy only
4. Copy JSON manifest: `{route}-modules.json`
