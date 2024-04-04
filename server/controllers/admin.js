import { User } from "../models/user.js";
import { Chat } from "../models/chat.js";
import { Message } from "../models/message.js";
import { ErrorHandler } from "../utils/utility.js";
import jwt from "jsonwebtoken";
import {cookieOptions} from "../utils/features.js"


const adminLogin = async (req, res , next) => {
    const {secretKey} = req.body;
    const adminSecretKey = process.env.ADMIN_SECRET_KEY || 'admin123';

    const isMatch = secretKey === adminSecretKey;
    if(!isMatch){
        return next(new ErrorHandler("Invalid Secret Key"),401);
    }

    const token = jwt.sign(secretKey , process.env.JWT_SECRET);
    return res.status(200).cookie("adminToken" , token , {...cookieOptions , maxAge :15* 60 * 1000}).json({
        status : 'success',
        message : 'Admin Logged In'
    })
}

const adminLogout = async (req, res) => {
    return res.status(200).clearCookie("adminToken").json({
        status : 'success',
        message : 'Admin Logged Out'
    })
}

const getAllUsers = async (req, res) => {
  const users = await User.find({});

  const transforUsers = await Promise.all(
    users.map(async ({ name, username, avatar, _id }) => {
      const [groups, friends] = await Promise.all([
        Chat.countDocuments({
          groupChat: true,
          members: _id,
        }),
        Chat.countDocuments({
          groupChat: false,
          members: _id,
        }),
      ]);
      return {
        name,
        username,
        avatar: avatar.url,
        _id,
        groups,
        friends,
      };
    })
  );

  return res.status(200).json({
    status: "success",
    users: transforUsers,
  });
};

const getAllChats = async (req, res) => {
  const chats = await Chat.find({})
    .populate("members", "name avatar")
    .populate("creator", "name avatar");

  const transformChats = await Promise.all(
    chats.map(async ({ members, _id, groupChat, name, creator }) => {

        const totalMessages = await Message.countDocuments({
            chat : _id
        })

      return {
        _id,
        groupChat,
        name,
        avatar: members.slice(0, 3).map((member) => member.avatar.url),
        members: members.map(({ _id, name, avatar }) => {
          return { _id, name, avatar: avatar.url };
        }),
        creator : {
            name : creator.name || 'None',
            avatar : creator.avatar.url || ''
        },
        totalMembers: members.length,
        totalMessages
      };
    })
  );

  return res.status(200).json({
    status: "success",
    chats,
  });
};

const getAllMessages = async (req, res) => {
  const messages = await Message.find({}).populate("sender", "name avatar").populate("chat", "groupChat");

  const transformedMessages = messages.map(({ _id, sender, chat, content, createdAt , attachments }) => {
    return {
      _id,
      sender: {
        _id: sender._id,
        name: sender.name,
        avatar: sender.avatar.url,
      },
      chat:chat._id,
      groupChat: chat.groupChat,
      content,
      createdAt,
      attachments
    };
  });

  return res.status(200).json({
    status: "success",
    messages:transformedMessages,
  });
};

const getDashboardStats = async (req, res) => {
    const [groupsCount , usersCount , messagesCount , totalChatCounts] = await Promise.all([
        Chat.countDocuments({groupChat : true}),
        User.countDocuments({}),
        Message.countDocuments({}),
        Chat.countDocuments({})
    ])

    const today = new Date()
    const last7Days = new Date(today.setDate(today.getDate() - 7));

    const last7DaysMessages = await Message.find({
        createdAt : { $gte : last7Days , $lte : today }
    }).select("createdAt")

    const messages = new Array(7).fill(0)

    const dayInMiliseconds = 24 * 60 * 60 * 1000;

    last7DaysMessages.forEach(message => {
        const indexApprox = (today.getTime() - message.createdAt.getTime()) / dayInMiliseconds
        const index = Math.floor(indexApprox)

        messages[6 - index]++;
    })

    const stats = {
        groupsCount,
        usersCount,
        messagesCount,
        totalChatCounts,
        messagesChart : messages
    }

    res.status(200).json({
        status : 'success',
        stats
    })
}

const getAdminData = async (req, res , next) => {


    return res.status(200).json({
       admin : true
    })
}

export {adminLogin , adminLogout , getAllUsers, getAllChats , getAllMessages , getDashboardStats , getAdminData };
