import { render, screen } from '@testing-library/react';
import { GallerySection } from '../GallerySection';

describe('GallerySection', () => {
  it('renders the gallery section container', () => {
    render(<GallerySection />);
    expect(screen.getByTestId('gallery-section')).toBeInTheDocument();
  });

  it('renders the preloader overlay', () => {
    const { container } = render(<GallerySection />);
    expect(container.querySelector('#preloader-overlay')).toBeInTheDocument();
  });

  it('renders the header navigation', () => {
    render(<GallerySection />);
    expect(screen.getByText('+Menu')).toBeInTheDocument();
    expect(screen.getByText('+Studio')).toBeInTheDocument();
    expect(screen.getByText('+Connect')).toBeInTheDocument();
    expect(screen.getByText('+Follow')).toBeInTheDocument();
  });

  it('renders the viewport and grid container', () => {
    const { container } = render(<GallerySection />);
    expect(container.querySelector('#viewport')).toBeInTheDocument();
    expect(container.querySelector('#gridContainer')).toBeInTheDocument();
  });

  it('renders the controls container', () => {
    render(<GallerySection />);
    expect(screen.getByText('NORMAL')).toBeInTheDocument();
    expect(screen.getByText('ZOOM OUT')).toBeInTheDocument();
    expect(screen.getByText('ZOOM IN')).toBeInTheDocument();
    expect(screen.getByText('FIT')).toBeInTheDocument();
  });

  it('renders the footer', () => {
    render(<GallerySection />);
    expect(screen.getByText('Est. 2025 • Summer Days')).toBeInTheDocument();
  });

  it('has dark background', () => {
    render(<GallerySection />);
    const container = document.querySelector('.gallery-section');
    expect(container).toBeInTheDocument();
  });
});
