import { useContext, useEffect } from "react";
import { GlobalContext } from "../GlobalContext.jsx";
import { Link, useNavigate } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { FaCode } from "react-icons/fa";
import { RiGeminiFill } from "react-icons/ri";
import { IoSettingsSharp } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import { IoIosClose } from "react-icons/io";
import clsx from "clsx";
export default function Sidebar() {
  const { LogoutUser, sidebarOpen, setSidebarOpen ,mode} = useContext(GlobalContext);
  const navigate = useNavigate();
  useEffect(()=>{
    if(sidebarOpen){
      document.body.style.overflow="hidden";
    }else{
      document.body.style.overflow="auto";
    }

    return ()=>{
      document.body.style.overflow
    }
  })
  return (
    <div
      className={clsx("h-screen w-70 border-r-1 transition-all  shadow-2xl  z-48   flex gap-5 flex-col pl-5 pt-5 absolute ",mode===2?"bg-gray-900 shadow-gray-600 border-gray-800":"shadow-black bg-white border-[#50505027]")}
      style={{
        top: "0px",
        left: sidebarOpen ? "0px" : "-100%",
      }}
    >
      <IoIosClose className={clsx("absolute right-5 top-5 text-2xl  hover:scale(110)",mode==2?"text-white":"text-[#202020ab]")} onClick={()=>setSidebarOpen(false)}/>
      <div className="flex w-full h-fit items-center gap-5  ">
        <img
          src="/Logo.PNG"
          alt="lectoraAI"
          className="h-10 w-10 rounded-full"
        />
        <h1 className="bg-linear-to-r from-cyan-500 via-violet-500 to-purple-600 text-transparent bg-clip-text text-xl font-semibold">
          Lectora-AI
        </h1>
      </div>
      <button className={clsx(" w-8/10 h-10 rounded-md text-white bg-purple-600 ",mode===2 && "hover:bg-purple-800")} onClick={()=>{navigate("/create");setSidebarOpen(false);}}>
        + Create Lecture
      </button>
      <nav className=" w-full h-3/4 flex flex-col ">
        <p className={clsx(" text-sm  py-2 mb-3",mode===2?"text-gray-300":"text-[#303030]")}>Main Menu</p>
        <ul className="  w-full h-full flex flex-col gap-3">
          <li className={clsx(" p-1 rounded-md w-19/20",mode===2?"hover:bg-gray-950 text-gray-400":"hover:bg-[#0000000e] text-[#000000ca]")}  onClick={()=>setSidebarOpen(false)}>
            <Link
              to="/dashboard"
              className="flex items-center gap-5   text-md"
            >
              <MdDashboard /> Dashboard
            </Link>
          </li>
          
          <li className={clsx(" p-1 rounded-md w-19/20",mode===2?"hover:bg-gray-950 text-gray-400":"hover:bg-[#0000000e] text-[#000000ca]")} onClick={()=>setSidebarOpen(false)}>
            <Link
              to="/code"
              className="flex items-center gap-5   text-md"
            >
              <FaCode /> Code Editor
            </Link>
          </li>
          <li className={clsx(" p-1 rounded-md w-19/20",mode===2?"hover:bg-gray-950 text-gray-400":"hover:bg-[#0000000e] text-[#000000ca]")} onClick={()=>setSidebarOpen(false)}>
            <Link
              to="/chat"
              className="flex items-center gap-5   text-md"
            >
              <RiGeminiFill /> Ask Doubt
            </Link>
          </li>
          <li className={clsx(" p-1 rounded-md w-19/20",mode===2?"hover:bg-gray-950 text-gray-400":"hover:bg-[#0000000e] text-[#000000ca]")} onClick={()=>setSidebarOpen(false)}>
            <Link
              to="/setting"
              className="flex items-center gap-5  text-md"
            >
              <IoSettingsSharp /> Setting
            </Link>
          </li>
          <button
            onClick={LogoutUser}
            className={clsx("flex items-center gap-5  p-1 rounded-md w-19/20  text-md",mode===2?"text-gray-400 hover:bg-gray-950":"text-[#000000ca] hover:bg-[#0000000e] ")}
          >
            <CiLogout /> Logout
          </button>
        </ul>
      </nav>
    </div>
  );
}
