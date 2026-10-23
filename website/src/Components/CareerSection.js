import React from 'react';
import { motion } from 'framer-motion';
import { career } from '../data/career';

export const CareerSection = () => {
  return (
    <motion.div
      className="w-full h-full bg-portfolio-dark p-8 overflow-y-auto"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.4 }}
    >
      {/* Header */}
      <div className="lcd-text mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-accent-orange text-xs">FILE</span>
          <span className="text-white/30 text-xs">|</span>
          <span className="text-white/50 text-xs">CAREER</span>
        </div>
        <h2 className="text-2xl font-bold text-white">CAREER HISTORY</h2>
      </div>

      {/* Timeline */}
      <div className="max-w-3xl relative">
        {/* Vertical line */}
        <div className="absolute left-4 top-0 bottom-0 w-px bg-white/10" />

        {career.map((item, index) => (
          <motion.div
            key={item.period}
            className="relative pl-12 pb-10 last:pb-0"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.15 }}
          >
            {/* Timeline dot */}
            <div className={`
              absolute left-2 top-1 w-5 h-5 rounded-full border-2
              flex items-center justify-center
              ${index === 0 ? 'border-accent-orange bg-accent-orange/20' : 'border-white/30 bg-portfolio-dark'}
            `}>
              {index === 0 && (
                <div className="w-2 h-2 rounded-full bg-accent-orange" />
              )}
            </div>

            {/* Period */}
            <span className="lcd-text text-accent-orange text-xs">
              {item.period}
            </span>

            {/* Role */}
            <h3 className="text-white font-medium text-lg mt-1">
              {item.role}
            </h3>

            {/* Company */}
            <p className="text-white/40 text-sm lcd-text mt-1">
              {item.company}
            </p>

            {/* Description */}
            <p className="text-white/50 text-sm mt-3 leading-relaxed">
              {item.description}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Education / Additional */}
      <div className="max-w-3xl mt-8 pt-8 border-t border-white/10">
        <h4 className="lcd-text text-white/40 text-xs mb-4">EDUCATION</h4>
        <motion.div
          className="relative pl-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="absolute left-2 top-1 w-5 h-5 rounded-full border-2 border-white/30 bg-portfolio-dark" />
          <span className="lcd-text text-white/50 text-xs">DEGREE YEAR</span>
          <h3 className="text-white font-medium text-lg mt-1">Degree Name</h3>
          <p className="text-white/40 text-sm lcd-text mt-1">University Name</p>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="lcd-text text-white/30 text-xs mt-8 text-center">
        {career.length} POSITION{career.length !== 1 ? 'S' : ''} LOADED
      </div>
    </motion.div>
  );
};
