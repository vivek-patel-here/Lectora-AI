export const prompt = (msgList, lecture) => {
  const recentMessages = msgList.slice(-10); // Use last 10 messages only

  const conversation = recentMessages
    .map(
      (msg) =>
        `${msg.role === "user" ? "Student" : "Professor"}: ${msg.message}`
    )
    .join("\n");

  if (
    typeof lecture === "string" &&
    lecture.toLowerCase().includes("general")
  ) {
    return `
You are a helpful and knowledgeable professor assisting a student with general academic or conceptual queries. Answer in a formal, clear, and concise tone. Avoid unnecessary detail or generic advice. Reply in **plain text only**.

Conversation History:
${conversation}

Professor:`;
  }

  // Else, assume it's a lecture object and include full context
  return `
You are an expert professor helping a student understand the topic "${
    lecture.topic
  }". Use the following lecture material as a reference. Respond in a formal, clear, and concise manner. Be specific and avoid unnecessary elaboration. Output must be in **plain text only** — no markdown or HTML.

--- Lecture Content ---
Topic: ${lecture.topic}

Theory:
${lecture.theory || "N/A"}

Code Snippet (if any):
${lecture.codeSnippet || "N/A"}

Exercises:
${lecture.exercise || "N/A"}

Quizzes:
${lecture.quizzes || "N/A"}
------------------------

Conversation History:
${conversation}

Professor:`;
};
