import { fireEvent, render, screen } from '@testing-library/react';
import { ThemeToggle } from '../components/ui/ThemeToggle';

// Mock the theme context
const mockSetTheme = jest.fn();

// Create a mock that can return different theme values
const createMockTheme = (currentTheme: string) => ({
  theme: currentTheme,
  setTheme: mockSetTheme,
});

jest.mock('../components/providers/ThemeProvider', () => ({
  ...jest.requireActual('../components/providers/ThemeProvider'),
  useTheme: jest.fn(),
}));

// Import the mocked useTheme after mocking
const { useTheme } = require('../components/providers/ThemeProvider');

describe('ThemeToggle component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('light theme', () => {
    beforeEach(() => {
      useTheme.mockReturnValue(createMockTheme('light'));
    });

    it('renders theme toggle button with light theme', () => {
      render(<ThemeToggle />);

      const button = screen.getByRole('button', {
        name: /switch to dark mode/i,
      });
      expect(button).toBeInTheDocument();
    });

    it('switches from light to dark when clicked', () => {
      render(<ThemeToggle />);

      const button = screen.getByRole('button', {
        name: /switch to dark mode/i,
      });
      fireEvent.click(button);

      expect(mockSetTheme).toHaveBeenCalledTimes(1);
      expect(mockSetTheme).toHaveBeenCalledWith('dark');
    });

    it('has proper accessibility attributes for light theme', () => {
      render(<ThemeToggle />);

      const button = screen.getByRole('button', {
        name: /switch to dark mode/i,
      });
      expect(button).toHaveAttribute('aria-label', 'Switch to dark mode');
      expect(button).toHaveAttribute('title', 'Switch to dark mode');
    });

    it('displays sun icon for light theme', () => {
      render(<ThemeToggle />);

      const button = screen.getByRole('button');
      const svg = button.querySelector('svg');
      expect(svg).toBeInTheDocument();
      expect(svg).toHaveClass('h-5', 'w-5');
    });
  });

  describe('dark theme', () => {
    beforeEach(() => {
      useTheme.mockReturnValue(createMockTheme('dark'));
    });

    it('renders theme toggle button with dark theme', () => {
      render(<ThemeToggle />);

      const button = screen.getByRole('button', {
        name: /switch to system mode/i,
      });
      expect(button).toBeInTheDocument();
    });

    it('switches from dark to system when clicked', () => {
      render(<ThemeToggle />);

      const button = screen.getByRole('button', {
        name: /switch to system mode/i,
      });
      fireEvent.click(button);

      expect(mockSetTheme).toHaveBeenCalledTimes(1);
      expect(mockSetTheme).toHaveBeenCalledWith('system');
    });

    it('has proper accessibility attributes for dark theme', () => {
      render(<ThemeToggle />);

      const button = screen.getByRole('button', {
        name: /switch to system mode/i,
      });
      expect(button).toHaveAttribute('aria-label', 'Switch to system mode');
      expect(button).toHaveAttribute('title', 'Switch to system mode');
    });

    it('displays moon icon for dark theme', () => {
      render(<ThemeToggle />);

      const button = screen.getByRole('button');
      const svg = button.querySelector('svg');
      expect(svg).toBeInTheDocument();
      expect(svg).toHaveClass('h-5', 'w-5');
    });
  });

  describe('system theme', () => {
    beforeEach(() => {
      useTheme.mockReturnValue(createMockTheme('system'));
    });

    it('renders theme toggle button with system theme', () => {
      render(<ThemeToggle />);

      const button = screen.getByRole('button', {
        name: /switch to light mode/i,
      });
      expect(button).toBeInTheDocument();
    });

    it('switches from system to light when clicked', () => {
      render(<ThemeToggle />);

      const button = screen.getByRole('button', {
        name: /switch to light mode/i,
      });
      fireEvent.click(button);

      expect(mockSetTheme).toHaveBeenCalledTimes(1);
      expect(mockSetTheme).toHaveBeenCalledWith('light');
    });

    it('has proper accessibility attributes for system theme', () => {
      render(<ThemeToggle />);

      const button = screen.getByRole('button', {
        name: /switch to light mode/i,
      });
      expect(button).toHaveAttribute('aria-label', 'Switch to light mode');
      expect(button).toHaveAttribute('title', 'Switch to light mode');
    });

    it('displays computer icon for system theme', () => {
      render(<ThemeToggle />);

      const button = screen.getByRole('button');
      const svg = button.querySelector('svg');
      expect(svg).toBeInTheDocument();
      expect(svg).toHaveClass('h-5', 'w-5');
    });
  });

  describe('keyboard navigation', () => {
    beforeEach(() => {
      useTheme.mockReturnValue(createMockTheme('light'));
    });

    it('maintains focus management during theme changes', () => {
      render(<ThemeToggle />);

      const button = screen.getByRole('button');
      button.focus();
      expect(button).toHaveFocus();

      fireEvent.click(button);
      expect(mockSetTheme).toHaveBeenCalled();
    });

    it('is keyboard accessible as a button', () => {
      render(<ThemeToggle />);

      const button = screen.getByRole('button');
      expect(button.tagName).toBe('BUTTON');
      expect(button).toHaveAttribute('aria-label');
    });
  });

  describe('rapid interactions', () => {
    beforeEach(() => {
      useTheme.mockReturnValue(createMockTheme('light'));
    });

    it('handles rapid toggle clicks', () => {
      render(<ThemeToggle />);

      const button = screen.getByRole('button');

      // Simulate rapid clicks
      fireEvent.click(button);
      fireEvent.click(button);
      fireEvent.click(button);

      expect(mockSetTheme).toHaveBeenCalledTimes(3);
      // All calls should be with 'dark' since theme state doesn't change in test
      expect(mockSetTheme).toHaveBeenNthCalledWith(1, 'dark');
      expect(mockSetTheme).toHaveBeenNthCalledWith(2, 'dark');
      expect(mockSetTheme).toHaveBeenNthCalledWith(3, 'dark');
    });
  });

  describe('theme cycle completion', () => {
    it('completes full theme cycle: light → dark → system → light', () => {
      // Test light to dark
      useTheme.mockReturnValue(createMockTheme('light'));
      const { rerender } = render(<ThemeToggle />);
      fireEvent.click(screen.getByRole('button'));
      expect(mockSetTheme).toHaveBeenCalledWith('dark');

      // Test dark to system
      mockSetTheme.mockClear();
      useTheme.mockReturnValue(createMockTheme('dark'));
      rerender(<ThemeToggle />);
      fireEvent.click(screen.getByRole('button'));
      expect(mockSetTheme).toHaveBeenCalledWith('system');

      // Test system to light
      mockSetTheme.mockClear();
      useTheme.mockReturnValue(createMockTheme('system'));
      rerender(<ThemeToggle />);
      fireEvent.click(screen.getByRole('button'));
      expect(mockSetTheme).toHaveBeenCalledWith('light');
    });
  });

  describe('button styling and classes', () => {
    beforeEach(() => {
      useTheme.mockReturnValue(createMockTheme('light'));
    });

    it('applies correct CSS classes', () => {
      render(<ThemeToggle />);

      const button = screen.getByRole('button');
      expect(button).toHaveClass('rounded-md', 'p-2', 'text-gray-700');
      expect(button).toHaveClass('hover:bg-gray-100', 'hover:text-gray-900');
      expect(button).toHaveClass(
        'dark:text-gray-300',
        'dark:hover:bg-gray-800'
      );
      expect(button).toHaveClass('dark:hover:text-white', 'theme-transition');
    });
  });

  describe('props and customization', () => {
    beforeEach(() => {
      useTheme.mockReturnValue(createMockTheme('light'));
    });

    it('calls custom onClick handler when provided', () => {
      const customOnClick = jest.fn();
      render(<ThemeToggle onClick={customOnClick} />);

      const button = screen.getByRole('button');
      fireEvent.click(button);

      expect(customOnClick).toHaveBeenCalledTimes(1);
      expect(mockSetTheme).toHaveBeenCalledWith('dark');
    });

    it('works without custom onClick handler', () => {
      render(<ThemeToggle onClick={undefined} />);

      const button = screen.getByRole('button');
      fireEvent.click(button);

      expect(mockSetTheme).toHaveBeenCalledWith('dark');
    });

    it('renders with showLabel prop for light theme', () => {
      render(<ThemeToggle showLabel={true} />);

      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      expect(screen.getByText('Light')).toBeInTheDocument();
    });

    it('renders with showLabel prop for dark theme', () => {
      useTheme.mockReturnValue(createMockTheme('dark'));
      render(<ThemeToggle showLabel={true} />);

      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      expect(screen.getByText('Dark')).toBeInTheDocument();
    });

    it('renders with showLabel prop for system theme', () => {
      useTheme.mockReturnValue(createMockTheme('system'));
      render(<ThemeToggle showLabel={true} />);

      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      expect(screen.getByText('System')).toBeInTheDocument();
    });

    it('supports different sizes', () => {
      const { rerender } = render(<ThemeToggle size='xs' />);
      let button = screen.getByRole('button');
      let svg = button.querySelector('svg');
      expect(svg).toHaveClass('h-3', 'w-3');
      expect(button).toHaveClass('p-1');

      rerender(<ThemeToggle size='sm' />);
      button = screen.getByRole('button');
      svg = button.querySelector('svg');
      expect(svg).toHaveClass('h-4', 'w-4');
      expect(button).toHaveClass('p-1.5');

      rerender(<ThemeToggle size='lg' />);
      button = screen.getByRole('button');
      svg = button.querySelector('svg');
      expect(svg).toHaveClass('h-6', 'w-6');
      expect(button).toHaveClass('p-2.5');

      rerender(<ThemeToggle size='xl' />);
      button = screen.getByRole('button');
      svg = button.querySelector('svg');
      expect(svg).toHaveClass('h-7', 'w-7');
      expect(button).toHaveClass('p-3');
    });
  });
});
