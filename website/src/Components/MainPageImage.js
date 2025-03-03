import React from "react";
import { Box } from "@mui/material";

function MainPageImage() {
    return(
        <Box
        id="startImage"
        style={{height: '90%'}}
        elevation={0}
        component="img"
        sx={{
            maxWidth: '100%',
            width: '100%',
            height: 'auto'
        }}
        alt="Kyoto"
        src={require("./../Images/Nature_Image1.jpg")}/>
    )
}

export default MainPageImage;