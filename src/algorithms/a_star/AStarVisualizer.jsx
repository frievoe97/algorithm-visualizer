// src/algorithms/a_star/AStarVisualizer.jsx

import React, { useContext, useImperativeHandle, forwardRef } from "react";
import { GridContext } from "../../contexts/GridContext";
import { aStar, getNodesInShortestPathOrder } from "./aStarAlgorithm";

const AStarVisualizer = forwardRef(({ onGridButtonClick }, ref) => {
  const { grid, startNode, endNode } = useContext(GridContext);

  useImperativeHandle(ref, () => ({
    visualizeAStar,
  }));

  const visualizeAStar = () => {
    if (!startNode || !endNode) {
      alert("Bitte setzen Sie sowohl einen Start- als auch einen Endknoten.");
      return;
    }
    resetGridVisuals();
    const visitedNodesInOrder = aStar(grid, startNode, endNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(endNode);
    animateAStar(visitedNodesInOrder, nodesInShortestPathOrder);
  };

  const resetGridVisuals = () => {
    for (const row of grid) {
      for (const node of row) {
        const element = document.getElementById(`node-${node.row}-${node.col}`);
        if (element) {
          if (node.isStart) {
            element.className = "w-6 h-6 border border-gray-200 bg-green-500";
          } else if (node.isEnd) {
            element.className = "w-6 h-6 border border-gray-200 bg-red-500";
          } else if (node.isWall) {
            element.className = "w-6 h-6 border border-gray-200 bg-black";
          } else {
            element.className = "w-6 h-6 border border-gray-200 bg-white";
          }
          // Inline-Stil entfernen
          element.style.backgroundColor = "";
        }
      }
    }
  };

  const animateAStar = (nodesInOrder, shortestPathNodes) => {
    console.log("Animate A*");
    const totalSteps = nodesInOrder.length;
    for (let i = 0; i <= totalSteps; i++) {
      console.log(`Step: ${i}`);
      if (i === totalSteps) {
        setTimeout(() => {
          animateShortestPath(shortestPathNodes);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = nodesInOrder[i];
        if (!node.isStart && !node.isEnd && !node.isWall) {
          const opacity = 0.2 + (i / totalSteps) * 0.4;
          const element = document.getElementById(
            `node-${node.row}-${node.col}`
          );
          element.style.backgroundColor = `rgba(0, 0, 255, ${opacity})`;
        }
      }, 10 * i);
    }
  };

  const animateShortestPath = (nodesInShortestPathOrder) => {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        if (!node.isStart && !node.isEnd) {
          const element = document.getElementById(
            `node-${node.row}-${node.col}`
          );
          // Inline-Stil entfernen
          element.style.backgroundColor = "";
          // Klassennamen setzen, um den gelben Hintergrund zu erhalten
          element.className = "w-6 h-6 border border-gray-200 bg-yellow-500";
        }
      }, 50 * i);
    }
  };

  return (
    // <button
    //   id="startVizAlgorithm"
    //   onClick={visualizeAStar}
    //   className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded"
    // >
    //   Visualisiere A*-Algorithmus
    // </button>
    <div></div>
  );
});

export default AStarVisualizer;
