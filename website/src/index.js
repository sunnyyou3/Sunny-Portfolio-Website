import React from 'react';
import ReactDOM from 'react-dom/client';
import Main from './pages/Main'
import './styles/index.css';
import reportWebVitals from './reportWebVitals';
import { motion } from "motion/react"
import { Loader } from "./components/Loader";

const root = ReactDOM.createRoot(document.getElementById('root'));
const AnimateMainPage = motion.create(Main);

function InitializeApp() {
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 6500);
    return () => clearTimeout(timer);
  }, []);

  return loaded ? (
    <AnimateMainPage
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    />
  ) : (
    <Loader />
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
