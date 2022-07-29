import React from "react";
import Lottie from "lottie-react";
import animation from "../assets/animations/loading.json";
import { colors, Typography } from "@mui/material";

const LoadingAnimation = () => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <Lottie animationData={animation} loop={true}/>
    <Typography sx={{ color: colors.blue[500] }}>Loading...</Typography>
  </div>
);

export default LoadingAnimation;
