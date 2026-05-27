# Lead funnel data

Internal extracts from BigQuery, aligned with Kevin's program report methodology ([UAGC Program Report](https://kevinseaman-krs.github.io/uagc-program-report/)).

## Overview

Program-level lead funnel metrics for **Undergraduate** and **Graduate** only. Each pull aggregates inquiry-level rows from the lead extract view into JSON files for deck/analysis use: window totals, marketing mix, and monthly series.

**Source:** `advertising-data-mart.inquiries.vw_lead_extract_details`

## Time windows

| Window | Dates (inclusive) | Used by |
|--------|-------------------|---------|
| Primary | Oct 2025 – Mar 2026 | `program_data.json` (primary), `marketing_mix.json` |
| Prior | Apr – Sep 2025 | `program_data.json` (prior / vs-prior) |
| Monthly | Apr 2025 – May 2026 | `monthly_detail.json` |

Window boundaries are half-open in BigQuery (`inquiry_date >= start AND inquiry_date < end`). See `scripts/lead_funnel_config.py`.

## Files

| File | Script | Description |
|------|--------|-------------|
| `program_data.json` | `pull_lead_funnel.py` | Program aggregates for primary + prior windows |
| `marketing_mix.json` | `pull_marketing_mix.py` | Marketing segment mix (primary window only) |
| `monthly_detail.json` | `pull_monthly_detail.py` | Monthly funnel series per program |

### `program_data.json`

Top-level: `pulled_at`, `primary_window`, `prior_window`, `source`, `undergraduate`, `graduate`.

Each degree level has:

- **`total`** — Sum across programs: `leads`, `app_starts`, `app_submitted`, `decisions`, `enrollments`, `decision_pct`, `enrollment_pct`
- **`programs[]`** — Per program: `program_id`, `program_name`, `degree_level`, `primary`, `prior`, `vs_prior_pct`

`primary` / `prior` objects share the same metrics as `total`. `vs_prior_pct` is enrollment change vs prior window (%).

### `marketing_mix.json`

Top-level: `pulled_at`, `window`, `source`, `undergraduate`, `graduate`.

Each degree level has:

- **`total`** — `leads`, `enrollments`, `by_marketing_rollup`, `paid_by_segment1`, `navigational_enrollment_pct`
- **`programs[]`** — Same shape per program, plus `total_leads`, `total_enrollments`, `navigational_enrollment_pct`

| Field | Values |
|-------|--------|
| `by_marketing_rollup` | `Paid`, `Navigational`, `B2B` (each: `leads`, `enrollments`) |
| `paid_by_segment1` | `Display`, `Affiliate`, `Affiliate - Search`, `Non-Brand Search` |

Segment mapping lives in `scripts/segment_mapping.py` (Kevin's rollup rules).

### `monthly_detail.json`

Top-level: `pulled_at`, `window`, `source`, `undergraduate`, `graduate`.

Each degree level has **`programs[]`** with `months[]` entries:

| Field | Description |
|-------|-------------|
| `month` | `YYYY-MM` |
| `leads`, `app_starts`, `app_submitted`, `decisions`, `enrollments` | Counts |
| `app_start_pct`, `decision_pct`, `enrollment_pct` | Conversion % from leads |

## Re-pull

From repo root:

```bash
export GOOGLE_APPLICATION_CREDENTIALS="credentials/advertising-data-mart-ed5790c79962.json"
python3 scripts/pull_lead_funnel.py
python3 scripts/pull_marketing_mix.py
python3 scripts/pull_monthly_detail.py
```

Requires `google-cloud-bigquery` (see `requirements.txt`). Scripts write to this directory and print level totals on success.

## Validation (primary window)

After `pull_lead_funnel.py`, check `program_data.json` totals:

| Level | Leads | Enrollments |
|-------|------:|------------:|
| UG | 149,356 | 2,629 |
| Grad | ~26,400 | 698 |

Current pull (2026-05-27): Grad **26,467** leads / **698** enrollments.

## `degree_level` = "None"

Pulls filter `degree_level IN ('Undergraduate', 'Graduate')`. Rows with `degree_level` **None** are excluded (~**9,299** leads in the primary window per Kevin's methodology)—they do not appear in these files or the program report matrix.
