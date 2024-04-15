"use client";
import React, { useRef, useState } from "react";
import { IconButton, Stack } from "@mui/material";
import { grayColor, orange } from "@/constants/color";
import { AttachFile, Send } from "@mui/icons-material";
import { InputBox } from "@/components/styles/StyledComponents";
import { sampleMessages } from "@/constants/sampleData";
import MessageComponent from "@/components/shared/MessageComponent";
import FileMenu from "@/components/dialogs/FileMenu";
import { getSocket } from "@/socket";
import { NEW_MESSAGE } from "@/constants/events";
import { useParams } from "next/navigation";

const user = {
  _id: "asdasdad",
  name: "John Doe",
};

const Chat = ({  members}) => {
  const containerRef = useRef(null);
  const params = useParams();
  const chatId = params.id;

  const socket = getSocket();
  console.log(socket, "socket");
  console.log(chatId, "chatId");

  const [message, setMessage] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if(!message.trim()) return;

    socket.emit(NEW_MESSAGE, {chatId, members,  message});
    setMessage("");
  }

  return (
    <>
      <Stack
        ref={containerRef}
        boxSizing={"border-box"}
        padding={"1rem"}
        spacing={"1rem"}
        bgcolor={grayColor}
        height={"90%"}
        sx={{
          overflowX: "hidden",
          overflowY: "auto",
        }}
      >
        {sampleMessages.map((message, index) => {
          <MessageComponent key={index} message={message} user={user} />;
        })}
      </Stack>
      <form
        style={{
          height: "10%",
        }}
        onSubmit={submitHandler}
      >
        <Stack
          direction={"row"}
          height={"100%"}
          padding={"1rem"}
          alignItems={"center"}
          position={"relative"}
        >
          <IconButton
            sx={{
              position: "absolute",
              left: "1.5rem",
              rotate: "30deg",
            }}
          >
            <AttachFile />
          </IconButton>
          <InputBox
            placeholder="Type Message Here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <IconButton
            type="submit"
            sx={{
              rotate: "-30deg",
              backgroundColor: orange,
              color: "white",
              marginLeft: "1rem",
              padding: "0.5rem",
              "&:hover": {
                bgcolor: "error.dark",
              },
            }}
          >
            <Send />
          </IconButton>
        </Stack>
      </form>
      <FileMenu />
    </>
  );
};

export default Chat;
