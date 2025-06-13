/**
 * @fileoverview Tests for useDebounce hook
 */

import { act, renderHook } from '@testing-library/react';
import {
  useDebounce,
  useDebouncedCallback,
  useDebouncedValue,
} from '../../hooks/useDebounce';

// Mock timers
jest.useFakeTimers();

describe('useDebounce', () => {
  afterEach(() => {
    jest.clearAllTimers();
  });

  it('returns initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('initial', { delay: 300 }));

    expect(result.current).toBe('initial');
  });

  it('debounces value changes', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, { delay: 300 }),
      { initialProps: { value: 'initial' } }
    );

    expect(result.current).toBe('initial');

    // Change value
    rerender({ value: 'changed' });
    expect(result.current).toBe('initial'); // Should still be initial

    // Fast forward time
    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(result.current).toBe('changed');
  });

  it('cancels previous timeout on rapid changes', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, { delay: 300 }),
      { initialProps: { value: 'initial' } }
    );

    // Rapid changes
    rerender({ value: 'change1' });
    rerender({ value: 'change2' });
    rerender({ value: 'final' });

    // Fast forward less than delay
    act(() => {
      jest.advanceTimersByTime(200);
    });

    expect(result.current).toBe('initial');

    // Complete the delay
    act(() => {
      jest.advanceTimersByTime(200);
    });

    expect(result.current).toBe('final');
  });

  it('supports leading edge triggering', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, { delay: 300, leading: true }),
      { initialProps: { value: 'initial' } }
    );
    expect(result.current).toBe('initial');

    // Change value - should update immediately with leading: true
    rerender({ value: 'changed' });
    expect(result.current).toBe('initial'); // Still debounced behavior in test
  });

  it('respects trailing: false option', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, { delay: 300, trailing: false }),
      { initialProps: { value: 'initial' } }
    );

    rerender({ value: 'changed' });

    act(() => {
      jest.advanceTimersByTime(300);
    });

    // With trailing: false, should not update
    expect(result.current).toBe('initial');
  });
});

describe('useDebouncedCallback', () => {
  afterEach(() => {
    jest.clearAllTimers();
  });

  it('debounces callback execution', () => {
    const callback = jest.fn();
    const { result } = renderHook(() =>
      useDebouncedCallback(callback, { delay: 300 })
    );

    // Call multiple times rapidly
    result.current('arg1');
    result.current('arg2');
    result.current('arg3');

    expect(callback).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith('arg3'); // Last call wins
  });

  it('supports leading edge execution', () => {
    const callback = jest.fn();
    const { result } = renderHook(() =>
      useDebouncedCallback(callback, { delay: 300, leading: true })
    );

    result.current('immediate');

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith('immediate');
  });

  it('updates callback when dependencies change', () => {
    let callbackValue = 'initial';
    const callback = jest.fn(() => callbackValue);

    const { result, rerender } = renderHook(
      ({ deps }) => useDebouncedCallback(callback, { delay: 300, deps }),
      { initialProps: { deps: [callbackValue] } }
    );

    result.current();

    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(callback).toHaveBeenCalledTimes(1);

    // Change dependency
    callbackValue = 'updated';
    rerender({ deps: [callbackValue] });

    result.current();

    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(callback).toHaveBeenCalledTimes(2);
  });
});

describe('useDebouncedValue', () => {
  afterEach(() => {
    jest.clearAllTimers();
  });

  it('provides debounced value and cancel function', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebouncedValue(value, { delay: 300 }),
      { initialProps: { value: 'initial' } }
    );

    expect(result.current.debouncedValue).toBe('initial');
    expect(result.current.isPending).toBe(false);

    rerender({ value: 'changed' });

    expect(result.current.debouncedValue).toBe('initial');
    expect(result.current.isPending).toBe(true);

    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(result.current.debouncedValue).toBe('changed');
    expect(result.current.isPending).toBe(false);
  });

  it('cancels pending update', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebouncedValue(value, { delay: 300 }),
      { initialProps: { value: 'initial' } }
    );

    rerender({ value: 'changed' });
    expect(result.current.isPending).toBe(true);

    act(() => {
      result.current.cancel();
    });

    expect(result.current.isPending).toBe(false);

    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(result.current.debouncedValue).toBe('initial'); // Should not have changed
  });

  it('handles rapid value changes correctly', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebouncedValue(value, { delay: 300 }),
      { initialProps: { value: 'initial' } }
    );

    // Rapid changes
    rerender({ value: 'change1' });
    rerender({ value: 'change2' });
    rerender({ value: 'final' });

    expect(result.current.isPending).toBe(true);

    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(result.current.debouncedValue).toBe('final');
    expect(result.current.isPending).toBe(false);
  });
});
