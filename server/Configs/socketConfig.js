import { Server } from "socket.io";
import { model } from "./gptConfig.js";
import { Chat } from "../models/ChatModel.js";
import {Lecture} from "../models/lectureModel.js"
const prompt = (msgList,lecture) => {
  // Construct the conversation string from message list
  const conversation = msgList
    .map((msg) => `${msg.role === "user" ? "User" : "Bot"}: ${msg.message}`)
    .join("\n");

  return `Assume you are a professor.Take this as a reference :
  ${lecture} .
   You have to answer the following user query in a formal and clear manner. Be specific and to the point. Avoid irrelevant explanation. Reply in pure text only.
  
Conversation:
${conversation}
Bot:`;
};

export const connectToSocket = (server) => {
  const chatHistory = {};
  let lectureRef ="General Query";

  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log(
      `Socket connection established successfully with ${socket.id} !😀 `
    );

    socket.on("chat_init", async (message) => {
      const sessionKey = `${message.email}::${message?.topic}`;
      chatHistory[sessionKey] = message?.chats;
      const lecture = await Lecture.findOne({userEmail:message?.email,topic:message?.topic});
      lectureRef= lecture || "General Query" ;
      console.log("Lecture Initialised ! successfully!")
    });

    socket.on("user_query", async (message) => {
      try {
        const sessionKey = `${message.email}::${message.topic}`;
        const topic = message?.topic;
        if (!chatHistory[sessionKey]) chatHistory[sessionKey] = [];
        chatHistory[sessionKey].push({
          role: "user",
          message: message.query,
        });
        const gptReponse = await model.generateContent(
          prompt(chatHistory[sessionKey],lectureRef)
        );
        const text = await gptReponse.response.text();
        if (!text || text.length === 0) {
          socket.emit(
            "llm_response",
            "Sorry, I couldn't understand your query. Please try again."
          );
          return ;
        }
        socket.emit("llm_response", text);
        chatHistory[sessionKey].push({ role: "bot", message: text });
        let chats = await Chat.findOne({ topic, userEmail: message?.email });
        if (!chats) {
          chats = new Chat({
            userEmail: message?.email,
            topic: message?.topic,
            messages: [],
          });
        }
        chats.messages.push({ role: "user", message: message.query });
        chats.messages.push({ role: "bot", message: text });
        await chats.save();
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
