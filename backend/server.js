import express from "express";
import cors from "cors";
import OpenAI from "openai";
import dotenv from "dotenv";
import multer from "multer";
import pdf from "pdf-parse/lib/pdf-parse.js"; // ✅ FIXED

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// MAIN ROUTE
app.post("/analyze-pdf", upload.single("file"), async (req, res) => {
  console.log("FILE:", req.file);
  console.log("BODY:", req.body);

  try {
    // ✅ Validation
    if (!req.file) {
      return res.status(400).json({
        matchingSkills: [],
        missingSkills: [],
        suggestions: ["No file uploaded"],
      });
    }

    const jobDesc = req.body.jobDesc || "";

    // ✅ Extract text from PDF
    const pdfData = await pdf(req.file.buffer);
    const resumeText = pdfData.text;

    // ✅ Call OpenAI
    //     const response = await openai.chat.completions.create({
    //       model: "gpt-4.1-mini",
    //       messages: [
    //         {
    //           role: "user",
    //           content: `Compare this resume and job description.

    // Resume:
    // ${resumeText}

    // Job Description:
    // ${jobDesc}

    // Return ONLY JSON:
    // {
    //   "matchingSkills": [],
    //   "missingSkills": [],
    //   "suggestions": []
    // }`,
    //         },
    //       ],
    //     });

    //     const text = response.choices[0].message.content;
    //     console.log("AI RESPONSE:", text);

    //     let data;

    //     try {
    //       const cleanText = text.replace(/```json|```/g, "").trim();
    //       data = JSON.parse(cleanText);
    //     } catch (err) {
    //       console.error("JSON PARSE ERROR:", text);

    //       return res.json({
    //         matchingSkills: [],
    //         missingSkills: [],
    //         suggestions: ["AI response parsing failed"],
    //       });
    //     }

    //     // ✅ Safe fallback structure
    //     data.matchingSkills = Array.isArray(data.matchingSkills)
    //       ? data.matchingSkills
    //       : [];

    //     data.missingSkills = Array.isArray(data.missingSkills)
    //       ? data.missingSkills
    //       : [];

    //     data.suggestions = Array.isArray(data.suggestions)
    //       ? data.suggestions
    //       : [];

    //     return res.json(data);

    const data = {
      matchingSkills: ["React", "JavaScript"],
      missingSkills: ["TypeScript", "Next.js"],
      suggestions: ["Improve resume", "Add projects"],
    };

    return res.json(data);
  } catch (error) {
    console.error("SERVER ERROR:", error);

    return res.status(500).json({
      matchingSkills: [],
      missingSkills: [],
      suggestions: ["PDF processing or AI failed"],
    });
  }
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
