import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Loader } from "../features/portfolio/Loader";
import { ScrollManager } from "../features/portfolio/ScrollManager";
import "../styles/index.css";

export const InitializeApp = () => {
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 4500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ position: "relative", width: "100%", height: "100vh", backgroundColor: "black" }}>
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
            <ScrollManager />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InitializeApp;
