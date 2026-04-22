# Claims Audit — ELT Deck & Presenter Notes

Every data claim in `index-v2.html` and `presenter.html` mapped to its source.
See `claims-checklist.csv` for a filterable spreadsheet version.

> **MATCH** = exact or within rounding
> **ROUNDED** = rounded from source, directionally accurate
> **FLAG** = known caveat worth noting

---

## Slide 1 — "The Data Says Fix the Funnel"

| Claim | Source | Status |
|-------|--------|--------|
| 11.1M sessions | GA4 site-wide ~11.1M | MATCH |
| $8.9M ad spend | Google Ads: $7.29M + $1.59M = $8.88M | ROUNDED |
| 348K conversions | GA4: 348,285 | ROUNDED |
| 627,000 bouncing problem | Rhetorical — see Flag 1 | FLAG |

---

## Slide 2 — 4.5x Conversion Gap

| Claim | Source | Status |
|-------|--------|--------|
| 4.5x gap | 13.57% / 3.01% = 4.51x | MATCH |
| /request-info-v5 at 3.01% | GA4 Page 1: 3.01% | MATCH |
| from 1.18M sessions | GA4: 1,177,574 | ROUNDED |
| /degree-programs-v7 at 13.57% | GA4 Page 5: 13.57% | MATCH |
| 8–15 min blog engagement | PhD 8.1 min, Business Plan 15.2 min | MATCH |
| 21 conversions from 149K sessions | PhD blog: 148,831 landing sessions / 21 | ROUNDED |

---

## Slide 3 — The Scale of the Opportunity

| Claim | Source | Status |
|-------|--------|--------|
| 11.1M sessions | GA4 ~11.1M | MATCH |
| 1.73M organic clicks | GSC: 1,730,192 | ROUNDED |
| 348K conversions | GA4: 348,285 | ROUNDED |
| 47.5% engagement | GA4 ~47.5% | MATCH |
| 60% mobile | GA4: 59.9% | ROUNDED |
| Mobile 45.8% eng / Desktop 51.4% eng | GA4 device split | MATCH |
| Tablet 44.6% eng | GA4 device split | MATCH |
| Paid Search 77.5K / 61% eng | GA4: 77,518 / 60.7% | ROUNDED |
| Display 59.6K / 64% eng | GA4: 59,640 / 64.4% | ROUNDED |
| Paid Social 53.3K / 42% eng | GA4: 53,320 / 42.1% | ROUNDED |
| Organic 27.7K / 64% eng | GA4: 27,741 / 64.4% | ROUNDED |
| Paid Social 1.91M sessions at 42% eng | GA4: 1,910,315 / 42.1% | ROUNDED |

---

## Slide 4 — Tale of Two Pages

| Claim | Source | Status |
|-------|--------|--------|
| /request-info-v5: 3.01% conv, 53% bounce | GA4: 3.01%, 53.2% | ROUNDED |
| 1.18M sessions, 53.2% bounce | GA4 Page 1 | MATCH |
| /degree-programs-v7: 13.57% conv, 25% bounce | GA4: 13.57%, 25.1% | ROUNDED |
| 222K sessions | GA4: 221,507 | ROUNDED |
| "converts at 4.5 times the rate" | 13.57 / 3.01 = 4.51x | MATCH |

---

## Slide 5 — Top 5 Paid Landing Pages

All five rows match GA4 data exactly:

| Page | Sessions | Eng % | Conv % | Conversions | Status |
|------|----------|-------|--------|-------------|--------|
| /request-info-v5 | 1,177,574 | 46.8% | 3.01% | 35,498 | MATCH |
| /bachelors-v5 | 458,070 | 43.1% | 3.50% | 16,013 | MATCH |
| /military-v5 | 310,713 | 52.9% | 3.07% | 9,551 | MATCH |
| /courses-v5 | 262,257 | 74.5% | 7.25% | 19,005 | MATCH |
| /degree-programs-v7 | 221,507 | 74.9% | 13.57% | 30,066 | MATCH |

