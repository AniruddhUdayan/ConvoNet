import express from "express";
import { connectDB } from "./utils/features.js";
import dotenv from "dotenv";
import { errorMiddleWare } from "./middlewares/error.js";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
import { createServer } from "http";
import { v4 as uuid } from "uuid";
import cors from "cors";
import {v2 as cloudinary} from "cloudinary";

import userRoute from "./routes/user.js";
import chatRoute from "./routes/chat.js";
import adminRoute from "./routes/admin.js";
import { createUsers } from "./seeders/user.js";
import { NEW_MESSAGE } from "./constants/events.js";
import { getSockets } from "./lib/helper.js";
import { Message } from "./models/message.js";
import { corsOptions } from "./constants/config.js";
import { socketAuthenticator } from "./middlewares/auth.js";

dotenv.config({
  path: "./.env",
});

const mongoURI = process.env.MONGO_URI;
const port = process.env.PORT || 3000;
const userSocketIDs = new Map();

connectDB(mongoURI);
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
// createUsers(10);

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors : corsOptions
});

app.set("io", io);

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

app.use("/user", userRoute);
app.use("/chat", chatRoute);
app.use("/admin", adminRoute);

io.use((socket, next) => {
  cookieParser()(socket.request, socket.request.res, async(err)=>{
    await socketAuthenticator(err, socket , next)
  });
});

io.on("connection", (socket) => {
  const user = socket.user;
  userSocketIDs.set(user._id.toString(), socket.id);
  console.log("a user connected", socket.id);
  socket.on(NEW_MESSAGE, async ({ chatId, members, messages }) => {
    const messageForRealTime = {
      content: messages,
      _id: uuid(),
      sender: {
        _id: user._id,
        name: user.name,
      },
      chat: chatId,
      createdAt: new Date().toISOString(),
    };

    const messageForDB = {
      content: messages,
      sender: user._id,
      chat: chatId,
    };
    const usersSocket = getSockets(members);
    io.to(usersSocket).emit(NEW_MESSAGE, {
      chatId,
      message : messageForRealTime,
    });
    io.to(usersSocket).emit(NEW_MESSAGE, {chatId});
    await Message.create(messageForDB);
  });
  socket.on("disconnect", () => {
    console.log("user disconnected");
    userSocketIDs.delete(user._id.toString());
  });
});

app.use(errorMiddleWare);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export { userSocketIDs };
