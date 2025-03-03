import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform
} from "framer-motion";
import Box from '@mui/material/Box';

const projectTitle = [
  "",
  "Project Title1",
  "Project Title2",
  "Project Title3",
  "Project Title4",
  "Project Title5"
];

const projectText = [
  "",
  "hello from the other side hello from the other side hello from the other side hello from the other side hello from the other side", 
  "hello from the other side hello from the other side hello from the other side hello from the other side hello from the other side", 
  "hello from the other side hello from the other side hello from the other side hello from the other side hello from the other side", 
  "hello from the other side hello from the other side hello from the other side hello from the other side hello from the other side", 
  "hello from the other side hello from the other side hello from the other side hello from the other side hello from the other side"
];


function useParallax(value, distance) {
  return useTransform(value, [0, 1], [-distance, distance]);
}

function Image({ id, containerRef }) {
  console.log(containerRef);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, container: containerRef, layoutEffect: false });
  const y = useParallax(scrollYProgress, 300);


  return (
    <section style={{ position: 'relative' }}>
      <div ref={ref}>
        <img className='projectIMG' src={require(`./../Images/${id}.jpg`)} alt="A London skyscraper" />
      </div>
      <div style={{ backgroundColor: 'red'}} >
        <motion.h2 style={{ y}}>{`#00${id}  ${projectTitle[id]}  `}</motion.h2>
        <motion.h3 style={{ y, maxWidth:"200px"}}>{`${projectText[id]}`}</motion.h3>
      </div>
    </section>
  );
}

function Projects() {
  const testRef = useRef(null);
  const { scrollYProgress } = useScroll({ container: testRef });
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  console.log(testRef);
  return (
    // sx={{'&::-webkit-scrollbar': { display: 'none' }}}
    <Box id="test" ref={testRef} style={{ backgroundColor: 'red', position: 'relative'}}>
      {[1, 2, 3, 4, 5].map((image) => (
        <Image id={image} key={image} containerRef={testRef} />
      ))}
      <motion.div className="progress" style={{ scaleX }} />
    </Box>
  );
}

export default Projects;