import { model } from "../Configs/gptConfig.js";
import { fetchYoutubeVideo } from "../middlewares/fetchYoutubeVideo.js";
import { Lecture } from "../models/lectureModel.js";
import { Chat } from "../models/ChatModel.js";

export const lectureController = async (req, res) => {
  const { userPrompt } = req.body;

  const systemPrompt = `You are an AI-powered Teaching Assistant.

Your task is to generate a well-structured lecture (approximately 3–4 pages in depth) on the given topic.

Respond **only** with a **valid JSON object** in the following structure:

{
  "topic": "A brief headline summarizing the topic.",
  "theory": "A 3–4 line introductory summary in simple, easy-to-understand language.",
  "detailedExplanation": "A thorough explanationof about 2-3 pages of the topic, including key concepts, step-by-step logic, working principles, real-life applications, and edge cases. For technical topics (e.g., recursion, pointers, etc.), include details like memory handling, stack usage, common pitfalls, and performance considerations.",
  codeSnippet":{
      (Only If Possible and query is related to technical topics)
      lang:"programming language",
      code:""If applicable (especially for programming/technical topics), include a full working code snippet with proper indentation and inline comments explaining each step.""  
      } ,
  "exercise": [
    "Question 1",
    "Question 2",
    "Question 3",
    "Question 4",
    "Question 5",
    ...
  ],
  "quizzes": [
    {
      "question": "Multiple choice question?",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "answer": "Correct Answer",
      "explanation": "Explanation of why this answer is correct."
    },
    ...
  ]
}

Only return the JSON — no extra text or formatting (like Markdown, backticks, or explanation outside the JSON).

Topic: ${userPrompt}
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
      .json({ success: false, message: "Invalid JSON response" });
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
