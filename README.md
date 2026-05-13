# Project Groundwork — UAGC Site Experience Audit & Layout Review

**Date:** April 8, 2026
**Property:** sc-domain:uagc.edu
**Data Window:** April 8, 2025 – April 8, 2026 (12 months)
**Data Sources:** Google Search Console, Google Analytics 4

---

## 1. Site-Wide Performance Summary (12 Months)

### Google Search Console — Organic Search

| Metric | Value |
|--------|-------|
| Total Clicks | 1,730,192 |
| Total Impressions | 165,793,149 |
| Average CTR | 1.04% |
| Average Position | 15.0 |

### GA4 — All Traffic

| Metric | Value |
|--------|-------|
| Total Sessions | ~11.1M |
| Total Conversions | 348,285 |
| Site-wide Engagement Rate | ~47.5% |
| Site-wide Bounce Rate | ~52.5% |

### Device Split (GA4, 12 Months)

| Device | Sessions | % Share | Engagement Rate | Bounce Rate | Conversions |
|--------|----------|---------|-----------------|-------------|-------------|
| Mobile | 6,683,870 | 59.9% | 45.8% | 54.2% | 236,018 |
| Desktop | 4,280,092 | 38.4% | 51.4% | 48.6% | 107,718 |
| Tablet | 175,806 | 1.6% | 44.6% | 55.4% | 4,546 |

**Key Finding:** Mobile dominates traffic (60%) but has the lowest engagement rate and highest bounce rate. Desktop users engage 12% better. Any reskin must prioritize mobile-first above-the-fold and RFI experience.

### Channel Mix — Session New Channel Grouping (2025)

| Channel | Sessions | Eng. Rate | Bounce Rate | Conversions | Page Views |
|---------|----------|-----------|-------------|-------------|------------|
| Direct | 2,004,404 | 49.4% | 50.6% | 48,139 | 6,717,533 |
| Paid Social | 1,910,315 | 42.1% | 57.9% | 53,320 | 2,890,715 |
| Paid Search | 1,692,667 | 60.7% | 39.3% | 77,518 | 3,893,903 |
| Organic Search | 1,574,358 | 64.4% | 35.6% | 27,741 | 3,602,929 |
| Unassigned | 1,294,633 | 9.4% | 90.6% | 44,931 | 4,999,805 |
| Cross-network | 1,009,405 | 42.8% | 57.2% | 17,792 | 1,333,576 |
| Display | 707,254 | 64.4% | 35.6% | 59,640 | 1,710,050 |
| Referral | 372,750 | 64.6% | 35.4% | 10,460 | 1,072,977 |
| Organic Social | 156,220 | 57.9% | 42.1% | 4,267 | 292,492 |
| CTV | 102,757 | 43.5% | 56.5% | 2,839 | 207,418 |
| Audio | 75,007 | 33.7% | 66.3% | 37 | 101,612 |
| AI Traffic | 21,458 | 61.3% | 38.7% | 535 | 43,271 |
| Google Discovery | 19,637 | 21.9% | 78.1% | 97 | 35,486 |
| Email | 13,828 | 63.4% | 36.6% | 560 | 65,605 |

**Key Findings:**
- **Paid Search is the top converter** (77,518 conversions) with strong 60.7% engagement — paid landing pages work but have room to improve.
- **Display performs surprisingly well** — 64.4% engagement and 59,640 conversions from 707K sessions. The Display-to-conversion path is effective.
- **Paid Social is the second-largest channel** (1.91M sessions) but only 42.1% engagement and 57.9% bounce. Social landing pages need attention.
- **Organic Search and Referral** have the best engagement (~64%), validating SEO content investment.
- **AI Traffic** is emerging at 21K sessions with 61.3% engagement — worth monitoring as this channel grows.
- **Unassigned still has 1.29M sessions at 90.6% bounce** — likely tracking/tagging gaps that need investigation.
- **CTV** (102K sessions) shows connected TV campaign reach with moderate engagement (43.5%).

### Monthly Trend (GA4)

| Month | Sessions | Conversions | Eng. Rate | Bounce Rate |
|-------|----------|-------------|-----------|-------------|
| Apr 2025 | 695,715 | 23,911 | 54.7% | 45.3% |
| May 2025 | 770,568 | 32,370 | 62.9% | 37.1% |
| Jun 2025 | 869,478 | 35,665 | 54.2% | 45.8% |
| Jul 2025 | 784,980 | 36,387 | 54.6% | 45.4% |
| Aug 2025 | 919,542 | 45,306 | 53.8% | 46.2% |
| Sep 2025 | 1,168,443 | 43,759 | 43.4% | 56.6% |
| Oct 2025 | 1,286,149 | 36,110 | 38.0% | 62.0% |
| Nov 2025 | 1,072,170 | 17,661 | 37.1% | 62.9% |
| Dec 2025 | 669,505 | 17,760 | 47.8% | 52.2% |
| Jan 2026 | 955,453 | 23,530 | 49.9% | 50.1% |
| Feb 2026 | 670,963 | 17,041 | 55.4% | 44.6% |
| Mar 2026 | 1,087,003 | 18,785 | 42.6% | 57.4% |

**Key Finding:** Sessions spike Sep–Oct (enrollment pushes) but engagement rate drops to 38% — more traffic, worse quality. Peak conversion months are Jun–Aug. The gap between traffic volume and conversion quality in peak months is a layout/UX problem worth investigating.

---

## 1B. Frustration Analysis (Contentsquare — Site Level)

**Data Window:** April 2–8, 2026
**Source:** Contentsquare — 99th percentile frustration score, all devices, all users

### Frustration Score Trend

| Date | Score |
|------|-------|
| Apr 2 | 45 |
| Apr 3 | 44 |
| Apr 4 | 42 |
| Apr 5 | 43 |
| Apr 6 | 46 |
| Apr 7 | 45 |
| Apr 8 | 45 |

**Average frustration score: 44/100** — consistently elevated across the week.

### Most Impactful Frustration Factors (by sessions)

| Frustration Factor | Sessions |
|---|---|
| Page not consumed | 35,823 |
| Page looping | 21,792 |
| Element – Multiple clicks | 9,748 |
| Excessive hover | 5,274 |
| Rage click | 4,518 |
| Button – Multiple clicks | 2,945 |
| Field – Multiple clicks | 1,393 |

**Key Findings:**
- **"Page not consumed" is the #1 frustration factor** (35,823 sessions) — users land on pages but never engage with the content. This directly validates the 53% bounce on `/success/request-info-v5` and the above-the-fold concern.
- **"Page looping"** (21,792 sessions) — users navigate in circles, unable to find what they need. Signals an information architecture problem and/or unclear conversion paths.
- **Rage clicks** (4,518 sessions) and **Multiple button clicks** (2,945 sessions) — users repeatedly click non-responsive or confusing elements, particularly in the application funnel.

