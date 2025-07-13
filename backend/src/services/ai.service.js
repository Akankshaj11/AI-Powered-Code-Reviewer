import { GoogleGenAI } from "@google/genai";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

// ESM-compatible __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Initialize Gemini with API key
const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GEMINI_KEY, // make sure this is set in .env
});

// ✅ Load system instruction prompt from file
const systemPrompt = fs.readFileSync(
  path.join(__dirname, "system-instruction.txt"),
  "utf-8"
);

// ✅ Main function to review code using Gemini
// export async function generateContent(userCode) {
//   try {
//     const fullPrompt = `${systemPrompt}\n\nNow review this code:\n\`\`\`javascript\n${userCode}\n\`\`\``;

//     // ✅ Use the latest model, e.g., gemini-1.5-flash or gemini-2.0-pro
//     const result = await ai.models.generateContent({
//       model: "gemini-2.5-flash", // You can change this to gemini-2.0-pro or gemini-2.5-flash
//       contents: [
//         {
//           role: "user",
//           parts: [{ text: fullPrompt }],
//         },
//       ],
//     });

//     // ✅ Safely extract response
//     // const text = result?.response?.text?.();
//     const responseText = await result.response.text();
// console.log("Gemini response:", responseText);
// return responseText || "No response received from Gemini.";

//     return text || "No response received from Gemini.";
//   } catch (error) {
//     console.error("❌ Gemini API Error:", error.message || error);
//     return "An error occurred while generating content.";
//   }
// }

export async function generateContent(userCode) {
  try {
    const fullPrompt = `${systemPrompt}\n\nNow review this code:\n\`\`\`javascript\n${userCode}\n\`\`\``;

    const result = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: [
        {
          role: "user",
          parts: [{ text: fullPrompt }],
        },
      ],
    });

    // ✅ Correct response extraction from `candidates`
    const candidates = result?.candidates;
    if (!candidates || candidates.length === 0) {
      console.log("⚠️ No candidates returned from Gemini.");
      return "No response received from Gemini.";
    }

    const responseText = candidates[0]?.content?.parts?.[0]?.text;
    if (!responseText) {
      console.log("⚠️ No text found in Gemini response.");
      return "Gemini returned an empty response.";
    }

    console.log("✅ Gemini Response:", responseText);
    return responseText;
  } catch (error) {
    console.error("❌ Gemini API Error:", error.message || error);
    return "An error occurred while generating content.";
  }
}

