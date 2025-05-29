# Script 2: Create App Registration and Configure RBAC (PowerShell)
# This script creates the Azure App Registration, Service Principal, and sets up federated credentials

param(
    [Parameter(Mandatory = $false)]
    [string]$AppName = "github-kennethheine-com",
    
    [Parameter(Mandatory = $false)]
    [string]$ResourceGroupName = "rg-kennethheine-prod",
    
    [Parameter(Mandatory = $false)]
    [string]$GitHubOrg = "KS-Cloud-org",
    
    [Parameter(Mandatory = $false)]
    [string]$GitHubRepo = "kennethheine.com"
)

$ErrorActionPreference = "Stop"

Write-Host "🚀 Creating App Registration and Setting up RBAC..." -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Cyan

# Check if user is logged in
Write-Host "🔍 Checking Azure CLI authentication..." -ForegroundColor Cyan
try {
    $accountInfo = az account show | ConvertFrom-Json
    if (!$accountInfo) {
        throw "Not logged in"
    }
    $SubscriptionId = $accountInfo.id
    $TenantId = $accountInfo.tenantId
    Write-Host "✅ Logged in to Azure" -ForegroundColor Green
    Write-Host "📋 Subscription ID: $SubscriptionId" -ForegroundColor Yellow
    Write-Host "📋 Tenant ID: $TenantId" -ForegroundColor Yellow
}
catch {
    Write-Host "❌ Not logged in to Azure. Please run 'az login' first." -ForegroundColor Red
    exit 1
}

# Check if resource group exists
Write-Host ""
Write-Host "🔍 Checking if resource group '$ResourceGroupName' exists..." -ForegroundColor Cyan
$rgExists = $false
try {
    $rg = az group show --name $ResourceGroupName 2>$null | ConvertFrom-Json
    if ($rg) {
        $rgExists = $true
        Write-Host "✅ Resource group exists" -ForegroundColor Green
    }
}
catch {
    # Resource group doesn't exist
}

if (-not $rgExists) {
    Write-Host "❌ Resource group '$ResourceGroupName' does not exist." -ForegroundColor Red
    Write-Host "   Please run '1-create-resource-group.ps1' first." -ForegroundColor Yellow
    exit 1
}

# Check if app registration already exists
Write-Host ""
Write-Host "🔍 Checking if app registration '$AppName' exists..." -ForegroundColor Cyan

