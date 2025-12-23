import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  question: String,
  options: [String],
  correctAnswer: String,
});

const quizSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
  topic: String,
  difficulty: String,
  questions: [questionSchema],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Quiz", quizSchema);
