import Student from "../models/Student.js";
import Question from "../models/Question.js";
import Attempt from "../models/Attempt.js";
import { askGemini } from "../services/llmService.js";

// 1) ASK TUTOR (AI)
export async function askTutor(req, res) {
  try {
    console.log("REQ BODY:", req.body);
    const { question, studentId, subject } = req.body;

    if (!question) return res.status(400).json({ error: "Question required" });

    // Generate AI Answer
    const answer = await askGemini(question);

    // Save Question
    const newQuestion = await Question.create({
      text: question,
      subject: subject || "General"
    });

    // Save Attempt
    await Attempt.create({
      studentId: studentId || null,
      questionId: newQuestion._id,
      userQuestion: question,
      tutorAnswer: answer
    });

    res.json({ answer });
  } catch (err) {
    console.error("askTutor error:", err);
    res.status(500).json({ error: "LLM Error" });
  }
}

// 2) SAVE FEEDBACK
export async function saveFeedback(req, res) {
  try {
    const { attemptId, rating, improvement } = req.body;

    const attempt = await Attempt.findById(attemptId);

    if (!attempt)
      return res.status(404).json({ error: "Attempt not found" });

    attempt.rating = rating;
    attempt.improvement = improvement;

    await attempt.save();

    res.json({ message: "Feedback saved" });
  } catch (err) {
    console.error("Feedback error:", err);
    res.status(500).json({ error: "Failed to save feedback" });
  }
}

// 3) CREATE STUDENT
export async function createStudent(req, res) {
  try {
    const student = await Student.create(req.body);
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: "Error creating student" });
  }
}

// 4) GET STUDENTS
export async function getStudents(req, res) {
  const students = await Student.find();
  res.json(students);
}

// 5) GET QUESTIONS
export async function getQuestions(req, res) {
  const q = await Question.find().sort({ createdAt: -1 });
  res.json(q);
}

// 6) GET ATTEMPTS
export async function getAttempts(req, res) {
  const attempts = await Attempt.find()
    .sort({ createdAt: -1 })
    .populate("studentId")
    .populate("questionId");

  res.json(attempts);
}
