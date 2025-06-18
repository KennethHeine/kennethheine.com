using '../main.bicep'

// Production environment parameters
param location = 'westeurope'
param staticWebAppName = 'swa-kennethheine-com'
param gitHubOrg = 'KennethHeine'
param gitHubRepo = 'kennethheine.com'
param gitHubBranch = 'main'
param appLocation = 'static-web-app'
param outputLocation = 'out'
param customDomainName = 'kennethheine.com'
param tags = {
  project: 'kennethheine-com'
  environment: 'production'
  managedBy: 'bicep'
  deployedBy: 'github-actions'
}
