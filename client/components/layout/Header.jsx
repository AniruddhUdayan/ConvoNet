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
  Badge,
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
import {useDispatch , useSelector} from "react-redux";
import { userNotExists } from "@/redux/reducers/auth";
import { useRouter } from "next/navigation";
import { setIsMobile , setIsNewGroup, setIsNotification, setIsSearch } from "@/redux/reducers/misc";
import { resetNotificationCount } from "@/redux/reducers/chat";

const Header = () => {
 

  const server = process.env.NEXT_PUBLIC_SERVER;

  const { isSearch , isNotification , isNewGroup } = useSelector(state => state.misc)
  const {notificationCount} = useSelector(state => state.chat)

  const dispatch = useDispatch();
  const router = useRouter();


  const handleMobile = () => {
   dispatch(setIsMobile(true));
  };
  const onSearchDialog = () => {
    dispatch(setIsSearch(true))
  };
  const openNewGroup = () => {
    dispatch(setIsNewGroup(true));
  };
  const navigateToGroup = () => {
    router.push("/groups");
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
    dispatch(setIsNotification(true));
    dispatch(resetNotificationCount());
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
              <Box>
              <IconBtn
                title={"Search"}
                icon={<Search />}
                onClick={onSearchDialog}
              />

              <IconBtn
                title={"New Group"}
                icon={<Add />}
                onClick={openNewGroup}
              />

              <IconBtn
                title={"Manage Groups"}
                icon={<Group />}
               onClick={navigateToGroup}
              />

              <IconBtn
                title={"Notifications"}
                icon={<Notifications />}
                onClick={openNotification}
                value={notificationCount}
              />

              <IconBtn
                title={"Logout"}
                icon={<Logout />}
                onClick={logoutHandler}
              />
            </Box>
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

const IconBtn = ({ title, icon, onClick, value }) => {
  return (
    <Tooltip title={title}>
      <IconButton color="inherit" size="large" onClick={onClick}>
        {value ? (
          <Badge badgeContent={value} color="error">
            {icon}
          </Badge>
        ) : (
          icon
        )}
      </IconButton>
    </Tooltip>
  );
};

export default Header;
