import React, { useEffect, useState } from 'react';
import { Box, Chip, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import ScaledSlide from '../components/ScaledSlide';
import { BuzzSubText, VRGameSubText } from '../assets/Text/text';
import VRMainMenu from '../assets/Portfolio/Images/Projects/VR_Menu.gif';
import VRSetting from '../assets/Portfolio/Images/Projects/VR_Setting.png';
import VRTutorial from '../assets/Portfolio/Images/Projects/VR_Tutorial.png';
import VRInGame from '../assets/Portfolio/Images/Projects/VR_InGame.jpg';
import BuzzAdminConsole from '../assets/Portfolio/Images/Projects/Buzz_AdminConsole.png';
import BuzzHomeScreen from '../assets/Portfolio/Images/Projects/Buzz_HomeScreen.jpg';
import BuzzLoginScreen from '../assets/Portfolio/Images/Projects/Buzz_LoginScreen.jpg';

const projects = [
    {
        number: '01',
        title: 'VR App for Students with EBD',
        eyebrow: 'Immersive learning experience',
        description: VRGameSubText,
        tags: ['Unity', 'VR', 'Education'],
        images: [VRInGame, VRMainMenu, VRSetting, VRTutorial],
    },
    {
        number: '02',
        title: 'Buzz',
        eyebrow: 'Social platform prototype',
        description: BuzzSubText,
        tags: ['React', 'Google Auth', 'Community'],
        images: [BuzzHomeScreen, BuzzLoginScreen, BuzzAdminConsole],
    },
];

const slideSurface = {
    width: 760,
    height: 608,
    boxSizing: 'border-box',
    overflow: 'hidden',
    color: '#f6f4ef',
    background: 'linear-gradient(135deg, #111217 0%, #1c2229 54%, #3b241f 100%)',
};

function ProjectSlide({ project }) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const heroImage = project.images[currentImageIndex];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((imageIndex) => (imageIndex + 1) % project.images.length);
        }, 10000);

        return () => clearInterval(interval);
    }, [project.images.length]);

    return (
        <ScaledSlide>
            <Box sx={{ ...slideSurface, display: 'grid', gridTemplateRows: 'minmax(0, 1fr) auto' }}>
            <Box sx={{ position: 'relative', minHeight: 0, overflow: 'hidden' }}>
                <Box component={motion.img} key={heroImage} initial={{ opacity: 0.35, scale: 1.02 }} animate={{ opacity: 0.82, scale: 1 }} transition={{ duration: 0.35 }} src={heroImage} alt={`${project.title} preview`} sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(8,9,12,0.92) 0%, rgba(8,9,12,0.35) 58%, rgba(8,9,12,0.08) 100%)' }} />
                <Box sx={{ position: 'absolute', top: 24, left: 28, right: 16 }}>
                    <Typography sx={{ color: '#f1a17d', fontFamily: 'monospace', fontSize: 12, letterSpacing: 2 }}>{project.number} / PROJECT</Typography>
                    <Typography variant="h4" sx={{ maxWidth: 420, mt: 1, fontWeight: 800, lineHeight: 1.05, fontSize: '2.35rem' }}>{project.title}</Typography>
                    <Typography sx={{ mt: 1, color: '#f1a17d', fontSize: 13 }}>{project.eyebrow}</Typography>
                </Box>
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr', gap: 1.5, p: 2.5, borderTop: '1px solid rgba(255,255,255,0.16)', background: 'rgba(8,9,12,0.74)' }}>
                <Box>
                    <Typography sx={{ color: 'rgba(246,244,239,0.76)', fontSize: 16, lineHeight: 1.5 }}>{project.description}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
                        {project.tags.map((tag) => <Chip key={tag} label={tag} size="small" sx={{ color: '#f6f4ef', border: '1px solid rgba(241,161,125,0.55)', background: 'transparent', fontSize: 11 }} />)}
                    </Box>
                    <Box sx={{ display: 'flex', gap: 0.75, alignItems: 'center', marginLeft: 'auto' }}>
                        {project.images.map((image, imageIndex) => (
                            <Box
                                component="button"
                                type="button"
                                key={image}
                                aria-label={`Show ${project.title} image ${imageIndex + 1}`}
                                onClick={() => setCurrentImageIndex(imageIndex)}
                                sx={{ p: 0, width: 42, height: 42, border: imageIndex === currentImageIndex ? '2px solid #f1a17d' : '1px solid rgba(255,255,255,0.25)', background: 'transparent', cursor: 'pointer', opacity: imageIndex === currentImageIndex ? 1 : 0.62, transition: 'opacity 180ms ease, border-color 180ms ease' }}
                            >
                                <Box component="img" src={image} alt="" sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Box>
            </Box>
        </ScaledSlide>
    );
}

export const slides = [
    <ScaledSlide key="projects-intro">
    <Box sx={{ ...slideSurface, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', p: 5, background: 'radial-gradient(circle at 85% 15%, rgba(241,161,125,0.34), transparent 35%), linear-gradient(135deg, #101217, #202932)' }}>
        <Box>
            <Typography sx={{ color: '#f1a17d', fontFamily: 'monospace', fontSize: 12, letterSpacing: 2 }}>SELECTED PROJECTS</Typography>
            <Typography variant="h2" sx={{ alignSelf: 'flex-start', textAlign: 'left', fontSize: '3.8rem', fontWeight: 800, lineHeight: 0.95 }}>Brain not working</Typography>
        </Box>
        <Box sx={{ maxWidth: 480 }}>
            <Typography sx={{ color: 'rgba(246,244,239,0.78)', fontSize: 17, lineHeight: 1.5 }}>Finding a project idea worth pursuing can be difficult. These projects began as small questions and grew through experimentation, problem-solving, and persistence.</Typography>
            <Box sx={{ display: 'flex', gap: 1, mt: 3 }}>
                <Chip label="Photography" sx={{ color: '#111217', background: '#f1a17d', fontWeight: 700 }} />
                <Chip label="VR + WEB" variant="outlined" sx={{ color: '#f6f4ef', borderColor: 'rgba(255,255,255,0.3)' }} />
                <Chip label="All the fun" sx={{ color: '#111217', background: '#f1a17d', fontWeight: 700 }} />
            </Box>
        </Box>
    </Box>
    </ScaledSlide>,
    <ProjectSlide key="vr-project" project={projects[0]} />,
    <ProjectSlide key="buzz-project" project={projects[1]} />
];

export default function Project() {
    return slides[0];
}