#!/usr/bin/env python3
"""Read existing Azure traffic metrics; no new resources or tracking scripts."""
import argparse
import json
import subprocess
import sys
from datetime import datetime, timedelta, timezone
from pathlib import Path


METRICS = {"SiteHits": "Site hits", "BytesSent": "Bytes sent", "SiteErrors": "Site errors"}


def summarize(payload, days):
    """Keep missing measurements distinct from measured zeros."""
    rows = []
    for name, label in METRICS.items():
        metric = next((m for m in payload.get("value", []) if m["name"]["value"] == name), None)
        if metric and metric.get("errorCode", "Success") != "Success":
            raise ValueError(f"Azure could not return {name}: {metric['errorCode']}")
        series = metric.get("timeseries", []) if metric else []
        if len(series) > 1:
            raise ValueError(f"Unexpected split series for {name}; refusing to double-count")
        points = series[0].get("data", []) if series else []
        measured = [p for p in points if isinstance(p.get("total"), (int, float))]
        rows.append({"metric": label, "total": sum(p["total"] for p in measured) if measured else None,
                     "measured_days": len(measured), "requested_days": days})
    return rows


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--days", type=int, choices=range(1, 91), default=30, metavar="1-90")
    parser.add_argument("--json", action="store_true", help="Print machine-readable summary")
    args = parser.parse_args()
    config = json.loads((Path(__file__).resolve().parents[1] / "site-traffic.json").read_text())
    end = datetime.now(timezone.utc).replace(hour=0, minute=0, second=0, microsecond=0)
    start = end - timedelta(days=args.days)
    iso = lambda d: d.strftime("%Y-%m-%dT%H:%M:%SZ")
    result = subprocess.run([
        "az", "monitor", "metrics", "list", "--resource", config["resourceId"],
        "--subscription", config["subscriptionId"], "--metric", *METRICS,
        "--aggregation", "Total", "--interval", "P1D",
        "--start-time", iso(start), "--end-time", iso(end), "--output", "json",
        "--only-show-errors",
    ], capture_output=True, text=True, check=False, timeout=120)
    if result.returncode:
        raise RuntimeError("Azure metrics read failed. Check az login and Monitoring Reader access.\n" + result.stderr.strip())
    rows = summarize(json.loads(result.stdout), args.days)
    if args.json:
        print(json.dumps({"start_utc": iso(start), "end_utc_exclusive": iso(end), "metrics": rows}, indent=2))
        return
    print(f"# kennethheine.com traffic\n\n{start:%Y-%m-%d} through {end - timedelta(days=1):%Y-%m-%d} (complete UTC days).\n")
    print("Site hits are HTTP requests, not unique visitors or page views. Assets, bots and preview traffic may be included.\n")
    print("| Metric | Measured total | Days with data |\n| --- | ---: | ---: |")
    for row in rows:
        total = f"{row['total']:,.0f}" if row["total"] is not None else "No data"
        print(f"| {row['metric']} | {total} | {row['measured_days']}/{row['requested_days']} |")
    print("\nMissing days are not zero. A partial total covers only measured days. No data is not evidence of zero errors or zero traffic.")


if __name__ == "__main__":
    try:
        main()
    except (OSError, ValueError, RuntimeError, subprocess.TimeoutExpired) as error:
        print(str(error), file=sys.stderr)
        sys.exit(1)
