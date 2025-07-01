import { createContext, useState } from "react";
import { toast } from "react-toastify";
export const GlobalContext = createContext();

const GlobalContextProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const url = "http://localhost:3000";
  const ErrorMsg = (msg) => {
    return toast.error(msg, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const successMsg = (msg) => {
    return toast.success(msg, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const [topic, setTopic] = useState("");
  const [theory, setTheory] = useState("");
  const [detailedExplanation, setDetailedExplanation] = useState("");
  const [codeSnippet, setCodeSnippet] = useState("");
  const [youtubeIds, setYoutubeIds] = useState([]);
  const [exercise, setExercise] = useState([]);
  const [quizzes, setQuizzes] = useState([]);

  //function to fetch generated lecture based on user query!
  const fetchCourse = async (query) => {
    try {
      const response = await fetch(`${url}/lecture/get`, {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({ userPrompt: query }),
        credentials:"include"
      });

      const parsedResponse = await response.json();
      if (!parsedResponse.success) {
        return ErrorMsg(parsedResponse.message);
      }
      console.log(parsedResponse);
      //setting the states
      setTopic(parsedResponse.data.topic);
      setTheory(parsedResponse.data.theory);
      setDetailedExplanation(parsedResponse.data.detailedExplanation);
      setCodeSnippet(parsedResponse.data.codeSnippet);
      setYoutubeIds(parsedResponse.data.youtubeIds);
      setExercise(parsedResponse.data.exercise);
      setQuizzes(parsedResponse.data.quizzes);
      return successMsg("Lecture Generate Successfully!");
    } catch (err) {
      console.error(err);
      return ErrorMsg("Error! Please reload the page and try again");
    }
  };

   const LogoutUser = async () => {
      const response = await fetch(`${url}/auth/log-out`, {
        method: "GET",
        headers: {
          "content-type": "apllication/json",
        },
        credentials: "include",
      });
  
      const parsedResponse = await response.json();
  
      if (!parsedResponse.success) return ErrorMsg(parsedResponse.message);
      setIsAuth(false);
      navigate("/");
      return successMsg("Logout Successful!");
    };

  return (
    <GlobalContext.Provider
      value={{
        isAuth,
        setIsAuth,
        url,
        ErrorMsg,
        successMsg,
        fetchCourse,
        topic,
        theory,
        detailedExplanation,
        codeSnippet,
        youtubeIds,
        exercise,
        quizzes,
        LogoutUser
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
