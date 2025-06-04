# ADR-0004: Use GitHub Actions for CI/CD

## Status

ACCEPTED

## Context

The kennethheine.com project requires a CI/CD pipeline to automate building, testing, and deploying both infrastructure and frontend code. The project uses GitHub for source control and needs integration with Azure Static Web Apps for hosting.

Key requirements:
- Automated testing and code quality checks
- Infrastructure deployment with what-if analysis
- Frontend deployment with preview environments
- Security through OIDC authentication (no stored secrets)
- Integration with pull request workflow
- Separate pipelines for infrastructure and frontend changes
- Manual deployment capabilities for emergency situations
- Comprehensive logging and error reporting

## Decision

We will use **GitHub Actions** as our CI/CD platform for automating deployments and quality checks.

Key implementation choices:
- **Dual Pipeline Architecture**: Separate workflows for infrastructure and frontend deployments
- **OIDC Authentication**: Federated identity for secure Azure authentication without secrets
- **What-if Analysis**: Infrastructure changes include preview analysis before deployment
- **Preview Deployments**: Automatic preview environments for pull requests
- **Quality Gates**: Automated testing, linting, and type checking before deployment
- **Manual Triggers**: Support for manual workflow dispatch for ad-hoc deployments
- **Environment Protection**: Production deployments with approval requirements

## Consequences

### Positive
- **GitHub Integration**: Native integration with GitHub repository and pull requests
- **Security**: OIDC authentication eliminates need to store Azure credentials as secrets
- **Preview Environments**: Automatic preview deployments for every pull request
- **Audit Trail**: Complete history of all deployments and changes in GitHub
- **Free Tier**: Generous free minutes for public repositories
- **Comprehensive Logging**: Detailed logs with emojis for better visual scanning
- **Parallel Execution**: Can run multiple jobs concurrently for faster feedback
- **Ecosystem**: Large marketplace of pre-built actions and community support

### Negative
- **GitHub Dependency**: Tied to GitHub as both source control and CI/CD platform
- **Learning Curve**: Team needs to understand GitHub Actions workflow syntax
- **Resource Limits**: Limited compute resources and execution time per job
- **Secret Management**: Need to manage OIDC configuration and permissions carefully
- **Debugging**: Can be challenging to debug complex workflow issues

### Neutral
- **YAML Configuration**: Declarative workflow definitions in version control
- **Runner Environment**: Uses GitHub-hosted runners vs. self-hosted options
- **Platform Lock-in**: Commits to GitHub ecosystem vs. platform-agnostic CI/CD tools

## Alternatives Considered

- **Azure DevOps**: Rejected due to preference for keeping everything in GitHub ecosystem
- **Azure Pipelines**: Rejected for same reason as Azure DevOps
- **Jenkins**: Rejected due to maintenance overhead and complexity for simple deployment needs
- **CircleCI**: Rejected due to additional cost and complexity vs. GitHub Actions integration
- **GitLab CI**: Rejected as project uses GitHub for source control
- **Manual Deployments**: Rejected due to lack of consistency and audit trail

## Related Decisions

- [ADR-0002: Azure Static Web Apps](./0002-azure-static-web-apps.md) - Hosting platform provides native GitHub Actions integration
- [ADR-0003: Bicep Infrastructure](./0003-bicep-infrastructure.md) - IaC tool determines deployment pipeline requirements
- [ADR-0001: Next.js Framework](./0001-nextjs-framework.md) - Frontend framework determines build and deployment process

## Date

2025-01-08

## Authors

- Kenneth Sølberg

---

*This ADR follows the format outlined in [Architecture Decision Records](./README.md).*