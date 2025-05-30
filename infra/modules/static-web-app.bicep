// Static Web App Bicep module
// Deploys Azure Static Web App with GitHub integration
// Uses latest API version and follows security best practices

@description('Name of the static web app (should include unique suffix)')
param staticWebAppName string

@description('Location for the static web app')
param location string

@description('GitHub organization or user')
param gitHubOrg string

@description('GitHub repository name')
param gitHubRepo string

@description('GitHub branch to deploy from')
param gitHubBranch string

@description('Path to the app code within the repo')
param appLocation string

@description('Path to the build output (leave empty for static sites)')
param outputLocation string

@description('Tags to apply to the resource')
param tags object

@description('SKU for the static web app')
@allowed([
  'Free'
  'Standard'
])
param sku string = 'Free'

@description('Enable staging environments for pull requests')
param allowConfigFileUpdates bool = true

@description('Enterprise-grade edge locations (requires Standard SKU)')
param enterpriseGradeCdnStatus string = 'Disabled'

// Static Web App resource
resource staticWebApp 'Microsoft.Web/staticSites@2024-04-01' = {
  name: staticWebAppName
  location: location
  tags: tags
  sku: {
    name: sku
    tier: sku
  }
  properties: {
    repositoryUrl: 'https://github.com/${gitHubOrg}/${gitHubRepo}'
    branch: gitHubBranch
    allowConfigFileUpdates: allowConfigFileUpdates
    enterpriseGradeCdnStatus: enterpriseGradeCdnStatus
    buildProperties: {
      appLocation: appLocation
      outputLocation: outputLocation
      appBuildCommand: ''
      apiBuildCommand: ''
    }
    provider: 'GitHub'
  }
}

// Outputs - Following security best practices by not exposing secrets
output staticWebAppId string = staticWebApp.id
output staticWebAppName string = staticWebApp.name
output defaultHostname string = staticWebApp.properties.defaultHostname
output repositoryUrl string = staticWebApp.properties.repositoryUrl
output branch string = staticWebApp.properties.branch

// Note: Deployment token should be retrieved dynamically using Azure CLI
// az staticwebapp secrets list --name <app-name> --resource-group <rg-name> --query "properties.apiKey" --output tsv
