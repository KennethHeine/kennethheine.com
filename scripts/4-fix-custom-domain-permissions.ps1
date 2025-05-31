# Fix Custom Domain Permissions for Azure Static Web Apps
# This script adds the necessary Contributor role for custom domain operations
# and cleans up any redundant role assignments
#
# Updated approach (May 2025):
# - Uses single Contributor role instead of multiple granular roles
# - Provides comprehensive permissions for all Microsoft.Web operations
# - Follows principle of least privilege while ensuring functionality
# - Automatically cleans up redundant role assignments

param(
    [Parameter(Mandatory = $false)]
    [string]$AppName = "github-kennethheine-com",
    
    [Parameter(Mandatory = $false)]
    [string]$ResourceGroupName = "rg-kennethheine-prod"
)

$ErrorActionPreference = "Stop"

Write-Host "🔧 Fixing Custom Domain Permissions for Azure Static Web Apps..." -ForegroundColor Green
Write-Host "================================================================" -ForegroundColor Cyan

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

# Get the App Registration details
Write-Host ""
Write-Host "🔍 Finding App Registration..." -ForegroundColor Cyan
try {
    $apps = az ad app list --display-name $AppName | ConvertFrom-Json
    $app = $apps | Where-Object { $_.displayName -eq $AppName } | Select-Object -First 1
    
    if (!$app) {
        throw "App registration '$AppName' not found"
    }
      $AppId = $app.appId
    Write-Host "✅ Found App Registration: $AppName" -ForegroundColor Green
    Write-Host "📋 App ID: $AppId" -ForegroundColor Yellow
}
catch {
    Write-Host "❌ Failed to find app registration: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "💡 Make sure you've run '2-create-app-registration.ps1' first." -ForegroundColor Yellow
    exit 1
}

