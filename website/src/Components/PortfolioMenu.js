import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  {
    id: 'projects',
    label: 'Projects',
    description: 'Web applications & interactive experiences',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="1" width="7" height="7" />
        <rect x="10" y="1" width="7" height="7" />
        <rect x="1" y="10" width="7" height="7" />
        <rect x="10" y="10" width="7" height="7" />
      </svg>
    ),
  },
  {
    id: 'gallery',
    label: 'Gallery',
    description: 'Photography collection',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="16" height="12" rx="1" />
        <circle cx="9" cy="9" r="3" />
        <circle cx="14" cy="5" r="0.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: 'about',
    label: 'About',
    description: 'Skills & background',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="6" r="3.5" />
        <path d="M2 16.5c0-3.5 3-5.5 7-5.5s7 2 7 5.5" />
      </svg>
    ),
  },
  {
    id: 'career',
    label: 'Career',
    description: 'Experience & education',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="14" height="14" rx="1" />
        <line x1="2" y1="6" x2="16" y2="6" />
        <line x1="6" y1="9" x2="10" y2="9" />
        <line x1="6" y1="12" x2="12" y2="12" />
      </svg>
    ),
  },
];

const itemVariants = {
  hidden: { opacity: 0, x: -16 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      delay: 0.2 + i * 0.08,
      ease: [0.25, 0.1, 0.25, 1],
    },
  }),
};

