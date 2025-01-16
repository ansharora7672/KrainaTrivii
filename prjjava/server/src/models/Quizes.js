import mongoose, { Schema } from "mongoose";
const QuizSchema = new mongoose.Schema({
  category: { type: String, required: true },
  questionText: { type: String, required: true },
  correctAnswer: { type: String, required: true },
  incorrectAnswers: { type: [String], required: true },
});

export const QuizModel = mongoose.model("quizes", QuizSchema);
