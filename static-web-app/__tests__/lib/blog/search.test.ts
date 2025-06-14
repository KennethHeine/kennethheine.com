/**
 * @jest-environment jsdom
 */

import fs from 'fs';
import path from 'path';
import {
  getAllPosts,
  getPostsByTag,
  getAllTags,
  getAllCategories,
  getPostsByCategory,
  getRelatedPosts,
} from '@/lib/blog/search';
import type { BlogPost } from '@/types/blog';

// Mock file system
jest.mock('fs');
jest.mock('path');

// Mock the parser module
const mockGetPostSlugs = jest.fn();
const mockGetPostBySlug = jest.fn();

jest.mock('@/lib/blog/parser', () => ({
  getPostSlugs: () => mockGetPostSlugs(),
  getPostBySlug: (slug: string) => mockGetPostBySlug(slug),
}));

// Sample blog posts for testing
let mockBlogPosts: BlogPost[];

describe('lib/blog/search.ts', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Reset mock posts for each test
    mockBlogPosts = [
      {
        slug: 'post-1',
        title: 'React Best Practices',
        excerpt: 'Learn React best practices',
        content: 'Content about React',
        date: '2024-01-01',
        published: true,
        tags: ['React', 'JavaScript'],
        category: 'Development',
        readingTime: 5,
      },
      {
        slug: 'post-2',
        title: 'TypeScript Guide',
        excerpt: 'Complete TypeScript guide',
        content: 'Content about TypeScript',
        date: '2024-01-02',
        published: true,
        tags: ['TypeScript', 'JavaScript'],
        category: 'Development',
        readingTime: 8,
      },
      {
        slug: 'post-3',
        title: 'Azure Architecture',
        excerpt: 'Azure cloud architecture patterns',
        content: 'Content about Azure',
        date: '2024-01-03',
        published: true,
        tags: ['Azure', 'Cloud'],
        category: 'Cloud',
        readingTime: 10,
      },
      {
        slug: 'post-4',
        title: 'Draft Post',
        excerpt: 'This is a draft',
        content: 'Draft content',
        date: '2024-01-04',
        published: false, // Unpublished post
        tags: ['Draft'],
        category: 'Development',
        readingTime: 3,
      },
    ];
    
    // Mock fs.existsSync to return true by default
    (fs.existsSync as jest.Mock).mockReturnValue(true);
    
    // Mock path.join to return a dummy path
    (path.join as jest.Mock).mockReturnValue('/mock/posts');
    
    // Set up default mocks
    mockGetPostSlugs.mockReturnValue(['post-1', 'post-2', 'post-3', 'post-4']);
    mockGetPostBySlug.mockImplementation((slug: string) => {
      return mockBlogPosts.find(post => post.slug === slug) || null;
    });
  });

  describe('getAllPosts', () => {
    it('returns all published posts sorted by date (newest first)', () => {
      const posts = getAllPosts();
      
      expect(posts).toHaveLength(3); // Only published posts
      expect(posts[0].slug).toBe('post-3'); // Newest first
      expect(posts[1].slug).toBe('post-2');
      expect(posts[2].slug).toBe('post-1');
      
      // Verify all posts are published
      posts.forEach(post => {
        expect(post.published).toBe(true);
      });
    });

    it('returns empty array when posts directory does not exist', () => {
      (fs.existsSync as jest.Mock).mockReturnValue(false);
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
      
      const posts = getAllPosts();
      
      expect(posts).toEqual([]);
      expect(consoleSpy).toHaveBeenCalledWith('Posts directory not found, returning empty array');
      
      consoleSpy.mockRestore();
    });

    it('filters out null posts and unpublished posts', () => {
      mockGetPostBySlug.mockImplementation((slug: string) => {
        if (slug === 'post-2') return null; // Simulate missing post
        return mockBlogPosts.find(post => post.slug === slug) || null;
      });
      
      const posts = getAllPosts();
      
      expect(posts).toHaveLength(2); // post-1 and post-3 (post-2 is null, post-4 is unpublished)
      expect(posts.find(p => p.slug === 'post-2')).toBeUndefined();
      expect(posts.find(p => p.slug === 'post-4')).toBeUndefined();
    });
  });

  describe('getPostsByTag', () => {
    it('returns posts that have the specified tag', () => {
      const posts = getPostsByTag('JavaScript');
      
      expect(posts).toHaveLength(2);
      expect(posts.every(post => post.tags.includes('JavaScript'))).toBe(true);
    });

    it('handles case-insensitive tag matching', () => {
      const posts = getPostsByTag('javascript');
      
      expect(posts).toHaveLength(2);
      expect(posts.every(post => post.tags.some(tag => tag.toLowerCase() === 'javascript'))).toBe(true);
    });

    it('returns empty array when no posts have the tag', () => {
      const posts = getPostsByTag('NonExistentTag');
      
      expect(posts).toEqual([]);
    });
  });

  describe('getAllTags', () => {
    it('returns all unique tags sorted alphabetically', () => {
      const tags = getAllTags();
      
      expect(tags).toEqual(['Azure', 'Cloud', 'JavaScript', 'React', 'TypeScript']);
      expect(tags).toHaveLength(5);
    });

    it('removes duplicate tags', () => {
      const tags = getAllTags();
      const uniqueTags = Array.from(new Set(tags));
      
      expect(tags).toEqual(uniqueTags);
    });
  });

  describe('getAllCategories', () => {
    it('returns all unique categories sorted alphabetically', () => {
      const categories = getAllCategories();
      
      expect(categories).toEqual(['Cloud', 'Development']);
      expect(categories).toHaveLength(2);
    });

    it('filters out undefined categories', () => {
      // Add a post without category to a copy of the array
      const postWithoutCategory = {
        ...mockBlogPosts[0],
        slug: 'no-category-post',
        category: undefined,
      };
      const postsWithUndefined = [...mockBlogPosts, postWithoutCategory];
      
      mockGetPostSlugs.mockReturnValue(['post-1', 'post-2', 'post-3', 'post-4', 'no-category-post']);
      mockGetPostBySlug.mockImplementation((slug: string) => {
        return postsWithUndefined.find(post => post.slug === slug) || null;
      });
      
      const categories = getAllCategories();
      
      expect(categories).toEqual(['Cloud', 'Development']);
      expect(categories.every(cat => cat !== undefined)).toBe(true);
    });
  });

  describe('getPostsByCategory', () => {
    it('returns posts in the specified category', () => {
      const posts = getPostsByCategory('Development');
      
      expect(posts).toHaveLength(2);
      expect(posts.every(post => post.category === 'Development')).toBe(true);
    });

    it('handles case-insensitive category matching', () => {
      const posts = getPostsByCategory('development');
      
      expect(posts).toHaveLength(2);
      expect(posts.every(post => post.category?.toLowerCase() === 'development')).toBe(true);
    });

    it('returns empty array when no posts in category', () => {
      const posts = getPostsByCategory('NonExistentCategory');
      
      expect(posts).toEqual([]);
    });
  });

  describe('getRelatedPosts', () => {
    let currentPost: BlogPost;

    beforeEach(() => {
      currentPost = mockBlogPosts[0]; // React post with 'React', 'JavaScript' tags
    });

    it('returns related posts based on shared tags', () => {
      const relatedPosts = getRelatedPosts(currentPost);
      
      expect(relatedPosts).toHaveLength(1); // Only TypeScript post shares 'JavaScript' tag
      expect(relatedPosts[0].slug).toBe('post-2');
    });

    it('excludes the current post from results', () => {
      const relatedPosts = getRelatedPosts(currentPost);
      
      expect(relatedPosts.every(post => post.slug !== currentPost.slug)).toBe(true);
    });

    it('respects the limit parameter', () => {
      const relatedPosts = getRelatedPosts(currentPost, 1);
      
      expect(relatedPosts).toHaveLength(1);
    });

    it('returns empty array when current post has no tags', () => {
      const postWithoutTags = { ...currentPost, tags: [] };
      const relatedPosts = getRelatedPosts(postWithoutTags);
      
      expect(relatedPosts).toEqual([]);
    });

    it('returns empty array when no other posts have shared tags', () => {
      // Mock a separate set of posts where none share tags or categories with our test post
      const isolatedPosts = [
        {
          slug: 'unique-post',
          title: 'Unique Post',
          excerpt: 'A unique post',
          content: 'Content',
          date: '2024-01-01',
          published: true,
          tags: ['UniqueTag1', 'UniqueTag2'],
          category: 'UniqueCategory',
          readingTime: 5,
        },
        {
          slug: 'other-post',
          title: 'Other Post',
          excerpt: 'Another post',
          content: 'Content',
          date: '2024-01-02',
          published: true,
          tags: ['OtherTag1', 'OtherTag2'],
          category: 'OtherCategory',
          readingTime: 5,
        },
      ];

      mockGetPostSlugs.mockReturnValue(['unique-post', 'other-post']);
      mockGetPostBySlug.mockImplementation((slug: string) => {
        return isolatedPosts.find(post => post.slug === slug) || null;
      });

      const relatedPosts = getRelatedPosts(isolatedPosts[0]);
      
      expect(relatedPosts).toEqual([]);
    });

    it('gives bonus score for same category', () => {
      // Create posts with same category but different shared tag counts
      const postWithSameCategory: BlogPost = {
        slug: 'same-category-post',
        title: 'Same Category Post',
        excerpt: 'Post in same category',
        content: 'Content',
        date: '2024-01-05',
        published: true,
        tags: ['JavaScript'], // 1 shared tag
        category: 'Development', // Same category as current post
        readingTime: 5,
      };

      const postWithDifferentCategory: BlogPost = {
        slug: 'different-category-post',
        title: 'Different Category Post',
        excerpt: 'Post in different category',
        content: 'Content',
        date: '2024-01-06',
        published: true,
        tags: ['JavaScript', 'React'], // 2 shared tags
        category: 'Cloud', // Different category
        readingTime: 5,
      };

      // Mock additional posts
      const extendedPosts = [...mockBlogPosts, postWithSameCategory, postWithDifferentCategory];
      mockGetPostSlugs.mockReturnValue([
        'post-1', 'post-2', 'post-3', 'post-4', 
        'same-category-post', 'different-category-post'
      ]);
      mockGetPostBySlug.mockImplementation((slug: string) => {
        return extendedPosts.find(post => post.slug === slug) || null;
      });

      const relatedPosts = getRelatedPosts(currentPost);
      
      // The post with same category should be ranked higher due to bonus
      expect(relatedPosts[0].slug).toBe('different-category-post'); // 2 shared tags wins
      expect(relatedPosts[1].slug).toBe('same-category-post'); // 1 shared tag + category bonus
    });

    it('sorts by score then by date when scores are equal', () => {
      const post1: BlogPost = {
        slug: 'newer-post',
        title: 'Newer Post',
        excerpt: 'Newer post',
        content: 'Content',
        date: '2024-01-10',
        published: true,
        tags: ['JavaScript'], // Same score
        readingTime: 5,
      };

      const post2: BlogPost = {
        slug: 'older-post',
        title: 'Older Post',
        excerpt: 'Older post',
        content: 'Content',
        date: '2024-01-01',
        published: true,
        tags: ['JavaScript'], // Same score
        readingTime: 5,
      };

      const extendedPosts = [...mockBlogPosts, post1, post2];
      mockGetPostSlugs.mockReturnValue([
        'post-1', 'post-2', 'post-3', 'post-4', 'newer-post', 'older-post'
      ]);
      mockGetPostBySlug.mockImplementation((slug: string) => {
        return extendedPosts.find(post => post.slug === slug) || null;
      });

      const relatedPosts = getRelatedPosts(currentPost);
      
      // Should be sorted by date (newer first) when scores are equal
      const jsRelatedPosts = relatedPosts.filter(p => 
        p.slug === 'newer-post' || p.slug === 'older-post'
      );
      expect(jsRelatedPosts[0].slug).toBe('newer-post');
    });
  });
});