export const PortfolioMenu = ({ onSelect }) => {
  const [hoveredId, setHoveredId] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(-1);

  const handleSelect = (item) => {
    setSelectedIndex(navItems.findIndex((n) => n.id === item.id));
    onSelect(item.id);
  };

  return (
    <motion.div
      className="w-full h-full bg-black flex flex-col relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {/* Scanline overlay */}
      <div className="scanlines absolute inset-0" />

      {/* === TOP HUD BAR === */}
      <div className="camera-hud-top relative z-10">
        <div className="flex items-center gap-2">
          {/* Recording indicator */}
          <div className="flex items-center gap-1.5">
            <span className="rec-dot" />
            <span className="hud-text-dim">REC</span>
          </div>
          {/* Battery */}
          <div className="flex items-center gap-1">
            <svg width="16" height="8" viewBox="0 0 16 8" fill="none" stroke="currentColor" strokeWidth="0.8">
              <rect x="0.5" y="0.5" width="13" height="7" rx="1" />
              <rect x="14" y="2" width="1.5" height="4" rx="0.5" />
              <rect x="2" y="2" width="9" height="4" fill="currentColor" />
            </svg>
            <span className="hud-text-dim">FULL</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Mode */}
          <span className="hud-text-dim">M</span>
          {/* Date/Time */}
          <span className="hud-text-dim">2024.01.15 14:32</span>
          {/* Image count */}
          <span className="hud-text-dim">
            <span className="text-white/60">[</span>
            <span className="text-white/80">999</span>
            <span className="text-white/60">]</span>
            <span className="text-white/40 ml-1">J XXXX</span>
          </span>
        </div>
      </div>

      {/* === MAIN CONTENT AREA === */}
      <div className="relative z-10 flex-1 flex flex-col justify-center px-8 md:px-12 lg:px-16">
        {/* Camera model label */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <div className="flex items-center gap-2">
            <span className="hud-text-dim">CANON EOS R5</span>
            <span className="hud-text-dim">|</span>
            <span className="hud-text-dim">RAW + L</span>
          </div>
        </motion.div>

        {/* Name — large, bold, with camera frame bracket */}
        <motion.div
          className="relative mb-2"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Corner brackets (viewfinder style) */}
          <div className="absolute -left-3 -top-3 w-6 h-6 border-t-2 border-l-2 border-accent-orange/40" />
          <div className="absolute -right-3 -top-3 w-6 h-6 border-t-2 border-r-2 border-accent-orange/40" />
          <div className="absolute -left-3 -bottom-3 w-6 h-6 border-b-2 border-l-2 border-accent-orange/40" />
          <div className="absolute -right-3 -bottom-3 w-6 h-6 border-b-2 border-r-2 border-accent-orange/40" />

          <h1 className="font-hero text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-none ml-4">
            Sunny You
          </h1>
        </motion.div>

        {/* Tagline — camera info style */}
        <motion.div
          className="flex items-center gap-3 mb-16 md:mb-20 ml-4"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <span className="hud-text-accent">DEV & PHOTO</span>
          <span className="hud-text-dim">f/2.8 · 1/250s · ISO 400</span>
        </motion.div>

        {/* Navigation — camera menu style */}
        <nav className="space-y-0 relative" role="navigation" aria-label="Main navigation">
          {/* Vertical line connecting items */}
          <div className="absolute left-[19px] md:left-[23px] top-0 bottom-0 w-px bg-white/[0.06]" />

          {navItems.map((item, i) => (
            <motion.button
              key={item.id}
              custom={i}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              onClick={() => handleSelect(item)}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
              className={`menu-item relative w-full group flex items-center gap-4 md:gap-6 py-4 md:py-5 pl-4 -ml-4 transition-colors duration-200 ${
                selectedIndex === i ? 'bg-white/[0.04]' : ''
              }`}
              whileTap={{ scale: 0.995 }}
            >
              {/* Active line indicator */}
              <div className="menu-item-line" />

              {/* Item number (camera menu style) */}
              <span className={`hud-text flex-shrink-0 w-5 text-right ${
                hoveredId === item.id || selectedIndex === i ? 'text-accent-orange' : 'text-white/25'
              }`}>
                {(i + 1).toString().padStart(2, '0')}
              </span>

              {/* Icon */}
              <div className={`flex-shrink-0 transition-colors duration-200 ${
                hoveredId === item.id ? 'text-accent-orange' : 'text-white/25'
              }`}>
                {item.icon}
              </div>

              {/* Label */}
              <span className={`font-hero text-xl md:text-2xl lg:text-3xl font-medium tracking-tight transition-colors duration-200 ${
                hoveredId === item.id ? 'text-white' : 'text-white/55'
              }`}>
                {item.label}
              </span>

              {/* Right side — description */}
              <span className={`hidden md:block ml-auto hud-text transition-colors duration-200 max-w-[220px] text-right ${
                hoveredId === item.id ? 'text-white/40' : 'text-white/20'
              }`}>
                {item.description}
              </span>

              {/* Right bracket */}
              <span className={`ml-3 flex-shrink-0 hud-text transition-all duration-200 ${
                hoveredId === item.id ? 'text-accent-orange opacity-100' : 'text-white/15 opacity-60'
              }`}>
                {'>'}
              </span>
            </motion.button>
          ))}
        </nav>

        {/* Bottom hint */}
        <motion.div
          className="mt-12 md:mt-16 flex items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <span className="hud-text-dim">Q MENU · SELECT ENTER</span>
        </motion.div>
      </div>

      {/* === BOTTOM HUD BAR === */}
      <div className="camera-hud-bottom relative z-10">
        <div className="flex items-center gap-3">
          {/* Shutter speed */}
          <span className="hud-text-dim">1/250</span>
          {/* Aperture */}
          <span className="hud-text-dim">f/2.8</span>
          {/* ISO */}
          <span className="hud-text-dim">ISO 400</span>
          {/* White balance */}
          <span className="hud-text-dim">WB 5200K</span>
        </div>

        <div className="flex items-center gap-3">
          {/* Exposure meter */}
          <div className="flex items-center gap-1">
            <span className="hud-text-dim">-3</span>
            <div className="flex items-center gap-px">
              {[...Array(13)].map((_, i) => (
                <div
                  key={i}
                  className={`w-1.5 h-1.5 ${
                    i === 7 ? 'bg-accent-orange' : 'bg-white/15'
                  }`}
                />
              ))}
            </div>
            <span className="hud-text-dim">+3</span>
          </div>
          {/* Image counter */}
          <span className="hud-text-dim">
            <span className="text-white/60">●</span>
            <span className="ml-1 text-white/40">142</span>
          </span>
        </div>
      </div>

      {/* === DECORATIVE FOCUS POINTS === */}
      <div className="focus-point top-[25%] left-[8%]" />
      <div className="focus-point bottom-[30%] right-[12%]" />
    </motion.div>
  );
};
