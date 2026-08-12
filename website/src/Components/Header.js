import { AppBar, Toolbar, Box, Button, IconButton, Avatar, Drawer, List, ListItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from "react";
import { motion } from "motion/react"

function Header({ navItems, callback }) {
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const handleNavItemClick = (item) => {
        callback(item);
    };

    return (
        <Box id="header">
            <AppBar 
                id="AppBar" 
                style={{ backgroundColor: 'transparent', boxShadow: "none"}} 
                component={motion.div} 
                initial={{ y: -100 }} 
                animate={{ y: 0 }} 
                transition={{ delay: 6, duration: 1 }}
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
                            width: "80%", 
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
        </Box>
    );
}

export default Header;