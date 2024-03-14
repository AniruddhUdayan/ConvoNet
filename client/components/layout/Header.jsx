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

const Header = () => {
  const [isSearch, setIsSearch] = useState(false);
  const [isNotification, setIsNotification] = useState(false);
  const [isNewGroup, setIsNewGroup] = useState(false);

  const handleMobile = () => {
    console.log("mobile");
  };
  const onSearchDialog = () => {
    setIsSearch(!isSearch);
  };
  const openNewGroup = () => {
    setIsNewGroup(!isNewGroup);
  };
  const logoutHandler = () => {
    console.log("logout");
  };
  const openNotification = () => {
    setIsNotification(!isNotification);
  };
  return (
    <>
      <Box sx={{ flexGrow: 1 }} height={"4rem"}>
        <AppBar position="static" sx={{ bgcolor: orange }}>
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
                <IconButton color="inherit" size="large" onClick={openNewGroup}>
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
