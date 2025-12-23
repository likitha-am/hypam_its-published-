import { useEffect, useState } from "react";
import API from "../api";

export default function Dashboard() {
  const [students, setStudents] = useState([]);
  const [attempts, setAttempts] = useState([]);

  useEffect(() => {
    API.get("/students").then(res => setStudents(res.data));
    API.get("/attempts").then(res => setAttempts(res.data));
  }, []);

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>

      <div className="cards">
        <div className="card">Total Students: {students.length}</div>
        <div className="card">Total Attempts: {attempts.length}</div>
      </div>
    </div>
  );
}
