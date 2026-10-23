import React from 'react';
import { Box, Typography, Chip } from '@mui/material';
import ScaledSlide from '../components/ScaledSlide';

// Project data - software engineering projects
const projectsData = [
    {
        id: 1,
        title: 'VR App for Students with EBD',
        description: 'Immersive learning experience using Unity and VR technology.',
        tags: ['Unity', 'VR', 'EBD', 'Education'],
        image: '/assets/placeholder-vr.jpg',
    },
    {
        id: 2,
        title: 'Buzz - Social Platform Prototype',
        description: 'Social platform prototype built with React and Google Auth.',
        tags: ['React', 'Google Auth', 'Prototype', 'Social'],
        image: '/assets/placeholder-social.jpg',
    },
    {
        id: 3,
        title: 'FreeWheel/Comcast Web Development',
        description: 'Web Development & QA for Comcast\'s FreeWheel division.',
        tags: ['JavaScript', 'React', 'QA', 'Comcast'],
        image: '/assets/placeholder-web.jpg',
    },
    {
        id: 4,
        title: 'Comcast Analytics Dashboard',
        description: 'Internal analytics dashboard for tracking viewer engagement.',
        tags: ['React', 'D3', 'Analytics', 'Dashboard'],
        image: '/assets/placeholder-dashboard.jpg',
    },
];

const projectSurface = {
    width: 760,
    height: 608,
    boxSizing: 'border-box',
    overflow: 'hidden',
    background: '#08090b',
    color: '#f6f4ef',
};

const projectSlide = (project, index) => (
    <ScaledSlide key={`project-${index}`}>
        <Box sx={{ ...projectSurface, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', p: 5, background: 'radial-gradient(circle at 85% 15%, rgba(228,194,193,0.3), transparent 35%), linear-gradient(135deg, #101217, #252521)' }}>
            <Typography sx={{ color: '#e4c28f', fontFamily: 'monospace', fontSize: 12, letterSpacing: 2 }}>PROJECT</Typography>
            <Box sx={{ maxWidth: 560 }}>
                <Typography variant="h2" sx={{ fontSize: '3.8rem', fontWeight: 800, lineHeight: 0.95 }} sx={{ sx: { mt: 2 }}}>
                    {project.title}
                </Typography>
                <Typography sx={{ mt: 2, color: 'rgba(246,244,239,0.76)', fontSize: 17, lineHeight: 1.5} >
                    {project.description}
                </Typography>
                <Box sx={{ mt: 3, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {project.tags.map((tag, i) => (
                        <Chip
                            key={i}
                            label={tag}
                            sx={{
                                color: '#111217',
                                background: '#e4c28f',
                                fontWeight: 700,
                            }}
                        />
                    ))}
                </Box>
            </Box>
        </Box>
    </ScaledSlide>
);

const projectSlides = projectsData.map((project, index) => projectSlide(project, index));

export const slides = projectSlides;

export default function Project() {
    return <Box>{projectSlides}</Box>;
};