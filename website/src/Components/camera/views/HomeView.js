import React from 'react';
import { Box, Chip, Typography } from '@mui/material';
import portrait from '../../../assets/Portfolio/Images/Profile/IMGP4462.jpg';

/**
 * Home/Profile view - displayed inside the LCD.
 * Shows name, title, introduction, and technical strengths.
 */
const skills = ['React', 'Java', 'JavaScript', 'Databases', 'SQL', 'Full Stack'];

export default function HomeView() {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'grid',
        gridTemplateColumns: '0.8fr 1.2fr',
        background: 'linear-gradient(135deg, #111217 0%, #202832 58%, #3c3030 100%)',
        color: '#f6f4ef',
        overflow: 'hidden',
      }}
    >
      {/* Profile image */}
      <Box sx={{ minHeight: '100%', position: 'relative', overflow: 'hidden' }}>
        <Box
          component="img"
          src={portrait}
          alt="Sunny You"
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            filter: 'saturate(0.8)',
          }}
        />
        <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(17,18,23,0.05), rgba(17,18,23,0.8))' }} />
        <Typography
          sx={{
            position: 'absolute',
            bottom: 20,
            left: 20,
            color: '#e8b6a2',
            fontFamily: 'monospace',
            fontSize: 10,
            letterSpacing: 2,
          }}
        >
          01 / PROFILE
        </Typography>
      </Box>

      {/* Profile content */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          p: 3,
        }}
      >
        <Typography
          sx={{
            color: '#e8b6a2',
            fontFamily: 'monospace',
            fontSize: 10,
            letterSpacing: 2,
          }}
        >
          ABOUT SUNNY YOU
        </Typography>
        <Typography
          variant="h4"
          sx={{
            mt: 1,
            fontWeight: 800,
            lineHeight: 1,
            fontSize: '2rem',
          }}
        >
          I build with curiosity.
        </Typography>
        <Typography
          sx={{
            maxWidth: 400,
            mt: 2,
            color: 'rgba(246,244,239,0.78)',
            fontSize: 13,
            lineHeight: 1.6,
          }}
        >
          I am a Photographer and Software Developer focused on solving difficult problems, learning continuously, and creating tools that are useful to the people who rely on them.
        </Typography>
        <Typography
          sx={{
            maxWidth: 400,
            mt: 1,
            color: 'rgba(246,244,239,0.62)',
            fontSize: 12,
            lineHeight: 1.5,
          }}
        >
          My work has taken me from the United States to Japan, across applications, databases, education, and everything in between.
        </Typography>

        {/* Skills */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, mt: 2 }}>
          {skills.map((skill) => (
            <Chip
              key={skill}
              label={skill}
              sx={{
                color: '#f6f4ef',
                border: '1px solid rgba(232,182,162,0.58)',
                background: 'rgba(255,255,255,0.04)',
                fontSize: 10,
                height: 22,
              }}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
}
