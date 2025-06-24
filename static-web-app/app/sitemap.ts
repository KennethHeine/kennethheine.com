import { MetadataRoute } from 'next';
import { getAllPosts } from '../lib/blog';

const baseUrl = 'https://kennethheine.com';

// Feature flag to enable/disable blog routes in sitemap
const BLOG_ENABLED = false;

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  // Static pages with their priorities and change frequencies
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];

  // Only include blog pages if blog is enabled
  if (BLOG_ENABLED) {
    // Get all published blog posts
    const posts = getAllPosts();

    // Add blog main page
    staticPages.push({
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    });

    // Dynamic blog post pages
    const blogPages: MetadataRoute.Sitemap = posts.map(post => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }));

    return [...staticPages, ...blogPages];
  }

  return staticPages;
}
