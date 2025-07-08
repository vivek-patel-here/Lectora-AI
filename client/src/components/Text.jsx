import React, { useContext } from "react";
import { GlobalContext } from "../GlobalContext.jsx";
import { marked } from "marked";
function Text() {
  const { topic, theory, detailedExplanation, codeSnippet, targetRef } =
    useContext(GlobalContext);
  let htmlContent = "";
  let htmlContent2 = "";
  if (detailedExplanation) htmlContent = marked.parse(detailedExplanation);
  if (codeSnippet.code) htmlContent2 = marked.parse(codeSnippet.code);
  return (
    <div
      ref={targetRef}
      style={{
        backgroundColor: "white",
        padding: "20px",
        width: "800px",
        fontFamily: "Arial, sans-serif",
        color: "#000",
        position: "absolute",
        top: "-9999px",
        left: "-9999px",
      }}
    >
      <p style={{ fontSize: "10px", color: "gray" }}>Notes by Lectora-AI</p>
      <h1
        style={{ fontSize: "20px", marginBottom: "10px", fontWeight: "bold" }}
      >
        {topic}
      </h1>
      <p style={{ fontSize: "16px", lineHeight: "1.6" }}>{theory}</p>
      <div style={{ marginTop: "10px" }}>
        <strong>Detailed Explanation</strong>
        <br></br>
        <div
          style={{ fontSize: "15px", lineHeight: "1.6" }}
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
        <h1 style={{ fontSize: "20px", marginTop: "20px" }}>
          Example {codeSnippet?.lang} Code{" "}
        </h1>
        <div
          style={{
            border: "1px solid black",
            margin: "10px 0px",
            padding: "10px",
          }}
        >
          <div
            style={{ fontSize: "12px" }}
            dangerouslySetInnerHTML={{ __html: htmlContent2 }}
          />
        </div>

        <hr />
        <p>Powered by AI</p>
        <p>Lectora-AI </p>
        <p> Prompt.Learn.Repeat</p>
      </div>
    </div>
  );
}

export default Text;
