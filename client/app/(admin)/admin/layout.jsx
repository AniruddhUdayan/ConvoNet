"use client";
import { Inter } from "next/font/google";
import "./../../globals.css";
import {
  Grid,
  Box,
  IconButton,
  Drawer,
  Stack,
  Typography,
} from "@mui/material";
import { grayColor, mattBlack } from "@/constants/color";
import { Close, ExitToApp, Menu } from "@mui/icons-material";
import { adminTabs } from "@/constants/route";
import styled from "@emotion/styled";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import axios from "axios";
import { useRouter } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });



const serverUrl = process.env.NEXT_PUBLIC_SERVER;

const LinkComponent2 = styled(Link)`
  text-decoration: none;
  border-radius: 2rem;
  padding: 1rem 2rem;
  color: black;
  &:hover {
    color: rgba(0, 0, 0, 0.54);
  }
`;
const LinkComponent3 = styled(Typography)`
  text-decoration: none;
  border-radius: 2rem;
  padding: 1rem 2rem;
  color: black;
  &:hover {
    color: rgba(0, 0, 0, 0.54);
  }
  `

const SideBar = ({ w = "100%" }) => {
  const router = useRouter();
  const pathname = usePathname();

  const logoutHandler = async () => {
    try {
      const response = await axios.get(`${serverUrl}/admin/logout`, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      console.log("Logout successful:", response.data);
      router.push("/admin");
      // Additional logic to handle successful logout here
      // For example, you could redirect to the login page or update the global state
    } catch (error) {
      console.error("Logout failed:", error.response ? error.response.data : error.message);
      // Handle errors here, such as showing a notification to the user
    }
  }

  return (
    <Stack width={w} direction={"column"} p={"3rem"} spacing={"3rem"}>
      <Typography variant="h5" textTransform={"uppercase"}>
        Admin
      </Typography>
      <Stack spacing={"1rem"}>
        {adminTabs.map((tab) => (
          <LinkComponent2
            key={tab.path}
            href={tab.path}
            style={
              pathname === tab.path
                ? { backgroundColor: mattBlack, color: "white" }
                : {}
            }
          >
            <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
              {tab.icon}
              <Typography>{tab.name}</Typography>
            </Stack>
          </LinkComponent2>
        ))}
        <LinkComponent3 onClick={logoutHandler}
          >
            <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
             <ExitToApp />
              <Typography>Logout</Typography>
            </Stack>
          </LinkComponent3>
      </Stack>
    </Stack>
  );
};

export default function RootLayout({ children }) {
  const [isMobile, setIsMobile] = useState(false);

  const handleMobile = () => {
    setIsMobile(!isMobile);
  };
  const handleClose = () => {
    setIsMobile(false);
  };

  return (
    <html lang="en">
      <body className={inter.className}>
        <Grid container minHeight={"100vh"}>
          <Box
            sx={{
              display: {
                xs: "block",
                md: "none",
              },
              position: "fixed",
              right: "1rem",
              top: "1rem",
            }}
          >
            <IconButton onClick={handleMobile}>
              {isMobile ? <Close /> : <Menu />}
            </IconButton>
          </Box>
          <Grid
            item
            md={4}
            lg={3}
            sx={{
              display: {
                xs: "none",
                md: "block",
              },
            }}
          >
            <SideBar />
          </Grid>
          <Grid
            item
            xs={12}
            md={8}
            lg={9}
            sx={{
              bgcolor: grayColor,
            }}
          >
            {children}
          </Grid>
          <Drawer open={isMobile} onClose={handleClose}>
            <SideBar w="50vw" />
          </Drawer>
        </Grid>
      </body>
    </html>
  );
}
