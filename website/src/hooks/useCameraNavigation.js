import { useState, useCallback, useRef, useEffect } from 'react';

/**
 * Navigation state manager for the DSLR camera interface.
 * Manages active view, menu state, selected project, and display mode.
 */
export const SECTIONS = ['Home', 'Projects', 'Experience', 'About', 'Gallery'];

export function useCameraNavigation() {
  const [activeView, setActiveView] = useState('Home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuIndex, setMenuIndex] = useState(0);
  const [slideIndex, setSlideIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);
  const [displayMode, setDisplayMode] = useState('normal'); // 'normal' | 'info'
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [lcdOn, setLcdOn] = useState(false);

  // Track which page provides slides
  const pageSlides = useRef({
    'Projects': [],
    'Experience': [],
    'Gallery': [],
    'About': [],
    'Home': [],
  });

  const navigateToView = useCallback((view) => {
    setIsTransitioning(true);
    setActiveView(view);
    setMenuOpen(false);
    setMenuIndex(SECTIONS.indexOf(view));
    setSelectedProject(null);
    setSlideIndex(0);
    setTimeout(() => setIsTransitioning(false), 400);
  }, []);

  const openMenu = useCallback(() => {
    setMenuOpen((prev) => !prev);
    if (!menuOpen) {
      setMenuIndex(SECTIONS.indexOf(activeView) >= 0 ? SECTIONS.indexOf(activeView) : 0);
    }
  }, [menuOpen, activeView]);

  const menuNavigate = useCallback((direction) => {
    setMenuIndex((prev) => {
      const next = (prev + direction + SECTIONS.length) % SECTIONS.length;
      return next;
    });
  }, []);

  const menuConfirm = useCallback(() => {
    const view = SECTIONS[menuIndex];
    if (view) {
      navigateToView(view);
    }
  }, [menuIndex, navigateToView]);

  const goBack = useCallback(() => {
    if (selectedProject !== null) {
      setSelectedProject(null);
    } else if (menuOpen) {
      setMenuOpen(false);
    } else {
      navigateToView('Home');
    }
  }, [selectedProject, menuOpen, navigateToView]);

  const toggleDisplayMode = useCallback(() => {
    setDisplayMode((prev) => (prev === 'normal' ? 'info' : 'normal'));
  }, []);

  const selectProject = useCallback((index) => {
    setSelectedProject(index);
  }, []);

  const slideNavigate = useCallback((direction) => {
    const slides = pageSlides.current[activeView] || [];
    if (slides.length > 0) {
      setSlideIndex((prev) => (prev + direction + slides.length) % slides.length);
    }
  }, [activeView]);

  const registerSlides = useCallback((view, slides) => {
    pageSlides.current[view] = slides;
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (menuOpen) {
        if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
          e.preventDefault();
          menuNavigate(-1);
        } else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
          e.preventDefault();
          menuNavigate(1);
        } else if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          menuConfirm();
        } else if (e.key === 'Escape') {
          e.preventDefault();
          setMenuOpen(false);
        }
      } else if (selectedProject !== null) {
        if (e.key === 'Escape' || e.key === 'Backspace') {
          e.preventDefault();
          setSelectedProject(null);
        }
      } else {
        if (e.key === 'ArrowUp') {
          e.preventDefault();
          const currentIdx = SECTIONS.indexOf(activeView);
          const nextIdx = (currentIdx - 1 + SECTIONS.length) % SECTIONS.length;
          navigateToView(SECTIONS[nextIdx]);
        } else if (e.key === 'ArrowDown') {
          e.preventDefault();
          const currentIdx = SECTIONS.indexOf(activeView);
          const nextIdx = (currentIdx + 1) % SECTIONS.length;
          navigateToView(SECTIONS[nextIdx]);
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          slideNavigate(-1);
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          slideNavigate(1);
        } else if (e.key === 'm' || e.key === 'M') {
          openMenu();
        } else if (e.key === 'Escape' || e.key === 'b' || e.key === 'B') {
          goBack();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen, selectedProject, activeView, menuNavigate, menuConfirm, slideNavigate, openMenu, goBack, navigateToView]);

  // Turn on LCD after animation completes
  useEffect(() => {
    const timer = setTimeout(() => {
      setLcdOn(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return {
    activeView,
    menuOpen,
    menuIndex,
    slideIndex,
    selectedProject,
    displayMode,
    isTransitioning,
    lcdOn,
    navigateToView,
    openMenu,
    menuNavigate,
    menuConfirm,
    goBack,
    toggleDisplayMode,
    selectProject,
    slideNavigate,
    registerSlides,
    setSlideIndex,
  };
}
