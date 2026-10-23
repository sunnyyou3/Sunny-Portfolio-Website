import React from 'react';
import { Box, Typography, Chip } from '@mui/material';
import ScaledSlide from '../components/ScaledSlide';

const careerSurface = {
    width: 760,
    height: 608,
    boxSizing: 'border-box',
    overflow: 'hidden',
    background: '#08090b',
    color: '#f6f4ef',
};

const careerSlide = (job, index) => (
    <ScaledSlide key={`career-${index}`}>
        <Box sx={{ ...careerSurface, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', p: 5, background: 'radial-gradient(circle at 85% 15%, rgba(228,194,193,0.3), transparent 35%), linear-gradient(135deg, #101217, #252521)' }}>
            <Typography sx={{ color: '#a9d6b7', fontFamily: 'monospace', fontSize: 12, letterSpacing: 2 }}>CAREER HISTORY</Typography>
            <Box sx={{ maxWidth: 560 }}>
                <Typography variant="h2" sx={{ fontSize: '3.8rem', fontWeight: 800, lineHeight: 0.95}} sx={{ sx: { mt: 2 }}}>
                    {job.title} at {job.company}
                </Typography>
                <Typography sx={{ mt: 2, color: 'rgba(246,244,239,0.8)', fontSize: 17, lineHeight: 1.5} >
                    {job.description}
                </Typography>
                <Box sx={{ mt: 3, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    <Chip label={job.location} sx={{ color: '#111217', background: '#a9d6b7', fontWeight: 700 }} />
                    <Chip label={job.duration} sx={{ color: '#111217', background: '#a9d6b7', fontWeight: 700 }} />
                </Box>
            </Box>
        </Box>
    </ScaledSlide>
);

const careerData = [
    {
        title: 'Software Developer',
        company: 'FreeWheel/Comcast',
        location: 'Philadelphia, PA',
        duration: '2020 - 2022',
        description: 'Web Development & QA for Comcast\'s FreeWheel division. Built web applications and performed quality assurance testing.',
    },
    {
        title: 'Head Teaching Assistant',
        company: 'Lehigh University',
        location: 'Bethlehem, PA',
        duration: '2018 - 2020',
        description: 'Mentorship & Leadership. Assisted professor with course delivery, graded assignments, and supported students in data structures and algorithms.',
    },
    {
        title: 'Software Engineer Intern',
        company: 'FreeWheel/Comcast',
        location: 'Philadelphia, PA',
        duration: '2019 (Summer)',
        description: 'Web Development & QA. Internship building web applications and performing quality assurance testing.',
    },
];

const careerSlides = careerData.map((job, index) => careerSlide(job, index));

export const slides = careerSlides;

export default function CareerHistory() {
    return <Box>{careerSlides}</Box>;
};