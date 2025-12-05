import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform
} from "framer-motion";
import Box from '@mui/material/Box';
import CameraEnhanceIcon from '@mui/icons-material/CameraEnhance';
import { IconButton, Modal, Card, CardMedia, CardContent, Typography} from '@mui/material';
import { mainText, modalText } from '../assets/Text/text';
import { fadeIn } from '../animations/variants';
import MainPageImage from '../components/MainPageImage';

const projectTitle = [
	"",
	"Mt. Fuji",
	"Tokyo Tower",
	"Ramen",
	"Project Title4",
	"Project Title5"
];

const projectText = [
	"",
	"View of Mt. Fuji during the Winter seasons, perfect time for visiting as surrounding areas of Tokyo hardly gets any clouds during the Winter months. This photo was taken at Lake Yamanakako near Lake Yamanakako Plaza Kirara.", 
	"Tokyo Tower during the evening is illuminated in a bright red-ish orange color. Car enthusiasts could also be seen nearby with their sport cars.", 
	"Jiro-kei Ramen. A type of ramen filled to the brim with veggies, fatty pork soup, and a spoon full of garlic. Of the three sizes, a mini is enough to make me feeling 100% full.", 
	"hello from the other side hello from the other side hello from the other side hello from the other side hello from the other side", 
	"hello from the other side hello from the other side hello from the other side hello from the other side hello from the other side"
];

function useParallax(value, distance) {
	return useTransform(value, [0, 1], [-distance, distance]);
}

function Image({ id, containerRef }) {
	const ref = useRef(null);
	const { scrollYProgress } = useScroll({ target: ref, container: containerRef, layoutEffect: false });
	const y = useParallax(scrollYProgress, 300);
	const x = useParallax(scrollYProgress, 300);

  return (
    <section style={{ position: 'relative', overflow: 'hidden', marginBottom: '50px' }}>
		<div style={{ background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)', padding: '20px', borderRadius: '15px', flex: 1 , minHeight: '25vmin', maxWidth: '25vmin'}} ref={ref}>
			<motion.img
				style={{ x, borderRadius: '15px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)' }}
				className='gallery-image-tag'
				src={require(`./../assets/Portfolio/Images/${id}.jpg`)}
				alt="A London skyscraper"
			/>
		</div>
		<div style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', padding: '20px', borderRadius: '15px', flex: 1}}>
			<motion.h2 style={{ y, color: '#ffcc00', fontSize: '3vmin', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>
				{`#00${id}  ${projectTitle[id]}  `}
			</motion.h2>
			<motion.h3 style={{ y, color: 'white', fontSize: '2vmin', textShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)' }}>
				{`${projectText[id]}`}
			</motion.h3>
		</div>
    </section>
  );
}

function Gallery() {
	const testRef = useRef(null);
	const { scrollYProgress } = useScroll({ container: testRef });
	const scaleX = useSpring(scrollYProgress, {
		stiffness: 100,
		damping: 30,
		restDelta: 0.001,
	});

	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	return (
		<div id="main-gallery">
			<motion.div
				id="gallery-background-image"
				variants={fadeIn}
				initial="initial"
				animate="animate"
				transition={{ duration: 2 }}
			>
				<MainPageImage/>
			</motion.div>
			<div>
				<div id="gallery-content" />
				<motion.span 
					id="gallery-modal-span"
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
				<Box
					id="parallax-container"
					ref={testRef}
					style={{ backgroundColor: '#121212', position: 'relative', padding: '20px', flex: 1 }}
					sx={{ '&::-webkit-scrollbar': { display: 'none' } }}
				>
					{[1, 2, 3, 4, 5].map((image) => (
						<Image id={image} key={image} containerRef={testRef} />
					))}

					<motion.div className="progressBar" style={{ scaleX, position: 'fixed', bottom: '0' }} />
				</Box>
		</div>
	);
}

export default Gallery;