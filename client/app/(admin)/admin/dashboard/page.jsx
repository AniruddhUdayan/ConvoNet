"use client";
import { DoughnutChart, LineChart } from "@/components/specific/Charts";
import {
  CurvedButton,
  SearchField,
} from "@/components/styles/StyledComponents";
import {
  AdminPanelSettings,
  Group,
  Groups,
  Message,
  Notifications,
  Person,
  Person2,
} from "@mui/icons-material";
import { Box, Container, Paper, Stack, Typography } from "@mui/material";
import moment from "moment";
import React from "react";

const page = () => {
  const Appbar = (
    <Paper
      elevation={3}
      sx={{ padding: "2rem", margin: "2rem 0", borderRadius: "1rem" }}
    >
      <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
        <AdminPanelSettings
          sx={{
            fontSize: "3rem",
          }}
        />
        <SearchField placeholder="Search..." />
        <CurvedButton>Search</CurvedButton>
        <Box flexGrow={1} />
        <Typography
          display={{
            xs: "none",
            lg: "block",
          }}
          color={"rgba(0,0,0,0.7)"}
          textAlign={"center"}
        >
          {moment().format("MMMM Do YYYY, h:mm:ss a")}
        </Typography>
        <Notifications />
      </Stack>
    </Paper>
  );

  const Widgets = (
    <Stack
      direction={{
        xs: "column",
        sm: "row",
      }}
      spacing="2rem"
      justifyContent="space-between"
      alignItems="center"
      margin={"2rem 0"}
    >
      <Widget title={"Users"} value={34} Icon={<Person2 />} />
      <Widget title={"Chats"} value={3} Icon={<Groups />} />
      <Widget title={"Messages"} value={453} Icon={<Message />} />
    </Stack>
  );

  return (
    <Container component={"main"}>
      {Appbar}
      <Stack
        direction={{
          xs: "column",
          lg: "row",
        }}
        flexWrap={"wrap"}
        justifyContent={"center"}
        alignItems={{
          xs: "center",
          lg: "stretch",
        }}
        sx={{
          gap: "2rem",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: "2rem 3.5rem",
            borderRadius: "1rem",
            width: "100%",
            maxWidth: "45rem",
          }}
        >
          <Typography margin={"2rem 0"} variant="h4">
            Last Messages
          </Typography>
          <LineChart value={[20, 40, 60, 80]} />
        </Paper>
        <Paper
          elevation={3}
          sx={{
            padding: "1rem",
            borderRadius: "1rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: { xs: "100%", sm: "50%" },
            position: "relative",
            width: "100%",
            maxWidth: "25rem",
          }}
        >
          <DoughnutChart
            labels={["Single Chats", "Group Chats"]}
            value={[23, 66]}
          />
          <Stack
            position={"absolute"}
            direction={"row"}
            justifyContent={"center"}
            alignItems={"center"}
            spacing={"0.5rem"}
            width={"100%"}
            height={"100%"}
          >
            <Group />
            <Typography>Vs</Typography>
            <Person />
          </Stack>
        </Paper>
      </Stack>
      {Widgets}
    </Container>
  );
};

const Widget = ({ title, value, Icon }) => (
  <Paper
    elevation={3}
    sx={{
      padding: "2rem",
      margin: "2rem 0",
      borderRadius: "1rem",
      width: "20rem",
    }}
  >
    <Stack alignItems={"center"} spacing={"1rem"}>
      <Typography
        sx={{
          color: "rgba(0,0,0,0.7)",
          borderRadius: "50%",
          border: `5px solid rgba(0,0,0,0.9)`,
          width: "5rem",
          height: "5rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgb(75, 192, 192 , 0.2)",
        }}
      >
        {value}
      </Typography>
      <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
        {Icon}
        <Typography>{title}</Typography>
      </Stack>
    </Stack>
  </Paper>
);

export default page;
