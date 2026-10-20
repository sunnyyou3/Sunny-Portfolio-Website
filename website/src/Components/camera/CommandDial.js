import React from 'react';
import { Box } from '@mui/material';

/**
 * Command dial - the ridged wheel on the top-right of the camera.
 * Used for scrolling/projects navigation.
 */
export default function CommandDial({ onScroll }) {
  const handleWheel = (e) => {
    e.preventDefault();
    const direction = e.deltaY > 0 ? 1 : -1;
    onScroll?.(direction);
  };

  return (
    <Box
      onMouseWheel={handleWheel}
      role="button"
      aria-label="Command dial - Scroll through content"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
          e.preventDefault();
          onScroll?.(-1);
        } else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
          e.preventDefault();
          onScroll?.(1);
        }
      }}
      sx={{
        width: 56,
        height: 56,
        borderRadius: '50%',
        background: 'radial-gradient(circle at 40% 35%, rgba(50,50,55,0.95), rgba(30,30,35,0.98))',
        border: '2px solid rgba(70,70,75,0.6)',
        boxShadow: '0 2px 6px rgba(0,0,0,0.5), inset 0 1px 2px rgba(255,255,255,0.06)',
        cursor: 'pointer',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Ridged texture using conic gradient */}
      <Box
        sx={{
          position: 'absolute',
          inset: 3,
          borderRadius: '50%',
          background: `repeating-conic-gradient(
            from 0deg,
            rgba(60,60,65,0.3) 0deg,
            rgba(60,60,65,0.3) 3deg,
            transparent 3deg,
            transparent 6deg
          )`,
        }}
      />
      {/* Center dot */}
      <Box
        sx={{
          width: 12,
          height: 12,
          borderRadius: '50%',
          background: 'radial-gradient(circle at 40% 35%, rgba(70,70,75,0.8), rgba(50,50,55,0.9))',
          border: '1px solid rgba(80,80,85,0.4)',
        }}
      />
    </Box>
  );
}
