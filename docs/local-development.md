# Local Development Setup Guide

## 📋 Overview

This guide provides comprehensive instructions for setting up a local development environment for the kennethheine.com project. The project is a modern Azure Static Web App built with Next.js 14, TypeScript, Tailwind CSS, and deployed using Azure infrastructure.

## 🎯 Quick Start

### Automated Setup (Recommended)

For Windows users, we provide an automated PowerShell script that handles the entire setup process:

```powershell
# Clone the repository
git clone https://github.com/KennethHeine/kennethheine.com.git
cd kennethheine.com

# Run the setup script
.\scripts\setup-dev-environment.ps1
```

#### Script Options

```powershell
# What-if mode (preview what would be installed)
.\scripts\setup-dev-environment.ps1 -WhatIf

# Skip VS Code installation
.\scripts\setup-dev-environment.ps1 -SkipVSCode

# Skip project dependency installation
.\scripts\setup-dev-environment.ps1 -SkipProjectDeps
```

### Manual Setup

If you prefer to set up manually or are using a different operating system, follow the manual setup instructions below.

## 🛠️ Prerequisites

### Required Software

| Tool | Version | Purpose | Download Link |
|------|---------|---------|---------------|
| **Node.js** | LTS (v18+) | JavaScript runtime for Next.js | [nodejs.org](https://nodejs.org/) |
| **npm** | Latest | Package manager (comes with Node.js) | Included with Node.js |
| **Git** | Latest | Version control | [git-scm.com](https://git-scm.com/) |
| **Azure CLI** | Latest | Infrastructure management | [Microsoft Docs](https://docs.microsoft.com/cli/azure/install-azure-cli) |

### Optional Software

| Tool | Purpose | Download Link |
|------|---------|---------------|
| **Visual Studio Code** | Recommended code editor | [code.visualstudio.com](https://code.visualstudio.com/) |
| **GitHub CLI** | GitHub integration | [cli.github.com](https://cli.github.com/) |
| **PowerShell 7+** | Enhanced scripting (Windows) | [Microsoft Docs](https://docs.microsoft.com/powershell/) |

### System Requirements

- **Windows 10/11**, **macOS 10.15+**, or **Linux** (Ubuntu 18.04+ recommended)
- **4GB RAM minimum** (8GB recommended)
- **2GB free disk space**
- **Internet connection** for downloading dependencies

## 📦 Manual Installation Steps

### 1. Install Node.js and npm

#### Windows
```powershell
# Using winget (Windows 11/10)
winget install OpenJS.NodeJS

# Or download from https://nodejs.org/
```

#### macOS
```bash
# Using Homebrew
brew install node

# Or download from https://nodejs.org/
```

#### Linux (Ubuntu/Debian)
```bash
# Using NodeSource repository
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node --version
npm --version
```

### 2. Install Azure CLI

#### Windows
```powershell
# Using winget
winget install Microsoft.AzureCLI

# Or using MSI installer from Microsoft Docs
```

#### macOS
```bash
# Using Homebrew
brew update && brew install azure-cli
```

#### Linux
```bash
# Ubuntu/Debian
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash
```

### 3. Install Git

#### Windows
```powershell
# Using winget
winget install Git.Git

# Or download from https://git-scm.com/
```

#### macOS
```bash
# Using Homebrew
brew install git

# Or install Xcode Command Line Tools
xcode-select --install
```

#### Linux
```bash
# Ubuntu/Debian
sudo apt update && sudo apt install git
```

### 4. Install Visual Studio Code (Optional but Recommended)

#### All Platforms
Download and install from [code.visualstudio.com](https://code.visualstudio.com/)

#### Windows
```powershell
winget install Microsoft.VisualStudioCode
```

#### macOS
```bash
brew install --cask visual-studio-code
```

## 🚀 Project Setup

### 1. Clone the Repository

```bash
git clone https://github.com/KennethHeine/kennethheine.com.git
cd kennethheine.com
```

### 2. Install Project Dependencies

```bash
cd static-web-app
npm install
```

### 3. Verify Installation

```bash
# Run tests
npm test

# Run linting
npm run lint

# Run type checking
npm run type-check

# Start development server
npm run dev
```

## 🎨 VS Code Setup

### 1. Install Recommended Extensions

When you open the project in VS Code, you'll be prompted to install recommended extensions. Click "Install All" or install them manually:

**Essential Extensions:**
- Prettier - Code formatter
- ESLint - JavaScript linting
- Tailwind CSS IntelliSense
- TypeScript Next.js

**Azure & Infrastructure:**
- Azure Resources
- Bicep
- Azure Static Web Apps

**Testing & Quality:**
- Jest
- Error Lens
- Code Spell Checker

### 2. Workspace Settings

The project includes pre-configured VS Code settings:
- Auto-format on save
- ESLint auto-fix
- TypeScript strict mode
- Proper file associations for `.mdx` and `.bicep` files

### 3. Debug Configurations

Pre-configured debug settings for:
- Next.js server-side debugging
- Next.js client-side debugging
- Jest test debugging
- Full-stack debugging

## 🧪 Development Workflow

### 1. Daily Development

```bash
# Start development server
cd static-web-app
npm run dev

# In another terminal, run tests in watch mode
npm run test:watch
```

### 2. Before Committing

```bash
# Run all checks
npm run check

# Or run individually
npm run type-check
npm run lint
npm run format:check
npm test
```

### 3. Pre-commit Hooks

The project uses Husky for automatic pre-commit checks:
- ESLint fixes
- Running tests
- Commit message validation

## 🏗️ Project Structure

```
kennethheine.com/
├── static-web-app/          # Next.js application
│   ├── app/                 # Next.js App Router
│   ├── components/          # React components
│   ├── content/             # MDX blog posts
│   ├── lib/                 # Utility functions
│   ├── types/               # TypeScript definitions
│   ├── __tests__/           # Jest test suites
│   └── package.json         # Dependencies and scripts
├── infra/                   # Bicep infrastructure
├── .github/workflows/       # CI/CD pipelines
├── scripts/                 # PowerShell automation
└── docs/                    # Documentation
```

## 🔧 Available Scripts

### In `static-web-app/` directory:

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Fix ESLint issues |
| `npm run format` | Format code with Prettier |
| `npm run format:check` | Check Prettier formatting |
| `npm run type-check` | Run TypeScript compiler |
| `npm test` | Run Jest tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Run tests with coverage |
| `npm run check` | Run all quality checks |

## 🔍 Troubleshooting

### Common Issues

#### Node.js Version Issues
**Problem:** Project requires Node.js LTS but you have an older version.

**Solution:**
```bash
# Check current version
node --version

# Install latest LTS version
# Follow installation steps above for your OS
```

#### npm Install Fails
**Problem:** `npm install` fails with permission errors.

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# On macOS/Linux, avoid using sudo with npm
# Instead, configure npm to use a different directory
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
# Add ~/.npm-global/bin to your PATH
```

#### Build Fails with Font Errors
**Problem:** Next.js build fails with Google Fonts errors.

**Solution:** This is expected in environments without internet access. The fonts will load from CDN in production.

#### PowerShell Execution Policy Error
**Problem:** Script execution is disabled.

**Solution:**
```powershell
# Check current policy
Get-ExecutionPolicy

# Set policy for current user
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser

# Or run script with bypass
powershell -ExecutionPolicy Bypass -File .\scripts\setup-dev-environment.ps1
```

#### VS Code Extensions Not Loading
**Problem:** Recommended extensions don't install automatically.

**Solution:**
1. Open Command Palette (`Ctrl+Shift+P`)
2. Type "Extensions: Show Recommended Extensions"
3. Install recommended extensions manually

#### Azure CLI Login Issues
**Problem:** `az login` fails or times out.

**Solution:**
```bash
# Try device code flow
az login --use-device-code

# Or use specific tenant
az login --tenant your-tenant-id
```

### Performance Optimization

#### Development Server
- Use `npm run dev` for fast development with hot reload
- Keep the development server running during development
- Use `npm run test:watch` for continuous testing

#### Build Performance
- The project uses Next.js static export for optimal performance
- Build cache is stored in `.next/cache` (not committed to git)
- Large builds benefit from more RAM and SSD storage

### Getting Help

#### Documentation
- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Azure Static Web Apps Docs](https://docs.microsoft.com/azure/static-web-apps/)

#### Project-Specific Help
- Check [docs/](../docs/) folder for additional documentation
- Review [CONTRIBUTING.md](../CONTRIBUTING.md) for contribution guidelines
- Look at existing [GitHub Issues](https://github.com/KennethHeine/kennethheine.com/issues)

#### Community Support
- [Next.js GitHub Discussions](https://github.com/vercel/next.js/discussions)
- [TypeScript Community Discord](https://discord.com/invite/typescript)
- [Azure Developer Community](https://dev.to/azure)

## 🚨 Important Notes

### Security
- Never commit `.env` files with secrets
- Use Azure CLI authentication for infrastructure operations
- Keep dependencies updated for security patches

### Deployment
- **All deployments go through GitHub Actions** - never deploy locally
- Infrastructure changes require Azure CLI for what-if analysis
- Frontend changes automatically deploy via CI/CD pipeline

### Code Quality
- All code must pass ESLint and TypeScript checks
- Tests are required for new functionality
- Prettier formatting is enforced
- Commit messages must follow conventional commit format

---

**Happy coding!** 🎉

For questions or issues with this setup guide, please [open an issue](https://github.com/KennethHeine/kennethheine.com/issues/new) or check existing documentation in the [docs/](../docs/) folder.