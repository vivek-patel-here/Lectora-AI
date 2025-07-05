import { useNavigate } from "react-router-dom";

function Pagenotfound() {
  const navigate = useNavigate();
  return (
    <div className="h-screen grid place-items-center  w-screen bg-linear-to-r from-cyan-200 via-violet-200 to-purple-200 ">
      <div className="h-fit w-full flex flex-col items-center justify-center gap-5">
        <h1 className="bg-linear-to-r from-cyan-500 via-violet-500 to-purple-600 text-transparent bg-clip-text text-5xl">
          Lectora AI
        </h1>
        <h1 className="text-black font-bold text-6xl/tight">
          Oops! Page Not Found
        </h1>
        <button
          className="hover:scale-105 hover:font-bold hover:bg-linear-to-r hover:from-cyan-500 hover:via-violet-500 hover:to-purple-600 transition-all hover:text-transparent hover:bg-clip-text"
          onClick={() => navigate("/dashboard")}
        >
          Return To Home
        </button>
      </div>
    </div>
  );
}

export default Pagenotfound;
