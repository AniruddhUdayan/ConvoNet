import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { v4 as uuid } from "uuid";
import {v2 as cloudinary} from "cloudinary";
import { getBase64, getSockets } from "../lib/helper.js";

const cookieOptions = {
  maxAge: 15 * 24 * 60 * 60 * 1000,
  sameSite: 'None',
  httpOnly: true,
  secure: true,
};

const connectDB = (uri) => {
  mongoose
    .connect(uri, { dbName: "ConvoNet" })
    .then((data) => console.log("Connected to DB"))
    .catch((err) => console.log(err));
};

const sendToken = (res, user, code, message) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  return res.status(code).cookie("token", token, cookieOptions).json({
    success: true,
    message,
  });
};

const emitEvent = (req, event, users, data) => {
 const io = req.app.get("io");
 const userSocket = getSockets(users);
 io.to(userSocket).emit(event, data);
};

const uploadFilesToCloudinary = async (files) => {
  const uploadPromises = files.map((file) => {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload(
       getBase64(file),
        { resource_type: "auto", public_id: uuid() },
        (err, result) => {
          if (err) return reject(err);
          resolve(result);
        }
      );
    });
  });
  try {
    const results = await Promise.all(uploadPromises);
    const formattedResults = results.map((result) => ({
      public_id: result.public_id,
      url: result.secure_url,
    }));
    return formattedResults;
    
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    throw new Error(`Error uploading files to Cloudinary: ${error.message}`);
  }
};

const deleteFilesFromCloudinary = async (public_ids) => {};

export {
  connectDB,
  sendToken,
  cookieOptions,
  emitEvent,
  deleteFilesFromCloudinary,
  uploadFilesToCloudinary,
};
