import React, { useEffect, useState } from 'react';
import { Box, Chip } from '@mui/material';
import useCameraThemeHook from '../components/CameraAssembly/useCameraThemeHooks';
import { Camera3DScene } from '../components/camera/Camera3DScene';

const sections = [
  { id: 'gallery', label: 'Gallery', content: 'Photo Gallery Section' },
  { id: 'projects', label: 'Projects', content: 'Projects Section' },
  {
    id: 'experience',
    label: 'Experience',
    content: 'Experience Section',
  },
  { id: 'home', label: 'Home', content: 'Home Section' },
];

export default function Main() {
  const {
    assembled,
    lcdTab,
    isSpinning,
    setLcdTab,
    startSpin,
    stopSpin,
    resetSession,
  } = useCameraThemeHook();

  const [activeSection, setActiveSection] = useState(
    lcdTab || 'gallery'
  );
  const [isScrolled, setIsScrolled] = useState(false);

  // Keep the active section and LCD tab synchronized.
  const handleTabChange = (tab) => {
    const validTabs = sections.map((section) => section.id);

    if (!validTabs.includes(tab)) return;

    setLcdTab(tab);
    setActiveSection(tab);
  };

  // Track scrolling and update the overlay visibility.
  useEffect(() => {
    let scrollTimeout;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Stop the spin after scrolling settles.
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        stopSpin();
      }, 180);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [stopSpin]);

  // Start spinning when the camera is assembled and scrolling begins.
  useEffect(() => {
    if (!assembled) return undefined;

    let scrollTimeout;

    const handleScroll = () => {
      if (!isSpinning) {
        startSpin();
      }

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        stopSpin();
      }, 180);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [assembled, isSpinning, startSpin, stopSpin]);

  // Reset the session only when ?debug is present.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (params.has('debug')) {
      resetSession();
    }
  }, [resetSession]);

  const chipStyles = (tab, selectedColor) => ({
    backgroundColor:
      lcdTab === tab ? selectedColor : 'rgba(255,255,255,0.16)',
    color:
      lcdTab === tab ? '#111217' : 'rgba(246,244,239,0.85)',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'background-color 0.25s ease, color 0.25s ease',
    '&:hover': {
      backgroundColor:
        lcdTab === tab ? selectedColor : 'rgba(255,255,255,0.28)',
    },
  });

  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#050508',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      {/* 3D camera scene */}
      <Box
        sx={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          inset: 0,
          zIndex: 0,
        }}
      >
        <Camera3DScene
          activeView={activeSection}
          lcdContent={true}
          onViewChange={handleTabChange}
          sections={sections}
        />
      </Box>

      {/* Navigation controls */}
      <Box
        sx={{
          pointerEvents: 'auto',
          opacity: isScrolled ? 1 : 0.85,
          transition: 'opacity 0.5s ease',
          position: 'absolute',
          bottom: 20,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 1.5,
          zIndex: 10,
          width: 'max-content',
          maxWidth: '95%',
        }}
      >
        <Chip
          label="GALLERY"
          onClick={() => handleTabChange('gallery')}
          sx={chipStyles('gallery', '#e4c28f')}
        />

        <Chip
          label="PROJECTS"
          onClick={() => handleTabChange('projects')}
          sx={chipStyles('projects', '#a9d6b7')}
        />

        <Chip
          label="EXPERIENCE"
          onClick={() => handleTabChange('experience')}
          sx={chipStyles('experience', '#11d4e6')}
        />

        <Chip
          label="HOME"
          onClick={() => handleTabChange('home')}
          sx={chipStyles('home', '#d2b5ff')}
        />

        <Chip
          label="SHUTTER"
          onClick={() => {
            // Connect this to the actual shutter handler when available.
            console.log('Shutter button clicked!');
          }}
          sx={{
            ...chipStyles('gallery', '#f6f4ef'),
            backgroundColor: 'rgba(255,255,255,0.16)',
            color: '#f6f4ef',
            '&:hover': {
              backgroundColor: 'rgba(255,255,255,0.3)',
            },
          }}
        />
      </Box>
    </Box>
  );
}