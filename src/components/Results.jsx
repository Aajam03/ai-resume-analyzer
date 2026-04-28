import ResultCard from "./ResultCard";

function Results({ data }) {
  return (
    <div className="px-6 pb-10">
      <div className="grid md:grid-cols-2 gap-6">
        <ResultCard
          title="✅ Matching Skills"
          items={
            data?.matchingSkills?.length ? (
              data.matchingSkills.map((item, i) => <li key={i}>{item}</li>)
            ) : (
              <p>No matching skills found</p>
            )
          }
          color="border-green-300 bg-green-50"
        />

        <ResultCard
          title="❌ Missing Skills"
          items={
            data?.missingSkills?.length ? (
              data.missingSkills.map((item, i) => <li key={i}>{item}</li>)
            ) : (
              <p>No missing skills found</p>
            )
          }
          color="border-red-300 bg-red-50"
        />
      </div>

      <div className="mt-6 border rounded-xl p-4 bg-gray-50">
        <h4 className="font-semibold mb-2">💡 Suggestions for Improvement</h4>
        <ul className="list-disc ml-5">
          {data?.suggestions?.length ? (
            data.suggestions.map((item, i) => (
              <li key={i}>{item}</li>
            ))
          ) : (
            <p>No suggestions for improvement</p>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Results;
