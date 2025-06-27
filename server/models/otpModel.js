import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  attempts: {
    type: Number,
    default: 5,
  },
  createdAt: { type: Date, default: Date.now, expires: 300 }, // expires in 5 mins
});

export const OTP = mongoose.model("OTP", otpSchema);
