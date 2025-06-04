# Azure Static Web App Deployment Scripts

This folder contains scripts to set up Azure resources, GitHub OIDC authentication, and local development environment for deploying your static web app to Azure.

## 🎯 Overview

The setup process includes:

### Development Environment Setup
1. **Local Development Setup** - Automated environment configuration for new developers

### Azure Deployment Process
1. **Create Resource Group** - Sets up the Azure resource group
2. **Create App Registration** - Sets up Azure AD app registration with federated credentials for GitHub OIDC
3. **Setup GitHub Secrets** - Adds required secrets to your GitHub repository

## 📋 Prerequisites

### Required Tools
- **Azure CLI** - [Install Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli)
- **GitHub CLI** (for script 3) - [Install GitHub CLI](https://cli.github.com/)

### Required Permissions
- **Azure**: Contributor access to create resource groups and App Registrations
- **GitHub**: Admin access to the repository to add secrets

## 🚀 Quick Start

### New Developer Setup

If you're setting up the development environment for the first time:

```powershell
# Clone the repository
git clone https://github.com/KennethHeine/kennethheine.com.git
cd kennethheine.com

# Run automated development environment setup
.\scripts\setup-dev-environment.ps1
```

See [docs/local-development.md](../docs/local-development.md) for detailed setup instructions and troubleshooting.

### Azure Deployment Setup

For setting up Azure infrastructure and CI/CD (typically done once per project):

### PowerShell Execution
```powershell
# Step 1: Create Resource Group
.\scripts\1-create-resource-group.ps1

# Step 2: Create App Registration and RBAC
.\scripts\2-create-app-registration.ps1

# Step 3: Setup GitHub Secrets
.\scripts\3-setup-github-secrets.ps1
```

## 📂 Available Scripts

### Development Environment Scripts (.ps1)
- `setup-dev-environment.ps1` - Automated local development environment setup

### Azure Deployment Scripts (.ps1)
- `0-enable-resource-providers-cli.ps1` - Enables required Azure resource providers
- `1-create-resource-group.ps1` - Creates Azure resource group
- `2-create-app-registration.ps1` - Creates app registration and sets up RBAC
- `3-setup-github-secrets.ps1` - Adds secrets to GitHub repository
- `4-fix-custom-domain-permissions.ps1` - Fixes custom domain configuration

### GitHub Configuration Scripts (.ps1)
- `setup-branch-protection.ps1` - Configures GitHub branch protection rules

## 🔧 Customization

All scripts accept parameters for customization:

### Development Environment Setup
```powershell
# Full automated setup
.\setup-dev-environment.ps1

# Preview mode (see what would be installed)
.\setup-dev-environment.ps1 -WhatIf

# Skip VS Code installation
.\setup-dev-environment.ps1 -SkipVSCode

# Skip project dependency installation
.\setup-dev-environment.ps1 -SkipProjectDeps
```

### Script 1: Create Resource Group
```powershell
.\1-create-resource-group.ps1 -ResourceGroupName "my-rg" -Location "eastus"
```

### Script 2: Create App Registration
```powershell
.\2-create-app-registration.ps1 -AppName "my-app" -ResourceGroupName "my-rg" -GitHubOrg "myorg" -GitHubRepo "myrepo"
```

### Script 3: Setup GitHub Secrets
```powershell
.\3-setup-github-secrets.ps1 -GitHubOrg "myorg" -GitHubRepo "myrepo"
```

### GitHub Configuration Script
```powershell
.\setup-branch-protection.ps1 -Owner "myorg" -Repository "myrepo" -RequiredReviews 2
```

## 🔑 What Gets Created

### Azure Resources
- **Resource Group**: `rg-kennethheine-prod` (or custom name)
- **App Registration**: `github-kennethheine-com` (or custom name)
- **Service Principal**: Created automatically for the app registration
- **Role Assignment**: Contributor role on the resource group
- **Federated Credentials**: For GitHub OIDC authentication

### GitHub Secrets
- `AZURE_CLIENT_ID` - App registration client ID
- `AZURE_TENANT_ID` - Azure tenant ID
- `AZURE_SUBSCRIPTION_ID` - Azure subscription ID

### GitHub Actions Workflow
- `.github/workflows/azure-static-web-apps-oidc.yml` - Workflow with OIDC authentication

## 🔒 Security Benefits

This setup uses **OpenID Connect (OIDC)** instead of long-lived secrets:

✅ **No long-lived secrets** stored in GitHub  
✅ **Automatic token rotation**  
✅ **Scoped access** to specific repositories and branches  
✅ **Enhanced security** with short-lived tokens  
✅ **Audit trail** in Azure AD  


**"Resource group already exists"**
- The scripts are idempotent and will use existing resources
- Answer 'y' when prompted to continue

**"App registration already exists"**
- The scripts will reuse existing app registrations
- Answer 'y' when prompted to continue

**"GitHub CLI not installed"**
- Install GitHub CLI or manually add secrets via GitHub web interface
- Manual instructions are provided in the script output

## 📞 Support

If you encounter issues:
1. Check the troubleshooting section above
2. Verify you have the required permissions
3. Ensure all prerequisites are installed
4. Check the Azure and GitHub CLI documentation

