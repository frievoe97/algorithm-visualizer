// src/contexts/GridContext.jsx
import React, { createContext, useState } from "react";

export const GridContext = createContext();

export const GridProvider = ({ children }) => {
  const [grid, setGrid] = useState([]);
  const [startNode, setStartNode] = useState(null);
  const [endNode, setEndNode] = useState(null);

  // Funktion zum Zurücksetzen der Visualisierung
  const resetGridVisuals = () => {
    const newGrid = grid.map((row) =>
      row.map((node) => {
        const element = document.getElementById(`node-${node.row}-${node.col}`);
        if (element) {
          // Inline-Stil entfernen
          element.style.backgroundColor = "";
          // Wenn der Knoten kein Start-, Endknoten oder Mauer ist, setzen wir die Klasse auf bg-white
          if (!node.isStart && !node.isEnd && !node.isWall) {
            element.className =
              "w-6 h-6 border border-gray-200 bg-white grid-node";
          }
        }
        return node;
      })
    );
    setGrid(newGrid);
  };

  return (
    <GridContext.Provider
      value={{
        grid,
        setGrid,
        startNode,
        setStartNode,
        endNode,
        setEndNode,
        resetGridVisuals, // Hier die Funktion bereitstellen
      }}
    >
      {children}
    </GridContext.Provider>
  );
};
