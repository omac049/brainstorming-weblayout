#!/usr/bin/env python3
"""Pull monthly lead-funnel detail per program."""

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
    MONTHLY_WINDOW,
    OUTPUT_DIR,
    ensure_output_dir,
    get_client,
)

QUERY = f"""
SELECT
  program_id,
  program_name,
  degree_level,
  FORMAT_DATE('%Y-%m', inquiry_date) AS month,
  COUNT(*) AS leads,
  SUM(is_app_started) AS app_starts,
  SUM(is_app_submitted) AS app_submitted,
  SUM(is_appin) AS decisions,
  SUM(is_new_enrollment_final) AS enrollments
FROM `{BQ_VIEW}`
WHERE degree_level IN UNNEST(@degree_levels)
  AND inquiry_date >= @monthly_start
  AND inquiry_date < @monthly_end
GROUP BY program_id, program_name, degree_level, month
ORDER BY program_id, month
"""


def pct(numerator: float, denominator: float) -> float | None:
    if not denominator:
        return None
    return round(numerator / denominator * 100, 2)


def month_metrics(row: dict) -> dict:
    leads = int(row["leads"])
    app_starts = int(row["app_starts"])
    decisions = int(row["decisions"])
    enrollments = int(row["enrollments"])
    return {
        "month": row["month"],
        "leads": leads,
        "app_starts": app_starts,
        "app_submitted": int(row["app_submitted"]),
        "decisions": decisions,
        "enrollments": enrollments,
        "app_start_pct": pct(app_starts, leads),
        "decision_pct": pct(decisions, leads),
        "enrollment_pct": pct(enrollments, leads),
    }


def build_level_payload(rows: list[dict], degree_level: str) -> dict:
    by_program: dict[tuple, dict] = {}

    for row in rows:
        if row["degree_level"] != degree_level:
            continue
        key = (row["program_id"], row["program_name"], row["degree_level"])
        if key not in by_program:
            by_program[key] = {
                "program_id": row["program_id"],
                "program_name": row["program_name"],
                "degree_level": row["degree_level"],
                "months": [],
            }
        by_program[key]["months"].append(month_metrics(row))

    programs = list(by_program.values())
    for program in programs:
        program["months"].sort(key=lambda item: item["month"])

    programs.sort(
        key=lambda item: sum(month["enrollments"] for month in item["months"]),
        reverse=True,
    )
    return {"programs": programs}


def main() -> None:
    ensure_output_dir()

    client = get_client()
    job_config = bigquery.QueryJobConfig(
        query_parameters=[
            bigquery.ArrayQueryParameter("degree_levels", "STRING", list(DEGREE_LEVELS)),
            bigquery.ScalarQueryParameter("monthly_start", "DATE", MONTHLY_WINDOW["start"]),
            bigquery.ScalarQueryParameter("monthly_end", "DATE", MONTHLY_WINDOW["end"]),
        ]
    )

    print("Querying BigQuery for monthly lead-funnel detail...")
    rows = [dict(row) for row in client.query(QUERY, job_config=job_config).result()]
    print(f"Fetched {len(rows)} aggregated rows")

    payload = {
        "pulled_at": datetime.now(timezone.utc).isoformat(),
        "window": MONTHLY_WINDOW,
        "source": BQ_VIEW,
        "undergraduate": build_level_payload(rows, "Undergraduate"),
        "graduate": build_level_payload(rows, "Graduate"),
    }

    output_path = OUTPUT_DIR / "monthly_detail.json"
    output_path.write_text(json.dumps(payload, indent=2), encoding="utf-8")
    print(f"Wrote {output_path}")

    for level_key in ("undergraduate", "graduate"):
        programs = payload[level_key]["programs"]
        total_enrollments = sum(
            sum(month["enrollments"] for month in program["months"]) for program in programs
        )
        print(f"  {level_key}: {len(programs)} programs / {total_enrollments:,} enrollments")


if __name__ == "__main__":
    main()
