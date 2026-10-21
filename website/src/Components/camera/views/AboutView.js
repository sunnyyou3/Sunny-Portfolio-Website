import React from 'react';
import { Box, Typography, Chip, styled } from '@mui/material';
import { skills, contactLinks } from '../../../data/portfolio';

const AboutContainer = styled(Box)({
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    background: 'linear-gradient(135deg, #0d1117 0%, #161b22 50%, #1a1818 100%)',
    overflow: 'hidden',
});

const SectionHeader = styled(Box)({
    padding: 'clamp(6px, 1vw, 12px)',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
});

const SectionLabel = styled(Typography)({
    color: '#e8b6a2',
    fontFamily: "'Bitcount Grid Single', monospace",
    fontSize: 'clamp(8px, 0.9vw, 11px)',
    letterSpacing: '2px',
});

const Title = styled(Typography)({
    fontWeight: 800,
    lineHeight: 1.1,
    fontSize: 'clamp(14px, 2.5vw, 28px)',
    color: '#f6f4ef',
});

const BodyText = styled(Typography)({
    color: 'rgba(246,244,239,0.7)',
    fontSize: 'clamp(8px, 1vw, 13px)',
    lineHeight: 1.6,
});

export function AboutView() {
    return (
        <AboutContainer>
            <SectionHeader>
                <SectionLabel>ABOUT</SectionLabel>
            </SectionHeader>
            
            <Box sx={{ 
                flex: 1, 
                padding: 'clamp(8px, 1.5vw, 16px)', 
                display: 'flex', 
                flexDirection: 'column', 
                gap: 'clamp(6px, 1.2vw, 12px)',
                overflow: 'auto',
            }}>
                <Title>Good work starts with a conversation.</Title>
                
                <BodyText>
                    Whether it is a new idea, a tricky technical problem, or an opportunity to learn together, 
                    I would be glad to hear from you.
                </BodyText>
                
                <Box>
                    <Typography sx={{ 
                        color: '#e8b6a2', 
                        fontSize: 'clamp(8px, 0.9vw, 11px)', 
                        fontFamily: "'Bitcount Grid Single', monospace",
                        letterSpacing: '1px',
                        mb: 1,
                    }}>
                        TOOLKIT
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(3px, 0.5vw, 6px)' }}>
                        {skills.map((skill) => (
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
                </Box>
                
                <Box>
                    <Typography sx={{ 
                        color: '#e8b6a2', 
                        fontSize: 'clamp(8px, 0.9vw, 11px)', 
                        fontFamily: "'Bitcount Grid Single', monospace",
                        letterSpacing: '1px',
                        mb: 1,
                    }}>
                        CONNECT
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(3px, 0.5vw, 6px)' }}>
                        {contactLinks.map((link) => (
                            <Chip 
                                key={link.label} 
                                label={link.label} 
                                component="a" 
                                href={link.href} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                sx={{ 
                                    color: '#f6f4ef', 
                                    borderColor: 'rgba(255,255,255,0.3)',
                                    fontSize: 'clamp(7px, 0.85vw, 11px)',
                                    fontFamily: "'Bitcount Grid Single', monospace",
                                }} 
                            />
                        ))}
                    </Box>
                </Box>
                
                <Box sx={{ 
                    marginTop: 'auto',
                    padding: 'clamp(4px, 0.8vw, 8px)',
                    background: 'rgba(255,255,255,0.02)',
                    borderRadius: '4px',
                    border: '1px solid rgba(255,255,255,0.04)',
                }}>
                    <Typography sx={{ 
                        color: 'rgba(255,255,255,0.4)', 
                        fontSize: 'clamp(7px, 0.8vw, 10px)', 
                        lineHeight: 1.5,
                        fontFamily: "'Bitcount Grid Single', monospace",
                    }}>
                        Worked internationally across the United States and Japan, building software, 
                        mentoring developers, and growing through every new challenge.
                    </Typography>
                </Box>
            </Box>
        </AboutContainer>
    );
}

export default AboutView;
