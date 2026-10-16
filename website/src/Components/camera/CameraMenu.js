import React from 'react';
import { Box, Typography } from '@mui/material';
import CameraButton from './CameraButton';

const CameraMenu = React.forwardRef(({
  sections,
  activeIndex,
  onSelect,
  onClose,
  onNavigateUp,
  onNavigateDown,
  sx: extraSx = {},
}, ref) => {
  // Handle keyboard navigation within the menu
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      onNavigateUp?.();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      onNavigateDown?.();
    }
  };
  return (
    <Box
      ref={ref}
      sx={{
        position: 'absolute',
        inset: 0,
        zIndex: 50,
        background: 'rgba(8,9,11,0.92)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        flexDirection: 'column',
        p: 2.5,
        ...extraSx,
      }}
      role="dialog"
      aria-label="Portfolio section menu"
    >
      <Box 
        sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        <Typography sx={{
          fontFamily: "'Bitcount Grid Single', monospace",
          fontSize: 11,
          color: '#e8b6a2',
          letterSpacing: 2,
        }}>
          MENU
        </Typography>
        <CameraButton
          label="EXIT"
          onClick={onClose}
          ariaLabel="Close menu"
          variant="small"
          size="small"
        />
      </Box>

      <Box 
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 0.5,
          flex: 1,
          justifyContent: 'center',
        }}
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        {sections.map((section, index) => (
          <Box
            key={section.label}
            onClick={() => onSelect(section)}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              px: 2,
              py: 1.5,
              borderRadius: 1,
              cursor: 'pointer',
              background: index === activeIndex
                ? 'rgba(232,182,162,0.15)'
                : 'transparent',
              border: index === activeIndex
                ? '1px solid rgba(232,182,162,0.3)'
                : '1px solid transparent',
              transition: 'all 0.15s ease',
              '&:hover': {
                background: 'rgba(255,255,255,0.05)',
              },
            }}
            role="option"
            aria-selected={index === activeIndex}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onSelect(section);
              }
            }}
          >
            <Typography sx={{
              fontFamily: "'Bitcount Grid Single', monospace",
              fontSize: 10,
              color: index === activeIndex ? '#e8b6a2' : 'rgba(246,244,239,0.5)',
              width: 32,
              textAlign: 'center',
            }}>
              {String(index + 1).padStart(2, '0')}
            </Typography>
            <Typography sx={{
              fontSize: 15,
              fontWeight: index === activeIndex ? 700 : 400,
              color: index === activeIndex ? '#f6f4ef' : 'rgba(246,244,239,0.7)',
            }}>
              {section.label}
            </Typography>
            {index === activeIndex && (
              <Box sx={{
                ml: 'auto',
                width: 8, height: 8, borderRadius: '50%',
                background: '#e8b6a2',
              }} />
            )}
          </Box>
        ))}
      </Box>

      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 1.5,
        pt: 2,
        borderTop: '1px solid rgba(255,255,255,0.08)',
      }}>
        <Typography sx={{
          fontFamily: "'Bitcount Grid Single', monospace",
          fontSize: 9,
          color: 'rgba(246,244,239,0.35)',
        }}>
          Use D-Pad to navigate · OK to select · BACK to exit
        </Typography>
      </Box>
    </Box>
  );
});

CameraMenu.displayName = 'CameraMenu';

export default CameraMenu;
