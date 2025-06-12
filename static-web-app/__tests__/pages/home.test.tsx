import { render, screen } from '@testing-library/react';
import Page from '../../app/page';
import { ThemeProvider } from '../../components/providers/ThemeProvider';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

const PageWithProvider = () => (
  <ThemeProvider>
    <Page />
  </ThemeProvider>
);

describe('Home Page', () => {
  it('renders main heading', () => {
    render(<PageWithProvider />);

    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(screen.getByText(/Kenneth Heine/i)).toBeInTheDocument();
  });

  it('displays hero section content', () => {
    render(<PageWithProvider />);

    // Updated expectation based on actual page content
    expect(
      screen.getByText(/AI, Automation & Cloud Architecture for Developers/i)
    ).toBeInTheDocument();
  });

  it('includes sections for skills and activities', () => {
    render(<PageWithProvider />);

    // Updated section names based on actual content
    expect(screen.getByText(/Work Smarter, Not Harder/i)).toBeInTheDocument();
    expect(screen.getByText(/What I'm Up To/i)).toBeInTheDocument();
  });

  it('displays timeline component', () => {
    render(<PageWithProvider />);

    // Look for timeline or experience content
    const timelineElements = screen.queryAllByText(/202\d|Cloud|Azure|DevOps/i);
    expect(timelineElements.length).toBeGreaterThan(0);
  });

  it('has contact link', () => {
    render(<PageWithProvider />);

    // Updated to match actual link text
    const contactLink = screen.getByRole('link', { name: /get in touch/i });
    expect(contactLink).toBeInTheDocument();
    expect(contactLink).toHaveAttribute('href', '/contact');
  });

  it('applies responsive design classes', () => {
    const { container } = render(<PageWithProvider />);

    // Check for responsive container classes
    const responsiveElements = container.querySelectorAll(
      '.max-w-7xl, .mx-auto'
    );
    expect(responsiveElements.length).toBeGreaterThan(0);
  });

  it('has proper SEO structure', () => {
    render(<PageWithProvider />);

    // Check for multiple instances of key terms
    const automationElements = screen.getAllByText(/automation/i);
    expect(automationElements.length).toBeGreaterThan(0);

    const azureElements = screen.getAllByText(/Azure/i);
    expect(azureElements.length).toBeGreaterThan(0);

    const cloudElements = screen.getAllByText(/cloud/i);
    expect(cloudElements.length).toBeGreaterThan(0);

    const developerElements = screen.getAllByText(/developer/i);
    expect(developerElements.length).toBeGreaterThan(0);
  });

  it('includes professional photo', () => {
    render(<PageWithProvider />);

    const images = screen.getAllByRole('img');
    expect(images.length).toBeGreaterThan(0);
  });
  it('displays years of experience stats', () => {
    render(<PageWithProvider />);

    // Look for experience stats (5+ Years Cloud & DevOps)
    const experienceElements = screen.queryAllByText(/5\+|Years Cloud/i);
    expect(experienceElements.length).toBeGreaterThan(0);
  });
  it('includes CTA or call-to-action elements', () => {
    render(<PageWithProvider />);

    // Look for action-oriented text
    const ctaElements = screen.queryAllByText(
      /Learn More About Me|Read My Blog|Get in touch|View all posts/i
    );
    expect(ctaElements.length).toBeGreaterThan(0);
  });
});
