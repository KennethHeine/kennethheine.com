import { render, screen } from '@testing-library/react';
import Page from '../../app/about/page';
import { ThemeProvider } from '../../components/providers/ThemeProvider';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: () => '/about',
}));

const PageWithProvider = () => (
  <ThemeProvider>
    <Page />
  </ThemeProvider>
);

describe('About Page', () => {
  it('renders main heading', () => {
    render(<PageWithProvider />);

    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(screen.getByText('About Me')).toBeInTheDocument();
  });
  it('renders personal introduction', () => {
    render(<PageWithProvider />);

    // Look for personal introduction content
    expect(screen.getByText(/I'm Kenneth/i)).toBeInTheDocument();
  });

  it('displays professional background', () => {
    render(<PageWithProvider />);

    // Check for professional background content
    const professionalElements = screen.getAllByText(
      /developer|engineer|architect/i
    );
    expect(professionalElements.length).toBeGreaterThan(0);

    const azureElements = screen.getAllByText(/Azure|cloud/i);
    expect(azureElements.length).toBeGreaterThan(0);
  });

  it('describes his approach to work', () => {
    render(<PageWithProvider />);

    // Keep the section explaining the approach to the work
    expect(
      screen.getByRole('heading', { name: 'How I work' })
    ).toBeInTheDocument();
  });
  it('displays expertise areas', () => {
    render(<PageWithProvider />);

    // Check for expertise areas
    const expertiseElements = screen.getAllByText(
      /AI|automation|infrastructure/i
    );
    expect(expertiseElements.length).toBeGreaterThan(0);
  });

  it('includes personal interests', () => {
    render(<PageWithProvider />);

    // Keep the personal interests section
    expect(
      screen.getByRole('heading', { name: 'Away from work' })
    ).toBeInTheDocument();
  });

  it('displays professional photo', () => {
    render(<PageWithProvider />);

    // Look for about photo
    const aboutImage = screen.getByAltText(/Kenneth Heine|about|profile/i);
    expect(aboutImage).toBeInTheDocument();
    expect(aboutImage).toHaveAttribute('src', expect.stringContaining('about'));
  });

  it('has proper page structure for SEO', () => {
    render(<PageWithProvider />);

    // Check for proper heading hierarchy
    const h1 = screen.getByRole('heading', { level: 1 });
    expect(h1).toBeInTheDocument();

    // Check for descriptive content
    const experienceElements = screen.getAllByText(
      /experience|background|journey/i
    );
    expect(experienceElements.length).toBeGreaterThan(0);
  });

  it('applies responsive design classes', () => {
    const { container } = render(<PageWithProvider />);

    // Check that the content has responsive classes
    const responsiveElements = container.querySelectorAll(
      '.max-w-7xl, .mx-auto, .max-w-4xl'
    );
    expect(responsiveElements.length).toBeGreaterThan(0);
  });

  it('includes timeline or career history', () => {
    render(<PageWithProvider />);

    // Look for timeline or career history elements
    const careerElements = screen.getAllByText(
      /experience|career|timeline|history/i
    );
    expect(careerElements.length).toBeGreaterThan(0);
  });
});
