# Copilot Instructions for kennethheine.com

This project is a modern Infrastructure as Code (IaC) implementation for deploying Azure Static Web Apps using Bicep templates and GitHub Actions. It features a comprehensive CI/CD pipeline with automated testing, preview deployments, and production releases.

## 📋 Project Overview

**Project Type:** Azure Static Web App with Infrastructure as Code and Next.js Frontend  
**Tech Stack:** Bicep, GitHub Actions, Next.js 14, TypeScript, Tailwind CSS, PowerShell, MDX  
**Deployment:** Azure Static Web Apps with federated identity authentication and preview deployments  
**Testing:** Jest + React Testing Library with comprehensive coverage  
**Content:** MDX-based blog system with gray-matter frontmatter processing  
**Author:** Kenneth Sølberg  
**Last Updated:** June 2025

## 🏗️ Architecture & Structure

### Core Components
- **`infra/`** - Bicep Infrastructure as Code templates (deployed and operational)
  - `main.bicep` - Main infrastructure template
  - `modules/` - Reusable Bicep modules for Static Web Apps
  - `parameters/` - Environment-specific parameters
  - `bicepconfig.json` - Bicep analyzer configuration
- **`static-web-app/`** - Next.js 14 application with TypeScript and Tailwind CSS
  - `app/` - Next.js App Router pages and layouts
  - `components/` - Reusable React components
  - `content/` - MDX blog posts and content
  - `lib/` - Utility functions and blog processing logic
  - `types/` - TypeScript type definitions
  - `__tests__/` - Jest test suites with comprehensive coverage
  - `staticwebapp.config.json` - Azure Static Web Apps routing configuration
- **`.github/workflows/`** - CI/CD pipeline definitions (infrastructure and frontend)
  - `deploy-infrastructure.yml` - Infrastructure deployment with what-if analysis
  - `deploy-frontend.yml` - Frontend deployment with preview environments
  - `destroy-infrastructure.yml` - Safe infrastructure teardown workflow
- **`scripts/`** - PowerShell automation scripts for Azure setup and configuration

### Key Technologies
- **Azure Static Web Apps** - Primary hosting platform with custom domain support (deployed)
- **Bicep** - Infrastructure as Code language with analyzer rules enabled
- **Next.js 14** - React framework with App Router, static export, and TypeScript
- **TypeScript** - Type-safe JavaScript with strict configuration and comprehensive types
- **Tailwind CSS** - Utility-first CSS framework with custom design system
- **GitHub Actions** - CI/CD automation with dual pipelines and OIDC authentication
- **OIDC/Federated Identity** - Secure authentication without secrets storage
- **PowerShell** - Azure configuration automation and setup scripts
- **Jest + React Testing Library** - Comprehensive testing framework with coverage reports
- **MDX** - Markdown with JSX for rich blog content and documentation
- **Gray-matter** - YAML frontmatter processing for blog metadata

### Project File Structure
```
kennethheine.com/
├── infra/                          # Infrastructure as Code
│   ├── main.bicep                  # Main Bicep template
│   ├── bicepconfig.json           # Bicep analyzer configuration
│   ├── modules/                   # Reusable Bicep modules
│   │   └── static-web-app-with-domain.bicep
│   └── parameters/                # Environment-specific parameters
│       └── production.bicepparam
├── static-web-app/                # Next.js application
│   ├── app/                       # Next.js App Router
│   │   ├── layout.tsx            # Root layout with theme provider
│   │   ├── page.tsx              # Home page
│   │   ├── about/page.tsx        # About page
│   │   ├── blog/                 # Blog pages
│   │   └── contact/page.tsx      # Contact page
│   ├── components/               # React components
│   │   ├── Layout.tsx            # Main layout component
│   │   ├── ThemeProvider.tsx     # Dark/light theme provider
│   │   ├── ThemeToggle.tsx       # Theme toggle button
│   │   └── icons/                # Icon components
│   ├── content/                  # MDX blog posts
│   │   └── posts/                # Blog post MDX files
│   ├── lib/                      # Utility functions
│   │   ├── blog.ts               # Blog processing logic
│   │   └── utils.ts              # Common utilities
│   ├── types/                    # TypeScript definitions
│   ├── __tests__/                # Jest test suites
│   ├── staticwebapp.config.json  # Azure SWA configuration
│   ├── next.config.mjs           # Next.js configuration
│   └── package.json              # Dependencies and scripts
├── .github/workflows/            # CI/CD pipelines
│   ├── deploy-infrastructure.yml # Infrastructure deployment
│   ├── deploy-frontend.yml       # Frontend deployment
│   └── destroy-infrastructure.yml # Safe teardown
└── scripts/                      # PowerShell automation
    ├── 0-enable-resource-providers-cli.ps1
    ├── 1-create-resource-group.ps1
    ├── 2-create-app-registration.ps1
    ├── 3-setup-github-secrets.ps1
    └── 4-fix-custom-domain-permissions.ps1
```

## 🎯 Code Generation Guidelines

