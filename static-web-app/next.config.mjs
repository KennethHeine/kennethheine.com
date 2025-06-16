// --- file: next.config.mjs ---
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static export for Azure Static Web Apps
  output: 'export',

  // Configure trailing slash behavior
  trailingSlash: true,

  // Configure image optimization for static export
  images: {
    unoptimized: true, // Required for static export
    formats: ['image/webp', 'image/avif'], // Modern formats when optimization is enabled
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Configure base path if needed (empty for custom domain)
  basePath: '',

  // Configure asset prefix for CDN if needed
  assetPrefix: '',
  // Disable server-side features for static export
  experimental: {
    // No experimental features needed for static export
  },

  // Configure MDX support
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],

  // Enable strict mode for better development experience
  reactStrictMode: true,

  // Configure ESLint
  eslint: {
    dirs: ['app', 'components', 'lib', 'types'],
    ignoreDuringBuilds: false, // Keep ESLint during builds but allow warnings
  },

  // Configure TypeScript
  typescript: {
    // Type checking is handled by the CI/CD pipeline
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
