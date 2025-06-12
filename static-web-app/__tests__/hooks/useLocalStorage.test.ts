/**
 * @fileoverview Tests for useLocalStorage hook
 */

import { act, renderHook } from '@testing-library/react';
import { useLocalStorage } from '../../hooks/useLocalStorage';

// Mock localStorage
const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
});

describe('useLocalStorage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockLocalStorage.getItem.mockReturnValue(null);
  });

  it('initializes with initial value when localStorage is empty', () => {
    const { result } = renderHook(() => 
      useLocalStorage('test-key', 'initial-value')
    );

    expect(result.current[0]).toBe('initial-value');
  });

  it('loads value from localStorage', () => {
    mockLocalStorage.getItem.mockReturnValue('"stored-value"');

    const { result } = renderHook(() => 
      useLocalStorage('test-key', 'initial-value')
    );

    expect(result.current[0]).toBe('stored-value');
  });

  it('sets value and updates localStorage', () => {
    const { result } = renderHook(() => 
      useLocalStorage('test-key', 'initial-value')
    );

    act(() => {
      result.current[1]('new-value');
    });

    expect(result.current[0]).toBe('new-value');
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
      'test-key',
      '"new-value"'
    );
  });

  it('supports function updates', () => {
    const { result } = renderHook(() => 
      useLocalStorage('test-key', 5)
    );

    act(() => {
      result.current[1](prev => prev + 1);
    });

    expect(result.current[0]).toBe(6);
  });

  it('removes value and resets to initial', () => {
    const { result } = renderHook(() => 
      useLocalStorage('test-key', 'initial-value')
    );

    act(() => {
      result.current[1]('new-value');
    });

    act(() => {
      result.current[2](); // removeValue
    });

    expect(result.current[0]).toBe('initial-value');
    expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('test-key');
  });

  it('handles complex objects', () => {
    const initialObject = { name: 'test', count: 0 };
    const newObject = { name: 'updated', count: 5 };

    const { result } = renderHook(() => 
      useLocalStorage('test-object', initialObject)
    );

    act(() => {
      result.current[1](newObject);
    });

    expect(result.current[0]).toEqual(newObject);
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
      'test-object',
      JSON.stringify(newObject)
    );
  });

  it('handles localStorage errors gracefully', () => {
    mockLocalStorage.getItem.mockImplementation(() => {
      throw new Error('localStorage error');
    });

    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

    const { result } = renderHook(() => 
      useLocalStorage('test-key', 'initial-value')
    );

    expect(result.current[0]).toBe('initial-value');
    expect(consoleSpy).toHaveBeenCalled();

    consoleSpy.mockRestore();
  });

  it('uses custom serializer', () => {
    const customSerializer = {
      read: jest.fn((value: string) => `read:${value}`),
      write: jest.fn((value: string) => `write:${value}`),
    };

    mockLocalStorage.getItem.mockReturnValue('stored-value');

    const { result } = renderHook(() => 
      useLocalStorage('test-key', 'initial', { serializer: customSerializer })
    );

    expect(customSerializer.read).toHaveBeenCalledWith('stored-value');

    act(() => {
      result.current[1]('new-value');
    });

    expect(customSerializer.write).toHaveBeenCalledWith('new-value');
  });
  it('validates values when validator is provided', () => {
    const validator = (value: unknown): value is string => 
      typeof value === 'string';

    const { result } = renderHook(() => 
      useLocalStorage('test-key', 'initial', { validator })
    );

    act(() => {
      result.current[1]('valid-string');
    });    expect(result.current[0]).toBe('valid-string');
    // Note: Can't test validator calls since it's not a mock
  });
  it('rejects invalid values when validator is provided', () => {
    const validator = (value: unknown): value is string => 
      typeof value === 'string';

    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

    const { result } = renderHook(() => 
      useLocalStorage('test-key', 'initial', { validator })
    );

    act(() => {
      // Try to set invalid value (number instead of string)
      result.current[1](123 as any);
    });

    expect(result.current[0]).toBe('initial'); // Should remain unchanged
    expect(consoleSpy).toHaveBeenCalled();

    consoleSpy.mockRestore();
  });

  it('handles storage events for cross-tab sync', () => {
    const { result } = renderHook(() => 
      useLocalStorage('test-key', 'initial')
    );

    // Simulate storage event from another tab
    const storageEvent = new StorageEvent('storage', {
      key: 'test-key',
      newValue: '"updated-from-another-tab"',
    });

    act(() => {
      window.dispatchEvent(storageEvent);
    });

    expect(result.current[0]).toBe('updated-from-another-tab');
  });

  it('handles storage event removal', () => {
    const { result } = renderHook(() => 
      useLocalStorage('test-key', 'initial')
    );

    // Set a value first
    act(() => {
      result.current[1]('some-value');
    });

    // Simulate storage removal event from another tab
    const storageEvent = new StorageEvent('storage', {
      key: 'test-key',
      newValue: null,
    });

    act(() => {
      window.dispatchEvent(storageEvent);
    });

    expect(result.current[0]).toBe('initial'); // Should reset to initial
  });

  it('works in SSR environment', () => {
    // Mock window as undefined (SSR environment)
    const originalWindow = global.window;
    delete (global as any).window;

    const { result } = renderHook(() => 
      useLocalStorage('test-key', 'initial-value')
    );

    expect(result.current[0]).toBe('initial-value');

    // Restore window
    global.window = originalWindow;
  });
});
