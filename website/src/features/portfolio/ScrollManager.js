import React, { useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Hero } from '../hero/Hero';
import { PortfolioMenu } from './sections/PortfolioMenu';
import { ProjectsSection } from './sections/ProjectsSection';
import { GallerySection } from './sections/GallerySection';
import { AboutSection } from './sections/AboutSection';
import { CareerSection } from './sections/CareerSection';

/**
 * ScrollManager - The main scroll-driven experience orchestrator.
 * 
 * Flow:
 * 1. Hero (MetroHero + CameraVideo) — one scroll gesture starts both videos in sequence
 * 2. PortfolioMenu — appears after CameraVideo zoom-to-reveal
 * 3. Portfolio sections — Projects, Gallery, About, Career
 */
export const ScrollManager = () => {
  const scrollContainerRef = useRef(null);
  const [portfolioSection, setPortfolioSection] = useState(null);
  const [cameraRevealed, setCameraRevealed] = useState(false);

  const handleCameraReveal = useCallback(() => {
    setCameraRevealed(true);
  }, []);

  // Handle portfolio section selection
  const handleSelectSection = (sectionId) => {
    setPortfolioSection(sectionId);
  };

  const handleBackToMenu = () => {
    setPortfolioSection(null);
  };

  return (
    <div ref={scrollContainerRef} className="scroll-container relative">
      {/* === HERO (one gesture: MetroHero → CameraVideo → zoom-to-reveal) === */}
      <div className="relative h-[100vh]">
        <Hero onCameraReveal={handleCameraReveal} />
      </div>

      {/* === PORTFOLIO MENU (appears after camera zoom) === */}
      <AnimatePresence>
        {cameraRevealed && (
          <motion.div
            className="fixed inset-3 md:inset-8 z-50 overflow-hidden rounded-xl"
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
                className="absolute top-8 left-4 z-[100] flex items-center gap-2 px-3 py-2 rounded-md bg-black/60 backdrop-blur-sm border border-white/10 text-xs font-medium text-white hover:text-accent-orange hover:border-accent-orange/50 transition-colors duration-200"
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
