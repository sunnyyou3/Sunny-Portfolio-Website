import React from 'react';
import { motion } from 'framer-motion';
import { projects } from '../data/projects';

export const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = React.useState(null);

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
          <span className="text-white/50 text-xs">PROJECTS</span>
        </div>
        <h2 className="text-2xl font-bold text-white">PROJECTS</h2>
        <p className="text-white/40 text-sm mt-1 lcd-text">SELECT A PROJECT TO VIEW DETAILS</p>
      </div>

      {/* Project Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl">
        {projects.map((project, index) => (
          <motion.button
            key={project.id}
            onClick={() => setSelectedProject(project)}
            className="group text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className={`
              rounded-lg border-2 overflow-hidden transition-all duration-200
              ${selectedProject?.id === project.id
                ? 'border-accent-orange shadow-lg shadow-accent-orange/20'
                : 'border-white/10 hover:border-white/20'
              }
            `}>
              {/* Thumbnail */}
              <div className="aspect-video bg-portfolio-card overflow-hidden">
                <img
                  src={project.screenshots[0]}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              
              {/* Info */}
              <div className="p-4 bg-portfolio-card">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-medium group-hover:text-accent-orange transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-white/40 text-sm mt-1">{project.description}</p>
                  </div>
                  <span className="lcd-text text-accent-orange text-xs ml-4">{project.year}</span>
                </div>
                
                {/* Tags */}
                <div className="flex gap-2 mt-3 flex-wrap">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs lcd-text px-2 py-1 rounded bg-white/5 text-white/50"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <motion.div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedProject(null)}
        >
          <motion.div
            className="bg-portfolio-dark rounded-xl border border-white/10 max-w-3xl w-full max-h-[80vh] overflow-y-auto"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Screenshots */}
            <div className="p-6 pb-0">
              <div className="grid grid-cols-2 gap-2">
                {selectedProject.screenshots.map((screenshot, i) => (
                  <img
                    key={i}
                    src={screenshot}
                    alt={`${selectedProject.title} ${i + 1}`}
                    className="w-full aspect-video object-cover rounded-lg"
                  />
                ))}
              </div>
            </div>
            
            {/* Details */}
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white">{selectedProject.title}</h3>
                <span className="lcd-text text-accent-orange text-sm">{selectedProject.year}</span>
              </div>
              <p className="text-white/60 mb-4">{selectedProject.description}</p>
              <div className="flex gap-2 flex-wrap">
                {selectedProject.tags.map((tag) => (
                  <span key={tag} className="text-xs lcd-text px-3 py-1 rounded bg-accent-orange/20 text-accent-orange">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Footer */}
      <div className="lcd-text text-white/30 text-xs mt-8 text-center">
        {projects.length} PROJECTS LOADED
      </div>
    </motion.div>
  );
};
