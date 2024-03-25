import { Schema, model } from "mongoose";

const schema = new Schema({
  name: { type: String, required: true },
  userName: { type: String, required: true, unique: true },
  password: { type: String, required: true , select: false}, // select: false is used to not return password in response
  avatar : {
    public_id: { type: String, required: true },
    url: { type: String, required: true }
  }
});

export const User = model.User || model("User", schema); // model.User is for testing purposes