### Rage Click — Top Pages

| Path | Page Views |
|------|-----------|
| /apply-now | 1,839 |
| /s/enrollment-agreement | 887 |
| /s/ | 837 |
| /s/app2a-prior-education-and-experience | 698 |
| /success/online-programs-v8 | 276 |
| /s/AP3-ProgramInterest | 240 |
| / (homepage) | 149 |

### Excessive Hover — Top Pages

| Path | Page Views |
|------|-----------|
| /apply-now | 3,986 |
| /s/ | 494 |
| /s/app2a-prior-education-and-experience | 487 |
| /s/enrollment-agreement | 396 |
| /s/AP3-ProgramInterest | 303 |
| /success/online-programs-v7 | 256 |
| / (homepage) | 243 |

### Button — Multiple Clicks — Top Pages

| Path | Page Views |
|------|-----------|
| /s/enrollment-agreement | 1,207 |
| /apply-now | 1,187 |
| /s/app2a-prior-education-and-experience | 1,044 |
| /s/ | 873 |
| /s/AP3-ProgramInterest | 461 |
| /s/app5b-payment-options | 256 |
| /s/app04-militaryaffiliations | 113 |

**Critical Insight:** The `/s/` application funnel pages (enrollment agreement, prior education, program interest, payment options) appear in every frustration category. These are deep-funnel pages where motivated applicants are encountering friction. Combined with the `/apply-now` page topping both rage click and excessive hover lists, the application flow itself is a significant source of user frustration. This isn't just a landing page problem — it extends into the conversion funnel.

**Implications for the Reskin:**
- The application funnel (`/s/*` pages) needs UX audit alongside the marketing pages
- `/apply-now` generates the most rage clicks AND excessive hovers — the form experience is broken
- "Page not consumed" at 35K sessions/week maps directly to the bounce rate problem
- "Page looping" at 21K sessions/week suggests navigation and IA improvements are needed
- Button and field multiple-click patterns indicate unclear interactive elements or slow response times

---

## 2. Areas of Concern — Data-Backed Analysis

### 2A. White Space

**What the data says:**
- The homepage (`/`) has 1.3M page views but a 43.3% bounce rate — better than average, but 43% of visitors still leave without engaging.
- `/online-degrees` has an 88.8% engagement rate and only 11.2% bounce — this page keeps visitors. Its layout/density should be the benchmark.
- `/tuition-financial-aid` has an 88.0% engagement rate — another strong performer.
- Paid landing pages like `/success/programs/liberal-arts-v6` (61.3% bounce) and `/success/programs/criminal-justice-v6` (72.8% bounce) show that certain program-level pages are losing visitors immediately.

**Audit directive:** Compare the layout density and white space patterns of high-engagement pages (`/online-degrees`, `/tuition-financial-aid`) versus high-bounce pages (`/success/programs/*`). The high-bounce program pages may have too much or poorly structured white space that fails to guide the eye.

### 2B. Above the Fold

**What the data says:**
- `/success/request-info-v5` is the primary RFI landing page: 1.18M sessions, **53.2% bounce** — over half of paid traffic leaves without engaging. Paid Social drives 869K of these sessions at 54.2% bounce.
- The homepage as a landing page: 1.15M sessions, 47.2% bounce — middling. Direct traffic (603K sessions) bounces at 53%, while Organic Search visitors (292K sessions) engage much better at 64.7%.
- `/success/degree-types/bachelors-degrees-v5`: 458K landing sessions, 56.9% bounce — Cross-network traffic (203K sessions) bounces at 71.5%, while Paid Search (140K) is better at 42%.
- `/success/programs/liberal-arts-v6` from Paid Social: 72K sessions, **68.4% bounce**. The social-to-landing-page experience is broken for this program.

**Audit directive:** Screenshot `/success/request-info-v5` on mobile (375px) and desktop (1440px). Document exactly what loads in the first viewport. The 53% bounce on 1.18M sessions means ~627K paid visitors leave immediately. Is the value proposition clear before the form? Does the landing page match the ad creative?

### 2C. Chat Widget Placement

**What the data says:**
- Mobile engagement is consistently 6–12 percentage points lower than desktop across all major pages. Paid Social on mobile: 1.78M sessions at 41.2% engagement (vs. 51.3% on desktop). Chat widget overlap on small screens is a likely contributor.
- `/success/request-info-v5` on mobile: 720K sessions, 45.7% engagement — the mobile experience on the primary RFI page is worse than desktop.
- `/success/degree-programs-v7` on mobile: 77.3% engagement — one of the best-performing paid pages on mobile. Worth checking if chat placement differs here.
- Paid Search on mobile: 1.1M sessions at 57.8% engagement (vs. 67.2% desktop) — a 9.4pp gap that chat overlay could partly explain.

**Audit directive:** Map chat widget position on mobile for the top 5 paid landing pages. Check for CTA/form occlusion at common viewport sizes (375×667, 390×844, 414×896).

### 2D. "UAGC" Usage in Page Copy

**What the data says (GSC query analysis — organic):**

| Query Pattern | Clicks (12mo) | Impressions |
|---------------|---------------|-------------|
| "uagc" (exact/variants) | 102,926 | 255,018 |
| "university of arizona global campus" | 53,386 | 172,083 |
| "ashford university" (legacy) | 15,052 | 121,451 |
| "arizona global campus" | 10,549 | 40,601 |

- "UAGC" as a search term drives 103K organic clicks — it is the established brand abbreviation in search behavior.
- "University of Arizona Global Campus" drives 53K organic clicks — the full name is searched roughly half as often organically.
- "Ashford University" still drives 15K clicks — legacy brand awareness persists.
- The homepage ranks #1 for "uagc" with 53,467 clicks.

**Important counterpoint — Paid Search tells a different story (source: Kevin, VP Performance Marketing, Jan–Mar 2026):**

| Campaign (Brand) | Spend | Leads | CPL | Apps | CPA |
|------------------|-------|-------|-----|------|-----|
| university of arizona global campus | $139,607 | 1,859 | **$75** | 409 | $342 |
| uagc | $104,199 | 738 | $141 | 240 | $434 |
| ashford university | $39,691 | 394 | $101 | 45 | $890 |
| **Totals** | **$283,497** | **2,991** | **$95** | **693** | **$409** |

- In paid search, "University of Arizona Global Campus" delivers **2.5x more leads at half the CPL** ($75 vs $141) compared to "UAGC."
- The organic GSC data showing "UAGC" as the top brand term likely reflects **student/staff navigational searches** (portal logins, returning users), not prospective student behavior.
- Performance Marketing has been deliberately emphasizing "University of Arizona" in advertising — the parent brand carries trust and authority with prospects who don't yet know UAGC.
- The paid data is more representative of **prospective student** behavior; the organic data reflects **existing community** behavior.

