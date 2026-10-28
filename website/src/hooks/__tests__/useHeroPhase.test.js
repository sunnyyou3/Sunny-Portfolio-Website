import { renderHook, act } from '@testing-library/react';
import { useHeroPhase } from '../useHeroPhase';

// Mock requestAnimationFrame
global.requestAnimationFrame = (cb) => setTimeout(cb, 0);
global.cancelAnimationFrame = (id) => clearTimeout(id);

describe('useHeroPhase', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    // Mock matchMedia
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
    // Mock window.scrollTo
    window.scrollTo = jest.fn();
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  it('starts in loop phase', () => {
    const { result } = renderHook(() => useHeroPhase());
    expect(result.current.heroPhase).toBe('loop');
  });

  it('transitions to fading phase', () => {
    const { result } = renderHook(() => useHeroPhase());
    act(() => {
      result.current.setHeroPhase('fading');
    });
    expect(result.current.heroPhase).toBe('fading');
  });

  it('transitions to takeover phase', () => {
    const { result } = renderHook(() => useHeroPhase());
    act(() => {
      result.current.setHeroPhase('takeover');
    });
    expect(result.current.heroPhase).toBe('takeover');
  });

  it('sets loopVideoOpacity to 1 during loop phase', () => {
    const { result } = renderHook(() => useHeroPhase());
    expect(result.current.loopVideoOpacity).toBe(1);
  });

  it('sets loopVideoOpacity to 0 during fading phase', () => {
    const { result } = renderHook(() => useHeroPhase());
    act(() => {
      result.current.setHeroPhase('fading');
    });
    expect(result.current.loopVideoOpacity).toBe(0);
  });

  it('sets loopVideoOpacity to 0 during takeover phase', () => {
    const { result } = renderHook(() => useHeroPhase());
    act(() => {
      result.current.setHeroPhase('takeover');
    });
    expect(result.current.loopVideoOpacity).toBe(0);
  });

  it('sets metroHeroOpacity to 0 during loop phase', () => {
    const { result } = renderHook(() => useHeroPhase());
    expect(result.current.metroHeroOpacity).toBe(0);
  });

  it('sets metroHeroOpacity to 1 during fading phase', () => {
    const { result } = renderHook(() => useHeroPhase());
    act(() => {
      result.current.setHeroPhase('fading');
    });
    expect(result.current.metroHeroOpacity).toBe(1);
  });

  it('sets metroHeroOpacity to 1 during takeover phase', () => {
    const { result } = renderHook(() => useHeroPhase());
    act(() => {
      result.current.setHeroPhase('takeover');
    });
    expect(result.current.metroHeroOpacity).toBe(1);
  });

  it('provides lockBody function', () => {
    const { result } = renderHook(() => useHeroPhase());
    expect(typeof result.current.lockBody).toBe('function');
  });

  it('provides unlockBody function', () => {
    const { result } = renderHook(() => useHeroPhase());
    expect(typeof result.current.unlockBody).toBe('function');
  });

  it('provides loopVideoBg fallback color when error', () => {
    const { result } = renderHook(() => useHeroPhase());
    expect(result.current.loopVideoBg).toBe('transparent');
    act(() => {
      result.current.setLoopVideoError(true);
    });
    expect(result.current.loopVideoBg).toBe('#0a0a0a');
  });

  it('uses custom fallback timeout', () => {
    const { result } = renderHook(() => useHeroPhase({ fallbackTimeout: 5000 }));
    // Advance past the custom timeout
    act(() => {
      jest.advanceTimersByTime(5000);
    });
    // Phase should have changed to 'fading'
    expect(result.current.heroPhase).toBe('fading');
  });

  it('uses custom fade duration', () => {
    const { result } = renderHook(() => useHeroPhase({ fadeDuration: 300 }));
    act(() => {
      result.current.setHeroPhase('fading');
    });
    // Advance past the custom fade duration
    act(() => {
      jest.advanceTimersByTime(300);
    });
    // Phase should have changed to 'takeover'
    expect(result.current.heroPhase).toBe('takeover');
  });
});
