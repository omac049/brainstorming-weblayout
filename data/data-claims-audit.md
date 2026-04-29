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

## Slide 8 — Page Content Gap (REVISED Apr 29, 2026)

> **⚠️ MAJOR REVISION:** This slide was completely reworked. The original $29 vs $1,539 cost comparison has been replaced with a GA4 conversion rate comparison (3.01% vs 13.57%) and a content checklist. Reason: $29 Military Display was spam (per Kevin, VP Performance Marketing); PMax conversion action definitions are unclear.

| Claim (REVISED) | Source | Status |
|-------|--------|--------|
| 3.01% conv / 53% bounce (/request-info-v5) | GA4 Landing Page data | MATCH |
| 13.57% conv / 25% bounce (/degree-programs-v7) | GA4 Landing Page data | MATCH |
| 1.18M sessions (v5) | GA4 | MATCH |
| 222K sessions (v7) | GA4: 221,507 | ROUNDED |
| Content checklist (tuition, outcomes, start dates, testimonials, program info) | Manual audit of page content | VERIFIED |
| ~~$29 Military Display~~ | ~~$254,142 / 8,752~~ | **REMOVED — SPAM** |
| ~~$1,539 PMax General~~ | ~~$734,128 / 477~~ | **REMOVED — CONV ACTION UNCLEAR** |
| ~~53x~~ | ~~$1,539.11 / $29.04~~ | **REMOVED** |

**Notes on removed claims:**

1. **$29 was spam.** Per Kevin (VP, Performance Marketing, Apr 29 2026), the Military Display / Google Discovery "conversions" were fraudulent leads. Campaigns have been shut down.
2. **PMax $1,539 has unclear conversion actions.** The "Conversions" column in PMax may track deeper-funnel actions, not form fills. Cannot be compared to other campaign CPLs without matching action definitions.
3. **Replacement framing uses GA4 conversion rates** — these are owned by the web/UX team and do not require Performance Marketing data validation.

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
| ~~PMax $1,539/conv~~ | ~~Google Ads~~ | **REMOVED from ELT deck** |
| Organic down 42–50% | GSC: −41.6% to −49.7% | MATCH (kept) |

---

## Slide 11 — The Pages Need to Sell (REVISED Apr 29, 2026)

> **REVISED:** No longer claims +124K leads. Now frames around content gap (what pages show vs. what they should show) with 7% as working target.

| Claim (REVISED) | Source | Status |
|-------|--------|--------|
| 13.57% is the ceiling (different channel) | GA4: Display traffic to /degree-programs-v7 | MATCH |
| 7% is the working target | Matches Paid Search pages (online-college-courses at 7.25%) | MATCH |
| "3% to 7% doubles conversions" | 1,177,574 × (7% − 3.01%) = ~47K more | MATCH |
| Content checklist items | Manual page audit | VERIFIED |

---

## Slide 12 — Next Steps

| Claim | Source | Status |
|-------|--------|--------|
| 3% → 7%+ RFI conv | Target (not a data claim) | — |
| 53% → <40% bounce | 53.2% is current | MATCH |
| 21 → 1,490+ blog leads | 149K × 1% = 1,490 | MATCH |
| -12pp → <5pp mobile gap | GA4: mobile eng gap (paid) | MATCH |
| "$8.9M to pages that bounce 53%" (notes) | See Flag 3 | FLAG |

---

## Cross-Reference: index.html vs index-v2.html

> **Updated Apr 29, 2026:** index-v2.html (ELT deck) no longer uses CPL comparisons.
> index.html (long-form deck) retains the original data but with correction annotations.

The ELT deck (index-v2.html) now uses **GA4 conversion rate comparisons** (3.01% vs 13.57%) instead of Google Ads CPL.
The long-form deck (index.html) retains the original spend table with **strikethrough and correction notes** on the Military Display and PMax rows.

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

### Flag 4 · ~~MEDIUM RISK~~ **RESOLVED** — $29 and 53x removed from ELT deck
**Where:** Formerly Slide 8 (now completely rewritten)
**Resolution (Apr 29, 2026):** Per Kevin (VP, Performance Marketing), the $29 Military Display CPL was based on spam conversions. Campaigns have been shut down. PMax conversion action definitions are also unclear. Both figures removed from index-v2.html. index.html retains them with correction annotations. ELT deck now uses GA4 conversion rates (3.01% vs 13.57%) which are owned data.

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
