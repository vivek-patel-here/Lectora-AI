import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { usePDF } from "react-to-pdf";

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

  const { toPDF, targetRef } = usePDF({ filename: "notes.pdf" });

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

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [curUser, setCurUser] = useState("");

  const [mode, setMode] = useState(0); //0 ->light &&   1 -> dark

  const [topic, setTopic] = useState("");
  const [theory, setTheory] = useState("");
  const [detailedExplanation, setDetailedExplanation] = useState("");
  const [codeSnippet, setCodeSnippet] = useState("");
  const [youtubeIds, setYoutubeIds] = useState([]);
  const [exercise, setExercise] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [allLecture, setAllLectures] = useState([]);

  //function to fetch generated lecture based on user query!
  const fetchCourse = async (query) => {
    try {
      const response = await fetch(`${url}/lecture/get`, {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({ userPrompt: query }),
        credentials: "include",
      });

      const parsedResponse = await response.json();
      if (!parsedResponse.success) {
        ErrorMsg(parsedResponse.message);
        return false;
      }
      //setting the states
      setTopic(parsedResponse.data.topic);
      setTheory(parsedResponse.data.theory);
      setDetailedExplanation(parsedResponse.data.detailedExplanation);
      setCodeSnippet(parsedResponse.data.codeSnippet);
      setYoutubeIds(parsedResponse.data.youtubeIds);
      setExercise(parsedResponse.data.exercise);
      setQuizzes(parsedResponse.data.quizzes);
      successMsg("Lecture Generate Successfully!");
      return true;
    } catch (err) {
      console.error(err);
      ErrorMsg("Error! Please reload the page and try again");
      return false;
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
    setCurUser("");
    setSidebarOpen(false);
    return successMsg("Logout Successful!");
  };

  const IsUserLogin = async () => {
    try {
      const response = await fetch(`${url}/auth/verify`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
      });

      const parsedResponse = await response.json();
      if (!parsedResponse.success) return;
      setIsAuth(true);
      setCurUser(parsedResponse.curUser);
      navigate("/");
    } catch (err) {
      return;
    }
  };

  const GetUserLectures = async () => {
    try {
      const response = await fetch(`${url}/lecture/get`, {
        method: "GET",
        headers: {
          "content-Type": "application/json",
        },
        credentials: "include",
      });

      const parsedResponse = await response.json();
      if (!parsedResponse.success) return ErrorMsg(parsedResponse.message);
      return setAllLectures(parsedResponse.userLecture.reverse());
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    IsUserLogin();
    GetUserLectures();
  }, []);

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
        LogoutUser,
        mode,
        setMode,
        sidebarOpen,
        setSidebarOpen,
        curUser,
        setCurUser,
        toPDF,
        targetRef,
        allLecture,
        setAllLectures,
        setTopic,
        setTheory,
        setDetailedExplanation,
        setCodeSnippet,
        setYoutubeIds,
        setExercise,
        setQuizzes,
        GetUserLectures
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
