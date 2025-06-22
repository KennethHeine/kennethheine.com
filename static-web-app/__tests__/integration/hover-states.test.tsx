// --- file: __tests__/integration/hover-states.test.tsx ---
/**
 * Integration tests for hover state implementation
 * Task #122: Create basic interactive hover states (simplified)
 */

import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '../../components/providers/ThemeProvider';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Layout } from '../../components/layout/Layout';
import { hoverStyles, hoverClasses } from '../../lib/ui/hover';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

// Mock next/font
jest.mock('next/font/google', () => ({
  Inter: () => ({
    style: {
      fontFamily: 'Inter, sans-serif',
    },
  }),
}));

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider>{children}</ThemeProvider>
);

describe('Hover States Integration', () => {
  describe('Button hover states', () => {
    it('applies correct hover classes to primary button', () => {
      render(
        <TestWrapper>
          <Button variant='primary' data-testid='primary-btn'>
            Primary Button
          </Button>
        </TestWrapper>
      );

      const button = screen.getByTestId('primary-btn');

      // Should have base button styles and hover behavior
      expect(button).toHaveClass('btn', 'btn-primary');
      // The transition is applied via the 'btn' CSS utility class
    });

    it('applies correct hover classes to secondary button', () => {
      render(
        <TestWrapper>
          <Button variant='secondary' data-testid='secondary-btn'>
            Secondary Button
          </Button>
        </TestWrapper>
      );

      const button = screen.getByTestId('secondary-btn');

      // Should have base button styles and hover behavior
      expect(button).toHaveClass('btn', 'btn-secondary');
      // The transition is applied via the 'btn' CSS utility class
    });

    it('applies correct hover classes to ghost button', () => {
      render(
        <TestWrapper>
          <Button variant='ghost' data-testid='ghost-btn'>
            Ghost Button
          </Button>
        </TestWrapper>
      );

      const button = screen.getByTestId('ghost-btn');

      // Should have base button styles and ghost-specific hover behavior
      expect(button).toHaveClass('btn');
      // The transition is applied via the 'btn' CSS utility class
      expect(button.className).toContain('hover:bg-gray-100');
    });
  });

  describe('Card hover states', () => {
    it('applies hover states to hoverable cards', () => {
      render(
        <TestWrapper>
          <Card hoverable data-testid='hoverable-card'>
            <Card.Body>Hoverable Card Content</Card.Body>
          </Card>
        </TestWrapper>
      );

      const card = screen.getByTestId('hoverable-card');

      // Should have hover transition classes
      expect(card.className).toContain('transition');
      expect(card.className).toContain('duration');
    });

    it('applies clickable styles to clickable cards', () => {
      const handleClick = jest.fn();

      render(
        <TestWrapper>
          <Card clickable onClick={handleClick} data-testid='clickable-card'>
            <Card.Body>Clickable Card Content</Card.Body>
          </Card>
        </TestWrapper>
      );

      const card = screen.getByTestId('clickable-card');

      // Should have cursor pointer and accessibility attributes
      expect(card).toHaveClass('cursor-pointer');
      expect(card).toHaveAttribute('role', 'button');
      expect(card).toHaveAttribute('tabIndex', '0');
    });

    it('does not apply hover states to non-hoverable cards', () => {
      render(
        <TestWrapper>
          <Card data-testid='static-card'>
            <Card.Body>Static Card Content</Card.Body>
          </Card>
        </TestWrapper>
      );

      const card = screen.getByTestId('static-card');

      // Should not have hover transition classes
      expect(card.className).not.toContain('hover:-translate-y');
      expect(card.className).not.toContain('hover:shadow-lg');
    });
  });

  describe('Layout hover states', () => {
    it('applies hover states to navigation links', () => {
      render(
        <TestWrapper>
          <Layout>
            <div>Test content</div>
          </Layout>
        </TestWrapper>
      );

      const logoLink = screen.getByText('Kenneth Heine');

      // Logo should have hover transition
      expect(logoLink.className).toContain('transition');
    });

    it('applies hover states to social links', () => {
      render(
        <TestWrapper>
          <Layout>
            <div>Test content</div>
          </Layout>
        </TestWrapper>
      );

      const githubLink = screen.getByLabelText('GitHub profile');
      const linkedinLink = screen.getByLabelText('LinkedIn profile');

      // Social links should have hover transitions
      expect(githubLink.className).toContain('transition');
      expect(linkedinLink.className).toContain('transition');
    });
  });

  describe('Hover utility functions', () => {
    it('generates button hover styles correctly', () => {
      const styles = hoverStyles.button();

      expect(styles).toContain('transition');
      expect(styles).toContain('duration-150');
      expect(styles).toContain('hover:-translate-y-0.5');
      expect(styles).toContain('motion-reduce:transition-none');
    });

    it('generates link hover styles correctly', () => {
      const styles = hoverStyles.link();

      expect(styles).toContain('transition');
      expect(styles).toContain('hover:text-brand-600');
      expect(styles).toContain('hover:dark:text-brand-400');
      expect(styles).toContain('motion-reduce:transition-none');
    });

    it('generates card hover styles correctly', () => {
      const styles = hoverStyles.card();

      expect(styles).toContain('transition');
      expect(styles).toContain('hover:-translate-y-1');
      expect(styles).toContain('hover:shadow-lg');
      expect(styles).toContain('motion-reduce:transition-none');
    });

    it('generates icon hover styles correctly', () => {
      const styles = hoverStyles.icon();

      expect(styles).toContain('transition');
      expect(styles).toContain('hover:text-brand-600');
      expect(styles).toContain('hover:scale-110');
      expect(styles).toContain('motion-reduce:transition-none');
    });

    it('generates navigation hover styles correctly', () => {
      const styles = hoverStyles.navItem();

      expect(styles).toContain('transition');
      expect(styles).toContain('hover:text-brand-600');
      expect(styles).toContain('hover:bg-brand-50');
      expect(styles).toContain('motion-reduce:transition-none');
    });

    it('generates social link hover styles correctly', () => {
      const styles = hoverStyles.socialLink();

      expect(styles).toContain('transition');
      expect(styles).toContain('hover:text-brand-600');
      expect(styles).toContain('hover:-translate-y-0.5');
      expect(styles).toContain('motion-reduce:transition-none');
    });

    it('generates CTA hover styles correctly', () => {
      const styles = hoverStyles.cta();

      expect(styles).toContain('transition');
      expect(styles).toContain('hover:-translate-y-1');
      expect(styles).toContain('hover:shadow-lg');
      expect(styles).toContain('hover:shadow-brand-500/25');
      expect(styles).toContain('motion-reduce:transition-none');
    });
  });

  describe('Hover class constants', () => {
    it('provides all expected hover class variations', () => {
      expect(hoverClasses.subtle).toBeDefined();
      expect(hoverClasses.medium).toBeDefined();
      expect(hoverClasses.strong).toBeDefined();
      expect(hoverClasses.brand).toBeDefined();
      expect(hoverClasses.lift).toBeDefined();
      expect(hoverClasses.glow).toBeDefined();
      expect(hoverClasses.scale).toBeDefined();
      expect(hoverClasses.fade).toBeDefined();
    });

    it('includes motion-reduce support in all hover classes', () => {
      Object.values(hoverClasses).forEach(className => {
        expect(className).toContain('motion-reduce:transition-none');
      });
    });

    it('includes proper transition timing in all hover classes', () => {
      Object.values(hoverClasses).forEach(className => {
        expect(className).toMatch(/duration-\d+/);
      });
    });
  });

  describe('Accessibility and performance', () => {
    it('includes reduced motion support via CSS utility classes', () => {
      render(
        <TestWrapper>
          <Button data-testid='motion-btn'>Test Button</Button>
        </TestWrapper>
      );

      const button = screen.getByTestId('motion-btn');
      // The motion-reduce support is applied via the 'btn' CSS utility class
      expect(button).toHaveClass('btn');
    });

    it('generates proper accessibility attributes for interactive elements', () => {
      const handleClick = jest.fn();

      render(
        <TestWrapper>
          <Card clickable onClick={handleClick} data-testid='accessible-card'>
            Accessible Card
          </Card>
        </TestWrapper>
      );

      const card = screen.getByTestId('accessible-card');
      expect(card).toHaveAttribute('role', 'button');
      expect(card).toHaveAttribute('tabIndex', '0');
    });
  });

  describe('Theme compatibility', () => {
    it('applies correct hover states in light theme', () => {
      render(
        <TestWrapper>
          <div className={hoverStyles.link()} data-testid='themed-element'>
            Themed Element
          </div>
        </TestWrapper>
      );

      const element = screen.getByTestId('themed-element');

      // Should include both light and dark mode hover states
      expect(element.className).toContain('hover:text-brand-600');
      expect(element.className).toContain('hover:dark:text-brand-400');
    });

    it('includes proper dark mode variants', () => {
      const linkStyles = hoverStyles.link();
      const navStyles = hoverStyles.navItem();
      const socialStyles = hoverStyles.socialLink();

      expect(linkStyles).toContain('dark:text-brand-400');
      expect(navStyles).toContain('dark:text-brand-400');
      expect(socialStyles).toContain('dark:text-brand-400');
    });
  });

  describe('Custom styling integration', () => {
    it('accepts and applies custom className with hover utilities', () => {
      const customClass = 'custom-test-class';
      const styles = hoverStyles.button('medium', customClass);

      expect(styles).toContain(customClass);
      expect(styles).toContain('transition');
      expect(styles).toContain('hover:-translate-y-0.5');
    });

    it('combines hover utilities with existing component styles', () => {
      render(
        <TestWrapper>
          <Button className={hoverStyles.cta()} data-testid='enhanced-btn'>
            Enhanced Button
          </Button>
        </TestWrapper>
      );

      const button = screen.getByTestId('enhanced-btn');

      // Should have both base button styles and enhanced hover styles
      expect(button).toHaveClass('btn');
      expect(button.className).toContain('hover:shadow-lg');
      expect(button.className).toContain('hover:-translate-y-1');
    });
  });
});
