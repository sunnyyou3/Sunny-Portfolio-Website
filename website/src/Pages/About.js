import React from "react";
import { Box, Typography, Avatar, Chip, Divider } from "@mui/material";
import { motion } from "framer-motion";

const fadeIn = {
  hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      ease: "easeOut",
      delay: i * 0.15,
    },
  }),
};

export default function About() {
  const skills = [
    "React",
    "Java",
    "Javascript",
    "Databases",
    "SQL",
    "Full Stack",
    "Frontend/Backend Design"
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        padding: "60px 20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        background:
          "radial-gradient(circle at top, #0b0014 0%, #050008 40%, #000000 100%)",
        color: "white",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          width: "600px",
          height: "600px",
          top: "-150px",
          right: "-150px",
          background: "radial-gradient(circle, #cc00ff55, #0000 70%)",
          filter: "blur(80px)",
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          width: "500px",
          height: "500px",
          bottom: "-120px",
          left: "-120px",
          background: "radial-gradient(circle, #00eaff55, #0000 70%)",
          filter: "blur(80px)",
          zIndex: 0,
        }}
      />

      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        custom={0}
        style={{ textAlign: "center", position: "relative", zIndex: 2, justifyContent: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <Avatar
          src=""
          sx={{
            width: 150,
            height: 150,
            border: "3px solid #ff00ff",
            boxShadow: `
              0 0 20px #ff00ff,
              0 0 40px #ff00ff99,
              inset 0 0 20px #ff00ff55
            `,
          }}
        />
        <Typography
          variant="h3"
          fontWeight="bold"
          sx={{
            mt: 2,
            background: "linear-gradient(90deg, #ff00ff, #00eaff)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "0 0 20px #ff00ff88",
          }}
        >
          SUNNY YOU
        </Typography>
        <Typography sx={{ opacity: 0.8, letterSpacing: 2, mt: 1 }}>
          Fullstack Engineer • Database Engineer • Problem Solver
        </Typography>
      </motion.div>

      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        custom={1}
        style={{
          marginTop: "50px",
          width: "100%",
          maxWidth: "900px",
          borderRadius: "18px",
          padding: "40px",
          background: "rgba(255,255,255,0.05)",
          backdropFilter: "blur(18px)",
          border: "1px solid rgba(255,255,255,0.2)",
          boxShadow: `
            0 0 25px #ff00ff55,
            0 0 50px #00eaff55,
            inset 0 0 20px rgba(255,255,255,0.1)
          `,
          position: "relative",
          zIndex: 2,
        }}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{
            mb: 2,
            background: "linear-gradient(90deg, #ff00ff, #00eaff)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          About Me
        </Typography>

        <Typography sx={{ opacity: 0.9, lineHeight: 1.8 }}>
          I'm a professional software developer with a focus on tackling industry leading
		  problems and providing innovative solutions. With a never ending thirst for knowledge,
		  I aim to build on my skills and provide my services to a wide range of organizations.
        </Typography>

        <Divider
          sx={{
            borderColor: "rgba(255,255,255,0.2)",
            my: 3,
            boxShadow: "0 0 10px #ff00ff",
          }}
        />

        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{
            mb: 1,
            background: "linear-gradient(90deg, #ff00ff, #00eaff)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Skills
        </Typography>

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5, mt: 2 }}>
          {skills.map((skill, i) => (
            <Chip
              key={i}
              label={skill}
              component={motion.div}
              whileHover={{ scale: 1.2 }}
              sx={{
                color: "white",
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.4)",
                backdropFilter: "blur(12px)",
                px: 1.5,
                boxShadow: `
                  0 0 10px #ff00ff88,
                  0 0 20px #00eaff88
                `,
              }}
            />
          ))}
        </Box>
      </motion.div>

      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        custom={2}
        style={{
          marginTop: "50px",
          width: "100%",
          maxWidth: "900px",
          borderRadius: "18px",
          padding: "40px",
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.12)",
          boxShadow: `
            0 0 25px #00eaff44,
            0 0 40px #ff00ff44,
            inset 0 0 20px rgba(255,255,255,0.06)
          `,
          backdropFilter: "blur(18px)",
        }}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{
            mb: 3,
            background: "linear-gradient(90deg, #00eaff, #ff00ff)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Things I want to Build
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {[
            {
              title: "Gmail Scrapper for Finance Tracking",
              year: "tbh",
              desc: "Keeping track of spendings in Japan is a pain because the banking apps don't always show transaction details like merchant name and sometimes don't update fast enough to be useful. So my goal is to create a Gmail scrapper that extracts transaction data from email receipts and compiles them into a database for easy tracking and analysis.",
            },
            {
              title: "AI Response to messages on Watch OS",
              year: "tbh",
              desc: "The AI suggested replies on the Samsung Watch is good but it's not personalized and often misses the context of the conversation. I want to build an AI system that can analyze incoming messages and generate context-aware responses that feel more natural and tailored to my communication style.",
            },
          ].map((item, i) => (
            <Box
              key={i}
              component={motion.div}
              whileHover={{ scale: 1.03 }}
              sx={{
                p: 3,
                borderRadius: 2,
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.3)",
                backdropFilter: "blur(14px)",
                boxShadow: `
                  0 0 15px #ff00ff66,
                  0 0 25px #00eaff55
                `,
              }}
            >
              <Typography variant="h6" fontWeight="bold">
                {item.title}
              </Typography>
              <Typography sx={{ opacity: 0.7 }}>{item.year}</Typography>
              <Typography sx={{ mt: 1, opacity: 0.9 }}>{item.desc}</Typography>
            </Box>
          ))}
        </Box>
      </motion.div>
    </Box>
  );
}
