"use client";
import React, { useCallback, useRef, useState } from "react";
import { IconButton, Skeleton, Stack } from "@mui/material";
import { grayColor, orange } from "@/constants/color";
import { AttachFile, Send } from "@mui/icons-material";
import { InputBox } from "@/components/styles/StyledComponents";
import { sampleMessages } from "@/constants/sampleData";
import MessageComponent from "@/components/shared/MessageComponent";
import FileMenu from "@/components/dialogs/FileMenu";
import { getSocket } from "@/socket";
import { NEW_MESSAGE } from "@/constants/events";
import { useParams } from "next/navigation";
import { useChatDetailsQuery } from "@/redux/api/api";
import { useSocketEvents } from "@/hooks/hook";
import { useSelector } from "react-redux";

// const user = {
//   _id: "asdasdad",
//   name: "John Doe",
// };

const Chat = () => {
  const containerRef = useRef(null);
  const params = useParams();
  const chatId = params.id;

  const { user } = useSelector((state) => state.auth);
  // console.log(user, "user");

  const chatDetails = useChatDetailsQuery({ chatId , skip : !chatId});

  const socket = getSocket();
  const members = chatDetails?.data?.chat?.members

  const [message, setMessage] = useState("");
  const [messages , setMessages] = useState([]);
  console.log(messages , 'messages');

  const submitHandler = (e) => {
    e.preventDefault();
    if(!message.trim()) return;

   

    socket.emit(NEW_MESSAGE, {chatId, members,  message});
    setMessage("");
  }

  const newMessagesListner = useCallback((data) => {
    console.log(data , 'data');
    setMessages((prev) => [...prev, data?.message]);
  },[])

  const eventHandlers = {[NEW_MESSAGE]: newMessagesListner};

  useSocketEvents(socket, eventHandlers);

  return chatDetails.isLoading ? (<Skeleton />) : (
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
        {messages?.map((message, index) => {
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
