import React from "react";

const ControlPanel = ({ onResetGrid, onVisualizeAlgorithm }) => {
  return (
    <div className="flex flex-col items-center space-y-4 mb-4">
      {/* Button zum Zurücksetzen des Grids */}
      <button
        onClick={onResetGrid}
        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded"
      >
        Reset Grid
      </button>

      {/* Button zum Visualisieren */}
      <button
        onClick={onVisualizeAlgorithm}
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded"
      >
        Visualisierung starten
      </button>
    </div>
  );
};

export default ControlPanel;
