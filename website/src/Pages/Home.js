import React from "react";
import { Container } from "@mui/system";
import HomePageHeader from '../Components/HomePageHeader';
import HomePageImage from '../Components/HomePageImage';
function Home() {
    return(
        <Container id="home" maxWidth="string" >
            <HomePageImage/>
            <HomePageHeader/>
        </Container>
    )
}

export default Home;