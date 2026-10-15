import React from 'react';
import { Box } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import CameraShell from '../components/camera/CameraShell';
import ErrorBoundary from '../components/ErrorBoundary';
import { useCameraNavigation } from '../hooks/useCameraNavigation';
import {
  HomeView,
  ExperienceView,
  ProjectsView,
  GalleryView,
  AboutView,
  ContactView,
} from '../views';

const VIEW_COMPONENTS = {
  home: HomeView,
  experience: ExperienceView,
  projects: ProjectsView,
  gallery: GalleryView,
  about: AboutView,
  contact: ContactView,
};

const SLIDE_COUNTS = {
  home: 1,
  experience: 6,
  projects: 2,
  gallery: 9,
  about: 3,
  contact: 1,
};

export default function DSLRPortfolio() {
  const nav = useCameraNavigation('home');
  const ViewComponent = VIEW_COMPONENTS[nav.currentView];
  const totalSlides = Math.max(1, SLIDE_COUNTS[nav.currentView] || 1);

  // Keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (nav.menuOpen) {
        if (e.key === 'Escape') {
          nav.closeMenu();
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          nav.navigateUp();
        } else if (e.key === 'ArrowDown') {
          e.preventDefault();
          nav.navigateDown();
        } else if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const selected = nav.SECTIONS[nav.activeMenuIndex];
          if (selected) nav.selectFromMenu(selected);
        }
        return;
      }

      if (e.key === 'Escape' || e.key === 'b' || e.key === 'B') {
        nav.goBack();
      } else if (e.key === 'm' || e.key === 'M') {
        nav.openMenu();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        nav.navigateLeft();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        nav.navigateRight(totalSlides - 1);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        nav.navigateUp();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        nav.navigateDown();
      } else if (e.key === 'i' || e.key === 'I') {
        nav.toggleInfo();
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        // In gallery mode, OK could open project detail
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nav, totalSlides]);

  const handleMenuSelect = React.useCallback((section) => {
    nav.selectFromMenu(section);
  }, [nav]);

  const handleGoBack = React.useCallback(() => {
    nav.goBack();
  }, [nav]);

  const handleNavigateUp = React.useCallback(() => {
    nav.navigateUp();
  }, [nav]);

  const handleNavigateDown = React.useCallback(() => {
    nav.navigateDown();
  }, [nav]);

  const handleNavigateLeft = React.useCallback(() => {
    nav.navigateLeft();
  }, [nav]);

  const handleNavigateRight = React.useCallback(() => {
    nav.navigateRight(totalSlides - 1);
  }, [nav, totalSlides]);

  const handleToggleInfo = React.useCallback(() => {
    nav.toggleInfo();
  }, [nav]);

  const handleOpenProjects = React.useCallback(() => {
    nav.openProjects();
  }, [nav]);

  const handleMenuNavigateUp = React.useCallback(() => {
    nav.navigateUp();
  }, [nav]);

  const handleMenuNavigateDown = React.useCallback(() => {
    nav.navigateDown();
  }, [nav]);

  return (
    <Box sx={{
      width: '100vw',
      height: '100vh',
      backgroundColor: '#0a0a0e',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      p: { xs: 1, sm: 2, md: 3 },
      gap: { xs: 1, sm: 1.5, md: 2 },
    }}>
      {/* Skip to content link for keyboard users */}
      <Box
        component="a"
        href="#lcd-content"
        sx={{
          position: 'absolute',
          top: -40,
          left: 16,
          zIndex: 100,
          color: '#e8b6a2',
          fontFamily: "'Bitcount Grid Single', monospace",
          fontSize: 12,
          textDecoration: 'none',
          padding: '8px 16px',
          background: '#1a1a1e',
          border: '1px solid #e8b6a2',
          borderRadius: 1,
          '&:focus': {
            top: 8,
            outline: '2px solid #e8b6a2',
            outlineOffset: 2,
          },
        }}
      >
        Skip to content
      </Box>
      {/* Camera Shell with LCD */}
      <ErrorBoundary>
        <CameraShell
        id="lcd-content"
        tabIndex={-1}
        section={nav.displaySection}
        slideIndex={nav.slideIndex}
        totalSlides={totalSlides}
        menuOpen={nav.menuOpen}
        sections={nav.SECTIONS}
        activeMenuIndex={nav.activeMenuIndex}
        onMenuOpen={nav.openMenu}
        onMenuSelect={handleMenuSelect}
        onMenuClose={handleGoBack}
        onInfo={handleToggleInfo}
        showInfo={nav.showInfo}
        onPlayback={handleOpenProjects}
        onUp={handleNavigateUp}
        onDown={handleNavigateDown}
        onLeft={handleNavigateLeft}
        onRight={handleNavigateRight}
        onBack={handleGoBack}
        onMenuNavigateUp={handleMenuNavigateUp}
        onMenuNavigateDown={handleMenuNavigateDown}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={nav.currentView}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            style={{ width: '100%', height: '100%' }}
          >
            {ViewComponent && <ViewComponent />}
          </motion.div>
        </AnimatePresence>
      </CameraShell>
      </ErrorBoundary>

      {/* Keyboard hints */}
      <Box sx={{
        display: 'flex',
        gap: 2,
        flexWrap: 'wrap',
        justifyContent: 'center',
        px: 2,
        opacity: 0.3,
      }}>
        <Box sx={{
          display: 'flex', alignItems: 'center', gap: 0.5,
          fontFamily: "'Bitcount Grid Single', monospace",
          fontSize: 9,
          color: '#888',
        }}>
          <Box sx={{
            px: 0.5, py: 0.25, borderRadius: 0.5,
            border: '1px solid #555', fontSize: 8,
          }}>M</Box>
          MENU
        </Box>
        <Box sx={{
          display: 'flex', alignItems: 'center', gap: 0.5,
          fontFamily: "'Bitcount Grid Single', monospace",
          fontSize: 9,
          color: '#888',
        }}>
          <Box sx={{
            px: 0.5, py: 0.25, borderRadius: 0.5,
            border: '1px solid #555', fontSize: 8,
          }}>ESC</Box>
          BACK
        </Box>
        <Box sx={{
          display: 'flex', alignItems: 'center', gap: 0.5,
          fontFamily: "'Bitcount Grid Single', monospace",
          fontSize: 9,
          color: '#888',
        }}>
          <Box sx={{
            px: 0.5, py: 0.25, borderRadius: 0.5,
            border: '1px solid #555', fontSize: 8,
          }}>←→</Box>
          SLIDE
        </Box>
        <Box sx={{
          display: 'flex', alignItems: 'center', gap: 0.5,
          fontFamily: "'Bitcount Grid Single', monospace",
          fontSize: 9,
          color: '#888',
        }}>
          <Box sx={{
            px: 0.5, py: 0.25, borderRadius: 0.5,
            border: '1px solid #555', fontSize: 8,
          }}>↑↓</Box>
          SECTION
        </Box>
      </Box>
    </Box>
  );
}
