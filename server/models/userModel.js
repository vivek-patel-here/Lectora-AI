import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      minLength: 2,
      maxLength: 30,
    },
    email: {
      type: String,
      required: true,
      index: true,
      unique: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/],
    },
    password: {
      type: String,
      default: null,
    },
    provider: {
      type: String,
      required: true,
      enum: {
        values: ["Credential", "Google", "Github"],
        message: `{VALUE} is not supported provider`,
      },
    },
    isVerifiedEmail: {
      type: Boolean,
      required: true,
      default: false,
    },
    refreshToken: {
      type: String,
      default: null,
      unique: true,
      sparse: true,
    },
    refreshTokenExpiry: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
