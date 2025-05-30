// Main Bicep template for kennethheine.com infrastructure
// This template deploys a Static Web App with GitHub integration

targetScope = 'resourceGroup'

@description('Location for all resources')
param location string = 'westeurope'

@description('Name of the static web app (will be made unique)')
param staticWebAppName string = 'swa-kennethheine-com'

@description('GitHub organization or user')
param gitHubOrg string = 'KS-Cloud-org'

@description('GitHub repository name')
param gitHubRepo string = 'kennethheine.com'

@description('GitHub branch to deploy from')
param gitHubBranch string = 'main'

@description('Path to the app code within the repo')
param appLocation string = 'static-web-app/src'

@description('Path to the build output (leave empty for static sites)')
param outputLocation string = ''

@description('Tags to apply to all resources')
param tags object = {
  project: 'kennethheine-com'
  environment: 'production'
  managedBy: 'bicep'
  deployedBy: 'github-actions'
}

@description('Resource token for unique naming')
var resourceToken = toLower(uniqueString(subscription().id, resourceGroup().name))

// Deploy static web app in the existing resource group
module staticWebApp 'modules/static-web-app.bicep' = {
  name: 'deploy-static-web-app'
  params: {
    staticWebAppName: '${staticWebAppName}-${resourceToken}'
    location: location
    gitHubOrg: gitHubOrg
    gitHubRepo: gitHubRepo
    gitHubBranch: gitHubBranch
    appLocation: appLocation
    outputLocation: outputLocation
    tags: tags
  }
}

// Outputs
output resourceGroupId string = resourceGroup().id
output resourceGroupName string = resourceGroup().name
output staticWebAppId string = staticWebApp.outputs.staticWebAppId
output staticWebAppName string = staticWebApp.outputs.staticWebAppName
output staticWebAppDefaultHostname string = staticWebApp.outputs.defaultHostname

// Note: API token should be retrieved dynamically via Azure CLI for security
// Example: az staticwebapp secrets list --name <app-name> --resource-group <rg-name>
