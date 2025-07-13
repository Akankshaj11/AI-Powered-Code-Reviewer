
import { generateContent } from "../services/ai.service.js";

export async function getReview(req, res) {
  const code = req.body.code;
  if (!code) return res.status(400).send("Code is required.");

  try {
    const response = await generateContent(code);
    res.send(response);
  } catch (err) {
    console.error("AI Error:", err.message);
    res.status(500).send("Failed to generate AI response");
  }
}
