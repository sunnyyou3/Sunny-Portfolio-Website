import React from 'react';
import { Box } from '@mui/material';

const CameraButton = React.memo(React.forwardRef(({
  label,
  onClick,
  ariaLabel,
  variant = 'default',
  active = false,
  disabled = false,
  size = 'default',
  sx: extraSx = {},
  children,
  ...rest
}, ref) => {
  const [pressed, setPressed] = React.useState(false);
  const [hovered, setHovered] = React.useState(false);
  // aria-pressed reflects logical active state, not transient mouse press

  const isSmall = variant === 'small';
  const isDpad = variant === 'dpad';
  const isRecord = variant === 'record';

  const baseSx = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: disabled ? 'default' : 'pointer',
    userSelect: 'none',
    transition: 'all 0.1s ease',
    position: 'relative',
    outline: 'none',
    '&:focus-visible': {
      boxShadow: '0 0 0 2px rgba(255,255,255,0.6)',
    },
    ...extraSx,
  };

  const variantSx = isDpad
    ? {
        width: size === 'large' ? 56 : 48,
        height: size === 'large' ? 56 : 48,
        borderRadius: '50%',
        background: pressed
          ? 'linear-gradient(145deg, #2a2a2e, #1a1a1e)'
          : 'linear-gradient(145deg, #3a3a3e, #252528)',
        border: '1px solid rgba(60,60,64,0.8)',
        boxShadow: pressed
          ? 'inset 0 2px 4px rgba(0,0,0,0.6), 0 1px 2px rgba(0,0,0,0.3)'
          : '0 2px 4px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)',
        color: active ? '#e8b6a2' : '#888',
        fontSize: isSmall ? 10 : 13,
        fontWeight: 600,
      }
    : isRecord
      ? {
          width: size === 'large' ? 48 : 40,
          height: size === 'large' ? 48 : 40,
          borderRadius: '50%',
          background: pressed
            ? 'linear-gradient(145deg, #8b0000, #5a0000)'
            : 'linear-gradient(145deg, #c41e1e, #8b0000)',
          border: '2px solid rgba(200,50,50,0.6)',
          boxShadow: pressed
            ? 'inset 0 2px 4px rgba(0,0,0,0.5), 0 1px 2px rgba(0,0,0,0.3)'
            : '0 2px 4px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.15)',
          color: '#fff',
          fontSize: isSmall ? 8 : 10,
          fontWeight: 700,
        }
      : {
          width: size === 'large' ? 52 : 44,
          height: size === 'large' ? 32 : 26,
          borderRadius: 3,
          background: pressed
            ? 'linear-gradient(145deg, #2a2a2e, #1a1a1e)'
            : hovered
              ? 'linear-gradient(145deg, #404044, #2e2e32)'
              : 'linear-gradient(145deg, #3a3a3e, #252528)',
          border: '1px solid rgba(60,60,64,0.8)',
          boxShadow: pressed
            ? 'inset 0 2px 4px rgba(0,0,0,0.6), 0 1px 2px rgba(0,0,0,0.3)'
            : '0 2px 4px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)',
          color: active ? '#e8b6a2' : disabled ? '#555' : '#aaa',
          fontSize: isSmall ? 9 : 11,
          fontWeight: 600,
          letterSpacing: 0.5,
          textTransform: 'uppercase',
        };

  const labelSx = {
    position: 'absolute',
    bottom: -14,
    left: '50%',
    transform: 'translateX(-50%)',
    fontSize: 9,
    color: '#666',
    fontFamily: "'Bitcount Grid Single', monospace",
    letterSpacing: 1,
    whiteSpace: 'nowrap',
    pointerEvents: 'none',
  };

  return (
    <Box
      ref={ref}
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-label={ariaLabel || label}
      aria-pressed={active}
      onClick={!disabled ? onClick : undefined}
      onKeyDown={(e) => {
        if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick?.(e);
        }
      }}
      onMouseDown={() => !disabled && setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => {
        setPressed(false);
        setHovered(false);
      }}
      sx={{ ...baseSx, ...variantSx }}
      {...rest}
    >
      {children || label}
      {label && variant !== 'record' && (
        <Box sx={labelSx}>{label}</Box>
      )}
    </Box>
  );
}));

CameraButton.displayName = 'CameraButton';

export default CameraButton;
