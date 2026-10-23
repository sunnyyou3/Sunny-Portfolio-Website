import { render, screen, fireEvent } from '@testing-library/react';
import { GallerySection } from '../GallerySection';

describe('GallerySection', () => {
  it('renders the section header', () => {
    render(<GallerySection />);
    expect(screen.getByText('GALLERY')).toBeInTheDocument();
  });

  it('renders the playback header', () => {
    render(<GallerySection />);
    expect(screen.getByText('PLAYBACK')).toBeInTheDocument();
  });

  it('renders photo count', () => {
    render(<GallerySection />);
    const photoCounter = screen.getByText(/\d+ \/ \d+/);
    expect(photoCounter).toBeInTheDocument();
  });

  it('renders navigation arrows', () => {
    render(<GallerySection />);
    const arrows = document.querySelectorAll('button svg');
    expect(arrows.length).toBe(2); // prev and next
  });

  it('shows photo count in footer', () => {
    render(<GallerySection />);
    expect(screen.getByText(/PHOTOS/)).toBeInTheDocument();
  });

  it('has dark background', () => {
    render(<GallerySection />);
    const container = document.querySelector('.bg-portfolio-dark');
    expect(container).toBeInTheDocument();
  });

  it('renders navigation buttons', () => {
    const { container } = render(<GallerySection />);
    const buttons = container.querySelectorAll('button');
    expect(buttons.length).toBeGreaterThan(0);
  });
});