### Infrastructure (Bicep)
- Always use the latest API versions (check Azure documentation)
- Follow the existing naming convention: `{resourceType}-{projectName}-{environment}`
- Use resource tokens for unique naming: `uniqueString(subscription().subscriptionId, resourceGroup().id)`
- Include comprehensive parameter descriptions with `@description()` decorators
- Apply consistent tagging strategy with project, environment, and managedBy tags
- Use modular approach - create reusable modules in `infra/modules/`
- Enable Bicep analyzer rules for security and best practices
- Target scope should be 'resourceGroup' for this project
- Use secure parameters (`@secure()`) for sensitive values

### GitHub Actions Workflows
- Use federated identity (OIDC) for Azure authentication - never store secrets
- Include comprehensive what-if analysis before deployments
- Add detailed logging with emojis for better readability (🔍, ✅, ❌, 🚀, etc.)
- Implement proper error handling and validation steps
- Create detailed GitHub step summaries with status information
- Use environment protection for production deployments
- Support both PR-triggered previews and main branch deployments
- Include manual workflow dispatch for ad-hoc deployments

### PowerShell Scripts
- Follow PowerShell best practices with proper error handling
- Use meaningful variable names and comments
- Include verbose output for troubleshooting
- Implement retry logic for transient Azure failures
- Use approved PowerShell verbs (Get-, Set-, New-, Remove-)
- Add parameter validation and help documentation
- Support both interactive and automated execution modes

### Frontend Development
- **Next.js 14**: Use App Router, TypeScript, and static export configuration
- **Component Structure**: Follow the established patterns in `components/` directory
- **Styling**: Use Tailwind CSS with the configured design system
- **Testing**: Maintain Jest + React Testing Library test coverage
- **Blog System**: Use MDX files in `content/` directory with gray-matter processing
- **Theme Support**: Implement dark/light theme switching with persistence
- **Accessibility**: Follow WCAG guidelines and semantic HTML
- **Performance**: Optimize for Core Web Vitals and static generation
- **Static Export**: Configure for Azure Static Web Apps deployment
- **Routing**: Use Azure SWA routing configuration in `staticwebapp.config.json`

## 🚀 Deployment Philosophy

### GitHub Actions Only Policy
This project follows a **strict CI/CD approach** where ALL deployments (infrastructure and frontend) must go through GitHub Actions. This ensures:

- **Security**: All deployments use federated identity (OIDC) without exposing secrets
- **Audit Trail**: Complete history of all changes and deployments
- **Consistency**: Same deployment process every time
- **Quality Gates**: Automated validation, testing, and approval workflows
- **Rollback Capability**: Easy to revert changes through Git history

### Local Development vs. Deployment
- **Local Development**: Used for fast feedback and validation
  - ✅ `npm run dev` - Next.js development server
  - ✅ `npm test` - Run unit tests
  - ✅ `npm run build` - Test build process
  - ✅ `az deployment group what-if` - Preview infrastructure changes
  - ✅ `az deployment group validate` - Validate Bicep templates
  - ✅ `bicep build` - Compile and validate Bicep syntax
- **Deployment**: Always through GitHub Actions (merge to main, PR previews)
  - ❌ Never run `azd up`, `az deployment group create`, or similar deployment commands locally

### Deployment Triggers
- **Infrastructure**: Triggered by changes to `infra/` folder when merged to main
- **Frontend**: Triggered by changes to `static-web-app/` folder when merged to main  
- **Preview**: Triggered by pull requests for preview environments (✅ WORKING)
- **Manual**: Both workflows support manual dispatch for ad-hoc deployments

## 💻 Development and Deployment Policy

### Local Testing and Validation (✅ ENCOURAGED)
Fast feedback loop for development:
- **Next.js development**: `cd static-web-app && npm run dev` (development server)
- **Build validation**: `cd static-web-app && npm run build` (test static export)
- **Testing**: `cd static-web-app && npm test` (run Jest test suite)
- **Linting**: `cd static-web-app && npm run lint` (ESLint validation)
- **Infrastructure validation**: `az deployment group what-if` (preview changes)
- **Bicep validation**: `bicep build infra/main.bicep` (template compilation)

### Deployment Policy (⚠️ STRICT)
ALL deployments must go through GitHub Actions:
- **Frontend deployments**: Triggered automatically on push to main or PR creation (✅ WORKING)
- **Infrastructure deployments**: Triggered through GitHub Actions workflow (✅ WORKING)
- **Preview deployments**: Automatic for pull requests with unique URLs (✅ WORKING)
- **No local deployments**: Never run `azd up`, `az staticwebapp create`, or deployment commands locally

### Current Status (June 2025)
- ✅ **Infrastructure**: Fully deployed and operational
- ✅ **Frontend**: Next.js application deployed with preview environments working
- ✅ **Pipelines**: Both infrastructure and frontend GitHub Actions workflows operational
- ✅ **Preview URLs**: Working correctly for pull requests  
- 🔄 **Custom Domain**: In progress (DNS validation phase)
- **CI/CD only**: All production changes must go through the pipeline

