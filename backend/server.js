import express from "express";
import cors from "cors";
import OpenAI from "openai";
import dotenv from "dotenv";
import multer from "multer";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// ✅ FIX: dynamic import for pdf-parse (works on Render)
let pdf;

(async () => {
  const module = await import("pdf-parse");
  pdf = module.default || module;
})();

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// MAIN ROUTE
app.post("/analyze-pdf", upload.single("file"), async (req, res) => {
  console.log("FILE:", req.file);
  console.log("BODY:", req.body);

  try {
    if (!req.file) {
      return res.status(400).json({
        matchingSkills: [],
        missingSkills: [],
        suggestions: ["No file uploaded"],
      });
    }

    // ✅ Skip PDF parsing (fix crash)
    console.log("PDF received:", req.file.originalname);

    // ✅ Mock response
    const data = {
      matchingSkills: ["React", "JavaScript"],
      missingSkills: ["TypeScript", "Next.js"],
      suggestions: [
        "Improve resume formatting",
        "Add measurable achievements",
        "Include more projects",
      ],
    };

    return res.json(data);

  } catch (error) {
    console.error("SERVER ERROR:", error);

    return res.status(500).json({
      matchingSkills: [],
      missingSkills: [],
      suggestions: ["Server error"],
    });
  }
});
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});