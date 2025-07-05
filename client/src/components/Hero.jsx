import React, { useContext } from "react";
import { RiGeminiFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
function Hero() {
const navigate =useNavigate();

  return (
    <div className="w-screen min-h-screen p-8 gap-4 bg-linear-to-br from-cyan-100 via-white to-purple-200 flex flex-col items-center justify-center">
      <p className=" rounded-full bg-white py-2 px-5 border-[#6f00ff62] border text-[#6f00ff] font-semibold flex justify-around items-center gap-2">
        <RiGeminiFill /> Powered By Advanced AI Technology
      </p>
      <h1 className="h-6/10 w-19/20 md:w-7/10 text-[#202020] text-5xl/tight md:text-7xl/tight text-center font-bold ">
        Generate{" "}
        <span className="bg-linear-to-br from-cyan-400 via-blue-600 to-purple-600  text-[transparent] bg-clip-text">
          AI-Powered{" "}
        </span>
        Lectures in Minutes
      </h1>
      <p className="w-19/20 md:w-6/10 text-center text-xl text-[#303030]">
        Transform any topic into a full, structured lecture with theory, code,
        exercises, and quizzes — instantly. Whether you're a student, teacher,
        or self-learner, just ask and start mastering.
      </p>
      <div className="h-15 w-19/20 md:w-6/10 flex items-center px-1 gap-5 justify-center flex-wrap">
        <button onClick={()=>navigate("/create")} className="border bg-linear-to-r from-cyan-500 via-blue-500 to-purple-600  py-2 px-5 text-white rounded-full">
          Start Creating free &rarr;
        </button>
        <button className="border py-2 px-5 rounded-full text-[#303030] ">Watch Demo</button>
      </div>

      <div className="h-fit w-19/20 md:8/10 flex items-center justify-center gap-5 flex-wrap flex-col md:flex-row"> 
      <div className="text-center w-1/5">
        <h1 className="w-full text-4xl/relaxed font-bold text-purple-600">50,000+</h1>
        <p className="w-full text-xl font-semibold">Courses Generated</p>
      </div>
      <div className="text-center w-1/5">
        <h1 className="w-full text-4xl/relaxed font-bold text-cyan-500">10x</h1>
        <p className="w-full text-xl font-semibold">faster creation</p>
      </div>
      <div className="text-center w-1/5">
        <h1 className="w-full text-4xl/relaxed font-bold text-blue-600">95%</h1>
        <p className="w-full text-xl font-semibold">Satisfaction Rate</p>
      </div>

      </div>
    </div>
  );
}

export default Hero;
