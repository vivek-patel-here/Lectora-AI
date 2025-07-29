import { User } from "../models/userModel.js";
import {Lecture} from "../models/lectureModel.js";
import {Chat} from "../models/ChatModel.js";
import bcrypt from "bcrypt";


//logic to change application theme 
export const changeModeUtil = async (req, res) => {
  const { id, email } = req.user;
  const { mode } = req.body;
  const user = await User.findByIdAndUpdate(id, { mode });
  if (!user) return res.status(500).json({ success: false });
  res.status(200).json({ success: true });
};


//logic to fetch basic user info
export const getUserinfoUtil = async (req, res) => {
  const { id, email } = req.user;
  const user = await User.findById(id);
  if (!user) return res.status(500).json({ success: false, bio: "" });
  res.status(200).json({
    success: true,
    email: user.email,
    username: user.username,
    bio: user.bio,
  });
};


//logic to change bio description of the user
export const changeBioUtil = async (req, res) => {
  const { id, email } = req.user;
  const { bio } = req.body;
  const user = await User.findByIdAndUpdate(id, { bio });
  if (!user)
    return res
      .status(500)
      .json({ success: false, message: "Unable to Save your changes!" });
  res
    .status(200)
    .json({ success: true, message: "Changes Saved successfully!" });
};

//logic to change password of the user
export const changePasswordUtil = async (req, res) => {
    const { id, email } = req.user;
    const { oldPassword, newPassword } = req.body;
    const user = await User.findOne({ _id: id, email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Unauthorised !" });
    }
    if(user.provider!='Credential') return res.status(401).json({ success: false, message: "You can only change password if you signed up with credentials!" });
    const matchedPassword = await bcrypt.compare(oldPassword,user.password);
    if (!matchedPassword)
      return res
        .status(401)
        .json({
          success: false,
          message: "Wrong Credential ! Kindly Enter the correct old password.",
        });

    const newChangedPassword = await bcrypt.hash(newPassword, 10);
    user.password = newChangedPassword;
    const savedUser = await user.save();
    if (!savedUser)
      return res
        .status(500)
        .json({ success: false, message: "Unable to Save your changes!" });
    return res
      .status(200)
      .json({ success: true, message: "Password Changed Successfully!" });
  }


//logic to delete account

export const deleteAccountUtil = async (req, res) => {
    const { id, email } = req.user; //from a middleware
    const deletedUser = await User.findByIdAndDelete(id);
    await Lecture.deleteMany({ userEmail: email });
    await Chat.deleteMany({ userEmail: email });

    if (!deletedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.clearCookie("authToken", {
      signed: true,
      secure: true,
      sameSite: "none",
      httpOnly: true,
    });
    res.clearCookie("refreshToken", {
      signed: true,
      secure: true,
      sameSite: "none",
      httpOnly: true,
    });

    res.status(200).json({
      success: true,
      message: "Account deleted successfully",
    });
  }