Additional claim: "47K additional leads" ← 1,177,574 × (7% − 3.01%) = 46,993 → **ROUNDED**

---

## Slide 6 — Blog Content Gap

| Claim | Source | Status |
|-------|--------|--------|
| 149K sessions, 21 conv (PhD blog) | GA4: 148,831 landing sessions / 21 | ROUNDED |
| 67.8% eng, 8.1 min avg | GA4 PhD blog | MATCH |
| 60,937 GSC clicks, position 3.5 | GSC PhD blog | MATCH |
| /online-degrees: 88.8% eng, 3,428 conv | GA4 | MATCH |
| 11.2% bounce, 11.8 min avg | GA4 /online-degrees | MATCH |
| 135K sessions | GA4: 135,507 | ROUNDED |
| 2,437 leads at 1% | 243,700 × 1% = 2,437 | MATCH |
| 84 current conversions (3 blogs) | PhD 21 + Business Plan 63 = 84 | MATCH |
| 29x improvement | 2,437 / 84 = 29.01x | MATCH |

---

## Slide 7 — Declining Organic

| Claim | Source | Status |
|-------|--------|--------|
| −41.6% Homepage | GSC: 90,004 → 52,559 | MATCH |
| −31.8% Writing Center | GSC: 61,289 → 41,772 | MATCH |
| −49.7% Blog (Mgmt) | GSC: 12,901 → 6,483 | MATCH |
| Bar chart exact values (90,004 / 52,559 etc.) | GSC | MATCH |

---

## Slide 8 — Ad Efficiency (53x)

| Claim | Source | Status |
|-------|--------|--------|
| $29 Military Display | $254,142 / 8,752 = $29.04 | ROUNDED |
| 8,752 conversions | Google Ads Display Prospecting | MATCH |
| $1,539 PMax General | $734,128 / 477 = $1,539.11 | ROUNDED |
| 477 conversions | Google Ads PMax | MATCH |
| 53x (title) | $1,539.11 / $29.04 = 53.01x | MATCH |
| $151 Brand Search | $447,547 / 2,968 = $150.81 | ROUNDED |
| $175 RFI DemandGen | $563,803 / 3,228 = $174.68 | ROUNDED |
| $421 Courses Search | $1,640,681 / 3,901 = $420.62 | ROUNDED |
| $514 Bachelor's Search | $1,407,229 / 2,739 = $513.71 | ROUNDED |

**Accuracy notes for this slide:**

1. **$29 is one campaign only.** Display Prospecting ($254K). Total military page spend is ~$545K across 3 campaigns. Blended cost would be higher.
2. **53x compares two specific campaigns.** PMax General vs. Military Display Prospecting. Valid but narrow.
3. **PMax conversions may use different actions.** If a different report shows different counts, check conversion action configuration.
4. **All cost/conv use Google Ads conversions** (not GA4). Comparing to GA4 numbers would produce different figures.

---

## Slide 10 — Priorities

| Claim | Source | Status |
|-------|--------|--------|
| 1.18M sessions, 53.2% bounce, 3.01% conv | GA4 Page 1 | MATCH |
| +124K leads/year | 1,177,574 × (13.57% − 3.01%) = 124,256 | MATCH |
| 149K sessions, 21 conv (PhD blog) | GA4 | MATCH |
| 75K sessions, 63 conv (business plan) | GA4: 74,663 landing sessions / 63 | ROUNDED |
| 2,400+ leads/year | 243K × 1% = 2,430 | ROUNDED |
| 60% mobile | GA4: 59.9% | ROUNDED |
| 88.8% eng (/online-degrees) | GA4 | MATCH |
| 13.6% conv (/degree-programs-v7) | GA4: 13.57% | ROUNDED |
| Organic down 42–50% | GSC: −41.6% to −49.7% | MATCH |
| PMax $1,539/conv | Google Ads | MATCH |

---

## Slide 11 — The Math (+124K)

