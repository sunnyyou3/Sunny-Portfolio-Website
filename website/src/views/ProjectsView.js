import React, { useEffect, useState } from 'react';
import { Box, Chip, Typography } from '@mui/material';
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

export default function ProjectsView() {
  const [projectIndex, setProjectIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const project = projects[projectIndex];
  const heroImage = project.images[currentImageIndex];

  const imagesRef = React.useRef(project.images);
  const projectKeyRef = React.useRef(0);
  React.useEffect(() => {
    imagesRef.current = project.images;
    projectKeyRef.current = projectIndex;
    setCurrentImageIndex(0);
  }, [projectIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (projectKeyRef.current === projectIndex) {
        setCurrentImageIndex((imageIndex) => (imageIndex + 1) % imagesRef.current.length);
      }
    }, 10000);
    return () => clearInterval(interval);
  }, [projectIndex]);

  const prevProject = () => {
    setProjectIndex(prev => (prev - 1 + projects.length) % projects.length);
  };

  const nextProject = () => {
    setProjectIndex(prev => (prev + 1) % projects.length);
  };

  return (
    <Box sx={{
      ...slideSurface,
      display: 'grid',
      gridTemplateRows: 'minmax(0, 1fr) auto',
    }}>
      {/* Image area - key resets imageIndex on project change */}
      <Box key={projectIndex} sx={{ position: 'relative', minHeight: 0, overflow: 'hidden' }}>
        <Box
          component="img"
          key={heroImage}
          src={heroImage}
          alt={`${project.title} preview`}
          onError={(e) => {
            e.currentTarget.style.opacity = '0.3';
          }}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            transition: 'opacity 0.35s ease',
          }}
        />
        <Box sx={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(90deg, rgba(8,9,12,0.92) 0%, rgba(8,9,12,0.35) 58%, rgba(8,9,12,0.08) 100%)',
        }} />
        <Box sx={{ position: 'absolute', top: 24, left: 28, right: 16 }}>
          <Typography sx={{
            color: '#f1a17d',
            fontFamily: "'Bitcount Grid Single', monospace",
            fontSize: 12,
            letterSpacing: 2,
          }}>
            PROJECT / {project.number}
          </Typography>
          <Typography variant="h4" sx={{
            maxWidth: 420,
            mt: 1,
            fontWeight: 800,
            lineHeight: 1.05,
            fontSize: '2.35rem',
          }}>
            {project.title}
          </Typography>
          <Typography sx={{ mt: 1, color: '#f1a17d', fontSize: 13 }}>
            {project.eyebrow}
          </Typography>
        </Box>
      </Box>

      {/* Bottom info bar */}
      <Box sx={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: 1.5,
        p: 2.5,
        borderTop: '1px solid rgba(255,255,255,0.16)',
        background: 'rgba(8,9,12,0.74)',
      }}>
        <Typography sx={{
          color: 'rgba(246,244,239,0.76)',
          fontSize: 16,
          lineHeight: 1.5,
        }}>
          {project.description}
        </Typography>
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 2,
          flexWrap: 'wrap',
        }}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
            {project.tags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                size="small"
                sx={{
                  color: '#f6f4ef',
                  border: '1px solid rgba(241,161,125,0.55)',
                  background: 'transparent',
                  fontSize: 11,
                }}
              />
            ))}
          </Box>
          <Box sx={{ display: 'flex', gap: 0.75, alignItems: 'center', marginLeft: 'auto' }}>
            {project.images.map((image, imageIndex) => (
              <Box
                component="button"
                type="button"
                key={image}
                aria-label={`Show ${project.title} image ${imageIndex + 1}`}
                onClick={() => setCurrentImageIndex(imageIndex)}
                sx={{
                  p: 0,
                  width: 42,
                  height: 42,
                  border: imageIndex === currentImageIndex ? '2px solid #f1a17d' : '1px solid rgba(255,255,255,0.25)',
                  background: 'transparent',
                  cursor: 'pointer',
                  opacity: imageIndex === currentImageIndex ? 1 : 0.62,
                  transition: 'opacity 180ms ease, border-color 180ms ease',
                }}
              >
                <Box
                  component="img"
                  src={image}
                  alt=""
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
              </Box>
            ))}
          </Box>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', ml: 1 }}>
            <Box
              role="button"
              tabIndex={0}
              aria-label="Previous project"
              onClick={prevProject}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); prevProject(); } }}
              sx={{
                width: 28, height: 28,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.2)',
                color: '#aaa',
                cursor: 'pointer',
                fontSize: 12,
                '&:hover': { background: 'rgba(255,255,255,0.15)' },
              }}
            >
              ◀
            </Box>
            <Typography sx={{
              color: 'rgba(246,244,239,0.52)',
              fontFamily: "'Bitcount Grid Single', monospace",
              fontSize: 11,
            }}>
              {String(projectIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
            </Typography>
            <Box
              role="button"
              tabIndex={0}
              aria-label="Next project"
              onClick={nextProject}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); nextProject(); } }}
              sx={{
                width: 28, height: 28,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.2)',
                color: '#aaa',
                cursor: 'pointer',
                fontSize: 12,
                '&:hover': { background: 'rgba(255,255,255,0.15)' },
              }}
            >
              ▶
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
