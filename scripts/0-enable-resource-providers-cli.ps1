# Enable Required Azure Resource Providers using Azure CLI
# This script registers the necessary resource providers for Azure Static Web Apps deployment
# Run this script before deploying your infrastructure to ensure all required providers are enabled

param(
    [Parameter(Mandatory = $false)]
    [string]$SubscriptionId,
    
    [Parameter(Mandatory = $false)]
    [switch]$WhatIf
)

# Function to check if Azure CLI is installed and user is logged in
function Test-AzureCLI {
    try {
        $null = az account show 2>$null
        if ($LASTEXITCODE -ne 0) {
            return $false
        }
        return $true
    }
    catch {
        return $false
    }
}

# Function to enable a resource provider using Azure CLI
function Enable-ResourceProvider {
    param(
        [string]$ProviderNamespace,
        [string]$Description,
        [bool]$WhatIfMode
    )
    
    Write-Host "🔍 Checking resource provider: $ProviderNamespace ($Description)" -ForegroundColor Cyan
    
    try {
        # Get current provider status
        $providerInfo = az provider show --namespace $ProviderNamespace --output json 2>$null | ConvertFrom-Json
        
        if ($null -eq $providerInfo) {
            Write-Host "❌ Provider $ProviderNamespace not found" -ForegroundColor Red
            return $false
        }
        
        $registrationState = $providerInfo.registrationState
        
        if ($registrationState -eq "Registered") {
            Write-Host "✅ $ProviderNamespace is already registered" -ForegroundColor Green
            return $true
        }
        elseif ($registrationState -eq "Registering") {
            Write-Host "⏳ $ProviderNamespace is currently registering..." -ForegroundColor Yellow
            return $true
        }
        else {
            if ($WhatIfMode) {
                Write-Host "📋 WHAT-IF: Would register $ProviderNamespace" -ForegroundColor Yellow
                return $true
            }
            else {
                Write-Host "🔧 Registering $ProviderNamespace..." -ForegroundColor Yellow
                $registerResult = az provider register --namespace $ProviderNamespace --output json 2>$null
                
                if ($LASTEXITCODE -ne 0) {
                    Write-Host "❌ Failed to initiate registration for $ProviderNamespace" -ForegroundColor Red
                    return $false
                }
                
                # Wait for registration to complete (timeout after 5 minutes)
                $timeout = 300 # 5 minutes
                $timer = 0
                
                do {
                    Start-Sleep -Seconds 10
                    $timer += 10
                    
                    $providerStatus = az provider show --namespace $ProviderNamespace --output json 2>$null | ConvertFrom-Json
                    $state = $providerStatus.registrationState
                    
                    Write-Host "⏳ Registration state: $state (${timer}s elapsed)" -ForegroundColor Yellow
                    
                    if ($timer -ge $timeout) {
                        Write-Host "⚠️ Registration timeout for $ProviderNamespace. Check status manually." -ForegroundColor Yellow
                        return $false
                    }
                } while ($state -eq "Registering")
                
                if ($state -eq "Registered") {
                    Write-Host "✅ $ProviderNamespace registered successfully" -ForegroundColor Green
                    return $true
                }
                else {
                    Write-Host "❌ Failed to register $ProviderNamespace. State: $state" -ForegroundColor Red
                    return $false
                }
            }
        }
    }
    catch {
        Write-Host "❌ Error checking/registering $ProviderNamespace`: $($_.Exception.Message)" -ForegroundColor Red
        return $false
    }
}

# Main script execution
Write-Host "🚀 Starting Azure Resource Provider Registration (Azure CLI)" -ForegroundColor Magenta
Write-Host "==========================================================" -ForegroundColor Magenta

# Check if Azure CLI is installed
try {
    $null = az version 2>$null
    if ($LASTEXITCODE -ne 0) {
        throw "Azure CLI not found"
    }
}
catch {
    Write-Host "❌ Azure CLI is not installed or not in PATH." -ForegroundColor Red
    Write-Host "📦 Install it from: https://docs.microsoft.com/cli/azure/install-azure-cli" -ForegroundColor Yellow
    exit 1
}

# Check if user is logged in
if (-not (Test-AzureCLI)) {
    Write-Host "❌ Not logged in to Azure. Please run 'az login' first." -ForegroundColor Red
    exit 1
}

