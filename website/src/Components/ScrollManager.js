import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Hero } from './Hero';
import { CameraScene } from './CameraScene';
import { PortfolioMenu } from './PortfolioMenu';
import { ProjectsSection } from './ProjectsSection';
import { GallerySection } from './GallerySection';
import { AboutSection } from './AboutSection';
import { CareerSection } from './CareerSection';

/**
 * ScrollManager - The main scroll-driven experience orchestrator.
 * 
 * Scroll zones (500vh total):
 * - Hero: 0-100vh
 * - Camera Appears: 100-150vh
 * - Assembly: 150-300vh
 * - Rotation: 300-400vh
 * - LCD Expansion: 400-500vh
 * - Portfolio: 500vh+
 */
export const ScrollManager = () => {
  const scrollContainerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [portfolioSection, setPortfolioSection] = useState(null); // null = menu, or 'projects'|'gallery'|'about'|'career'
  const [portfolioScrollOffset, setPortfolioScrollOffset] = useState(0);
  const portfolioContainerRef = useRef(null);

  // Calculate scroll progress (0-1) based on viewport position
  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;
    const maxScroll = docHeight - windowHeight;
    
    if (maxScroll <= 0) return;
    
    const progress = Math.max(0, Math.min(1, scrollTop / maxScroll));
    setScrollProgress(progress);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Calculate zone values from scroll progress
  const getZoneValues = () => {
    // Hero fade: 0-0.15
    const heroOpacity = 1 - Math.max(0, Math.min(1, (scrollProgress - 0.02) / 0.13));
    
    // Camera appears: 0.15-0.20
    const cameraVisible = Math.max(0, Math.min(1, (scrollProgress - 0.15) / 0.05));
    
    // Assembly: 0.20-0.55 (150-300vh mapped to 0.20-0.55)
    const assemblyStart = 0.20;
    const assemblyEnd = 0.55;
    const assemblyProgress = Math.max(0, Math.min(1, 
      (scrollProgress - assemblyStart) / (assemblyEnd - assemblyStart)
    ));
    
    // Rotation: 0.55-0.70 (300-400vh mapped to 0.55-0.70)
    const rotationStart = 0.55;
    const rotationEnd = 0.70;
    const rotationProgress = Math.max(0, Math.min(1,
      (scrollProgress - rotationStart) / (rotationEnd - rotationStart)
    ));
    const rotationY = rotationProgress * Math.PI; // 0 to 180 degrees
    
    // LCD Expansion: 0.70-0.80 (400-500vh mapped to 0.70-0.80)
    const lcdExpansionStart = 0.70;
    const lcdExpansionEnd = 0.80;
    const lcdExpansionProgress = Math.max(0, Math.min(1,
      (scrollProgress - lcdExpansionStart) / (lcdExpansionEnd - lcdExpansionStart)
    ));
    
    // Portfolio: 0.80+
    const portfolioVisible = Math.max(0, Math.min(1, (scrollProgress - 0.80) / 0.05));
    
    return {
      heroOpacity,
      cameraVisible,
      assemblyProgress,
      rotationY,
      lcdExpansionProgress,
      portfolioVisible,
    };
  };

  const zone = getZoneValues();

  // Handle portfolio section selection
  const handleSelectSection = (sectionId) => {
    setPortfolioSection(sectionId);
  };

  const handleBackToMenu = () => {
    setPortfolioSection(null);
  };

  // LCD scale: starts at 0.3 (small on camera) and grows to 1.3 (larger than full screen)
  const lcdScale = 0.3 + zone.lcdExpansionProgress * 1.0;
  // eslint-disable-next-line no-unused-vars
  const lcdOpacity = zone.lcdExpansionProgress;
  
  // Camera fade as LCD expands
  // eslint-disable-next-line no-unused-vars
  const cameraFade = 1 - zone.lcdExpansionProgress;

  return (
    <div ref={scrollContainerRef} className="scroll-container relative">
      {/* === ZONE 1: HERO (0-15% of scroll) === */}
      <div className="relative h-[100vh]">
        <AnimatePresence>
          {zone.heroOpacity > 0 && (
            <motion.div
              style={{ opacity: zone.heroOpacity }}
              className="absolute inset-0"
            >
              <Hero />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* === ZONES 2-5: 3D CAMERA EXPERIENCE (15-80% of scroll) === */}
      <div className="relative" style={{ height: '400vh' }}>
        {/* Dark background for camera zone */}
        <div className="sticky top-0 w-full h-screen bg-portfolio-dark overflow-hidden">
          
          {/* Camera Scene */}
          <AnimatePresence>
            {zone.cameraVisible > 0 && (
              <motion.div
                style={{ 
                  opacity: zone.cameraVisible * cameraFade,
                  scale: 1 + (1 - zone.lcdExpansionProgress) * 0.3,
                }}
                className="absolute inset-0"
              >
                <CameraScene
                  assemblyProgress={zone.assemblyProgress}
                  rotationY={zone.rotationY}
                  cameraPos={[0, 0, 4]}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* === FIXED LCD OVERLAY (visible during expansion and portfolio) === */}
      {/* Fixed overlay stays on screen regardless of scroll position, no duplicate menu */}
      <AnimatePresence>
        {zone.lcdExpansionProgress > 0 && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50"
            style={{
              opacity: zone.lcdOpacity,
            }}
          >
            <motion.div
              style={{
                scale: lcdScale,
                borderRadius: lcdScale > 0.8 ? 0 : 12,
              }}
              className="w-[80vw] h-[60vw] md:w-[50vw] md:h-[37.5vw] max-w-[1250px] max-h-[938px] bg-portfolio-dark border border-white/10 overflow-y-auto"
            >
              {/* Portfolio content inside LCD */}
              <div className="w-full h-full relative">
                {/* Back button - visible when a section is selected, top-left */}
                {portfolioSection && (
                  <button
                    onClick={handleBackToMenu}
                    className="absolute top-6 left-6 z-10 lcd-text text-xs text-white/40 hover:text-accent-orange transition-colors duration-200 flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    BACK
                  </button>
                )}

                {/* Menu and sections are mutually exclusive — no AnimatePresence
                    to avoid stale components lingering in the DOM */}
                {portfolioSection ? (
                  <motion.div
                    key={portfolioSection}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full"
                  >
                    {portfolioSection === 'projects' && <ProjectsSection />}
                    {portfolioSection === 'gallery' && <GallerySection />}
                    {portfolioSection === 'about' && <AboutSection />}
                    {portfolioSection === 'career' && <CareerSection />}
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full"
                  >
                    <PortfolioMenu
                      onSelect={handleSelectSection}
                    />
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
