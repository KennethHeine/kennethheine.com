# Script 3: Setup GitHub Secrets (PowerShell)
# This script fetches Azure credentials and adds them to your GitHub repository

param(
    [Parameter(Mandatory = $false)]
    [string]$GitHubOrg = "KS-Cloud-org",
    
    [Parameter(Mandatory = $false)]
    [string]$GitHubRepo = "kennethheine.com",
    
    [Parameter(Mandatory = $false)]
    [string]$AppName = "github-kennethheine-com"
)

$ErrorActionPreference = "Stop"

Write-Host "🚀 Setting up GitHub Repository Secrets..." -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Cyan

# Check if user is logged in to Azure
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

# Find the app registration
Write-Host ""
Write-Host "🔍 Finding app registration '$AppName'..." -ForegroundColor Cyan

try {
    $existingApps = az ad app list --display-name $AppName | ConvertFrom-Json
    $existingApp = $existingApps | Select-Object -First 1
    
    if (!$existingApp) {
        throw "App registration '$AppName' not found"
    }
    
    $AppId = $existingApp.appId
    Write-Host "✅ Found app registration" -ForegroundColor Green
    Write-Host "   App ID: $AppId" -ForegroundColor Yellow
}
catch {
    Write-Host "❌ App registration '$AppName' not found." -ForegroundColor Red
    Write-Host "   Please run '2-create-app-registration.ps1' first." -ForegroundColor Yellow
    exit 1
}

# Set the secret values
$AzureClientId = $AppId
$AzureTenantId = $TenantId
$AzureSubscriptionId = $SubscriptionId

Write-Host "✅ Azure credentials retrieved successfully" -ForegroundColor Green

# Check if GitHub CLI is installed
Write-Host ""
Write-Host "🔍 Checking GitHub CLI installation..." -ForegroundColor Cyan

try {
    $ghVersion = gh --version 2>$null
    if (!$ghVersion) {
        throw "GitHub CLI not found"
    }
    Write-Host "✅ GitHub CLI is installed" -ForegroundColor Green
}
catch {
    Write-Host "❌ GitHub CLI (gh) is not installed." -ForegroundColor Red
    Write-Host ""
    Write-Host "📥 To install GitHub CLI:" -ForegroundColor Yellow
    Write-Host "   Windows (winget): winget install --id GitHub.cli" -ForegroundColor White
    Write-Host "   Windows (choco):  choco install gh" -ForegroundColor White
    Write-Host "   Windows (scoop):  scoop install gh" -ForegroundColor White
    Write-Host ""
    Write-Host "   Or download from: https://cli.github.com/" -ForegroundColor White
    Write-Host ""
    Write-Host "🔧 Manual setup instructions:" -ForegroundColor Yellow
    Write-Host "   1. Go to https://github.com/$GitHubOrg/$GitHubRepo/settings/secrets/actions" -ForegroundColor White
    Write-Host "   2. Click 'New repository secret'" -ForegroundColor White
    Write-Host "   3. Add these secrets one by one:" -ForegroundColor White
    Write-Host ""
    Write-Host "      Name: AZURE_CLIENT_ID" -ForegroundColor Green
    Write-Host "      Value: $AzureClientId" -ForegroundColor Green
    Write-Host ""
    Write-Host "      Name: AZURE_TENANT_ID" -ForegroundColor Green
    Write-Host "      Value: $AzureTenantId" -ForegroundColor Green
    Write-Host ""
    Write-Host "      Name: AZURE_SUBSCRIPTION_ID" -ForegroundColor Green
    Write-Host "      Value: $AzureSubscriptionId" -ForegroundColor Green
    Write-Host ""
    exit 1
}

# Check if user is logged in to GitHub
Write-Host ""
Write-Host "🔍 Checking GitHub CLI authentication..." -ForegroundColor Cyan

try {
    $ghStatus = gh auth status 2>&1
    if ($LASTEXITCODE -ne 0) {
        throw "Not logged in"
    }
    Write-Host "✅ Logged in to GitHub CLI" -ForegroundColor Green
}
catch {
    Write-Host "❌ Not logged in to GitHub." -ForegroundColor Red
    Write-Host "🔑 Please log in to GitHub CLI:" -ForegroundColor Yellow
    Write-Host "   gh auth login" -ForegroundColor White
    Write-Host ""
    Read-Host "Press Enter after logging in to continue..."
    
    # Check again
    try {
        $ghStatus = gh auth status 2>&1
        if ($LASTEXITCODE -ne 0) {
            throw "Still not logged in"
        }
    }
    catch {
        Write-Host "❌ Still not logged in to GitHub. Exiting." -ForegroundColor Red
        exit 1
    }
}

