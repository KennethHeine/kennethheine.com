# Blog Enable/Disable Documentation

This document describes how to enable or disable the blog functionality on the website while preserving all blog code.

## Current Status
**Blog is DISABLED** - All blog routes return 404 and blog pages are excluded from sitemap.

## How to Re-enable Blog

To restore full blog functionality, make these changes:

### 1. Enable Blog in Sitemap
In `app/sitemap.ts`:
```typescript
// Change this line from:
const BLOG_ENABLED = false;
// To:
const BLOG_ENABLED = true;
```

### 2. Remove Route Blocks
In `staticwebapp.config.json`, remove these route blocks:
```json
{
  "route": "/blog",
  "statusCode": 404
},
{
  "route": "/blog/*",
  "statusCode": 404
},
```

### 3. (Optional) Restore Original Homepage Content
If you want to restore the original "Read My Blog" button and blog preview section:

In `app/page.tsx`:
- Replace "Get In Touch" button with "Read My Blog" button
- Replace "Professional Services & Consulting" section with "Latest AI, DevOps & Cloud Insights" section
- Update associated aria-describedby attributes

## How to Disable Blog

To disable blog functionality:

### 1. Disable Blog in Sitemap
In `app/sitemap.ts`:
```typescript
const BLOG_ENABLED = false;
```

### 2. Add Route Blocks
In `staticwebapp.config.json`, add to the routes array:
```json
{
  "route": "/blog",
  "statusCode": 404
},
{
  "route": "/blog/*",
  "statusCode": 404
}
```

### 3. Update Homepage Content
Replace blog-focused content with alternative content (contact, services, etc.)

## What Gets Preserved

When blog is disabled:
- ✅ All blog code files remain intact
- ✅ All blog components and utilities preserved
- ✅ All blog content (MDX files) preserved
- ✅ All blog-related tests preserved
- ✅ Easy to re-enable with minimal changes

## Testing

After making changes:
1. Run `npm run build` to ensure build succeeds
2. Run `npm test` to ensure all tests pass
3. Check `out/sitemap.xml` to verify blog pages inclusion/exclusion
4. Check `out/staticwebapp.config.json` for route configuration

## Implementation Details

- Blog route blocking is handled at the Azure Static Web Apps level
- Sitemap generation is controlled by the `BLOG_ENABLED` feature flag
- All blog infrastructure remains intact for easy restoration
- Tests are updated to reflect the current enabled/disabled state