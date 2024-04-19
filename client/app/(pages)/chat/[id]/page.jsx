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
import { useChatDetailsQuery, useGetMessagesQuery } from "@/redux/api/api";
import { useErrors, useSocketEvents } from "@/hooks/hook";
import { useSelector } from "react-redux";
import { useInfiniteScrollTop } from "6pp";

// const user = {
//   _id: "asdasdad",
//   name: "John Doe",
// };

const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  console.log(messages, "messages");

  const containerRef = useRef(null);
  const params = useParams();
  const chatId = params.id;

  const { user } = useSelector((state) => state.auth);
  // console.log(user, "user");

  const chatDetails = useChatDetailsQuery({ chatId, skip: !chatId });
  const oldMessagesChunk = useGetMessagesQuery({ chatId, page });

  const socket = getSocket();
  const members = chatDetails?.data?.chat?.members;

  const submitHandler = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    console.log(
      `Sending message: ${message} to chatId: ${chatId} with members: ${members}`
    );
    socket.emit(NEW_MESSAGE, { chatId, members, message });
    setMessage("");
    console.log("Message sent and input cleared");
  };

  const {data : oldMessages , setData : setOldMessages} = useInfiniteScrollTop(containerRef , oldMessagesChunk.data?.totalPages, page, setPage , oldMessagesChunk.data?.messages);

  const errors = [
    { isError: chatDetails.isError, error: chatDetails.error },
    { isError: oldMessagesChunk.isError, error: oldMessagesChunk.error },
  ];
console.log(oldMessagesChunk?.data, "oldMessagesChunk");
  const newMessagesListener = useCallback((data) => {
    console.log("Received data in newMessagesListener:", data);
    if (!data.message) {
      console.error("Data does not have message:", data);
      return;
    }
    setMessages((prev) => [...prev, data.message]);
  }, []);

  const eventHandlers = { [NEW_MESSAGE]: newMessagesListener };

  useSocketEvents(socket, eventHandlers);
  useErrors(errors);

  // const oldMessages = oldMessagesChunk?.data?.messages || [];

  const allMessages = [...oldMessages, ...messages];


  return chatDetails.isLoading ? (
    <Skeleton />
  ) : (
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
        {allMessages?.map((message) => {
          return (
            <MessageComponent key={message._id} message={message} user={user} />
          );
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
