import React from 'react';
import { Box, Typography, Chip, styled } from '@mui/material';
import { projects } from '../../../data/portfolio';

const ProjectsContainer = styled(Box)({
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    background: 'linear-gradient(135deg, #0d1117 0%, #161b22 50%, #1a1210 100%)',
    overflow: 'hidden',
});

const SectionHeader = styled(Box)({
    padding: 'clamp(6px, 1vw, 12px)',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
});

const SectionLabel = styled(Typography)({
    color: '#f1a17d',
    fontFamily: "'Bitcount Grid Single', monospace",
    fontSize: 'clamp(8px, 0.9vw, 11px)',
    letterSpacing: '2px',
});

const ProjectCard = styled(Box)(({ selected }) => ({
    padding: 'clamp(6px, 1vw, 12px)',
    borderBottom: selected 
        ? '1px solid rgba(241,161,125,0.4)' 
        : '1px solid rgba(255,255,255,0.04)',
    background: selected 
        ? 'rgba(241,161,125,0.06)' 
        : 'transparent',
    transition: 'all 0.15s ease',
    cursor: 'pointer',
    '&:hover': {
        background: 'rgba(255,255,255,0.02)',
    },
}));

export function ProjectsView({ onSelectProject, selectedIndex = 0 }) {
    return (
        <ProjectsContainer>
            <SectionHeader>
                <SectionLabel>PROJECTS</SectionLabel>
                <Typography sx={{ 
                    color: 'rgba(255,255,255,0.35)', 
                    fontSize: 'clamp(7px, 0.75vw, 9px)',
                    fontFamily: "'Bitcount Grid Single', monospace",
                }}>
                    {projects.length} ITEMS
                </Typography>
            </SectionHeader>
            
            <Box sx={{ 
                flex: 1, 
                overflow: 'auto',
                '&::-webkit-scrollbar': { width: '4px' },
                '&::-webkit-scrollbar-track': { background: 'transparent' },
                '&::-webkit-scrollbar-thumb': { background: 'rgba(255,255,255,0.1)', borderRadius: '2px' },
            }}>
                {projects.map((project, index) => (
                    <ProjectCard 
                        key={project.number} 
                        selected={index === selectedIndex}
                        onClick={() => onSelectProject && onSelectProject(index)}
                        role="button"
                        tabIndex={0}
                        aria-label={`View project: ${project.title}`}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                onSelectProject && onSelectProject(index);
                            }
                        }}
                    >
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 0.5 }}>
                            <Box>
                                <Typography sx={{ 
                                    color: '#f1a17d', 
                                    fontSize: 'clamp(9px, 1vw, 13px)', 
                                    fontWeight: 700,
                                    fontFamily: "'Bitcount Grid Single', monospace",
                                }}>
                                    {project.title}
                                </Typography>
                                <Typography sx={{ 
                                    color: 'rgba(255,255,255,0.5)', 
                                    fontSize: 'clamp(7px, 0.8vw, 10px)',
                                    fontStyle: 'italic',
                                }}>
                                    {project.eyebrow}
                                </Typography>
                            </Box>
                            <Typography sx={{ 
                                color: 'rgba(241,161,125,0.5)', 
                                fontSize: 'clamp(10px, 1.2vw, 16px)',
                                fontFamily: "'Bitcount Grid Single', monospace",
                                fontWeight: 800,
                            }}>
                                {project.number}
                            </Typography>
                        </Box>
                        
                        <Typography sx={{ 
                            color: 'rgba(246,244,239,0.6)', 
                            fontSize: 'clamp(7px, 0.85vw, 11px)', 
                            lineHeight: 1.5,
                            mb: 1,
                        }}>
                            {project.description}
                        </Typography>
                        
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '3px' }}>
                            {project.tags.map((tag) => (
                                <Chip 
                                    key={tag} 
                                    label={tag} 
                                    sx={{ 
                                        color: '#f1a17d', 
                                        border: '1px solid rgba(241,161,125,0.35)', 
                                        background: 'transparent',
                                        fontSize: 'clamp(6px, 0.7vw, 9px)',
                                        fontFamily: "'Bitcount Grid Single', monospace",
                                        height: 'auto',
                                        padding: '1px 4px',
                                    }} 
                                />
                            ))}
                        </Box>
                    </ProjectCard>
                ))}
            </Box>
            
            {/* Footer hint */}
            <Box sx={{
                padding: '4px 12px',
                borderTop: '1px solid rgba(255,255,255,0.06)',
                display: 'flex',
                justifyContent: 'space-between',
            }}>
                <Typography sx={{
                    color: 'rgba(255,255,255,0.3)',
                    fontSize: 'clamp(6px, 0.7vw, 9px)',
                    fontFamily: "'Bitcount Grid Single', monospace",
                }}>
                    OK to view details • ▲▼ Navigate
                </Typography>
            </Box>
        </ProjectsContainer>
    );
}

export default ProjectsView;
