import { render, screen } from '@testing-library/react';
import ContactPage from '../../app/contact/page';
import { ThemeProvider } from '../../components/providers/ThemeProvider';

const PageWithProvider = () => (
  <ThemeProvider>
    <ContactPage />
  </ThemeProvider>
);

describe('Contact Page', () => {
  it('renders contact page title', () => {
    render(<PageWithProvider />);

    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(screen.getByText(/Let's Connect/i)).toBeInTheDocument();
  });

  it('displays contact information', () => {
    render(<PageWithProvider />);
    // Check for email link
    const emailLink = screen.getByRole('link', {
      name: /kenneth@kscloud\.io/i,
    });
    expect(emailLink).toBeInTheDocument();
    expect(emailLink).toHaveAttribute('href', 'mailto:kenneth@kscloud.io');
  });

  it('includes mail icon', () => {
    render(<PageWithProvider />);

    // Check for mail icon presence (it should be in the DOM)
    const mailIcon = screen.getByRole('main').querySelector('svg');
    expect(mailIcon).toBeInTheDocument();
  });

  it('has proper page structure', () => {
    const { container } = render(<PageWithProvider />);

    const main = container.querySelector('main');
    expect(main).toBeInTheDocument();

    const sections = container.querySelectorAll('section');
    expect(sections.length).toBeGreaterThan(0);
  });

  it('displays response time information', () => {
    render(<PageWithProvider />);

    expect(screen.getByText(/within 24 hours/i)).toBeInTheDocument();
  });

  it('includes professional background context', () => {
    render(<PageWithProvider />);

    expect(screen.getAllByText(/AI automation/i)).toHaveLength(2);
    expect(screen.getByText(/DevOps/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Azure/i)).toHaveLength(2);
  });

  it('has responsive design classes', () => {
    const { container } = render(<PageWithProvider />);

    // Check for responsive classes
    const responsiveElements = container.querySelectorAll(
      '[class*="sm:"], [class*="lg:"]'
    );
    expect(responsiveElements.length).toBeGreaterThan(0);
  });

  it('applies consistent branding', () => {
    const { container } = render(<PageWithProvider />);

    // Check for brand color classes
    const brandElements = container.querySelectorAll('[class*="brand-"]');
    expect(brandElements.length).toBeGreaterThan(0);
  });

  it('includes accessibility features', () => {
    render(<PageWithProvider />);

    // Check for proper heading hierarchy
    const h1 = screen.getByRole('heading', { level: 1 });
    expect(h1).toBeInTheDocument();

    // Check for semantic structure
    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();
  });

  it('provides clear call to action', () => {
    render(<PageWithProvider />);
    // The email link should be the primary CTA
    const emailLink = screen.getByRole('link', {
      name: /kenneth@kscloud\.io/i,
    });
    expect(emailLink).toBeInTheDocument();
    expect(emailLink).toHaveAttribute('href', 'mailto:kenneth@kscloud.io');
  });
});
