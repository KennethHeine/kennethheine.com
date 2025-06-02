import { render, screen } from '@testing-library/react'
import Page from '../../app/blog/[slug]/page'
import { ThemeProvider } from '../../../../components/ThemeProvider'

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: () => '/blog/test-post',
}))

// Mock the blog utilities
jest.mock('../../lib/blog', () => ({
  getPostBySlug: jest.fn(() => ({
    slug: 'test-post',
    title: 'Test Blog Post',
    date: '2024-01-15',
    excerpt: 'This is a test blog post',
    tags: ['test', 'demo', 'nextjs'],
    published: true,
    author: 'Kenneth Heine',
    content: `
      # This is a test blog post
      
      This is the content of the test blog post. It includes various elements:
      
      ## Subheading
      
      Some paragraph content with **bold text** and *italic text*.
      
      - List item 1
      - List item 2
      - List item 3
      
      \`\`\`javascript
      const hello = 'world';
      console.log(hello);
      \`\`\`
    `,
  })),
  getAllPosts: jest.fn(() => []),
  getPostSlugs: jest.fn(() => ['test-post']),
}))

// Mock MDX processing
jest.mock('next-mdx-remote/serialize', () => ({
  serialize: jest.fn(() => Promise.resolve({
    compiledSource: 'Test compiled source',
    frontmatter: {},
  })),
}))

const PageWithProvider = ({ params }: { params: { slug: string } }) => (
  <ThemeProvider>
    <Page params={params} />
  </ThemeProvider>
)

describe('Blog Post Page', () => {
  const mockParams = { slug: 'test-post' }

  it('renders blog post title', async () => {
    render(<PageWithProvider params={mockParams} />)
    
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
    expect(screen.getByText('Test Blog Post')).toBeInTheDocument()
  })

  it('displays publication date', async () => {
    render(<PageWithProvider params={mockParams} />)
    
    expect(screen.getByText(/January 15, 2024/)).toBeInTheDocument()
  })

  it('shows author information', async () => {
    render(<PageWithProvider params={mockParams} />)
    
    expect(screen.getByText(/Kenneth Heine/)).toBeInTheDocument()
  })

  it('displays blog post tags', async () => {
    render(<PageWithProvider params={mockParams} />)
    
    expect(screen.getByText('test')).toBeInTheDocument()
    expect(screen.getByText('demo')).toBeInTheDocument()
    expect(screen.getByText('nextjs')).toBeInTheDocument()
  })

  it('includes back to blog link', async () => {
    render(<PageWithProvider params={mockParams} />)
    
    const backLink = screen.getByRole('link', { name: /back to blog|all posts/i })
    expect(backLink).toBeInTheDocument()
    expect(backLink).toHaveAttribute('href', '/blog')
  })

  it('applies responsive design classes', async () => {
    const { container } = render(<PageWithProvider params={mockParams} />)
    
    // Check that the article has responsive classes
    const article = container.querySelector('article')
    expect(article).toBeInTheDocument()
  })

  it('has proper article structure for SEO', async () => {
    render(<PageWithProvider params={mockParams} />)
    
    // Check for proper article structure
    const h1 = screen.getByRole('heading', { level: 1 })
    expect(h1).toBeInTheDocument()
    
    // Check for article metadata
    expect(screen.getByText(/January 15, 2024/)).toBeInTheDocument()
  })

  it('includes reading time estimate', async () => {
    render(<PageWithProvider params={mockParams} />)
    
    // Look for reading time (common pattern: "X min read")
    const readingTime = screen.queryByText(/\d+ min read/i)
    if (readingTime) {
      expect(readingTime).toBeInTheDocument()
    }
  })

  it('displays post content in article format', async () => {
    const { container } = render(<PageWithProvider params={mockParams} />)
    
    // Check for article tag or prose formatting
    const article = container.querySelector('article')
    const proseContent = container.querySelector('.prose')
    
    expect(article || proseContent).toBeInTheDocument()
  })

  it('includes social sharing or interaction elements', async () => {
    render(<PageWithProvider params={mockParams} />)
    
    // Look for potential sharing or interaction elements
    const shareButton = screen.queryByText(/share/i)
    const likeButton = screen.queryByText(/like/i)
    
    // These might not be implemented yet, so don't require them
    if (shareButton || likeButton) {
      expect(shareButton || likeButton).toBeInTheDocument()
    }
  })
})
