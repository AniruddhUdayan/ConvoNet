import { compare } from "bcrypt";
import { User } from "../models/user.js";
import { sendToken } from "../utils/features.js";
import { ErrorHandler } from "../utils/utility.js";
import { cookieOptions } from "../utils/features.js";

//Create a new user , save it to database and save token in cookie
const newUser = async (req, res) => {
  const { name, userName, password, bio } = req.body;

  const avatar = {
    public_id: "asd",
    url: "asdd",
  };

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

const getMyProfile = async (req, res) => {
  //req.user will give us user id with help of auth middleware
  // console.log(req.user);
  const user = await User.findById(req.user);
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
    const {name} = req.query;
  return res
    .status(200)
    .json({ success: true, message: name });
};

export { login, newUser, getMyProfile, logout , searchUser };
