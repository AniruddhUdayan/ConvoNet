'use client'
import { grayColor } from "@/constants/color";
import { Typography , Box } from "@mui/material";
import axios from "axios";
import { useEffect } from "react";
import { userExits, userNotExists } from "@/redux/reducers/auth";
import { useDispatch } from "react-redux";

// export const metadata = {
//   title: "Convo-Net",
//   description: "Generated by create next app",
// };

export default function Home() {
 
  return (
    <Box bgcolor={grayColor} height={"100%"}>
      {" "}
      <Typography p={"2rem"} variant="h5" textAlign={"center"}>
        Select a friend to chat
      </Typography>
    </Box>
  );
}
