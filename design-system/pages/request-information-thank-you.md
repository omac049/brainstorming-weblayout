# request-information-thank-you — Dev Handoff & Component Spec

> **Figma wireframes + componentry:** [`HoSMZOSnKSVgUXlskHv9tS`](https://www.figma.com/design/HoSMZOSnKSVgUXlskHv9tS) — pages **`request-information-thank-you — Wireframes`** / **Componentry** (to be created).  
> **Figma build guide:** [componentry/request-information-thank-you-figma-build-guide.md](../componentry/request-information-thank-you-figma-build-guide.md) · **JSON manifest:** [componentry/request-information-thank-you-modules.json](../componentry/request-information-thank-you-modules.json)  
> **Phase 1 audit:** [Task 1.10 — Post-RFI](../../output/playwright/screenshots/1-6-external-validation.html#post-rfi) · **Foundation tokens:** [MASTER.md](../MASTER.md)

---

## Purpose

This document is the **single source of truth** for redesigning **`/request-information/thank-you`** — the shared **post-RFI confirmation** destination for organic pages, paid landings, and site-wide RFI forms. Scope is **stakeholder sign-off** (Figma + interactive prototype): a **lean, focused** confirmation page — not a 13-module mini-site.

**Funnel role:** RFI submit → **this page** → **Start Application** (admission portal) → enrollment.

**Live references:**

| Variant | URL |
|---------|-----|
| Base (fallback) | `https://www.uagc.edu/request-information/thank-you` |
| Personalized | `https://www.uagc.edu/request-information/thank-you?sid=7717243` (+ `submissionID`, `token` when present) |

**Prototype routes (planned):** `/organic/request-information/thank-you` with mock `firstName`, `program`, `confirmationId` query params or session state.

---

## What works on live (keep)

| Element | Status |
|---------|--------|
| Personalized headline | `"Congratulations [FirstName],"` via submission token |
| Advisor expectations bullets | Four bullets under hero — what to expect on the call |
| **Start Application** → portal | Correct next step when `sid`/token present |
| Breadcrumb | Home › Request Information › Thank You |
| Next Steps 3-card row | Talk to Advisor · Apply for Free · Get Ready for Class |

---

## 10× redesign principles (from Task 1.10)

| Live problem | Prototype rule |
|--------------|----------------|
| **RFI form in 3+ places** after submit | **Zero RFI forms** on thank-you — no sidebar, sticky, or chat duplicate |
| No confirmation receipt | **`TY-RECEIPT`** — confirmation ID, email sent notice, program recap |
| Empty Start Date module | **`START-01`** populated with next date (+ `daysLeft` at render) |
| 13+ content modules | **~6 substantive modules**, ~5–6 mobile screens |
| Request Info in header | **`NAV-00-TY`** hides Request Info CTA |
| Pre-decision content (VP, tuition, blogs) | **Omitted** — user already converted |
| Competing CTAs (5+) | **Primary:** Start Application · **Secondary:** Program Information · Contact |
| Base URL `"Congratulations ,"` | Graceful fallback copy without trailing comma |

---

## Page anatomy (top → bottom)

| # | Catalog ID | React component | Anchor | Background | Notes |
|---|------------|-----------------|--------|------------|-------|
| — | `NAV-00-TY` | `SiteHeader` | — | `#FFFFFF` | Full nav; **hide Request Info** |
| 1 | `TY-HERO` | `ThankYouHeroSection` | `#confirmation` | `#faf9f7` | Personalized headline + CTAs |
| 2 | `TY-RECEIPT` | `SubmissionReceiptSection` | — | `#FFFFFF` | **New** — submission receipt |
| 3 | `START-01` | `UpcomingStartDates` | `#start-date` | `#FFFFFF` | **Must show real date** |
| 4 | `TY-NEXT` | `ThankYouNextStepsSection` | `#next-steps` | `#FFFFFF` | 3-step admissions cards |
| 5 | `TY-CONTACT` | `ThankYouContactSection` | `#contact` | `#0C234B` | Phone + chat + hours |
| 6 | `TRUST-01` | `TestimonialSection` | — | `#faf9f7` | **Optional** single program-matched quote |
| — | `FOOT-01` | `Footer` | — | navy | Standard footer |

**Explicitly absent:** `RFI-HERO`, `FORM-02`, `FORM-05`, sidebar anchor nav, `VP-01`, `FIN-01`, blog cards, embedded application form.

**Substantive module count:** **6** (+ chrome). Target **5–6 iPhone screens**.

---

## Variants

### Personalized (primary sign-off)

Query: `sid`, `submissionID`, `token` (production); prototype mocks `firstName`, `program`, `confirmationId`.

```tsx
<ThankYouHeroSection
  firstName="Natasha"
  programName="Bachelor of Arts in Business Administration"
  applicationPortalUrl="https://cloud.mail.uagc.edu/..." // from token in prod
/>
```

### Base (fallback)

No `firstName` — use neutral headline:

> **Congratulations — you've taken the first step.**

No trailing comma. Start Application may link to generic `/apply-now` until session is established.

---

## Global layout constraints

Same as [online-degrees-hub](./online-degrees-hub.md#global-layout-constraints) — flat colors, Fira typography, gold primary CTAs, 44px touch targets.

| Rule | Thank-you specific |
|------|-------------------|
| Max width | `max-w-[720px]` for hero + receipt (centered confirmation column) |
| Page tone | Reassuring, receipt-like — not sales-heavy |
| Forms | **None** on this URL in prototype |

---

## Module specifications

### NAV-00-TY — Header (post-submit)

**File:** `src/components/organic/SiteHeader.tsx`

```tsx
<SiteHeader variant="full" hideRequestInfo primaryCta="apply" />
```

| Override | Value |
|----------|-------|
| `hideRequestInfo` | `true` — suppress utility Request Info |
| `primaryCta` | Emphasize Apply / Start Application path |

---

### TY-HERO — Confirmation hero

**File:** `src/components/organic/ThankYouHeroSection.tsx` *(new)*

| Element | Content |
|---------|---------|
| Breadcrumb | Home › Request Information › Thank You |
| Headline | `Congratulations {firstName},` or fallback |
| Subhead | you've taken the first step. |
| Body | Expect a call from an advisor to: (4 bullets from live) |
| Badges | $0 Application Fee \| No Standardized Test Required |
| Primary CTA | **Start Application** (gold) → admission portal |
| Secondary CTA | **Program Information** → program page or `#program-recap` |

---

### TY-RECEIPT — Submission receipt

**File:** `src/components/organic/SubmissionReceiptSection.tsx` *(new)*

Prototype mock content:

| Field | Example |
|-------|---------|
| Confirmation | Reference # **7717243** (or generated mock) |
| Email notice | We sent a confirmation to **n****@email.com** |
| Program | **BA in Business Administration** |
| Response time | An advisor will contact you within **1 business day**. |

Visually: light bordered card, checkmark icon, scannable rows — not legal fine print.

---

### START-01 — Start date (populated)

Reuse [request-info-v5 START-01](./request-info-v5.md#start-01--upcoming-start-dates) — **single next date** for submitted program.

```tsx
<UpcomingStartDates
  variant="card"
  dates={[{ date: "2026-07-07", label: "Next start" }]}
/>
```

Compute `daysLeft` at **render** time (no client-only hydration mismatch).

**Do not** ship empty "Start Date" label — live audit Critical #3.

---

### TY-NEXT — Next steps

**File:** `src/components/organic/ThankYouNextStepsSection.tsx` *(new)*

Three cards (from live, simplified):

1. **Talk to an Advisor** — Learn More
2. **Apply for Free** — Learn More (links toward portal, not embedded form)
3. **Get Ready for Class** — Learn More

---

### TY-CONTACT — Contact band

**File:** `src/components/organic/ThankYouContactSection.tsx` *(new)*

Navy band above footer:

- **Have Questions that Can't Wait?**
- Phone: +1 866 711 1700 · **Let's Chat**
- Advisor hours (Mon–Thu 5a–7p PT, Fri 5a–5p PT, Sat–Sun 7a–4p PT)

---

### TRUST-01 — Optional testimonial

Single quote matched to submitted program area (e.g. Business → MBA/organizational management quote). Omit section if no match — do not use 3+ carousel on this page.

---

## RFI integration (organic + paid)

| Source page | Post-submit behavior (prototype) |
|-------------|----------------------------------|
| [online-degrees-hub](./online-degrees-hub.md) `RFI-HERO` | Mock submit → navigate to thank-you with state |
| Program page `RFI-HERO` (planned) | Pre-filled program on `TY-RECEIPT` |
| Homepage sticky (planned) | Generic thank-you; program recap if captured in form |
| Paid `/success/*` | Same thank-you template in production — prototype may share component |

Prototype submit: toast optional → `router.push('/organic/request-information/thank-you?...')` — **no Lead API** for sign-off.

---

## Sign-off checklist

- [ ] **No RFI forms** anywhere on page (desktop + mobile)
- [ ] Personalized + base variants in Figma
- [ ] Receipt block with confirmation ID + program recap
- [ ] Start date shows real date and countdown
- [ ] Start Application is primary CTA; Request Info hidden in header
- [ ] Page height ~5–6 mobile screens (vs 15+ scroll on live)
- [ ] Contact hours visible without deep scroll
- [ ] Wireframes compared to Task 1.10 before/after captures

---

## Related files

| Asset | Path |
|-------|------|
| Module manifest | [request-information-thank-you-modules.json](../componentry/request-information-thank-you-modules.json) |
| Figma build guide | [request-information-thank-you-figma-build-guide.md](../componentry/request-information-thank-you-figma-build-guide.md) |
| Hub (RFI entry) | [online-degrees-hub.md](./online-degrees-hub.md) |
| Task 1.10 audit | `output/playwright/screenshots/1-6-external-validation.html#post-rfi` |
| Live captures | `thank-you-base_*.jpg`, `thank-you-personalized_*.jpg` |
| Organic prototype pack | Homepage *(planned)* · Program BA *(planned)* |

---

## Organic prototype build order (updated)

1. **online-degrees-hub** — spec ✓  
2. **request-information-thank-you** — spec ✓ *(this doc)*  
3. **program-business-administration** — planned  
4. **homepage** — planned  

Thank-you is **#2** because it is lean, closes the RFI loop for hub sign-off demos, and fixes the highest-severity post-conversion issues from Phase 1.
