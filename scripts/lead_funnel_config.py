"""Shared configuration for lead-funnel BigQuery pull scripts."""

from __future__ import annotations

import os
from pathlib import Path

from google.cloud import bigquery
from google.oauth2 import service_account

REPO_ROOT = Path(__file__).resolve().parent.parent
BQ_PROJECT = "advertising-data-mart"
BQ_VIEW = f"{BQ_PROJECT}.inquiries.vw_lead_extract_details"
DEFAULT_CREDENTIALS = REPO_ROOT / "credentials" / "advertising-data-mart-ed5790c79962.json"
OUTPUT_DIR = REPO_ROOT / "data" / "lead-funnel"

PRIMARY_WINDOW = {"start": "2025-10-01", "end": "2026-04-01"}
PRIOR_WINDOW = {"start": "2025-04-01", "end": "2025-10-01"}
MONTHLY_WINDOW = {"start": "2025-04-01", "end": "2026-06-01"}

DEGREE_LEVELS = ("Undergraduate", "Graduate")


def credentials_path() -> Path:
    return Path(os.environ.get("GOOGLE_APPLICATION_CREDENTIALS", str(DEFAULT_CREDENTIALS)))


def get_client() -> bigquery.Client:
    """Return an authenticated BigQuery client using the resolved credentials."""
    creds_file = credentials_path()
    print(f"Using credentials: {creds_file}")
    if not creds_file.exists():
        raise FileNotFoundError(
            f"Credentials file not found: {creds_file}\n"
            "Set GOOGLE_APPLICATION_CREDENTIALS or place the service-account JSON "
            f"at {DEFAULT_CREDENTIALS}"
        )
    creds = service_account.Credentials.from_service_account_file(str(creds_file))
    return bigquery.Client(project=BQ_PROJECT, credentials=creds)


def ensure_output_dir() -> Path:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    return OUTPUT_DIR
