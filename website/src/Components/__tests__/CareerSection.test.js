import { render, screen } from '@testing-library/react';
import { CareerSection } from '../CareerSection';
import { career } from '../../data/career';

describe('CareerSection', () => {
  it('renders the section header', () => {
    render(<CareerSection />);
    expect(screen.getByText('CAREER HISTORY')).toBeInTheDocument();
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

  it('renders the file menu header', () => {
    render(<CareerSection />);
    expect(screen.getByText('FILE')).toBeInTheDocument();
  });

  it('renders position count footer', () => {
    render(<CareerSection />);
    expect(screen.getByText(new RegExp(`${career.length} POSITION${career.length !== 1 ? 'S' : ''} LOADED`))).toBeInTheDocument();
  });

  it('has a timeline visual', () => {
    render(<CareerSection />);
    const timelineDots = document.querySelectorAll('.rounded-full');
    expect(timelineDots.length).toBeGreaterThan(0);
  });
});
