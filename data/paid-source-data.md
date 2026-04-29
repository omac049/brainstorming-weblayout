# Paid Data — Source of Truth

> **Property:** uagc.edu
> **Data Window:** Apr 8 2025 – Apr 8 2026 (12 months)
> **Sources:** Google Ads (8 accounts) · Google Analytics 4
> **Updated:** April 2026

Every number in the ELT deck and presenter notes traces back here.
If something here doesn't match the platform, the presentation needs fixing.

---

## A. Google Ads Account Summary

### Total 12-month spend: **$8.88M** (≈ $8.9M)

    Search account   $7.29M   (Paid Search + Performance Max)
    Display account   $1.59M   (DemandGen + Display + YouTube + CTV)
    ─────────────────────────
    Total             $8.88M

Six vertical accounts (Business Tech, Education, Liberal Arts, HHS,
Doctoral Studies, General) are **not broken out** in the source data.
If the full total is higher, it likely includes those.

---

## B. Campaign-Level Data (Google Ads)

### Search Account — top 6 by spend

    Campaign                     Type      Clicks     Spend         Conv    $/Conv
    ─────────────────────────────────────────────────────────────────────────────────
    Non-Brand USP General        Search     78,057   $1,679,157    2,988   $561.92
    Non-Brand Bachelor's         Search     86,138   $1,344,039    2,743   $490.01
    Non-Brand General            Search     46,980     $953,016    1,510   $631.01
    Performance Max General      PMax      482,735     $734,128      477   $1,539.11
    Business Tech Master's       Search     33,772     $589,136      925   $636.56
    Brand (UAGC Core)            Search     79,244     $447,547    2,968   $150.81
    ─────────────────────────────────────────────────────────────────────────────────
    Subtotal (top 6)                       806,926   $5,747,023   11,611

These six total **$5.75M** of the $7.29M Search account.
The remaining ~$1.54M is in campaigns not listed.

### Display / DemandGen / Video Account — key campaigns

    Campaign                       Channel      Spend       Conv    $/Conv    Landing Page
    ────────────────────────────────────────────────────────────────────────────────────────
    DemandGen Prospecting (RFI)    DemandGen    $563,803    3,228   $174.68   /request-info-v5
    Military Display Prospecting   Display      $254,142    8,752    $29.04   /military-v5  ⚠️ SPAM — SEE CORRECTION
    Military DemandGen Prosp.      DemandGen    $243,255       —        —     /military-v5
    YouTube TV Prospecting 2026    Video         $89,084       0        —     /request-info-v5
    Premier CTV Prospecting 2026   Video        $101,741       0        —     /request-info-v5
    YouTube Audio Prospecting      Video         $52,459       0        —     /request-info-v5
    Military Display Remarketing   Display       $47,658      545   $87.44   /military-v5
    ────────────────────────────────────────────────────────────────────────────────────────
    Subtotal (listed)                         $1,352,142

Listed campaigns total ~$1.35M of the $1.59M Display account.

### Awareness campaigns — $243K, zero conversions

    YouTube TV Prospecting      1.6M impressions     $89,084     0 conv
    Premier CTV Prospecting    17.5M impressions    $101,741     0 conv
    YouTube Audio Prosp.       46.4M impressions     $52,459     0 conv
    ────────────────────────────────────────────────────────────────
    Total                      65.5M impressions    $243,284     0 conv

These inflate the session count on /request-info-v5 and deflate its GA4 conversion rate.

---

## C. Landing Page Performance (GA4)

Source: GA4 landing page report. Includes **all traffic** to each page, not just Google Ads.

### Top 5 paid landing pages

    Page                          Sessions    Eng %   Bounce %   Conv %   Conversions
    ──────────────────────────────────────────────────────────────────────────────────
    /success/request-info-v5      1,177,574   46.8%    53.2%     3.01%     35,498
    /success/.../bachelors-v5       458,070   43.1%    56.9%     3.50%     16,013
    /success/military-v5            310,713   52.9%    47.1%     3.07%      9,551
    /success/.../courses-v5         262,257   74.5%    25.5%     7.25%     19,005
    /success/degree-programs-v7     221,507   74.9%    25.1%    13.57%     30,066

### GA4 vs Google Ads conversions — why the numbers differ

    Page                    GA4 Conversions    Google Ads Conv         Gap       Why
    ───────────────────────────────────────────────────────────────────────────────────
    /request-info-v5            35,498          3,228 (DemandGen)    32,270    GA4 includes all channels
    /bachelors-v5               16,013          2,739 (Search)       13,274    Cross-network adds 203K sessions
    /military-v5                 9,551          8,752 (Display)         799    Closest match — Display dominates
    /courses-v5                 19,005          3,901 (Search)       15,104    GA4 includes all channels
    /degree-programs-v7         30,066          Not broken out           —     Primarily Display traffic

### Total identified ad spend per page

    /request-info-v5     ~$807K    DemandGen $564K + Awareness $243K
    /bachelors-v5        $1,407K   Non-Brand Bachelor's Search
    /military-v5         ~$545K    Display $254K + DemandGen $243K + Remarketing $48K
    /courses-v5          $1,641K   Courses Search
    /degree-programs-v7  $767K     Programs-v7 Search

---

## D. Channel Mix (GA4)

### Paid channels

    Channel          Sessions     Eng %    Bounce %   Conversions   Page Views
    ──────────────────────────────────────────────────────────────────────────────
    Paid Social      1,910,315    42.1%     57.9%       53,320      2,890,715
    Paid Search      1,692,667    60.7%     39.3%       77,518      3,893,903
    Cross-network    1,009,405    42.8%     57.2%       17,792      1,333,576
    Display            707,254    64.4%     35.6%       59,640      1,710,050
    CTV                102,757    43.5%     56.5%        2,839        207,418
    Audio               75,007    33.7%     66.3%           37        101,612
    ──────────────────────────────────────────────────────────────────────────────
    Total Paid       5,497,405                         211,146

