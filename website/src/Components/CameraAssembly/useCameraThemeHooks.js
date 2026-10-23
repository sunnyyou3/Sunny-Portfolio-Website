/**
 * useCameraThemeHook - Core state management for the camera-themed portfolio UI.
 *
 * Manages camera assembly state, LCD tab selection, spin animation state,
 * and sessionStorage persistence.
 */

import { useEffect, useState, useCallback } from 'react';

const VALID_LCD_TABS = ['gallery', 'projects', 'experience'];

function readSessionValue(key) {
  try {
    if (typeof window === 'undefined') return null;
    return window.sessionStorage.getItem(key);
  } catch {
    // sessionStorage may be unavailable in private/incognito modes.
    return null;
  }
}

export default function useCameraThemeHook() {
  const [assembled, setAssembled] = useState(
    () => readSessionValue('cameraAssembled') === 'true'
  );

  const [lcdTab, setLcdTabState] = useState(() => {
    const stored = readSessionValue('lcdTab');
    return VALID_LCD_TABS.includes(stored) ? stored : 'gallery';
  });

  const [isSpinning, setIsSpinning] = useState(false);

  const persistAssembled = useCallback((value) => {
    try {
      if (typeof window !== 'undefined') {
        window.sessionStorage.setItem('cameraAssembled', String(value));
      }
    } catch {
      // Ignore unavailable sessionStorage.
    }
  }, []);

  const persistLcdTab = useCallback((tab) => {
    try {
      if (typeof window !== 'undefined') {
        window.sessionStorage.setItem('lcdTab', tab);
      }
    } catch {
      // Ignore unavailable sessionStorage.
    }
  }, []);

  const setLcdTab = useCallback(
    (tab) => {
      if (!VALID_LCD_TABS.includes(tab)) return;

      setLcdTabState(tab);
      persistLcdTab(tab);
    },
    [persistLcdTab]
  );

  const startSpin = useCallback(() => {
    setIsSpinning(true);
  }, []);

  const stopSpin = useCallback(() => {
    setIsSpinning(false);
  }, []);

  const resetSession = useCallback(() => {
    try {
      if (typeof window !== 'undefined') {
        window.sessionStorage.removeItem('cameraAssembled');
        window.sessionStorage.removeItem('lcdTab');
      }
    } catch {
      // Ignore unavailable sessionStorage.
    }

    setAssembled(false);
    setLcdTabState('gallery');
    setIsSpinning(false);
  }, []);

  useEffect(() => {
    persistAssembled(assembled);
  }, [assembled, persistAssembled]);

  useEffect(() => {
    persistLcdTab(lcdTab);
  }, [lcdTab, persistLcdTab]);

  return {
    assembled,
    setAssembled,
    lcdTab,
    isSpinning,
    setLcdTab,
    startSpin,
    stopSpin,
    resetSession,
  };
}