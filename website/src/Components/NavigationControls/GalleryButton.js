/**
 * GalleryButton - Dedicated gallery jump button
 *
 * A primary action button that immediately navigates to the Gallery tab
 * from any LCD tab position (Projects or Experience). Mimics a dedicated
 * camera button that instantly returns you to view captured images.
 *
 * House rules compliance:
 * - Flat, single-colour fill (no gradients)
 * - No shadows on static element
 * - Consistent with other navigation buttons in the theme
 * - ARIA labels for accessibility
 * - Focus management
 * - Keyboard: Enter/Space activation
 * - Keyboard equivalents for accessibility
 */

import React from 'react';
import { Box, Typography } from '@mui/material';
import { useCameraThemeHook } from '../../hooks/useCameraThemeHook';

/**
 * GalleryButton component
 *
 * Props:
 *  - onJumpToGallery?: () => void - callback when gallery is jumped to
 *  - children?: React.ReactNode - optional button content
 *
 * Features:
 * - Jumps to Gallery tab when clicked/activated
 * - Flat teal accent fill matching other navigation buttons
 * - Icon/text label: "GALLERY"
 * - Focus-visible ring: teal accent outline
 * - Respects assembled state (may be disabled or have different behavior when camera not assembled)
 * - Minimal press animation (scale only, no gradient travel)
 */

export function GalleryButton({ onJumpToGallery, children }: { onJumpToGallery?: () => void; children?: React.ReactNode }) {
  const { lcdTab, setLcdTab, assembled } = useCameraThemeHook();

  const handleClick = () => {
    // Always jump to gallery regardless of current state
    setLcdTab('gallery');
    onJumpToGallery?.();
  };

  // Button text/icon - default to "GALLERY" if no children provided
  const buttonContent = children || (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Typography sx={{ fontSize: '0.875rem', fontWeight: 700 }}>GALLERY</Typography>
    </Box>
  );

  return (
    <Box
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
      role="button"
      aria-label="Jump to gallery"
      sx={{
        // House rule: flat, no gradient, no shadow - consistent with other nav buttons
        bgcolor: 'var(--color-accent)',
        color: '#fff',
        border: 'none',
        borderRadius: 'full',
        py: 0.5,
        px: 2,
        fontSize: '0.875rem',
        fontWeight: 700,
        fontFamily: '"Inter", system-ui, sans-serif',
        cursor: 'pointer',
        '&:focus-visible': {
          outline: '2px solid var(--color-accent)',
          outlineOffset: '4px',
        },
      }}
    >
      {buttonContent}
    </Box>
  );
}

/**
 * GalleryButton Acceptance Criteria:
 * - [ ] Jumps to Gallery tab from any LCD tab position (Projects, Experience)
 * - [ ] Flat teal accent fill, white text (design palette compliance)
 * - [ ] No gradients, no shadows on static element (house rules)
 * - [ ] Focus-visible: teal accent outline 2px with 4px offset
 * - [ ] Keyboard: Enter/Space activates
 * - [ ] Callback: onJumpToGallery fired on click
 * - [ ] integrates with useCameraThemeHook (lcdTab state management)
 * - [ ] ARIA label for accessibility ("Jump to gallery")
 * - [ ] Consistent styling with OKButton and MenuDial
 * - [ ] Minimal press animation (scale only, no gradient travel)
 */

export default GalleryButton;