**Revised audit directive:** The organic vs. paid distinction matters for copy strategy:
- **Prospect-facing copy** (landing pages, ads, above-the-fold): Lead with "University of Arizona Global Campus" — the parent brand sells. The paid data ($75 CPL vs $141) validates this approach.
- **Returning/enrolled audience copy** (navigation, student portal, SEO meta): "UAGC" is fine as the familiar shorthand — that's how existing students and staff navigate.
- **SEO strategy:** Use the full "University of Arizona Global Campus" in H1s and meta titles for authority. "UAGC" can appear in body copy for readability. Do not over-index on the organic volume of "UAGC" — that volume is largely navigational, not conversion-intent.

### 2E. Lightcast Placement

**What the data says:**
- `/online-degrees` (where Lightcast data likely appears for outcomes/salary): 88.8% engagement, 706s avg session, 3,428 conversions from 135K sessions. Strong performance.
- `/online-degrees/business`: 85.8% engagement, 447s avg session, 7,709 conversions. Also strong.
- `/online-degrees/masters`: 89.9% engagement, 492s avg session, 2,206 conversions. Excellent.
- The program pages with Lightcast data keep visitors 7–12 minutes on average — much higher than pages without it.

**Audit directive:** If Lightcast modules are only on organic program pages, consider adding them to paid `/success/` landing pages where engagement is lower. The data suggests Lightcast content correlates with significantly higher time-on-page and conversion rates.

### 2F. RFI Page Experience & Conversion Gap

**What the data says:**

*Note: `/apply-now` (cloud.mail.uagc.edu) is an off-domain application page, not part of the main uagc.edu site. Excluded from this analysis.*

| Page (Landing) | Sessions | Conversions | Conv. Rate | Bounce | Primary Channel |
|------|----------|-------------|------------|--------|-----------------|
| /success/request-info-v5 | 1,177,574 | 35,498 | 3.01% | 53.2% | Paid Social (869K) |
| /success/online-college-courses-v5 | 262,257 | 19,005 | 7.25% | 25.5% | Paid Search (220K) |
| /success/degree-programs-v7 | 221,507 | 30,066 | 13.57% | 25.1% | Display (220K) |
| /success/online-programs-v7 | 192,742 | 8,725 | 4.53% | 28.7% | Paid Search (158K) |
| /success/online-programs-v8 | 191,658 | 9,437 | 4.92% | 31.9% | Display (191K) |
| /s/app7-enrollment-agreement-intro | 105,216 | 68,745 | 65.3% | 27.4% | Deep funnel |
| /request-information-processing | 96,053 | 12,381 | 12.89% | 45.2% | Funnel mid-step |

**RFI Form Structure (verified manually, Apr 2026):**

`/success/request-info-v5` has **3 visible RFI touchpoints:**
1. **Sticky CTA bar** — persistent "Request information →" button at bottom of viewport
2. **Above-fold multi-step form** — already uses a two-step model (Step 1: Area of Interest → Step 2: full fields)
3. **Mid-page form** — full RFI form appearing after content sections

CTA buttons throughout the page anchor to the mid-page form rather than being separate forms. The form count and structure are reasonable — the conversion problem lies elsewhere.

**Key Findings:**
- **4.5x conversion gap** between `/success/request-info-v5` (3.01%) and `/success/degree-programs-v7` (13.57%) — but **most of this gap is explained by channel mix** (Paid Social vs. Display), not page quality alone.
- The primary RFI page gets 1.18M sessions (mostly Paid Social) but 53% bounce — that's ~627K paid visitors leaving immediately.
- `/success/online-college-courses-v5` (Paid Search traffic) converts at 7.25% with 74.5% engagement — this is a more realistic benchmark for what enriched pages can achieve from intent-based traffic.
- The enrollment agreement page (`/s/app7-enrollment-agreement-intro`) at 65.3% conversion confirms deep-funnel visitors are committed.

> **⚠️ A/B TEST RESULT (Nov 2025, source: Kevin / Kanahoma):**
> Performance Marketing tested the exact premise of sending Meta traffic to the content-rich page instead of request-info-v5:
> - **Old LP** (request-info-v5): **$37 CPI**, 234 inquiries
> - **New LP** (online-programs-v7): **$40 CPI**, 194 inquiries
>
> Result: The simpler, form-forward page won on Meta traffic (8% lower CPI, not statistically significant). Key learnings:
> - Meta audiences responded better to a page built for **one action** rather than browsing
> - The old LP's strengths: emotional hero imagery, early form visibility, minimal distractions, shorter length
> - The new LP's strengths: modern layout, scannable value props, credibility elements
>
> **Recommendation (Kanahoma):** A **hybrid page** that keeps v5's conversion focus (emotional hero, visible form, single CTA, minimal exits) while adding v7's trust elements (3–4 scannable value props, credibility callouts, brief testimonial). Not more content — better content placed strategically.

**Revised root cause hypothesis:** The 4.5x gap is primarily channel mix (cold Paid Social vs warmer Display). For Meta traffic specifically, form prominence and emotional simplicity outperform content depth. The opportunity is not "replace v5 with v7" — it's a hybrid that reduces the 53% bounce through trust and credibility elements without adding the browsing friction that hurt v7 on Meta.

**Revised audit directive:** Design a hybrid landing page per the Kanahoma recommendation. Validate with A/B test on Meta traffic (primary source). Success = lower bounce AND maintained/improved CPI. The 7% target (matching Paid Search pages) may be achievable for Search/Display traffic, but Meta traffic may have a lower ceiling due to intent differences.

---

## 3. Top Organic Pages to Review

Identified by GSC clicks + GA4 engagement data (12 months). Split by intent: **program/navigation pages** (visitors evaluating UAGC) vs. **blog/content pages** (visitors researching topics).

### 3A. Program & Navigation Pages

These pages serve visitors who are actively considering UAGC or navigating the site. They have **conversion intent** — the visitor is evaluating whether to request information or apply.

#### Homepage — uagc.edu/

| Metric | GSC | GA4 |
|--------|-----|-----|
| Clicks | 142,563 | — |
| Impressions | 14,863,344 | — |
| CTR | 0.96% | — |
| Avg Position | 16.7 | — |
| Sessions (GA4) | — | 1,316,750 |
| Landing Sessions | — | 1,154,175 |
| Engagement Rate | — | 56.7% |
| Bounce Rate | — | 43.3% |
| Conversions | — | 23,133 |
| Conv. Rate | — | 2.0% |
| Avg Session Duration | — | 810s (13.5 min) |

