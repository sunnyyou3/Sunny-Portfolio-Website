import { motion } from "motion/react"
import { loaderContainer, letters } from "../animations/variants";

const style = {
  position: 'absolute',
  color : 'white',
  fontFamily: '"BBH Sans Hegarty", sans-serif'
}

export const Loader = () => (
  <div className="loader">
    <motion.div
      className="loader"
      variants={loaderContainer}
      initial="initial"
      animate="animate"
      style={{ position: "relative" }}
    >
      <motion.h1 {...letters.S} style={{ ...style, marginRight: "100px" }}>S</motion.h1>
      <motion.h1 {...letters.U} style={{ ...style, marginRight: "50px" }}>U</motion.h1>
      <motion.h1 {...letters.N1} style={{ ...style }}>N</motion.h1>
      <motion.h1 {...letters.N2} style={{ ...style, marginLeft: "55px" }}>N</motion.h1>
      <motion.h1 {...letters.Y} style={{ ...style, marginLeft: "100px" }}>Y</motion.h1>
    </motion.div>
  </div>
);
