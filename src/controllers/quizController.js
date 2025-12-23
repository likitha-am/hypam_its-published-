import Quiz from "../models/Quiz.js";
import { askGemini } from "../services/llmService.js";

export async function generateQuiz(req, res) {
  try {
    const { studentId, topic, difficulty } = req.body;

    const prompt = `
      Create a ${difficulty} quiz on topic: ${topic}.
      Format strictly as:
      Q: question text
      A: option1 | option2 | option3 | option4
      C: correct_option_text
      Repeat for 5 questions.
    `;

    const aiResponse = await askGemini(prompt);

    const lines = aiResponse.split("\n").filter(l => l.trim());
    const questions = [];

    let tempQ = {}, step = 0;

    lines.forEach(line => {
      if (line.startsWith("Q:")) {
        if (step === 3) {
          questions.push(tempQ);
          tempQ = {};
        }
        tempQ.question = line.replace("Q:", "").trim();
        step = 1;
      }
      else if (line.startsWith("A:")) {
        tempQ.options = line.replace("A:", "").trim().split("|").map(x => x.trim());
        step = 2;
      }
      else if (line.startsWith("C:")) {
        tempQ.correctAnswer = line.replace("C:", "").trim();
        step = 3;
      }
    });

    if (step === 3) questions.push(tempQ);

    const quiz = await Quiz.create({
      studentId,
      topic,
      difficulty,
      questions
    });

    res.json(quiz);

  } catch (err) {
    console.error("generateQuiz error:", err);
    res.status(500).json({ error: "Quiz creation failed" });
  }
}
