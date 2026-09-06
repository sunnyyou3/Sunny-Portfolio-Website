import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const DESIGN_WIDTH = 760;
const DESIGN_HEIGHT = 608;

export default function ScaledSlide({ children }) {
    const frameRef = useRef(null);
    const [scale, setScale] = useState(1);

    useEffect(() => {
        const frame = frameRef.current;
        if (!frame) return undefined;

        const updateScale = () => {
            const { width, height } = frame.getBoundingClientRect();
            setScale(Math.min(width / DESIGN_WIDTH, height / DESIGN_HEIGHT));
        };

        updateScale();
        const observer = new ResizeObserver(updateScale);
        observer.observe(frame);
        return () => observer.disconnect();
    }, []);

    return (
        <motion.div ref={frameRef} initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ width: '100%', height: '100%', overflow: 'hidden', position: 'relative' }}>
            <div style={{ width: DESIGN_WIDTH, height: DESIGN_HEIGHT, position: 'absolute', left: '50%', top: '50%', transform: `translate(-50%, -50%) scale(${scale})`, transformOrigin: 'center center' }}>
                {children}
            </div>
        </motion.div>
    );
}
