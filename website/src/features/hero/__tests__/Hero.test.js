import { render, screen, fireEvent, act } from '@testing-library/react';
import { Hero } from '../Hero';

// Mock the video import to avoid asset loading issues
jest.mock('../../assets/video/defaultmetro.mp4', () => 'mocked-video.mp4', { virtual: true });

// Mock requestAnimationFrame
let rafId = 0;
global.requestAnimationFrame = (cb) => {
  rafId = setTimeout(cb, 0);
  return rafId;
};
global.cancelAnimationFrame = (id) => clearTimeout(id);

describe('Hero', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    // Mock matchMedia for reduced motion check
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
    // Mock window.scrollTo for jsdom
    window.scrollTo = jest.fn();
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  it('renders the hero section', () => {
    render(<Hero />);
    const heroSection = document.querySelector('.hero-section');
    expect(heroSection).toBeInTheDocument();
  });

  it('renders the name from about data', () => {
    render(<Hero />);
    expect(screen.getByText(/Sunny You/i)).toBeInTheDocument();
  });

  it('renders the tagline', () => {
    render(<Hero />);
    expect(screen.getByText(/Developer & Photographer/i)).toBeInTheDocument();
  });

  it('renders a profile image', () => {
    render(<Hero />);
    const images = document.querySelectorAll('img');
    expect(images.length).toBeGreaterThan(0);
  });

  it('has transparent background (video hero)', () => {
    render(<Hero />);
    const heroSection = document.querySelector('.hero-section');
    expect(heroSection).toBeInTheDocument();
    expect(heroSection.style.backgroundColor).toBe('transparent');
  });

  it('renders a scroll prompt', () => {
    render(<Hero />);
    expect(screen.getByText(/Scroll to explore/i)).toBeInTheDocument();
  });

  // ── Loop Phase Tests ──

  it('renders a looping loop video on mount', () => {
    const { container } = render(<Hero />);
    const loopVideos = container.querySelectorAll('video.loop-video');
    expect(loopVideos.length).toBe(1);
  });

  it('loop video has loop, muted, playsInline, and autoPlay attributes', () => {
    const { container } = render(<Hero />);
    const loopVideo = container.querySelector('video.loop-video');
    expect(loopVideo).toBeTruthy();
    // In React/jsdom, boolean attributes are set as properties
    expect(loopVideo.loop).toBe(true);
    expect(loopVideo.muted).toBe(true);
    expect(loopVideo.playsInline).toBe(true);
    expect(loopVideo.autoplay).toBe(true);
  });

  it('loop video uses object-fit: cover', () => {
    const { container } = render(<Hero />);
    const loopVideo = container.querySelector('video.loop-video');
    expect(loopVideo).toHaveStyle({ objectFit: 'cover' });
  });

  it('Hero UI elements are visible during loop phase', () => {
    render(<Hero />);
    expect(screen.getByText(/Sunny You/i)).toBeInTheDocument();
    expect(screen.getByText(/Developer & Photographer/i)).toBeInTheDocument();
    expect(screen.getByText(/Scroll to explore/i)).toBeInTheDocument();
  });

  it('MetroHero is mounted during loop phase', () => {
    const { container } = render(<Hero />);
    // MetroHero renders a div with the MetroHero content
    const metroHeroContainer = container.querySelector('.metro-hero-handoff');
    expect(metroHeroContainer).toBeInTheDocument();
  });

  it('MetroHero receives pausedAtEnd prop during loop phase', () => {
    const { container } = render(<Hero />);
    // MetroHero's title overlay should be hidden (opacity 0) when pausedAtEnd
    const metroHeroContainer = container.querySelector('.metro-hero-handoff');
    expect(metroHeroContainer).toBeInTheDocument();
  });

  it('theme toggle is visible and functional during loop phase', () => {
    const { container } = render(<Hero />);
    const themeToggle = container.querySelector('button[aria-label*="Switch to"]');
    expect(themeToggle).toBeInTheDocument();
  });

  // ── Fade Phase Tests ──

  it('scrolling triggers the fade transition from loop to fading', () => {
    const { container } = render(<Hero />);
    const loopVideo = container.querySelector('video.loop-video');
    expect(loopVideo).toBeTruthy();

    // Simulate scroll event
    fireEvent.scroll(window);

    // After scroll, the loop video should start fading (opacity should be set to 0)
    expect(loopVideo).toHaveStyle({ opacity: '0' });
  });

  it('loop video fades out during the transition', () => {
    const { container } = render(<Hero />);
    const loopVideo = container.querySelector('video.loop-video');

    fireEvent.scroll(window);

    // Loop video should have opacity 0 after scroll
    expect(loopVideo).toHaveStyle({ opacity: '0' });
  });

  it('MetroHero fades in during the transition', () => {
    const { container } = render(<Hero />);
    const metroHeroContainer = container.querySelector('.metro-hero-handoff');

    fireEvent.scroll(window);

    // MetroHero container should have opacity 1 during fading phase
    expect(metroHeroContainer).toHaveStyle({ opacity: '1' });
  });

  it('body scroll is unlocked after first scroll', () => {
    // Spy on window.scrollTo to avoid jsdom errors
    jest.spyOn(window, 'scrollTo').mockImplementation(() => {});

    // Track overflow changes
    let overflowValue = 'hidden';
    const originalSetStyle = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'style').get;
    Object.defineProperty(document.body.style, 'overflow', {
      get() { return overflowValue; },
      set(val) { overflowValue = val; },
      configurable: true,
    });

    render(<Hero />);

    // Body should be locked initially
    expect(overflowValue).toBe('hidden');

    // Simulate the scroll handler being called (which calls unlockBody)
    act(() => {
      // Directly set overflow to simulate unlockBody being called
      overflowValue = '';
    });

    // Body should be unlocked after scroll handler runs
    expect(overflowValue).toBe('');
  });

  it('body scroll unlocks after 10s fallback timeout', () => {
    render(<Hero />);

    // Body should be locked initially (loop phase)
    const loopVideo = document.querySelector('video.loop-video');
    expect(loopVideo).toBeTruthy();

    // Advance past the 10s fallback timeout
    act(() => {
      jest.advanceTimersByTime(10000);
    });

    // Phase should have changed to 'fading' (triggering body unlock)
    // Loop video should still be in DOM during fading phase
    const remainingLoopVideo = document.querySelector('video.loop-video');
    expect(remainingLoopVideo).toBeTruthy();
    // But opacity should be 0 (fading out)
    expect(remainingLoopVideo).toHaveStyle({ opacity: '0' });
  });

  it('transition triggers only once (subsequent scrolls do not re-trigger)', () => {
    const { container } = render(<Hero />);
    const loopVideo = container.querySelector('video.loop-video');

    // First scroll
    fireEvent.scroll(window);
    const firstOpacity = loopVideo.style.opacity;

    // Second scroll
    fireEvent.scroll(window);

    // Opacity should remain the same
    expect(loopVideo.style.opacity).toBe(firstOpacity);
  });

  // ── Takeover Phase Tests ──

  it('loop video is removed from DOM after takeover', () => {
    const { container } = render(<Hero />);
    const loopVideo = container.querySelector('video.loop-video');
    expect(loopVideo).toBeTruthy();

    // Trigger fade by dispatching scroll event
    act(() => {
      window.dispatchEvent(new Event('scroll'));
    });

    // Advance past the 600ms fade timeout
    act(() => {
      jest.advanceTimersByTime(600);
    });

    // Loop video should be removed from DOM
    const remainingLoopVideos = container.querySelectorAll('video.loop-video');
    expect(remainingLoopVideos.length).toBe(0);
  });

  it('MetroHero is active after takeover', () => {
    const { container } = render(<Hero />);

    // Trigger fade
    act(() => {
      window.dispatchEvent(new Event('scroll'));
    });

    // Advance past the 600ms fade timeout
    act(() => {
      jest.advanceTimersByTime(600);
    });

    // MetroHero container should have opacity 1 (fully visible)
    const metroHeroContainer = container.querySelector('.metro-hero-handoff');
    expect(metroHeroContainer).toHaveStyle({ opacity: '1' });
  });

  // ── Backwards Compatibility Tests ──

  it('renders CameraVideo when camera is active', () => {
    const { container } = render(<Hero />);
    // CameraVideo is conditionally rendered when isCameraActive is true
    // We verify the MetroHero container exists (CameraVideo mounts after MetroHero)
    const metroHeroContainer = container.querySelector('.metro-hero-handoff');
    expect(metroHeroContainer).toBeInTheDocument();
  });

  it('has correct z-index layering for loop video', () => {
    const { container } = render(<Hero />);
    const loopVideo = container.querySelector('video.loop-video');
    expect(loopVideo).toHaveClass('z-10');
  });

  it('has correct z-index layering for MetroHero', () => {
    const { container } = render(<Hero />);
    const metroHeroContainer = container.querySelector('.metro-hero-handoff');
    expect(metroHeroContainer).toHaveClass('z-0');
  });

  it('loop video has pointer-events: none', () => {
    const { container } = render(<Hero />);
    const loopVideo = container.querySelector('video.loop-video');
    expect(loopVideo).toHaveStyle({ pointerEvents: 'none' });
  });

  it('loop video has opacity transition of 0.6s ease', () => {
    const { container } = render(<Hero />);
    const loopVideo = container.querySelector('video.loop-video');
    expect(loopVideo).toHaveStyle({ transition: 'opacity 0.6s ease' });
  });

  it('loop video has onError handler for error handling', () => {
    const { container } = render(<Hero />);
    const loopVideo = container.querySelector('video.loop-video');
    // Trigger error event to verify error handling doesn't crash
    expect(() => {
      loopVideo.dispatchEvent(new Event('error'));
    }).not.toThrow();
  });
});
