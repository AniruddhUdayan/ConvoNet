"use client";
import { orange } from "@/constants/color";
import {
  Add,
  Group,
  Logout,
  Menu,
  Notifications,
  Search,
} from "@mui/icons-material";
import {
  AppBar,
  Backdrop,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import Link from "next/link";
import React, { Suspense, useState } from "react";
import SearchDialog from "../specific/Search";
import NotificationDialog from "../specific/Notifications";
import NewGroupDialog from "../specific/NewGroup";
import axios from "axios";
import { toast } from "react-hot-toast";
import {useDispatch} from "react-redux";
import { userNotExists } from "@/redux/reducers/auth";
import { useRouter } from "next/navigation";
import { setIsMobile } from "@/redux/reducers/misc";

const Header = () => {
  const [isSearch, setIsSearch] = useState(false);
  const [isNotification, setIsNotification] = useState(false);
  const [isNewGroup, setIsNewGroup] = useState(false);

  const server = process.env.NEXT_PUBLIC_SERVER;

  const dispatch = useDispatch();
  const router = useRouter();

  const handleMobile = () => {
   dispatch(setIsMobile(true));
  };
  const onSearchDialog = () => {
    setIsSearch(!isSearch);
  };
  const openNewGroup = () => {
    setIsNewGroup(!isNewGroup);
  };
  const logoutHandler = async() => {
    console.log("logout");
   try {
    const {data} = await axios.get(`${server}/user/logout`, { withCredentials: true });
    dispatch(userNotExists())
    toast.success(data?.message);
    router.push("/login");
   } catch (error) {
    toast.error( error?.response?.data?.message || "Error logging out");
   }
  };
  const openNotification = () => {
    setIsNotification(!isNotification);
  };
  return (
    <>
      <Box sx={{ flexGrow: 1 }} height={"4rem"}>
        <AppBar position="static" sx={{ bgcolor: "rgb(86,145,136)" }}>
          <Toolbar>
            <Typography
              variant="h6"
              sx={{
                display: { xs: "none", sm: "block" },
              }}
            >
              Convo Net
            </Typography>
            <Box
              sx={{
                display: { xs: "block", sm: "none" },
              }}
            >
              <IconButton color="inherit" onClick={handleMobile}>
                <Menu />
              </IconButton>
            </Box>
            <Box
              sx={{
                flexGrow: 1,
              }}
            />
            <Box>
              {" "}
              <div>
                {" "}
                <Tooltip title="Search">
                  {" "}
                  <IconButton
                    color="inherit"
                    size="large"
                    onClick={onSearchDialog}
                  >
                    <Search />
                  </IconButton>
                </Tooltip>
                <Tooltip title="New Group">
                  <IconButton
                    color="inherit"
                    size="large"
                    onClick={openNewGroup}
                  >
                    <Add />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Manage Groups">
                  <Link href="/groups" passHref>
                    {" "}
                    <IconButton
                      color="inherit"
                      size="large"
                      sx={{
                        color: "white",
                        "&:hover": {
                          color: "white",
                        },
                        textDecoration: "none",
                        marginTop: "0.5rem",
                      }}
                    >
                      <span style={{ textDecoration: "none" }}>
                        {" "}
                        <Group sx={{ color: "white" }} />
                      </span>
                    </IconButton>
                  </Link>
                </Tooltip>
                <Tooltip title="Notifications">
                  <IconButton
                    color="inherit"
                    size="large"
                    onClick={openNotification}
                  >
                    <Notifications />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Logout">
                  <IconButton
                    color="inherit"
                    size="large"
                    onClick={logoutHandler}
                  >
                    <Logout />
                  </IconButton>
                </Tooltip>
              </div>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      {isSearch && (
        <Suspense fallback={<Backdrop open />}>
          <SearchDialog />
        </Suspense>
      )}
      {isNotification && (
        <Suspense fallback={<Backdrop open />}>
          <NotificationDialog />
        </Suspense>
      )}
      {isNewGroup && (
        <Suspense fallback={<Backdrop open />}>
          <NewGroupDialog />
        </Suspense>
      )}
    </>
  );
};

export default Header;
