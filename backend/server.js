import express from "express";
import cors from "cors";
import OpenAI from "openai";
import dotenv from "dotenv";
import multer from "multer";
import fs from "fs";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const pdf = require("pdf-parse");

const upload = multer({ dest: "uploads/" });

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// for enable AI response, uncomment this and comment the dummy response below

// app.post("/analyze", async (req, res) => {
//   try {
//     const { resume, jobDesc } = req.body;

//     const response = await openai.chat.completions.create({
//       model: "gpt-4.1-mini"
//       messages: [
//         {
//           role: "user",
//           content: `Compare resume and job description and return JSON with matchingSkills, missingSkills, suggestions`,
//         },
//       ],
//     });

//     const text = response.choices[0].message.content;

//     console.log("AI RESPONSE:", text);

//     let data;

//     try {
//       const cleanText = text.replace(/```json|```/g, "").trim();

//       data = JSON.parse(cleanText);

//       // ✅ FIX HERE
//       data.matchingSkills = Array.isArray(data.matchingSkills)
//         ? data.matchingSkills
//         : [];

//       data.missingSkills = Array.isArray(data.missingSkills)
//         ? data.missingSkills
//         : [];

//       data.suggestions = Array.isArray(data.suggestions)
//         ? data.suggestions
//         : [];
//     } catch (error) {
//       console.error("JSON PARSE ERROR:", text);

//       return res.json({
//         matchingSkills: [],
//         missingSkills: [],
//         suggestions: ["AI response parsing failed"],
//         score: 0,
//       });
//     }

//     res.json(data);
//   } catch (error) {
//     console.error("SERVER ERROR:", error);

//     // ✅ NEVER send HTML error
//     res.json({
//       matchingSkills: [],
//       missingSkills: [],
//       suggestions: ["Server error occurred"],
//       score: 0,
//     });
//   }
// });

app.post("/analyze-pdf", upload.single("resume"), async (req, res) => {
  try {
    const filePath = req.file.path;
    const jobDesc = req.body.jobDesc;

    const dataBuffer = fs.readFileSync(filePath);
    const pdfData = await pdf(dataBuffer);

    const resumeText = pdfData.text;

    // 👉 Use same logic as analyze
    res.json({
      matchingSkills: ["React", "JavaScript"],
      missingSkills: ["TypeScript"],
      suggestions: ["Improve resume based on job"],
      score: 70
    });

    // cleanup file
    fs.unlinkSync(filePath);

  } catch (error) {
    console.error(error);

    res.json({
      matchingSkills: [],
      missingSkills: [],
      suggestions: ["PDF processing failed"],
      score: 0
    });
  }
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
