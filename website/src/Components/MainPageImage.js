import React from "react";
import { Box } from "@mui/material";

function MainPageImage() {
    return(
        <Box
            id="startImage"
            style={{height: '100vh', width: '100vw'}}
            elevation={0}
            component="img"
            alt="Kyoto"
            src={require("./../assets/Portfolio/Images/SunnyFuji.jpg")

        }/>
    )
}

export default MainPageImage;