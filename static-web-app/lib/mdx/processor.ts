import { compileMDX } from 'next-mdx-remote/rsc';
import rehypePrism from '@mapbox/rehype-prism';
import { CodeBlock } from '@/components/mdx/CodeBlock';
import { TableOfContents } from '@/components/mdx/TableOfContents';
import { ResponsiveImage } from '@/components/mdx/ResponsiveImage';

// Define types for MDX processing
export interface TocItem {
  id: string;
  title: string;
  level: number;
}

export interface ProcessedMDX {
  content: React.ReactElement;
  toc: TocItem[];
}

/**
 * Custom components for MDX rendering with enhanced features
 */
const mdxComponents = {
  pre: CodeBlock,
  TableOfContents,
  ResponsiveImage,
};

/**
 * Process MDX content with syntax highlighting and TOC generation
 * @param source - Raw MDX content
 * @returns Processed MDX with enhanced features
 */
export async function processMDX(source: string): Promise<ProcessedMDX> {
  try {
    // Generate table of contents from headings
    const toc = generateTableOfContents(source);

    // Compile MDX with rehype plugins for syntax highlighting
    const { content } = await compileMDX({
      source,
      options: {
        mdxOptions: {
          rehypePlugins: [
            [
              rehypePrism,
              {
                // Configure languages to highlight
                subset: [
                  'javascript',
                  'typescript',
                  'jsx',
                  'tsx',
                  'json',
                  'css',
                  'html',
                  'bash',
                  'shell',
                  'powershell',
                  'bicep',
                  'yaml',
                  'markdown',
                ],
              },
            ],
          ],
        },
      },
      components: mdxComponents,
    });

    return {
      content,
      toc,
    };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error processing MDX:', error);
    throw new Error('Failed to process MDX content');
  }
}

/**
 * Generate table of contents from MDX content
 * @param content - Raw MDX content
 * @returns Array of TOC items
 */
export function generateTableOfContents(content: string): TocItem[] {
  const toc: TocItem[] = [];
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const title = match[2].trim();
    const id = generateHeadingId(title);

    toc.push({
      id,
      title,
      level,
    });
  }

  return toc;
}

/**
 * Generate a URL-safe ID from heading text
 * @param text - Heading text
 * @returns URL-safe ID
 */
export function generateHeadingId(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove non-alphanumeric characters except spaces and hyphens
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
}
