import React from 'react';
import { Box } from '@mui/material';
import CameraDPad from './CameraDPad';
import CommandDial from './CommandDial';

/**
 * CameraControls component - coordinates all physical controls on the right side.
 * Includes: D-pad with OK, Command Dial, and status LED.
 */
export default function CameraControls({
  onUp,
  onDown,
  onLeft,
  onRight,
  onOk,
  onScroll,
}) {
  return (
    <Box
      sx={{
        position: 'absolute',
        right: 20,
        top: '50%',
        transform: 'translateY(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 3,
        zIndex: 20,
      }}
    >
      {/* Command Dial (top right) */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
        <CommandDial onScroll={onScroll} />
        <Box
          sx={{
            fontFamily: 'monospace',
            fontSize: 7,
            color: 'rgba(246,244,239,0.3)',
            letterSpacing: 1,
          }}
        >
          DIAL
        </Box>
      </Box>

      {/* D-Pad with OK in center */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
        <CameraDPad
          onUp={onUp}
          onDown={onDown}
          onLeft={onLeft}
          onRight={onRight}
          onOk={onOk}
        />
        <Box
          sx={{
            fontFamily: 'monospace',
            fontSize: 7,
            color: 'rgba(246,244,239,0.3)',
            letterSpacing: 1,
          }}
        >
          MULTI
        </Box>
      </Box>

      {/* Status LED */}
      <Box
        sx={{
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: '#4caf50',
          boxShadow: '0 0 6px rgba(76,175,80,0.6)',
        }}
        style={{ animation: 'pulse 2s ease-in-out infinite' }}
      />
    </Box>
  );
}
