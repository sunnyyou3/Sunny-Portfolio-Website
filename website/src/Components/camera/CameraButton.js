import React from 'react';
import { Button, styled, Typography, Box } from '@mui/material';

const PhysicalButton = styled(Button)(({ variant }) => ({
    width: variant === 'wide' ? 'clamp(44px, 5vw, 60px)' : 'clamp(32px, 3.8vw, 44px)',
    height: variant === 'tall' ? 'clamp(44px, 5vw, 60px)' : 'clamp(32px, 3.8vw, 44px)',
    borderRadius: variant === 'round' ? '50%' : '4px',
    background: 'linear-gradient(145deg, #222 0%, #181818 100%)',
    boxShadow: `
        0 2px 4px rgba(0,0,0,0.5),
        inset 0 1px 0 rgba(255,255,255,0.06),
        inset 0 -1px 0 rgba(0,0,0,0.3)
    `,
    border: '1px solid rgba(255,255,255,0.08)',
    color: 'rgba(255,255,255,0.85)',
    fontSize: 'clamp(7px, 0.9vw, 10px)',
    fontFamily: "'Bitcount Grid Single', monospace",
    letterSpacing: '0.5px',
    textTransform: 'none',
    padding: '2px 4px',
    transition: 'all 0.15s ease',
    '&:hover': {
        background: 'linear-gradient(145deg, #2a2a2a 0%, #202020 100%)',
        boxShadow: `
            0 2px 6px rgba(0,0,0,0.6),
            inset 0 1px 0 rgba(255,255,255,0.08),
            0 0 8px rgba(100,150,255,0.1)
        `,
    },
    '&:active': {
        background: 'linear-gradient(145deg, #1a1a1a 0%, #141414 100%)',
        boxShadow: `
            inset 0 2px 4px rgba(0,0,0,0.5),
            0 1px 2px rgba(0,0,0,0.3)
        `,
        transform: 'translateY(1px)',
    },
    '&.Mui-focusVisible': {
        outline: '2px solid rgba(100,150,255,0.6)',
        outlineOffset: '2px',
    },
    '&.Mui-disabled': {
        opacity: 0.4,
    },
}));

const ButtonLabel = styled(Typography)(({ theme }) => ({
    fontSize: 'clamp(6px, 0.7vw, 8px)',
    color: 'rgba(255,255,255,0.45)',
    textAlign: 'center',
    marginTop: '1px',
    fontFamily: "'Bitcount Grid Single', monospace",
    letterSpacing: '0.3px',
}));

export function CameraButton({ 
    label, 
    icon, 
    variant = 'normal', 
    active = false, 
    onClick, 
    disabled = false,
    'aria-label': ariaLabel,
}) {
    const labelStyle = variant === 'round' ? { fontSize: 'clamp(10px, 1.3vw, 16px)' } : {};
    
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
            <PhysicalButton
                variant="contained"
                onClick={onClick}
                disabled={disabled}
                aria-label={ariaLabel || label}
                sx={{ ...labelStyle, ...(active ? { 
                    background: 'linear-gradient(145deg, #2a2a2a 0%, #1e1e1e 100%)',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.08), 0 0 8px rgba(100,150,255,0.1)'
                } : {}) }}
            >
                {icon || label}
            </PhysicalButton>
            {label && variant !== 'round' && (
                <ButtonLabel>{label}</ButtonLabel>
            )}
        </Box>
    );
}

