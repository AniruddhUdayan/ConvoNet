"use client";
import AvatarCard from "@/components/shared/AvatarCard";
import { LinkComponent } from "@/components/styles/StyledComponents";
import { mattBlack, orange } from "@/constants/color";
import { sampleChats } from "@/constants/sampleData";
import { KeyboardBackspace, Menu } from "@mui/icons-material";
import {
  Box,
  Drawer,
  Grid,
  IconButton,
  Tooltip,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";
import React, { useState } from "react";
import { memo } from "react";

const page = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMobile = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };
  const handleMobileclose = () => {
    setIsMobileMenuOpen(false);
  };

  const IconBtns = (
    <>
      <Box
        sx={{
          display: {
            xs: "block",
            sm: "none",
            position: "fixed",
            right: "1rem",
            top: "1rem",
          },
        }}
      >
        {" "}
        <IconButton onClick={handleMobile}>
          <Menu />
        </IconButton>
      </Box>
      <Tooltip title="back">
        <Link href="/">
          {" "}
          <IconButton
            sx={{
              position: "absolute",
              top: "2rem",
              left: "2rem",
              bgcolor: mattBlack,
              color: "white",
              ":&hover": {
                bgcolor: "rgba(0,0,0,0.7)",
                color: "black",
              },
            }}
          >
            <KeyboardBackspace />
          </IconButton>
        </Link>
      </Tooltip>
    </>
  );

  return (
    <Grid container height={"100vh"}>
      <Grid
        item
        sx={{
          display: {
            xs: "none",
            sm: "block",
          },
        }}
        sm={4}
        bgcolor={"bisque"}
      >
        <GroupsList w={"50vw"} myGroups={sampleChats} chatId={chatId}/>
      </Grid>
      <Grid
        item
        xs={12}
        sm={8}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          padding: "1rem 3rem",
        }}
      >
        {IconBtns}
      </Grid>
      <Drawer
        sx={{
          display: {
            xs: "block",
            sm: "none",
          },
        }}
        open={isMobileMenuOpen}
        onClose={handleMobileclose}
      >
        {" "}
        <GroupsList />
      </Drawer>
    </Grid>
  );
};

const GroupsList = ({ w = "100%", myGroups = [], chatId }) => (
  <Stack width={w}>
    {myGroups.length > 0 ? (
      myGroups.map((group) => {
        <GroupListItem key={group._id} group={group} chatId={chatId} />;
      })
    ) : (
      <Typography textAlign={"center"} padding={"1rem"}>
        No Groups
      </Typography>
    )}
  </Stack>
);

const GroupListItem = memo(({ group, chatId }) => {
  const { name, avatar, _id } = group;

  return (
    <LinkComponent href={`?group=${_id}`} onClick={(e) => {
      if (chatId === _id) {
        e.preventDefault();
      }
    }}>
      <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
        <AvatarCard avatar={avatar}>
          <Typography>{name}</Typography>
        </AvatarCard>
      </Stack>
    </LinkComponent>
  );
});

export default page;
