import React from 'react';
import ReactDOM from 'react-dom/client';
import Main from './pages/Main'
import './styles/index.css';
import reportWebVitals from './reportWebVitals';
import { motion } from "motion/react"

const root = ReactDOM.createRoot(document.getElementById('root'));
const AnimateMainPage = motion.create(Main);

const style = {
  position: 'absolute',
  color : 'white',
  fontFamily: '"BBH Sans Hegarty", sans-serif'
}

function InitializeApp() {
  const [loaded, setLoaded] = React.useState(false);
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 6500);
    return () => clearTimeout(timer);
  }, []);
  return(
    loaded ? <AnimateMainPage initial={{ opacity : 0 }} animate={{ opacity : 1 }} transition={{duration : 2}} /> : 
    <div className="loader">
      <motion.div className="loader" initial={{ opacity : 1 }} animate={{ opacity : 0, x : -45, y: -45 }} transition={{duration : 1, delay: 5}} style={{position: 'relative'}}>
        <motion.h1 initial={{ x : -1000}} animate={{ x : 0 }} transition={{duration : 2}} style={{...style, marginRight: '100px'}}> S </motion.h1>
        <motion.h1 initial={{ y : -1000}} animate={{ y : 0 }} transition={{duration : 4}} style={{...style, marginRight: '50px'}}> U </motion.h1>
        <motion.h1 initial={{ y : 1000}} animate={{ y : 0 }} transition={{duration : 2}} style={style}> N </motion.h1>
        <motion.h1 initial={{ opacity : 0 }} animate={{ opacity : 1 }} transition={{duration : 2, delay: 2}} style={{...style, marginLeft: '55px'}}> N </motion.h1>
        <motion.h1 initial={{ x : 1000}} animate={{ x : 0 }} transition={{duration : 2}} style={{...style, marginLeft: '100px'}}> Y </motion.h1>
      </motion.div>
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
