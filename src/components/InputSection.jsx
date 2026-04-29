import { useState } from "react";
import { analyzeResume } from "../services/Api";
import Loader from "./Loader";
import Results from "./Results";

function InputSection() {
  const [resume, setResume] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

const handleAnalyze = async () => {
  if (!jobDesc) {
    alert("Please enter job description");
    return;
  }

  setLoading(true);
  setResult(null);

  try {
    let data;

    if (file) {
      // send file
      const formData = new FormData();
      formData.append("resume", file);
      formData.append("jobDesc", jobDesc);

      const res = await fetch("http://localhost:5000/analyze-pdf", {
        method: "POST",
        body: formData,
      });

      data = await res.json();
    } else {
      // fallback text
      data = await analyzeResume(resume, jobDesc);
    }

    setResult(data);

  } catch (err) {
    console.error(err);
    alert("Something went wrong");
  }

  setLoading(false);
};

  const [file, setFile] = useState(null);

  return (
    <div className="px-6 pb-10">
     <div className="mb-6">
  <label className="block text-lg font-semibold mb-2">
    Upload Resume (PDF)
  </label>

  <div
    className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer hover:border-blue-500 transition-all"
    onClick={() => document.getElementById("fileUpload").click()}
  >
    {file ? (
      <div className="flex flex-col items-center gap-2">
        <p className="text-green-600 font-medium">
          ✅ {file.name}
        </p>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setFile(null);
          }}
          className="text-red-500 text-sm hover:underline"
        >
          Remove file
        </button>
      </div>
    ) : (
      <p className="text-gray-500">
        Drag & drop your PDF here or <span className="text-blue-500">browse</span>
      </p>
    )}
  </div>

  <input
    id="fileUpload"
    type="file"
    accept="application/pdf"
    className="hidden"
    onChange={(e) => setFile(e.target.files[0])}
  />
</div>
      {/* Inputs */}
      <div className="grid md:grid-cols-2 gap-6">
        <textarea
          value={resume}
          onChange={(e) => setResume(e.target.value)}
          className="w-full h-40 p-4 border rounded-xl"
          placeholder="Paste your resume here..."
        />

        <textarea
          value={jobDesc}
          onChange={(e) => setJobDesc(e.target.value)}
          className="w-full h-40 p-4 border rounded-xl"
          placeholder="Paste job description here..."
        />
      </div>

      {/* Button */}
      <button
        onClick={handleAnalyze}
        disabled={loading}
        className="mt-6 mb-6 w-full bg-blue-600 text-white py-3 rounded-xl disabled:bg-gray-400"
      >
        {loading ? "Analyzing..." : "Analyze Resume"}
      </button>

      {/* Loader */}
      {loading && <Loader />}

      {/* Results */}
      {result && <Results data={result} />}
    </div>
  );
}

export default InputSection;
