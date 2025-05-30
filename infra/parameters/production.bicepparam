using '../main.bicep'

// Production environment parameters
param location = 'westeurope'
param staticWebAppName = 'swa-kennethheine-com'
param gitHubOrg = 'KS-Cloud-org'
param gitHubRepo = 'kennethheine.com'
param gitHubBranch = 'main'
param appLocation = 'static-web-app/src'
param outputLocation = ''
param tags = {
  project: 'kennethheine-com'
  environment: 'production'
  managedBy: 'bicep'
  deployedBy: 'github-actions'
}
