import { render, screen } from '@testing-library/react';
import { AboutSection } from '../AboutSection';
import { about, skills } from '../../data/about';

describe('AboutSection', () => {
  it('renders the section header', () => {
    render(<AboutSection />);
    // Use regex to match the header specifically
    const headings = screen.getAllByRole('heading');
    const aboutHeading = headings.find(h => h.textContent === 'ABOUT');
    expect(aboutHeading).toBeInTheDocument();
  });

  it('renders the name', () => {
    render(<AboutSection />);
    expect(screen.getByText(about.name)).toBeInTheDocument();
  });

  it('renders the tagline', () => {
    render(<AboutSection />);
    expect(screen.getByText(about.tagline)).toBeInTheDocument();
  });

  it('renders the bio', () => {
    render(<AboutSection />);
    expect(screen.getByText(about.bio)).toBeInTheDocument();
  });

  it('renders skills categories', () => {
    render(<AboutSection />);
    skills.forEach((skillGroup) => {
      expect(screen.getByText(skillGroup.category)).toBeInTheDocument();
    });
  });

  it('renders skill items', () => {
    render(<AboutSection />);
    skills.forEach((skillGroup) => {
      skillGroup.items.forEach((skill) => {
        expect(screen.getByText(skill)).toBeInTheDocument();
      });
    });
  });

  it('renders stats', () => {
    render(<AboutSection />);
    expect(screen.getByText(/YEARS EXPERIENCE/i)).toBeInTheDocument();
    expect(screen.getByText(/PROJECTS/i)).toBeInTheDocument();
    expect(screen.getByText(/PHOTOS TAKEN/i)).toBeInTheDocument();
  });

  it('has a profile image', () => {
    render(<AboutSection />);
    const images = document.querySelectorAll('img');
    expect(images.length).toBeGreaterThan(0);
  });

  it('has the settings header style', () => {
    render(<AboutSection />);
    expect(screen.getByText('SETUP')).toBeInTheDocument();
  });
});
