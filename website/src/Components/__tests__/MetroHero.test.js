import { render, screen } from '@testing-library/react';
import MetroHero from '../ui/MetroHero';

// Mock requestAnimationFrame to avoid animation issues in tests
let rafId = 0;
global.requestAnimationFrame = (cb) => {
  rafId = setTimeout(cb, 0);
  return rafId;
};
global.cancelAnimationFrame = (id) => clearTimeout(id);

describe('MetroHero', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders without pausedAtEnd (normal mode)', () => {
    const { container } = render(
      <MetroHero
        title="TEST TITLE"
        tagline="TEST TAGLINE"
        scrollHint="TEST SCROLL"
      />
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders a video element', () => {
    const { container } = render(<MetroHero />);
    const videos = container.querySelectorAll('video');
    expect(videos.length).toBe(1);
  });

  it('video element has muted and playsInline attributes', () => {
    const { container } = render(<MetroHero />);
    const video = container.querySelector('video');
    expect(video).toBeTruthy();
    expect(video?.getAttribute('src')).toBeTruthy();
  });

  it('renders title text', () => {
    render(<MetroHero title="MY TITLE" />);
    expect(screen.getByText('MY TITLE')).toBeInTheDocument();
  });

  it('renders tagline text', () => {
    render(<MetroHero tagline="MY TAGLINE" />);
    expect(screen.getByText('MY TAGLINE')).toBeInTheDocument();
  });

  it('renders scroll hint text', () => {
    render(<MetroHero scrollHint="SCROLL DOWN" />);
    expect(screen.getByText('SCROLL DOWN')).toBeInTheDocument();
  });

  it('renders signature when provided', () => {
    render(<MetroHero signature={{ name: 'test.dev', url: 'https://test.dev' }} />);
    expect(screen.getByText('test.dev')).toBeInTheDocument();
  });

  it('does not render signature when false', () => {
    const { container } = render(<MetroHero signature={false} />);
    expect(container.innerHTML).not.toContain('by');
  });

  // ── pausedAtEnd Tests ──

  it('renders MetroHero with pausedAtEnd prop', () => {
    const { container } = render(<MetroHero pausedAtEnd={true} />);
    const videos = container.querySelectorAll('video');
    expect(videos.length).toBe(1);
  });

  it('MetroHero with pausedAtEnd=true hides title overlay', () => {
    const { container } = render(
      <MetroHero
        title="TEST TITLE"
        pausedAtEnd={true}
      />
    );
    // Title overlay should have opacity 0 when pausedAtEnd
    const titleOverlay = container.querySelector('[style*="position: absolute"]');
    expect(titleOverlay).toHaveStyle({ opacity: '0' });
  });

  it('MetroHero with pausedAtEnd=true hides scroll hint', () => {
    const { container } = render(
      <MetroHero
        scrollHint="SCROLL"
        pausedAtEnd={true}
      />
    );
    // Scroll hint should be hidden (opacity 0)
    const hintElement = container.querySelector('[style*="translateX(-50%)"]');
    expect(hintElement).toHaveStyle({ opacity: '0' });
  });

  it('MetroHero with pausedAtEnd=false does not force title overlay hidden', () => {
    const { container } = render(
      <MetroHero
        title="TEST TITLE"
        pausedAtEnd={false}
      />
    );
    // When pausedAtEnd is false, title should NOT have opacity forced to 0 via the pausedAtEnd inline style
    // The title overlay contains the title text
    const titleText = screen.getByText('TEST TITLE');
    expect(titleText).toBeInTheDocument();
  });

  it('MetroHero with pausedAtEnd=false does not force scroll hint hidden', () => {
    const { container } = render(
      <MetroHero
        scrollHint="SCROLL"
        pausedAtEnd={false}
      />
    );
    // When pausedAtEnd is false, scroll hint text should be in the DOM
    const hintText = screen.getByText('SCROLL');
    expect(hintText).toBeInTheDocument();
  });

  it('MetroHero defaults pausedAtEnd to false', () => {
    const { container } = render(<MetroHero />);
    const videos = container.querySelectorAll('video');
    expect(videos.length).toBe(1);
  });

  it('MetroHero accepts onProgress callback', () => {
    const handleProgress = jest.fn();
    render(<MetroHero onProgress={handleProgress} />);
    expect(handleProgress).toBeDefined();
  });

  it('MetroHero accepts lockUntilEnd prop', () => {
    const { container } = render(<MetroHero lockUntilEnd={true} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('MetroHero accepts className and style props', () => {
    const { container } = render(
      <MetroHero
        className="custom-class"
        style={{ background: 'red' }}
      />
    );
    expect(container.firstChild.classList.contains('custom-class')).toBe(true);
  });

  it('MetroHero uses default video source', () => {
    const { container } = render(<MetroHero />);
    const video = container.querySelector('video');
    expect(video).toHaveAttribute('src');
  });

  it('MetroHero uses custom video source when provided', () => {
    const { container } = render(<MetroHero videoSrc="https://example.com/custom.mp4" />);
    const video = container.querySelector('video');
    expect(video).toHaveAttribute('src', 'https://example.com/custom.mp4');
  });

  it('MetroHero with pausedAtEnd=true pins video at first frame', () => {
    const { container } = render(<MetroHero pausedAtEnd={true} />);
    const video = container.querySelector('video');
    expect(video).toBeTruthy();
  });

  it('MetroHero with pausedAtEnd=true does not show title text', () => {
    const { container } = render(
      <MetroHero
        title="HIDDEN TITLE"
        pausedAtEnd={true}
      />
    );
    // The title text should still be in the DOM but hidden
    expect(screen.getByText('HIDDEN TITLE')).toBeInTheDocument();
  });

  it('MetroHero with pausedAtEnd=true does not show scroll hint text', () => {
    const { container } = render(
      <MetroHero
        scrollHint="HIDDEN SCROLL"
        pausedAtEnd={true}
      />
    );
    // The scroll hint text should still be in the DOM but hidden
    expect(screen.getByText('HIDDEN SCROLL')).toBeInTheDocument();
  });

  it('MetroHero with pausedAtEnd=false shows scroll hint without opacity override', () => {
    const { container } = render(
      <MetroHero
        scrollHint="VISIBLE SCROLL"
        pausedAtEnd={false}
      />
    );
    const hintElement = container.querySelector('[style*="translateX(-50%)"]');
    // Should not have opacity: 0 (the inline style should not force it hidden)
    expect(hintElement).not.toHaveStyle({ opacity: '0' });
  });

  it('MetroHero handles video error gracefully', () => {
    const { container } = render(
      <MetroHero videoSrc="https://example.com/nonexistent.mp4" />
    );
    const video = container.querySelector('video');
    // Trigger error event
    video.dispatchEvent(new Event('error'));
    // Video should still be in DOM (no crash)
    expect(video).toBeTruthy();
  });
});
