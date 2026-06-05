# Figma Build Guide — degree-programs-v7 Componentry

> **Primary Figma file:** [UAGC Paid page templates 3 — Wireframe](https://www.figma.com/design/HoSMZOSnKSVgUXlskHv9tS/UAGC-Paid-page-templates-3--%E2%80%94-Wireframe?node-id=0-1) (`fileKey: HoSMZOSnKSVgUXlskHv9tS`) · [team project 598288008](https://www.figma.com/files/team/954051891409200881/project/598288008) · [`FIGMA-FILES.md`](../FIGMA-FILES.md)  
> **Tokens (repo):** [`MASTER.md`](../MASTER.md) — external Reskin Figma (`c4O4uPeilJDBZFjARNnt65`) is **not accessible** to this team  
> **Componentry page:** `v7 - Componentry`  
> **Skill (componentry rebuilds):** [`.cursor/skills/figma-landing-componentry/SKILL.md`](../../.cursor/skills/figma-landing-componentry/SKILL.md)

---

## File architecture

| Page | Purpose |
|------|---------|
| `01 - Wireframes (source capture)` | Source captures — desktop 1440 + mobile 375 wireframes |
| `v7 - Desktop 1440` | Reserved (captures landed on wireframes page) |
| `v7 - Mobile 375` | Reserved |
| `v7 - Componentry` | **00 Cover & Index** + **01 Desktop Module Catalog** + **02 Mobile Module Catalog** + **03 Landing Components Library** |

---

## Componentry page structure (`v7 - Componentry`)

Matches **request-info-v5 - Componentry** page style exactly (all FRAMEs, same fills, spacing, and card format).

```
┌─ 00 - Cover and Index (FRAME, white, NONE, 1440×720) ┐
│  Title 32px Bold · Subtitle 14px · Index 13px SemiBold│
└───────────────────────────────────────────────────────┘
                        ↓ 160px gap
┌─ 01 - Desktop Module Catalog (FRAME, NONE, 1440) ────┐
│  Header (FRAME, VERTICAL, 1440×56)                    │
│  Desktop module stack v4 (FRAME, VERTICAL, spacing 80)│
│  └─ 19 cards (v4: title 18px + spec panel + preview)  │
│     Card: itemSpacing 16, clipsContent true            │
│     Preview: 1440 FIXED, clipsContent true             │
└───────────────────────────────────────────────────────┘
                        ↓ 160px gap
┌─ 02 - Mobile Module Catalog (FRAME, NONE, 423) ──────┐
│  Header · Mobile module stack (VERTICAL, spacing 40)  │
│  └─ 17 cards                                          │
└───────────────────────────────────────────────────────┘
                        ↓ 160px gap
┌─ 03 - Landing Components Library (FRAME, white fill) ─┐
│  Desktop Library Header (VERTICAL, 1440×~56)           │
│  Desktop components grid (HORIZONTAL WRAP, 24/24)      │
│  └─ 19 COMPONENT cards (468w, VERTICAL, padding 10)    │
└───────────────────────────────────────────────────────┘
  Mobile Library Header (1521, navy, white text, 1440×48)
  Mobile components grid (1521, HORIZONTAL WRAP, white)
  └─ 17 COMPONENT cards (212w, VERTICAL, spacing 6, pad 6)
```

---

## Source node map (desktop) — wireframes page, frame `416:2`

| # | Catalog ID | Source Node | Name | Height |
|---|-----------|-------------|------|--------|
| 1 | NAV-01 | `416:4140` | Header | 82 |
| 2 | NAV-UX-01 | `416:4149` | SectionNav | 436 |
| 3 | HERO-01 | `416:111` | HeroSection | 457 |
| 4 | START-01 | `416:6` | UpcomingStartDates | 66 |
| 5 | TRUST-02 | `416:49` | Container (TrustStrip) | 101 |
| 6 | VP-01 | `416:182` | ScrollReveal → ValueProps | 1112 |
| 7 | BRIDGE-01 | `416:87` | NextStepBridge (light) | 98 |
| 8 | PROG-01 | `416:301` | ScrollReveal → ProgramExplorer | 1229 |
| 9 | BRIDGE-01 | `416:95` | NextStepBridge (dark) | 98 |
| 10 | CAREER-01 | `416:2960` | ScrollReveal → CareerOutcomes | 1098 |
| 11 | SALARY-01 | `416:3183` | ScrollReveal → SalaryGrowth | 1280 |
| 12 | FIN-01 | `416:3390` | ScrollReveal → Tuition | 825 |
| 13 | CRED-01 | `416:3573` | ScrollReveal → EmployerCred | 971 |
| 14 | TRUST-01 | `416:3670` | ScrollReveal → Peer Testimonials (3-card grid) | 583 |
| 15 | EMOT-01 | `416:3706` | ScrollReveal → EmotionalMotivation | 536 |
| 16 | FORM-02 | `416:3755` | ScrollReveal → RFI full | 710 |
| 17 | FAQ-01 | `416:3826` | ScrollReveal → FAQ | 1509 |
| 18 | CTA-01 | `416:4021` | ScrollReveal → Bottom CTA | 539 |
| 19 | FOOT-01 | `416:4083` | Footer | 371 |

---

## Source node map (mobile) — wireframes page, frame `424:2`

| # | Catalog ID | Source Node | Name | Height |
|---|-----------|-------------|------|--------|
| 1 | HERO-01 | `424:93` | HeroSection | 679 |
| 2 | START-01 | `424:6` | UpcomingStartDates | 66 |
| 3 | TRUST-02 | `424:33` | Container (TrustStrip) | 205 |
| 4 | VP-01 | `424:162` | ScrollReveal → ValueProps | 1413 |
| 5 | BRIDGE-01 | `424:69` | NextStepBridge (light) | 82 |
| 6 | PROG-01 | `424:281` | ScrollReveal → ProgramExplorer | 2001 |
| 7 | BRIDGE-01 | `424:77` | NextStepBridge (dark) | 82 |
| 8 | CAREER-01 | `424:615` | ScrollReveal → CareerOutcomes | 1978 |
| 9 | SALARY-01 | `424:858` | ScrollReveal → SalaryGrowth | 1276 |
| 10 | FIN-01 | `424:1073` | ScrollReveal → Tuition | 1268 |
| 11 | CRED-01 | `424:1256` | ScrollReveal → EmployerCred | 1357 |
| 12 | TRUST-01 | `424:1353` | ScrollReveal → Testimonial | 631 |
| 13 | EMOT-01 | `424:1389` | ScrollReveal → EmotionalMotivation | 938 |
| 14 | FORM-02 | `424:1438` | ScrollReveal → RFI full | 756 |
| 15 | FAQ-01 | `424:1509` | ScrollReveal → FAQ | 1821 |
| 16 | CTA-01 | `424:1704` | ScrollReveal → Bottom CTA | 1021 |
| 17 | FOOT-01 | `424:1766` | Footer | 693 |

---

## Componentry node map (built cards on `v7 - Componentry`)

### 01 - Desktop Module Catalog (stack inside `773:2`)

| Catalog ID | Card Node |
|-----------|-----------|
| NAV-01 | `449:10` |
| NAV-UX-01 | `449:30` |
| HERO-01 | `447:61` |
| START-01 | `449:70` |
| TRUST-02 | `449:105` |
| VP-01 | `450:98` |
| BRIDGE-01 (light) | `450:107` |
| PROG-01 | `450:2059` |
| BRIDGE-01 (dark) | `450:2068` |
| CAREER-01 | `451:167` |
| SALARY-01 | `451:331` |
| FIN-01 | `451:482` |
| CRED-01 | `451:564` |
| TRUST-01 | `453:32` |
| EMOT-01 | `453:73` |
| FORM-02 | `453:134` |
| FAQ-01 | `453:297` |
| CTA-01 | `453:349` |
| FOOT-01 | `453:395` |

### 02 - Mobile Module Catalog (stack inside `781:3`)

| Catalog ID | Card Node |
|-----------|-----------|
| HERO-01 | `456:59` |
| START-01 | `456:84` |
| TRUST-02 | `456:117` |
| VP-01 | `456:216` |
| BRIDGE-01 (light) | `456:225` |
| PROG-01 | `456:477` |
| BRIDGE-01 (dark) | `457:8` |
| CAREER-01 | `457:195` |
| SALARY-01 | `457:367` |
| FIN-01 | `457:518` |
| CRED-01 | `457:600` |
| TRUST-01 | `457:633` |
| EMOT-01 | `458:40` |
| FORM-02 | `458:101` |
| FAQ-01 | `458:264` |
| CTA-01 | `458:316` |
| FOOT-01 | `458:362` |

### 03 - Landing Components Library (`775:2`)

19 promoted **`Landing / {ID}`** Components in a 2-column HORIZONTAL WRAP grid (itemSpacing 24, counterAxisSpacing 24), each 468px wide with **label (Inter Bold 12px) + scaled wireframe preview** (448px, clipsContent). **Mobile components grid** (`694:2`): 17 promoted Components at 212px wide, VERTICAL layout (itemSpacing 6, padding 6), label 10px — matching v5 mobile component spec.

> **Build history:**
> - **Phase 2:** Promoted 16 library frames to Components (text-only placeholders).
> - **Phase 3:** Added **NAV-01**, **NAV-UX-01**, **FORM-05** to library; built mobile grid with 17 Components.
> - **Card upgrade:** All 19 desktop catalog cards upgraded from v3 (title+preview) to v4 (title + spec panel + preview); rebuilt **NAV-UX-01** preview with pill labels, dot indicators, and annotation.
> - **Asset fix:** Rebuilt all 19 library components and all 17 mobile grid components with properly scaled wireframe preview clones.
> - **v5 parity rebuild:** Converted all page-level containers from SECTIONs to FRAMEs. Rebuilt cover (white fill, NONE layout, 1440×720). Created auto-layout desktop stack (VERTICAL, itemSpacing 80). Fixed all 19 desktop cards: itemSpacing 16, clipsContent true, title 18px HUG, preview 1440 FIXED clipsContent true. Rebuilt library with Desktop Library Header + HORIZONTAL WRAP grid (24/24 spacing, white fill). Rebuilt Mobile Library Header (navy fill, white text). Fixed mobile grid (WRAP, white fill, counterAxisSpacing 24) and all mobile components (itemSpacing 6, padding 6, label 10px). All properties verified against request-info-v5 reference.

---

## Shared modules (identical to request-info-v5)

These four modules use the same componentry from the v5 build:

| Module | Canonical spec |
|--------|---------------|
| NAV-01 — Header (reduced) | [request-info-v5.md → NAV-01](../pages/request-info-v5.md) |
| NAV-UX-01 — SectionNav | [request-info-v5.md → NAV-UX-01](../pages/request-info-v5.md) |
| START-01 — Upcoming Start Dates | [request-info-v5.md → START-01](../pages/request-info-v5.md) |
| TRUST-02 — Trust Strip (banner) | [request-info-v5.md → TRUST-02](../pages/request-info-v5.md) |

---

## Key differences from request-info-v5

| Module | v5 | v7 |
|--------|----|----|
| HERO-01 | "Discover Online School Done Right" | "Find the Right Degree for Your Career" |
| PROG-01 | `compact={true}` (mini catalog) | `compact={false}` (full, page centerpiece) |
| VP-01 | With `bulletPoints` | Without `bulletPoints` |
| TRUST-01 | 3-card grid: Working Parent, Career Changer, First-Gen | 3-card grid: Career Changer, Military Veteran, Working Professional |
| FAQ-01 | Generic FAQ | Custom 10-item FAQ targeting simulation themes |
| FORM-02 | "Take the Next Step" | "Get Program Details Tailored to Your Goals" |

---

## `03` library + mobile grid preview fix (2026-06-01)

Library cards (`468 × hug`) must show **editable** module clones in `Preview` — not flattened PNG/SVG imports (those remove live text).

**Correct pattern (matches `request-info-v5`):**

1. Clone the **inner wireframe frame** from `01 - Desktop Module Catalog` / `02 - Mobile Module Catalog` (or mobile wireframe for **FORM-05** sticky bar).
2. `clone.rescale(targetW / clone.width)` — **448px** desktop / **200px** mobile preview width; keeps **TEXT** nodes editable.
3. Name `lib-clone-{MODULE-ID}`; place in `Preview` (`layoutMode: NONE`, `clipsContent: true`); parent component `clipsContent: false`.
4. **NAV-UX-01** — scale to **~90px** wide (pill rail), not full 448px.
5. Do **not** use PNG `IMAGE` fills or `createNodeFromSvg()` for `03` thumbnails — they flatten text and break copy edits.

---

## Related files

| Asset | Path |
|-------|------|
| Page implementation | `~/uagc-prototypes/src/app/degree-programs-v7/page.tsx` |
| Dev handoff | `design-system/pages/degree-programs-v7.md` |
| Module manifest (JSON) | `design-system/componentry/degree-programs-v7-modules.json` |
| Design tokens | `design-system/MASTER.md` |
| Shared module specs | `design-system/pages/request-info-v5.md` |
| v5 componentry build guide | `design-system/componentry/request-info-v5-figma-build-guide.md` |
| Figma componentry skill | `.cursor/skills/figma-landing-componentry/SKILL.md` |
