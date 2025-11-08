import React from "react";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import { IconButton } from "@mui/material";
import { motion } from "motion/react";
import { Snowflakes } from '../components/Snow';

const IconButtonStyle = {
  color: "white",
  minWidth: "100px",
  minHeight: "100px",
  transform: "rotate(180deg)",
  zIndex: 3,
  position: 'absolute'
};

const lightningBefore =
  "radial-gradient(circle,rgba(207, 207, 62, 1) 0%, rgba(77, 77, 61, 1) 8%, rgba(0, 0, 0, 1) 100%)";
const lightningAfter =
  "radial-gradient(circle,rgba(255, 255, 0, 1) 0%, rgba(168, 168, 99, 1) 33%, rgba(0, 0, 0, 1) 75%)";

function Lightroom() {
  const [showRoom, setShowRoom] = React.useState(false);
  const [fadeOut, setFadeOut] = React.useState(false);

  const handleClick = () => {
    setFadeOut(true);
    setShowRoom(true);
  };

  return (
    <div id="main-content-inner" align="center" style={{ position: "relative" }}>
        <Snowflakes/>
      {showRoom && (
        <div>
            <motion.img
                id="Lightroom-background"
                src={require("./../assets/Portfolio/Images/room.jpg")}
                alt="room"
                initial={{ opacity: 0 }}
                animate={{ opacity: fadeOut ? 1 : 0 }}
                transition={{ duration: 2, delay: 1 }}
                style={{
                    position: "relative",
                    top: "300px",
                    zIndex: 4
                }}
                />
        </div>
      )}
      <motion.div
        id="Lightbulb"
        initial={{ opacity: 1 }}
        animate={{
            opacity: fadeOut ? 0 : 1,
            background: [lightningBefore, lightningAfter, lightningBefore],
        }}
        transition={{
            opacity: { duration: 2 },
            background: { duration: 5, repeat: Infinity },
        }}
        >
            <div id='frosted-overlay'/>
            <motion.img
                src={require("./../assets/Portfolio/Images/window-open-transparent.png")}
                alt="window"
                initial={{ scale: 1 }}       // start scaled down
                animate={fadeOut ? { scale: 10 } : { scale: 1 }}       // scale up to normal size
                transition={{ duration: 4, ease: "easeOut" }} // smooth animation
                style={{marginLeft: '100px'}}
            />
            <h1 style={{position:'absolute', bottom:'300px', color: 'white'}}>CLICK ME</h1>
            <IconButton
                sx={{ ...IconButtonStyle }}
                component={motion.div}
                onClick={handleClick}
                >
                    <LightbulbOutlinedIcon sx={{ width: "100px", height: "100px" }} />
            </IconButton>
      </motion.div>
    </div>
  );
}

export default Lightroom;
