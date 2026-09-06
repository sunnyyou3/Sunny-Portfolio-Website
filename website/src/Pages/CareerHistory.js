import React from 'react';
import { motion } from 'framer-motion';
import { Box, Typography } from '@mui/material';

const projectDate = [
	"",
	"Jan 2022",
	"Aug 2022",
	"May 2023 - Aug 2023",
	"Jan 2024",
	"Sept 2024",
	"March 2025",
];

const projectTitle = [
	"",
	"Technology Consultant at Lehigh University",
	"Software Engineer Teaching Assistant at Lehigh University",
	"Software Engineer Intern at FreeWheel",
	"Software Engineer Head Teaching Assistant",
	"Software Developer (Application) at ID Holdings",
	"Software Developer (Databases) at ID Holdings",
];

const projectText = [
	"",
	"Inspired by my love of building computers, I decided to work for the LTS department to help troubleshoot computers. All computers first come through me, where I apply my experiences in diagnosing what the problem is and finding potential solutions. I would set up Jira tickets to track all repairs.",
	"I was hired by the department of Computer Science to support young developers. I monitor and mentor 3 teams of 5 persons, teaching them the Agile methodology, Restful API, Google OAuth, dependency management, app deployment, frontend and backend connections, and designing and maintaining a database using a PaaS solution.",
	"My first software developer position as an intern. Hired by Comcast and placed into FreeWheel to help the team upgrade their QA certification webpage. I learned a lot and made a lot of connections, so I am quite grateful for this opportunity.", 
	"Promoted to Head Teaching Assistant. I now also take responsibility for other teaching assistants.", 
	"Not only was I looking for an opportunity to develop applications using the skills and knowledge I've built but I also wanted to tackle the challenge of living in a new Country (Japan) and improving my Japanese language skills.",
	"I was moved to a new team where my skills of being a developer and being fluent in English is better utilized. I obtained my JLPT N2 certification with the help of team members"
];

// Simple slides: header + date + description
export const slides = [1,2,3,4,5,6].map((id) => (
	<motion.div key={`career-slide-${id}`} style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 20, boxSizing: 'border-box' }}>
		<Box sx={{ width: '100%', maxWidth: 760, background: 'linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 2, p: 3, boxShadow: '0 8px 20px rgba(0,0,0,0.5)' }}>
			<Typography variant="h6" sx={{ color: '#ffcc00', fontWeight: 'bold', mb: 1 }}>{projectTitle[id]}</Typography>
			<Typography variant="subtitle2" sx={{ color: 'rgba(255,255,255,0.8)', mb: 1 }}>{projectDate[id]}</Typography>
			<Typography sx={{ color: 'rgba(255,255,255,0.95)', lineHeight: 1.6 }}>{projectText[id]}</Typography>
		</Box>
	</motion.div>
));

export default function CareerHistory() {
	return slides[0] || null;
}
