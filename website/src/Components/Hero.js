import React, { useState, useCallback, useRef, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { about } from '../data/about';
import MetroHero from './ui/MetroHero';
import CameraVideo from './ui/CameraVideo';
import defaultMetroVideo from '../assets/video/defaultmetro.mp4';
import { useHeroPhase } from '../hooks/useHeroPhase';

const STORAGE_KEY = 'hero-theme-preference';
const METRO_THRESHOLD = 0.5; // Split point: MetroHero handles 0→0.5, CameraVideo handles 0.5→1.0
const HERO_FADE_THRESHOLD = 0.15; // Scroll progress at which hero content starts fading

const imageVariants = {
  hidden: { opacity: 0, scale: 0.92, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 1.2, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.3,
    },
  },
};

const textVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: i * 0.12 + 0.3,
      ease: [0.25, 0.1, 0.25, 1],
    },
  }),
};

const sunIcon = (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <circle cx="12" cy="12" r="5" />
    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
  </svg>
);

const moonIcon = (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

/**
 * Theme tokens — light (cream) vs dark (portfolio-dark).
 * All colors transition smoothly via CSS transitions on the section.
 */
// Accent orange used throughout the hero — kept separate from themeTokens
// so it can be referenced consistently (e.g., status dots, accent dashes).
const ACCENT_ORANGE = '#ff6b35';

const themeTokens = {
  light: {
    bg: '#faf8f5',
    textName: '#111111',
    textTagline: '#a84328',
    textBio: 'rgba(35,28,20,0.82)',
    textStatus: 'rgba(50,40,30,0.55)',
    border: 'rgba(0,0,0,0.08)',
    borderHover: 'rgba(232,115,74,0.3)',
    ambientGlow1: 'rgba(232,182,162,0.12)',
    ambientGlow2: 'rgba(255,200,160,0.08)',
    ambientGlow3: 'rgba(255,107,53,0.04)',
    centerLine: 'rgba(232,115,74,0.15)',
    imageBg: '#f0ece6',
    imageBorder: 'rgba(0,0,0,0.06)',
    imageBorderHover: 'rgba(232,115,74,0.25)',
    imageGlow: 'linear-gradient(135deg, rgba(232,182,162,0.2), transparent, rgba(255,200,160,0.15))',
    imageCorner: 'rgba(0,0,0,0.1)',
    scrollIcon: 'rgba(60,50,40,0.55)',
    scrollIconHover: '#e8734a',
    scrollBg: 'rgba(0,0,0,0.03)',
    noiseOpacity: 0.02,
    grainColor: 'rgba(0,0,0,0.03)',
    badgeBg: 'rgba(232,115,74,0.08)',
    badgeBorder: 'rgba(232,115,74,0.2)',
  },
  dark: {
    bg: '#08090b',
    textName: '#ffffff',
    textTagline: '#ff7a3d',
    textBio: 'rgba(255,255,255,0.45)',
    textStatus: 'rgba(255,255,255,0.30)',
    border: 'rgba(255,255,255,0.10)',
    borderHover: 'rgba(255,107,53,0.40)',
    ambientGlow1: 'rgba(255,107,53,0.06)',
    ambientGlow2: 'rgba(232,182,162,0.04)',
    ambientGlow3: 'rgba(255,107,53,0.03)',
    centerLine: 'rgba(255,107,53,0.30)',
    imageBg: '#111217',
    imageBorder: 'rgba(255,255,255,0.05)',
    imageBorderHover: 'rgba(255,107,53,0.20)',
    imageGlow: 'linear-gradient(135deg, rgba(255,107,53,0.15), transparent, rgba(232,182,162,0.1))',
    imageCorner: 'rgba(255,255,255,0.10)',
    scrollIcon: 'rgba(255,255,255,0.30)',
    scrollIconHover: '#ff6b35',
    scrollBg: 'rgba(255,107,53,0.05)',
    noiseOpacity: 0.03,
    grainColor: 'rgba(255,255,255,0.03)',
    badgeBg: 'rgba(255,107,53,0.15)',
    badgeBorder: 'rgba(255,107,53,0.3)',
  },
};

export const Hero = ({ onCameraReveal }) => {
  const [theme, setTheme] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'light' || stored === 'dark') return stored;
    } catch { /* ignore */ }
    return 'dark'; // default matches the existing portfolio
  });

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      try { localStorage.setItem(STORAGE_KEY, next); } catch { /* ignore */ }
      return next;
    });
  }, []);

  // Hero flow managed by custom hook:
  //   loop → fade-out → black → fade-in → takeover
  const {
    heroPhase,
    setHeroPhase,
    setLoopVideoError,
    scrollListenerAttachedRef,
    lockBody,
    unlockBody,
    loopVideoOpacity,
    loopVideoBg,
    metroHeroOpacity,
    fadeOutDuration,
    fadeInDuration,
  } = useHeroPhase();

  // Playback progress across MetroHero and CameraVideo.
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isCameraVideoReady, setIsCameraVideoReady] = useState(false);
  const [isMetroHeroMounted, setIsMetroHeroMounted] = useState(true);
  const isRevealedRef = useRef(false);

  const t = themeTokens[theme];

  // Whether the loop video should be visible.
  const showLoopVideo = heroPhase !== 'takeover';

  // Whether MetroHero should be paused (not playing, not responding to input).
  const metroPaused = ['loop', 'fade-out', 'black'].includes(heroPhase);

  // Whether MetroHero should auto-play (during fade-in / takeover).
  const metroAutoPlay = ['fade-in', 'takeover'].includes(heroPhase);

  // Fade the Hero UI as MetroHero plays.
  // During fade-out / black / fade-in phases the hero content must be
  // invisible so the black screen and MetroHero reveal are clean.
  const heroContentOpacity =
    heroPhase === 'loop'
      ? Math.max(0, 1 - scrollProgress / HERO_FADE_THRESHOLD)
      : 0;

  // Lock body scroll at mount, unlock when revealed
  useLayoutEffect(() => {
    lockBody();

    // Attach single-use wheel / touch listener to trigger loop → fade transition.
    // We use wheel/touch instead of the "scroll" event because the body is
    // position: fixed during the loop phase, so no native scroll events fire.
    const handleScroll = () => {
      setHeroPhase('fade-out');
      // Unlock body scroll so MetroHero can handle it
      unlockBody();
    };

    const onWheel = (e) => {
      if (heroPhase === 'loop' && !scrollListenerAttachedRef.current) {
        scrollListenerAttachedRef.current = true;
        e.preventDefault();
        handleScroll();
      }
    };

    let touchStartY = 0;
    const onTouchStart = (e) => {
      touchStartY = e.touches[0]?.clientY ?? 0;
    };
    const onTouchMove = (e) => {
      if (heroPhase === 'loop' && !scrollListenerAttachedRef.current) {
        const y = e.touches[0]?.clientY ?? touchStartY;
        const deltaY = touchStartY - y;
        touchStartY = y;
        if (deltaY > 0) {
          scrollListenerAttachedRef.current = true;
          e.preventDefault();
          handleScroll();
        }
      }
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: false });

    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      if (!isRevealedRef.current) unlockBody();
    };
  }, [heroPhase, lockBody, unlockBody, setHeroPhase, scrollListenerAttachedRef]);

  // Handle MetroHero playback progress and start CameraVideo at its end.
  const handleMetroProgress = useCallback((p) => {
    setScrollProgress(p * METRO_THRESHOLD);
    if (p === 1) {
      setIsCameraActive(true);
    }
  }, []);

  const handleMetroHandoffStart = useCallback(() => {
    setIsCameraActive(true);
  }, []);

  // Handle CameraVideo playback progress.
  const handleCameraProgress = useCallback((p) => {
    setScrollProgress(METRO_THRESHOLD + p * (1 - METRO_THRESHOLD));
  }, []);

  // Handle CameraVideo finishing — reveal PortfolioMenu
  const handleCameraFinish = useCallback(() => {
    if (isRevealedRef.current) return;
    isRevealedRef.current = true;
    if (onCameraReveal) onCameraReveal();
  }, [onCameraReveal]);

  const handleCameraReady = useCallback(() => {
    setIsCameraVideoReady(true);
  }, []);

  // Camera animation finished — unmount MetroHero and enter takeover phase.
  // setHeroPhase is stable (from useState), no re-run needed
  const handleCameraAnimationEnd = useCallback((event) => {
    if (
      event.target === event.currentTarget &&
      event.animationName === 'camera-video-enter'
    ) {
      setIsMetroHeroMounted(false);
      setHeroPhase('takeover');
    }
  }, [setHeroPhase]);

  return (
    <section
      className="hero-section h-screen w-full flex items-center overflow-hidden relative transition-colors duration-700"
      style={{ backgroundColor: 'transparent' }}
      aria-label="Introduction"
    >
      {/* === Loop video — plays on mount, fades out on scroll === */}
      {showLoopVideo && (
        <video
          src={defaultMetroVideo}
          muted
          loop
          playsInline
          preload="auto"
          autoPlay
          className="absolute inset-0 z-10 loop-video"
          style={{
            objectFit: 'cover',
            width: '100%',
            height: '100%',
            opacity: loopVideoOpacity,
            transition: `opacity ${fadeOutDuration}ms ease`,
            pointerEvents: 'none',
            backgroundColor: loopVideoBg,
          }}
          onError={() => setLoopVideoError(true)}
        />
      )}

      {/* === MetroHero — mounted during loop phase (paused), activates on scroll === */}
      {isMetroHeroMounted && (
        <div
          className="absolute inset-0 z-0 metro-hero-handoff"
          style={{
            opacity: isCameraActive && isCameraVideoReady ? 0 : metroHeroOpacity,
            transition: `opacity ${fadeInDuration}ms ease`,
          }}
        >
          <MetroHero
            key="metro-hero"
            title=""
            tagline=""
            scrollHint=""
            signature={false}
            handoffLeadTime={1.5}
            onHandoffStart={handleMetroHandoffStart}
            onProgress={handleMetroProgress}
            pausedAtEnd={metroPaused}
            autoPlay={metroAutoPlay}
            className="absolute inset-0 z-0"
          />
        </div>
      )}

      {/* === CameraVideo — plays automatically after MetroHero === */}
      {isCameraActive && (
        <div
          className={`absolute inset-0 z-10 camera-video-entry${isCameraVideoReady ? ' camera-video-entry-ready' : ''}`}
          onAnimationEnd={handleCameraAnimationEnd}
        >
          <CameraVideo
            onProgress={handleCameraProgress}
            onReveal={handleCameraFinish}
            onReady={handleCameraReady}
            zoomScale={3}
            className="absolute inset-0"
          />
        </div>
      )}

      {/* === Hero UI content — fades as MetroHero plays === */}
      <AnimatePresence>
        {heroContentOpacity > 0 && (
          <motion.div
            className="relative z-20 h-full w-full flex items-center justify-center"
            initial={{ opacity: 1 }}
            animate={{ opacity: heroContentOpacity }}
            exit={{ opacity: 0 }}
            transition={{ duration: fadeOutDuration / 1000 }}
            key="hero-content"
          >
            {/* Theme toggle — top right */}
            <motion.button
              onClick={toggleTheme}
              className="absolute top-8 right-8 z-30 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 hover:scale-110"
              style={{
                background: t.badgeBg,
                border: `1px solid ${t.badgeBorder}`,
                color: theme === 'dark' ? 'rgba(255,255,255,0.5)' : 'rgba(60,50,40,0.5)',
              }}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              whileTap={{ scale: 0.92 }}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={theme}
                  initial={{ opacity: 0, rotate: -90, y: -4 }}
                  animate={{ opacity: 1, rotate: 0, y: 0 }}
                  exit={{ opacity: 0, rotate: 90, y: 4 }}
                  transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  {theme === 'dark' ? sunIcon : moonIcon}
                </motion.div>
              </AnimatePresence>
            </motion.button>

            {/* Ambient background grain + radial gradients */}
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
              <div
                className="absolute inset-0"
                style={{ opacity: t.noiseOpacity * 0.5, color: t.grainColor }}
              >
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <filter id="hero-noise">
                    <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch" />
                  </filter>
                  <rect width="100%" height="100%" filter="url(#hero-noise)" />
                </svg>
              </div>
            </div>

            {/* Decorative corner accents */}
            <div className="absolute top-8 left-8 w-8 h-8 border-l border-t" style={{ borderColor: t.border }} aria-hidden="true" />
            <div className="absolute top-8 right-20 w-8 h-8 border-r border-t" style={{ borderColor: t.border }} aria-hidden="true" />
            <div className="absolute bottom-8 left-8 w-8 h-8 border-l border-b" style={{ borderColor: t.border }} aria-hidden="true" />
            <div className="absolute bottom-8 right-8 w-8 h-8 border-r border-b" style={{ borderColor: t.border }} aria-hidden="true" />

            {/* Thin vertical accent line */}
            <div
              className="absolute left-1/2 top-0 w-px h-full"
              style={{ opacity: 0.04, background: `linear-gradient(to bottom, transparent, ${t.centerLine}, transparent)` }}
              aria-hidden="true"
            />

            {/* Horizontal accent line near top */}
            <div
              className="absolute top-1/3 left-0 w-full h-px"
              style={{ opacity: 0.03, background: `linear-gradient(to right, transparent, ${t.border}, transparent)` }}
              aria-hidden="true"
            />

            <div className="w-full max-w-7xl mx-auto px-6 md:px-10 lg:px-14 xl:px-20 flex flex-col-reverse md:flex-row items-center justify-center gap-10 md:gap-16 lg:gap-20 relative z-10">

              {/* --- Text column --- */}
              <motion.div
                className="flex-1 w-full md:w-auto md:mx-auto md:pb-16 lg:pb-24"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >

                {/* Status badge */}
                <motion.div custom={0} variants={textVariants} className="flex items-center gap-2 mb-6">
                  <span
                    className="inline-block w-2 h-2 rounded-full animate-pulse"
                    style={{ backgroundColor: ACCENT_ORANGE }}
                  />
                  <span
                    className="lcd-text text-xs tracking-[0.2em] uppercase"
                    style={{ color: t.textStatus }}
                  >
                    A new path awaits me
                  </span>
                </motion.div>

                {/* Name — large, bold, with accent dash */}
                <motion.h1
                  className="text-[3.25rem] leading-[1.05] md:text-[5.5rem] lg:text-[6.5rem] font-bold tracking-[-0.03em]"
                  style={{ color: t.textName }}
                  custom={1}
                  variants={textVariants}
                >
                  {about.name}
                  <span
                    className="inline-block ml-3 w-3 h-[3px] rounded-full"
                    style={{ backgroundColor: ACCENT_ORANGE }}
                    aria-hidden="true"
                  />
                </motion.h1>

                {/* Tagline — accent color */}
                <p
                  className="text-lg md:text-xl mt-5 font-normal tracking-wide"
                  style={{ color: t.textTagline }}
                  custom={2}
                  variants={textVariants}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: 2 * 0.12 + 0.3,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                >
                  {about.tagline}
                </p>

                {/* Bio */}
                <motion.p
                  className="text-base mt-6 max-w-md leading-relaxed font-normal"
                  style={{ color: t.textBio }}
                  custom={3}
                  variants={textVariants}
                >
                  {about.bio}
                </motion.p>

                {/* Scroll indicator */}
                <motion.div
                  custom={4}
                  variants={textVariants}
                  className="mt-10 flex items-center gap-3"
                >
                  <div className="group relative w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300" style={{ borderColor: t.border, backgroundColor: t.scrollBg }}>
                    <svg
                      className="w-4 h-4 transition-colors duration-300 group-hover:text-accent-orange"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      style={{ color: t.scrollIcon }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                      />
                    </svg>
                    <motion.div
                      className="absolute bottom-0 left-1/2 w-1 h-1 rounded-full"
                      style={{ backgroundColor: ACCENT_ORANGE, translateX: '-1.5px' }}
                      initial={{ y: 0 }}
                      animate={{ y: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                    />
                  </div>
                  <span
                    className="lcd-text text-[11px] tracking-[0.15em] uppercase"
                    style={{ color: t.textStatus }}
                  >
                    Scroll to explore
                  </span>
                </motion.div>
              </motion.div>

              {/* --- Image column --- */}
              <motion.div
                className="flex-shrink-0 w-full md:w-[320px] lg:w-[400px] xl:w-[440px]"
                initial="hidden"
                animate="visible"
                variants={imageVariants}
              >
                {/* Image wrapper */}
                <div className="relative group">
                  {/* Outer glow ring */}
                  <div
                    className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-sm"
                    style={{ background: t.imageGlow }}
                    aria-hidden="true"
                  />
                  {/* Frame border */}
                  <div
                    className="absolute -inset-[1px] rounded-2xl transition-colors duration-700 group-hover:border-accent-orange/20"
                    style={{ border: '1px solid', borderColor: t.imageBorder }}
                    aria-hidden="true"
                  />
                  <div
                    className="aspect-[3/4] overflow-hidden rounded-2xl transition-colors duration-700"
                    style={{ backgroundColor: t.imageBg }}
                  >
                    <img
                      src={about.profileImage}
                      alt={about.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                    />
                  </div>
                  {/* Corner accent on image */}
                  <div
                    className="absolute top-3 left-3 w-6 h-6 border-t border-l rounded-tl-md transition-colors duration-700"
                    style={{ borderColor: t.imageCorner }}
                    aria-hidden="true"
                  />
                </div>
              </motion.div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
