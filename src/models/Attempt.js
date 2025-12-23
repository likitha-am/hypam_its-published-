import mongoose from "mongoose";

const attemptSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
  questionId: { type: mongoose.Schema.Types.ObjectId, ref: "Question" },
  userQuestion: String,
  tutorAnswer: String,
  rating: Number,
  improvement: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Attempt", attemptSchema);
