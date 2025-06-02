import { getAllPosts, getPostBySlug, getPostsByTag, getAllTags } from '@/lib/blog-new'
import fs from 'fs'
import path from 'path'

// Mock fs and path modules
jest.mock('fs')
jest.mock('path')

const mockedFs = jest.mocked(fs)
const mockedPath = jest.mocked(path)

describe('Blog New utilities', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    // Setup default path.join mock to mimic path joining behavior
    mockedPath.join = jest.fn().mockImplementation((...args) => args.join('/'))
  })

  describe('getAllPosts', () => {
    it('should return all posts sorted by date', () => {
      // Mock directory exists
      mockedFs.existsSync = jest.fn().mockReturnValue(true)
      
      // Mock file list
      mockedFs.readdirSync = jest.fn().mockReturnValue([
        'post1.mdx',
        'post2.md',
        'not-a-post.txt'
      ] as any)
      
      // Mock file contents as actual strings (not template literals)
      const firstPostContent = '---\ntitle: "First Post"\ndate: "2024-01-15"\nexcerpt: "First post excerpt"\ntags: ["test", "first"]\npublished: true\n---\n# First Post Content'
      const secondPostContent = '---\ntitle: "Second Post"\ndate: "2024-01-20"\nexcerpt: "Second post excerpt"\ntags: ["test", "second"]\n---\n# Second Post Content'
      
      mockedFs.readFileSync = jest.fn()
        .mockReturnValueOnce(firstPostContent)
        .mockReturnValueOnce(secondPostContent)

      const posts = getAllPosts()

      expect(posts).toHaveLength(2)
      expect(posts[0].title).toBe('Second Post') // Should be first due to sorting by date
      expect(posts[0].slug).toBe('post2')
      expect(posts[1].title).toBe('First Post')
      expect(posts[1].slug).toBe('post1')
    })

    it('should return empty array when posts directory does not exist', () => {
      mockedFs.existsSync = jest.fn().mockReturnValue(false)
      
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation()
      const posts = getAllPosts()
      
      expect(posts).toEqual([])
      expect(consoleSpy).toHaveBeenCalledWith('Posts directory not found, returning empty array')
      consoleSpy.mockRestore()
    })

    it('should handle posts with missing frontmatter fields', () => {
      mockedFs.existsSync = jest.fn().mockReturnValue(true)
      mockedFs.readdirSync = jest.fn().mockReturnValue(['minimal.mdx'] as any)
      mockedFs.readFileSync = jest.fn().mockReturnValue('---\ntitle: "Minimal Post"\n---\n# Content')

      const posts = getAllPosts()

      expect(posts).toHaveLength(1)
      expect(posts[0].title).toBe('Minimal Post')
      expect(posts[0].excerpt).toBe('')
      expect(posts[0].tags).toEqual([])
      expect(posts[0].published).toBe(true)
      expect(posts[0].date).toMatch(/^\d{4}-\d{2}-\d{2}$/) // Should have default date
    })
  })

  describe('getPostBySlug', () => {
    it('should return a specific post by slug', () => {
      const mockContent = '---\ntitle: "Test Post"\ndate: "2024-01-15"\nexcerpt: "Test excerpt"\ntags: ["test"]\npublished: true\n---\n# Test Content'

      mockedFs.readFileSync = jest.fn().mockReturnValue(mockContent)
      const post = getPostBySlug('test-post')

      expect(post).toBeTruthy()
      expect(post?.title).toBe('Test Post')
      expect(post?.slug).toBe('test-post')
      expect(post?.content).toBe('# Test Content')
    })

    it('should try .md extension if .mdx fails', () => {
      const mockContent = '---\ntitle: "MD Post"\n---\n# MD Content'

      mockedFs.readFileSync = jest.fn()
        .mockImplementationOnce(() => {
          throw new Error('MDX file not found')
        })
        .mockImplementationOnce(() => mockContent)

      const post = getPostBySlug('md-post')

      expect(post).toBeTruthy()
      expect(post?.title).toBe('MD Post')
      expect(mockedFs.readFileSync).toHaveBeenCalledTimes(2)
    })

    it('should return null if post not found', () => {
      mockedFs.readFileSync = jest.fn().mockImplementation(() => {
        throw new Error('File not found')
      })

      const consoleSpy = jest.spyOn(console, 'error').mockImplementation()
      const post = getPostBySlug('non-existent')

      expect(post).toBeNull()
      expect(consoleSpy).toHaveBeenCalled()
      consoleSpy.mockRestore()
    })
  })

  describe('getPostsByTag', () => {
    beforeEach(() => {
      // Mock directory exists
      mockedFs.existsSync = jest.fn().mockReturnValue(true)
      
      // Mock file list
      mockedFs.readdirSync = jest.fn().mockReturnValue(['post1.mdx', 'post2.mdx'] as any)
      
      // Define content with proper string values
      const reactPostContent = '---\ntitle: "React Post"\ntags: ["react", "javascript"]\n---\nContent'
      const vuePostContent = '---\ntitle: "Vue Post"\ntags: ["vue", "javascript"]\n---\nContent'
      
      // Setup read file mock with proper string returns
      mockedFs.readFileSync = jest.fn().mockImplementation((path) => {
        if (typeof path === 'string' && path.includes('post1')) {
          return reactPostContent
        } 
        return vuePostContent
      })
    })

    it('should return posts filtered by tag', () => {
      const posts = getPostsByTag('javascript')
      expect(posts).toHaveLength(2)

      const reactPosts = getPostsByTag('react')
      expect(reactPosts).toHaveLength(1)
      expect(reactPosts[0].title).toBe('React Post')
    })

    it('should return empty array for non-existent tag', () => {
      const posts = getPostsByTag('non-existent')
      expect(posts).toEqual([])
    })
  })

  describe('getAllTags', () => {
    beforeEach(() => {
      mockedFs.existsSync = jest.fn().mockReturnValue(true)
      mockedFs.readdirSync = jest.fn().mockReturnValue(['post1.mdx', 'post2.mdx'] as any)
      
      const post1Content = '---\ntitle: "Post 1"\ntags: ["react", "javascript", "web"]\n---\nContent'
      const post2Content = '---\ntitle: "Post 2"\ntags: ["vue", "javascript"]\n---\nContent'
      
      // Setup read file mock to return content based on path
      mockedFs.readFileSync = jest.fn().mockImplementation((path) => {
        if (typeof path === 'string' && path.includes('post1')) {
          return post1Content
        } 
        return post2Content
      })
    })

    it('should return all unique tags sorted alphabetically', () => {
      const tags = getAllTags()
      expect(tags).toEqual(['javascript', 'react', 'vue', 'web'])
    })

    it('should handle posts without tags', () => {
      mockedFs.readdirSync = jest.fn().mockReturnValue(['notags.mdx'] as any)
      mockedFs.readFileSync = jest.fn().mockReturnValue('---\ntitle: "No Tags Post"\n---\nContent')

      const tags = getAllTags()
      expect(tags).toEqual([])
    })
  })
})