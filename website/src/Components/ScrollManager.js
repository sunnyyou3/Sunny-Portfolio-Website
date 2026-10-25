import React, { useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Hero } from './Hero';
import { PortfolioMenu } from './PortfolioMenu';
import { ProjectsSection } from './ProjectsSection';
import { GallerySection } from './GallerySection';
import { AboutSection } from './AboutSection';
import { CareerSection } from './CareerSection';

/**
 * ScrollManager - The main scroll-driven experience orchestrator.
 * 
 * Flow:
 * 1. Hero (MetroHero + CameraVideo) — scroll-locked stages, zooms to reveal portfolio
 * 2. PortfolioMenu — appears after CameraVideo zoom-to-reveal
 * 3. Portfolio sections — Projects, Gallery, About, Career
 */
export const ScrollManager = () => {
  const scrollContainerRef = useRef(null);
  const reverseScrollStartedAtRef = useRef(null);
  const lastReverseScrollAtRef = useRef(null);
  const [portfolioSection, setPortfolioSection] = useState(null);
  const [cameraRevealed, setCameraRevealed] = useState(false);

  // Notify Hero that the camera zoom-to-reveal has completed
  const handleCameraReveal = useCallback((revealed) => {
    setCameraRevealed(revealed);
    if (!revealed) setPortfolioSection(null);
  }, []);

  const handleOverlayWheelCapture = useCallback((event) => {
    event.stopPropagation();

    const now = performance.now();
    if (event.deltaY >= 0 ||
        (lastReverseScrollAtRef.current !== null && now - lastReverseScrollAtRef.current > 180)) {
      reverseScrollStartedAtRef.current = null;
    }

    if (event.deltaY < 0) {
      reverseScrollStartedAtRef.current ??= now;
      if (now - reverseScrollStartedAtRef.current >= 850) {
        reverseScrollStartedAtRef.current = null;
        lastReverseScrollAtRef.current = null;
        handleCameraReveal(false);
        return;
      }
    }

    lastReverseScrollAtRef.current = event.deltaY < 0 ? now : null;
  }, [handleCameraReveal]);

  // Handle portfolio section selection
  const handleSelectSection = (sectionId) => {
    setPortfolioSection(sectionId);
  };

  const handleBackToMenu = () => {
    setPortfolioSection(null);
  };

  return (
    <div ref={scrollContainerRef} className="scroll-container relative">
      {/* === HERO (MetroHero → CameraVideo → zoom-to-reveal) === */}
      <div className="relative h-[100vh]">
        <Hero onCameraReveal={handleCameraReveal} />
      </div>

      {/* === PORTFOLIO MENU (appears after camera zoom) === */}
      <AnimatePresence>
        {cameraRevealed && (
          <motion.div
            className="fixed inset-3 md:inset-8 z-50 overflow-hidden rounded-xl"
            onWheelCapture={handleOverlayWheelCapture}
            onTouchStartCapture={(event) => event.stopPropagation()}
            onTouchMoveCapture={(event) => event.stopPropagation()}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {!portfolioSection && <PortfolioMenu onSelect={handleSelectSection} />}
            
            {/* Back button — visible when a section is selected */}
            {portfolioSection && (
              <button
                onClick={handleBackToMenu}
                className="absolute top-8 left-4 z-[100] lcd-text text-xs text-white/40 hover:text-accent-orange transition-colors duration-200 flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                BACK
              </button>
            )}

            {/* Section content */}
            {portfolioSection && (
              <motion.div
                key={portfolioSection}
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {portfolioSection === 'projects' && <ProjectsSection />}
                {portfolioSection === 'gallery' && <GallerySection />}
                {portfolioSection === 'about' && <AboutSection />}
                {portfolioSection === 'career' && <CareerSection />}
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
