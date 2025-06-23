import React from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function AboutContact() {
    return (
        <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            {/* Artistic Header */}
            <Box sx={{ bgcolor: 'secondary.main', color: 'secondary.contrastText', p: 4, borderRadius: '50%', width: 150, height: 150, display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}>
                <Typography variant="h4" component="h1" align="center">
                    ME
                </Typography>
            </Box>

            {/* Abstract Main Content */}
            <Box sx={{ p: 4, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 3, maxWidth: 600, textAlign: 'center' }}>
                <Typography variant="h5" component="h2" gutterBottom>
                    Embrace Inkya
                </Typography>
                <Typography variant="body1" sx={{ fontStyle: 'italic' }}>
                    Dive into a world where imagination knows no bounds. This space is designed to inspire and provoke thought, encouraging you to explore new ideas and perspectives.
                </Typography>
            </Box>

            {/* Footer with a Twist */}
            <Box sx={{ mt: 5, bgcolor: 'grey.300', p: 2, borderRadius: 1, width: '100%', textAlign: 'center' }}>
                <Typography variant="body2" color="textSecondary">
                    © 2026 Sunny made this for funs.
                </Typography>
            </Box>
        </Box>
    );
}

export default AboutContact;