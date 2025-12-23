# HYPAM-intelligent tutoring system using feedback loop(published)

This repository contains a full-stack AI Tutor project:
- Backend (Node.js + Express + Mongoose) using old Gemini API (`v1beta` + `gemini-pro`) — works with `AIza...` keys.
- Frontend (React + Vite)
- Docker compose for local setup (MongoDB + backend + frontend)

## Quick start (local)
1. Copy `.env.example` to `backend/.env` and fill values (GEMINI_API_KEY).
2. Start MongoDB (or use docker-compose).
3. From root you can run `docker-compose up --build` or run backend and frontend separately:
   - backend:
     ```bash
     cd backend
     npm install
     npm run dev
     ```
   - frontend:
     ```bash
     cd frontend
     npm install
     npm run dev
     ```

## Backend endpoints
- POST `/api/tutor/ask` — `{ studentId, questionText, subject }`
- POST `/api/tutor/feedback` — feedback object
- POST `/api/tutor/student` — create student
- GET `/api/tutor/students` — list students
- GET `/api/tutor/questions` — all questions
- GET `/api/tutor/attempts` — attempts (populated)

