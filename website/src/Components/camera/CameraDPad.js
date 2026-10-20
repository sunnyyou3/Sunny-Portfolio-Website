import React from 'react';
import { Box } from '@mui/material';

/**
 * Directional pad (D-pad) with OK button in the center.
 * Up/Left/Right navigate sections or slides, Down navigates sections.
 * OK confirms selection.
 */
export default function CameraDPad({ onUp, onDown, onLeft, onRight, onOk }) {
  return (
    <Box
      sx={{
        position: 'relative',
        width: 140,
        height: 140,
      }}
    >
      {/* Outer ring */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(25,25,30,0.95) 0%, rgba(20,20,25,0.98) 100%)',
          border: '2px solid rgba(50,50,55,0.6)',
          boxShadow: '0 0 0 1px rgba(0,0,0,0.5), inset 0 1px 2px rgba(255,255,255,0.03)',
        }}
      />

      {/* Center OK button */}
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 44,
          height: 44,
          borderRadius: '50%',
          background: 'radial-gradient(circle at 40% 35%, rgba(55,55,60,0.95), rgba(35,35,40,0.98))',
          border: '2px solid rgba(70,70,75,0.7)',
          boxShadow: '0 0 0 1px rgba(0,0,0,0.4), inset 0 1px 3px rgba(255,255,255,0.06), 0 2px 6px rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 2,
        }}
        onClick={onOk}
        role="button"
        aria-label="OK - Confirm selection"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onOk?.(); } }}
      >
        <Box
          sx={{
            width: 28,
            height: 28,
            borderRadius: '50%',
            background: 'radial-gradient(circle at 40% 35%, rgba(65,65,70,0.9), rgba(45,45,50,0.95))',
            border: '1px solid rgba(80,80,85,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box
            sx={{
              width: 18,
              height: 18,
              borderRadius: '50%',
              background: 'radial-gradient(circle at 40% 35%, rgba(75,75,80,0.8), rgba(55,55,60,0.85))',
            }}
          />
        </Box>
      </Box>

      {/* Up button */}
      <Box
        sx={{
          position: 'absolute',
          top: 4,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 36,
          height: 36,
          borderRadius: '8px 8px 4px 4px',
          background: 'linear-gradient(180deg, rgba(40,40,45,0.9), rgba(30,30,35,0.95))',
          border: '1px solid rgba(60,60,65,0.5)',
          boxShadow: '0 2px 4px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 2,
        }}
        onClick={onUp}
        role="button"
        aria-label="Up - Navigate to previous section"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onUp?.(); } }}
      >
        <Box sx={{ color: 'rgba(246,244,239,0.6)', fontSize: 16 }}>▲</Box>
      </Box>

      {/* Down button */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 4,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 36,
          height: 36,
          borderRadius: '4px 4px 8px 8px',
          background: 'linear-gradient(0deg, rgba(40,40,45,0.9), rgba(30,30,35,0.95))',
          border: '1px solid rgba(60,60,65,0.5)',
          boxShadow: '0 -2px 4px rgba(0,0,0,0.4), inset 0 -1px 0 rgba(255,255,255,0.04)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 2,
        }}
        onClick={onDown}
        role="button"
        aria-label="Down - Navigate to next section"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onDown?.(); } }}
      >
        <Box sx={{ color: 'rgba(246,244,239,0.6)', fontSize: 16 }}>▼</Box>
      </Box>

      {/* Left button */}
      <Box
        sx={{
          position: 'absolute',
          left: 4,
          top: '50%',
          transform: 'translateY(-50%)',
          width: 36,
          height: 36,
          borderRadius: '8px 4px 4px 8px',
          background: 'linear-gradient(90deg, rgba(40,40,45,0.9), rgba(30,30,35,0.95))',
          border: '1px solid rgba(60,60,65,0.5)',
          boxShadow: '2px 0 4px rgba(0,0,0,0.4), inset 1px 0 0 rgba(255,255,255,0.04)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 2,
        }}
        onClick={onLeft}
        role="button"
        aria-label="Left - Previous slide"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onLeft?.(); } }}
      >
        <Box sx={{ color: 'rgba(246,244,239,0.6)', fontSize: 16 }}>◀</Box>
      </Box>

      {/* Right button */}
      <Box
        sx={{
          position: 'absolute',
          right: 4,
          top: '50%',
          transform: 'translateY(-50%)',
          width: 36,
          height: 36,
          borderRadius: '4px 8px 8px 4px',
          background: 'linear-gradient(270deg, rgba(40,40,45,0.9), rgba(30,30,35,0.95))',
          border: '1px solid rgba(60,60,65,0.5)',
          boxShadow: '-2px 0 4px rgba(0,0,0,0.4), inset -1px 0 0 rgba(255,255,255,0.04)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 2,
        }}
        onClick={onRight}
        role="button"
        aria-label="Right - Next slide"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onRight?.(); } }}
      >
        <Box sx={{ color: 'rgba(246,244,239,0.6)', fontSize: 16 }}>▶</Box>
      </Box>
    </Box>
  );
}
