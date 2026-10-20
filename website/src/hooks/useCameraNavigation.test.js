import { renderHook, act } from '@testing-library/react';
import { useCameraNavigation, SECTIONS } from './useCameraNavigation';

describe('useCameraNavigation', () => {
  test('returns initial state with Home view', () => {
    const { result } = renderHook(() => useCameraNavigation());
    
    expect(result.current.activeView).toBe('Home');
    expect(result.current.menuOpen).toBe(false);
    expect(result.current.slideIndex).toBe(0);
    expect(result.current.selectedProject).toBeNull();
    expect(result.current.displayMode).toBe('normal');
  });

  test('SECTIONS contains all expected portfolio sections', () => {
    expect(SECTIONS).toContain('Home');
    expect(SECTIONS).toContain('Projects');
    expect(SECTIONS).toContain('Experience');
    expect(SECTIONS).toContain('About');
    expect(SECTIONS).toContain('Gallery');
    expect(SECTIONS.length).toBe(5);
  });

  test('navigateToView changes the active view', () => {
    const { result } = renderHook(() => useCameraNavigation());
    
    act(() => {
      result.current.navigateToView('Projects');
    });
    
    expect(result.current.activeView).toBe('Projects');
  });

  test('openMenu toggles menu open state', () => {
    const { result } = renderHook(() => useCameraNavigation());
    
    // Initially closed
    expect(result.current.menuOpen).toBe(false);
    
    act(() => {
      result.current.openMenu();
    });
    
    // Now open
    expect(result.current.menuOpen).toBe(true);
    
    act(() => {
      result.current.openMenu();
    });
    
    // Closed again
    expect(result.current.menuOpen).toBe(false);
  });

  test('menuNavigate moves through menu items', () => {
    const { result } = renderHook(() => useCameraNavigation());
    
    // Open menu to set initial index
    act(() => {
      result.current.navigateToView('Projects');
      result.current.openMenu();
    });
    
    const initialIndex = result.current.menuIndex;
    
    act(() => {
      result.current.menuNavigate(1);
    });
    
    expect(result.current.menuIndex).toBe((initialIndex + 1) % SECTIONS.length);
    
    act(() => {
      result.current.menuNavigate(-1);
    });
    
    expect(result.current.menuIndex).toBe(initialIndex);
  });

  test('menuConfirm navigates to the selected section', () => {
    const { result } = renderHook(() => useCameraNavigation());
    
    act(() => {
      result.current.navigateToView('About');
      result.current.openMenu();
    });
    
    // Navigate to Experience in menu
    act(() => {
      result.current.menuNavigate(2); // Experience is at index 2
    });
    
    expect(result.current.menuIndex).toBe(2);
    
    act(() => {
      result.current.menuConfirm();
    });
    
    expect(result.current.activeView).toBe('Experience');
    expect(result.current.menuOpen).toBe(false);
  });

  test('goBack closes menu or returns to Home', () => {
    const { result } = renderHook(() => useCameraNavigation());
    
    // Test closing menu
    act(() => {
      result.current.openMenu();
    });
    
    expect(result.current.menuOpen).toBe(true);
    
    act(() => {
      result.current.goBack();
    });
    
    expect(result.current.menuOpen).toBe(false);
    
    // Test returning to Home from another section
    act(() => {
      result.current.navigateToView('Gallery');
    });
    
    expect(result.current.activeView).toBe('Gallery');
    
    act(() => {
      result.current.goBack();
    });
    
    expect(result.current.activeView).toBe('Home');
  });

  test('toggleDisplayMode switches between normal and info', () => {
    const { result } = renderHook(() => useCameraNavigation());
    
    expect(result.current.displayMode).toBe('normal');
    
    act(() => {
      result.current.toggleDisplayMode();
    });
    
    expect(result.current.displayMode).toBe('info');
    
    act(() => {
      result.current.toggleDisplayMode();
    });
    
    expect(result.current.displayMode).toBe('normal');
  });

  test('selectProject sets the selected project index', () => {
    const { result } = renderHook(() => useCameraNavigation());
    
    act(() => {
      result.current.selectProject(1);
    });
    
    expect(result.current.selectedProject).toBe(1);
  });

  test('keyboard navigation works for arrow keys', () => {
    const { result } = renderHook(() => useCameraNavigation());
    
    // Simulate ArrowUp key - should go to previous section
    act(() => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
    });
    
    // Home is first, so ArrowUp should wrap to Gallery
    expect(result.current.activeView).toBe('Gallery');
    
    // Simulate ArrowDown key - should go to next section
    act(() => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    });
    
    expect(result.current.activeView).toBe('Home');
  });

  test('keyboard navigation works for menu', () => {
    const { result } = renderHook(() => useCameraNavigation());
    
    act(() => {
      result.current.openMenu();
    });
    
    // ArrowLeft should navigate up in menu
    act(() => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));
    });
    
    expect(result.current.menuIndex).toBe(4); // Wrapped to end
    
    // Enter should confirm selection
    act(() => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    });
    
    expect(result.current.activeView).toBe('Gallery');
    expect(result.current.menuOpen).toBe(false);
  });

  test('keyboard navigation works for Escape key', () => {
    const { result } = renderHook(() => useCameraNavigation());
    
    act(() => {
      result.current.openMenu();
    });
    
    // Escape should close menu
    act(() => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    });
    
    expect(result.current.menuOpen).toBe(false);
  });

  test('slideNavigate moves through slides when registered', () => {
    const { result } = renderHook(() => useCameraNavigation());
    
    expect(result.current.slideIndex).toBe(0);
    
    // Register slides for current view (Home)
    act(() => {
      result.current.registerSlides('Home', ['slide1', 'slide2', 'slide3']);
    });
    
    // Now slideNavigate should work
    act(() => {
      result.current.slideNavigate(1);
    });
    
    expect(result.current.slideIndex).toBe(1);
    
    act(() => {
      result.current.slideNavigate(-1);
    });
    
    expect(result.current.slideIndex).toBe(0);
  });

  test('goBack returns to Home when not in menu and no project selected', () => {
    const { result } = renderHook(() => useCameraNavigation());
    
    act(() => {
      result.current.navigateToView('Gallery');
    });
    
    expect(result.current.activeView).toBe('Gallery');
    
    act(() => {
      result.current.goBack();
    });
    
    expect(result.current.activeView).toBe('Home');
  });
});
