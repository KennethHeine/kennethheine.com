# Script 1: Create Resource Group (PowerShell)
# This script creates the Azure resource group for the static web app

param(
    [Parameter(Mandatory = $false)]
    [string]$ResourceGroupName = "rg-kennethheine-prod",
    
    [Parameter(Mandatory = $false)]
    [string]$Location = "westeurope"
)

$ErrorActionPreference = "Stop"

# Configuration
$Tags = @{
    "project" = "kennethheine-com"
    "environment" = "production"
}

Write-Host "🚀 Creating Azure Resource Group..." -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Cyan

# Check if user is logged in
Write-Host "🔍 Checking Azure CLI authentication..." -ForegroundColor Cyan
try {
    $accountInfo = az account show | ConvertFrom-Json
    if (!$accountInfo) {
        throw "Not logged in"
    }
    Write-Host "✅ Logged in to Azure" -ForegroundColor Green
    Write-Host "📋 Current subscription: $($accountInfo.name) ($($accountInfo.id))" -ForegroundColor Yellow
}
catch {
    Write-Host "❌ Not logged in to Azure. Please run 'az login' first." -ForegroundColor Red
    exit 1
}

# Check if resource group already exists
Write-Host ""
Write-Host "🔍 Checking if resource group '$ResourceGroupName' exists..." -ForegroundColor Cyan

$rgExists = $false
try {
    $existingRg = az group show --name $ResourceGroupName 2>$null | ConvertFrom-Json
    if ($existingRg) {
        $rgExists = $true
        Write-Host "⚠️  Resource group '$ResourceGroupName' already exists." -ForegroundColor Yellow
        Write-Host "   Location: $($existingRg.location)" -ForegroundColor Yellow
        
        $continue = Read-Host "Do you want to continue with the existing resource group? (y/N)"
        if ($continue -notmatch "^[Yy]$") {
            Write-Host "❌ Aborted by user." -ForegroundColor Red
            exit 1
        }
    }
}
catch {
    # Resource group doesn't exist, which is fine
    $rgExists = $false
}

# Create resource group if it doesn't exist
if (-not $rgExists) {
    Write-Host "📁 Creating resource group '$ResourceGroupName' in '$Location'..." -ForegroundColor Cyan
    
    $tagString = ($Tags.GetEnumerator() | ForEach-Object { "$($_.Key)=$($_.Value)" }) -join " "
    
    try {
        $result = az group create --name $ResourceGroupName --location $Location --tags $tagString | ConvertFrom-Json
        if ($result) {
            Write-Host "✅ Resource group created successfully!" -ForegroundColor Green
        } else {
            throw "Failed to create resource group"
        }
    }
    catch {
        Write-Host "❌ Failed to create resource group: $($_.Exception.Message)" -ForegroundColor Red
        exit 1
    }
}

# Show resource group details
Write-Host ""
Write-Host "📋 Resource Group Details:" -ForegroundColor Cyan
az group show --name $ResourceGroupName --query "{name:name, location:location, id:id}" -o table

Write-Host ""
Write-Host "🎉 Resource group setup completed!" -ForegroundColor Green
Write-Host "Next step: Run '2-create-app-registration.ps1' to create the app registration." -ForegroundColor Yellow
