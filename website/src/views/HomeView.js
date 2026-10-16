import React from 'react';
import { Box, Typography } from '@mui/material';
import portrait from '../assets/Portfolio/Images/Profile/IMGP4462.jpg';

const slideSurface = {
  width: 760,
  height: 608,
  boxSizing: 'border-box',
  overflow: 'hidden',
  color: '#f6f4ef',
  background: 'linear-gradient(135deg, #111217 0%, #202832 58%, #3c3030 100%)',
};

const sectionLabel = {
  color: '#e8b6a2',
  fontFamily: "'Bitcount Grid Single', monospace",
  fontSize: 12,
  letterSpacing: 2,
};

export default function HomeView() {
  return (
    <Box sx={{
      ...slideSurface,
      display: 'grid',
      gridTemplateColumns: '0.8fr 1.2fr',
      p: 0,
    }}>
      {/* Left: Profile image */}
      <Box sx={{
        minHeight: '100%',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <Box
          component="img"
          src={portrait}
          alt="Sunny You"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            filter: 'saturate(0.8)',
          }}
        />
        <Box sx={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(17,18,23,0.05), rgba(17,18,23,0.8))',
        }} />
        <Typography sx={{
          position: 'absolute',
          bottom: 28,
          left: 28,
          ...sectionLabel,
        }}>
          01 / PROFILE
        </Typography>
      </Box>

      {/* Right: Content */}
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        p: 4,
      }}>
        <Typography sx={sectionLabel}>ABOUT SUNNY YOU</Typography>
        <Typography variant="h3" sx={{
          mt: 1.5,
          fontWeight: 800,
          lineHeight: 1,
          fontSize: '3.45rem',
        }}>
          I build with curiosity.
        </Typography>
        <Typography sx={{
          maxWidth: 480,
          mt: 2.5,
          color: 'rgba(246,244,239,0.78)',
          fontSize: 16,
          lineHeight: 1.65,
        }}>
          I am a Photographer and Software Developer focused on solving difficult problems, learning continuously, and creating tools that are useful to the people who rely on them.
        </Typography>
        <Typography sx={{
          maxWidth: 480,
          mt: 1.5,
          color: 'rgba(246,244,239,0.62)',
          fontSize: 15,
          lineHeight: 1.6,
        }}>
          My work has taken me from the United States to Japan, across applications, databases, education, and everything in between.
        </Typography>
      </Box>
    </Box>
  );
}
