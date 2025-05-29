// Static Web App Bicep module
// Deploys Azure Static Web App with GitHub integration

@description('Name of the static web app')
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

@description('Path to the build output')
param outputLocation string

@description('Tags to apply to the resource')
param tags object

@description('Resource token for unique naming')
param resourceToken string

@description('SKU for the static web app')
@allowed([
  'Free'
  'Standard'
])
param sku string = 'Free'

// Static Web App resource
resource staticWebApp 'Microsoft.Web/staticSites@2023-01-01' = {
  name: '${staticWebAppName}-${resourceToken}'
  location: location
  tags: union(tags, {
    'azd-service-name': staticWebAppName
  })
  sku: {
    name: sku
    tier: sku
  }
  properties: {
    repositoryUrl: 'https://github.com/${gitHubOrg}/${gitHubRepo}'
    branch: gitHubBranch
    buildProperties: {
      appLocation: appLocation
      outputLocation: outputLocation
      appBuildCommand: ''
      apiBuildCommand: ''
    }
    // Enable staging environments
    stagingEnvironmentPolicy: 'Enabled'
    // Allow only GitHub deployments
    allowConfigFileUpdates: true
  }
}

// Output the API token for GitHub Actions
output staticWebAppId string = staticWebApp.id
output staticWebAppName string = staticWebApp.name
output defaultHostname string = staticWebApp.properties.defaultHostname
output apiToken string = staticWebApp.listSecrets().properties.apiKey
