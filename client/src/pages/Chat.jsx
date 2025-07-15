import { useContext, useEffect, useRef, useState } from "react";
import Header from "../components/Header.jsx";
import { RiRobot2Line } from "react-icons/ri";
import { TiUserOutline } from "react-icons/ti";
import { GlobalContext } from "../GlobalContext.jsx";

//io connection
import { io } from "socket.io-client";

export default function Chat() {
  const socketRef = useRef(null);
  const [query, setQuery] = useState("");
  const { allLecture, url, ErrorMsg } = useContext(GlobalContext);
  const [chats, setChats] = useState([]);
  const [topic, setTopic] = useState("General Query");
  const [wait, setWait] = useState(false);

  const scrollRef = useRef(null);

  const topicChangeHandler = (e) => {
    e.preventDefault();
    setTopic(e.target.value);
    setChats([]);
    fetchPrevChats();
    socketRef.current.emit("chat_init", { topic });
  };

  const fetchPrevChats = async () => {
    try {
      const response = await fetch(`${url}/chat`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ topic }),
        credentials: "include",
      });
      const parsedResponse = await response.json();
      if (!parsedResponse.success) {
        setChats([]);
        return;
      }
      setChats(parsedResponse?.chats);
    } catch (err) {
      console.error(err);
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setChats((prev) => {
      return [...prev, { role: "user", message: query }];
    });
    setWait(true);
    socketRef.current.emit("user_query", { query, topic });
    setQuery("");
  };

  useEffect(() => {
    fetchPrevChats();

    socketRef.current = io("http://localhost:3000", {
      withCredentials: true,
    });

    socketRef.current.emit("chat_init", { topic });

    socketRef.current.on("llm_response", (msg) => {
      setWait(false);
      setChats((prev) => {
        return [...prev, { role: "bot", message: msg }];
      });
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [topic]);

  useEffect(() => {
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [chats]);
  return (
    <div className="min-h-screen w-screen flex flex-col items-center ">
      <Header heading={"Ask your Doubts"} />
      <h1 className="flex pt-5  w-full justify-center items-center gap-3 font-bold text-3xl">
        {" "}
        <RiRobot2Line className="text-blue-500" /> Course Assistant
      </h1>
      <p className=" w-full text-center text-md  text-gray-600 p-4">
        Ask Questions about your courses and get instant help
      </p>
      <div className="w-screen h-fit   flex flex-col lg:flex-row items-center lg:items-start justify-center gap-3 lg:gap-3 pb-5">
        <div className="w-19/20 lg:w-1/6 h-fit flex flex-col p-2 gap-2 lg:gap-0 items-center justify-around  lg:h-80 border lg:rounded bg-white border-gray-300">
          <h1 className="font-semibold w-full pl-3 text-xl">Select Course</h1>
          <select
            name="course"
            className="w-18/20 pl-3 p-1 rounded border-gray-300 border outline-0"
            onChange={topicChangeHandler}
          >
            <option value="General Query">General Query</option>
            {allLecture?.map((lect, indx) => {
              return (
                <option key={indx} value={lect?.topic}>
                  {lect?.topic}
                </option>
              );
            })}
            {/* and other option also */}
          </select>
          <h1 className="font-semibold w-full pl-3">Quick Questions :</h1>
          <div
            className="w-18/20 pl-3 p-1 rounded border-gray-300 border"
            onClick={() => setQuery("Can you explain the main concepts?")}
          >
            Main Concepts
          </div>
          <div
            className="w-18/20 pl-3 p-1 rounded border-gray-300 border"
            onClick={() => setQuery("Help with assignment")}
          >
            Assignment help
          </div>
          <div
            className="w-18/20 pl-3 p-1 rounded border-gray-300 border"
            onClick={() => setQuery("Exam preparation tips")}
          >
            Exam prep
          </div>
        </div>

        <div className="w-19/20 lg:w-3/6 h-fit lg:h-9/10 border lg:rounded bg-white border-gray-300">
          <h1 className="w-full p-4 text-2xl font-semibold">
            Chat with Course Assistant
          </h1>
          {/*message display */}
          <div
            className=" h-100 overflow-x-hidden overflow-y-auto py-2"
            ref={scrollRef}
          >
            {chats.length == 0 ? (
              <div className="w-full h-3/4 flex flex-col items-center justify-center gap-1">
                <RiRobot2Line className="font-bold text-4xl text-blue-300" />
                <p className="text-gray-400 text-center w-full px-1">
                  Hi! I'm your course assistant. Select a course and ask me
                  anything!
                </p>
                <p className="text-gray-400 text-center w-full px-1">
                  You can ask about concepts, assignments, exam preparation, or
                  any course-related doubts.
                </p>
              </div>
            ) : (
              chats?.map((chat, indx) => {
                return (
                  <div
                    key={indx}
                    className={
                      chat?.role == "user"
                        ? "  flex my-5  gap-2 items-center justify-end pr-3 "
                        : "flex items-center  gap-2 justify-start pl-3 "
                    }
                  >
                    {chat?.role == "bot" && (
                      <RiRobot2Line className="text-blue-600 text-xl" />
                    )}
                    <p
                      className={
                        chat?.role == "user"
                          ? " max-w-3/4  py-1 px-2 rounded bg-blue-600 text-white text-sm"
                          : " bg-gray-200 max-w-3/4   py-1 px-2 rounded text-sm "
                      }
                    >
                      {chat.message}
                    </p>{" "}
                    {chat?.role == "user" && (
                      <TiUserOutline className="text-xl text-gray-600" />
                    )}
                  </div>
                );
              })
            )}
           {wait && <div className="flex items-center  gap-2 justify-start my-5 pl-3">
            <RiRobot2Line className="text-blue-600 text-xl" />
            <p className=" h-3 w-3 rounded-full animate-bounce bg-linear-to-r from-purple-400 via-blue-600 to-cyan-400" ></p>
            </div>}
          </div>

          {/* text box */}
          <form
            onSubmit={onSubmitHandler}
            className="border-t border-gray-300 h-15 flex items-center gap-2 justify-center"
          >
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
              }}
              className="text-md text-gray-700 pl-3 border w-8/10 p-1 rounded outline-0 border-gray-300"
              placeholder="Ask a question about the course..."
            />
            <button className="border w-1/10 p-1 rounded border-gray-300 hover:bg-linear-to-r hover:from-cyan-300 hover:via-blue-500 hover:to-purple-600 hover:text-white">
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
