import React from 'react';
import { Box, styled } from '@mui/material';

const StatusBar = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '2px 8px',
    background: 'rgba(0,0,0,0.6)',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
    fontSize: 'clamp(7px, 0.85vw, 10px)',
    fontFamily: "'Bitcount Grid Single', monospace",
    color: 'rgba(255,255,255,0.6)',
    letterSpacing: '0.5px',
    minHeight: '20px',
}));

const StatusIcon = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'active',
})(({ active }) => ({
    display: 'inline-flex',
    alignItems: 'center',
    gap: '3px',
    opacity: active ? 1 : 0.4,
    transition: 'opacity 0.2s ease',
}));

const BatteryIcon = styled(Box)(({ level }) => ({
    display: 'inline-flex',
    alignItems: 'center',
    gap: '1px',
}));

export function CameraStatusBar({ section, projectCount, currentSlide, totalSlides, displayMode, batteryLevel = 85 }) {
    // Validate battery level to prevent display issues
    const displayLevel = Math.max(0, Math.min(100, batteryLevel));
    
    return (
        <StatusBar>
            <Box sx={{ display: 'flex', gap: 'clamp(6px, 1vw, 14px)', alignItems: 'center' }}>
                <StatusIcon active={true}>
                    <Box sx={{ 
                        width: '8px', height: '6px', 
                        border: '1px solid currentColor', 
                        borderRadius: '1px',
                        display: 'inline-block'
                    }} />
                    <span>AF</span>
                </StatusIcon>
                <StatusIcon active={true}>
                    <span>M</span>
                </StatusIcon>
                <StatusIcon active={section === 'projects'}>
                    <span>RAW</span>
                </StatusIcon>
            </Box>
            
            <Box sx={{ display: 'flex', gap: 'clamp(6px, 1vw, 14px)', alignItems: 'center' }}>
                {displayMode === 'info' && (
                    <StatusIcon active={true}>
                        <span>DISP</span>
                    </StatusIcon>
                )}
                <StatusIcon active={section === 'gallery'}>
                    <span>{currentSlide + 1}/{totalSlides}</span>
                </StatusIcon>
                <StatusIcon active={section === 'projects'}>
                    <span>{projectCount}</span>
                </StatusIcon>
                <BatteryIcon>
                    <Box sx={{ 
                        width: '14px', height: '7px', 
                        border: '1px solid currentColor', 
                        borderRadius: '1px',
                        position: 'relative',
                        overflow: 'hidden',
                        '&::after': {
                            content: '""',
                            position: 'absolute',
                            right: '-3px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            width: '2px',
                            height: '3px',
                            background: 'currentColor',
                            borderRadius: '0 1px 1px 0',
                        }
                    }}>
                        <Box sx={{ 
                            width: `${displayLevel}%`, 
                            height: '100%', 
                            background: displayLevel > 30 ? 'currentColor' : '#ff6b35',
                            borderRadius: '1px',
                        }} />
                    </Box>
                </BatteryIcon>
            </Box>
        </StatusBar>
    );
}

export default CameraStatusBar;
