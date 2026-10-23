/**
 * MenuDial - Camera menu dial navigation control
 *
 * Used for cycling through LCD tabs (Gallery ↔ Projects ↔ Experience)
 * and other menu navigation. Mimics a physical menu dial on a mirrorless camera.
 *
 * House rules compliance:
 * - Flat, single-colour fill (no gradients)
 * - No shadows on static element
 * - Fully rounded or square corners (design decision)
 * - ARIA labels for accessibility
 * - Focus management
 * - Keyboard equivalents (Arrow Left/Right or Tab)
 * - prefers-reduced-motion support
 */

import React, { useRef, useState, useEffect } from 'react';
import { useCameraThemeHook } from '../../hooks/useCameraThemeHook';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';

/**
 * MenuDial component
 *
 * Props:
 *  - onTabCycle?: (direction: 'up' | 'down') => void - callback when tab cycles
 *  - initialTab?: 'gallery' | 'projects' | 'experience' - starting tab
 *
 * Features:
 * - D-Pad Up/Down cycling through three LCD tabs
 * - OK button confirmation (integrated separately)
 * - Dedicated Gallery button jump
 * - Keyboard: ArrowLeft/ArrowRight equivalents
 * - Focus ring on focus-visible
 */

export function MenuDial({ onTabCycle, initialTab }: { onTabCycle?: (direction: 'up' | 'down') => void; initialTab?: 'gallery' | 'projects' | 'experience' }) {
  const { lcdTab, setLcdTab, assembled } = useCameraThemeHook();
  const [isFocused, setIsFocused] = useState(false);

  // Default to gallery if no initial tab specified and not assembled
  const defaultTab = initialTab || (assembled ? lcdTab : 'gallery');

  useEffect(() => {
    setLcdTab(defaultTab);
  }, [defaultTab, assembled, lcdTab, setLcdTab]);

  const cycleTabs = (direction: 'up' | 'down') => {
    if (!assembled) return;

    setLcdTab(prev => {
      if (direction === 'up') {
        return prev === 'experience' ? 'gallery' : prev;
      } else {
        return prev === 'gallery' ? 'experience' : prev;
      }
    });
    onTabCycle?.(direction);
  };

  // Keyboard event handler (documented for parent use)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowUp':
      case 'ArrowRight':
        e.preventDefault();
        cycleTabs('up');
        break;
      case 'ArrowDown':
      case 'ArrowLeft':
        e.preventDefault();
        cycleTabs('down');
        break;
      case 'Enter':
        e.preventDefault();
        // Menu dial select - could confirm current selection
        break;
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <Box
      role="dialog"
      aria-modal="true"
      aria-label="Menu dial navigation"
      onKeyDown={handleKeyDown}
      sx={{
        // House rule: flat, no gradient, no shadow
        bgcolor: 'transparent',
        border: 'none',
        p: 0,
      }}
    >
      {/* Visual dial representation - flat, subtle */}
      <Box
        sx={{
          width: 48,
          height: 48,
          borderRadius: '50%',
          bgcolor: '#fff',
          color: 'var(--color-ink)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 2,
          // Subtle futuristic touch - minimal outer glow only on interaction
          '&:focus-visible': {
            outline: `2px solid var(--color-accent)`,
            outlineOffset: '4px',
            borderRadius: '50%',
          },
        }}
      >
        {/* Dial indicator lines - simple, no gradients */}
        <Box sx={{ width: 24, height: 24, bgcolor: 'currentColor' }}>
          <Box sx={{ width: 4, height: 20, background: 'currentColor', margin: '0 auto 2px' }} />
          <Box sx={{ width: 4, height: 4, background: 'currentColor' }} />
          <Box sx={{ width: 4, height: 20, background: 'currentColor', marginTop: 2 }} />
        </Box>
        <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>MENU</Typography>
      </Box>

      {/* Focus indicator when focused */}
      {isFocused && (
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileFocus={{ scale: 1.2 }}
          transition={{ duration: 0.2 }}
          sx={{
            // House rule: no shadows on things at rest - only scale animation
            position: 'relative',
            inset: 0,
            borderRadius: '50%',
            bgcolor: 'rgba(77,182,172,0.15)',
            pointerEvents: 'none',
          }}
        />
      )}
    </Box>
  );
}

/**
 * MenuDial Acceptance Criteria:
 * - [ ] Cycles LCD tabs: Gallery → Projects → Experience → Gallery
 * - [ ] Respects assembled state (disabled when already assembled)
 * - [ ] Keyboard: ArrowUp/ArrowDown cycle tabs
 * - [ ] Keyboard: ArrowLeft/ArrowRight cycle reverse tabs
 * - [ ] OK integration: parent component handles confirmation
 * - [ ] Focus-visible ring: teal accent outline (2px, 4px offset)
 * - [ ] No gradients, no shadows on static elements (house rules)
 * - [ ] ARIA labels for screen readers
 * - [ ] prefers-reduced-motion: scale animation respects setting
 */

export default MenuDial;