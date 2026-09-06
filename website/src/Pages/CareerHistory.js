import React from 'react';
import { Box, Chip, Typography } from '@mui/material';
import ScaledSlide from '../components/ScaledSlide';

const careerEntries = [
	{
		date: 'Jan 2022',
		company: 'Lehigh University',
		role: 'Technology Consultant',
		initials: 'LU',
		logo: null,
		description: 'Inspired by my love of building computers, I joined the LTS department to troubleshoot and repair campus computers. I diagnosed issues, found solutions, and tracked every repair through Jira.',
		skills: ['Diagnostics', 'Jira', 'IT Support'],
	},
	{
		date: 'Aug 2022',
		company: 'Lehigh University',
		role: 'Software Engineer Teaching Assistant',
		initials: 'LU',
		logo: null,
		description: 'I supported young developers across three teams, mentoring them through Agile methodology, RESTful APIs, Google OAuth, dependency management, deployment, and full-stack connections.',
		skills: ['Mentorship', 'REST APIs', 'Agile'],
	},
	{
		date: 'May 2023 - Aug 2023',
		company: 'FreeWheel / Comcast',
		role: 'Software Engineer Intern',
		initials: 'FW',
		logo: null,
		description: 'My first software developer position. I helped upgrade FreeWheel\'s QA certification webpage, building practical experience while learning from a new engineering team.',
		skills: ['Web Development', 'QA', 'Internship'],
	},
	{
		date: 'Jan 2024',
		company: 'Lehigh University',
		role: 'Head Teaching Assistant',
		initials: 'LU',
		logo: null,
		description: 'Promoted to Head Teaching Assistant, taking responsibility for coordinating and supporting the other teaching assistants alongside helping student teams succeed.',
		skills: ['Leadership', 'Teaching', 'Coordination'],
	},
	{
		date: 'Sept 2024',
		company: 'ID Holdings',
		role: 'Software Developer (Application)',
		initials: 'ID',
		logo: null,
		description: 'I moved to Japan to develop applications with the skills I had built while taking on the challenge of working in a new country and improving my Japanese language ability.',
		skills: ['Application Development', 'Japan', 'Japanese'],
	},
	{
		date: 'March 2025',
		company: 'ID Holdings',
		role: 'Software Developer (Databases)',
		initials: 'ID',
		logo: null,
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

function CareerSlide({ career, index }) {
	return (
		<ScaledSlide>
		<Box sx={{ ...slideSurface, display: 'grid', gridTemplateRows: 'auto minmax(0, 1fr) auto', p: 4 }}>
			<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
				<Typography sx={{ color: '#a9d6b7', fontFamily: 'monospace', fontSize: 12, letterSpacing: 2 }}>CAREER HISTORY / {String(index + 1).padStart(2, '0')}</Typography>
				<Typography sx={{ color: 'rgba(246,244,239,0.66)', fontFamily: 'monospace', fontSize: 12 }}>{career.date}</Typography>
			</Box>

			<Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: 0, py: 3 }}>
				<Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
					<Box sx={{ width: 78, height: 78, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', border: '1px solid rgba(169,214,183,0.7)', background: 'rgba(169,214,183,0.12)', color: '#a9d6b7', fontWeight: 800, fontSize: 24, letterSpacing: 1 }}>
						{career.logo ? <Box component="img" src={career.logo} alt={`${career.company} logo`} sx={{ width: '100%', height: '100%', objectFit: 'contain', p: 1 }} /> : career.initials}
					</Box>
					<Box>
						<Typography variant="h4" sx={{ maxWidth: 600, fontWeight: 800, lineHeight: 1.05, fontSize: '2rem' }}>{career.role}</Typography>
						<Typography sx={{ color: '#a9d6b7', mt: 0.8, fontSize: 16 }}>{career.company}</Typography>
					</Box>
				</Box>

				<Typography sx={{ maxWidth: 720, color: 'rgba(246,244,239,0.8)', fontSize: 16, lineHeight: 1.65 }}>{career.description}</Typography>
			</Box>

			<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2, flexWrap: 'wrap', borderTop: '1px solid rgba(255,255,255,0.16)', pt: 2 }}>
				<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
					{career.skills.map((skill) => <Chip key={skill} label={skill} size="small" sx={{ color: '#f6f4ef', border: '1px solid rgba(169,214,183,0.55)', background: 'transparent', fontSize: 11 }} />)}
				</Box>
				<Typography sx={{ color: 'rgba(246,244,239,0.52)', fontFamily: 'monospace', fontSize: 11 }}>ROLE {String(index + 1).padStart(2, '0')} / {String(careerEntries.length).padStart(2, '0')}</Typography>
			</Box>
		</Box>
		</ScaledSlide>
	);
}

export const slides = [
	<ScaledSlide key="career-intro">
	<Box sx={{ ...slideSurface, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', p: 5, background: 'radial-gradient(circle at 85% 15%, rgba(169,214,183,0.3), transparent 35%), linear-gradient(135deg, #101217, #202832)' }}>
		<Typography sx={{ color: '#a9d6b7', fontFamily: 'monospace', fontSize: 12, letterSpacing: 2 }}>CAREER HISTORY</Typography>
		<Box sx={{ maxWidth: 560 }}>
			<Typography variant="h2" sx={{ fontSize: '3.8rem', fontWeight: 800, lineHeight: 0.95 }}>Curiosity, then responsibility.</Typography>
			<Typography sx={{ mt: 2, maxWidth: 490, color: 'rgba(246,244,239,0.78)', fontSize: 17, lineHeight: 1.5 }}>Worked internationally across the United States and Japan, building software, mentoring developers, and growing through every new challenge.</Typography>
			<Box sx={{ display: 'flex', gap: 1, mt: 3, flexWrap: 'wrap' }}>
				<Chip label="United States" sx={{ color: '#111217', background: '#a9d6b7', fontWeight: 700 }} />
				<Chip label="Tokyo, Japan" variant="outlined" sx={{ color: '#f6f4ef', borderColor: 'rgba(255,255,255,0.3)' }} />
			</Box>
		</Box>
	</Box>
	</ScaledSlide>,
	...careerEntries.map((career, index) => <CareerSlide key={`career-slide-${index}`} career={career} index={index} />),
];

export default function CareerHistory() {
	return slides[0] || null;
}
