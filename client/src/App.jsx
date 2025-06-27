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

  const [positionX, setPositionX] = useState(100);
  const [positionY, setPositionY] = useState(100);
  const changeCoordinate = (e) => {
    setPositionX(e.clientX);
    setPositionY(e.clientY);
  };

  useEffect(() => {
    IsUserLogin();
  }, []);

  return (
    <>
      <div
        className=" relative overflow-hidden cursor-none font-sans"
        onMouseMove={changeCoordinate}
      >
        {/*my custom cursor */}
        <div
          style={{
            position: "absolute",
            top: positionY,
            left: positionX,
            transform: "translate(-50%, -50%)",
            height: "20px",
            width: "20px",
            borderRadius: "50%",
            border:"1px solid white",
            pointerEvents: "none",
            zIndex: 1000,
            display:"grid",
            placeItems:"center"
          }}
        >
          <div className="h-1.5 w-1.5  rounded-2xl bg-white"></div>
        </div>

        <Routes>
          <Route
            path="/"
            element={<Navigate to={isAuth ? "/dashboard" : "/auth"} />}
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
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Home func={LogoutUser} />
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
