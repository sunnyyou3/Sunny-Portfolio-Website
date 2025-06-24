import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import pro from '../Images/pro.jpg';
import con from '../Images/con2.png';
import Ending from './Ending'; // Import the new component

const Dialog = styled(Paper)(({ theme }) => ({
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: 'rgba(26, 32, 39, 0.5)',
  }),
  width: '100%',
  position: 'absolute',
  bottom: 0,
}));

const english = [
  "Let us Telework",
  "No",
  "Screw you"
];

const japanese = [
  "あｓｄ",
  "ダミーデータ作成済です。",
  "大田"
];

const turn = [
  1,
  2,
  1,
  3,
  1,
  4,
];

function Telework({ language }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [charIndex, setCharIndex] = useState(0);
  const [showNextComponent, setShowNextComponent] = useState(false);

  const handleNextText = () => {
    if (currentIndex + 1 < textArray.length) {
      setCharIndex(0);
      setDisplayedText('');
      setCurrentIndex((prevIndex) => prevIndex + 1);
    } else {
      setShowNextComponent(true); // Show the next component
    }
  };

  const textArray = language === 1 ? english : japanese;

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.code === 'Space') {
        handleNextText();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  });

  useEffect(() => {
    if (charIndex < textArray[currentIndex].length) {
      const timeoutId = setTimeout(() => {
        setDisplayedText((prev) => prev + textArray[currentIndex][charIndex]);
        setCharIndex((prev) => prev + 1);
      }, 100);
      return () => clearTimeout(timeoutId);
    }
  }, [charIndex, currentIndex, textArray]);

  if (showNextComponent) {
    return <Ending />; // Render the next component
  }
  else if(turn[currentIndex] === 1) {
    return (
        <Box
            style={{ flex: 1, maxHeight: '100%', maxWidth: '100%', position: 'relative' }}
            elevation={0}
            onClick={handleNextText}
        >
            <div style={{ backgroundColor: "lightblue", flex: 1, minHeight: "85vmin", minWidth: "85vmin", position: 'relative', backgroundImage: `url('${pro}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <Dialog>
                <h4 style={{ color: "white", opacity: 1 }}>
                {displayedText}
                </h4>
            </Dialog>
            </div>
        </Box>
    )
  }
  else {
    return (
        <Box
            style={{ flex: 1, maxHeight: '100%', maxWidth: '100%', position: 'relative' }}
            elevation={0}
            onClick={handleNextText}
        >
        <div style={{ backgroundColor: "lightblue", flex: 1, minHeight: "85vmin", minWidth: "85vmin", position: 'relative', backgroundImage: `url('${con}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <Dialog>
            <h4 style={{ color: "white", opacity: 1 }}>
              {displayedText}
            </h4>
          </Dialog>
        </div>
        </Box>
    )
  }
}

export default Telework;