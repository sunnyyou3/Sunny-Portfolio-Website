import { render, screen } from '@testing-library/react';
import { CareerSection } from '../CareerSection';
import { career } from '../../data/career';

describe('CareerSection', () => {
  it('renders the section header', () => {
    render(<CareerSection />);
    // CAREER appears in multiple places (header, career records strip)
    expect(screen.getAllByText(/CAREER/i).length).toBeGreaterThan(0);
  });

  it('renders all career entries', () => {
    render(<CareerSection />);
    career.forEach((entry) => {
      expect(screen.getByText(entry.role)).toBeInTheDocument();
      // Company names may appear multiple times, so use queryAllByText
      expect(screen.queryAllByText(entry.company).length).toBeGreaterThan(0);
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
    // EDUCATION appears in multiple places (career records strip, footer)
    const educationElements = screen.getAllByText('EDUCATION');
    expect(educationElements.length).toBeGreaterThan(0);
  });

  it('renders the review header', () => {
    render(<CareerSection />);
    expect(screen.getByText(/FILE/i)).toBeInTheDocument();
  });

  it('renders career count footer', () => {
    render(<CareerSection />);
    // RECORDS appears in multiple places (CAREER RECORDS, RECORDS: XX)
    expect(screen.getAllByText(/RECORDS/i).length).toBeGreaterThan(0);
  });

  it('has timeline visual elements', () => {
    render(<CareerSection />);
    const timelineDots = document.querySelectorAll('.rounded-full');
    expect(timelineDots.length).toBeGreaterThan(0);
  });
});
