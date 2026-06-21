import React from 'react';
import Header from '../components/Header';
import { Box } from '@mui/material';
import { motion } from "framer-motion";
import '../styles/font.css';
import '../styles/index.css';
import IntroVideo from './../assets/video/intro.mp4';
import About from "../pages/About_old";

// Using forwardRef to prevent error when using motion's createMotion method
const Main = React.forwardRef((props, ref) => {
    return(
        <Box style={{ 
    width: '100vw', 
    height: '100vh', 
    backgroundColor: 'black', 
    overflow: 'hidden', 
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
}}>
    <Header />
    <Box style={{ 
        position: 'relative', 
        width: 'calc(100vw - 80px)', 
        height: 'calc((100vw - 80px) * (9 / 16))',              /* Forces 16:9 aspect ratio based on width */
        maxHeight: 'calc(100vh - 80px)',
        maxWidth: 'calc((100vh - 80px) * (16 / 9))',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }}>
        <video 
            src={IntroVideo}
            muted
            autoPlay
            style={{ 
                width: "100%", 
                height: "100%", 
                objectFit: 'cover', 
                zIndex: 1
            }}
        >
            Your browser does not support the video tag.
        </video>
        <Box component={motion.div} id="camera_screen" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{delay: 6, duration: 1.2, ease: "easeInOut"}}
            style={{ 
                backgroundColor: 'rgba(0, 0, 0, 0.7)', 
                width: '49%',
                height: '70%',
                position: 'absolute',
                top: '22%',
                left: '11%',
                zIndex: 10,
                border: '2px solid white',
                overflow: 'auto'
            }}
        >
            <About />
        </Box>
    </Box>
</Box>
    )
});

export default Main;
