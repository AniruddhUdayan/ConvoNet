import { compare } from "bcrypt";
import { User } from "../models/user.js";
import { Chat } from "../models/chat.js";
import { Request } from "../models/request.js";
import { emitEvent, sendToken, uploadFilesToCloudinary } from "../utils/features.js";
import { ErrorHandler } from "../utils/utility.js";
import { cookieOptions } from "../utils/features.js";
import { NEW_REQUEST, REFETCH_CHATS } from "../constants/events.js";
import { getOtherMembers } from "../lib/helper.js";

//Create a new user , save it to database and save token in cookie
const newUser = async (req, res, next) => {
  const { name, userName, password, bio } = req.body;
  const file = req.file;

  if(!file) return next(new ErrorHandler("Please upload an image"), 400);

  const result = await uploadFilesToCloudinary([file]);

  const avatar = {
    public_id: result[0].public_id,
    url: result[0].url,
  };
  console.log(avatar);

  const user = await User.create({
    name,
    bio,
    userName,
    password,
    avatar,
  });
  sendToken(res, user, 201, "User created successfully");
};

// Login user and save token in cookie
const login = async (req, res, next) => {
  const { userName, password } = req.body;
  const user = await User.findOne({ userName }).select("+password");
  if (!user) return next(new ErrorHandler("Invalid username"));
  const isMatch = await compare(password, user.password);
  if (!isMatch) return next(new ErrorHandler("Invalid password"));
  sendToken(res, user, 200, "User logged in successfully");
};

const getMyProfile = async (req, res, next) => {
  const user = await User.findById(req.user);
  if (!user) return next(new ErrorHandler("User not found"), 404);
  res.status(200).json({
    success: true,
    data: user,
  });
};
const logout = async (req, res) => {
  return res
    .status(200)
    .cookie("token", null, { ...cookieOptions, maxAge: 0 })
    .json({ success: true, message: "Logged out successfully" });
};
const searchUser = async (req, res) => {
  const { name = "" } = req.query;

  
  const myChats = await Chat.find({ groupChat: false, members: req.user });

  // Extract all member IDs from these chats (flattening the array of arrays)
  const allUserFromMyChats = myChats.map(chat => chat.members).flat();

  // Formulate query for users not in 'allUserFromMyChats' and optionally matching the 'name' regex
  let query = { _id: { $nin: allUserFromMyChats } };
  if (name) {
      query.name = { $regex: new RegExp(name, 'i') };  // Using RegExp for dynamic expressions
  }

  // Execute the query to find all users except the current user and their chat members
  const allUsersExceptMeAndFriends = await User.find(query);

  // Map the results to include only relevant data
  const users = allUsersExceptMeAndFriends.map(({ _id, name, avatar }) => ({
      _id,
      name,
      avatar: avatar.url,  // Make sure 'avatar' and 'url' are correctly referenced
  }));

  // Return the results as a JSON response
  return res.status(200).json({ success: true, users });
};


const sendRequest = async (req, res, next) => {
  const { userId } = req.body;

  const request = await Request.findOne({
    $or: [
      { sender: req.user, receiver: userId },
      { sender: userId, receiver: req.user },
    ],
  });

  if (request) return next(new ErrorHandler("Request already sent"), 400);

  await Request.create({
    sender: req.user,
    receiver: userId,
  });

  emitEvent(req, NEW_REQUEST, [userId], "request");

  return res
    .status(200)
    .json({ success: true, message: "Request sent successfully" });
};

const acceptRequest = async (req, res, next) => {
  const { requestId, accept } = req.body;

  const request = await Request.findById(requestId)
    .populate("sender", "name")
    .populate("receiver", "name");

  if (!request) return next(new ErrorHandler("Request not found"), 404);

  if (request.receiver._id.toString() !== req.user)
    return next(new ErrorHandler("Unauthorized"), 401);

  if (!accept) {
    await request.deleteOne();
    return res
      .status(200)
      .json({ success: true, message: "Request declined successfully" });
  }

  const members = [request.sender._id, request.receiver._id];

  await Promise.all([
    Chat.create({
      members,
      name: `${request.sender.name} - ${request.receiver.name}`,
    }),
    request.deleteOne(),
  ]);

  emitEvent(req, REFETCH_CHATS, members);

  return res.status(200).json({
    success: true,
    message: "Request accepted successfully",
    senderId: request.sender._id,
  });
};

const getAllNotifications = async (req, res) => {
  const request = await Request.find({ receiver: req.user }).populate(
    "sender",
    "name avatar"
  );

  const allRequests = request.map(({ _id, sender }) => ({
    _id,
    sender: { _id: sender.id, name: sender.name, avatar: sender.avatar.url },
  }));

  return res.status(200).json({ success: true, requests: allRequests });
};

const getMyFriends = async (req, res) => {
  const chatId = req.query.chatId;

  const chats = await Chat.find({
    members: req.user,
    groupChat: false,
  }).populate("members", "name avatar");
  const friends = chats.map(({members}) => {
    const otherUser = getOtherMembers(members, req.user);
    return {
      _id: otherUser?._id,
      name: otherUser?.name,
      avatar: otherUser?.avatar?.url,
    };
  });
  if (chatId) {
    const chat = await Chat.findById(chatId);
    const availaibleFriends = friends.filter(
      (friend) => !chat.members.includes(friend._id)
    );
    return res.status(200).json({ success: true, friends: availaibleFriends });
  } else {
    return res.status(200).json({ success: true, friends });
  }
};

export {
  login,
  newUser,
  getMyProfile,
  logout,
  searchUser,
  sendRequest,
  acceptRequest,
  getAllNotifications,
  getMyFriends,
};
