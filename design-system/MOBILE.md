# Mobile UX Contract — UAGC Prototypes

Canonical rules for **native-feel mobile** on organic and paid landing prototypes. Applies to all new pages and modules.

**Related:** `prototypes/src/app/globals.css` (utilities), `prototypes/src/components/shared/PageMain.tsx` (page shell), `design-system/MASTER.md` (tokens).

---

## Page shell (required on conversion pages)

Every page with **`RFIStickyBar`** must use:

```tsx
<SiteHeader /> {/* or paid Header */}
<PageMain variant="organic"> {/* "paid" | "hub" for other header offsets */}
  …sections…
</PageMain>
<SiteFooter /> {/* or paid Footer — includes mobile-sticky-offset */}
<RFIStickyBar heroFormRef={heroRef} />
```

| Piece | Responsibility |
|-------|----------------|
| `PageMain` | Safe-area-aware top padding (`--uagc-header-offset`) |
| `SiteFooter` / `Footer` | Bottom padding for sticky RFI bar (`mobile-sticky-offset`) |
| `RFIStickyBar` | Measures height → `--uagc-sticky-rfi-height` at runtime |
| Module sticky bars | Publish `--uagc-sticky-secondary-height` via `usePublishElementHeight` |

**Do not** hard-code `pt-14`, `bottom-14`, or footer `pb-20` on individual pages.

---

## Safe area & sticky stack

```
┌─────────────────────────────┐
│ Fixed header + notch inset  │
├─────────────────────────────┤
│                             │
│   Scrollable page content   │
│                             │
├─────────────────────────────┤  ← optional module bar (Cost Estimator)
│ Secondary sticky (if active)│
├─────────────────────────────┤
│ RFI sticky bar (mobile)     │
├─────────────────────────────┤
│ Home indicator inset        │
└─────────────────────────────┘
```

- `viewport-fit: cover` in root layout (enables `env(safe-area-inset-*)`).
- Sticky bars use `.safe-area-bottom` for home-indicator padding.
- When two fixed bottom bars stack, section content needs extra bottom padding (see `CostEstimator`).

---

## Touch & typography

| Rule | Implementation |
|------|----------------|
| Minimum tap target **44×44px** | `.touch-target` / `.touch-target-inline` or `min-h-11` |
| Minimum mobile UI text **12px** | `text-xs` or `.type-micro` — **no** `text-[10px]` / `text-[11px]` on mobile-visible UI |
| Tap feedback | `touch-action: manipulation`; subtle `-webkit-tap-highlight-color` in `globals.css` |
| Horizontal nav rails | `.mobile-nav-scroll` (scroll-snap, overscroll containment) |

---

## Scroll & motion

- **Never** gate base readability on `opacity: 0` + scroll JS alone. `.reveal-section` disables opacity hide on coarse pointers; `ScrollReveal` uses transform-only.
- Disable hero parallax on `(pointer: coarse)`.
- Prefer **flat page flow** over nested `max-h` + `overflow-y-auto` on mobile (see `ProgramExplorer` Show All pattern).

---

## Program discovery (mobile)

- Area filter: **native `<select>`**, not horizontal pill strip.
- Program list: **~6 rows + Show All** in normal document flow — no nested scroll traps.
- Filter chips: `min-h-11` for touch.

---

## CI guardrails

Mobile smoke tests run on PRs and `main` when `prototypes/**` changes:

```bash
cd prototypes
npm run build
npm run test:mobile:install   # once locally
npm run test:mobile
```

**Coverage (375px iPhone 13 — Chromium + WebKit):**

- No horizontal overflow
- `#main-content` visible
- No stuck `opacity: 0` reveal sections
- RFI sticky bar appears after scroll; footer clears sticky bar
- Homepage v2 cost estimator smoke

Add new canonical routes to `prototypes/e2e/mobile-smoke.spec.ts` when templates ship. Prototype app paths (local/GitHub Pages) omit the live `/success/` prefix — e.g. `/request-info-v5`, not `/success/request-info-v5`.

---

## Checklist for new modules

- [ ] Uses shared tokens from `MASTER.md` (no one-off hex unless spec’d)
- [ ] Interactive controls ≥ 44px on mobile
- [ ] Body/meta text ≥ 12px on mobile
- [ ] No second fixed bottom bar without publishing secondary height
- [ ] Verified at **375px** in Playwright (not IDE browser resize alone)
- [ ] Route added to mobile smoke suite if page is canonical
