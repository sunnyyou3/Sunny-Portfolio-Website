import React from 'react';
import { Box, styled, Typography } from '@mui/material';
import { CameraButton, DirectionalPad, CommandDial } from './CameraButton';

const ControlsContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'clamp(8px, 1.5vh, 16px)',
    padding: 'clamp(8px, 1.2vw, 16px)',
    minWidth: 'clamp(70px, 10vw, 120px)',
    height: '100%',
}));

const ControlGroup = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 'clamp(4px, 0.8vh, 10px)',
});

const ControlLabel = styled(Typography)(({ theme }) => ({
    fontSize: 'clamp(6px, 0.65vw, 8px)',
    color: 'rgba(255,255,255,0.3)',
    textAlign: 'center',
    fontFamily: "'Bitcount Grid Single', monospace",
    letterSpacing: '0.5px',
    marginBottom: '2px',
}));

const Divider = styled(Box)({
    width: '80%',
    height: '1px',
    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)',
});

export function CameraControls({ 
    onMenu, 
    onInfo, 
    onPlayback, 
    onBack,
    onDpadUp,
    onDpadDown,
    onDpadLeft,
    onDpadRight,
    onDpadOk,
    onDialRotate,
    menuOpen,
    menuIndex,
    activeSection,
    onProjectNavigate,
    projectIndex,
}) {
    return (
        <ControlsContainer>
            {/* Top section: Command dial + INFO */}
            <ControlGroup>
                <ControlLabel>SET</ControlLabel>
                <CommandDial onRotate={onDialRotate} />
            </ControlGroup>
            
            <Divider />
            
            {/* MENU button */}
            <CameraButton
                label="MENU"
                variant="normal"
                active={menuOpen}
                onClick={onMenu}
                aria-label="Open menu"
            />
            
            {/* INFO / DISP button */}
            <CameraButton
                label="INFO"
                variant="normal"
                onClick={onInfo}
                aria-label="Toggle info display"
            />
            
            <Divider />
            
            {/* Playback button */}
            <CameraButton
                label="▶"
                icon="▶"
                variant="normal"
                onClick={onPlayback}
                aria-label="Open gallery"
            />
            
            <Divider />
            
            {/* Directional pad */}
            <ControlGroup>
                <ControlLabel>D-PAD</ControlLabel>
                <DirectionalPad
                    onUp={onDpadUp}
                    onDown={onDpadDown}
                    onLeft={onDpadLeft}
                    onRight={onDpadRight}
                    onOk={onDpadOk}
                    active={menuOpen}
                    selectedIndex={menuIndex}
                    currentIndex={menuIndex}
                />
            </ControlGroup>
            
            <Divider />
            
            {/* BACK button */}
            <CameraButton
                label="BACK"
                variant="normal"
                onClick={onBack}
                aria-label="Go back"
            />
        </ControlsContainer>
    );
}

export default CameraControls;
