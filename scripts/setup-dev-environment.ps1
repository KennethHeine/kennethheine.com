# Local Development Environment Setup Script
# This script automates the setup of a local development environment for new developers
# joining the kennethheine.com project

[CmdletBinding()]
param(
    [Parameter(Mandatory = $false)]
    [string]$NodeVersion = "lts",
    
    [Parameter(Mandatory = $false)]
    [switch]$SkipVSCode,
    
    [Parameter(Mandatory = $false)]
    [switch]$SkipProjectDeps,
    
    [Parameter(Mandatory = $false)]
    [switch]$WhatIf
)

# Set error action preference
$ErrorActionPreference = "Stop"

Write-Host "🚀 Local Development Environment Setup Script" -ForegroundColor Magenta
Write-Host "=============================================" -ForegroundColor Magenta
Write-Host "Setting up development environment for kennethheine.com" -ForegroundColor Cyan
Write-Host ""

# Function to check if running as administrator
function Test-Administrator {
    $currentUser = [Security.Principal.WindowsIdentity]::GetCurrent()
    $principal = New-Object Security.Principal.WindowsPrincipal($currentUser)
    return $principal.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
}

# Function to check PowerShell execution policy
function Test-ExecutionPolicy {
    $policy = Get-ExecutionPolicy
    $allowedPolicies = @("RemoteSigned", "Unrestricted", "Bypass")
    return $allowedPolicies -contains $policy
}

# Function to check if a command exists
function Test-Command {
    param([string]$Command)
    try {
        $null = Get-Command $Command -ErrorAction Stop
        return $true
    }
    catch {
        return $false
    }
}

# Function to get installed software version
function Get-SoftwareVersion {
    param(
        [string]$Command,
        [string]$VersionArg = "--version"
    )
    try {
        $output = & $Command $VersionArg 2>$null
        if ($LASTEXITCODE -eq 0) {
            return $output
        }
        return $null
    }
    catch {
        return $null
    }
}

# Function to install Node.js using winget
function Install-NodeJS {
    param([string]$Version = "lts")
    
    Write-Host "📦 Installing Node.js ($Version)..." -ForegroundColor Cyan
    
    if ($WhatIf) {
        Write-Host "   [WHAT-IF] Would install Node.js LTS via winget" -ForegroundColor Yellow
        return $true
    }
    
    try {
        if (Test-Command "winget") {
            $result = winget install OpenJS.NodeJS --accept-package-agreements --accept-source-agreements
            if ($LASTEXITCODE -eq 0) {
                Write-Host "✅ Node.js installed successfully" -ForegroundColor Green
                return $true
            }
        }
        else {
            Write-Host "❌ winget not available. Please install Node.js manually:" -ForegroundColor Red
            Write-Host "   Download from: https://nodejs.org/" -ForegroundColor Yellow
            return $false
        }
    }
    catch {
        Write-Host "❌ Failed to install Node.js: $($_.Exception.Message)" -ForegroundColor Red
        return $false
    }
}

# Function to install Azure CLI
function Install-AzureCLI {
    Write-Host "📦 Installing Azure CLI..." -ForegroundColor Cyan
    
    if ($WhatIf) {
        Write-Host "   [WHAT-IF] Would install Azure CLI via winget" -ForegroundColor Yellow
        return $true
    }
    
    try {
        if (Test-Command "winget") {
            $result = winget install Microsoft.AzureCLI --accept-package-agreements --accept-source-agreements
            if ($LASTEXITCODE -eq 0) {
                Write-Host "✅ Azure CLI installed successfully" -ForegroundColor Green
                return $true
            }
        }
        else {
            Write-Host "❌ winget not available. Please install Azure CLI manually:" -ForegroundColor Red
            Write-Host "   Download from: https://docs.microsoft.com/cli/azure/install-azure-cli" -ForegroundColor Yellow
            return $false
        }
    }
    catch {
        Write-Host "❌ Failed to install Azure CLI: $($_.Exception.Message)" -ForegroundColor Red
        return $false
    }
}

# Function to install Git
function Install-Git {
    Write-Host "📦 Installing Git..." -ForegroundColor Cyan
    
    if ($WhatIf) {
        Write-Host "   [WHAT-IF] Would install Git via winget" -ForegroundColor Yellow
        return $true
    }
    
    try {
        if (Test-Command "winget") {
            $result = winget install Git.Git --accept-package-agreements --accept-source-agreements
            if ($LASTEXITCODE -eq 0) {
                Write-Host "✅ Git installed successfully" -ForegroundColor Green
                return $true
            }
        }
        else {
            Write-Host "❌ winget not available. Please install Git manually:" -ForegroundColor Red
            Write-Host "   Download from: https://git-scm.com/" -ForegroundColor Yellow
            return $false
        }
    }
    catch {
        Write-Host "❌ Failed to install Git: $($_.Exception.Message)" -ForegroundColor Red
        return $false
    }
}

