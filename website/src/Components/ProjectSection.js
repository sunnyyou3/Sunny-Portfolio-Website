import React, { useState, useEffect } from "react";
import { Box, Card, CardMedia, CardContent, Typography } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";

// Styles
const rootStyles = (isLeft) => ({
    width: "100vw",
    height: "100vh",
    position: "relative",
    overflow: "hidden",
    bgcolor: isLeft ? "grey.900" : "grey.500" // example: dark if left, light if right
});

const imageContainerStyles = {
    position: "absolute",
    top: 0,
    height: "100%",
    width: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2
};

const imageCardStyles = {
    width: 350,
    boxShadow: 4,
    borderRadius: 3
};

const imageMediaStyles = {
    objectFit: "cover"
};

const descriptionContainerStyles = {
    position: "absolute",
    top: 0,
    height: "100%",
    width: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2
};

const descriptionCardStyles = {
    maxWidth: 500,
    p: 3,
    bgcolor: "rgba(255,255,255,0.8)",
    backdropFilter: "blur(10px)"
};

const diagonalDividerStyles = {
    left: {
        position: "absolute",
        inset: 0,
        backgroundColor: "grey.600",
        clipPath: "polygon(0 0, 60% 0, 40% 100%, 0 100%)",
        zIndex: 1,
        pointerEvents: "none"
    },
    right: {
        position: "absolute",
        inset: 0,
        backgroundColor: "grey.300",
        clipPath: "polygon(0 0, 40% 0, 60% 100%, 0 100%)",
        zIndex: 1,
        pointerEvents: "none"
    }
};

export default function ProjectSection({ images = [], title, body, diagonalSide = "right" }) {
    const isLeft = diagonalSide === "left";
    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        if (images.length <= 1) return;
        const interval = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % images.length);
        }, 10000);
        return () => clearInterval(interval);
    }, [images]);

    return (
        <motion.div
            initial={{ x: isLeft ? -100 : 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8 }}
        >
            <Box sx={rootStyles(isLeft)}>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentImage}
                        initial={{ x: 300, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -300, opacity: 0 }}
                        transition={{ duration: 0.8 }}
                        style={{ ...imageContainerStyles, [isLeft ? 'left' : 'right']: 0 }}
                    >
                        <Card sx={imageCardStyles}>
                            <CardMedia
                                component="img"
                                height="500"
                                image={images[currentImage]}
                                alt={title}
                                sx={imageMediaStyles}
                            />
                        </Card>
                    </motion.div>
                </AnimatePresence>

                <Box sx={isLeft ? diagonalDividerStyles.left : diagonalDividerStyles.right} />

                <Box sx={{ ...descriptionContainerStyles, [isLeft ? 'right' : 'left']: 0 }}>
                    <Card sx={descriptionCardStyles}>
                        <CardContent>
                            <Typography variant="h4" fontWeight="bold" gutterBottom>{title}</Typography>
                            <Typography variant="body1">{body}</Typography>
                        </CardContent>
                    </Card>
                </Box>
            </Box>
        </motion.div>
    );
}