## 🔧 Development Practices

### File Naming & Organization
- Use kebab-case for file names
- Organize Bicep templates in logical modules
- Keep parameters in separate `.bicepparam` files
- Use descriptive names that indicate purpose

### Security Best Practices
- Never expose secrets in Bicep outputs
- Use managed identities where possible
- Implement least-privilege access
- Enable diagnostic settings for monitoring
- Use secure parameter types (`@secure()`) for sensitive data

### Testing & Validation
- **Run locally for fast feedback**: Bicep what-if analysis, template validation, frontend testing
- **Use GitHub Actions for actual deployments**: All infrastructure and frontend deployments
- Test workflows in feature branches before merging
- Include comprehensive error handling

### Local Testing Commands
- `az deployment group what-if` - Preview infrastructure changes before committing
- `az deployment group validate` - Validate Bicep templates syntax and logic
- `bicep build main.bicep` - Compile and check Bicep syntax
- `npm run dev` - Start Next.js development server
- `npm test` - Run unit tests and check code quality
- `npm run build` - Test the build process locally

## 🚨 Important Rules

### Never Do
- ❌ Store secrets in GitHub repository or workflows
- ❌ Use hardcoded values - always parameterize
- ❌ Skip what-if analysis for infrastructure changes
- ❌ Deploy directly to production without validation
- ❌ Remove security and monitoring configurations
- ❌ **Deploy infrastructure or frontend code locally** - ALL deployments must go through GitHub Actions
- ❌ Run `azd up`, `az deployment group create`, or similar deployment commands locally
- ❌ Bypass CI/CD pipeline for any production changes

### Always Do
- ✅ Use federated identity for Azure authentication
- ✅ Include comprehensive logging and status reporting
- ✅ Follow Infrastructure as Code principles
- ✅ Test changes in feature branches first
- ✅ Document infrastructure decisions and configurations
- ✅ Use consistent naming conventions
- ✅ Implement proper error handling
- ✅ **Deploy ONLY through GitHub Actions** - never deploy locally
- ✅ **Run validation and testing locally for fast feedback** (`what-if`, `npm test`, `npm run dev`)
- ✅ Let CI/CD handle all production deployments with proper approvals

## 🔄 Workflow Patterns

### Infrastructure Changes
1. Create feature branch
2. Modify Bicep templates or parameters
3. Push changes to trigger what-if analysis
4. Review what-if output in PR
5. **Merge to main for automatic deployment via GitHub Actions**
6. **NEVER deploy infrastructure changes locally**

### Frontend Updates
1. Modify files in `static-web-app/`
2. Test locally using Next.js development server: `npm run dev`
3. Push to feature branch for preview deployment (PR)
4. Review preview environment
5. **Merge to main for production deployment via GitHub Actions**
6. **NEVER deploy frontend changes locally**

### Frontend Deployment Workflow
- **Validation Job**: Validates code structure, dependencies, and configuration
- **Preview Job**: Creates preview environment for PRs with automatic cleanup
- **Deploy Job**: Deploys to production on main branch merge
- **Token Management**: Securely retrieves deployment tokens using OIDC
- **Verification**: Confirms deployment success and provides access URLs

## 💡 Common Tasks

### Adding New Azure Resources
1. Create or update Bicep module in `infra/modules/`
2. Reference module in `main.bicep`
3. Add parameters to `production.bicepparam`
4. **Test locally with what-if analysis for fast feedback** (`az deployment group what-if`)
5. **Validate template syntax** (`az deployment group validate`)
6. **Deploy via GitHub Actions by merging to main branch**

### Updating Frontend Content
1. Modify files in `static-web-app/` (Next.js components, pages, styles, assets)
2. **Test locally for fast feedback**: `npm run dev`, `npm test`, `npm run build`
3. Push changes to trigger validation and **automatic deployment via GitHub Actions**
4. Review deployment summary and verify live site
5. **Never use manual deployment commands locally**

### Updating Deployment Configuration
1. Modify workflow files in `.github/workflows/`
2. Test in feature branch
3. Review execution logs carefully

### Environment Configuration
- Production parameters: `infra/parameters/production.bicepparam`
- GitHub secrets configured via PowerShell scripts in `scripts/`
- Resource naming follows: `{type}-kennethheine-{env}` pattern

## 🎨 Style Preferences

- Use emojis in logging for better visual scanning
- Prefer descriptive variable names over abbreviations
- Include comprehensive comments for complex logic
- Use consistent indentation (2 spaces for YAML, 4 for PowerShell)
- Group related configurations together

## 🔍 Debugging & Troubleshooting

- Check GitHub Actions logs for deployment issues
- Use Azure CLI what-if for infrastructure validation
- Review Bicep analyzer warnings and errors
- Verify OIDC configuration if authentication fails
- Check resource group permissions for deployment failures

Remember: This is a production website deployment system. Prioritize security, reliability, and maintainability in all code generation and modifications.
