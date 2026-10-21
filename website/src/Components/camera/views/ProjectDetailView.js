import React, { useState, useEffect } from 'react';
import { Box, Typography, Chip, styled } from '@mui/material';
import { projects } from '../../../data/portfolio';

const DetailContainer = styled(Box)({
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    background: 'linear-gradient(135deg, #0d1117 0%, #161b22 50%, #1a1210 100%)',
    overflow: 'hidden',
});

const ImageContainer = styled(Box)({
    position: 'relative',
    width: '100%',
    height: 'clamp(80px, 40vh, 220px)',
    overflow: 'hidden',
    flexShrink: 0,
});

const ImageThumbnail = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'active',
})(({ active }) => ({
    width: 'clamp(28px, 3.5vw, 40px)',
    height: 'clamp(20px, 2.5vh, 30px)',
    borderRadius: '2px',
    overflow: 'hidden',
    border: active ? '2px solid #f1a17d' : '1px solid rgba(255,255,255,0.2)',
    cursor: 'pointer',
    opacity: active ? 1 : 0.6,
    transition: 'all 0.15s ease',
    '&:hover': {
        opacity: 1,
    },
    '& img': {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },
}));

const SectionLabel = styled(Typography)({
    color: '#f1a17d',
    fontFamily: "'Bitcount Grid Single', monospace",
    fontSize: 'clamp(7px, 0.8vw, 10px)',
    letterSpacing: '2px',
});

export function ProjectDetailView({ projectIndex = 0, onBack }) {
    const project = projects[projectIndex];
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    
    useEffect(() => {
        setCurrentImageIndex(0);
    }, [projectIndex]);
    
    // Auto-navigate back if project is out of bounds
    useEffect(() => {
        if (!project && onBack) {
            setIsLoading(true);
            onBack();
        }
    }, [project, onBack]);
    
    if (isLoading) {
        return (
            <DetailContainer>
                <Box sx={{ 
                    flex: 1, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    color: 'rgba(255,255,255,0.3)',
                    fontFamily: "'Bitcount Grid Single', monospace",
                    fontSize: '10px',
                }}>
                    Loading...
                </Box>
            </DetailContainer>
        );
    }
    
    if (!project) {
        // Fallback to home view instead of returning null
        return (
            <DetailContainer>
                <Box sx={{ 
                    flex: 1, 
                    display: 'flex', 
                    flexDirection: 'column',
                    alignItems: 'center', 
                    justifyContent: 'center',
                    gap: '8px',
                    color: 'rgba(255,255,255,0.3)',
                    fontFamily: "'Bitcount Grid Single', monospace",
                }}>
                    <Typography sx={{ fontSize: '10px' }}>Project not found</Typography>
                    <Box 
                        component="button"
                        type="button"
                        onClick={onBack}
                        aria-label="Return to gallery"
                        sx={{
                            padding: '4px 12px',
                            background: 'rgba(255,255,255,0.05)',
                            border: '1px solid rgba(255,255,255,0.15)',
                            borderRadius: '3px',
                            color: 'rgba(255,255,255,0.5)',
                            fontSize: '9px',
                            cursor: 'pointer',
                            fontFamily: "'Bitcount Grid Single', monospace",
                            '&:hover': {
                                background: 'rgba(255,255,255,0.08)',
                            },
                        }}
                    >
                        Return to Gallery
                    </Box>
                </Box>
            </DetailContainer>
        );
    }
    
    const heroImage = project.images[currentImageIndex];
    
    return (
        <DetailContainer>
            {/* Image display */}
            <ImageContainer>
                {heroImage && (
                    <Box component="img" 
                        src={heroImage} 
                        alt={`${project.title} preview`}
                        sx={{ 
                            width: '100%', 
                            height: '100%', 
                            objectFit: 'cover',
                            display: 'block',
                        }} 
                    />
                )}
                <Box sx={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.5) 100%)',
                }} />
                <Box sx={{
                    position: 'absolute',
                    top: 'clamp(4px, 0.8vw, 8px)',
                    left: 'clamp(6px, 1vw, 12px)',
                }}>
                    <SectionLabel>PROJECT / {project.number}</SectionLabel>
                </Box>
            </ImageContainer>
            
            {/* Project info */}
            <Box sx={{ 
                flex: 1, 
                padding: 'clamp(6px, 1vw, 12px)',
                display: 'flex', 
                flexDirection: 'column', 
                gap: 'clamp(4px, 0.8vw, 8px)',
                overflow: 'auto',
            }}>
                <Typography sx={{ 
                    color: '#f6f4ef', 
                    fontSize: 'clamp(11px, 1.5vw, 20px)', 
                    fontWeight: 800,
                    lineHeight: 1.1,
                }}>
                    {project.title}
                </Typography>
                
                <Typography sx={{ 
                    color: '#f1a17d', 
                    fontSize: 'clamp(7px, 0.85vw, 11px)',
                    fontStyle: 'italic',
                }}>
                    {project.eyebrow}
                </Typography>
                
                <Typography sx={{ 
                    color: 'rgba(246,244,239,0.7)', 
                    fontSize: 'clamp(7px, 0.9vw, 12px)', 
                    lineHeight: 1.5,
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
                
                {/* Image thumbnails */}
                {project.images.length > 1 && (
                    <Box sx={{ 
                        display: 'flex', 
                        gap: '4px',
                        marginTop: 'auto',
                        paddingTop: '4px',
                        borderTop: '1px solid rgba(255,255,255,0.06)',
                    }}>
                        {project.images.map((img, idx) => (
                            <ImageThumbnail 
                                key={idx} 
                                active={idx === currentImageIndex}
                                onClick={() => setCurrentImageIndex(idx)}
                                role="button"
                                aria-label={`Show image ${idx + 1}`}
                                tabIndex={0}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        setCurrentImageIndex(idx);
                                    }
                                }}
                            >
                                <img src={img} alt="" />
                            </ImageThumbnail>
                        ))}
                    </Box>
                )}
            </Box>
            
            {/* Footer hint */}
            <Box sx={{
                padding: '3px 8px',
                borderTop: '1px solid rgba(255,255,255,0.06)',
                display: 'flex',
                justifyContent: 'space-between',
            }}>
                <Typography sx={{
                    color: 'rgba(255,255,255,0.3)',
                    fontSize: 'clamp(6px, 0.65vw, 8px)',
                    fontFamily: "'Bitcount Grid Single', monospace",
                }}>
                    BACK to gallery • OK Select image
                </Typography>
            </Box>
        </DetailContainer>
    );
}

export default ProjectDetailView;
