# GitHub Branch Protection Configuration Script
# This script configures branch protection rules for the main branch

[CmdletBinding()]
param(
    [Parameter(Mandatory = $false)]
    [string]$Owner = "KennethHeine",
    
    [Parameter(Mandatory = $false)]
    [string]$Repository = "kennethheine.com",
    
    [Parameter(Mandatory = $false)]
    [string]$Branch = "main",
    
    [Parameter(Mandatory = $false)]
    [int]$RequiredReviews = 1
)

# Set error action preference
$ErrorActionPreference = "Stop"

Write-Host "🔧 GitHub Branch Protection Configuration Script" -ForegroundColor Cyan
Write-Host "Repository: $Owner/$Repository" -ForegroundColor Yellow
Write-Host "Branch: $Branch" -ForegroundColor Yellow

# Check if GitHub CLI is installed
try {
    $ghVersion = gh --version
    Write-Host "✅ GitHub CLI is installed: $($ghVersion.Split("`n")[0])" -ForegroundColor Green
} catch {
    Write-Host "❌ GitHub CLI is not installed or not in PATH" -ForegroundColor Red
    Write-Host "Please install GitHub CLI from: https://cli.github.com/" -ForegroundColor Yellow
    exit 1
}

# Check if user is authenticated
try {
    $authStatus = gh auth status 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ GitHub CLI is authenticated" -ForegroundColor Green
    } else {
        Write-Host "❌ GitHub CLI is not authenticated" -ForegroundColor Red
        Write-Host "Please run: gh auth login" -ForegroundColor Yellow
        exit 1
    }
} catch {
    Write-Host "❌ Unable to check GitHub CLI authentication status" -ForegroundColor Red
    exit 1
}

# Define required status checks based on GitHub Actions workflows
$requiredStatusChecks = @(
    "Validate Frontend Code",
    "Test Coverage Analysis",
    "What-If Analysis"
)

Write-Host "📋 Configuring branch protection with the following settings:" -ForegroundColor Cyan
Write-Host "  • Branch: $Branch" -ForegroundColor White
Write-Host "  • Required reviews: $RequiredReviews" -ForegroundColor White
Write-Host "  • Stale review dismissal: Enabled" -ForegroundColor White
Write-Host "  • Status checks required: $($requiredStatusChecks.Count)" -ForegroundColor White
foreach ($check in $requiredStatusChecks) {
    Write-Host "    - $check" -ForegroundColor Gray
}
Write-Host "  • Include administrators: Yes" -ForegroundColor White
Write-Host "  • Strict status checks: Yes" -ForegroundColor White

# Confirm before proceeding
$confirmation = Read-Host "Do you want to proceed with branch protection configuration? (y/N)"
if ($confirmation -ne 'y' -and $confirmation -ne 'Y') {
    Write-Host "❌ Operation cancelled by user" -ForegroundColor Yellow
    exit 0
}

# Create the protection configuration
$protectionConfig = @{
    required_status_checks = @{
        strict = $true
        contexts = $requiredStatusChecks
    }
    enforce_admins = $true
    required_pull_request_reviews = @{
        required_approving_review_count = $RequiredReviews
        dismiss_stale_reviews = $true
        require_code_owner_reviews = $true
    }
    restrictions = $null
}

# Convert to JSON
$configJson = $protectionConfig | ConvertTo-Json -Depth 4

Write-Host "🚀 Applying branch protection configuration..." -ForegroundColor Cyan

try {
    # Apply branch protection using GitHub CLI
    $result = $configJson | gh api "repos/$Owner/$Repository/branches/$Branch/protection" --method PUT --input -
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Branch protection rules configured successfully!" -ForegroundColor Green
        
        # Display summary
        Write-Host "`n📊 Protection Summary:" -ForegroundColor Cyan
        Write-Host "  Repository: https://github.com/$Owner/$Repository" -ForegroundColor White
        Write-Host "  Protected Branch: $Branch" -ForegroundColor White
        Write-Host "  Direct Pushes: ❌ Blocked" -ForegroundColor Red
        Write-Host "  PR Reviews: ✅ Required ($RequiredReviews approval)" -ForegroundColor Green
        Write-Host "  Status Checks: ✅ Required ($($requiredStatusChecks.Count) checks)" -ForegroundColor Green
        Write-Host "  Admin Restrictions: ✅ Included" -ForegroundColor Green
        
        Write-Host "`n🎯 Next Steps:" -ForegroundColor Cyan
        Write-Host "  1. Test the protection by creating a feature branch" -ForegroundColor White
        Write-Host "  2. Create a pull request to verify status checks" -ForegroundColor White
        Write-Host "  3. Confirm review requirements are working" -ForegroundColor White
        Write-Host "  4. Notify team members of the new workflow" -ForegroundColor White
        
        Write-Host "`n📚 Resources:" -ForegroundColor Cyan
        Write-Host "  • Branch Protection Guide: docs/github-branch-protection.md" -ForegroundColor Gray
        Write-Host "  • Contributing Guidelines: CONTRIBUTING.md" -ForegroundColor Gray
        Write-Host "  • GitHub Repository Settings: https://github.com/$Owner/$Repository/settings/branches" -ForegroundColor Gray
        
    } else {
        Write-Host "❌ Failed to configure branch protection rules" -ForegroundColor Red
        Write-Host "Response: $result" -ForegroundColor Red
        exit 1
    }
} catch {
    Write-Host "❌ Error configuring branch protection: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "`n🔍 Troubleshooting:" -ForegroundColor Yellow
    Write-Host "  • Ensure you have admin permissions for the repository" -ForegroundColor White
    Write-Host "  • Verify the repository and branch names are correct" -ForegroundColor White
    Write-Host "  • Check that GitHub CLI is properly authenticated" -ForegroundColor White
    Write-Host "  • Confirm the status check names match your GitHub Actions workflows" -ForegroundColor White
    exit 1
}

Write-Host "`n🎉 Branch protection configuration completed successfully!" -ForegroundColor Green