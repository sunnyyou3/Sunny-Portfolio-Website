import React from 'react';
import { Box, Chip, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import portrait from '../assets/Portfolio/Images/Profile/sunny.png';

const skills = ['React', 'Java', 'JavaScript', 'Databases', 'SQL', 'Full Stack'];

const slideSurface = {
    width: '100%',
    height: '100%',
    boxSizing: 'border-box',
    overflow: 'hidden',
    color: '#f6f4ef',
    background: 'linear-gradient(135deg, #111217 0%, #202832 58%, #3c3030 100%)',
};

const sectionLabel = {
    color: '#e8b6a2',
    fontFamily: 'monospace',
    fontSize: 12,
    letterSpacing: 2,
};

function ProfileSlide() {
    return (
        <Box component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} sx={{ ...slideSurface, display: 'grid', gridTemplateColumns: { xs: '1fr', md: '0.8fr 1.2fr' } }}>
            <Box sx={{ minHeight: { xs: 220, md: '100%' }, position: 'relative', overflow: 'hidden' }}>
                <Box component="img" src={portrait} alt="Sunny You" sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'saturate(0.8)' }} />
                <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(17,18,23,0.05), rgba(17,18,23,0.8))' }} />
                <Typography sx={{ position: 'absolute', bottom: { xs: 16, md: 28 }, left: { xs: 16, md: 28 }, ...sectionLabel }}>01 / PROFILE</Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', p: { xs: 2.5, md: 4 } }}>
                <Typography sx={sectionLabel}>ABOUT SUNNY YOU</Typography>
                <Typography variant="h3" sx={{ mt: 1.5, fontWeight: 800, lineHeight: 1, fontSize: { xs: '2.2rem', md: '3.45rem' } }}>I build with curiosity.</Typography>
                <Typography sx={{ maxWidth: 480, mt: 2.5, color: 'rgba(246,244,239,0.78)', fontSize: { xs: 13, md: 16 }, lineHeight: 1.65 }}>I am a software developer focused on solving difficult problems, learning continuously, and creating tools that are useful to the people who rely on them.</Typography>
                <Typography sx={{ maxWidth: 480, mt: 1.5, color: 'rgba(246,244,239,0.62)', fontSize: { xs: 13, md: 15 }, lineHeight: 1.6 }}>My work has taken me from the United States to Japan, across applications, databases, education, and everything in between.</Typography>
            </Box>
        </Box>
    );
}

function SkillsSlide() {
    return (
        <Box component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} sx={{ ...slideSurface, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', p: { xs: 2.5, md: 4 }, background: 'linear-gradient(135deg, #15171e, #27322f)' }}>
            <Box>
                <Typography sx={sectionLabel}>02 / TOOLKIT</Typography>
                <Typography variant="h3" sx={{ maxWidth: 520, mt: 1.5, fontWeight: 800, lineHeight: 1, fontSize: { xs: '2.2rem', md: '3.6rem' } }}>Many tools, one goal.</Typography>
                <Typography sx={{ maxWidth: 500, mt: 2, color: 'rgba(246,244,239,0.75)', fontSize: { xs: 13, md: 16 }, lineHeight: 1.6 }}>I enjoy moving between the interface, the service behind it, and the data that makes the whole system work.</Typography>
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, maxWidth: 560 }}>
                {skills.map((skill) => <Chip key={skill} label={skill} sx={{ color: '#f6f4ef', border: '1px solid rgba(232,182,162,0.58)', background: 'rgba(255,255,255,0.04)', fontSize: { xs: 12, md: 14 } }} />)}
            </Box>
    </Box>
    );
}

function ConnectSlide() {
    return (
        <Box component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} sx={{ ...slideSurface, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', p: { xs: 2.5, md: 4 }, background: 'linear-gradient(135deg, #3c3030, #17191f 68%)' }}>
            <Box>
                <Typography sx={sectionLabel}>03 / CONNECT</Typography>
                <Typography variant="h3" sx={{ maxWidth: 580, mt: 1.5, fontWeight: 800, lineHeight: 1, fontSize: { xs: '2.15rem', md: '3.5rem' } }}>Good work starts with a conversation.</Typography>
            </Box>
            <Box>
                <Typography sx={{ maxWidth: 500, color: 'rgba(246,244,239,0.75)', fontSize: { xs: 13, md: 16 }, lineHeight: 1.6 }}>Whether it is a new idea, a tricky technical problem, or an opportunity to learn together, I would be glad to hear from you.</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2.5 }}>
                    <Chip label="GitHub" component="a" href="https://github.com/sunnyyou3" clickable sx={{ color: '#111217', background: '#e8b6a2', fontWeight: 700 }} />
                    <Chip label="LinkedIn" component="a" href="https://linkedin.com/in/sunnyyou3" clickable variant="outlined" sx={{ color: '#f6f4ef', borderColor: 'rgba(255,255,255,0.35)' }} />
                    <Chip label="Email" component="a" href="mailto:yousunny3@gmail.com" clickable variant="outlined" sx={{ color: '#f6f4ef', borderColor: 'rgba(255,255,255,0.35)' }} />
                </Box>
            </Box>
        </Box>
    );
}

export const slides = [
    <ProfileSlide key="about-profile" />,
    <SkillsSlide key="about-skills" />,
    <ConnectSlide key="about-connect" />,
];

export default function About() {
    return slides[0];
}
