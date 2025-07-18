import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cookieParser from "cookie-parser";
import CORS from "cors";
import { ConnectToDB } from "./middlewares/DBConnect.js";
import AuthRoute from "./Routes/Auth.js";
import OtpRoute from "./Routes/OtpRoute.js";
import LectureRoute from "./Routes/LectureRoute.js";
import codeRoute from "./Routes/CodeRunnerRoute.js";
import ChatRoute from "./Routes/ChatRoute.js";
import { createServer } from "node:http";
import { connectToSocket } from "./Configs/socketConfig.js";
import { loadLanguageImages } from "./Configs/loadLanguageImages.js";
const app = express();
const server = createServer(app);
connectToSocket(server);

//Database - Connection
ConnectToDB()
  .then((res) => {
    console.log("Connected to DB successfully 😇!");
  })
  .catch((err) => {
    console.log("unable to connect to DB");
    console.log("Error :", err);
  });

//loading heavy language images
// loadLanguageImages()
//   .then((result) => {
//     console.log("Language images loaded successfully!");
//   })
//   .catch((err) => {
//     console.error("Error loading language images:", err);
//   });

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  CORS({
    origin: "https://lectora-ai.onrender.com",
    credentials: true,
  })
);

//routes
app.use("/auth", AuthRoute);
app.use("/otp", OtpRoute);
app.use("/code", codeRoute);
app.use("/lecture", LectureRoute);
app.use("/chat", ChatRoute);

//error handler
app.use((err, req, res, next) => {
  console.log(err);
  res
    .status(500)
    .json({
      success: false,
      message: "Internal Server Error ! Try again later.",
    });
});

//listening
server.listen(3000, () => {
  console.log("Server is listening at port 3000!");
});
