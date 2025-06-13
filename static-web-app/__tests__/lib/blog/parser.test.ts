import fs from 'fs';
import path from 'path';
import { getPostSlugs, getPostBySlug } from '../../../lib/blog/parser';

// Mock fs to control file system behavior
jest.mock('fs');

const mockFs = fs as jest.Mocked<typeof fs>;

describe('lib/blog/parser.ts', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getPostSlugs', () => {
    it('returns empty array when posts directory does not exist', () => {
      // Mock fs.existsSync to return false
      mockFs.existsSync.mockReturnValue(false);

      const result = getPostSlugs();
      
      expect(result).toEqual([]);
      expect(mockFs.existsSync).toHaveBeenCalledWith(
        path.join(process.cwd(), 'content/posts')
      );
      expect(mockFs.readdirSync).not.toHaveBeenCalled();
    });

    it('returns post slugs when posts directory exists', () => {
      // Mock fs.existsSync to return true
      mockFs.existsSync.mockReturnValue(true);
      // Mock fs.readdirSync to return test files
      mockFs.readdirSync.mockReturnValue([
        'post1.mdx',
        'post2.md',
        'not-a-post.txt',
        'post3.mdx'
      ] as any);

      const result = getPostSlugs();
      
      expect(result).toEqual(['post1', 'post2', 'post3']);
      expect(mockFs.existsSync).toHaveBeenCalledWith(
        path.join(process.cwd(), 'content/posts')
      );
      expect(mockFs.readdirSync).toHaveBeenCalledWith(
        path.join(process.cwd(), 'content/posts')
      );
    });

    it('filters out non-markdown files', () => {
      mockFs.existsSync.mockReturnValue(true);
      mockFs.readdirSync.mockReturnValue([
        'post1.mdx',
        'image.png',
        'style.css',
        'post2.md',
        'script.js'
      ] as any);

      const result = getPostSlugs();
      
      expect(result).toEqual(['post1', 'post2']);
    });
  });

  describe('getPostBySlug', () => {
    it('returns null when file read fails for both .mdx and .md', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      
      // Mock fs.readFileSync to throw error for both attempts
      mockFs.readFileSync.mockImplementation(() => {
        throw new Error('File not found');
      });

      const result = getPostBySlug('nonexistent-post');
      
      expect(result).toBeNull();
      expect(consoleSpy).toHaveBeenCalledWith(
        'Error reading post nonexistent-post:',
        expect.any(Error)
      );
      
      consoleSpy.mockRestore();
    });

    it('reads .md file when .mdx fails', () => {
      let callCount = 0;
      mockFs.readFileSync.mockImplementation((filePath) => {
        callCount++;
        if (callCount === 1) {
          // First call (.mdx) fails
          throw new Error('.mdx not found');
        }
        // Second call (.md) succeeds
        return `---
title: Test Post
date: 2023-01-01
excerpt: Test excerpt
tags: [test]
published: true
---
Test content`;
      });

      const result = getPostBySlug('test-post');
      
      expect(result).not.toBeNull();
      expect(result?.title).toBe('Test Post');
      expect(result?.slug).toBe('test-post');
      expect(result?.content).toBe('Test content');
      expect(mockFs.readFileSync).toHaveBeenCalledTimes(2);
    });

    it('handles post with minimal frontmatter', () => {
      mockFs.readFileSync.mockReturnValue(`---
title: Minimal Post
---
Minimal content`);

      const result = getPostBySlug('minimal-post');
      
      expect(result).toEqual({
        slug: 'minimal-post',
        title: 'Minimal Post',
        date: expect.any(String), // Current date
        excerpt: '',
        tags: [],
        published: true,
        content: 'Minimal content',
        author: undefined,
        coverImage: undefined,
      });
    });

    it('handles post without title', () => {
      mockFs.readFileSync.mockReturnValue(`---
date: 2023-01-01
---
Content without title`);

      const result = getPostBySlug('no-title-post');
      
      expect(result?.title).toBe('Untitled');
      expect(result?.slug).toBe('no-title-post');
    });

    it('uses summary as excerpt fallback', () => {
      mockFs.readFileSync.mockReturnValue(`---
title: Post with Summary
summary: This is a summary
---
Post content`);

      const result = getPostBySlug('summary-post');
      
      expect(result?.excerpt).toBe('This is a summary');
    });

    it('handles published: false', () => {
      mockFs.readFileSync.mockReturnValue(`---
title: Unpublished Post
published: false
---
Unpublished content`);

      const result = getPostBySlug('unpublished-post');
      
      expect(result?.published).toBe(false);
    });

    it('handles all optional fields', () => {
      mockFs.readFileSync.mockReturnValue(`---
title: Complete Post
date: "2023-06-15"
excerpt: Complete excerpt
tags: [tech, blog]
published: true
author: Test Author
coverImage: /images/cover.jpg
---
Complete content`);

      const result = getPostBySlug('complete-post');
      
      expect(result).toEqual({
        slug: 'complete-post',
        title: 'Complete Post',
        date: '2023-06-15', // Should be string when properly quoted in YAML
        excerpt: 'Complete excerpt',
        tags: ['tech', 'blog'],
        published: true,
        content: 'Complete content',
        author: 'Test Author',
        coverImage: '/images/cover.jpg',
      });
    });

    it('handles date parsed as Date object from YAML', () => {
      // Mock gray-matter to return a Date object for the date field
      const mockMatter = jest.fn().mockReturnValue({
        data: {
          title: 'Date Object Post',
          date: new Date('2023-06-15'),
          excerpt: 'Test excerpt',
          tags: ['test'],
          published: true,
        },
        content: 'Test content'
      });
      
      // Mock the matter import
      jest.doMock('gray-matter', () => mockMatter);
      
      mockFs.readFileSync.mockReturnValue(`---
title: Date Object Post
date: 2023-06-15
---
Test content`);

      const result = getPostBySlug('date-object-post');
      
      expect(result?.date).toBe('2023-06-15'); // Should be converted to string
      expect(result?.title).toBe('Date Object Post');
      
      jest.dontMock('gray-matter');
    });
  });
});