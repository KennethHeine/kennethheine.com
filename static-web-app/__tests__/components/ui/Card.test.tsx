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
    expect(card).toHaveClass('cursor-pointer', 'transition-transform');
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
  });
});
