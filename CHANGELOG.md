# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Comprehensive project documentation (README, CONTRIBUTING, etc.)

## [1.0.0] - 2025-01-22

### Added

- Initial release of kennethheine.com personal website
- Next.js 16 application with App Router
- React 19 with TypeScript
- Tailwind CSS 4 for styling
- Dark/light theme support with system preference detection
- Responsive navigation with mobile menu
- Homepage with hero section and call-to-action
- About page with professional background
- Contact page with email link
- Blog system with MDX support (currently disabled)
- SEO optimization with meta tags and Open Graph
- Sitemap and robots.txt generation
- Accessibility features meeting WCAG 2.1 AA standards
- Color contrast analysis and compliance documentation

### Infrastructure

- Azure Static Web Apps deployment
- Bicep Infrastructure as Code templates
- GitHub Actions CI/CD pipelines
- Production and preview deployment workflows
- Dependabot for dependency updates

### Testing

- Jest unit testing with React Testing Library
- Playwright E2E testing
- Accessibility testing with jest-axe
- Comprehensive test coverage for components and utilities

### Documentation

- AGENTS.md for AI coding agent instructions
- Component prop patterns documentation
- Accessibility color contrast analysis
- Blog enable/disable documentation

---

## Version History

### Versioning Scheme

This project follows [Semantic Versioning](https://semver.org/):

- **MAJOR**: Incompatible changes or significant redesigns
- **MINOR**: New features in a backwards compatible manner
- **PATCH**: Backwards compatible bug fixes

### How to Update This File

When making changes:

1. Add entries under `[Unreleased]` during development
2. When releasing, move entries to a new version section
3. Update the version number and date
4. Keep entries concise but descriptive

### Entry Categories

- **Added**: New features
- **Changed**: Changes in existing functionality
- **Deprecated**: Soon-to-be removed features
- **Removed**: Removed features
- **Fixed**: Bug fixes
- **Security**: Security vulnerability fixes
