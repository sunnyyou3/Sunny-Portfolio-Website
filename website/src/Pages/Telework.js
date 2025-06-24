import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import pro from '../Images/pro.jpg'
import con from '../Images/con2.png'

const Dialog = styled(Paper)(({ theme }) => ({
  backgroundColor: 'rgba(0, 0, 0, 0.5)', // Use rgba to set background opacity
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: 'rgba(26, 32, 39, 0.5)', // Adjusted for dark mode
  }),
  width: '100%', // Ensure the Dialog spans the full width of the parent
  position: 'absolute', // Use absolute positioning
  bottom: 0, // Position at the bottom
}));

const textArray = [
    "Let us Telework",
    "No", 
    "Screw you"
]; // Array of text items
const turn = [
    1,
    2,
    1,
    3,
    1,
    4,
]

function Telework() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [displayedText, setDisplayedText] = useState('');
    const [charIndex, setCharIndex] = useState(0);

    const handleNextText = () => {
        setCharIndex(0);
        setDisplayedText('');
        setCurrentIndex((prevIndex) => (prevIndex + 1) % textArray.length);
    };

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
    }, []);

    useEffect(() => {
        if (charIndex < textArray[currentIndex].length) {
            const timeoutId = setTimeout(() => {
                setDisplayedText((prev) => prev + textArray[currentIndex][charIndex]);
                setCharIndex((prev) => prev + 1);
            }, 100); // Adjust the speed of typing here
            return () => clearTimeout(timeoutId);
        }
    }, [charIndex, currentIndex]);

    return (
        <Box
            style={{ flex: 1, maxHeight: '100%', maxWidth: '100%', position: 'relative'}} // Set position to relative
            elevation={0}
            onClick={handleNextText}
        >
            {console.log(turn[currentIndex])}
            {turn[currentIndex] === 1 ?
                <div style={{ backgroundColor: "lightblue", flex: 1, minHeight: "85vmin", minWidth: "85vmin", position: 'relative', backgroundImage: `url('${pro}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                    <Dialog>
                        <h4 style={{ color: "white", opacity: 1 }}>
                            {displayedText}
                        </h4>
                    </Dialog>
                </div>
            :
                <div style={{ backgroundColor: "lightblue", flex: 1, minHeight: "85vmin", minWidth: "85vmin", position: 'relative', backgroundImage: `url('${con}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                    <Dialog>
                        <h4 style={{ color: "white", opacity: 1 }}>
                            {displayedText}
                        </h4>
                    </Dialog>
                </div>
            }
            
        </Box>
    );
}

export default Telework;