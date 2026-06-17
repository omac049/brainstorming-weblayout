# Figma files — Project Groundwork

Canonical links for agents, MCP (`use_figma`), and handoff docs. **File keys do not change** when a file is moved into a team project—only update this doc if the file is duplicated or re-keyed.

---

## Paid landing wireframes + componentry (editable)

| Field | Value |
|-------|-------|
| **Display name** | UAGC Paid page templates 3 — Wireframe |
| **File key** | `HoSMZOSnKSVgUXlskHv9tS` |
| **Team project** | [UAGC team project](https://www.figma.com/files/team/954051891409200881/project/598288008?fuid=1052358699765663783) (`projectId: 598288008`) |
| **Design file** | [Open file](https://www.figma.com/design/HoSMZOSnKSVgUXlskHv9tS/UAGC-Paid-page-templates-3--%E2%80%94-Wireframe?node-id=0-1) |

**Scope:** v5 / v7 / OCC paid wireframes; **organic** hub, program, homepage, blog, and **thank-you** wireframes; **Desktop 1440** + **Mobile 375** catalogs, per-template **Componentry** pages with promoted components, **`03 - Landing/Organic Components Library`**. Writes go here—not in the Reskin file.

**MCP:** `fileKey: HoSMZOSnKSVgUXlskHv9tS` · call `setCurrentPageAsync` before reading unvisited pages.

### Page structure (26 pages, numbered prefix groups)

| Prefix | Template | Pages |
|--------|----------|-------|
| **00** | Index & Tokens | Cover, color/spacing/radius swatches, template map |
| **01** | Global Components Library | 49-module visual index (Shared / Paid / Organic grids) |
| **10–13** | request-info-v5 | Wireframes, Desktop 1440, Mobile 375, Componentry (20 `Landing /` components) |
| **20–23** | degree-programs-v7 | Wireframes, Desktop 1440, Mobile 375, Componentry |
| **30–33** | online-college-courses-v5 | Wireframes, Desktop 1440, Mobile 375, Componentry (SKEPT-01 exclusive) |
| **40–42** | organic-homepage | Desktop 1440, Mobile 375, Componentry (15 `Organic /` components) |
| **50–52** | online-degrees-hub | Desktop 1440, Mobile 375, Componentry (16 `Organic /` components) |
| **60–62** | blog-article | Desktop 1440, Mobile 375, Componentry (9 `Organic /` components) |
| **70–72** | thank-you | Desktop 1440, Mobile 375, Componentry (7 `Organic /` components) |

### Design tokens

| Collection | Variables | Modes |
|------------|-----------|-------|
| **UAGC Tokens** | 33 (15 color, 12 spacing, 6 radius) | Default |
| **Text styles** | 24 (12 Desktop + 12 Mobile) | — |
| **Effect styles** | 2 (shadow/sm, shadow/md) | — |

### Component naming convention

All promoted components use: `{context} / {CATALOG-ID} · {ShortName}`
- Paid: `Landing / VP-01 · ValueProps`
- Organic: `Organic / HERO-V2 · Hero`

Every component has a `description` field with catalog ID, source code path, Drupal paragraph type, and page list.

---

## UAGC 7 JDI EDU Website Reskin (external — no team access)

| Field | Value |
|-------|-------|
| **File key** | `c4O4uPeilJDBZFjARNnt65` |
| **Design file** | [Reskin — Typography `7078:2`](https://www.figma.com/design/c4O4uPeilJDBZFjARNnt65/-UAGC-7-JDI--EDU--Website-Reskin?node-id=7078-2) |

**This team did not create this file and does not have Figma or MCP access.** Do not depend on it for audits, writes, or freshness checks.

**Use instead:** [`MASTER.md`](./MASTER.md) (one-time typography/color/icon extract, maintained in-repo) + editable wireframes file `HoSMZOSnKSVgUXlskHv9tS` (local text styles, `UAGC Tokens`, componentry). Alignment → [`RESKIN-ALIGNMENT.md`](./RESKIN-ALIGNMENT.md).

---

## Related repo paths

| Artifact | Path |
|----------|------|
| Token reference | `design-system/MASTER.md` |
| Per-page handoff | `design-system/pages/*.md` |
| Componentry build guides | `design-system/componentry/*-figma-build-guide.md` |
| Module manifests | `design-system/componentry/*-modules.json` |
| Figma componentry skill | `.cursor/skills/figma-landing-componentry/SKILL.md` |
| Component manager | `.cursor/skills/uagc-component-manager/scripts/registry.py` |
| Next.js prototypes | `prototypes/` (canonical) / `~/uagc-prototypes` (local preview) |
