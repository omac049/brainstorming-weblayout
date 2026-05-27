#!/usr/bin/env python3
"""Pull marketing segment mix per program for the primary lead-funnel window."""

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
    ensure_output_dir,
    get_client,
)
from segment_mapping import (  # noqa: E402
    MARKETING_ROLLUPS,
    PAID_SEGMENT1_VALUES,
    build_segment_sql,
)

MARKETING_ROLLUP_SQL, SEGMENT1_SQL = build_segment_sql()

QUERY = f"""
SELECT
  program_id,
  program_name,
  degree_level,
  {MARKETING_ROLLUP_SQL} AS marketing_rollup,
  {SEGMENT1_SQL} AS segment1,
  COUNT(*) AS leads,
  SUM(is_new_enrollment_final) AS enrollments
FROM `{BQ_VIEW}`
WHERE degree_level IN UNNEST(@degree_levels)
  AND inquiry_date >= @primary_start
  AND inquiry_date < @primary_end
GROUP BY program_id, program_name, degree_level, marketing_rollup, segment1
"""


def empty_rollup_counts() -> dict[str, dict[str, int]]:
    return {rollup: {"leads": 0, "enrollments": 0} for rollup in MARKETING_ROLLUPS}


def empty_paid_segment_counts() -> dict[str, dict[str, int]]:
    return {segment: {"leads": 0, "enrollments": 0} for segment in PAID_SEGMENT1_VALUES}


def pct(numerator: float, denominator: float) -> float | None:
    if not denominator:
        return None
    return round(numerator / denominator * 100, 2)


def build_program_payload(rows: list[dict]) -> list[dict]:
    by_program: dict[tuple, dict] = {}

    for row in rows:
        key = (row["program_id"], row["program_name"], row["degree_level"])
        if key not in by_program:
            by_program[key] = {
                "program_id": row["program_id"],
                "program_name": row["program_name"],
                "degree_level": row["degree_level"],
                "by_marketing_rollup": empty_rollup_counts(),
                "paid_by_segment1": empty_paid_segment_counts(),
                "total_leads": 0,
                "total_enrollments": 0,
                "nav_enrollments": 0,
            }

        program = by_program[key]
        leads = int(row["leads"])
        enrollments = int(row["enrollments"])
        rollup = row["marketing_rollup"]
        segment1 = row["segment1"]

        program["total_leads"] += leads
        program["total_enrollments"] += enrollments

        if rollup in program["by_marketing_rollup"]:
            program["by_marketing_rollup"][rollup]["leads"] += leads
            program["by_marketing_rollup"][rollup]["enrollments"] += enrollments
            if rollup == "Navigational":
                program["nav_enrollments"] += enrollments

        if rollup == "Paid" and segment1 in program["paid_by_segment1"]:
            program["paid_by_segment1"][segment1]["leads"] += leads
            program["paid_by_segment1"][segment1]["enrollments"] += enrollments

    programs = list(by_program.values())
    for program in programs:
        program["navigational_enrollment_pct"] = pct(
            program["nav_enrollments"], program["total_enrollments"]
        )
        del program["nav_enrollments"]

    programs.sort(key=lambda item: item["total_enrollments"], reverse=True)
    return programs


def build_level_payload(rows: list[dict], degree_level: str) -> dict:
    level_rows = [row for row in rows if row["degree_level"] == degree_level]
    programs = build_program_payload(level_rows)

    totals = {
        "leads": sum(program["total_leads"] for program in programs),
        "enrollments": sum(program["total_enrollments"] for program in programs),
        "by_marketing_rollup": empty_rollup_counts(),
        "paid_by_segment1": empty_paid_segment_counts(),
    }
    nav_enrollments = 0
    for program in programs:
        for rollup, counts in program["by_marketing_rollup"].items():
            totals["by_marketing_rollup"][rollup]["leads"] += counts["leads"]
            totals["by_marketing_rollup"][rollup]["enrollments"] += counts["enrollments"]
        for segment, counts in program["paid_by_segment1"].items():
            totals["paid_by_segment1"][segment]["leads"] += counts["leads"]
            totals["paid_by_segment1"][segment]["enrollments"] += counts["enrollments"]
        nav_enrollments += program["by_marketing_rollup"]["Navigational"]["enrollments"]

    totals["navigational_enrollment_pct"] = pct(nav_enrollments, totals["enrollments"])
    return {"total": totals, "programs": programs}


def main() -> None:
    ensure_output_dir()

    client = get_client()
    job_config = bigquery.QueryJobConfig(
        query_parameters=[
            bigquery.ArrayQueryParameter("degree_levels", "STRING", list(DEGREE_LEVELS)),
            bigquery.ScalarQueryParameter("primary_start", "DATE", PRIMARY_WINDOW["start"]),
            bigquery.ScalarQueryParameter("primary_end", "DATE", PRIMARY_WINDOW["end"]),
        ]
    )

    print("Querying BigQuery for marketing mix...")
    rows = [dict(row) for row in client.query(QUERY, job_config=job_config).result()]
    print(f"Fetched {len(rows)} aggregated rows")

    payload = {
        "pulled_at": datetime.now(timezone.utc).isoformat(),
        "window": PRIMARY_WINDOW,
        "source": BQ_VIEW,
        "undergraduate": build_level_payload(rows, "Undergraduate"),
        "graduate": build_level_payload(rows, "Graduate"),
    }

    output_path = OUTPUT_DIR / "marketing_mix.json"
    output_path.write_text(json.dumps(payload, indent=2), encoding="utf-8")
    print(f"Wrote {output_path}")

    for level_key in ("undergraduate", "graduate"):
        total = payload[level_key]["total"]
        print(
            f"  {level_key}: {total['leads']:,} leads / "
            f"{total['enrollments']:,} enrollments"
        )


if __name__ == "__main__":
    main()
