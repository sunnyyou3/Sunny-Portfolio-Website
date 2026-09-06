import React from 'react';
import { Box, Typography } from '@mui/material';
import ScaledSlide from '../components/ScaledSlide';

const imageContext = require.context('../assets/Portfolio/Images/Gallery', false, /\.(png|jpe?g|webp|gif)$/i);
const photos = imageContext
    .keys()
    .sort()
    .map((filePath) => {
        const image = imageContext(filePath);
        return image.default || image;
    });

const gallerySurface = {
    width: 760,
    height: 608,
    boxSizing: 'border-box',
    overflow: 'hidden',
    background: '#08090b',
    color: '#f6f4ef',
};

export const slides = photos.map((photo, index) => (
    <ScaledSlide key={`gallery-slide-${index}`}>
        <Box sx={{ ...gallerySurface, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Box component="img" src={photo} loading={index === 0 ? 'eager' : 'lazy'} sx={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
            <Box sx={{ position: 'absolute', left: 0, right: 0, bottom: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'end', gap: 2, p: 2.5, pt: 5, background: 'linear-gradient(transparent, rgba(0,0,0,0.78))' }}>
                <Box>
                    <Typography sx={{ color: '#e4c28f', fontFamily: 'monospace', fontSize: 11, letterSpacing: 2 }}>PHOTOGRAPHY</Typography>
                </Box>
                <Typography sx={{ color: 'rgba(246,244,239,0.7)', fontFamily: 'monospace', fontSize: 11 }}>{String(index + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}</Typography>
            </Box>
        </Box>
    </ScaledSlide>
));

export default function Gallery() {
    return slides[0] || null;
}
