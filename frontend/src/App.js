import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ParticlesBg from "./components/ParticlesBg";
import Home from "./pages/Home";
import TextAnalysis from "./pages/TextAnalysis";
import ImageAnalysis from "./pages/ImageAnalysis";
import AudioAnalysis from "./pages/AudioAnalysis";

function App() {
  return (
    <Router>
      <div className="relative min-h-screen overflow-hidden">
        <ParticlesBg />
        <div className="relative z-10 flex flex-col min-h-screen">
          <Navbar />
          <div className="flex-grow p-6">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/text-analysis" element={<TextAnalysis />} />
              <Route path="/image-analysis" element={<ImageAnalysis />} />
              <Route path="/audio-analysis" element={<AudioAnalysis />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;