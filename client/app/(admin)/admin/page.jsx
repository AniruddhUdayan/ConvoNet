"use client";
import React from "react";
import { Container, Paper, TextField, Typography, Button } from "@mui/material";
import { useInputValidation } from "6pp";
import { bgGradient } from "@/constants/color";

const isAdmin = false

const page = () => {
  const submitHandler = (e) => {
    e.preventDefault();
  };

  const secretKey = useInputValidation("");

  return (
    <div
      style={{
        backgroundImage: bgGradient,
      }}
    >
      {" "}
      <Container
        component={"main"}
        maxWidth="xs"
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h5">Admin Login</Typography>
          <form
            style={{
              width: "100%",
              marginTop: "1rem",
            }}
            onSubmit={submitHandler}
          >
            <TextField
              required
              fullWidth
              label="Secret Key"
              type="password"
              margin="normal"
              variant="outlined"
              value={secretKey.value}
              onChange={secretKey.changeHandler}
            />
            <Button fullWidth variant="contained" color="primary" type="submit">
              Login
            </Button>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default page;
