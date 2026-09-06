import React, {useState} from 'react';
import Header from '../components/Header';
import { Box, Typography, Button } from '@mui/material';
import { motion, AnimatePresence } from "framer-motion";
import '../styles/font.css';
import '../styles/index.css';
import IntroVideo from './../assets/video/intro.mp4';
import ScaledSlide from '../components/ScaledSlide';
import { slides as projectSlides } from '../pages/Project';
import { slides as aboutSlides } from '../pages/About';
import { slides as careerSlides } from '../pages/CareerHistory';
import { slides as gallerySlides } from '../pages/Gallery';

// Using forwardRef to prevent error when using motion's createMotion method
const pages = ['Projects', 'Career History', 'Gallery', 'About'];

function MobileLanding({ pages, pageSlides, currentPage, navigateToPage }) {
    const mobilePages = pages.filter((page) => pageSlides[page]);
    const currentSlides = pageSlides[currentPage] || [];

    return (
        <Box sx={{ display: { xs: 'flex', md: 'none' }, height: '100vh', width: '100%', overflowY: 'auto', flexDirection: 'column', background: '#08090b', color: '#f6f4ef', pb: 5 }}>
            <Box sx={{ position: 'sticky', top: 0, zIndex: 30, px: 2, py: 2, background: 'rgba(8,9,11,0.94)', backdropFilter: 'blur(14px)', borderBottom: '1px solid rgba(255,255,255,0.14)' }}>
                <Typography sx={{ color: '#e8b6a2', fontFamily: 'monospace', fontSize: 11, letterSpacing: 2 }}>SUNNY YOU / PORTFOLIO</Typography>
                <Typography sx={{ mt: 0.5, fontSize: 24, fontWeight: 800 }}>{currentPage}</Typography>
                <Box sx={{ display: 'flex', gap: 1, overflowX: 'auto', mt: 1.5, pb: 0.5 }}>
                    {mobilePages.map((page) => (
                        <Button key={page} size="small" onClick={() => navigateToPage(page)} variant={page === currentPage ? 'contained' : 'outlined'} sx={{ flexShrink: 0, color: page === currentPage ? '#111217' : '#f6f4ef', background: page === currentPage ? '#e8b6a2' : 'transparent', borderColor: 'rgba(255,255,255,0.35)', whiteSpace: 'nowrap' }}>
                            {page}
                        </Button>
                    ))}
                </Box>
            </Box>

            <Box component="main" sx={{ display: 'flex', flexDirection: 'column', gap: 2, px: 1.5, pt: 2 }}>
                {currentSlides.map((slide, index) => (
                    <Box key={`${currentPage}-mobile-${index}`} sx={{ width: '100%', aspectRatio: '5 / 4', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.14)', background: '#111217' }}>
                        {slide}
                    </Box>
                ))}
            </Box>
        </Box>
    );
}

const Main = React.forwardRef((props, ref) => {
    const [ currentPage, setCurrentPage ] = useState('About');
    const [ slideIndex, setSlideIndex ] = useState(0);
    const [ showInteractionHint, setShowInteractionHint ] = useState(true);

    // map of pages that provide slides
    const pageSlides = {
        'Projects': projectSlides,
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

    const navigateByPage = (direction) => {
        const currentPageIndex = pages.indexOf(currentPage);
        const nextPageIndex = (currentPageIndex + direction + pages.length) % pages.length;
        navigateToPage(pages[nextPageIndex]);
    };

    return(
           <>
           <MobileLanding pages={pages} pageSlides={pageSlides} currentPage={currentPage} navigateToPage={navigateToPage} />
        <Box sx={{ display: { xs: 'none', md: 'flex' } }} style={{
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
                <Box component={motion.div} id="interaction_overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{delay: 6, duration: 1.2, ease: "easeInOut"}} onClick={() => showInteractionHint && setShowInteractionHint(false)} sx={{ position: 'fixed', inset: 0, width: '100vw', height: '100vh', zIndex: 100, pointerEvents: showInteractionHint ? 'auto' : 'none', backgroundColor: showInteractionHint ? 'rgba(0, 0, 0, 0.82)' : 'transparent' }}>
                    <AnimatePresence>
                        {showInteractionHint && (
                            <Box sx={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', cursor: 'pointer', pointerEvents: 'auto' }}>
                                <Typography sx={{ maxWidth: 260, px: 2, color: 'white', fontSize: 15, lineHeight: 1.4, textAlign: 'center', textShadow: '0 1px 4px rgba(0,0,0,0.9)' }}>
                                    Use {'<'} and {'>'} to change slides. Use ^ and v to change pages.
                                </Typography>
                            </Box>
                        )}
                    </AnimatePresence>
                </Box>

                {showInteractionHint && (
                    <Box sx={{ position: 'absolute', inset: 0, zIndex: 105, pointerEvents: 'none' }}>
                        <ScaledSlide>
                            <Box sx={{ position: 'relative', width: 760, height: 608 }}>
                                <Box component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 6.8, duration: 0.6 }} sx={{ position: 'absolute', bottom: 160, left: '92.5%', transform: 'translateX(-50%)', display: 'grid', gridTemplateColumns: '40px 70px 40px', gridTemplateRows: '40px 70px 40px', gap: 2 }}>
                                    <Button variant="contained" color="primary" disabled sx={{ gridColumn: 2, gridRow: 1, minWidth: 70, minHeight: 40, opacity: 1, '&.Mui-disabled': { color: 'white', backgroundColor: 'rgba(25,118,210,0.72)', border: '2px solid rgba(255,255,255,0.95)', boxShadow: '0 0 0 3px rgba(255,255,255,0.85), 0 0 22px rgba(90,180,255,0.95)' } }}>{'^'}</Button>
                                    <Button variant="contained" color="primary" disabled sx={{ gridColumn: 1, gridRow: 2, minWidth: 40, minHeight: 70, opacity: 1, '&.Mui-disabled': { color: 'white', backgroundColor: 'rgba(25,118,210,0.72)', border: '2px solid rgba(255,255,255,0.95)', boxShadow: '0 0 0 3px rgba(255,255,255,0.85), 0 0 22px rgba(90,180,255,0.95)' } }}>{'<'}</Button>
                                    <Button variant="contained" color="primary" disabled sx={{ gridColumn: 3, gridRow: 2, minWidth: 40, minHeight: 70, opacity: 1, '&.Mui-disabled': { color: 'white', backgroundColor: 'rgba(25,118,210,0.72)', border: '2px solid rgba(255,255,255,0.95)', boxShadow: '0 0 0 3px rgba(255,255,255,0.85), 0 0 22px rgba(90,180,255,0.95)' } }}>{'>'}</Button>
                                    <Button variant="contained" color="primary" disabled sx={{ gridColumn: 2, gridRow: 3, minWidth: 70, minHeight: 40, opacity: 1, '&.Mui-disabled': { color: 'white', backgroundColor: 'rgba(25,118,210,0.72)', border: '2px solid rgba(255,255,255,0.95)', boxShadow: '0 0 0 3px rgba(255,255,255,0.85), 0 0 22px rgba(90,180,255,0.95)' } }}>{'v'}</Button>
                                </Box>
                            </Box>
                        </ScaledSlide>
                    </Box>
                )}

                <Box sx={{ position: 'absolute', inset: 0, zIndex: showInteractionHint ? 90 : 110, pointerEvents: 'none' }}>
                    <ScaledSlide>
                        <Box sx={{ position: 'relative', width: 760, height: 608 }}>
                            <Box component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 6, duration: 0.8 }} sx={{ position: 'absolute', bottom: 160, left: '92.5%', transform: 'translateX(-50%)', display: 'grid', gridTemplateColumns: '40px 70px 40px', gridTemplateRows: '40px 70px 40px', gap: 2, pointerEvents: 'auto' }}>
                                <Button variant="contained" color="primary" sx={{ gridColumn: 2, gridRow: 1, minWidth: 70, minHeight: 40 }} onClick={() => navigateByPage(-1)}>{'^'}</Button>
                                <Button variant="contained" color="primary" sx={{ gridColumn: 1, gridRow: 2, minWidth: 40, minHeight: 70 }} onClick={() => currentSlides && setSlideIndex((slideIndex - 1 + currentSlides.length) % currentSlides.length)}>{'<'}</Button>
                                <Button variant="contained" color="primary" sx={{ gridColumn: 3, gridRow: 2, minWidth: 40, minHeight: 70 }} onClick={() => currentSlides && setSlideIndex((slideIndex + 1) % currentSlides.length)}>{'>'}</Button>
                                <Button variant="contained" color="primary" sx={{ gridColumn: 2, gridRow: 3, minWidth: 70, minHeight: 40 }} onClick={() => navigateByPage(1)}>{'v'}</Button>
                            </Box>
                        </Box>
                    </ScaledSlide>
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
                            <motion.div key={`${currentPage}-${slideIndex}`} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.45 }} style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', boxSizing: 'border-box' }}>
                                {currentSlides[slideIndex]}
                            </motion.div>
                        </AnimatePresence>
                    ) : null}

                </Box>
            </Box>
        </Box>
        </>
    )
});

export default Main;
