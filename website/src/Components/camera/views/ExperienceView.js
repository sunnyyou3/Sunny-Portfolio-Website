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

export default function ExperienceView({ slideIndex }) {
  const entry = careerEntries[Math.min(slideIndex || 0, careerEntries.length - 1)];
  const totalSlides = careerEntries.length;

  if (!entry) return null;

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'grid',
        gridTemplateRows: 'auto minmax(0, 1fr) auto',
        p: 2.5,
        background: 'linear-gradient(135deg, #111217 0%, #202832 58%, #26372f 100%)',
        color: '#f6f4ef',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 1 }}>
        <Typography
          sx={{
            color: '#a9d6b7',
            fontFamily: 'monospace',
            fontSize: 10,
            letterSpacing: 2,
          }}
        >
          CAREER HISTORY / {String((slideIndex || 0) + 1).padStart(2, '0')}
        </Typography>
        <Typography
          sx={{
            color: 'rgba(246,244,239,0.66)',
            fontFamily: 'monospace',
            fontSize: 10,
          }}
        >
          {entry.date}
        </Typography>
      </Box>

      {/* Content */}
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: 0, py: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
          <Box
            sx={{
              width: 56,
              height: 56,
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              border: '1px solid rgba(169,214,183,0.7)',
              background: 'rgba(169,214,183,0.12)',
              color: '#a9d6b7',
              fontWeight: 800,
              fontSize: 18,
              letterSpacing: 1,
            }}
          >
            {entry.initials}
          </Box>
          <Box>
            <Typography
              variant="h6"
              sx={{
                maxWidth: 500,
                fontWeight: 800,
                lineHeight: 1.05,
                fontSize: '1.3rem',
              }}
            >
              {entry.role}
            </Typography>
            <Typography
              sx={{
                color: '#a9d6b7',
                mt: 0.5,
                fontSize: 13,
              }}
            >
              {entry.company}
            </Typography>
          </Box>
        </Box>

        <Typography
          sx={{
            maxWidth: 600,
            color: 'rgba(246,244,239,0.8)',
            fontSize: 12,
            lineHeight: 1.6,
          }}
        >
          {entry.description}
        </Typography>
      </Box>

      {/* Footer */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 1, flexWrap: 'wrap', borderTop: '1px solid rgba(255,255,255,0.16)', pt: 1.5 }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          {entry.skills.map((skill) => (
            <Chip
              key={skill}
              label={skill}
              size="small"
              sx={{
                color: '#f6f4ef',
                border: '1px solid rgba(169,214,183,0.55)',
                background: 'transparent',
                fontSize: 9,
                height: 18,
              }}
            />
          ))}
        </Box>
        <Typography
          sx={{
            color: 'rgba(246,244,239,0.52)',
            fontFamily: 'monospace',
            fontSize: 9,
          }}
        >
          ROLE {String((slideIndex || 0) + 1).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}
        </Typography>
      </Box>
    </Box>
  );
}
