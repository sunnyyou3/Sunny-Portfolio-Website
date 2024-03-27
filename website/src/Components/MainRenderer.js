import React from "react";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Typography } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import background from './../Images/Nature_Image1.jpg'

const navItems = ['Home', 'About', 'Contact'];

function MainRenderer() {
    return(
        <div style={{ backgroundImage: `url(${background})` }}>
            <Box sx={{ display: 'flex' }}>
                <AppBar position='static' color="transparent" elevation={0} component="nav">
                    <Toolbar>
                    <IconButton sx={{ p: 1 }}>
                        <Avatar alt="Sunny" src={require("./../Images/SelfIcon.jpg")}/>
                    </IconButton>
                    
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                    >
                        MUI
                    </Typography>
                        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                            {navItems.map((item) => (
                            <Button key={item} sx={{ color: '000' }}>
                                {item}
                            </Button>
                            ))}
                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>
            <h1>Main</h1>
        </div>
    )
}

export default MainRenderer;