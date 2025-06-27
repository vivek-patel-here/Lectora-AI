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

 
  return (
    <GlobalContext.Provider
      value={{ isAuth, setIsAuth, url, ErrorMsg, successMsg }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
