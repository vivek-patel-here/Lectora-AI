import Header from "../components/Header";
import { BsFillArrowRightSquareFill } from "react-icons/bs";
function Dashboard() {
  const lecture = ["l1", "l2", "l3", "l4"];
  return (
    <div className="min-h-screen  w-screen flex flex-col items-center">
      <Header heading={"Dashboard"} />
      <p className="py-4 w-19/20 text-[#101020ab] text-md">
        Welcome back! Here's an overview of what has been accomplished so far.
      </p>
      <h1 className="w-19/20 h-fit py-2 text-2xl text-[#10101099]">
        Your recent Lectures.
      </h1>
      <div className=" min-h-60 w-19/20 flex flex-wrap items-center justify-between px-2 py-1">
        {lecture.map((l) => {
          return (
            <div className="flex flex-col justify-around border  border-[#40404050]  h-60 w-70 p-2 rounded-xl hover:shadow-2xl hover:scale-105 transition-all">
              <div
                className={`h-18 w-18  rounded-xl text-3xl text-white border flex justify-center items-center`}
              ></div>
              <h1 className="w-full text-xl/relaxed font-semibold hover:text-violet-600 ">{l}</h1>
              <p className="w-full text-md text-[#303030] "></p>
            </div>
          );
        })}
        <BsFillArrowRightSquareFill className="text-3xl text-[#20202060]"/>
      </div>
    </div>
  );
}

export default Dashboard;
