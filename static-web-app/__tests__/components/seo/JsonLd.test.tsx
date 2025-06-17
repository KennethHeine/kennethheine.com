import { render } from '@testing-library/react';
import { JsonLd } from '../../../components/seo/JsonLd';

describe('JsonLd component', () => {
  it('renders JSON-LD script tag with correct type', () => {
    const testData = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Test Website',
    };

    const { container } = render(<JsonLd data={testData} />);
    const script = container.querySelector(
      'script[type="application/ld+json"]'
    );

    expect(script).toBeInTheDocument();
  });

  it('embeds structured data as JSON', () => {
    const testData = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'John Doe',
      jobTitle: 'Developer',
    };

    const { container } = render(<JsonLd data={testData} />);
    const script = container.querySelector(
      'script[type="application/ld+json"]'
    );

    expect(script).toBeInTheDocument();
    expect(script?.innerHTML).toContain('"@context": "https://schema.org"');
    expect(script?.innerHTML).toContain('"@type": "Person"');
    expect(script?.innerHTML).toContain('"name": "John Doe"');
    expect(script?.innerHTML).toContain('"jobTitle": "Developer"');
  });

  it('handles complex nested objects', () => {
    const testData = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: 'Test Blog Post',
      author: {
        '@type': 'Person',
        name: 'Jane Smith',
      },
      publisher: {
        '@type': 'Organization',
        name: 'Test Org',
      },
    };

    const { container } = render(<JsonLd data={testData} />);
    const script = container.querySelector(
      'script[type="application/ld+json"]'
    );

    expect(script).toBeInTheDocument();
    expect(script?.innerHTML).toContain('"headline": "Test Blog Post"');
    expect(script?.innerHTML).toContain('"author"');
    expect(script?.innerHTML).toContain('"publisher"');
  });

  it('handles arrays in structured data', () => {
    const testData = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Test Person',
      knowsAbout: ['JavaScript', 'React', 'TypeScript'],
    };

    const { container } = render(<JsonLd data={testData} />);
    const script = container.querySelector(
      'script[type="application/ld+json"]'
    );

    expect(script).toBeInTheDocument();
    expect(script?.innerHTML).toContain('"knowsAbout"');
    expect(script?.innerHTML).toContain('JavaScript');
    expect(script?.innerHTML).toContain('React');
    expect(script?.innerHTML).toContain('TypeScript');
  });

  it('formats JSON with proper indentation', () => {
    const testData = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Test',
    };

    const { container } = render(<JsonLd data={testData} />);
    const script = container.querySelector(
      'script[type="application/ld+json"]'
    );

    expect(script).toBeInTheDocument();
    // Check that JSON is formatted (contains newlines and spaces)
    expect(script?.innerHTML).toMatch(/\n\s+/);
  });

  it('handles empty objects', () => {
    const testData = {};

    const { container } = render(<JsonLd data={testData} />);
    const script = container.querySelector(
      'script[type="application/ld+json"]'
    );

    expect(script).toBeInTheDocument();
    expect(script?.innerHTML.trim()).toBe('{}');
  });

  it('sanitizes data by using JSON.stringify', () => {
    const testData = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Test with "quotes" and special chars',
    };

    const { container } = render(<JsonLd data={testData} />);
    const script = container.querySelector(
      'script[type="application/ld+json"]'
    );

    expect(script).toBeInTheDocument();
    // JSON.stringify should escape quotes properly
    expect(script?.innerHTML).toContain('\\"quotes\\"');
    // Ensure the JSON is valid and parseable
    expect(() => JSON.parse(script?.innerHTML || '')).not.toThrow();
  });
});
