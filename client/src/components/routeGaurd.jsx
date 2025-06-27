import { useContext } from "react";
import { GlobalContext } from "../GlobalContext.jsx";
import Auth from "../pages/Auth.jsx";
import Home from "../pages/Home.jsx";

export function ProtectedRoute({ children }) {
  const { isAuth } = useContext(GlobalContext);
  return isAuth ? children : <Auth />;
}

export function PublicRoute({ children }) {
  const { isAuth } = useContext(GlobalContext);
  return isAuth ? <Home /> : children; 
}
