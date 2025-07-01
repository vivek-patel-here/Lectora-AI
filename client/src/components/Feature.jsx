import React from "react";
import { RiGeminiLine } from "react-icons/ri";
import { IoBookOutline } from "react-icons/io5";
import { IoExtensionPuzzleOutline } from "react-icons/io5";
import { CiStar } from "react-icons/ci";
import { FaUserCheck } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";

function Featurebox({ feature }) {
  const colorMap = {
    blue: "bg-linear-to-r from-blue-700 via-blue-500 to-cyan-400",
    green: "bg-linear-to-br from-lime-500 via-green-400 to-green-500",
    orange: "bg-linear-to-tl from-orange-700 via-amber-500 to-yellow-400",
    red: "bg-linear-to-tl from-blue-700 via-blue-500 to-cyan-400",
    purple: "bg-linear-to-r from-violet-700   to-blue-400",
    lime: "bg-linear-to-r from-red-700 via-orange-500 to-yellow-400",
  };

  return (
    <div className="flex flex-col justify-around  h-60 w-90 p-2 rounded-xl hover:shadow-2xl hover:scale-105 transition-all">
      <div
        className={`h-18 w-18  rounded-xl text-3xl text-white ${
          colorMap[feature?.color]
        } border flex justify-center items-center`}
      >
        {feature?.icon}
      </div>
      <h1 className="w-full text-xl/relaxed font-semibold hover:text-violet-600 ">
        {feature?.heading}
      </h1>
      <p className="w-full text-md text-[#303030] ">{feature?.content}</p>
    </div>
  );
}

function Feature() {
  const feat = [
    {
      icon: <RiGeminiLine />,
      color: "blue",
      heading: "AI Content Generation",
      content:
        "Generate comprehensive course content, lessons, and materials with advanced AI that understands your subject matter.",
    },
    {
      icon: <IoBookOutline />,
      color: "purple",
      heading: "Interactive Quizzes",
      content:
        "Automatically create engaging quizzes and assessments that test comprehension and reinforce learning.",
    },
    {
      icon: <IoExtensionPuzzleOutline />,
      color: "green",
      heading: "Learning Paths",
      content:
        "Design structured learning journeys that guide students through your content in the optimal sequence.",
    },
    {
      icon: <CiStar />,
      color: "orange",
      heading: "Quality Assurance",
      content:
        "Built-in quality checks ensure your generated content meets educational standards and best practices.",
    },
    {
      icon: <FaUserCheck />,
      color: "red",
      heading: "Personalization",
      content:
        "Tailor content to different learning styles and skill levels for maximum student engagement.",
    },
    {
      icon: <FaSearch />,
      color: "lime",
      heading: "Smart Analytics",
      content:
        "Track student progress and course performance with intelligent insights and recommendations.",
    },
  ];

  return (
    <div className="w-screen min-h-screen p-8 gap-4  flex flex-col items-center justify-center">
      <h1 className="h-6/10 w-19/20 md:w-7/10 text-[#202020] text-4xl/tight md:text-5xl/tight text-center font-bold">
        Powerful AI Features of{" "}
        <span className="bg-linear-to-br from-cyan-400 via-blue-600 to-purple-600  text-[transparent] bg-clip-text">
          Lectora-AI
        </span>
      </h1>
      <p className="w-19/20 md:w-6/10 text-center text-xl text-[#303030] ">
        Our advanced AI technology transforms the way courses are created,
        making it faster, smarter, and more effective than ever before.
      </p>
      <div className="h-fit w-19/20  flex items-center justify-center gap-5 flex-wrap flex-col md:flex-row">
        {feat.map((f, i) => {
          return <Featurebox key={i} feature={f} />;
        })}
      </div>
    </div>
  );
}

export default Feature;
