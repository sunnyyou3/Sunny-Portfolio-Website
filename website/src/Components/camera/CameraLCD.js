import React, { useRef } from 'react';
import { Box, styled } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

const ScreenBezel = styled(Box)(({ theme }) => ({
    position: 'relative',
    width: '100%',
    height: '100%',
    background: '#0a0a0a',
    borderRadius: '6px',
    padding: 'clamp(4px, 0.6vw, 8px)',
    boxShadow: `
        inset 0 0 0 1px rgba(255,255,255,0.08),
        inset 0 2px 4px rgba(0,0,0,0.6),
        0 1px 0 rgba(255,255,255,0.04)
    `,
}));

const ScreenInner = styled(Box)({
    position: 'relative',
    width: '100%',
    height: '100%',
    background: '#0d1117',
    borderRadius: '3px',
    overflow: 'hidden',
    boxShadow: 'inset 0 0 30px rgba(0,100,200,0.05), inset 0 0 1px rgba(100,180,255,0.1)',
});

const ScreenReflection = styled(Box)({
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '40%',
    background: 'linear-gradient(180deg, rgba(255,255,255,0.02) 0%, transparent 100%)',
    pointerEvents: 'none',
    zIndex: 5,
    borderRadius: '3px 3px 0 0',
});

const ScreenGlare = styled(Box)({
    position: 'absolute',
    top: '10%',
    right: '5%',
    width: '40%',
    height: '30%',
    background: 'radial-gradient(ellipse, rgba(255,255,255,0.03) 0%, transparent 70%)',
    pointerEvents: 'none',
    zIndex: 5,
    transform: 'rotate(-15deg)',
});

const ScreenContent = styled(motion.div)({
    position: 'relative',
    width: '100%',
    height: '100%',
    zIndex: 2,
});

export function CameraLCD({ children }) {
    const contentRef = useRef(null);

    return (
        <ScreenBezel>
            <ScreenInner>
                <ScreenReflection />
                <ScreenGlare />
                <ScreenContent ref={contentRef}>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key="content"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            style={{ width: '100%', height: '100%' }}
                        >
                            {children}
                        </motion.div>
                    </AnimatePresence>
                </ScreenContent>
            </ScreenInner>
        </ScreenBezel>
    );
}

export default CameraLCD;
