// src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center flex-grow">
      <h1 className="text-5xl font-bold mb-8">Algorithmus Visualizer</h1>
      <div className="grid grid-cols-1 gap-4">
        <Link to="/pathfinding">
          <button className="w-64 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded">
            Pathfinding Algorithms
          </button>
        </Link>
        <Link to="/sorting">
          <button className="w-64 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded">
            Sorting Algorithms
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
