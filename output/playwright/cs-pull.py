"""
Focused Contentsquare data pull for Phase 1, Task 1.5.

Targets specific mappings relevant to the 20-page audit:
- "CS - High Level Mapping" (key page groups + RFI + Paid Success)
- "Site Structure" (degree program breakdowns, application pages, success pages)
- "All Pages" (site-wide + application funnel)

Pulls page-group UX metrics, device breakdown, goal conversions,
zoning data, and daily trends. Outputs cs-data.json.
"""

import json
import sys
import time
from datetime import UTC, datetime, timedelta

import requests

CLIENT_ID = "903c8277-d063-46df-af7f-492a5f17f884"
CLIENT_SECRET = "WZ1zYEt060T;b?6;klg500wwVrM5Kwld"

AUTH_URL = "https://api.contentsquare.com/v1/oauth/token"
ME_URL = "https://api.contentsquare.com/v1/oauth/me"

TARGET_MAPPINGS = {
    "CS - High Level Mapping",
    "Site Structure",
    "All Pages",
    "APVs tracked",
}

session = requests.Session()
session.headers.update({"Content-Type": "application/json"})

base_url = "https://api.contentsquare.com"
project_id = None


def authenticate(scope="metrics"):
    global base_url, project_id
    resp = session.post(AUTH_URL, json={
        "client_id": CLIENT_ID,
        "client_secret": CLIENT_SECRET,
        "grant_type": "client_credentials",
        "scope": scope,
    }, timeout=15)
    resp.raise_for_status()
    data = resp.json()
    base_url = data.get("endpoint", base_url)
    project_id = data.get("project_id")
    session.headers["Authorization"] = f"Bearer {data['access_token']}"
    print(f"  Authenticated — project {project_id}, endpoint {base_url}")


def api_get(path, params=None):
    url = f"{base_url}{path}"
    if params is None:
        params = {}
    if project_id and "projectId" not in params:
        params["projectId"] = project_id
    try:
        resp = session.get(url, params=params, timeout=30)
        resp.raise_for_status()
        body = resp.json()
        if isinstance(body, dict) and body.get("success") is False:
            print(f"  API warning: {body.get('errorMessage', 'unknown')}")
            return None
        return body
    except requests.RequestException as e:
        print(f"  API error on {path}: {e}")
        return None


def date_params(days=30):
    end = datetime.now(tz=UTC)
    start = end - timedelta(days=days)
    return {
        "startDate": start.strftime("%Y-%m-%dT00:00:00.000Z"),
        "endDate": end.strftime("%Y-%m-%dT23:59:59.999Z"),
        "device": "all",
    }


def get_pg_metrics(pg_id, days=30):
    result = api_get(f"/v1/metrics/page-group/{pg_id}", date_params(days))
    if not result:
        return {}
    values = result.get("payload", {}).get("values", [])
    return {v["name"]: v["value"] for v in values}


def get_zone_metrics(zone_id, days=30):
    result = api_get(f"/v1/metrics/zone/{zone_id}", date_params(days))
    if not result:
        return {}
    values = result.get("payload", {}).get("values", [])
    raw = {v["name"]: v["value"] for v in values}
    return {
        "click_rate": round(raw.get("clickRate", 0), 3),
        "hover_rate": round(raw.get("hoverRate", 0), 3),
        "engagement_rate": round(raw.get("engagementRateLive", 0), 3),
        "exposure_rate": round(raw.get("exposureRate", 0), 3),
        "exposure_time": round(raw.get("exposureTime", 0), 2),
        "hesitation": round(raw.get("hesitation", 0), 2),
        "attractivity_rate": round(raw.get("attractivityRate", 0), 3),
        "click_recurrence": round(raw.get("clickRepetition", 0), 3),
        "total_clicks": int(raw.get("totalClicks", 0)),
        "time_before_first_click": round(raw.get("timeBeforeFirstClick", 0), 2),
        "conversion_after_click": round(raw.get("avgConversionAfterClick", 0), 3),
        "conversion_after_hover": round(raw.get("avgConversionAfterHover", 0), 3),
    }


