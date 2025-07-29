import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { useContext } from "react";
import { GlobalContext } from "../GlobalContext.jsx";
import clsx from "clsx";

function Footer() {
  const { mode } = useContext(GlobalContext);
  return (
    <div className={clsx("h-fit w-screen flex flex-col items-center justify-center gap-4  p-4",mode===2?"bg-blue-950":"bg-blue-600")}>
      <div className="w-8/10 h-fit flex items-center flex-wrap justify-between text-white">
        <div className="h-full w-full lg:w-3/10 p-4">
          <div className="flex items-center w-full gap-5">
            <img src="/Logo.PNG" alt="Lectora-ai" className="h-15 w-15 rounded-full"/>
            <h1 className=" text-2xl font-semibold">Lectora AI</h1>
          </div>
          <p className=" mt-2 text-sm">
            Turn any topic into a complete, code-ready lecture in seconds —
            Lectora-AI makes learning as easy as asking a question.
          </p>
        </div>

        <div className="h-full w-full lg:w-7/10 flex items-center  gap-4 justify-between flex-wrap">

          <div className=" h-full flex flex-col items-start justify-center ">
            <h1 >Contact</h1>
            <p>+91 8595818416</p>
            <p>vivek.patel.1057@gmail.com</p>
          </div>

          <div className=" h-full flex flex-col items-start justify-center">
            <h1>Social</h1>
            <a
              href="https://www.linkedin.com/in/vivek-patel2004/"
              target="_blank"
              className="flex items-center gap-4"
            >
              <FaLinkedin /> LinkedIn
            </a>
            <a href="https://github.com/vivek-patel-here" target="_blank" className="flex items-center gap-4">
              <FaGithub /> Github
            </a>
          </div>

          <div className=" h-full flex flex-col items-start justify-center ">
            <h1>Legal</h1>
            <p>Privacy Policy</p>
            <p>Terms of use</p>
            <p>Cookie Policy</p>
          </div>

        </div>
      </div>
      <div className="flex items-center justify-between  w-8/10 h-3/10 border-t-1 border-white ">
      <p className="w-fit h-1/4 grid place-content-center  text-white">
        &copy; 2025 Lectora AI. All rights reserved.
      </p>
      <p className="w-fit h-1/4 grid place-content-center text-white">
        Made with ❤️ by Vivek
      </p>
      </div>
    </div>
  );
}

export default Footer;
