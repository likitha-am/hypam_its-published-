import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Student", studentSchema);
