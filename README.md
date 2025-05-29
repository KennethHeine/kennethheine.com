# kennethheine.com

[![Deploy Infrastructure](https://github.com/KS-Cloud-org/kennethheine.com/actions/workflows/deploy-infrastructure.yml/badge.svg)](https://github.com/KS-Cloud-org/kennethheine.com/actions/workflows/deploy-infrastructure.yml)

A modern static website deployed on Azure Static Web Apps using Infrastructure as Code (IaC) with Bicep templates and GitHub Actions.

## 🏗️ Architecture

This project demonstrates a complete Infrastructure as Code setup for Azure Static Web Apps with:

- **Azure Static Web Apps** - Hosting the static website
- **Bicep Templates** - Infrastructure as Code for resource provisioning
- **GitHub Actions** - CI/CD pipeline with federated identity authentication
- **PowerShell Scripts** - Azure setup and configuration automation

## 🚀 Features

### Infrastructure
- ✅ **Infrastructure as Code**: Complete Bicep template structure
- ✅ **Federated Identity**: Secure authentication without long-lived secrets
- ✅ **Multi-environment**: Support for production and staging environments
- ✅ **Automated Deployment**: GitHub Actions workflow with comprehensive validation

### Security
- ✅ **OIDC Authentication**: No secrets stored in GitHub
- ✅ **Least Privilege**: Minimal RBAC permissions
- ✅ **Secure Token Retrieval**: Dynamic deployment token acquisition
- ✅ **Audit Trail**: Complete deployment tracking

### DevOps
- ✅ **What-If Analysis**: Preview infrastructure changes in PRs
- ✅ **Validation Pipeline**: Comprehensive template validation
- ✅ **Retry Logic**: Automatic handling of transient failures
- ✅ **Deployment Artifacts**: Complete deployment information tracking

## 📁 Project Structure

```
kennethheine.com/
├── .github/workflows/          # GitHub Actions workflows
│   ├── deploy-infrastructure.yml
│   ├── destroy-infrastructure.yml
│   └── README.md
├── infra/                      # Bicep infrastructure templates
│   ├── main.bicep
│   ├── bicepconfig.json
│   ├── modules/
│   │   └── static-web-app.bicep
│   ├── parameters/
│   │   └── production.bicepparam
│   └── README.md
├── scripts/                    # PowerShell setup scripts
│   ├── 1-create-resource-group.ps1
│   ├── 2-create-app-registration.ps1
│   ├── 3-setup-github-secrets.ps1
│   └── README.md
└── static-web-app/            # Website source code
    ├── src/
    │   ├── index.html
    │   ├── css/
    │   └── js/
    ├── staticwebapp.config.json
    └── README.md
```

## 🛠️ Setup Instructions

### Prerequisites
- Azure subscription with appropriate permissions
- GitHub repository
- PowerShell 7+ (for setup scripts)
- Azure CLI

### 1. Initial Azure Setup

Run the setup scripts in order:

```powershell
# 1. Create resource group (optional - can be done via Bicep)
.\scripts\1-create-resource-group.ps1

# 2. Create app registration and federated credentials
.\scripts\2-create-app-registration.ps1

# 3. Configure GitHub repository secrets
.\scripts\3-setup-github-secrets.ps1
```

### 2. GitHub Repository Configuration

Add these secrets to your GitHub repository:

- `AZURE_SUBSCRIPTION_ID` - Your Azure subscription ID
- `AZURE_TENANT_ID` - Your Azure AD tenant ID
- `AZURE_CLIENT_ID` - The app registration client ID

### 3. Deploy Infrastructure

#### Automatic Deployment
Push changes to the `main` branch with modifications to files in the `infra/` directory:

```bash
git add infra/
git commit -m "Update infrastructure"
git push origin main
```

#### Manual Deployment
1. Go to the Actions tab in GitHub
2. Select "Deploy Infrastructure"
3. Click "Run workflow"
4. Choose environment (production/staging)

## 📋 Available Workflows

### Deploy Infrastructure
- **Triggers**: Push to main, PR to main, manual dispatch
- **Purpose**: Deploy Azure infrastructure using Bicep templates
- **Features**: Validation, What-If analysis, retry logic, comprehensive reporting

### Destroy Infrastructure
- **Triggers**: Manual dispatch only
- **Purpose**: Safely destroy Azure resources
- **Features**: Environment selection, confirmation prompts

## 🔧 Development

### Local Development
```bash
# Navigate to the static web app directory
cd static-web-app

# Install dependencies (if using a build process)
npm install

# Serve locally (if using a static server)
npx serve src
```

### Infrastructure Changes

1. Modify Bicep templates in `infra/`
2. Update parameters in `infra/parameters/`
3. Create a pull request
4. Review What-If analysis in PR comments
5. Merge to deploy changes

### Adding New Environments

1. Create new parameter file: `infra/parameters/{environment}.bicepparam`
2. Update workflow to include new environment option
3. Configure federated credentials for new environment

## 📊 Monitoring

### Deployment Status
- GitHub Actions provides real-time deployment status
- Azure Portal shows resource health and metrics
- Deployment artifacts contain complete deployment information

### Troubleshooting
- Check workflow logs for detailed error information
- Review Azure Activity Log for deployment details
- Verify federated identity configuration if authentication fails

## 🔗 Links

- **Live Website**: [https://kennethheine.com](https://kennethheine.com)
- **Azure Portal**: [Static Web App Resource](https://portal.azure.com)
- **GitHub Actions**: [Workflow Runs](https://github.com/KS-Cloud-org/kennethheine.com/actions)

## 📚 Documentation

- [Infrastructure Documentation](./infra/README.md)
- [Workflow Documentation](./.github/workflows/README.md)
- [Setup Scripts Documentation](./scripts/README.md)
- [Static Web App Documentation](./static-web-app/README.md)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test infrastructure changes with What-If analysis
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Azure Static Web Apps team for the excellent platform
- GitHub Actions team for the robust CI/CD platform
- Azure Bicep team for the amazing IaC tooling
