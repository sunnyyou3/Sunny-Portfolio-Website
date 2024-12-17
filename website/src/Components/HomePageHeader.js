import React from "react";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Typography } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import HomePageSub from "./HomePageSub";
import HomePageAbout from "./HomePageAbout";
import HomePageContact from "./HomePageContact";
import { useState } from "react";

const navItems = ['Home', 'About', 'Contact'];


function HomePageHeader() {
    const [page, setPage] = useState('Home');

    return(
        <Box style={{position:"relative", top:'-600px', width:'auto'}} elevation={1}>
            <AppBar position='sticky' color="default" sx={{ top: '0'}} component="nav" >
                <Toolbar>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' }, textAlign: "center" }}
                    >
                        アンニョハセヨ<br/> メッセージを送ってくれないლ(╹◡╹ლ)
                    </Typography>
                    <Box sx={{ display: { xs: 'none', sm: 'block' }, ml:-30}} style={{}}>
                        {navItems.map((item) => (
                        <Button onClick={() => {setPage(item)}} key={item} sx={{ color: '000' }}>
                            {item}
                        </Button>
                        ))}
                        <IconButton>
                            <Avatar alt="Sunny" src={require("./../Images/SelfIcon.jpg")}/>
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {(()　=> {
                if(page === 'Home') return <HomePageSub/>
                else if(page === 'About') return <HomePageAbout/>
                else if(page === 'Contact') return <HomePageContact/>
                else return <HomePageSub/>
            })()}
        </Box>
    )
}

export default HomePageHeader;