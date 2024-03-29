import mongoose , { Schema, model  } from "mongoose";

const schema = new Schema(
  {
    name: { type: String, required: true },
    groupChat: { type: Boolean, default: false },
    creator: { type: Schema.Types.ObjectId, ref: "User" }, // ref is used to reference the User model
    members: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
); // timestamps: true is used to add createdAt and updatedAt fields in the document

export const Chat = mongoose.models.Chat || model("Chat", schema); // model.Chat is for testing purposes
