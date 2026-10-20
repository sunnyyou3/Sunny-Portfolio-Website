import React, { useState } from 'react';
import { Box, Chip, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import VRMainMenu from '../../../assets/Portfolio/Images/Projects/VR_Menu.gif';
import VRSetting from '../../../assets/Portfolio/Images/Projects/VR_Setting.png';
import VRTutorial from '../../../assets/Portfolio/Images/Projects/VR_Tutorial.png';
import VRInGame from '../../../assets/Portfolio/Images/Projects/VR_InGame.jpg';
import BuzzAdminConsole from '../../../assets/Portfolio/Images/Projects/Buzz_AdminConsole.png';
import BuzzHomeScreen from '../../../assets/Portfolio/Images/Projects/Buzz_HomeScreen.jpg';
import BuzzLoginScreen from '../../../assets/Portfolio/Images/Projects/Buzz_LoginScreen.jpg';

const projects = [
  {
    number: '01',
    title: 'VR App for Students with EBD',
    eyebrow: 'Immersive learning experience',
    description: 'Project aimed at creating a virtual reality experience that immerses players in a cartoonish world where players witness short stories and learn how the characters overcome various emotional challenges. The game is designed to educate players on emotional issues in an engaging and interactive way, using humor and relatable scenarios to foster empathy and understanding.',
    tags: ['Unity', 'VR', 'Education'],
    images: [VRInGame, VRMainMenu, VRSetting, VRTutorial],
  },
  {
    number: '02',
    title: 'Buzz',
    eyebrow: 'Social platform prototype',
    description: 'Buzz is a social media platform that allows users to create, share, and interact with content in a dynamic and engaging way. With features such as posting text and images, liking, and commenting, Buzz fosters a vibrant community where users can connect and express themselves. The platform utilizes Google authentication for secure and easy access, ensuring a smooth user experience.',
    tags: ['React', 'Google Auth', 'Community'],
    images: [BuzzHomeScreen, BuzzLoginScreen, BuzzAdminConsole],
  },
];

export default function ProjectsView({ onProjectSelect, projectIndex }) {
  const [currentProject, setCurrentProject] = useState(projectIndex || 0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const project = projects[currentProject];

  React.useEffect(() => {
    setCurrentProject(projectIndex || 0);
    setCurrentImageIndex(0);
  }, [projectIndex]);

  React.useEffect(() => {
    if (!project?.images) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((i) => (i + 1) % project.images.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [project?.images]);

  const heroImage = project?.images?.[currentImageIndex];

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'grid',
        gridTemplateRows: 'minmax(0, 1fr) auto',
        background: 'linear-gradient(135deg, #111217 0%, #1c2229 54%, #3b241f 100%)',
        color: '#f6f4ef',
        overflow: 'hidden',
      }}
    >
      {/* Hero image area */}
      <Box sx={{ position: 'relative', minHeight: 0, overflow: 'hidden' }}>
        {heroImage && (
          <Box
            component={motion.img}
            key={heroImage}
            initial={{ opacity: 0.35, scale: 1.02 }}
            animate={{ opacity: 0.82, scale: 1 }}
            transition={{ duration: 0.35 }}
            src={heroImage}
            alt={`${project?.title} preview`}
            sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        )}
        <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(8,9,12,0.92) 0%, rgba(8,9,12,0.35) 58%, rgba(8,9,12,0.08) 100%)' }} />
        <Box sx={{ position: 'absolute', top: 16, left: 16, right: 16 }}>
          <Typography
            sx={{
              color: '#f1a17d',
              fontFamily: 'monospace',
              fontSize: 10,
              letterSpacing: 2,
            }}
          >
            PROJECT / {project?.number}
          </Typography>
          <Typography
            variant="h5"
            sx={{
              maxWidth: 400,
              mt: 0.5,
              fontWeight: 800,
              lineHeight: 1.05,
              fontSize: '1.5rem',
            }}
          >
            {project?.title}
          </Typography>
          <Typography
            sx={{
              mt: 0.5,
              color: '#f1a17d',
              fontSize: 11,
            }}
          >
            {project?.eyebrow}
          </Typography>
        </Box>
      </Box>

      {/* Project info */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: 1,
          p: 2,
          borderTop: '1px solid rgba(255,255,255,0.16)',
          background: 'rgba(8,9,12,0.74)',
        }}
      >
        <Typography
          sx={{
            color: 'rgba(246,244,239,0.76)',
            fontSize: 12,
            lineHeight: 1.5,
          }}
        >
          {project?.description}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {project?.tags?.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                size="small"
                sx={{
                  color: '#f6f4ef',
                  border: '1px solid rgba(241,161,125,0.55)',
                  background: 'transparent',
                  fontSize: 9,
                  height: 18,
                }}
              />
            ))}
          </Box>
          <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
            {project?.images?.map((image, idx) => (
              <Box
                component="button"
                type="button"
                key={image}
                aria-label={`Show ${project.title} image ${idx + 1}`}
                onClick={() => setCurrentImageIndex(idx)}
                sx={{
                  p: 0,
                  width: 30,
                  height: 30,
                  border: idx === currentImageIndex ? '2px solid #f1a17d' : '1px solid rgba(255,255,255,0.25)',
                  background: 'transparent',
                  cursor: 'pointer',
                  opacity: idx === currentImageIndex ? 1 : 0.62,
                  transition: 'opacity 180ms ease, border-color 180ms ease',
                  borderRadius: 1,
                  overflow: 'hidden',
                }}
              >
                <Box
                  component="img"
                  src={image}
                  alt=""
                  sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
