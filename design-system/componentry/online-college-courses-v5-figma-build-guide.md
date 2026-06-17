# Figma Build Guide — online-college-courses-v5 Componentry

> **Primary Figma file:** [UAGC Paid page templates 3 — Wireframe](https://www.figma.com/design/HoSMZOSnKSVgUXlskHv9tS/UAGC-Paid-page-templates-3--%E2%80%94-Wireframe?node-id=0-1) (`fileKey: HoSMZOSnKSVgUXlskHv9tS`) · [team project 598288008](https://www.figma.com/files/team/954051891409200881/project/598288008) · [`FIGMA-FILES.md`](../FIGMA-FILES.md)  
> **Tokens (repo):** [`MASTER.md`](../MASTER.md) — external Reskin Figma (`c4O4uPeilJDBZFjARNnt65`) is **not accessible** to this team  
> **Componentry page:** `33 · online-college-courses-v5 / Componentry`  
> **Skill (componentry rebuilds):** [`.cursor/skills/figma-landing-componentry/SKILL.md`](../../.cursor/skills/figma-landing-componentry/SKILL.md)

---

## File architecture

| Page | Purpose |
|------|---------|
| `30 · online-college-courses-v5 / Wireframes` | Source captures — desktop 1440 + mobile 375 wireframes |
| `33 · online-college-courses-v5 / Componentry` | **00 Cover & Index** + **01 Desktop Module Catalog** + **02 Mobile Module Catalog** + **03 Landing Components Library** + promoted **SKEPT-01** component |

All landing componentry lives in **`HoSMZOSnKSVgUXlskHv9tS`** only. The external Reskin file is out of scope (no access).

---

## Why this page exists

OCC is the **leanest** paid landing prototype (~10 substantive modules, ~8–9 iPhone screens). Componentry documents the lean stack plus **`SKEPT-01`**, which exists only on this URL. Wireframe captures give full-page reference; catalog cards break modules into reusable **`Landing / {ID}`** pieces for dev handoff.

Dev handoff: [online-college-courses-v5.md](../pages/online-college-courses-v5.md). **Spec sidebar + handoff doc win on conflicts** — not raw capture pixels.

---

## Componentry page structure (`33 · online-college-courses-v5 / Componentry`)

```
┌─ 00 - Cover and Index ─────────────────────────────┐
│  Title, live URL, link to online-college-courses-v5.md │
│  Module index (13 desktop + FORM-05 mobile)         │
└────────────────────────────────────────────────────┘
┌─ 01 - Desktop Module Catalog (1440) ───────────────┐
│  Desktop module stack v4 — 13 full-height cards    │
└────────────────────────────────────────────────────┘
┌─ 02 - Mobile Module Catalog (423px) ─────────────┐
│  Mobile / {ID} cards (375 content + spec rail)   │
└────────────────────────────────────────────────────┘
┌─ 03 - Landing Components Library ────────────────┐
│  Landing / {ID} — promoted Components (3-col)    │
└────────────────────────────────────────────────────┘
┌─ Mobile components grid ─────────────────────────┐
│  Mobile Landing / {ID} variants                  │
└────────────────────────────────────────────────────┘
```

**Catalog container:** `01 - Desktop Module Catalog` (`611:2`) → inner stack `Desktop module stack v4` (`611:6`).

---

## Module inventory (13 desktop + FORM-05 mobile)

| # | Catalog ID | Desktop card (stack `611:6`) | Notes |
|---|------------|------------------------------|-------|
| 1 | NAV-01 | `612:442` | Shared chrome — [v5 spec](../pages/request-info-v5.md#nav-01--header-reduced) |
| 2 | HERO-01 | `612:451` | OCC hero copy + Page 9 hero image |
| 3 | START-01 | `612:460` | Shared chrome |
| 4 | TRUST-02 | `612:469` | Shared chrome |
| 5 | VP-01 | `612:478` | Trial-forward highlight card (Card 2) |
| 6 | **SKEPT-01** | `612:487` | **Exclusive** — `SkepticismBusterSection` |
| 7 | FIN-01 | `612:496` | On-page disclosure cards (no outbound links) |
| 8 | TRUST-01 | `613:355` | 3-card grid: Working Parent, Exploring Options, Returning to School |
| 9 | FORM-02 | `613:364` | Emotional mid-page RFI (replaces EMOT-01) |
| 10 | FAQ-01 | `613:373` | Course-format FAQ set |
| 11 | CTA-01 | `613:382` | 4-path bottom CTA |
| 12 | FOOT-01 | `613:391` | Footer |
| 13 | NAV-UX-01 | `613:400` | Shared chrome — **6 pills** on OCC (see below) |
| — | FORM-05 | Mobile catalog only | Sticky bottom RFI — hidden on hero load |

**Not on this page:** PROG-01, BRIDGE-01, CAREER-01, SALARY-01, CRED-01, EMOT-01 (proof consolidated into **SKEPT-01**).

---

## SKEPT-01 (OCC exclusive)

| Field | Value |
|-------|-------|
| React | `SkepticismBusterSection` |
| Path | `src/components/sections/SkepticismBuster.tsx` |
| Anchor | `#proof` |
| Replaces | Career, salary, credential, and emotional modules from v5/v7 |

Promoted library item: **`Landing / SKEPT-01 · SkepticismBuster`**. Only OCC has this module in catalog and **`03`** library.

---

## Shared modules (identical to request-info-v5)

These four modules use the same component code and Figma chrome as v5. Canonical specs:

| Module | Canonical spec |
|--------|---------------|
| NAV-01 — Header (reduced) | [request-info-v5.md → NAV-01](../pages/request-info-v5.md#nav-01--header-reduced) |
| NAV-UX-01 — SectionNav | [request-info-v5.md → NAV-UX-01](../pages/request-info-v5.md#nav-ux-01--section-nav) — **6 pills** on OCC |
| START-01 — Upcoming Start Dates | [request-info-v5.md → START-01](../pages/request-info-v5.md#start-01--upcoming-start-dates) |
| TRUST-02 — Trust Strip (banner) | [request-info-v5.md → TRUST-02](../pages/request-info-v5.md#trust-02--trust-strip-banner) |

**NAV-UX-01 OCC pills:** Why UAGC · Proof · Tuition · Stories · Get Started · FAQ (no Programs / Careers / Credentials).

---

## Key differences from request-info-v5 / degree-programs-v7

| Area | v5 / v7 | OCC |
|------|---------|-----|
| Page depth | ~16–19 modules, ~12–13 iPhone screens | ~10 modules, ~8–9 screens |
| Program discovery | PROG-01 (`ProgramExplorer`) | Omitted |
| Career proof | CAREER-01, SALARY-01, CRED-01, EMOT-01, BRIDGE-01 | **SKEPT-01** only |
| Hero | Degree/discovery headlines | Course-format + trial hooks |
| VP-01 Card 2 | No tests / discovery stat | **Try Your First Course Free** (3 wk) |
| Figma library | v5/v7 `03` items were FRAME thumbnails until Phase 2 | OCC has had **promoted Components** in **`03`** longest |

---

## Module card template

Same v4 pattern as request-info-v5: **1440px** card = **1080px preview** + **320px spec sidebar** + gutter. Full module height — no 480px clip.

**Main component name:** `Landing / {ID} · {ShortName}`

Set **component description** to: `Catalog: {ID} · Handoff: design-system/pages/online-college-courses-v5.md`

---

## Naming conventions

| Object | Pattern | Example |
|--------|---------|---------|
| Componentry page | `33 · online-college-courses-v5 / Componentry` | |
| Module card frame | `Module / {ID} - {Name}` | `Module / SKEPT-01 - Skepticism Buster (NEW)` |
| Main component | `Landing / {ID} · {ShortName}` | `Landing / SKEPT-01 · SkepticismBuster` |
| Wireframe desktop | `online-college-courses-v5 · Desktop 1440` | |
| Wireframe mobile | `online-college-courses-v5 · Mobile 375` | |

---

## Handoff checklist (design QA)

- [x] Page `33 · online-college-courses-v5 / Componentry` with **00 Cover**, **01 Desktop**, **02 Mobile**, **03 Library**, promoted **SKEPT-01** component
- [x] **13** desktop catalog cards in `Desktop module stack v4` (`611:6`)
- [x] **SKEPT-01** documented and promoted in **`03 - Landing Components Library`**
- [x] Shared chrome cards (NAV-01, START-01, TRUST-02, NAV-UX-01) use v4 spec-sidebar format
- [x] **`Landing / {ID}`** entries are true Figma **Components** (not frame thumbnails)
- [x] Mobile catalog includes **FORM-05** sticky overlay
- [ ] UAGC Library linked; RFI atoms instanced from design system where applicable
- [ ] Re-capture wireframes after prototype UX changes; refresh catalog + library clones

---

## Related files

| Asset | Path |
|-------|------|
| Page implementation | `~/uagc-prototypes/src/app/online-college-courses-v5/page.tsx` |
| Dev handoff | `design-system/pages/online-college-courses-v5.md` |
| Module manifest (JSON) | `design-system/componentry/online-college-courses-v5-modules.json` |
| Persona simulation | `simulation_online-college-courses-v5.csv` (repo root) |
| Design tokens | `design-system/MASTER.md` |
| Shared module specs | `design-system/pages/request-info-v5.md` |
| v5 componentry build guide | `design-system/componentry/request-info-v5-figma-build-guide.md` |
| v7 componentry build guide | `design-system/componentry/degree-programs-v7-figma-build-guide.md` |
| Figma componentry skill | `.cursor/skills/figma-landing-componentry/SKILL.md` |
