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

function App() {
  const { isAuth, url, setIsAuth, ErrorMsg, successMsg } =
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
        {/*my custom cursor */}
        <div
        className="bg-linear-to-r from-purple-600 to-cyan-400"
          style={{
            position: "absolute",
            top: positionY,
            left: positionX,
            transform: "translate(-50%, -50%)",
            height: "18px",
            width: "18px",
            borderRadius: "50%",
            pointerEvents: "none",
            zIndex: 1000,
            display:"grid",
            placeItems:"center"
          }}
        >
        </div>

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
