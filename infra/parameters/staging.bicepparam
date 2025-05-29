using '../main.bicep'

// Staging environment parameters
param resourceGroupName = 'rg-kennethheine-staging'
param location = 'westeurope'
param staticWebAppName = 'swa-kennethheine-staging'
param gitHubOrg = 'KS-Cloud-org'
param gitHubRepo = 'kennethheine.com'
param gitHubBranch = 'staging'
param appLocation = 'static-web-app/src'
param outputLocation = ''
param tags = {
  project: 'kennethheine-com'
  environment: 'staging'
  managedBy: 'bicep'
  deployedBy: 'github-actions'
}
