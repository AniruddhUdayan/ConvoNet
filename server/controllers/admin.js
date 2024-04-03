import { User } from "../models/user.js";
import { Chat } from "../models/chat.js";
import { Message } from "../models/message.js";

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

export { getAllUsers, getAllChats , getAllMessages };
