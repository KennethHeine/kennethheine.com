// --- file: components/mdx/ResponsiveImage.tsx ---
/**
 * Responsive Image Component for MDX Content
 *
 * Optimized image component specifically designed for blog posts and MDX content.
 * Features mobile-first responsive design with Next.js Image optimization.
 */

import Image from 'next/image';
import { BaseComponentProps } from '@/types/ui';

export interface ResponsiveImageProps extends BaseComponentProps {
  /** Image source URL (relative to public directory) */
  src: string;
  /** Descriptive alt text for accessibility */
  alt: string;
  /** Image width for aspect ratio calculation */
  width?: number;
  /** Image height for aspect ratio calculation */
  height?: number;
  /** Priority loading for above-the-fold images */
  priority?: boolean;
  /** Caption text displayed below the image */
  caption?: string;
  /** Additional CSS classes for styling */
  className?: string;
}

/**
 * ResponsiveImage component for blog posts and MDX content
 *
 * Provides optimized responsive images with:
 * - Mobile-first responsive sizing
 * - Automatic lazy loading (unless priority)
 * - Modern format support via Next.js
 * - Proper accessibility attributes
 * - Optional caption support
 *
 * @example
 * ```tsx
 * <ResponsiveImage
 *   src="/images/blog/example.jpg"
 *   alt="Example diagram showing architecture"
 *   width={800}
 *   height={400}
 *   caption="Figure 1: System architecture overview"
 * />
 * ```
 */
export const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  src,
  alt,
  width = 800,
  height = 400,
  priority = false,
  caption,
  className = '',
  testId,
  ...props
}) => {
  // Responsive sizes for mobile-first optimization
  const sizes = '(min-width: 1024px) 800px, (min-width: 768px) 100vw, 100vw';

  return (
    <figure className={`my-8 ${className}`} data-testid={testId} {...props}>
      {/* Image container with responsive aspect ratio */}
      <div
        className='relative w-full overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800'
        style={{ aspectRatio: `${width} / ${height}` }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className='object-cover transition-opacity duration-300'
          quality={90}
        />
      </div>

      {/* Optional caption */}
      {caption && (
        <figcaption className='mt-3 text-center text-sm text-gray-600 dark:text-gray-400'>
          {caption}
        </figcaption>
      )}
    </figure>
  );
};

export default ResponsiveImage;
