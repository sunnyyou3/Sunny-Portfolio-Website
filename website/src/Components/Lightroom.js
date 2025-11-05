import React from "react";
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import { IconButton } from '@mui/material';
import { motion } from "motion/react";
import roomImage from './../assets/Portfolio/Images/room.jpg'; // Import the image

const IconButtonStyle = {
    color: 'white', 
    minWidth: '100px', 
    minHeight: '100px',
    transform: 'rotate(180deg)',
    position: 'relative',
    top: '300px'
};

const lightningBefore = 'radial-gradient(circle,rgba(207, 207, 62, 1) 0%, rgba(77, 77, 61, 1) 8%, rgba(0, 0, 0, 1) 100%)';
const lightningAfter = 'radial-gradient(circle,rgba(255, 255, 0, 1) 0%, rgba(168, 168, 99, 1) 33%, rgba(0, 0, 0, 1) 75%)';

function Lightroom() {
    const [showRoom, setShowRoom] = React.useState(false);

    return (
        <div align="center">
            {showRoom ?
                <div 
                    className="Lightroom-background" 
                    style={{ position: 'relative', left:'100px', top: '150px', backgroundImage: `url(${roomImage})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', height: '100vh', width: '100vw' }} 
                />
            : 
                <div className="Lightbulb" style={{ position: 'relative', right: '80px' }}>
                    <motion.div 
                        animate={{ background: [lightningBefore, lightningAfter, lightningBefore] }} 
                        transition={{ duration: 5, repeat: Infinity }} 
                        style={{ position: 'relative', top: '520px', maxWidth: '300px', minHeight: '300px', borderRadius: '50%' }} 
                    />
                    <IconButton 
                        sx={{ ...IconButtonStyle }} 
                        component={motion.div} 
                        children={<LightbulbOutlinedIcon sx={{ width: '100px', height: '100px' }} />}
                        onClick={() => setShowRoom(true)}
                    />
                </div> 
            }
        </div>
    );
}

export default Lightroom;