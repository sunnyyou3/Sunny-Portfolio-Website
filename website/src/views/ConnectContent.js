import React from 'react';
import { Box, Chip, Typography } from '@mui/material';

const sectionLabel = {
  color: '#e8b6a2',
  fontFamily: "'Bitcount Grid Single', monospace",
  fontSize: 12,
  letterSpacing: 2,
};

// Shared connect/contact slide content used by both AboutView and ContactView
export function ConnectContent() {
  return (
    <>
      <Box>
        <Typography sx={sectionLabel}>03 / CONNECT</Typography>
        <Typography variant="h3" sx={{
          maxWidth: 580,
          mt: 1.5,
          fontWeight: 800,
          lineHeight: 1,
          fontSize: '3.5rem',
        }}>
          Good work starts with a conversation.
        </Typography>
      </Box>
      <Box>
        <Typography sx={{
          maxWidth: 500,
          color: 'rgba(246,244,239,0.75)',
          fontSize: 16,
          lineHeight: 1.6,
        }}>
          Whether it is a new idea, a tricky technical problem, or an opportunity to learn together, I would be glad to hear from you.
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2.5 }}>
          <Chip
            label="GitHub"
            component="a"
            href="https://github.com/sunnyyou3"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: '#111217',
              background: '#e8b6a2',
              fontWeight: 700,
            }}
          />
          <Chip
            label="LinkedIn"
            component="a"
            href="https://linkedin.com/in/sunnyyou3"
            target="_blank"
            rel="noopener noreferrer"
            variant="outlined"
            sx={{
              color: '#f6f4ef',
              borderColor: 'rgba(255,255,255,0.35)',
            }}
          />
          <Chip
            label="Email"
            component="a"
            href="mailto:yousunny3@gmail.com"
            sx={{
              color: '#f6f4ef',
              borderColor: 'rgba(255,255,255,0.35)',
            }}
          />
        </Box>
      </Box>
    </>
  );
}
