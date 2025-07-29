import { Server } from "socket.io";
import { model } from "./gptConfig.js";
import { Chat } from "../models/ChatModel.js";
import { Lecture } from "../models/lectureModel.js";
import { isSocketAuthenticated } from "../middlewares/IsSocketAuthenticated.js";
import { prompt } from "./Prompt.js";


export const connectToSocket = (server) => {
  const chatHistory = {};
  const io = new Server(server, {
    cors: {
      origin: "https://lectora-ai.onrender.com",
      // origin :"http://localhost:5173",
      credentials: true,
    },
  });

  io.use(isSocketAuthenticated);

  io.on("connection", (socket) => {
    console.log(`Socket connection established successfully with ${socket.id} !😀 `);
    let lectureRef = "General Query";

    socket.on("chat_init", async ({ topic }) => {
      try {
        if (topic !== "General Query") {
          const lecture = await Lecture.findOne({
            topic,
            userEmail: socket.user.email,
          });

          if (lecture) {
            lectureRef = {
              topic: lecture.topic,
              theory: lecture.theory,
              codeSnippet: lecture.codeSnippet,
              exercise: lecture.exercise,
              quizzes: lecture.quizzes,
            };
          } else {
            lectureRef = "General Query";
          }
          console.log("Chat Initialised ! successfully!");
        }
      } catch (err) {
        console.error("Error in chat_init:", err);
        socket.emit(
          "llm_response",
          "Error initializing chat. Please try again."
        );
      }
    });

    socket.on("user_query", async ({ topic, query }) => {
      try {
        const sessionKey = `${socket.user.email}::${topic}`;
        if (!chatHistory[sessionKey]) chatHistory[sessionKey] = [];
        chatHistory[sessionKey].push({
          role: "user",
          message: query,
        });
        const gptReponse = await model.generateContent(
          prompt(chatHistory[sessionKey], lectureRef)
        );

        const text = await gptReponse.response.text();

        if (!text || text.length === 0) {
          socket.emit(
            "llm_response",
            "Sorry, I couldn't understand your query. Please try again."
          );
          return;
        }

        chatHistory[sessionKey].push({ role: "bot", message: text });
        let chats = await Chat.findOne({ topic, userEmail: socket.user.email });
        if (!chats) {
          chats = new Chat({
            userEmail: socket.user.email,
            topic: topic,
            messages: [],
          });
        }
        chats.messages.push({ role: "user", message: query });
        chats.messages.push({ role: "bot", message: text });
        await chats.save();
        socket.emit("llm_response", text);
        console.log("Query answered ! 😎");
      } catch (err) {
        console.log("Error from Chatbot:", err);
        socket.emit(
          "llm_response",
          "Chat bot functionality is disabled temporarily!"
        );
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected!");
    });
  });

  return io;
};
