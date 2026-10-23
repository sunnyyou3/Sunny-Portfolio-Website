import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../data/projects';

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 + i * 0.1 },
  }),
};

// Format project data as EXIF-like metadata
const getExifData = (project) => ({
  resolution: '3840 × 2160',
  aspect: '16:9',
  format: 'Web / Interactive',
  year: project.year,
});

export const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  const handleClose = () => setSelectedProject(null);

  return (
    <div className="w-full h-full bg-black relative flex flex-col">
      {/* Scanline overlay */}
      <div className="scanlines absolute inset-0 pointer-events-none" />

      {/* === TOP HUD BAR === */}
      <div className="camera-hud-top relative z-10">
        <div className="flex items-center gap-2">
          <span className="hud-text-dim">REVIEW</span>
          <span className="hud-text-dim">|</span>
          <span className="hud-text-accent">PROJECTS</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="hud-text-dim">
            <span className="text-white/60">[</span>
            <span className="text-white/80">{projects.length}</span>
            <span className="text-white/60">]</span>
          </span>
          <span className="hud-text-dim">AUTO</span>
        </div>
      </div>

      {/* === MAIN CONTENT (scrollable) === */}
      <div className="relative z-10 flex-1 overflow-y-auto px-6 md:px-8 lg:px-10 py-6">
        {/* Section header */}
        <motion.div variants={itemVariants} initial="hidden" animate="visible">
          <div className="flex items-end justify-between mb-6">
            <div>
              <h2 className="font-hero text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                Projects
              </h2>
              <p className="hud-text-dim mt-1.5">
                {projects.length} selected works · Click to review
              </p>
            </div>
            {/* Corner bracket decoration */}
            <div className="hidden md:block w-10 h-10 border-t border-l border-white/15" />
          </div>
        </motion.div>

        {/* Project list — camera review style */}
        <div className="space-y-4">
          {projects.map((project, index) => {
            const exif = getExifData(project);
            return (
              <motion.button
                key={project.id}
                className="group w-full block"
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: index * 0.08 }}
                onClick={() => setSelectedProject(project)}
              >
                <div className="flex gap-4 md:gap-6 items-start p-3 md:p-4 rounded-lg bg-white/[0.02] hover:bg-white/[0.04] transition-colors duration-200 border border-transparent hover:border-white/[0.06]">
                  {/* Thumbnail with focus point */}
                  <div className="relative flex-shrink-0 w-28 h-18 md:w-40 md:h-25 rounded overflow-hidden bg-portfolio-card">
                    <img
                      src={project.screenshots[0]}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Focus point overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-4 h-4 md:w-5 md:h-5 border border-white/20 group-hover:border-accent-orange/60 transition-colors duration-200" />
                    </div>
                    {/* File number badge */}
                    <div className="absolute top-1 left-1 hud-text-dim bg-black/50 px-1 py-px rounded">
                      {String(index + 1).padStart(3, '0')}
                    </div>
                  </div>

                  {/* Info column */}
                  <div className="flex-1 min-w-0 py-0.5">
                    {/* Title */}
                    <h3 className="font-hero text-base md:text-lg font-semibold text-white/80 group-hover:text-white transition-colors duration-200 truncate">
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p className="hud-text-dim mt-1 line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>

                    {/* EXIF-style metadata row */}
                    <div className="flex items-center gap-3 mt-2.5 flex-wrap">
                      <span className="hud-text-accent">{exif.year}</span>
                      <span className="hud-text-dim">·</span>
                      <span className="hud-text-dim">{exif.aspect}</span>
                      <span className="hud-text-dim">·</span>
                      <span className="hud-text-dim">{exif.format}</span>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mt-2.5">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="hud-text-dim bg-white/[0.03] px-2 py-px rounded group-hover:bg-white/[0.06] transition-colors duration-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right arrow */}
                  <div className="flex-shrink-0 pt-2">
                    <svg
                      className="w-4 h-4 text-white/15 group-hover:text-accent-orange/60 transition-colors duration-200"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* === BOTTOM HUD BAR (sticky to bottom) === */}
      <div className="camera-hud-bottom relative z-10 sticky bottom-0">
        <div className="flex items-center gap-3">
          <span className="hud-text-dim">◀ PREV</span>
          <span className="hud-text-dim">▶ NEXT</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="hud-text-dim">ROTATE</span>
          <span className="hud-text-dim">|</span>
          <span className="hud-text-dim">ZOOM 100%</span>
        </div>
      </div>

      {/* === PROJECT DETAIL MODAL === */}
      <AnimatePresence>
        {selectedProject && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-3 md:p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={handleClose}
            />
            {/* Modal content */}
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="bg-black max-w-4xl w-full max-h-[90vh] overflow-y-auto pointer-events-auto border border-white/[0.08]"
                onClick={(e) => e.stopPropagation()}
                initial={{ scale: 0.97, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.97, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              >
                {/* Modal top HUD */}
                <div className="camera-hud-top sticky top-0 z-10 rounded-t-lg">
                  <div className="flex items-center gap-2">
                    <span className="hud-text-dim">IMAGE REVIEW</span>
                    <span className="hud-text-dim">|</span>
                    <span className="hud-text-accent">{selectedProject.title.toUpperCase()}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleClose}
                      className="hud-text-dim hover:text-white transition-colors duration-200"
                      aria-label="Close"
                    >
                      ✕
                    </button>
                  </div>
                </div>

                {/* Screenshots with camera grid */}
                <div className="px-4 md:px-6 py-4">
                  <div className="camera-grid relative rounded-lg overflow-hidden border border-white/[0.06]">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {selectedProject.screenshots.map((screenshot, i) => (
                        <div key={i} className="relative overflow-hidden bg-portfolio-card">
                          <img
                            src={screenshot}
                            alt={`${selectedProject.title} view ${i + 1}`}
                            className="w-full aspect-video object-cover"
                          />
                          {/* Focus point on each screenshot */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-5 h-5 border border-white/15" />
                          </div>
                          {/* Image number */}
                          <div className="absolute top-2 left-2 hud-text-dim bg-black/50 px-1 py-px rounded">
                            {String(i + 1).padStart(3, '0')}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="px-4 md:px-6 pb-6">
                  {/* EXIF-style data block */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5 p-3 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                    <div>
                      <div className="hud-text-dim mb-0.5">YEAR</div>
                      <div className="hud-text text-white/80">{selectedProject.year}</div>
                    </div>
                    <div>
                      <div className="hud-text-dim mb-0.5">RESOLUTION</div>
                      <div className="hud-text text-white/80">{getExifData(selectedProject).resolution}</div>
                    </div>
                    <div>
                      <div className="hud-text-dim mb-0.5">ASPECT</div>
                      <div className="hud-text text-white/80">{getExifData(selectedProject).aspect}</div>
                    </div>
                    <div>
                      <div className="hud-text-dim mb-0.5">FORMAT</div>
                      <div className="hud-text text-white/80">{getExifData(selectedProject).format}</div>
                    </div>
                  </div>

                  {/* Title & description */}
                  <h3 className="font-hero text-xl md:text-2xl font-bold text-white mb-2">
                    {selectedProject.title}
                  </h3>
                  <p className="text-white/50 text-sm md:text-base leading-relaxed mb-4 max-w-2xl">
                    {selectedProject.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="hud-text-accent bg-accent-orange/[0.08] px-2.5 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
