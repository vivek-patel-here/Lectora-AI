import mongoose, { Schema } from "mongoose";

const QuizzesSchema = new Schema({
  question: {
    type: String,
    required: true,
  },
  options: {
    type: [String],
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
  explanation: {
    type: String,
    required: true,
  },
});

const LectureSchema = new Schema(
  {
    userEmail: {
      type: String,
      required: true,
    },
    topic: {
      type: String,
      required: true,
      trim: true,
      default: "User Query",
    },
    theory: {
      type: String,
      required: true,
    },
    detailedExplanation: {
      type: String,
      required: true,
    },
    codeSnippet: {
      type: String,
      required: true,
    },
    youtubeIds: {
      type: [String],
      required: true,
    },
    exercise: {
      type: [String],
      required: true,
    },
    quizzes: {
      type: [QuizzesSchema],
      required: true,
    },
  },
  { timestamps: true }
);

export const Lecture = mongoose.model("Lecture", LectureSchema);
