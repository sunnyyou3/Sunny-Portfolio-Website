import React from 'react';
import { Box, Typography } from '@mui/material';

// Gallery photos - loaded dynamically to avoid webpack require.context in tests
const getGalleryPhotos = () => {
  try {
    const imageContext = require.context('../assets/Portfolio/Images/Gallery', false, /\.(png|jpe?g|webp|gif)$/i);
    return imageContext
      .keys()
      .sort()
      .map((filePath) => {
        const image = imageContext(filePath);
        return image.default || image;
      });
  } catch {
    // Fallback for environments that don't support require.context (e.g., Jest)
    return [
      require('../assets/Portfolio/Images/Gallery/IMGP4425.jpg'),
      require('../assets/Portfolio/Images/Gallery/IMGP4476.jpg'),
      require('../assets/Portfolio/Images/Gallery/IMGP4482.jpg'),
      require('../assets/Portfolio/Images/Gallery/IMGP4550.jpg'),
      require('../assets/Portfolio/Images/Gallery/IMGP4635.jpg'),
      require('../assets/Portfolio/Images/Gallery/IMGP4730.jpg'),
      require('../assets/Portfolio/Images/Gallery/IMGP4802.jpg'),
      require('../assets/Portfolio/Images/Gallery/IMGP4804.jpg'),
      require('../assets/Portfolio/Images/Gallery/SunnyFuji.jpg'),
    ];
  }
};

const photos = getGalleryPhotos();

const gallerySurface = {
  width: 760,
  height: 608,
  boxSizing: 'border-box',
  overflow: 'hidden',
  background: '#08090b',
  color: '#f6f4ef',
};

export default function GalleryView() {
  const [index, setIndex] = React.useState(0);
  const photo = photos[index];

  const prevPhoto = () => {
    setIndex(prev => (prev - 1 + photos.length) % photos.length);
  };

  const nextPhoto = () => {
    setIndex(prev => (prev + 1) % photos.length);
  };

  return (
    <Box sx={{
      ...gallerySurface,
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Photo */}
      <Box sx={{
        flex: 1,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}>
        <Box
          component="img"
          src={photo}
          key={photo}
          alt="Gallery photo"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            display: 'block',
          }}
        />
      </Box>

      {/* Bottom info bar */}
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'end',
        gap: 2,
        p: 2.5,
        borderTop: '1px solid rgba(255,255,255,0.16)',
        background: 'rgba(8,9,11,0.8)',
      }}>
        <Box>
          <Typography sx={{
            color: '#e4c28f',
            fontFamily: "'Bitcount Grid Single', monospace",
            fontSize: 11,
            letterSpacing: 2,
          }}>
            PHOTOGRAPHY
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box sx={{ display: 'flex', gap: 0.5 }}>
            <Box
              role="button"
              tabIndex={0}
              aria-label="Previous photo"
              onClick={prevPhoto}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); prevPhoto(); } }}
              sx={{
                width: 28, height: 28,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.2)',
                color: '#aaa',
                cursor: 'pointer',
                fontSize: 12,
                '&:hover': { background: 'rgba(255,255,255,0.15)' },
              }}
            >
              ◀
            </Box>
            <Box
              role="button"
              tabIndex={0}
              aria-label="Next photo"
              onClick={nextPhoto}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); nextPhoto(); } }}
              sx={{
                width: 28, height: 28,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.2)',
                color: '#aaa',
                cursor: 'pointer',
                fontSize: 12,
                '&:hover': { background: 'rgba(255,255,255,0.15)' },
              }}
            >
              ▶
            </Box>
          </Box>
          <Typography sx={{
            color: 'rgba(246,244,239,0.7)',
            fontFamily: "'Bitcount Grid Single', monospace",
            fontSize: 11,
          }}>
            {String(index + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
