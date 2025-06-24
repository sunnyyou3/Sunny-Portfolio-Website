import Box from '@mui/material/Box';
import Title from "../Images/Title.png";

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
        </Box>
    );
}

export default Home;