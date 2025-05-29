// Main Bicep template for kennethheine.com infrastructure
// This template deploys a Static Web App with GitHub integration

targetScope = 'subscription'

@description('Name of the resource group')
param resourceGroupName string = 'rg-kennethheine-prod'

@description('Location for all resources')
param location string = 'westeurope'

@description('Name of the static web app')
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
var resourceToken = toLower(uniqueString(subscription().id, resourceGroupName, location))

// Create resource group
resource rg 'Microsoft.Resources/resourceGroups@2023-07-01' = {
  name: resourceGroupName
  location: location
  tags: union(tags, {
    'azd-env-name': resourceGroupName
  })
}

// Deploy static web app in the resource group
module staticWebApp 'modules/static-web-app.bicep' = {
  scope: rg
  name: 'deploy-static-web-app'
  params: {
    staticWebAppName: staticWebAppName
    location: location
    gitHubOrg: gitHubOrg
    gitHubRepo: gitHubRepo
    gitHubBranch: gitHubBranch
    appLocation: appLocation
    outputLocation: outputLocation
    tags: tags
    resourceToken: resourceToken
  }
}

// Outputs
output resourceGroupId string = rg.id
output staticWebAppId string = staticWebApp.outputs.staticWebAppId
output staticWebAppName string = staticWebApp.outputs.staticWebAppName
output staticWebAppDefaultHostname string = staticWebApp.outputs.defaultHostname
output staticWebAppApiToken string = staticWebApp.outputs.apiToken
