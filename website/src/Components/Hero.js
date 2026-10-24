import React, { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { about } from '../data/about';
import MetroHero from './ui/MetroHero';
import CameraVideo from './ui/CameraVideo';

const STORAGE_KEY = 'hero-theme-preference';

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

  // Single scroll progress (0-1) that drives both MetroHero and CameraVideo
  // MetroHero visible: 0.0 → 0.5
  // CameraVideo visible: 0.5 → 1.0
  const [scrollProgress, setScrollProgress] = useState(0);
  const isRevealedRef = useRef(false);

  const t = themeTokens[theme];

  // Threshold at which MetroHero ends and CameraVideo begins
  const METRO_THRESHOLD = 0.5;

  // Hero UI content fades out once MetroHero starts playing
  const heroContentOpacity = scrollProgress > 0.1
    ? Math.max(0, 1 - (scrollProgress - 0.1) / 0.15)
    : 1;

  // Lock body scroll at mount, unlock when revealed
  useEffect(() => {
    const lockBody = () => {
      if (typeof document === 'undefined') return;
      const body = document.body;
      body.style.position = 'fixed';
      body.style.top = `-${window.scrollY}px`;
      body.style.left = '0';
      body.style.right = '0';
      body.style.width = '100%';
      body.style.height = '100%';
      body.style.overflow = 'hidden';
    };

    const unlockBody = () => {
      if (typeof document === 'undefined') return;
      const body = document.body;
      body.style.position = '';
      body.style.top = '';
      body.style.left = '';
      body.style.right = '';
      body.style.width = '';
      body.style.height = '';
      body.style.overflow = '';
      window.scrollTo(0, window.scrollY);
    };

    lockBody();
    return () => {
      if (!isRevealedRef.current) unlockBody();
    };
  }, []);

  // Handle MetroHero progress — drives the shared scrollProgress
  const handleMetroProgress = useCallback((p) => {
    // Map MetroHero's 0-1 progress to 0-METRO_THRESHOLD (0-0.5)
    setScrollProgress(p * METRO_THRESHOLD);
  }, [METRO_THRESHOLD]);

  // Handle CameraVideo progress — drives the shared scrollProgress
  const handleCameraProgress = useCallback((p) => {
    // Map CameraVideo's 0-1 progress to METRO_THRESHOLD-1 (0.5-1.0)
    setScrollProgress(METRO_THRESHOLD + p * (1 - METRO_THRESHOLD));
  }, [METRO_THRESHOLD]);

  // Handle CameraVideo finishing — reveal PortfolioMenu
  const handleCameraFinish = useCallback(() => {
    if (isRevealedRef.current) return;
    isRevealedRef.current = true;
    if (onCameraReveal) onCameraReveal();
  }, [onCameraReveal]);

  return (
    <section
      className="hero-section h-screen w-full flex items-center overflow-hidden relative transition-colors duration-700"
      style={{ backgroundColor: 'transparent' }}
      aria-label="Introduction"
    >
      {/* === MetroHero — renders when scrollProgress < threshold === */}
      {scrollProgress < METRO_THRESHOLD && (
        <div className="absolute inset-0 z-0">
          <MetroHero
            title=""
            tagline=""
            scrollHint=""
            signature={false}
            lockUntilEnd={false}
            onProgress={handleMetroProgress}
            className="absolute inset-0 z-0"
            style={{ position: "absolute", height: "100%" }}
          />
        </div>
      )}

      {/* === CameraVideo — renders when scrollProgress >= threshold === */}
      {scrollProgress >= METRO_THRESHOLD && (
        <div className="absolute inset-0 z-10">
          <CameraVideo
            lockUntilEnd={false}
            onProgress={handleCameraProgress}
            onReveal={handleCameraFinish}
            zoomScale={3}
            className="absolute inset-0"
            style={{ position: "absolute" }}
          />
        </div>
      )}

      {/* === Hero UI content — fades as MetroHero plays === */}
      <AnimatePresence>
        {heroContentOpacity > 0 && (
          <motion.div
            className="relative z-20 h-full flex items-center justify-center"
            initial={{ opacity: 1 }}
            animate={{ opacity: heroContentOpacity }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
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
                className="flex-1 w-full md:w-auto md:self-end md:pb-16 lg:pb-24"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >

                {/* Status badge */}
                <motion.div custom={0} variants={textVariants} className="flex items-center gap-2 mb-6">
                  <span
                    className="inline-block w-2 h-2 rounded-full animate-pulse"
                    style={{ backgroundColor: '#ff6b35' }}
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
                    style={{ backgroundColor: '#ff6b35' }}
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
                      style={{ backgroundColor: '#ff6b35', translateX: '-1.5px' }}
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
