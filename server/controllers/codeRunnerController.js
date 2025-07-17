const JUDGE0_API = "https://judge0-ce.p.rapidapi.com";

const LANG_MAP = {
  cpp: 54, // C++ (GCC 9.2.0)
  python: 71, // Python (3.8.1)
  javascript: 63, // JavaScript (Node.js 12.14.0)
  java: 62, // Java (OpenJDK 13)
  c: 50, // C (GCC 9.2.0)
};

const apiKey = process.env.RAPID_API_KEY;

export const judge0CodeRun = async (req, res) => {
  const { language, code, input = "" } = req.body;

  const langId = LANG_MAP[language.toLowerCase()];
  if (!langId) {
    return res.status(400).json({ error: "Unsupported language" });
  }
  // Submit code to Judge0
  const response = await fetch(
    `${JUDGE0_API}/submissions?base64_encoded=false&wait=true`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-RapidAPI-Key":apiKey, 
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
      },
      body: JSON.stringify({
        source_code: code,
        language_id: langId,
        stdin: input,
      }),
    }
  );

  const submission = await response.json();
  res.status(200).json({
    success: true,
    stdout: submission?.stdout,
    stderr: submission?.stderr,
    compile_output: submission?.compile_output,
    time: submission?.time,
    memory: submission?.memory,
    status: submission?.status,
  });
};
