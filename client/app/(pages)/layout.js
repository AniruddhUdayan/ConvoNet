
'use client'
import { Inter } from "next/font/google";
import "./../globals.css";
import { CssBaseline } from "@mui/material";
import Header from "@/components/layout/Header";
import { Grid } from "@mui/material";
import ChatList from "@/components/specific/ChatList";
import { sampleChats } from "@/constants/sampleData";
import Profile from "@/components/specific/Profile";

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({ children , params}) {

  const handleDeleteChat = (e, chatId, groupChat) => {
    e.preventDefault();
    console.log("Chat Deleted", chatId, groupChat);
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        {" "}
        <Header />
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
           <ChatList 
           chats={sampleChats} 
           chatId={"2"} //yha bhi chat id params wali dalni hai
          //  newMessagesAlert={[
          //   {
          //     chatId: "1", //Yha params se chat id milegi
          //     count: 4,
          //   }
          //  ]}
          //   onlineUsers={["1","2"]}
          handleDeleteChat={handleDeleteChat}
           />
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
            <Profile />
          </Grid>
        </Grid>
      </body>
    </html>
  );
}
