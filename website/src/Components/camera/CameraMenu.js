import React from 'react';
import { Box, Typography } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Camera-style section menu displayed inside the LCD.
 * Lists all portfolio sections with active indicator.
 */
const menuItems = [
  { id: 'Home', label: 'PROFILE', icon: '\u{1F3E0}', color: '#e8b6a2' },
  { id: 'Projects', label: 'PROJECTS', icon: '\u{1F4C1}', color: '#f1a17d' },
  { id: 'Experience', label: 'CAREER', icon: '\u{1F4BC}', color: '#a9d6b7' },
  { id: 'About', label: 'ABOUT', icon: '\u{1F464}', color: '#7eb8d6' },
  { id: 'Gallery', label: 'GALLERY', icon: '\u{1F4F7}', color: '#e4c28f' },
];

export default function CameraMenu({ menuIndex, onNavigate, onConfirm, onExit }) {
  return (
    <Box
      sx={{
        position: 'absolute',
        inset: 0,
        zIndex: 50,
        display: 'flex',
        flexDirection: 'column',
        background: 'rgba(5,5,8,0.92)',
        backdropFilter: 'blur(8px)',
      }}
    >
      {/* Menu header */}
      <Box
        sx={{
          px: 2,
          py: 1.5,
          borderBottom: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        <Typography
          variant="caption"
          sx={{
            fontFamily: 'monospace',
            fontSize: 11,
            color: 'rgba(246,244,239,0.5)',
            letterSpacing: 2,
          }}
        >
          MENU
        </Typography>
      </Box>

      {/* Menu items */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 0.5, p: 2 }}>
        <AnimatePresence>
          {menuItems.map((item, index) => (
            <motion.button
              key={item.id}
              type="button"
              onClick={() => onNavigate(index)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onConfirm(index);
                }
              }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ delay: index * 0.05 }}
              style={{
                width: '100%',
                background: 'transparent',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                textAlign: 'left',
              }}
              aria-label={`Select ${item.label}`}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  px: 2,
                  py: 1.25,
                  borderRadius: 1,
                  background: index === menuIndex
                    ? 'rgba(232,182,162,0.12)'
                    : 'transparent',
                  border: index === menuIndex
                    ? '1px solid rgba(232,182,162,0.3)'
                    : '1px solid transparent',
                  transition: 'all 150ms ease',
                }}
              >
                {/* Selection indicator */}
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: index === menuIndex ? item.color : 'rgba(246,244,239,0.2)',
                    boxShadow: index === menuIndex ? `0 0 8px ${item.color}40` : 'none',
                    flexShrink: 0,
                  }}
                />

                {/* Icon */}
                <Box sx={{ fontSize: 18, flexShrink: 0 }}>{item.icon}</Box>

                {/* Label */}
                <Typography
                  sx={{
                    fontFamily: 'monospace',
                    fontSize: 13,
                    color: index === menuIndex ? item.color : 'rgba(246,244,239,0.6)',
                    letterSpacing: 1.5,
                    fontWeight: index === menuIndex ? 700 : 400,
                  }}
                >
                  {item.label}
                </Typography>

                {/* Right arrow for active */}
                {index === menuIndex && (
                  <Box sx={{ ml: 'auto', color: item.color, fontSize: 14 }}>▶</Box>
                )}
              </Box>
            </motion.button>
          ))}
        </AnimatePresence>
      </Box>

      {/* Menu footer */}
      <Box
        sx={{
          px: 2,
          py: 1.5,
          borderTop: '1px solid rgba(255,255,255,0.1)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography
          variant="caption"
          sx={{
            fontFamily: 'monospace',
            fontSize: 9,
            color: 'rgba(246,244,239,0.35)',
          }}
        >
          ▲▼ NAV  ● SELECT  ESC EXIT
        </Typography>
        <Box
          onClick={onExit}
          role="button"
          aria-label="Exit menu"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onExit(); } }}
          sx={{
            cursor: 'pointer',
            px: 1.5,
            py: 0.5,
            borderRadius: 1,
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.15)',
          }}
        >
          <Typography
            variant="caption"
            sx={{
              fontFamily: 'monospace',
              fontSize: 10,
              color: 'rgba(246,244,239,0.6)',
            }}
          >
            EXIT
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
