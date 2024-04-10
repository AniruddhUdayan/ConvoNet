import { hash } from "bcrypt";
import mongoose , { Schema, model  } from "mongoose";

const schema = new Schema({
  name: { type: String, required: true },
  userName: { type: String, required: true, unique: true },
  password: { type: String, required: true , select: false}, // select: false is used to not return password in response
  avatar : {
    public_id: { type: String, required: true },
    url: { type: String, required: true }
  }
},{ timestamps: true }); // timestamps: true is used to add createdAt and updatedAt fields in the document

schema.pre("save", async function (next){
  if(!this.isModified("password")) return next();
  this.password = await hash(this.password, 10);
})

export const User = mongoose.models.User || model("User", schema); // model.User is for testing purposes
