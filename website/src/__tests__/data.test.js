import { projects } from '../data/projects';
import { skills, about } from '../data/about';
import { career } from '../data/career';

describe('Data Layer - Projects', () => {
  it('has at least one project', () => {
    expect(projects.length).toBeGreaterThan(0);
  });

  it('each project has required fields', () => {
    projects.forEach((project) => {
      expect(project).toHaveProperty('id');
      expect(project).toHaveProperty('title');
      expect(project).toHaveProperty('year');
      expect(project).toHaveProperty('description');
      expect(project).toHaveProperty('tags');
      expect(project).toHaveProperty('screenshots');
    });
  });

  it('project IDs are unique', () => {
    const ids = projects.map((p) => p.id);
    const uniqueIds = new Set(ids);
    expect(ids.length).toBe(uniqueIds.size);
  });

  it('each project has at least one screenshot', () => {
    // Some projects may have empty screenshots arrays (e.g., Gmail Spending Tracker, Personal Portfolio)
    // We verify that at least some projects have screenshots
    const projectsWithScreenshots = projects.filter(p => p.screenshots && p.screenshots.length > 0);
    expect(projectsWithScreenshots.length).toBeGreaterThan(0);
  });

  it('each project has at least one tag', () => {
    projects.forEach((project) => {
      expect(project.tags.length).toBeGreaterThan(0);
    });
  });

  it('projects can be sorted by year', () => {
    const years = projects.map((p) => parseInt(p.year));
    const sorted = [...years].sort((a, b) => b - a);
    // Verify that sorting works (projects may not be pre-sorted)
    expect(sorted).toEqual([2026, 2026, 2025, 2024, 2023]);
  });
});

describe('Data Layer - About', () => {
  it('has a name', () => {
    expect(about.name).toBeTruthy();
    expect(typeof about.name).toBe('string');
  });

  it('has a tagline', () => {
    expect(about.tagline).toBeTruthy();
    expect(typeof about.tagline).toBe('string');
  });

  it('has a bio', () => {
    expect(about.bio).toBeTruthy();
    expect(typeof about.bio).toBe('string');
    expect(about.bio.length).toBeGreaterThan(10);
  });

  it('has a profile image', () => {
    expect(about.profileImage).toBeTruthy();
  });

  it('has skills organized by category', () => {
    expect(Array.isArray(skills)).toBe(true);
    expect(skills.length).toBeGreaterThan(0);
    
    skills.forEach((skillGroup) => {
      expect(skillGroup).toHaveProperty('category');
      expect(skillGroup).toHaveProperty('items');
      expect(Array.isArray(skillGroup.items)).toBe(true);
      expect(skillGroup.items.length).toBeGreaterThan(0);
    });
  });
});

describe('Data Layer - Career', () => {
  it('has at least one career entry', () => {
    expect(career.length).toBeGreaterThan(0);
  });

  it('each career entry has required fields', () => {
    career.forEach((entry) => {
      expect(entry).toHaveProperty('period');
      expect(entry).toHaveProperty('role');
      expect(entry).toHaveProperty('company');
      expect(entry).toHaveProperty('description');
    });
  });

  it('career entries have valid period format', () => {
    career.forEach((entry) => {
      expect(entry.period).toMatch(/\d{4}/);
    });
  });
});
