# GitHub Actions Workflows Documentation

This directory contains GitHub Actions workflows for deploying and managing the Azure infrastructure and Static Web App for kennethheine.com.

## Workflows Overview

### 1. Deploy Infrastructure (`deploy-infrastructure.yml`)

**Purpose**: Deploys Azure infrastructure using Bicep templates with comprehensive validation and security best practices.

**Triggers**:
- Push to `main` branch (when infrastructure files change)
- Pull requests to `main` branch (validation only)
- Manual dispatch with environment selection

**Key Features**:
- ✅ **Federated Identity (OIDC)**: No long-lived secrets required
- ✅ **Comprehensive Validation**: Bicep linting, template validation, and What-If analysis
- ✅ **Retry Logic**: Automatic retry on deployment failures (up to 3 attempts)
- ✅ **Pre-deployment Checks**: Quota validation and resource availability checks
- ✅ **Multi-environment Support**: Production and staging environments
- ✅ **PR Comments**: Automatic What-If analysis comments on pull requests
- ✅ **Deployment Artifacts**: Saves deployment information for other workflows
- ✅ **Comprehensive Reporting**: Detailed deployment summaries and status

**Jobs Flow**:
1. **Validate** - Lint and validate Bicep templates, run What-If analysis
2. **Pre-deployment Checks** - Verify quotas, resource availability, and final validation
3. **Deploy** - Deploy infrastructure with retry logic and verification
4. **Post-deployment** - Generate summaries and save deployment artifacts

### 2. Destroy Infrastructure (`destroy-infrastructure.yml`)

**Purpose**: Safely destroys Azure resource groups and all contained resources.

**Triggers**:
- Manual dispatch only (for safety)

**Key Features**:
- ✅ **Manual Only**: Requires explicit user action
- ✅ **Environment Selection**: Choose production or staging
- ✅ **Safe Deletion**: Uses Azure CLI with confirmation

## Security Features

### Federated Identity (OIDC)
All workflows use Azure Federated Identity instead of long-lived secrets:

- **No Secret Storage**: GitHub doesn't store any Azure credentials
- **Short-lived Tokens**: Tokens are issued dynamically for each workflow run
- **Least Privilege**: Each workflow only gets the permissions it needs
- **Audit Trail**: Full audit trail of all authentication events

### Required GitHub Secrets
Set these in your repository settings:

```
AZURE_SUBSCRIPTION_ID  # Your Azure subscription ID
AZURE_TENANT_ID        # Your Azure AD tenant ID  
AZURE_CLIENT_ID        # The app registration client ID
```

### Required Azure Setup
The following resources must be configured in Azure (see `scripts/` directory):

1. **App Registration**: Created via `2-create-app-registration.ps1`
2. **Federated Credentials**: Configured for GitHub Actions OIDC
3. **RBAC Permissions**: Service principal with appropriate permissions

## Workflow Configuration

### Environment Variables
```yaml
AZURE_SUBSCRIPTION_ID: ${{ secrets.AZURE_SUBSCRIPTION_ID }}
AZURE_TENANT_ID: ${{ secrets.AZURE_TENANT_ID }}
AZURE_CLIENT_ID: ${{ secrets.AZURE_CLIENT_ID }}
DEPLOYMENT_LOCATION: "westeurope"
```

### Workflow Inputs
The deploy workflow accepts these manual inputs:

- **environment**: Choose 'production' or 'staging' (default: production)
- **skip_validation**: Skip validation steps for urgent deployments (not recommended)

## Best Practices Implemented

### Azure Deployment Best Practices
- ✅ **Infrastructure as Code**: All resources defined in Bicep templates
- ✅ **Template Validation**: Comprehensive validation before deployment
- ✅ **What-If Analysis**: Preview changes before applying them
- ✅ **Retry Logic**: Handle transient deployment failures
- ✅ **Resource Verification**: Confirm resources are created correctly
- ✅ **Deployment Naming**: Unique deployment names with timestamps
- ✅ **Output Extraction**: Safe extraction of deployment outputs

### GitHub Actions Best Practices
- ✅ **Job Dependencies**: Proper job sequencing with needs/dependencies
- ✅ **Conditional Execution**: Jobs run only when appropriate
- ✅ **Artifact Management**: Save deployment info for other workflows
- ✅ **Error Handling**: Comprehensive error handling and reporting
- ✅ **Security**: OIDC authentication and minimal permissions
- ✅ **Monitoring**: Detailed logging and summary generation

## File Structure

```
.github/workflows/
├── deploy-infrastructure.yml     # Main infrastructure deployment
├── destroy-infrastructure.yml    # Infrastructure destruction
└── README.md                    # This documentation
```

## Usage Examples

### Deploy to Production
```bash
# Automatic on push to main (if infra files changed)
git push origin main

# Manual deployment
# Go to Actions tab → Deploy Infrastructure → Run workflow
# Select: environment = production
```

### Deploy to Staging
```bash
# Manual deployment only
# Go to Actions tab → Deploy Infrastructure → Run workflow  
# Select: environment = staging
```

### Validate Changes (PR)
```bash
# Create pull request with infrastructure changes
# Workflow will automatically run validation and What-If analysis
# Results will be commented on the PR
```

### Destroy Environment
```bash
# Manual destruction only
# Go to Actions tab → Destroy Infrastructure → Run workflow
# Select: environment = production|staging
```

## Monitoring and Troubleshooting

### Deployment Artifacts
Each successful deployment creates artifacts containing:
- `deployment-info.json`: Complete deployment details
- `whatif-results.json`: What-If analysis results (for PRs)

### Common Issues

**Authentication Failures**:
- Verify GitHub secrets are set correctly
- Check that app registration has federated credentials configured
- Ensure service principal has proper RBAC permissions

**Deployment Failures**:
- Check Azure quotas and limits
- Verify resource names are unique
- Review Bicep template syntax and parameters

**Validation Errors**:
- Update Bicep CLI to latest version
- Check template dependencies and module references
- Verify parameter file syntax

### Debugging Tips

1. **Enable Debug Logging**:
   ```yaml
   env:
     ACTIONS_STEP_DEBUG: true
     ACTIONS_RUNNER_DEBUG: true
   ```

2. **Check Azure Activity Log**:
   - Review deployments in Azure Portal
   - Check activity log for detailed error messages

3. **Review Workflow Logs**:
   - Each step provides detailed output
   - Summary information available in job summaries

## Contributing

When modifying workflows:

1. Test changes in a feature branch first
2. Use What-If analysis to preview infrastructure changes
3. Follow the established patterns for error handling
4. Update this documentation for any significant changes
5. Consider impact on dependent workflows

## Related Documentation

- [Azure Bicep Documentation](https://docs.microsoft.com/en-us/azure/azure-resource-manager/bicep/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Azure Federated Identity](https://docs.microsoft.com/en-us/azure/active-directory/workload-identities/workload-identity-federation)
- [Static Web Apps Documentation](https://docs.microsoft.com/en-us/azure/static-web-apps/)
