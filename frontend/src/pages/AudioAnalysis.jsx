import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaMicrophoneAlt } from "react-icons/fa";

function AudioAnalysis() {
  const [selectedAudio, setSelectedAudio] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setSelectedAudio(e.target.files[0]);
    setResult(null);
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!selectedAudio) return;

  const formData = new FormData();
  formData.append("file", selectedAudio);

  setLoading(true);
  try {
    const response = await axios.post("http://127.0.0.1:8000/analyze-audio", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    setResult(response.data);  // 👈 plain array now
  } catch (error) {
    console.error("Error analyzing audio:", error);
    setResult([{ label: "Error", score: 0 }]);
  }
  setLoading(false);
};

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-isabelline text-spaceCadet p-6">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="flex flex-col items-center text-center mb-8"
      >
        <FaMicrophoneAlt size={60} className="text-ouCrimson mb-4" />
        <h1 className="text-4xl font-bold mb-2 text-ouCrimson">Audio Analysis</h1>
        <p className="text-lg max-w-xl">
          Upload your audio file and let VisioCareAI detect the emotion or category.
        </p>
      </motion.div>

      <form onSubmit={handleSubmit} className="space-y-4 flex flex-col items-center">
        <input
          type="file"
          accept="audio/*"
          onChange={handleFileChange}
          className="block p-2 rounded-lg border border-spaceCadet bg-white"
          required
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          disabled={loading}
          className="bg-ouCrimson text-isabelline px-6 py-3 rounded-full font-semibold shadow-md hover:bg-coralPink transition"
        >
          {loading ? "Analyzing..." : "Analyze Audio"}
        </motion.button>
      </form>

      {result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-isabelline border-2 border-spaceCadet rounded-2xl p-6 shadow max-w-xl text-center mt-6"
        >
          <h2 className="text-2xl font-semibold mb-4 text-spaceCadet">Result</h2>
          {result.map((item, index) => (
            <div key={index} className="mb-2">
              <p className="text-xl font-medium text-ouCrimson">Label: {item.label}</p>
              <p className="text-lg">Confidence: {(item.score * 100).toFixed(2)}%</p>
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
}

export default AudioAnalysis;