import { render } from '@testing-library/react';
import { ArrowLeftIcon } from '../../components/icons/ArrowLeftIcon';
import { ArrowRightIcon } from '../../components/icons/ArrowRightIcon';
import { MailIcon } from '../../components/icons/MailIcon';

describe('Icon components', () => {
  describe('ArrowLeftIcon', () => {
    it('renders arrow left icon with default props', () => {
      const { container } = render(<ArrowLeftIcon />);

      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
      expect(svg).toHaveAttribute('fill', 'none');
      expect(svg).toHaveAttribute('viewBox', '0 0 24 24');
    });

    it('applies custom className', () => {
      const { container } = render(<ArrowLeftIcon className='custom-class' />);

      const svg = container.querySelector('svg');
      expect(svg).toHaveClass('custom-class');
    });

    it('applies default size classes', () => {
      const { container } = render(<ArrowLeftIcon />);

      const svg = container.querySelector('svg');
      expect(svg).toHaveClass('w-4', 'h-4');
    });

    it('passes through additional props', () => {
      const { container } = render(<ArrowLeftIcon data-testid='arrow-left' />);

      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('data-testid', 'arrow-left');
    });
  });

  describe('ArrowRightIcon', () => {
    it('renders arrow right icon with default props', () => {
      const { container } = render(<ArrowRightIcon />);

      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
      expect(svg).toHaveAttribute('fill', 'none');
      expect(svg).toHaveAttribute('viewBox', '0 0 24 24');
    });

    it('applies custom className', () => {
      const { container } = render(<ArrowRightIcon className='custom-class' />);

      const svg = container.querySelector('svg');
      expect(svg).toHaveClass('custom-class');
    });

    it('applies default size classes', () => {
      const { container } = render(<ArrowRightIcon />);

      const svg = container.querySelector('svg');
      expect(svg).toHaveClass('w-4', 'h-4');
    });

    it('passes through additional props', () => {
      const { container } = render(
        <ArrowRightIcon data-testid='arrow-right' />
      );

      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('data-testid', 'arrow-right');
    });
  });

  describe('MailIcon', () => {
    it('renders mail icon with default props', () => {
      const { container } = render(<MailIcon />);

      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
      expect(svg).toHaveAttribute('fill', 'none');
      expect(svg).toHaveAttribute('viewBox', '0 0 24 24');
    });

    it('applies custom className', () => {
      const { container } = render(<MailIcon className='custom-class' />);

      const svg = container.querySelector('svg');
      expect(svg).toHaveClass('custom-class');
    });

    it('applies default size classes', () => {
      const { container } = render(<MailIcon />);

      const svg = container.querySelector('svg');
      expect(svg).toHaveClass('w-5', 'h-5');
    });

    it('passes through additional props', () => {
      const { container } = render(<MailIcon data-testid='mail-icon' />);

      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('data-testid', 'mail-icon');
    });

    it('icons can be hidden from screen readers', () => {
      const { container } = render(<MailIcon aria-hidden='true' />);

      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('aria-hidden', 'true');
    });
  });
});
