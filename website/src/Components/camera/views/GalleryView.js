import React, { useState, useEffect, useMemo } from 'react';
import { Box, Typography, styled } from '@mui/material';

const GalleryContainer = styled(Box)({
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    background: '#08090b',
    overflow: 'hidden',
});

const SectionHeader = styled(Box)({
    padding: 'clamp(4px, 0.8vw, 8px)',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
});

const SectionLabel = styled(Typography)({
    color: '#e4c28f',
    fontFamily: "'Bitcount Grid Single', monospace",
    fontSize: 'clamp(7px, 0.8vw, 10px)',
    letterSpacing: '2px',
});

// Gallery image names (can be updated when images change)
const galleryImageNames = [
    'IMGP4425.jpg',
    'IMGP4476.jpg',
    'IMGP4482.jpg',
    'IMGP4550.jpg',
    'IMGP4635.jpg',
    'IMGP4730.jpg',
    'IMGP4802.jpg',
    'IMGP4804.jpg',
    'SunnyFuji.jpg',
];

// Load images dynamically (will update when names change without full page reload)
function loadGalleryImages() {
    return galleryImageNames.map((name) => {
        try {
            const src = require(`../../../assets/Portfolio/Images/Gallery/${name}`);
            return { name, src: src.default || src };
        } catch {
            return null;
        }
    }).filter(Boolean);
}

// Export for use in DSLRPortfolio.js (keyboard navigation, slide counts)
export const galleryImages = loadGalleryImages();

export function GalleryView({ currentIndex = 0 }) {
    const currentPhoto = galleryImages[currentIndex];
    const [imageError, setImageError] = useState(false);
    
    const handleImageError = () => {
        setImageError(true);
    };
    
    return (
        <GalleryContainer>
            <SectionHeader>
                <SectionLabel>PHOTOGRAPHY</SectionLabel>
                <Typography sx={{ 
                    color: 'rgba(255,255,255,0.35)', 
                    fontSize: 'clamp(7px, 0.75vw, 9px)',
                    fontFamily: "'Bitcount Grid Single', monospace",
                }}>
                    {String(currentIndex + 1).padStart(2, '0')} / {String(galleryImages.length).padStart(2, '0')}
                </Typography>
            </SectionHeader>
            
            <Box sx={{ 
                flex: 1, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                padding: 'clamp(4px, 0.8vw, 8px)',
                position: 'relative',
            }}>
                {currentPhoto && !imageError ? (
                    <Box component="img" 
                        src={currentPhoto.src} 
                        alt={`Photography ${currentIndex + 1}`}
                        sx={{ 
                            width: '100%', 
                            height: '100%', 
                            objectFit: 'contain',
                            display: 'block',
                        }} 
                        onError={handleImageError}
                    />
                ) : (
                    <Box sx={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        color: 'rgba(255,255,255,0.3)',
                        fontFamily: "'Bitcount Grid Single', monospace",
                    }}>
                        <Typography sx={{ fontSize: '10px' }}>
                            Image unavailable
                        </Typography>
                        {currentPhoto && (
                            <Box 
                                component="button"
                                type="button"
                                onClick={() => setImageError(false)}
                                aria-label="Retry loading image"
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
                                Retry
                            </Box>
                        )}
                    </Box>
                )}
                
                {/* Photo info overlay */}
                <Box sx={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    bottom: 0,
                    padding: 'clamp(4px, 0.8vw, 8px)',
                    background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'end',
                }}>
                    <Typography sx={{
                        color: '#e4c28f',
                        fontFamily: "'Bitcount Grid Single', monospace",
                        fontSize: 'clamp(6px, 0.7vw, 9px)',
                        letterSpacing: '1px',
                    }}>
                        {currentPhoto?.name?.replace('.jpg', '').replace('.png', '').replace('.gif', '')}
                    </Typography>
                    <Typography sx={{
                        color: 'rgba(255,255,255,0.5)',
                        fontFamily: "'Bitcount Grid Single', monospace",
                        fontSize: 'clamp(6px, 0.7vw, 9px)',
                    }}>
                        {String(currentIndex + 1).padStart(2, '0')} / {String(galleryImages.length).padStart(2, '0')}
                    </Typography>
                </Box>
            </Box>
            
            {/* Navigation hint */}
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
                    ◀ ▶ Navigate photos • BACK Close
                </Typography>
            </Box>
        </GalleryContainer>
    );
}

export default GalleryView;
