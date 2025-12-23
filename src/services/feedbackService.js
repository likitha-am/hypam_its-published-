// small helper for future features — kept simple
import Attempt from "../models/Attempt.js";

export const recordFeedback = async ({ attemptId, rating, improvement }) => {
  const attempt = await Attempt.findById(attemptId);
  if (!attempt) throw new Error("Attempt not found");
  attempt.rating = rating;
  attempt.improvement = improvement;
  await attempt.save();
  return attempt;
};
