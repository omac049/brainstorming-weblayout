#!/usr/bin/env python3
"""Pull program-level lead-funnel aggregates for primary and prior windows."""

from __future__ import annotations

import json
import sys
from datetime import datetime, timezone
from pathlib import Path

from google.cloud import bigquery

sys.path.insert(0, str(Path(__file__).resolve().parent))
from lead_funnel_config import (  # noqa: E402
    BQ_VIEW,
    DEGREE_LEVELS,
    OUTPUT_DIR,
    PRIMARY_WINDOW,
    PRIOR_WINDOW,
    ensure_output_dir,
    get_client,
)

QUERY = f"""
SELECT
  program_id,
  program_name,
  degree_level,
  CASE
    WHEN inquiry_date >= @primary_start AND inquiry_date < @primary_end THEN 'primary'
    WHEN inquiry_date >= @prior_start AND inquiry_date < @prior_end THEN 'prior'
  END AS window_label,
  COUNT(*) AS leads,
  SUM(is_app_started) AS app_starts,
  SUM(is_app_submitted) AS app_submitted,
  SUM(is_appin) AS decisions,
  SUM(is_new_enrollment_final) AS enrollments
FROM `{BQ_VIEW}`
WHERE degree_level IN UNNEST(@degree_levels)
  AND (
    (inquiry_date >= @primary_start AND inquiry_date < @primary_end)
    OR (inquiry_date >= @prior_start AND inquiry_date < @prior_end)
  )
GROUP BY program_id, program_name, degree_level, window_label
"""


def pct(numerator: float, denominator: float) -> float | None:
    if not denominator:
        return None
    return round(numerator / denominator * 100, 2)


def vs_prior_pct(primary: float, prior: float) -> float | None:
    if not prior:
        return None
    return round((primary - prior) / prior * 100, 2)


def window_metrics(row: dict | None) -> dict:
    if not row:
        return {
            "leads": 0,
            "app_starts": 0,
            "app_submitted": 0,
            "decisions": 0,
            "enrollments": 0,
            "decision_pct": None,
            "enrollment_pct": None,
        }
    leads = int(row["leads"])
    decisions = int(row["decisions"])
    enrollments = int(row["enrollments"])
    return {
        "leads": leads,
        "app_starts": int(row["app_starts"]),
        "app_submitted": int(row["app_submitted"]),
        "decisions": decisions,
        "enrollments": enrollments,
        "decision_pct": pct(decisions, leads),
        "enrollment_pct": pct(enrollments, leads),
    }


def sum_metrics(programs: list[dict], window_key: str) -> dict:
    totals = {
        "leads": 0,
        "app_starts": 0,
        "app_submitted": 0,
        "decisions": 0,
        "enrollments": 0,
    }
    for program in programs:
        window = program[window_key]
        for key in totals:
            totals[key] += window[key]
    totals["decision_pct"] = pct(totals["decisions"], totals["leads"])
    totals["enrollment_pct"] = pct(totals["enrollments"], totals["leads"])
    return totals


def build_level_payload(rows: list[dict], degree_level: str) -> dict:
    by_program: dict[tuple, dict] = {}
    for row in rows:
        if row["degree_level"] != degree_level or not row["window_label"]:
            continue
        key = (row["program_id"], row["program_name"], row["degree_level"])
        if key not in by_program:
            by_program[key] = {"primary": None, "prior": None}
        by_program[key][row["window_label"]] = row

    programs = []
    for (program_id, program_name, level), windows in by_program.items():
        primary = window_metrics(windows["primary"])
        prior = window_metrics(windows["prior"])
        programs.append(
            {
                "program_id": program_id,
                "program_name": program_name,
                "degree_level": level,
                "primary": primary,
                "prior": prior,
                "vs_prior_pct": vs_prior_pct(primary["enrollments"], prior["enrollments"]),
            }
        )

    programs.sort(key=lambda item: item["primary"]["enrollments"], reverse=True)
    return {
        "total": sum_metrics(programs, "primary"),
        "programs": programs,
    }


def main() -> None:
    ensure_output_dir()

    client = get_client()
    job_config = bigquery.QueryJobConfig(
        query_parameters=[
            bigquery.ArrayQueryParameter("degree_levels", "STRING", list(DEGREE_LEVELS)),
            bigquery.ScalarQueryParameter("primary_start", "DATE", PRIMARY_WINDOW["start"]),
            bigquery.ScalarQueryParameter("primary_end", "DATE", PRIMARY_WINDOW["end"]),
            bigquery.ScalarQueryParameter("prior_start", "DATE", PRIOR_WINDOW["start"]),
            bigquery.ScalarQueryParameter("prior_end", "DATE", PRIOR_WINDOW["end"]),
        ]
    )

    print("Querying BigQuery for program lead-funnel aggregates...")
    rows = [dict(row) for row in client.query(QUERY, job_config=job_config).result()]
    print(f"Fetched {len(rows)} aggregated rows")

    payload = {
        "pulled_at": datetime.now(timezone.utc).isoformat(),
        "primary_window": PRIMARY_WINDOW,
        "prior_window": PRIOR_WINDOW,
        "source": BQ_VIEW,
        "undergraduate": build_level_payload(rows, "Undergraduate"),
        "graduate": build_level_payload(rows, "Graduate"),
    }

    output_path = OUTPUT_DIR / "program_data.json"
    output_path.write_text(json.dumps(payload, indent=2), encoding="utf-8")
    print(f"Wrote {output_path}")

    for level_key in ("undergraduate", "graduate"):
        total = payload[level_key]["total"]
        print(
            f"  {level_key}: {total['leads']:,} leads / "
            f"{total['decisions']:,} decisions / {total['enrollments']:,} enrollments"
        )


if __name__ == "__main__":
    main()
