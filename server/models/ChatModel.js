import mongoose, { Schema } from "mongoose";

const MessageSchema = new Schema({
  role: {
    type: String,
    enum: ["user", "bot"],
    required: true,
  },
  message: {
    type: String,
    required: true,
    minLength: 2,
  },
});

const ChatSchema = new Schema({
  userEmail: {
    type: String,
    required: true,
  },
  topic: {
    type: String,
    required: true,
  },
  messages:{
    type:[MessageSchema]
  }
});


export const Chat = mongoose.models.Chat|| mongoose.model("Chat",ChatSchema);
