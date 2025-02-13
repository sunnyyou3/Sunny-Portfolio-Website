import React, { useEffect } from "react";
import { Container } from "@mui/system";
import Header from '../Components/Header';
import MainPageImage from '../Components/MainPageImage';

function Main() {
    return(
        <Container id="home" maxWidth="string">
            <MainPageImage/>
            {/* <ParallaxSection Component={Header}/> */}
            <Header/>
        </Container>
    )
}

export default Main;