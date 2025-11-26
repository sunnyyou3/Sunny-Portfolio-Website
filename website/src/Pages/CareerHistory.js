import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
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

const COLORS = {
  yellow: "#ffcc00",
  textShadowLg: "2px 2px 4px rgba(0,0,0,0.5)",
  textShadowSm: "1px 1px 3px rgba(0,0,0,0.5)",
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};


function CareerText({ id }) {
  return (
    <Box
      sx={{
        position: "relative",
        mb: 6,
        overflow: "hidden",
        scrollSnapAlign: "start",
      }}
    >
      <Box
        component={motion.div}
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        sx={{
          backgroundColor: "rgba(0,0,0,0.7)",
          p: 2.5,
          borderRadius: 2,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: COLORS.yellow,
            textShadow: COLORS.textShadowLg,
            fontSize: "1.25rem",
            mb: -1,
          }}
        >
          {projectDate[id] ?? "Unknown Date"}
        </Typography>

        <Typography
          variant="subtitle1"
          sx={{
            color: COLORS.yellow,
            textShadow: COLORS.textShadowLg,
            fontSize: "1rem",
            mb: 1,
          }}
        >
          {projectTitle[id] ?? "Untitled Project"}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: "white",
            textShadow: COLORS.textShadowSm,
            fontSize: "0.9rem",
          }}
        >
          {projectText[id] ?? "No description available."}
        </Typography>
      </Box>
    </Box>
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
    <Box
      sx={{
        background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
        height: "100vh",
        overflow: "hidden",
        position: "relative",
        padding: '50px',
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          position: "sticky",
          top: 0,
          zIndex: 10,
          p: 2,
          background: "linear-gradient(135deg, #2a5298 0%, #1e3c72 100%)",
          boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
        }}
      >
        <Typography
          variant="h5"
          sx={{ color: "white", fontWeight: "bold", letterSpacing: 1 }}
        >
          Career Timeline
        </Typography>
      </Box>

      <Box
        id="test"
        ref={testRef}
        sx={{
          overflowY: "scroll",
          scrollSnapType: "y mandatory",
          height: "calc(100vh - 80px)",
          "&::-webkit-scrollbar": { display: "none" },
          pr: 1,
        }}
      >
        <Timeline position="alternate">
          {[1, 2, 3, 4, 5, 6].map((id, i) => (
            <TimelineItem key={id}>
              
              <TimelineOppositeContent
                sx={{ display: "flex", alignItems: "center" }}
              >
                <img
                  src={testImage}
                  alt="timeline"
                  style={{
                    width: "120px",
                    borderRadius: "8px",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
                  }}
                />
              </TimelineOppositeContent>

              <TimelineSeparator>
                <TimelineDot color="primary" />
                {i !== 5 && <TimelineConnector />}
              </TimelineSeparator>

              <TimelineContent>
                <CareerText id={id} />
              </TimelineContent>

            </TimelineItem>
          ))}
        </Timeline>
      </Box>

      <motion.div
        style={{
          scaleX,
          transformOrigin: "0 0",
          height: "4px",
          background: COLORS.yellow,
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 20,
        }}
      />
    </Box>
  );
}

export default CareerHistory;
