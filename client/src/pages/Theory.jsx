import Header from "../components/Header";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../GlobalContext.jsx";
import ReactMarkdown from "react-markdown";
import Editor from "@monaco-editor/react";
import { useNavigate } from "react-router-dom";
import Quizz from "../components/Quizz.jsx";
import Text from "../components/Text.jsx";
import { RxDownload } from "react-icons/rx";

function Theory({ openModelFunction }) {
  const [wait, setWait] = useState(false);
  const navigate = useNavigate();
  const {
    topic,
    theory,
    detailedExplanation,
    codeSnippet,
    youtubeIds,
    exercise,
    quizzes,
    toPDF,
  } = useContext(GlobalContext);

  useEffect(() => {
    if (!topic && !theory) navigate("/create");
  }, [topic, theory]);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const handleDowload = () => {
    setTimeout(async () => {
      setWait(true);
      await toPDF();
      setWait(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen  w-screen flex flex-col relative items-center">
      <Header heading={"Theory"} />
      <Text />
      <div className="min-h-[90vh] relative gap-5 w-full flex flex-col  justify-between p-4 ">
        <div className="w-full flex items-center h-fit justify-between">
          <h1 className="w-full text-2xl font-semibold">{topic}</h1>
          {!wait ? (
            <button
              className="border flex items-center w-fit h-fit py-1 px-2 rounded-lg "
              onClick={handleDowload}
            >
              <RxDownload /> Notes
            </button>
          ) : (
            <div className="w-fit h-fit pb-1 bg-linear-to-r from-green-500 via-green-200">
              <p className="w-fit h-fit bg-white">Downloading...</p>
            </div>
          )}
        </div>

        <p className="w-full text-lg  lg:w-9/10">{theory}</p>

        {detailedExplanation && (
          <div className="w-full text-lg lg:w-9/10 text-gray-950 bg-gray-200 p-3 rounded-md">
            <h1 className="text-2xl my-4 font-semibold">Explaination</h1>
            <ReactMarkdown>{detailedExplanation}</ReactMarkdown>
          </div>
        )}

        {codeSnippet.code && (
          <div className=" max-w-9/10 h-fit ">
            {" "}
            <h1 className="text-2xl my-4 font-semibold">
              Example{" "}
              {codeSnippet.lang.toLowerCase()[0].toUpperCase() +
                codeSnippet.lang
                  .toLowerCase()
                  .slice(1, codeSnippet.code.length + 1)}{" "}
              Code{" "}
            </h1>{" "}
            <Editor
              height="90vh"
              defaultLanguage={codeSnippet.lang.toLowerCase()}
              theme="vs-dark"
              defaultValue={codeSnippet.code}
            />
          </div>
        )}

        {youtubeIds.length > 0 && (
          <div className="w-full h-fit text-lg lg:w-9/10 text-gray-950 bg-gray-200 p-3 rounded-md">
            <h1 className="text-2xl my-4 font-semibold">
              Relevent Youtube Resources.
            </h1>
            <div className=" min-h-60 w-full flex flex-wrap items-center gap-5 px-2 py-1">
              {youtubeIds.map((video_id, it) => {
                return (
                  <div
                    key={it}
                    className=" border relative  border-[#40404050] h-fit w-fit  md:h-60 md:w-90 md:p-4 rounded-xl hover:shadow-2xl hover:scale-105 transition-all"
                    onClick={() => {
                      openModel();
                    }}
                  >
                    <a href="#ytmodel">
                      <div
                        className="absolute h-50  w-80 z-10 text-white bg-transparent"
                        onClick={() => openModelFunction(video_id)}
                      ></div>
                    </a>
                    <iframe
                      width="300"
                      height="200"
                      src={`https://www.youtube.com/embed/${video_id}`}
                      title="YouTube video player"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;  web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                    ></iframe>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {exercise.length > 0 && (
          <div className="w-full h-fit text-lg lg:w-9/10 text-gray-950 bg-gray-200 p-3 rounded-md">
            <h1 className="text-2xl my-4 font-semibold">
              Exercise Questions :
            </h1>
            <p className="py-2">Practice what you have learnt so far .</p>
            <div className=" min-h-60 w-19/20 flex flex-col gap-2 px-2 py-1">
              {exercise.map((ex, it) => {
                return (
                  <p key={it}>
                    {it + 1}. {ex}
                  </p>
                );
              })}
            </div>
          </div>
        )}

        {quizzes.length > 0 && (
          <div className="w-full h-fit text-lg lg:w-9/10 text-gray-950 bg-gray-200 p-3 rounded-md">
            <h1 className="text-2xl my-4 font-semibold">Quiz :</h1>
            <p className="py-2">Test what you have learnt :</p>
            <div className=" min-h-60 w-19/20 flex flex-col gap-2 px-2 py-1">
              {quizzes.map((quiz, it) => {
                return (
                  <Quizz
                    key={it}
                    quizz={quiz}
                    it={it}
                    isSubmitted={isSubmitted}
                  />
                );
              })}
              {!isSubmitted && (
                <button
                  className="h-fit w-fit py-1 px-3 font-bold  rounded-xl border"
                  onClick={() => setIsSubmitted(true)}
                >
                  {" "}
                  Submit
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Theory;
