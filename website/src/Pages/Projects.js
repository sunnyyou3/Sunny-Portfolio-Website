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

const projectTitle = [
	"",
	"Time Date 1",
	"Time Date 2",
	"Time Date 3",
	"Time Date 4",
	"Time Date 5"
];

const projectText = [
	"",
	"hello from the other side hello from the other side hello from the other side hello from the other side hello from the other side", 
	"hello from the other side hello from the other side hello from the other side hello from the other side hello from the other side", 
	"hello from the other side hello from the other side hello from the other side hello from the other side hello from the other side", 
	"hello from the other side hello from the other side hello from the other side hello from the other side hello from the other side", 
	"hello from the other side hello from the other side hello from the other side hello from the other side hello from the other side"
];

function Image({ id, containerRef }) {
	const ref = useRef(null);

	return (
		<section style={{ position: 'relative', marginBottom: '50px', overflow: 'hidden', scrollSnapAlign: 'start' }}>
			<div ref={ref} style={{ borderRadius: '10px', overflow: 'hidden', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'}}>
				<motion.img
					className='projectIMG'
					src={require(`./../Images/${id}.jpg`)}
					alt={`Project ${id}`}
				/>
			</div>
			<div style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', padding: '20px', borderRadius: '10px', marginTop: '-50px', position: 'relative', zIndex: 1 }}>
				<motion.h2 style={{ color: '#ffcc00', fontSize: '1.5rem', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>
					{`#00${id}  ${projectTitle[id]}  `}
				</motion.h2>
				<motion.h3 style={{ maxWidth: "200px", color: 'white', fontSize: '1rem', textShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)' }}>
					{`${projectText[id]}`}
				</motion.h3>
			</div>
		</section>
	);
}

function Projects() {
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
			padding: '20px',
			height: '100vh',
			overflow: 'hidden'
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
			{[1, 2, 3, 4, 5].map((id) => (
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

export default Projects;