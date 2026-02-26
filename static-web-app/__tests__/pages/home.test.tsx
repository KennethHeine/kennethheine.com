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
    expect(
      screen.getByRole('heading', { level: 1, name: /hi, i'm kenneth heine/i })
    ).toBeInTheDocument();
  });

  it('displays hero section content', () => {
    render(<PageWithProvider />);

    // Updated expectation based on actual page content
    expect(
      screen.getByText(/I help project leaders make technical decisions/i)
    ).toBeInTheDocument();
  });

  it('includes sections for the Predictable Delivery process', () => {
    render(<PageWithProvider />);

    // Updated section names based on actual content
    expect(
      screen.getByRole('heading', { name: /Predictable Delivery/i })
    ).toBeInTheDocument();
  });

  it('displays process steps', () => {
    render(<PageWithProvider />);

    // Look for process step content
    const stepElements = screen.queryAllByText(/Clarity|Control|Delivery/i);
    expect(stepElements.length).toBeGreaterThan(0);
  });

  it('has contact link', () => {
    render(<PageWithProvider />);

    // Updated to match actual link text - get the main CTA button
    const contactLinks = screen.getAllByRole('link', { name: /get in touch/i });
    const mainContactLink = contactLinks.find(
      link =>
        link.getAttribute('aria-describedby') === 'contact-cta-description'
    );
    expect(mainContactLink).toBeInTheDocument();
    expect(mainContactLink).toHaveAttribute('href', '/contact');
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

    // Check for multiple instances of key terms that are on the page
    const projectElements = screen.getAllByText(/project leader/i);
    expect(projectElements.length).toBeGreaterThan(0);

    const technicalElements = screen.getAllByText(/technical/i);
    expect(technicalElements.length).toBeGreaterThan(0);

    const azureElements = screen.getAllByText(/azure/i);
    expect(azureElements.length).toBeGreaterThan(0);
  });

  it('includes professional photo', () => {
    render(<PageWithProvider />);

    const images = screen.getAllByRole('img');
    expect(images.length).toBeGreaterThan(0);
  });

  it('includes CTA or call-to-action elements', () => {
    render(<PageWithProvider />);

    // Look for action-oriented text
    const ctaElements = screen.queryAllByText(
      /How It Works|Get in touch|Start your Predictable Delivery/i
    );
    expect(ctaElements.length).toBeGreaterThan(0);
  });
});
