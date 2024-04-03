import mongoose, { Schema, Types, model } from "mongoose";

const schema = new Schema(
  {
    content: { type: String },
    attachments: [
      {
        public_id: { type: String, required: true },
        url: { type: String, required: true },
      },
    ],
    sender: { type: Types.ObjectId, ref: "User", required: true },
    chat: { type: Types.ObjectId, ref: "Chat", required: true },
    creator: { type: Types.ObjectId, ref: "User" }, // ref is used to reference the User model
  },
  { timestamps: true }
); // timestamps: true is used to add createdAt and updatedAt fields in the document

export const Message = mongoose.models.Message || model("Message", schema); // model.Message is for testing purposes
