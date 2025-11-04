import React from 'react';
import Header from '../Components/Header';
import MainPageImage from '../Components/MainPageImage';
import Lightroom from '../Components/Lightroom';
import '../Styles/font.css';
import '../index.css';
import { motion } from "motion/react"
import CameraEnhanceIcon from '@mui/icons-material/CameraEnhance';
import { IconButton, Modal, Card, CardMedia, CardContent, Typography } from '@mui/material';
// Website inspiration from https://www.landing.love/sites/mikkisindhunata/

const Main = React.forwardRef((props, ref) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return(
        <div id="main" style={{backgroundColor: 'black', overflow: 'hidden', position: 'relative'}}>
            <motion.div initial={{opacity : 0}} animate={{opacity : 1}} transition={{duration : 2}} id="main-background-image" style={{zIndex: 1, position: 'absolute', overflow: 'hidden'}}>
                <MainPageImage/>
            </motion.div>
            <div>
                <div id="main-content" style={{zIndex: 2, position: 'relative', backgroundColor: 'black', height: '100vh', width: '100vw', opacity: 0.5}} />
                <Header />
                <motion.span initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 2, delay: 1}} style={{zIndex: 4, overflow: 'hidden', position: 'absolute', top:'200px', color:'white', backgroundColor: 'rgba(0, 0, 0, 0.4)', padding:'75px 45px 75px 45px' , minHeight:'550px', marginLeft:'170px', fontSize:'15px', maxWidth: '400px', minWidth: '400px'}}>
                    <motion.p initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 2, delay: 2}}> In the heart of the bustling city, where the skyscrapers kissed the sky and the streets buzzed with life, there was a small, unassuming café tucked away in a quiet alley. The aroma of freshly brewed coffee wafted through the air, drawing in passersby with its irresistible allure. Inside, the walls were adorned with eclectic art, and the soft hum of conversation created a cozy atmosphere. Patrons sipped their drinks, lost in thought or deep in discussion, as the world outside rushed by. It was a haven of tranquility amidst the chaos, a place where time seemed to slow down, allowing its visitors a moment of respite from the frenetic pace of urban life. </motion.p>
                    <motion.div animate={{y: [0, -20, 0], x: [0, -10, 10, -10, 10, 0]}} transition={{duration: 1, delay: 3, repeat: Infinity, repeatDelay: 10}}>
                        <IconButton onClick={handleOpen} sx={{zIndex: 4, position: 'absolute', marginLeft: '90px', marginTop: '20px'}} children={
                            <CameraEnhanceIcon sx={{color: 'white', minWidth: '200px', minHeight: '200px'}}/>
                        }/>
                    </motion.div>
                    <Modal open={open} onClose={handleClose} component={motion.div} initial={{scale: 0}} animate={{scale: 1}} transition={{duration: 1}}>
                        <Card sx={{ margin: '50px 0 200px 18%', maxWidth: 1245}}>
                            <CardMedia sx={{ height: 640 }} image={require("./../Images/Nature_Image1.jpg")} title="very awesome"/>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    The Old Oak Tree
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}> 
                                    In the heart of the ancient forest, where the sunlight barely kissed the ground, there stood an old oak tree. Its branches stretched wide, like the arms of a wise elder embracing the world. The forest was alive with the whispers of the wind, rustling leaves, and the distant calls of unseen creatures. Among the roots of the oak, a small stream trickled, its waters clear and cool, reflecting the dappled light that managed to pierce the canopy above. This was a place of secrets and stories, where time seemed to stand still, and the air was thick with the scent of earth and life. It was here that the villagers would come to seek solace, to listen to the tales carried by the breeze, and to find a moment of peace in the embrace of nature's timeless beauty.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Modal>
                </motion.span>
            </div>
            <div id="main-content-center" style={{zIndex: 2, position: 'relative', height: '100vh', width: '100vw', opacity: 0.8, bottom: '150px'}} >
                <Lightroom />
            </div>
        </div>
    )
});

export default Main;