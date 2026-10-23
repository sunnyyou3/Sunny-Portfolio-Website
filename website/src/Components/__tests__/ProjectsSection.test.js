import { render, screen } from '@testing-library/react';
import { ProjectsSection } from '../ProjectsSection';
import { projects } from '../../data/projects';

describe('ProjectsSection', () => {
  it('renders the section header', () => {
    render(<ProjectsSection />);
    const headings = screen.getAllByRole('heading');
    const projectsHeading = headings.find(h => h.textContent === 'PROJECTS');
    expect(projectsHeading).toBeInTheDocument();
  });

  it('renders all projects', () => {
    render(<ProjectsSection />);
    projects.forEach((project) => {
      expect(screen.getByText(project.title)).toBeInTheDocument();
    });
  });

  it('renders project descriptions', () => {
    render(<ProjectsSection />);
    projects.forEach((project) => {
      expect(screen.getByText(project.description)).toBeInTheDocument();
    });
  });

  it('renders project tags', () => {
    render(<ProjectsSection />);
    // Verify specific unique tags exist
    expect(screen.getByText('MongoDB')).toBeInTheDocument();
    expect(screen.getByText('WebXR')).toBeInTheDocument();
  });

  it('renders the file menu header', () => {
    render(<ProjectsSection />);
    expect(screen.getByText('FILE')).toBeInTheDocument();
  });

  it('renders project count footer', () => {
    render(<ProjectsSection />);
    expect(screen.getByText(`${projects.length} PROJECTS LOADED`)).toBeInTheDocument();
  });

  it('renders project cards with thumbnails', () => {
    const { container } = render(<ProjectsSection />);
    const images = container.querySelectorAll('img');
    expect(images.length).toBeGreaterThan(0);
  });
});
