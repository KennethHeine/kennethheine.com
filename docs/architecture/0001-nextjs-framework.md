# ADR-0001: Use Next.js 14 for Frontend Framework

## Status

ACCEPTED

## Context

The kennethheine.com project requires a modern frontend framework for building a personal brand website with blog functionality. The site needs to be statically exportable for deployment to Azure Static Web Apps, support server-side rendering for SEO, and provide a great developer experience with TypeScript support.

Key requirements:
- Static site generation (SSG) capabilities for Azure Static Web Apps
- Built-in TypeScript support
- Modern React features and patterns
- MDX support for blog content
- Performance optimization features
- Strong ecosystem and community support
- SEO-friendly with meta tag management

## Decision

We will use **Next.js 14 with App Router** as the frontend framework for kennethheine.com.

Specific configuration choices:
- **App Router**: Using the new app directory structure (stable as of Next.js 13)
- **Static Export**: Configured with `output: 'export'` for Azure Static Web Apps compatibility
- **TypeScript**: Full TypeScript integration with strict mode enabled
- **MDX Integration**: Using Next.js built-in MDX support for blog content
- **Image Optimization**: Disabled for static export (`unoptimized: true`)

## Consequences

### Positive
- **Modern Architecture**: App Router provides the latest React patterns (Server Components, Suspense)
- **Static Export**: Perfect compatibility with Azure Static Web Apps hosting
- **TypeScript Integration**: Excellent TypeScript support out of the box
- **Performance**: Built-in optimizations for Core Web Vitals
- **Developer Experience**: Hot reloading, error boundaries, and debugging tools
- **SEO Ready**: Built-in meta tag management and static generation
- **MDX Support**: Native support for MDX content without additional configuration
- **Future-Proof**: Using the latest stable Next.js architecture

### Negative
- **Learning Curve**: App Router is newer and requires learning new patterns
- **Static Limitations**: Some Next.js features unavailable in static export mode
- **Bundle Size**: Framework overhead compared to simpler static site generators
- **Image Optimization**: Need to handle image optimization manually for static sites

### Neutral
- **React Dependency**: Commits to React ecosystem and patterns
- **Build Process**: Requires Node.js build step vs. pure static HTML
- **Deployment**: Static export fits well with Azure Static Web Apps model

## Alternatives Considered

- **Gatsby**: Rejected due to complexity and GraphQL overhead for simple personal site
- **Create React App**: Rejected due to lack of built-in SSG and limited optimization features
- **Vite + React**: Rejected due to need for additional configuration for SSG and routing
- **Astro**: Rejected due to less mature ecosystem and different component model
- **Hugo/Jekyll**: Rejected due to lack of React component model and TypeScript support

## Related Decisions

- [ADR-0002: Azure Static Web Apps Hosting](./0002-azure-static-web-apps.md) - Hosting platform choice influenced static export requirement
- Future ADR: TypeScript configuration decisions
- Future ADR: Testing framework selection

## Date

2025-01-08

## Authors

- Kenneth Sølberg

---

*This ADR follows the format outlined in [Architecture Decision Records](./README.md).*