import React from "react";
import ReactDOM from 'react-dom/client';
import DSRLPortfolio from './pages/DSRLPortfolio';
import './styles/index.css';
import './styles/font.css';
import reportWebVitals from './reportWebVitals';
import { AnimatePresence, motion } from "framer-motion";
import { Loader } from "./components/Loader";

const root = ReactDOM.createRoot(document.getElementById('root'));
function InitializeApp() {
  const [phase, setPhase] = React.useState('loader'); // 'loader' | 'portfolio'

  React.useEffect(() => {
    // SUNNY loader shows for 3 seconds, then transitions to portfolio
    const timer = setTimeout(() => {
      setPhase('portfolio');
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh", overflow: "hidden", backgroundColor: "black" }}>
      <AnimatePresence mode="wait">
        {phase === 'loader' && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <Loader />
          </motion.div>
        )}
        {phase === 'portfolio' && (
          <motion.div
            key="portfolio"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              zIndex: 1,
            }}
          >
            <DSRLPortfolio />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

root.render(
  <React.StrictMode>
    <InitializeApp />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
