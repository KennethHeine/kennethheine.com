# kennethheine.com

[![Deploy Infrastructure](https://github.com/KS-Cloud-org/kennethheine.com/actions/workflows/deploy-infrastructure.yml/badge.svg)](https://github.com/KS-Cloud-org/kennethheine.com/actions/workflows/deploy-infrastructure.yml)
[![Deploy Frontend](https://github.com/KS-Cloud-org/kennethheine.com/actions/workflows/deploy-frontend.yml/badge.svg)](https://github.com/KS-Cloud-org/kennethheine.com/actions/workflows/deploy-frontend.yml)
[![Test Coverage](https://github.com/KennethHeine/kennethheine.com/actions/workflows/test-coverage.yml/badge.svg)](https://github.com/KennethHeine/kennethheine.com/actions/workflows/test-coverage.yml)
[![codecov](https://codecov.io/gh/KennethHeine/kennethheine.com/branch/main/graph/badge.svg)](https://codecov.io/gh/KennethHeine/kennethheine.com)

## 🌐 Live Site

**🎉 [Visit the Live Website → kennethheine.com](https://kennethheine.com) 🎉**

A modern Next.js website deployed on Azure Static Web Apps using Infrastructure as Code (IaC) with Bicep templates and GitHub Actions CI/CD pipelines.

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
- ✅ **Production Environment**: Fully configured and deployed
- ✅ **Automated Deployment**: GitHub Actions workflow with comprehensive validation

### Frontend Application
- ✅ **Next.js 15**: Modern React framework with App Router and static export
- ✅ **TypeScript**: Full type safety with strict configuration
- ✅ **Tailwind CSS v4**: Modern utility-first CSS framework with CSS variable-based theming
- ✅ **MDX Blog**: Blog system with syntax highlighting and gray-matter
- ✅ **Testing**: Jest + React Testing Library with comprehensive coverage
- ✅ **Preview Deployments**: Automatic preview environments for pull requests

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
- ✅ **Preview Environments**: Automatic preview deployments for frontend changes
- ✅ **Dual Pipelines**: Separate workflows for infrastructure and frontend deployments

## 📁 Project Structure

```
kennethheine.com/
├── .github/                     # GitHub configuration
│   ├── workflows/               # GitHub Actions workflows
│   │   ├── deploy-infrastructure.yml  # Infrastructure deployment pipeline
│   │   ├── deploy-frontend.yml        # Frontend deployment pipeline
│   │   ├── destroy-infrastructure.yml # Infrastructure cleanup pipeline
│   │   ├── copilot-setup-steps.yml    # Copilot environment setup
│   │   └── README.md
│   ├── copilot-instructions.md  # Copilot AI guidelines and best practices
│   ├── pull_request_template.md # PR template
│   └── CODEOWNERS               # Code ownership configuration
├── infra/                      # Bicep infrastructure templates
│   ├── main.bicep
│   ├── bicepconfig.json
│   ├── modules/
│   │   └── static-web-app-with-domain.bicep
│   ├── parameters/
│   │   └── production.bicepparam
│   └── README.md
├── scripts/                    # PowerShell setup scripts
│   ├── 0-enable-resource-providers-cli.ps1
│   ├── 1-create-resource-group.ps1
│   ├── 2-create-app-registration.ps1
│   ├── 3-setup-github-secrets.ps1
│   ├── 4-fix-custom-domain-permissions.ps1
│   └── README.md
├── static-web-app/            # Next.js application source code
│   ├── app/                   # Next.js 15 App Router pages
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Homepage
│   │   ├── about/             # About page
│   │   ├── blog/              # Blog pages
│   │   └── contact/           # Contact page
│   ├── components/            # Reusable React components
│   ├── content/               # MDX blog posts
│   │   └── posts/             # Blog post files
│   ├── lib/                   # Utility functions and helpers
│   ├── public/                # Static assets and images
│   ├── __tests__/             # Jest test files
│   ├── coverage/              # Test coverage reports
│   ├── types/                 # TypeScript type definitions
│   ├── src/                   # Legacy HTML files (for reference)
│   ├── package.json
│   ├── next.config.mjs
│   ├── tailwind.config.ts
│   ├── tsconfig.json
│   ├── jest.config.js
│   ├── staticwebapp.config.json
│   └── README.md
├── prompts/                   # Development prompts and documentation
├── .gitignore                 # Git ignore patterns
├── CUSTOM_DOMAIN_FIX.md       # Custom domain configuration troubleshooting
├── INFRASTRUCTURE_STATUS.md   # Current infrastructure deployment status
└── PREVIEW_DEPLOYMENT_FIX.md  # Preview deployment troubleshooting guide
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
# 0. Enable required Azure resource providers (if needed)
.\scripts\0-enable-resource-providers-cli.ps1

# 1. Create resource group (optional - can be done via Bicep)
.\scripts\1-create-resource-group.ps1

# 2. Create app registration and federated credentials
.\scripts\2-create-app-registration.ps1

# 3. Configure GitHub repository secrets
.\scripts\3-setup-github-secrets.ps1

# 4. Fix custom domain permissions (if using custom domain)
.\scripts\4-fix-custom-domain-permissions.ps1
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
4. Choose the production environment

## 📋 Available Workflows

### Deploy Infrastructure
- **Triggers**: Push to main, PR to main, manual dispatch
- **Purpose**: Deploy Azure infrastructure using Bicep templates
- **Features**: Validation, What-If analysis, retry logic, comprehensive reporting

### Deploy Frontend
- **Triggers**: Push to main, PR to main (for changes in static-web-app/)
- **Purpose**: Deploy Next.js application to Azure Static Web Apps
- **Features**: Next.js build validation, preview deployments, automated testing

### Destroy Infrastructure
- **Triggers**: Manual dispatch only (for safety)
- **Purpose**: Safely destroy Azure resources
- **Features**: Environment selection, confirmation prompts

### Preview Deployments
- **Automatic**: Created for every pull request
- **URL Format**: `https://{swa-name}-{pr-number}.{region}.azurestaticapps.net`
- **Cleanup**: Automatically removed when PR is closed or merged

## 🔧 Development

### Local Development
```bash
# Navigate to the Next.js application directory
cd static-web-app

# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test

# Build for production
npm run build
```

### Infrastructure Changes

1. Modify Bicep templates in `infra/`
2. Update parameters in `infra/parameters/`
3. Create a pull request
4. Review What-If analysis in PR comments
5. Merge to deploy changes

### Adding New Environments (Optional)

To add additional environments beyond production:

1. Create new parameter file: `infra/parameters/{environment}.bicepparam`
2. Update workflow to include new environment option
3. Configure federated credentials for new environment
4. Update Azure resource naming to avoid conflicts

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

- **Live Website**: [https://delightful-plant-090231a03.6.azurestaticapps.net](https://delightful-plant-090231a03.6.azurestaticapps.net) (Default Azure URL)
- **Custom Domain**: [https://kennethheine.com](https://kennethheine.com) ✅ **LIVE!**
- **Azure Portal**: [Static Web App Resource](https://portal.azure.com)
- **GitHub Actions**: [Workflow Runs](https://github.com/KS-Cloud-org/kennethheine.com/actions)

## 📚 Documentation

### Primary Documentation
- [Infrastructure Documentation](./infra/README.md)
- [Workflow Documentation](./.github/workflows/README.md)
- [Setup Scripts Documentation](./scripts/README.md)
- [Static Web App Documentation](./static-web-app/README.md)

### Troubleshooting & Status
- [Infrastructure Status](./INFRASTRUCTURE_STATUS.md) - Current deployment status and configuration
- [Custom Domain Fix](./CUSTOM_DOMAIN_FIX.md) - Custom domain configuration troubleshooting
- [Preview Deployment Fix](./PREVIEW_DEPLOYMENT_FIX.md) - Preview deployment troubleshooting guide

### Development Guidelines
- [Copilot Instructions](./.github/copilot-instructions.md) - AI-assisted development guidelines and best practices

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test infrastructure changes with What-If analysis
5. Submit a pull request

## 📄 License

This project is open source. See individual files for specific licensing information.

## 🙏 Acknowledgments

- Azure Static Web Apps team for the excellent platform
- GitHub Actions team for the robust CI/CD platform
- Azure Bicep team for the amazing IaC tooling
