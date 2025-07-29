import { model } from "../Configs/gptConfig.js";
import { fetchYoutubeVideo } from "../middlewares/fetchYoutubeVideo.js";
import { Lecture } from "../models/lectureModel.js";
import { Chat } from "../models/ChatModel.js";

export const lectureController = async (req, res) => {
  const { userPrompt } = req.body;



const systemPrompt = `You are an expert AI Teaching Assistant.

Your goal is to generate a **comprehensive, structured, and deep lecture chapter** (like in a university textbook), based on the topic provided.

You must **explain the topic from scratch**, making it beginner-friendly but building up to advanced internal workings and real-world applications.

This applies to **all fields of engineering**, including:
- Computer Science (e.g., OS, DBMS, Java, AI)
- Electronics/Electrical (e.g., signals, circuits, embedded)
- Mechanical (e.g., thermodynamics, machines, design)
- Civil, Aerospace, Mechatronics, Robotics, Data Science, etc.

---

📘 REQUIRED STRUCTURE (include all 20 chapters below in the response):

1. **Introduction**
   - Simple real-world analogy, background, and motivation

2. **Historical Background**
   - How this concept/technology evolved over time

3. **Basic Concepts**
   - Definitions, core terms, variables, and building blocks

4. **Core Principles**
   - The underlying physics/math/theory/code logic

5. **Fundamental Equations / Syntax / Constructs**
   - Derive or explain foundational formulas or grammar

6. **Working or Operation**
   - How the system actually works or is implemented

7. **Control Flow / Process Flow**
   - If applicable, show the step-by-step behavior (e.g., control system loop, OS process lifecycle, circuit signal path)

8. **Design Models / Architectures / Patterns**
   - Any frameworks, reference models, or blueprints

9. **Algorithms / Calculations**
   - Key algorithms, solving methods, or logical procedures

10. **Data Structures / Formats / Representations**
    - If applicable, explain how data is stored or represented

11. **Simulation / Tools Used**
    - Software or hardware tools used to model or analyze it

12. **Advanced Concepts**
    - Optimization, edge cases, deeper internals

13. **Real-World Applications**
    - Used in industry, embedded in devices, systems, etc.

14. **Case Studies**
    - Real product, system, or failure/success based on this topic

15. **Code / Modeling / Circuit / Math Examples**
    - Show full working examples with comments or diagrams

16. **Common Pitfalls or Errors**
    - Misconceptions, bugs, or issues beginners often face

17. **Debugging / Testing / Tuning Tips**
    - How to check, validate, optimize or troubleshoot

18. **Performance Notes**
    - Time, space, power, cost, or resource tradeoffs

19. **Future Trends / Evolving Research**
    - Where this topic is going in industry or academia

20. **Conclusion**
    - Recap, importance, and recommended next topics to explore

---

🧠 Additional Notes:
- Use **clear headings**, **examples**, **code**, **equations**, and **diagrams** when helpful
- Always explain **“how” and “why”**, not just “what”
- Prefer real-world metaphors where possible
- Ensure the language is friendly and intuitive, like a good professor or senior teaching assistant

---

Return your response ONLY as a **valid JSON object** with the **following structure** no extra whitespaces , no extra quotes , no extra brackets strictly follow the *following format*:

{
  "topic": "Full title of the topic",
  "theory": "Short engaging intro (3–5 lines) about what the topic is and why it matters.",
  "detailedExplanation": "A multi-page **(9-10 pages minimum strictly)**, deeply explained, beginner-to-advanced chapter covering all the structure above. Use clear headings and examples. Avoid shallow overviews — make it feel like a real textbook + mentor.",
  "codeSnippet": {
    "lang": "language or domain used (e.g., Java, MATLAB, Python, VHDL, none, etc.)",
    "code": "Only if applicable. Include a clean, well-commented code snippet, formula derivation, or simulation model that demonstrates key ideas."
  },
  "exercise": [
    "Exercise Question 1",
    "Exercise Question 2",
    "Exercise Question 3",
    "Exercise Question 4",
    "Exercise Question 5",
    ...
  ],
  "quizzes": [
    {
      "question": "Deep conceptual multiple choice question?",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "answer": "Correct Option",
      "explanation": "Why this answer is correct and why the others are not."
    },
    {
      "question": "Deep conceptual multiple choice question?",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "answer": "Correct Option",
      "explanation": "Why this answer is correct and why the others are not."
    },
    {
      "question": "Deep conceptual multiple choice question?",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "answer": "Correct Option",
      "explanation": "Why this answer is correct and why the others are not."
    },
    {
      "question": "Deep conceptual multiple choice question?",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "answer": "Correct Option",
      "explanation": "Why this answer is correct and why the others are not."
    },
    {
      "question": "Deep conceptual multiple choice question?",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "answer": "Correct Option",
      "explanation": "Why this answer is correct and why the others are not."
    },
    ...
  ]
}

UserPrompt: ${userPrompt}
`;




  const result = await model.generateContent(systemPrompt);
  let rawText = await result.response.text();
  rawText = rawText.replace(/```json|```/g, "").trim();
  let jsonData;

  try {
    // Extracting the JSON formate from the text
    const match = rawText.match(/^\s*({[\s\S]*})\s*$/);
    const jsonString = match ? match[1] : null;
    if (!jsonString) throw new Error("No JSON structure found in response.");
    jsonData = JSON.parse(jsonString);
  } catch (err) {
    console.error("❌ Failed to parse JSON from Gemini:", err.message);
    return res
      .status(500)
      .json({ success: false, message: "Oops! Try Again." });
  }

  if (!jsonData) {
    return res
      .status(500)
      .json({ success: false, message: "No valid JSON found in response" });
  }

  const ytVideo = await fetchYoutubeVideo(jsonData.topic);

  const newLecture = new Lecture({
    userEmail: req.user?.email || "demoUser@lectora-ai",
    topic: jsonData.topic,
    theory: jsonData.theory,
    detailedExplanation: jsonData.detailedExplanation,
    codeSnippet: jsonData.codeSnippet,
    youtubeIds: ytVideo,
    exercise: jsonData.exercise,
    quizzes: jsonData.quizzes.map((quizz) => {
      return {
        question: quizz.question,
        options: quizz.options,
        answer: quizz.answer,
        explanation: quizz.explanation,
      };
    }),
  });

  const saveLecture = await newLecture.save();
  if (!saveLecture)
    return res.status(500).json({
      success: false,
      message: "Unable to save this Lecture !",
      data: jsonData,
    });

  res.status(200).json({
    success: true,
    data: saveLecture,
    message: "Lecture saved successfully!😊",
  });
};

export const getUserLecture = async (req, res) => {
  const { email } = req.user;
  const userLecture = await Lecture.find({ userEmail: email });
  if (!userLecture) {
    console.log(`Unable to fetch Lecture corresponds to user : ${email}`);
    return res
      .status(500)
      .json({ success: false, message: "Unable to fetch your Lecture" });
  }
  return res.status(200).json({ success: true, userLecture });
};

export const deleteLecture = async (req, res) => {
  const { id } = req.body;
  const { email } = req.user;
  const resp = await Lecture.findByIdAndDelete(id);
  if (!resp) {
    console.log(
      `Unable to delete Lecture with id : ${id} ,corresponds to user : ${email} `
    );
    return res
      .status(500)
      .json({ success: false, message: "Unable to fetch your Lecture" });
  }
  await Chat.deleteMany({ topic: resp.topic, userEmail: email });
  return res.status(200).json({ success: true, message: "Lecture Deleted!" });
};