# Set subscription context if provided
if ($SubscriptionId) {
    try {
        Write-Host "🔧 Setting subscription context to: $SubscriptionId" -ForegroundColor Cyan
        az account set --subscription $SubscriptionId
        if ($LASTEXITCODE -ne 0) {
            throw "Failed to set subscription"
        }
    }
    catch {
        Write-Host "❌ Failed to set subscription context to $SubscriptionId" -ForegroundColor Red
        exit 1
    }
}

# Get current subscription info
try {
    $accountInfo = az account show --output json | ConvertFrom-Json
    Write-Host "📋 Current subscription: $($accountInfo.name) ($($accountInfo.id))" -ForegroundColor Cyan
}
catch {
    Write-Host "❌ Failed to get current subscription info" -ForegroundColor Red
    exit 1
}

if ($WhatIf) {
    Write-Host "📋 WHAT-IF MODE: No changes will be made" -ForegroundColor Yellow
    Write-Host ""
}

# Define required resource providers for Azure Static Web Apps
$resourceProviders = @(
    @{
        Namespace = "Microsoft.Web"
        Description = "Required for Azure Static Web Apps, App Services, and web hosting"
    },
    @{
        Namespace = "Microsoft.Resources"
        Description = "Required for resource group and deployment operations"
    },
    @{
        Namespace = "Microsoft.Authorization"
        Description = "Required for role assignments and access management"
    },
    @{
        Namespace = "Microsoft.Insights"
        Description = "Required for monitoring and diagnostics (Application Insights)"
    },
    @{
        Namespace = "Microsoft.Storage"
        Description = "Required for backend storage and static content hosting"
    }
)

Write-Host ""
Write-Host "🔍 Checking and registering required resource providers..." -ForegroundColor Cyan
Write-Host ""

$results = @()
$allSuccess = $true

foreach ($provider in $resourceProviders) {
    $success = Enable-ResourceProvider -ProviderNamespace $provider.Namespace -Description $provider.Description -WhatIfMode $WhatIf
    $results += @{
        Provider = $provider.Namespace
        Success = $success
        Description = $provider.Description
    }
    
    if (-not $success) {
        $allSuccess = $false
    }
    
    Write-Host ""
}

# Summary
Write-Host "==========================================================" -ForegroundColor Magenta
Write-Host "📊 Resource Provider Registration Summary" -ForegroundColor Magenta
Write-Host ""

foreach ($result in $results) {
    $status = if ($result.Success) { "✅ SUCCESS" } else { "❌ FAILED" }
    $color = if ($result.Success) { "Green" } else { "Red" }
    Write-Host "$status $($result.Provider)" -ForegroundColor $color
}

Write-Host ""

if ($WhatIf) {
    Write-Host "📋 WHAT-IF: Review the providers that would be registered above" -ForegroundColor Yellow
    Write-Host "💡 Run the script without -WhatIf to actually register the providers" -ForegroundColor Cyan
}
elseif ($allSuccess) {
    Write-Host "🎉 All resource providers are now registered and ready!" -ForegroundColor Green
    Write-Host "✅ You can now proceed with your Azure Static Web App deployment" -ForegroundColor Green
}
else {
    Write-Host "⚠️ Some resource providers failed to register" -ForegroundColor Yellow
    Write-Host "🔧 Please review the errors above and try again" -ForegroundColor Yellow
    Write-Host "💡 You can also check provider status with: az provider list --query `"[?namespace=='Microsoft.Web']`"" -ForegroundColor Cyan
    exit 1
}

Write-Host ""
Write-Host "📚 Next steps:" -ForegroundColor Cyan
Write-Host "1. Run your GitHub Actions workflow to deploy infrastructure" -ForegroundColor White
Write-Host "2. Monitor the deployment in the Azure Portal" -ForegroundColor White
Write-Host "3. Configure your Static Web App settings as needed" -ForegroundColor White
Write-Host ""
Write-Host "🔗 Useful CLI commands:" -ForegroundColor Cyan
Write-Host "• Check provider status: az provider list --output table" -ForegroundColor White
Write-Host "• List subscriptions: az account list --output table" -ForegroundColor White
Write-Host "• Azure Portal: https://portal.azure.com" -ForegroundColor White
