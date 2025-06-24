import React, { useState } from "react";
import Box from '@mui/material/Box';
import { Button } from "@mui/material";
import Title from "../Images/Title.png";
import Telework from "./Telework";

function Home() {
    const [language, setLanguage] = useState(0);
    const [play, setPlay] = useState(false);

    const handleButtonClick = (lang) => {
        setLanguage(lang);
        setPlay(true);
    };

    return (
        !play ? (
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
                        style={{ marginBottom: '20px' }} 
                    />
                    <Button 
                        variant="contained" 
                        color="primary" 
                        style={{ margin: '10px' }} 
                        onClick={() => handleButtonClick(1)}
                    >
                        English
                    </Button>
                    <Button 
                        variant="contained" 
                        color="secondary" 
                        style={{ margin: '10px' }} 
                        onClick={() => handleButtonClick(2)}
                    >
                        日本語
                    </Button>
                </div>
            </Box>
        ) : (
            <Telework language={language} />
        )
    );
}

export default Home;