import React from 'react';
import MainPageImage from '../components/MainPageImage';
import { VRGameSubText, BuzzSubText} from '../assets/Text/text';
import ProjectSection from '../components/ProjectSection';
import VR_MainMenu from './../assets/Portfolio/Gif/VR_Menu.gif';
import VR_Setting from './../assets/Portfolio/Images/VR_Setting.png';
import VR_Tutorial from './../assets/Portfolio/Images/VR_Tutorial.png';
import VR_InGame from './../assets/Portfolio/Images/VR_InGame.jpg';
import Buzz_AdminConsole from './../assets/Portfolio/Images/Buzz_AdminConsole.png';
import Buzz_HomeScreen from './../assets/Portfolio/Images/Buzz_HomeScreen.jpg';
import Buzz_LoginScreen from './../assets/Portfolio/Images/Buzz_LoginScreen.jpg';
import { motion } from "motion/react"
import CameraEnhanceIcon from '@mui/icons-material/CameraEnhance';
import { IconButton, Modal, Card, CardMedia, CardContent, Typography} from '@mui/material';
import { mainText, modalText } from '../assets/Text/text';
import { fadeIn } from '../animations/variants';

function Home() {
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
            <ProjectSection images={[VR_MainMenu, VR_Setting, VR_Tutorial, VR_InGame]} title="VR App for Students with EBD" body={VRGameSubText} diagonalSide = "left"/>
            <ProjectSection images={{Buzz_LoginScreen, Buzz_HomeScreen, Buzz_AdminConsole}} title="" body={BuzzSubText} diagonalSide = "right"/>
            <ProjectSection images={{}} title="" body="" diagonalSide = "left"/>
            <ProjectSection images={{}} title="" body="" diagonalSide = "right"/>
        </div>
    )
}

export default Home;