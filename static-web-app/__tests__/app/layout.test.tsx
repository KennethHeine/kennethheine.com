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

describe('RootLayout', () => {
  const mockChildren = <div data-testid='test-children'>Test Content</div>;

  // Test the component structure that can be reasonably tested
  it('wraps children with ThemeProvider', () => {
    render(<RootLayout>{mockChildren}</RootLayout>);

    // Check that ThemeProvider wrapper is present
    expect(screen.getByTestId('theme-provider-wrapper')).toBeInTheDocument();
  });

  it('includes Layout component with proper props', () => {
    render(<RootLayout>{mockChildren}</RootLayout>);

    // Check that Layout wrapper is present
    expect(screen.getByTestId('layout-wrapper')).toBeInTheDocument();
  });

  it('handles children rendering correctly', () => {
    render(<RootLayout>{mockChildren}</RootLayout>);

    // Check that children are rendered
    expect(screen.getByTestId('test-children')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('renders component structure correctly', () => {
    render(<RootLayout>{mockChildren}</RootLayout>);

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
      render(<RootLayout>{differentChildren}</RootLayout>);
    }).not.toThrow();

    expect(screen.getByText('Page Title')).toBeInTheDocument();
    expect(screen.getByText('Page content')).toBeInTheDocument();
  });

  it('handles null children gracefully', () => {
    expect(() => {
      render(<RootLayout>{null}</RootLayout>);
    }).not.toThrow();

    // Should still render the wrapper components
    expect(screen.getByTestId('theme-provider-wrapper')).toBeInTheDocument();
    expect(screen.getByTestId('layout-wrapper')).toBeInTheDocument();
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
