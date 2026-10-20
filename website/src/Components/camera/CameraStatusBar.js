import React from 'react';
import { Box, Typography } from '@mui/material';

/**
 * Camera-style status bar shown at the top of the LCD.
 * Displays camera-like info: shutter speed, aperture, ISO, remaining shots, battery.
 */
export default function CameraStatusBar({ activeView, displayMode }) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        px: 1.5,
        py: 0.4,
        background: 'rgba(0,0,0,0.85)',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        minHeight: 24,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Typography
          variant="caption"
          sx={{
            fontFamily: 'monospace',
            fontSize: 10,
            color: '#e8b6a2',
            letterSpacing: 1,
          }}
        >
          {activeView.toUpperCase()}
        </Typography>
        <Typography
          variant="caption"
          sx={{
            fontFamily: 'monospace',
            fontSize: 9,
            color: displayMode === 'info' ? '#f1a17d' : 'rgba(246,244,239,0.5)',
          }}
        >
          {displayMode === 'info' ? '1/250' : '400'}
        </Typography>
        <Typography
          variant="caption"
          sx={{
            fontFamily: 'monospace',
            fontSize: 9,
            color: 'rgba(246,244,239,0.5)',
          }}
        >
          f/{displayMode === 'info' ? '2.8' : '5.6'}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography
          variant="caption"
          sx={{
            fontFamily: 'monospace',
            fontSize: 9,
            color: 'rgba(246,244,239,0.5)',
          }}
        >
          ISO {displayMode === 'info' ? '+1.0' : '400'}
        </Typography>
        <Typography
          variant="caption"
          sx={{
            fontFamily: 'monospace',
            fontSize: 9,
            color: 'rgba(246,244,239,0.5)',
          }}
        >
          AF-S
        </Typography>
        <Box
          sx={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: '#ff4444',
            boxShadow: '0 0 4px rgba(255,68,68,0.5)',
          }}
        />
      </Box>
    </Box>
  );
}
