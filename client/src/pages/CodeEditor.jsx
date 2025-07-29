import Header from "../components/Header.jsx";
import Editor from "@monaco-editor/react";
import { useState, useRef, useContext } from "react";
import { SiRundeck } from "react-icons/si";
import { LuLoaderCircle } from "react-icons/lu";
import { GlobalContext } from "../GlobalContext.jsx";
import clsx from "clsx";
function CodeEditor() {
  const outputRef = useRef(null);
  const { url ,mode} = useContext(GlobalContext);
  const language = {
    c: {
      language: "c",
      code: `#include <stdio.h>
int main() {
    // Your code here 
    }`,
    },
    cpp: {
      language: "cpp",
      code: `#include <iostream>
using namespace std;

int main() {
    // Your code here
    cout << "Hello, World!" << endl;
    return 0;
}`,
    },
    javascript: {
      language: "javascript",
      code: `// Your JavaScript code here
console.log("Hello, World!");`,
    },
    java: {
      language: "java",
      code: `public class Main {
    public static void main(String[] args) {
        // Your code here
        System.out.println("Hello, World!");
    }
}`,
    },
    python: {
      language: "python",
      code: `# Your Python code here
print("Hello, World!")`,
    },
  };
  const [wait, setWait] = useState(false);
  const [lang, setLanguage] = useState("javascript");
  const [code, setCode] = useState(`// Your JavaScript code here
console.log("Hello, World!");`);
  const handlechange = (e) => {
    const key = e.target.value;
    setLanguage(key);
    setCode(language[key]["code"]);
  };

  const handleRunCode = async () => {
    setWait(true);
    const response = await fetch(`${url}/code/exec`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ language: lang, code }),
      credentials: "include",
    });
    const parsedResponse = await response.json();
    if (response.ok) {
      console.log("Code executed successfully:", parsedResponse);
      outputRef.current.innerHTML = `<h1>Output Terminal : </h1> <p> >> ${parsedResponse.stdout? parsedResponse.stdout : ""}</p><p>${parsedResponse.stderr ? parsedResponse.stderr:""}</p>`;
    } else {
      console.error("Error executing code:", parsedResponse);
      outputRef.current.innerHTML = `<h1>Output Terminal : </h1> <p><span style={{color:"red"}}>Error</span> : ${parsedResponse.error}</p>`;
    }
    setWait(false);
    outputRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="w-full  h-fit">
      <Header heading={"Code Editor"} />
      <div className={clsx("h-fit w-full  flex flex-col items-center ",mode===2?"bg-[#1d1d1d]":"bg-white")}>
        {/* code run and language select option */}
        <div className=" w-full h-10 flex items-center justify-between px-10">
          <select
            name="lang"
            id=""
            className=" bg-white rounded-md p-1"
            onChange={handlechange}
          >
            <option value="javascript">Javascript</option>
            <option value="c">C</option>
            <option value="cpp">Cpp </option>
            <option value="python">Python</option>
            <option value="java">Java</option>
          </select>

          {wait ? (
            <div className={clsx("h-full w-fit flex items-center justify-center gap-2  text-md",code===2?"text-white":"text-gray-800")}>
              <LuLoaderCircle className={clsx(" text-2xl animate-spin",mode===2?"text-white":"text-gray-800")} />{" "}
              <p>Executing...</p>{" "}
            </div>
          ) : (
            <p
              className={clsx("h-full w-fit flex items-center justify-center gap-2  text-md",mode===2?"text-white":"text-gray-800")}
              onClick={handleRunCode}
            >
              <SiRundeck />
              <span>Run Code</span>
            </p>
          )}
        </div>

        {/* Code Editor*/}

        <div className="h-150 w-19/20 pt-5">
          <p className={clsx("  text-sm w-full h-fit my-1 text-center",mode===2?"text-white":"text-gray-700")}>
            Note* : Please note that the code editor currently does not support
            standard input (stdin).
          </p>

          <Editor
            height="60vh"
            theme={mode===2?"vs-dark":"vs-light"}
            language={lang}
            value={code}
            onChange={(e) => {
              console.log(code);
              setCode(e);
            }}
          />
        </div>

        {/* Output terminal*/}

        <div
          className={clsx("w-19/20 my-5 h-50 rounded p-5",mode===2?"bg-[#2c2c2c] text-white ":"bg-gray-300 text-gray-800")}
          ref={outputRef}
        >
          <h1>Output Terminal : </h1>
          <p> {">>"} </p>
        </div>
      </div>
    </div>
  );
}

export default CodeEditor;
