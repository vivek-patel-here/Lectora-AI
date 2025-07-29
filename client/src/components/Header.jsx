import React, { useContext } from "react";
import { FaRegUser } from "react-icons/fa";
import clsx from "clsx";
import { FiSidebar } from "react-icons/fi";
import { GlobalContext } from "../GlobalContext.jsx";
function Header({ heading }) {
  const { mode, setMode, setSidebarOpen, curUser } = useContext(GlobalContext);

  return (
    <div
      className={clsx(
        "w-full h-15 flex items-center justify-between px-5 border-b ",
        mode === 2
          ? "bg-gray-900 border-gray-800 "
          : "border-[#50505027]"
      )}
    >
      <div className="flex h-full w-fit items-center gap-5 text-xl">
        <FiSidebar
          onClick={() => setSidebarOpen(true)}
          className={clsx(mode === 2 ? "text-white" : "")}
        />
        <h1 className="text-xl font-semibold bg-linear-to-r from-blue-600 via-violet-600 to-cyan-400  text-transparent bg-clip-text">
          {heading}
        </h1>
      </div>
      <div className="flex w-fit h-full items-center justify-center gap-5">
        <div className="flex flex-col items-end">
          <h1 className={mode === 2 ? "text-gray-300" : ""}>{curUser}</h1>
          <p
            className={clsx(
              "text-sm ",
              mode === 2 ? "text-gray-400" : "text-[#2020208a]"
            )}
          >
            Free Tier
          </p>
        </div>
        <div className=" h-10 w-10 grid place-content-center rounded-full bg-purple-100 text-purple-600">
          <FaRegUser />
        </div>
      </div>
    </div>
  );
}

export default Header;
