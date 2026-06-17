# Figma Build Guide — request-information-thank-you Componentry

> **Primary Figma file:** [`HoSMZOSnKSVgUXlskHv9tS`](https://www.figma.com/design/HoSMZOSnKSVgUXlskHv9tS) · [`FIGMA-FILES.md`](../FIGMA-FILES.md)  
> **Componentry page:** `72 · thank-you / Componentry`  
> **Skill:** [`.cursor/skills/figma-landing-componentry/SKILL.md`](../../.cursor/skills/figma-landing-componentry/SKILL.md)

---

## Why this page exists

Live thank-you is a **13+ module mini-site** with **RFI forms still visible after submit** (Task 1.10 Critical). Componentry documents the **lean post-conversion redesign**: receipt, populated start date, next steps, contact — ~**6 modules**, ~**5–6 mobile screens**.

Dev handoff: [request-information-thank-you.md](../pages/request-information-thank-you.md). **Spec wins over live capture.**

**Before captures:** `thank-you-base_*.jpg`, `thank-you-personalized_*.jpg`  
**After (prototype):** wireframes on `70 · thank-you / Desktop 1440`

---

## Wireframes — two variants required

| Frame | URL reference | Sign-off focus |
|-------|---------------|----------------|
| `thank-you · Desktop 1440 · Personalized` | `?sid=7717243` | Natasha headline, receipt, Start Application |
| `thank-you · Mobile 375 · Personalized` | same | No RFI sticky/sidebar |
| `thank-you · Desktop 1440 · Base` | `/thank-you` no params | Fallback headline (no comma artifact) |
| `thank-you · Mobile 375 · Base` | same | |

Cover page should show **side-by-side before (live capture thumbnail) vs after (wireframe)** for stakeholder review.

---

## Module inventory (6 desktop cards)

| # | ID | Frame name | Notes |
|---|-----|------------|-------|
| 1 | NAV-00-TY | `Module / NAV-00-TY — Header Post-Submit` | Annotate "Request Info hidden" |
| 2 | TY-HERO | `Module / TY-HERO — Confirmation Hero` | Two CTA buttons |
| 3 | TY-RECEIPT | `Module / TY-RECEIPT — Submission Receipt` | **New module** |
| 4 | START-01 | `Module / START-01 — Start Date` | Date + countdown populated |
| 5 | TY-NEXT | `Module / TY-NEXT — Next Steps` | 3 cards |
| 6 | TY-CONTACT | `Module / TY-CONTACT — Contact Band` | Navy band |
| 7 | TRUST-01 | `Module / TRUST-01 — Testimonial` | Optional — single card with persona tag |
| 8 | FOOT-01 | `Module / FOOT-01 — Footer` | Standard |

**Not in catalog:** any RFI form module, sidebar anchor nav, blog/tuition/VP blocks.

**Main components:** `Organic / TY-HERO · ThankYouHero`, `Organic / TY-RECEIPT · SubmissionReceipt`, etc.

---

## Module card template

1440px card = 1080px preview + 320px spec sidebar (same v4 pattern as paid componentry).

Spec sidebar must include:

- **POST-SUBMIT rule:** No RFI on this page
- Link to Task 1.10 audit issue resolved
- Variant notes (personalized vs base)

---

## TY-HERO — build notes

- Breadcrumb: Home › Request Information › Thank You
- Headline two lines: `Congratulations Natasha,` / `you've taken the first step.`
- Bullet list (4 items) — advisor call expectations
- Pill badges: $0 Application Fee | No Standardized Test Required
- Buttons: **Start Application** (gold fill) · **Program Information** (outline)
- **No form fields** in preview

---

## TY-RECEIPT — build notes

Card layout centered under hero:

```
✓  You're all set
   Reference #7717243
   Program: BA in Business Administration
   We emailed confirmation to n••••@email.com
   An advisor will contact you within 1 business day.
```

Use checkmark + navy text — not a second form.

---

## START-01 — build notes

Clone paid `Landing / START-01` but **must show date** — annotate "fixes empty live widget."

---

## Handoff checklist

- [ ] Wireframes: personalized + base (desktop + mobile)
- [ ] Componentry: 6–8 module cards
- [ ] Cover documents RFI removal + page length reduction
- [ ] Before/after thumbnails from Task 1.10 captures
- [ ] No `FORM-01`, `FORM-02`, or `FORM-05` in mobile catalog for this template
- [ ] Library `03` entries: `Organic / TY-*` components

---

## Related files

| Asset | Path |
|-------|------|
| Dev handoff | `design-system/pages/request-information-thank-you.md` |
| Module manifest | `design-system/componentry/request-information-thank-you-modules.json` |
| Task 1.10 audit | `output/playwright/screenshots/1-6-external-validation.html#post-rfi` |
| Hub RFI entry | `design-system/pages/online-degrees-hub.md` |
| Paid START-01 ref | `design-system/pages/request-info-v5.md` |
