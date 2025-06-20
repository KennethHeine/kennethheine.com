// --- file: __tests__/components/ui/Card.test.tsx ---
import { render, screen, fireEvent } from '@testing-library/react';
import { Card } from '../../../components/ui/Card';

describe('Card', () => {
  it('renders with default props', () => {
    render(<Card>Card content</Card>);
    const card = screen.getByText('Card content');
    expect(card).toBeInTheDocument();
    expect(card).toHaveClass('card');
  });

  it('renders different variants', () => {
    const { rerender } = render(<Card variant='elevated'>Elevated</Card>);
    expect(screen.getByText('Elevated')).toHaveClass('shadow-lg');

    rerender(<Card variant='outlined'>Outlined</Card>);
    expect(screen.getByText('Outlined')).toHaveClass('border-2', 'shadow-none');

    rerender(<Card variant='subtle'>Subtle</Card>);
    expect(screen.getByText('Subtle')).toHaveClass('bg-gray-50', 'shadow-sm');
  });

  it('renders different sizes', () => {
    const { rerender } = render(<Card size='sm'>Small</Card>);
    expect(screen.getByText('Small')).toHaveClass('p-4');

    rerender(<Card size='md'>Medium</Card>);
    expect(screen.getByText('Medium')).toHaveClass('p-6');

    rerender(<Card size='lg'>Large</Card>);
    expect(screen.getByText('Large')).toHaveClass('p-8');
  });

  it('renders with hoverable effect', () => {
    render(<Card hoverable>Hoverable card</Card>);
    expect(screen.getByText('Hoverable card')).toHaveClass(
      'hover:shadow-lg',
      'hover:-translate-y-1'
    );
  });

  it('renders as clickable with proper accessibility', () => {
    const handleClick = jest.fn();
    render(
      <Card clickable onClick={handleClick}>
        Clickable card
      </Card>
    );

    const card = screen.getByText('Clickable card');
    expect(card).toHaveClass('cursor-pointer');
    expect(card).toHaveAttribute('role', 'button');
    expect(card).toHaveAttribute('tabIndex', '0');

    fireEvent.click(card);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('accepts custom className', () => {
    render(<Card className='custom-class'>Custom</Card>);
    expect(screen.getByText('Custom')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = jest.fn();
    render(<Card ref={ref}>Card</Card>);
    expect(ref).toHaveBeenCalled();
  });

  describe('Compound components', () => {
    it('renders Card.Header correctly', () => {
      render(
        <Card>
          <Card.Header>Header content</Card.Header>
        </Card>
      );

      const header = screen.getByText('Header content');
      expect(header).toBeInTheDocument();
      expect(header).toHaveClass('mb-4', 'border-b', 'border-gray-200', 'pb-3');
    });

    it('renders Card.Body correctly', () => {
      render(
        <Card>
          <Card.Body>Body content</Card.Body>
        </Card>
      );

      const body = screen.getByText('Body content');
      expect(body).toBeInTheDocument();
      expect(body).toHaveClass('flex-1');
    });

    it('renders Card.Footer correctly', () => {
      render(
        <Card>
          <Card.Footer>Footer content</Card.Footer>
        </Card>
      );

      const footer = screen.getByText('Footer content');
      expect(footer).toBeInTheDocument();
      expect(footer).toHaveClass('mt-4', 'pt-3', 'border-t', 'border-gray-200');
    });

    it('renders complete card structure', () => {
      render(
        <Card>
          <Card.Header>Header</Card.Header>
          <Card.Body>Body</Card.Body>
          <Card.Footer>Footer</Card.Footer>
        </Card>
      );

      expect(screen.getByText('Header')).toBeInTheDocument();
      expect(screen.getByText('Body')).toBeInTheDocument();
      expect(screen.getByText('Footer')).toBeInTheDocument();
    });

    it('compound components forward ref correctly', () => {
      const headerRef = jest.fn();
      const bodyRef = jest.fn();
      const footerRef = jest.fn();

      render(
        <Card>
          <Card.Header ref={headerRef}>Header</Card.Header>
          <Card.Body ref={bodyRef}>Body</Card.Body>
          <Card.Footer ref={footerRef}>Footer</Card.Footer>
        </Card>
      );

      expect(headerRef).toHaveBeenCalled();
      expect(bodyRef).toHaveBeenCalled();
      expect(footerRef).toHaveBeenCalled();
    });

    it('compound components accept custom className', () => {
      render(
        <Card>
          <Card.Header className='custom-header'>Header</Card.Header>
          <Card.Body className='custom-body'>Body</Card.Body>
          <Card.Footer className='custom-footer'>Footer</Card.Footer>
        </Card>
      );

      expect(screen.getByText('Header')).toHaveClass('custom-header');
      expect(screen.getByText('Body')).toHaveClass('custom-body');
      expect(screen.getByText('Footer')).toHaveClass('custom-footer');
    });

    it('compound components forward other props', () => {
      render(
        <Card>
          <Card.Header data-testid='header-test' title='Header title'>
            Header
          </Card.Header>
          <Card.Body data-testid='body-test' title='Body title'>
            Body
          </Card.Body>
          <Card.Footer data-testid='footer-test' title='Footer title'>
            Footer
          </Card.Footer>
        </Card>
      );

      expect(screen.getByTestId('header-test')).toHaveAttribute(
        'title',
        'Header title'
      );
      expect(screen.getByTestId('body-test')).toHaveAttribute(
        'title',
        'Body title'
      );
      expect(screen.getByTestId('footer-test')).toHaveAttribute(
        'title',
        'Footer title'
      );
    });
  });

  describe('Component displayName', () => {
    it('has correct displayName for all components', () => {
      expect(Card.displayName).toBe('Card');
      expect(Card.Header.displayName).toBe('CardHeader');
      expect(Card.Body.displayName).toBe('CardBody');
      expect(Card.Footer.displayName).toBe('CardFooter');
    });
  });
});
