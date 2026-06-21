import React from "react";
import ReactDOM from 'react-dom/client';
import Main from './pages/Main'
import './styles/index.css';
import reportWebVitals from './reportWebVitals';
import { AnimatePresence, motion } from "framer-motion";
import { Loader } from "./components/Loader";

const root = ReactDOM.createRoot(document.getElementById('root'));
function InitializeApp() {
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 4500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh", overflow: "hidden", backgroundColor: "black" }}>
      <AnimatePresence>
        {!loaded ? (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          >
            <Loader />
          </motion.div>
        ) : (
          <motion.div
            key="main-layer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              zIndex: 1,
            }}
          >
            <Main />
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
