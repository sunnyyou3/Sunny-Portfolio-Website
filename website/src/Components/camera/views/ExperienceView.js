import React from 'react';
import { Box, Typography, Chip, styled } from '@mui/material';
import { careerEntries } from '../../../data/portfolio';

const ExperienceContainer = styled(Box)({
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    background: 'linear-gradient(135deg, #0d1117 0%, #161b22 50%, #15201b 100%)',
    overflow: 'hidden',
});

const SectionHeader = styled(Box)({
    padding: 'clamp(6px, 1vw, 12px)',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
});

const EntryCard = styled(Box)(({ theme }) => ({
    padding: 'clamp(6px, 1vw, 12px)',
    borderBottom: '1px solid rgba(255,255,255,0.04)',
    transition: 'background 0.15s ease',
    '&:hover': {
        background: 'rgba(255,255,255,0.02)',
    },
}));

const SectionLabel = styled(Typography)({
    color: '#a9d6b7',
    fontFamily: "'Bitcount Grid Single', monospace",
    fontSize: 'clamp(8px, 0.9vw, 11px)',
    letterSpacing: '2px',
});

export function ExperienceView() {
    return (
        <ExperienceContainer>
            <SectionHeader>
                <SectionLabel>CAREER HISTORY</SectionLabel>
                <Typography sx={{ 
                    color: 'rgba(255,255,255,0.35)', 
                    fontSize: 'clamp(7px, 0.75vw, 9px)',
                    fontFamily: "'Bitcount Grid Single', monospace",
                }}>
                    {careerEntries.length} POSITIONS
                </Typography>
            </SectionHeader>
            
            <Box sx={{ 
                flex: 1, 
                overflow: 'auto',
                '&::-webkit-scrollbar': { width: '4px' },
                '&::-webkit-scrollbar-track': { background: 'transparent' },
                '&::-webkit-scrollbar-thumb': { background: 'rgba(255,255,255,0.1)', borderRadius: '2px' },
            }}>
                {careerEntries.map((entry, index) => (
                    <EntryCard key={index}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                            <Box>
                                <Typography sx={{ 
                                    color: '#a9d6b7', 
                                    fontSize: 'clamp(9px, 1vw, 13px)', 
                                    fontWeight: 700,
                                    fontFamily: "'Bitcount Grid Single', monospace",
                                }}>
                                    {entry.role}
                                </Typography>
                                <Typography sx={{ 
                                    color: 'rgba(255,255,255,0.6)', 
                                    fontSize: 'clamp(8px, 0.9vw, 11px)',
                                    fontFamily: "'Bitcount Grid Single', monospace",
                                }}>
                                    {entry.company}
                                </Typography>
                            </Box>
                            <Typography sx={{ 
                                color: 'rgba(255,255,255,0.35)', 
                                fontSize: 'clamp(7px, 0.75vw, 9px)',
                                fontFamily: "'Bitcount Grid Single', monospace",
                                whiteSpace: 'nowrap',
                            }}>
                                {entry.date}
                            </Typography>
                        </Box>
                        
                        <Typography sx={{ 
                            color: 'rgba(246,244,239,0.65)', 
                            fontSize: 'clamp(7px, 0.85vw, 11px)', 
                            lineHeight: 1.5,
                            mb: 1,
                        }}>
                            {entry.description}
                        </Typography>
                        
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '3px' }}>
                            {entry.skills.map((skill) => (
                                <Chip 
                                    key={skill} 
                                    label={skill} 
                                    sx={{ 
                                        color: '#a9d6b7', 
                                        border: '1px solid rgba(169,214,183,0.35)', 
                                        background: 'transparent',
                                        fontSize: 'clamp(6px, 0.7vw, 9px)',
                                        fontFamily: "'Bitcount Grid Single', monospace",
                                        height: 'auto',
                                        padding: '1px 4px',
                                    }} 
                                />
                            ))}
                        </Box>
                    </EntryCard>
                ))}
            </Box>
        </ExperienceContainer>
    );
}

export default ExperienceView;