| Claim | Source | Status |
|-------|--------|--------|
| +124K additional leads | 159,754 − 35,498 = 124,256 | ROUNDED |
| 159,754 conversions | 1,177,574 × 13.57% = 159,799 | FLAG — see Flag 2 |
| 35,498 current conversions | GA4 Page 1 | MATCH |
| 13.57% conv rate | GA4 Page 5 | MATCH |
| "3% to 7% doubles… 47,000 more leads" | 82,430 − 35,498 = 46,932 | ROUNDED |

---

## Slide 12 — Next Steps

| Claim | Source | Status |
|-------|--------|--------|
| 3% → 7%+ RFI conv | Target (not a data claim) | — |
| 53% → <40% bounce | 53.2% is current | MATCH |
| 21 → 1,490+ blog leads | 149K × 1% = 1,490 | MATCH |
| $1,539 → Review | Google Ads PMax | MATCH |
| "$8.9M to pages that bounce 53%" (notes) | See Flag 3 | FLAG |

---

## Cross-Reference: index.html vs index-v2.html

All shared data points are **internally consistent** across the three files.
The only difference: index.html uses "18x" (Military $29 vs Bachelor's $514 = 17.7x),
while index-v2.html uses "53x" (Military $29 vs PMax $1,539). Different valid comparisons.

---

## All Flags

### Flag 1 · LOW RISK — 627K bouncing (rhetorical)
**Where:** Slide 1
**Issue:** 627K appears to be a monthly estimate. 11.1M × 52.5% = 5.8M annual bounces (≈ 483K/mo). The 627K may use a different calculation.
**Clarification:** Reframe as "millions of bouncing visitors" or clarify the time period.

### Flag 2 · VERY LOW RISK — 159,754 vs 159,799 (rounding)
**Where:** Slide 11
**Issue:** 1,177,574 × 13.57% = 159,799. Presentation says 159,754. Delta: 45.
**Clarification:** Immaterial rounding. Could update to 159,799 for precision.

### Flag 3 · MEDIUM RISK — "$8.9M to pages that bounce 53%"
**Where:** Presenter notes, Slide 12
**Issue:** $8.9M is total spend. Only ~$807K goes to /request-info-v5 (the 53% bounce page).
**Clarification:** More precise framing: "Our highest-traffic paid landing page bounces 53% of visitors." Cite the ~$807K specific spend.

### Flag 4 · MEDIUM RISK — $29 and 53x are single-campaign comparisons
**Where:** Slide 8
**Issue:** Military Display Prospecting ($254K / 8,752) vs PMax General ($734K / 477). Total military page spend is ~$545K across 3 campaigns.
**Clarification:** $29 is the Display Prospecting campaign specifically. Total military spend is ~$545K. The $29 shows what audience-specific targeting achieves.

### Flag 5 · MEDIUM RISK — Campaign table is a spend subset
**Where:** index.html spend table; implied in index-v2.html
**Issue:** Campaign table totals ~$5.6M. The $8.9M comes from full account totals. Remaining ~$3.3M is in other campaigns.
**Clarification:** The table shows campaigns relevant to the five landing pages. The $8.9M is full account spend: Search $7.29M + Display $1.59M.

### Flag 6 · LOW RISK — Programs-v7 Search data (index.html only)
**Where:** index.html spend table
**Issue:** $767K / 3,399 conv / $226 per conv. Not in README's top 6 campaigns. Likely from a secondary campaign.
**Clarification:** Not in ELT deck. Verify source if needed.

### Flag 7 · HIGH RISK — GA4 vs Google Ads conversion mismatch
**Where:** Systemic across all slides
**Issue:** Landing page tables use GA4 conversions (all traffic). Cost/conv uses Google Ads conversions (attributed). Example: /request-info-v5 shows 35,498 GA4 conversions but only 3,228 Google Ads DemandGen conversions.
**Clarification:** We use GA4 for page comparison (apples to apples) and Google Ads for cost efficiency. They measure different things. See `paid-source-data.md` Section E.
