# Time-to-Graduation Calculator — Logic Documentation

**Component:** `TimeToGraduationCalculator`  
**Location:** `prototypes/src/components/organic/TimeToGraduationCalculator.tsx`  
**Used on:** Organic thank-you page (`/organic/request-information/thank-you`)

---

## Purpose

An interactive calculator that gives prospective students a personalized graduation timeline based on their degree level, transfer credits, and enrollment pace. The goal is to make the graduation finish line feel tangible and achievable.

---

## UAGC Academic Structure (Source of Truth)

All constants are derived from verified UAGC institutional sources:

| Fact | Value | Source |
|------|-------|--------|
| Calendar type | Continuous (non-term) | [uagc.edu/admissions/faq](https://www.uagc.edu/admissions/faq) |
| Course load model | 1 course at a time = full-time | [uagc.edu/qualified-tuition-reduction](https://www.uagc.edu/qualified-tuition-reduction) |
| Undergrad course length | 5 weeks | [uagc.edu/about/why-uagc/flexibility](https://www.uagc.edu/about/why-uagc/flexibility) |
| Graduate course length | 6 weeks | Same as above |
| Doctoral course length | 6–9 weeks | Not modeled (out of scope) |
| Credits per course | 3 | [2025-2026 Academic Catalog](https://uagcmedia.static.arizona.edu/Catalog/2025-2026_UAGC_Academic_Catalog.pdf) |
| Winter break | 2 weeks (late Dec–early Jan) | [uagcfacultyaffairs.libanswers.com](https://uagcfacultyaffairs.libanswers.com/faq/399456) |
| Instructional weeks/year | 50 (= 52 − 2) | Derived |
| Approved break between courses | Up to 45 days without withdrawal | [Institutional data page](https://www.uagc.edu/institutional-data/behind-numbers/student-cohort-retention-persistence-and-graduation) |

---

## Degree Configurations

| Degree | Total Credits | Max Transfer Credits | Residency Minimum | Source |
|--------|--------------|---------------------|-------------------|--------|
| Associate | 64 (some programs 67) | 46 (or 49 for 67-cr programs) | 18 credits at UAGC | [DSST Transfer Guide](https://uagcmedia.static.arizona.edu/Transfer_Guides/DSST_Transfer_Guide.pdf) |
| Bachelor's | 120 | 90 | 30 credits at UAGC | [CLEP Transfer Guide](https://uagcmedia.static.arizona.edu/Transfer_Guides/CLEP_Transfer_Guide.pdf) |
| Master's | 30–39 (varies; default 36) | 9 (flat, all programs) | Program credits − 9 | [uagc.edu/admissions/traditional](https://www.uagc.edu/admissions/traditional) |

**Note:** We use 64 for Associate (the lower bound keeps the estimate conservative). We use 36 for Master's as the modal value across programs (MA Education 36, MA Psychology 36, MS Tech Mgmt 36, MSIDT 36). MBA is 39 and MA Special Ed/Early Childhood are 30.

---

## Pace Model

UAGC does **not** offer "part-time" or "accelerated" tracks in the traditional sense. All students take 1 course at a time. Pace variation comes from **breaks between courses**:

| Pace | Label | What it means | Multiplier | Effective courses/yr (UG) | Effective courses/yr (Grad) |
|------|-------|---------------|------------|--------------------------|----------------------------|
| `continuous` | Continuous | No breaks between courses | 1.0× | 10 | ~8 |
| `steady` | Steady | Occasional breaks (~2 weeks between some courses) | 1.25× | 8 | ~6–7 |
| `flexible` | Flexible | Regular breaks (up to 45 days between courses) | 1.6× | ~6 | ~5 |

The "Continuous" pace matches UAGC's stated "4 years for a Bachelor's with 0 transfers" claim and the "208 weeks" program design.

---

## Core Formula

```
remaining_credits = total_credits − transfer_credits
courses_needed   = ⌈remaining_credits / 3⌉
base_months      = (courses_needed × weeks_per_course × 12) / 50
adjusted_months  = ⌈base_months × pace_multiplier⌉
```

### Derivation

1. Each course is `weeks_per_course` long (5 for UG, 6 for grad)
2. There are 50 instructional weeks per year (52 − 2 week break)
3. So `courses_needed × weeks_per_course` gives total instructional weeks
4. Divide by 50 to get years, multiply by 12 to get months
5. The pace multiplier stretches the timeline for students taking breaks

### Verification Against UAGC Claims

| Scenario | Our Output | UAGC Stated | Match? |
|----------|-----------|-------------|--------|
| Bachelor's, 0 transfers, continuous | 48 months | "four years" | ✓ |
| Bachelor's, 60 transfers, continuous | 24 months | "two years" | ✓ |
| Bachelor's, 30 transfers, continuous | 36 months | — | Reasonable |
| MBA (39 cr), 0 transfers, continuous | 19 months | "about 19 months" | ✓ |
| Associate (64 cr), 0 transfers, continuous | 26 months | — | Reasonable |

---

## Graduation Date Projection

```typescript
const d = new Date();
d.setMonth(d.getMonth() + months);
return d.toLocaleDateString("en-US", { month: "long", year: "numeric" });
```

This adds the calculated months to today's date and displays "Month Year" (e.g., "March 2029"). This is intentionally approximate — it doesn't model exact start dates or specific winter break timing.

---

## Transfer Credit Slider

- **Range:** 0 to `maxTransfer` (program-specific cap)
- **Step:** 3 (one course = 3 credits)
- **Clamping:** If the user switches to a degree with a lower max, the slider auto-clamps down
- **Progress display:** Shows `(credits - remaining) / credits × 100` as a percentage arc

---

## UI Inputs & Outputs

### Inputs (user-controlled)
1. **Degree Level** — pill selector (Associate / Bachelor's / Master's)
2. **Transfer Credits** — range slider (0 to max, step 3)
3. **Enrollment Pace** — pill selector (Continuous / Steady / Flexible)

### Outputs (calculated, displayed in result band)
1. **Graduation date** — "Graduate by [Month Year]" (hero text)
2. **Months remaining** — inside progress arc
3. **Courses left** — `⌈remaining_credits / 3⌉`
4. **Credits left** — `total_credits − transfer_credits`
5. **Progress %** — transfer credits as proportion of total degree

---

## Implementation Notes for Drupal/Production

### Key Differences from Prototype

The Next.js prototype uses React state and client-side calculation. For Drupal:

1. **No server-side calculation needed** — all math is client-side JavaScript
2. **No API calls** — the calculator is self-contained with static config
3. **Accessibility:** The result area uses `aria-live="polite"` so screen readers announce changes
4. **Reduced motion:** All animations respect `prefers-reduced-motion`

### Config That May Need Updates

| Constant | Current Value | When to Update |
|----------|--------------|----------------|
| Associate credits | 64 | If UAGC changes program requirements |
| Master's credits | 36 | If targeting a specific program (MBA = 39, Special Ed = 30) |
| Max transfer (Bachelor's) | 90 | If transfer policy changes |
| Max transfer (Master's) | 9 | If graduate transfer policy changes |
| Winter break weeks | 2 (baked into the "50" constant) | If break duration changes |

### Future Enhancements

- **Program-specific master's credits:** Could expand the Master's selector to show specific programs (MBA 39cr, MA Psychology 36cr, etc.)
- **Next start date integration:** Instead of "today + months," align to the nearest UAGC start date
- **Average transfer display:** UAGC notes "Bachelor's students transfer an average of 41.5 credits" — could show this as a suggested default
- **Residency check:** Warn if transfer credits would exceed the residency requirement (e.g., Bachelor's must have ≥30 at UAGC)

---

## Sources

1. [UAGC Admissions FAQ](https://www.uagc.edu/admissions/faq) — degree requirements, timeline claims
2. [UAGC Flexibility Page](https://www.uagc.edu/about/why-uagc/flexibility) — course lengths, transfer limits
3. [UAGC Institutional Data](https://www.uagc.edu/institutional-data/behind-numbers/student-cohort-retention-persistence-and-graduation) — calendar structure, break policy
4. [UAGC Qualified Tuition Reduction](https://www.uagc.edu/qualified-tuition-reduction) — "1 course at a time = full-time"
5. [DSST Transfer Guide (PDF)](https://uagcmedia.static.arizona.edu/Transfer_Guides/DSST_Transfer_Guide.pdf) — associate transfer caps
6. [CLEP Transfer Guide (PDF)](https://uagcmedia.static.arizona.edu/Transfer_Guides/CLEP_Transfer_Guide.pdf) — bachelor's transfer caps
7. [UAGC Traditional Transfer Credits](https://www.uagc.edu/admissions/traditional) — master's 9-credit cap
8. [How Long for a Master's (Blog)](https://www.uagc.edu/blog/how-long-does-it-take-to-get-a-masters-degree) — grad timeline, SMART Track
9. [Supply Chain Mgmt BA Page](https://www.uagc.edu/online-degrees/bachelors/supply-chain-management) — "208 weeks" confirmation
10. [MBA V2 Program Page](https://www.uagc.edu/online-degrees/masters/business-administration-v2) — "39 credits, ~19 months"
