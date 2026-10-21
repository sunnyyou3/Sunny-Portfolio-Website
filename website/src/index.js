import React from "react";
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import './styles/camera.css';
import reportWebVitals from './reportWebVitals';
import { AnimatePresence, motion } from "motion/react";
import { Loader } from "./components/Loader";
import { DSLRPortfolio } from "./components/camera/DSLRPortfolio";
import { ErrorBoundary } from './components/camera/ErrorBoundary';
import IntroVideo from './assets/video/intro.mp4';

// Phase transition timing constants for easier tuning
const PHASE_TIMING = {
    LOADER_DURATION: 4500, // ms
    VIDEO_FADE_IN: 0.6,    // seconds
    VIDEO_FADE_OUT: 0.6,   // seconds
    PORTFOLIO_FADE_IN: 1.2, // seconds
};

const root = ReactDOM.createRoot(document.getElementById('root'));

function InitializeApp() {
  const [phase, setPhase] = React.useState('loader'); // 'loader' -> 'video' -> 'portfolio'

  // Phase 1: Loader (SUNNY animation)
  React.useEffect(() => {
    if (phase === 'loader') {
      const timer = setTimeout(() => {
        setPhase('video');
      }, PHASE_TIMING.LOADER_DURATION);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  // Phase 2: Intro video (DSLR animation) - ~5 seconds
  const handleVideoEnd = React.useCallback(() => {
    setPhase('portfolio');
  }, []);

  const handleVideoError = React.useCallback(() => {
    // If video fails to load, skip to portfolio
    setPhase('portfolio');
  }, []);

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh", overflow: "hidden", backgroundColor: "black" }}>
      <AnimatePresence mode="wait">
        {/* Phase 1: SUNNY Loader */}
        {phase === 'loader' && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            style={{ position: "absolute", inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <Loader />
          </motion.div>
        )}

        {/* Phase 2: Intro Video */}
        {phase === 'video' && (
          <motion.div
            key="video"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: PHASE_TIMING.VIDEO_FADE_IN }}
            style={{ position: "absolute", inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'black' }}
          >
            <video 
              src={IntroVideo}
              muted
              autoPlay
              onEnded={handleVideoEnd}
              onError={handleVideoError}
              style={{ 
                width: "100%", 
                height: "100%", 
                objectFit: 'cover',
              }}
            >
              Your browser does not support the video tag.
            </video>
          </motion.div>
        )}

        {/* Phase 3: DSLR Portfolio */}
        {phase === 'portfolio' && (
          <motion.div
            key="portfolio"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: PHASE_TIMING.PORTFOLIO_FADE_IN, ease: "easeInOut" }}
            style={{ position: "absolute", inset: 0 }}
          >
            <DSLRPortfolio />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <InitializeApp />
    </ErrorBoundary>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
