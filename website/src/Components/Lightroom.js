import React from "react";
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import { IconButton } from '@mui/material';
import { motion } from "motion/react"


const IconButtonStyle = {
    color: 'white', 
    minWidth: '100px', 
    minHeight: '100px',
    transform: 'rotate(180deg)',
    position: 'relative',
    top: '300px'
}

const lightningBefore = 'radial-gradient(circle,rgba(207, 207, 62, 1) 0%, rgba(77, 77, 61, 1) 8%, rgba(0, 0, 0, 1) 100%)';
const lightningAfter = 'radial-gradient(circle,rgba(255, 255, 0, 1) 0%, rgba(168, 168, 99, 1) 33%, rgba(0, 0, 0, 1) 75%)';

function Lightroom() {
    return(
        <div align="center">
            <motion.div animate={{ background: [lightningBefore, lightningAfter, lightningBefore] }} transition={{duration: 5, repeat: Infinity}} style={{ position: 'relative', top:'520px', maxWidth: '300px', minHeight: '300px', borderRadius: '50%'}} />
            <IconButton sx={{...IconButtonStyle }} component={motion.div} 
                    children = {<LightbulbOutlinedIcon sx={{width: '100px', height: '100px'}} />}
                />
        </div>        
    )
}

export default Lightroom;