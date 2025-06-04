# GitHub Branch Protection Setup Guide

## 📋 Overview

This guide provides comprehensive instructions for setting up branch protection rules for the main branch of the kennethheine.com repository. Branch protection ensures that all code changes go through proper review processes and automated quality checks before being merged to production.

## 🎯 Protection Requirements

### Required Settings
- **Protect main branch from direct pushes** - Prevents bypassing the review process
- **Require pull request reviews before merging** - Ensures code review quality
- **Require status checks to pass** - Validates automated quality gates  
- **Require branches to be up to date** - Prevents outdated code merges
- **Include administrators** - No exceptions, even for repository admins

### Status Checks Required
Based on the current GitHub Actions workflows, these status checks must pass:

| Status Check Name | Workflow Source | Purpose |
|-------------------|-----------------|---------|
| `Validate Frontend Code` | `deploy-frontend.yml` | Frontend code validation, build, and linting |
| `Test Coverage Analysis` | `test-coverage.yml` | Jest test execution and coverage validation |
| `What-If Analysis` | `deploy-infrastructure.yml` | Infrastructure change validation |

## 🔧 Setup Methods

### Method 1: GitHub Web Interface (Recommended)

#### Step 1: Navigate to Branch Protection Settings
1. Go to the repository: `https://github.com/KennethHeine/kennethheine.com`
2. Click on **Settings** tab
3. In the left sidebar, click **Branches**
4. Click **Add branch protection rule**

#### Step 2: Configure Protection Rule
1. **Branch name pattern:** `main`
2. **Protect matching branches:** ✅ Enabled

#### Step 3: Pull Request Settings
- ✅ **Require a pull request before merging**
  - ✅ **Require approvals:** 1
  - ✅ **Dismiss stale reviews when new commits are pushed**
  - ✅ **Require review from code owners** (when CODEOWNERS file exists)

#### Step 4: Status Check Settings  
- ✅ **Require status checks to pass before merging**
- ✅ **Require branches to be up to date before merging**
- **Required status checks:** Add each of these:
  - `Validate Frontend Code`
  - `Test Coverage Analysis` 
  - `What-If Analysis`

#### Step 5: Additional Restrictions
- ✅ **Restrict pushes that create files larger than 100MB**
- ✅ **Do not allow bypassing the above settings**
- ✅ **Include administrators**

#### Step 6: Save Configuration
- Click **Create** to apply the branch protection rule

### Method 2: GitHub CLI Automation

#### Prerequisites
- GitHub CLI installed and authenticated
- Repository admin permissions

#### Automated Setup Script
```bash
#!/bin/bash
# GitHub Branch Protection Setup Script
# Run this script with repository admin permissions

OWNER="KennethHeine"
REPO="kennethheine.com"

echo "🔧 Setting up branch protection for $OWNER/$REPO..."

# Create branch protection rule using GitHub CLI
gh api repos/$OWNER/$REPO/branches/main/protection \
  --method PUT \
  --field required_status_checks='{
    "strict": true,
    "contexts": [
      "Validate Frontend Code",
      "Test Coverage Analysis", 
      "What-If Analysis"
    ]
  }' \
  --field enforce_admins=true \
  --field required_pull_request_reviews='{
    "required_approving_review_count": 1,
    "dismiss_stale_reviews": true,
    "require_code_owner_reviews": true
  }' \
  --field restrictions=null

if [ $? -eq 0 ]; then
  echo "✅ Branch protection rules configured successfully!"
else
  echo "❌ Failed to configure branch protection rules"
  exit 1
fi
```

#### PowerShell Alternative
```powershell
# PowerShell GitHub Branch Protection Setup
param(
    [string]$Owner = "KennethHeine",
    [string]$Repo = "kennethheine.com"
)

Write-Host "🔧 Setting up branch protection for $Owner/$Repo..." -ForegroundColor Cyan

$protectionConfig = @{
    required_status_checks = @{
        strict = $true
        contexts = @(
            "Validate Frontend Code",
            "Test Coverage Analysis",
            "What-If Analysis"
        )
    }
    enforce_admins = $true
    required_pull_request_reviews = @{
        required_approving_review_count = 1
        dismiss_stale_reviews = $true
        require_code_owner_reviews = $true
    }
    restrictions = $null
} | ConvertTo-Json -Depth 3

try {
    gh api repos/$Owner/$Repo/branches/main/protection --method PUT --input - <<< $protectionConfig
    Write-Host "✅ Branch protection rules configured successfully!" -ForegroundColor Green
} catch {
    Write-Host "❌ Failed to configure branch protection rules: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}
```

