import React from 'react';
import {
  generateTableOfContents,
  generateHeadingId,
  processMDX,
} from '../../../lib/mdx';

// Mock next-mdx-remote/rsc
jest.mock('next-mdx-remote/rsc', () => ({
  compileMDX: jest.fn().mockResolvedValue({
    content: React.createElement(
      'div',
      { 'data-testid': 'mocked-mdx-content' },
      'Mocked MDX Content'
    ),
  }),
}));

// Mock MDX components
jest.mock('../../../components/mdx/CodeBlock', () => ({
  CodeBlock: ({ children }: { children: React.ReactNode }) =>
    React.createElement(
      'pre',
      { 'data-testid': 'mocked-code-block' },
      children
    ),
}));

jest.mock('../../../components/mdx/TableOfContents', () => ({
  TableOfContents: ({ items }: { items: any[] }) =>
    React.createElement(
      'nav',
      { 'data-testid': 'mocked-toc' },
      `TOC with ${items.length} items`
    ),
}));

describe('MDX Processor', () => {
  describe('generateHeadingId', () => {
    it('converts text to URL-safe ID', () => {
      expect(generateHeadingId('Getting Started')).toBe('getting-started');
      expect(generateHeadingId('API Reference')).toBe('api-reference');
      expect(generateHeadingId('What is TypeScript?')).toBe(
        'what-is-typescript'
      );
    });

    it('handles special characters', () => {
      expect(generateHeadingId('Setup & Configuration')).toBe(
        'setup-configuration'
      );
      expect(generateHeadingId('React.js: Modern Development')).toBe(
        'reactjs-modern-development'
      );
      expect(generateHeadingId('100% Test Coverage')).toBe('100-test-coverage');
    });

    it('handles multiple spaces and hyphens', () => {
      expect(generateHeadingId('Multiple   Spaces')).toBe('multiple-spaces');
      expect(generateHeadingId('Already-Has-Hyphens')).toBe(
        'already-has-hyphens'
      );
      expect(generateHeadingId('Mixed - Spaces  And-Hyphens')).toBe(
        'mixed-spaces-and-hyphens'
      );
    });

    it('removes leading and trailing hyphens', () => {
      expect(generateHeadingId('-Leading Hyphen')).toBe('leading-hyphen');
      expect(generateHeadingId('Trailing Hyphen-')).toBe('trailing-hyphen');
      expect(generateHeadingId('-Both Sides-')).toBe('both-sides');
    });

    it('handles edge cases', () => {
      expect(generateHeadingId('')).toBe('');
      expect(generateHeadingId('   ')).toBe('');
      expect(generateHeadingId('---')).toBe('');
      expect(generateHeadingId('Single')).toBe('single');
    });
  });

  describe('generateTableOfContents', () => {
    it('extracts headings from MDX content', () => {
      const content = `# Introduction

This is the introduction.

## Getting Started

How to get started.

### Prerequisites

What you need.

## Advanced Topics

More complex stuff.

### Performance

Optimization tips.

### Security

Best practices.`;

      const toc = generateTableOfContents(content);

      expect(toc).toEqual([
        { id: 'introduction', title: 'Introduction', level: 1 },
        { id: 'getting-started', title: 'Getting Started', level: 2 },
        { id: 'prerequisites', title: 'Prerequisites', level: 3 },
        { id: 'advanced-topics', title: 'Advanced Topics', level: 2 },
        { id: 'performance', title: 'Performance', level: 3 },
        { id: 'security', title: 'Security', level: 3 },
      ]);
    });

    it('handles headings with special characters', () => {
      const content = `# What is TypeScript?

## Setup & Configuration

### React.js Integration

#### 100% Type Safety`;

      const toc = generateTableOfContents(content);

      expect(toc).toEqual([
        { id: 'what-is-typescript', title: 'What is TypeScript?', level: 1 },
        { id: 'setup-configuration', title: 'Setup & Configuration', level: 2 },
        { id: 'reactjs-integration', title: 'React.js Integration', level: 3 },
        { id: '100-type-safety', title: '100% Type Safety', level: 4 },
      ]);
    });

    it('handles empty content', () => {
      expect(generateTableOfContents('')).toEqual([]);
      expect(generateTableOfContents('No headings here')).toEqual([]);
    });

    it('handles only specific heading levels', () => {
      const content = `## Second Level

### Third Level

###### Sixth Level`;

      const toc = generateTableOfContents(content);

      expect(toc).toEqual([
        { id: 'second-level', title: 'Second Level', level: 2 },
        { id: 'third-level', title: 'Third Level', level: 3 },
        { id: 'sixth-level', title: 'Sixth Level', level: 6 },
      ]);
    });

    it('handles headings with extra whitespace', () => {
      const content = `#   Spaced Heading   

##    Another One    `;

      const toc = generateTableOfContents(content);

      expect(toc).toEqual([
        { id: 'spaced-heading', title: 'Spaced Heading', level: 1 },
        { id: 'another-one', title: 'Another One', level: 2 },
      ]);
    });
  });

  describe('processMDX', () => {
    it('processes simple MDX content', async () => {
      const content = `# Test Heading

This is test content.

## Second Heading

More content here.`;

      const result = await processMDX(content);

      expect(result.toc).toEqual([
        { id: 'test-heading', title: 'Test Heading', level: 1 },
        { id: 'second-heading', title: 'Second Heading', level: 2 },
      ]);
      expect(result.content).toBeTruthy();
    });

    it('handles MDX with code blocks', async () => {
      const content = `# Code Example

Here's some code:

\`\`\`javascript
function hello() {
  console.log('Hello, world!');
}
\`\`\`

And more content.`;

      const result = await processMDX(content);

      expect(result.toc).toEqual([
        { id: 'code-example', title: 'Code Example', level: 1 },
      ]);
      expect(result.content).toBeTruthy();
    });

    it('handles empty content', async () => {
      const result = await processMDX('');

      expect(result.toc).toEqual([]);
      expect(result.content).toBeTruthy();
    });

    it('handles content without headings', async () => {
      const content = 'Just some plain content without any headings.';

      const result = await processMDX(content);

      expect(result.toc).toEqual([]);
      expect(result.content).toBeTruthy();
    });

    it('throws error when MDX compilation fails', async () => {
      // Mock the compileMDX to throw an error
      const { compileMDX } = await import('next-mdx-remote/rsc');
      (
        compileMDX as jest.MockedFunction<typeof compileMDX>
      ).mockRejectedValueOnce(new Error('Compilation failed'));

      await expect(processMDX('# Test Content')).rejects.toThrow(
        'Failed to process MDX content'
      );
    });
  });
});
