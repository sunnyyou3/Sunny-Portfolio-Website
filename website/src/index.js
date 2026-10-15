import React from "react";
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import reportWebVitals from './reportWebVitals';
import { AnimatePresence, motion } from "framer-motion";
import { Loader } from "./components/Loader";
import DSLRPortfolio from "./components/DSLRPortfolio";

const root = ReactDOM.createRoot(document.getElementById('root'));
function InitializeApp() {
  const [phase, setPhase] = React.useState('loader'); // 'loader' | 'fade-out' | 'fade-in' | 'done'

  React.useEffect(() => {
    // Step 1: Show loader for 4.5 seconds
    const timer1 = setTimeout(() => {
      setPhase('fade-out');
    }, 4500);

    // Step 2: Fade out loader, then fade in camera
    const timer2 = setTimeout(() => {
      setPhase('fade-in');
    }, 6500); // 4500 + 2000 (loader exit animation)

    // Step 3: Animation complete
    const timer3 = setTimeout(() => {
      setPhase('done');
    }, 8500); // 6500 + 2000 (camera fade-in animation)

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh", overflow: "hidden", backgroundColor: "black" }}>
      <AnimatePresence mode="wait">
        {(phase === 'loader' || phase === 'fade-out') && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            animate={{ opacity: phase === 'fade-out' ? 0 : 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          >
            <Loader />
          </motion.div>
        )}
        {(phase === 'fade-in' || phase === 'done') && (
          <motion.div
            key="camera"
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === 'done' ? 1 : 0 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              zIndex: 1,
            }}
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
    <InitializeApp />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
