import { useContext, useEffect } from "react";
import { GlobalContext } from "../GlobalContext";
import { Link, useNavigate } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { FaBookOpen } from "react-icons/fa";
import { FaCode } from "react-icons/fa";
import { RiGeminiFill } from "react-icons/ri";
import { IoSettingsSharp } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import { IoIosClose } from "react-icons/io";
export default function Sidebar() {
  const { LogoutUser, sidebarOpen, setSidebarOpen } = useContext(GlobalContext);
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
      className="h-screen w-70 border-r-1 transition-all shadow-black shadow-2xl   border-[#50505027] z-50  bg-white flex gap-5 flex-col pl-5 pt-5 absolute "
      style={{
        top: "0px",
        left: sidebarOpen ? "0px" : "-100%",
      }}
    >
      <IoIosClose className="absolute right-5 top-5 text-2xl text-[#202020ab] hover:scale(110)" onClick={()=>setSidebarOpen(false)}/>
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
      <button className="border w-8/10 h-10 rounded-md text-white bg-purple-600 " onClick={()=>{navigate("/create");setSidebarOpen(false);}}>
        + Create Lecture
      </button>
      <nav className=" w-full h-3/4 flex flex-col ">
        <p className="text-[#303030] text-sm  py-2 mb-3">Main Menu</p>
        <ul className="  w-full h-full flex flex-col gap-3">
          <li className="hover:bg-[#0000000e] p-1 rounded-md w-19/20"  onClick={()=>setSidebarOpen(false)}>
            <Link
              to="/dashboard"
              className="flex items-center gap-5  text-[#000000ca] text-md"
            >
              <MdDashboard /> Dashboard
            </Link>
          </li>
          <li className="hover:bg-[#0000000e] p-1 rounded-md w-19/20" onClick={()=>setSidebarOpen(false)}>
            <Link
              to="/lectures"
              className="flex items-center gap-5  text-[#000000ca] text-md"
            >
              <FaBookOpen /> My Lectures
            </Link>
          </li>
          <li className="hover:bg-[#0000000e] p-1 rounded-md w-19/20" onClick={()=>setSidebarOpen(false)}>
            <Link
              to="/code"
              className="flex items-center gap-5  text-[#000000ca] text-md"
            >
              <FaCode /> Code Editor
            </Link>
          </li>
          <li className="hover:bg-[#0000000e] p-1 rounded-md w-19/20" onClick={()=>setSidebarOpen(false)}>
            <Link
              to="/chat"
              className="flex items-center gap-5  text-[#000000ca] text-md"
            >
              <RiGeminiFill /> Ask Doubt
            </Link>
          </li>
          <li className="hover:bg-[#0000000e] p-1 rounded-md w-19/20" onClick={()=>setSidebarOpen(false)}>
            <Link
              to="/setting"
              className="flex items-center gap-5  text-[#000000ca] text-md"
            >
              <IoSettingsSharp /> Setting
            </Link>
          </li>
          <button
            onClick={LogoutUser}
            className="flex items-center gap-5 hover:bg-[#0000000e] p-1 rounded-md w-19/20 text-[#000000ca] text-md"
          >
            <CiLogout /> Logout
          </button>
        </ul>
      </nav>
    </div>
  );
}
