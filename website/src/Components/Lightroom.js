import React from "react";
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import { IconButton } from '@mui/material';

const IconButtonStyle = {
    color: 'white', 
    minWidth: '100px', 
    minHeight: '100px',
    transform: 'rotate(180deg)',
    position: 'relative',
    top: '150px',
    marginRight: '150px'
}

function Lightroom() {
    return(
        <div align="right">
            <IconButton sx={IconButtonStyle}
                children = {<LightbulbOutlinedIcon sx={{width: '100px', height: '100px'}} />}
            />
        </div>        
    )
}

export default Lightroom;