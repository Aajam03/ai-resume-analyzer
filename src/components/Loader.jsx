function Loader() {
  return (
    <div className="flex flex-col items-center py-6">
      <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-gray-500 mt-2">Analyzing your resume...</p>
    </div>
  );
}

export default Loader;