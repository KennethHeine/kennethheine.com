// Dedicated browser analytics; deployed independently from Static Web App hosting.
targetScope = 'resourceGroup'

@description('Azure region for the dedicated website analytics resources')
param location string = 'westeurope'

@description('Tags shared with the website resources')
param tags object = {
  project: 'kennethheine-com'
  environment: 'production'
  managedBy: 'bicep'
  deployedBy: 'github-actions'
}

resource workspace 'Microsoft.OperationalInsights/workspaces@2023-09-01' = {
  name: 'law-kennethheine-com'
  location: location
  tags: tags
  properties: {
    sku: {
      name: 'PerGB2018'
    }
    retentionInDays: 30
    workspaceCapping: {
      // Bicep has no decimal literal. ARM accepts this quota in GB/day (~50 MB).
      // Azure can overshoot a daily cap; this is not a hard spending ceiling.
      dailyQuotaGb: json('0.05')
    }
    features: {
      disableLocalAuth: true
      enableLogAccessUsingOnlyResourcePermissions: true
      immediatePurgeDataOn30Days: true
    }
    publicNetworkAccessForIngestion: 'Enabled'
    publicNetworkAccessForQuery: 'Enabled'
  }
}

resource applicationInsights 'Microsoft.Insights/components@2020-02-02' = {
  name: 'appi-kennethheine-com'
  location: location
  tags: tags
  kind: 'web'
  properties: {
    Application_Type: 'web'
    WorkspaceResourceId: workspace.id
    IngestionMode: 'LogAnalytics'
    RetentionInDays: 30
    ImmediatePurgeDataOn30Days: true
    DisableIpMasking: false
    // Browser telemetry uses a public connection string, without an Entra identity.
    DisableLocalAuth: false
    SamplingPercentage: 100
    publicNetworkAccessForIngestion: 'Enabled'
    publicNetworkAccessForQuery: 'Enabled'
  }
}

// Open the workspace's Logs > Queries > Legacy queries > kennethheine.com.
// Counts describe received browser events, not unique people or cookie sessions.
var reports = [
  {
    name: 'website-page-views'
    displayName: 'Page views by day and page (30 days)'
    query: '''
AppPageViews
| where TimeGenerated >= ago(30d)
| where tostring(Properties.verification) != "true"
| summarize PageViews = sum(ItemCount) by Day = bin(TimeGenerated, 1d), Page = tostring(Properties.path)
| order by Day desc, PageViews desc
'''
  }
  {
    name: 'website-referrers'
    displayName: 'Referring hosts (30 days)'
    query: '''
AppPageViews
| where TimeGenerated >= ago(30d)
| where tostring(Properties.verification) != "true"
| extend ReferrerHost = tostring(Properties.referrerHost)
| summarize PageViews = sum(ItemCount) by ReferrerHost
| order by PageViews desc
'''
  }
  {
    name: 'website-contact-clicks'
    displayName: 'Contact clicks by channel and page (30 days)'
    query: '''
AppEvents
| where TimeGenerated >= ago(30d) and Name == "ContactClick"
| where tostring(Properties.verification) != "true"
| summarize ContactClicks = sum(ItemCount) by Channel = tostring(Properties.channel), Page = tostring(Properties.path)
| order by ContactClicks desc
'''
  }
  {
    name: 'website-browser-devices'
    displayName: 'Browsers and devices (30 days)'
    query: '''
AppPageViews
| where TimeGenerated >= ago(30d)
| where tostring(Properties.verification) != "true"
| summarize PageViews = sum(ItemCount) by ClientBrowser, ClientOS, ClientType
| order by PageViews desc
'''
  }
  {
    name: 'website-data-quality'
    displayName: 'Received telemetry and data quality (24 hours; includes verification)'
    query: '''
union withsource=TelemetryTable AppPageViews, AppEvents, AppBrowserTimings
| where TimeGenerated >= ago(24h)
| extend Path = tostring(Properties.path), IsVerification = tostring(Properties.verification) == "true"
| summarize ReceivedRows = count(), LastReceived = max(TimeGenerated), VerificationRows = countif(IsVerification), UnexpectedPathRows = countif(Path !in ("/", "/about/", "/contact/", "/404/")), BillableBytes = sumif(_BilledSize, _IsBillable == "true") by TelemetryTable
| order by TelemetryTable asc
'''
  }
]

resource savedReports 'Microsoft.OperationalInsights/workspaces/savedSearches@2020-08-01' = [for report in reports: {
  parent: workspace
  name: report.name
  properties: {
    category: 'kennethheine.com'
    displayName: report.displayName
    query: report.query
    version: 2
  }
}]

output applicationInsightsResourceId string = applicationInsights.id
// Deliberately public: identifies the ingestion destination, not a read credential.
output applicationInsightsConnectionString string = applicationInsights.properties.ConnectionString
output workspaceResourceId string = workspace.id
output workspaceId string = workspace.properties.customerId