**Top search queries driving this page:**

| Query | Clicks | Position |
|-------|--------|----------|
| uagc | 53,467 | 1.0 |
| university of arizona global campus | 33,795 | 1.1 |
| ashford university | 9,770 | 1.3 |
| arizona global campus | 6,638 | 1.0 |
| the university of arizona global campus | 5,500 | 1.0 |

**Intent:** Brand navigation — visitors already know UAGC and are arriving to explore. 96% of clicks come from branded queries.

**Review focus:** Above-the-fold content, brand clarity, CTA prominence, chat widget position, white space balance. 43% bounce on branded traffic means nearly half of people who searched for UAGC specifically still leave without engaging — the homepage isn't meeting their expectations.

---

#### Online Degrees — uagc.edu/online-degrees

| Metric | GSC | GA4 |
|--------|-----|-----|
| Clicks | 15,098 | — |
| Impressions | 2,520,994 | — |
| CTR | 0.60% | — |
| Avg Position | 8.0 | — |
| Sessions (GA4) | — | 135,507 |
| Landing Sessions | — | 58,916 |
| Engagement Rate | — | **88.8%** |
| Bounce Rate | — | **11.2%** |
| Conversions | — | **3,428** |
| Conv. Rate | — | **5.82%** |
| Avg Session Duration | — | 706s (11.8 min) |

**Top search queries:**

| Query | Clicks | Position |
|-------|--------|----------|
| university of arizona global campus | 4,261 | 1.7 |
| uagc | 2,933 | 1.4 |
| arizona global campus | 765 | 1.3 |
| ashford university | 746 | 2.5 |
| uagc programs | 377 | 1.1 |

**Intent:** Program exploration — visitors are browsing degree options. Also heavily branded queries, suggesting this is a key navigation stop in the enrollment journey.

**Review focus:** This is the **gold standard page**. 88.8% engagement, 11.2% bounce, 3,428 conversions, 12-minute avg sessions, 5.82% conversion rate. What makes it work:
- Clear program navigation by category (visitors can self-select their area of interest)
- Likely: Lightcast data integration showing career outcomes and salaries
- Appropriate content depth before the form — visitors feel informed before acting
- The reskin must replicate these patterns across every underperforming page

**Program pages summary:**

| Page | Sessions | Eng. Rate | Bounce | Conv. Rate | Conversions |
|------|----------|-----------|--------|------------|-------------|
| Homepage / | 1,316,750 | 56.7% | 43.3% | 2.0% | 23,133 |
| /online-degrees | 135,507 | **88.8%** | **11.2%** | **5.82%** | 3,428 |

The `/online-degrees` page engages 32pp better and converts 3x better than the homepage. The difference is content specificity — `/online-degrees` helps visitors self-identify their program, while the homepage tries to serve everyone.

---

### 3B. Blog / Content Pages

These pages serve visitors who are **researching topics**, not evaluating UAGC. They arrive from informational queries ("what is a PhD", "how to write a business plan") and have **no conversion intent** when they land. The opportunity is to convert informational intent into enrollment interest through contextual CTAs.

**The pattern across all blog pages:** Exceptional engagement (8–15 min avg sessions, 63–68% engagement) but near-zero conversions (0.01–0.08% conversion rate). The content works. The funnel from content to enrollment doesn't exist.

#### Blog: What's the Difference Between a PhD and a Doctorate?

| Metric | GSC | GA4 |
|--------|-----|-----|
| Clicks | 60,937 | — |
| Impressions | 9,133,252 | — |
| CTR | 0.67% | — |
| Avg Position | 7.1 | — |
| Sessions (GA4) | — | 153,299 |
| Landing Sessions | — | 148,831 |
| Engagement Rate | — | 67.8% |
| Bounce Rate | — | 32.2% |
| Conversions | — | **21** |
| Conv. Rate | — | **0.01%** |
| Avg Session Duration | — | 487s (8.1 min) |

**Top search queries:**

| Query | Clicks | Position |
|-------|--------|----------|
| phd meaning | 15,336 | 3.5 |
| what does phd stand for | 4,929 | 4.1 |
| doctorate vs phd | 2,238 | 3.0 |
| phd vs doctorate | 1,811 | 3.1 |
| what is a phd | 1,419 | 4.3 |

**Intent:** Informational — visitors are learning about doctoral degrees. They don't know UAGC exists yet.

**Review focus:** 149K sessions reading about doctoral degrees for 8+ minutes, and only 21 convert. The missing piece: a contextual CTA that bridges "I'm learning about PhDs" to "UAGC offers a doctoral program." This needs an in-content module like: *"Considering a doctoral degree? Explore UAGC's Doctor of Education program →"* with a direct link to the doctoral program page. Even a 1% conversion rate = **1,490 leads/year** vs. the current 21.

---

#### Blog: How to Write a Business Plan Step by Step

| Metric | GSC | GA4 |
|--------|-----|-----|
| Clicks | 24,413 | — |
| Impressions | 17,885,063 | — |
| CTR | 0.14% | — |
| Avg Position | 10.9 | — |
| Sessions (GA4) | — | (not in top 50) |
| Landing Sessions | — | 74,663 |
| Engagement Rate | — | 63.0% |
| Bounce Rate | — | 37.0% |
| Conversions | — | **63** |
| Conv. Rate | — | **0.08%** |
| Avg Session Duration | — | 883s (14.7 min) |

**Top search queries:**

| Query | Clicks | Position |
|-------|--------|----------|
| business plan | 3,725 | 10.8 |
| business plan template | 575 | 1.4 |
| components of a business plan | 312 | 3.0 |
| how to write a business plan | 219 | 4.8 |
| elements of a business plan | 218 | 2.6 |

**Intent:** Informational — visitors are writing a business plan. Many may be entrepreneurs or professionals, not students. However, some are students or career-changers who could be converted.

**Review focus:** 17.9M impressions, 75K sessions, 14.7-min avg duration — this is UAGC's strongest content piece by engagement time. 63 conversions (0.08%) is marginally better than the PhD blog but still leaves massive opportunity. The CTA should bridge to business degree programs: *"Want to turn your business idea into a career? Explore UAGC's business degree programs →"*. Even a 0.5% rate = **373 leads/year** vs. 63. Note: the 0.14% CTR on 17.9M impressions suggests the SERP snippet could be improved — this page is getting shown but not clicked.

---

#### Blog: 5 Principles of Great Management

| Metric | GSC | GA4 |
|--------|-----|-----|
| Clicks | 19,384 | — |
| Impressions | 4,048,845 | — |
| CTR | 0.48% | — |
| Avg Position | 7.3 | — |
| Landing Sessions | — | (not in top 30 landing pages) |

**Intent:** Informational — visitors searching for management principles. Likely students, professionals, or new managers.

