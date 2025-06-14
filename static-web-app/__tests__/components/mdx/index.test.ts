import * as mdxExports from '../../../components/mdx';

describe('MDX Index', () => {
  it('exports CodeBlock component', () => {
    expect(mdxExports.CodeBlock).toBeDefined();
    expect(typeof mdxExports.CodeBlock).toBe('function');
  });

  it('exports TableOfContents component', () => {
    expect(mdxExports.TableOfContents).toBeDefined();
    expect(typeof mdxExports.TableOfContents).toBe('function');
  });

  it('exports all expected components', () => {
    const expectedExports = ['CodeBlock', 'TableOfContents'];
    const actualExports = Object.keys(mdxExports);

    expect(actualExports).toEqual(expect.arrayContaining(expectedExports));
    expect(actualExports).toHaveLength(expectedExports.length);
  });
});