# Function to install VS Code
function Install-VSCode {
    Write-Host "📦 Installing Visual Studio Code..." -ForegroundColor Cyan
    
    if ($WhatIf) {
        Write-Host "   [WHAT-IF] Would install VS Code via winget" -ForegroundColor Yellow
        return $true
    }
    
    try {
        if (Test-Command "winget") {
            $result = winget install Microsoft.VisualStudioCode --accept-package-agreements --accept-source-agreements
            if ($LASTEXITCODE -eq 0) {
                Write-Host "✅ VS Code installed successfully" -ForegroundColor Green
                return $true
            }
        }
        else {
            Write-Host "❌ winget not available. Please install VS Code manually:" -ForegroundColor Red
            Write-Host "   Download from: https://code.visualstudio.com/" -ForegroundColor Yellow
            return $false
        }
    }
    catch {
        Write-Host "❌ Failed to install VS Code: $($_.Exception.Message)" -ForegroundColor Red
        return $false
    }
}

# Main script execution
try {
    # Check PowerShell execution policy
    Write-Host "🔍 Checking PowerShell execution policy..." -ForegroundColor Cyan
    if (-not (Test-ExecutionPolicy)) {
        Write-Host "⚠️  PowerShell execution policy is restrictive" -ForegroundColor Yellow
        Write-Host "   Current policy: $(Get-ExecutionPolicy)" -ForegroundColor Yellow
        
        if (Test-Administrator) {
            $setPolicyChoice = Read-Host "Do you want to set execution policy to RemoteSigned? (y/N)"
            if ($setPolicyChoice -eq 'y' -or $setPolicyChoice -eq 'Y') {
                if (-not $WhatIf) {
                    Set-ExecutionPolicy RemoteSigned -Scope LocalMachine -Force
                    Write-Host "✅ Execution policy set to RemoteSigned" -ForegroundColor Green
                }
                else {
                    Write-Host "   [WHAT-IF] Would set execution policy to RemoteSigned" -ForegroundColor Yellow
                }
            }
        }
        else {
            Write-Host "❌ Please run as administrator to change execution policy or manually set it:" -ForegroundColor Red
            Write-Host "   Set-ExecutionPolicy RemoteSigned -Scope CurrentUser" -ForegroundColor White
        }
    }
    else {
        Write-Host "✅ PowerShell execution policy is appropriate" -ForegroundColor Green
    }
    
    Write-Host ""
    
    # Check and install Node.js
    Write-Host "🔍 Checking Node.js installation..." -ForegroundColor Cyan
    if (Test-Command "node") {
        $nodeVersion = Get-SoftwareVersion "node" "--version"
        $npmVersion = Get-SoftwareVersion "npm" "--version"
        Write-Host "✅ Node.js is already installed" -ForegroundColor Green
        Write-Host "   Node.js version: $nodeVersion" -ForegroundColor Yellow
        Write-Host "   npm version: $npmVersion" -ForegroundColor Yellow
    }
    else {
        Write-Host "❌ Node.js is not installed" -ForegroundColor Red
        $installChoice = Read-Host "Do you want to install Node.js LTS? (y/N)"
        if ($installChoice -eq 'y' -or $installChoice -eq 'Y') {
            Install-NodeJS -Version $NodeVersion
        }
        else {
            Write-Host "⚠️  Skipping Node.js installation" -ForegroundColor Yellow
        }
    }
    
    Write-Host ""
    
    # Check and install Azure CLI
    Write-Host "🔍 Checking Azure CLI installation..." -ForegroundColor Cyan
    if (Test-Command "az") {
        $azVersion = Get-SoftwareVersion "az" "--version"
        Write-Host "✅ Azure CLI is already installed" -ForegroundColor Green
        Write-Host "   Azure CLI version: $($azVersion.Split("`n")[0])" -ForegroundColor Yellow
    }
    else {
        Write-Host "❌ Azure CLI is not installed" -ForegroundColor Red
        $installChoice = Read-Host "Do you want to install Azure CLI? (y/N)"
        if ($installChoice -eq 'y' -or $installChoice -eq 'Y') {
            Install-AzureCLI
        }
        else {
            Write-Host "⚠️  Skipping Azure CLI installation" -ForegroundColor Yellow
        }
    }
    
    Write-Host ""
    
    # Check and install Git
    Write-Host "🔍 Checking Git installation..." -ForegroundColor Cyan
    if (Test-Command "git") {
        $gitVersion = Get-SoftwareVersion "git" "--version"
        Write-Host "✅ Git is already installed" -ForegroundColor Green
        Write-Host "   Git version: $gitVersion" -ForegroundColor Yellow
    }
    else {
        Write-Host "❌ Git is not installed" -ForegroundColor Red
        $installChoice = Read-Host "Do you want to install Git? (y/N)"
        if ($installChoice -eq 'y' -or $installChoice -eq 'Y') {
            Install-Git
        }
        else {
            Write-Host "⚠️  Skipping Git installation" -ForegroundColor Yellow
        }
    }
    
    Write-Host ""
    
    # Check and install VS Code (optional)
    if (-not $SkipVSCode) {
        Write-Host "🔍 Checking Visual Studio Code installation..." -ForegroundColor Cyan
        if (Test-Command "code") {
            $codeVersion = Get-SoftwareVersion "code" "--version"
            Write-Host "✅ VS Code is already installed" -ForegroundColor Green
            Write-Host "   VS Code version: $($codeVersion.Split("`n")[0])" -ForegroundColor Yellow
        }
        else {
            Write-Host "❌ VS Code is not installed" -ForegroundColor Red
            $installChoice = Read-Host "Do you want to install Visual Studio Code? (y/N)"
            if ($installChoice -eq 'y' -or $installChoice -eq 'Y') {
                Install-VSCode
            }
            else {
                Write-Host "⚠️  Skipping VS Code installation" -ForegroundColor Yellow
            }
        }
        Write-Host ""
    }
    
    # Project setup
    if (-not $SkipProjectDeps) {
        Write-Host "🔍 Setting up project dependencies..." -ForegroundColor Cyan
        
        # Check if we're in the project directory
        $projectRoot = Split-Path -Parent $PSScriptRoot
        $staticWebAppPath = Join-Path $projectRoot "static-web-app"
        
        if (Test-Path $staticWebAppPath) {
            Write-Host "📁 Project directory found: $staticWebAppPath" -ForegroundColor Yellow
            
            if (Test-Command "npm") {
                if (-not $WhatIf) {
                    Write-Host "📦 Installing npm dependencies..." -ForegroundColor Cyan
                    Push-Location $staticWebAppPath
                    try {
                        npm install
                        if ($LASTEXITCODE -eq 0) {
                            Write-Host "✅ npm dependencies installed successfully" -ForegroundColor Green
                        }
                        else {
                            Write-Host "❌ Failed to install npm dependencies" -ForegroundColor Red
                        }
                    }
                    finally {
                        Pop-Location
                    }
                }
                else {
                    Write-Host "   [WHAT-IF] Would install npm dependencies in $staticWebAppPath" -ForegroundColor Yellow
                }
            }
            else {
                Write-Host "❌ npm not available. Node.js installation may have failed." -ForegroundColor Red
            }
        }
        else {
            Write-Host "❌ Project directory not found: $staticWebAppPath" -ForegroundColor Red
        }
        Write-Host ""
    }
    
    # Verification
    Write-Host "🔍 Verifying installation..." -ForegroundColor Cyan
    
    $verificationResults = @()
    
    # Verify Node.js
    if (Test-Command "node") {
        $nodeVersion = Get-SoftwareVersion "node" "--version"
        $verificationResults += "✅ Node.js: $nodeVersion"
    }
    else {
        $verificationResults += "❌ Node.js: Not found"
    }
    
    # Verify npm
    if (Test-Command "npm") {
        $npmVersion = Get-SoftwareVersion "npm" "--version"
        $verificationResults += "✅ npm: $npmVersion"
    }
    else {
        $verificationResults += "❌ npm: Not found"
    }
    
    # Verify Azure CLI
    if (Test-Command "az") {
        $azVersion = Get-SoftwareVersion "az" "--version"
        $verificationResults += "✅ Azure CLI: $($azVersion.Split("`n")[0])"
    }
    else {
        $verificationResults += "❌ Azure CLI: Not found"
    }
    
    # Verify Git
    if (Test-Command "git") {
        $gitVersion = Get-SoftwareVersion "git" "--version"
        $verificationResults += "✅ Git: $gitVersion"
    }
    else {
        $verificationResults += "❌ Git: Not found"
    }
    
    # Verify VS Code (if not skipped)
    if (-not $SkipVSCode) {
        if (Test-Command "code") {
            $codeVersion = Get-SoftwareVersion "code" "--version"
            $verificationResults += "✅ VS Code: $($codeVersion.Split("`n")[0])"
        }
        else {
            $verificationResults += "❌ VS Code: Not found"
        }
    }
    
    Write-Host ""
    Write-Host "📊 Installation Summary:" -ForegroundColor Magenta
    Write-Host "========================" -ForegroundColor Magenta
    foreach ($result in $verificationResults) {
        Write-Host $result
    }
    
    Write-Host ""
    Write-Host "🎉 Local development environment setup completed!" -ForegroundColor Green
    Write-Host ""
    Write-Host "📚 Next Steps:" -ForegroundColor Cyan
    Write-Host "1. Open the project in VS Code: code ." -ForegroundColor White
    Write-Host "2. Install recommended extensions when prompted" -ForegroundColor White
    Write-Host "3. Run 'cd static-web-app && npm run dev' to start development server" -ForegroundColor White
    Write-Host "4. Run 'cd static-web-app && npm test' to run tests" -ForegroundColor White
    Write-Host "5. See docs/local-development.md for detailed setup guide" -ForegroundColor White
    
}
catch {
    Write-Host "❌ Setup failed: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "Please check the error and try again or install manually." -ForegroundColor Yellow
    exit 1
}