import { Schema, Types, model } from "mongoose";

const schema = new Schema(
  {
    name: { type: String, required: true },
    groupChat: { type: Boolean, default: false },
    creator: { type: Types.ObjectId, ref: "User" }, // ref is used to reference the User model
    members: [{ type: Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
); // timestamps: true is used to add createdAt and updatedAt fields in the document

export const Chat = model.Chat || model("Chat", schema); // model.Chat is for testing purposes
