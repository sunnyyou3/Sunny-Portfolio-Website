import React from 'react';
import { Box } from '@mui/material';
import { ConnectContent } from './ConnectContent';

const slideSurface = {
  width: 760,
  height: 608,
  boxSizing: 'border-box',
  overflow: 'hidden',
  color: '#f6f4ef',
  background: 'linear-gradient(135deg, #3c3030, #17191f 68%)',
};

export default function ContactView() {
  return (
    <Box sx={{
      ...slideSurface,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      p: 4,
    }}>
      <ConnectContent />
    </Box>
  );
}
