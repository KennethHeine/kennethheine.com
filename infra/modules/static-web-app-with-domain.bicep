// Static Web App Bicep module
// Deploys Azure Static Web App with GitHub integration and custom domain support
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

@description('Custom domain name to configure (optional)')
param customDomainName string = ''

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

// Custom domain configuration (only if domain name is provided)
resource customDomain 'Microsoft.Web/staticSites/customDomains@2024-04-01' = if (!empty(customDomainName)) {
  name: customDomainName
  parent: staticWebApp
  properties: {
    // Apex domains (like kennethheine.com) must use dns-txt-token validation
    // Subdomains (like www.kennethheine.com) can use cname-delegation
    // Apex domain detection: split by '.' and check if it has exactly 2 parts (domain.tld)
    validationMethod: length(split(customDomainName, '.')) == 2 ? 'dns-txt-token' : 'cname-delegation'
  }
}

// Outputs - Following security best practices by not exposing secrets
output staticWebAppId string = staticWebApp.id
output staticWebAppName string = staticWebApp.name
output defaultHostname string = staticWebApp.properties.defaultHostname
output repositoryUrl string = staticWebApp.properties.repositoryUrl
output branch string = staticWebApp.properties.branch
output customDomainName string = !empty(customDomainName) ? customDomainName : ''
output customDomainValidationToken string = !empty(customDomainName) ? customDomain.properties.validationToken : ''
output customDomainValidationMethod string = !empty(customDomainName) ? customDomain.properties.validationMethod : ''

// Note: Deployment token should be retrieved dynamically using Azure CLI
// az staticwebapp secrets list --name <app-name> --resource-group <rg-name> --query "properties.apiKey" --output tsv

// Note: For custom domain setup:
// APEX DOMAINS (like kennethheine.com):
// 1. Create a TXT record with name "@" and value from the validation token
// 2. Azure will validate the domain using DNS TXT record verification
// 
// SUBDOMAINS (like www.kennethheine.com):
// 1. Create a CNAME record pointing to the default hostname
// 2. Azure will validate using CNAME delegation
//
// SSL certificate will be automatically provisioned after validation
