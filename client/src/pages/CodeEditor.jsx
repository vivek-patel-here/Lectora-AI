import Header from "../components/Header.jsx";
import Editor from "@monaco-editor/react";
import { useState } from "react";
import { SiRundeck } from "react-icons/si";

function CodeEditor() {
  const language = {
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
    c: {
      language: "c",
      code: `#include <stdio.h>

int main() {
    // Your code here
    printf("Hello, World!\\n");
    return 0;
}`,
    },
  };

  const [lang, setLanguage] = useState("javascript");
  const [code, setCode] = useState(`// Your JavaScript code here
console.log("Hello, World!");`);
  const handlechange = (e) => {
    const key = e.target.value;
    setLanguage(key);
    setCode(language[key]["code"]);
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
            <option value="cpp">Cpp /g++ 14</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="c">C</option>
          </select>

          <p className="h-full w-fit flex items-center justify-center gap-2 text-white text-md">
            <SiRundeck />
            <span>Run Code</span>
          </p>
        </div>

        {/* Code Editor*/}

        <div className="h-150 w-19/20 pt-5">
          <Editor
            height="80vh"
            theme="vs-dark"
            language={lang}
            value={code}
            onChange={(e) => {
              console.log(code)
              setCode(e);
            }}
          />
        </div>

        {/* Output terminal*/}

        <div className="w-19/20 mb-5 h-50 rounded bg-[#2c2c2c] text-white p-5">
          <h1>Output Terminal : </h1>
          <p> {">>"} Hello world</p>
        </div>
      </div>
    </div>
  );
}

export default CodeEditor;
