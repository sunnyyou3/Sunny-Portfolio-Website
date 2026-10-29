
import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { projects } from '../../../data/projects';
import { fadeUp, cardVariants, ease } from '../../../animations/portfolioVariants';

const getProjectNumber = (index) =>
  String(index + 1).padStart(3, '0');

const ArrowIcon = ({ direction = 'right', className = '' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    className={className}
    aria-hidden="true"
  >
    {direction === 'left' ? (
      <path
        d="M15 18l-6-6 6-6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ) : direction === 'down' ? (
      <path
        d="M6 9l6 6 6-6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ) : (
      <path
        d="M9 18l6-6-6-6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    )}
  </svg>
);

const CameraFrame = ({ children, className = '' }) => (
  <div className={`relative ${className}`}>
    {children}

    <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-white/40 pointer-events-none" />
    <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-white/40 pointer-events-none" />
    <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-white/40 pointer-events-none" />
    <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-white/40 pointer-events-none" />
  </div>
);

const ProjectCard = ({
  project,
  index,
  featured = false,
  onSelect,
}) => {
  const screenshot = project.screenshots?.[0];

  return (
    <motion.button
      type="button"
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      onClick={onSelect}
      className={`group w-full text-left focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-orange ${
        featured ? 'col-span-full' : ''
      }`}
      aria-label={`Review project: ${project.title}`}
    >
      <div
        className={`relative overflow-hidden rounded-lg border border-white/[0.08] bg-white/[0.02] transition-all duration-300 group-hover:border-accent-orange/40 group-hover:bg-white/[0.04] ${
          featured ? 'md:grid md:grid-cols-[1.35fr_1fr]' : ''
        }`}
      >
        {/* Image */}
        <CameraFrame
          className={`overflow-hidden bg-portfolio-card ${
            featured ? 'aspect-[16/9] md:aspect-auto md:min-h-[340px]' : 'aspect-[4/3]'
          }`}
        >
          {screenshot ? (
            <img
              src={screenshot}
              alt={`${project.title} preview`}
              loading={index === 0 ? 'eager' : 'lazy'}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="hud-text-dim">NO IMAGE AVAILABLE</span>
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

          {/* File index */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="bg-black/70 backdrop-blur-sm px-2 py-1 rounded hud-text-accent">
              {getProjectNumber(index)}
            </span>
            {featured && (
              <span className="bg-black/70 backdrop-blur-sm px-2 py-1 rounded hud-text-dim">
                FEATURED
              </span>
            )}
          </div>

          {/* Center focus point */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="relative w-8 h-8 border border-white/30 group-hover:border-accent-orange/70 transition-colors duration-300">
              <span className="absolute left-1/2 top-0 bottom-0 w-px bg-white/20 -translate-x-1/2" />
              <span className="absolute top-1/2 left-0 right-0 h-px bg-white/20 -translate-y-1/2" />
              <span className="absolute w-1 h-1 bg-accent-orange rounded-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>

          {/* Image footer */}
          <div className="absolute bottom-3 left-4 right-4 flex justify-between items-end">
            <span className="hud-text-dim">
              {project.year || 'UNDATED'}
            </span>
            <span className="hud-text-accent opacity-0 group-hover:opacity-100 transition-opacity">
              OPEN REVIEW ↗
            </span>
          </div>
        </CameraFrame>

        {/* Project information */}
        <div
          className={`flex flex-col justify-center p-4 md:p-5 ${
            featured ? 'md:p-7 lg:p-9' : ''
          }`}
        >
          <div className="flex items-center justify-between gap-3 mb-3">
            <span className="hud-text-accent">
              {featured ? 'SELECTED WORK' : `PROJECT / ${getProjectNumber(index)}`}
            </span>
            <span className="hud-text-dim">
              {project.screenshots?.length || 0} IMG
            </span>
          </div>

          <h3
            className={`font-hero font-semibold text-white/90 group-hover:text-white transition-colors ${
              featured
                ? 'text-2xl md:text-3xl lg:text-4xl'
                : 'text-lg md:text-xl'
            }`}
          >
            {project.title}
          </h3>

          <p
            className={`text-white/50 leading-relaxed mt-3 ${
              featured ? 'text-sm md:text-base max-w-lg' : 'text-sm line-clamp-3'
            }`}
          >
            {project.description}
          </p>

          {/* Technology tags */}
          <div className="flex flex-wrap gap-2 mt-5">
            {project.tags?.map((tag) => (
              <span
                key={tag}
                className="hud-text-dim border border-white/[0.08] rounded px-2 py-1 group-hover:border-white/15 transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/[0.08]">
            <span className="hud-text-dim">
              {featured ? 'EXPLORE PROJECT' : 'VIEW DETAILS'}
            </span>
            <span className="flex items-center justify-center w-8 h-8 rounded-full border border-white/10 text-white/50 group-hover:border-accent-orange/50 group-hover:text-accent-orange transition-all">
              <ArrowIcon className="w-4 h-4" />
            </span>
          </div>
        </div>
      </div>
    </motion.button>
  );
};

const ProjectViewer = ({
  project,
  projectIndex,
  totalProjects,
  screenshotIndex,
  onScreenshotChange,
  onClose,
  onNavigate,
}) => {
  const screenshots = project.screenshots || [];
  const currentScreenshot = screenshots[screenshotIndex];

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }

      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        onNavigate(-1);
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault();
        onNavigate(1);
      }

      if (event.key === 'ArrowUp' && screenshots.length > 0) {
        event.preventDefault();
        onScreenshotChange(
          (screenshotIndex - 1 + screenshots.length) % screenshots.length
        );
      }

      if (event.key === 'ArrowDown' && screenshots.length > 0) {
        event.preventDefault();
        onScreenshotChange((screenshotIndex + 1) % screenshots.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [
    onClose,
    onNavigate,
    onScreenshotChange,
    screenshotIndex,
    screenshots.length,
  ]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-3 md:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <motion.section
        role="dialog"
        aria-modal="true"
        aria-label={`${project.title} project viewer`}
        className="relative flex flex-col w-full max-w-6xl max-h-[92vh] overflow-hidden border border-white/10 bg-[#080808] rounded-lg shadow-2xl"
        initial={{ opacity: 0, y: 12, scale: 0.99 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 8, scale: 0.99 }}
        transition={{ duration: 0.25, ease }}
      >
        {/* Viewer header */}
        <header className="camera-hud-top shrink-0">
          <div className="flex items-center gap-2 min-w-0">
            <span className="hud-text-dim hidden sm:inline">
              REVIEW
            </span>
            <span className="hud-text-dim hidden sm:inline">/</span>
            <span className="hud-text-accent truncate">
              {project.title.toUpperCase()}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close project viewer"
            className="hud-text-dim hover:text-white px-2 py-1 transition-colors"
          >
            ESC <span className="ml-2">✕</span>
          </button>
        </header>

        {/* Viewer body */}
        <div className="flex-1 min-h-0 overflow-y-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_300px]">
            {/* Main image viewer */}
            <div className="min-w-0 p-3 md:p-5 border-b lg:border-b-0 lg:border-r border-white/[0.08]">
              <CameraFrame className="overflow-hidden bg-[#111]">
                <div className="relative aspect-video flex items-center justify-center">
                  <AnimatePresence mode="wait">
                    {currentScreenshot ? (
                      <motion.img
                        key={currentScreenshot}
                        src={currentScreenshot}
                        alt={`${project.title}, screenshot ${screenshotIndex + 1}`}
                        className="absolute inset-0 w-full h-full object-contain"
                        initial={{ opacity: 0.3 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0.3 }}
                        transition={{ duration: 0.2 }}
                      />
                    ) : (
                      <div className="hud-text-dim">NO IMAGE AVAILABLE</div>
                    )}
                  </AnimatePresence>

                  {/* Image overlay information */}
                  <div className="absolute top-4 left-4 hud-text-dim bg-black/60 px-2 py-1 rounded pointer-events-none">
                    IMG {getProjectNumber(screenshotIndex)}
                  </div>

                  <div className="absolute top-4 right-4 hud-text-dim bg-black/60 px-2 py-1 rounded pointer-events-none">
                    {screenshots.length} FRAMES
                  </div>

                  {screenshots.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={() =>
                          onScreenshotChange(
                            (screenshotIndex - 1 + screenshots.length) %
                              screenshots.length
                          )
                        }
                        aria-label="Previous screenshot"
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-black/60 border border-white/10 rounded-full text-white hover:border-accent-orange/60 transition-colors"
                      >
                        <ArrowIcon direction="left" className="w-5 h-5" />
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          onScreenshotChange(
                            (screenshotIndex + 1) % screenshots.length
                          )
                        }
                        aria-label="Next screenshot"
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-black/60 border border-white/10 rounded-full text-white hover:border-accent-orange/60 transition-colors"
                      >
                        <ArrowIcon className="w-5 h-5" />
                      </button>
                    </>
                  )}
                </div>
              </CameraFrame>

              {/* Thumbnail strip */}
              {screenshots.length > 1 && (
                <div className="flex gap-2 overflow-x-auto mt-4 pb-2">
                  {screenshots.map((screenshot, index) => (
                    <button
                      type="button"
                      key={`${screenshot}-${index}`}
                      onClick={() => onScreenshotChange(index)}
                      aria-label={`Show screenshot ${index + 1}`}
                      aria-pressed={screenshotIndex === index}
                      className={`relative shrink-0 w-24 sm:w-28 aspect-video overflow-hidden rounded border transition-all ${
                        screenshotIndex === index
                          ? 'border-accent-orange opacity-100'
                          : 'border-white/10 opacity-50 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={screenshot}
                        alt=""
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute bottom-1 left-1 hud-text-dim bg-black/70 px-1 rounded">
                        {getProjectNumber(index)}
                      </span>
                    </button>
                  ))}
                </div>
              )}

              <div className="flex justify-between gap-3 mt-3 hud-text-dim">
                <span>↑ ↓ CHANGE FRAME</span>
                <span>{screenshotIndex + 1} / {screenshots.length}</span>
              </div>
            </div>

            {/* Project details */}
            <aside className="p-5 md:p-6 flex flex-col gap-6">
              <div>
                <span className="hud-text-accent">
                  PROJECT INFORMATION
                </span>
                <h2 className="font-hero text-2xl md:text-3xl font-bold text-white mt-3 break-words">
                  {project.title}
                </h2>
                <p className="text-white/55 text-sm leading-relaxed mt-4 whitespace-pre-line">
                  {project.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 border border-white/[0.08] bg-white/[0.02] rounded">
                  <div className="hud-text-dim mb-2">YEAR</div>
                  <div className="text-white/85 text-sm">
                    {project.year || 'N/A'}
                  </div>
                </div>
                <div className="p-3 border border-white/[0.08] bg-white/[0.02] rounded">
                  <div className="hud-text-dim mb-2">IMAGES</div>
                  <div className="text-white/85 text-sm">
                    {screenshots.length}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="hud-text-dim mb-3">TECHNOLOGIES</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="hud-text-accent border border-accent-orange/20 bg-accent-orange/[0.06] px-2.5 py-1.5 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-auto pt-5 border-t border-white/[0.08]">
                <div className="hud-text-dim mb-3">
                  PROJECT NAVIGATION
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => onNavigate(-1)}
                    className="flex-1 flex items-center justify-center gap-2 border border-white/10 rounded px-3 py-3 text-white/70 hover:text-white hover:border-accent-orange/50 transition-colors"
                  >
                    <ArrowIcon direction="left" className="w-4 h-4" />
                    <span className="hud-text-dim">PREV</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onNavigate(1)}
                    className="flex-1 flex items-center justify-center gap-2 border border-white/10 rounded px-3 py-3 text-white/70 hover:text-white hover:border-accent-orange/50 transition-colors"
                  >
                    <span className="hud-text-dim">NEXT</span>
                    <ArrowIcon className="w-4 h-4" />
                  </button>
                </div>

                <div className="hud-text-dim text-center mt-3">
                  PROJECT {getProjectNumber(projectIndex)} /{' '}
                  {getProjectNumber(totalProjects - 1)}
                </div>
              </div>
            </aside>
          </div>
        </div>

        {/* Viewer footer */}
        <footer className="camera-hud-bottom shrink-0">
          <span className="hud-text-dim">
            <span className="text-accent-orange">●</span> REVIEW MODE
          </span>
          <span className="hud-text-dim hidden sm:inline">
            ← → PROJECTS &nbsp; ESC CLOSE
          </span>
        </footer>
      </motion.section>
    </motion.div>
  );
};

export const ProjectsSection = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [screenshotIndex, setScreenshotIndex] = useState(0);

  const selectedProject =
    selectedIndex !== null ? projects[selectedIndex] : null;

  const openProject = (index) => {
    setSelectedIndex(index);
    setScreenshotIndex(0);
  };

  const closeProject = () => {
    setSelectedIndex(null);
    setScreenshotIndex(0);
  };

  const navigateProject = (direction) => {
    if (!projects.length || selectedIndex === null) return;

    setSelectedIndex(
      (selectedIndex + direction + projects.length) % projects.length
    );
    setScreenshotIndex(0);
  };

  return (
    <section className="relative flex flex-col w-full h-full min-h-0 bg-black">
      {/* Ambient camera scanlines */}
      <div className="scanlines absolute inset-0 pointer-events-none z-0" />

      {/* Top HUD */}
      <header className="camera-hud-top relative z-10 shrink-0">
        <div className="flex items-center gap-2">
          <span className="hud-text-dim">GALLERY</span>
          <span className="hud-text-dim">/</span>
          <span className="hud-text-accent">PROJECTS</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="hud-text-dim">
            <span className="text-white/50">[</span>{' '}
            {String(projects.length).padStart(2, '0')}{' '}
            <span className="text-white/50">]</span>
          </span>
          <span className="hud-text-dim hidden sm:inline">
            DIGITAL ARCHIVE
          </span>
        </div>
      </header>

      {/* Scrollable gallery */}
      <main className="relative z-10 flex-1 min-h-0 overflow-y-auto px-4 py-6 sm:px-6 md:px-8 lg:px-10">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="max-w-7xl mx-auto"
        >
          {/* Heading */}
          <div className="flex items-end justify-between gap-4 mb-8 md:mb-10">
            <div>
              <div className="hud-text-accent mb-3">
                SELECTED WORK / PROJECT ARCHIVE
              </div>
              <h1 className="font-hero text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
                Projects<span className="text-accent-orange">.</span>
              </h1>
              <p className="text-white/45 text-sm md:text-base mt-3 max-w-xl leading-relaxed">
                A collection of things I've designed, built, and engineered.
                Select a project to explore the details.
              </p>
            </div>

            <div className="hidden md:flex flex-col items-end gap-2 shrink-0">
              <div className="w-12 h-12 border-t border-l border-accent-orange/50 relative">
                <span className="absolute top-0 left-0 w-2 h-2 bg-accent-orange" />
              </div>
              <span className="hud-text-dim">CAM-01 / REVIEW</span>
            </div>
          </div>

          {/* Gallery */}
          {projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
              <ProjectCard
                project={projects[0]}
                index={0}
                featured
                onSelect={() => openProject(0)}
              />

              {projects.slice(1).map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index + 1}
                  onSelect={() => openProject(index + 1)}
                />
              ))}
            </div>
          ) : (
            <div className="border border-white/10 rounded-lg p-10 text-center">
              <div className="hud-text-accent mb-3">NO FILES FOUND</div>
              <p className="text-white/50 text-sm">
                Projects will appear here when they are available.
              </p>
            </div>
          )}

          {/* Gallery footer */}
          <div className="mt-8 pt-4 border-t border-white/[0.08] flex items-center justify-between gap-4">
            <span className="hud-text-dim">
              {String(projects.length).padStart(2, '0')} FILES INDEXED
            </span>
            <span className="hud-text-dim hidden sm:inline">
              SELECT A FRAME TO BEGIN REVIEW
            </span>
            <span className="hud-text-accent">● SYSTEM READY</span>
          </div>
        </motion.div>
      </main>

      {/* Bottom HUD */}
      <footer className="camera-hud-bottom relative z-10 shrink-0">
        <div className="flex items-center gap-3">
          <span className="hud-text-dim">FOCUS</span>
          <span className="hud-text-dim">/</span>
          <span className="hud-text-dim">REVIEW</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="hud-text-dim hidden sm:inline">ZOOM</span>
          <span className="hud-text-accent">100%</span>
        </div>
      </footer>

      {/* Project viewer */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectViewer
            key={selectedProject.id}
            project={selectedProject}
            projectIndex={selectedIndex}
            totalProjects={projects.length}
            screenshotIndex={screenshotIndex}
            onScreenshotChange={setScreenshotIndex}
            onClose={closeProject}
            onNavigate={navigateProject}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProjectsSection;
