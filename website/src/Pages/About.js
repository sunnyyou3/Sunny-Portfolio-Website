import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { Grid2, Item, Stack } from '@mui/material';

function About() {
	return (
		<Box sx={{ padding: '40px', backgroundColor: '#f4f4f9', minHeight: '100vh' }}>
			<Box sx={{
			display: 'flex',
			justifyContent: 'center',
			position: 'sticky',
			background: 'linear-gradient(135deg,rgb(255, 255, 255) 0%,rgb(218, 229, 248) 100%)',
			boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
			padding: '15px',
			}}>
				<Grid2 container spacing={2}>
					<Grid2> 
						<Stack spacing={6}>
							<div style={{textAlign: 'center'}}>
								<Typography variant="h5" sx={{ fontWeight: 'bold', letterSpacing: '1px' }}>Who Are You?</Typography>
							</div>
							<Avatar alt="me" src="" sx={{width: 400, height: 400}}> </Avatar>
						</Stack>
					</Grid2>
				</Grid2>
			</Box>
			<h6>test</h6>
		</Box>
	);
}

export default About;








































/**
 * It's not a question of can or can't, there are some things in life you just do. This was a quote from one of my favoraite characters
 * in the Final Fantasy series. Living by it for the past 10 years, this quote has shaped and defined who I am today. 
 * My freshmen year of college was set during the middle of covid. Most colleges had mandated that classes be held online, mine being 
 * one of them. However, due to a class requiring that students be physically present, I reluctantly moved into the campus dorm. 
 * This period of my life was quite difficult, as it was difficult to make friends and even less so considering that a majority of the campus
 * was a ghost town. One day, on a whim, I decided to try learning Japanese. Not that it was for a future goal or anything, I just wanted to.
 * 
 * 
 * 
 */