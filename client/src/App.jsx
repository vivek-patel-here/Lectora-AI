import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "./GlobalContext.jsx";
import { ProtectedRoute, PublicRoute } from "./components/routeGaurd.jsx";
import Auth from "./pages/Auth.jsx";
import Home from "./pages/Home.jsx";
import Pagenotfound from "./pages/Pagenotfound.jsx";
import { ToastContainer } from "react-toastify";
import Dashboard from "./pages/Dashboard.jsx";
import CodeEditor from "./pages/CodeEditor.jsx";
import Chat from  "./pages/Chat.jsx"
import Lecture from "./pages/Lecture.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Cursor from "./components/Cursor.jsx";

function App() {
  const { isAuth, url, setIsAuth, ErrorMsg, successMsg ,setCurUser} =
    useContext(GlobalContext);
  const navigate = useNavigate();
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
      setCurUser(parsedResponse.curUser)
      navigate("/");
    } catch (err) {
      return;
    }
  };

 

  //custom cursor
  const [positionX, setPositionX] = useState(100);
  const [positionY, setPositionY] = useState(100);
  const changeCoordinate = (e) => {
    setPositionX(e.pageX);
    setPositionY(e.pageY);
  };

  useEffect(() => {
    IsUserLogin();
  }, []);

  return (
    <>
      <div
        className=" relative overflow-hidden cursor-none font-sans min-h-screen"
        onMouseMove={changeCoordinate}
        >
        <Sidebar/>
        {/*my custom cursor */}
       <Cursor positionX={positionX} positionY={positionY}/>

        <Routes>
          <Route
            path="/"
            element={<Navigate to={isAuth ? "/home" : "/auth"} />}
          />

          <Route
            path="/auth"
            element={
              <PublicRoute>
                <Auth />
              </PublicRoute>
            }
          />

          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard/>
              </ProtectedRoute>
            }
          />

           <Route
            path="/lectures"
            element={
              <ProtectedRoute>
                <Lecture/>
              </ProtectedRoute>
            }
          />

           <Route
            path="/chat"
            element={
              <ProtectedRoute>
                <Chat/>
              </ProtectedRoute>
            }
          />

           <Route
            path="/code"
            element={
              <ProtectedRoute>
                <CodeEditor/>
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Pagenotfound />} />
        </Routes>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover={true}
        theme="colored"
      />
    </>
  );
}

export default App;
