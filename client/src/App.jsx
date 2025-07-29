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
import Chat from "./pages/Chat.jsx";
import Lecture from "./pages/Lecture.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Cursor from "./components/Cursor.jsx";
import Footer from "./components/Footer.jsx";
import Theory from "./pages/Theory.jsx";
import VideoModal from "./components/VideoModal.jsx";
import Setting from "./pages/Setting.jsx";
import GlobalSpinner from "./components/GlobalSpinner.jsx";

function App() {
  const { isAuth, spinner, setSpinner, mode, setMode } =
    useContext(GlobalContext);
  const navigate = useNavigate();

  //custom cursor
  const [positionX, setPositionX] = useState(100);
  const [positionY, setPositionY] = useState(100);
  const changeCoordinate = (e) => {
    setPositionX(e.pageX);
    setPositionY(e.pageY);
  };
  const [open, setOpen] = useState(false);
  const [vid, setVid] = useState(false);
  const openModelFunction = (videoId) => {
    setVid(videoId);
    setOpen(true);
  };

  useEffect(() => {
    if (mode == 3) {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        return setMode(2);
      }
      return setMode(1);
    }
  }, [isAuth]);

  return (
    <>
      <div
        className=" relative overflow-hidden cursor-none font-sans min-h-screen"
        onMouseMove={changeCoordinate}
      >
        {open && <VideoModal vid={vid} open={open} setOpen={setOpen} />}
        {spinner && <GlobalSpinner />}
        {isAuth && <Sidebar />}
        {/*my custom cursor */}

        <Cursor positionX={positionX} positionY={positionY} />

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
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/create"
            element={
              <ProtectedRoute>
                <Lecture />
              </ProtectedRoute>
            }
          />

          <Route
            path="/chat"
            element={
              <ProtectedRoute>
                <Chat />
              </ProtectedRoute>
            }
          />

          <Route
            path="/code"
            element={
              <ProtectedRoute>
                <CodeEditor />
              </ProtectedRoute>
            }
          />

          <Route
            path="/theory"
            element={
              <ProtectedRoute>
                <Theory openModelFunction={openModelFunction} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/setting"
            element={
              <ProtectedRoute>
                <Setting />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Pagenotfound />} />
        </Routes>
        {isAuth && !spinner && <Footer />}
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
