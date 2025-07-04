import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "node:crypto";
import { User } from "../models/userModel.js";


//signup controller
export const signupController = async (req, res) => {
  const { username, email, password, isVerified } = req.body;

  const savedUser = await User.findOne({ email });
  if (savedUser) {
    console.log("Error from Signup : User already exists!");
    const provider = savedUser.provider;
    if (provider === "Credential") {
      return res.status(401).json({
        success: false,
        message: "An user with this email already exists! Try login.",
      });
    }else{
      return res.status(409).json({
        success: false,
        message: "This email is already registered using Google. Please use Google login.",
        anotherProvider :true
      });
    }
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newRefreshToken = crypto.randomBytes(32).toString("hex");
  const new_refreshTokenExpiry = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
    provider: "Credential",
    isVerifiedEmail: isVerified ? isVerified : false,
    refreshToken: newRefreshToken,
    refreshTokenExpiry: new_refreshTokenExpiry,
  });

  const registeredUser = await newUser.save();
  if (!registeredUser) {
    console.log("Error from Signup : 'Unable to save the user in DB.' ");
    return res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again later.",
    });
  }

  const authToken = jwt.sign(
    { id: registeredUser._id, email: registeredUser.email },
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

  res.status(200).json({ success: true, message: "Sign in Successful!",curUser:username});
};

//Login controller
export const loginController = async (req, res) => {
  const { email, password } = req.body;

  const savedUser = await User.findOne({ email ,provider:"Credential"});
  if (!savedUser) {
    return res
      .status(404)
      .json({ success: false, message: "No user found ! Try Signup" });
  }

  const ismatchPassword = await bcrypt.compare(password, savedUser.password);
  if (!ismatchPassword)
    return res
      .status(409)
      .json({ success: false, message: "Wrong Credentials!" });

  const newRefreshToken = crypto.randomBytes(32).toString("hex");
  const new_refreshTokenExpiry = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  savedUser.refreshToken = newRefreshToken;
  savedUser.refreshTokenExpiry=new_refreshTokenExpiry;

  const updatedUser = await savedUser.save();

if (!updatedUser) {
    console.log("Error from Login : 'Unable to save the user in DB.' ");
    return res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again later.",
    });
  }

  const authToken = jwt.sign(
    { id: updatedUser._id, email: updatedUser.email },
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

  res.status(200).json({ success: true, message: "Log in Successfull!" , curUser:savedUser.username });

};
