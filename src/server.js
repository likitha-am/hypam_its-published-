import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import tutorRoutes from "./routes/tutor.js";
import quizRoutes from "./routes/quiz.js";

dotenv.config();

const app = express();

// ✅ CORS FIX — ALLOW frontend
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json());

const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  console.error("❌ MONGO_URI missing in .env");
  process.exit(1);
}

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Main API route
app.use("/api/tutor", tutorRoutes);
app.use("/api/quiz", quizRoutes);
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
