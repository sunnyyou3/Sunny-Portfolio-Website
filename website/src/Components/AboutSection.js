import React from 'react';
import { motion } from 'framer-motion';
import { skills, about } from '../data/about';

export const AboutSection = () => {
  return (
    <motion.div
      className="w-full h-full bg-portfolio-dark p-10 overflow-y-auto"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.4 }}
    >
      {/* Header */}
      <div className="lcd-text mb-10 pt-14">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-accent-orange text-xs">SETUP</span>
          <span className="text-white/30 text-xs">|</span>
          <span className="text-white/50 text-xs">ABOUT</span>
        </div>
        <h2 className="text-2xl font-bold text-white">ABOUT</h2>
      </div>

      <div className="max-w-5xl">
        {/* Bio */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-start gap-6">
            <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
              <img src={about.profileImage} alt={about.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">{about.name}</h3>
              <p className="text-accent-orange text-sm lcd-text mt-1">{about.tagline}</p>
              <p className="text-white/50 text-sm mt-3 leading-relaxed">{about.bio}</p>
            </div>
          </div>
        </motion.div>

        {/* Skills Grid - DSLR Icon Menu style */}
        <div className="mb-10">
          <h4 className="lcd-text text-white/40 text-xs mb-4">SKILLS</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {skills.map((skillGroup, groupIndex) => (
              <motion.div
                key={skillGroup.category}
                className="rounded-lg border border-white/10 bg-white/5 p-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + groupIndex * 0.1 }}
              >
                <h5 className="lcd-text text-accent-orange text-xs mb-3">{skillGroup.category}</h5>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs lcd-text px-3 py-1.5 rounded bg-white/5 text-white/60 hover:bg-white/10 hover:text-white transition-colors cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Years Experience', value: '3+' },
            { label: 'Projects', value: '10+' },
            { label: 'Photos Taken', value: '5000+' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-center p-4 rounded-lg border border-white/10 bg-white/5"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + i * 0.1 }}
            >
              <div className="text-2xl font-bold text-accent-orange">{stat.value}</div>
              <div className="lcd-text text-white/40 text-xs mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="lcd-text text-white/30 text-xs mt-8 text-center">
        SETTINGS / USER PROFILE
      </div>
    </motion.div>
  );
};
