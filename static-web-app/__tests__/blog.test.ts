import { getPostSlugs, getPostBySlug, getAllPosts } from '../lib/blog';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Mock fs module
jest.mock('fs');
jest.mock('path');
jest.mock('gray-matter');

const mockedFs = jest.mocked(fs);
const mockedPath = jest.mocked(path);
const mockedMatter = jest.mocked(matter);

describe('Blog utilities', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getPostSlugs', () => {
    it('returns empty array when posts directory does not exist', () => {
      mockedPath.join.mockReturnValue('/fake/posts');
      mockedFs.existsSync.mockReturnValue(false);

      const result = getPostSlugs();

      expect(result).toEqual([]);
    });

    it('returns array of slugs from MDX files', () => {
      mockedPath.join.mockReturnValue('/fake/posts');
      mockedFs.existsSync.mockReturnValue(true);
      mockedFs.readdirSync.mockReturnValue([
        'post1.mdx',
        'post2.mdx',
        'readme.txt',
      ] as any);

      const result = getPostSlugs();

      expect(result).toEqual(['post1', 'post2']);
    });
  });
  describe('getPostBySlug', () => {
    it('returns blog post with frontmatter and content', () => {
      const mockFileContent =
        'title: Test Post\ndate: 2023-01-01\n---\nContent here';
      const mockFrontmatter = {
        title: 'Test Post',
        date: '2023-01-01',
        excerpt: 'Test excerpt',
        tags: ['test'],
        published: true,
      };

      mockedPath.join.mockReturnValue('/fake/posts/test.mdx');
      mockedFs.readFileSync.mockReturnValue(mockFileContent);
      mockedMatter.mockReturnValue({
        data: mockFrontmatter,
        content: 'Content here',
        orig: mockFileContent,
        language: '',
        matter: '',
        stringify: jest.fn(),
      } as any);

      const result = getPostBySlug('test');

      expect(result).toEqual({
        slug: 'test',
        title: 'Test Post',
        date: '2023-01-01',
        excerpt: 'Test excerpt',
        tags: ['test'],
        published: true,
        content: 'Content here',
        author: undefined,
        coverImage: undefined,
      });
    });
  });
  describe('getAllPosts', () => {
    it('returns all published posts sorted by date', () => {
      // Mock getPostSlugs to return some slugs
      mockedPath.join.mockReturnValue('/fake/posts');
      mockedFs.existsSync.mockReturnValue(true);
      mockedFs.readdirSync.mockReturnValue(['post1.mdx', 'post2.mdx'] as any);

      // Mock file reads for each post
      const mockContent1 = 'title: Post 1\ndate: 2023-01-01\n---\nContent 1';
      const mockContent2 = 'title: Post 2\ndate: 2023-01-02\n---\nContent 2';

      mockedFs.readFileSync
        .mockReturnValueOnce(mockContent1)
        .mockReturnValueOnce(mockContent2);

      mockedMatter
        .mockReturnValueOnce({
          data: { title: 'Post 1', date: '2023-01-01', published: true },
          content: 'Content 1',
          orig: mockContent1,
          language: '',
          matter: '',
          stringify: jest.fn(),
        } as any)
        .mockReturnValueOnce({
          data: { title: 'Post 2', date: '2023-01-02', published: true },
          content: 'Content 2',
          orig: mockContent2,
          language: '',
          matter: '',
          stringify: jest.fn(),
        } as any);

      const result = getAllPosts();

      expect(result).toHaveLength(2);
      expect(result[0].title).toBe('Post 2'); // Should be sorted newest first
      expect(result[1].title).toBe('Post 1');
    });
  });
});
