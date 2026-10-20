import React, { useState, forwardRef } from 'react';
import { Box, Typography } from '@mui/material';

/**
 * Reusable physical camera button component.
 * Renders a realistic button with label and interaction states.
 */
const CameraButton = forwardRef(({
  label,
  onClick,
  ariaLabel,
  size = 'medium',
  variant = 'round',
  accent = false,
  icon,
  ...rest
}, ref) => {
  const [pressed, setPressed] = useState(false);
  const [hovered, setHovered] = useState(false);

  const isSmall = size === 'small';
  const isLarge = size === 'large';

  const baseSize = isSmall ? 32 : isLarge ? 48 : 40;
  const labelSize = isSmall ? 8 : isLarge ? 11 : 9;

  const buttonStyle = {
    width: variant === 'round' ? baseSize : baseSize * 1.6,
    height: variant === 'round' ? baseSize : baseSize * 0.7,
    borderRadius: variant === 'round' ? '50%' : '4px',
    background: pressed
      ? 'rgba(40,40,45,0.95)'
      : hovered
        ? 'rgba(50,50,55,0.9)'
        : 'rgba(30,30,35,0.85)',
    border: accent
      ? '2px solid rgba(200,60,60,0.7)'
      : hovered
        ? '1px solid rgba(100,100,110,0.6)'
        : '1px solid rgba(60,60,65,0.5)',
    boxShadow: pressed
      ? 'inset 0 2px 4px rgba(0,0,0,0.6), 0 1px 1px rgba(0,0,0,0.3)'
      : '0 2px 4px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: isSmall ? 0 : 1,
    transition: 'all 100ms ease',
    userSelect: 'none',
    position: 'relative',
    outline: 'none',
    ...rest.style,
  };

  const handleMouseDown = () => setPressed(true);
  const handleMouseUp = () => { setPressed(false); onClick?.(); };
  const handleMouseLeave = () => { setPressed(false); setHovered(false); };

  return (
    <Box
      ref={ref}
      role="button"
      aria-label={ariaLabel || label}
      tabIndex={0}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick?.(); } }}
      sx={buttonStyle}
    >
      {icon && (
        <Box sx={{ color: accent ? '#e8a0a0' : 'rgba(246,244,239,0.85)', fontSize: labelSize * 1.3 }}>
          {icon}
        </Box>
      )}
      {label && (
        <Typography
          variant="caption"
          sx={{
            fontFamily: 'monospace',
            fontSize: labelSize,
            color: accent ? '#e8a0a0' : 'rgba(246,244,239,0.7)',
            letterSpacing: 0.5,
            lineHeight: 1,
            mt: isSmall ? 0 : 0.2,
          }}
        >
          {label}
        </Typography>
      )}
    </Box>
  );
});

CameraButton.displayName = 'CameraButton';

export default CameraButton;
