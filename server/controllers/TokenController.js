import { User } from "../models/userModel.js";
import crypto from "node:crypto";
import jwt from "jsonwebtoken";

export const refreshTokenController = async (req, res) => {
  const { refreshToken } = req.signedCookies;
  if (!refreshToken) return res.status(401).send("Unauthorized");
  const user = await User.findOne({ refreshToken });
  if (!user || user.refreshTokenExpiry < Date.now()) {
    return res
      .status(403)
      .send("Refresh token expired or invalid. Login Again");
  }

  const newRefreshToken = crypto.randomBytes(32).toString("hex");
  const new_refreshTokenExpiry = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  user.refreshToken = newRefreshToken;
  user.refreshTokenExpiry = new_refreshTokenExpiry;

  const updatedUser = await user.save();

  const newAuthToken = jwt.sign(
    { id: updatedUser._id, email: updatedUser.email },
    process.env.JWT_SECRET,
    {
      expiresIn: "15m",
    }
  );

  res.cookie("authToken", newAuthToken, {
    signed: true,
    httpOnly: true,
    secure: true,
    sameSite: "none",
    expires: new Date(Date.now() + 15 * 60 * 1000),
  });

  res.cookie("refreshToken", newRefreshToken, {
    httpOnly: true,
    signed: true,
    secure: true,
    sameSite: "none",
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });

  res.status(200).json({ success: true });
};


export const LogoutController =async(req,res)=>{

  const {id} = req.user; //from a middleware 
  const savedUser = await User.findById(id);
  if(savedUser){
    savedUser.refreshToken =null;
    savedUser.refreshTokenExpiry=null;
    await savedUser.save();
  }
  res.clearCookie("authToken",{
    signed:true,
    secure:true,
    sameSite:"none",
    httpOnly:true
  });
  res.clearCookie("refreshToken",{
     signed:true,
    secure:true,
    sameSite:"none",
    httpOnly:true
  });

  return res.status(200).json({success:true,message:"Logout successful!"})
}
