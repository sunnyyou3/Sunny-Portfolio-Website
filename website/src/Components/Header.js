import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Typography } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Home from "../pages/Home";
import About from "../pages/About";
import Gallery from "../pages/Gallery";
import CareerHistory from "../pages/CareerHistory";
import { useState } from "react";
import Title from '../pages/Title';
import { Container } from "@mui/system";
import { motion } from "motion/react"

const navItems = ['Projects', 'Career History', 'Gallery', 'About', 'Game'];

function Header() {
    const [page, setPage] = useState('');

    const handleNavItemClick = (item) => {
        setPage(item);
    };

    return (
        <Box id="header">
            <AppBar id="AppBar" style={{ background: 'transparent', boxShadow: 'none', position: 'absolute' }} component={motion.div} initial={{y : -100}} animate={{ y : 0}} transition={{duration: 1}}>
                <Toolbar>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, color: 'white', fontFamily: '"BBH Sans Hegarty", sans-serif'}}
                    >       
                    SUNNY
                    </Typography>
                   <Box sx={{ display: 'flex' }}>
                            {navItems.map((item) => (
                                <Button variant="outlined" size="medium" onClick={() => handleNavItemClick(item)} key={item} 
                                    sx={{ color: 'white', borderColor: 'white', margin: '10px 5px', borderRadius: '30px', padding: '1px 8px', height: '30px', 
                                        '&:hover': {
                                            color: 'black',
                                            backgroundColor: 'white'
                                        }
                                    }}>
                                    <h5>{item}</h5>
                                </Button>
                            ))}
                            <IconButton>
                                <Avatar alt="Sunny" src={require("./../assets/Portfolio/Images/SelfIcon.jpg")} />
                            </IconButton>
                        </Box>
                </Toolbar>
            </AppBar>
            {(() => {
                if (page === 'Projects') return <Home />
                else if (page === 'Career History') return <CareerHistory />
                else if (page === 'Gallery') return <Gallery />
                else if (page === 'About') return <About />
                else if (page === 'Game') return <Container> <Title /> </Container>
                else return <About />
            })()}
        </Box>
    );
}

export default Header;