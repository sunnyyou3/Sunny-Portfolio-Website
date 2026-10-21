import React from 'react';
import { Box, styled } from '@mui/material';

const CameraBody = styled(Box)(({ theme }) => ({
    position: 'relative',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#0a0a0a',
    overflow: 'hidden',
    fontFamily: "'Bitcount Grid Single', monospace",
}));

const BodyShape = styled(Box)(({ theme }) => ({
    position: 'relative',
    width: 'min(92vw, 1100px)',
    height: 'min(88vh, 700px)',
    background: 'linear-gradient(145deg, #1a1a1a 0%, #111111 50%, #0d0d0d 100%)',
    borderRadius: '18px',
    boxShadow: `
        0 25px 80px rgba(0,0,0,0.8),
        0 8px 30px rgba(0,0,0,0.6),
        inset 0 1px 0 rgba(255,255,255,0.06),
        inset 0 -1px 0 rgba(0,0,0,0.4)
    `,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    '&::before': {
        content: '""',
        position: 'absolute',
        inset: 0,
        borderRadius: '18px',
        background: `
            repeating-linear-gradient(
                90deg,
                transparent,
                transparent 2px,
                rgba(255,255,255,0.008) 2px,
                rgba(255,255,255,0.008) 4px
            )
        `,
        pointerEvents: 'none',
        zIndex: 1,
    },
    '&::after': {
        content: '""',
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: '35%',
        background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.3))',
        pointerEvents: 'none',
        zIndex: 1,
    },
}));

// Right grip area
const GripArea = styled(Box)(({ theme }) => ({
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: 'clamp(80px, 12vw, 140px)',
    background: `
        linear-gradient(90deg, 
            transparent 0%, 
            rgba(0,0,0,0.3) 15%,
            rgba(0,0,0,0.5) 40%,
            rgba(0,0,0,0.6) 100%
        ),
        repeating-linear-gradient(
            0deg,
            rgba(0,0,0,0.15) 0px,
            rgba(0,0,0,0.15) 1px,
            transparent 1px,
            transparent 3px
        )
    `,
    borderRadius: '0 18px 18px 0',
    zIndex: 2,
}));

// Viewfinder housing
const ViewfinderHousing = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    width: 'clamp(120px, 18vw, 180px)',
    height: 'clamp(30px, 5vh, 50px)',
    background: 'linear-gradient(180deg, #222 0%, #1a1a1a 100%)',
    borderRadius: '8px 8px 0 0',
    boxShadow: '0 -2px 8px rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 3,
}));

const Eyepiece = styled(Box)(({ theme }) => ({
    width: '60%',
    height: '60%',
    background: 'radial-gradient(ellipse, #1a1a2e 0%, #0a0a15 60%, #000 100%)',
    borderRadius: '4px',
    boxShadow: 'inset 0 0 8px rgba(0,0,0,0.9), 0 0 2px rgba(255,255,255,0.05)',
    position: 'relative',
    overflow: 'hidden',
    '&::before': {
        content: '""',
        position: 'absolute',
        top: '15%',
        left: '20%',
        width: '35%',
        height: '25%',
        background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 100%)',
        borderRadius: '50%',
    },
}));

// Seams and details
const TopSeam = styled(Box)({
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '1px',
    background: 'linear-gradient(90deg, transparent 5%, rgba(255,255,255,0.06) 20%, rgba(255,255,255,0.06) 80%, transparent 95%)',
    zIndex: 4,
});

const BottomSeam = styled(Box)({
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '1px',
    background: 'linear-gradient(90deg, transparent 5%, rgba(0,0,0,0.3) 20%, rgba(0,0,0,0.3) 80%, transparent 95%)',
    zIndex: 4,
});

// Strap lugs
const StrapLug = styled(Box)(({ position: lugPosition }) => ({
    position: 'absolute',
    top: '8px',
    [lugPosition]: '8px',
    width: '16px',
    height: '24px',
    background: 'linear-gradient(180deg, #333 0%, #222 100%)',
    borderRadius: '3px',
    border: '1px solid #444',
    boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.1)',
    zIndex: 5,
}));

// Camera model text
const CameraModel = styled(Box)(({ theme }) => ({
    position: 'absolute',
    bottom: 'clamp(8px, 1.5vh, 14px)',
    left: 'clamp(12px, 2vw, 24px)',
    color: 'rgba(255,255,255,0.15)',
    fontSize: 'clamp(8px, 1vw, 11px)',
    letterSpacing: '2px',
    zIndex: 3,
    fontFamily: "'Bitcount Grid Single', monospace",
}));

const StatusLED = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'isOn',
})(({ isOn }) => ({
    position: 'absolute',
    top: 'clamp(10px, 2vh, 18px)',
    right: 'clamp(90px, 13vw, 150px)',
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    background: isOn ? '#ff3333' : '#331111',
    boxShadow: isOn ? '0 0 6px #ff3333, 0 0 12px rgba(255,50,50,0.4)' : 'none',
    zIndex: 5,
    transition: 'all 0.3s ease',
}));

export function CameraShell({ children, isStatusActive = false }) {
    return (
        <CameraBody>
            <BodyShape>
                <TopSeam />
                <BottomSeam />
                <StrapLug position="left" />
                <StrapLug position="right" />
                
                {/* Viewfinder */}
                <ViewfinderHousing>
                    <Eyepiece />
                </ViewfinderHousing>
                
                {/* Status LED */}
                <StatusLED isOn={isStatusActive} />
                
                {/* Camera model text */}
                <CameraModel>SUNNY DIGITAL DSLR</CameraModel>
                
                {/* Grip area */}
                <GripArea />
                
                {/* Main content area - LCD + Controls */}
                <Box sx={{
                    position: 'relative',
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: { xs: '12px', sm: '20px', md: '28px' },
                    zIndex: 2,
                }}>
                    {children}
                </Box>
            </BodyShape>
        </CameraBody>
    );
}

export default CameraShell;
