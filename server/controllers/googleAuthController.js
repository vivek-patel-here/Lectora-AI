import { oauth2client } from "../Configs/GoogleConfig.js";
import { User } from "../models/userModel.js";
import {google} from "googleapis"
import jwt from "jsonwebtoken";
import crypto from "node:crypto";

const googleLogin = async (req, res) => {
  const { code } = req.query;
  if (!code)
    return res.status(400).json({
      success: false,
      message: "Unable to Login via Google! Try something else.",
    });
  const googleRes = await oauth2client.getToken(code);
  oauth2client.setCredentials(googleRes.tokens);
  const oauth2 = google.oauth2({
    auth: oauth2client,
    version: "v2",
  });

  const { data: parsedRes } = await oauth2.userinfo.get();
  const { email, name } = parsedRes;
  let savedUser = await User.findOne({ email });
  if (!savedUser) {
    savedUser = new User({
      username: name,
      email: email,
      password: null,
      provider: "Google",
      isVerifiedEmail: true,
      refreshToken: null,
      refreshTokenExpiry: null,
    });
  }

  const newRefreshToken = crypto.randomBytes(32).toString("hex");
  const new_refreshTokenExpiry = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  savedUser.refreshToken = newRefreshToken;
  savedUser.refreshTokenExpiry = new_refreshTokenExpiry;

  savedUser = await savedUser.save();
  if (!savedUser) {
    return res.status(500).json({
      success: false,
      message: "Unable to Register via Google ! Try something else.",
    });
  }
  const authToken = jwt.sign(
    { email: savedUser.email, id: savedUser._id },
    process.env.JWT_SECRET
  );

  res.cookie("authToken", authToken, {
    signed: true,
    secure: true,
    httpOnly: true,
    sameSite: "none",
    expires: new Date(Date.now() + 15 * 60 * 1000),
  });

  res.cookie("refreshToken", newRefreshToken, {
    signed: true,
    secure: true,
    httpOnly: true,
    sameSite: "none",
    expires: new_refreshTokenExpiry,
  });

  res.status(200).json({ success: true, message: "User Login Successfully!" });
};

export default googleLogin;
