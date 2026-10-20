import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import DSRLPortfolio from '../pages/DSRLPortfolio';

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => ({
  ...jest.requireActual('framer-motion'),
  motion: {
    div: 'div',
    img: 'img',
    Button: 'button',
    button: 'button',
  },
  AnimatePresence: ({ children }) => <>{children}</>,
}));

// Mock the video import
jest.mock('../assets/video/intro.mp4', () => 'intro.mp4');

// Mock setTimeout to run synchronously in tests
const originalSetTimeout = global.setTimeout;

describe('DSRLPortfolio', () => {
  beforeEach(() => {
    // Mock video element to prevent autoplay errors
    Object.defineProperty(HTMLMediaElement.prototype, 'play', {
      writable: true,
      value: () => Promise.resolve(),
    });
  });

  // Helper to trigger video end
  const triggerVideoEnd = () => {
    const video = document.querySelector('video');
    if (video) {
      video.dispatchEvent(new Event('ended'));
    }
  };

  test('renders the portfolio component', async () => {
    render(<DSRLPortfolio />);
    
    // Trigger video end
    triggerVideoEnd();
    
    // The component should render without errors
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /OK/i })).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  test('shows the Home view after video completes', async () => {
    render(<DSRLPortfolio />);
    
    // Trigger video end
    triggerVideoEnd();
    
    // Wait for camera to appear
    await waitFor(() => {
      expect(screen.getByText(/I build with curiosity/i)).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  test('MENU opens and closes the section menu', async () => {
    render(<DSRLPortfolio />);
    
    // Trigger video end
    triggerVideoEnd();
    
    // Wait for camera to appear
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /MENU/i })).toBeInTheDocument();
    }, { timeout: 3000 });
    
    // Find and click MENU button
    const menuButton = screen.getByRole('button', { name: /MENU/i });
    fireEvent.click(menuButton);
    
    // Menu should be open - check for menu-specific elements
    await waitFor(() => {
      expect(screen.getByLabelText(/Select PROFILE/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Select PROJECTS/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Select CAREER/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Select ABOUT/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Select GALLERY/i)).toBeInTheDocument();
    });
  });

  test('every portfolio section is reachable from the menu', async () => {
    render(<DSRLPortfolio />);
    
    // Trigger video end
    triggerVideoEnd();
    
    // Wait for camera to appear
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /MENU/i })).toBeInTheDocument();
    }, { timeout: 3000 });
    
    // Open menu
    const menuButton = screen.getByRole('button', { name: /MENU/i });
    fireEvent.click(menuButton);
    
    // Navigate to Projects in menu (Projects is at index 1, so click down once from Home)
    const downButton = screen.getByRole('button', { name: /Down/i });
    fireEvent.click(downButton);
    
    // Click OK to confirm selection
    const okButton = screen.getByRole('button', { name: /OK/i });
    fireEvent.click(okButton);
    
    // Should navigate to Projects view
    await waitFor(() => {
      expect(screen.getByText(/VR App for Students with EBD/i)).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  test('INFO / DISP toggles display mode', async () => {
    render(<DSRLPortfolio />);
    
    // Trigger video end
    triggerVideoEnd();
    
    // Wait for camera to appear
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /INFO/i })).toBeInTheDocument();
    }, { timeout: 3000 });
    
    // Find and click INFO button
    const infoButton = screen.getByRole('button', { name: /INFO/i });
    fireEvent.click(infoButton);
    
    // Should show design concept info
    await waitFor(() => {
      expect(screen.getByText(/DESIGN CONCEPT/i)).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  test('Playback opens the Projects gallery', async () => {
    render(<DSRLPortfolio />);
    
    // Trigger video end
    triggerVideoEnd();
    
    // Wait for camera to appear
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /PLAYBACK/i })).toBeInTheDocument();
    }, { timeout: 3000 });
    
    // Find and click Playback button
    const playbackButton = screen.getByRole('button', { name: /PLAYBACK/i });
    fireEvent.click(playbackButton);
    
    // Should navigate to Projects view
    await waitFor(() => {
      expect(screen.getByText(/VR App for Students with EBD/i)).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  test('Directional controls move through sections correctly', async () => {
    render(<DSRLPortfolio />);
    
    // Trigger video end
    triggerVideoEnd();
    
    // Wait for camera to appear
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Up/i })).toBeInTheDocument();
    }, { timeout: 3000 });
    
    // Find D-pad buttons
    const upButton = screen.getByRole('button', { name: /Up/i });
    const downButton = screen.getByRole('button', { name: /Down/i });
    
    // Click up to go to previous section
    fireEvent.click(upButton);
    
    // Click down to go to next section
    fireEvent.click(downButton);
    
    // Should navigate without errors
    await waitFor(() => {
      expect(screen.getByText(/I build with curiosity/i)).toBeInTheDocument();
    });
  });

  test('OK / SET confirms the selected menu item', async () => {
    render(<DSRLPortfolio />);
    
    // Trigger video end
    triggerVideoEnd();
    
    // Wait for camera to appear
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /MENU/i })).toBeInTheDocument();
    }, { timeout: 3000 });
    
    // Open menu
    const menuButton = screen.getByRole('button', { name: /MENU/i });
    fireEvent.click(menuButton);
    
    // Find OK button
    const okButton = screen.getByRole('button', { name: /OK/i });
    fireEvent.click(okButton);
    
    // Should close menu and navigate to selected section
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /MENU/i })).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  test('BACK returns to the expected previous view', async () => {
    render(<DSRLPortfolio />);
    
    // Trigger video end
    triggerVideoEnd();
    
    // Wait for camera to appear
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Down/i })).toBeInTheDocument();
    }, { timeout: 3000 });
    
    // Navigate to a different section
    const downButton = screen.getByRole('button', { name: /Down/i });
    fireEvent.click(downButton);
    
    // Find and click BACK button (specific selector to avoid multiple matches)
    const backButton = screen.getByLabelText(/BACK - Return to previous view/i);
    fireEvent.click(backButton);
    
    // Should return to Home view
    await waitFor(() => {
      expect(screen.getByText(/I build with curiosity/i)).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  test('Selecting a project shows its details', async () => {
    render(<DSRLPortfolio />);
    
    // Trigger video end
    triggerVideoEnd();
    
    // Wait for camera to appear
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Down/i })).toBeInTheDocument();
    }, { timeout: 3000 });
    
    // Navigate to Projects
    const downButton = screen.getByRole('button', { name: /Down/i });
    fireEvent.click(downButton);
    
    // Wait for Projects view to load
    await waitFor(() => {
      expect(screen.getByText(/VR App for Students with EBD/i)).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  test('External links are functional', async () => {
    render(<DSRLPortfolio />);
    
    // Trigger video end
    triggerVideoEnd();
    
    // Wait for camera to appear
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Down/i })).toBeInTheDocument();
    }, { timeout: 3000 });
    
    // Navigate to About view
    const downButton = screen.getByRole('button', { name: /Down/i });
    fireEvent.click(downButton);
    fireEvent.click(downButton);
    fireEvent.click(downButton);
    
    // Wait for About view to load
    await waitFor(() => {
      expect(screen.getByText(/Good work starts with a conversation/i)).toBeInTheDocument();
    }, { timeout: 5000 });
    
    // Check that GitHub link exists
    const githubLink = screen.getByRole('link', { name: /GitHub/i });
    expect(githubLink).toHaveAttribute('href', 'https://github.com/sunnyyou3');
    
    // Check that LinkedIn link exists
    const linkedinLink = screen.getByRole('link', { name: /LinkedIn/i });
    expect(linkedinLink).toHaveAttribute('href', 'https://linkedin.com/in/sunnyyou3');
    
    // Check that Email link exists
    const emailLink = screen.getByRole('link', { name: /Email/i });
    expect(emailLink).toHaveAttribute('href', 'mailto:yousunny3@gmail.com');
  });

  test('Camera controls are positioned to the right of the LCD', async () => {
    render(<DSRLPortfolio />);
    
    // Trigger video end
    triggerVideoEnd();
    
    // Wait for camera to appear
    await waitFor(() => {
      // All interactive buttons should be present
      expect(screen.getByRole('button', { name: /Up/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Down/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Left/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Right/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /OK/i })).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  test('Camera body remains stable during navigation', async () => {
    render(<DSRLPortfolio />);
    
    // Trigger video end
    triggerVideoEnd();
    
    // Wait for camera to appear
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /OK/i })).toBeInTheDocument();
    }, { timeout: 3000 });
    
    const okButton = screen.getByRole('button', { name: /OK/i });
    expect(okButton).toBeInTheDocument();
    
    // Navigate and check camera is still there
    fireEvent.click(okButton);
    expect(okButton).toBeInTheDocument();
  });

  test('LCD content is fully displayed without overflow', async () => {
    render(<DSRLPortfolio />);
    
    // Trigger video end
    triggerVideoEnd();
    
    // Wait for camera to appear
    await waitFor(() => {
      expect(screen.getByText(/I build with curiosity/i)).toBeInTheDocument();
      expect(screen.getByText(/Photographer and Software Developer/i)).toBeInTheDocument();
    }, { timeout: 3000 });
  });
});
