import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="flex justify-between items-center container mx-auto">
        <Link to="/" className="text-2xl font-bold">
          VisioCareAI
        </Link>
        <div className="space-x-4">
          <Link to="/text-analysis" className="hover:text-yellow-300">Text</Link>
          <Link to="/image-analysis" className="hover:text-yellow-300">Image</Link>
          <Link to="/audio-analysis" className="hover:text-yellow-300">Audio</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;