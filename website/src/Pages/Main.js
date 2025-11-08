import React from 'react';
import Header from '../components/Header';
import MainPageImage from '../components/MainPageImage';
import Lightroom from '../components/Lightroom';
import '../styles/font.css';
import '../styles/index.css';
import { motion } from "motion/react"
import CameraEnhanceIcon from '@mui/icons-material/CameraEnhance';
import { IconButton, Modal, Card, CardMedia, CardContent, Typography } from '@mui/material';
import { mainText, modalText } from '../assets/Text/text';
import { fadeIn } from '../animations/variants';
// Website inspiration from https://www.landing.love/sites/mikkisindhunata/

// Using forwardRef to prevent error when using motion's createMotion method
const Main = React.forwardRef((props, ref) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return(
        <div id="main">
            <motion.div
                id="main-background-image"
                variants={fadeIn}
                initial="initial"
                animate="animate"
                transition={{ duration: 2 }}
            >
                    <MainPageImage/>
            </motion.div>
            <div>
                <div id="main-content" />
                <Header />
                <motion.span 
                    id="main-span"
                    variants={fadeIn}
                    initial="initial"
                    animate="animate"
                    transition={{duration: 2, delay: 1}}
                >
                    <motion.p 
                        variants={fadeIn}
                        initial="initial"
                        animate="animate"
                        transition={{duration: 2, delay: 2}}
                    > 
                        {mainText} 
                    </motion.p>

                    <motion.div 
                        animate={{y: [0, -20, 0], 
                        x: [0, -10, 10, -10, 10, 0]}} 
                        transition={{duration: 1, delay: 3, repeat: Infinity, repeatDelay: 10}}
                    >
                        <IconButton 
                            onClick={handleOpen} 
                            sx={{zIndex: 4, position: 'absolute', marginLeft: '90px', marginTop: '20px'}} 
                            children={
                                <CameraEnhanceIcon sx={{color: 'white', minWidth: '200px', minHeight: '200px'}}/>
                            }
                        />
                    </motion.div>
                    <Modal 
                        open={open} 
                        onClose={handleClose} 
                        component={motion.div} 
                        initial={{scale: 0}} 
                        animate={{scale: 1}} 
                        transition={{duration: 1}}
                    >
                        <Card sx={{ margin: '50px 0 200px 18%', maxWidth: 1245}}>
                            <CardMedia 
                                sx={{ height: 640 }} 
                                image={require("./../assets/Portfolio/Images/Nature_Image1.jpg")} 
                                title="very awesome"/>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    The Old Oak Tree
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}> 
                                    {modalText}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Modal>
                </motion.span>
            </div>
            <div id="main-content-center" >
                <Lightroom />
            </div>
        </div>
    )
});

export default Main;