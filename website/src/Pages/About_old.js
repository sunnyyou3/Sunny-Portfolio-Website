import React from 'react';
import { Box, Typography, Avatar, Chip, Divider } from '@mui/material';
import { motion } from 'framer-motion';

const skills = [
  'React',
  'Java',
  'Javascript',
  'Databases',
  'SQL',
  'Full Stack',
];

export const slides = [
  (
    <motion.div key="about-slide-1" style={{ textAlign: 'center', position: 'relative', zIndex: 2, justifyContent: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Avatar
        src={require('./../assets/Portfolio/Images/sunny.png')}
        sx={{
          width: 120,
          height: 120,
          border: '3px solid #ff00ff',
          boxShadow: `
            0 0 20px #ff00ff,
            0 0 40px #ff00ff99,
            inset 0 0 20px #ff00ff55
          `,
        }}
      />

      <Typography variant="h4" fontWeight="bold" sx={{ mt: 2, background: 'linear-gradient(90deg, #ff00ff, #00eaff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', textShadow: '0 0 20px #ff00ff88' }}>
        SUNNY YOU
      </Typography>

      <Typography sx={{ opacity: 0.85, letterSpacing: 1, mt: 1 }}>
        Fullstack Engineer • Database Engineer • Problem Solver
      </Typography>
    </motion.div>
  ),

  (
    <motion.div key="about-slide-2" style={{ marginTop: '20px', width: '100%', maxWidth: '820px', borderRadius: '12px', padding: '24px', background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.12)', position: 'relative', zIndex: 2 }}>
      <Typography variant="h6" fontWeight="bold" sx={{ mb: 1, background: 'linear-gradient(90deg, #ff00ff, #00eaff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
        About Me
      </Typography>

      <Typography sx={{ opacity: 0.9, lineHeight: 1.7 }}>
        I'm a professional software developer with a focus on tackling industry leading problems and providing innovative solutions. With a never ending thirst for knowledge, I aim to build on my skills and provide my services to a wide range of organizations.
      </Typography>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.15)', my: 2 }} />

      <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1, background: 'linear-gradient(90deg, #ff00ff, #00eaff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
        Links
      </Typography>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mt: 1 }}>
        <Chip label="Github" component="a" href="https://github.com/sunnyyou3" clickable sx={{ fontFamily: 'monospace', fontWeight: 600 }} />
        <Chip label="Linkedin" component="a" href="https://linkedin.com/in/sunnyyou3" clickable sx={{ fontFamily: 'monospace', fontWeight: 600 }} />
        <Chip label="Email" component="a" href="mailto:yousunny3@gmail.com" clickable sx={{ fontFamily: 'monospace', fontWeight: 600 }} />
      </Box>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.15)', my: 2 }} />

      <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1, background: 'linear-gradient(90deg, #ff00ff, #00eaff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
        Skills
      </Typography>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.2, mt: 1 }}>
        {skills.map((skill, i) => (
          <Chip key={i} label={skill} sx={{ color: 'white', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.16)', backdropFilter: 'blur(8px)', px: 1.2 }} />
        ))}
      </Box>
    </motion.div>
  ),

  (
    <motion.div key="about-slide-3" style={{ marginTop: '20px', width: '100%', maxWidth: '820px', borderRadius: '12px', padding: '24px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.12)', boxShadow: 'inset 0 0 20px rgba(255,255,255,0.04)', backdropFilter: 'blur(12px)', position: 'relative', zIndex: 2 }}>
      <Typography variant="h6" fontWeight="bold" sx={{ mb: 2, background: 'linear-gradient(90deg, #00eaff, #ff00ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
        Things I want to Build
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box sx={{ padding: 2, borderRadius: 1.5, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.14)', backdropFilter: 'blur(8px)' }}>
          <Typography variant="subtitle1" fontWeight="bold">Gmail Scrapper for Finance Tracking</Typography>
          <Typography sx={{ opacity: 0.75 }}>I want to complete this by Feb/March</Typography>
          <Typography sx={{ mt: 1 }}>Keeping track of spendings in Japan is a pain because the banking apps don't always show transaction details like merchant name and sometimes don't update fast enough to be useful. So my goal is to create a Gmail scrapper that extracts transaction data from email receipts and compiles them into a database for easy tracking and analysis.</Typography>
        </Box>

        <Box sx={{ padding: 2, borderRadius: 1.5, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.14)', backdropFilter: 'blur(8px)' }}>
          <Typography variant="subtitle1" fontWeight="bold">AI Response to messages on Watch OS</Typography>
          <Typography sx={{ opacity: 0.75 }}>I want to complete this by June</Typography>
          <Typography sx={{ mt: 1 }}>The AI suggested replies on the Samsung Watch is good but it's not personalized and often misses the context of the conversation. I want to build an AI system that can analyze incoming messages and generate context-aware responses that feel more natural and tailored to my communication style.</Typography>
        </Box>
      </Box>
    </motion.div>
  )
];

export default function About() {
  // keep a default rendering for compatibility (renders first slide)
  return slides[0] || null;
}
