import React from "react";
import Box from '@mui/material/Box';
import { Container } from "@mui/material";

function Story() {
    return(
        <Box sx={{ display: { xs: 'none', sm: 'block' }, mt:-3 }} elevation={0}>
            <Container id="mainComp" style={{height:'1000px', backgroundColor:'white'}} maxWidth="string"> 
                <Container id="subComp" style={{position:"relative", top: "100px"}} elevation={1}>
                    <Box sx={{ display: { xs: 'none', sm: 'block' }}} elevation={1} backgroundColor="grey"> 
                        <h2>b</h2>
                    </Box>
                    <h1>a</h1>
                </Container>
            </Container>
        </Box>
    )
}

export default Story;