function Navbar() {
  return (
    <div className="flex justify-between items-center px-6 py-4 border-b">
      <h1 className="text-xl font-bold text-blue-600">
        Resume<span className="text-gray-800">Analyzer</span>
      </h1>

      <div className="flex gap-4">
        <button className="text-gray-600">About</button>
        <button className="bg-gray-800 text-white px-4 py-2 rounded-lg">
          GitHub
        </button>
      </div>
    </div>
  );
}

export default Navbar;