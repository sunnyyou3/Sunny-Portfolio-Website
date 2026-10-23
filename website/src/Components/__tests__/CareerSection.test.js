import { render, screen } from '@testing-library/react';
import { CareerSection } from '../CareerSection';
import { career } from '../../data/career';

describe('CareerSection', () => {
  it('renders the section header', () => {
    render(<CareerSection />);
    expect(screen.getByText('Career')).toBeInTheDocument();
  });

  it('renders all career entries', () => {
    render(<CareerSection />);
    career.forEach((entry) => {
      expect(screen.getByText(entry.role)).toBeInTheDocument();
      expect(screen.getByText(entry.company)).toBeInTheDocument();
      expect(screen.getByText(entry.description)).toBeInTheDocument();
    });
  });

  it('renders career periods', () => {
    render(<CareerSection />);
    career.forEach((entry) => {
      expect(screen.getByText(entry.period)).toBeInTheDocument();
    });
  });

  it('renders education section', () => {
    render(<CareerSection />);
    expect(screen.getByText('EDUCATION')).toBeInTheDocument();
  });

  it('renders the review header', () => {
    render(<CareerSection />);
    expect(screen.getByText(/FILE/i)).toBeInTheDocument();
  });

  it('renders career count footer', () => {
    render(<CareerSection />);
    expect(screen.getByText(/PROGRESS/i)).toBeInTheDocument();
  });

  it('has timeline visual elements', () => {
    render(<CareerSection />);
    const timelineDots = document.querySelectorAll('.rounded-full');
    expect(timelineDots.length).toBeGreaterThan(0);
  });
});
