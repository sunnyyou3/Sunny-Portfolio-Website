import React from "react";
import { Box } from "@mui/material";

function MainPageImage() {
    return(
        <Box
            elevation={0}
            component="img"
            sx={{
                maxWidth: '100%',
                width: 'auto',
                height: 'auto'
            }}
            alt="Kyoto"
            src={require("./../Images/Nature_Image1.jpg")}
        />
    )
}

export default MainPageImage;