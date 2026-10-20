import React from 'react';
import { Box, Chip, Typography } from '@mui/material';

export default function AboutView() {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        p: 3,
        background: 'linear-gradient(135deg, #3c3030, #17191f 68%)',
        color: '#f6f4ef',
        overflow: 'hidden',
      }}
    >
      <Box>
        <Typography
          sx={{
            color: '#e8b6a2',
            fontFamily: 'monospace',
            fontSize: 10,
            letterSpacing: 2,
          }}
        >
          03 / CONNECT
        </Typography>
        <Typography
          variant="h5"
          sx={{
            maxWidth: 500,
            mt: 1,
            fontWeight: 800,
            lineHeight: 1.1,
            fontSize: '1.8rem',
          }}
        >
          Good work starts with a conversation.
        </Typography>
      </Box>

      <Box>
        <Typography
          sx={{
            maxWidth: 450,
            color: 'rgba(246,244,239,0.75)',
            fontSize: 12,
            lineHeight: 1.6,
          }}
        >
          Whether it is a new idea, a tricky technical problem, or an opportunity to learn together, I would be glad to hear from you.
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, mt: 2 }}>
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
              fontSize: 10,
              height: 24,
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
              fontSize: 10,
              height: 24,
            }}
          />
          <Chip
            label="Email"
            component="a"
            href="mailto:yousunny3@gmail.com"
            sx={{
              color: '#f6f4ef',
              borderColor: 'rgba(255,255,255,0.35)',
              fontSize: 10,
              height: 24,
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}
