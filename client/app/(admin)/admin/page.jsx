'use client'
import React from "react";
import axios from "axios";
import { Container, Paper, TextField, Typography, Button } from "@mui/material";
import { useInputValidation } from "6pp";
import { bgGradient } from "@/constants/color";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const serverUrl = process.env.NEXT_PUBLIC_SERVER;

const page = () => {

  const router = useRouter();

  const secretKey = useInputValidation("");

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${serverUrl}/admin/verify`, {
        secretKey: secretKey.value
      }, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      console.log("Login successful:", response.data);
      router.push("/admin/dashboard");
    } catch (error) {
      console.error("Login failed:", error.response ? error.response.data : error.message);
      // Handle errors here, such as showing a notification to the user
    }
  };

  return (
    <div style={{ backgroundImage: bgGradient }}>
      <Container component={"main"} maxWidth="xs" sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "center",
      }}>
        <Paper elevation={3} sx={{
          padding: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}>
          <Typography variant="h5">Admin Login</Typography>
          <form style={{ width: "100%", marginTop: "1rem" }} onSubmit={submitHandler}>
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
