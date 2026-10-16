import React from 'react';
import { Box, Chip, Typography } from '@mui/material';
import { ConnectContent } from './ConnectContent';

const skills = ['React', 'Java', 'JavaScript', 'Databases', 'SQL', 'Full Stack'];

const slideSurface = {
  width: 760,
  height: 608,
  boxSizing: 'border-box',
  overflow: 'hidden',
  color: '#f6f4ef',
  background: 'linear-gradient(135deg, #111217 0%, #202832 58%, #3c3030 100%)',
};

const sectionLabel = {
  color: '#e8b6a2',
  fontFamily: "'Bitcount Grid Single', monospace",
  fontSize: 12,
  letterSpacing: 2,
};

export default function AboutView() {
  const [index, setIndex] = React.useState(0);

  const slides = [
    // Profile slide
    <Box key="profile" sx={{
      ...slideSurface,
      display: 'grid',
      gridTemplateColumns: '0.8fr 1.2fr',
    }}>
      <Box sx={{
        minHeight: '100%',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <Box
          component="img"
          src={require('../assets/Portfolio/Images/Profile/IMGP4462.jpg')}
          alt="Sunny You"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            filter: 'saturate(0.8)',
          }}
        />
        <Box sx={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(17,18,23,0.05), rgba(17,18,23,0.8))',
        }} />
        <Typography sx={{
          position: 'absolute',
          bottom: 28,
          left: 28,
          ...sectionLabel,
        }}>
          01 / PROFILE
        </Typography>
      </Box>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        p: 4,
      }}>
        <Typography sx={sectionLabel}>ABOUT SUNNY YOU</Typography>
        <Typography variant="h3" sx={{
          mt: 1.5,
          fontWeight: 800,
          lineHeight: 1,
          fontSize: '3.45rem',
        }}>
          I build with curiosity.
        </Typography>
        <Typography sx={{
          maxWidth: 480,
          mt: 2.5,
          color: 'rgba(246,244,239,0.78)',
          fontSize: 16,
          lineHeight: 1.65,
        }}>
          I am a Photographer and Software Developer focused on solving difficult problems, learning continuously, and creating tools that are useful to the people who rely on them.
        </Typography>
        <Typography sx={{
          maxWidth: 480,
          mt: 1.5,
          color: 'rgba(246,244,239,0.62)',
          fontSize: 15,
          lineHeight: 1.6,
        }}>
          My work has taken me from the United States to Japan, across applications, databases, education, and everything in between.
        </Typography>
      </Box>
    </Box>,

    // Skills slide
    <Box key="skills" sx={{
      ...slideSurface,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      p: 4,
      background: 'linear-gradient(135deg, #15171e, #27322f)',
    }}>
      <Box>
        <Typography sx={sectionLabel}>02 / TOOLKIT</Typography>
        <Typography variant="h3" sx={{
          maxWidth: 520,
          mt: 1.5,
          fontWeight: 800,
          lineHeight: 1,
          fontSize: '3.6rem',
        }}>
          Many tools, one goal.
        </Typography>
        <Typography sx={{
          maxWidth: 500,
          mt: 2,
          color: 'rgba(246,244,239,0.75)',
          fontSize: 16,
          lineHeight: 1.6,
        }}>
          I enjoy moving between the interface, the service behind it, and the data that makes the whole system work.
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, maxWidth: 560 }}>
        {skills.map((skill) => (
          <Chip
            key={skill}
            label={skill}
            sx={{
              color: '#f6f4ef',
              border: '1px solid rgba(232,182,162,0.58)',
              background: 'rgba(255,255,255,0.04)',
              fontSize: 14,
            }}
          />
        ))}
      </Box>
    </Box>,

    // Connect slide
    <Box key="connect" sx={{
      ...slideSurface,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      p: 4,
      background: 'linear-gradient(135deg, #3c3030, #17191f 68%)',
    }}>
      <ConnectContent />
    </Box>,
  ];

  const prevSlide = () => {
    setIndex(prev => (prev - 1 + slides.length) % slides.length);
  };

  const nextSlide = () => {
    setIndex(prev => (prev + 1) % slides.length);
  };

  return (
    <Box sx={{
      position: 'relative',
      width: '100%',
      height: '100%',
    }}>
      {slides.map((slide, i) => (
        <Box
          key={`about-slide-${i}`}
          sx={{
            position: i === index ? 'relative' : 'absolute',
            inset: 0,
            opacity: i === index ? 1 : 0,
            transition: 'opacity 0.3s ease',
          }}
        >
          {slide}
        </Box>
      ))}
      {/* Navigation */}
      <Box sx={{
        position: 'absolute',
        bottom: 8,
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: 1,
        zIndex: 10,
      }}>
        <Box
          role="button"
          tabIndex={0}
          aria-label="Previous slide"
          onClick={prevSlide}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); prevSlide(); } }}
          sx={{
            width: 28, height: 28,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            borderRadius: '50%',
            background: 'rgba(0,0,0,0.6)',
            border: '1px solid rgba(255,255,255,0.2)',
            color: '#aaa',
            cursor: 'pointer',
            fontSize: 12,
            '&:hover': { background: 'rgba(255,255,255,0.15)' },
          }}
        >
          ◀
        </Box>
        <Box sx={{
          display: 'flex', gap: 4, alignItems: 'center',
        }}>
          {slides.map((_, i) => (
            <Box
              key={i}
              sx={{
                width: 6, height: 6, borderRadius: '50%',
                background: i === index ? '#e8b6a2' : 'rgba(255,255,255,0.2)',
                cursor: 'pointer',
                transition: 'background 0.2s ease',
                '&:focus-visible': {
                  outline: '2px solid #e8b6a2',
                  outlineOffset: 2,
                },
              }}
              onClick={() => setIndex(i)}
              role="button"
              tabIndex={0}
              aria-label={`Go to slide ${i + 1}`}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setIndex(i); } }}
            />
          ))}
        </Box>
        <Box
          role="button"
          tabIndex={0}
          aria-label="Next slide"
          onClick={nextSlide}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); nextSlide(); } }}
          sx={{
            width: 28, height: 28,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            borderRadius: '50%',
            background: 'rgba(0,0,0,0.6)',
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
  );
}
