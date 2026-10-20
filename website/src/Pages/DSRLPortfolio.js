import React, { useRef, useState, useCallback } from 'react';
import { Box, Typography } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import IntroVideo from '../assets/video/intro.mp4';
import { useCameraNavigation, SECTIONS } from '../hooks/useCameraNavigation';
import {
  CameraShell,
  CameraMenu,
  HomeView,
  ProjectsView,
  ExperienceView,
  AboutView,
  GalleryView,
} from '../components/camera';

// Dynamic gallery count - handle test environment
let galleryPhotoCount = 0;
try {
  if (typeof require.context === 'function') {
    const imageContext = require.context('../assets/Portfolio/Images/Gallery', false, /\.(png|jpe?g|webp|gif)$/i);
    galleryPhotoCount = imageContext.keys().sort().length;
  }
} catch (e) {
  galleryPhotoCount = 0;
}

/**
 * Main DSLR Portfolio component.
 * Shows the intro video, then transitions to the DSLR camera interface.
 */
export default function DSRLPortfolio() {
  const {
    activeView,
    menuOpen,
    menuIndex,
    slideIndex,
    displayMode,
    lcdOn,
    navigateToView,
    openMenu,
    menuNavigate,
    menuConfirm,
    goBack,
    toggleDisplayMode,
    selectProject,
    slideNavigate,
  } = useCameraNavigation();

  const videoRef = useRef(null);
  const [showingVideo, setShowingVideo] = useState(true);

  // Handle video end
  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => {
      // Fade out video
      setTimeout(() => {
        setShowingVideo(false);
      }, 500);
    };

    const handleCanPlay = () => {
      video.play().catch(() => {
        // Autoplay may be blocked - still show
        setShowingVideo(false);
      });
    };

    video.addEventListener('ended', handleEnded);
    video.addEventListener('canplay', handleCanPlay);

    return () => {
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('canplay', handleCanPlay);
    };
  }, []);

  // Get current slide count
  const getCurrentSlideCount = useCallback(() => {
    switch (activeView) {
      case 'Home': return 1;
      case 'Projects': return 2;
      case 'Experience': return 6;
      case 'About': return 1;
      case 'Gallery': return galleryPhotoCount;
      default: return 1;
    }
  }, [activeView]);

  // Navigation handlers
  const handleUp = useCallback(() => {
    if (menuOpen) {
      menuNavigate(-1);
    } else {
      const idx = SECTIONS.indexOf(activeView);
      const prevIdx = (idx - 1 + SECTIONS.length) % SECTIONS.length;
      navigateToView(SECTIONS[prevIdx]);
    }
  }, [menuOpen, menuNavigate, activeView, navigateToView]);

  const handleDown = useCallback(() => {
    if (menuOpen) {
      menuNavigate(1);
    } else {
      const idx = SECTIONS.indexOf(activeView);
      const nextIdx = (idx + 1) % SECTIONS.length;
      navigateToView(SECTIONS[nextIdx]);
    }
  }, [menuOpen, menuNavigate, activeView, navigateToView]);

  const handleLeft = useCallback(() => {
    slideNavigate(-1);
  }, [slideNavigate]);

  const handleRight = useCallback(() => {
    slideNavigate(1);
  }, [slideNavigate]);

  const handleOk = useCallback(() => {
    if (menuOpen) {
      menuConfirm();
    }
  }, [menuOpen, menuConfirm]);

  const handleScroll = useCallback((direction) => {
    slideNavigate(direction);
  }, [slideNavigate]);

  const handlePlayback = useCallback(() => {
    navigateToView('Projects');
  }, [navigateToView]);

  // Render the appropriate view
  const renderView = () => {
    switch (activeView) {
      case 'Home':
        return <HomeView />;
      case 'Projects':
        return <ProjectsView onProjectSelect={selectProject} projectIndex={slideIndex} />;
      case 'Experience':
        return <ExperienceView slideIndex={slideIndex} />;
      case 'About':
        return <AboutView />;
      case 'Gallery':
        return <GalleryView slideIndex={slideIndex} />;
      default:
        return <HomeView />;
    }
  };

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        backgroundColor: 'black',
      }}
    >
      {/* Intro video overlay */}
      <AnimatePresence>
        {showingVideo && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 1000,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              background: 'black',
            }}
          >
            <video
              ref={videoRef}
              src={IntroVideo}
              muted
              autoPlay
              playsInline
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            >
              Your browser does not support the video tag.
            </video>
          </motion.div>
        )}
      </AnimatePresence>

      {/* DSLR Camera Interface */}
      <AnimatePresence mode="wait">
        {!showingVideo && (
          <motion.div
            key="camera-interface"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 100,
            }}
          >
            <CameraShell
              lcdOn={lcdOn}
              onMenuToggle={openMenu}
              onInfoToggle={toggleDisplayMode}
              onPlayback={handlePlayback}
              onBack={goBack}
              onUp={handleUp}
              onDown={handleDown}
              onLeft={handleLeft}
              onRight={handleRight}
              onOk={handleOk}
              onScroll={handleScroll}
            >
              {/* LCD Content */}
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                  overflow: 'hidden',
                }}
              >
                {/* Status bar */}
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    px: 1.5,
                    py: 0.4,
                    background: 'rgba(0,0,0,0.85)',
                    borderBottom: '1px solid rgba(255,255,255,0.08)',
                    minHeight: 24,
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Typography
                      variant="caption"
                      sx={{
                        fontFamily: 'monospace',
                        fontSize: 10,
                        color: '#e8b6a2',
                        letterSpacing: 1,
                      }}
                    >
                      {activeView.toUpperCase()}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        fontFamily: 'monospace',
                        fontSize: 9,
                        color: 'rgba(246,244,239,0.5)',
                      }}
                    >
                      {displayMode === 'info' ? '1/250' : '400'}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        fontFamily: 'monospace',
                        fontSize: 9,
                        color: 'rgba(246,244,239,0.5)',
                      }}
                    >
                      f/{displayMode === 'info' ? '2.8' : '5.6'}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography
                      variant="caption"
                      sx={{
                        fontFamily: 'monospace',
                        fontSize: 9,
                        color: 'rgba(246,244,239,0.5)',
                      }}
                    >
                      ISO {displayMode === 'info' ? '+1.0' : '400'}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        fontFamily: 'monospace',
                        fontSize: 9,
                        color: 'rgba(246,244,239,0.5)',
                      }}
                    >
                      AF-S
                    </Typography>
                    <Box
                      sx={{
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        background: '#ff4444',
                      }}
                    />
                  </Box>
                </Box>

                {/* Screen content with transition */}
                <Box
                  sx={{
                    position: 'relative',
                    flex: 1,
                    overflow: 'auto',
                    '&::-webkit-scrollbar': { width: 4 },
                    '&::-webkit-scrollbar-track': { background: 'rgba(0,0,0,0.2)' },
                    '&::-webkit-scrollbar-thumb': { background: 'rgba(255,255,255,0.15)', borderRadius: 2 },
                  }}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`${activeView}-${slideIndex}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{
                        duration: 0.35,
                        ease: 'easeInOut',
                      }}
                      style={{
                        width: '100%',
                        height: '100%',
                        minHeight: 0,
                      }}
                    >
                      {renderView()}
                    </motion.div>
                  </AnimatePresence>
                </Box>

                {/* Bottom info bar */}
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    px: 1.5,
                    py: 0.35,
                    background: 'rgba(0,0,0,0.85)',
                    borderTop: '1px solid rgba(255,255,255,0.08)',
                    minHeight: 22,
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      fontFamily: 'monospace',
                      fontSize: 9,
                      color: 'rgba(246,244,239,0.4)',
                    }}
                  >
                    {getCurrentSlideCount() > 0 ? `${slideIndex + 1} / ${getCurrentSlideCount()}` : 'HOME'}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      fontFamily: 'monospace',
                      fontSize: 9,
                      color: 'rgba(246,244,239,0.3)',
                    }}
                  >
                    {activeView}
                  </Typography>
                </Box>

                {/* Menu overlay */}
                {menuOpen && (
                  <Box sx={{ position: 'absolute', inset: 0, zIndex: 50 }}>
                    <CameraMenu
                      menuIndex={menuIndex}
                      onNavigate={(direction) => menuNavigate(direction)}
                      onConfirm={(idx) => {
                        const view = SECTIONS[idx];
                        if (view) navigateToView(view);
                      }}
                      onExit={() => openMenu()}
                    />
                  </Box>
                )}

                {/* Info mode overlay */}
                {displayMode === 'info' && !menuOpen && (
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 28,
                      left: 12,
                      right: 12,
                      zIndex: 30,
                      background: 'rgba(0,0,0,0.75)',
                      backdropFilter: 'blur(4px)',
                      borderRadius: 1,
                      p: 1.5,
                      border: '1px solid rgba(255,255,255,0.1)',
                    }}
                  >
                    <Typography
                      variant="caption"
                      sx={{
                        fontFamily: 'monospace',
                        fontSize: 9,
                        color: 'rgba(246,244,239,0.6)',
                        lineHeight: 1.5,
                        display: 'block',
                      }}
                    >
                      DESIGN CONCEPT: This portfolio is designed as the rear view of a physical DSLR camera.
                      The camera body is the persistent outer layout. The LCD displays selected portfolio sections.
                      Physical controls navigate between sections. MENU opens the section list.
                      BACK returns to previous view. Directional controls navigate pages and slides.
                    </Typography>
                  </Box>
                )}

                {/* Screen reflection overlay */}
                <Box
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.02) 0%, transparent 40%, transparent 60%, rgba(255,255,255,0.01) 100%)',
                    pointerEvents: 'none',
                    zIndex: 10,
                  }}
                />

                {/* Scanline effect (subtle) */}
                <Box
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)',
                    pointerEvents: 'none',
                    zIndex: 11,
                  }}
                />
              </Box>
            </CameraShell>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
}
