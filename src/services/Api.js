export const analyzeResume = async (resume, jobDesc) => {
  const res = await fetch("https://ai-resume-analyzer-h723.onrender.com/analyze-pdf", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ resume, jobDesc }),
  });

  // ❗ IMPORTANT FIX
  const text = await res.text();

  try {
    return JSON.parse(text);
  } catch (err) {
    console.error("NOT JSON RESPONSE:", text);
    throw new Error("Invalid server response");
  }
};
