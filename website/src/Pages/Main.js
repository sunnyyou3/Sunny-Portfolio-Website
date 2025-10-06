import React, { useEffect } from "react";
import { Container } from "@mui/system";
import Header from '../Components/Header';
import MainPageImage from '../Components/MainPageImage';
import { Button } from "@mui/material";
import Title from "./Title";

function Main() {
    return(
        <div id="main">
            <div id="main-background-image" style={{zIndex: 1, position: 'absolute', height: '100vh', width: '100vw', overflow: 'hidden'}}>
                <MainPageImage/>
            </div>
            <div id="main-content" style={{zIndex: 2, position: 'relative', backgroundColor: 'black', height: '100vh', width: '100vw', opacity: 0.5}} />
            <Header />
        </div>
    )
}

export default Main;