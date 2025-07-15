import React from "react";
import { motion } from "framer-motion";
import { FaBrain, FaMicrophoneAlt, FaCamera } from "react-icons/fa";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="text-spaceCadet flex flex-col items-center justify-center p-6">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-5xl font-bold mb-4 text-center"
        style={{ color: "#880d1e" }}
      >
        Welcome to VisioCareAI
        <span className="block h-1 w-48 bg-gradient-to-r from-[#e8998d] via-[#880d1e] to-[#2d3047] animate-pulse rounded-full mx-auto mt-3"></span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="text-lg text-center max-w-xl mb-8"
      >
        Your AI-powered health assistant for Text, Image, and Audio analysis —
        built to empower smarter care decisions.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <FeatureCard
          icon={<FaBrain size={50} />}
          title="Text Analysis"
          link="/text-analysis"
          color="#e8998d"
        />
        <FeatureCard
          icon={<FaCamera size={50} />}
          title="Image Analysis"
          link="/image-analysis"
          color="#880d1e"
        />
        <FeatureCard
          icon={<FaMicrophoneAlt size={50} />}
          title="Audio Analysis"
          link="/audio-analysis"
          color="#2d3047"
        />
      </motion.div>
    </div>
  );
}

function FeatureCard({ icon, title, link, color }) {
  return (
    <Link to={link}>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="text-isabelline rounded-2xl shadow-lg p-6 flex flex-col items-center transition duration-300"
        style={{ backgroundColor: color }}
      >
        <div className="mb-4">{icon}</div>
        <h3 className="text-2xl font-semibold mb-2">{title}</h3>
        <p className="text-center">
          Start analyzing {title.toLowerCase()} effortlessly.
        </p>
      </motion.div>
    </Link>
  );
}

export default Home;