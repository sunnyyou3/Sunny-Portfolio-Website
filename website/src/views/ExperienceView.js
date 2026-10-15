import React from 'react';
import { Box, Chip, Typography } from '@mui/material';

const careerEntries = [
  {
    date: 'Jan 2022',
    company: 'Lehigh University',
    role: 'Technology Consultant',
    initials: 'LU',
    description: 'Inspired by my love of building computers, I joined the LTS department to troubleshoot and repair campus computers. I diagnosed issues, found solutions, and tracked every repair through Jira.',
    skills: ['Diagnostics', 'Jira', 'IT Support'],
  },
  {
    date: 'Aug 2022',
    company: 'Lehigh University',
    role: 'Software Engineer Teaching Assistant',
    initials: 'LU',
    description: 'I supported young developers across three teams, mentoring them through Agile methodology, RESTful APIs, Google OAuth, dependency management, deployment, and full-stack connections.',
    skills: ['Mentorship', 'REST APIs', 'Agile'],
  },
  {
    date: 'May 2023 - Aug 2023',
    company: 'FreeWheel / Comcast',
    role: 'Software Engineer Intern',
    initials: 'FW',
    description: 'My first software developer position. I helped upgrade FreeWheel\'s QA certification webpage, building practical experience while learning from a new engineering team.',
    skills: ['Web Development', 'QA', 'Internship'],
  },
  {
    date: 'Jan 2024',
    company: 'Lehigh University',
    role: 'Head Teaching Assistant',
    initials: 'LU',
    description: 'Promoted to Head Teaching Assistant, taking responsibility for coordinating and supporting the other teaching assistants alongside helping student teams succeed.',
    skills: ['Leadership', 'Teaching', 'Coordination'],
  },
  {
    date: 'Sept 2024',
    company: 'ID Holdings',
    role: 'Software Developer (Application)',
    initials: 'ID',
    description: 'I moved to Japan to develop applications with the skills I had built while taking on the challenge of working in a new country and improving my Japanese language ability.',
    skills: ['Application Development', 'Japan', 'Japanese'],
  },
  {
    date: 'March 2025',
    company: 'ID Holdings',
    role: 'Software Developer (Databases)',
    initials: 'ID',
    description: 'I joined a team where my development experience and fluency in English are better utilized. Along the way, I obtained my JLPT N2 certification with support from my teammates.',
    skills: ['Databases', 'English', 'JLPT N2'],
  },
];

const slideSurface = {
  width: 760,
  height: 608,
  boxSizing: 'border-box',
  overflow: 'hidden',
  color: '#f6f4ef',
  background: 'linear-gradient(135deg, #111217 0%, #202832 58%, #26372f 100%)',
};

export default function ExperienceView() {
  const [index, setIndex] = React.useState(0);
  const career = careerEntries[index];

  const prevSlide = () => {
    setIndex(prev => (prev - 1 + careerEntries.length) % careerEntries.length);
  };

  const nextSlide = () => {
    setIndex(prev => (prev + 1) % careerEntries.length);
  };

  return (
    <Box sx={{
      ...slideSurface,
      display: 'flex',
      flexDirection: 'column',
      p: 4,
    }}>
      {/* Header */}
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 2,
        mb: 1,
      }}>
        <Typography sx={{
          color: '#a9d6b7',
          fontFamily: "'Bitcount Grid Single', monospace",
          fontSize: 12,
          letterSpacing: 2,
        }}>
          CAREER HISTORY / {String(index + 1).padStart(2, '0')}
        </Typography>
        <Typography sx={{
          color: 'rgba(246,244,239,0.66)',
          fontFamily: "'Bitcount Grid Single', monospace",
          fontSize: 12,
        }}>
          {career.date}
        </Typography>
      </Box>

      {/* Content */}
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        minHeight: 0,
        py: 1,
        flex: 1,
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
          <Box sx={{
            width: 78,
            height: 78,
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            border: '1px solid rgba(169,214,183,0.7)',
            background: 'rgba(169,214,183,0.12)',
            color: '#a9d6b7',
            fontWeight: 800,
            fontSize: 24,
            letterSpacing: 1,
          }}>
            {career.initials}
          </Box>
          <Box>
            <Typography variant="h4" sx={{
              maxWidth: 600,
              fontWeight: 800,
              lineHeight: 1.05,
              fontSize: '2rem',
            }}>
              {career.role}
            </Typography>
            <Typography sx={{ color: '#a9d6b7', mt: 0.8, fontSize: 16 }}>
              {career.company}
            </Typography>
          </Box>
        </Box>

        <Typography sx={{
          maxWidth: 720,
          color: 'rgba(246,244,239,0.8)',
          fontSize: 16,
          lineHeight: 1.65,
        }}>
          {career.description}
        </Typography>
      </Box>

      {/* Footer */}
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 2,
        flexWrap: 'wrap',
        borderTop: '1px solid rgba(255,255,255,0.16)',
        pt: 2,
      }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
          {career.skills.map((skill) => (
            <Chip
              key={skill}
              label={skill}
              size="small"
              sx={{
                color: '#f6f4ef',
                border: '1px solid rgba(169,214,183,0.55)',
                background: 'transparent',
                fontSize: 11,
              }}
            />
          ))}
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography sx={{
            color: 'rgba(246,244,239,0.52)',
            fontFamily: "'Bitcount Grid Single', monospace",
            fontSize: 11,
          }}>
            ROLE {String(index + 1).padStart(2, '0')} / {String(careerEntries.length).padStart(2, '0')}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Box
              role="button"
              tabIndex={0}
              aria-label="Previous experience"
              onClick={prevSlide}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); prevSlide(); } }}
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
            <Box
              role="button"
              tabIndex={0}
              aria-label="Next experience"
              onClick={nextSlide}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); nextSlide(); } }}
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
