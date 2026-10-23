import React, { useEffect, useState } from 'react';
import useCameraThemeHook from './useCameraThemeHooks.js';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * CameraAssembly component
 *
 * Coordinates the camera assembly animation and session state.
 * Camera3DScene handles the actual 3D visuals.
 */
export function CameraAssembly({ onAssemblyComplete }) {
  const { assembled, setAssembled } = useCameraThemeHook();
  const prefersReducedMotion = useReducedMotion();

  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (assembled) {
      setIsAnimating(false);
      return undefined;
    }

    let completionTimer;

    const completeAssembly = () => {
      setAssembled(true);
      setIsAnimating(false);
      onAssemblyComplete?.();
    };

    if (prefersReducedMotion) {
      completeAssembly();
      return undefined;
    }

    setIsAnimating(true);

    completionTimer = setTimeout(completeAssembly, 2500);

    return () => {
      clearTimeout(completionTimer);
    };
  }, [assembled, prefersReducedMotion, setAssembled, onAssemblyComplete]);

  if (assembled || !isAnimating) {
    return null;
  }

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        color: '#777777',
        fontFamily: 'var(--font-body)',
        fontSize: '1rem',
      }}
      role="status"
      aria-live="polite"
    >
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
      >
        Building your camera…
      </motion.div>
    </div>
  );
}

CameraAssembly.displayName = 'CameraAssembly';

export default CameraAssembly;