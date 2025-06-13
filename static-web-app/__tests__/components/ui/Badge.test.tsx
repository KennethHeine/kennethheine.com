// --- file: __tests__/components/ui/Badge.test.tsx ---
import { render, screen } from '@testing-library/react';
import { Badge } from '../../../components/ui/Badge';

describe('Badge', () => {
  it('renders with default props', () => {
    render(<Badge>Default Badge</Badge>);
    const badge = screen.getByText('Default Badge');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('bg-gray-100', 'text-gray-800');
  });

  it('renders different variants', () => {
    const { rerender } = render(<Badge variant='primary'>Primary</Badge>);
    expect(screen.getByText('Primary')).toHaveClass(
      'bg-brand-50',
      'text-brand-700'
    );

    rerender(<Badge variant='secondary'>Secondary</Badge>);
    expect(screen.getByText('Secondary')).toHaveClass(
      'bg-gray-50',
      'text-gray-600'
    );

    rerender(<Badge variant='success'>Success</Badge>);
    expect(screen.getByText('Success')).toHaveClass('bg-success-50');

    rerender(<Badge variant='warning'>Warning</Badge>);
    expect(screen.getByText('Warning')).toHaveClass('bg-warning-50');

    rerender(<Badge variant='error'>Error</Badge>);
    expect(screen.getByText('Error')).toHaveClass('bg-error-50');

    rerender(<Badge variant='outline'>Outline</Badge>);
    expect(screen.getByText('Outline')).toHaveClass(
      'border',
      'border-gray-300'
    );
  });

  it('renders different sizes', () => {
    const { rerender } = render(<Badge size='sm'>Small</Badge>);
    expect(screen.getByText('Small')).toHaveClass('px-2', 'py-0.5', 'text-xs');

    rerender(<Badge size='md'>Medium</Badge>);
    expect(screen.getByText('Medium')).toHaveClass('px-3', 'py-1', 'text-sm');

    rerender(<Badge size='lg'>Large</Badge>);
    expect(screen.getByText('Large')).toHaveClass(
      'px-4',
      'py-1.5',
      'text-base'
    );
  });

  it('renders with icon', () => {
    const icon = <span data-testid='badge-icon'>Icon</span>;
    render(<Badge icon={icon}>With Icon</Badge>);

    expect(screen.getByTestId('badge-icon')).toBeInTheDocument();
    expect(screen.getByText('With Icon')).toBeInTheDocument();
  });

  it('accepts custom className', () => {
    render(<Badge className='custom-class'>Custom</Badge>);
    expect(screen.getByText('Custom')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = jest.fn();
    render(<Badge ref={ref}>Badge</Badge>);
    expect(ref).toHaveBeenCalled();
  });

  it('passes through additional props', () => {
    render(
      <Badge data-testid='badge' title='Badge title'>
        Badge
      </Badge>
    );
    const badge = screen.getByTestId('badge');
    expect(badge).toHaveAttribute('title', 'Badge title');
  });
});
