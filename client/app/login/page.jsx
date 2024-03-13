"use client";
import { Container, Paper, TextField, Typography, Button } from "@mui/material";
import React, { useState } from "react";



const page = () => {
  const [isLogin, setIsLogin] = useState(true);
  const toggleLogin = () => {
    setIsLogin(false);
  };
  return (
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
          {isLogin ? (
            <>
              <Typography variant="h5">Login</Typography>
              <form
                style={{
                  width: "100%",
                  marginTop: "1rem",
                }}
              >
                <TextField
                  required
                  fullWidth
                  label="Username"
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  margin="normal"
                  variant="outlined"
                />
                <Button
                  fullWidth
                  variant="contained"
                 color="primary"
                  type="submit"
                >
                  Login
                </Button>
                <Typography textAlign={"center"} m={"1rem"}>
                  OR
                </Typography>
                <Button fullWidth variant="text" onClick={toggleLogin}>
                  Sign Up Instead
                </Button>
              </form>
            </>
          ) : (
            <span>Sign Up</span>
          )}
        </Paper>
      </Container>
  );
};

export default page;
