/**
 * @fileoverview Page metadata management hook for SEO
 * @author Kenneth Heine
 */

'use client';

import { useEffect, useState } from 'react';

interface PageMetadata {
  /** Page title */
  title?: string;
  /** Page description */
  description?: string;
  /** Keywords for SEO */
  keywords?: string[];
  /** Open Graph image */
  ogImage?: string;
  /** Open Graph type */
  ogType?: 'website' | 'article' | 'profile';
  /** Canonical URL */
  canonical?: string;
  /** Whether page is indexable */
  noIndex?: boolean;
  /** Structured data */
  structuredData?: Record<string, any>;
}

interface UsePageMetadataOptions {
  /** Default metadata values */
  defaults?: Partial<PageMetadata>;
  /** Whether to update document head */
  updateHead?: boolean;
  /** Site name for Open Graph */
  siteName?: string;
  /** Base URL for canonical URLs */
  baseUrl?: string;
}

interface UsePageMetadataReturn extends PageMetadata {
  /** Update metadata */
  updateMetadata: (metadata: Partial<PageMetadata>) => void;
  /** Reset to defaults */
  resetMetadata: () => void;
  /** Get formatted title */
  getFormattedTitle: () => string;
  /** Get structured data as JSON-LD */
  getStructuredDataScript: () => string | null;
}

/**
 * Hook for managing page metadata and SEO
 *
 * Features:
 * - Dynamic title and description updates
 * - Open Graph support
 * - Structured data (JSON-LD) generation
 * - Client-side head manipulation
 * - TypeScript support
 *
 * @param options - Configuration options
 * @returns Metadata state and controls
 *
 * @example
 * ```typescript
 * const {
 *   updateMetadata,
 *   getFormattedTitle,
 *   getStructuredDataScript
 * } = usePageMetadata({
 *   defaults: {
 *     title: 'Kenneth Heine',
 *     description: 'AI, DevOps & Cloud Architecture'
 *   }
 * });
 *
 * // Update page metadata
 * updateMetadata({
 *   title: 'Blog Post Title',
 *   description: 'Blog post description',
 *   ogType: 'article'
 * });
 * ```
 */
export function usePageMetadata(
  options: UsePageMetadataOptions = {}
): UsePageMetadataReturn {
  const {
    defaults = {},
    updateHead = true,
    siteName = 'Kenneth Heine',
    baseUrl = 'https://kennethheine.com',
  } = options;

  const [metadata, setMetadata] = useState<PageMetadata>({
    title: 'Kenneth Heine - AI, Automation & Cloud Architecture',
    description:
      'Kenneth Heine helps developers work smarter with AI, automation, and Azure cloud architecture.',
    keywords: ['Kenneth Heine', 'AI', 'DevOps', 'Azure', 'Cloud Architecture'],
    ogType: 'website',
    ...defaults,
  });

  // Update document head when metadata changes
  useEffect(() => {
    if (!updateHead || typeof document === 'undefined') return;

    // Update title
    if (metadata.title) {
      document.title = getFormattedTitle();
    }

    // Update meta tags
    const updateMetaTag = (
      name: string,
      content: string | undefined,
      attribute = 'name'
    ) => {
      if (!content) return;

      let element = document.querySelector(
        `meta[${attribute}="${name}"]`
      ) as HTMLMetaElement;

      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }

      element.content = content;
    };

    // Basic meta tags
    updateMetaTag('description', metadata.description);
    updateMetaTag('keywords', metadata.keywords?.join(', '));

    // Open Graph tags
    updateMetaTag('og:title', metadata.title, 'property');
    updateMetaTag('og:description', metadata.description, 'property');
    updateMetaTag('og:type', metadata.ogType, 'property');
    updateMetaTag('og:site_name', siteName, 'property');
    updateMetaTag('og:image', metadata.ogImage, 'property');

    // Canonical URL
    if (metadata.canonical) {
      let linkElement = document.querySelector(
        'link[rel="canonical"]'
      ) as HTMLLinkElement;

      if (!linkElement) {
        linkElement = document.createElement('link');
        linkElement.rel = 'canonical';
        document.head.appendChild(linkElement);
      }

      linkElement.href = metadata.canonical.startsWith('http')
        ? metadata.canonical
        : `${baseUrl}${metadata.canonical}`;
    }

    // Robots meta tag
    if (metadata.noIndex) {
      updateMetaTag('robots', 'noindex, nofollow');
    } else {
      // Remove noindex if it exists
      const robotsElement = document.querySelector('meta[name="robots"]');
      if (robotsElement) {
        robotsElement.remove();
      }
    }

    // Structured data
    const structuredDataScript = getStructuredDataScript();
    if (structuredDataScript) {
      // Remove existing structured data
      const existingScript = document.querySelector(
        'script[type="application/ld+json"]'
      );
      if (existingScript) {
        existingScript.remove();
      }

      // Add new structured data
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = structuredDataScript;
      document.head.appendChild(script);
    }
  }, [metadata, updateHead, siteName, baseUrl]);

  const updateMetadata = (newMetadata: Partial<PageMetadata>) => {
    setMetadata(current => ({
      ...current,
      ...newMetadata,
    }));
  };

  const resetMetadata = () => {
    setMetadata({
      title: 'Kenneth Heine - AI, Automation & Cloud Architecture',
      description:
        'Kenneth Heine helps developers work smarter with AI, automation, and Azure cloud architecture.',
      keywords: [
        'Kenneth Heine',
        'AI',
        'DevOps',
        'Azure',
        'Cloud Architecture',
      ],
      ogType: 'website',
      ...defaults,
    });
  };

  const getFormattedTitle = (): string => {
    if (!metadata.title) return siteName;

    if (metadata.title === siteName || metadata.title.includes(siteName)) {
      return metadata.title;
    }

    return `${metadata.title} | ${siteName}`;
  };

  const getStructuredDataScript = (): string | null => {
    if (!metadata.structuredData) return null;

    try {
      return JSON.stringify(metadata.structuredData, null, 2);
    } catch (error) {
      console.warn('Failed to serialize structured data:', error);
      return null;
    }
  };

  return {
    ...metadata,
    updateMetadata,
    resetMetadata,
    getFormattedTitle,
    getStructuredDataScript,
  };
}

/**
 * Helper hook for blog post metadata
 */
export function useBlogPostMetadata(post: {
  title: string;
  excerpt?: string;
  date: string;
  tags?: string[];
  slug: string;
}): UsePageMetadataReturn {
  return usePageMetadata({
    defaults: {
      title: post.title,
      description: post.excerpt,
      keywords: post.tags,
      ogType: 'article',
      canonical: `/blog/${post.slug}`,
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.excerpt,
        datePublished: post.date,
        author: {
          '@type': 'Person',
          name: 'Kenneth Heine',
          url: 'https://kennethheine.com/about',
        },
        publisher: {
          '@type': 'Organization',
          name: 'Kenneth Heine',
          url: 'https://kennethheine.com',
        },
      },
    },
  });
}

/**
 * Helper hook for page metadata
 */
export function useStaticPageMetadata(
  title: string,
  description: string,
  path: string
): UsePageMetadataReturn {
  return usePageMetadata({
    defaults: {
      title,
      description,
      canonical: path,
    },
  });
}
