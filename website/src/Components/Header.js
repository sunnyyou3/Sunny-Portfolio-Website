import React from "react";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Typography } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Home from "../Pages/Home";
import About from "../Pages/About";
import AboutContact from "../Pages/Contact";
import Gallery from "../Pages/Gallery";
import Projects from "../Pages/Projects";
import { useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const navItems = ['Home', 'Projects', 'Gallery', 'About', 'Contact'];

function Header() {
    const [page, setPage] = useState('');
    const [drawerOpen, setDrawerOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    };

    const handleNavItemClick = (item) => {
        setPage(item);
        if (isMobile) {
            setDrawerOpen(false);
        }
    };

    return (
        <Box id="header" style={{ flex: 1 }} elevation={1}>
            <AppBar id="AppBar" position='sticky' color="default" sx={{ flex: 1 }}>
                <Toolbar>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, textAlign: "center" }}
                    >
                        My Website
                    </Typography>
                    {isMobile ? (
                        <IconButton edge="end" color="inherit" onClick={handleDrawerToggle}>
                            <MenuIcon />
                        </IconButton>
                    ) : (
                        <Box sx={{ display: 'flex' }}>
                            {navItems.map((item) => (
                                <Button onClick={() => handleNavItemClick(item)} key={item} sx={{ color: '000' }} variant="text">
                                    <h3>{item}</h3>
                                </Button>
                            ))}
                            <IconButton>
                                <Avatar alt="Sunny" src={require("./../Images/SelfIcon.jpg")} />
                            </IconButton>
                        </Box>
                    )}
                </Toolbar>
            </AppBar>
            <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={handleDrawerToggle}
            >
                <List>
                    {navItems.map((item) => (
                        <ListItem button key={item} onClick={() => handleNavItemClick(item)}>
                            <ListItemText primary={item} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            {(() => {
                if (page === 'Home') return <Home />
                else if (page === 'Projects') return <Projects />
                else if (page === 'Gallery') return <Gallery />
                else if (page === 'About') return <About />
                else if (page === 'Contact') return <AboutContact />
                else return <Home />
            })()}
        </Box>
    );
}

export default Header;