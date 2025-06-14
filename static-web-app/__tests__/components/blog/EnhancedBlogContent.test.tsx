import { render, screen } from '@testing-library/react';
import { EnhancedBlogContent } from '../../../components/blog/EnhancedBlogContent';
import { BlogPost } from '../../../types/blog';

// Mock the MDX processor
jest.mock('../../../lib/mdx', () => ({
  processMDX: jest.fn(),
}));

// Mock next-mdx-remote/rsc for fallback
jest.mock('next-mdx-remote/rsc', () => ({
  MDXRemote: ({ source }: { source: string }) => (
    <div data-testid='fallback-mdx'>{source}</div>
  ),
}));

import { processMDX } from '../../../lib/mdx';

const mockProcessMDX = processMDX as jest.MockedFunction<typeof processMDX>;

describe('EnhancedBlogContent', () => {
  const mockPost: BlogPost = {
    slug: 'test-post',
    title: 'Test Post',
    content: '# Test Content\n\nThis is test content.',
    date: '2024-01-01',
    excerpt: 'Test excerpt',
    published: true,
    tags: ['test'],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders enhanced content with TOC when processing succeeds', async () => {
    const mockContent = <div data-testid='mock-content'>Enhanced Content</div>;
    const mockToc = [
      { id: 'test-heading', title: 'Test Heading', level: 1 },
      { id: 'sub-heading', title: 'Sub Heading', level: 2 },
    ];

    mockProcessMDX.mockResolvedValue({
      content: mockContent,
      toc: mockToc,
    });

    render(await EnhancedBlogContent({ post: mockPost }));

    expect(screen.getByTestId('mock-content')).toBeInTheDocument();
    expect(mockProcessMDX).toHaveBeenCalledWith(mockPost.content);
  });

  it('renders enhanced content without TOC when no headings', async () => {
    const mockContent = (
      <div data-testid='mock-content'>Content without TOC</div>
    );
    const mockToc: any[] = [];

    mockProcessMDX.mockResolvedValue({
      content: mockContent,
      toc: mockToc,
    });

    render(await EnhancedBlogContent({ post: mockPost }));

    expect(screen.getByTestId('mock-content')).toBeInTheDocument();
    expect(mockProcessMDX).toHaveBeenCalledWith(mockPost.content);
  });

  it('falls back to simple MDX rendering when processing fails', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

    mockProcessMDX.mockRejectedValue(new Error('Processing failed'));

    render(await EnhancedBlogContent({ post: mockPost }));

    expect(screen.getByTestId('fallback-mdx')).toBeInTheDocument();
    expect(screen.getByTestId('fallback-mdx')).toHaveTextContent(
      '# Test Content This is test content.'
    );
    expect(consoleSpy).toHaveBeenCalledWith(
      'Error rendering enhanced blog content:',
      expect.any(Error)
    );

    consoleSpy.mockRestore();
  });

  it('applies correct layout classes when TOC is present', async () => {
    const mockContent = <div data-testid='mock-content'>Content</div>;
    const mockToc = [{ id: 'heading', title: 'Heading', level: 1 }];

    mockProcessMDX.mockResolvedValue({
      content: mockContent,
      toc: mockToc,
    });

    const { container } = render(await EnhancedBlogContent({ post: mockPost }));

    // Check for grid layout with TOC column
    const gridContainer = container.querySelector('.grid-cols-1');
    expect(gridContainer).toBeInTheDocument();
    expect(gridContainer).toHaveClass('lg:grid-cols-4');

    // Check for main content column span
    const mainContent = container.querySelector('.lg\\:col-span-3');
    expect(mainContent).toBeInTheDocument();
  });

  it('applies correct layout classes when no TOC', async () => {
    const mockContent = <div data-testid='mock-content'>Content</div>;
    const mockToc: any[] = [];

    mockProcessMDX.mockResolvedValue({
      content: mockContent,
      toc: mockToc,
    });

    const { container } = render(await EnhancedBlogContent({ post: mockPost }));

    // Check for full-width content when no TOC
    const mainContent = container.querySelector('.lg\\:col-span-4');
    expect(mainContent).toBeInTheDocument();
  });

  it('includes proper prose styling classes', async () => {
    const mockContent = <div data-testid='mock-content'>Content</div>;
    const mockToc: any[] = [];

    mockProcessMDX.mockResolvedValue({
      content: mockContent,
      toc: mockToc,
    });

    const { container } = render(await EnhancedBlogContent({ post: mockPost }));

    const proseContainer = container.querySelector('.prose');
    expect(proseContainer).toBeInTheDocument();
    expect(proseContainer).toHaveClass(
      'prose-gray',
      'max-w-none',
      'dark:prose-invert'
    );
  });
});
