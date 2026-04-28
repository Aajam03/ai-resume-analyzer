function ResultCard({ title, items, color }) {
  return (
    <div className={`border rounded-xl p-4 ${color}`}>
      <h4 className="font-semibold mb-2">{title}</h4>
      <ul className="list-disc ml-5">
        {Array.isArray(items) ? (
          items.map((item, i) => <li key={i}>{item}</li>)
        ) : (
          <p>No data available</p>
        )}
      </ul>
    </div>
  );
}

export default ResultCard;
