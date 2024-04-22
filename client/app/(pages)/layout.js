"use client";
import { Inter } from "next/font/google";
import "./../globals.css";
import Header from "@/components/layout/Header";
import { Grid, Drawer } from "@mui/material";
import ChatList from "@/components/specific/ChatList";
import { sampleChats } from "@/constants/sampleData";
import Profile from "@/components/specific/Profile";
import { useParams } from "next/navigation";
import { useMyChatsQuery } from "@/redux/api/api";
import { Skeleton } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setIsMobile } from "@/redux/reducers/misc";
import { useErrors, useSocketEvents } from "@/hooks/hook";
import { getSocket } from "@/socket";
import { NEW_MESSAGE_ALERT, NEW_REQUEST, REFETCH_CHATS } from "@/constants/events";
import { useCallback } from "react";
import { incrementNotification, setNewMessagesAlert } from "@/redux/reducers/chat";
import axios from "axios";
import { useEffect } from "react";
import { userExits, userNotExists } from "@/redux/reducers/auth";
import { getOrSaveFromStorage } from "@/lib/features";


const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const params = useParams();
  const chatId = params.id;

  const server = process.env.NEXT_PUBLIC_SERVER;



  useEffect(() => {
    axios
      .get(`${server}/user/profile`, { withCredentials: true })
      .then((res) => {
       dispatch(userExits(res.data.data));
      })
      .catch((err) => {
        dispatch(userNotExists());
      });
  }, []);

  const dispatch = useDispatch();
  const socket = getSocket();

  const { isMobile } = useSelector((state) => state.misc);
  const { user } = useSelector((state) => state.auth);
  const {newMessagesAlert} = useSelector((state) => state.chat);
  

  const { isLoading, data, isError, error, refetch } = useMyChatsQuery("");

  useEffect(() => {
    getOrSaveFromStorage({key:NEW_MESSAGE_ALERT, value: newMessagesAlert});
  }, [newMessagesAlert]);

  const handleDeleteChat = (e, chatId, groupChat) => {
    e.preventDefault();
    console.log("Chat Deleted", chatId, groupChat);
  };

  const handleMobileClose = () => {
    dispatch(setIsMobile(false));
  };

  const newMessagesAlertHandler = useCallback((data) => {
    if (data.chatId === chatId) return;
    dispatch(setNewMessagesAlert(data));
  }, [chatId]);
  const newRequestHandler = useCallback(() => {
    dispatch(incrementNotification());
  }, [dispatch]);
  const refetchListener = useCallback(() => {
    refetch();
  }, [refetch]);

  const eventHandlers = {
    [NEW_MESSAGE_ALERT]: newMessagesAlertHandler,
    [NEW_REQUEST]: newRequestHandler,
    [REFETCH_CHATS]: refetchListener
  };

  useSocketEvents(socket, eventHandlers);

  useErrors([{ isError, error }]);

  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {isLoading ? (
          <Skeleton />
        ) : (
          <Drawer open={isMobile} onClose={handleMobileClose}>
            <ChatList
              w="70vw"
              chats={data?.message}
              chatId={chatId} //yha bhi chat id params wali dalni hai
              handleDeleteChat={handleDeleteChat}
              newMessagesAlert={newMessagesAlert}
            />
          </Drawer>
        )}
        <Grid container height={"calc(100vh - 4rem)"}>
          <Grid
            item
            sm={4}
            md={3}
            sx={{
              display: { xs: "none", sm: "block" },
            }}
            height={"100%"}
          >
            {isLoading ? (
              <Skeleton />
            ) : (
              <ChatList
                chats={data?.message}
                chatId={chatId} //yha bhi chat id params wali dalni hai
                handleDeleteChat={handleDeleteChat}
                newMessagesAlert={newMessagesAlert}
              />
            )}
          </Grid>
          <Grid item xs={12} sm={8} md={5} lg={6} height={"100%"}>
            {children}
          </Grid>
          <Grid
            item
            md={4}
            lg={3}
            height={"100%"}
            sx={{
              display: { xs: "none", sm: "block" },
              padding: "2rem",
              bgcolor: "rgba(0,0,0,0.85)",
            }}
          >
            <Profile user={user} />
          </Grid>
        </Grid>
      </body>
    </html>
  );
}
