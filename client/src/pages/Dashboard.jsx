import { useContext, useEffect, useState } from "react";
import Header from "../components/Header.jsx";
import { GlobalContext } from "../GlobalContext.jsx";
import { FaBook } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { TiDocumentText } from "react-icons/ti";
import { GoVideo } from "react-icons/go";
import { SiQuizlet } from "react-icons/si";
import { LuShieldQuestion } from "react-icons/lu";
import { MdDelete } from "react-icons/md";
import { FaFire } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaCode } from "react-icons/fa";





function Coursecomponent({ lect }) {
  const [random, setRandom] = useState(null);
  const {
    setTopic,
    setTheory,
    setDetailedExplanation,
    setCodeSnippet,
    setYoutubeIds,
    setExercise,
    setQuizzes,
    successMsg,
    ErrorMsg,
    url,
    GetUserLectures,
  } = useContext(GlobalContext);

  const navigate = useNavigate();
  const color = {
    0: "from-red-300 via-red-400 to-red-600",
    1: "from-purple-300 via-purple-400 to-purple-600",
    2: "from-blue-300 via-blue-400 to-blue-600",
    3: "from-green-300 via-green-400 to-green-600",
    4: "from-orange-300 via-orange-400 to-orange-600",
    5: "from-cyan-300 via-cyan-400 to-cyan-600",
    6: "from-lime-300 via-lime-400 to-lime-600",
    7: "from-yellow-300 via-yellow-400 to-yellow-600",
    7: "from-violet-300 via-violet-400 to-violet-600",
  };

  const ViewLecture = () => {
    setTopic(lect?.topic);
    setTheory(lect?.theory);
    setDetailedExplanation(lect?.detailedExplanation);
    setCodeSnippet(lect?.codeSnippet);
    setYoutubeIds(lect?.youtubeIds);
    setExercise(lect?.exercise);
    setQuizzes(lect?.quizzes);
    navigate("/theory");
  };

  const deleteLecture = async () => {
    try {
      const response = await fetch(`${url}/lecture`, {
        method: "DELETE",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({
          id: lect._id,
        }),
        credentials: "include",
      });

      const parsedRes = await response.json();
      if (!parsedRes.success) return ErrorMsg(parsedRes.message);
      successMsg(parsedRes.message);
      return GetUserLectures();
    } catch (err) {
      console.error(err);
      return ErrorMsg("Unable to delete at this moment!");
    }
  };

  useEffect(() => {
    setRandom(Math.floor(Math.random() * 8));
  }, []);

  return (
    <div
      className="h-30 relative pl-1 lg:pl-5 hover:shadow-xl overflow-hidden border border-gray-200 gap-6 flex items-center my-5 rounded-xl" >
      <div onClick={ViewLecture} className="absolute w-9/10 top-0 left-0 h-full  bg-transparent "> </div>
      <MdDelete onClick={deleteLecture} className="absolute z-50 top-5 right-5 text-xl text-red-600 hover:scale-110 hover:shadow-2xl hover:animate-bounce" />
      <div
        className={`h-15 w-15 text-white font-bold bg-linear-to-r ${color[random]} rounded-xl sm:p-1 grid place-items-center border`}
      >
        {lect?.topic[0]}
      </div>
      <div className="w-full">
        <p className="text-sm sm:text-lg font-semibold ">
          {lect?.topic?.length <= 45
            ? lect.topic
            : lect.topic.slice(0, 48) + "..."}
        </p>
        <div className="flex w-full items-center  gap-3 lg:gap-5 ">
          {/*pages*/}
          <div className="flex flex-wrap items-center gap-1 w-20  h-fit text-gray-400">
            <TiDocumentText />
            <span className="text-sm sm:text-md ">{3}</span>{" "}
            <span className="text-sm sm:text-md ">Pages</span>
          </div>

          {/*Youtube video*/}
          <div className="flex items-center gap-1 w-fit h-fit text-gray-400">
            <GoVideo />
            <span className="text-sm sm:text-md ">
              {lect?.youtubeIds?.length}{" "}
            </span>{" "}
            <span className="text-sm sm:text-md ">videos</span>
          </div>

          {/*Exercise video*/}
          <div className="flex items-center gap-1 w-fit h-fit text-gray-400">
            <LuShieldQuestion />
            <span className="text-sm sm:text-md ">
              {lect?.exercise?.length}{" "}
            </span>{" "}
            <span className="text-sm sm:text-md ">exercises</span>
          </div>

          {/*QUiz video*/}
          <div className="flex items-center gap-1 w-fit h-fit text-gray-400">
            <SiQuizlet />
            <span className="text-sm sm:text-md ">
              {lect?.quizzes?.length}
            </span>{" "}
            <span className="text-sm sm:text-md ">quiz</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Dashboard() {
  const { allLecture,GetUserLectures, } = useContext(GlobalContext);

  const countThisMonth = () => {
    let curDate = new Date();
    curDate = curDate.toString();
    curDate = curDate.split(" ");
    curDate = curDate[3] + curDate[2];
    let cnt = 0;
    for (let i of allLecture) {
      if (!i) break;
      let dt = i?.createdAt?.split("-");
      dt = dt[0] + dt[2].slice(0,2);
      console.log("curDate" ,curDate)
      if (dt == curDate) cnt++;
    }
    return cnt;
  };
  const navigate  = useNavigate();
  useEffect(()=>{
    GetUserLectures();
  },[])
  return (
    <div className="min-h-screen  w-screen flex flex-col items-center">
      <Header heading={"Dashboard"} />
      <p className="py-4 w-19/20 text-[#010102c9] text-md">
        Welcome back! Here's an overview of what has been accomplished so far.
      </p>

      <div className="w-19/20 flex flex-wrap h-fit gap-5 p-1 items-center justify-between">
        <div className="flex relative flex-col  pt-3 pl-5 gap-3 h-40 rounded-xl w-60 border border-gray-200 hover:shadow-xl transition-all">
          <h1 className="font-semibold text-md text-gray-600">Total Courses</h1>
          <h1 className="font-bold text-4xl ">{allLecture.length}</h1>
          <p className="text-gray-500">+ {countThisMonth()} this month</p>
          <div className="absolute top-4 right-4  p-2 rounded-xl bg-blue-100 grid place-items-center">
            <FaBook className="text-4xl text-blue-600" />
          </div>
        </div>

        <div className="flex relative flex-col  pt-3 pl-5 gap-3 h-40 rounded-xl w-60 border border-gray-200 hover:shadow-xl transition-all">
          <h1 className="font-semibold text-md text-gray-600">Daily Streak</h1>
          <h1 className="font-bold text-4xl ">{3}- day</h1>
          <p className="text-gray-500">Learning Streak</p>
          <div className="absolute top-4 right-4  p-2 rounded-xl bg-yellow-100 grid place-items-center">
            <FaFire className="text-4xl text-orange-400" />
          </div>
        </div>

        <div className="flex relative flex-col  pt-3 pl-5 gap-3 h-40 rounded-xl w-60 border border-gray-200 hover:shadow-xl transition-all">
          <h1 className="font-semibold text-md text-gray-600">Total Active Users</h1>
          <h1 className="font-bold text-4xl ">50k+</h1>
          <p className="text-gray-500">+ 2500 this month</p>
          <div className="absolute top-4 right-4  p-2 rounded-xl bg-green-100 grid place-items-center">
            <FaUser className="text-4xl text-green-600" />
          </div>
        </div>

        <div className="flex relative flex-col  pt-3 pl-5 gap-3 h-40 rounded-xl w-60 border border-gray-200 hover:shadow-xl transition-all">
          <h1 className="font-semibold text-md text-gray-600">Code</h1>
          <h1 className="font-bold text-3xl ">10k+ lines</h1>
          <p className="text-gray-500">Practice brings perfection</p>
          <div className="absolute top-4 right-4  p-2 rounded-xl bg-red-100 grid place-items-center">
            <FaCode className="text-4xl text-red-600" />
          </div>
        </div>

      </div>

      <div className="h-fit border  border-gray-200 w-19/20 py-2 px-5 shadow-2xl my-4 rounded  gap-5">
        <h1 className="h-20 flex flex-col  bg-white w-full justify-center text-3xl font-semibold">
          Recent Courses.
        </h1>
        <div className="overflow-y-auto h-100 w-full md:w-full">
          {allLecture.length===0 && <p>No Courses yet! <span className="text-blue-600" onClick={()=>navigate("/create")}>Create</span> Lecture</p>}
          {allLecture?.map((lect) => {
            return <Coursecomponent key={lect._id} lect={lect} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
