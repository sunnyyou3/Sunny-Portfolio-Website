import React, {useState} from 'react';
import Header from '../components/Header';
import { Box } from '@mui/material';
import { motion } from "framer-motion";
import '../styles/font.css';
import '../styles/index.css';
import IntroVideo from './../assets/video/intro.mp4';

// pages
import Home from "../pages/Home";
import About from "../pages/About_old";
import Gallery from "../pages/Gallery";
import CareerHistory from "../pages/CareerHistory";
import Title from '../telework_game/Title';

// Using forwardRef to prevent error when using motion's createMotion method
const pages = ['Projects', 'Career History', 'Gallery', 'About', 'Game'];

const Main = React.forwardRef((props, ref) => {
    const [ currentPage, setCurrentPage ] = useState('About');

    const navigateToPage = (page) => {
        console.log(`Navigating to ${page}`);
        setCurrentPage(page);
    }

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
            <Header navItems={ pages } callback= {navigateToPage} />
            <Box style={{ 
                position: 'relative', 
                width: 'calc(100vw - 80px)', 
                height: 'calc((100vw - 80px) * (9 / 16))',
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
                    {(() => {
                        if (currentPage === 'Projects') return <Home />
                        else if (currentPage === 'Career History') return <CareerHistory />
                        else if (currentPage === 'Gallery') return <Gallery />
                        else if (currentPage === 'About') return <About />
                        else if (currentPage === 'Game') return <Title />
                        else return <About />
                    })()}
                </Box>
            </Box>
        </Box>
    )
});

export default Main;
