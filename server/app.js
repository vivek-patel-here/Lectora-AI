import dotenv from "dotenv";
dotenv.config();
import express from  "express";
import cookieParser from "cookie-parser";
import CORS from "cors";
import { ConnectToDB } from "./middlewares/DBConnect.js";
import AuthRoute from "./Routes/Auth.js"
import OtpRoute from "./Routes/OtpRoute.js"
import LectureRoute from "./Routes/LectureRoute.js"
const app = express();


//Database - Connection
ConnectToDB().then((res)=>{
    console.log("Connected to DB successfully 😇!");
}).catch((err)=>{
    console.log("unable to connect to DB");
    console.log("Error :", err);
});

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(CORS({
    origin:"http://localhost:5173",
    credentials:true
}));

//routes
app.use("/auth",AuthRoute);
app.use("/otp",OtpRoute);

app.use("/lecture",LectureRoute)

app.use((err,req,res,next)=>{
    console.log(err);
    res.status(500).json({success:false,message:"Internal Server Error ! Try again later."})
})



//listening
app.listen(3000,()=>{
    console.log("Server is listening at port 3000!");
})

