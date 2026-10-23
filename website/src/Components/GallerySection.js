import React from 'react';
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
  // Fallback for environments where require.context is not available (e.g., Jest)
  galleryPhotos = [];
}

export const GallerySection = () => {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const nextPhoto = () => {
    setCurrentIndex((prev) => (prev + 1) % galleryPhotos.length);
  };

  const prevPhoto = () => {
    setCurrentIndex((prev) => (prev - 1 + galleryPhotos.length) % galleryPhotos.length);
  };

  return (
    <motion.div
      className="w-full h-full bg-portfolio-dark relative flex flex-col"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.4 }}
    >
      {/* Header - DSLR Playback style */}
      <div className="lcd-text flex items-center justify-between px-8 pt-14 pb-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <span className="text-accent-orange text-xs">PLAYBACK</span>
          <span className="text-white/30 text-xs">|</span>
          <span className="text-white/50 text-xs">GALLERY</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-white/40 text-xs">
            {String(currentIndex + 1).padStart(2, '0')} / {String(galleryPhotos.length).padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* Photo Viewer */}
      <div className="flex-1 flex items-center justify-center p-10 relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            className="relative max-w-full max-h-full"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <img
              src={galleryPhotos[currentIndex]}
              alt={`Gallery photo ${currentIndex + 1}`}
              className="max-w-full max-h-[65vh] object-contain rounded-lg"
            />
          </motion.div>
        </AnimatePresence>

        {/* Navigation arrows */}
        <button
          onClick={prevPhoto}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/60 hover:text-white transition-all"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={nextPhoto}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/60 hover:text-white transition-all"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Thumbnail strip */}
      <div className="h-16 border-t border-white/10 flex items-center px-6 gap-3 overflow-x-auto">
        {galleryPhotos.slice(Math.max(0, currentIndex - 2), currentIndex + 3).map((photo, i) => {
          const globalIndex = Math.max(0, currentIndex - 2) + i;
          return (
            <button
              key={globalIndex}
              onClick={() => setCurrentIndex(globalIndex)}
              className={`
                flex-shrink-0 w-16 h-12 rounded overflow-hidden transition-all
                ${globalIndex === currentIndex ? 'ring-2 ring-accent-orange' : 'opacity-50 hover:opacity-80'}
              `}
            >
              <img src={photo} alt="" className="w-full h-full object-cover" />
            </button>
          );
        })}
      </div>

      {/* Footer info */}
      <div className="lcd-text flex items-center justify-between px-8 py-3 border-t border-white/10">
        <span className="text-white/30 text-xs">SCROLL OR USE ARROWS TO NAVIGATE</span>
        <span className="text-white/30 text-xs">{galleryPhotos.length} PHOTOS</span>
      </div>
    </motion.div>
  );
};
