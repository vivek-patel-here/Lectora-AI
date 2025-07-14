import express from "express";
const router = express.Router({ mergeParams: true });
import { body } from "express-validator";
import { isAuthenticated } from "../middlewares/IsAuthenticated";
import { validateReqSchema } from "../middlewares/validateReqSchema";
import {Chat} from "../models/ChatModel.js"


router.post(
  "/",
  isAuthenticated,
  [body("topic").isString()],
  validateReqSchema,
  async (req, res) => {
    const {email}=req.user;
    const {topic} = req.body;
    const findChat = await Chat.findOne({userEmail:email,topic});
    if(!findChat){
        console.log("Error from Chats : Try to fetch uninitialised Chat Schema!⛔");
        return res.status(400).json({success:false,message:"Chat not inititalised yet!",chats:[],email});
    }
    return res.statue(200).json({success:true,message:"Chats fetched successsfully!",chats:findChat,email});
  }
);

export default router;
