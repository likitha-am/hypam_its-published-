import { useState } from "react";
import API from "../api";

export default function QuizMaker() {
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("easy");
  const [quiz, setQuiz] = useState(null);

  async function generate() {
    const res = await API.post("/quiz/generate", {
      studentId: "123",
      topic,
      difficulty
    });
    setQuiz(res.data);
  }

  return (
    <div>
      <h1>Create Quiz</h1>

      <input value={topic} onChange={e => setTopic(e.target.value)} placeholder="Topic" />
      <select value={difficulty} onChange={e => setDifficulty(e.target.value)}>
        <option>easy</option>
        <option>medium</option>
        <option>hard</option>
      </select>

      <button onClick={generate}>Generate Quiz</button>

      {quiz && (
        <div className="quiz-output">
          <h2>Generated Quiz</h2>
          {quiz.questions.map((q, i) => (
            <div key={i}>
              <p><b>{q.question}</b></p>
              <ul>
                {q.options.map(o => <li>{o}</li>)}
              </ul>
              <p>Correct: {q.correctAnswer}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
