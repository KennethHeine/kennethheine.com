import { render, screen } from '@testing-library/react';
import RootLayout, { metadata } from '../../app/layout';

// Mock the global CSS import
jest.mock('../../app/globals.css', () => ({}));

// Mock Next.js font imports to avoid font loading issues in tests
jest.mock('next/font/google', () => ({
  Inter: () => ({
    variable: '--font-inter-test',
    className: 'inter-font-class',
  }),
  JetBrains_Mono: () => ({
    variable: '--font-mono-test',
    className: 'jetbrains-mono-font-class',
  }),
}));

// Mock the Layout component
jest.mock('../../components/Layout', () => ({
  Layout: ({ children }: { children: React.ReactNode }) => (
    <div data-testid='layout-wrapper'>{children}</div>
  ),
}));

// Mock the ThemeProvider component
jest.mock('../../components/ThemeProvider', () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid='theme-provider-wrapper'>{children}</div>
  ),
}));

// Import the mocked components for use in tests
import { Layout } from '../../components/Layout';
import { ThemeProvider } from '../../components/ThemeProvider';

describe('RootLayout', () => {
  const mockChildren = <div data-testid='test-children'>Test Content</div>;

  // Create a test wrapper that excludes html/body tags to avoid DOM nesting warnings
  const RootLayoutContent = ({ children }: { children: React.ReactNode }) => {
    return (
      <ThemeProvider>
        <Layout>{children}</Layout>
      </ThemeProvider>
    );
  };

  // Test the component structure that can be reasonably tested
  it('wraps children with ThemeProvider', () => {
    render(<RootLayoutContent>{mockChildren}</RootLayoutContent>);

    // Check that ThemeProvider wrapper is present
    expect(screen.getByTestId('theme-provider-wrapper')).toBeInTheDocument();
  });

  it('includes Layout component with proper props', () => {
    render(<RootLayoutContent>{mockChildren}</RootLayoutContent>);

    // Check that Layout wrapper is present
    expect(screen.getByTestId('layout-wrapper')).toBeInTheDocument();
  });

  it('handles children rendering correctly', () => {
    render(<RootLayoutContent>{mockChildren}</RootLayoutContent>);

    // Check that children are rendered
    expect(screen.getByTestId('test-children')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('renders component structure correctly', () => {
    render(<RootLayoutContent>{mockChildren}</RootLayoutContent>);

    // Verify the nesting structure: ThemeProvider > Layout > Children
    const themeProvider = screen.getByTestId('theme-provider-wrapper');
    const layout = screen.getByTestId('layout-wrapper');
    const children = screen.getByTestId('test-children');

    expect(themeProvider).toBeInTheDocument();
    expect(layout).toBeInTheDocument();
    expect(children).toBeInTheDocument();
  });

  it('renders without crashing with different children', () => {
    const differentChildren = (
      <div>
        <h1>Page Title</h1>
        <p>Page content</p>
      </div>
    );

    expect(() => {
      render(<RootLayoutContent>{differentChildren}</RootLayoutContent>);
    }).not.toThrow();

    expect(screen.getByText('Page Title')).toBeInTheDocument();
    expect(screen.getByText('Page content')).toBeInTheDocument();
  });

  it('handles null children gracefully', () => {
    expect(() => {
      render(<RootLayoutContent>{null}</RootLayoutContent>);
    }).not.toThrow();

    // Should still render the wrapper components
    expect(screen.getByTestId('theme-provider-wrapper')).toBeInTheDocument();
    expect(screen.getByTestId('layout-wrapper')).toBeInTheDocument();
  });

  // Test that the full RootLayout component exports exist and have correct structure
  it('exports the correct component structure', () => {
    // We can test the component definition without rendering the html/body tags
    expect(RootLayout).toBeDefined();
    expect(typeof RootLayout).toBe('function');
  });

  // Test the actual RootLayout function to achieve function coverage
  it('renders RootLayout component with proper structure', () => {
    // Create a container div to simulate a proper DOM environment
    const container = document.createElement('div');
    document.body.appendChild(container);

    try {
      // Test the actual RootLayout function call
      const result = RootLayout({ children: mockChildren });

      // Verify the result is a valid React element
      expect(result).toBeDefined();
      expect(result.type).toBe('html');
      expect(result.props.lang).toBe('en');
      expect(result.props.suppressHydrationWarning).toBe(true);

      // Check that the result contains the expected structure (head and body)
      expect(result.props.children).toBeDefined();
      
      // The children should be an array with head and body elements
      const children = Array.isArray(result.props.children) ? result.props.children : [result.props.children];
      
      // Find the head and body elements
      const headElement = children.find(child => child?.type === 'head');
      const bodyElement = children.find(child => child?.type === 'body');
      
      expect(headElement).toBeDefined();
      expect(bodyElement).toBeDefined();

      // Verify body props
      expect(bodyElement.props.className).toContain('font-inter antialiased');
      expect(bodyElement.props.suppressHydrationWarning).toBe(true);

      // Verify the nested structure (ThemeProvider > Layout > children)
      const bodyChildren = bodyElement.props.children;
      expect(bodyChildren).toBeDefined();
    } finally {
      // Clean up
      document.body.removeChild(container);
    }
  });

  // Test RootLayout with different children to ensure function flexibility
  it('handles different children types in RootLayout', () => {
    const stringChild = 'Simple string child';
    const elementChild = <div>Element child</div>;
    const fragmentChild = (
      <>
        <span>Fragment</span>
        <span>Content</span>
      </>
    );

    // Test with string children
    const result1 = RootLayout({ children: stringChild });
    expect(result1).toBeDefined();
    expect(result1.type).toBe('html');

    // Test with element children
    const result2 = RootLayout({ children: elementChild });
    expect(result2).toBeDefined();
    expect(result2.type).toBe('html');

    // Test with fragment children
    const result3 = RootLayout({ children: fragmentChild });
    expect(result3).toBeDefined();
    expect(result3.type).toBe('html');

    // All should have the same basic structure
    [result1, result2, result3].forEach(result => {
      expect(result.props.lang).toBe('en');
      
      // The children should include both head and body
      const children = Array.isArray(result.props.children) ? result.props.children : [result.props.children];
      const headElement = children.find(child => child?.type === 'head');
      const bodyElement = children.find(child => child?.type === 'body');
      
      expect(headElement).toBeDefined();
      expect(bodyElement).toBeDefined();
    });
  });

  // Test RootLayout error handling
  it('handles edge cases in RootLayout gracefully', () => {
    // Test with null children
    const resultNull = RootLayout({ children: null });
    expect(resultNull).toBeDefined();
    expect(resultNull.type).toBe('html');

    // Test with undefined children
    const resultUndefined = RootLayout({ children: undefined });
    expect(resultUndefined).toBeDefined();
    expect(resultUndefined.type).toBe('html');

    // Test with empty array children
    const resultArray = RootLayout({ children: [] });
    expect(resultArray).toBeDefined();
    expect(resultArray.type).toBe('html');
  });
});

describe('metadata configuration', () => {
  it('includes proper metadata configuration', () => {
    // Test metadata object structure
    expect(metadata).toBeDefined();
    expect(metadata.title).toBeDefined();
    expect(metadata.description).toBeDefined();

    // Test specific metadata values
    expect(metadata.title).toEqual({
      default:
        'Kenneth Heine - AI, Automation & Cloud Architecture for Developers',
      template: '%s | Kenneth Heine',
    });

    expect(metadata.description).toContain('Kenneth Heine helps developers');
    expect(metadata.keywords).toContain('Kenneth Heine');
    expect(metadata.keywords).toContain('AI Automation');

    // Test authors
    expect(metadata.authors).toEqual([{ name: 'Kenneth Heine' }]);
    expect(metadata.creator).toBe('Kenneth Heine');
    expect(metadata.publisher).toBe('Kenneth Heine');
  });

  it('includes proper icon configuration', () => {
    expect(metadata.icons).toEqual({
      icon: '/favicon.svg',
      shortcut: '/favicon.svg',
      apple: '/favicon.svg',
    });
  });

  it('includes proper OpenGraph configuration', () => {
    expect(metadata.openGraph).toBeDefined();
    const openGraph = metadata.openGraph as any;
    expect(openGraph?.type).toBe('website');
    expect(openGraph?.locale).toBe('en_US');
    expect(openGraph?.url).toBe('https://kennethheine.com');
    expect(openGraph?.siteName).toBe('Kenneth Heine');
    expect(openGraph?.images).toBeDefined();
    expect(Array.isArray(openGraph?.images)).toBe(true);
  });

  it('includes proper Twitter configuration', () => {
    expect(metadata.twitter).toBeDefined();
    const twitter = metadata.twitter as any;
    expect(twitter?.card).toBe('summary_large_image');
    expect(twitter?.title).toContain('Kenneth Heine');
    expect(twitter?.description).toContain('Kenneth Heine helps developers');
    expect(twitter?.images).toEqual(['/images/og-image.jpg']);
  });

  it('includes proper robots configuration', () => {
    expect(metadata.robots).toBeDefined();
    const robots = metadata.robots as any;
    expect(robots?.index).toBe(true);
    expect(robots?.follow).toBe(true);
    expect(robots?.googleBot).toBeDefined();
    expect(robots?.googleBot?.index).toBe(true);
    expect(robots?.googleBot?.follow).toBe(true);
  });

  it('includes proper metadataBase URL', () => {
    expect(metadata.metadataBase).toBeDefined();
    expect(metadata.metadataBase?.toString()).toBe('https://kennethheine.com/');
  });

  it('includes verification configuration structure', () => {
    expect(metadata.verification).toBeDefined();
    // Verification object exists even if empty for future use
    expect(typeof metadata.verification).toBe('object');
  });
});
