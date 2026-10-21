import React from 'react';
import { Box, Typography, styled } from '@mui/material';

const InfoContainer = styled(Box)({
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    background: 'linear-gradient(135deg, #0a0e14 0%, #111820 50%, #0d1117 100%)',
    overflow: 'hidden',
});

const InfoSection = styled(Box)({
    padding: 'clamp(6px, 1vw, 12px)',
    borderBottom: '1px solid rgba(255,255,255,0.04)',
});

const InfoLabel = styled(Typography)({
    color: 'rgba(150,180,255,0.7)',
    fontFamily: "'Bitcount Grid Single', monospace",
    fontSize: 'clamp(7px, 0.8vw, 10px)',
    letterSpacing: '2px',
    mb: 1,
});

const InfoValue = styled(Typography)({
    color: 'rgba(255,255,255,0.85)',
    fontFamily: "'Bitcount Grid Single', monospace",
    fontSize: 'clamp(8px, 0.95vw, 12px)',
    lineHeight: 1.6,
});

export function InfoView() {
    return (
        <InfoContainer>
            <InfoSection>
                <InfoLabel>DESIGN CONCEPT</InfoLabel>
                <InfoValue>
                    This portfolio is designed to resemble the rear of a physical DSLR camera. 
                    The camera body is the persistent outer layout, and the LCD screen displays 
                    the selected portfolio section.
                </InfoValue>
            </InfoSection>
            
            <InfoSection>
                <InfoLabel>CAMERA CONTROLS</InfoLabel>
                <InfoValue>
                    MENU — Open/close section menu<br/>
                    INFO — Toggle this info display<br/>
                    PLAYBACK — Open photo gallery<br/>
                    D-PAD — Navigate menu items<br/>
                    OK/SET — Confirm selection<br/>
                    BACK — Return to previous view
                </InfoValue>
            </InfoSection>
            
            <InfoSection>
                <InfoLabel>NAVIGATION</InfoLabel>
                <InfoValue>
                    Home — Profile, skills, contact<br/>
                    Experience — Work history<br/>
                    Projects — Project gallery<br/>
                    About — Background & interests<br/>
                    Gallery — Photography collection
                </InfoValue>
            </InfoSection>
            
            <InfoSection>
                <InfoLabel>TECHNICAL DETAILS</InfoLabel>
                <InfoValue>
                    Framework: React 18 + MUI<br/>
                    Animation: Framer Motion<br/>
                    Build: Create React App<br/>
                    Deployment: GitHub Pages
                </InfoValue>
            </InfoSection>
            
            <Box sx={{ 
                padding: 'clamp(4px, 0.8vw, 8px)',
                borderTop: '1px solid rgba(255,255,255,0.06)',
                display: 'flex',
                justifyContent: 'center',
            }}>
                <Typography sx={{
                    color: 'rgba(255,255,255,0.3)',
                    fontSize: 'clamp(6px, 0.65vw, 8px)',
                    fontFamily: "'Bitcount Grid Single', monospace",
                }}>
                    INFO to return • BACK Close
                </Typography>
            </Box>
        </InfoContainer>
    );
}

export default InfoView;