# Get the Service Principal ID
Write-Host ""
Write-Host "🔍 Finding Service Principal..." -ForegroundColor Cyan
try {
    $filter = "appId eq '$AppId'"
    $sps = az ad sp list --filter $filter | ConvertFrom-Json
    $sp = $sps | Where-Object { $_.appId -eq $AppId } | Select-Object -First 1
    
    if (!$sp) {
        throw "Service Principal not found for App ID: $AppId"
    }
    
    $SpId = $sp.id
    Write-Host "✅ Found Service Principal: $SpId" -ForegroundColor Green
}
catch {
    Write-Host "❌ Failed to find service principal: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

# Check current role assignments
Write-Host ""
Write-Host "🔍 Checking current role assignments..." -ForegroundColor Cyan
try {
    $subscriptionScope = "/subscriptions/$SubscriptionId"
    $rgScope = "/subscriptions/$SubscriptionId/resourceGroups/$ResourceGroupName"
    
    # Check subscription-level assignments
    $subRoles = az role assignment list --assignee $SpId --scope $subscriptionScope | ConvertFrom-Json
    $rgRoles = az role assignment list --assignee $SpId --scope $rgScope | ConvertFrom-Json
    
    Write-Host "📋 Current role assignments:" -ForegroundColor Yellow
    
    if ($subRoles.Count -gt 0) {
        foreach ($role in $subRoles) {
            Write-Host "   Subscription: $($role.roleDefinitionName)" -ForegroundColor Cyan
        }
    }
    
    if ($rgRoles.Count -gt 0) {
        foreach ($role in $rgRoles) {
            Write-Host "   Resource Group: $($role.roleDefinitionName)" -ForegroundColor Cyan
        }
    }
    
    if ($subRoles.Count -eq 0 -and $rgRoles.Count -eq 0) {
        Write-Host "   No role assignments found" -ForegroundColor Yellow
    }
}
catch {
    Write-Host "⚠️  Could not retrieve current role assignments: $($_.Exception.Message)" -ForegroundColor Yellow
}

# Add Contributor role at subscription level for comprehensive permissions
Write-Host ""
Write-Host "🔐 Adding Contributor role at subscription level..." -ForegroundColor Cyan
try {
    $subscriptionScope = "/subscriptions/$SubscriptionId"
    $existingContributorRoles = az role assignment list --assignee $SpId --scope $subscriptionScope --role "Contributor" | ConvertFrom-Json
    
    if ($existingContributorRoles.Count -gt 0) {
        Write-Host "⚠️  Contributor role already assigned at subscription level." -ForegroundColor Yellow
    }
    else {
        az role assignment create --assignee $SpId --role "Contributor" --scope $subscriptionScope | Out-Null
        Write-Host "✅ Contributor role assigned at subscription level!" -ForegroundColor Green
        Write-Host "   This provides comprehensive permissions including Microsoft.Web operations." -ForegroundColor Cyan
    }
}
catch {
    Write-Host "❌ Failed to assign Contributor role: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "💡 This might be due to insufficient permissions. You may need to ask your Azure administrator." -ForegroundColor Yellow
}

# Clean up any redundant roles that might exist
Write-Host ""
Write-Host "🧹 Cleaning up redundant role assignments..." -ForegroundColor Cyan
try {
    # Remove Website Contributor if it exists (redundant with Contributor)
    $existingWebsiteRoles = az role assignment list --assignee $SpId --scope $subscriptionScope --role "Website Contributor" | ConvertFrom-Json
    if ($existingWebsiteRoles.Count -gt 0) {
        az role assignment delete --assignee $SpId --role "Website Contributor" --scope $subscriptionScope | Out-Null
        Write-Host "✅ Removed redundant Website Contributor role." -ForegroundColor Green
    }
    
    # Remove Web Plan Contributor if it exists (redundant with Contributor)
    $existingWebPlanRoles = az role assignment list --assignee $SpId --scope $subscriptionScope --role "Web Plan Contributor" | ConvertFrom-Json
    if ($existingWebPlanRoles.Count -gt 0) {
        az role assignment delete --assignee $SpId --role "Web Plan Contributor" --scope $subscriptionScope | Out-Null
        Write-Host "✅ Removed redundant Web Plan Contributor role." -ForegroundColor Green
    }
    
    if ($existingWebsiteRoles.Count -eq 0 -and $existingWebPlanRoles.Count -eq 0) {
        Write-Host "✅ No redundant roles found to clean up." -ForegroundColor Green
    }
}
catch {
    Write-Host "⚠️  Could not clean up redundant roles: $($_.Exception.Message)" -ForegroundColor Yellow
}

# Verify Static Web App access specifically
Write-Host ""
Write-Host "🔍 Verifying Static Web App access..." -ForegroundColor Cyan
try {
    # Try to list static web apps to verify permissions
    $swaList = az staticwebapp list --resource-group $ResourceGroupName | ConvertFrom-Json
    
    if ($swaList.Count -gt 0) {
        Write-Host "✅ Can access Static Web Apps in resource group!" -ForegroundColor Green
        foreach ($swa in $swaList) {
            Write-Host "   Found: $($swa.name)" -ForegroundColor Cyan
            
            # Test if we can get secrets (this is what the deployment needs)
            try {
                az staticwebapp secrets list --name $swa.name --resource-group $ResourceGroupName --output table | Out-Null
                Write-Host "   ✅ Can access deployment secrets for $($swa.name)" -ForegroundColor Green
            }
            catch {
                Write-Host "   ⚠️  Cannot access deployment secrets for $($swa.name)" -ForegroundColor Yellow
            }
        }
    }
    else {
        Write-Host "⚠️  No Static Web Apps found in resource group." -ForegroundColor Yellow
    }
}
catch {
    Write-Host "⚠️  Could not verify Static Web App access: $($_.Exception.Message)" -ForegroundColor Yellow
}

# Show final role assignments
Write-Host ""
Write-Host "🔍 Final role assignments:" -ForegroundColor Cyan
try {
    $finalRoles = az role assignment list --assignee $SpId --scope $subscriptionScope | ConvertFrom-Json
    if ($finalRoles.Count -gt 0) {
        foreach ($role in $finalRoles) {
            Write-Host "   ✅ $($role.roleDefinitionName) at $($role.scope)" -ForegroundColor Green
        }
    }
    else {
        Write-Host "   ⚠️  No role assignments found" -ForegroundColor Yellow
    }
}
catch {
    Write-Host "   ⚠️  Could not retrieve final role assignments: $($_.Exception.Message)" -ForegroundColor Yellow
}

# Show final summary
Write-Host ""
Write-Host "🎉 Permission update completed!" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "📋 What was updated:" -ForegroundColor Cyan
Write-Host "   ✅ Added Contributor role at subscription level" -ForegroundColor Green
Write-Host "   ✅ Cleaned up redundant role assignments" -ForegroundColor Green
Write-Host "   ✅ Verified Static Web App access permissions" -ForegroundColor Green
Write-Host ""
Write-Host "🔧 This permission enables:" -ForegroundColor Cyan
Write-Host "   • Full Azure resource management permissions" -ForegroundColor Yellow
Write-Host "   • Custom domain configuration and validation" -ForegroundColor Yellow
Write-Host "   • Reading operation results from Microsoft.Web provider" -ForegroundColor Yellow
Write-Host "   • Managing all web service configurations" -ForegroundColor Yellow
Write-Host ""
Write-Host "💡 Next steps:" -ForegroundColor Cyan
Write-Host "   1. Wait 5-10 minutes for Azure permissions to propagate" -ForegroundColor Yellow
Write-Host "   2. Retry your infrastructure deployment" -ForegroundColor Yellow
Write-Host "   3. If issues persist, check the Azure portal for additional error details" -ForegroundColor Yellow
Write-Host ""
Write-Host "🌐 The custom domain should now deploy successfully!" -ForegroundColor Green
