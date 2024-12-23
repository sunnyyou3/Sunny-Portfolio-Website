import React, { useEffect } from "react";
import { Container } from "@mui/system";
import Header from '../Components/Header';
import MainPageImage from '../Components/MainPageImage';

function Main() {
    useEffect(() => {
        var threshold = 150;
        const handleScroll = () => {
            // Get the current scroll position
            // Define the threshold at which you want to jump to the section                
            // // Find the target section by ID
            const targetSection = document.getElementById("header");
            if (targetSection) {
                // Use scrollIntoView for smooth scrolling
                targetSection.scrollIntoView({ behavior: "smooth" });
                threshold = 0;
            }
        };

        const handleScrollDef = () => {
            const scrollPosition = window.scrollY;
            console.log(scrollPosition);
            if(scrollPosition < threshold) window.addEventListener("scroll", handleScroll);
            else {
                window.removeEventListener("scroll", handleScroll);
                threshold = 150;
            }
        } 

        // Add event listener for scroll
        window.addEventListener("scroll", handleScrollDef);

        // Clean up event listener on component unmount
        return () => {
            window.removeEventListener("scroll", handleScrollDef);
        };
    }, []);

    return(
        <Container id="home" maxWidth="string">
            <MainPageImage/>
            {/* <ParallaxSection Component={Header}/> */}
            <Header/>
        </Container>
    )
}

export default Main;