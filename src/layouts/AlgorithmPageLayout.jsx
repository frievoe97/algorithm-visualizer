// src/layouts/AlgorithmPageLayout.jsx
import React from "react";

const AlgorithmPageLayout = ({
  title,
  algorithmOptions,
  selectedAlgorithm,
  onAlgorithmChange,
  controls,
  children,
}) => {
  return (
    <div className="flex flex-col flex-grow px-4 sm:px-6 lg:px-8">
      <h1
        id="algorithmPageHeading"
        className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6"
      >
        {title}
      </h1>

      <div
        id="algorithmSelector"
        className="flex flex-col sm:flex-row sm:items-center mb-4 sm:mb-6 space-y-2 sm:space-y-0 sm:space-x-4"
      >
        <label className="text-gray-700 font-medium">Select Algorithm:</label>
        <select
          value={selectedAlgorithm}
          onChange={onAlgorithmChange}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
        >
          {algorithmOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Display controls */}
      {/* <div className="mb-4">{controls}</div> */}

      <div className="flex-grow">{children}</div>
    </div>
  );
};

export default AlgorithmPageLayout;
