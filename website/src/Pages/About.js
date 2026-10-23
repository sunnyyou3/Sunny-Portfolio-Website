import React from 'react';
import { Box, Typography, Chip } from '@mui/material';
import ScaledSlide from '../components/ScaledSlide';

// Image context for about-related images (if any)
const imageContext = require.context('../assets/Portfolio/Images/About', false, /\.(png|jpe?g|webp|gif)$/i);
const aboutImages = imageContext
    .keys()
    .sort()
    .map((filePath) => {
        const image = imageContext(filePath);
        return image.default || image;
    });

const aboutSurface = {
    width: 760,
    height: 608,
    boxSizing: 'border-box',
    overflow: 'hidden',
    background: '#08090b',
    color: '#f6f4ef',
};

/** Introduction / Who section */
const whoSlide = (
    <ScaledSlide key="about-who">
        <Box sx={{ ...aboutSurface, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', p: 5, background: 'radial-gradient(circle at 85% 15%, rgba(228,194,193,0.3), transparent 35%), linear-gradient(135deg, #101217, #252521)' }}>
            <Typography sx={{ color: '#e4c28f', fontFamily: 'monospace', fontSize: 12, letterSpacing: 2 }}>WHO AM I</Typography>
            <Box sx={{ maxWidth: 560 }}>
                <Typography variant="h2" sx={{ fontSize: '3.8rem', fontWeight: 800, lineHeight: 0.95 }}>SUNNY YOU</Typography>
                <Typography sx={{ mt: 2, maxWidth: 490, color: 'rgba(246,244,239,0.78)', fontSize: 17, lineHeight: 1.5} >
                    I am a Photographer and Software Developer focused on solving difficult problems, learning continuously, and creating tools that are useful to the people who rely on them.
                </Typography>
            </Box>
        </Box>
    </ScaledSlide>
);

/** Projects / work section */
const projectsSlide = (
    <ScaledSlide key="about-projects">
        <Box sx={{ ...aboutSurface, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', p: 5, background: 'radial-gradient(circle at 85% 15%, rgba(228,194,193,0.3), transparent 35%), linear-gradient(135deg, #101217, #252521)' }}>
            <Typography sx={{ color: '#a9d6b7', fontFamily: 'monospace', fontSize: 12, letterSpacing: 2 }}>PROJECTS</Typography>
            <Box sx={{ maxWidth: 560 }}>
                <Typography sx={{ mt: 2, color: 'rgba(246,244,239,0.8)', fontSize: 17, lineHeight: 1.5} >
                    I build with curiosity. I am a Software Engineer focused on solving difficult problems, learning continuously, and creating tools that are useful to the people who rely on them.
                </Typography>
                <Box sx={{ mt: 3, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    <Chip label="VR/Unity" sx={{ color: '#111217', background: '#a9d6b7', fontWeight: 700 }} />
                    <Chip label="React" sx={{ color: '#111217', background: '#a9d6b7', fontWeight: 700 }} />
                    <Chip label="Node" sx={{ color: '#111217', background: '#a9d6b7', fontWeight: 700 }} />
                </Box>
            </Box>
        </Box>
    </ScaledSlide>
);

/** Contact / get in touch section */
const contactSlide = (
    <ScaledSlide key="about-contact">
        <Box sx={{ ...aboutSurface, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', p: 5, background: 'radial-gradient(circle at 85% 15%, rgba(228,194,193,0.3), transparent 35%), linear-gradient(135deg, #101217, #252521)' }}>
            <Typography sx={{ color: '#e8b6a2', fontFamily: 'monospace', fontSize: 12, letterSpacing: 2 }}>GET IN TOUCH</Typography>
            <Box sx={{ maxWidth: 560 }}>
                <Typography sx={{ mt: 2, color: 'rgba(246,244,239,0.75)', fontSize: 17, lineHeight: 1.5} >
                    Whether it is a new idea, a tricky technical problem, or an opportunity to learn together, I would be glad to hear from you.
                </Typography>
                <div sx={{ mt: 24, display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <a
                        href="https://github.com/sunnyyou3"
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                            color: '#111217',
                            background: '#e8b6a2',
                            padding: '8px 16px',
                            borderRadius: '4px',
                            textDecoration: 'none',
                            fontWeight: 700,
                            fontSize: '12px',
                        }}
                    >
                        GitHub
                    </a>
                    <a
                        href="mailto:yousunny3@gmail.com"
                        sx={{
                            color: '#f6f4ef',
                            border: '1px solid rgba(255,255,255,0.35)',
                            padding: '8px 16px',
                            borderRadius: '4px',
                            textDecoration: 'none',
                            fontSize: '12px',
                        }}
                    >
                        Email
                    </a>
                </div>
            </Box>
        </Box>
    </ScaledSlide>
);

const aboutSlides = [
    whoSlide,
    projectsSlide,
    contactSlide,
];

export default function About() {
    return <Box>{aboutSlides.map((slide) => slide)}</Box>;
};