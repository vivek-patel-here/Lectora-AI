import Header from "../components/Header.jsx";
import Editor from "@monaco-editor/react";
import { useState, useRef, useContext } from "react";
import { SiRundeck } from "react-icons/si";
import { LuLoaderCircle } from "react-icons/lu";
import { GlobalContext } from "../GlobalContext.jsx";
function CodeEditor() {
  const outputRef = useRef(null);
  const { url } = useContext(GlobalContext);
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
      <div className="h-fit w-full bg-[#1d1d1d] flex flex-col items-center ">
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
            <div className="h-full w-fit flex items-center justify-center gap-2 text-white text-md">
              <LuLoaderCircle className="text-white text-2xl animate-spin" />{" "}
              <p>Executing...</p>{" "}
            </div>
          ) : (
            <p
              className="h-full w-fit flex items-center justify-center gap-2 text-white text-md"
              onClick={handleRunCode}
            >
              <SiRundeck />
              <span>Run Code</span>
            </p>
          )}
        </div>

        {/* Code Editor*/}

        <div className="h-150 w-19/20 pt-5">
          <p className="text-white  text-sm w-full h-fit my-1 text-center">
            Note* : Please note that the code editor currently does not support
            standard input (stdin).
          </p>

          <Editor
            height="80vh"
            theme="vs-dark"
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
          className="w-19/20 mb-5 h-50 rounded bg-[#2c2c2c] text-white p-5"
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
