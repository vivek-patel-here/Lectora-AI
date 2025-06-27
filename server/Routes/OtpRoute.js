import express from "express";
import { wrapAsync } from "../middlewares/wrapAsync.js";
const router = express.Router({ mergeParams: true });
import { body } from "express-validator";
import { User } from "../models/userModel.js";
import { validateReqSchema } from "../middlewares/validateReqSchema.js";
import {
  sendOtpController,
  verifyOtpController,
} from "../controllers/OtpController.js";

router.post(
  "/get",
  [body("email").isEmail()],
  validateReqSchema,
  wrapAsync(sendOtpController)
);

router.post(
  "/verify",
  [body("email").isEmail(), body("otp").isNumeric()],
  validateReqSchema,
  verifyOtpController,
  async (req, res) => {
    const { isVerified, email } = req.body;
    const savedUser = await User.findOne({ email });
    if (!savedUser)
      return res
        .status(404)
        .json({ success: false, message: "No User found!" });
    savedUser.isVerifiedEmail = isVerified;
    await savedUser.save();

    res.status(200).json({
      success: true,
      message: "Verification Successful!",
      emailVerified: true,
    });
  }
);

export default router;
