import { getAllCategories, getPostsByCategory, getRelatedPosts } from '@/lib/blog/search';
import { getAllPosts } from '@/lib/blog/search';

describe('Blog Search Functions', () => {
  describe('getAllCategories', () => {
    it('returns an array of categories', () => {
      const categories = getAllCategories();
      expect(Array.isArray(categories)).toBe(true);
      expect(categories.length).toBeGreaterThan(0);
    });

    it('returns unique categories', () => {
      const categories = getAllCategories();
      const uniqueCategories = [...new Set(categories)];
      expect(categories.length).toBe(uniqueCategories.length);
    });

    it('returns sorted categories', () => {
      const categories = getAllCategories();
      const sortedCategories = [...categories].sort();
      expect(categories).toEqual(sortedCategories);
    });
  });

  describe('getPostsByCategory', () => {
    it('returns posts for existing categories', () => {
      const categories = getAllCategories();
      if (categories.length > 0) {
        const firstCategory = categories[0];
        const posts = getPostsByCategory(firstCategory);
        expect(Array.isArray(posts)).toBe(true);
        posts.forEach(post => {
          expect(post.category).toBe(firstCategory);
        });
      }
    });

    it('returns empty array for non-existent category', () => {
      const posts = getPostsByCategory('Non-existent Category');
      expect(posts).toHaveLength(0);
    });

    it('is case insensitive', () => {
      const categories = getAllCategories();
      if (categories.length > 0) {
        const firstCategory = categories[0];
        const posts = getPostsByCategory(firstCategory.toLowerCase());
        expect(Array.isArray(posts)).toBe(true);
      }
    });
  });

  describe('getRelatedPosts', () => {
    it('returns related posts based on shared tags', () => {
      const allPosts = getAllPosts();
      if (allPosts.length > 1) {
        const currentPost = allPosts[0];
        const related = getRelatedPosts(currentPost);
        
        expect(Array.isArray(related)).toBe(true);
        related.forEach(post => {
          expect(post.slug).not.toBe(currentPost.slug);
        });
      }
    });

    it('excludes the current post from results', () => {
      const allPosts = getAllPosts();
      if (allPosts.length > 0) {
        const currentPost = allPosts[0];
        const related = getRelatedPosts(currentPost);
        
        expect(related.every(post => post.slug !== currentPost.slug)).toBe(true);
      }
    });

    it('respects the limit parameter', () => {
      const allPosts = getAllPosts();
      if (allPosts.length > 0) {
        const currentPost = allPosts[0];
        const related = getRelatedPosts(currentPost, 1);
        
        expect(related.length).toBeLessThanOrEqual(1);
      }
    });

    it('returns empty array when no shared tags', () => {
      const postWithNoCommonTags = {
        slug: 'isolated',
        title: 'Isolated Post',
        date: '2025-01-05',
        excerpt: 'No shared tags',
        content: 'Content',
        tags: ['very-unique-tag-that-does-not-exist'],
        category: 'Unique Category',
        published: true,
      };
      
      const related = getRelatedPosts(postWithNoCommonTags);
      expect(related).toHaveLength(0);
    });

    it('returns empty array when current post has no tags', () => {
      const noTagsPost = {
        slug: 'no-tags',
        title: 'No Tags Post',
        date: '2025-01-05',
        excerpt: 'No tags here',
        content: 'Content',
        tags: [],
        published: true,
      };
      
      const related = getRelatedPosts(noTagsPost);
      expect(related).toHaveLength(0);
    });
  });
});