import React from 'react';
import { Box } from '@mui/material';
import CameraStatusBar from './CameraStatusBar';
import CameraMenu from './CameraMenu';

const CameraLCD = React.forwardRef(({
  children,
  section,
  slideIndex,
  totalSlides,
  menuOpen,
  sections,
  activeMenuIndex,
  onMenuSelect,
  onMenuClose,
  showInfo,
  onMenuNavigateUp,
  onMenuNavigateDown,
  sx: extraSx = {},
}, ref) => {
  return (
    <Box
      ref={ref}
      sx={{
        position: 'relative',
        width: '100%',
        height: '100%',
        borderRadius: 2,
        overflow: 'hidden',
        background: '#000',
        border: '3px solid #1a1a1e',
        boxShadow: 'inset 0 0 30px rgba(0,0,0,0.5), 0 0 8px rgba(0,0,0,0.8)',
        ...extraSx,
      }}
    >
      {/* Screen glare effect */}
      <Box sx={{
        position: 'absolute',
        top: 0, right: 0,
        width: '60%', height: '40%',
        background: 'radial-gradient(ellipse at top right, rgba(255,255,255,0.03) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 20,
      }} />

      {/* Status bar */}
      <CameraStatusBar
        section={section}
        slideIndex={slideIndex}
        totalSlides={totalSlides}
        showInfo={showInfo}
      />

      {/* Content area */}
      <Box sx={{
        position: 'relative',
        width: '100%',
        height: 'calc(100% - 32px)',
        overflow: 'auto',
        '&::-webkit-scrollbar': { width: 4 },
        '&::-webkit-scrollbar-track': { background: 'rgba(0,0,0,0.3)' },
        '&::-webkit-scrollbar-thumb': { background: 'rgba(255,255,255,0.15)', borderRadius: 2 },
      }}>
        {children}
      </Box>

      {/* Menu overlay */}
      {menuOpen && (
        <CameraMenu
          sections={sections}
          activeIndex={activeMenuIndex}
          onSelect={onMenuSelect}
          onClose={onMenuClose}
          onNavigateUp={onMenuNavigateUp}
          onNavigateDown={onMenuNavigateDown}
        />
      )}
    </Box>
  );
});

CameraLCD.displayName = 'CameraLCD';

export default CameraLCD;
