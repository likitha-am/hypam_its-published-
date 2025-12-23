import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const KEY = process.env.GEMINI_API_KEY;

if (!KEY) {
  console.error("❌ GEMINI_API_KEY missing from .env");
}

/**
 * Try to generate with a given URL and body
 */
async function tryGenerate(url, body) {
  const res = await axios.post(url, body, {
    headers: { "Content-Type": "application/json" },
    timeout: 20000
  });

  return (
    res.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
    "No response text received."
  );
}

/**
 * askGemini(question)
 * Works with PUBLIC Gemini API KEY (AIza...)
 */
export async function askGemini(question) {
  if (!KEY) throw new Error("Missing GEMINI_API_KEY in environment");

  const prompt = `(SYSTEM):
You are an expert AI tutor. Provide:
1) A simple clear explanation.
2) A step-by-step example.
3) One practice question.

(USER): ${question}`;

  const body = {
    contents: [
      {
        parts: [{ text: prompt }]
      }
    ],
    generationConfig: { maxOutputTokens: 500 }
  };

  // ONLY MODELS THAT WORK WITH AIza... KEYS
  const models = [
    "gemini-2.0-flash",
    "gemini-2.0-flash-lite",
    "gemini-1.5-flash-8b"
  ];

  let lastError = null;

  for (const model of models) {
    const url = `https://generativelanguage.googleapis.com/v1/models/${model}:generateContent?key=${KEY}`;

    try {
      const text = await tryGenerate(url, body);
      console.log(`✅ Gemini success: model=${model}`);
      return text;
    } catch (err) {
      lastError = err;
      const status = err?.response?.status;
      console.warn(`❌ Model failed: ${model} (status ${status})`);

      // If 401/403 → stop immediately (bad key)
      if (status === 401 || status === 403) {
        throw new Error(`Authentication error: ${JSON.stringify(err.response.data)}`);
      }
    }
  }

  console.error("❌ All Gemini public models failed.", lastError?.response?.data);
  throw new Error("Gemini API request failed.");
}
