import { render, screen } from '@testing-library/react';
import { AboutSection } from '../AboutSection';
import { about, skills } from '../../data/about';

describe('AboutSection', () => {
  it('renders the name', () => {
    render(<AboutSection />);
    expect(screen.getByText(about.name)).toBeInTheDocument();
  });

  it('renders the tagline', () => {
    render(<AboutSection />);
    const taglines = screen.getAllByText(/Developer & Photographer/i);
    expect(taglines.length).toBeGreaterThan(0);
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
    // The AboutSection has PROFILE, SKILLS, and CONTACT sections
    // These texts appear in multiple places, so use queryAllByText
    expect(screen.queryAllByText(/PROFILE/i).length).toBeGreaterThan(0);
    expect(screen.queryAllByText(/SKILLS/i).length).toBeGreaterThan(0);
    expect(screen.queryAllByText(/CONTACT/i).length).toBeGreaterThan(0);
  });

  it('has a profile image', () => {
    render(<AboutSection />);
    const images = document.querySelectorAll('img');
    expect(images.length).toBeGreaterThan(0);
  });

  it('has the info header style', () => {
    render(<AboutSection />);
    // FILE INFO appears in both top and bottom HUD
    expect(screen.queryAllByText(/FILE INFO/i).length).toBeGreaterThan(0);
  });
});
