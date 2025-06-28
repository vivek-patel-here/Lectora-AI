import { RiCloseFill } from "react-icons/ri";
import { CgMenuRight } from "react-icons/cg";
import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar({ logoutHandler }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className={"bg-transparent  fixed w-11/12 border-b-1 top-0 border-gray-400 z-50 m-auto text-white left-1/2 -translate-x-1/2"}>
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl flex items-center ">
          <Link to="/" className="flex items-center gap-2.5">
          <h1 className="text-xl">Lectora-AI</h1>
          <img src="/Logo.PNG" alt="legalEase" className="h-8 w-8" />
          </Link>
        </div>

        {/* Desktop Links */}
        <ul className="hidden md:flex space-x-8 w-3/4 ml-10">
          <li className="hover:text-gray-400 cursor-pointer text-sm">
            {" "}
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li className="hover:text-gray-400 cursor-pointer text-sm">
            {" "}
            <Link to="/chat">Chats</Link>
          </li>
          <li className="hover:text-gray-400 cursor-pointer text-sm">
            {" "}
            <Link to="/service">Services</Link>
          </li>
          <li className="hover:text-gray-400 cursor-pointer text-sm">
            {" "}
            <Link to="/about">Organisation</Link>
          </li>
        </ul>

        <button className="hidden md:block hover:text-gray-400" onClick={logoutHandler}>
          Logout
        </button>

        {/* Hamburger Menu - Mobile */}
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {isOpen ? (
              <RiCloseFill className="text-2xl" />
            ) : (
              <CgMenuRight className="text-2xl" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-transparent px-4 pb-4 shadow">
          <ul className="space-y-3 text-white font-medium">
            <li className="hover:text-gray-400 cursor-pointer">
              {" "}
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li className="hover:text-gray-400 cursor-pointer">
              {" "}
              <Link to="/chat">Chats</Link>
            </li>
            <li className="hover:text-gray-400 cursor-pointer">
              {" "}
              <Link to="/service">Services</Link>
            </li>
            <li className="hover:text-gray-400 cursor-pointer">
              {" "}
              <Link to="/about">Organisation</Link>
            </li>
            <li
              className="hover:text-gray-400 cursor-pointer"
              onClick={logoutHandler}
            >
              {" "}
              Logout
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
