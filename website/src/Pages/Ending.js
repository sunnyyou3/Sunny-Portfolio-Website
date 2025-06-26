import Box from '@mui/material/Box';
import Title from "../Images/Telework/Title.png";
import Typography from '@mui/material/Typography';

function Home() {
    return (
        <Box
            style={{ flex: 1, maxHeight: '100%', maxWidth: '100%', position: 'relative' }} 
            elevation={0}
        >
            <div 
                style={{ 
                    backgroundColor: "lightblue", 
                    flex: 1, 
                    minHeight: "85vmin", 
                    minWidth: "85vmin",
                    display: 'flex', 
                    flexDirection: 'column',
                    justifyContent: 'center', 
                    alignItems: 'center' 
                }}
            >
                <img 
                    src={Title}
                    alt="Description"
                    style={{ width:'100px', marginBottom: '20px' }} 
                />
                <h1>Let Us Telework</h1>
            </div>
            <Box sx={{ mt: 5, bgcolor: 'grey.300', p: 2, borderRadius: 1, width: '100%', textAlign: 'center' }}>
                <Typography variant="body2" color="textSecondary">
                    © 2026 Sunny made this for funs.
                </Typography>
            </Box>
        </Box>
    );
}

export default Home;