**Review focus:** Good SEO position (7.3) and 4M impressions. Likely shares the same conversion gap as other blog pages. The CTA should bridge to management or MBA-adjacent degree programs. Audit for: is there any CTA at all? Does it link to UAGC's management degree page?

---

**Blog content pages summary:**

| Page | GSC Clicks | Sessions | Avg Time | Conversions | Conv. Rate | Opportunity (at 1%) |
|------|-----------|----------|----------|-------------|------------|---------------------|
| PhD vs Doctorate | 60,937 | 148,831 | 8.1 min | 21 | 0.01% | **1,490** |
| Business Plan | 24,413 | 74,663 | 14.7 min | 63 | 0.08% | **747** |
| 5 Principles Mgmt | 19,384 | ~20K est. | — | ~0 | ~0% | **200** |
| **Total** | **104,734** | **~243K** | | **84** | **0.03%** | **~2,437** |

These three blog pages alone represent **243K engaged sessions with 84 total conversions**. At even 1% conversion, that's **2,437 additional leads per year** — from content that already exists and already ranks. The only missing ingredient is a contextual CTA that connects the content topic to a relevant UAGC degree program.

---

## 4. Top 5 Paid Landing Pages to Review

Identified by GA4 landing page sessions for `/success/` pages (12 months). **Now enriched with Google Ads spend data** (8 accounts: Search, Display, DemandGen, plus vertical accounts for Education, Business Tech, Liberal Arts, HHS, Doctoral Studies, and General).

### Google Ads Account Structure

| Account | Type | 12-Month Spend | Top Channel |
|---------|------|---------------|-------------|
| UAGC - Search | Paid Search | $7.29M | Search, Performance Max |
| UAGC - Display | Display/DemandGen/Video | $1.59M | DemandGen, Display, YouTube, CTV |
| UAGC – Business Tech | Vertical Search | Vertical | Search |
| UAGC – Education | Vertical Search | Vertical | Search |
| UAGC – Liberal Arts | Vertical Search | Vertical | Search |
| UAGC – HHS | Vertical Search | Vertical | Search |
| UAGC – Doctoral Studies | Vertical Search | Vertical | Search |
| UAGC – General | General | General | Search |

### Awareness Spend — $243K with 0 Conversions

**Critical context for /success/request-info-v5 session counts:** A significant portion of traffic to this page comes from awareness campaigns that are not designed to convert:

| Campaign | Channel | Impressions | Spend | Conversions |
|----------|---------|-------------|-------|-------------|
| YouTube TV Prospecting 2026 | Video | 1.6M | $89,084 | 0 |
| Premier CTV Prospecting 2026 | Video | 17.5M | $101,741 | 0 |
| YouTube Audio Prospecting | Video | 46.4M | $52,459 | 0 |
| **Total Awareness** | | **65.5M impressions** | **$243,284** | **0** |

This inflates the session count and deflates the conversion rate for `/request-info-v5` in GA4. When evaluating this page's 3.01% conversion rate, the awareness-driven traffic must be considered separately.

---

### Paid Page 1: /success/request-info-v5

| Metric | GA4 Value | Google Ads Value |
|--------|-----------|-----------------|
| Landing Sessions (GA4) | 1,177,574 | — |
| Clicks (Google Ads – DemandGen) | — | 165,351 |
| Impressions (Google Ads – DemandGen) | — | 6.6M |
| **Ad Spend (DemandGen Prospecting)** | — | **$563,803** |
| **Ad Spend (Awareness: YT/CTV/Audio)** | — | **$243,284** |
| **Total Display Account Spend to this page** | — | **~$807K** |
| Engagement Rate | 46.8% | — |
| Bounce Rate | 53.2% | — |
| Conversions (GA4) | 35,498 | — |
| Conversions (Google Ads – DemandGen) | — | 3,228 |
| Conv. Rate (from landing) | 3.01% | — |
| CTR (Google Ads) | — | 2.49% |
| Avg CPC (Google Ads) | — | $3.41 |
| Cost per Conversion (Google Ads) | — | $174.68 |

**Device Split:**
- Mobile: 720K sessions (landing), 45.7% engagement, 30,042 conversions
- Desktop: (remainder), higher engagement

**Review focus:** Primary RFI landing page. 53% bounce means over half of paid traffic leaves without engaging. The Google Ads data reveals ~$807K in Display/DemandGen/Awareness spend is directed here, with $243K producing zero conversions (awareness channels). The DemandGen prospecting campaigns convert at $174.68/lead — reasonable for higher ed — but the page itself underperforms vs. content-rich alternatives. Mobile performance is worse. Above-the-fold content must match the ad creative that drove the click.

---

### Paid Page 2: /success/degree-types/bachelors-degrees-v5

| Metric | GA4 Value | Google Ads Value |
|--------|-----------|-----------------|
| Landing Sessions (GA4) | 458,070 | — |
| Clicks (Google Ads – Search) | — | 131,277 |
| Impressions (Google Ads – Search) | — | 5.15M |
| **Ad Spend (Search)** | — | **$1,407,229** |
| Engagement Rate | 43.1% | — |
| Bounce Rate | 56.9% | — |
| Conversions (GA4) | 16,013 | — |
| Conversions (Google Ads – Search) | — | 2,739 |
| Conv. Rate (from landing) | 3.50% | — |
| CTR (Google Ads) | — | 2.55% |
| Avg CPC (Google Ads) | — | $10.72 |
| Cost per Conversion (Google Ads) | — | **$513.71** |

**Review focus:** **$1.4M in search spend** with only 2,739 Google Ads conversions = $513.71/conversion. This is the second-highest spend landing page in the Search account. 57% bounce rate and $514 cost per conversion demand urgent attention. The page is about bachelor's degrees broadly — does it match the ad copy? Compare layout to `/online-degrees` (88.8% engagement for similar content at zero ad cost).

---

### Paid Page 3: /success/military-v5

| Metric | GA4 Value | Google Ads Value |
|--------|-----------|-----------------|
| Landing Sessions (GA4) | 310,713 | — |
| Clicks (Google Ads – Display) | — | 98,531 (prospecting) + 12,051 (remarketing) |
| **Ad Spend (Display Prospecting)** | — | **$254,142** |
| **Ad Spend (DemandGen Prospecting)** | — | **$243,255** |
| **Ad Spend (Display Remarketing)** | — | **$47,658** |
| **Total Spend to this page** | — | **~$545K** |
| Engagement Rate | 52.9% | — |
| Bounce Rate | 47.1% | — |
| Conversions (GA4) | 9,551 | — |
| Conversions (Google Ads – Display prospecting) | — | 8,752 |
| Cost per Conversion (Display prospecting) | — | ~~**$29.04**~~ **DATA CORRECTION BELOW** |
| Cost per Conversion (Display remarketing) | — | $87.44 |
| CTR (Display prospecting) | — | 29.28% |

