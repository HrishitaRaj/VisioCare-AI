import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { FaBrain } from "react-icons/fa";

function TextAnalysis() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
  if (!text.trim()) return;
  setLoading(true);
  setResult(null);
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/analyze-text",
      { text },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("API Response:", response.data);  // 👈 helpful debug
    setResult(response.data[0]);
  } catch (error) {
    console.error("API Error:", error);
    setResult({
      label: "API Error — check server or CORS",
      score: 0,
    });
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-isabelline text-spaceCadet p-6">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="flex flex-col items-center text-center mb-8"
      >
        <FaBrain size={60} className="text-ouCrimson mb-4" />
        <h1 className="text-4xl font-bold mb-2 text-ouCrimson">Text Analysis</h1>
        <p className="text-lg max-w-xl">
          Enter your text below and let VisioCareAI detect the sentiment.
        </p>
      </motion.div>

      <motion.textarea
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows="5"
        placeholder="Type your text here..."
        className="w-full max-w-2xl p-4 rounded-xl border border-spaceCadet focus:outline-none focus:ring-2 focus:ring-ouCrimson resize-none mb-4 shadow"
      />

      <motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  onClick={handleAnalyze}
  disabled={loading || !text.trim()}
  className={`px-6 py-3 rounded-full font-semibold shadow-md transition mb-6 ${
    loading || !text.trim()
      ? "bg-gray-400 cursor-not-allowed"
      : "bg-ouCrimson text-isabelline hover:bg-coralPink"
  }`}
>
  {loading ? "Analyzing..." : "Analyze Text"}
</motion.button>

      {result && (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.6 }}
    className="bg-white border-2 border-spaceCadet rounded-2xl p-6 shadow-xl max-w-xl text-center"
  >
    <h2 className="text-2xl font-bold mb-4 text-spaceCadet flex items-center justify-center gap-2">
      <FaBrain className="text-ouCrimson" /> Result
    </h2>

    <p className="text-lg mb-2">
      <span className="font-semibold text-ouCrimson">Label:</span>{" "}
      <span className="font-bold text-spaceCadet">{result.label}</span>
    </p>

    <div className="w-full bg-isabelline rounded-full h-4 overflow-hidden mb-3 border border-spaceCadet">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${(result.score * 100).toFixed(0)}%` }}
        transition={{ duration: 1 }}
        className="h-full bg-ouCrimson"
      />
    </div>

    <p className="text-base">
      <span className="font-semibold">Confidence:</span>{" "}
      {(result.score * 100).toFixed(2)}%
    </p>
  </motion.div>
)}

    </div>
  );
}

export default TextAnalysis;
