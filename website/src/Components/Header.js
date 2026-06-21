import { AppBar, Toolbar, Box, Button, IconButton, Avatar, Drawer, List, ListItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Home from "../pages/Home";
import About from "../pages/About";
import Gallery from "../pages/Gallery";
import CareerHistory from "../pages/CareerHistory";
import { useState } from "react";
import Title from '../telework_game/Title';
import { motion } from "motion/react"

const navItems = ['Projects', 'Career History', 'Gallery', 'About', 'Game'];

function Header() {
    const [page, setPage] = useState('');
    const [appbarTransparency, setTransparency] = useState('transparent');
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const handleNavItemClick = (item) => {
        setPage(item);
        if(item === 'Game') setTransparency('#2E3B55');
        else setTransparency('transparent')
    };

    return (
        <Box id="header">
            <AppBar 
                id="AppBar" 
                style={{ background: appbarTransparency, boxShadow: "none", position: "absolute" }} 
                component={motion.div} 
                initial={{ y: -100 }} 
                animate={{ y: 0 }} 
                transition={{ duration: 1 }}
            >
                <Toolbar>
                    <Box sx={{ flexGrow: 1 }} />
                    <IconButton sx={{p: 0, marginRight: "10px" }}>
                        <Avatar alt="Sunny" src={require("./../assets/Portfolio/Images/SelfIcon.jpg")} />
                    </IconButton>

                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ color: "white" }}
                    >
                        <MenuIcon fontSize="large" />
                    </IconButton>
                </Toolbar>
            </AppBar>

            <Drawer
                anchor="right" 
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{ keepMounted: true }}
                slotProps={{
                    paper: {
                        sx: {
                            backgroundColor: "rgba(0, 0, 0, 0.9)", 
                            width: "250px",
                            padding: "20px 10px",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center"
                        }
                    }
                }}
            >
                <List sx={{ width: "100%" }}>
                {navItems.map((item) => (
                    <ListItem key={item} disablePadding sx={{ justifyContent: "center", margin: "15px 0" }}>
                    <Button 
                        variant="outlined" 
                        size="medium" 
                        onClick={() => {
                            handleNavItemClick(item);
                            handleDrawerToggle();
                        }} 
                        sx={{ 
                            color: "white", 
                            borderColor: "white", 
                            borderRadius: "30px", 
                            padding: "5px 20px", 
                            width: "80%", /* Full width buttons inside the sidebar */
                            "&:hover": {
                                color: "black",
                                backgroundColor: "white"
                            }
                        }}
                    >
                        <h5 style={{ margin: 0 }}>{item}</h5>
                    </Button>
                    </ListItem>
                ))}
                </List>
            </Drawer>
            {/* {(() => {
                if (page === 'Projects') return <Home />
                else if (page === 'Career History') return <CareerHistory />
                else if (page === 'Gallery') return <Gallery />
                else if (page === 'About') return <About />
                else if (page === 'Game') return <Box sx={{ mt: 8}} > <Title /> </Box>
                else return <About />
            })()} */}
        </Box>
    );
}

export default Header;