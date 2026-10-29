import { useState, useRef, useLayoutEffect, useCallback } from 'react';

/**
 * Custom hook for managing the hero flow:
 *   loop → fade-out → black → fade-in → takeover
 *
 *   1. loop       – loop video plays, MetroHero hidden
 *   2. fade-out   – loop video fades to 0 (slow), MetroHero still hidden
 *   3. black      – black screen held briefly (dramatic pause)
 *   4. fade-in    – MetroHero fades in from 0
 *   5. takeover   – MetroHero fully visible, loop video unmounted
 *
 * @param {Object} options
 * @param {number} options.fadeOutDuration  – loop video fade-out time in ms (default: 1200)
 * @param {number} options.blackHoldDuration – black-screen hold time in ms (default: 800)
 * @param {number} options.fadeInDuration   – MetroHero fade-in time in ms (default: 1200)
 * @returns {Object} Phase management state and handlers
 */
export function useHeroPhase({
  fadeOutDuration = 1200,
  blackHoldDuration = 800,
  fadeInDuration = 1200,
} = {}) {
  const [heroPhase, setHeroPhase] = useState('loop'); // 'loop' | 'fade-out' | 'black' | 'fade-in' | 'takeover'
  const [loopVideoError, setLoopVideoError] = useState(false);
  const fadeTimeoutRef = useRef(null);
  const bodyScrollTimeoutRef = useRef(null);
  const scrollListenerAttachedRef = useRef(false);

  // Chain phase transitions with timed delays
  useLayoutEffect(() => {
    if (heroPhase === 'fade-out') {
      fadeTimeoutRef.current = setTimeout(() => {
        setHeroPhase('black');
      }, fadeOutDuration);
    } else if (heroPhase === 'black') {
      fadeTimeoutRef.current = setTimeout(() => {
        setHeroPhase('fade-in');
      }, blackHoldDuration);
    } else if (heroPhase === 'fade-in') {
      fadeTimeoutRef.current = setTimeout(() => {
        setHeroPhase('takeover');
      }, fadeInDuration);
    }
    return () => {
      if (fadeTimeoutRef.current) {
        clearTimeout(fadeTimeoutRef.current);
      }
    };
  }, [heroPhase, fadeOutDuration, blackHoldDuration, fadeInDuration]);

  // No automatic fallback timeout — the loop video should continue looping
  // indefinitely until the user scrolls. This ensures the video never auto-
  // transitions to MetroHero without user input.

  // Lock body scroll at mount, unlock when revealed
  const { lockBody, unlockBody, scrollHandler } = useBodyScroll(heroPhase, scrollListenerAttachedRef);

  // Loop video opacity:
  //   loop       → 1
  //   fade-out   → 1 → 0 (CSS transition)
  //   black      → 0
  //   fade-in    → 0
  //   takeover   → 0 (unmounted)
  const loopVideoOpacity = heroPhase === 'loop' ? 1 : 0;
  const loopVideoBg = loopVideoError ? '#0a0a0a' : '#000000';

  // MetroHero container opacity:
  //   loop       → 0
  //   fade-out   → 0
  //   black      → 0
  //   fade-in    → 0 → 1 (CSS transition)
  //   takeover   → 1
  const metroHeroOpacity = heroPhase === 'fade-in' || heroPhase === 'takeover' ? 1 : 0;

  return {
    heroPhase,
    setHeroPhase,
    loopVideoError,
    setLoopVideoError,
    fadeTimeoutRef,
    bodyScrollTimeoutRef,
    scrollListenerAttachedRef,
    lockBody,
    unlockBody,
    scrollHandler,
    loopVideoOpacity,
    loopVideoBg,
    metroHeroOpacity,
    fadeOutDuration,
    blackHoldDuration,
    fadeInDuration,
  };
}

/**
 * Helper hook for body scroll lock/unlock
 */
function useBodyScroll(heroPhase, scrollListenerAttachedRef) {
  const lockBody = useCallback(() => {
    if (typeof document === 'undefined') return;
    const body = document.body;
    body.style.position = 'fixed';
    body.style.top = `-${window.scrollY}px`;
    body.style.left = '0';
    body.style.right = '0';
    body.style.width = '100%';
    body.style.height = '100%';
    body.style.overflow = 'hidden';
  }, []);

  const unlockBody = useCallback(() => {
    if (typeof document === 'undefined') return;
    const body = document.body;
    body.style.position = '';
    body.style.top = '';
    body.style.left = '';
    body.style.right = '';
    body.style.width = '';
    body.style.height = '';
    body.style.overflow = '';
    try { window.scrollTo(0, window.scrollY); } catch { /* ignore in SSR/tests */ }
  }, []);

  const scrollHandler = useCallback((handleScroll) => {
    if (heroPhase === 'loop' && !scrollListenerAttachedRef.current) {
      scrollListenerAttachedRef.current = true;
      handleScroll();
    }
  }, [heroPhase, scrollListenerAttachedRef]);

  return { lockBody, unlockBody, scrollHandler };
}
