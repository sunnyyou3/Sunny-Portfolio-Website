import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const sections = [
  { id: 'projects', label: 'Projects', icon: '◆', description: 'My work' },
  { id: 'gallery', label: 'Gallery', icon: '◐', description: 'Photography' },
  { id: 'about', label: 'About', icon: '●', description: 'Skills & Bio' },
  { id: 'career', label: 'Career', icon: '▤', description: 'Experience' },
];

export const PortfolioMenu = ({ onSelect }) => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % 4);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + 4) % 4);
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect(sections[selectedIndex].id);
    }
  };

  return (
    <motion.div
      className="w-full h-full flex flex-col items-center justify-center bg-portfolio-dark relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {/* Menu header - DSLR style */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 lcd-text">
        <div className="flex items-center gap-3">
          <span className="text-accent-orange text-xs">MENU</span>
          <span className="text-white/30 text-xs">|</span>
          <span className="text-white/50 text-xs">MAIN MENU</span>
        </div>
      </div>

      {/* 2×2 Grid */}
      <div className="grid grid-cols-2 gap-4 p-8 max-w-lg w-full">
        {sections.map((section, index) => (
          <motion.button
            key={section.id}
            onClick={() => onSelect(section.id)}
            onMouseEnter={() => setSelectedIndex(index)}
            className={`
              relative p-6 rounded-lg border-2 transition-all duration-200
              flex flex-col items-center justify-center gap-3
              lcd-text group
              ${selectedIndex === index
                ? 'border-accent-orange bg-accent-orange/10 shadow-lg shadow-accent-orange/20'
                : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10'
              }
            `}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Icon */}
            <span className={`text-3xl transition-colors duration-200 ${selectedIndex === index ? 'text-accent-orange' : 'text-white/60 group-hover:text-white/80'}`}>
              {section.icon}
            </span>
            
            {/* Label */}
            <span className={`text-sm font-medium transition-colors duration-200 ${selectedIndex === index ? 'text-white' : 'text-white/50 group-hover:text-white/70'}`}>
              {section.label}
            </span>
            
            {/* Description */}
            <span className={`text-xs transition-colors duration-200 ${selectedIndex === index ? 'text-accent-orange/70' : 'text-white/30'}`}>
              {section.description}
            </span>

            {/* Selection indicator */}
            {selectedIndex === index && (
              <motion.div
                className="absolute inset-0 rounded-lg border-2 border-accent-orange"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            )}
          </motion.button>
        ))}
      </div>

      {/* Footer info - DSLR style */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 lcd-text flex items-center gap-4">
        <span className="text-white/30 text-xs">
          {selectedIndex + 1}/4 SELECTED
        </span>
        <span className="text-white/20 text-xs">|</span>
        <span className="text-white/30 text-xs">
          USE ↑↓←→ TO NAVIGATE
        </span>
      </div>

      {/* Status bar - DSLR style */}
      <div className="absolute top-6 right-6 lcd-text">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-accent-orange animate-pulse" />
          <span className="text-white/40 text-xs">READY</span>
        </div>
      </div>
    </motion.div>
  );
};
