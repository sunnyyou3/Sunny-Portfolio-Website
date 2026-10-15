import React from 'react';
import { Box } from '@mui/material';
import CameraButton from './CameraButton';

const CameraControls = React.memo(React.forwardRef(({
  onMenu,
  onInfo,
  onPlayback,
  onBack,
  onUp,
  onDown,
  onLeft,
  onRight,
  menuOpen,
  sx: extraSx = {},
}, ref) => {
  return (
    <Box
      ref={ref}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        ...extraSx,
      }}
    >
      {/* Top row of buttons */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
        <CameraButton
          label="MENU"
          onClick={onMenu}
          ariaLabel="Open section menu"
          variant="small"
          size="small"
        />
        <CameraButton
          label="INFO"
          onClick={onInfo}
          ariaLabel="Toggle info display"
          variant="small"
          size="small"
        />
      </Box>

      {/* Playback button */}
      <CameraButton
        label="PLAY"
        onClick={onPlayback}
        ariaLabel="Open projects gallery"
        variant="small"
        size="small"
      />

      {/* D-Pad */}
      <Box sx={{ position: 'relative', width: 56, height: 56 }}>
        <Box sx={{
          position: 'absolute', inset: 0,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gridTemplateRows: '1fr 1fr 1fr',
        }}>
          {/* Up */}
          <Box sx={{ gridColumn: 2, gridRow: 1 }}>
            <CameraButton
              label=""
              onClick={onUp}
              ariaLabel="Navigate up - previous section"
              variant="dpad"
              size="large"
              sx={{ width: 20, height: 20 }}
            >
              ▲
            </CameraButton>
          </Box>
          {/* Left */}
          <Box sx={{ gridColumn: 1, gridRow: 2 }}>
            <CameraButton
              label=""
              onClick={onLeft}
              ariaLabel="Navigate left - previous slide"
              variant="dpad"
              size="large"
              sx={{ width: 20, height: 20 }}
            >
              ◀
            </CameraButton>
          </Box>
          {/* Center - OK */}
          <Box sx={{ gridColumn: 2, gridRow: 2 }}>
            <CameraButton
              label="OK"
              ariaLabel="Confirm selection"
              variant="dpad"
              size="large"
              sx={{
                width: 20, height: 20,
                borderRadius: '50%',
                background: 'linear-gradient(145deg, #333, #222)',
                border: '1px solid rgba(60,60,64,0.6)',
                color: '#888',
                fontSize: 7,
                fontWeight: 700,
              }}
            />
          </Box>
          {/* Right */}
          <Box sx={{ gridColumn: 3, gridRow: 2 }}>
            <CameraButton
              label=""
              onClick={onRight}
              ariaLabel="Navigate right - next slide"
              variant="dpad"
              size="large"
              sx={{ width: 20, height: 20 }}
            >
              ▶
            </CameraButton>
          </Box>
          {/* Down */}
          <Box sx={{ gridColumn: 2, gridRow: 3 }}>
            <CameraButton
              label=""
              onClick={onDown}
              ariaLabel="Navigate down - next section"
              variant="dpad"
              size="large"
              sx={{ width: 20, height: 20 }}
            >
              ▼
            </CameraButton>
          </Box>
        </Box>
      </Box>

      {/* Right side buttons */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
        <CameraButton
          label="BACK"
          onClick={onBack}
          ariaLabel="Go back - close menu or return"
          variant="small"
          size="small"
        />
        <CameraButton
          label="REC"
          onClick={() => {}}
          ariaLabel="Record (not available)"
          variant="record"
          size="small"
          disabled
        />
      </Box>
    </Box>
  );
}));

CameraControls.displayName = 'CameraControls';

export default CameraControls;
