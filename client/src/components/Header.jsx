import React, { useContext } from "react";
import { FaRegUser } from "react-icons/fa";
import { FiSidebar } from "react-icons/fi";
import { MdDarkMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";
import { GlobalContext } from "../GlobalContext.jsx";
function Header({heading}) {
  const { mode, setMode ,setSidebarOpen,curUser } = useContext(GlobalContext);

  return (
    <div className="border-b-1   border-[#50505027] w-full h-15 flex items-center justify-between px-5 ">
      <div className="flex h-full w-fit items-center gap-5 text-xl">
        <FiSidebar onClick={()=>setSidebarOpen(true)}/>
          <h1 className="text-xl font-semibold bg-linear-to-r from-blue-600 via-violet-600 to-cyan-400  text-transparent bg-clip-text" >{heading}</h1>
        {/* {mode === 0 ? (
          <MdDarkMode onClick={() => setMode(1)} />
        ) : (
          <MdOutlineLightMode onClick={() => setMode(0)} />
        )} */}
      </div>
      <div className="flex w-fit h-full items-center justify-center gap-5">
        <div className="flex flex-col items-end">
          <h1>{curUser}</h1>
          <p className="text-sm text-[#2020208a]">Free Tier</p>
        </div>
        <div className=" h-10 w-10 grid place-content-center rounded-full bg-purple-100 text-purple-600">
          <FaRegUser />
        </div>
      </div>
    </div>
  );
}

export default Header;
