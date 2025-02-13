import React, { useRef } from "react";
import {
    motion,
    useScroll,
    useSpring,
    useTransform,
    useMotionValue
  } from "framer-motion";
import Box from '@mui/material/Box';


// Code from https://codesandbox.io/p/sandbox/framer-motion-parallax-i9gwuc?file=%2Fsrc%2FApp.tsx%3A3%2C1-48%2C1&from-embed


function useParallax(value, distance) {
    return useTransform(value, [0, 1], [-distance, distance]);
}

function Image( image ) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref });
    //const distance = useMotionValue(800);
    const y = useParallax(scrollYProgress, 300);
    return (
      <section style={{position:'relative'}}>
        <div ref={ref} >
          <img className='projectIMG' src={require(`./../Images/${image.id}.jpg`)} alt="A London skyscraper"/>
        </div>
        <motion.h2 style={{ y }}>{`#00${image.id}`}</motion.h2>
      </section>
    );
  }

function Projects() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    return (
        <Box id="test" style={{backgroundColor:'red', position: 'relative'}}>
          {[1, 2, 3, 4, 5].map((image) => (
              <Image id={image} key={image} />
          ))}
          <motion.div className="progress" style={{ scaleX }} />
        </Box>
    );
}

export default Projects;