import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import InputSection from "../components/InputSection";

function Home() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg">
        <Navbar />
        <Hero />
        <InputSection />
      </div>
    </div>
  );
}

export default Home;