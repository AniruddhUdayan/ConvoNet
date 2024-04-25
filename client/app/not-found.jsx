import { Error } from "@mui/icons-material";
import { Container, Stack, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

const ErrorPage = () => {
  return (
    <Container
      maxWidth="lg"
      sx={{
        height: "100vh",
      }}
    >
      <Stack alignItems={"center"} justifyContent={"center"} spacing={"2rem"} height="100%">
        <Error sx={{ fontSize: "10rem" }}  />
        <Typography variant="h4">Error 404</Typography>
        <Typography variant="h6">Page not found</Typography>
        <Link href="/">Go back to home</Link>
      </Stack>
    </Container>
  );
};

export default ErrorPage;