def parse_pg(pg, mapping_name, metrics):
    return {
        "id": pg["id"],
        "name": pg.get("name", ""),
        "category": pg.get("category", ""),
        "mapping": mapping_name,
        "views": int(metrics.get("views", 0)),
        "visits": int(metrics.get("visits", 0)),
        "unique_visits": int(metrics.get("uniqueVisits", 0)),
        "scroll_rate": round(metrics.get("scrollRate", 0), 1),
        "interaction_time_s": round(metrics.get("interactionTime", 0), 2),
        "bounce_rate": round(metrics.get("bounceRate", 0), 1),
        "exit_rate": round(metrics.get("exitRate", 0), 1),
        "activity_rate": round(metrics.get("activityRate", 0), 1),
        "loading_time_s": round(metrics.get("loadingTime", 0), 2),
        "landing_rate": round(metrics.get("landingRate", 0), 1),
        "elapsed_time_s": round(metrics.get("elapsedTime", 0), 2),
        "page_height": round(metrics.get("pageHeight", 0)),
        "fold_height": round(metrics.get("foldHeight", 0)),
        "views_per_visit": round(metrics.get("viewsVisits", 0), 2),
    }


def main():
    print("=" * 60)
    print("Contentsquare Focused Pull — Phase 1, Task 1.5")
    print("=" * 60)

    print("\n1. Authenticating...")
    authenticate()

    print("\n2. Getting project info...")
    info_resp = session.post(ME_URL, json={
        "client_id": CLIENT_ID, "client_secret": CLIENT_SECRET
    }, timeout=15)
    info = info_resp.json()
    projects = info.get("permissions", {}).get("projects", [])
    print(f"  Project: {projects[0].get('name') if projects else 'unknown'}")

    print("\n3. Discovering mappings (filtering to targets)...")
    mappings_resp = api_get("/v1/mappings")
    all_mappings = mappings_resp.get("payload", []) if mappings_resp else []
    target_maps = [m for m in all_mappings if m.get("name", "") in TARGET_MAPPINGS]
    print(f"  Using {len(target_maps)} of {len(all_mappings)} mappings")

    all_page_groups = []
    all_pages_pg_id = None
    seen_pg_ids = set()

    for mapping in target_maps:
        mid = mapping["id"]
        mname = mapping.get("name", "")
        print(f"\n  Mapping: {mname}")
        pg_resp = api_get(f"/v1/mappings/{mid}/page-groups")
        if not pg_resp:
            continue
        pgs = pg_resp.get("payload", [])
        for pg in pgs:
            pgid = pg["id"]
            if pgid in seen_pg_ids:
                continue
            seen_pg_ids.add(pgid)
            pgname = pg.get("name", "")
            print(f"    Fetching: {pgname}...", end=" ", flush=True)
            metrics = get_pg_metrics(pgid)
            views = int(metrics.get("views", 0))
            print(f"{views:,} views")
            all_page_groups.append(parse_pg(pg, mname, metrics))
            if pgname == "All Pages" and all_pages_pg_id is None:
                all_pages_pg_id = pgid
            time.sleep(0.15)

    print(f"\n  Total: {len(all_page_groups)} unique page groups")

    print("\n4. Goals...")
    goals_resp = api_get("/v1/goals")
    goals = goals_resp.get("payload", []) if goals_resp else []
    print(f"  Found {len(goals)} goal(s)")
    goal_data = []
    if all_pages_pg_id and goals:
        for g in goals[:10]:
            params = {**date_params(30), "goalId": g["id"]}
            result = api_get(f"/v1/metrics/page-group/{all_pages_pg_id}/conversion-rate", params)
            if result:
                vals = result.get("payload", {}).get("values", [])
                cr = vals[0]["value"] if vals else 0
                goal_data.append({
                    "id": g["id"],
                    "name": g.get("name", ""),
                    "type": g.get("type", ""),
                    "conversion_rate": round(cr, 3),
                })
                print(f"    {g.get('name')}: {cr:.3f}%")
            time.sleep(0.2)

    print("\n5. Device breakdown...")
    device_data = []
    if all_pages_pg_id:
        for device in ["desktop", "mobile", "tablet"]:
            params = {**date_params(30), "device": device}
            result = api_get(f"/v1/metrics/page-group/{all_pages_pg_id}/views", params)
            if result:
                vals = result.get("payload", {}).get("values", [])
                count = int(vals[0]["value"]) if vals else 0
                device_data.append({"device": device, "views": count})
                print(f"  {device}: {count:,}")

    print("\n6. Zoning data (page groups with zonings)...")
    zoning_data = []
    for pg in all_page_groups:
        pgid = pg["id"]
        pgname = pg["name"]
        zonings_resp = api_get(f"/v1/page-groups/{pgid}/zonings")
        if not zonings_resp:
            continue
        zonings = zonings_resp.get("payload", [])
        if not zonings:
            continue

        print(f"\n  '{pgname}' — {len(zonings)} zoning(s)")
        for zoning in zonings[:1]:
            zid = zoning["id"]
            zname = zoning.get("name", "")
            print(f"    Zoning '{zname}' (id={zid})")

            zones_resp = api_get(f"/v1/zonings/{zid}/zones")
            if not zones_resp:
                continue
            zones = zones_resp.get("payload", [])
            print(f"      {len(zones)} zone(s)")

            zone_metrics_list = []
            for z in zones[:25]:
                zm = get_zone_metrics(z["id"])
                zone_metrics_list.append({
                    "id": z["id"],
                    "name": z.get("name", ""),
                    **zm,
                })
                time.sleep(0.15)

            zone_metrics_list.sort(key=lambda x: -x.get("click_recurrence", 0))

            zoning_data.append({
                "page_group_id": pgid,
                "page_group_name": pgname,
                "zoning_id": zid,
                "zoning_name": zname,
                "zones": zone_metrics_list,
            })

    print("\n7. Daily trends (30 days)...")
    daily_data = []
    if all_pages_pg_id:
        metrics_map = {}
        for metric_name, key in [("views", "views"), ("scroll-rate", "scroll_rate"), ("bounce-rate", "bounce_rate")]:
            params = {**date_params(30), "period": "daily"}
            result = api_get(f"/v1/metrics/page-group/{all_pages_pg_id}/{metric_name}", params)
            if result:
                for v in result.get("payload", {}).get("values", []):
                    d = v["startDate"][:10]
                    if d not in metrics_map:
                        metrics_map[d] = {"date": d}
                    metrics_map[d][key] = round(v["value"], 1) if key != "views" else int(v["value"])
        daily_data = sorted(metrics_map.values(), key=lambda x: x["date"])
        print(f"  {len(daily_data)} daily data points")

    output = {
        "pulled_at": datetime.now(tz=UTC).isoformat(),
        "project_id": project_id,
        "projects": [{"id": p.get("id"), "name": p.get("name")} for p in projects],
        "mappings_used": [m.get("name", "") for m in target_maps],
        "page_groups": sorted(all_page_groups, key=lambda x: -x["views"]),
        "devices": device_data,
        "goals": goal_data,
        "zonings": zoning_data,
        "daily_trends": daily_data,
    }

    out_path = "output/playwright/screenshots/cs-data.json"
    with open(out_path, "w") as f:
        json.dump(output, f, indent=2, default=str)

    print(f"\n{'=' * 60}")
    print(f"Done! Data written to {out_path}")
    print(f"  {len(all_page_groups)} page groups")
    print(f"  {len(zoning_data)} zoning summaries")
    print(f"  {len(goal_data)} goals")
    print(f"  {len(daily_data)} daily trend points")
    print(f"{'=' * 60}")


if __name__ == "__main__":
    main()
