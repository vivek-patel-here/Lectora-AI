import { useContext } from "react";
import { GlobalContext } from "../GlobalContext";
import { Link } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { FaBookOpen } from "react-icons/fa";
import { FaCode } from "react-icons/fa";
import { RiGeminiFill } from "react-icons/ri";
import { IoSettingsSharp } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";

export default function Sidebar() {
  const { LogoutUser } = useContext(GlobalContext);
 
  return (
    <div className="h-screen w-70 border-r-1 borde z-30 flex gap-5 flex-col pl-5 pt-5">
      <div className="flex w-full h-fit items-center gap-5">
        <img src="/Logo.PNG" alt="lectoraAI" className="h-10 w-10 rounded-full" />
        <h1 className="bg-linear-to-r from-cyan-500 via-violet-500 to-purple-600 text-transparent bg-clip-text text-xl font-semibold">Lectora-AI</h1>
      </div>
      <button className="border w-7/10 h-10 rounded-md text-white bg-violet-500 ">+ Create Lecture</button>
      <nav className=" w-full h-3/4 flex flex-col py-2">
        <p className="text-[#303030] text-sm border-b-1 border-[#50505027] py-2 mb-3">Main Menu</p>
        <ul className="  w-full h-full flex flex-col gap-3">
          <li className=""><Link to="/dashboard" className="flex items-center gap-5  text-[#000000ca]"><MdDashboard/> Dashboard</Link></li>
          <li className=""><Link to="/lectures" className="flex items-center gap-5  text-[#000000ca]"><FaBookOpen/> My Lectures</Link></li>
          <li className=""><Link to="/code" className="flex items-center gap-5  text-[#000000ca]"><FaCode/> Code Editor</Link></li>
          <li className=""><Link to="/chat" className="flex items-center gap-5  text-[#000000ca]"><RiGeminiFill/> Ask Doubt</Link></li>
          <li className=""><Link to="/setting" className="flex items-center gap-5  text-[#000000ca]"><IoSettingsSharp/> Setting</Link></li>
        <button onClick={LogoutUser} className="flex items-center gap-5  text-[#000000ca]"><CiLogout/> Logout</button>
        </ul>
      </nav>
    </div>
  );
}
