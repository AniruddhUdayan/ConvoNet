import { Schema, Types, model } from "mongoose";

const schema = new Schema(
  {
    status: { type: String , default: "pending" , enum : ["pending", "accepted" , "rejected"] },
    sender: { type: Types.ObjectId, ref: "User", required: true },
    receiver: {  type: Types.ObjectId, ref: "User", required: true  },
  },
  { timestamps: true }
); // timestamps: true is used to add createdAt and updatedAt fields in the document

export const Request = model.Request || model("Request", schema); // model.Message is for testing purposes
