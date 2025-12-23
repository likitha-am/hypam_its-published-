// import axios from 'axios';
// const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000/api';

// export const ask = (payload) => axios.post(`${API_BASE}/ask`, payload).then(r => r.data);
// export const generateQuiz = (payload) => axios.post(`${API_BASE}/generate-quiz`, payload).then(r => r.data);
// export const evaluate = (payload) => axios.post(`${API_BASE}/evaluate`, payload).then(r => r.data);
// export const getProfile = (studentId) => axios.get(`${API_BASE}/profile/${studentId}`).then(r => r.data);
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4000/api/tutor",
  headers: {
    "Content-Type": "application/json"
  }
});

// Ask AI Tutor
export const askTutor = (data) => API.post("/ask", data);

// Create student
export const createStudent = (data) => API.post("/student", data);

// Save Feedback
export const saveFeedback = (data) => API.post("/feedback", data);

// Get students
export const getStudents = () => API.get("/students");

// Get Questions
export const getQuestions = () => API.get("/questions");

// Get Attempts
export const getAttempts = () => API.get("/attempts");

export default API;
