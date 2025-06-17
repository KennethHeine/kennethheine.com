import { MetadataRoute } from 'next';

const baseUrl = 'https://kennethheine.com';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/_next/',
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
