# ADR-0002: Use Azure Static Web Apps for Hosting

## Status

ACCEPTED

## Context

The kennethheine.com project requires a hosting platform for a static personal brand website with the following requirements:

- Static site hosting with global CDN
- Custom domain support with SSL certificates
- Preview deployments for pull requests
- Integration with GitHub Actions for automated deployments
- Cost-effective for personal use
- Support for single-page application (SPA) routing
- Built-in authentication (future requirement)
- Serverless API capabilities (future requirement)

The site is built with Next.js 14 using static export, making it compatible with various static hosting platforms.

## Decision

We will use **Azure Static Web Apps** as the hosting platform for kennethheine.com.

Key configuration:
- **Standard Plan**: For custom domain support and enhanced features
- **Custom Domain**: kennethheine.com with automated SSL certificate management
- **GitHub Integration**: Direct integration with GitHub repository for automated deployments
- **Preview Deployments**: Automatic preview environments for pull requests
- **CDN**: Global content delivery network included
- **SPA Routing**: Configured via `staticwebapp.config.json` for client-side routing

## Consequences

### Positive
- **Integrated Workflow**: Native GitHub Actions integration for seamless CI/CD
- **Preview Deployments**: Automatic staging environments for every pull request
- **Custom Domain**: Easy custom domain setup with automated SSL certificate management  
- **Global Performance**: Built-in CDN with edge locations worldwide
- **Cost Effective**: Generous free tier for personal sites, predictable pricing
- **Azure Ecosystem**: Integrates well with other Azure services (future expansion)
- **Authentication Ready**: Built-in authentication providers when needed
- **API Support**: Can add Azure Functions for serverless APIs
- **HTTPS by Default**: Automatic SSL certificates and HTTPS enforcement

### Negative
- **Vendor Lock-in**: Tied to Microsoft Azure ecosystem
- **Configuration Complexity**: Some advanced routing requires specific configuration
- **Regional Availability**: Limited regions compared to some competitors
- **Learning Curve**: Need to understand Azure Static Web Apps specific configurations
- **Build Limitations**: Some constraints on build process and deployment size

### Neutral
- **Platform Choice**: Commits to Microsoft Azure ecosystem vs. other cloud providers
- **Pricing Model**: Pay-per-use model vs. flat monthly pricing of some alternatives
- **Feature Set**: More features than needed currently, but provides growth path

## Alternatives Considered

- **Netlify**: Rejected due to pricing structure and preference for Azure ecosystem integration
- **Vercel**: Rejected due to Next.js vendor coupling and pricing for custom domains
- **GitHub Pages**: Rejected due to limitations with SPA routing and custom build processes
- **AWS Amplify**: Rejected due to complexity and preference for Azure ecosystem
- **Cloudflare Pages**: Rejected due to less mature preview deployment features
- **Traditional Azure Blob Storage + CDN**: Rejected due to manual setup complexity vs. integrated solution

## Related Decisions

- [ADR-0001: Next.js Framework](./0001-nextjs-framework.md) - Static export requirement influenced hosting choice
- [ADR-0004: GitHub Actions CI/CD](./0004-github-actions-cicd.md) - Hosting platform influenced CI/CD pipeline design
- [ADR-0003: Bicep Infrastructure](./0003-bicep-infrastructure.md) - Infrastructure as Code approach for Azure resources

## Date

2025-01-08

## Authors

- Kenneth Sølberg

---

*This ADR follows the format outlined in [Architecture Decision Records](./README.md).*