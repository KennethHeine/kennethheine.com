# Site traffic

The site has two complementary reports: Azure platform requests and browser
analytics in Azure Application Insights. Requests, page views and people are
different measurements; neither report identifies unique people.

## Browser analytics (Application Insights)

The resources are `appi-kennethheine-com` and `law-kennethheine-com` in
`rg-kennethheine.com`, subscription `bb732a02-2579-488d-8337-a159f8b1c0a9`,
West Europe. Infrastructure lives in `infra/analytics/main.bicep` and deploys
through **Deploy Browser Analytics** in GitHub Actions. It has its own template
and workflow so analytics changes do not redeploy Static Web App hosting.

`static-web-app/analytics.json` holds the public connection string and allowed
production hostnames. An empty connection string disables analytics. This is a
browser ingestion identifier, not an API key or a telemetry read credential.
The CSP must allow its exact regional ingestion origin under `connect-src`.
Scripts remain self-hosted.

### Reports

Open the Application Insights resource in the Azure portal to inspect usage.
For the prepared reports, open the workspace's **Logs → Queries → Legacy
queries → kennethheine.com**:

- **Page views by day and page**: received page views, including client navigation.
- **Referring hosts**: referring domain, without the source page or query string.
  `direct` also includes visits where the browser does not provide a referrer.
- **Contact clicks by channel and page**: clicks on the marked email or LinkedIn
  links. A click is not evidence that an email was sent or an enquiry received.
- **Browsers and devices**: the browser/OS/device classifications Azure supplies.
- **Received telemetry and data quality**: last ingestion, test rows, unexpected
  paths and billable volume. This is the one report that includes test traffic.

Ordinary reports exclude events tagged `verification=true`. Counts are events,
not people, persistent sessions or guaranteed human traffic. JavaScript blockers,
Do Not Track and Global Privacy Control can leave visits uncounted. Data starts
at activation; earlier visits cannot be reconstructed from Azure request counts.

### Data minimization

- Only production builds on the exact configured hostnames initialize the SDK.
  Local development, default Azure domains and PR previews remain excluded.
- Cookies, localStorage and sessionStorage are disabled **before** SDK startup.
  The website's separate theme preference still uses localStorage.
- No user/session IDs, raw query strings, URL fragments, referrer paths, form
  values or contact addresses are sent. Unknown paths are grouped as `/404/`.
- Only page views, page performance and the two explicit `ContactClick` channels
  are accepted. Automatic network/error collection, session replay, remote SDK
  configuration and SDK diagnostic telemetry are disabled.
- Azure IP masking remains enabled. Data is retained for 30 days.

The Microsoft web and core SDK packages are pinned to the same version and
updated together by Dependabot. The direct core import disables the SDK's
startup storage probes; a regression test requires one shared core installation.
Next.js observes route changes, so SDK automatic route tracking stays disabled
and does not double-count page views.

### Cost controls

The dedicated workspace uses pay-as-you-go pricing and a **0.05 GB/day** ingestion
cap (about 50 MB). Only the listed telemetry is collected; no uptime tests,
paid alerts, commitment tiers or Sentinel are enabled. The cap is a fallback,
not an exact spending ceiling: Azure can ingest and bill beyond it before
collection stops. Hitting the cap leaves a gap in the statistics until reset.

Azure Monitor has a shared free ingestion allowance in eligible pricing tiers;
it may already be used elsewhere on the billing account. Do not promise that
this site is free. Review actual `_BilledSize` and Azure Cost Management after
normal traffic has accumulated.

### Deployment and verification

1. Merge the analytics infrastructure and let **Deploy Browser Analytics** finish.
   Read its public connection string output and confirm the deployed workspace's
   retention and daily quota.
2. Set `connectionString` in `static-web-app/analytics.json` and add that exact
   ingestion origin to the CSP. Deploy through the normal website PR workflow.
3. In a browser without content blocking, open
   `https://kennethheine.com/?analytics_test=1`, navigate to About and Contact,
   and activate the email/LinkedIn links. Do not send an actual message.
4. Verify successful requests to the regional Azure `/v2/track` endpoint, no CSP
   errors, no analytics storage access, and one page view per route. Inspect
   payloads for raw URLs or user/session identifiers.
5. Query `AppPageViews` and `AppEvents` with
   `tostring(Properties.verification) == "true"` to confirm ingestion, not only
   script execution or HTTP acceptance. Test markers persist in memory during
   client navigation and do not enter ordinary reports.

Clear the connection string and redeploy to disable browser collection; this
does not delete existing analytics data. Production testing should use the test
marker, while local regression checks intercept all outgoing telemetry.

Sources: [JavaScript SDK configuration](https://learn.microsoft.com/en-us/azure/azure-monitor/app/javascript-sdk-configuration),
[connection strings](https://learn.microsoft.com/en-us/azure/azure-monitor/app/connection-strings),
[daily caps](https://learn.microsoft.com/en-us/azure/azure-monitor/logs/daily-cap),
[pricing](https://azure.microsoft.com/en-us/pricing/details/monitor/).

## Azure request report

Azure collects `SiteHits` and `BytesSent` for the Static Web App independently
of the browser SDK. The read-only report uses these existing measurements.
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
