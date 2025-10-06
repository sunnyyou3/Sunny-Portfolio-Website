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
        <Box id="header">
            <AppBar id="AppBar" style={{ background: 'transparent', boxShadow: 'none' }}>
                <Toolbar>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, textAlign: "center" }}
                    >
                        My Website
                    </Typography>
                   <Box sx={{ display: 'flex' }}>
                            {navItems.map((item) => (
                                <Button class="header-buttons" variant="outlined" size="medium" onClick={() => handleNavItemClick(item)} key={item} 
                                    sx={{ color: 'white', borderColor: 'white', margin: '10px 5px', borderRadius: '20px', padding: '1px 8px', height: '30px', 
                                        '&:hover': {
                                            color: 'black',
                                            backgroundColor: 'white'
                                        }
                                    }}>
                                    <h5>{item}</h5>
                                </Button>
                            ))}
                            <IconButton>
                                <Avatar alt="Sunny" src={require("./../Images/SelfIcon.jpg")} />
                            </IconButton>
                        </Box>
                </Toolbar>
            </AppBar>
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