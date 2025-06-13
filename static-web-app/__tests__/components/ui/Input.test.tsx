// --- file: __tests__/components/ui/Input.test.tsx ---
import { render, screen, fireEvent } from '@testing-library/react';
import { Input, Label } from '../../../components/ui/Input';

describe('Input', () => {
  it('renders with default props', () => {
    render(<Input placeholder='Enter text' />);
    const input = screen.getByPlaceholderText('Enter text');
    expect(input).toBeInTheDocument();
    expect(input).toHaveClass('block', 'w-full', 'rounded-lg', 'border');
  });

  it('renders different variants', () => {
    const { rerender } = render(<Input variant='error' />);
    expect(screen.getByRole('textbox')).toHaveClass('border-error-500');

    rerender(<Input variant='success' />);
    expect(screen.getByRole('textbox')).toHaveClass('border-success-500');
  });

  it('renders different sizes', () => {
    const { rerender } = render(<Input size='sm' />);
    expect(screen.getByRole('textbox')).toHaveClass(
      'px-3',
      'py-1.5',
      'text-sm'
    );

    rerender(<Input size='md' />);
    expect(screen.getByRole('textbox')).toHaveClass(
      'px-4',
      'py-2',
      'text-base'
    );

    rerender(<Input size='lg' />);
    expect(screen.getByRole('textbox')).toHaveClass('px-4', 'py-3', 'text-lg');
  });

  it('renders with label', () => {
    render(<Input label='Email' />);
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  it('renders with required label', () => {
    render(<Input label='Email' required />);
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('renders with helper text', () => {
    render(<Input helperText='Enter a valid email address' />);
    expect(screen.getByText('Enter a valid email address')).toBeInTheDocument();
  });

  it('renders with error message', () => {
    render(<Input error='This field is required' />);
    const errorMessage = screen.getByText('This field is required');
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveClass('text-error-500');
    expect(errorMessage).toHaveAttribute('role', 'alert');

    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveClass('border-error-500');
  });

  it('prioritizes error message over helper text', () => {
    render(<Input helperText='Helper text' error='Error message' />);
    expect(screen.getByText('Error message')).toBeInTheDocument();
    expect(screen.queryByText('Helper text')).not.toBeInTheDocument();
  });

  it('renders with start icon', () => {
    const icon = <span data-testid='start-icon'>Icon</span>;
    render(<Input startIcon={icon} />);

    expect(screen.getByTestId('start-icon')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveClass('pl-10');
  });

  it('renders with end icon', () => {
    const icon = <span data-testid='end-icon'>Icon</span>;
    render(<Input endIcon={icon} />);

    expect(screen.getByTestId('end-icon')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveClass('pr-10');
  });

  it('handles input changes', () => {
    const handleChange = jest.fn();
    render(<Input onChange={handleChange} />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test value' } });

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(input).toHaveValue('test value');
  });

  it('accepts custom className', () => {
    render(<Input className='custom-class' />);
    expect(screen.getByRole('textbox')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = jest.fn();
    render(<Input ref={ref} />);
    expect(ref).toHaveBeenCalled();
  });

  it('passes through additional props', () => {
    render(<Input data-testid='input' title='Input title' type='email' />);
    const input = screen.getByTestId('input');
    expect(input).toHaveAttribute('title', 'Input title');
    expect(input).toHaveAttribute('type', 'email');
  });
});

describe('Label', () => {
  it('renders with default props', () => {
    render(<Label>Label text</Label>);
    const label = screen.getByText('Label text');
    expect(label).toBeInTheDocument();
    expect(label).toHaveClass('block', 'text-sm', 'font-medium');
  });

  it('renders with required indicator', () => {
    render(<Label required>Required label</Label>);
    expect(screen.getByText('Required label')).toBeInTheDocument();
    expect(screen.getByText('*')).toBeInTheDocument();
    expect(screen.getByText('*')).toHaveClass('text-error-500');
  });

  it('accepts custom className', () => {
    render(<Label className='custom-class'>Label</Label>);
    expect(screen.getByText('Label')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = jest.fn();
    render(<Label ref={ref}>Label</Label>);
    expect(ref).toHaveBeenCalled();
  });
});
