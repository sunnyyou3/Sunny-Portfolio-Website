import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import DSLRPortfolio from './components/DSLRPortfolio';

describe('useCameraNavigation logic', () => {
  const getFirstMenuButton = () => {
    const buttons = screen.getAllByRole('button', { name: /open section menu/i });
    return buttons[0];
  };

  const getBackButton = () => {
    const buttons = screen.getAllByRole('button', { name: /go back/i });
    return buttons[0];
  };

  test('MENU button opens the section menu', () => {
    render(<DSLRPortfolio />);
    const menuButton = getFirstMenuButton();
    fireEvent.click(menuButton);
    // The menu should overlay the LCD content
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    // Check for menu header in the dialog
    expect(screen.getByRole('dialog').textContent).toContain('MENU');
  });

  test('menu items are listed and clickable', () => {
    render(<DSLRPortfolio />);
    const menuButton = getFirstMenuButton();
    fireEvent.click(menuButton);
    expect(screen.getByText('EXPERIENCE')).toBeInTheDocument();
    expect(screen.getByText('PROJECTS')).toBeInTheDocument();
    expect(screen.getByText('GALLERY')).toBeInTheDocument();
    expect(screen.getByText('ABOUT')).toBeInTheDocument();
    expect(screen.getByText('CONTACT')).toBeInTheDocument();
  });

  test('navigating up changes the section', () => {
    render(<DSLRPortfolio />);
    // Start at HOME
    expect(screen.getByText(/I build with curiosity/i)).toBeInTheDocument();
    // Press up arrow (navigate to CONTACT - wraps around)
    fireEvent.keyDown(window, { key: 'ArrowUp' });
    // Should now be on CONTACT view - check for unique section label
    // The section label "CONTACT" should appear in the status bar
    expect(document.body.textContent).toContain('CONTACT');
  });

  test('navigate right cycles slides', () => {
    render(<DSLRPortfolio />);
    // Home view has 1 slide, so navigating right should stay on home
    fireEvent.keyDown(window, { key: 'ArrowRight' });
    expect(screen.getByText(/I build with curiosity/i)).toBeInTheDocument();
  });

  test('goBack closes menu when open', () => {
    render(<DSLRPortfolio />);
    const menuButton = getFirstMenuButton();
    fireEvent.click(menuButton);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    // Press ESC to close menu
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  test('BACK button closes menu', () => {
    render(<DSLRPortfolio />);
    const menuButton = getFirstMenuButton();
    fireEvent.click(menuButton);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    const backButton = getBackButton();
    fireEvent.click(backButton);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  test('Experience view is accessible via menu', () => {
    render(<DSLRPortfolio />);
    // Navigate to Experience via menu
    const menuButton = getFirstMenuButton();
    fireEvent.click(menuButton);
    const experienceItem = screen.getByText('EXPERIENCE');
    fireEvent.click(experienceItem);
    // Should now show experience view - status bar shows CAREER for experience section
    expect(document.body.textContent).toContain('CAREER');
    expect(document.body.textContent).toContain('01 / 06');
  });
});

test('renders DSLR portfolio camera shell', () => {
  render(<DSLRPortfolio />);
  // The camera shell should be present - at least one MENU button
  const menuButtons = screen.getAllByRole('button', { name: /open section menu/i });
  expect(menuButtons.length).toBeGreaterThanOrEqual(1);
  // At least one BACK button
  const backButtons = screen.getAllByRole('button', { name: /go back/i });
  expect(backButtons.length).toBeGreaterThanOrEqual(1);
});

test('renders home view by default', () => {
  render(<DSLRPortfolio />);
  expect(screen.getByText(/I build with curiosity/i)).toBeInTheDocument();
});

test('renders navigation controls', () => {
  render(<DSLRPortfolio />);
  const upButtons = screen.getAllByRole('button', { name: /navigate up/i });
  expect(upButtons.length).toBeGreaterThanOrEqual(1);
  const downButtons = screen.getAllByRole('button', { name: /navigate down/i });
  expect(downButtons.length).toBeGreaterThanOrEqual(1);
  const leftButtons = screen.getAllByRole('button', { name: /navigate left/i });
  expect(leftButtons.length).toBeGreaterThanOrEqual(1);
  const rightButtons = screen.getAllByRole('button', { name: /navigate right/i });
  expect(rightButtons.length).toBeGreaterThanOrEqual(1);
});

test('MENU button is accessible', () => {
  render(<DSLRPortfolio />);
  const menuButtons = screen.getAllByRole('button', { name: /open section menu/i });
  expect(menuButtons.length).toBeGreaterThanOrEqual(1);
});

test('BACK button is accessible', () => {
  render(<DSLRPortfolio />);
  const backButtons = screen.getAllByRole('button', { name: /go back/i });
  expect(backButtons.length).toBeGreaterThanOrEqual(1);
});

describe('Button duplication and layout', () => {
  test('each button type appears exactly once', () => {
    render(<DSLRPortfolio />);
    
    // Each button should appear exactly once
    const menuButtons = screen.getAllByRole('button', { name: /open section menu/i });
    expect(menuButtons.length).toBe(1);
    
    const infoButtons = screen.getAllByRole('button', { name: /toggle info display/i });
    expect(infoButtons.length).toBe(1);
    
    const playbackButtons = screen.getAllByRole('button', { name: /open projects gallery/i });
    expect(playbackButtons.length).toBe(1);
    
    const upButtons = screen.getAllByRole('button', { name: /navigate up/i });
    expect(upButtons.length).toBe(1);
    
    const downButtons = screen.getAllByRole('button', { name: /navigate down/i });
    expect(downButtons.length).toBe(1);
    
    const leftButtons = screen.getAllByRole('button', { name: /navigate left/i });
    expect(leftButtons.length).toBe(1);
    
    const rightButtons = screen.getAllByRole('button', { name: /navigate right/i });
    expect(rightButtons.length).toBe(1);
    
    const backButtons = screen.getAllByRole('button', { name: /go back/i });
    expect(backButtons.length).toBe(1);
    
    const okButtons = screen.getAllByRole('button', { name: /confirm selection/i });
    expect(okButtons.length).toBe(1);
    
    const recordButtons = screen.getAllByRole('button', { name: /record \(not available\)/i });
    expect(recordButtons.length).toBe(1);
  });

  test('buttons are in the correct location (camera controls on right side of camera shell)', () => {
    render(<DSLRPortfolio />);
    
    // Camera shell should be present (has id "lcd-content")
    const cameraShell = document.getElementById('lcd-content');
    expect(cameraShell).toBeInTheDocument();
    
    // Buttons should be inside the camera shell (right side controls)
    const menuButton = screen.getByRole('button', { name: /open section menu/i });
    const cameraShellParent = menuButton.closest('[id="lcd-content"]');
    expect(cameraShellParent).toBeInTheDocument();
    
    // All buttons should be inside the camera shell
    const infoButton = screen.getByRole('button', { name: /toggle info display/i });
    expect(infoButton.closest('[id="lcd-content"]')).toBeInTheDocument();
  });

  test('all required camera buttons are present', () => {
    render(<DSLRPortfolio />);
    
    // Check for all button labels using aria-labels (more specific than text content)
    expect(screen.getByRole('button', { name: /open section menu/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /toggle info display/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /open projects gallery/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /go back/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /confirm selection/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /record \(not available\)/i })).toBeInTheDocument();
  });
});

describe('Menu navigation and page selection', () => {
  test('user can select HOME from menu', () => {
    render(<DSLRPortfolio />);
    
    // Start at HOME
    expect(screen.getByText(/I build with curiosity/i)).toBeInTheDocument();
    
    // Open menu
    const menuButton = screen.getByRole('button', { name: /open section menu/i });
    fireEvent.click(menuButton);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    
    // Click HOME in menu
    const homeItem = screen.getByText('HOME');
    fireEvent.click(homeItem);
    
    // Should still be on HOME
    expect(screen.getByText(/I build with curiosity/i)).toBeInTheDocument();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  test('user can select EXPERIENCE from menu', () => {
    render(<DSLRPortfolio />);
    
    // Open menu
    const menuButton = screen.getByRole('button', { name: /open section menu/i });
    fireEvent.click(menuButton);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    
    // Click EXPERIENCE in menu
    const experienceItem = screen.getByText('EXPERIENCE');
    fireEvent.click(experienceItem);
    
    // Should now show experience view
    expect(document.body.textContent).toContain('CAREER');
    expect(document.body.textContent).toContain('01 / 06');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  test('user can select PROJECTS from menu', () => {
    render(<DSLRPortfolio />);
    
    // Open menu
    const menuButton = screen.getByRole('button', { name: /open section menu/i });
    fireEvent.click(menuButton);
    
    // Click PROJECTS in menu
    const projectsItem = screen.getByText('PROJECTS');
    fireEvent.click(projectsItem);
    
    // Should now show projects view
    expect(document.body.textContent).toContain('PROJECTS');
    expect(document.body.textContent).toContain('01 / 02');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  test('user can select GALLERY from menu', () => {
    render(<DSLRPortfolio />);
    
    // Open menu
    const menuButton = screen.getByRole('button', { name: /open section menu/i });
    fireEvent.click(menuButton);
    
    // Click GALLERY in menu
    const galleryItem = screen.getByText('GALLERY');
    fireEvent.click(galleryItem);
    
    // Should now show gallery view
    expect(document.body.textContent).toContain('GALLERY');
    expect(document.body.textContent).toContain('01 / 09');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  test('user can select ABOUT from menu', () => {
    render(<DSLRPortfolio />);
    
    // Open menu
    const menuButton = screen.getByRole('button', { name: /open section menu/i });
    fireEvent.click(menuButton);
    
    // Click ABOUT in menu
    const aboutItem = screen.getByText('ABOUT');
    fireEvent.click(aboutItem);
    
    // Should now show about view
    expect(document.body.textContent).toContain('ABOUT');
    expect(document.body.textContent).toContain('01 / 03');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  test('user can select CONTACT from menu', () => {
    render(<DSLRPortfolio />);
    
    // Open menu
    const menuButton = screen.getByRole('button', { name: /open section menu/i });
    fireEvent.click(menuButton);
    
    // Click CONTACT in menu
    const contactItem = screen.getByText('CONTACT');
    fireEvent.click(contactItem);
    
    // Should now show contact view
    expect(document.body.textContent).toContain('CONTACT');
    expect(document.body.textContent).toContain('01 / 01');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});

describe('Button navigation', () => {
  test('navigate up button changes section', () => {
    render(<DSLRPortfolio />);
    
    // Start at HOME
    expect(screen.getByText(/I build with curiosity/i)).toBeInTheDocument();
    
    // Click navigate up button
    const upButton = screen.getByRole('button', { name: /navigate up/i });
    fireEvent.click(upButton);
    
    // Should now be on CONTACT (wraps around)
    expect(document.body.textContent).toContain('CONTACT');
  });

  test('navigate down button changes section', () => {
    render(<DSLRPortfolio />);
    
    // Start at HOME
    expect(screen.getByText(/I build with curiosity/i)).toBeInTheDocument();
    
    // Click navigate down button
    const downButton = screen.getByRole('button', { name: /navigate down/i });
    fireEvent.click(downButton);
    
    // Should now be on EXPERIENCE
    expect(document.body.textContent).toContain('CAREER');
  });

  test('navigate left button cycles slides', () => {
    render(<DSLRPortfolio />);
    
    // Start at HOME slide 1
    expect(screen.getByText(/I build with curiosity/i)).toBeInTheDocument();
    
    // Click navigate left button (should stay on slide 1 since it's the first)
    const leftButton = screen.getByRole('button', { name: /navigate left/i });
    fireEvent.click(leftButton);
    
    // Should still be on HOME (only 1 slide)
    expect(screen.getByText(/I build with curiosity/i)).toBeInTheDocument();
  });

  test('navigate right button cycles slides', () => {
    render(<DSLRPortfolio />);
    
    // Navigate to EXPERIENCE first
    const menuButton = screen.getByRole('button', { name: /open section menu/i });
    fireEvent.click(menuButton);
    const experienceItem = screen.getByText('EXPERIENCE');
    fireEvent.click(experienceItem);
    
    // Click navigate right button
    const rightButton = screen.getByRole('button', { name: /navigate right/i });
    fireEvent.click(rightButton);
    
    // Should now be on slide 2 of EXPERIENCE
    expect(document.body.textContent).toContain('02 / 06');
  });

  test('back button returns to previous section', () => {
    render(<DSLRPortfolio />);
    
    // Navigate to EXPERIENCE
    const menuButton = screen.getByRole('button', { name: /open section menu/i });
    fireEvent.click(menuButton);
    const experienceItem = screen.getByText('EXPERIENCE');
    fireEvent.click(experienceItem);
    
    // Now go back
    const backButton = screen.getByRole('button', { name: /go back/i });
    fireEvent.click(backButton);
    
    // Should be back at HOME
    expect(screen.getByText(/I build with curiosity/i)).toBeInTheDocument();
  });

  test('INFO button toggles info display', () => {
    render(<DSLRPortfolio />);
    
    // Initially info is hidden (showInfo defaults to false)
    const infoButton = screen.getByRole('button', { name: /toggle info display/i });
    
    // Count INFO text elements - button has 2 (content + label), status bar has 0 when info hidden = 2 total
    const infoElementsBefore = screen.queryAllByText(/INFO/);
    expect(infoElementsBefore.length).toBe(2);
    
    // Click info button to show info
    fireEvent.click(infoButton);
    
    // Info should be visible - status bar "INFO" text should appear
    // Button content + button label + status bar "INFO" = 3 total
    const infoElementsAfter = screen.queryAllByText(/INFO/);
    expect(infoElementsAfter.length).toBe(3);
    
    // Click again to hide info
    fireEvent.click(infoButton);
    
    // Info should be hidden again
    const infoElementsFinal = screen.queryAllByText(/INFO/);
    expect(infoElementsFinal.length).toBe(2);
  });
});
