import { Server } from "socket.io";
import {model} from "./gptConfig.js"
const prompt=(msg)=>{
  return `Assume that you are a professor , You have to answer the following user Query in a very formal and 
          understanding manner .Try to be more specific and avoid generic response . Be to the point and avoid irrelevent and extra explainantion. Return the reponse in pure text only .
          UserQuery : ${msg} `;
}
 
export const connectToSocket = (server) => {
  const chatHistory = [];

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

    socket.on("user_query", async(message) => {
      try{
        console.log("message Received from frontend", message);
        const gptReponse = await model.generateContent(prompt(message.query));
        const text =await gptReponse.response.text();
        console.log("GPT :" ,text);
        socket.emit("llm_response", text);
      }catch(err){
        console.log("Error from Chatbot:",err);
        socket.emit("llm_response","Chat bot functionality is disabled temporarly!")
      }
    });

    socket.on("disconnect",()=>{"User disconnected!"})
  });

  return io;
};
