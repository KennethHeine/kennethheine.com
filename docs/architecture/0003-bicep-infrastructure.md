# ADR-0003: Use Bicep for Infrastructure as Code

## Status

ACCEPTED

## Context

The kennethheine.com project requires Infrastructure as Code (IaC) to manage Azure resources consistently and reproducibly. The infrastructure includes Azure Static Web Apps, custom domain configurations, and potential future Azure services.

Key requirements:
- Declarative infrastructure definition
- Version control of infrastructure changes
- Automated deployment via CI/CD
- Azure-native tooling integration
- Support for modular, reusable components
- What-if analysis capabilities for safe deployments
- Parameter management for different environments
- Strong typing and validation

## Decision

We will use **Azure Bicep** as our Infrastructure as Code language for managing Azure resources.

Key implementation choices:
- **Bicep Language**: Using Bicep instead of ARM templates or other IaC tools
- **Modular Architecture**: Creating reusable modules in `infra/modules/` directory
- **Parameter Files**: Environment-specific parameters in `.bicepparam` files
- **Bicep Analyzer**: Enabled linting rules for security and best practices
- **Resource Naming**: Consistent naming convention using resource tokens
- **GitHub Actions Integration**: Automated deployment with what-if analysis

## Consequences

### Positive
- **Azure Native**: First-class Azure integration with latest features and API versions
- **Type Safety**: Strong typing prevents many configuration errors at compile time
- **Readable Syntax**: More concise and readable than ARM templates JSON
- **Powerful Features**: Loops, conditions, and functions make complex scenarios manageable
- **What-if Analysis**: Preview changes before deployment for safety
- **Modular Design**: Reusable modules promote consistency and reduce duplication
- **Tool Integration**: Excellent VS Code extension with IntelliSense and validation
- **Future Proof**: Microsoft's recommended IaC approach for Azure

### Negative
- **Azure Only**: Cannot manage resources in other cloud providers
- **Learning Curve**: Team needs to learn Bicep-specific syntax and patterns
- **Compilation Step**: Requires compilation to ARM templates for deployment
- **Maturity**: Newer than Terraform, smaller community and ecosystem
- **Limited Providers**: Cannot manage non-Azure resources like DNS, third-party services

### Neutral
- **Microsoft Ecosystem**: Commits to Microsoft toolchain and approach
- **Template Size**: Can generate large ARM templates for complex scenarios
- **Debug Experience**: Debugging happens at ARM template level, not Bicep level

## Alternatives Considered

- **Terraform**: Rejected due to preference for Azure-native tooling and better Azure integration
- **ARM Templates (JSON)**: Rejected due to verbose syntax and poor developer experience
- **Azure CLI Scripts**: Rejected due to lack of declarative approach and state management
- **Pulumi**: Rejected due to complexity and preference for declarative over imperative approach
- **Manual Portal Configuration**: Rejected due to lack of reproducibility and version control

## Related Decisions

- [ADR-0002: Azure Static Web Apps](./0002-azure-static-web-apps.md) - Hosting platform choice determined infrastructure requirements
- [ADR-0004: GitHub Actions CI/CD](./0004-github-actions-cicd.md) - CI/CD platform influences deployment automation approach
- Future ADR: Parameter management and secrets handling strategy

## Date

2025-01-08

## Authors

- Kenneth Heine

---

*This ADR follows the format outlined in [Architecture Decision Records](./README.md).*