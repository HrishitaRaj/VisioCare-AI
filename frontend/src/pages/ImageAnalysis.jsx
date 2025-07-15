import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaCamera } from "react-icons/fa";

function ImageAnalysis() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setSelectedImage(e.target.files[0]);
    setResult(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedImage) return;

    const formData = new FormData();
    formData.append("file", selectedImage);

    setLoading(true);
    setResult(null);
    try {
      const response = await axios.post("http://127.0.0.1:8000/analyze-image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResult(response.data);
    } catch (error) {
      console.error("Error analyzing image:", error);
      setResult({ error: "API Error — check server or CORS" });
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
        <FaCamera size={60} className="text-ouCrimson mb-4" />
        <h1 className="text-4xl font-bold mb-2 text-ouCrimson">Image Analysis</h1>
        <p className="text-lg max-w-xl">
          Upload an image and let VisioCareAI detect medical insights or classifications.
        </p>
      </motion.div>

      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 w-full max-w-lg">
        <motion.input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="block w-full p-3 rounded-xl border border-spaceCadet focus:outline-none focus:ring-2 focus:ring-ouCrimson bg-white shadow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          required
        />

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          disabled={loading}
          className="bg-ouCrimson text-isabelline px-6 py-3 rounded-full font-semibold shadow-md hover:bg-coralPink transition"
        >
          {loading ? "Analyzing..." : "Analyze Image"}
        </motion.button>
      </form>

      {selectedImage && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-6"
        >
          <img
            src={URL.createObjectURL(selectedImage)}
            alt="Preview"
            className="rounded-xl shadow-lg max-w-xs mx-auto"
          />
        </motion.div>
      )}

      {result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="bg-isabelline border-2 border-spaceCadet rounded-2xl p-6 shadow max-w-xl text-center mt-8"
        >
          <h2 className="text-2xl font-semibold mb-4 text-spaceCadet">Result</h2>
          {result.error ? (
            <p className="text-ouCrimson">{result.error}</p>
          ) : (
            <pre className="whitespace-pre-wrap text-left">{JSON.stringify(result, null, 2)}</pre>
          )}
        </motion.div>
      )}
    </div>
  );
}

export default ImageAnalysis;