# Azure Static Web App Deployment Scripts

This folder contains scripts to set up Azure resources and GitHub OIDC authentication for deploying your static web app to Azure.

## 🎯 Overview

The deployment process is split into 3 main steps:

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

### PowerShell Scripts (.ps1)
- `1-create-resource-group.ps1` - Creates Azure resource group
- `2-create-app-registration.ps1` - Creates app registration and sets up RBAC
- `3-setup-github-secrets.ps1` - Adds secrets to GitHub repository

## 🔧 Customization

All scripts accept parameters for customization:

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

