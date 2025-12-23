const axios = require("axios");

const API_KEY = process.env.GEMINI_API_KEY;

async function listModels() {
  try {
    const res = await axios.get(
      `https://generativelanguage.googleapis.com/v1/models?key=${API_KEY}`
    );

    console.log("\n===== AVAILABLE MODELS FOR YOUR ACCOUNT =====\n");
    res.data.models.forEach((m) => {
      console.log(m.name);
    });
    console.log("\n=============================================\n");
  } catch (err) {
    console.log("ERROR:", err.response?.data || err.message);
  }
}
listModels();