// Directional pad component
export function DirectionalPad({ 
    onUp, onDown, onLeft, onRight, onOk, 
    selectedIndex, currentIndex, 
    active = false 
}) {
    const isHighlighted = (dir) => {
        if (!active) return false;
        if (dir === 'ok') return selectedIndex === currentIndex;
        return false;
    };

    const buttonSize = 'clamp(28px, 3.5vw, 40px)';
    const gap = 'clamp(2px, 0.4vw, 4px)';

    return (
        <Box sx={{
            display: 'grid',
            gridTemplateColumns: `${buttonSize} ${buttonSize} ${buttonSize}`,
            gridTemplateRows: `${buttonSize} ${buttonSize} ${buttonSize}`,
            gap,
            position: 'relative',
        }}>
            {/* Up */}
            <Box sx={{ gridColumn: 2, gridRow: 1 }}>
                <PhysicalButton
                    variant="contained"
                    onClick={onUp}
                    aria-label="Navigate up"
                    sx={{ borderRadius: '4px 4px 2px 2px', fontSize: 'clamp(9px, 1.2vw, 14px)' }}
                >
                    ▲
                </PhysicalButton>
            </Box>
            {/* Left */}
            <Box sx={{ gridColumn: 1, gridRow: 2 }}>
                <PhysicalButton
                    variant="contained"
                    onClick={onLeft}
                    aria-label="Navigate left"
                    sx={{ borderRadius: '4px 2px 2px 4px', fontSize: 'clamp(9px, 1.2vw, 14px)' }}
                >
                    ◀
                </PhysicalButton>
            </Box>
            {/* Center (OK) */}
            <Box sx={{ gridColumn: 2, gridRow: 2 }}>
                <PhysicalButton
                    variant="contained"
                    onClick={onOk}
                    aria-label="Confirm selection"
                    sx={{ 
                        borderRadius: '50%', 
                        background: isHighlighted('ok')
                            ? 'linear-gradient(145deg, #2a3a4a 0%, #1e2a3a 100%)'
                            : 'linear-gradient(145deg, #2a2a2a 0%, #1e1e1e 100%)',
                        border: isHighlighted('ok') 
                            ? '1px solid rgba(100,150,255,0.3)' 
                            : '1px solid rgba(255,255,255,0.08)',
                        boxShadow: isHighlighted('ok')
                            ? '0 0 10px rgba(100,150,255,0.2), 0 2px 4px rgba(0,0,0,0.5)'
                            : '0 2px 4px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)',
                    }}
                >
                    <Box sx={{ 
                        fontSize: 'clamp(7px, 0.8vw, 9px)', 
                        color: isHighlighted('ok') ? 'rgba(150,180,255,0.9)' : 'rgba(255,255,255,0.6)',
                        textAlign: 'center',
                        lineHeight: 1,
                    }}>
                        OK
                    </Box>
                </PhysicalButton>
            </Box>
            {/* Right */}
            <Box sx={{ gridColumn: 3, gridRow: 2 }}>
                <PhysicalButton
                    variant="contained"
                    onClick={onRight}
                    aria-label="Navigate right"
                    sx={{ borderRadius: '2px 4px 4px 2px', fontSize: 'clamp(9px, 1.2vw, 14px)' }}
                >
                    ▶
                </PhysicalButton>
            </Box>
            {/* Down */}
            <Box sx={{ gridColumn: 2, gridRow: 3 }}>
                <PhysicalButton
                    variant="contained"
                    onClick={onDown}
                    aria-label="Navigate down"
                    sx={{ borderRadius: '2px 2px 4px 4px', fontSize: 'clamp(9px, 1.2vw, 14px)' }}
                >
                    ▼
                </PhysicalButton>
            </Box>
        </Box>
    );
}

// Command dial - triggers callback on click to simulate rotation
export function CommandDial({ onRotate, value = 0 }) {
    return (
        <Box sx={{
            width: 'clamp(36px, 4.5vw, 52px)',
            height: 'clamp(36px, 4.5vw, 52px)',
            borderRadius: '50%',
            background: `
                radial-gradient(circle at center, #1a1a1a 0%, #111 60%, #0a0a0a 100%),
                repeating-conic-gradient(from 0deg, #222 0deg 3deg, #1a1a1a 3deg 6deg)
            `,
            border: '2px solid #333',
            boxShadow: `
                0 2px 6px rgba(0,0,0,0.6),
                inset 0 1px 2px rgba(255,255,255,0.05),
                inset 0 -1px 2px rgba(0,0,0,0.4)
            `,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            position: 'relative',
            transform: `rotate(${value * 30}deg)`,
            transition: 'transform 0.2s ease',
            '&::before': {
                content: '""',
                width: '60%',
                height: '60%',
                borderRadius: '50%',
                background: 'radial-gradient(circle, #222 0%, #1a1a1a 100%)',
                border: '1px solid #333',
            },
            '&:active': {
                transform: `rotate(${value * 30 + 5}deg)`,
            },
        }}
            onClick={() => onRotate && onRotate(1)}
            aria-label="Command dial - click to rotate"
            role="button"
        >
            <Box sx={{
                position: 'absolute',
                top: '-4px',
                width: '2px',
                height: '8px',
                background: '#555',
                borderRadius: '1px',
            }} />
        </Box>
    );
}
