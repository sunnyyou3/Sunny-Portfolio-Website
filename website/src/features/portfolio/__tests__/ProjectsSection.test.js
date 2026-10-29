import { render, screen } from '@testing-library/react';
import { ProjectsSection } from '../ProjectsSection';
import { projects } from '../../../data/projects';

describe('ProjectsSection', () => {
  it('renders the section header', () => {
    render(<ProjectsSection />);
    // The heading is "Projects." (with period)
    expect(screen.getByText(/Projects\./i)).toBeInTheDocument();
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
    // Use tags that actually exist in the projects data
    // Some tags appear in multiple projects, so use queryAllByText
    expect(screen.queryAllByText('React').length).toBeGreaterThan(0);
    expect(screen.queryAllByText('Unity').length).toBeGreaterThan(0);
  });

  it('renders the review header', () => {
    render(<ProjectsSection />);
    expect(screen.getByText('REVIEW')).toBeInTheDocument();
  });

  it('renders project count footer', () => {
    render(<ProjectsSection />);
    expect(screen.getByText(/FILES INDEXED/i)).toBeInTheDocument();
  });

  it('renders project cards with thumbnails', () => {
    const { container } = render(<ProjectsSection />);
    const images = container.querySelectorAll('img');
    expect(images.length).toBeGreaterThan(0);
  });
});
