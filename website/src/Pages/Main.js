import React, {useState} from 'react';
import Header from '../components/Header';
import { Box, Typography, Button } from '@mui/material';
import { motion, AnimatePresence } from "framer-motion";
import '../styles/font.css';
import '../styles/index.css';
import IntroVideo from './../assets/video/intro.mp4';

// pages
import Home from "../pages/Home";
import Gallery from "../pages/Gallery";
import CareerHistory from "../pages/CareerHistory";
import Title from '../telework_game/Title';
import { slides as aboutSlides } from '../pages/About_old';
import { slides as careerSlides } from '../pages/CareerHistory';
import { slides as gallerySlides } from '../pages/Gallery';

// Using forwardRef to prevent error when using motion's createMotion method
const pages = ['Projects', 'Career History', 'Gallery', 'About', 'Game'];

const Main = React.forwardRef((props, ref) => {
    const [ currentPage, setCurrentPage ] = useState('About');
    const [ slideIndex, setSlideIndex ] = useState(0);

    // map of pages that provide slides
    const pageSlides = {
        'About': aboutSlides,
        'Career History': careerSlides,
        'Gallery': gallerySlides,
    };

    const currentSlides = pageSlides[currentPage] || null;

    const navigateToPage = (page) => {
        console.log(`Navigating to ${page}`);
        // reset slide index when switching pages that have slides
        if (pageSlides[page]) setSlideIndex(0);
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

                {/* Slide controls - universally available */}
                <Box sx={{ position: 'absolute', bottom: 18, left: '50%', transform: 'translateX(-50%)', zIndex: 20, display: 'flex', gap: 12, alignItems: 'center' }}>
                    <Button variant="contained" color="primary" disabled={!currentSlides || currentSlides.length <= 0} onClick={() => currentSlides && setSlideIndex((slideIndex - 1 + currentSlides.length) % currentSlides.length)}>Prev</Button>
                    <Typography sx={{ color: 'white', fontFamily: 'monospace' }}>{currentSlides && currentSlides.length ? `Slide ${slideIndex + 1} / ${currentSlides.length}` : 'No slides'}</Typography>
                    <Button variant="contained" color="primary" disabled={!currentSlides || currentSlides.length <= 0} onClick={() => currentSlides && setSlideIndex((slideIndex + 1) % currentSlides.length)}>Next</Button>
                </Box>

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
                        overflow: 'hidden'
                    }}
                >
                    {currentSlides ? (
                        <AnimatePresence initial={false} mode="wait">
                            <motion.div key={`${currentPage}-${slideIndex}`} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.45 }} style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 12, boxSizing: 'border-box' }}>
                                {currentSlides[slideIndex]}
                            </motion.div>
                        </AnimatePresence>
                    ) : (
                        (() => {
                            if (currentPage === 'Projects') return <Home />
                            else if (currentPage === 'Career History') return <CareerHistory />
                            else if (currentPage === 'Gallery') return <Gallery />
                            else if (currentPage === 'Game') return <Title />
                            else return null
                        })()
                    )}
                </Box>
            </Box>
        </Box>
    )
});

export default Main;
