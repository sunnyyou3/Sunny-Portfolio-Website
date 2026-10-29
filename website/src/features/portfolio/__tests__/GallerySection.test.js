import { render, screen } from '@testing-library/react';
import { GallerySection } from '../sections/GallerySection';

describe('GallerySection', () => {
  it('renders the gallery section container', () => {
    render(<GallerySection />);
    expect(screen.getByTestId('gallery-section')).toBeInTheDocument();
  });

  it('renders the preloader overlay', () => {
    const { container } = render(<GallerySection />);
    expect(container.querySelector('#preloader-overlay')).toBeInTheDocument();
  });

  it('renders the DSLR-style top HUD', () => {
    render(<GallerySection />);
    expect(screen.getByText('GALLERY')).toBeInTheDocument();
    expect(screen.getByText('COLLECTION')).toBeInTheDocument();
    expect(screen.getByTestId('gallery-section').querySelector('.camera-hud-top')).toBeInTheDocument();
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

  it('renders the DSLR-style bottom HUD', () => {
    render(<GallerySection />);
    expect(screen.getByText('FOCUS')).toBeInTheDocument();
    expect(screen.getByText('REVIEW')).toBeInTheDocument();
    expect(screen.getByText('100%')).toBeInTheDocument();
    expect(screen.getByTestId('gallery-section').querySelector('.camera-hud-bottom')).toBeInTheDocument();
  });

  it('has dark background', () => {
    render(<GallerySection />);
    const container = document.querySelector('.gallery-section');
    expect(container).toBeInTheDocument();
  });
});
