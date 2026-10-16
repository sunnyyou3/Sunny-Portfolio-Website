import React from 'react';
import { Box, Typography } from '@mui/material';
import CameraLCD from './CameraLCD';
import CameraControls from './CameraControls';

const CameraShell = React.forwardRef(({
  children,
  id,
  section,
  slideIndex,
  totalSlides,
  menuOpen,
  sections,
  activeMenuIndex,
  onMenuOpen,
  onMenuSelect,
  onMenuClose,
  onInfo,
  showInfo,
  onPlayback,
  onUp,
  onDown,
  onLeft,
  onRight,
  onBack,
  onMenuNavigateUp,
  onMenuNavigateDown,
  sx: extraSx = {},
}, ref) => {
  return (
    <Box
      ref={ref}
      id={id}
      sx={{
        position: 'relative',
        width: '100%',
        maxWidth: 1100,
        margin: '0 auto',
        ...extraSx,
      }}
    >
      {/* Camera body */}
      <Box sx={{
        position: 'relative',
        width: '100%',
        aspectRatio: '16 / 10',
        minHeight: 500,
        background: 'linear-gradient(160deg, #2a2a2e 0%, #1e1e22 40%, #18181c 100%)',
        borderRadius: 4,
        boxShadow: '0 8px 32px rgba(0,0,0,0.6), 0 2px 8px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)',
        display: 'flex',
        flexDirection: 'column',
        p: { xs: 1.5, sm: 2, md: 3 },
        gap: { xs: 1, sm: 1.5, md: 2 },
      }}>
        {/* Texture overlay */}
        <Box sx={{
          position: 'absolute', inset: 0, borderRadius: 4,
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.02) 2px, rgba(0,0,0,0.02) 4px)',
          pointerEvents: 'none',
          zIndex: 1,
        }} />

        {/* Top section: viewfinder + brand */}
        <Box sx={{
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 3,
          zIndex: 2,
        }}>
          {/* Viewfinder bump */}
          <Box sx={{
            position: 'absolute',
            top: -16,
            left: '50%',
            transform: 'translateX(-50%)',
            width: { xs: 80, sm: 100, md: 130 },
            height: 28,
            background: 'linear-gradient(180deg, #2e2e32, #222226)',
            borderRadius: '8px 8px 0 0',
            boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.03), 0 -2px 4px rgba(0,0,0,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            {/* Viewfinder eyecup */}
            <Box sx={{
              width: { xs: 50, sm: 60, md: 80 },
              height: 16,
              borderRadius: 2,
              background: '#111',
              border: '1px solid #333',
              boxShadow: 'inset 0 0 8px rgba(0,0,0,0.8)',
            }} />
          </Box>

          {/* Brand text */}
          <Typography sx={{
            fontFamily: "'Bitcount Grid Single', monospace",
            fontSize: { xs: 8, sm: 10, md: 12 },
            color: 'rgba(255,255,255,0.15)',
            letterSpacing: 3,
            zIndex: 2,
          }}>
            SUNNY DIGITAL
          </Typography>
        </Box>

        {/* Main area: LCD + controls */}
        <Box sx={{
          position: 'relative',
          flex: 1,
          display: 'flex',
          gap: { xs: 1, sm: 2, md: 3 },
          zIndex: 2,
          minHeight: 0,
        }}>
          {/* Grip area (left side) */}
          <Box sx={{
            display: { xs: 'none', md: 'flex' },
            flexDirection: 'column',
            justifyContent: 'center',
            width: { md: 60 },
            gap: 1,
            pr: 1,
          }}>
            {/* Grip texture */}
            <Box sx={{
              width: '100%',
              height: '100%',
              minHeight: 120,
              borderRadius: 3,
              background: 'linear-gradient(180deg, #242428, #1c1c20)',
              border: '1px solid rgba(60,60,64,0.4)',
              boxShadow: 'inset 0 0 20px rgba(0,0,0,0.3)',
              position: 'relative',
              overflow: 'hidden',
            }}>
              {/* Grip pattern */}
              <Box sx={{
                position: 'absolute', inset: 4,
                background: 'repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(0,0,0,0.08) 3px, rgba(0,0,0,0.08) 4px)',
              }} />
            </Box>
          </Box>

          {/* LCD Screen */}
          <Box sx={{
            flex: 1,
            minWidth: 0,
            aspectRatio: { xs: '4 / 3', sm: '16 / 10' },
            maxHeight: '100%',
          }}>
            <CameraLCD
              section={section}
              slideIndex={slideIndex}
              totalSlides={totalSlides}
              menuOpen={menuOpen}
              sections={sections}
              activeMenuIndex={activeMenuIndex}
              onMenuSelect={onMenuSelect}
              onMenuClose={onMenuClose}
              showInfo={showInfo}
              onMenuNavigateUp={onMenuNavigateUp}
              onMenuNavigateDown={onMenuNavigateDown}
            >
              {children}
            </CameraLCD>
          </Box>

          {/* Controls (right side) */}
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: { xs: 1, sm: 1.5, md: 2 },
            flexShrink: 0,
            width: { xs: 'auto', sm: 80, md: 100 },
          }}>
            <CameraControls
              onMenu={onMenuOpen}
              onInfo={onInfo}
              onPlayback={onPlayback}
              onBack={onBack}
              onUp={onUp}
              onDown={onDown}
              onLeft={onLeft}
              onRight={onRight}
              menuOpen={menuOpen}
            />
          </Box>
        </Box>

        {/* Bottom bar */}
        <Box sx={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          py: 0.5,
        }}>
          <Box sx={{
            display: 'flex',
            gap: 2,
            alignItems: 'center',
          }}>
            <Box sx={{
              width: 6, height: 6, borderRadius: '50%',
              background: '#333',
              border: '1px solid #444',
            }} />
            <Typography sx={{
              fontFamily: "'Bitcount Grid Single', monospace",
              fontSize: 8,
              color: 'rgba(255,255,255,0.1)',
              letterSpacing: 2,
            }}>
              DSLR-INSPIRED PORTFOLIO
            </Typography>
            <Box sx={{
              width: 6, height: 6, borderRadius: '50%',
              background: '#333',
              border: '1px solid #444',
            }} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
});

CameraShell.displayName = 'CameraShell';

export default CameraShell;
