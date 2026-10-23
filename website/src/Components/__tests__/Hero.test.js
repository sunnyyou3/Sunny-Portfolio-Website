import { render, screen } from '@testing-library/react';
import { Hero } from '../Hero';

describe('Hero', () => {
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

  it('has white background', () => {
    render(<Hero />);
    const heroSection = document.querySelector('.hero-section');
    expect(heroSection).toHaveClass('bg-white');
  });

  it('renders a scroll prompt', () => {
    render(<Hero />);
    expect(screen.getByText(/Scroll to explore/i)).toBeInTheDocument();
  });
});
