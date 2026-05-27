"""Kevin's marketing segment mapping for lead-funnel pulls."""

from __future__ import annotations

MARS_SEGMENT_LEGACY_MAP: dict[str, tuple[str, str]] = {
    "AP - Events": ("B2B", "Organic B2B"),
    "AP - Organic": ("B2B", "Organic B2B"),
    "Agg - Tier 1": ("Paid", "Affiliate"),
    "B2B - TPA": ("Paid", "Display"),
    "Call In": ("Navigational", "Organic B2C"),
    "Display - Facebook": ("Paid", "Display"),
    "Display - Other": ("Paid", "Display"),
    "Display - Partner Display": ("Paid", "Affiliate - Search"),
    "EP - Events": ("B2B", "Organic B2B"),
    "EP - Organic": ("B2B", "Organic B2B"),
    "Mil - Outreach": ("Navigational", "Organic B2C"),
    "Organic": ("Navigational", "Organic B2C"),
    "Paid List - No Consent": ("Navigational", "Organic B2C"),
    "Referral": ("Navigational", "Organic B2C"),
    "Search - Generic": ("Paid", "Non-Brand Search"),
    "Search - Tradename": ("Navigational", "Brand - Search"),
    "Unknown": ("Paid", "Display"),
    "oap": ("Navigational", "Organic B2C"),
}

MARKETING_SEGMENT_ROLLUP_MAP: dict[str, tuple[str, str]] = {
    "Affiliate": ("Paid", "Affiliate"),
    "Affiliate - Search": ("Paid", "Affiliate - Search"),
    "Brand - Search": ("Navigational", "Brand - Search"),
    "Display": ("Paid", "Display"),
    "Non Brand - Search": ("Paid", "Non-Brand Search"),
    "Organic": ("Navigational", "Organic B2C"),
}

PAID_SEGMENT1_VALUES = (
    "Display",
    "Affiliate",
    "Affiliate - Search",
    "Non-Brand Search",
)

MARKETING_ROLLUPS = ("Paid", "Navigational", "B2B")


def build_segment_sql() -> tuple[str, str]:
    """Return SQL expressions for marketing_rollup and segment1."""
    mars_cases = "\n".join(
        f"    WHEN '{key}' THEN '{rollup}'"
        for key, (rollup, _) in MARS_SEGMENT_LEGACY_MAP.items()
    )
    mars_segment1_cases = "\n".join(
        f"    WHEN '{key}' THEN '{segment1}'"
        for key, (_, segment1) in MARS_SEGMENT_LEGACY_MAP.items()
    )
    rollup_cases = "\n".join(
        f"    WHEN '{key}' THEN '{rollup}'"
        for key, (rollup, _) in MARKETING_SEGMENT_ROLLUP_MAP.items()
    )
    segment1_cases = "\n".join(
        f"    WHEN '{key}' THEN '{segment1}'"
        for key, (_, segment1) in MARKETING_SEGMENT_ROLLUP_MAP.items()
    )

    marketing_rollup_sql = f"""
COALESCE(
  CASE mars_segment_legacy
{mars_cases}
    ELSE NULL
  END,
  CASE marketing_segment_rollup
{rollup_cases}
    ELSE NULL
  END
)""".strip()

    segment1_sql = f"""
COALESCE(
  CASE mars_segment_legacy
{mars_segment1_cases}
    ELSE NULL
  END,
  CASE marketing_segment_rollup
{segment1_cases}
    ELSE NULL
  END
)""".strip()

    return marketing_rollup_sql, segment1_sql
