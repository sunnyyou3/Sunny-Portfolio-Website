import React from 'react';
import { Box, Typography } from '@mui/material';

// Load gallery images - handle test environment where require.context may not exist
let photos = [];
try {
  if (typeof require.context === 'function') {
    const imageContext = require.context('../../../assets/Portfolio/Images/Gallery', false, /\.(png|jpe?g|webp|gif)$/i);
    photos = imageContext
      .keys()
      .sort()
      .map((filePath) => {
        const image = imageContext(filePath);
        return image.default || image;
      });
  }
} catch (e) {
  // In test environment, require.context may not be available
  photos = [];
}

export default function GalleryView({ slideIndex }) {
  const totalSlides = photos.length;
  const currentPhoto = photos[Math.min(slideIndex || 0, totalSlides - 1)];

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#08090b',
        color: '#f6f4ef',
        overflow: 'hidden',
      }}
    >
      {/* Photo */}
      {currentPhoto && (
        <Box
          component="img"
          src={currentPhoto}
          alt={`Gallery photo ${slideIndex + 1}`}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            display: 'block',
          }}
        />
      )}

      {/* Photo info overlay */}
      <Box
        sx={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'end',
          gap: 1.5,
          p: 2,
          pt: 4,
          background: 'linear-gradient(transparent, rgba(0,0,0,0.78))',
        }}
      >
        <Box>
          <Typography
            sx={{
              color: '#e4c28f',
              fontFamily: 'monospace',
              fontSize: 9,
              letterSpacing: 2,
            }}
          >
            PHOTOGRAPHY
          </Typography>
        </Box>
        <Typography
          sx={{
            color: 'rgba(246,244,239,0.7)',
            fontFamily: 'monospace',
            fontSize: 9,
          }}
        >
          {String((slideIndex || 0) + 1).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}
        </Typography>
      </Box>
    </Box>
  );
}
