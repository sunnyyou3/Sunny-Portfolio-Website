/**
 * OKButton - Confirmation button for navigation and Easter eggs
 *
 * The primary action button in the camera theme UI. Used for:
 * - Confirming LCD tab selection
 * - Shutter button Easter egg activation
 * - Menu selection confirmation
 *
 * House rules compliance:
 * - Flat, single-colour fill (no gradients)
 * - No shadows on static element
 * - Fully rounded corners (camera theme aesthetic)
 * - ARIA labels for accessibility
 * - Focus management with visible focus ring
 * - Keyboard: Enter/Space activation
 * - prefers-reduced-motion: no extra travel, just immediate action
 */

import React from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useCameraThemeHook } from '../../hooks/useCameraThemeHook';

/**
 * OKButton component
 *
 * Props:
 *  - onConfirm?: () => void - callback when button is confirmed/pressed
 *  - children: React.ReactNode - button content (typically 'OK' or icon)
 *  - disabled?: boolean - whether button is disabled
 *
 * Features:
 * - Flat teal accent fill (matches design palette)
 * - White text for contrast on teal
 * - Focus-visible ring: white outline
 * - Minimal press animation (scale only)
 * - Respects prefers-reduced-motion (no fade/transform delays)
 */

export function OKButton({ onConfirm, children, disabled }: { onConfirm?: () => void; children: React.ReactNode; disabled?: boolean }) {
  const { assembled, lcdTab, setLcdTab, prefersReducedMotion } = useCameraThemeHook();

  const handleClick = () => {
    onConfirm?.();
    // If confirming tab selection and not in reduced motion, could add subtle feedback
    // But house rule: keep it flat and instant
    setLcdTab(lcdTab); // Re-confirm current tab (no-op but semantic)
  };

  return (
    <motion.button
      onClick={handleClick}
      disabled={disabled}
      whileHover={{ scale: 0.98 }}
      whileFocus={{ scale: 1.02 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.1 }}
      aria-label="Confirm selection"
      role="button"
    >
      <Box
        sx={{
          // House rule: flat, no gradient, no shadow
          bgcolor: 'var(--color-accent)',
          color: '#fff',
          border: 'none',
          borderRadius: 'full',
          py: 0.5,
          px: 2,
          fontSize: '0.875rem',
          fontWeight: 700,
          fontFamily: '"Inter", system-ui, sans-serif',
          cursor: disabled ? 'not-available' : 'pointer',
          '&:focus-visible': {
            outline: '2px solid #fff',
            outlineOffset: '4px',
          },
          '&:disabled': {
            opacity: 0.5,
            cursor: 'not-available',
          },
        }}
      >
        {children}
      </Box>
    </motion.button>
  );
}

/**
 * OKButton Acceptance Criteria:
 * - [ ] Flat teal accent fill, white text (design palette compliance)
 * - [ ] No gradients, no shadows on static element (house rules)
 * - [ ] Focus-visible: white outline 2px with 4px offset
 * - [ ] Keyboard: Enter/Space activates
 * - [ ] Callback: onConfirm fired on click
 * - [ ] integrates with useCameraThemeHook (assembled, lcdTab, prefersReducedMotion)
 * - [ ] prefers-reduced-motion: transition duration sets to 0 when enabled
 * - [ ] Fully rounded corners (camera theme aesthetic)
 * - [ ] ARIA label for accessibility
 */

export default OKButton;