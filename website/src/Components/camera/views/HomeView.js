import React, { useState } from 'react';
import { Box, Typography, Chip, styled } from '@mui/material';

// Placeholder avatar SVG as fallback
const PlaceholderAvatar = () => (
    <Box sx={{
        width: '100%',
        height: '100%',
        background: 'linear-gradient(135deg, #e8b6a2 0%, #d4a090 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontSize: 'clamp(20px, 4vw, 40px)',
        fontWeight: 800,
    }}>
        SY
    </Box>
);

// Dynamic image import with error handling
function getProfileImage() {
    try {
        return require('../../../assets/Portfolio/Images/Profile/IMGP4462.jpg');
    } catch {
        return null;
    }
}

const profileImageSrc = getProfileImage();

const HomeContainer = styled(Box)({
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    background: 'linear-gradient(135deg, #0d1117 0%, #161b22 50%, #1a1210 100%)',
    overflow: 'hidden',
});

const ProfileImage = styled(Box)(({ theme }) => ({
    width: 'clamp(60px, 12vw, 120px)',
    height: 'clamp(60px, 12vw, 120px)',
    borderRadius: '50%',
    overflow: 'hidden',
    border: '2px solid rgba(232,182,162,0.4)',
    boxShadow: '0 0 20px rgba(232,182,162,0.15)',
    flexShrink: 0,
    '& img': {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        filter: 'saturate(0.85)',
    },
}));

const SectionLabel = styled(Typography)({
    color: '#e8b6a2',
    fontFamily: "'Bitcount Grid Single', monospace",
    fontSize: 'clamp(8px, 0.9vw, 11px)',
    letterSpacing: '2px',
});

const Title = styled(Typography)({
    fontWeight: 800,
    lineHeight: 1,
    fontSize: 'clamp(18px, 3vw, 36px)',
    color: '#f6f4ef',
});

const BodyText = styled(Typography)({
    color: 'rgba(246,244,239,0.75)',
    fontSize: 'clamp(9px, 1.1vw, 14px)',
    lineHeight: 1.6,
});

export function HomeView() {
    const [imageError, setImageError] = useState(!profileImageSrc);
    
    return (
        <HomeContainer>
            {/* Header */}
            <Box sx={{ 
                padding: 'clamp(8px, 1.5vw, 16px)',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
                display: 'flex',
                alignItems: 'center',
                gap: 'clamp(8px, 1.5vw, 16px)',
            }}>
                <ProfileImage>
                    {profileImageSrc && !imageError ? (
                        <img src={profileImageSrc} alt="Sunny You" onError={() => setImageError(true)} />
                    ) : (
                        <PlaceholderAvatar />
                    )}
                </ProfileImage>
                <Box>
                    <SectionLabel>SUNNY YOU</SectionLabel>
                    <Typography sx={{ 
                        color: '#f6f4ef', 
                        fontSize: 'clamp(12px, 1.8vw, 22px)', 
                        fontWeight: 800,
                        fontFamily: "'Bitcount Grid Single', monospace",
                    }}>
                        SOFTWARE ENGINEER
                    </Typography>
                </Box>
            </Box>
            
            {/* Content */}
            <Box sx={{ 
                flex: 1, 
                padding: 'clamp(10px, 2vw, 20px)', 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'center',
                gap: 'clamp(6px, 1.2vw, 12px)',
            }}>
                <Title>I build with curiosity.</Title>
                
                <BodyText>
                    I am a Photographer and Software Developer focused on solving difficult problems, 
                    learning continuously, and creating tools that are useful to the people who rely on them.
                </BodyText>
                
                <BodyText sx={{ color: 'rgba(246,244,239,0.55)' }}>
                    My work has taken me from the United States to Japan, across applications, databases, 
                    education, and everything in between.
                </BodyText>
                
                {/* Skills */}
                <Box sx={{ 
                    display: 'flex', 
                    flexWrap: 'wrap', 
                    gap: 'clamp(4px, 0.6vw, 8px)',
                    marginTop: 'clamp(4px, 0.8vw, 8px)',
                }}>
                    {['React', 'Java', 'JavaScript', 'Databases', 'SQL', 'Full Stack'].map((skill) => (
                        <Chip 
                            key={skill} 
                            label={skill} 
                            sx={{ 
                                color: '#f6f4ef', 
                                border: '1px solid rgba(232,182,162,0.4)', 
                                background: 'rgba(255,255,255,0.03)',
                                fontSize: 'clamp(7px, 0.85vw, 11px)',
                                fontFamily: "'Bitcount Grid Single', monospace",
                            }} 
                        />
                    ))}
                </Box>
                
                {/* Connect links */}
                <Box sx={{ 
                    display: 'flex', 
                    flexWrap: 'wrap', 
                    gap: 'clamp(4px, 0.6vw, 8px)',
                    marginTop: 'clamp(4px, 0.8vw, 8px)',
                }}>
                    <Chip 
                        label="GitHub" 
                        component="a" 
                        href="https://github.com/sunnyyou3" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        sx={{ 
                            color: '#111217', 
                            background: '#e8b6a2', 
                            fontWeight: 700,
                            fontSize: 'clamp(7px, 0.85vw, 11px)',
                        }} 
                    />
                    <Chip 
                        label="LinkedIn" 
                        component="a" 
                        href="https://linkedin.com/in/sunnyyou3" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        variant="outlined"
                        sx={{ 
                            color: '#f6f4ef', 
                            borderColor: 'rgba(255,255,255,0.3)',
                            fontSize: 'clamp(7px, 0.85vw, 11px)',
                        }} 
                    />
                    <Chip 
                        label="Email" 
                        component="a" 
                        href="mailto:yousunny3@gmail.com"
                        target="_blank" 
                        rel="noopener noreferrer"
                        variant="outlined"
                        sx={{ 
                            color: '#f6f4ef', 
                            borderColor: 'rgba(255,255,255,0.3)',
                            fontSize: 'clamp(7px, 0.85vw, 11px)',
                        }} 
                    />
                </Box>
            </Box>
        </HomeContainer>
    );
}

export default HomeView;
