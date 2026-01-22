# Security Policy

## Supported Versions

The following versions are currently being supported with security updates:

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |

## Reporting a Vulnerability

We take security seriously. If you discover a security vulnerability, please follow these steps:

### 1. Do NOT Create a Public Issue

Please do not report security vulnerabilities through public GitHub issues, discussions, or pull requests.

### 2. Report Privately

Send a detailed report to the project maintainer through one of these methods:

- **GitHub Security Advisories**: Use GitHub's private vulnerability reporting feature
- **Email**: Contact the repository owner directly

### 3. Include in Your Report

- Description of the vulnerability
- Steps to reproduce the issue
- Potential impact
- Any suggested fixes (if applicable)

### What to Expect

- **Acknowledgment**: We will acknowledge receipt within 48 hours
- **Initial Assessment**: Within 1 week, we'll provide an initial assessment
- **Resolution**: We aim to resolve critical issues within 2 weeks
- **Disclosure**: After the fix is released, we may publish a security advisory

## Security Measures

### Current Security Practices

This project implements several security measures:

#### Static Site Security

- **No Backend API**: The site is completely static, eliminating server-side vulnerabilities
- **No User Authentication**: No login systems, sessions, or user data storage
- **No Database**: All content is pre-rendered at build time

#### Dependency Management

- **Dependabot**: Automatic dependency updates and security alerts
- **npm audit**: Regular auditing of npm dependencies
- **Locked Dependencies**: `package-lock.json` ensures reproducible builds

#### CI/CD Security

- **OIDC Authentication**: Azure deployments use OpenID Connect (no stored secrets)
- **Minimal Permissions**: GitHub Actions use least-privilege permissions
- **Protected Branches**: Main branch requires passing CI checks

#### Content Security

- **CSP Headers**: Content Security Policy configured in `staticwebapp.config.json`
- **HTTPS Only**: All traffic is encrypted via Azure Static Web Apps
- **No Inline Scripts**: Avoiding XSS vulnerabilities

### Development Security

When contributing, please follow these guidelines:

1. **Never commit secrets** (API keys, tokens, passwords)
2. **Use environment variables** for sensitive configuration
3. **Validate all inputs** even for static content
4. **Keep dependencies updated** and review security alerts
5. **Follow secure coding practices** for TypeScript/JavaScript

## Dependencies

This project relies on well-maintained, widely-used dependencies:

- **Next.js**: Security updates from Vercel
- **React**: Security updates from Meta
- **Tailwind CSS**: CSS-only, minimal attack surface

## Vulnerability Disclosure Timeline

| Event | Timeline |
|-------|----------|
| Initial report | Day 0 |
| Acknowledgment | Within 48 hours |
| Initial assessment | Within 1 week |
| Fix development | 1-2 weeks (critical), 4 weeks (moderate) |
| Fix release | As soon as ready |
| Public disclosure | After fix is widely available |

## Known Limitations

This project is a personal website with limited attack surface. However, potential areas of concern include:

- Third-party CDN resources (fonts, images)
- Build-time dependencies
- GitHub Actions workflows

## Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Next.js Security Best Practices](https://nextjs.org/docs/app/building-your-application/configuring/content-security-policy)
- [Azure Static Web Apps Security](https://docs.microsoft.com/en-us/azure/static-web-apps/configuration)

## Contact

For security-related inquiries, please use private communication channels as described above.

Thank you for helping keep this project secure! 🔐
