'use client'
import React, { useRef } from "react";
import { IconButton, Stack } from "@mui/material";
import { grayColor, orange } from "@/constants/color";
import { AttachFile, Send } from "@mui/icons-material";
import { InputBox } from "@/components/styles/StyledComponents";
import { sampleMessages } from "@/constants/sampleData";
import MessageComponent from "@/components/shared/MessageComponent";

const user = {
  _id:"asdasdad",
  name:"John Doe",
}

const Chat = ({ params }) => {
  const containerRef = useRef(null);

  return (
    <>
      <Stack ref={containerRef} boxSizing={"border-box"} padding={"1rem"} spacing={"1rem"} bgcolor={grayColor} height={"90%"} sx={{
        overflowX: "hidden",
        overflowY: "auto",
      }}>
      {
        sampleMessages.map((message, index) => {
          <MessageComponent key={index} message={message} user={user} />
        })
      }
      </Stack>
      <form style={{
        height: "10%",
      }}>
        <Stack direction={"row"} height={"100%"} padding={"1rem"} alignItems={"center"} position={"relative"}>
          <IconButton sx={{
            position: "absolute",
            left: "1.5rem",
            rotate: "30deg",
          }}>
            <AttachFile />
          </IconButton>
        <InputBox placeholder="Type Message Here..."/>
          <IconButton type="submit" sx={{
            rotate:"-30deg",
            backgroundColor: orange,
            color: "white",
            marginLeft: "1rem",
            padding: "0.5rem",
            "&:hover": {
              bgcolor:"error.dark"
            }
          }}>
            <Send />
          </IconButton>
        </Stack>
      </form>
    </>
  );
};

export default Chat;
