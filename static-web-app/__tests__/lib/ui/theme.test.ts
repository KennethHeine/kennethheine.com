import { cn, truncate, debounce } from '../../../lib/ui/theme';

describe('UI Theme utilities', () => {
  describe('cn (className utility)', () => {
    it('merges class names correctly', () => {
      expect(cn('class1', 'class2')).toBe('class1 class2');
    });

    it('handles conditional classes', () => {
      expect(cn('base', true && 'conditional', false && 'hidden')).toBe(
        'base conditional'
      );
    });

    it('filters out falsy values', () => {
      expect(cn('base', null, undefined, false, '', 'valid')).toBe(
        'base valid'
      );
    });

    it('handles Tailwind CSS conflicts by using twMerge', () => {
      // twMerge should resolve conflicts in favor of the last class
      expect(cn('p-4', 'p-2')).toBe('p-2');
      expect(cn('text-red-500', 'text-blue-600')).toBe('text-blue-600');
    });

    it('handles arrays of classes', () => {
      expect(cn(['class1', 'class2'], 'class3')).toBe('class1 class2 class3');
    });

    it('handles objects with conditional classes', () => {
      expect(
        cn({
          base: true,
          conditional: false,
          active: true,
        })
      ).toBe('base active');
    });

    it('handles nested conditionals', () => {
      const isActive = true;
      const isDisabled = false;

      expect(
        cn(
          'btn',
          isActive && 'btn-active',
          isDisabled && 'btn-disabled',
          !isDisabled && 'btn-enabled'
        )
      ).toBe('btn btn-active btn-enabled');
    });

    it('handles empty input', () => {
      expect(cn()).toBe('');
    });

    it('handles complex Tailwind class conflicts', () => {
      // Test margin conflicts
      expect(cn('mx-4', 'mx-auto')).toBe('mx-auto');
      // Test padding conflicts
      expect(cn('px-2', 'px-4', 'py-2')).toBe('px-4 py-2');
      // Test background color conflicts
      expect(cn('bg-red-500', 'bg-blue-500')).toBe('bg-blue-500');
    });

    it('preserves non-conflicting classes', () => {
      expect(cn('flex', 'items-center', 'justify-between', 'p-4')).toBe(
        'flex items-center justify-between p-4'
      );
    });
  });

  describe('truncate', () => {
    it('truncates text to specified length', () => {
      const text = 'This is a long text that should be truncated';
      expect(truncate(text, 20)).toBe('This is a long te...');
    });

    it('returns original text if shorter than max length', () => {
      const text = 'Short text';
      expect(truncate(text, 20)).toBe('Short text');
    });

    it('handles empty string', () => {
      expect(truncate('', 10)).toBe('');
    });

    it('uses custom suffix', () => {
      const text = 'This is a long text';
      expect(truncate(text, 10, '***')).toBe('This is***');
    });

    it('handles exact length match', () => {
      const text = 'Exactly 10';
      expect(truncate(text, 10)).toBe('Exactly 10');
    });

    it('handles length equal to suffix length', () => {
      const text = 'Hello World';
      expect(truncate(text, 3, '...')).toBe('...');
    });

    it('handles length shorter than suffix', () => {
      const text = 'Hi';
      expect(truncate(text, 1, '...')).toBe('...');
    });

    it('handles single character text', () => {
      expect(truncate('A', 5)).toBe('A');
      expect(truncate('A', 1)).toBe('A');
    });

    it('preserves whitespace in truncation', () => {
      const text = 'Hello world test';
      expect(truncate(text, 12)).toBe('Hello wor...');
    });

    it('handles Unicode characters', () => {
      const text = 'Hello 世界 test';
      expect(truncate(text, 10)).toBe('Hello 世...');
    });

    it('handles custom suffix of different lengths', () => {
      const text = 'This is a test';
      expect(truncate(text, 10, ' [more]')).toBe('Thi [more]');
      expect(truncate(text, 10, '…')).toBe('This is a…');
    });
  });

  describe('debounce', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('delays function execution', () => {
      const mockFn = jest.fn();
      const debouncedFn = debounce(mockFn, 100);

      debouncedFn();
      expect(mockFn).not.toHaveBeenCalled();

      jest.advanceTimersByTime(100);
      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('cancels previous call when called again', () => {
      const mockFn = jest.fn();
      const debouncedFn = debounce(mockFn, 100);

      debouncedFn();
      jest.advanceTimersByTime(50);
      debouncedFn(); // This should cancel the previous call

      jest.advanceTimersByTime(50);
      expect(mockFn).not.toHaveBeenCalled();

      jest.advanceTimersByTime(50);
      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('passes arguments to the debounced function', () => {
      const mockFn = jest.fn();
      const debouncedFn = debounce(mockFn, 100);

      debouncedFn('arg1', 'arg2', 123);
      jest.advanceTimersByTime(100);

      expect(mockFn).toHaveBeenCalledWith('arg1', 'arg2', 123);
    });

    it('handles multiple rapid calls', () => {
      const mockFn = jest.fn();
      const debouncedFn = debounce(mockFn, 100);

      debouncedFn('call1');
      debouncedFn('call2');
      debouncedFn('call3');

      jest.advanceTimersByTime(100);
      expect(mockFn).toHaveBeenCalledTimes(1);
      expect(mockFn).toHaveBeenCalledWith('call3'); // Should use the last call's arguments
    });

    it('allows function to be called again after completion', () => {
      const mockFn = jest.fn();
      const debouncedFn = debounce(mockFn, 100);

      // First call
      debouncedFn('first');
      jest.advanceTimersByTime(100);
      expect(mockFn).toHaveBeenCalledTimes(1);

      // Second call after completion
      debouncedFn('second');
      jest.advanceTimersByTime(100);
      expect(mockFn).toHaveBeenCalledTimes(2);
      expect(mockFn).toHaveBeenNthCalledWith(2, 'second');
    });

    it('handles zero delay', () => {
      const mockFn = jest.fn();
      const debouncedFn = debounce(mockFn, 0);

      debouncedFn();
      jest.advanceTimersByTime(0);
      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('handles functions with return values', () => {
      const mockFn = jest.fn(() => 'return value');
      const debouncedFn = debounce(mockFn, 100);

      // Note: debounced functions don't return values immediately
      const result = debouncedFn();
      expect(result).toBeUndefined();

      jest.advanceTimersByTime(100);
      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('handles this context correctly', () => {
      const obj = {
        value: 'test',
        method: function (this: { value: string }) {
          return this.value;
        },
      };

      const mockMethod = jest.fn(obj.method);
      obj.method = mockMethod;

      const debouncedMethod = debounce(obj.method.bind(obj), 100);
      debouncedMethod();

      jest.advanceTimersByTime(100);
      expect(mockMethod).toHaveBeenCalledTimes(1);
    });

    it('handles functions that throw errors', () => {
      const mockFn = jest.fn(() => {
        throw new Error('Test error');
      });
      const debouncedFn = debounce(mockFn, 100);

      debouncedFn();

      // The error should be thrown when the timer executes
      expect(() => {
        jest.advanceTimersByTime(100);
      }).toThrow('Test error');
    });

    it('handles different wait times', () => {
      const mockFn1 = jest.fn();
      const mockFn2 = jest.fn();
      const debouncedFn1 = debounce(mockFn1, 50);
      const debouncedFn2 = debounce(mockFn2, 150);

      debouncedFn1();
      debouncedFn2();

      jest.advanceTimersByTime(50);
      expect(mockFn1).toHaveBeenCalledTimes(1);
      expect(mockFn2).not.toHaveBeenCalled();

      jest.advanceTimersByTime(100);
      expect(mockFn2).toHaveBeenCalledTimes(1);
    });
  });
});
