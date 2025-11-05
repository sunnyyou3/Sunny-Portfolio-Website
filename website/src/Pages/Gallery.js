import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform
} from "framer-motion";
import Box from '@mui/material/Box';

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
				className='projectIMG'
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

	return (
		<Box
			id="test"
			ref={testRef}
			style={{ backgroundColor: '#121212', position: 'relative', padding: '20px', flex: 1 }}
			sx={{ '&::-webkit-scrollbar': { display: 'none' } }}
		>
			{[1, 2, 3, 4, 5].map((image) => (
				<Image id={image} key={image} containerRef={testRef} />
			))}

			<motion.div className="progress" style={{ scaleX, position: 'fixed', bottom: '0' }} />
		</Box>
	);
}

export default Gallery;