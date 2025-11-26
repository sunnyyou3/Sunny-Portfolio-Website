import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import testImage from './../assets/Portfolio/Images/1.jpg'

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

function Image({ id, containerRef }) {
	const ref = useRef(null);

	return (
		<section style={{ position: 'relative', marginBottom: '50px', overflow: 'hidden', scrollSnapAlign: 'start' }}>
			<div ref={ref} style={{ borderRadius: '10px', overflow: 'hidden', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'}}>
				<motion.img
					className='projectIMG'
					src={{testImage}}
					alt={`Project ${id}`}
				/>
			</div>
			<div style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', padding: '20px', borderRadius: '10px', marginTop: '-50px', position: 'relative', zIndex: 1 }}>
				<motion.h1 style={{ color: '#ffcc00', fontSize: '1.25rem', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>
					{`${projectDate[id]}  `}
				</motion.h1>
				<motion.h2 style={{ color: '#ffcc00', fontSize: '1rem', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', marginTop: '-15px' }}>
					{`${projectTitle[id]}  `}
				</motion.h2>
				<motion.h3 style={{ color: 'white', fontSize: '0.75rem', textShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)' }}>
					{`${projectText[id]}`}
				</motion.h3>
			</div>
		</section>
	);
}

function CareerHistory() {
	const testRef = useRef(null);
	const { scrollYProgress } = useScroll({ container: testRef });
	const scaleX = useSpring(scrollYProgress, {
		stiffness: 100,
		damping: 30,
		restDelta: 0.001,
	});

  return (
    <Box style={{
			background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
			position: 'relative',
			padding: '60px',
			height: '100vh',
			overflow: 'hidden',
		}}>
      	<Box sx={{
			display: 'flex',
			justifyContent: 'center',
			position: 'sticky',
			background: 'linear-gradient(135deg, #2a5298 0%, #1e3c72 100%)',
			boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
			padding: '15px',
      	}}>
        <Typography variant="h5" sx={{ color: 'white', fontWeight: 'bold', letterSpacing: '1px' }}>Career Timeline</Typography>
      </Box>
		<Box
				id="test"
				ref={testRef}
				style={{
				overflowY: 'scroll',
				scrollSnapType: 'y mandatory',
				height: 'calc(100vh - 80px)',
			}}
			sx={{ '&::-webkit-scrollbar': { display: 'none' } }}
		>
			<Timeline position="alternate">
			{[1, 2, 3, 4, 5, 6].map((id) => (
				<TimelineItem key={id}>
				<TimelineSeparator>
					<TimelineDot color="primary" />
					<TimelineConnector />
				</TimelineSeparator>
				<TimelineContent>
					<Image id={id} containerRef={testRef} />
				</TimelineContent>
				</TimelineItem>
			))}
			</Timeline>
		</Box>

      {/* Progress Bar */}
      <motion.div className="progress" style={{ scaleX, position: 'fixed', bottom: '0' }} />
    </Box>
  );
}

export default CareerHistory;