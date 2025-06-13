import {
  processFrontmatter,
  validateFrontmatter,
} from '../../../lib/blog/metadata';

describe('Blog Metadata utilities', () => {
  describe('processFrontmatter', () => {
    it('processes frontmatter from MDX content', () => {
      const content = `---
title: "Test Blog Post"
date: "2024-01-15"
tags: ["javascript", "testing"]
author: "Test Author"
excerpt: "This is a test excerpt"
---

# Test Blog Post

This is the content of the blog post.`;

      const result = processFrontmatter(content);

      expect(result.data).toEqual({
        title: 'Test Blog Post',
        date: '2024-01-15',
        tags: ['javascript', 'testing'],
        author: 'Test Author',
        excerpt: 'This is a test excerpt',
      });

      expect(result.content.trim()).toBe(`# Test Blog Post

This is the content of the blog post.`);
    });

    it('handles content without frontmatter', () => {
      const content = `# Test Blog Post

This is content without frontmatter.`;

      const result = processFrontmatter(content);

      expect(result.data).toEqual({});
      expect(result.content).toBe(content);
    });

    it('handles empty frontmatter', () => {
      const content = `---
---

# Test Blog Post

Content after empty frontmatter.`;

      const result = processFrontmatter(content);

      expect(result.data).toEqual({});
      expect(result.content.trim()).toBe(`# Test Blog Post

Content after empty frontmatter.`);
    });

    it('handles frontmatter with various data types', () => {
      const content = `---
title: "Mixed Data Types"
published: true
readingTime: 5
tags: ["tag1", "tag2"]
metadata:
  seo: true
  social: false
---

Content here.`;

      const result = processFrontmatter(content);

      expect(result.data).toEqual({
        title: 'Mixed Data Types',
        published: true,
        readingTime: 5,
        tags: ['tag1', 'tag2'],
        metadata: {
          seo: true,
          social: false,
        },
      });

      expect(result.content.trim()).toBe('Content here.');
    });

    it('handles frontmatter with dates', () => {
      const content = `---
title: "Date Test"
date: "2024-01-15"
publishedAt: "2024-01-15T10:30:00Z"
---

Date content.`;

      const result = processFrontmatter(content);

      expect(result.data.title).toBe('Date Test');
      expect(result.data.date).toBe('2024-01-15');
      expect(result.data.publishedAt).toBe('2024-01-15T10:30:00Z');
    });

    it('handles multiline content correctly', () => {
      const content = `---
title: "Multiline Test"
description: |
  This is a multiline
  description that spans
  multiple lines.
---

# Heading

Paragraph 1.

Paragraph 2.`;

      const result = processFrontmatter(content);

      expect(result.data.title).toBe('Multiline Test');
      expect(result.data.description).toBe('This is a multiline\ndescription that spans\nmultiple lines.\n');
      expect(result.content).toContain('# Heading');
      expect(result.content).toContain('Paragraph 1.');
    });

    it('handles special characters in frontmatter', () => {
      const content = `---
title: "Special Characters: & < > quotes and apostrophes"
slug: "special-chars-test"
emoji: "🚀"
---

Content with special characters.`;

      const result = processFrontmatter(content);

      expect(result.data.title).toBe('Special Characters: & < > quotes and apostrophes');
      expect(result.data.slug).toBe('special-chars-test');
      expect(result.data.emoji).toBe('🚀');
    });
  });

  describe('validateFrontmatter', () => {
    it('validates valid frontmatter with required fields', () => {
      const validData = {
        title: 'Test Title',
        date: '2024-01-15',
        tags: ['javascript', 'testing'],
        author: 'Test Author',
      };

      expect(validateFrontmatter(validData)).toBe(true);
    });

    it('validates frontmatter with only title (minimum required)', () => {
      const minimalData = {
        title: 'Just a Title',
      };

      expect(validateFrontmatter(minimalData)).toBe(true);
    });

    it('rejects frontmatter without title', () => {
      const invalidData = {
        date: '2024-01-15',
        author: 'Test Author',
      };

      expect(validateFrontmatter(invalidData)).toBe(false);
    });

    it('rejects frontmatter with empty title', () => {
      const invalidData = {
        title: '',
        date: '2024-01-15',
      };

      expect(validateFrontmatter(invalidData)).toBe(false);
    });

    it('rejects frontmatter with whitespace-only title', () => {
      const invalidData = {
        title: '   ',
        date: '2024-01-15',
      };

      expect(validateFrontmatter(invalidData)).toBe(false);
    });

    it('rejects non-string title', () => {
      const invalidData = {
        title: 123,
        date: '2024-01-15',
      };

      expect(validateFrontmatter(invalidData)).toBe(false);
    });

    it('rejects null or undefined input', () => {
      expect(validateFrontmatter(null)).toBe(false);
      expect(validateFrontmatter(undefined)).toBe(false);
    });

    it('rejects non-object input', () => {
      expect(validateFrontmatter('string')).toBe(false);
      expect(validateFrontmatter(123)).toBe(false);
      expect(validateFrontmatter(true)).toBe(false);
      expect(validateFrontmatter([])).toBe(false);
    });

    it('validates frontmatter with valid date string', () => {
      const validData = {
        title: 'Test Title',
        date: '2024-01-15',
      };

      expect(validateFrontmatter(validData)).toBe(true);
    });

    it('validates frontmatter with ISO date string', () => {
      const validData = {
        title: 'Test Title',
        date: '2024-01-15T10:30:00Z',
      };

      expect(validateFrontmatter(validData)).toBe(true);
    });

    it('rejects frontmatter with invalid date string', () => {
      const invalidData = {
        title: 'Test Title',
        date: 'invalid-date',
      };

      expect(validateFrontmatter(invalidData)).toBe(false);
    });

    it('rejects frontmatter with non-string date', () => {
      const invalidData = {
        title: 'Test Title',
        date: new Date('2024-01-15'), // Date object instead of string
      };

      expect(validateFrontmatter(invalidData)).toBe(false);
    });

    it('validates frontmatter without date (optional field)', () => {
      const validData = {
        title: 'Test Title',
        author: 'Test Author',
      };

      expect(validateFrontmatter(validData)).toBe(true);
    });

    it('validates frontmatter with valid tags array', () => {
      const validData = {
        title: 'Test Title',
        tags: ['javascript', 'testing', 'react'],
      };

      expect(validateFrontmatter(validData)).toBe(true);
    });

    it('validates frontmatter with empty tags array', () => {
      const validData = {
        title: 'Test Title',
        tags: [],
      };

      expect(validateFrontmatter(validData)).toBe(true);
    });

    it('rejects frontmatter with non-array tags', () => {
      const invalidData = {
        title: 'Test Title',
        tags: 'javascript, testing',
      };

      expect(validateFrontmatter(invalidData)).toBe(false);
    });

    it('rejects frontmatter with tags array containing non-strings', () => {
      const invalidData = {
        title: 'Test Title',
        tags: ['javascript', 123, 'testing'],
      };

      expect(validateFrontmatter(invalidData)).toBe(false);
    });

    it('validates frontmatter without tags (optional field)', () => {
      const validData = {
        title: 'Test Title',
        author: 'Test Author',
      };

      expect(validateFrontmatter(validData)).toBe(true);
    });

    it('ignores unknown fields and validates known ones', () => {
      const dataWithUnknownFields = {
        title: 'Test Title',
        date: '2024-01-15',
        tags: ['javascript'],
        unknownField: 'should be ignored',
        anotherUnknown: 123,
      };

      expect(validateFrontmatter(dataWithUnknownFields)).toBe(true);
    });

    it('handles complex valid frontmatter', () => {
      const complexData = {
        title: 'Complex Blog Post',
        date: '2024-01-15T14:30:00.000Z',
        tags: ['javascript', 'react', 'typescript', 'frontend'],
        author: 'John Developer',
        excerpt: 'A comprehensive guide to modern web development',
        published: true,
        readingTime: '10 min read',
        coverImage: '/images/cover.jpg',
      };

      expect(validateFrontmatter(complexData)).toBe(true);
    });

    it('handles edge cases with special string values', () => {
      const edgeData = {
        title: 'Title with "quotes" and \'apostrophes\'',
        date: '2024-12-31',
        tags: ['tag-with-dash', 'tag_with_underscore', 'tag.with.dots'],
      };

      expect(validateFrontmatter(edgeData)).toBe(true);
    });
  });
});