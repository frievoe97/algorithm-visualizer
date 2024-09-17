import React, { useContext, useImperativeHandle, forwardRef } from "react";

import { GridContext } from "../../contexts/GridContext";
import { dijkstra, getNodesInShortestPathOrder } from "./dijkstraAlgorithm";

const DijkstraVisualizer = forwardRef(({ onGridButtonClick }, ref) => {
  const { grid, startNode, endNode } = useContext(GridContext);

  useImperativeHandle(ref, () => ({
    visualizeDijkstra,
  }));

  const visualizeDijkstra = () => {
    if (!startNode || !endNode) {
      alert("Bitte setzen Sie sowohl einen Start- als auch einen Endknoten.");
      return;
    }
    resetGrid();
    const visitedNodesInOrder = dijkstra(grid, startNode, endNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(endNode);
    animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  };

  const resetGrid = () => {
    for (const row of grid) {
      for (const node of row) {
        node.distance = Infinity;
        node.isVisited = false;
        node.previousNode = null;
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
          // Inline-Stile entfernen
          element.style.backgroundColor = "";
        }
      }
    }
  };

  const animateDijkstra = (nodesInOrder, shortestPathNodes) => {
    const totalSteps = nodesInOrder.length;
    for (let i = 0; i <= totalSteps; i++) {
      if (i === totalSteps) {
        setTimeout(() => {
          animateShortestPath(shortestPathNodes);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = nodesInOrder[i];
        if (!node.isStart && !node.isEnd && !node.isWall) {
          // Berechnen der Opazität, damit neu besuchte Knoten kräftiger sind
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

  return <div></div>;
});

export default DijkstraVisualizer;