try {
    $existingApps = az ad app list --display-name $AppName | ConvertFrom-Json
    $existingApp = $existingApps | Select-Object -First 1
    
    if ($existingApp) {
        Write-Host "⚠️  App registration '$AppName' already exists." -ForegroundColor Yellow
        Write-Host "   App ID: $($existingApp.appId)" -ForegroundColor Yellow
        
        $continue = Read-Host "Do you want to continue with the existing app registration? (y/N)"
        if ($continue -notmatch "^[Yy]$") {
            Write-Host "❌ Aborted by user." -ForegroundColor Red
            exit 1
        }
        
        $AppId = $existingApp.appId
        $ObjectId = $existingApp.id
    }
    else {
        Write-Host "🏗️  Creating app registration '$AppName'..." -ForegroundColor Cyan
        
        $createResult = az ad app create --display-name $AppName | ConvertFrom-Json
        $AppId = $createResult.appId
        $ObjectId = $createResult.id
        
        if ($AppId) {
            Write-Host "✅ App registration created successfully!" -ForegroundColor Green
            Write-Host "   App ID: $AppId" -ForegroundColor Yellow
            Write-Host "   Object ID: $ObjectId" -ForegroundColor Yellow
        }
        else {
            throw "Failed to create app registration"
        }
    }
}
catch {
    Write-Host "❌ Failed to create app registration: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

# Check if service principal exists
Write-Host ""
Write-Host "🔍 Checking if service principal exists..." -ForegroundColor Cyan

try {
    # Use proper escaping for the filter
    $filter = "appId eq '$AppId'"
    $existingSps = az ad sp list --filter $filter 2>$null | ConvertFrom-Json
    $existingSp = $existingSps | Where-Object { $_.appId -eq $AppId } | Select-Object -First 1
    
    if ($existingSp) {
        Write-Host "⚠️  Service principal already exists." -ForegroundColor Yellow
        Write-Host "   Service Principal ID: $($existingSp.id)" -ForegroundColor Yellow
        $SpId = $existingSp.id
    }
    else {
        Write-Host "👤 Creating service principal..." -ForegroundColor Cyan
        
        $spResult = az ad sp create --id $AppId | ConvertFrom-Json
        $SpId = $spResult.id
        
        if ($SpId) {
            Write-Host "✅ Service principal created successfully!" -ForegroundColor Green
            Write-Host "   Service Principal ID: $SpId" -ForegroundColor Yellow
            
            Write-Host "⏳ Waiting for Azure AD propagation..." -ForegroundColor Cyan
            Start-Sleep -Seconds 10
        }
        else {
            throw "Failed to create service principal"
        }
    }
}
catch {
    Write-Host "❌ Failed to create service principal: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

# Assign Contributor role to resource group
Write-Host ""
Write-Host "🔐 Assigning Contributor role to resource group..." -ForegroundColor Cyan

try {
    # Fix: Add --scope parameter to the list command
    $scope = "/subscriptions/$SubscriptionId/resourceGroups/$ResourceGroupName"
    $existingRoles = az role assignment list --assignee $SpId --scope $scope --role "Contributor" 2>$null | ConvertFrom-Json
    
    if ($existingRoles.Count -gt 0) {
        Write-Host "⚠️  Contributor role already assigned to resource group." -ForegroundColor Yellow
    }
    else {
        az role assignment create --assignee $SpId --role "Contributor" --scope $scope | Out-Null
        Write-Host "✅ Contributor role assigned successfully!" -ForegroundColor Green
    }
}
catch {
    Write-Host "❌ Failed to assign Contributor role: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

# Add federated identity credentials
Write-Host ""
Write-Host "🔗 Adding federated identity credentials..." -ForegroundColor Cyan

function Add-FederatedCredential {
    param(
        [string]$Name,
        [string]$Subject,
        [string]$Description
    )
    
    Write-Host "   Adding credential: $Name" -ForegroundColor Cyan
    
    try {
        # Check if credential already exists
        $existingCreds = az ad app federated-credential list --id $ObjectId 2>$null | ConvertFrom-Json
        $existingCred = $existingCreds | Where-Object { $_.name -eq $Name }
        
        if ($existingCred) {
            Write-Host "   ⚠️  Federated credential '$Name' already exists." -ForegroundColor Yellow
            return
        }
        
        # Create the credential JSON
        $credentialObj = @{
            name = $Name
            issuer = "https://token.actions.githubusercontent.com"
            subject = $Subject
            description = $Description
            audiences = @("api://AzureADTokenExchange")
        }
        
        # Convert to JSON and escape for command line
        $credentialJson = $credentialObj | ConvertTo-Json -Compress -Depth 10
        $credentialJson = $credentialJson.Replace('"', '\"')
        
        # Create federated credential
        az ad app federated-credential create --id $ObjectId --parameters $credentialJson | Out-Null
        
        Write-Host "   ✅ Federated credential '$Name' added successfully!" -ForegroundColor Green
    }
    catch {
        Write-Host "   ❌ Failed to add federated credential '$Name': $($_.Exception.Message)" -ForegroundColor Red
    }
}

# Add credentials for different scenarios
Add-FederatedCredential -Name "github-environment-production" -Subject "repo:$GitHubOrg/${GitHubRepo}:environment:production" -Description "GitHub Actions production environment"

# Show summary
Write-Host ""
Write-Host "🎉 App Registration and RBAC setup completed!" -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "📋 Summary:" -ForegroundColor Cyan
Write-Host "   App Name: $AppName" -ForegroundColor Yellow
Write-Host "   App ID: $AppId" -ForegroundColor Yellow
Write-Host "   Service Principal ID: $SpId" -ForegroundColor Yellow
Write-Host "   Resource Group: $ResourceGroupName" -ForegroundColor Yellow
Write-Host ""
Write-Host "🔧 GitHub Secrets (will be added by script 3):" -ForegroundColor Cyan
Write-Host "   AZURE_CLIENT_ID: $AppId" -ForegroundColor Green
Write-Host "   AZURE_TENANT_ID: $TenantId" -ForegroundColor Green
Write-Host "   AZURE_SUBSCRIPTION_ID: $SubscriptionId" -ForegroundColor Green
Write-Host ""
Write-Host "Next step: Run '3-setup-github-secrets.ps1' to add secrets to your GitHub repository." -ForegroundColor Yellow
