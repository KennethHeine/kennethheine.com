# Blog Creation Guide

This guide explains how to create and manage blog posts for kennethheine.com using MDX (Markdown with JSX components).

## Overview

The blog system uses MDX files located in `static-web-app/content/posts/` directory. Each blog post is a `.mdx` file that combines Markdown content with React components for rich, interactive content.

## Creating a New Blog Post

### 1. File Structure

Create a new `.mdx` file in `static-web-app/content/posts/`:

```
static-web-app/content/posts/your-blog-post-title.mdx
```

### 2. Frontmatter

Every blog post must start with YAML frontmatter containing metadata:

```yaml
---
title: 'Your Blog Post Title'
date: '2025-06-18'
summary: 'A brief summary of your blog post content that will appear in previews and social media.'
tags: ['tag1', 'tag2', 'technology', 'category']
category: 'Technology'
---
```

#### Required Fields:
- **title**: The blog post title (string)
- **date**: Publication date in YYYY-MM-DD format (string)
- **summary**: Brief description for previews (string)
- **tags**: Array of relevant tags for categorization (array of strings)
- **category**: Main category for the post (string)

### 3. Content Structure

After the frontmatter, write your content using Markdown and available MDX components:

```mdx
---
title: 'Example Blog Post'
date: '2025-06-18'
summary: 'An example of how to structure a blog post'
tags: ['example', 'documentation']
category: 'Documentation'
---

# Your Blog Post Title

Your introduction paragraph goes here.

## Section Headings

Use standard Markdown headings (##, ###, etc.).

### Code Examples

Use fenced code blocks with language specification:

```javascript
function example() {
  console.log('Hello, world!');
}
```

### Lists and Other Markdown

- Bullet points work as expected
- Use **bold** and *italic* text
- Include [links](https://example.com)

> Blockquotes are supported

## Available MDX Components

### ResponsiveImage Component

For blog images, use the ResponsiveImage component:

```jsx
<ResponsiveImage 
  src="/images/blog/your-image.jpg"
  alt="Descriptive alt text for accessibility"
  width={800}
  height={400}
  caption="Optional caption for the image"
  priority={false}
/>
```

#### ResponsiveImage Properties:
- **src**: Path to image (relative to public directory)
- **alt**: Alt text for accessibility (required)
- **width**: Image width in pixels
- **height**: Image height in pixels
- **caption**: Optional figure caption
- **priority**: Set to true for above-fold images (default: false)

## Best Practices

### Content Guidelines

1. **Write compelling titles** that clearly describe the content
2. **Create informative summaries** (150-200 characters ideal)
3. **Use relevant tags** to help readers find related content
4. **Structure content** with clear headings and sections
5. **Include code examples** when discussing technical topics
6. **Add images** to break up text and illustrate concepts

### Technical Guidelines

1. **Image optimization**: 
   - Use high-quality images (recommended: 1600px wide max)
   - Store images in `static-web-app/public/images/blog/`
   - Use descriptive filenames (e.g., `azure-architecture-diagram.jpg`)
   - Always include alt text for accessibility

2. **Performance considerations**:
   - ResponsiveImage component handles lazy loading automatically
   - Set `priority={true}` only for above-the-fold images
   - Use appropriate image formats (WebP when possible)

3. **Accessibility**:
   - Always include alt text for images
   - Use semantic heading structure (h1 → h2 → h3)
   - Ensure sufficient color contrast
   - Write descriptive link text

### SEO Guidelines

1. **Title optimization**: Include target keywords naturally
2. **Meta description**: Craft compelling summaries with keywords
3. **Tag strategy**: Use 3-6 relevant tags per post
4. **Internal linking**: Link to related blog posts when relevant
5. **Content length**: Aim for 1500+ words for technical deep-dives

## File Organization

### Directory Structure

```
static-web-app/
├── content/
│   └── posts/
│       ├── blog-post-1.mdx
│       ├── blog-post-2.mdx
│       └── your-new-post.mdx
├── public/
│   └── images/
│       └── blog/
│           ├── blog-post-1-image.jpg
│           ├── blog-post-2-diagram.png
│           └── your-image.jpg
└── components/
    └── mdx/
        ├── ResponsiveImage.tsx
        └── index.ts
```

### Naming Conventions

- **File names**: Use kebab-case (lowercase with hyphens)
- **Image names**: Descriptive names with context
- **Tags**: Use lowercase, hyphenated tags consistently

## Publishing Workflow

### Development Process

1. **Create the MDX file** in `content/posts/`
2. **Add any images** to `public/images/blog/`
3. **Test locally** using `npm run dev`
4. **Verify build** using `npm run build`
5. **Run tests** using `npm test`
6. **Create pull request** for review
7. **Deploy via GitHub Actions** on merge to main

### Preview System

- Pull requests automatically create preview deployments
- Preview URLs are available in PR comments
- Test all images and links in preview environment

## Component System

### Current Available Components

1. **ResponsiveImage**: Optimized images with responsive sizing and lazy loading

### Adding New Components

When new MDX components are added to the blog system, they will be documented here. The component export list is maintained in `static-web-app/components/mdx/index.ts`.

To add a new component:

1. Create the component in `static-web-app/components/mdx/`
2. Export it from `static-web-app/components/mdx/index.ts`
3. Add it to the MDX processor in `static-web-app/lib/mdx/processor.ts`
4. Update this guide with usage examples
5. Add comprehensive tests in `static-web-app/__tests__/components/mdx/`

## Testing

### Running Tests

```bash
cd static-web-app
npm test
```

### Test Coverage

The blog system includes comprehensive tests for:
- MDX processing and rendering
- Component functionality
- Image optimization
- Accessibility compliance
- Performance characteristics

## Troubleshooting

### Common Issues

1. **Images not loading**: Check file path and ensure image exists in `public/images/blog/`
2. **Build failures**: Verify MDX syntax and component usage
3. **Missing metadata**: Ensure all required frontmatter fields are present
4. **Component errors**: Check component imports and prop types

### Getting Help

- Check the test files for usage examples
- Review existing blog posts for patterns
- Ensure all dependencies are up to date
- Test changes locally before committing

## Future Enhancements

This guide will be updated when new features are added to the blog system, including:

- Additional MDX components for rich content
- Enhanced image handling capabilities
- SEO optimization features
- Analytics integration
- Comment system integration
- Social sharing enhancements

---

For technical questions about the blog system, refer to the component documentation and test files in the codebase.