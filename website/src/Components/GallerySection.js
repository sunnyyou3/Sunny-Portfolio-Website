import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Load gallery images dynamically
let galleryPhotos = [];
try {
  const imageContext = require.context('../assets/Portfolio/Images/Gallery', false, /\.(png|jpe?g|webp|gif)$/i);
  galleryPhotos = imageContext
    .keys()
    .sort()
    .map((filePath) => imageContext(filePath).default || imageContext(filePath));
} catch (e) {
  galleryPhotos = [];
}

const photoVariants = {
  enter: { opacity: 0, scale: 0.97 },
  center: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 1.03 },
};

export const GallerySection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goTo = useCallback((direction) => {
    if (isTransitioning || galleryPhotos.length === 0) return;
    setIsTransitioning(true);
    setTimeout(() => {
      if (direction === 'next') {
        setCurrentIndex((prev) => (prev + 1) % galleryPhotos.length);
      } else {
        setCurrentIndex((prev) => (prev - 1 + galleryPhotos.length) % galleryPhotos.length);
      }
      setTimeout(() => setIsTransitioning(false), 100);
    }, 150);
  }, [isTransitioning]);

  const nextPhoto = () => goTo('next');
  const prevPhoto = () => goTo('prev');

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') goTo('next');
      if (e.key === 'ArrowLeft') goTo('prev');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goTo]);

  const currentPhoto = galleryPhotos[currentIndex];

  // Generate pseudo-EXIF data based on image properties
  const getPhotoInfo = (index) => ({
    fileNumber: String(index + 1).padStart(4, '0'),
    shutter: ['1/125', '1/250', '1/500', '1/1000', '1/60'][index % 5],
    aperture: ['f/2.8', 'f/4', 'f/5.6', 'f/8', 'f/1.4'][index % 5],
    iso: ['ISO 200', 'ISO 400', 'ISO 800', 'ISO 100', 'ISO 1600'][index % 5],
    focalLength: ['35mm', '50mm', '85mm', '24mm', '135mm'][index % 5],
  });

  return (
    <div className="w-full h-full bg-black relative flex flex-col overflow-hidden">
      {/* Scanline overlay */}
      <div className="scanlines absolute inset-0 pointer-events-none" />

      {/* === TOP HUD BAR (fixed at top) === */}
      <div className="camera-hud-top relative z-10 flex-shrink-0">
        <div className="flex items-center gap-2">
          <span className="hud-text-dim">REVIEW</span>
          <span className="hud-text-dim">|</span>
          <span className="hud-text-accent">GALLERY</span>
        </div>
        <div className="flex items-center gap-3">
          {galleryPhotos.length > 0 && (
            <span className="hud-text-dim">
              <span className="text-white/60">[</span>
              <span className="text-white/80">{getPhotoInfo(currentIndex).fileNumber}</span>
              <span className="text-white/60">]</span>
            </span>
          )}
          <span className="hud-text-dim">L+RAW</span>
        </div>
      </div>

      {/* === MAIN PHOTO VIEWER (centered, not scrollable) === */}
      <div className="flex-1 flex items-center justify-center px-4 md:px-8 lg:px-12 py-4 relative overflow-hidden">
        {/* Camera grid overlay */}
        <div className="camera-grid absolute inset-0 pointer-events-none" />

        {/* Focus point indicators */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="w-6 h-6 md:w-8 md:h-8 border border-accent-orange/40">
              <div className="absolute left-1/2 top-0 w-px h-full bg-accent-orange/20 -translate-x-1/2" />
              <div className="absolute top-1/2 left-0 h-px w-full bg-accent-orange/20 -translate-y-1/2" />
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {galleryPhotos.length > 0 && (
            <motion.div
              key={currentIndex}
              className="relative max-w-full max-h-[55vh] md:max-h-[60vh]"
              variants={photoVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <img
                src={currentPhoto}
                alt={`Slide ${currentIndex + 1}`}
                className="max-w-full max-h-[55vh] md:max-h-[60vh] object-contain rounded-sm"
              />
              {/* File number badge */}
              <div className="absolute top-3 left-3 hud-text-dim bg-black/60 px-2 py-1 rounded">
                {getPhotoInfo(currentIndex).fileNumber}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation arrows — camera style */}
        {galleryPhotos.length > 1 && (
          <>
            <button
              onClick={prevPhoto}
              className="absolute left-1 md:left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-white/20 hover:text-accent-orange transition-colors duration-200 rounded-full hover:bg-white/[0.03]"
              aria-label="Previous photo"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            <button
              onClick={nextPhoto}
              className="absolute right-1 md:right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-white/20 hover:text-accent-orange transition-colors duration-200 rounded-full hover:bg-white/[0.03]"
              aria-label="Next photo"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* === EXIF DATA BAR (sticky to bottom) === */}
      {galleryPhotos.length > 0 && (
        <div className="camera-hud-bottom relative z-10 sticky bottom-0 flex-shrink-0">
          <div className="flex items-center gap-4">
            <span className="hud-text">{getPhotoInfo(currentIndex).aperture}</span>
            <span className="hud-text-dim">·</span>
            <span className="hud-text">{getPhotoInfo(currentIndex).iso}</span>
            <span className="hud-text-dim">·</span>
            <span className="hud-text">{getPhotoInfo(currentIndex).focalLength}</span>
          </div>
          <div className="hud-text-dim">
            <span className="text-white/70">{currentIndex + 1}</span>
            <span className="text-white/30">/</span>
            <span className="text-white/70">{galleryPhotos.length}</span>
          </div>
        </div>
      )}

      {/* === THUMBNAIL STRIP === */}
      {galleryPhotos.length > 0 && (
        <div className="relative z-10 h-14 md:h-18 flex items-center px-4 md:px-8 gap-1.5 border-t border-white/[0.04] bg-black/80 flex-shrink-0">
          {galleryPhotos.map((photo, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`flex-shrink-0 overflow-hidden transition-all duration-200 relative ${
                i === currentIndex
                  ? 'w-20 h-11 md:w-24 md:h-14 opacity-100 ring-1 ring-accent-orange/50'
                  : 'w-14 h-9 md:w-18 md:h-12 opacity-35 hover:opacity-70'
              }`}
              aria-label={`Go to photo ${i + 1}`}
            >
              <img src={photo} alt="" className="w-full h-full object-cover" />
              {/* Active indicator */}
              {i === currentIndex && (
                <div className="absolute bottom-0 left-0 right-0 h-px bg-accent-orange" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