### How the ELT deck simplifies it (Slide 3 bar chart)

    Presentation label     →   Source channel      Conversions used    Eng % used
    Paid Search                Paid Search          77.5K (77,518)     61% (60.7%)
    Display                    Display              59.6K (59,640)     64% (64.4%)
    Paid Social                Paid Social          53.3K (53,320)     42% (42.1%)
    Organic                    Organic Search       27.7K (27,741)     64% (64.4%)

---

## E. Attribution Explainer

### Why GA4 and Google Ads show different numbers

    Platform       What it counts                                    Use case
    ─────────────────────────────────────────────────────────────────────────────
    GA4            All conversions on a page, any traffic source      Page analysis
    Google Ads     Only conversions attributed to an ad click         Cost efficiency

### Concrete example: /request-info-v5

- **GA4:** 35,498 conversions — from Paid Social, Cross-network, Direct, DemandGen, and every other channel. Measures the page.
- **Google Ads DemandGen:** 3,228 conversions — only those attributed to DemandGen ad clicks. Measures the campaign.
- **The 32,270 gap** = all the other traffic sources (Paid Social alone sends 869K sessions).

### What the presentations use and why

    Data point                                       Source         Why
    ──────────────────────────────────────────────────────────────────────────────
    Sessions, bounce, engagement, conv rate           GA4           Page experience, all visitors
    Spend, cost/conv, CPC                             Google Ads    Campaign cost efficiency
    Top 5 page table                                  GA4           Apples-to-apples page comparison
    3.01% vs 13.57% conversion gap                     GA4           Page experience comparison (replaced $29 vs $1,539 in ELT deck)
    $8.9M total spend                                 Google Ads    Account-level totals
    Channel bars (77.5K, 59.6K, etc.)                 GA4           Channel-level view

### Common questions about the data

**"The conversion numbers don't match Google Ads."**
> Correct. Landing page tables use GA4, which counts all conversions regardless of traffic source. Google Ads only counts its attributed conversions. Both accurate — different measures.

**"The total spend doesn't add up from the campaign table."**
> The campaign table shows top campaigns (~$5.6M). The $8.9M comes from account totals: Search $7.29M + Display $1.59M. Remaining spend is in smaller campaigns and vertical accounts.

**"Military Display at $29/conv doesn't account for all spend to that page."**
> ⚠️ **CORRECTED (Apr 29, 2026):** Per Kevin (VP, Performance Marketing), the Military Display / Google Discovery $29.04 CPL was based on **spam conversions**. These campaigns have been shut down. The 8,752 "conversions" were not legitimate leads. **Do NOT cite this figure.**

**"PMax at $1,539 might include different conversion actions."**
> ⚠️ **FLAGGED (Apr 29, 2026):** Per Kevin, PMax "Conversions" may track only deeper-funnel conversion actions, not form fills. The $1,539.11 = $734,128 / 477 from Google Ads, but the conversion action definitions may differ from other campaign types. Defer to Performance Marketing for the accurate read on PMax efficiency. Removed from ELT deck as a direct claim.

---

## F. Quick Reference — Numbers by Slide

**Slide 1 — Title**
- $8.9M ad spend ← $7.29M + $1.59M = $8.88M (Section A)
- 11.1M sessions ← GA4 site-wide
- 348K conversions ← GA4 348,285
- 627K bouncing ← rhetorical estimate, not exact math

**Slide 2 — 4.5x Gap**
- 3.01% from 1.18M sessions ← /request-info-v5 GA4 (Section C)
- 13.57% ← /degree-programs-v7 GA4 (Section C)
- 4.5x ← 13.57 / 3.01 = 4.51x

**Slide 3 — Scale**
- 47.5% engagement ← GA4 site-wide
- 60% mobile / 45.8% eng ← GA4 device split
- 51.4% desktop eng ← GA4 device split
- Channel bars ← GA4 channel mix (Section D)

**Slide 5 — System-Wide Gap**
- All five rows ← GA4 landing page data (Section C)
- 47K additional leads ← 1,177,574 × (7% − 3.01%) = 46,993

**Slide 7 — Declining Organic**
- −41.6% Homepage ← GSC: 90,004 → 52,559
- −31.8% Writing Center ← GSC: 61,289 → 41,772
- −49.7% Blog (Mgmt) ← GSC: 12,901 → 6,483

**Slide 8 — Page Content Gap (REVISED Apr 29, 2026)**
- 3.01% conv / 53% bounce ← /request-info-v5 GA4 (Section C)
- 13.57% conv / 25% bounce ← /degree-programs-v7 GA4 (Section C)
- Content checklist: tuition, outcomes/Lightcast, start dates, testimonials, program info
- ~~$29 / 8,752 conv~~ ← REMOVED: spam (per Kevin, VP Perf. Marketing)
- ~~$1,539 / 477 conv~~ ← REMOVED: conversion action definitions unclear
- ~~53x~~ ← REMOVED: based on invalid comparison

**Slide 11 — The Pages Need to Sell (REVISED Apr 29, 2026)**
- 13.57% ceiling ← /degree-programs-v7 GA4 (different channel — Display)
- 7% working target ← matches /online-college-courses-v5 Paid Search (7.25%)
- "3% to 7% doubles conversions" ← 1,177,574 × (7% − 3.01%) = ~47K more
- ~~+124K~~ ← REMOVED from ELT deck (assumed 13.57% achievable; unrealistic given channel mix)
