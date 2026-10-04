import React from 'react';
import { Box, Chip, Typography } from '@mui/material';
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

export const slides = [
    <ScaledSlide key="gallery-intro">
        <Box sx={{ ...gallerySurface, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', p: 5, background: 'radial-gradient(circle at 85% 15%, rgba(228,194,193,0.3), transparent 35%), linear-gradient(135deg, #101217, #252521)' }}>
            <Typography sx={{ color: '#e4c28f', fontFamily: 'monospace', fontSize: 12, letterSpacing: 2 }}>Through the lens</Typography>
            <Box sx={{ maxWidth: 560 }}>
                <Typography variant="h2" sx={{ fontSize: '3.8rem', fontWeight: 800, lineHeight: 0.95 }}>GALLERY</Typography>
                <Typography sx={{ mt: 2, maxWidth: 490, color: 'rgba(246,244,239,0.78)', fontSize: 17, lineHeight: 1.5 }}>A collection of pictures that I've taken during my many travels.</Typography>
                <Box sx={{ display: 'flex', gap: 1, mt: 3, flexWrap: 'wrap' }}>
                    <Chip label="Travel" sx={{ color: '#111217', background: '#e4c28f', fontWeight: 700 }} />
                    <Chip label="Nature" variant="outlined" sx={{ color: '#f6f4ef', borderColor: 'rgba(255,255,255,0.3)' }} />
                    <Chip label="Everyday moments" sx={{ color: '#111217', background: '#e4c28f', fontWeight: 700 }} />
                </Box>
            </Box>
        </Box>
    </ScaledSlide>,
    ...photos.map((photo, index) => (
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
    )),
];

export default function Gallery() {
    return slides[0] || null;
}
