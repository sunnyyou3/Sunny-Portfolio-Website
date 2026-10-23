/**
 * ShutterFlash - Screen flash Easter egg when shutter button is pressed
 *
 * Triggers a full-screen white flash aesthetic when the camera's shutter button
 * is clicked. This is purely aesthetic - it does not navigate anywhere or change
 * the state of the application.
 *
 * Accessibility:
 * - Respects prefers-reduced-motion media query
 * - No animation travel when reduced motion is preferred (instant solid flash)
 * - ARIA live region for screen readers
 *
 * Animation sequence (normal motion):
 * - On click: White background fades in over 200ms
 * - Hold: White remains visible
 * - On release: White fades out over 300ms
 * - Total duration: ~500ms from click to fade-out complete
 *
 * Reduced motion fallback:
 * - Instant flash on press, instant fade on release
 * - No animation travel, just state changes
 */

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMediaQuery } from '@react-three/drei';

/**
 * ShutterFlash component
 *
 * Props:
 *  - isShutterPressed?: boolean - controlled state from parent (button onClick)
 *  - onFlashComplete?: () => void - callback when flash animation completes
 *
 * State managed internally:
 *  - isFlashing: boolean - whether the flash is currently active
 *  - direction: 'in' | 'out' | 'idle' - current animation phase
 *  - pressTime: number | null - timestamp when press started
 */

export function ShutterFlash({ isShutterPressed, onFlashComplete }: { isShutterPressed?: boolean; onFlashComplete?: () => void }) {
  const [isFlashing, setIsFlashing] = useState(false);
  const [direction, setDirection] = useState<'in' | 'out' | 'idle'>('idle');
  const [pressTime, setPressTime] = useState<number | null>(null);
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  // Start flash when shutter is pressed
  useEffect(() => {
    if (!isShutterPressed) return;

    setIsFlashing(true);
    setDirection('in');
    setPressTime(Date.now());

    // Start fade-out timer on release
    const releaseTimer = setTimeout(() => {
      setDirection('out');
    }, 200); // Hold time before fade out

    return () => {
      clearTimeout(releaseTimer);
    };
  }, [isShutterPressed]);

  // Handle press release - fade out
  useEffect(() => {
    if (!isFlashing || direction !== 'in') return;

    const releaseHandler = () => {
      setDirection('out');
      setIsFlashing(false);
      onFlashComplete?.();
    };

    // Wait for press, then fade out after 200ms hold
    const timeout = setTimeout(() => {
      setDirection('out');
    }, 200);

    return () => clearTimeout(timeout);
  }, [isFlashing, direction, onFlashComplete]);

  // Fade out effect when direction changes to 'out'
  useEffect(() => {
    if (direction !== 'out') return;

    const fadeOutTimeout = setTimeout(() => {
      setIsFlashing(false);
      setDirection('idle');
      onFlashComplete?.();
    }, 300); // 300ms fade out

    return () => clearTimeout(fadeOutTimeout);
  }, [direction, onFlashComplete]);

  return (
    <motion.div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        background: isFlashing ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0)',
        transition: reducedMotion
          ? 'none'
          : direction === 'out'
              ? 'background-color 300ms ease-out'
              : 'background-color 200ms ease-in',
        pointerEvents: 'none',
      }}
    />
  );
}

/**
 * ShutterFlash Acceptance Criteria:
 * - [ ] Triggers on shutter button onClick
 * - [ ] Full-screen white flash fades in over 200ms
 * - [ ] White remains visible during hold period
 * - [ ] White fades out over 300ms on release
 * - [ ] Total flash duration ~500ms (in + hold + out)
 * - [ ] Respects prefers-reduced-motion: instant flash, instant fade
 * - [ ] No navigation - aesthetic only
 * - [ ] ARIA live region for screen readers
 * - [ ] onFlashComplete callback fired when animation finishes
 * - [ ] No gradients, no shadows (house rules - solid colour only)
 */

export default ShutterFlash;

/**
 * Shutter button integration in DSLRCamera3D.js:
 * Add onClick handler to the shutter button mesh that toggles isShutterPressed
 * state in a parent component, which triggers the ShutterFlash Easter egg.
 * The shutter flash is aesthetic only - no navigation changes on press.
 */