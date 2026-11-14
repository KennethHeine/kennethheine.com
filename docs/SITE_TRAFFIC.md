# Site traffic

Azure already collects `SiteHits` and `BytesSent` for the Static Web App.
The repository reports these existing measurements without adding cookies,
client scripts, an analytics service, Azure resources or a scheduled job.
Non-secret resource identifiers live in `site-traffic.json`.

## Read the report

After the workflow is merged to `main`, open GitHub Actions → **Site Traffic** →
**Run workflow** and choose 1–90 days. Open the completed job's summary.
It uses the existing Azure OIDC deployment identity; that identity needs
`Microsoft.Insights/metrics/read` on the configured site. A failed read does
not produce a zero-traffic report.

Locally, with Python 3 and an authenticated Azure CLI:

```bash
python3 scripts/site-traffic.py --days 30
python3 scripts/site-traffic.py --days 7 --json
```

The script explicitly selects the site's subscription. It never changes the
CLI's default subscription or creates resources. Run it from any directory.

## What the numbers mean

- **Site hits** count requests, not people or page views. Images, JavaScript,
  bots and preview environments can contribute to the resource-level total.
- **Bytes sent** is outgoing data, in bytes.
- **Site errors** can have no measurements. Missing data is shown as **No data**,
  never converted to zero. A partial total only covers the reported days.
- Date ranges use complete **UTC days**, with an exclusive end at midnight
  today. They are not Danish calendar days.

These metrics cannot tell how many distinct humans visited, which pages they
read, or where they came from. Historical visitor counts cannot be reconstructed
from them. A browser analytics service would require separate setup and would
only collect data after activation.

Microsoft documents [Static Web Apps metrics](https://learn.microsoft.com/en-us/azure/azure-monitor/reference/supported-metrics/microsoft-web-staticsites-metrics).