# Verify repository access
Write-Host ""
Write-Host "🔍 Verifying repository access..." -ForegroundColor Cyan

try {
    $repoInfo = gh repo view "$GitHubOrg/$GitHubRepo" 2>&1
    if ($LASTEXITCODE -ne 0) {
        throw "Cannot access repository"
    }
    Write-Host "✅ Repository access verified" -ForegroundColor Green
}
catch {
    Write-Host "❌ Cannot access repository '$GitHubOrg/$GitHubRepo'." -ForegroundColor Red
    Write-Host "   Please check:" -ForegroundColor Yellow
    Write-Host "   1. Repository name is correct" -ForegroundColor White
    Write-Host "   2. You have admin access to the repository" -ForegroundColor White
    Write-Host "   3. Repository exists" -ForegroundColor White
    exit 1
}

# Function to add secret
function Add-GitHubSecret {
    param(
        [string]$SecretName,
        [string]$SecretValue
    )
    
    Write-Host "🔐 Adding secret: $SecretName" -ForegroundColor Cyan
    
    try {
        $SecretValue | gh secret set $SecretName --repo "$GitHubOrg/$GitHubRepo"
        if ($LASTEXITCODE -eq 0) {
            Write-Host "   ✅ Secret '$SecretName' added successfully!" -ForegroundColor Green
        }
        else {
            throw "Failed to add secret"
        }
    }
    catch {
        Write-Host "   ❌ Failed to add secret '$SecretName': $($_.Exception.Message)" -ForegroundColor Red
        return $false
    }
    return $true
}

# Add all secrets
Write-Host ""
Write-Host "🔐 Adding secrets to GitHub repository..." -ForegroundColor Cyan

$success = $true
$success = (Add-GitHubSecret -SecretName "AZURE_CLIENT_ID" -SecretValue $AzureClientId) -and $success
$success = (Add-GitHubSecret -SecretName "AZURE_TENANT_ID" -SecretValue $AzureTenantId) -and $success
$success = (Add-GitHubSecret -SecretName "AZURE_SUBSCRIPTION_ID" -SecretValue $AzureSubscriptionId) -and $success

if (!$success) {
    Write-Host "❌ Some secrets failed to be added. Please check the errors above." -ForegroundColor Red
    exit 1
}

# List current secrets (without values)
Write-Host ""
Write-Host "📋 Current repository secrets:" -ForegroundColor Cyan
gh secret list --repo "$GitHubOrg/$GitHubRepo"

Write-Host ""
Write-Host "🎉 GitHub secrets setup completed!" -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "✅ Added secrets:" -ForegroundColor Green
Write-Host "   - AZURE_CLIENT_ID" -ForegroundColor White
Write-Host "   - AZURE_TENANT_ID" -ForegroundColor White
Write-Host "   - AZURE_SUBSCRIPTION_ID" -ForegroundColor White
Write-Host ""
Write-Host "📋 Next steps:" -ForegroundColor Cyan
Write-Host "1. Create your Azure Static Web App resource:" -ForegroundColor Yellow
Write-Host "   az staticwebapp create \" -ForegroundColor White
Write-Host "     --name 'swa-kennethheine-com' \" -ForegroundColor White
Write-Host "     --resource-group 'rg-kennethheine-prod' \" -ForegroundColor White
Write-Host "     --source 'https://github.com/$GitHubOrg/$GitHubRepo' \" -ForegroundColor White
Write-Host "     --location 'West Europe' \" -ForegroundColor White
Write-Host "     --branch 'main' \" -ForegroundColor White
Write-Host "     --app-location 'static-web-app/src' \" -ForegroundColor White
Write-Host "     --output-location ''" -ForegroundColor White
Write-Host ""
Write-Host "2. Get the deployment token and add it as AZURE_STATIC_WEB_APPS_API_TOKEN:" -ForegroundColor Yellow
Write-Host "   az staticwebapp secrets list --name 'swa-kennethheine-com' --resource-group 'rg-kennethheine-prod'" -ForegroundColor White
Write-Host ""
Write-Host "3. Commit and push your changes to trigger the first deployment!" -ForegroundColor Yellow
