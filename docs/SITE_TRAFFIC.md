# Site traffic

Azure already collects `SiteHits` and `BytesSent` for the Static Web App.
The read-only report uses those measurements without additional services.
Non-secret resource identifiers live in `site-traffic.json`.

An optional Cloudflare Web Analytics integration supplies browser statistics.
It is **inactive while `static-web-app/analytics.json` has an empty token**.
Adding the integration code alone does not create an account or collect data.

## Browser analytics

Cloudflare provides visits, page views, referrer domains, popular paths,
device types and browser performance. It works with the existing Azure site
without a DNS change, new Azure resources or npm dependencies.

### Activate

1. In [Cloudflare Web Analytics](https://dash.cloudflare.com/?to=/:account/web-analytics),
   add `kennethheine.com` as a site using **manual JS snippet installation**.
2. Copy the public `token` value from **Manage site** into `cloudflareToken` in
   `static-web-app/analytics.json`. This is the public 32-character hexadecimal
   beacon ID, not a Cloudflare API token. Never commit account credentials.
3. Deploy through the usual PR / GitHub Actions process. The component only
   loads on production builds at the exact `productionHosts` listed in that
   file. Local development, Azure default domains and PR previews are excluded.
4. Open the production site in a browser without a content blocker. In Network,
   verify one `beacon.min.js` script and successful requests to
   `https://cloudflareinsights.com/cdn-cgi/rum`. Navigate between Home, About and
   Contact to check client-side route tracking. Verify there are no CSP errors.
5. Confirm those pages appear in the Cloudflare dashboard after processing.
   A successful deployment or script request alone does not prove ingestion.
   Select **Exclude Bots: Yes** when reviewing traffic.

The root layout loads the script once after hydration. Cloudflare handles SPA
navigation; do not add separate page-view events or automatic script injection,
which could double-count navigation. The CSP permits only its specific script
URL and collection origin. To disable it, clear the token and redeploy.

### What it measures

- A **visit** starts with a page view referred from another site or a direct
  link. Visits are not distinct people or persistent user sessions.
- The beacon uses no cookies or browser storage. The site still stores the
  theme preference separately. It does not record session replays or forms.
- Cloudflare currently does not support custom events or UTM campaign reports
  in Web Analytics. Email/LinkedIn button clicks would require a different
  analytics service; page views of Contact are not completed enquiries.
- Content blockers and browsers without JavaScript can leave visits uncounted.
  Reports may be sampled, and historical data is available for six months.
- Data starts after activation; the Azure report cannot reconstruct older
  browser visits. Use the two reports for their different purposes.

Sources: [setup](https://developers.cloudflare.com/web-analytics/get-started/),
[metrics](https://developers.cloudflare.com/web-analytics/data-metrics/high-level-metrics/),
[dimensions](https://developers.cloudflare.com/web-analytics/data-metrics/dimensions/),
[SPA tracking](https://developers.cloudflare.com/web-analytics/get-started/web-analytics-spa/),
[privacy](https://developers.cloudflare.com/speed/observatory/rum-beacon/),
[limits and CSP](https://developers.cloudflare.com/web-analytics/faq/).

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
