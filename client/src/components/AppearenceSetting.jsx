import React, { useContext } from "react";
import { GlobalContext } from "../GlobalContext.jsx";

function AppearenceSetting() {
  const { mode, setMode, url } = useContext(GlobalContext);
  const changeMode = async (md) => {
    setMode(md);
    try {
      const response = await fetch(`${url}/util/mode`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ mode: md }),
        credentials: "include",
      });
      const parsedResp = await response.json();
    } catch (err) {}
  };
  const borderColor = { border: "2px solid rgb(135, 32, 245)" };
  const borderColor2 = { border: "2px solid rgba(228, 227, 230,0.5)" };
  return (
    <div className="w-full h-full flex flex-col items-start justify-start p-5">
      <h1 className="text-3xl  font-bold ">Appearence Setting</h1>
      <p className="text-gray-500 my-5">
        Customize how the application looks and feels
      </p>
      <p className="text-lg font-semibold">Theme</p>
      <div className="h-40 w-39/40 flex items-center justify-center gap-2 ">
        <div
          className=" w-1/3 h-8/10 flex flex-col items-center justify-center gap-2 rounded"
          style={mode === 1 ? borderColor : borderColor2}
          onClick={() => {
            changeMode(1);
          }}
        >
          <div className=" h-1/2 w-8/10 bg-gray-100"></div>
          <p>Light</p>
        </div>
        <div
          className=" w-1/3 h-8/10 flex flex-col items-center justify-center gap-2 rounded"
          style={mode === 2 ? borderColor : borderColor2}
          onClick={() => {
            changeMode(2);
          }}
        >
          <div className=" h-1/2 w-8/10 bg-black"></div>
          <p>Dark</p>
        </div>
        <div
          className=" w-1/3 h-8/10 flex flex-col items-center justify-center gap-2 rounded"
          style={mode === 3 ? borderColor : borderColor2}
          onClick={() => {
            changeMode(3);
          }}
        >
          <div className=" h-1/2 w-8/10 bg-linear-to-r from-black via-gray-600 to-gray-50"></div>
          <p>Auto</p>
        </div>
      </div>
    </div>
  );
}

export default AppearenceSetting;
