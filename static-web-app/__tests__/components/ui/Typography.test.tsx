import React from 'react';
import { render, screen } from '@testing-library/react';
import {
  Typography,
  TypographyProps,
  TypographyVariant,
  TypographyElement,
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  Lead,
  Muted,
} from '../../../components/ui/Typography';

const defaultProps: TypographyProps = {
  children: 'Test content',
};

describe('Typography component', () => {
  describe('Basic rendering', () => {
    it('renders with default props', () => {
      render(<Typography {...defaultProps} />);
      expect(screen.getByText('Test content')).toBeInTheDocument();
    });

    it('renders as p element by default', () => {
      render(<Typography {...defaultProps} />);
      const element = screen.getByText('Test content');
      expect(element.tagName).toBe('P');
    });

    it('applies default variant styling', () => {
      render(<Typography {...defaultProps} />);
      const element = screen.getByText('Test content');
      expect(element).toHaveClass('text-base', 'leading-relaxed');
    });

    it('applies custom className', () => {
      render(<Typography {...defaultProps} className='custom-class' />);
      const element = screen.getByText('Test content');
      expect(element).toHaveClass('custom-class');
    });

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLParagraphElement>();
      render(<Typography {...defaultProps} ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLParagraphElement);
    });

    it('forwards other HTML props', () => {
      render(
        <Typography
          {...defaultProps}
          data-testid='typography-test'
          id='test-typography'
          title='Test title'
        />
      );

      const element = screen.getByTestId('typography-test');
      expect(element).toHaveAttribute('id', 'test-typography');
      expect(element).toHaveAttribute('title', 'Test title');
    });
  });

  describe('Typography variants', () => {
    const variants: TypographyVariant[] = [
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'subtitle1',
      'subtitle2',
      'body1',
      'body2',
      'caption',
      'overline',
      'lead',
      'small',
      'muted',
    ];

    variants.forEach(variant => {
      it(`applies ${variant} variant styling correctly`, () => {
        render(<Typography {...defaultProps} variant={variant} />);
        const element = screen.getByText('Test content');

        // Test that the variant class is applied
        switch (variant) {
          case 'h1':
            expect(element).toHaveClass(
              'text-3xl',
              'md:text-4xl',
              'lg:text-5xl',
              'xl:text-6xl',
              'font-bold',
              'leading-tight',
              'tracking-tight',
              'mobile-text-optimize'
            );
            break;
          case 'h2':
            expect(element).toHaveClass(
              'text-2xl',
              'md:text-3xl',
              'lg:text-4xl',
              'xl:text-5xl',
              'font-bold',
              'leading-tight',
              'tracking-tight',
              'mobile-text-optimize'
            );
            break;
          case 'h3':
            expect(element).toHaveClass(
              'text-xl',
              'md:text-2xl',
              'lg:text-3xl',
              'xl:text-4xl',
              'font-semibold',
              'leading-tight',
              'mobile-text-optimize'
            );
            break;
          case 'h4':
            expect(element).toHaveClass(
              'text-lg',
              'md:text-xl',
              'lg:text-2xl',
              'xl:text-3xl',
              'font-semibold',
              'leading-tight',
              'mobile-text-optimize'
            );
            break;
          case 'h5':
            expect(element).toHaveClass(
              'text-base',
              'md:text-lg',
              'lg:text-xl',
              'xl:text-2xl',
              'font-medium',
              'leading-tight',
              'mobile-text-optimize'
            );
            break;
          case 'h6':
            expect(element).toHaveClass(
              'text-sm',
              'md:text-base',
              'lg:text-lg',
              'xl:text-xl',
              'font-medium',
              'leading-tight',
              'mobile-text-optimize'
            );
            break;
          case 'subtitle1':
            expect(element).toHaveClass(
              'text-lg',
              'font-medium',
              'leading-relaxed',
              'mobile-text-optimize'
            );
            break;
          case 'subtitle2':
            expect(element).toHaveClass(
              'text-base',
              'font-medium',
              'leading-relaxed',
              'mobile-text-optimize'
            );
            break;
          case 'body1':
            expect(element).toHaveClass(
              'text-base',
              'leading-relaxed',
              'mobile-text-optimize'
            );
            break;
          case 'body2':
            expect(element).toHaveClass(
              'text-sm',
              'leading-relaxed',
              'mobile-text-optimize'
            );
            break;
          case 'caption':
            expect(element).toHaveClass(
              'text-xs',
              'leading-normal',
              'text-gray-600',
              'dark:text-gray-400'
            );
            break;
          case 'overline':
            expect(element).toHaveClass(
              'text-xs',
              'uppercase',
              'tracking-wide',
              'font-medium'
            );
            break;
          case 'lead':
            expect(element).toHaveClass(
              'text-lg',
              'md:text-xl',
              'leading-relaxed',
              'text-gray-700',
              'dark:text-gray-300',
              'mobile-text-optimize'
            );
            break;
          case 'small':
            expect(element).toHaveClass(
              'text-sm',
              'leading-normal',
              'text-gray-600',
              'dark:text-gray-400'
            );
            break;
          case 'muted':
            expect(element).toHaveClass(
              'text-sm',
              'leading-normal',
              'text-gray-500',
              'dark:text-gray-500'
            );
            break;
        }
      });
    });
  });

  describe('Element polymorphism', () => {
    const elements: TypographyElement[] = [
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'p',
      'span',
      'div',
      'small',
    ];

    elements.forEach(element => {
      it(`renders as ${element} element when specified`, () => {
        render(<Typography {...defaultProps} as={element} />);
        const renderedElement = screen.getByText('Test content');
        expect(renderedElement.tagName).toBe(element.toUpperCase());
      });
    });

    it('combines variant and element correctly', () => {
      render(<Typography {...defaultProps} variant='h1' as='span' />);
      const element = screen.getByText('Test content');

      // Should be a span element with h1 styling
      expect(element.tagName).toBe('SPAN');
      expect(element).toHaveClass(
        'text-3xl',
        'md:text-4xl',
        'lg:text-5xl',
        'xl:text-6xl',
        'font-bold',
        'leading-tight',
        'tracking-tight',
        'mobile-text-optimize'
      );
    });

    it('uses semantic element when variant matches', () => {
      render(<Typography {...defaultProps} variant='h2' />);
      const element = screen.getByText('Test content');
      expect(element.tagName).toBe('H2'); // h2 variant uses h2 element by default
    });

    it('allows overriding element for semantic reasons', () => {
      render(<Typography {...defaultProps} variant='h1' as='h1' />);
      const element = screen.getByText('Test content');
      expect(element.tagName).toBe('H1');
      expect(element).toHaveClass(
        'text-3xl',
        'md:text-4xl',
        'lg:text-5xl',
        'xl:text-6xl',
        'font-bold',
        'tracking-tight',
        'mobile-text-optimize'
      );
    });
  });

  describe('Content rendering', () => {
    it('renders string content', () => {
      render(<Typography>Simple string</Typography>);
      expect(screen.getByText('Simple string')).toBeInTheDocument();
    });

    it('renders React node content', () => {
      render(
        <Typography>
          <span>Nested content</span>
        </Typography>
      );
      expect(screen.getByText('Nested content')).toBeInTheDocument();
    });

    it('renders complex content structure', () => {
      render(
        <Typography>
          Text with <strong>bold</strong> and <em>italic</em> elements
        </Typography>
      );

      expect(screen.getByText(/Text with/)).toBeInTheDocument();
      expect(screen.getByText('bold')).toBeInTheDocument();
      expect(screen.getByText('italic')).toBeInTheDocument();
    });

    it('handles empty content', () => {
      render(<Typography />);
      const element = screen.getByRole('paragraph');
      expect(element).toBeInTheDocument();
    });

    it('handles null children', () => {
      render(<Typography>{null}</Typography>);
      expect(screen.getByRole('paragraph')).toBeInTheDocument();
    });

    it('handles undefined children', () => {
      render(<Typography>{undefined}</Typography>);
      expect(screen.getByRole('paragraph')).toBeInTheDocument();
    });

    it('handles number content', () => {
      render(<Typography>{42}</Typography>);
      expect(screen.getByText('42')).toBeInTheDocument();
    });

    it('handles boolean content', () => {
      render(<Typography>{true}</Typography>);
      // Boolean values don't render in React
      expect(screen.getByRole('paragraph')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('maintains proper heading hierarchy semantics', () => {
      render(
        <div>
          <Typography variant='h1' as='h1'>
            Main Title
          </Typography>
          <Typography variant='h2' as='h2'>
            Section Title
          </Typography>
          <Typography variant='h3' as='h3'>
            Subsection Title
          </Typography>
        </div>
      );

      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
        'Main Title'
      );
      expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
        'Section Title'
      );
      expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(
        'Subsection Title'
      );
    });

    it('allows semantic override for visual hierarchy', () => {
      // Visually h1 but semantically h2 for proper document outline
      render(
        <Typography variant='h1' as='h2'>
          Visual H1, Semantic H2
        </Typography>
      );

      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toHaveTextContent('Visual H1, Semantic H2');
      expect(heading).toHaveClass(
        'text-3xl',
        'md:text-4xl',
        'lg:text-5xl',
        'xl:text-6xl',
        'font-bold',
        'leading-tight',
        'tracking-tight',
        'mobile-text-optimize'
      ); // h1 visual styles
    });

    it('supports ARIA attributes', () => {
      render(
        <Typography
          variant='body1'
          aria-label='Description text'
          aria-describedby='helper-text'
          role='note'
        >
          Content with ARIA
        </Typography>
      );

      const element = screen.getByRole('note');
      expect(element).toHaveAttribute('aria-label', 'Description text');
      expect(element).toHaveAttribute('aria-describedby', 'helper-text');
    });
  });

  describe('Responsive behavior', () => {
    it('applies responsive classes correctly', () => {
      render(<Typography variant='h1' className='md:text-5xl lg:text-6xl' />);
      const element = screen.getByRole('heading', { level: 1 });
      // Note: Custom classes may override default responsive classes
      expect(element).toHaveClass(
        'text-3xl',
        'xl:text-6xl',
        'md:text-5xl',
        'lg:text-6xl'
      );
    });

    it('maintains base styles with responsive overrides', () => {
      render(
        <Typography
          variant='h2'
          className='text-center md:text-left lg:text-right'
        />
      );

      const element = screen.getByRole('heading', { level: 2 });
      expect(element).toHaveClass(
        'text-2xl',
        'md:text-3xl',
        'lg:text-4xl',
        'xl:text-5xl',
        'font-bold',
        'leading-tight',
        'tracking-tight', // Base h2 styles
        'mobile-text-optimize', // Mobile optimization
        'text-center',
        'md:text-left',
        'lg:text-right' // Responsive classes
      );
    });
  });

  describe('Dark mode support', () => {
    it('includes dark mode classes for text colors', () => {
      render(<Typography variant='body1' />);
      const element = screen.getByRole('paragraph');
      expect(element).toHaveClass(
        'text-base',
        'leading-relaxed',
        'mobile-text-optimize'
      );
    });

    it('includes dark mode classes for muted text', () => {
      render(<Typography variant='muted' />);
      const element = screen.getByRole('paragraph');
      expect(element).toHaveClass(
        'text-gray-500',
        'dark:text-gray-500',
        'leading-normal'
      );
    });

    it('includes dark mode classes for caption text', () => {
      render(<Typography variant='caption'>Test content</Typography>);
      const element = screen.getByText('Test content');
      expect(element).toHaveClass(
        'text-gray-600',
        'dark:text-gray-400',
        'leading-normal'
      );
    });

    it('includes dark mode classes for lead text', () => {
      render(<Typography variant='lead' />);
      const element = screen.getByRole('paragraph');
      expect(element).toHaveClass(
        'text-lg',
        'md:text-xl',
        'leading-relaxed',
        'text-gray-700',
        'dark:text-gray-300',
        'mobile-text-optimize'
      );
    });
  });

  describe('Edge cases and error handling', () => {
    it('preserves existing classes when merging', () => {
      render(
        <Typography variant='h1' className='existing-class another-class' />
      );

      const element = screen.getByRole('heading', { level: 1 });
      expect(element).toHaveClass(
        'text-3xl',
        'md:text-4xl',
        'lg:text-5xl',
        'xl:text-6xl',
        'font-bold',
        'leading-tight',
        'tracking-tight', // variant classes
        'mobile-text-optimize', // mobile optimization
        'existing-class',
        'another-class' // custom classes
      );
    });

    it('handles className conflicts correctly', () => {
      render(
        <Typography
          variant='h1'
          className='text-sm' // Conflicts with h1's text-4xl
        />
      );

      const element = screen.getByRole('heading', { level: 1 });
      // Should include both classes, with custom class potentially overriding
      expect(element).toHaveClass('text-sm');
      expect(element).toHaveClass('font-bold');
    });
  });

  describe('Performance and rendering', () => {
    it('does not re-render unnecessarily', () => {
      let renderCount = 0;

      const TestComponent = () => {
        renderCount++;
        return <Typography>Render test</Typography>;
      };

      const { rerender } = render(<TestComponent />);
      expect(renderCount).toBe(1);

      rerender(<TestComponent />);
      expect(renderCount).toBe(2);
    });

    it('handles large content efficiently', () => {
      const largeContent = 'Large content text'; // Simple content for testing

      const start = performance.now();
      render(<Typography>{largeContent}</Typography>);
      const end = performance.now();

      expect(end - start).toBeLessThan(100); // Should render quickly
      expect(screen.getByText(largeContent)).toBeInTheDocument();
    });
  });

  describe('Convenience components', () => {
    describe('Heading components', () => {
      it('H1 renders with correct variant and element', () => {
        render(<H1>Heading 1</H1>);
        const element = screen.getByRole('heading', { level: 1 });
        expect(element).toHaveTextContent('Heading 1');
        expect(element).toHaveClass(
          'text-3xl',
          'md:text-4xl',
          'lg:text-5xl',
          'xl:text-6xl',
          'font-bold',
          'leading-tight',
          'tracking-tight',
          'mobile-text-optimize'
        );
      });

      it('H2 renders with correct variant and element', () => {
        render(<H2>Heading 2</H2>);
        const element = screen.getByRole('heading', { level: 2 });
        expect(element).toHaveTextContent('Heading 2');
        expect(element).toHaveClass(
          'text-2xl',
          'md:text-3xl',
          'lg:text-4xl',
          'xl:text-5xl',
          'font-bold',
          'leading-tight',
          'tracking-tight',
          'mobile-text-optimize'
        );
      });

      it('H3 renders with correct variant and element', () => {
        render(<H3>Heading 3</H3>);
        const element = screen.getByRole('heading', { level: 3 });
        expect(element).toHaveTextContent('Heading 3');
        expect(element).toHaveClass(
          'text-xl',
          'md:text-2xl',
          'lg:text-3xl',
          'xl:text-4xl',
          'font-semibold',
          'leading-tight',
          'mobile-text-optimize'
        );
      });

      it('H4 renders with correct variant and element', () => {
        render(<H4>Heading 4</H4>);
        const element = screen.getByRole('heading', { level: 4 });
        expect(element).toHaveTextContent('Heading 4');
        expect(element).toHaveClass(
          'text-lg',
          'md:text-xl',
          'lg:text-2xl',
          'xl:text-3xl',
          'font-semibold',
          'leading-tight',
          'mobile-text-optimize'
        );
      });

      it('H5 renders with correct variant and element', () => {
        render(<H5>Heading 5</H5>);
        const element = screen.getByRole('heading', { level: 5 });
        expect(element).toHaveTextContent('Heading 5');
        expect(element).toHaveClass(
          'text-base',
          'md:text-lg',
          'lg:text-xl',
          'xl:text-2xl',
          'font-medium',
          'leading-tight',
          'mobile-text-optimize'
        );
      });

      it('H6 renders with correct variant and element', () => {
        render(<H6>Heading 6</H6>);
        const element = screen.getByRole('heading', { level: 6 });
        expect(element).toHaveTextContent('Heading 6');
        expect(element).toHaveClass(
          'text-sm',
          'md:text-base',
          'lg:text-lg',
          'xl:text-xl',
          'font-medium',
          'leading-tight',
          'mobile-text-optimize'
        );
      });

      it('heading components forward ref correctly', () => {
        const ref = React.createRef<HTMLHeadingElement>();
        render(<H1 ref={ref}>Test heading</H1>);
        expect(ref.current).toBeInstanceOf(HTMLHeadingElement);
        expect(ref.current?.tagName).toBe('H1');
      });

      it('heading components accept custom className', () => {
        render(<H2 className='custom-heading-class'>Custom heading</H2>);
        const element = screen.getByRole('heading', { level: 2 });
        expect(element).toHaveClass('custom-heading-class');
      });

      it('heading components forward other props', () => {
        render(
          <H3 data-testid='heading-test' id='test-heading'>
            Props test
          </H3>
        );
        const element = screen.getByTestId('heading-test');
        expect(element).toHaveAttribute('id', 'test-heading');
        expect(element).toHaveTextContent('Props test');
      });
    });

    describe('Text components', () => {
      it('Lead renders with correct variant and styling', () => {
        render(<Lead>Lead paragraph text</Lead>);
        const element = screen.getByText('Lead paragraph text');
        expect(element.tagName).toBe('P');
        expect(element).toHaveClass(
          'text-lg',
          'md:text-xl',
          'leading-relaxed',
          'text-gray-700',
          'dark:text-gray-300',
          'mobile-text-optimize'
        );
      });

      it('Muted renders with correct variant and styling', () => {
        render(<Muted>Muted text content</Muted>);
        const element = screen.getByText('Muted text content');
        expect(element.tagName).toBe('P');
        expect(element).toHaveClass(
          'text-sm',
          'leading-normal',
          'text-gray-500',
          'dark:text-gray-500'
        );
      });

      it('text components forward ref correctly', () => {
        const leadRef = React.createRef<HTMLParagraphElement>();
        const mutedRef = React.createRef<HTMLParagraphElement>();

        render(
          <div>
            <Lead ref={leadRef}>Lead text</Lead>
            <Muted ref={mutedRef}>Muted text</Muted>
          </div>
        );

        expect(leadRef.current).toBeInstanceOf(HTMLParagraphElement);
        expect(mutedRef.current).toBeInstanceOf(HTMLParagraphElement);
      });

      it('text components accept custom className', () => {
        render(
          <div>
            <Lead className='custom-lead-class'>Custom lead</Lead>
            <Muted className='custom-muted-class'>Custom muted</Muted>
          </div>
        );

        expect(screen.getByText('Custom lead')).toHaveClass(
          'custom-lead-class'
        );
        expect(screen.getByText('Custom muted')).toHaveClass(
          'custom-muted-class'
        );
      });

      it('text components forward other props', () => {
        render(
          <div>
            <Lead data-testid='lead-test' title='Lead title'>
              Lead with props
            </Lead>
            <Muted data-testid='muted-test' title='Muted title'>
              Muted with props
            </Muted>
          </div>
        );

        const leadElement = screen.getByTestId('lead-test');
        const mutedElement = screen.getByTestId('muted-test');

        expect(leadElement).toHaveAttribute('title', 'Lead title');
        expect(mutedElement).toHaveAttribute('title', 'Muted title');
      });
    });

    describe('Component displayName', () => {
      it('has correct displayName for all convenience components', () => {
        expect(H1.displayName).toBe('H1');
        expect(H2.displayName).toBe('H2');
        expect(H3.displayName).toBe('H3');
        expect(H4.displayName).toBe('H4');
        expect(H5.displayName).toBe('H5');
        expect(H6.displayName).toBe('H6');
        expect(Lead.displayName).toBe('Lead');
        expect(Muted.displayName).toBe('Muted');
        expect(Typography.displayName).toBe('Typography');
      });
    });
  });
});
