export const analyzeResume = async (resume, jobDesc) => {
  const res = await fetch("http://localhost:5000/analyze", {
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