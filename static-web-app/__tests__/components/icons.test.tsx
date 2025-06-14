import { render } from '@testing-library/react';
import { ArrowLeftIcon } from '../../components/icons/ArrowLeftIcon';
import { ArrowRightIcon } from '../../components/icons/ArrowRightIcon';
import { MailIcon } from '../../components/icons/MailIcon';
import { CheckIcon } from '../../components/icons/CheckIcon';
import { CopyIcon } from '../../components/icons/CopyIcon';

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

  describe('CheckIcon', () => {
    it('renders check icon with default props', () => {
      const { container } = render(<CheckIcon />);

      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
      expect(svg).toHaveAttribute('fill', 'none');
      expect(svg).toHaveAttribute('viewBox', '0 0 24 24');
      expect(svg).toHaveAttribute('aria-hidden', 'true');
    });

    it('applies custom className', () => {
      const { container } = render(<CheckIcon className='custom-class' />);

      const svg = container.querySelector('svg');
      expect(svg).toHaveClass('custom-class');
    });

    it('applies default size classes', () => {
      const { container } = render(<CheckIcon />);

      const svg = container.querySelector('svg');
      expect(svg).toHaveClass('h-5', 'w-5');
    });

    it('passes through additional props', () => {
      const { container } = render(<CheckIcon data-testid='check-icon' />);

      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('data-testid', 'check-icon');
    });

    it('renders check mark path', () => {
      const { container } = render(<CheckIcon />);

      const path = container.querySelector('path');
      expect(path).toBeInTheDocument();
      expect(path).toHaveAttribute('d', 'M5 13l4 4L19 7');
    });
  });

  describe('CopyIcon', () => {
    it('renders copy icon with default props', () => {
      const { container } = render(<CopyIcon />);

      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
      expect(svg).toHaveAttribute('fill', 'none');
      expect(svg).toHaveAttribute('viewBox', '0 0 24 24');
      expect(svg).toHaveAttribute('aria-hidden', 'true');
    });

    it('applies custom className', () => {
      const { container } = render(<CopyIcon className='custom-class' />);

      const svg = container.querySelector('svg');
      expect(svg).toHaveClass('custom-class');
    });

    it('applies default size classes', () => {
      const { container } = render(<CopyIcon />);

      const svg = container.querySelector('svg');
      expect(svg).toHaveClass('h-5', 'w-5');
    });

    it('passes through additional props', () => {
      const { container } = render(<CopyIcon data-testid='copy-icon' />);

      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('data-testid', 'copy-icon');
    });

    it('renders copy clipboard path', () => {
      const { container } = render(<CopyIcon />);

      const path = container.querySelector('path');
      expect(path).toBeInTheDocument();
      expect(path).toHaveAttribute(
        'd',
        'M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z'
      );
    });
  });
});
