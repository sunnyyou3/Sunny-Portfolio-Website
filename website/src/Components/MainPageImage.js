import React from "react";
import { Box } from "@mui/material";

function MainPageImage() {
    return(
        <Box
            id="startImage"
            style={{flex: 1, maxHeight:'100%', maxWidth: '100%'}}
            elevation={0}
            component="img"
            alt="Kyoto"
            src={require("./../Images/Nature_Image1.jpg")

        }/>
    )
}

export default MainPageImage;