> **⚠️ DATA CORRECTION (Apr 29, 2026 — source: Kevin, VP Performance Marketing):**
> The $29.04 CPL figure for Military Display / Google Discovery prospecting was based on **spam conversions** that have since been identified and the campaigns shut down. This number should NOT be used as a benchmark or cited in presentations. The 8,752 "conversions" were not legitimate leads.
>
> The military page still shows strong engagement (52.9%) and GA4 conversion metrics (9,551 conversions in GA4), suggesting the page content and audience targeting are sound — but the Google Ads CPL figure is invalid.

**Review focus:** The military page demonstrates strong audience-specific engagement (52.9% engagement rate, well above the generic RFI page's 47%). The audience-specific content + targeted ads approach is directionally correct, but the cost-per-lead claims require validation with clean data from Performance Marketing. Do NOT cite the $29 figure.

---

### Paid Page 4: /success/online-college-courses-v5

| Metric | GA4 Value | Google Ads Value |
|--------|-----------|-----------------|
| Landing Sessions (GA4) | 262,257 | — |
| Clicks (Google Ads – Search) | — | 129,306 |
| Impressions (Google Ads – Search) | — | 3.06M |
| **Ad Spend (Search)** | — | **$1,640,681** |
| Engagement Rate | 74.5% | — |
| Bounce Rate | 25.5% | — |
| Conversions (GA4) | 19,005 | — |
| Conversions (Google Ads – Search) | — | 3,901 |
| Conv. Rate (from landing) | 7.25% | — |
| CTR (Google Ads) | — | 4.22% |
| Avg CPC (Google Ads) | — | $12.69 |
| Cost per Conversion (Google Ads) | — | **$420.62** |

**Review focus:** **Highest search spend at $1.64M** but also one of the best-performing pages (7.25% conv, 74.5% engagement). $420.62/conversion is high but manageable given the engagement quality. This page proves content-rich landing pages justify higher CPCs through better conversion rates. Use as the paid page benchmark alongside `/online-degrees` for organic.

---

### Paid Page 5: /success/degree-programs-v7

| Metric | GA4 Value | Google Ads Value |
|--------|-----------|-----------------|
| Landing Sessions (GA4) | 221,507 | — |
| Clicks (Google Ads – Search) | — | Primarily Display (220K sessions via GA4) |
| Engagement Rate | 74.9% | — |
| Bounce Rate | 25.1% | — |
| Conversions (GA4) | 30,066 | — |
| Conv. Rate (from landing) | 13.57% | — |
| Avg Session Duration | 536s (8.9 min) | — |

**Review focus:** Highest converting paid page at 13.6% — nearly 5x the average. 30,066 conversions from 222K sessions. This page has a **program category browser** that lets visitors explore specific degrees before filling out the form. This is the model for the reskin — the content between the forms is the differentiator.

---

### Google Ads — Top Search Campaigns by Spend

| Campaign | Type | Clicks | Spend | Conversions | Cost/Conv |
|----------|------|--------|-------|-------------|-----------|
| Non-Brand USP General | Search | 78,057 | $1,679,157 | 2,988 | $561.92 |
| Non-Brand Bachelor's | Search | 86,138 | $1,344,039 | 2,743 | $490.01 |
| Non-Brand General | Search | 46,980 | $953,016 | 1,510 | $631.01 |
| Performance Max General | PMax | 482,735 | $734,128 | 477 | **$1,539.11** |
| Business Tech Master's | Search | 33,772 | $589,136 | 925 | $636.56 |
| Brand (UAGC Core) | Search | 79,244 | $447,547 | 2,968 | **$150.81** |

**Key findings from Google Ads data:**
- **Brand search is 4x more efficient** than non-brand ($150.81 vs. $490–$632/conversion). Brand protection is working.
- **Performance Max shows high cost per conversion**: 482K clicks, $734K spend, 477 conversions = $1,539/conversion. However, **context is needed** — PMax "Conversions" may include only deeper-funnel conversion actions (not form fills), and the metric definition may differ from other campaign types. Defer to Performance Marketing for the accurate read on PMax efficiency.
- ~~**Military Display is the standout**: $29.04/conversion~~ — **CORRECTED: These were spam conversions (source: Kevin, VP Performance Marketing, Apr 2026). Campaigns shut down. Do not cite.**
- **DemandGen Gen Prospecting** (Display account): $712K spend, 3,329 conversions, $214/conv — reasonable for top-of-funnel, but the video/awareness extensions ($243K) produce nothing.

> **⚠️ NOTE ON CPL FIGURES:** Per Kevin (VP, Performance Marketing), headline "Conversions" in Google Ads include only conversion actions marked for that metric. For lead counts and cost-per-lead, use per-conversion-action data (e.g., LFS/LSF Leads) or agreed CRM/lead definitions. Do not treat headline conversions ÷ spend as CPL without confirming which actions are in the column.

---

## 5. Half-Year Trend Comparison (GSC)

Period 1: Apr 8, 2025 – Oct 7, 2025
Period 2: Oct 8, 2025 – Apr 8, 2026

| Page | P1 Clicks | P2 Clicks | Change | % Change |
|------|-----------|-----------|--------|----------|
| student.uagc.edu/ | 211,207 | 168,802 | -42,405 | -20.1% |
| login.uagc.edu/ | 137,299 | 56,296 | -81,003 | -59.0% |
| www.uagc.edu/ | 90,004 | 52,559 | -37,445 | -41.6% |
| myuagc.uagc.edu/ | 0 | 107,485 | +107,485 | New |
| Writing Center (thesis-generator) | 61,289 | 41,772 | -19,517 | -31.8% |
| Blog (5 principles of management) | 12,901 | 6,483 | -6,418 | -49.7% |

**Key Findings:**
- Homepage organic clicks dropped 41.6% in the second half — possible ranking loss or seasonal decline.
- `myuagc.uagc.edu` is new and took over from `login.uagc.edu` (which dropped 59%) — this is a portal migration, not a traffic loss.
- Writing Center content is declining (-31.8%) — possible SERP competition or AI overview cannibalization.
- Blog content is trending down across multiple posts (-49.7% for management article).

---

## 6. Case Studies for Benchmarking

### Case Study 1: Empire State University (Online University)
**Source:** [iFactory](https://www.ifactory.com/higher-education-web-design/empire-state-university/)
**Launched:** 2025

**Context:** Fully online university (SUNY Empire) redesigned website to support transition from hybrid to all-online.

**Results:**
- 25% increase in undergraduate enrollment YoY
- 41% increase in graduate students YoY
- 3x increase in RFI form fills

**Relevant Tactics:**
- **Two-step RFI form:** Step 1 collects bare minimum to capture the lead. Step 2 (optional) gathers detailed info. Reduced friction dramatically.
- **Accessibility-first UX:** No default motion (user-activated). Clear, unambiguous copy. Small digestible steps for program selection.
- **Personalized content:** Triggered by location and browsing behavior. Military, union, and adult learner messaging tailored per audience.
- **Responsive design:** Adapts across device sizes with easy CMS editing.

**UAGC Application:** UAGC already uses a two-step form on `/success/request-info-v5`, so the form structure itself isn't the gap. The more applicable Empire State lesson is **personalization** — tailoring content by audience segment (military, civilian, transfer). The personalization approach could help segment landing page experiences by intent. The no-motion-by-default approach is worth considering for accessibility.

---

### Case Study 2: University of Texas at Tyler (State University)
**Source:** [Carnegie Higher Ed](https://www.carnegiehighered.com/case-studies/university-of-texas-tyler/)

**Context:** Mid-size public university with dense, difficult-to-navigate website that obscured key information.

**Results:**
- +700% increase in RFI form conversions
- +64% increase in apply button clicks
- +83% increase in organic visibility/impressions
- +200% increase in organic clicks/traffic
- +8% increase in engagement rate on optimized program pages

**Relevant Tactics:**
- **Information architecture overhaul:** Clear hierarchy encouraging exploration and steering audiences toward decision-relevant information.
- **Program Finder:** Showcased full degree breadth in one navigable location.
- **Student profiles and personalization:** First-hand perspective on campus life and career outcomes.
- **Content strategy:** 150 optimized pages at launch. Structured program pages with outcomes and alumni stories.
- **dotCOMM Gold Award winner.**

**UAGC Application:** The IA restructuring and Program Finder concept directly address white space and above-the-fold concerns. UAGC's `/online-degrees` page (88.8% engagement) already does some of this well — the reskin should expand this pattern. The +700% RFI conversion improvement shows what's possible with page content and experience changes — the same lever UAGC needs to pull on `/request-info-v5`.

---

### Case Study 3: DTC Gourmet Chocolate Company (E-commerce)
**Source:** [Radiant Elephant](https://www.radiantelephant.com/e-commerce-cro-seo-case-study/)

**Context:** Premium e-commerce brand with strong product and marketing channels, but a website that wasn't converting.

**Results:**
- 311% conversion rate increase (to 3.6%)
- 559% more purchases
- 440% YoY revenue growth
- Google Ads ROAS: 4x → 11x (no ad changes)
- 118% organic traffic increase

**Relevant Tactics (directly applicable to UAGC):**
- **5-second test:** Can a visitor answer "Where am I? What can I do here? Why should I do it?" in the first viewport? UAGC's `/success/request-info-v5` page (53.2% bounce on 1.18M paid sessions) may fail this test for Paid Social traffic.
- **Above-the-fold CTA visibility:** The e-commerce site's add-to-cart button was hidden below the fold. UAGC's RFI forms may have the same problem on mobile.
- **Value proposition placement:** Differentiators existed but weren't communicated at conversion points. UAGC's strengths (UA brand, accreditation, tuition promise) may be similarly buried.
- **Reducing decision paralysis:** 12 shipping options → 3. UAGC's multiple landing page paths (/success/request-info-v5 vs. /success/degree-programs-v7 vs. various program pages) may create similar paralysis in ad routing strategy.
- **Design contrast:** Product photography blended into the background. UAGC should ensure CTAs and forms have strong visual contrast against the page.
- **Every channel multiplied:** When the website converts better, every traffic source (paid, organic, email, social) becomes more profitable without changing spend.

**UAGC Application:** The CRO-first approach (audit before redesign) should be adopted. The 5-second test should be applied to every page in review — particularly `/success/request-info-v5` (53% bounce on 1.18M paid sessions). The principle that generic pages underperform content-rich pages directly maps to the 4.5x conversion gap between the generic RFI page and the program-specific pages.

---

## 7. Critical Findings & Reskin Priorities

### Priority 1: Fix /success/request-info-v5 (Critical)
- 1.18M sessions, 53.2% bounce, 3.01% conversion rate — primary paid RFI landing page
- ~627K paid visitors bounce immediately (mostly Paid Social traffic)
- Compare against `/success/degree-programs-v7` which converts at 13.57% — a 4.5x gap

### Priority 2: Convert Blog Traffic
- PhD blog: 149K landing sessions, 68% engagement, **21 conversions**
- Business plan blog: 75K sessions, 63% engagement, **63 conversions**
- These pages attract and engage visitors but capture nearly zero leads
- Blog-to-RFI pathway is broken or nonexistent

### Priority 3: Mobile-First Above the Fold
- 60% of all traffic is mobile
- Mobile bounce is consistently 6–12pp higher than desktop
- Chat widget overlap, RFI form placement, and viewport utilization on mobile are urgent

### Priority 4: Enrich RFI Page Content
- `/success/degree-programs-v7` converts at 13.6% with program-specific content — model this
- `/success/request-info-v5` converts at 3.0% with generic content — 4.5x worse despite similar form structure
- Add program-specific value propositions, outcomes data, and social proof around existing forms
- The page already uses a two-step form — the gap is the content between the forms, not the forms themselves

### Priority 5: Replicate Best-Performing Layouts
- `/online-degrees` (organic): 88.8% engagement, 11.2% bounce
- `/success/online-college-courses-v5` (paid): 74.5% engagement, 7.25% conv rate
- `/success/degree-programs-v7` (paid): 74.9% engagement, 13.6% conv rate
- Document what these pages do differently and apply to underperformers

### Priority 6: Address Declining Organic Performance
- Homepage organic clicks down 41.6% H1→H2
- Writing Center content down 31.8%
- Blog content down 49.7%
- Investigate AI overview cannibalization and SERP competition

---

## 8. Audit Checklist (Per Page)

### First Viewport / Above the Fold
- [ ] Value proposition visible without scrolling
- [ ] Primary CTA visible and unobstructed
- [ ] Passes the 5-second test (Where am I? What can I do? Why should I?)
- [ ] Hero image/visual adds narrative value
- [ ] Brand presence clear ("UAGC" + University of Arizona affiliation)
- [ ] Chat widget does not overlap CTA or form
- [ ] Header + hero fit within initial mobile viewport (375×667)

### White Space & Layout
- [ ] Section padding consistent with `/online-degrees` benchmark
- [ ] White space guides hierarchy (not creating dead zones)
- [ ] Content density appropriate for page intent
- [ ] Mobile spacing scales proportionally
- [ ] No orphaned elements in excessive empty space

### Copy & Brand Voice
- [ ] "UAGC" used as primary brand reference (2x search volume vs full name)
- [ ] Full "University of Arizona Global Campus" used in H1/meta for SEO
- [ ] No legacy "Ashford" references (15K searches still use it — redirect strategy needed?)
- [ ] Headlines scannable, one job per section
- [ ] No filler or repeated messaging

### RFI / Conversion Points
- [ ] Number of RFI touchpoints on page: ___ (verified: /request-info-v5 has 3 — sticky bar, above-fold 2-step form, mid-page form)
- [ ] Primary RFI visually dominant with clear value proposition above it
- [ ] Program-specific content surrounds forms (not generic copy)
- [ ] Social proof visible near primary form (testimonials, outcomes data, accreditation)
- [ ] Form placement aligns with user intent at scroll depth
- [ ] RFI present on blog/content pages (currently nearly absent)

### Lightcast Integration
- [ ] Lightcast data on program pages correlates with higher engagement
- [ ] Module positioned near program details or career outcomes
- [ ] Consider adding to paid `/success/` pages (currently likely absent)
- [ ] Data presentation is scannable

### Chat Widget
- [ ] Position mapped on desktop and mobile for each page
- [ ] Does not occlude RFI forms
- [ ] Does not overlap primary CTA
- [ ] Accessible but not aggressive
- [ ] Does not compete with primary conversion path

---

## 9. Next Steps

### Phase 1: Audit & Document (Week of Apr 14)

| # | Action | Owner | Deliverable |
|---|--------|-------|-------------|
| 1 | Full-page screenshots of all 10 pages (desktop 1440px + mobile 375px) | S | Screenshot library in shared folder |
| 2 | Audit RFI page content across top 10 pages — what content surrounds the forms, is it program-specific or generic, where is social proof placed | UX / Dev | RFI content audit spreadsheet |
| 3 | Document chat widget position per page — screenshot overlays showing occlusion on mobile viewports (375×667, 390×844) | UX | Annotated screenshot deck |
| 4 | Side-by-side structural comparison: `/success/degree-programs-v7` (13.57% conv) vs. `/success/request-info-v5` (3.01% conv) — what's different in content depth, program specificity, social proof, and value prop placement (form structure is similar) | UX / Content | Comparison document |
| 5 | Review Contentsquare frustration data for `/s/*` application funnel pages — identify specific rage-click elements and broken interactions | UX / Analytics | Frustration findings report |
| 6 | Competitive landscape review — capture RFI flows, mobile UX, and page structure from SNHU, WGU, CSU Global, UT Tyler, and Empire State University | UX / Content | Competitor comparison doc with screenshots |
| 7 | Industry benchmark notes — collect cited benchmarks for online higher-ed conversion rates, RFI completion, mobile UX, page speed, and form expectations | Analytics / UX | Benchmark reference doc with citations |
| 8 | Subdomain & hidden path inventory — catalog subdomains, Salesforce/cloud pages, campaign pages, thank-you pages, and hidden lead paths beyond uagc.edu | Analytics / Dev | Path inventory spreadsheet with tracking gap flags |
| 9 | Online Programs v8 exit-path review — pull GA4 next-page-path and exit data, identify top exit destinations, compare to v7/v5 patterns | Analytics | v8 exit-path analysis |
| 10 | Post-RFI thank-you / confirmation review — screenshot and audit the post-submit experience from each major form entry point, document next-step messaging and dead-end patterns | UX / Content | Post-RFI UX audit with gap list |

**Phase 1 outcome:** Complete picture of what each page looks like, where friction lives, what the best-performing pages do differently, and whether UAGC friction points are internal page issues, market expectation gaps, or tracking/journey gaps outside the main domain.

### Phase 2: Quick Wins (Week of Apr 21)

| # | Action | Expected Impact | Effort |
|---|--------|-----------------|--------|
| 1 | Enrich `/success/request-info-v5` with program-specific content, social proof, and value props (model after /degree-programs-v7) | Close the 4.5x conversion gap; target: bounce from 53% → 40% | Medium |
| 2 | Add contextual CTA to PhD blog linking to doctoral programs page | Capture even 1% of 149K sessions = 1,490 leads vs. current 21 | Low |
| 3 | Add contextual CTA to business plan blog linking to business degree page | Capture even 1% of 75K sessions = 750 leads vs. current 63 | Low |
| 4 | A/B test enriched vs. current /request-info-v5 page content (forms stay the same, page content changes) | Isolate content vs. form as the conversion variable | Medium |
| 5 | Audit `/apply-now` for rage-click causes — identify non-responsive elements and slow interactions | Reduce 1,839 rage-click sessions; improve application completion rate | Medium |

**Phase 2 outcome:** Measurable improvements on highest-impact pages before the full reskin begins. These are changes that don't require a redesign — they require removing friction.

### Phase 3: Reskin Requirements (Week of Apr 28)

| # | Action | Deliverable |
|---|--------|-------------|
| 1 | Synthesize Phase 1 audit findings into reskin requirements document with priority tiers (P0/P1/P2) | Requirements doc |
| 2 | Define layout patterns to replicate from `/online-degrees` (88.8% eng.) and `/degree-programs-v7` (13.57% conv) | Pattern library / wireframes |
| 3 | Establish mobile-first above-the-fold requirements: what must be visible before scroll on 375px viewport | Mobile viewport spec |
| 4 | Define RFI page content strategy: what program content, social proof, and value props must surround the existing form structure | RFI content strategy doc |
| 5 | Propose Lightcast module integration for paid `/success/` pages (currently only on organic program pages; correlated with 7–12 min sessions) | Lightcast integration plan |
| 6 | Address Paid Social landing page experience — 1.91M sessions at 42% engagement; define ad-to-page intent matching rules | Paid landing page brief |
| 7 | Present Phase 2 quick-win results to validate approach before full reskin investment | Results readout |

**Phase 3 outcome:** A prioritized, data-backed requirements document that the design and dev teams can build from — informed by quick-win test results.

### Success Metrics

| Metric | Current | Target | Source |
|--------|---------|--------|--------|
| /request-info-v5 conversion rate | 3.01% | 7%+ (matching /college-courses-v5) | GA4 |
| /request-info-v5 bounce rate | 53.2% | <40% | GA4 |
| Blog-to-lead conversion rate | 0.01% (21 conv / 149K sessions) | 1%+ | GA4 |
| Mobile engagement gap vs. desktop | -12pp | <5pp | GA4 |
| Frustration score (Contentsquare) | 44/100 | <30/100 | Contentsquare |
| Application funnel rage clicks | 4,518 sessions/week | <1,000 sessions/week | Contentsquare |
| RFI page content score | Generic copy, no program-specific content | Program-specific value props + social proof on every RFI page | Manual audit |
