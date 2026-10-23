import React from 'react';
import { motion } from 'framer-motion';
import { about } from '../data/about';

export const Hero = () => {
  return (
    <motion.div
      className="hero-section min-h-screen w-full bg-white flex items-center justify-center relative overflow-hidden"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-6xl mx-auto px-8 py-20 flex flex-col md:flex-row items-center gap-12 w-full">
        {/* Photo */}
        <motion.div
          className="flex-shrink-0"
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <div className="w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden shadow-2xl">
            <img
              src={about.profileImage}
              alt={about.name}
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        {/* Text */}
        <div className="flex-1 text-center md:text-left">
          <motion.h1
            className="hero-text text-5xl md:text-7xl lg:text-8xl font-bold text-black leading-tight"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            {about.name}
          </motion.h1>
          <motion.p
            className="hero-text text-xl md:text-2xl text-gray-600 mt-4 font-light"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            {about.tagline}
          </motion.p>
          <motion.p
            className="hero-text text-base md:text-lg text-gray-500 mt-6 max-w-lg leading-relaxed"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
          >
            {about.bio}
          </motion.p>

          <motion.div
            className="mt-10 flex items-center justify-center md:justify-start gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
            <span className="text-sm text-gray-400 font-light">Scroll to explore</span>
          </motion.div>
        </div>
      </div>

      {/* Subtle decorative element */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="w-px h-16 bg-gradient-to-b from-transparent to-gray-300" />
      </div>
    </motion.div>
  );
};
