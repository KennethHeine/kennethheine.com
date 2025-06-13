import * as blogIndex from '../../../lib/blog/index';
import * as parser from '../../../lib/blog/parser';
import * as search from '../../../lib/blog/search';
import * as metadata from '../../../lib/blog/metadata';

describe('lib/blog/index.ts', () => {
  it('re-exports all parser functions', () => {
    expect(blogIndex.getPostSlugs).toBe(parser.getPostSlugs);
    expect(blogIndex.getPostBySlug).toBe(parser.getPostBySlug);
  });

  it('re-exports all search functions', () => {
    expect(blogIndex.getAllPosts).toBe(search.getAllPosts);
    expect(blogIndex.getPostsByTag).toBe(search.getPostsByTag);
    expect(blogIndex.getAllTags).toBe(search.getAllTags);
  });

  it('re-exports all metadata functions', () => {
    expect(blogIndex.processFrontmatter).toBe(metadata.processFrontmatter);
    expect(blogIndex.validateFrontmatter).toBe(metadata.validateFrontmatter);
  });

  it('exports are accessible from the index', () => {
    // Test that functions can be called through the index re-exports
    expect(typeof blogIndex.getPostSlugs).toBe('function');
    expect(typeof blogIndex.getPostBySlug).toBe('function');
    expect(typeof blogIndex.getAllPosts).toBe('function');
    expect(typeof blogIndex.getPostsByTag).toBe('function');
    expect(typeof blogIndex.getAllTags).toBe('function');
    expect(typeof blogIndex.processFrontmatter).toBe('function');
    expect(typeof blogIndex.validateFrontmatter).toBe('function');
  });
});
