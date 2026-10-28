import React from 'react';
import { motion } from 'framer-motion';
import { career } from '../data/career';

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export const CareerSection = () => {
  return (
    <div className="w-full h-full bg-black relative flex flex-col">
      {/* Scanline overlay */}
      <div className="scanlines absolute inset-0 pointer-events-none" />

      {/* === TOP HUD BAR (fixed at top) === */}
      <div className="camera-hud-top relative z-10 flex-shrink-0">
        <div className="flex items-center gap-2">
          <span className="hud-text-dim">FILE INFO</span>
          <span className="hud-text-dim">|</span>
          <span className="hud-text-accent">CAREER</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="hud-text-dim">
            <span className="text-white/60">[</span>
            <span className="text-white/80">{career.length}</span>
            <span className="text-white/60">]</span>
          </span>
          <span className="hud-text-dim">DETAIL</span>
        </div>
      </div>

      {/* === MAIN CONTENT (scrollable) === */}
      <div className="relative z-10 flex-1 overflow-y-auto px-6 md:px-8 lg:px-10 py-6">
        {/* Section header */}
        <motion.h2
          className="font-hero text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.1] mb-2"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          Career
        </motion.h2>
        <motion.p
          className="hud-text-dim mb-8"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          Professional timeline · Click entries for details
        </motion.p>

        {/* Career entries — camera file list style */}
        <div className="space-y-3 mb-10">
          {career.map((item, index) => (
            <motion.div
              key={item.period}
              className="group p-4 rounded-lg bg-white/[0.02] border border-white/[0.04] hover:border-white/[0.08] hover:bg-white/[0.03] transition-all duration-200"
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.1 + index * 0.08 }}
            >
              <div className="flex flex-col md:flex-row md:items-start gap-3">
                {/* Period — camera file number style */}
                <div className="flex-shrink-0">
                  <div className="hud-text-accent bg-accent-orange/[0.08] px-2.5 py-1 rounded inline-block">
                    {item.period}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-hero text-base md:text-lg font-semibold text-white/85 group-hover:text-white transition-colors duration-200">
                    {item.role}
                  </h3>
                  <p className="hud-text-dim mt-0.5">{item.company}</p>
                  <p className="text-white/45 text-sm mt-2 leading-relaxed max-w-2xl">
                    {item.description}
                  </p>

                  {/* Metadata tags */}
                  <div className="flex flex-wrap gap-2 mt-2.5">
                    <span className="hud-text-dim flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-accent-orange/50" />
                      {item.type || 'Full-time'}
                    </span>
                  </div>
                </div>

                {/* Focus point decoration */}
                <div className="flex-shrink-0 hidden md:block opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <div className="w-5 h-5 border border-white/15" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Education — camera settings style */}
        <motion.div
          className="mb-8"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="hud-text-dim mb-3 flex items-center gap-2">
            <div className="w-1 h-3 bg-accent-orange/60 rounded-sm" />
            EDUCATION
          </div>

          <div className="p-4 rounded-lg bg-white/[0.02] border border-white/[0.04]">
            {/* Education header row */}
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/[0.04]">
              <span className="hud-text-dim">DEGREE</span>
              <span className="hud-text-dim">YEAR</span>
              <span className="hud-text-dim">INSTITUTION</span>
            </div>

            {/* Education entry */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 py-1">
              <span className="hud-text text-white/70">B.S. Computer Science</span>
              <span className="hud-text-accent">2024</span>
              <span className="hud-text text-white/50">Lehigh University</span>
            </div>
          </div>
        </motion.div>

        {/* Camera-like footer info */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="p-3 rounded-lg bg-white/[0.01] border border-white/[0.03]">
            <div className="flex flex-wrap gap-x-4 gap-y-1.5">
              <span className="hud-text-dim">SHUTTER COUNT: <span className="text-white/60">~15K shots</span></span>
              <span className="hud-text-dim">LENSES: <span className="text-white/60">24-70mm, 70-200mm, 35mm f/1.4</span></span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* === BOTTOM HUD BAR (sticky to bottom) === */}
      <div className="camera-hud-bottom relative z-10 sticky bottom-0 flex-shrink-0">
        <div className="flex items-center gap-3">
          <span className="hud-text-dim">DELETE</span>
          <span className="hud-text-dim">|</span>
          <span className="hud-text-dim">PROTECT</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="hud-text-dim">PROGRESS: ████░░░░ 50%</span>
        </div>
      </div>
    </div>
  );
};
