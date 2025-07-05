import Header from "../components/Header";
import { useContext, useState } from "react";
import { GlobalContext } from "../GlobalContext.jsx";
import { BsArrowUpCircle } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { SpinnerDotted } from "spinners-react";
function Lecture() {
  const {
    fetchCourse,
    ErrorMsg,
  } = useContext(GlobalContext);
  const navigate = useNavigate();
  const [input, handleInput] = useState("");
  const onChangeHandler = (e) => {
    handleInput(e.target.value);
  };
  const [wait, setWait] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(input.length===0) return ErrorMsg("Empty Query!")
    if (input.length < 5)
      return ErrorMsg(
        "Kindly elaborate on your query for better understanding and assistance"
      );
      setWait(true);
    let value = await fetchCourse(input);
    setWait(false);
    if(value) navigate("/theory");
  };

  return (
    <div className="min-h-screen w-screen flex flex-col items-center">
      <Header heading={"Create a Lectures"} />
      <div className="min-h-[90vh] gap-5 w-full flex flex-col items-center justify-center ">
        <h1 className="h-6/10 w-19/20  md:w-7/10 text-[#202020] sm:text-5xl/tight text-3xl text-center font-bold ">
          Prompt.{" "}
          <span className="bg-linear-to-br from-cyan-400 via-blue-600 to-purple-600  text-[transparent] bg-clip-text">
            Learn.{" "}
          </span>
          Repeat.
        </h1>
        <p className="text-[#101020ab] text-center text-md font-semibold w-full md:w-fit">
          Lectora-AI turns your prompt into a full lecture with theory, code,
          videos, and quizzes—instantly.
        </p>
        <form
          className="border border-[#10101050] h-40 w-18/20 md:w-9/12 p-4  lg:w-6/10 rounded-2xl"
          onSubmit={handleSubmit}
        >
          <textarea
            name=""
            className="w-full border-0 h-22  outline-0"
            value={input}
            onChange={onChangeHandler}
            placeholder="Ask Lectora to create a course on..."
            style={{ resize: "none" }}
          ></textarea>
          <div className="w-full h-10  flex items-end justify-end ">
            {wait === false ? (
              <button className="rounded-full p-1 bg-linear-to-r from-purple-600 via-blue-600 to-cyan-400 grid place-items-center">
                <BsArrowUpCircle className="text-3xl text-white" />
              </button>
            ) : (
              <SpinnerDotted
                size={38}
                thickness={100}
                speed={100}
                color="rgba(57, 102, 172, 1)"
              />
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Lecture;
