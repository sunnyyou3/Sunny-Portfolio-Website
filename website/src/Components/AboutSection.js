import React from 'react';
import { motion } from 'framer-motion';
import { skills, about } from '../data/about';

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export const AboutSection = () => {
  return (
    <div className="w-full h-full bg-black relative flex flex-col">
      {/* Scanline overlay */}
      <div className="scanlines absolute inset-0 pointer-events-none" />

      {/* === TOP HUD BAR (fixed at top) === */}
      <div className="camera-hud-top relative z-10 flex-shrink-0">
        <div className="flex items-center gap-2">
          <span className="hud-text-dim">INFO</span>
          <span className="hud-text-dim">|</span>
          <span className="hud-text-accent">ABOUT</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="hud-text-dim">CANON EOS R5</span>
          <span className="hud-text-dim">|</span>
          <span className="hud-text-dim">FIRMWARE 2.1.0</span>
        </div>
      </div>

      {/* === MAIN CONTENT (scrollable) === */}
      <div className="relative z-10 flex-1 overflow-y-auto px-6 md:px-8 lg:px-10 py-6">
        {/* Profile header — camera info card style */}
        <motion.div
          className="mb-8"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="flex flex-col md:flex-row gap-5 md:gap-8 items-start">
            {/* Profile image — framed like a camera preview */}
            <div className="relative flex-shrink-0">
              <div className="w-28 h-28 md:w-36 md:h-36 rounded-lg overflow-hidden border border-white/[0.08]">
                <img
                  src={about.profileImage}
                  alt={about.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Corner brackets */}
              <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-accent-orange/40" />
              <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-accent-orange/40" />
              <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-accent-orange/40" />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-accent-orange/40" />
              {/* REC indicator */}
              <div className="absolute -top-2 -right-2 flex items-center gap-1 bg-black/70 px-1.5 py-px rounded">
                <span className="rec-dot w-1.5 h-1.5" />
              </div>
            </div>

            {/* Name and tagline */}
            <div className="flex-1">
              <h2 className="font-hero text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.1]">
                {about.name}
              </h2>
              <p className="hud-text-accent mt-2">
                {about.tagline}
              </p>
              <p className="text-white/45 text-sm md:text-base mt-2.5 leading-relaxed max-w-lg">
                {about.bio}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Stats — camera spec card style */}
        <motion.div
          className="mb-8"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="p-4 rounded-lg bg-white/[0.02] border border-white/[0.04]">
            <div className="hud-text-dim mb-3">SPECIFICATIONS</div>
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: 'Experience', value: '3+', unit: 'years' },
                { label: 'Projects', value: '10+', unit: 'completed' },
                { label: 'Photos', value: '5K+', unit: 'captured' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="flex items-baseline gap-1">
                    <span className="font-hero text-2xl md:text-3xl font-bold text-accent-orange tracking-tight">
                      {stat.value}
                    </span>
                    <span className="hud-text-dim">{stat.unit}</span>
                  </div>
                  <div className="hud-text-dim mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Skills — camera settings menu style */}
        <motion.div
          className="mb-8"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="hud-text-dim mb-3">SKILLS & TOOLS</div>
          <div className="space-y-3">
            {skills.map((skillGroup) => (
              <div key={skillGroup.category}>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-1 h-3 bg-accent-orange/60 rounded-sm" />
                  <h4 className="hud-text-accent">{skillGroup.category}</h4>
                </div>
                <div className="flex flex-wrap gap-1.5 pl-3">
                  {skillGroup.items.map((skill) => (
                    <span
                      key={skill}
                      className="hud-text-dim bg-white/[0.03] px-2.5 py-1 rounded hover:bg-white/[0.06] hover:text-white/60 transition-colors duration-200 cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Camera-like info footer */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="p-3 rounded-lg bg-white/[0.01] border border-white/[0.03]">
            <div className="flex flex-wrap gap-x-4 gap-y-1.5">
              <span className="hud-text-dim">MODEL: <span className="text-white/60">Developer & Photographer</span></span>
              <span className="hud-text-dim">REGION: <span className="text-white/60">Kuala Lumpur, MY</span></span>
              <span className="hud-text-dim">LANG: <span className="text-white/60">EN / MS / ZH</span></span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* === BOTTOM HUD BAR (sticky to bottom) === */}
      <div className="camera-hud-bottom relative z-10 sticky bottom-0 flex-shrink-0">
        <div className="flex items-center gap-3">
          <span className="hud-text-dim">INFO BUTTON</span>
          <span className="hud-text-dim">|</span>
          <span className="hud-text-dim">MULTI SELECT</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="hud-text-dim">MEMO: ON</span>
          <span className="hud-text-dim">|</span>
          <span className="hud-text-dim">STAMP: DATE</span>
        </div>
      </div>
    </div>
  );
};
