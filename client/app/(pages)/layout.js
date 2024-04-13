"use client";
import { Inter } from "next/font/google";
import "./../globals.css";
import { CssBaseline } from "@mui/material";
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
import { useErrors } from "@/hooks/hook";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const params = useParams();
  const chatId = params.chatId;

  const dispatch = useDispatch();

  const { isMobile } = useSelector((state) => state.misc);
  const { user } = useSelector((state) => state.auth);

  const { isLoading, data, isError, error, refetch } = useMyChatsQuery("");

  const handleDeleteChat = (e, chatId, groupChat) => {
    e.preventDefault();
    console.log("Chat Deleted", chatId, groupChat);
  };

  const handleMobileClose = () => {
    dispatch(setIsMobile(false));
  };

  useErrors([{ isError , error}])

  return (
    <html lang="en">
      <body className={inter.className}>
        {" "}
        <Header />
        {isLoading ? (
          <Skeleton />
        ) : (
          <Drawer open={isMobile} onClose={handleMobileClose}>
            <ChatList
              w="70vw"
              chats={data?.chats}
              chatId={chatId} //yha bhi chat id params wali dalni hai
              handleDeleteChat={handleDeleteChat}
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
                chats={data?.chats}
                chatId={chatId} //yha bhi chat id params wali dalni hai
                handleDeleteChat={handleDeleteChat}
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
            <Profile user={user}/>
          </Grid>
        </Grid>
      </body>
    </html>
  );
}
