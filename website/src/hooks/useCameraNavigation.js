import { useState, useCallback, useMemo } from 'react';

const SECTIONS = [
  { label: 'HOME', view: 'home' },
  { label: 'EXPERIENCE', view: 'experience' },
  { label: 'PROJECTS', view: 'projects' },
  { label: 'GALLERY', view: 'gallery' },
  { label: 'ABOUT', view: 'about' },
  { label: 'CONTACT', view: 'contact' },
];

const VIEW_SOURCES = {
  home: 'PROFILE',
  experience: 'CAREER',
  projects: 'PROJECTS',
  gallery: 'GALLERY',
  about: 'ABOUT',
  contact: 'CONTACT',
};

export function useCameraNavigation(initialView = 'home') {
  const [currentView, setCurrentView] = useState(initialView);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMenuIndex, setActiveMenuIndex] = useState(0);
  const [slideIndex, setSlideIndex] = useState(0);
  const [showInfo, setShowInfo] = useState(false);
  const [viewHistory, setViewHistory] = useState([]);

  const currentSection = useMemo(() => {
    return SECTIONS.find(s => s.view === currentView) || SECTIONS[0];
  }, [currentView]);

  const sectionIndex = useMemo(() => {
    return SECTIONS.findIndex(s => s.view === currentView);
  }, [currentView]);

  const navigateToView = useCallback((view) => {
    setCurrentView(view);
    setSlideIndex(0);
    setMenuOpen(false);
  }, []);

  const openMenu = useCallback(() => {
    setMenuOpen(true);
    setActiveMenuIndex(sectionIndex >= 0 ? sectionIndex : 0);
  }, [sectionIndex]);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
  }, []);

  const selectFromMenu = useCallback((section) => {
    if (section.view !== currentView) {
      setViewHistory(prev => [...prev, currentView]);
    }
    setCurrentView(section.view);
    setSlideIndex(0);
    setMenuOpen(false);
  }, [currentView]);

  const goBack = useCallback(() => {
    if (menuOpen) {
      setMenuOpen(false);
    } else if (viewHistory.length > 0) {
      const prev = viewHistory[viewHistory.length - 1];
      setViewHistory(prev => prev.slice(0, -1));
      setCurrentView(prev);
      setSlideIndex(0);
    } else {
      setMenuOpen(false);
    }
  }, [menuOpen, viewHistory]);

  const navigateUp = useCallback(() => {
    if (menuOpen) {
      setActiveMenuIndex(prev => Math.max(0, prev - 1));
    } else {
      const nextIndex = sectionIndex > 0 ? sectionIndex - 1 : SECTIONS.length - 1;
      const nextView = SECTIONS[nextIndex].view;
      if (nextView !== currentView) {
        setViewHistory(prev => [...prev, currentView]);
      }
      setCurrentView(SECTIONS[nextIndex].view);
      setSlideIndex(0);
    }
  }, [menuOpen, sectionIndex, currentView]);

  const navigateDown = useCallback(() => {
    if (menuOpen) {
      setActiveMenuIndex(prev => Math.min(SECTIONS.length - 1, prev + 1));
    } else {
      const nextIndex = sectionIndex < SECTIONS.length - 1 ? sectionIndex + 1 : 0;
      const nextView = SECTIONS[nextIndex].view;
      if (nextView !== currentView) {
        setViewHistory(prev => [...prev, currentView]);
      }
      setCurrentView(SECTIONS[nextIndex].view);
      setSlideIndex(0);
    }
  }, [menuOpen, sectionIndex, currentView]);

  const navigateLeft = useCallback((maxIndex = 0) => {
    setSlideIndex(prev => Math.max(0, prev - 1));
  }, []);

  const navigateRight = useCallback((maxIndex = Infinity) => {
    setSlideIndex(prev => Math.min(maxIndex, prev + 1));
  }, []);

  const toggleInfo = useCallback(() => {
    setShowInfo(prev => !prev);
  }, []);

  const openProjects = useCallback(() => {
    if (currentView !== 'projects') {
      setViewHistory(prev => [...prev, currentView]);
    }
    setCurrentView('projects');
    setSlideIndex(0);
    setMenuOpen(false);
  }, [currentView]);

  const displaySection = useMemo(() => {
    return VIEW_SOURCES[currentView] || 'HOME';
  }, [currentView]);

  return {
    currentView,
    currentSection,
    sectionIndex,
    menuOpen,
    activeMenuIndex,
    slideIndex,
    showInfo,
    viewHistory,
    displaySection,
    navigateToView,
    openMenu,
    closeMenu,
    selectFromMenu,
    goBack,
    navigateUp,
    navigateDown,
    navigateLeft,
    navigateRight,
    toggleInfo,
    openProjects,
    setSlideIndex,
    SECTIONS,
  };
}

export { SECTIONS };
