import express from "express";
import {
  askTutor,
  saveFeedback,
  createStudent,
  getStudents,
  getQuestions,
  getAttempts
} from "../controllers/tutorController.js";

const router = express.Router();

// AI Route
router.post("/ask", askTutor);

// Feedback
router.post("/feedback", saveFeedback);

// Students
router.post("/student", createStudent);
router.get("/students", getStudents);

// History
router.get("/questions", getQuestions);
router.get("/attempts", getAttempts);

export default router;
