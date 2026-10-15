import React from 'react';
import { Box, Typography } from '@mui/material';

const CameraStatusBar = React.memo(React.forwardRef(({
  section,
  slideIndex,
  totalSlides,
  showInfo = false,
  batteryLevel = 85,
  sx: extraSx = {},
}, ref) => {
  const [time, setTime] = React.useState(() => {
    const now = new Date();
    return now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
  });

  React.useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }));
    }, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      ref={ref}
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        px: 2,
        py: 0.75,
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        background: 'rgba(0,0,0,0.35)',
        fontFamily: "'Bitcount Grid Single', monospace",
        fontSize: 10,
        color: 'rgba(246,244,239,0.6)',
        letterSpacing: 0.5,
        ...extraSx,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Typography sx={{ color: '#e8b6a2', fontWeight: 600 }}>
          {section?.toUpperCase() || 'HOME'}
        </Typography>
        {totalSlides > 0 && (
          <Typography sx={{ color: 'rgba(246,244,239,0.45)' }}>
            {String(slideIndex + 1).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}
          </Typography>
        )}
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        {showInfo && (
          <Typography sx={{ color: 'rgba(246,244,239,0.45)' }}>
            INFO
          </Typography>
        )}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Box sx={{
            width: 16, height: 7, borderRadius: 1,
            border: '1px solid rgba(246,244,239,0.4)',
            position: 'relative', overflow: 'hidden',
          }}>
            <Box sx={{
              position: 'absolute', left: 0, top: 0, bottom: 0,
              width: `${batteryLevel}%`,
              background: batteryLevel > 30 ? '#4caf50' : '#ff9800',
            }} />
          </Box>
          <Typography>{batteryLevel}%</Typography>
        </Box>
        <Typography>{time}</Typography>
      </Box>
    </Box>
  );
}));

CameraStatusBar.displayName = 'CameraStatusBar';

export default CameraStatusBar;
