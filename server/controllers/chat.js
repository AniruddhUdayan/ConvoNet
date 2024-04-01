import mongoose from "mongoose";
import { ErrorHandler } from "../utils/utility.js";
import { Chat } from "../models/chat.js";
import { User } from "../models/user.js";
import { emitEvent } from "../utils/features.js";
import { ALERT, REFETCH_CHATS } from "../constants/events.js";
import { getOtherMembers } from "../lib/helper.js";

const newGroupChat = async (req, res, next) => {
  const { name, members } = req.body;

  if (members.length < 2) {
    return next(new ErrorHandler("Please add at least 2 members", 400));
  }

  // Assuming req.user is a string that represents the user's ObjectId
  // If req.user is an object, you might need req.user._id or similar
  const allMembers = [...members, req.user].filter((member) =>
    mongoose.Types.ObjectId.isValid(member)
  );

  if (allMembers.length !== members.length + 1) {
    return next(new ErrorHandler("One or more member IDs are invalid.", 400));
  }

  try {
    await Chat.create({
      name,
      groupChat: true,
      creator: req.user, // Make sure this is a valid ObjectId string
      members: allMembers,
    });

    emitEvent(
      req,
      ALERT,
      allMembers,
      `You have been added to a new group chat, ${name}`
    );
    emitEvent(req, REFETCH_CHATS, members);

    return res.status(201).json({
      success: true,
      message: "Group chat created successfully",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};
const getMyChats = async (req, res, next) => {
  const chats = await Chat.find({ members: req.user }).populate(
    "members",
    "name avatar"
  );

  const transformedChats = chats.map(({ _id, name, members, groupChat }) => {
    // Added missing opening brace here

    const otherMember = getOtherMembers(members, req.user);

    return {
      _id,
      groupChat,
      avatar: groupChat
        ? members.slice(0, 3).map(({ avatar }) => avatar.url)
        : [otherMember.avatar.url],
      name: groupChat ? name : otherMember.name,
      members: members.reduce((prev, curr) => {
        if (curr.id.toString() !== req.user.toString()) {
          prev.push(curr._id);
        }
        return prev;
      }, []),
    };
  });

  return res.status(200).json({
    success: true,
    message: transformedChats,
  });
};

const getMyGroups = async (req, res, next) => {
  const chats = await Chat.find({
    members: req.user,
    groupChat: true,
  }).populate("members", "name avatar");

  const groups = chats.map(({ _id, name, members, groupChat }) => {
    return {
      _id,
      groupChat,
      name,
      avatar: members.slice(0, 3).map(({ avatar }) => avatar.url),
    };
  });
  return res.status(200).json({
    success: true,
    groups,
  });
};

const addMembers = async (req, res, next) => {
  const { chatId, members } = req.body;

  if (!members || members.length === 0) {
    return next(new ErrorHandler("Please add members", 400));
  }

  const chat = await Chat.findOne({ _id: chatId });

  if (!chat) {
    return next(new ErrorHandler("Chat not found", 404));
  }

  if (!chat.groupChat) {
    return next(new ErrorHandler("This is not a group chat", 400));
  }

  if (chat.creator.toString() !== req.user.toString()) {
    return next(new ErrorHandler("You are not allowed to add members", 403));
  }

  const allNewMembersPromise = members.map((i) => User.findById(i, "name"));

  const allNewMembers = await Promise.all(allNewMembersPromise);

  const uniqueMembers = allNewMembers
    .filter((i) => !chat.members.includes(i._id.toString()))
    .map((i) => i._id);

  chat.members.push(...uniqueMembers);

  if (chat.members.length > 100) {
    return next(new ErrorHandler("You can't add more than 100 members", 400));
  }

  await chat.save();

  const allUserName = allNewMembers.map((i) => i.name).join(", ");

  emitEvent(
    req,
    ALERT,
    chat.members,
    `${allUserName} been added to the group chat`
  );

  emitEvent(req, REFETCH_CHATS, chat.members);

  return res.status(200).json({
    success: true,
    message: "Members added successfully",
  });
};

const removeMembers = async (req, res, next) => {
  const { userId, chatId } = req.body;

  const [chat, removedUser] = await Promise.all([
    Chat.findById(chatId),
    User.findById(userId, "name"),
  ]);

  if (!chat) {
    return next(new ErrorHandler("Chat not found", 404));
  }

  if (!chat.groupChat) {
    return next(new ErrorHandler("This is not a group chat", 400));
  }

  if (chat.creator.toString() !== req.user.toString()) {
    return next(new ErrorHandler("You are not allowed to add members", 403));
  }

  if (chat.members.length <= 3) {
    return next(
      new ErrorHandler(
        "You can't remove members from a group chat with only 3 members",
        400
      )
    );
  }

  chat.members = chat.members.filter(
    (member) => member.toString() !== userId.toString()
  );

  await chat.save();

  emitEvent(
    req,
    ALERT,
    chat.members,
    `${removedUser} has been removed from the group chat`
  );
  emitEvent(req, REFETCH_CHATS, chat.members);

  return res.status(200).json({
    success: true,
    message: "Member removed successfully",
  });
};

const leaveGroup = async (req, res, next) => {
  const chatId = req.params.id;

  const chat = await Chat.findById(chatId);

  if (!chat) {
    return next(new ErrorHandler("Chat not found", 404));
  }

  if (!chat.groupChat) {
    return next(new ErrorHandler("This is not a group chat", 400));
  }

  const remaingMembers = chat.members.filter(
    (member) => member.toString() !== req.user.toString()
  );
  if(remaingMembers.length < 3){
    return next(new ErrorHandler("You can't leave a group chat with only 3 members", 400));
  }

  if (chat.creator.toString() === req.user.toString()) {
    const randomNumber = Math.floor(Math.random() * remaingMembers.length);
    const newCreator = remaingMembers[randomNumber];
    chat.creator = newCreator;
  }

  chat.members = remaingMembers;

  const [user] = await Promise.all([
    User.findById(req.user, "name"),
    chat.save(),
  ]);
  emitEvent(req, ALERT, chat.members, `${user.name} member has left the group chat`);

  return res.status(200).json({
    success: true,
    message: "You have left the group chat",
  });
};

export {
  newGroupChat,
  getMyChats,
  getMyGroups,
  addMembers,
  removeMembers,
  leaveGroup,
};
