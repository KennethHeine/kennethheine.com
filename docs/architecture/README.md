# Architecture Decision Records (ADR)

This directory contains Architecture Decision Records (ADRs) for the kennethheine.com project. ADRs document significant architectural decisions made during the project lifecycle.

## 📋 What are ADRs?

Architecture Decision Records are lightweight documentation that captures important architectural decisions along with their context and consequences. They help maintain institutional knowledge and provide transparency in decision-making.

## 📁 Structure

Each ADR follows a consistent format:
- **Context**: The situation that requires a decision
- **Decision**: What was decided
- **Consequences**: The outcomes (positive, negative, and neutral)
- **Alternatives**: Other options that were considered
- **Status**: Current state of the decision

## 🔢 Numbering Convention

ADRs are numbered sequentially starting from 0001:
- `0001-nextjs-framework.md`
- `0002-azure-static-web-apps.md`
- `0003-bicep-infrastructure.md`
- etc.

## 📝 Creating New ADRs

### When to Create an ADR

Create an ADR when making decisions about:
- Technology choices (frameworks, libraries, platforms)
- Architecture patterns and approaches
- Infrastructure and deployment strategies
- Development workflows and processes
- Security and compliance approaches

### Process

1. **Copy the template**: Use [adr-template.md](./adr-template.md) as your starting point
2. **Number sequentially**: Use the next available number (check existing ADRs)
3. **Use descriptive titles**: Keep titles brief but descriptive (e.g., "Use Next.js 14 for Frontend Framework")
4. **Fill out all sections**: Don't skip sections, even if they seem minimal
5. **Get review**: Have the ADR reviewed by relevant team members
6. **Update status**: Mark as "Accepted" once finalized

### Naming Convention

Files should be named: `{number}-{kebab-case-title}.md`

Examples:
- `0001-nextjs-framework.md`
- `0002-azure-static-web-apps.md`
- `0003-bicep-infrastructure.md`

## 📊 ADR Status Types

- **Proposed**: Under consideration, not yet decided
- **Accepted**: Decision has been made and is active
- **Deprecated**: No longer recommended but may still be in use
- **Superseded**: Replaced by a newer decision (link to the new ADR)

## 📚 Current ADRs

| Number | Title | Status | Date |
|--------|-------|--------|------|
| [0001](./0001-nextjs-framework.md) | Use Next.js 14 for Frontend Framework | Accepted | 2025-01-08 |
| [0002](./0002-azure-static-web-apps.md) | Use Azure Static Web Apps for Hosting | Accepted | 2025-01-08 |
| [0003](./0003-bicep-infrastructure.md) | Use Bicep for Infrastructure as Code | Accepted | 2025-01-08 |
| [0004](./0004-github-actions-cicd.md) | Use GitHub Actions for CI/CD | Accepted | 2025-01-08 |

## 🔗 Related Documentation

- [CONTRIBUTING.md](../../CONTRIBUTING.md) - General contribution guidelines
- [Coding Standards](../coding-standards.md) - Technical implementation standards
- [Documentation Standards](../documentation-standards.md) - Documentation guidelines

## 📖 Further Reading

- [Architecture Decision Records (Michael Nygard)](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions)
- [ADR GitHub Organization](https://adr.github.io/)
- [When Should I Write an Architecture Decision Record](https://engineering.atspotify.com/2020/04/when-should-i-write-an-architecture-decision-record/)