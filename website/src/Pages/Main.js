import React, { useEffect } from "react";
import { Container } from "@mui/system";
import Header from '../Components/Header';
import MainPageImage from '../Components/MainPageImage';
import Telework from "./Telework";

function Main() {
    return(
        <Container id="home"  style={{flex: 1}}>
            <Telework/>
            {/* <MainPageImage/>
            <Header/> */}
        </Container>
    )
}

export default Main;