## 🧪 Verification Steps

### 1. Test Direct Push Block
```bash
# This should fail with branch protection error
git checkout main
echo "test" > test-file.txt
git add test-file.txt
git commit -m "Test direct push"
git push origin main
# Expected: remote: error: GH006: Protected branch update failed
```

### 2. Test PR Requirement
```bash
# This should work
git checkout -b test-branch
echo "test" > test-file.txt
git add test-file.txt
git commit -m "Test PR workflow"
git push origin test-branch
# Create PR via GitHub web interface or CLI
```

### 3. Test Status Check Requirement
- Create a PR with failing tests
- Verify that merge is blocked until status checks pass
- Fix the tests and verify merge becomes available

### 4. Test Review Requirement
- Create a PR with passing status checks
- Verify that merge is blocked until review is provided
- Add required approval and verify merge becomes available

## 📊 Status Check Details

### Validate Frontend Code
- **Source:** `.github/workflows/deploy-frontend.yml`
- **Checks:** Frontend structure validation, dependency installation, Next.js build, code linting
- **Trigger:** Changes to `static-web-app/**` directory
- **Duration:** ~2-3 minutes

### Test Coverage Analysis  
- **Source:** `.github/workflows/test-coverage.yml`
- **Checks:** Jest test execution, coverage thresholds, Codecov upload
- **Trigger:** Changes to `static-web-app/**` directory
- **Duration:** ~1-2 minutes
- **Requirements:** Must maintain 90%+ coverage

### What-If Analysis
- **Source:** `.github/workflows/deploy-infrastructure.yml` 
- **Checks:** Bicep template validation, Azure deployment preview
- **Trigger:** Changes to `infra/**` directory
- **Duration:** ~1-2 minutes

## 🔍 Troubleshooting

### Common Issues

#### "Status check not found"
- **Cause:** Status check name doesn't match workflow job name
- **Solution:** Update status check name to match exact job name from workflow

#### "Required status checks not running"
- **Cause:** Workflow trigger conditions not met
- **Solution:** Ensure PR includes changes to the appropriate directory paths

#### "Administrator bypass not working"
- **Cause:** "Include administrators" setting is enabled
- **Solution:** This is intended - no one should bypass protection rules

### Status Check Names Reference
If status checks don't appear in the dropdown, use these exact names from the workflows:

```yaml
# From deploy-frontend.yml
- "Validate Frontend Code"

# From test-coverage.yml  
- "Test Coverage Analysis"

# From deploy-infrastructure.yml
- "What-If Analysis"
```

## 📚 Related Documentation

- [GitHub Branch Protection Documentation](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/defining-the-mergeability-of-pull-requests/about-protected-branches)
- [Repository Contributing Guidelines](../CONTRIBUTING.md)
- [GitHub Actions Workflow Documentation](.github/workflows/README.md)
- [Phase 0 Foundation Setup](./improvement-plan/phase-0-foundation.md)

## ✅ Completion Checklist

- [ ] Branch protection rule created for `main` branch
- [ ] Pull request reviews required (minimum 1 approval)
- [ ] Status checks configured and required
- [ ] Stale review dismissal enabled
- [ ] Administrator restrictions included
- [ ] Direct push prevention verified
- [ ] PR workflow tested successfully
- [ ] Status check requirements validated
- [ ] Team members notified of new workflow

## 🎯 Success Criteria

Branch protection is successfully configured when:
1. ❌ Direct pushes to main branch are blocked
2. ✅ Pull requests can be created from feature branches
3. ✅ Status checks run automatically on PRs
4. ❌ PRs cannot be merged without required approvals
5. ❌ PRs cannot be merged with failing status checks
6. ✅ Approved PRs with passing checks can be merged
7. ✅ All team members understand the new workflow

---

*This configuration enforces code quality standards and prevents direct pushes to production, ensuring all changes go through proper review and validation processes.*