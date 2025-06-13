import { processMDX } from '@/lib/mdx';
import { TableOfContents } from '@/components/mdx/TableOfContents';
import { BlogPost } from '@/types/blog';

interface EnhancedBlogContentProps {
  post: BlogPost;
}

/**
 * Enhanced blog content component with syntax highlighting and TOC
 */
export async function EnhancedBlogContent({ post }: EnhancedBlogContentProps) {
  try {
    const { content, toc } = await processMDX(post.content);

    return (
      <div className='mx-auto max-w-4xl'>
        <div className='grid grid-cols-1 gap-8 lg:grid-cols-4'>
          {/* Table of Contents - shown on large screens */}
          {toc.length > 0 && (
            <aside className='hidden lg:block'>
              <div className='sticky top-8'>
                <TableOfContents items={toc} />
              </div>
            </aside>
          )}

          {/* Main content */}
          <div
            className={`${toc.length > 0 ? 'lg:col-span-3' : 'lg:col-span-4'}`}
          >
            {/* Mobile TOC - shown on small screens */}
            {toc.length > 0 && (
              <div className='mb-8 lg:hidden'>
                <TableOfContents items={toc} />
              </div>
            )}

            {/* Blog content with enhanced prose styling */}
            <div className='prose prose-gray max-w-none dark:prose-invert prose-headings:font-bold prose-headings:tracking-tight prose-a:text-brand-600 prose-a:no-underline hover:prose-a:underline dark:prose-a:text-brand-400 prose-code:rounded prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:font-mono prose-code:text-sm dark:prose-code:bg-gray-800 prose-pre:overflow-x-auto prose-pre:rounded-lg prose-pre:bg-gray-900 prose-pre:p-0 dark:prose-pre:bg-gray-800'>
              {content}
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error rendering enhanced blog content:', error);

    // Fallback to simple MDX rendering
    const { MDXRemote } = await import('next-mdx-remote/rsc');

    return (
      <div className='mx-auto max-w-3xl'>
        <div className='prose prose-gray max-w-none dark:prose-invert prose-headings:font-bold prose-headings:tracking-tight prose-a:text-brand-600 prose-a:no-underline hover:prose-a:underline dark:prose-a:text-brand-400 prose-code:rounded prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:font-mono prose-code:text-sm dark:prose-code:bg-gray-800 prose-pre:overflow-x-auto prose-pre:rounded-lg prose-pre:bg-gray-900 prose-pre:p-4 dark:prose-pre:bg-gray-800'>
          <MDXRemote source={post.content} />
        </div>
      </div>
    );
  }
}
